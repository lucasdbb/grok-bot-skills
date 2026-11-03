---
name: gmail-inbox
description: >-
  Use this when triaging Lucas's Gmail inboxes, building the top-5, drafting
  replies, applying GB/ labels, chasing follow-ups or summarizing a thread.
---
# Caixa de entrada do Lucas (Gmail)

## Contas (diga sempre qual leu)
- `user-Gmail--lucas-braga`: lucas@bragaadv.com.br (advocacia, tribunais, OAB, clientes).
- `user-Gmail--its-edu`: contato@itsedu.com.br (ITS EDU/ANA, bancos, pagamentos, SaaS).
- `user-Gmail--lucasdbb`: lucasdbb@gmail.com (pessoal).

## Prioridade
1. Tribunal, intimação, publicação e PJe (stf.jus.br, tjpe/tjpb.jus.br, recorte da OAB-PE).
2. VIPs: sócios Bruno Tibúrcio e Juarez, família (Isa, Emerson), clientes e contador com thread ativa. Lista em /workspace/gmail/vip.md; proponha inclusões a partir de quem ele responde.
3. Dinheiro: cobrança, boleto, fatura, falha de pagamento, banco.
4. Reputação: Reclame Aqui, Procon, aluno ou cliente irritado, pedido de reembolso.
5. O resto.

## Como buscar (economiza tokens)
- `in:inbox newer_than:` com `THREAD_VIEW_METADATA_ONLY`; pagine com `nextPageToken`; só abra (`get_thread`) os candidatos.
- `category:` não funciona neste conector: filtre por remetente e palavra-chave.
- A caixa da advocacia é quase toda newsletter.

## Formatos
- **Top-5:** [conta] remetente · assunto · recebido (Recife) · por que importa · ação (responder / decidir / repassar a X / esperar) · rascunho se precisa de resposta.
- **Rascunho:** conta de envio, para/cc, assunto, corpo completo no tom dele. Parado até o ok.
- **Resumo de thread:** o que pediram, o combinado, o que está aberto e com quem, prazo citado.
- **Arquivo do dia** /workspace/gmail/triagem-AAAA-MM-DD.md: urgente · precisa resposta · aguardando terceiros · repasses · ruído. Uma linha por thread, com conta e link `viewUrl`.

## Regras
- Prazo jurídico: cite a data da publicação e o prazo do texto; contagem em dias úteis é [hipótese] até ele conferir. Não dá parecer, não protocola, não decide prazo.
- Tom: espelhe o que ele já enviou na thread ou à mesma pessoa; sem histórico, profissional e cordial. Nunca prometa prazo, valor ou resultado.
- Sensível (saúde, terapia, Aline, exames, família delicada): nunca em arquivo nem repasse. No chat: "1 e-mail pessoal sensível em [conta]".
- Labels aprovados: GB/Responder, GB/Aguardando, GB/FYI (aplicar e tirar é livre).
- Rascunho real no Gmail (`create_draft`): só pro top-5, até 5 por dia, listados no arquivo do dia.
- Follow-up: thread que ele enviou sem retorno em 3 dias úteis ganha follow-up rascunhado.
- Repasses: boleto/fatura/cobrança da ANA ou ITS EDU → CFO ANA (valor e vencimento, sem pagar); finanças pessoais → Guru Financeiro; lead → DV ANA; aluno → CS ANA; nota pro cofre (só se ele pedir) → Obsidian.
- Só com ok explícito nomeando a ação: enviar, responder, encaminhar; rascunho fora da regra; criar label; arquivar, lixeira ou spam (mesmo 1 thread); descadastrar ou criar filtro; mexer em rascunho que ele escreveu.
- Nunca: confirmar valor ou clicar em link de pagamento; apagar em massa ou esvaziar lixeira; abrir link de login ou baixar anexo executável; informar senha, token ou código; inventar conteúdo de e-mail não lido; fingir que enviou.

## Ritmo (encaixa nas entregas que já existem)
- Briefing da manhã: tria desde a última varredura (segunda: desde sexta) e põe o top-5 com rascunhos no bloco de e-mail.
- Fechamento: atualiza o arquivo do dia; só destaca urgente sem resposta ou rascunho esperando ok.
- Sexta, nas Sugestões: números por conta (recebidas, respondidas, aguardando, mais antiga sem resposta) e top remetentes de ruído com proposta de descadastro ou filtro.
- Radar de urgente (opcional, só se o Lucas ligar): dias úteis de 2 em 2 h, 09h17 a 17h17, só prioridades 1 a 4 novas; sem nada, calado.

## Verificação
1. Releia cada thread citada na hora: remetente, data e conta conferem e ninguém já respondeu.
2. Prazo, valor e data copiados da thread, com link.
3. Rascunho: conta de envio e destinatário certos, nada prometido.
4. Arquivo do dia sem nada sensível e sem thread duplicada.
5. Nada enviado, arquivado, apagado ou rotulado fora do permitido. "Não verificado:" com thread não aberta, prazo não contado ou conta fora.
