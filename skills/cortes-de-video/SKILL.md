---
name: cortes-de-video
description: >-
  Use this when pulling short clips, thumbnails, stills or cleaned screenshots
  out of existing footage, sizing each for its destination, and writing captions
  and alt text, using ffmpeg on the box. Optionally uses paid HeyGen tools (AI
  Clipping, filler-word removal) only with a per-job yes.
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

## 3b. Ferramentas pagas da HeyGen (opcional, só com sim por job)
- Padrão é ffmpeg, que é grátis. Ofereça a HeyGen só quando ajuda de verdade, com o custo no pedido.
- Cortes automáticos: `POST /v3/ai-clipping` com `video` (asset_id ou URL pública), `output_settings.duration_types` ("30", "60", "180", "long"), `aspect_ratio` portrait, `captions` false para queimar a legenda da marca no box, `prompt` editorial até 500 caracteres. Cobra por corte gerado. Devolve `virality_score`; trate como palpite, não como verdade.
- Tirar "é…", "né" e silêncio longo: `POST /v3/filler-word-removals`, cobrado pela duração da fonte, mínimo 1 minuto.
- Upload: `POST /v3/assets` até 32 MB; acima disso, upload direto (até 200 MB).
- Baixe o resultado logo (links expiram) e confira como qualquer outro corte.

## 4. Frames e thumbnails
- Frame exato: `ffmpeg -ss TEMPO -i bruto.mp4 -frames:v 1 -q:v 2 frame.png`
- Candidatos: um frame a cada N segundos (`-vf fps=1/N`) e escolha por nitidez, olhos abertos e expressão.
- Redimensione para o destino e deixe área livre para o título.
- Screenshot para documentação: recorte, borre dado pessoal (e-mail, nome de cliente, token) e confirme que nada sensível ficou visível.

## 5. Ficha
Por arquivo: destino, tamanho em px, duração, nome no padrão `AAAA-MM-DD_tema_destino_vN`, legenda do post fiel à fala, texto alternativo descritivo (quem, o quê, texto na imagem), caminho ou link.

## 6. Conferir
- ffprobe em cada saída: resolução, duração, faixa de áudio.
- Abra um frame do começo, do meio e do fim.
- Legenda conferida contra a transcrição.
- Se usou HeyGen, registre id do job e custo na ficha.
- Termine com "Não verificado:".
