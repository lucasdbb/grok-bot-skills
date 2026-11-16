---
name: quadro-dos-bots
description: >-
  Use ao começar e ao terminar qualquer trabalho ou rodada de rotina, para
  criar ou mover o card do bot no Kanban do Notion (✅ Tarefas dos Bots e
  🔁 Rotinas dos Bots, na página Quadro dos Bots). Vale para todos os bots,
  inclusive os da ANA.
---
# Quadro dos Bots (v2, 13/11/2026)

Leia este arquivo com Read (`/home/box/agent-data/workflows/quadro-dos-bots/SKILL.md`): a skill não carrega pelo nome. Página do Kanban: https://app.notion.com/p/4177e086a02f815cb7e3ea5ab109a600. Conector do Notion: `notion-query-data-sources` **só em modo view**, `notion-create-pages` (parent `data_source_id`) e `notion-update-page` (`update_properties`). Rode GetDynamicTools no conector antes de chamar.

## Onde vai cada coisa (decisão do Lucas, 13/11/2026)
- **Toda tarefa de todo bot, inclusive da ANA, vai só na ✅ Tarefas dos Bots.** O Tarefas ANA não recebe tarefa nova de bot.
- **Toda rodada de rotina vai na 🔁 Rotinas dos Bots.**

## Bases
- ✅ Tarefas dos Bots: `collection://1e66149b-cd86-4424-bcac-26f08f72ac0e`. View de tabela: `https://www.notion.so/1fda608399a1432ca5f1efece87ff858?v=e354471fb19048568bfed893a1dc477c`. Campos: Tarefa, Bot, Status (A fazer / Fazendo / Feito), Prazo, Evidência, Observação.
- 🔁 Rotinas dos Bots: `collection://f1cb9911-a24b-49e2-90d2-f392dcc8591f`. View de tabela: `https://www.notion.so/3487345bcb6f49ad97237a4263518536?v=3d7ed389866c48f2a9394878e138334c`. Campos: Rotina, Bot, Quando roda, Próxima execução, Última execução, Resultado (Ok / Falhou / Sem novidade), Status (Agendada / Rodando / Concluída), Observação.
- Bot = opção exata da coluna Bot. Quase sempre é o seu nome; exceções: Caçador de Vendas → `Caçador de Vendas ANA`; Donna → `Donna Secretária · administrativo`; Saúde → `Saúde Lucas`; PLATAFORMA → `Plataforma ANA`.

## Passos
1. **Procure o card antes de criar (modo view, nunca SQL nem rows):**
   `notion-query-data-sources` com `{"data":{"mode":"view","view_url":"<view da base>","page_size":100}}`.
   Se vier `has_more: true`, repita com `start_cursor` = `next_cursor` até acabar.
   Filtre localmente: `Bot` igual ao seu e `Tarefa` (ou `Rotina`) com a mesma palavra-chave/nome. Ache o card: use o `url` dele. Não ache: crie.
2. Ao iniciar trabalho: card existe, mova para Fazendo; não existe, crie em Fazendo com Tarefa curta (até 80 caracteres) e Bot.
3. Ao iniciar rotina: card existe, mova para Rodando; não existe, crie com Rotina, Bot, Quando roda (por extenso) e Status Rodando. Rotina recém-criada que ainda não rodou entra em Agendada.
4. Ao concluir trabalho: mova para Feito e preencha Evidência com link ou caminho do entregável, quando houver.
5. Ao concluir rotina: Status Concluída, Resultado (Ok, Falhou ou Sem novidade), Última execução e Próxima execução (fuso America/Recife).
6. Card já existe: só mova e atualize os campos; nunca duplique.
7. Verificação: releia a view e confira que o card está no Status certo.

## Regras
- Nunca SQL (`mode: sql`) nem `mode: rows` aqui: a cota do workspace estourou ("usage_limit_reached"). O modo view não tem cota.
- Nunca senha, token, chave ou dado privado (saúde, dados da Isa, gravações) no card.
- Não apague card sem ok do Lucas.
- Se o Notion falhar, siga o trabalho e diga na resposta: "Quadro não atualizado", com o erro.
