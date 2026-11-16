---
name: cortes-de-video
description: >-
  Use this when pulling short clips, thumbnails, stills or cleaned screenshots
  out of existing footage, sizing each for its destination, and writing captions
  and alt text, using ffmpeg on the box. Covers the Magnific connector (zoom,
  speech cleanup, royalty-free score, quality upscale) as the standard polish
  step before final delivery, and paid HeyGen tools (AI Clipping, filler-word
  removal) only with a per-job yes.
---
# Cortes de vídeo

## 1. Preparar
- Copie o bruto para uma pasta de trabalho; nunca altere o original.
- `ffprobe -v error -show_entries format=duration:stream=codec_type,width,height,r_frame_rate -of json bruto.mp4`
- Transcrição com tempos (arquivo .srt ou .vtt). Se não houver, gere uma ou peça ao dono; não chute fala.

## 2. Mapa
- 3 a 8 trechos candidatos: início, fim, frase-gancho (da fala), ideia única, destino sugerido.
- Bom trecho: gancho logo no começo, uma ideia, termina em frase completa.
- Mostre o mapa e espere a escolha, salvo se o dono pediu para seguir direto.

## 3. Cortar
- Corte preciso (reencode): `ffmpeg -ss INICIO -to FIM -i bruto.mp4 -c:v libx264 -crf 20 -preset medium -c:a aac -b:a 160k corte.mp4`
- 16:9 para 9:16 com o rosto no centro: `-vf "crop=ih*9/16:ih:X:0,scale=1080:1920"` (ajuste X pela posição do rosto; confira num frame antes).
- 4:5: `-vf "crop=ih*4/5:ih:X:0,scale=1080:1350"`.
- Volume: `-af loudnorm=I=-14:TP=-1.5:LRA=11`.
- Legenda queimada: `-vf "subtitles=corte.srt:force_style='FontName=Inter,FontSize=14,PrimaryColour=&H00FFFFFF,OutlineColour=&H00000000,BorderStyle=1,Outline=2,MarginV=180'"`. Mantenha longe das bordas onde o app põe botões.
- GIF ou loop sem som: `-an` e, para GIF, gere paleta com `palettegen`/`paletteuse`.

## 3a. Acabamento com o Magnific (padrão nos cortes de vídeo gravado)
Regra do dono: nos cortes de vídeo gravado (Modo 1), use o conector Magnific (`user-magnific`) como etapa de acabamento, depois do corte no box e antes da entrega final. O resultado volta para o box e passa pela conferência da seção 6 antes de ser entregue.
- **Quando:** todo corte de vídeo gravado que vai ser entregue. Pule a etapa só se o dono pedir, ou se o corte já estiver limpo e não ganhar nada com ela (diga isso na ficha).
- **O que fazer em cada edição, nesta ordem:**
  1. Zoom/punch-in nos momentos de ênfase: `video_zoom` (grátis). Corte fino também pode ser `video_cut` (grátis).
  2. Limpeza da fala: `audio_clean_speech` (ou `audio_isolate` se houver música ou ruído forte), depois `video_audio_mix` (grátis) para recolocar o áudio limpo.
  3. Trilha sem direito autoral: `video_music` com `mixMode` `lower` (abaixa a trilha sob a fala), ou `audio_music_generate` + `video_audio_mix`.
  4. Melhoria de imagem e qualidade: `video_upscale` (ler `video_upscale_models_list` antes), só quando a fonte estiver abaixo do destino ou com pouca nitidez.
- **Fluxo:** suba o corte do box (`creations_request_upload`, PUT, `creations_finalize_upload`), rode as etapas, espere com `creations_wait` e baixe o resultado para a pasta de trabalho no box (`creations_get` para a URL). Depois normalize de novo para −14 LUFS no ffmpeg se a trilha mudou o volume.
- **Créditos:** o saldo é compartilhado entre os bots. Leitura é livre (`account_balance`, modelos, criações). Antes de cada job pago, rode `simulate_cost` e informe o custo. Registre o saldo antes e depois na ficha. Não faça retry em loop: se uma geração falhar, pare e avise.
- **Limites:** não compartilhe projetos, spaces ou bibliotecas com terceiros e não mande nada para a lixeira. Clone de voz (`audio_voice_clone`) só com pedido explícito do dono e de voz que ele tenha direito de usar.

## 3b. Ferramentas pagas da HeyGen (opcional, só com sim por job)
- Padrão é ffmpeg + Magnific. Ofereça a HeyGen só quando ajuda de verdade, com o custo no pedido.
- Cortes automáticos: `POST /v3/ai-clipping` com `video` (asset_id ou URL pública), `output_settings.duration_types` ("30", "60", "180", "long"), `aspect_ratio` portrait, `captions` false para queimar a legenda da marca no box, `prompt` editorial até 500 caracteres. Cobra por corte gerado. Devolve `virality_score`; trate como palpite, não como verdade.
- Tirar "é…", "né" e silêncio longo: `POST /v3/filler-word-removals`, cobrado pela duração da fonte, mínimo 1 minuto.
- Upload: `POST /v3/assets` até 32 MB; acima disso, upload direto (até 200 MB).
- Baixe o resultado logo (links expiram) e confira como qualquer outro corte.

## 4. Frames e thumbnails
- Frame exato: `ffmpeg -ss TEMPO -i bruto.mp4 -frames:v 1 -q:v 2 frame.png`
- Candidatos: um frame a cada N segundos (`-vf fps=1/N`) e escolha por nitidez, olhos abertos e expressão.
- Redimensione para o destino e deixe área livre para o título.
- Regra do Lucas (14/11/2026): em todo Reel/vídeo da ANA, a chamada (texto) da capa fica sempre centralizada, com a caixa no centro do quadro e o texto alinhado ao centro.
- Screenshot para documentação: recorte, borre dado pessoal (e-mail, nome de cliente, token) e confirme que nada sensível ficou visível.

## 5. Ficha
Por arquivo: destino, tamanho em px, duração, nome no padrão `AAAA-MM-DD_tema_destino_vN`, legenda do post fiel à fala, texto alternativo descritivo (quem, o quê, texto na imagem), caminho ou link. Se usou Magnific, liste as etapas feitas, os ids das criações e os créditos antes e depois.

## 6. Conferir
- ffprobe em cada saída: resolução, duração, faixa de áudio.
- Abra um frame do começo, do meio e do fim (também depois do Magnific: zoom não pode cortar o rosto nem a legenda).
- Legenda conferida contra a transcrição; a fala limpa continua sincronizada.
- Se usou HeyGen ou Magnific, registre id do job e custo na ficha.
- Termine com "Não verificado:".
