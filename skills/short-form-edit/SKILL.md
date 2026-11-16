---
name: short-form-edit
description: >-
  Use para transformar bruto falado em Reel 9:16 (1080×1920) com gancho, cortes no transcript, legenda precisa em pt-BR, motion HyperFrames/GSAP e trilha. Não use para filme longo (edit-video) nem para só aparar silêncio (cut-silences).
---

# Short form edit (rascunho ANA)

## Box (este ambiente)

Instalação local: `/workspace/tools/herk-edit-kit` (commit `10511e5af86fc47756ea89803b397422e2d89284`, 14/10/2026 09:51 America/Sao_Paulo; licença MIT do kit; HyperFrames Apache-2.0). Este arquivo é um **rascunho** em `skills-ana/` — **não** está na biblioteca compartilhada (`/home/box/agent-data/workflows`). Skill original do repositório: `.claude/skills/short-form-edit/`.

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

Bruto de talking-head ou VO que precisa virar Reel/Short da ANA, com hook nos 3 primeiros segundos, payoff, legendas sincronizadas e cards de motion. Para só cortar silêncio ou erros, use `cut-silences` e `cut-mistakes`. Para motion de produto com receitas Remotion, use a skill já existente `video-shotcraft`.

## Sobreposição com skills já existentes

- **cortes-de-video** (`/home/box/agent-data/workflows/cortes-de-video/SKILL.md`): não copie daqui o recorte 16:9→9:16, o `loudnorm`, a legenda queimada em Inter, o ffprobe/QA de frames nem o acabamento Magnific/HeyGen. Depois do corte local, siga a seção 3–6 de `cortes-de-video`. HeyGen AI Clipping e filler-word só com ok por job, como já está lá.
- **video-shotcraft** (`/home/box/agent-data/workflows/video-shotcraft/SKILL.md`): não copie o catálogo Remotion, o Ink Press nem os comandos `npx remotion render`. Esta skill usa HyperFrames+GSAP no kit herk. As regras de nunca publicar, nunca abrir porta e montar em 1080×1920 com Orbitron/Inter já valem lá — siga-as, não as reescreva.

## Fluxo no box

1. Copie o bruto para `video-projects/<slug>/assets/` (nunca altere `/workspace/cortes`).
2. Transcreva com o Whisper local acima. Não invente fala. Confira o JSON contra o áudio.
3. Planeje hook, cortes, cenas e legendas no esquema de `references/plan-schema.md`. Valide:
   ```bash
   cd /workspace/tools/herk-edit-kit
   node .claude/skills/short-form-edit/scripts/validate-plan.mjs <plan.json>
   node .claude/skills/short-form-edit/scripts/validate-footage.mjs <plan.json>
   ```
   (cópias iguais também estão nesta pasta `skills-ana/short-form-edit/scripts/`.)
4. Aperte silêncios com `cut-silences` e, com revisão humana, erros com `cut-mistakes`.
5. Monte a composição HyperFrames em **1080×1920**, fundo `#050811`, acento ciano, Orbitron nos títulos, Inter no texto e nas legendas. Prefira as fontes locais do box; não deixe o renderer baixar Google Fonts no take final.
6. Renderize com `npx hyperframes render` (comando de teste acima). Confira com ffprobe e um frame do começo, do meio e do fim, como em `cortes-de-video` seção 6.
7. Entregue o MP4 e o projeto editável. Não publique.

Leia também `docs/EDITING-PLAYBOOK.md` e `docs/SHORT-FORM.md` no kit, mas a identidade visual da ANA prevalece sobre o estilo do Nate. Referências auxiliares desta pasta: `references/quality-gates.md`, `premium-motion-and-footage.md`, `curiosity-and-entertainment.md`, `reference-analysis.md`.
