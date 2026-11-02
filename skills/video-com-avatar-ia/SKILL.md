---
name: video-com-avatar-ia
description: >-
  Use this when turning a script into a talking-avatar video with the HeyGen
  connector (user-Heygen): checking credits, choosing avatar, voice, engine and
  format, estimating cost, getting a per-video yes, generating, polling,
  downloading and checking the result. Also covers consent for custom avatars
  and AI-content labeling.
---
# Vídeo com avatar de IA (HeyGen)

Índice oficial da documentação: https://developers.heygen.com/llms.txt

## 0. Conexão (antes de tudo)
- Use só o conector `user-Heygen` (já autenticado, OAuth). Nada de chave de API, secret-request ou curl com chave. Rode GetDynamicTools no namespace `user-Heygen` antes da primeira chamada para confirmar nomes e parâmetros.
- Se o conector não responder ou pedir auth, pare e diga ao Lucas para reconectar a HeyGen nas configurações. Não troque por API com chave.
- Créditos: `get_current_user` traz plano, créditos ou saldo restantes e billing. Anote o saldo antes de gerar.
- Erro de verificação de telefone: o dono precisa verificar no app. Crédito insuficiente: pare e avise.
- O conector cobra créditos do plano web (hoje assinatura creator). Diga isso no cartão.

## 1. Roteiro
- Escreva como fala: frases curtas, gancho na primeira, uma ideia, chamada no fim. Até 5.000 caracteres por cena.
- Duração estimada = palavras ÷ 2,5 por segundo (cerca de 150 por minuto).
- Termos difíceis: glossário de marca (`list_brand_glossaries`; criar com `create_brand_glossary` só com ok) e `brandGlossaryId` no vídeo.
- O `script` vai verbatim, como aprovado.

## 2. Escolher avatar, voz e motor (só leitura, grátis)
- Avatares: `list_avatar_groups` (`ownership`: `private` para os do Lucas, `public` para presets) e depois `list_avatar_looks` com `groupId` (filtros `avatarType`, `ownership`). O look id é o `avatarId`. Confira `supported_api_engines` e `preview_image_url`. Nunca invente nem troque o avatar em silêncio.
- Vozes: `list_voices` com `language: "Portuguese"`, `gender`, `type` (`public` ou `private` para clones); ouça `preview_audio_url`. Sotaque vem da voz, não do `locale`.
- Voz de outro serviço (ex. clone na ElevenLabs): gere o áudio lá e passe `audioAssetId` ou `audioUrl` (lip-sync). Mutuamente exclusivo com `script`.
- Motor (`engine.type`): `avatar_iv` (padrão, foto e gêmeo, aceita `motionPrompt`/`expressiveness` em foto); `avatar_v` (gêmeo elegível, maior fidelidade, mais caro); `avatar_iii` (mais barato, 4K em gêmeo).

## 3. Cartão do plano (sempre antes de gerar)
Mostre: roteiro final; avatar (nome, tipo, motor); voz (nome, idioma, prévia ouvida sim/não); formato e resolução; fundo; legenda (.srt sempre, queimada sim/não); duração estimada; custo estimado em créditos; créditos atuais (`get_current_user`); via: conector HeyGen. Termine com "Posso gerar?". Sem "sim" para aquele vídeo, não gere.

Custo estimado (confirmar no painel, os preços mudam):
- Créditos por minuto do plano: Avatar III foto 7, vídeo 4; Avatar IV foto 16, gêmeo 31; Avatar V 48; movimento expressivo +40; Video Agent 40.
- Arredonde para cima e some 10% de folga. Uma regeneração custa de novo.

## 4. Gerar (só depois do sim)
`create_video_from_avatar`, uma chamada por vídeo:
- `avatarId` (look confirmado), `script` + `voiceId` (ou `audioAssetId`/`audioUrl`), `aspectRatio: "9:16"`, `resolution: "1080p"`, `background: {"type":"color","value":"#050811"}`, `caption: {"file_format":"srt"}`, `title` = nome do arquivo; opcional `engine`, `brandGlossaryId`, `folderId`.
- Legenda queimada pela HeyGen: `caption: {"file_format":"srt","style":"default"}`. Para legenda na identidade da marca, gere sem queimar e queime no box com ffmpeg (skill cortes-de-video).
- Várias cenas ou trechos de vídeo próprio: `create_video_from_studio`. Prompt livre: `create_video_agent` com avatar e voz fixos, a duração no prompt e `mode: "chat"` para revisar antes. Mesmo cartão e mesmo "sim".
- Um vídeo por vez. Guarde `videoId`, custo estimado e hora no log.

## 5. Acompanhar e baixar
- `get_video` com `videoId` a cada 30 s (ou o atraso que o servidor devolver). Nunca reenvie a criação para checar progresso. Depois de 5 min, diga o status e o `video_page_url` e retome depois. Demora em geral 5 a 10 vezes a duração.
- `completed`: baixe `video_url` e `subtitle_url` na hora (links expiram). `failed`: leia `failure_message`, explique e não tente de novo sem novo ok.
- Rode `get_current_user` de novo e anote o custo real.

## 6. Conferir no box
- `ffprobe`: resolução, duração (perto da estimada), faixa de áudio, 25 fps.
- Frames do começo, meio e fim: avatar certo, boca sincronizada, sem artefato no rosto ou nas mãos, fundo certo.
- Compare a .srt com o roteiro aprovado; anote palavra trocada ou pronúncia errada.

## 7. Avatar e voz próprios (consentimento)
- Só da própria pessoa que pediu, ou com autorização escrita dela guardada. Tudo aqui só com ok explícito.
- Gêmeo digital: `create_digital_twin` com 15 a 600 s de filmagem (ideal 2 min, 1080p, uma pessoa de frente, fala clara; arquivo grande via `create_asset_upload` + `complete_asset_upload`). Depois `create_avatar_consent` com o group id gera link de 24 h; a pessoa grava a declaração na webcam. Só gere vídeo com consentimento aceito.
- O gêmeo clona a voz da filmagem automaticamente (voz padrão do avatar).
- Foto-avatar não tem etapa de consentimento na HeyGen; a responsabilidade é de quem cria. Mesma regra: só da própria pessoa.
- Clone de voz instantâneo: `create_instant_audio_voice` (ou `clone_voice`), 1 a 3 min de áudio limpo, idioma `pt`. Antes de repetir, confira o status para não duplicar.

## 8. Rótulo de IA ao publicar
- Diga na ficha: marcar "feito com IA" (Instagram/Meta, YouTube, TikTok) e incluir uma linha na legenda do post. Confira a regra atual da rede.
- Nunca use avatar para fingir depoimento de cliente ou fala que a pessoa não aprovou.

## 9. Fechar
Ficha por arquivo + "Não verificado:" (ex.: pronúncia não ouvida inteira, rótulo da rede não conferido, custo final ainda não refletido nos créditos).
