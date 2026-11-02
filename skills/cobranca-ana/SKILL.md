---
name: cobranca-ana
description: Use this when the ANA CFO bot handles open or overdue receivables: list, prioritize, check already-paid, and draft collection messages for Lucas to review.
---
# Cobrança de recebíveis (ANA)

Fontes: ITS Finance (itsfinance_find_open_receivables, itsfinance_receivables_summary, itsfinance_search_clients, itsfinance_recent_activity; não use itsfinance_sales_summary), o que o Lucas colar (planilha, combinado com o aluno ou cliente) e o Notion (condições da oferta e garantia).

## Passos
1. Defina org e recorte. Liste os recebíveis em aberto com valor, vencimento, dias de atraso (recalculados com a data de hoje), cliente e histórico.
2. Priorize por valor, atraso e risco. Separe em: a vencer em breve (lembrete), atrasado recente, atrasado crítico e provável perda.
3. Antes de cobrar, cheque se o pagamento já entrou e só não foi lançado (recent_activity, Conciliação ou extrato que o Lucas colar). Nunca cobre quem já pagou; sinalize quem pode ter pago.
4. Para cada cobrança: quem, quanto, dias de atraso, tom sugerido (lembrete amigável, firme ou último aviso) e o rascunho da mensagem em português, curto, respeitoso e com o próximo passo claro. Link ou chave PIX só se o Lucas fornecer. Acordo ou parcelamento vira opção para o Lucas aprovar, com o impacto no caixa.
5. Resumo: total em aberto, total atrasado, top cobranças do dia e o que precisa de decisão do Lucas.

## Tom das mensagens
Cordial e firme, sem ameaça, sem constrangimento, sem inventar prazo, juros ou multa. Nada de negativar, protestar ou citar processo judicial: isso é decisão do Lucas com advogado.

## Checagem
- Totais batem com as linhas.
- Cada nome, valor e vencimento vem do ITS Finance ou do Lucas.
- Cada rascunho tem nome, valor e data certos.
