---
name: Vídeo para base de Conhecimento
description: >-
  Use quando o usuário pedir para inserir um vídeo, aula, treinamento ou
  gravação (Vimeo, YouTube etc.) numa base de conhecimento do Notion, com resumo
  e link.
---
# Vídeo para base de Conhecimento

## Inputs
- URL do vídeo (como o usuário mandou)
- Database de destino no Notion e suas colunas
- Contexto opcional: quem fala, para que time, data

## Passos
1. Confirme que o usuário pediu a inserção (escrever no Notion exige ok explícito).
2. Leia o schema da database: veja se já existem colunas como Link, Origem, Tema, Data, Usar em. Não crie coluna nova se já houver uma equivalente. Se nenhuma opção de Origem servir, use "Outro" e sugira a nova opção ao usuário.
3. Pegue os metadados com yt-dlp (título, autor, idioma, duração, data de publicação).
   - Vimeo privado: use `https://player.vimeo.com/video/<id>?h=<hash>` com `--referer https://vimeo.com/`.
   - O aviso de falta de runtime de JS do yt-dlp pode ser ignorado; instale o deno só se o download falhar.
4. Transcrição, da mais barata para a mais cara:
   a. Legendas do próprio vídeo (`--skip-download --write-subs --write-auto-subs`). No YouTube, peça primeiro só a faixa original (ex.: `--sub-langs "en-orig"` ou `"pt-orig"`), porque as outras faixas costumam dar erro 429; no Vimeo, peça o idioma do vídeo. Nunca use curingas como `pt.*`.
   b. Se der 429 ou bloqueio, espere uns 20 segundos e tente de novo com `--extractor-args youtube:player_client=web,android,tv`; depois, o pacote youtube-transcript-api.
   c. Whisper local (faster-whisper).
   Nunca use API paga sem ok. Limpe as linhas repetidas da legenda VTT e salve com timestamps em /workspace/<slug>/transcript.txt.
5. Leia a transcrição inteira e escreva no idioma do usuário, sem inventar: um Resumo de 3 linhas e um corpo de página com os temas e seus timestamps, métodos e frameworks, ferramentas citadas, aplicações práticas para o negócio do usuário, frases marcantes e alertas. Se o vídeo for patrocinado ou promocional, deixe isso claro no Resumo e no topo da página. Marque como não checados os números que o autor cita.
6. Crie UMA linha: título real e autor, resumo, origem, tema, link exatamente como o usuário mandou, data (a do evento ou a de publicação), uso. O corpo vai como conteúdo da página.
7. Busque a linha de novo e confira os campos e o link.

## Saída
O link da linha, título e autor, o resumo de 3 linhas, 5 aprendizados principais e os alertas: legenda automática com nomes errados, números e preços não checados, conteúdo que só aparecia na tela ou nos slides, patrocínio.

## Verificação
- A linha foi relida depois de criada.
- Nenhuma outra linha ou página foi alterada.
- Todo fato vem da transcrição.
- No fim, escreva "Não verificado:" com o que ficou em aberto.

## Aprovação
- Escrever no Notion e criar coluna ou opção nova exigem ok do usuário.
- Gastar crédito de API paga exige ok do usuário.
