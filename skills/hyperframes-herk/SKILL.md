---
name: hyperframes-herk
description: >-
  Use para autorar e renderizar composição HyperFrames (HTML+GSAP) no box: cards, legendas, transições e motion em 1080×1920. Use hyperframes-cli só pelos comandos lint/render/doctor; nunca preview em porta sem ok.
---

# HyperFrames (rascunho ANA)

## Box (este ambiente)

Instalação local: `/workspace/tools/herk-edit-kit` (commit `10511e5af86fc47756ea89803b397422e2d89284`, 14/10/2026 09:51 America/Sao_Paulo; licença MIT do kit; HyperFrames Apache-2.0). Este arquivo é um **rascunho** em `skills-ana/` — **não** está na biblioteca compartilhada (`/home/box/agent-data/workflows`). Skill original do repositório: `.claude/skills/hyperframes/`.

Node v24.22.1, ffmpeg/ffprobe 7.1.5, Chrome do HyperFrames já baixado no cache. Telemetria do HyperFrames foi desligada (`npx hyperframes telemetry disable`).

**Nunca publicar, nunca abrir preview em porta exposta sem ok do Lucas.**

Não use `npx hyperframes preview`, `npx serve`, túnel, nem `scripts/transcribe-elevenlabs.mjs`, `motion-showreel/scripts/kie.mjs` ou `motion-showreel/scripts/sfx.mjs`. Sem chave de terceiro (ElevenLabs, Kie.ai, OpenAI, Groq, Gemini, ClickUp).

### Identidade ANA

Fundo `#050811`, acento ciano, títulos em Orbitron, texto em Inter (fontes já instaladas no box: `fc-list | grep -E "Orbitron|Inter"`). Monte as composições **direto em 1080×1920**. Não reutilize logo, tokens ou exemplos da AIS (a licença do kit reserva esses materiais).

### Transcrição local (comando que funcionou)

Modelo: faster-whisper **small** (multilíngue, CPU, `int8`), já em cache em `~/.cache/huggingface/hub/models--Systran--faster-whisper-small` (~462 MB de blobs). venv: `/workspace/tools/herk-edit-kit/.venv-whisper` (faster-whisper 1.2.1). O helper oficial `scripts/transcribe-elevenlabs.mjs` só chama ElevenLabs — **não** tem ponto de troca. Use este script, que grava o JSON com `text`, `audio_duration_secs` e `words[].text|start|end` que os cortes exigem:

```bash
# Se a origem for um MP4, extraia o áudio para uma pasta de trabalho (não altere /workspace/cortes):
ffmpeg -y -i ORIGEM.mp4 -vn -ac 1 -ar 16000 -c:a pcm_s16le /workspace/tools/herk-edit-kit/tmp-ana/clip.wav

/workspace/tools/herk-edit-kit/.venv-whisper/bin/python \
  /workspace/tools/herk-edit-kit/scripts-ana/transcribe-faster-whisper.py \
  /workspace/tools/herk-edit-kit/tmp-ana/clip.wav \
  -o /workspace/tools/herk-edit-kit/tmp-ana/clip.json \
  --model small --language pt --device cpu --compute-type int8 --local-only
```

O script converte o áudio com ffmpeg+numpy (o PyAV 19 que veio no venv é incompatível com faster-whisper 1.2.1). Normaliza gravações baixas (pico < 0.4). Não ligue `--vad` por padrão: o VAD apagou fala sob trilha no teste. Para ligar o kit, troque o passo "ElevenLabs Scribe" das skills originais por este comando e use o JSON gerado.

### Render de teste que funcionou (sem preview)

O demo oficial é 1920×1080 e 8 s. Serve para provar o renderer; para Reel da ANA, crie a composição já em 1080×1920.

```bash
cd /workspace/tools/herk-edit-kit && npm run demo
cd /workspace/tools/herk-edit-kit/video-projects/demo
npx hyperframes lint
npx hyperframes render --quality draft --output renders/demo.mp4
```

Saída: `/workspace/tools/herk-edit-kit/video-projects/demo/renders/demo.mp4`. Não rode `npx hyperframes preview`.


## Quando usar

Construir ou renderizar uma composição HyperFrames no kit: title card, overlay, legenda sincronizada, transição, motion com GSAP. Para o fluxo completo de Reel falado, comece em `short-form-edit`. Para receitas Remotion, use `video-shotcraft`.

## Sobreposição

- **video-shotcraft**: outro renderer (Remotion + Chromium próprio). Não misture projetos. As regras de porta, publicação, 1080×1920 e fontes já estão lá.
- **cortes-de-video**: ffprobe, extração de frame e ficha de entrega ficam nessa skill.
- A skill original `hyperframes-cli` foi fundida aqui: use `lint`, `render` e `doctor`. Não use `preview`, `tts` pago, nem `transcribe` do HyperFrames (ele depende de whisper.cpp, que **não** está no box; a transcrição é o faster-whisper acima).

## Comandos no box

```bash
cd /workspace/tools/herk-edit-kit
npx hyperframes doctor          # diagnóstico; não sobe servidor
cd video-projects/<slug>
npx hyperframes lint
npx hyperframes render --quality draft --output renders/<nome>.mp4
```

Comando de teste já provado: ver bloco "Render de teste" acima. Resultado: 1920×1080, 8.0 s, H.264 yuv420p, 30 fps, 1 275 986 bytes, sem áudio. Frames extraídos não saíram pretos.

Crie projetos novos com `cd /workspace/tools/herk-edit-kit && npm run new-video -- <slug>` e altere `data-width="1080" data-height="1920"` (e o CSS) **antes** do primeiro render de Reel.

Preferir `@font-face` local (Orbitron/Inter do box) em vez do download de Google Fonts que o compiler fez no demo. Fundo `#050811`, acento ciano.

Auxiliares copiados: `references/` (captions, typography, transitions, motion-principles, css-patterns, audio-reactive, dynamic-techniques, transcript-guide), paletas, `house-style.md`, `patterns.md`, `scripts/`. Ignore `references/tts.md` para qualquer TTS pago (ElevenLabs/HeyGen); não configure Kokoro sem um pedido à parte.
