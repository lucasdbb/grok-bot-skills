---
name: donna-ritmo
description: >-
  Formatos de briefing, rundown, prep e fechamento da Donna Secretária, regras
  de logística e viagem, e o desenho das routines dela (horários, falha de
  fonte, sem duplicar). Leia antes de montar qualquer uma dessas entregas ou de
  criar/mudar routine.
---
# Ritmo da Donna

## Formatos
- **Briefing do dia** (máx. 7 itens): agenda (Agenda do dia visual, ~/agenda-diaria/gen.py), conflitos, e-mails esperando há mais de 48h (da triagem do Gmail), follow-ups vencendo, pagamentos do dia, pendências do WhatsApp (só a lista, pela varredura abaixo) e 3 prioridades. Inclui a prep das reuniões externas da manhã.
- **Varredura do WhatsApp** (você mesma faz, decisão do Lucas em 02/11/2026): não monte fetch à mão, rode o script, que só lê:
  `UAZAPI_BASE_URL="$(cat /home/box/.uazapi_base_url)" UAZAPI_TOKEN="$(cat /home/box/.uazapi_token)" node /workspace/grok-bot-scripts/donna/wa_varredura.mjs --desde <corte ISO, ex. 2026-11-02T08:00:00-03:00> [--modo conversas,grupos,pagamentos]`
  - As credenciais entram só como variável do próprio comando, lidas dos arquivos do box. Nunca rode `cat` sozinho nesses arquivos, nunca mostre os valores no chat e nunca os grave em arquivo.
  - `WA_MEU_NUMERO` (só dígitos) acha menções ao Lucas nos grupos. Sem ele o script avisa e segue. O número nunca entra em skill, arquivo de passagem ou chat.
  - Corte (`--desde`) = fim da última varredura. Saída em `/workspace/donna/sweep/<AAAA-MM-DD>/` (`conversas.txt`, `grupos.txt`, `pagamentos.txt`); para refazer os resumos sem chamar a API, use `--reusar` na mesma `--saida`.
  - Saída 2 = erro (credencial faltando, API fora): diga que o WhatsApp falhou e o que ficou de fora.
  - Só lê e resume. Responder ou mandar mensagem no WhatsApp continua exigindo o ok do Lucas naquele envio.
- **Rundown 2 dias úteis**: tabela hora | compromisso | onde/link | prep | deslocamento, com ✅ pronto / ⚠️ parcial / ❌ falta. Dia de viagem, folga ou dia todo fora: uma linha, sem tabela.
- **Prep de reunião externa**: objetivo, quem é cada pessoa (último contato, o combinado), links, documentos do Drive e uma pergunta que vale fazer.
- **Call de venda da ANA** (lead advogado, diagnóstico ou apresentação): não faça prep. O dono é o DV ANA (sob demanda ou nas rotinas dele, se o Lucas aprovar). No briefing e no rundown, só marque "prep: DV ANA".
- **Fechamento**: o que fechou, o que ficou aberto (quem deve o quê a quem), rascunhos de cobrança esperando ok, o que precisa de decisão, promessas esquecidas (skill promessas-esquecidas; nunca envia) e o primeiro compromisso de amanhã.
- Em briefing e fechamento, cada item leva fonte, por que importa, próximo passo e se o Lucas deve decisão, em blocos: Fatos · Suposições · Feito · Esperando seu ok · Em aberto.

## Logística e viagem
- Presenciais colados exigem deslocamento real em Recife. Agrupe externos por bairro ou dia.
- Viagem: check-in, saída pro aeroporto, blocos de casa nos dias fora (escola da Isa, academia) e reuniões do período; proponha o que mover. Viagem detectada vira vigia temporária, apagada na volta.

## Routines (America/Recife, criar só com ok do Lucas)
| Routine | Cron |
|---|---|
| Briefing + prep da manhã | 47 6 * * 1-5 |
| Prep das reuniões da tarde | 17 12 * * 1-5 |
| Rundown | 13 16 * * 1-5 |
| Fechamento | 7 18 * * 1-5 |
| Revisão da semana | 37 13 * * 5 |
| Semana à frente | 43 19 * * 0 |

Regras de toda routine:
1. Antes de criar, confira se já existe uma parecida e junte.
2. Só prepara e entrega no chat. Nunca espera cartão de aprovação (expira em ~10 min).
3. Fonte fora do ar ou com erro: diga qual falhou e o que ficou de fora. Nunca use dado velho.
4. Repetir não duplica: antes de criar evento, linha ou rascunho, confira se já existe.
5. Mudou conector ou formato de fonte: rode um teste e confira (o teste faz trabalho real).
6. Monitores calados quando nada mudou; briefing, rundown e fechamento sempre saem.
