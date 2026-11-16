---
name: media-use
description: >-
  Use para obter ou tratar mídia local de um projeto HyperFrames 0.9.45 no box (trilha, sfx, imagem, transcrição, recorte, grade). Só ferramentas locais e gratuitas, sem login HeyGen e sem créditos.
---

# media-use (rascunho ANA, HyperFrames 0.9.45)

## Box (este ambiente)

Instalação e CLI: ver o rascunho `../hyperframes/SKILL.md`. Auxiliares oficiais nesta pasta; texto oficial em `SKILL.oficial.md`. Este arquivo é um **rascunho** — **não** está em `/home/box/agent-data/workflows`.

**Nunca publicar, nunca usar cloud ou login e nunca abrir porta sem ok do Lucas.**

Sem chave de API, sem `hyperframes auth`, `billing`, `media-use generate` pago, `heygen` CLI, Voice Turbo, catálogo HeyGen, avatar ou clone de voz. Não rode o usage beacon (`hyperframes events`). Telemetria desligada como na skill `hyperframes` (`HYPERFRAMES_NO_TELEMETRY=1`, `HYPERFRAMES_CONFIG_DIR=/workspace/tools/hyperframes/.hf-config`).

### Identidade ANA

Fundo `#050811`, acento ciano, Orbitron e Inter, composições em **1080×1920**.

### Comando de render que funcionou

O resolve de mídia não foi testado nesta instalação. O render local de prova está na skill `hyperframes`:

```bash
export HYPERFRAMES_NO_TELEMETRY=1 DO_NOT_TRACK=1 HYPERFRAMES_NO_UPDATE_CHECK=1
export HYPERFRAMES_CONFIG_DIR=/workspace/tools/hyperframes/.hf-config HYPERFRAMES_AGENT=1
cd /workspace/tools/hyperframes/test-ana
/workspace/tools/hyperframes/.local-cli/node_modules/.bin/hyperframes render \
  --quality draft \
  --output /workspace/tools/hyperframes/out/teste-1080x1920.mp4 \
  --no-browser-gpu
```

Para mídia, prefira o que já está no box ou arquivos do projeto em `assets/`. Se for rodar o resolver, force local: `--local-only` (ver `references/setup-providers.md`). Transcrição: no kit herk o caminho provado é faster-whisper local; não use ElevenLabs Scribe nem o transcribe pago da HeyGen. `remove-background` e geradores locais (MusicGen, Kokoro, FLUX) só se já estiverem instalados e depois de um ok se forem baixar modelo grande.

## Sobreposições

Não há rascunho `media-use` em `herk-edit-kit/skills-ana/`. Não substitui `cortes-de-video` (ffmpeg + Magnific com ok). Não use esta skill para publicar ou para comprar crédito HeyGen.

## Referência oficial

Leia `SKILL.oficial.md` e `references/` só para os fluxos locais (resolve com `--local-only`, treatments, grading, setup-providers). Ignore sign-in, créditos, `media-use generate` pago e receitas `heygen`.
