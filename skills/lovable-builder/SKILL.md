---
name: lovable-builder
description: >-
  Use quando for preciso transformar um briefing ou diagnóstico em uma solução
  feita no Lovable (landing page, página de evento com checkout, ferramenta
  interna, plataforma ou MVP) ou atualizar um projeto Lovable existente: PRD,
  schema Supabase com RLS, prompts por fase, pagamentos, créditos e verificação
  antes de publicar.
---
# Construir soluções no Lovable

O Lovable é uma ferramenta: ele gera o código a partir de prompts. Quem usa esta skill escreve a especificação e os prompts, acompanha a construção e verifica o resultado. Cada prompt descreve **o que** construir, nunca como codar.

Método, nesta ordem: Visão, Insights, Arquitetura, Criação Interativa e Lançamento com ciclo PDCA. Prefira sempre o menor produto que atinge a métrica.

## Regras fixas

- Não inventar fato. Data, preço, lote, CNPJ, contato, depoimento e número de mercado só entram se vierem do briefing. O que faltar vira placeholder (`[DEPOIMENTO]`, `[LOGO]`, `[CONTATO]`, `TODO`) e aparece como "Não verificado: ..." na resposta.
- Não mexer no Lovable nem no repositório GitHub do dono sem pedido explícito.
- Só com OK explícito do dono: publicar, fazer deploy, trocar domínio, ativar pagamento real, comprar créditos, enviar qualquer coisa a terceiros.
- Nunca pedir nem colar chave, token ou senha no chat. Credenciais ficam em secrets do Supabase ou do Lovable; nos relatórios, só os **nomes** dos secrets.
- Nunca reescrever histórico git de repositório conectado ao Lovable.
- Não decidir preço, garantia nem escopo comercial.
- Não construir solução em que a IA responda clientes finais no lugar do time humano sem decisão explícita do dono.
- Texto de venda: só copy aprovada. Sem copy, placeholder.
- Usar a marca certa de cada frente ou cliente e nunca misturar números de frentes diferentes.

## 1. Briefing (entradas)

Obrigatórias: objetivo de negócio e métrica; público e papéis; marca e design system; fatos fixos (datas, preços, lotes, dados da empresa, contatos); copy aprovada; meio de pagamento, se houver; projeto novo ou atualização ("manter visual").

Opcionais: diagnóstico de processos, prints, referências, link do projeto ou repositório, integrações.

Se faltar entrada obrigatória, faça **uma pergunta por vez** antes de gerar.

## 2. PRD de 1 página

Problema; usuários e papéis; métrica de sucesso; features must e should; telas e rotas; fora do escopo; riscos. Projetos grandes em fases (F0, F1, ...), cada uma com entregável testável.

## 3. Schema Supabase

- Tabelas, relações, chaves e índices.
- RLS ligada em **todas** as tabelas, com políticas por papel. Signup público desligado, salvo decisão contrária.
- Funções auxiliares de permissão.
- Seeds só com dados reais aprovados; desconhecido fica `NULL`.
- Migrações incrementais e idempotentes, **sem DROP, TRUNCATE ou DELETE**; usar `ALTER TABLE ... ADD COLUMN IF NOT EXISTS`.
- Exclusão lógica; ações destrutivas ou financeiras gravam motivo em log de auditoria.

Stack padrão: React, TypeScript, Vite, Tailwind, shadcn/ui, TanStack Query, React Hook Form com Zod e Supabase (Postgres, Auth, Edge Functions, jobs). Sem backend próprio nem WebSockets nativos: use Supabase Realtime e Edge Functions.

## 4. Sequência de prompts

Um prompt por vez, na ordem; só avance quando a fase anterior for aceita.

- **P0 Inventário (projeto existente):** somente leitura. Listar tabelas (colunas, chaves, RLS), funções, triggers, views, Auth, Edge Functions, nomes dos secrets, rotas e tema, e comparar com o modelo de referência. Terminar com "pare e aguarde aprovação".
- **P0 Knowledge Base e design system (projeto novo):** marca, cores, tipografia, tom e regras fixas.
- **P1 Fundação:** autenticação, papéis e schema.
- **P2 a Pn:** uma tela ou feature por prompt, com 4 seções (contexto e objetivo; dados e backend; interface e comportamento; regras e casos-limite) e critérios de aceite verificáveis.
- **Prompt final:** pagamentos, SEO e publicação (só com OK).
- **Atualização:** prompt único com "manter o estilo visual / não publicar".

Em todo prompt: "não publique", "não mexa em outro projeto" e as decisões já aprovadas.

## 5. Pagamentos

- Stripe: fluxo nativo do Lovable.
- Mercado Pago: Edge Function que cria a preferência e recebe o webhook que marca o pedido como pago; use o identificador externo do pedido, não só o localStorage.
- Sempre em modo de teste até o pedido ficar "pago" no banco via webhook.

## 6. Boas práticas

- **Créditos:** estime antes (fase média cerca de 20; plataforma completa pode passar de 600). Se zerarem, registre onde parou e avise o dono; comprar é decisão dele.
- **Fases com teste** e um relatório por fase.
- **Smoke test do banco** dentro de transação com `ROLLBACK`.
- **Varredura** antes de enviar ao Lovable: nenhuma credencial ou dado pessoal de cliente.
- **Remix:** dados e catálogos de origem são de outra empresa; substitua tudo antes de publicar.
- **Construção acompanhada por outro agente:** acompanhe em intervalos, só intervenha em trava ou erro; crédito, cobrança ou login vão para o dono.
- **Handoff para engenharia:** o Lovable entrega protótipo ou discovery, com documento do que prova e do que falta para produção.
- Depois de pronto, documente a operação num POP.

## 7. Verificação antes de entregar

1. Critérios de aceite verificáveis em cada prompt.
2. Fatos fixos conferidos contra o briefing.
3. Busca por placeholders e TODOs.
4. RLS testada com dois papéis diferentes e anônimo.
5. Pagamento em teste até "pago" via webhook.
6. CTAs e links funcionando.
7. Layout em 375 e 390 px, sem rolagem lateral.
8. Build da prévia sem erro.
9. Signup e permissões conforme o PRD.
10. O que não foi testado vira checklist para o dono, não resultado verificado.

Feche com **"APROVO PARA PUBLICAR"** ou **"NÃO APROVO"** e uma tabela de bloqueios (item, por que bloqueia, como resolver).

## 8. Entregáveis

PRD, schema, prompts sequenciais, fluxo de pagamento, checklist com veredito e, após publicação aprovada, o POP. No chat, resposta curta; material completo num documento com link.

## Anti-empregos

Quem usa esta skill não vira copywriter, vendedor, designer de marca do zero, suporte contínuo do site publicado nem dono de preço.
