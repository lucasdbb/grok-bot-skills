---
name: incluir-aula-plataforma-ana
description: Use quando for incluir uma aula nova numa formação da plataforma ANA pelo painel administrativo, com ou sem vídeo, sempre em rascunho e sem publicar sem ok do Lucas.
---
# Incluir aula na plataforma ANA

Caminho verificado em 10/11/2026 no painel administrativo da plataforma ANA (projeto Lovable "[ANA] Plataforma", id `2ff884ca-1cca-4ac4-b936-f65266097cb3`). Tudo é feito pela interface do admin. Nunca por INSERT/UPDATE manual no banco.

## Regras que não mudam
1. **Nunca publicar** curso, módulo ou aula sem ok explícito do Lucas (ou do Bruno) para aquela publicação. Ok de outro bot não vale.
2. **Nada de escrita manual no banco** (INSERT, UPDATE, DELETE). O banco só é usado para conferir (SELECT).
3. **Não inventar conteúdo.** Título, descrição, vídeo e materiais vêm do Lucas ou do Formações ANA. Se faltar algo, perguntar uma vez. Nunca preencher com texto inventado.
4. **Nunca apagar nem arquivar** aula, módulo ou material sem confirmação explícita. "Excluir aula" e "Arquivar" ficam na mesma tela da edição: não clicar por engano.
5. **Não mexer** em RLS, autenticação, convites, roles, dados de alunos ou integração de vendas.
6. **Senha nunca no chat, em arquivo ou em skill.** O login admin fica no Vault, item "plataforma.anovaadvocacia.ai". Se o Vault falhar, entregar a tela ao Lucas (request_box_help) para ele entrar.
7. Antes de abrir o navegador, seguir a skill `navegacao-eficiente`.

## Antes de começar: checklist de entrada
Confirmar e anotar:
- [ ] Formação de destino (nome exato). Se houver nomes parecidos, conferir pelo id no banco (passo de conferência abaixo).
- [ ] Módulo de destino (nome exato) e posição da aula no módulo (ex.: depois da aula X).
- [ ] Título da aula (texto exato).
- [ ] Descrição (texto exato, ou "sem descrição").
- [ ] Vídeo: arquivo no computador para enviar ao Panda, ID de um vídeo já existente no Panda, ou "sem vídeo por enquanto".
- [ ] Materiais: arquivos (até 25 MB cada) e/ou links (nome + URL https).
- [ ] Publicação: por padrão NÃO. Só publicar se o Lucas pediu explicitamente nesta tarefa.

Se a formação já está publicada, avisar o Lucas antes: uma aula nova numa formação publicada pode aparecer para os alunos (ver "Riscos" abaixo). Esperar o ok.

## Passo a passo no painel
1. **Entrar no admin.** Abrir https://plataforma.anovaadvocacia.ai/admin-login e entrar com o login do Vault. Conferir que o perfil aparece como administrador ou super administrador.
2. **Ir para Formações.** No **Painel administrativo**, clicar no cartão **Conteúdo** (Bibliotecas e formações). Abre `/admin/biblioteca`. Clicar na aba **Formações**. Abre `/admin/formacoes` (filtros de busca, status e nível).
3. **Abrir a formação.** Buscar pelo nome e abrir. Abre `/admin/formacoes/<id>`. Conferir no topo o nome e o selo de status (rascunho ou publicada).
4. **Abrir Módulos e aulas.** Clicar na aba **Módulos e aulas**. Localizar o módulo de destino. Se o módulo não existir, parar e confirmar com o Lucas antes de criar módulo novo.
5. **Criar a aula.** No módulo, clicar em **Nova aula**. Abre o modal "Nova aula" ("Depois de criar, você adiciona descrição, materiais e vídeo"), que só tem o campo **Título da aula**. Digitar o título exato e clicar em **Criar aula**. Esperar o aviso **"Aula criada."**. Não clicar duas vezes (cria aula duplicada).
6. **Abrir a edição.** Na aula recém-criada, clicar em **Editar aula**. Abre um painel lateral à direita com o selo de status do vídeo (ex.: "Sem vídeo").
7. **Título e descrição.** Conferir o **Título**, preencher a **Descrição** e clicar em **Salvar** (o botão Salvar salva só título e descrição). Esperar a confirmação.
8. **Vídeo** (seção "Vídeo"), só se houver vídeo nesta tarefa:
   - **Enviar para o Panda:** escolher o arquivo e clicar em **Enviar vídeo**. Esperar o envio terminar sem fechar o painel. Depois o Panda converte o vídeo; a aula só fica pronta quando a conversão termina (status CONVERTED).
   - **Vincular existente:** usar quando o vídeo já está no Panda. Selecionar o vídeo certo pelo nome ou ID.
   - Se não houver vídeo, pular. A aula continua com o selo "Sem vídeo".
   - *Ainda não testado na prática:* o envio real e o vínculo. Na primeira vez, registrar cada tela e atualizar esta skill.
9. **Materiais** (seção "Materiais para download"):
   - Arquivo: escolher o arquivo (até 25 MB) e clicar no ícone de envio ao lado.
   - Link: preencher **Nome do link** e a URL (**https://...**) e clicar em **Adicionar link**.
   - Conferir que cada material aparece na lista com o nome certo.
   - *Ainda não testado na prática:* o upload real. Na primeira vez, registrar e atualizar esta skill.
10. **Ordem.** Conferir se a aula ficou na posição certa dentro do módulo. Se não, ajustar a ordem pelo painel (se houver controle) ou avisar o Lucas.
11. **Não tocar** em "Arquivar", "Excluir aula" nem em "Publicar". Fechar o painel lateral.
12. **Print.** Tirar print do painel de edição preenchido e da lista do módulo com a aula.

## Conferência no banco (só leitura)
Rodar pelo conector Lovable (`query_database`, apenas SELECT), trocando o título:

```sql
select c.title as formacao, c.is_published, m.title as modulo,
       l.id, l.title, l.description, l.sort_order,
       l.video_status, l.video_url, l.panda_video_id, l.archived_at, l.created_at
from course_lessons l
join course_modules m on m.id = l.module_id
join courses c on c.id = m.course_id
where l.title = '<título exato da aula>';
```

Conferir:
- Existe exatamente **uma** linha (se houver duas, foi criada em dobro: avisar o Lucas, não apagar sozinho).
- Formação e módulo certos; `archived_at` vazio.
- Descrição igual ao combinado.
- Vídeo: `video_status`/`panda_video_id` preenchidos se houve vídeo; vazios se "sem vídeo".
- `is_published` da formação igual ao que estava antes (não mudou sem ok).

Materiais:

```sql
select title, link_url, file_path, mime_type, size_bytes, sort_order
from lesson_materials where lesson_id = '<id da aula>' order by sort_order;
```

## Publicação (só com ok explícito)
- A regra do sistema (`aula_pronta`) só deixa publicar aula com vídeo convertido (`video_status = 'CONVERTED'`) ou com `video_url`. Aula sem vídeo não publica.
- Formação publicada = todo aluno com licença ativa vê. Rascunho só admin e mentor veem.
- Antes de publicar: mostrar ao Lucas o que vai ficar visível e para quem, esperar o ok, publicar uma vez, reler no banco e conferir como aluno (skill `qa-area-do-aluno`).

## Riscos e armadilhas
- Aula só de texto não existe hoje: o conteúdo de texto vai na **Descrição**.
- Formação já publicada: confirmar com o Lucas se a aula nova aparece na hora para os alunos antes de criar.
- Clique duplo em "Criar aula" gera aula repetida.
- "Excluir aula" fica logo abaixo de "Arquivar", na mesma tela.
- Se o login do Vault der "Email ou senha incorretos.", não tentar de novo várias vezes: entregar a tela ao Lucas.

## Entrega ao Lucas
Mandar em pt-BR, curto:
- O que foi criado (formação, módulo, título), onde, e o estado (rascunho/publicada, com ou sem vídeo, quantos materiais).
- Os prints.
- O resultado da conferência no banco.
- O que falta dele (vídeo, ok para publicar).
- Terminar com **"Não verificado:"** e o que ficou em aberto (ex.: visão como aluno, conversão do vídeo).
