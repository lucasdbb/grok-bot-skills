---
name: Agendar Reunião
description: >-
  Use quando o usuário pedir para marcar, agendar ou propor horários de reunião
  com alguém: verifica a agenda, propõe 3 a 5 horários livres e redige a
  mensagem, sem agir antes da aprovação.
---
# Agendar Reunião

## Quando usar
Quando o usuário pedir para marcar, agendar ou propor horários de reunião com alguém.

## Inputs necessários
- Nome da pessoa ou e-mail
- Assunto ou objetivo da reunião
- Duração estimada (padrão: 30 minutos)
- Período preferido (ex.: esta semana, próxima semana, manhã, tarde)
- Acesso ao calendário do usuário

Se faltar quem é a pessoa, o assunto ou o período, pergunte antes de continuar. A duração pode assumir o padrão de 30 minutos.

## Passos
1. Verificar a disponibilidade real no calendário do usuário no período solicitado, no fuso dele.
2. Identificar de 3 a 5 horários livres em que a duração caiba inteira.
3. Priorizar o horário comercial (9h às 18h), a menos que o usuário diga o contrário.
4. Se a pessoa já propôs horários, priorizar os que coincidem com a agenda livre do usuário.
5. Montar uma proposta clara de horários.
6. Redigir um rascunho de mensagem ou e-mail para a pessoa, com os horários propostos e o assunto.
7. Mostrar tudo ao usuário antes de qualquer ação.

## Validação (antes de mostrar)
- Confirmar que cada horário proposto está realmente livre no calendário.
- Verificar que não há conflito com outras reuniões.
- Checar se a duração cabe inteira no bloco livre.

## Saída esperada
- Lista de 3 a 5 horários disponíveis, com data, hora de início e hora de fim.
- Rascunho da mensagem ou do e-mail para enviar.
- Indicação do horário recomendado, quando houver preferência clara.

## Aprovações
- Nunca enviar e-mail ou mensagem, nem criar evento no calendário, sem aprovação explícita do usuário.
- Sempre mostrar o rascunho e os horários antes de agir.
- Criar o evento só depois que o usuário confirmar o horário escolhido.

## Tratamento de erro
- Se o calendário não estiver acessível, parar e avisar o usuário.
- Se não houver horários livres no período pedido, avisar e sugerir outro período.
- Se faltar informação importante (pessoa, assunto ou período), perguntar antes de continuar.
