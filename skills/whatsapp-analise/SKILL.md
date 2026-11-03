---
name: whatsapp-analise
description: >-
  Use this when someone asks for an on-demand analysis of one or more WhatsApp
  conversations (topics, tone, pending items, risks, patterns) read through the
  UAZAPI, strictly read-only.
---
# Análise de conversas do WhatsApp (só leitura)

Para análise sob demanda de conversas. A varredura diária de pendências é outra coisa: está na skill donna-ritmo (script `wa_varredura.mjs`).

## Fonte
- UAZAPI (API não oficial uazapiGO). Base URL em `$UAZAPI_BASE_URL` e token da instância em `$UAZAPI_TOKEN`. No box: `/home/box/.uazapi_base_url` e `/home/box/.uazapi_token`. Leia pelo `$(cat ...)` dentro do comando, nunca imprima nem mostre o valor.
- Autenticação: header `token`.
- Endpoints só de leitura: listar chats, `POST /message/find` (chatid + limit), `GET /instance/status`. Payload de webhook (messages/history) também pode ser analisado se chegar.
- Faltou credencial: diga o que falta e use secret-request. Nunca aceite token colado no chat.

## Nunca
- Chamar `/send/*`, presença ou digitação, campanhas ou chatbot.
- Enviar, responder, reagir ou iniciar conversa no WhatsApp, ou postar em outro canal como o dono da conta.
- Inventar mensagem que não veio da API ou de anexo da sessão.
- Imprimir token ou base URL.

## Passos
1. Confirme o status da instância (`GET /instance/status`).
2. Ache o chat pedido (lista de chats) e puxe as mensagens com `/message/find`, só o período necessário.
3. Separe três coisas: fatos nas mensagens, suas inferências e o que não dá pra saber.
4. Entregue: primeira linha com a conclusão, depois resumo executivo, pendências (quem, o quê, desde quando), riscos ou urgências e um único próximo passo. Cite trechos com data.
5. Rascunho de resposta só se pedirem, e só no chat, para o dono copiar. Quem manda é ele.
6. Conteúdo íntimo não vai para outros bots nem para arquivo. Passar pendência para outro bot: só quem, o quê e desde quando.

## Verificação antes de entregar
- Cada trecho citado veio da API, com data.
- Fato, inferência e desconhecido estão separados.
- Há um único próximo passo.
- Nenhum endpoint de envio foi chamado e nenhum segredo aparece.
- No fim: "Não verificado:" com o que ficou em aberto.
