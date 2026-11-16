---
name: remotion-to-hyperframes
description: >-
  Use para portar código Remotion (e afins) para uma composição HyperFrames 0.9.45 no box e conferir quadro a quadro. Não renderize no video-shotcraft dentro deste fluxo, e não publique.
---

# remotion-to-hyperframes (rascunho ANA, HyperFrames 0.9.45)

## Box (este ambiente)

Instalação e CLI: ver `../hyperframes/SKILL.md`. Auxiliares oficiais nesta pasta (`references/`, `scripts/`); texto oficial em `SKILL.oficial.md`. Este arquivo é um **rascunho** — **não** está em `/home/box/agent-data/workflows`.

**Nunca publicar, nunca usar cloud ou login e nunca abrir porta sem ok do Lucas.**

Sem `preview`, `share`, `auth`, `billing` ou cloud render. Não rode o usage beacon. Telemetria desligada como na skill `hyperframes`. Não altere `/workspace/tools/video-shotcraft` nem `/workspace/tools/shot` ao portar: copie a fonte para uma pasta de trabalho em `/workspace/tools/hyperframes/` ou no projeto do job.

### Identidade ANA

Fundo `#050811`, acento ciano, Orbitron e Inter, saída **1080×1920**. Se a fonte Remotion for 1920×1080, traduza a composição já em 9:16; não assente um 16:9 no retrato com barras.

### Comando de render que funcionou

A conversão Remotion em si não foi testada nesta instalação. Depois de portar, renderize com o CLI local, no mesmo padrão já provado:

```bash
export HYPERFRAMES_NO_TELEMETRY=1 DO_NOT_TRACK=1 HYPERFRAMES_NO_UPDATE_CHECK=1
export HYPERFRAMES_CONFIG_DIR=/workspace/tools/hyperframes/.hf-config HYPERFRAMES_AGENT=1
cd /workspace/tools/hyperframes/test-ana
/workspace/tools/hyperframes/.local-cli/node_modules/.bin/hyperframes render \
  --quality draft \
  --output /workspace/tools/hyperframes/out/teste-1080x1920.mp4 \
  --no-browser-gpu
```

Para um projeto portado, troque o diretório e o `--output`. O lint de fonte Remotion oficial é `python3 <esta-pasta>/scripts/lint_source.py <dir-fonte>`. Diff quadro a quadro: `hyperframes diff` (ver `SKILL.oficial.md`), sempre local.

## Sobreposições

- Não há rascunho equivalente em `herk-edit-kit/skills-ana/`.
- **video-shotcraft**: é o renderer Remotion já instalado no box. Use-o quando a entrega for continuar em Remotion. Use esta skill só para migrar para HyperFrames. Não misture `node_modules` nem o Chromium dos dois.

## Referência oficial

Siga `SKILL.oficial.md` e `references/` (api-map, eval, limitations). Ignore Beacon, Studio/preview e qualquer passo de login ou publicação.
