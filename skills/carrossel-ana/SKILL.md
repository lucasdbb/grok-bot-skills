---
name: carrossel-ana
description: >-
  Use quando precisar dos arquivos finais (PNG/PDF) de um carrossel da A Nova
  AdvocacIA (ANA) com texto exato e a marca travada (Instagram 4:5, quadrado ou
  9:16). Renderiza slides a partir de um JSON; não escreve a copy.
---
# carrossel-ana

Gera carrossel com a marca da ANA a partir de um JSON de slides. O texto sai exato (fonte de verdade, não imagem de IA), em PNG 1080×1350 por padrão, mais PDF opcional. Baseado no projeto MIT threads-carousel (itchernetski), adaptado: só existe o estilo `ana`.

## Quando usar
- Carrossel ou slide com texto (lista, passo a passo, comparação, citação, CTA). Texto em imagem de IA sai torto; aqui não.
- Visual sem texto (foto, cena, textura): continue com geração de imagem.
- A copy vem de quem é dono dela (DM ANA / Copy Max Peters, estrutura via `ig-carousel` e `metodo-3-pilares-instagram`). Esta skill só desenha; não invente número, fonte nem citação de pessoa real.

## Onde está
- Ferramenta: `/home/box/tools/carrossel-ana/` (`render.mjs`, `template/`, `README.md`, `LICENSE`).
- Exemplos de entrada: `exemplos/5-erros-advogados-ia.json`, `exemplos/tipos-extras.json`.

## Passos
1. Monte o JSON: lista de slides, ou `{ "format": "4x5", "slides": [...] }`. 6 a 10 slides; abra com `hook`, feche com `cta`.
2. Rode:
   `node /home/box/tools/carrossel-ana/render.mjs --slides slides.json --out ./saida --pdf`
   - `--format 4x5` (1080×1350, padrão) | `1x1` (1080×1080) | `9x16` (1080×1920).
   - Saída: `01-<tipo>.png`, `02-<tipo>.png`… e `carrossel-ana.pdf`.
   - 1ª vez ou template mudado: ~15 s (faz build; precisa de internet para as fontes). Depois ~3 s.
3. Confira antes de entregar: abra os PNGs (Read) e veja acentos, nada cortado, handle certo. O script já falha sozinho se a fonte não carregar, o tipo for inválido ou o tamanho não bater.
4. Entregue os PNGs (e o PDF) e diga o que não verificou.

## Tipos e campos
Comuns: `badge`, `title`, `highlight` (palavra em ciano), `text` (`\n` quebra linha).
- `hook`: `text`, `highlight`, `title` (subtítulo)
- `body`: `title`, `text` ou `points[{type:"plus"|"minus", text}]`
- `list` / `checklist`: `items[]` (até 5)
- `process`: `steps[{title, text?}]` (até 4)
- `comparison`: `leftLabel`, `leftItems[]`, `rightLabel`, `rightItems[]` (3–4 por coluna)
- `quote`: `text`, `highlight`, `author`, `role`
- `stats`: `stats[{value, label}]` (só números com fonte)
- `number`: `bigNumber`, `title`, `text`
- `emoji`: `emoji`, `title`, `text` (emoji do sistema, não da marca; use pouco)
- `image`: `imageSrc` (copie o arquivo para `template/public/images/` e use `/images/arquivo.png`), `imageCaption`
- `cta`: `text`, `highlight`, `handle` (sem handle aparece `@handle`; nunca invente o @)

## Marca (travada no código)
Deep Space #050811, Electric Cyan #00F0FF, Aurora Purple #6366F1, Holographic Gold #D4AF37 (só aspas e números), Neural White, glass, fundo Neural Constellation. Orbitron (títulos), Inter (corpo), JetBrains Mono (badges). Nunca fundo claro nem cor quente. Para mudar a marca, edite `template/src/lib/presets.ts` e rode de novo (rebuild automático).

## Nunca
- Segredo, dado de cliente identificável ou número inventado no slide.
- Publicar ou postar: entregue os arquivos para quem pediu.
