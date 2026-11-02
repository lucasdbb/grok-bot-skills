---
name: oferta-e-pitch-ana
description: >-
  Use this when designing or revising the ANA commercial offer (value stack,
  packaging, bonuses, guarantee, price ranges, A/B tests) or building the sales
  pitch deck in the Lovable project "[ANA] Pitchs". Lucas decides offer and
  price; the bot proposes, documents and builds.
---
# Oferta e pitch da ANA

Oferta e pitch mudam juntos, por isso têm um dono só (DV ANA). **O Lucas decide oferta e preço**: você propõe, documenta e constrói.

## Fontes
- Hub Notion ANA: https://app.notion.com/p/3347e086a02f80f6be9cc672179d8111
- Página Oferta (inventário vivo, sempre relida): https://app.notion.com/p/33b7e086a02f8015954af841ccb09c29
- Garantia (em Copy / Pesquisa de Copy), KPI's Vendas, Equipe (RACI: oferta e preço = Lucas), Sucesso do Cliente.
- Itens do inventário: ferramentas, mentorias diárias (vagas), grupo WhatsApp, formações IA com resumo e transcrição, Soluções, newsletter, Builder, Vício Law IA, redes de profissionais e parceiros, certificados, bancos de agentes, skills e extensões Chrome. Releia: o inventário muda.
- Lovable "[ANA] Pitchs", id `77c4ac3d-0cef-442f-8d54-8e55914353f5` (preview id-preview--77c4ac3d-0cef-442f-8d54-8e55914353f5.lovable.app, não publicado). Deck ao vivo 16:9, identidade "deep space" ciano/roxo, Sora/Inter/JetBrains Mono, sync telão e celular (Realtime), rotas `/diagnostico` e `/equipe-comercial`. Leia `.lovable/plan/*.md`, `roadmap.md` e `drizzle/` antes de mexer.
- CAC, LTV e margem vêm do CFO ANA; sem número, marque [ausente].

## Entregáveis
1. **Value stack:** item, benefício, prova ou condição, e o que NÃO está incluso.
2. **One-pager:** para quem, promessa, mecanismo, o que recebe, garantia, preço (só com fonte), CTA e FAQ de objeções.
3. **Empacotamento e garantia:** core, bônus e escassez real (sem falsa urgência); garantia em texto-candidato.
4. **Matriz de teste A/B:** uma variável por vez, métrica de sucesso, handoff para Tráfego e para a própria operação de vendas.
5. **Espinha do pitch:** ordem dos slides com a mensagem de cada um (gancho, problema, virada, prova, oferta, bônus, garantia, fechamento, objeções).
6. **Deck construído:** texto slide a slide no Lovable, link do preview, lista de slides, pendências [PREENCHER] e roteiro de fala se pedido.
7. **Checklist de promessa:** mesma headline e mesmos inclusos e exclusos para DM, Tráfego e Copy.

## Passo a passo
1. **Briefing mínimo:** oferta-alvo (mentoria 12m, plataforma, evento, upsell), público, momento (aula ao vivo, 1:1, webinar), restrições (preço teto, vagas, prazo) e prova social real. Se faltar algo, pergunte uma vez com sua sugestão.
2. **Oferta primeiro:** releia a página Oferta e diga o que mudou. O pitch só usa oferta aprovada pelo Lucas.
3. **Espinha para aprovação** antes de construir.
4. **Construir (após o ok):** connector `user-Lovable` (GetDynamicTools antes de CallDynamicTool). Leia com get_project, list_files, read_file, get_diff, list_edits e query_database. Altere com send_message em prompt específico (o quê, onde, comportamento, o que NÃO mudar). Releia o diff e confira o preview.
5. **Pitch novo** vira rota ou sequência nova reaproveitando o visual; nunca sobrescreva o deck em uso.
6. **Comprador:** o advogado fundador. Fale de tempo, sigilo e ROI no escritório, não liste features. Tensione o stack e corte o ruído.

## Colaboração
CEO prioriza qual oferta atacar. CFO valida a matemática. DM e Tráfego levam a mesma promessa. Design faz criativos fora do deck. CS, Produto e Formações confirmam o que dá para entregar. Eventos cuida da oferta de sala e do hot seat.

## Guardrails
- Construir antes do ok da espinha, editar Notion, mexer em senha, sessão, tabelas ao vivo, Realtime ou dados de leads: só com ok explícito.
- Nunca publicar (deploy_project), lançar oferta, mudar checkout ou publicar preço sem ok.
- Nunca inventar preço, desconto, bônus, vagas, prazo, depoimento, número de alunos ou resultado: use [PREENCHER].
- Nunca garantir ganho ou resultado jurídico, nem claim que fira o Código de Ética da OAB sobre publicidade; em dúvida, sinalize.
- Garantia ou contrato com risco jurídico: sinalize e o Lucas decide.

## Checagem
1. Releu a página Oferta e apontou o que mudou.
2. Todo preço, número e afirmação tem fonte (Notion ou Lucas); o resto é faixa, [ausente] ou [PREENCHER].
3. Inclusos e exclusos batem com o que Produto, CS e Formações entregam; escassez e urgência são reais.
4. A oferta do deck é a mesma do one-pager.
5. No preview, os slides avançam e voltam sem corte e nada existente quebrou.
