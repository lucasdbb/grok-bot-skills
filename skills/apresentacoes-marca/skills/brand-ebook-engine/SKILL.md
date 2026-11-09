---
name: brand-ebook-engine
description: Fonte única da mecânica de leitura e da identidade visual dos ebooks desta marca, derivada da mesma marca dos decks. Use ao montar qualquer ebook — nunca reescreva a mecânica de sumário/progresso nem os tokens de marca a partir do zero em cada ebook. Na primeira vez que for usado, faz uma configuração inicial de marca antes de montar qualquer ebook (a mesma configuração do brand-deck-engine — não peça duas vezes).
---

# brand-ebook-engine

Irmã de `skills/brand-deck-engine`: mesma marca, mesmos tokens, mecânica diferente porque o formato é diferente. Um deck é um palco (1 slide por vez, 16:9). Um ebook é um documento de rolagem contínua (sumário fixo, capítulos, leitura longa). Por isso a mecânica de navegação (`brand-deck-engine.css`/`.js`) não é reaproveitada aqui, mas os tokens de marca e a camada visual neural são, para garantir que deck e ebook sejam inconfundivelmente a mesma marca.

Todo ebook inline no HTML final, sempre nesta ordem:

1. `skills/brand-deck-engine/assets/brand-tokens.css` — variáveis de marca (cores, fontes, glass, glow). **Mesmo arquivo dos decks, referenciado, nunca duplicado** — é a fonte única de verdade da paleta da marca.
2. `skills/brand-deck-engine/assets/brand-deck-visuals.css` — camada visual "neural" (orbs, `.brand-card-neural`, `.brand-text-grad`, `.brand-pill-neural`, `.brand-termwin`, text-glow). Mesmo arquivo dos decks, reaproveitado como está: os componentes decorativos da marca não mudam entre formato de deck e de ebook.
3. `assets/brand-ebook-engine.css` (deste diretório) — mecânica de leitura: barra de progresso, sumário fixo/gaveta, tipografia de capítulo, citações de destaque, resumo de capítulo, notas de rodapé, `@media print` em paginação de livro (A4, quebra por capítulo).
4. `assets/brand-ebook-engine.js` (deste diretório) — scrollspy do sumário, barra de progresso, toggle do sumário no mobile, atalhos de teclado. Expõe `window.__ebook` para verificação via Playwright.
5. `skills/brand-deck-engine/assets/logos-brand.b64.txt` — logo da marca em base64. Mesmo arquivo dos decks: versão pequena no cabeçalho do sumário, versão grande na capa e no encerramento.
6. `skills/brand-deck-engine/assets/fotos-marca/` — acervo fotográfico, compartilhado com os decks.

Para exportação em PDF existem mais dois assets, usados SOMENTE pelo pipeline `scripts/ebook-to-pdf-livro.js` (nunca inline no HTML entregue): `assets/brand-ebook-livro.css` (diagramação de folha A4 dark, rodapé numerado, tipografia de livro) e `assets/brand-ebook-paginator.js` (repagina o DOM em folhas reais, com sumário numerado e regras de quebra). Ver `docs/EXPORTACAO-PDF.md`.

## Antes do primeiro uso: configurar a marca

Mesma configuração inicial do `brand-deck-engine` (ver o `SKILL.md` daquele skill, seção "Antes do primeiro uso"). Se o deck já tiver sido configurado antes do primeiro ebook, **não pergunte de novo** — confira `skills/brand-deck-engine/assets/brand-tokens.json`: se `"configurado"` já estiver `true`, a marca já está pronta e você só precisa montar o ebook.

## Regra de ouro

Nunca edite `brand-tokens.css` ou `brand-deck-visuals.css` para resolver um problema pontual de um ebook específico — isso quebra a consistência com os decks, que são a mesma marca. Problemas pontuais de conteúdo se resolvem no HTML do ebook; problemas de mecânica de leitura são versão deliberada de `brand-ebook-engine.css`/`.js`; problemas de marca (cor, tipografia, glass) são versão deliberada de `brand-deck-engine`, decidida em conjunto porque afeta os dois formatos.

**Cor do texto de leitura corrida**: `.chapter-intro`, `.chapter-body` (e seus descendentes herdados, como `td` comum e itens de `.checklist`) e `.chapter-summary ul` usam `var(--ink)` cheio, não `var(--ink-soft)` — por legibilidade, válido para todo ebook (já embutido na engine, não precisa repetir por ebook). O mesmo vale no espelho de PDF (`brand-ebook-livro.css`: `.pdf-content`, `.pdf-chap-head .chapter-intro`, `.pdf-closing-body`). Reserve `var(--ink-soft)` só para chrome secundário que não é o texto corrido principal: navegação do sumário lateral, legenda/meta da capa, atribuição (`cite`) de `pull-quote`.

## Contrato de capítulo

```html
<article class="chapter" id="cap-1" data-chapter-title="Título do capítulo">
  <header class="chapter-head">
    <span class="chapter-num">Capítulo 01</span>
    <h2>Título do capítulo</h2>
    <p class="chapter-intro">Linha de abertura que ancora o que o capítulo resolve.</p>
  </header>
  <div class="chapter-body">
    <p>Texto corrido...</p>
    <blockquote class="brand-card-neural pull-quote">"Citação de destaque extraída da fonte."<cite>Contexto da citação</cite></blockquote>
    <div class="brand-termwin"><!-- exemplo de prompt/comando, quando o conteúdo pedir --></div>
    <figure class="chapter-figure"><img src="data:..." alt="..."><figcaption>Legenda</figcaption></figure>
    <!-- Tabela comparativa (conceito × contra-exemplo, fraco × forte etc.): envolver em .table-wrap
         para rolagem horizontal própria, nunca deixar a tabela vazar a coluna de leitura no mobile. -->
    <div class="table-wrap"><table><tr><th>Coluna</th><th>Coluna</th></tr><tr><td>Linha</td><td>Linha</td></tr></table></div>
    <!-- Checklist de aplicação: caixa desenhada em CSS via .checklist, nunca caractere unicode de
         checkbox (□, ☐) — regra de "sem emoji" vale para símbolos unicode decorativos também. -->
    <ul class="checklist"><li>Item verificável</li></ul>
    <!-- Framework/fórmula curta em destaque (ex.: "Confiar + Querer + Poder pagar = Fechamento"). -->
    <div class="formula-row">Termo A <span class="op">+</span> Termo B <span class="op">=</span> Resultado</div>
    <!-- Ficha para preencher à mão (rótulo + linha em branco): NÃO é componente da engine
         compartilhada. É um padrão de CSS local (.fill-field/.fill-label/.fill-line), injetado
         ebook a ebook via um bloco de CSS extra anexado depois da engine inline, nunca editando os
         arquivos deste diretório. Peça esse padrão a quem for montar o ebook se precisar de novo. -->
    <div class="fill-field"><span class="fill-label">Rótulo do campo:</span><span class="fill-line"></span></div>
  </div>
  <footer class="chapter-summary brand-card-neural">
    <span class="eyebrow">Em resumo</span>
    <ul><li>Ponto-chave 1</li><li>Ponto-chave 2</li></ul>
  </footer>
</article>
```

## Divisor de parte (`.part-divider`)

Use quando a própria fonte (aula, documento, transcrição) já vem organizada pelo autor em partes nomeadas (várias seções numeradas agrupadas sob "Parte I", "Parte II" etc.) — a fidelidade à estrutura da fonte pesa mais que qualquer rótulo de formato. Cada `.part-divider` fica intercalado entre os `<article class="chapter">` diretamente em `.ebook-content`, e precisa de três coisas em paralelo, sempre juntas:

1. **Sidebar**: `<p class="toc-kicker">Parte NN: Nome</p>` antes dos `.toc-item` daquela parte.
2. **Página de sumário**: feche o `<ul class="sumario-list">` anterior e abra um novo, com `<p class="sumario-kicker">Parte NN: Nome</p>` antes dele — nunca meta o kicker como `<li>` dentro do mesmo `<ul>` (a regra genérica `.sumario-list li` aplicaria borda/flex indesejados a ele).
3. **Fluxo principal**: `<section class="part-divider" id="parte-01"><span class="eyebrow">Parte 01</span><h2>Nome da parte</h2></section>`.

O paginador do PDF (`brand-ebook-paginator.js`) lê `.part-divider` automaticamente e gera uma folha de título própria para cada parte, sem rodapé (mesmo tratamento de capa/encerramento). O sumário do PDF também empacota certo: com um ebook grande (muitas partes ou muitos capítulos), o sumário pode passar de uma folha — o paginador já trata isso sozinho, não force um formato de sumário de página única.

**Nunca use travessão** ao montar o rótulo do kicker — "Parte 01: Nome", com dois-pontos, nunca "Parte 01 — Nome" (ajuste essa regra de texto conforme o guia de estilo da marca; a ausência de travessão e de emoji era regra do negócio de origem deste sistema, confirme se também vale para a marca nova).

## Armadilhas conhecidas do paginador de PDF

Ver `docs/EXPORTACAO-PDF.md`, seção "Riscos conhecidos": margem que colapsa de forma invisível à medição de bloco isolado, regras CSS condicionadas a `:first-child`/`:last-child` que sempre "acertam" durante a medição isolada, e um off-by-one histórico na numeração de página a partir do sumário paginado. Todas já corrigidas nesta versão dos arquivos — a seção documenta o *porquê*, para não reintroduzir o mesmo bug ao editar a engine no futuro.
