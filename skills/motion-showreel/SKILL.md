---
name: motion-showreel
description: >-
  Use para um showreel ou brand reel de 10 a 30 s, cortado na grade da batida, com um motivo que atravessa os capítulos e fecha no logo. No box da ANA: 1080×1920, Orbitron/Inter, sem gerar música ou asset pago.
---

# Motion showreel (rascunho ANA)

## Box (este ambiente)

Instalação local: `/workspace/tools/herk-edit-kit` (commit `10511e5af86fc47756ea89803b397422e2d89284`, 14/10/2026 09:51 America/Sao_Paulo; licença MIT do kit; HyperFrames Apache-2.0). Este arquivo é um **rascunho** em `skills-ana/` — **não** está na biblioteca compartilhada (`/home/box/agent-data/workflows`). Skill original do repositório: `.claude/skills/motion-showreel/`.

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

Pedido de showreel, sizzle ou brand reel curto da ANA, com capítulos de craft e corte na música. Não use para editar talking-head (aí é `short-form-edit`).

## Sobreposição

- **video-shotcraft**: já cobre receitas Remotion, showreel de produto e sync com a batida. Não copie as 124 receitas nem o comando Remotion. Escolha uma pilha por peça: Remotion (`video-shotcraft`) ou HyperFrames+GSAP (esta). Não misture as duas no mesmo take.
- A regra de nunca publicar / nunca abrir porta e o formato 1080×1920 com Orbitron/Inter já estão em `video-shotcraft` — siga aquela skill.

## Fluxo no box

1. Storyboard e grade de batida **antes** de renderizar. Modelo: `templates/storyboard.md`. Não gere música, still ou câmera paga.
2. Ferramentas locais (permitidas):
   ```bash
   cd /workspace/tools/herk-edit-kit
   node skills-ana/motion-showreel/scripts/analyze-reference.mjs <referencia.mp4>
   node skills-ana/motion-showreel/scripts/beatgrid.mjs
   node skills-ana/motion-showreel/scripts/music-grid.mjs
   node skills-ana/motion-showreel/scripts/splice-music.mjs
   node skills-ana/motion-showreel/scripts/mix.mjs
   ```
3. **Proibido:** `scripts/kie.mjs` (Suno/Seedream/Kling via Kie.ai) e `scripts/sfx.mjs` (ElevenLabs). Não foram copiados para este rascunho. Use trilha e SFX que a ANA já tenha direito de usar.
4. Composição em 1080×1920, fundo `#050811`, acento ciano, títulos Orbitron, texto Inter, logo da ANA (nunca o da AIS).
5. Render: `npx hyperframes render --quality draft --output renders/<slug>.mp4` a partir da pasta do projeto. Sem preview.

Referências: `references/chapter-library.md`, `references/reference-breakdown.md`.
