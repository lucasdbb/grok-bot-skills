---
name: cut-mistakes
description: >-
  Use depois de cut-silences para propor cortes de gagueira, repetição, falso começo e retake. Só renderiza os cortes aprovados. Exige transcript com tempo por palavra. Não publique e não suba servidor de review.
---

# Cut mistakes (rascunho ANA)

## Box (este ambiente)

Instalação local: `/workspace/tools/herk-edit-kit` (commit `10511e5af86fc47756ea89803b397422e2d89284`, 14/10/2026 09:51 America/Sao_Paulo; licença MIT do kit; HyperFrames Apache-2.0). Este arquivo é um **rascunho** em `skills-ana/` — **não** está na biblioteca compartilhada (`/home/box/agent-data/workflows`). Skill original do repositório: `.claude/skills/cut-mistakes/`.

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

Depois de `cut-silences`, para limpar gagueira, palavra repetida, falso começo e retake. Toda proposta passa por revisão: o detector mecânico não distingue ênfase ("nunca, nunca") de erro.

## Sobreposição

- **cortes-de-video §3b**: `POST /v3/filler-word-removals` da HeyGen cobre muletas e é pago por duração. Aqui o fluxo é local e com aprovação. Não use a HeyGen sem ok por job.
- **cortes-de-video §6**: use a conferência de ffprobe e frames de lá no MP4 final; não reescreva essa lista.

## Fluxo

```bash
cd /workspace/tools/herk-edit-kit

# 1) Candidatos (entrada = silence-transcript.json)
node .claude/skills/cut-mistakes/scripts/find-cut-candidates.mjs \
  video-projects/<slug>/assets/<stem>.silence-transcript.json \
  --out-dir video-projects/<slug>/assets

# 2) Revise o .cut-candidates.md, aprove ou recuse, e grave approved-cuts.json:
#    { "cuts": [ { "start": 12.3, "end": 12.8, "reason": "falso começo" } ] }

# 3) Aplicar só o aprovado
node .claude/skills/cut-mistakes/scripts/apply-cuts.mjs \
  video-projects/<slug>/assets/<stem>.silence-transcript.json \
  --cuts video-projects/<slug>/assets/approved-cuts.json \
  --video video-projects/<slug>/assets/edited-silenced.mp4 \
  --output video-projects/<slug>/assets/edited-clean.mp4 --apply
```

A skill original sugere `npx serve . -p 8080` para o HTML de review gerado por `scripts/build-edl-review.mjs`. **Não suba esse servidor nem exponha a porta sem ok do Lucas.** Abra o HTML localmente ou extraia frames com ffmpeg, como em `cortes-de-video` seção 4.

Passe `*.mistakes-transcript.json` e o MP4 limpo para o motion (`hyperframes`, `video-storytelling` ou `hyperframes-video-beats`).
