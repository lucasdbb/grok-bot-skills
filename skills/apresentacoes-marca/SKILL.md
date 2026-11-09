---
name: apresentacoes-marca
description: >-
  Use ao montar um deck de apresentação HTML (slideshow 16:9) ou um ebook de
  leitura contínua com a identidade visual da marca, inclusive para configurar
  nome, cores e logo na primeira vez e para exportar o resultado em PDF.
---
# apresentacoes-marca

Pacote para gerar decks de apresentação e ebooks de leitura contínua como páginas HTML autocontidas (um único arquivo, sem dependências externas), com exportação em PDF e identidade visual configurável.

Os dois mecanismos (palco de slides e leitura contínua) e os componentes visuais ficam neste diretório. A paleta, o logo e o nome da marca são configuráveis. Este pacote não inclui agentes de geração de conteúdo nem formatos editoriais de um negócio específico.

No Grok Bot não existem os comandos `/deck`, `/ebook` e `/configurar-marca`. Trate esses pedidos como os fluxos abaixo.

## Onde estão os arquivos

Tudo deste pacote vive no diretório desta skill (o Skill tool informa o caminho). Caminhos relativos a partir daí:

- `skills/brand-deck-engine/` — mecânica de palco e tokens de marca (compartilhados com os ebooks)
- `skills/brand-ebook-engine/` — mecânica de leitura contínua
- `templates/deck.html.tmpl` e `templates/ebook.html.tmpl`
- `scripts/deck-to-pdf.sh`, `scripts/ebook-to-pdf.sh` e `scripts/ebook-to-pdf-livro.js`
- `docs/EXPORTACAO-PDF.md`
- `commands/deck.md`, `commands/ebook.md` e `commands/configurar-marca.md` — o processo detalhado de cada fluxo

Há também skills registradas à parte, com o mesmo conteúdo: [brand-deck-engine](sand-workflow:brand-deck-engine) e [brand-ebook-engine](sand-workflow:brand-ebook-engine).

Nome real da camada visual dos decks: `skills/brand-deck-engine/assets/brand-visuals.css` (não `brand-deck-visuals.css`).

## Configuração inicial da marca

Antes do primeiro deck ou ebook, leia `skills/brand-deck-engine/assets/brand-tokens.json`. Se `"configurado"` for `false` ou `"marca"` for `"Sua Marca Aqui"`, pergunte ao usuário (não assuma valores):

1. Nome da marca ou empresa.
2. Cor primária de destaque (hex).
3. Cor secundária de destaque (hex).
4. Arquivo de logo, se existir (opcional).
5. Tipografia própria, se o guia de marca já definir; senão mantenha Sora/Inter/JetBrains Mono.

Grave as respostas como documentado em `skills/brand-deck-engine/SKILL.md` (seção "Antes do primeiro uso"). Não pergunte de novo depois que `"configurado"` estiver `true`. Para trocar a marca depois, siga `commands/configurar-marca.md`. Decks e ebooks já gerados não atualizam retroativamente.

## Como montar um deck

Siga `commands/deck.md` e `skills/brand-deck-engine/SKILL.md`: parta de `templates/deck.html.tmpl`, coloque os assets em linha na ordem documentada e cumpra o contrato de slide. O HTML final é sempre autocontido. Não edite a mecânica (`brand-deck-engine.css`/`.js`) para resolver um problema pontual de um deck.

## Como montar um ebook

Siga `commands/ebook.md` e `skills/brand-ebook-engine/SKILL.md`: parta de `templates/ebook.html.tmpl`, coloque os assets em linha na ordem documentada (tokens e visuals vêm de `skills/brand-deck-engine/assets/`, nunca duplicados) e cumpra o contrato de capítulo. Se o usuário quiser PDF, use `node scripts/ebook-to-pdf-livro.js` e confira a numeração página a página como o comando descreve.

## O que este pacote não inclui

- Esteira de vários agentes redatores ou revisores
- Formatos pré-definidos de aula ou treinamento
- Acervo de fotos e exemplos do negócio original
- Um MCP Playwright extra: o arquivo `.mcp.json` do pacote é do Claude Code e não deve ser instalado automaticamente; use o conector Playwright já existente na conta, se estiver disponível
