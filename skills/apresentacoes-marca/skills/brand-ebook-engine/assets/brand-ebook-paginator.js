/*
  brand-ebook-paginator.js — paginador "modo livro" dos ebooks da marca.
  Roda DENTRO do navegador, injetado pelo pipeline de exportação
  (scripts/ebook-to-pdf-livro.js) junto com brand-ebook-livro.css, nunca no HTML
  entregue ao leitor.

  O que faz: lê o DOM do ebook de leitura contínua (capa, sumário, seções,
  partes, capítulos, encerramento), mede cada bloco de conteúdo na largura
  final da mancha gráfica e reconstrói o <body> como uma sequência de folhas
  A4 reais (.pdf-page), com rodapé numerado e sumário com número de página.
  Assim o PDF sai com encadernação de livro: fundo dark de ponta a ponta,
  sem card órfão em página vazia e sem depender do suporte (inexistente no
  Chrome) a margin boxes de @page.

  Regras de quebra:
  - Capa, sumário (uma ou mais folhas, ver abaixo) e encerramento têm folha
    própria.
  - Todo `.part-divider` (formato com partes) vira uma folha de abertura de
    parte, sem rodapé, como uma mini-capa daquela parte.
  - Todo capítulo abre em folha nova, com número + título + linha gradiente.
  - h3 nunca fica sozinho no pé da página (desce junto com o bloco seguinte).
  - O card "Em resumo" nunca abre página sozinho: puxa o bloco anterior junto.
  - O sumário pagina de verdade: com muitos capítulos/partes (formato com
    partes chega a 25-30 linhas), uma folha só não basta — o sumário é
    tratado como mais um fluxo empacotado por `pack()`, podendo virar 2+
    folhas. Os números de página de cada linha são preenchidos só depois de
    toda a numeração do livro estar fechada (ver `paginate()`).

  Expõe window.__anaEbookLivro.paginate() -> Promise<{pages, toc}>.
*/
(function () {
  'use strict';

  function el(tag, className, html) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (html !== undefined) node.innerHTML = html;
    return node;
  }

  function textOf(root, selector) {
    var found = root.querySelector(selector);
    return found ? found.innerHTML : '';
  }

  // Filhos diretos de .ebook-content, na ordem em que aparecem no documento,
  // exceto capa/sumário/encerramento (que têm tratamento próprio). Pode
  // conter .part-divider, .chapter e .ebook-page (ex.: a introdução).
  function collectSource() {
    var src = {
      cover: document.getElementById('capa'),
      closing: document.getElementById('encerramento'),
      logoSrc: null
    };
    src.flowNodes = Array.prototype.slice.call(
      document.querySelectorAll('.ebook-content > *')
    ).filter(function (el) {
      return ['capa', 'sumario', 'encerramento'].indexOf(el.id) === -1;
    });
    var logoLg = src.cover ? src.cover.querySelector('.brand-logo') : null;
    src.logoSrc = logoLg ? logoLg.getAttribute('src') : null;
    return src;
  }

  // Blocos de um capítulo: cabeçalho + filhos do corpo + resumo.
  function chapterBlocks(chapter) {
    var blocks = [];
    var head = chapter.querySelector('.chapter-head');
    if (head) {
      var headBlock = el('div', 'pdf-chap-head',
        '<span class="chapter-num">' + textOf(head, '.chapter-num') + '</span>' +
        '<h2>' + textOf(head, 'h2') + '</h2>' +
        (head.querySelector('.chapter-intro')
          ? '<p class="chapter-intro">' + textOf(head, '.chapter-intro') + '</p>'
          : '') +
        '<div class="pdf-chap-rule"></div>');
      blocks.push({ node: headBlock, kind: 'head' });
    }
    var body = chapter.querySelector('.chapter-body');
    if (body) {
      Array.prototype.slice.call(body.children).forEach(function (child) {
        var kind = 'flow';
        if (/^H[1-6]$/.test(child.tagName)) kind = 'heading';
        blocks.push({ node: child.cloneNode(true), kind: kind });
      });
    }
    var summary = chapter.querySelector('.chapter-summary');
    if (summary) blocks.push({ node: summary.cloneNode(true), kind: 'summary' });
    return blocks;
  }

  function sectionBlocks(section) {
    var blocks = [];
    var eyebrow = textOf(section, '.eyebrow');
    var title = textOf(section, 'h2');
    if (eyebrow || title) {
      blocks.push({
        node: el('div', 'pdf-section-head',
          (eyebrow ? '<span class="eyebrow">' + eyebrow + '</span>' : '') +
          (title ? '<h2>' + title + '</h2>' : '')),
        kind: 'head'
      });
    }
    var body = section.querySelector('.chapter-body');
    if (body) {
      Array.prototype.slice.call(body.children).forEach(function (child) {
        blocks.push({ node: child.cloneNode(true), kind: 'flow' });
      });
    }
    return blocks;
  }

  // Mede cada bloco SOZINHO, um de cada vez, reaproveitando a mesma sonda
  // (mesma largura da mancha gráfica final). Armadilha a evitar em CSS: uma
  // regra condicionada a :first-child/:last-child/:nth-child num bloco que
  // passa por aqui sempre vai "parecer" ser o único filho durante a medição
  // (é literalmente o único filho da sonda naquele instante), então relata um
  // valor que não bate com o que a página final realmente renderiza quando o
  // bloco NÃO está de fato na borda do grupo. Já causou overflow silencioso
  // por baixo do rodapé numa página de sumário (ver brand-ebook-livro.css,
  // histórico de .pdf-toc-kicker). Blocos usados aqui devem ter margem fixa,
  // não condicionada à posição entre irmãos.
  function measureBlocks(blocks) {
    var probe = el('div', 'pdf-page');
    probe.style.position = 'absolute';
    probe.style.left = '-9999px';
    probe.style.top = '0';
    var content = el('div', 'pdf-content');
    probe.appendChild(content);
    document.body.appendChild(probe);
    var capacity = content.clientHeight;

    blocks.forEach(function (b) {
      content.innerHTML = '';
      content.appendChild(b.node);
      var rect = b.node.getBoundingClientRect();
      var cs = getComputedStyle(b.node);
      b.height = rect.height;
      b.marginTop = parseFloat(cs.marginTop) || 0;
      b.marginBottom = parseFloat(cs.marginBottom) || 0;
      content.removeChild(b.node);
    });

    document.body.removeChild(probe);
    return capacity;
  }

  // Empacota blocos em páginas respeitando keep-with-next (heading) e
  // keep-with-previous (summary).
  function pack(blocks, capacity) {
    var pages = [];
    var current = [];
    var used = 0;
    var prevMarginBottom = 0;

    function costOf(block) {
      var gap = current.length ? Math.max(prevMarginBottom, block.marginTop) : 0;
      return gap + block.height;
    }

    function push(block) {
      used += costOf(block);
      prevMarginBottom = block.marginBottom;
      current.push(block);
    }

    function breakPage() {
      if (current.length) pages.push(current);
      current = [];
      used = 0;
      prevMarginBottom = 0;
    }

    for (var i = 0; i < blocks.length; i++) {
      var b = blocks[i];
      var fits = used + costOf(b) <= capacity;

      if (!fits) {
        if (b.kind === 'summary' && current.length > 1) {
          // puxa o bloco anterior para a página seguinte, junto com o resumo
          var prev = current.pop();
          used = 0; // recalcula abaixo
          prevMarginBottom = 0;
          var kept = current;
          current = [];
          kept.forEach(push);
          breakPage();
          push(prev);
          push(b);
          continue;
        }
        breakPage();
        push(b);
        continue;
      }

      if (b.kind === 'heading') {
        // heading nunca fecha página: precisa caber com o bloco seguinte
        var next = blocks[i + 1];
        if (next) {
          var gapH = current.length ? Math.max(prevMarginBottom, b.marginTop) : 0;
          var gapN = Math.max(b.marginBottom, next.marginTop);
          if (used + gapH + b.height + gapN + next.height > capacity) {
            breakPage();
          }
        }
      }
      push(b);
    }
    breakPage();
    return pages;
  }

  function buildCoverPage(src) {
    var page = el('div', 'pdf-page');
    var cover = el('div', 'pdf-cover');
    if (src.logoSrc) {
      var img = el('img', 'brand-logo');
      img.src = src.logoSrc;
      img.alt = 'Logo';
      cover.appendChild(img);
    }
    cover.appendChild(el('span', 'eyebrow', textOf(src.cover, '.eyebrow')));
    var h1 = src.cover.querySelector('h1');
    cover.appendChild(el('h1', h1 ? h1.className : '', h1 ? h1.innerHTML : ''));
    var sub = src.cover.querySelector('.cover-subtitle');
    if (sub) cover.appendChild(el('p', 'cover-subtitle', sub.innerHTML));
    var meta = src.cover.querySelector('.cover-meta');
    if (meta) cover.appendChild(meta.cloneNode(true));
    page.appendChild(cover);
    return page;
  }

  function buildClosingPage(src) {
    var page = el('div', 'pdf-page');
    var closing = el('div', 'pdf-cover pdf-closing');
    if (src.logoSrc) {
      var img = el('img', 'brand-logo');
      img.src = src.logoSrc;
      img.alt = 'Logo';
      closing.appendChild(img);
    }
    closing.appendChild(el('span', 'eyebrow', textOf(src.closing, '.eyebrow')));
    var h2 = src.closing.querySelector('h2');
    closing.appendChild(el('h1', h2 ? h2.className : '', h2 ? h2.innerHTML : ''));
    var body = src.closing.querySelector('.chapter-body') ||
               src.closing.querySelector('.cover-subtitle');
    if (body) closing.appendChild(el('div', 'pdf-closing-body', body.innerHTML));
    page.appendChild(closing);
    return page;
  }

  // Folha de abertura de parte: mini-capa dessa parte, sem rodapé (mesmo
  // tratamento de capa/encerramento — página de título, não de conteúdo).
  function buildPartPage(flow) {
    var page = el('div', 'pdf-page');
    var wrap = el('div', 'pdf-part');
    wrap.appendChild(el('span', 'eyebrow', flow.label || 'Parte'));
    wrap.appendChild(el('h2', '', flow.title));
    page.appendChild(wrap);
    return page;
  }

  function paginate() {
    return document.fonts.ready.then(function () {
      var src = collectSource();
      var bookTitle = (document.title || '').split('—')[0].trim();

      // Classifica cada filho de nível 1 do fluxo em parte / capítulo / seção,
      // preservando a ordem do documento (partes ficam intercaladas entre
      // grupos de capítulos, exatamente como o leitor vê ao rolar a página).
      var flows = [];
      src.flowNodes.forEach(function (node) {
        if (node.classList.contains('part-divider')) {
          flows.push({ kind: 'part', label: textOf(node, '.eyebrow'), title: textOf(node, 'h2') });
        } else if (node.classList.contains('chapter')) {
          var numText = textOf(node, '.chapter-num').replace(/[^0-9]/g, '') || '·';
          flows.push({
            kind: 'chapter',
            num: numText,
            title: textOf(node, '.chapter-head h2') || node.getAttribute('data-chapter-title') || '',
            blocks: chapterBlocks(node)
          });
        } else if (node.classList.contains('ebook-page')) {
          flows.push({
            kind: 'section',
            num: '·',
            title: textOf(node, '.eyebrow') || 'Seção',
            blocks: sectionBlocks(node)
          });
        }
      });

      var capacity = 0;
      flows.forEach(function (flow) {
        if (flow.kind === 'part') return;
        capacity = measureBlocks(flow.blocks) || capacity;
        flow.pages = pack(flow.blocks, capacity);
      });

      // Sumário: constrói as linhas (cabeçalho, capítulos com número de
      // página EM BRANCO por enquanto, kickers de parte). Como um livro de
      // verdade, o sumário só sabe a paginação final depois que o resto do
      // livro foi todo empacotado — por isso os spans de página são
      // preenchidos só no fim desta função, sem refazer a paginação do
      // sumário em si (o texto de um número de 1-2 dígitos não muda a altura
      // da linha o bastante para alterar as quebras já calculadas).
      var tocBlocks = [
        { node: el('div', 'pdf-toc-head', '<span class="eyebrow">Sumário</span><h2>O que você vai encontrar</h2>'), kind: 'head' }
      ];
      var tocPageSpans = []; // paralelo a `flows`, null para os que não entram no sumário
      flows.forEach(function (flow) {
        if (flow.kind === 'part') {
          var kickerRow = el('div', 'pdf-toc-kicker', '<span>' + flow.title + '</span><span class="pdf-toc-kicker-pg"></span>');
          tocBlocks.push({ node: kickerRow, kind: 'flow' });
          tocPageSpans.push(kickerRow.querySelector('.pdf-toc-kicker-pg'));
          return;
        }
        var row = el('div', 'pdf-toc-line',
          '<span class="pdf-toc-num">' + flow.num + '</span>' +
          '<span>' + flow.title + '</span>' +
          '<span class="pdf-toc-dots"></span>' +
          '<span class="pdf-toc-pg"></span>');
        tocBlocks.push({ node: row, kind: 'flow' });
        tocPageSpans.push(row.querySelector('.pdf-toc-pg'));
      });
      measureBlocks(tocBlocks); // mesma capacidade da página de conteúdo
      var tocPages = pack(tocBlocks, capacity);

      // Numeração: capa = 1, sumário = 2..(1+N folhas), fluxos a partir de
      // (2+N), encerramento no fim. N = tocPages.length.
      var pageCursor = 2 + tocPages.length;
      flows.forEach(function (flow) {
        flow.startPage = pageCursor;
        pageCursor += flow.kind === 'part' ? 1 : flow.pages.length;
      });
      var closingPage = pageCursor;

      // Preenche os números de página do sumário agora que são conhecidos.
      var spanIndex = 0;
      flows.forEach(function (flow) {
        var span = tocPageSpans[spanIndex++];
        if (span) span.textContent = flow.startPage;
      });

      // Reconstrói o body.
      var book = el('div', 'pdf-book');
      book.appendChild(buildCoverPage(src));

      var pageNum = 1;
      function footerFor(num) {
        return el('div', 'pdf-footer',
          '<span>' + bookTitle + '</span>' +
          '<span class="pdf-page-num">' + num + '</span>');
      }

      tocPages.forEach(function (blocks) {
        pageNum += 1;
        var page = el('div', 'pdf-page');
        var content = el('div', 'pdf-content pdf-toc');
        blocks.forEach(function (b) { content.appendChild(b.node); });
        page.appendChild(content);
        page.appendChild(footerFor(pageNum));
        book.appendChild(page);
      });

      flows.forEach(function (flow) {
        if (flow.kind === 'part') {
          pageNum += 1;
          book.appendChild(buildPartPage(flow));
          return;
        }
        flow.pages.forEach(function (blocks) {
          pageNum += 1;
          var page = el('div', 'pdf-page');
          var content = el('div', 'pdf-content');
          blocks.forEach(function (b) { content.appendChild(b.node); });
          page.appendChild(content);
          page.appendChild(footerFor(pageNum));
          book.appendChild(page);
        });
      });

      book.appendChild(buildClosingPage(src));

      document.body.innerHTML = '';
      document.body.appendChild(book);
      window.scrollTo(0, 0);

      return {
        pages: closingPage,
        toc: flows.map(function (f) {
          return { kind: f.kind, num: f.num, title: f.title, page: f.startPage };
        })
      };
    });
  }

  window.__anaEbookLivro = { paginate: paginate };
})();
