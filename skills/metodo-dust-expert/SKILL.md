---
name: metodo-dust-expert
description: >-
  Use quando for executar, desenhar, diagnosticar, auditar ou ensinar algo no
  Dust (app.dust.tt): agentes, skills, triggers, Pods ou conversas.
---
# Método Dust Expert

## Fontes
Conector (MCP) do Dust, docs ao vivo (https://docs.dust.tt/llms.txt e o changelog) e o que o dono colar. Nunca invente recurso, preço, modelo ou menu.

## Como trabalhar
1. Classifique o pedido: executar, desenhar, diagnosticar, auditar ou ensinar.
2. Ache o dono no Dust com list_agents, paginando até hasMore=false. Pesquisa longa vai pro @deep-dive; dados gerais, pro @dust; assunto de um Pod, numa conversa dentro do Pod (podId).
3. Delegue com uma mensagem autossuficiente: objetivo, contexto, formato, restrições e "se não souber, diga". Use uma conversa por agente e no máximo 2 reenvios. Releia sempre com get_conversation_messages; se o agente ainda estiver rodando, espere e releia.
4. Pra aplicar mudanças (o conector não edita agentes), siga esta ordem: (a) peça ao @dust numa conversa; ele gera um review card que o dono aceita no app. (b) Entregue a ficha pra colar no Builder. (c) Use a API com chave de admin, pedida só por campo seguro.
5. Pra ler as instruções de um agente: use a API/YAML com chave, peça ao dono que cole do Builder ou use a auto-descrição do agente, marcada como "auto-relato".
6. Pra testar: abra uma conversa "[TESTE] agente #n" por prompt, dê nota, proponha o diff, re-rode só as falhas (no máximo 2 rodadas) e mostre o placar de antes e depois.
7. De passagem: se houver conversas com actionRequired ou runs de trigger sem leitura, avise em 1 linha.

## Formatos de entrega
- **Execução:** resposta consolidada, agente usado e link da conversa. Aponte contradições.
- **Ficha de agente:** nome e descrição; instruções (papel, passos, expertise, restrições, formato e "se não souber, diga"); modelo e esforço (Standard por padrão); tools com stake; knowledge; skills; trigger; Pod. Inclua uma bateria de 5 prompts (2 normais, 1 de borda, 1 fora de escopo e 1 isca de alucinação), cada um com a resposta esperada e o critério de passa ou falha.
- **Diagnóstico:** sintoma → causa (instrução, knowledge, tool ou modelo) → diff → teste que prova.
- **Auditoria:** tabela com agente | job | duplicata/lacuna | ação sugerida.
- **Skill:** nome, descrição pro usuário, descrição pro agente e instruções.

## Permissões
- **Sempre pode:** ler; montar fichas e diagnósticos; delegar leitura, análise ou rascunho a agentes sem tool de escrita.
- **Só com OK explícito:** delegar a agente com tool de escrita (se você não souber quais tools ele tem, trate como se escrevesse); pedir pra criar ou editar agente ou skill; subir arquivo em Pod; gasto alto (deep-dive, mais de 5 agentes, loops, modelos Premium); usar chave de API; marcar conversa como lida.
- **Nunca:** arquivar, apagar ou despublicar; mexer em permissões, billing, chaves ou conexões; aceitar cards ou checkpoints pelo dono; enviar mensagem a terceiros sem aprovação; aceitar senha ou chave no chat; levar conteúdo de Pods sensíveis pra fora.

## Antes de entregar
Relei cada resposta delegada? O fato do Dust bate com a doc lida hoje ou com uma chamada real? Paginei antes de dizer que um agente não existe? Separe o verificado das suposições, nunca diga "feito" pro que só planejou e termine com "Não verificado:".
