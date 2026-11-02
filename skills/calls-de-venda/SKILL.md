---
name: calls-de-venda
description: >-
  Use antes e depois de uma call de venda consultiva. Antes: pesquisa pública do
  lead, pré-diagnóstico (dor provável, perguntas para o lead dizer a dor,
  objeções esperadas, checagem do decisor) e roteiro de venda desafiadora
  (Verdade → Confronto → Consequência → Novo caminho → Ação) em 1 página.
  Depois: resumo pós-call (dor, objeções, fechou ou o que falta), rascunho de
  follow-up, data do próximo contato e nota semanal de aprendizados.
---
# Calls de venda: pré-call e pós-call

O método vem do treinamento da Tainah Porto (Viver de IA), no Notion 📚 Conhecimento: https://app.notion.com/p/3fc7e086a02f8190bd28d9b96d761c05. Releia a página quando houver dúvida. Ela não tem banco de perguntas nem respostas prontas a objeções, então tudo o que você gerar é sugestão e vem marcado assim.

## A. Achar a call
1. Leia o calendário combinado no fuso combinado. É call de venda quando há convidado externo e o título ou a descrição indica diagnóstico, apresentação ou venda, ou quando o convidado está na base de leads.
2. Evento privado (terapia, consulta, saúde, Aline): pule sem abrir nada. Evento ambíguo: não pesquise, liste como "não identificada" e pergunte.
3. Repetir não duplica: se já existe prep para aquele evento e horário em `/workspace/vendas/prep/`, só atualize o que mudou.
4. Se a fonte falhar (agenda, base, web), diga qual falhou e o que ficou de fora. Nunca use dado velho.

## B. Pesquisa do lead (só dado público e profissional, LGPD)
- Primeiro o que é grátis: a base interna de leads e o histórico (notas, inspeções e calls anteriores). Depois o site do escritório e a busca na web. O perfil do Instagram vem por último e só dentro do teto de créditos do bot.
- Colete: nome, escritório, cidade/UF, área de atuação, porte (sinais: nº de advogados no site, equipe, sócios), presença digital (posts recentes, frequência, posicionamento) e gatilhos com data e link.
- Cada dado leva link. Se não achou, escreva "não achado", e o porte sem número vem como [estimativa] com o sinal usado.
- Sem site nem Instagram aberto: recomende pedir um resumo da operação antes da call. Isso vai como rascunho de mensagem, e só o Lucas envia.

## C. Resumo pré-call (1 página, nesta ordem)
1. **Cabeçalho:** lead, escritório, data e hora (fuso local), link do evento, quem vai estar na call.
2. **Quem é:** 3 a 5 linhas com fonte.
3. **Pré-diagnóstico:** a dor provável e o custo de ficar parado, marcados [hipótese] e cada um ligado a um sinal da pesquisa. "Isso é sintoma ou problema?"
4. **Perguntas para o lead dizer a dor em voz alta:** 4 a 6 perguntas abertas que levem o lead a verbalizar a dor e o custo de não resolver ("quanto mais sim, melhor"). Inclua uma pergunta de ROI.
5. **Objeções esperadas**, de 2 a 4, com a resposta sugerida. Comece pelas recorrentes do material: tempo, não entender a entrega, sócio, esposa, dinheiro. Some as do histórico do lead.
6. **Decisor:** "Confirmar no início se quem decide está na call." Se houver indício de sócio, sugira pedir a presença dele antes, com um rascunho de mensagem.
7. **Roteiro de venda desafiadora**, em uma frase por passo e adaptado à dor provável:
   - Verdade ("existe algo aqui que você ainda não enxergou")
   - Confronto ("a maneira como você está pensando está incompleta")
   - Consequência ("se continuar assim, o que vai acontecer?")
   - Novo caminho ("existe uma maneira diferente, e eu já tenho ela pronta"), mostrando só o que resolve a dor dita e vendendo a promessa, não o formato
   - Ação ("agora você precisa decidir")
8. **Fechar na call:** "vou pensar" costuma ser não. Leve o próximo passo concreto. Na negociação, quem fala primeiro perde.
9. **Hábito da vez** (se existir um diário de coaching): uma linha.
10. **Não verificado:** o que não deu para conferir.

Salve em `/workspace/vendas/prep/AAAA-MM-DD-HHMM-<lead>.md`.

## D. Pós-call (a partir da transcrição, nunca de sessão privada)
1. **Resumo:** a dor nas palavras do lead (trecho + minuto), as objeções ditas (trecho + minuto) e o status: **FECHOU**, **NÃO FECHOU** (com motivo) ou **EM ABERTO** (o que falta: decisor, dinheiro, prazo, entendimento).
2. **Follow-up:** rascunho no tom do Lucas, curto, retomando a dor dita e trazendo 1 próximo passo. Nunca envie.
3. **"Vou pensar" ou "vou falar com alguém":** sugira a data do próximo contato, em até 2 dias úteis salvo prazo dito pelo lead, e explique por quê.
4. **Aderência ao roteiro:** quais dos 5 passos apareceram, com trecho. Isso é registro, não nota. A nota de desempenho é do coaching.
5. Salve em `/workspace/vendas/pos-call/AAAA-MM-DD-<lead>.md`. Repetir não duplica.

## E. Nota semanal de aprendizados
Fonte: os arquivos de pós-call da semana. Nada vem de memória.
- **O que os leads pediram** e **do que reclamaram**, agrupados, com contagem e 1 trecho de exemplo cada.
- **Objeções mais comuns**, com contagem.
- **Sinais de ICP:** o perfil de quem fechou contra quem não fechou (área, porte, cargo, cidade, origem do lead) e as dores mais comuns. São hipóteses, e com menos de 5 calls na semana isso precisa ser dito.
- Salve em `/workspace/vendas/insights/AAAA-MM-DD.md`, com uma seção para cada destino (oferta, produto, prospecção).

## Verificação
- Cada trecho bate letra por letra com a transcrição e tem minuto.
- Cada dado do lead tem link. Hipótese e estimativa vêm marcadas.
- Nenhuma mensagem foi enviada e nenhum evento privado foi aberto.
- Data e hora no fuso local. Fim com "Não verificado:".
