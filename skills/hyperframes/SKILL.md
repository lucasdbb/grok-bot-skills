---
name: hyperframes
description: >-
  Use para autorar e renderizar composição HyperFrames oficial 0.9.45 (HTML+GSAP) no box, em 1080×1920. Não use o CLI 0.7.109 do herk-edit-kit nem o Remotion do video-shotcraft neste fluxo.
---

# HyperFrames oficial (rascunho ANA, 0.9.45)

## Box (este ambiente)

Instalação local: `/workspace/tools/hyperframes` (tag `v0.9.45`, commit `fe8d93056cbec121367fc6cfd2dbcab0bc7f17ee`, 14/11/2026, licença Apache-2.0). CLI local, sem `npm -g`: `/workspace/tools/hyperframes/.local-cli/node_modules/.bin/hyperframes` (pacote `hyperframes@0.9.45`). Este arquivo é um **rascunho** em `skills-ana/` — **não** está na biblioteca compartilhada (`/home/box/agent-data/workflows`). Texto oficial completo: `SKILL.oficial.md`, com auxiliares nesta pasta (`references/`, `scripts/`, `assets/`).

**Nunca publicar, nunca usar cloud ou login e nunca abrir porta sem ok do Lucas.**

Não rode `hyperframes preview`, `present`, `share`, `auth`, `billing`, `cloud`, `templates pull`, `events`, nem `usage`. Sem chave de API (HeyGen, ElevenLabs, Figma, visão). Sem túnel. Não configure nem rode a skill `reverse-any-video` (Pro paga). Não altere `/workspace/tools/herk-edit-kit` (HyperFrames fixado em 0.7.109), `/workspace/tools/video-shotcraft` nem `/workspace/tools/shot`.

Não chame `npx hyperframes`: no kit isso cai na 0.7.109, e um `npx` solto pode baixar outra versão. Use o binário local acima.

### Telemetria (desligada e conferida)

Opt-out oficial: `HYPERFRAMES_NO_TELEMETRY=1` (também vale `DO_NOT_TRACK=1`). Config isolada, para não escrever em `~/.hyperframes` do kit:

```bash
export HYPERFRAMES_NO_TELEMETRY=1
export DO_NOT_TRACK=1
export HYPERFRAMES_NO_UPDATE_CHECK=1
export HYPERFRAMES_CONFIG_DIR=/workspace/tools/hyperframes/.hf-config
export HYPERFRAMES_AGENT=1
```

O `.env` do projeto só aceita `HYPERFRAMES_NO_TELEMETRY` e `DO_NOT_TRACK`; as outras variáveis precisam estar no ambiente. Conferência: `hyperframes telemetry status --json` deve mostrar `"enabled": false` e `"source": "HYPERFRAMES_NO_TELEMETRY"`. Não rode o "usage beacon" (`hyperframes events --skill=...`).

### Identidade ANA

Fundo `#050811`, acento ciano (`#00E5FF`), títulos em Orbitron, texto em Inter (já no box: `fc-list | grep -E "Orbitron|Inter"`). Monte as composições **direto em 1080×1920**. Prefira `@font-face` local (`assets/fonts/`) e GSAP local (`assets/vendor/gsap.min.js`, no teste veio de `gsap@3.15.0` no `.local-cli`). Não baixe Google Fonts nem o GSAP da CDN no render.

### Comando de render que funcionou (14/11/2026)

Composição de teste: `/workspace/tools/hyperframes/test-ana/index.html` (3 s, 1080×1920). Saída: `/workspace/tools/hyperframes/out/teste-1080x1920.mp4` (H.264 yuv420p, 30 fps, 90 frames, 3,000 s, 39 381 bytes, sem áudio). Frames em `out/frame-inicio.png`, `out/frame-meio.png` e `out/frame-fim.png` não saíram pretos (fundo ~#050811, texto ANA, faixa ciano).

```bash
export HYPERFRAMES_NO_TELEMETRY=1
export DO_NOT_TRACK=1
export HYPERFRAMES_NO_UPDATE_CHECK=1
export HYPERFRAMES_CONFIG_DIR=/workspace/tools/hyperframes/.hf-config
export HYPERFRAMES_AGENT=1

cd /workspace/tools/hyperframes/test-ana
/workspace/tools/hyperframes/.local-cli/node_modules/.bin/hyperframes render \
  --quality draft \
  --output /workspace/tools/hyperframes/out/teste-1080x1920.mp4 \
  --no-browser-gpu
```

Depois: `ffprobe -v error -show_entries format=duration,size:stream=codec_name,width,height,r_frame_rate,pix_fmt -of json` e extraia um frame com `ffmpeg -ss 1.5 -i ... -frames:v 1 -q:v 2 frame.png`.

O render sobe um file server local só para a captura e baixa o Chrome do HyperFrames em `~/.cache/hyperframes/chrome` se faltar. Isso não é preview e não expõe porta pública, mas não use `preview`/`present`.

## Sobreposições

- **`/workspace/tools/herk-edit-kit/skills-ana/hyperframes/`**: sobrepõe esta skill. Manter as duas (runtimes 0.7.109 vs 0.9.45). Não mesclar e não atualizar o pin do kit. Ver `../README.md`.
- **video-shotcraft**: Remotion, outro renderer. Não misture o projeto.
- **cortes-de-video**: ffmpeg sobre footage já gravado; ffprobe, extração de frame e ficha de entrega continuam lá.

## Contrato e trabalho

Siga o contrato e o formato em `SKILL.oficial.md` e em `references/` (format, motion, captions, look, types/vertical). Ignore no oficial: usage beacon, abrir Studio/preview, `auth`, `usage --json` de plano, `share`, cloud render e qualquer ponte para `/reverse-any-video`.
