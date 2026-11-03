---
name: ligacoes-bland
description: >-
  Use this when planning, testing, placing (only with Lucas's ok and the cost
  shown) or reporting an outbound AI-voice phone call or batch through Bland AI.
---
# Ligações com voz de IA (Bland AI)

Planejar, testar, fazer (só com ok do Lucas, vendo o custo) e relatar ligações de saída para um objetivo claro.

## Base
- Chave: `BLAND_API_KEY` no ambiente. Nunca mostre, nunca aceite no chat (secret-request). Sem chave: peça por secret-request.
- REST da Bland (docs.bland.ai) para ligar: `POST /v1/calls`, `Authorization: Bearer $BLAND_API_KEY`. O conector `user-Bland AI` é só para ler e testar (o `bland_call_send` não aceita idioma, fuso nem guard rails).
- Empresas: ANA (edtech de IA para advogados), ITS EDU e Braga Advocacia. Na Braga Advocacia, só cliente atual e só sobre o caso dele (OAB, Provimento 205/2021).
- Voz padrão: clone do Lucas, voice `8c30d798-dcd8-4905-b7f0-e8d80c70d318`. Mande sempre o id (há vozes públicas chamadas "lucas").
- Número: hoje sai +1 (EUA). Com o secret `BLAND_TWILIO_ENCRYPTED_KEY`: header `encrypted_key` e `from` = +55 do Twilio do Lucas; soma US$0,0663/min celular (US$0,031 fixo).
- Plano Start: US$0,14/min, mínimo US$0,015 por tentativa, 100 ligações/dia, 10 simultâneas, 1 a cada 10 s por número.
- Alerta de saldo diário já roda em outro bot. Não crie outro.

## Entrega
1. Cartão do plano (antes de ligar): número, para quem e por quê, objetivo em 1 linha, roteiro, primeira frase, voz, max_duration, gravação, caixa postal, horário e custo estimado (max_duration x 0,14 + 0,015, mais o Twilio se usar +55, vezes a quantidade). Termina com "Posso ligar?".
2. Relatório: status, answered_by, disposition_tag, duração, resumo em 3 a 5 linhas, campos extraídos com trecho, link da gravação (só para o Lucas), custo real x estimado e próximo passo em rascunho.
3. Lote: uma linha por número (resultado, custo) e o total.
4. Sem pedido: saldo (`GET /v1/me`) e as últimas 5 ligações com custo, e ofereça o próximo plano.

## Parâmetros padrão de toda ligação
language "pt-BR", timezone "America/Recife", voice do clone, noise_cancellation true, background_track "office", interruptibility 2 (1 em linha barulhenta), wait_for_greeting false, record true, keywords com até 20 nomes próprios, pronunciation_guide (ex.: AdvocacIA = "advocacia"), summary_prompt em português, dispositions do caso, guard_rails `tcpa:ai_disclosure`, `tcpa:self_introduction`, `tcpa:recording_disclosure` e `tcpa:opt_out`. Não mande model.

## Roteiro
- Primeira frase curta: "Alô, aqui é o assistente de inteligência artificial do Lucas Braga, com a voz dele. Falo com {{nome}}?". Logo depois avise que a ligação é gravada.
- Task com menos de 2.000 caracteres, escrita como fala: frases curtas, "tá", "pra".
- Caixa postal: confirmação e lembrete deixam recado curto sem dado sensível. Lista fria desliga (hangup); retry só uma vez, wait ≥ 7200 s. O retry conta no limite diário.

## Por caso
- Confirmação ou lembrete: max_duration 3, dados no request_data, dispositions confirmou, remarcar, cancelou ou sem_resposta.
- Leads da ANA (inclusive lista fria quando o Lucas pedir): max_duration 6, extrai cargo, tamanho do escritório, dor, prazo e interesse. `transfer_phone_number` só se o Lucas disser que está livre.
- Agendamento: 2 ou 3 horários livres no request_data. A ligação confirma um. O evento é rascunho para o Lucas.
- Cotação: preço, prazo e condição. Em URA use ivr_mode.

## Teste, resultado e controle
- Primeiro uso de um roteiro: ligação de teste para o número do Lucas. Com pathway ou agent, teste antes por texto (`bland_pathway_chat`). Lote só depois de um piloto de 3 a 5 números.
- Resultado: `GET /v1/calls/{id}` a cada 5 s até `completed` true. Depois `POST /v1/calls/{id}/analyze` com as perguntas do caso. Completed não é sucesso: confira answered_by e error_message.
- Lista fria: antes, tire os números da lista "não ligar" e das listas de bloqueio do Lucas (Procon do estado). O Não Me Perturbe só vale para teles e bancos, não para a ANA.
- Opt-out: a ligação termina e o número entra na lista "não ligar".
- Máximo 2 tentativas/dia e 15/mês por número.
- Parar: `POST /v1/calls/{id}/stop`. Lote: `POST /v2/batches/{id}/stop`.
- Roteiro reutilizável nasce como agent da Bland (pathways viram agents até 15/11/2026).

## Permissões
- Sempre: ler saldo, vozes, ligações, transcrições e gravações deste trabalho; montar plano, roteiro, rascunho de agent e relatório; testar por texto; manter a lista "não ligar".
- Só com ok explícito do Lucas, por ligação ou lote, vendo o custo: qualquer ligação, inclusive o teste (crédito da Bland é o único gasto permitido, e só assim); agendar ligação; criar lote; transferir; criar ou publicar agent, pathway, persona, ferramenta ou base de conhecimento na Bland.
- Nunca: ligar em horário que o Lucas não aprovou ou para número da lista "não ligar"; insistir depois de um pedido para parar; negar que é IA; dizer que é o Lucas em pessoa ou deixar a pessoa achar isso; cobrança agressiva ou oferta de serviço da Braga Advocacia; prometer preço, desconto ou prazo não aprovado; mandar SMS, WhatsApp ou e-mail de follow-up por conta própria; mostrar a chave.

## Verificação antes de entregar
1. O cartão tem número, objetivo, voz (id do clone), pt-BR, America/Recife, max_duration e custo.
2. O ok do Lucas cobre esta ligação ou lote.
3. Número fora da lista "não ligar", horário aprovado e limite diário respeitado.
4. A primeira frase diz que é IA e de quem.
5. Cada campo extraído tem trecho da transcrição. Sem trecho: "não dito".
6. O custo real veio do campo price.
