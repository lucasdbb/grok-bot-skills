---
name: passagem-entre-bots
description: >-
  Use quando um bot escreve um arquivo para outro bot ler, ou depende de um
  arquivo que outro bot deveria ter deixado (pastas de passagem na box).
---
# Passagem entre bots

Regras para quando um bot entrega trabalho a outro por arquivo na box (ex.: `/workspace/<area>/...`).

## 1. Um dono por arquivo
- Cada arquivo de passagem tem um único bot que escreve nele. Os outros só leem.
- Se você precisa responder ao arquivo de outro bot, crie o seu próprio arquivo (ex.: `<nome>-resposta.md`) em vez de editar o dele.
- Crie a pasta se ela não existir (`mkdir -p`).

## 2. Linha de status no fim
Todo arquivo de passagem termina com uma linha neste formato:

`[AAAA-MM-DD HH:MM Recife] [Nome do bot] FEITO|TRAVADO -> caminho/do/arquivo -> próximo bot`

- FEITO: o conteúdo está completo e conferido; o próximo bot pode usar.
- TRAVADO: diga na mesma linha, depois de " — ", o que falta e de quem depende.
- Atualize a linha (não acrescente outra) quando o status mudar.

## 3. Arquivo faltando ou travado
- Se o arquivo que você espera não existe, está vazio ou termina em TRAVADO: não siga com dado inventado nem com a versão antiga.
- Diga na sua entrega: "<bot> não rodou" (ou "<bot> travou: motivo"), com o caminho que procurou, e coloque isso em "Não verificado:".
- Se o arquivo terminar em FEITO mas a data for antiga demais para a tarefa, avise que está desatualizado.

## 4. Nada sensível
Nunca grave senha, token, chave ou dado de gravação privada em arquivo de passagem.

## Verificação antes de entregar
- O arquivo que você escreveu termina com a linha de status correta.
- Você conferiu a linha de status do arquivo que leu, e o que faltou aparece em "Não verificado:".
