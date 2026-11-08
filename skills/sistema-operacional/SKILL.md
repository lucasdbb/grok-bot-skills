---
name: sistema-operacional
description: >-
  Use this when running the operating system of a small company or startup as
  its COO or operations lead: building a weekly scorecard, preparing or
  recording a management ritual, tracking quarterly OKRs, chasing overdue tasks
  and meeting commitments, picking the one constraint to attack, or reading team
  health (stalled work, lost handoffs, unverified claims, silent routines).
  Generic method; company facts come from the agent's own brief and sources.
---
# Sistema operacional de empresa pequena

Método para um COO de time enxuto (3 a 10 pessoas). Os fatos da empresa (metas, donos, links, rituais) vêm sempre das fontes da empresa, nunca deste arquivo.

## 1. Placar semanal (escrito, sem reunião)
- Por área, no máximo 1 a 3 indicadores. Para cada resultado (venda, receita, retenção), ache pelo menos 1 indicador de esforço que o dono controla (conversas feitas, tempo de resposta, entregas no prazo). Resultado sem indicador de esforço ligado a ele é um buraco: aponte.
- Pareie quantidade com qualidade para não distorcer (ex.: volume de atendimentos com reclamação ou retrabalho).
- Cada linha: indicador, dono humano, meta, realizado, no rumo ou fora, fonte e data da leitura.
- Meta só vem da fonte oficial ou do decisor. Sem meta escrita: "meta ausente". Sem dado: "dado ausente". Nunca estime.
- Comente só as exceções (o que saiu do rumo). O resto fica na tabela.
- Se um indicador de esforço sobe semanas seguidas e o resultado não mexe, proponha trocar o indicador.
- Esqueleto da segunda (quem rodou, FEITO ou TRAVADO, linhas "Trava" e "Precisa de decisão"): não monte à mão, rode `python3 /workspace/grok-bot-scripts/coo-ana/consolida_relatorios.py --config <arquivo com um bot por linha, fora do repo> [--semana AAAA-Www] [--saida <arquivo .md fora do repo>]`. Ele lê `/workspace/ana/relatorios/<bot>/AAAA-Www.md`; no config, `<bot> sem-rotina` marca quem não tem rotina. Saída 0 se todos rodaram, 1 se algum faltou ou travou, 2 erro.
- O script só monta o esqueleto. A leitura do COO (exceções, prioridades, gargalo, decisões) continua escrita à mão.
- O placar da segunda inclui o quadro de saúde do time (seção 8), no mesmo envio. Não crie rotina nova só para isso.

## 2. Lista de problemas e solução em ritual
- Problema aparece durante a semana: registre na lista (uma frase, área, evidência). Não resolva na hora.
- Priorize por Gravidade x Urgência x Tendência (1 a 5 cada) quando a empresa usar essa matriz; senão, por impacto no caminho crítico.
- No ritual, trabalhe só os 3 primeiros, em ordem: identificar a causa real, discutir, decidir. Cada um sai com uma ação, um dono e um prazo.
- Indicador ou meta fora do rumo no placar vira item da lista automaticamente.
- Sinal de saúde que dispara (seção 8) e for exceção também entra na lista.

## 3. Prioridades e OKRs
- Ciclo curto (mês): no máximo 3 prioridades coletivas, cada uma com um dono humano. Escreva também o que não será feito.
- Trimestre: 1 a 3 objetivos, 2 a 4 resultados-chave cada. Resultado-chave descreve mudança mensurável, não tarefa (evite "lançar", "fazer", "concluir" sem número).
- Marque cada OKR como compromisso (espera 100%) ou ambição (60 a 70% já é bom) na hora de escrever.
- Toda semana: valor atual e confiança do dono de 1 a 10. Confiança caindo é alerta, mesmo sem o número mexer.
- Meio do trimestre: recalibrar. Fim: nota de 0 a 1 por resultado-chave e 1 aprendizado.

## 4. Compromissos em aberto
- Leia atas e resumos de reunião. Todo "vou fazer", "fica com" ou "até tal dia" vira compromisso: quem, o quê, prazo, fonte.
- Compromisso sem tarefa correspondente no quadro é loop aberto. Liste e proponha a tarefa ao dono do quadro.
- Tarefa vencida, sem dono ou sem prazo entra na lista de pendências com o próximo passo concreto.

## 5. Gargalo da vez (teoria das restrições)
- Uma restrição por vez: o ponto onde o trabalho empilha (aprovação de uma pessoa, agenda de um sócio, um passo manual).
- Ordem: identificar com evidência; usar melhor o que já existe (tirar tarefa que outro faz, subir alçada); alinhar o resto ao ritmo da restrição; só então ampliar (contratar, comprar, automatizar); voltar ao início quando ela mudar de lugar.
- Em empresa pequena a restrição costuma ser o tempo do fundador. Diga isso quando a evidência mostrar.

## 6. Rituais
- Pauta enviada com antecedência, no modelo oficial da empresa: números, prioridades, destravar, tarefas, fora de escopo.
- Ata no mesmo dia: decisões com dono e prazo, tarefas espelhadas no quadro, próximo ritual com data. Página vazia conta como ritual não feito.
- Não crie reunião nova para resolver falta de disciplina; primeiro faça o placar escrito funcionar.

## 7. Rotinas
- Cada rotina tem horário fora de :00 e :30, só liga com aprovação e fica quieta quando nada mudou desde a última leitura.
- Saída curta: primeira linha com o status; depois só o que mudou ou o que precisa de decisão.

## 8. Saúde do time
Não instale um programa externo para isso e não invente leitura que você não tem. Use só as fontes do próprio COO: quadro de tarefas, relatórios da semana, páginas de ritual, handoffs e qualquer status que der para ler. Fonte inacessível vira "dado ausente". Nunca estime. Não reporte custo, token nem gasto: o produto não expõe esse número.

Um estado por bot ou área, o pior primeiro: esperando você → parado no meio → repetindo → ficou quieto → idade desconhecida → nenhum sinal disparou. "Nenhum sinal disparou" não é "saudável".

Vereditos fechados para cada afirmação de "feito":
- passou: você abriu a evidência (link, página ou arquivo) e ela sustenta o que foi dito
- bloqueou: a evidência contradiz ou o trabalho está errado
- em espera: o último passo pede uma pessoa ou uma aprovação
- parcial: você não conseguiu verificar
Parcial e "não consegui verificar" nunca aprovam e nunca marcam um card como feito. Quem executou não verifica o próprio trabalho. O COO verifica e não faz o trabalho da área no lugar dela.

Cada sinal que disparar traz o nome, a evidência, a fonte, a data e o que ele não prova.

Os 12 sinais:
1. Parado — último evento inacabado, não é pedido a uma pessoa, e passou o prazo ou dois dias úteis sem novidade. Não prova que o bot travou: a plataforma pode estar lenta.
2. Loop — três atualizações seguidas quase iguais, sem evidência nova. Não prova repetição de pensamento: só parece igual no texto.
3. Silencioso — sem saída desde o último relatório devido, ou fio vazio. Não prova falha: fio vazio não é fio que falhou.
4. Esperando humano — o último evento é um pedido a uma pessoa. Não prova que o bot está bloqueado: ele pode ter seguido em outro lugar. Este estado ganha de "ficou quieto" no mesmo bot.
5. Primeira resposta — só se as fontes tiverem hora de atribuição e de primeira atualização. Sem isso: "dado ausente". Não prova esforço: recado não é trabalho.
6. Handoff perdido — houve passagem nomeada para um colega e, depois, nenhuma mensagem ou status dele na janela da semana. Não prova que a passagem foi ignorada para sempre: a janela é finita.
7. Desvio de elenco — quem deveria reportar nesta semana (lista do placar) não é quem reportou. Não prova erro: a lista pode ter mudado de propósito.
8. Queima de cota — não dispare e não reporte custo, token ou dinheiro.
9. Espera de aprovação — o trabalho parou num pedido de ok (gravar página, publicar, gastar, card oficial). Não prova que alguém consegue destravar só pelo fio: pode faltar dado.
10. Afirmação sem prova — alguém disse que terminou e não há evidência posterior que você tenha aberto. Não prova que o trabalho está errado: ausência não é desprova.
11. Choque de dono — dois bots se apresentaram como donos da mesma superfície (caixa, quadro, número, publicação) no mesmo ciclo. Não prova que um arquivo foi sobrescrito: só que a posse ficou ambígua.
12. Rotina silenciosa — o horário declarado já passou e o bot não produziu saída. Não prova que a rotina quebrou: ela pode nunca ter sido ligada.

No radar do dia, liste só sinais novos ou que pioraram. Se nenhum sinal novo disparou, diga isso e não repita o quadro inteiro — e mesmo assim não escreva que o time está saudável.

## 9. Checagem final
- Cada número tem fonte e data. Cada ação tem dono humano e prazo. No máximo 3 prioridades e 1 gargalo.
- "Feito" só com evidência aberta. Parcial nunca aprova.
- Nada foi enviado a terceiros nem gravado em sistema oficial sem aprovação.
- Termine com "Não verificado:" e o que ficou em aberto.
