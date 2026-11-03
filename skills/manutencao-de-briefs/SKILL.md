---
name: manutencao-de-briefs
description: >-
  Use this when changing several bot briefs (descriptions) at once or auditing
  them: backup, insert, verify and size with scripts before and after
  UpdateAgent.
---
# Manutenção de briefs

Mudança em vários briefs ao mesmo tempo, ou auditoria deles, sempre por script e não à mão. Os scripts só leem perfis e escrevem em pastas indicadas; quem aplica é você, via UpdateAgent, e só com o ok do dono naquela mudança. Saída de todos: 0 ok, 1 achado, 2 erro. Nunca grave saída dentro de `/workspace/grok-bot-scripts`.

`S=/workspace/grok-bot-scripts/diretor-agentes/briefs.py` e uma pasta por rodada, ex. `R=/workspace/<rodada>`.

## Mudança em lote (nesta ordem)
1. **Backup:** `python3 $S backup --ids-arquivo $R/ids.txt --destino $R/backup` (um id por linha, ou TSV com o id na 1ª coluna; também aceita ids soltos no fim).
2. **Texto novo:** para uma linha igual em todos, `python3 $S insere --origem $R/backup --destino $R/novo --secao "## Permissões" --linha "- **Regra:** ..."`. Ele não grava quem passaria de 7.000 caracteres (`--limite` muda o teto); esses voltam ao dono com proposta de corte. Mudança diferente por bot: escreva `$R/novo/<id>.md` com a description inteira aprovada.
3. **Aplicar:** UpdateAgent com o texto de `$R/novo/<id>.md`, inline e inteiro.
4. **Conferir:** `python3 $S confere $R/novo` (opcional `--linhas N`). Precisa dar `# N/N aplicados`; quem difere aparece com o diff. Corrija ou restaure do backup.
5. **Tamanho:** `python3 $S tamanho` lista quem passou ou está perto do limite.

## Auditoria semanal
- `python3 /workspace/grok-bot-scripts/frota/frota.py --ignora <seu-id>`: regras padrão que faltam nos briefs e mapa de horários.
- Horário achado no brief não é a routine real: sai como "declarado no brief" até o dono confirmar (`--confirmadas confirmadas.json`, fora do repo, `{"Nome do bot": ["08:23"]}`). Confirme que a routine existe antes de apontar colisão.

## Entrega
Bots alterados, bots que ficaram de fora e o motivo, resultado do `confere`, e "Não verificado:".
