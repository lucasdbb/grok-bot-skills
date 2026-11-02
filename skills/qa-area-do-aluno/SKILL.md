---
name: qa-area-do-aluno
description: >-
  Use para rodar a ronda de QA (só leitura) da área do aluno da plataforma ANA
  em https://plataforma.anovaadvocacia.ai/ com a conta de aluno de teste, e
  relatar em pt-BR o que entrou, sumiu ou quebrou desde a última ronda.
---
# Ronda de QA da área do aluno (só leitura)

Alvo padrão: https://plataforma.anovaadvocacia.ai/ (domínio oficial). Projeto Lovable `2ff884ca-1cca-4ac4-b936-f65266097cb3`.
Conta: aluno de teste com e-mail `lucasbraga@mail.grokbot.com`. A senha fica salva só no Vault (login do site) ou no secret-request. Nunca escreva a senha aqui, no chat, em arquivo ou no relatório.
Pasta de trabalho: `/workspace/qa-area-do-aluno/` (uma subpasta por data `AAAA-MM-DD`, com prints e `resultado.json`; `ultima.json` aponta para a última ronda completa).

## Regras (inegociáveis)
- Só leitura. Não salvar formulários, não reservar mentoria, não comentar, não curtir, não publicar no mural, não enviar mensagem ao Consultor IA (gasta créditos), não alterar perfil, não aceitar termos novos sem avisar, não pagar, não apagar.
- "Esqueci minha senha": só abrir a tela, nunca disparar o envio.
- Se o login pedir algo que só o Lucas pode resolver (2FA, captcha não resolvido, senha inválida), parar e relatar.
- Não mexer em nenhum dado real de aluno.

## Passos
1. Contexto: com o conector Lovable, ler `get_project` e `list_edits` desde a última ronda para saber o que mudou no código (commits e mensagens). Anotar os commits.
2. Navegador (subagente de desktop, uma tarefa por vez), na URL oficial:
   Antes de despachar, carregue a skill `navegacao-eficiente` e passe as regras dela ao subagente (URLs só da página ou da URL oficial, nunca de cabeça; aviso de cookies primeiro; uma nova tentativa; página com mais de ~45 s vira "lento").
   a. Tela de login: carrega, sem erro visível; abrir "Esqueci minha senha" (sem enviar) e voltar; conferir o link "Acesso administrativo" sem entrar.
   b. Login com a conta de teste (credencial do Vault).
   c. Onboarding, se aparecer: percorrer sem salvar escolhas permanentes; se exigir salvar para avançar, parar e relatar.
   d. Fluxos principais, um print por tela e anotação de erro visível, tela vazia, carregamento infinito, texto em inglês ou link quebrado:
      - dashboard / início;
      - formações: lista, abrir um curso, abrir uma aula (player carrega? material/PDF aparece e abre?);
      - biblioteca de agentes, prompts e skills: lista, filtros por plataforma (Dust, Grok, Claude, GPT), abrir um item;
      - mentorias: listar sessões e abas (hoje, próximas, gravações), sem reservar;
      - comunidade e mural de parcerias: só ler;
      - Consultor IA: só abrir a tela;
      - perfil: só ver;
      - busca global: buscar um termo simples (ex.: "contrato");
      - itens do menu lateral: listar todas as abas visíveis.
   e. Logout e confirmar que volta ao login.
   Pedir ao subagente: URL de cada tela, título, status (ok / erro / vazio / lento), mensagem de erro exata, caminho do print.
3. Comparar com `ultima.json`: abas e telas novas (entrou), abas e telas que sumiram, telas que antes funcionavam e agora falham (quebrou), e mudanças de conteúdo relevantes (ex.: número de formações). Na primeira ronda, tudo é linha de base.
4. Salvar `resultado.json` da data e atualizar `ultima.json`.

## Relatório (pt-BR, ao Lucas)
- Só enviar se houver algo novo (entrou, sumiu, quebrou ou decisão pendente). Sem mudança: ficar calado.
- Formato: 1) o que entrou no ar; 2) o que sumiu; 3) o que quebrou, com passos para reproduzir e print anexado; 4) decisões que dependem do Lucas; 5) "Não verificado:" com o que ficou de fora e por quê.
- Ligar cada mudança ao commit do Lovable quando der. Separar fato verificado de suposição.
