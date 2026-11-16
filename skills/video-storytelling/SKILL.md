---
name: video-storytelling
description: >-
  Use para desenhar a camada visual de um vídeo falado como um mundo contínuo por onde a câmera se move, com cards e destaques sincronizados ao transcript, em 1080×1920 na identidade ANA.
---

# Video storytelling (rascunho ANA)

## Box (este ambiente)

Instalação local: `/workspace/tools/herk-edit-kit` (commit `10511e5af86fc47756ea89803b397422e2d89284`, 14/10/2026 09:51 America/Sao_Paulo; licença MIT do kit; HyperFrames Apache-2.0). Este arquivo é um **rascunho** em `skills-ana/` — **não** está na biblioteca compartilhada (`/home/box/agent-data/workflows`). Skill original do repositório: `.claude/skills/video-storytelling/`.

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

Quando o pedido é "desenha os gráficos", "o vídeo parece feito por IA", "está textual demais" ou "planeja a camada visual" de um talking-head. Para o Reel completo, use `short-form-edit` e chame esta skill na etapa de motion.

## Sobreposição

- **video-shotcraft** e **short-form-edit**: não copie receitas Remotion nem o planejamento de hook/payoff. Aqui entra só a gramática visual (mundo persistente, câmera, spotlight, loops espaciais) aplicada em HyperFrames.
- **cortes-de-video**: crop, QA e ficha não se repetem aqui.

## No box

Trabalhe sobre o transcript retempo (`mistakes-transcript.json` ou o JSON do Whisper). Composições em 1080×1920, fundo `#050811`, acento ciano, Orbitron/Inter. Render com `npx hyperframes render`. Sem preview e sem publicação.

Leia `reference/design-system.md` nesta pasta, mas troque tokens do Nate/AIS pelos da ANA. O design system original não é a identidade da marca.
