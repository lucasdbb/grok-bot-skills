---
name: cut-silences
description: >-
  Use para aparar silêncio e ar morto de um talking-head a partir de um transcript com tempo por palavra. Gera EDL, transcript retempo e, com --apply, o MP4 via ffmpeg. Não corta erro, gagueira ou repetição — isso é cut-mistakes.
---

# Cut silences (rascunho ANA)

## Box (este ambiente)

Instalação local: `/workspace/tools/herk-edit-kit` (commit `10511e5af86fc47756ea89803b397422e2d89284`, 14/10/2026 09:51 America/Sao_Paulo; licença MIT do kit; HyperFrames Apache-2.0). Este arquivo é um **rascunho** em `skills-ana/` — **não** está na biblioteca compartilhada (`/home/box/agent-data/workflows`). Skill original do repositório: `.claude/skills/cut-silences/`.

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

Depois da transcrição local, para tirar pausas longas e ar morto do bruto, deixando a fala intacta. Não use para crop 9:16, legenda queimada ou trilha — isso está em `cortes-de-video`.

## Sobreposição

- **cortes-de-video**: o corte fino com `ffmpeg -ss/-to`, o crop para 1080×1920, o `loudnorm` e a conferência de frames já estão lá. Esta skill só calcula e aplica o EDL de silêncio no eixo do tempo. Não duplique esses passos.
- **cortes-de-video §3b (HeyGen filler-word)**: alternativa paga para silêncio longo e muletas. No box, prefira este script local; HeyGen só com ok por job.

## Fluxo

Entrada: JSON do Whisper local (`text`, `audio_duration_secs`, `words[].text|start|end`).

```bash
cd /workspace/tools/herk-edit-kit

# 1) Só planeja: EDL + transcript retempo (não mexe no vídeo)
node .claude/skills/cut-silences/scripts/cut-silences.mjs \
  video-projects/<slug>/assets/clip.json \
  --out-dir video-projects/<slug>/assets

# 2) Com vídeo, ainda sem render
node .claude/skills/cut-silences/scripts/cut-silences.mjs \
  video-projects/<slug>/assets/clip.json \
  --video video-projects/<slug>/assets/raw.mp4 \
  --out-dir video-projects/<slug>/assets

# 3) Render local (ffmpeg)
node .claude/skills/cut-silences/scripts/cut-silences.mjs \
  video-projects/<slug>/assets/clip.json \
  --video video-projects/<slug>/assets/raw.mp4 --apply \
  --output video-projects/<slug>/assets/edited-silenced.mp4
```

Padrões: `--gap 0.55`, `--head-pad 0.22`, `--tail-pad 0.34`. Saídas: `*.silence-edl.json`, `*.silence-transcript.json`, `*.silence-decisions.md`, `*.silence-filter.txt`. Passe o `silence-transcript.json` para `cut-mistakes`.
