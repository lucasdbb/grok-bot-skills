---
name: fila-de-ideias-x
description: Use quando o Lucas mandar um link de post do X (ou de outra rede) com uma ideia para guardar — resume, escreve o passo a passo e cria a linha na base 💡 Fila de Ideias do Notion. Também é a cobrança diária das ideias paradas há 3 dias ou mais.
---
# Fila de Ideias

Base: 💡 Fila de Ideias no Notion (https://app.notion.com/p/03b13d4a3f3f42ef915a8ad8092921e2), data source `collection://5a8e76da-1c80-4ebb-91c2-9e0dad76aa3f`, dentro de 🧠 Memória Grok Bot ANA. Conector: user-Notion (faça GetDynamicTools antes de chamar).

Propriedades: Ideia (título), Link (URL), Fonte (X, Instagram, LinkedIn, YouTube, Outro), Autor (@), Resumo (2 a 3 linhas), Passo a passo, Para quem (Lucas, Clientes, ANA, Braga Advocacia, ITS EDU), Categoria (Bot/Agente, Vendas, Conteúdo, Automação, Vídeo/Avatar, Outro), Status (Na fila, Escolhida, Implementando, Implementada, Descartada), Esforço (Baixo, Médio, Alto), Entrou em (automático), Último lembrete (data), Observação.

## Parte A: captura (quem recebe o link)
1. Painel em working e card no Quadro dos Bots, como o brief manda.
2. Dedup: busque na base uma linha com o mesmo Link (trate x.com e twitter.com como iguais e tire `?s=` e outros parâmetros). Se já existir, não crie outra: responda com o link da linha que já existe.
3. Leia o post com as ferramentas públicas do X (namespace `x`; leia a skill x-api-mcp-guide antes): pegue o id do link e chame get_posts_by_id com `post.fields` text, note_post, article, conversation_id, created_at e `expansions` author_id. Se for fio, busque o resto do mesmo autor com `conversation_id:<id> from:<autor>`. Se o post tiver link ou artigo, leia com WebFetch. Se o X falhar, use WebFetch no link. Se não conseguir ler, diga isso e não invente o conteúdo.
4. Escreva em pt-BR:
   - Ideia: título curto, com verbo.
   - Resumo: o que é e por que vale, em 2 a 3 linhas.
   - Passo a passo: de 3 a 7 passos numerados para o Lucas implementar no mundo dele (bots, Notion, ANA). Marque o que for suposição sua.
   - Para quem, Categoria e Esforço: seu melhor palpite.
   - Fonte, Autor (@) e Link com a URL limpa.
   - Status: Na fila. Último lembrete fica vazio.
5. Crie a linha (create-pages com parent data_source_id). Releia a linha e confira se Link, Status e Resumo foram gravados.
6. Responda ao Lucas em 2 a 3 linhas: título, resumo e link da linha. Não implemente a ideia, não acione outro bot, não mande mensagem a ninguém.

## Parte B: cobrança diária (rotina de quem cobra)
1. Busque linhas com Status = Na fila, Entrou em há 3 dias ou mais (horário de Recife) e Último lembrete vazio ou de 3 dias atrás ou mais.
2. Nenhuma: silêncio total (sem mensagem, sem "nada novo").
3. Se houver: uma mensagem só ao Lucas, com até 10 ideias (as mais antigas primeiro), cada uma com título linkado na linha, dias na fila e esforço. Feche perguntando qual delas vira Escolhida e qual vira Descartada.
4. Grave a data de hoje em Último lembrete de cada linha citada e releia uma para conferir.
5. Se o Lucas responder, mude o Status como ele disser. A implementação fica com ele ou com o bot dono do assunto.

## Regras
- Nunca invente conteúdo do post nem números.
- Nunca apague linhas; use Descartada.
- Sem segredo, senha ou token na base.
- No fim: "Não verificado:" com o que ficou em aberto.
