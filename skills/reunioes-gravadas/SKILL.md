---
name: reunioes-gravadas
description: >-
  Use this when working with Lucas's recorded meetings on Fireflies: minutes and
  follow-up, ANA sales post-call, coaching of his calls, or social proof from
  client quotes. Privacy rules come first.
---
# Reuniões gravadas do Lucas (Fireflies)

Extrair valor das reuniões gravadas no Fireflies: ata, pós-call das calls de venda da ANA, coaching das calls do Lucas e prova social. Fontes: Fireflies, Google Calendar lucasdbb@gmail.com, o diário de coaching, o banco de prova e /workspace/vendas/. Nunca entra em call ao vivo.

## 1. Privacidade (vem antes de tudo)
O Fireflies também grava sessões privadas: terapia e consultas com a Aline. NUNCA abra transcrição, resumo ou trecho dessas sessões, nem pra conferir.
- Pule sem abrir reunião cujo título ou evento tenha: terapia, consulta, Aline, médico, psicólogo, saúde, sessão pessoal ou parecido.
- Título só com código do Meet: procure no Calendar o evento no mesmo horário antes de abrir. Privado, pule. Sem evento ou ambíguo: NÃO abra, liste como "não identificada" e pergunte.
- Reunião pulada aparece só como "pulada (privada)".

## 2. Entregas
**A. Ata (toda reunião):** título real, data e hora Recife, duração, link `https://app.fireflies.ai/view/{id}` · resumo em 3–5 linhas · decisões com trecho (`?t=segundos`) · tarefas (o quê, dono, prazo, ou "sem dono"/"sem prazo") · pontas soltas · rascunho de follow-up no tom dele. Várias: tabela no topo.

**B. Pós-call de venda ANA** (skill `calls-de-venda` D): dor e objeções (trecho + minuto) · FECHOU, NÃO FECHOU (motivo) ou EM ABERTO (o que falta) · rascunho de follow-up pro Lucas aprovar · "vou pensar": data do próximo contato. Salve em /workspace/vendas/pos-call/ (o DV ANA lê).

**C. Coaching (venda, parceria, patrocínio, negociação):** skill `coaching-de-calls`. Contagens via `python3 /workspace/reunioes/coaching/call_metrics.py <transcript.json> "Lucas"`. Extras: replay de objeção, conserto do próximo passo, banco de perguntas, tendência (3+ calls). Hábito da vez em habito.md (o DV ANA lê no prep).

**D. Prova social (calls, e-mails ou pesquisas de aluno ou cliente da ANA):**
1. Banco /workspace/reunioes/prova/banco.csv: uma linha por frase ou número (texto exato, quem, fonte e minuto, data, afirmação que apoia, aprovação: não pedida / pedida / pública / só anônima / com edição / recusada). Releia antes de usar, grave depois de cada reunião.
2. Entregas: provas da semana · depoimento · case (antes, virada, depois, número dito pelo cliente) · checagem de rascunho alheio · pedido de aprovação rascunhado pro Bruno ou o Lucas enviar.
3. Regras: aspas só no literal; corte com reticências, contexto em [colchetes]; o resto é paráfrase. Recusada nunca mais aparece. Nunca invente cliente, número ou logo. Cliente da Braga Advocacia nunca vira prova (sigilo e Código de Ética da OAB).

## 3. Como trabalhar
- Resumo "skipped": leia a transcrição. Curta, sem falantes ou áudio ruim: diga que não dá pra pontuar.
- Diário de coaching (/workspace/reunioes/coaching/): placar.csv, objecoes.md, perguntas.md, planos/<conta>.md e habito.md. Leia antes, grave depois, compare com a call anterior do mesmo tipo.
- Arquivo pra outro bot: skill `passagem-entre-bots` (FEITO/TRAVADO no fim).
- Um hábito por vez: a dimensão mais fraca e recorrente, até subir em 3 calls seguidas. Coaching é só pro Lucas, nunca pra fora.
- Régua de venda da ANA: método Tainah (skill `calls-de-venda`) e objeções do Notion (hub https://app.notion.com/p/3347e086a02f80f6be9cc672179d8111). Na Braga Advocacia nada de promessa de resultado (Provimento 205/2021 da OAB).
- Franqueza: direta, sempre com o que fazer. Elogio com trecho.
- Contexto: @bragaadv = escritório; Norma, Bruno, Juarez/JG = ANA; Viver de IA e IA na Educação = parceria.

## 4. Ritmo (ofereça uma vez; cada routine só com ok; sem nada, silêncio; Recife)
- Ata do dia, seg–sex 19h07: um pacote, com pós-call de venda.
- Aprendizados de venda, sex 16h47: skill `calls-de-venda` E, em /workspace/vendas/insights/; avisa DV ANA, Produto ANA e Caçador de Vendas.
- Recap de coaching, sex 17h19.
- Provas da semana, seg 10h13.
- Validade da prova, dia 2 às 10h29 (+6 meses ou sem aprovação).
- Treino de objeção, ter e qui 07h57: objeção real do diário, com nota.

## 5. Limites
- Livre: ler reuniões não privadas, Calendar e Notion; rodar o call_metrics.py; gravar no diário, no banco de prova e em /workspace/vendas/; montar ata, pós-call, scorecard, provas e rascunhos.
- Só com ok explícito: tarefa no Notion; enviar follow-up; acionar outro agente (na routine semanal aprovada, o aviso já vale); renomear reunião ou criar soundbite no Fireflies.
- Nunca: publicar prova ou pedir aprovação direto ao cliente; abrir sessão privada; compartilhar, mudar privacidade, mover ou revogar acesso no Fireflies; apagar algo; inventar fala, falante, nota, número, decisão, dono ou prazo; pontuar outra pessoa que não seja o Lucas.

## 6. Verificação
(1) Nenhuma sessão privada aberta. (2) Cada decisão, tarefa e frase está na transcrição, com a reunião citada. (3) Dono e prazo só onde foram ditos. (4) Links do Fireflies batem com os ids. (5) Scorecard com as 6 dimensões, contagens do script, falante do Lucas identificado. (6) Diário e banco atualizados; cada aspa bate letra por letra com a fonte e a aprovação está dita. (7) Follow-up só rascunho, nada enviado. "Não verificado:" com transcrição incompleta, falante errado, reunião não identificada ou erro de conector.
