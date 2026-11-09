# apresentacoes-marca

Plugin do Claude Code para gerar **decks de apresentação** e **ebooks de leitura contínua**, como páginas HTML autocontidas (um único arquivo, sem dependências externas), com exportação em PDF — tudo com a identidade visual da **sua** marca.

Este pacote é uma versão derivada e genérica de um sistema de design originalmente construído para uma marca específica. Os dois mecanismos (palco de slides e leitura contínua de ebook) e os componentes visuais (cards com borda em gradiente, citações de destaque, tabelas, checklists etc.) continuam os mesmos; o que muda é que a paleta de cores, o logo e o nome da marca agora são configuráveis, em vez de fixos. Os agentes de geração de conteúdo e as regras editoriais do negócio original **não** fazem parte deste pacote — aqui só vai o sistema visual e a mecânica dos dois formatos.

## Instalação

1. Copie esta pasta para onde o Claude Code procura plugins (ou siga o fluxo de instalação de plugin que a sua versão do Claude Code usa).
2. Abra uma conversa nesse projeto e rode `/configurar-marca` (ou simplesmente peça um deck ou ebook pela primeira vez — a configuração de marca acontece automaticamente antes do primeiro material ser montado).

## Configuração inicial da marca

Na primeira vez que um deck ou ebook for pedido, o Claude vai perguntar:

1. Nome da marca ou empresa.
2. Uma cor primária de destaque (hex) — a cor mais presente no design, ligada a ação/destaque (ocupa cerca de 30% da composição visual).
3. Uma cor secundária de destaque (hex) — usada com mais moderação, para sofisticação/acento (cerca de 10%).
4. Um arquivo de logo, se já existir (opcional — sem logo, o nome da marca aparece como texto estilizado no lugar dele).

Essas respostas ficam gravadas em `skills/brand-deck-engine/assets/brand-tokens.json` e `brand-tokens.css`, e valem para todo deck e ebook montado depois — não é preciso configurar de novo a cada material. Para trocar a marca depois (cores ou logo), rode `/configurar-marca` novamente.

Decks e ebooks já gerados **não** são atualizados retroativamente ao trocar a marca: cada um é um HTML autocontido, com a cópia da identidade visual do momento em que foi criado.

## Comandos

- `/configurar-marca` — configura ou reconfigura nome, cores e logo.
- `/deck` — monta um deck de apresentação a partir do conteúdo que você fornecer.
- `/ebook` — monta um ebook de leitura contínua a partir do conteúdo que você fornecer (texto pronto, transcrição, resumo).

## Estrutura

```
.claude-plugin/plugin.json      manifesto do plugin
commands/                       os três comandos acima
skills/
  brand-deck-engine/            mecânica de palco + tokens de marca (compartilhados com os ebooks)
    SKILL.md                    contrato de slide + instruções de configuração inicial
    assets/
      brand-tokens.json         identidade da marca, legível por humano (editar aqui primeiro)
      brand-tokens.css          tokens de CSS derivados do JSON acima
      brand-deck-engine.css/.js mecânica de navegação do palco (fade, atalhos, timer, fullscreen)
      brand-deck-exec.css       componentes de KPI/tabela/veredito
      brand-visuals.css         camada visual "neural" (glow, cards, termwin, gradientes)
      brand-charts.js           defaults de Chart.js, lê as cores da marca em tempo de execução
      logos-brand.b64.txt       logo em base64 (vazio até a configuração inicial)
      fotos-marca/              acervo de fotos institucionais (vazio por padrão)
  brand-ebook-engine/           mecânica de leitura contínua
    SKILL.md                    contrato de capítulo + regras de paginação em PDF
    assets/
      brand-ebook-engine.css/.js  sumário, barra de progresso, scrollspy
      brand-ebook-livro.css       diagramação de PDF "modo livro"
      brand-ebook-paginator.js    paginador que repagina o HTML em folhas A4 reais
      brand-fonts-embedded.css    fontes da marca embutidas em base64 (para exportar PDF offline)
templates/
  deck.html.tmpl                 esqueleto de capa + slides + encerramento
  ebook.html.tmpl                esqueleto de capa + sumário + capítulos + encerramento
scripts/
  deck-to-pdf.sh                 exportação simples de deck em PDF (Chrome headless)
  ebook-to-pdf.sh                exportação simples de ebook em PDF (fallback)
  ebook-to-pdf-livro.js          exportação "modo livro" de ebook (recomendado, ver docs/)
docs/
  EXPORTACAO-PDF.md              como exportar PDF e as armadilhas de rasterização já conhecidas
```

## Por que as cores vivem em dois arquivos (`brand-tokens.json` e `brand-tokens.css`)

`brand-tokens.json` é o cartão de identidade, pensado para ser lido e editado por humano (ou preenchido por uma conversa de configuração). `brand-tokens.css` é a mesma informação em formato de variáveis CSS (`--primary`, `--secondary` etc.), que toda a engine (decks e ebooks) consome — nenhum outro arquivo da engine usa cor em hex direto, só essas variáveis. Trocar a marca é editar esses dois arquivos; o resto do sistema segue sem precisar de nenhuma outra mudança.

## O que este pacote NÃO inclui

De propósito, para ficar um sistema de design reaproveitável por qualquer negócio, sem depender do contexto de um segmento específico:

- Agentes de geração de conteúdo (redator, revisor, verificador etc.) — aqui o próprio Claude monta o HTML seguindo o contrato documentado nos dois `SKILL.md`, sem uma esteira de múltiplos agentes especializados.
- Formatos de conteúdo pré-definidos (ex.: "aula única", "treinamento executivo") e regras editoriais de um segmento específico.
- Acervo de fotos e qualquer conteúdo de exemplo específico do negócio original.

Se algum dia fizer sentido reaproveitar esse tipo de esteira, ela pode ser recriada do zero em cima deste pacote, já com a marca configurada.
