---
name: Apresentacao ANA
description: >-
  Use ao criar ou editar uma apresentação ou aula da A Nova Advocacia (ANA) no
  sistema HTML 1920×1080 com Brand DNA — não use para PowerPoint, Google Slides
  nem criativo de feed/stories. Serve para deck novo, ajuste de slide, inserção
  de captura e para manter chrome, notas, ticks e numeração alinhados.
---
# Apresentação ANA

Receita para decks de aula ou palestra da A Nova Advocacia no HTML cinematic 1920×1080. Não use a skill `slides` (PowerPoint / Google Slides / knowledgeWork) nem o fluxo de criativos de Instagram para este trabalho.

Template canônico, quando existir no computador: `/workspace/ana-brand/aula-time-agentes-v2/aula-time-agentes_v2.html` (referência aprovada: aula “Criando um time de Agentes para multiplicar a eficiência do seu escritório”). Clone CSS, fontes embutidas, chrome e engine desse arquivo; troque só os slides e as notas.

## Quando aplicar

- Deck novo de aula ao vivo, formação ou palestra ANA
- Editar, reordenar ou inserir slides num deck HTML já existente desse sistema
- Colocar captura de tela, prova ou caso real num slide
- Gerar prévias PNG ou reenviar o HTML atualizado

Não cobre: criativo de feed/stories/carrossel, thumb de YouTube, banner LinkedIn, fundo de gravação, vídeo de abertura ou teaser (isso fica com o editor de vídeo). Não publica, não sobe anúncio e não inventa preço, depoimento, métrica ou prazo.

## Brand DNA (trava visual)

Identidade: plataforma premium de inteligência jurídica artificial para advogados BR de alto desempenho. Mood: autoritário, futurista, confiável, premium. Estética: dark space + glassmorphism + neon glow + holográfico.

- Fundo: Deep Space `#050811` sobre Void `#020408`, com Surface `#0A1628` e Elevated `#0F1E35`. Neural Constellation (pontos + linhas, opacidade ~10–30%) e grid sutil cyan.
- Accent: Electric Cyan `#00F0FF` · Aurora Purple `#6366F1` (texto purple mais claro `#8B8DF8`) · Holographic Gold `#D4AF37` · Neural White `#FAFBFF` · Secondary `#94A3B8`
- Gradiente Neural: `linear-gradient(135deg, #00F0FF 0%, #6366F1 100%)`
- Tipo: Display Orbitron 700/800 nos títulos · corpo Inter · chrome, kicker e números em JetBrains Mono
- Logo no rodapé: dois diamantes/cristais interconectados (cyan à esquerda, purple à direita) + wordmark `A NOVA ADVOCACIA` em caixa alta, tracking amplo
- Peças de UI: cantos HUD no palco e nos cards (`.hud`), painéis `.glass` (ciano), `.glass.p` (purple), `.glass.g` (ouro)

Nunca: fundo claro full-bleed, cores quentes, vintage, orgânico infantil, visual de Canva genérico. Captura de tela clara (app, chat, planilha) entra *dentro* de uma moldura `.glass.hud` escura, nunca como fundo do slide.

Bug do Orbitron: til (~) em ã, õ e semelhantes pode renderizar errado (ã vira cara de à). Evite esses glifos em Orbitron; coloque a palavra em Inter (ex.: “Conheça”).

## Arquitetura do arquivo

Um único HTML autossuficiente (fontes woff2 e imagens em data URI). Palco fixo:

```
#stage 1920×1080, origin center, scale = min(vw/1920, vh/1080)
canvas#bg     constelação animada
#grid         grade 80px, máscara radial
.scan         varredura sutil
.hudc.tl/tr/bl/br   cantos HUD a 40px
#topbar       “ANA // Aula ao vivo” à esquerda; #sec (seção do slide) à direita
#foot         logo + wordmark à esquerda; #num “01 / 27” à direita
#ticks        um <span> por slide (on / done)
#prog > i     barra neural na base
#notes #help #black #jump   overlays do apresentador
```

Cada slide:

```html
<section class="slide" data-title="Título curto" data-section="Nome da seção">
  ...
</section>
```

`data-section` alimenta o topbar. `data-title` deve coincidir com `TITLES[i]`.

Três listas obrigatoriamente no mesmo comprimento que `document.querySelectorAll('.slide')`:

1. Array JS `TITLES`
2. Array JS `NOTES` (uma lista de frases por slide; marcar incerteza com `[copy]` ou `[confirmar]`)
3. Um `<span>` dentro de `#ticks` para cada slide

`N` é `slides.length` no engine. O contador `#num` formata `01 / N`. Hash `#n` (1-based) abre o slide n. `?final` congela motion (`html.final`) para captura limpa. API: `window.deck.go(i)` (0-based), `window.deck.cur`, `window.deck.N`.

Atalhos do apresentador (já no engine): → / Espaço / PgDn próximo; ← / PgUp anterior; Home/End; número + Enter; F tela cheia; N notas na tela; S janela do apresentador; B tela preta; H/? ajuda; Esc fecha.

## Anatomia de um slide

Margem segura: não encoste no topbar (topo ~52), no rodapé (~46), nos ticks centrais (~52) nem nos cantos HUD (40). Cabeçalho padrão:

```html
<div class="head">
  <div class="kicker" data-a="down">Seção ou exemplo</div>
  <h1 class="title" data-a="up">Título em Orbitron. Destaque com <span class="grad">gradiente</span>.</h1>
  <div class="rule" data-a="grow"></div>
</div>
```

- `.head` vive em `left:140px; top:118px; width:1640px`
- Título de corpo: Orbitron 700 ~62px / 1.12. Capa pode ir até ~108px.
- Kicker: JetBrains Mono 21px, tracking alto, cyan, losango antes via CSS
- `.rule` (cyan→purple) ou `.rule.go` (ouro)
- Texto de apoio: Inter, `.sub` ~30px ou `.cd` ~23px em `#94A3B8`; título de card `.ct` ~30px Inter 700
- Cards: `.glass.hud` + opcional `.p` / `.g`. Conteúdo interno: `.idx` (código), `.ico`, `.chip`, `.tag`
- Posicione blocos com `.abs` e `style="left:;top:;width:;height:"` em px do palco 1920×1080
- Uma ideia por frame; contraste alto; CTA óbvio quando o slide pede ação

Animação de entrada: `data-a="up|fade|left|right|zoom|blur|grow|growy|down"` e `--d:N` (atraso em passos de 110ms + 250ms). SVG pode usar `.draw` (traço) e `.flow` (fluxo tracejado).

`.pulse` e `.pulse-go` são um brilho ciano/ouro em loop. Em bloco em destaque isso costuma ler como “efeito estranho”. Padrão: destaque estático (borda `.g` ou cyan, sem pulse). Só use pulse se pedirem explicitamente ou num nó vivo de diagrama.

## Padrões de layout (família deste deck)

- **Capa:** título grande à esquerda, visual/diagrama à direita; sem `.head` compacto. Assinatura do apresentador e linha ouro.
- **Cards (3–6):** grade de `.glass.hud` com índice, ícone, título e texto curto.
- **Pergunta / número:** título forte + dois ou três painéis de resposta.
- **Produto / plataforma:** logo ou ícone oficial + uma frase de posicionamento (“é aqui que o time roda”).
- **Prova / captura:** frase do dono como título + screenshot na moldura glass. Não extraia números novos da captura nem invente prazo (“no dia seguinte”) se os horários da tela dizem outra coisa.
- **Organograma:** só os cargos pedidos. Se pedirem o CEO no topo, ele fica sozinho numa linha; a fileira de diretoria entra abaixo, ligada por linhas SVG.
- **Spotlight de agente:** kicker de exemplo + título + texto à esquerda + nós satélite ao redor do agente.
- **Passo a passo:** cards numerados ou fluxo SVG da esquerda para a direita.
- **Encerramento:** CTA real, em glass sólido — nunca caixa tracejada `[copy] CTA`.
- **Fecho emocional:** foto cinematográfica escura full-bleed, vinheta/gradiente à esquerda para o tipo ler, headline em Orbitron + pergunta em Inter. Pessoa gerada pode ser inventada; nunca use foto de pessoa real identificável sem permissão.

## Imagens e capturas

1. Redimensione se for enorme (largura útil típica 900–1600px).
2. Converta para JPEG RGB, qualidade ~84 (Pillow), antes de embutir — o HTML precisa continuar enviável no chat.
3. Embutir como `data:image/jpeg;base64,...` num `<img>` dentro de `.glass.hud`, `object-fit: contain`.
4. Não deixe vazio grande sem função: se o título é curto, aumente a captura; se inventar um parágrafo de apoio, declare isso na entrega.
5. Geração paga (Magnific e similares) só com pedido explícito. `GenerateImage` serve para fundo emocional quando pedirem imagem e não houver foto aprovada.

## Como criar um deck novo

1. Brief mínimo: público, duração, mensagem, CTA, canal (aula ao vivo, palestra, formação). Se faltar, assuma aula ANA e confirme em uma linha.
2. Monte o roteiro (uma frase por slide) antes de desenhar, salvo se já houver outline ou o pedido for “só faça”.
3. Copie do template canônico o `<style>` (com `@font-face`), o chrome, o engine e o bloco `NOTES`/`TITLES`. Não baixe fontes de novo se as data URIs já estão lá.
4. Construa os `<section class="slide">` na ordem. Uma ideia por frame.
5. Preencha `TITLES`, `NOTES` e `#ticks` no mesmo passo.
6. Copie do dono o texto ditado na íntegra. Placeholder curto vai marcado `[copy]`. Não invente prova social, preço ou número que não esteja no brief ou na captura.
7. Gere prévias dos slides-chave e entregue o HTML.

## Como editar um deck existente

1. Trabalhe no HTML atual do projeto, não numa cópia antiga do chat. Faça backup (`*.html.bak-…`) antes de mudança grande.
2. O número que o dono cita é o da versão que ele está vendo. Confirme pelo `data-title`, porque inserções deslocam tudo que vem depois.
3. Inserir no lugar N: coloque a `<section>` na posição N (1-based), o item N em `TITLES` e `NOTES`, e mais um `<span>` em `#ticks`.
4. Mover um slide: mova a `<section>` e os itens correspondentes nas três listas; não duplique.
5. “Tire esse efeito estranho” num bloco = remova `.pulse` / `.pulse-go` daquele bloco; o destaque estático pode ficar.
6. Recapture só os slides novos ou alterados. Reenvie o HTML no chat: edições posteriores no arquivo não atualizam a cópia já enviada.

## Como renderizar prévias

Use puppeteer-core (há cópia em `/workspace/ana-brand/x-fio-agentes/node_modules/puppeteer-core` quando existir) e Chrome em `/usr/bin/google-chrome`.

1. Abra `file:///.../deck.html?final` **uma vez** (`waitUntil: networkidle0`, viewport 1920×1080, `deviceScaleFactor: 1`).
2. Espere `document.fonts.ready`. Esconda `#notes` e `#help`.
3. Para cada slide: `window.deck.go(n - 1)`, espere ~800ms, tire PNG do viewport.
4. **Não** faça um `goto` novo com outro hash do mesmo `file://` — o JS não reinicia e a captura sai do slide errado.
5. Confira no PNG o `#num` e o `data-title` do `.slide.active` antes de enviar.

## Entrega

No mesmo turno:

1. Primeira linha: o que mudou (números novos + ângulo), em português do Brasil.
2. Prévias PNG dos slides novos ou alterados.
3. O arquivo HTML atualizado (anexo).
4. Feche com `Não verificado:` listando o que não conferiu ao vivo, o texto que o dono ditou e que diverge de um número visível na captura (ex.: “500 reais” vs. preço na tela), e qualquer linha de apoio que você tenha acrescentado.

PDF só se pedirem (fica velho depressa).

## Verificação antes de entregar

- [ ] Paleta, fundo escuro, logo de dois diamantes e tipografia certos
- [ ] Palco 1920×1080; texto longe do chrome
- [ ] `TITLES.length === NOTES.length === ticks === slides.length`
- [ ] Capturas dentro de glass; HTML ainda autossuficiente
- [ ] Sem pulse indesejado nos blocos que o dono apontou
- [ ] Sem preço, depoimento, métrica ou prazo inventados
- [ ] Placeholders marcados `[copy]`
- [ ] Prévias batem com o número e o título do slide
- [ ] CTA de encerramento é texto real, não caixa tracejada
