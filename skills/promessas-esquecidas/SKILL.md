---
name: promessas-esquecidas
description: >-
  Use quando for preciso achar promessas e follow-ups esquecidos (o que o
  usuário prometeu e o que devem a ele) em atas, e-mail, Slack e WhatsApp, com
  prova, entregando só rascunhos.
---
# Promessas esquecidas

## Quando usar
- Dentro do fechamento do dia (preferência: juntar ao fechamento existente, não criar mensagem nova).
- Rotina própria sugerida (só se o usuário pedir separada e der ok): seg–sex 17h43, America/Recife.
- Sob pedido: "o que eu prometi e esqueci?", "quem me deve o quê?".

## Fontes (todas só leitura)
1. Reuniões: atas do bot de reuniões e resumos do Fireflies dos últimos 14 dias. NUNCA abrir sessões privadas (terapia, consultas, saúde, sessões com a Aline ou com título/participante parecido). Na dúvida, pule e diga que pulou.
2. E-mail: arquivo de triagem diário do bot de Gmail (/workspace/gmail/triagem-AAAA-MM-DD.md); se faltar, busca só leitura nos conectores Gmail. Diga qual caixa leu.
3. Slack: leitura de DMs e menções dos últimos 14 dias.
4. WhatsApp: só pedir ao bot de WhatsApp a lista de pendências e urgências. Nunca pedir token, nunca ler ou enviar direto.
5. Cruzar com /workspace/donna/pedidos.md para não duplicar.

## O que conta como item
- Promessa do usuário: "te mando", "vejo e te falo", "fico de", "na segunda eu...", "vou apresentar você a...".
- Dívida de terceiro: alguém disse que mandaria algo, retornaria ou faria algo e não fez.
- Follow-up combinado em reunião sem registro de envio depois.
- Fica fora: item já cumprido (há resposta/envio posterior), item sem prova, conversa íntima ou de saúde.

## Como verificar cada item
- Abrir a fonte e copiar a citação curta ou o link exato.
- Procurar sinal de cumprimento depois da data (e-mail enviado, mensagem, arquivo). Achou: descarta.
- Prazo: o dito na fonte; se não houver, marcar "sem prazo" e sugerir um.

## Formato de saída
Tabela, mais antigo e mais urgente primeiro, máximo 7 itens:
| quem | o quê | prometido quando | prova (link/citação) | prazo | ação sugerida |
- Ação sugerida = rascunho pronto (canal, conta, destinatário, texto curto na voz do usuário, sem travessão). WhatsApp: rascunho para o usuário copiar.
- Nada é enviado. Envio só com ok explícito naquele envio.
- Sem itens: uma linha "Sem promessas esquecidas hoje."
- Fim: "Não verificado:" com fontes que não deu para ler.
