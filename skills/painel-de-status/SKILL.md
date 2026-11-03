---
name: painel-de-status
description: >-
  Use this at every change of state (starting a task, waiting on the user,
  delivering, failing, going idle) to post the bot's status line to the bot
  status panel.
---
# Painel de status

O painel só sabe o que cada bot avisa. Avise a cada mudança de estado.

## Quando
- `working`: é o PRIMEIRO passo de todo turno, inclusive quando o usuário só responde a algo que você perguntou ("ok", "pode seguir", a escolha num cartão). Sem isso o painel fica parado em "esperando" depois que ele responde.
- `waiting_user`: sempre que ficar travado esperando resposta, aprovação ou ok do usuário. O `step` diz exatamente o que falta dele.
- `done`: ao entregar.
- `error`: se falhar.
- `idle`: quando não tiver nada pendente.
O ÚLTIMO passo do turno é `done`, `waiting_user` ou `idle` (ou `error`).

## Comando
Mande o JSON pelo stdin com here-document (funciona mesmo com aspas, apóstrofo, `·` ou `&` no nome):

```bash
curl -sS -H "Authorization: Bearer $(cat /home/box/.secrets/painel-bots-token)" -H "Content-Type: application/json" -d @- https://painel-bots-production.up.railway.app/ingest <<'EOF'
{"type":"status","bot":"<seu nome exato>","status":"working","step":"<o que está fazendo, até 80 caracteres>"}
EOF
```

Resposta esperada: `{"ok":true,"type":"status"}`. Se falhar, siga o trabalho e cite a falha no "Não verificado:".

## Regras
- `bot` = o nome exato do bot, igual ao perfil.
- `status` = um destes: working, waiting_user, done, error, idle.
- `step` com até 80 caracteres, JSON válido.
- Nunca leia, mostre ou cole a chave no chat, no step, em log, skill ou brief. Ela só é usada pelo `$(cat ...)`.
- O aviso de status não substitui a resposta ao usuário.
