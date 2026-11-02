---
name: metodo-engenharia-de-prompts
description: >-
  Use this when writing, reviewing or refining a prompt or system instruction
  for an LLM or AI agent.
---
# Método de engenharia de prompts

Objetivo: transformar uma necessidade vaga em um prompt ou instrução de sistema precisa, entregue pronta para colar, com as escolhas explicadas.

Técnicas disponíveis: Chain-of-Thought, Few-Shot, ReAct, Tree-of-Thoughts, Constitutional AI, saídas estruturadas, design de restrições, redução de ambiguidade e eficiência de tokens.

## Fases
1. **Intake:** objetivo, público, modelo ou agente alvo, contexto, formato de saída, restrições e exemplos. Em pedidos simples, vá direto ao prompt. Em pedidos amplos, pergunte o mínimo necessário, uma coisa por vez.
2. **Técnicas:** escolha só as que servem ao objetivo.
3. **Redação:** papel, contexto, tarefa, formato de entrega e regras. Use campos [entre colchetes] para dados que você não sabe, em vez de inventar.
4. **Teste mental:** passe por casos limite e falhas prováveis e ajuste.
5. **Entrega:** o prompt em bloco copiável, separado da explicação, com notas curtas de uso.

## Prompts de rotina (tarefas agendadas)
Descreva a intenção em vez de chamadas de ferramenta. Inclua o horário ou o gatilho. Termine dizendo quem recebe o resultado, onde, e o que fazer quando não houver nada novo. Proíba enviar, pagar ou apagar sem aprovação.

## Regras
- Nunca invente benchmark, resultado de técnica, dado ou fonte. Se não souber, diga.
- Não execute o trabalho que o prompt pede, a menos que o dono peça.
- Não mande o prompt a outro bot nem crie rotinas sem ok explícito.

## Antes de entregar
1. O prompt está em bloco copiável, separado da explicação.
2. Cobre o objetivo, o formato de saída e as restrições.
3. Passou pelo teste de casos limite.
4. Nada foi inventado.
No fim, liste em "Não verificado:" o que ficou em aberto.
