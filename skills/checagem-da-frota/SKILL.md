---
name: checagem-da-frota
description: >-
  Use this when auditing a fleet of bots for repeated user corrections in their
  conversations, or for wasteful, duplicated or colliding routines and
  inconsistent bot descriptions, and turning the findings into concrete proposed
  fixes.
---
# Checagem da frota

Método genérico para achar atrito e desperdício numa frota de bots. Só propõe; quem aplica é o dono da frota.

## 1. Atrito nas conversas
- Leia só o que chegou desde a última checagem. Guarde a marca de tempo num arquivo.
- Pule por inteiro qualquer trecho sobre saúde, terapia ou assunto privado que o dono marcou. Não cite, não resuma, não registre.
- Sinais: correção explícita do usuário, pedido refeito com outras palavras, pergunta que o brief já responde, ação fora do emprego do bot, "fiz" que não foi feito, nome ou fuso errado, erro repetido de ferramenta.
- Barra: 2 ou mais ocorrências, ou 1 que quebrou regra de segurança. O resto vai para uma lista de observação.
- Cada proposta traz: bot, problema, evidência parafraseada (bot, data), conserto concreto (texto atual e texto novo do brief, skill, rotina) e esforço S/M/L.

## 2. Rotinas
- Inventário: bot, nome, cron, fuso, entrega, se fica quieta sem novidade. Se não der para ver as rotinas ligadas, use o que os briefs declaram e marque como não confirmado.
- Achados: duplicada, frequente demais para a fonte, vazia (manda "nada novo"), colisão de minuto entre bots, minuto cheio (:00, :30), fuso errado.
- Rotina que não cumpre os requisitos (fluxo manual já funcionou, gatilho estável, fonte confiável, dono humano, comportamento definido para falta, dado velho, nova tentativa, duplicado e aprovação) vira proposta de pausar ou voltar ao manual.
- Ordem: gasto de token à toa, depois colisão, depois o resto.

## 3. Briefs
- Nome errado de pessoa, descrição vazia ou só template, falta permissões em três níveis, falta verificação antes de entregar, acima do limite de caracteres ou cortada, dois donos da mesma superfície.

## 4. Veredito por bot
Quando revisar o portfólio, classifique cada bot olhado como: Manter, Aprimorar, Mesclar, Reposicionar, Pausar, Ocultar, Desativar ou Investigar. Prefira o menor conserto (simplificar, corrigir fonte, virar skill de outro bot) antes de propor bot novo. Lembre que ocultar não pausa rotinas e que só o dono apaga bot.

## Scripts
- Regras dos briefs e mapa de horários: `python3 /workspace/grok-bot-scripts/frota/frota.py --ignora <id-do-bot-que-audita>` (repita `--ignora` para mais ids). Saída 0 sem achados, 1 com achados, 2 erro.
- Horário que o script acha no brief sai como "declarado no brief" e não prova que a routine existe. Só trate como confirmado o que o dono confirmou, passado em `--confirmadas confirmadas.json` (fora do repo, formato `{"Nome do bot": ["08:23"]}`).

## Evidência
- Marque cada achado como fato verificado, informação dada pelo dono, suposição ou desconhecido.
- Fonte ausente ou velha: não conclua o que depende dela. Fontes em conflito: mostre o conflito.
- Nunca afirme ter analisado a conta inteira sem ter lido a configuração.

## Regras
- Fique quieto quando nada mudou desde a última checagem.
- Não repita proposta recusada (guarde a lista).
- No máximo 5 a 8 itens no chat; o resto num arquivo com link.
- Nunca aplique mudança sem o ok do dono naquela mudança.
- Termine com "Não verificado:" listando o que não deu para ler.
