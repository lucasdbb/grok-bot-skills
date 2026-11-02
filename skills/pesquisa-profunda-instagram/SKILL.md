---
name: pesquisa-profunda-instagram
description: Use this when you need a deep, evidence-linked analysis of one or more PUBLIC Instagram accounts (competitor teardown, benchmark vs. another account, batch comparison or weekly change monitor) at the lowest data cost, using ScrapeCreators and Apify via MCP.
---
# Pesquisa profunda de contas de Instagram

Objetivo: o máximo de insight acionável com o mínimo de chamadas. Toda afirmação liga a um post, todo número sai do bruto salvo e tudo que não existe é declarado como indisponível.

## 0. Regras de ouro
1. **Escopo e custo antes de coletar.** Diga handle(s), janela (padrão: 50 posts ou 90 dias), extras (comentários, transcrições, destaques) e custo estimado. Peça OK se passar do teto combinado.
2. **Cache primeiro.** Pasta `/workspace/stalk/<handle>/<AAAA-MM-DD>/`. Se existir coleta com menos de 7 dias, reuse e cite a data. Coleta fresca só a pedido. Salve sempre o JSON bruto de cada chamada.
3. **Do mais barato ao mais caro.** ScrapeCreators (SC) para perfil e feed; Apify só para o que o SC exposto não faz (comentários, transcrição, shares); web fetch para o funil.
4. **Só público.** Sem login, sem interação (seguir, curtir, comentar, DM), sem conta privada, sem lista de seguidores e sem guardar dados pessoais de comentaristas comuns. Análise só agregada (LGPD).
5. **Horários** no fuso do usuário (SC devolve `created_at` em ISO UTC e `taken_at` em unix; Apify devolve `timestamp` em ISO UTC).

## 1. Receitas de tool (testadas em 07/10/2026)

### 1.1 Perfil: SC, 1 crédito
`user-scrapecreators` → `scrapecreators_instagram_profile` `{ "handle": "<sem @>" }`
Caminho útil: `data.user.*`
- `edge_followed_by.count` (seguidores), `edge_follow.count` (seguindo), `biography`, `bio_links[].url`, `external_url`, `is_verified`, `is_professional_account`, `category_name`, `highlight_reel_count`, `is_private`, `id` (user_id).
- `edge_owner_to_timeline_media.edges[].node`: 12 posts recentes (shortcode, `taken_at_timestamp`, `video_play_count`, `edge_media_preview_like.count`, `comment_count`, `like_and_view_counts_disabled`, `coauthor_producers`, `is_paid_partnership`, legenda em `edge_media_to_caption`).
- ⚠️ `edge_owner_to_timeline_media.count` é o tamanho do lote (12), **não** o total de posts.
- Resposta grande (~200 KB): é gravada em arquivo. Faça o parse com Python e salve como `sc_profile.json`.

### 1.2 Feed: SC, 1 crédito por página de 12
`scrapecreators_instagram_posts` `{ "handle": "<h>" }` → depois `{ "handle": "<h>", "next_max_id": "<valor exato do retorno anterior>" }` enquanto `more_available` for true e a janela não fechar.
Campos por item (`items[]`): `code`, `url`, `taken_at`, `created_at`, `media_type` (1 imagem, 2 vídeo, 8 carrossel), `product_type` (`clips` = reel, `carousel_container`, `feed`), `like_count`, `comment_count`, `play_count`/`ig_play_count`, `video_duration`, `carousel_media_count`, `caption.text`, `coauthor_producers[]`, `usertags`, `is_paid_partnership`, `timeline_pinned_user_ids`, `like_and_view_counts_disabled`, `user.pk`.
50 posts ≈ 5 páginas ≈ 5 créditos. Salve `sc_posts_p1.json`, `sc_posts_p2.json`…

### 1.3 Comentários: Apify, US$0,0026 por comentário (tier FREE)
`user-Apify` → `call-actor`
```json
{"actor":"apify/instagram-comment-scraper",
 "input":{"directUrls":["https://www.instagram.com/p/<code>/"],"resultsLimit":15},
 "waitSecs":45,"callOptions":{"maxTotalChargeUsd":0.25,"memory":512,"timeout":180}}
```
Depois chame `get-dataset-items` `{ "datasetId": "<id>", "fields": "text,timestamp,likesCount,repliesCount", "limit": 100 }`. Projete só esses campos e não traga username.
- Plano FREE: só os **15** primeiros (mais novos), mesmo pedindo mais. Respostas aninhadas exigem plano pago.
- Vários posts numa run só (lista em `directUrls`) evita taxas de start e é mais rápido.

### 1.4 Transcrição de reels: Apify, US$0,001 de start + US$0,0026 por reel + US$0,048 por **minuto iniciado** (FREE)
```json
{"actor":"apify/instagram-reel-scraper",
 "input":{"username":["https://www.instagram.com/reel/<code>/"],"includeTranscript":true},
 "waitSecs":45,"callOptions":{"maxTotalChargeUsd":0.15,"memory":1024,"timeout":240}}
```
Campos: `transcript`, `caption`, `videoPlayCount`, `videoDuration`, `likesCount` (-1 = oculto), `commentsCount`, `latestComments[]`, `musicInfo.*`, `paidPartnership`. Um reel de 70 s custa 2 minutos ≈ US$0,10. Transcreva só os outliers (3–5).
- Sem transcrição, o mesmo Actor com `username:["<handle>"]` e `resultsLimit` lista os reels (US$0,0026 cada). Ele aceita `onlyPostsNewerThan` ("90 days", em UTC), `skipPinnedPosts`. `includeSharesCount` (US$0,007 por reel) só funciona em plano pago.

### 1.5 Outros Actors úteis (consulte `fetch-actor-details` com `output:{pricing:true,inputSchema:true}`; pedir muitos campos pode dar timeout)
| Actor | Input-chave | Preço FREE | Uso |
|---|---|---|---|
| `apify/instagram-profile-scraper` | `usernames[]`, `includeAboutSection` (pago) | US$0,0026 | `postsCount` total, `relatedProfiles` |
| `apify/instagram-post-scraper` | `username[]`, `resultsLimit`, `onlyPostsNewerThan`, `skipPinnedPosts`, `dataDetailLevel` | US$0,0017 + 0,001 | Feed com filtro de data (≈15× mais caro que SC) |
| `apify/instagram-scraper` | `directUrls[]`, `resultsType` posts/details/comments/reels/mentions/stories, `resultsLimit`, `onlyPostsNewerThan`, `search`, `searchType` | US$0,0027 por resultado | Mentions/tagged (FREE ≈ 21), hashtag, place |
| `apify/instagram-hashtag-scraper` | `hashtags[]`, `resultsType`, `resultsLimit` | US$0,0026 | Descoberta por tema |
| `apify/instagram-search-scraper` | `search`, `searchType`, `searchLimit` | US$0,0027 | Achar contas do nicho |
| `goat255/instagram-stories-highlights-scraper` (comunidade) | `usernames[]`, `includeStories`, `includeHighlights`, `maxHighlightsPerUser` | US$0,00345 por story + start | Stories e destaques (só com OK) |
| `apidojo/instagram-scraper` (comunidade) | `startUrls[]`, `maxItems`, `until` | US$0,0005 por post | Feed barato em volume (não testado) |

### 1.6 Endpoints SC só via REST (não expostos pelo MCP mínimo; peça a quem integra fontes)
Header `x-api-key`; base `https://api.scrapecreators.com`.
- `/v2/instagram/media/transcript?url=` (1 cr, vídeo < 2 min).
- `/v2/instagram/post/comments?url=&cursor=` (1 cr por página; `include_replies=true` = 15 cr sempre).
- `/v1/instagram/user/reels?user_id|handle&max_id=` (sem legenda).
- `/v1/instagram/user/highlights` + `/v1/instagram/user/highlight/detail?id=`.
- `/v1/instagram/user/tagged-posts?user_id&cursor=`.
- `/v1/instagram/profile/post-count?handle` (422 sem cobrança se só houver estimativa; `allow_estimated=true`).
- `/v1/instagram/post?url=` (detalhe; `download_media` = 10 cr).
- `/v1/instagram/search`, `/search/profiles`, `/search/popular`, `/search/hashtag` (até a página 11), `/v2/instagram/reels/search` (até a página 11), `/v1/instagram/reels/trending`, `/v1/instagram/audio/reels`.
- Cache: `cache_max_age=1d|3d|7d|14d|30d`; hit = 0 cr (`cached:true`, `cached_at`), em profile, basic-profile, post e transcript.
- Sem rate limit (fique abaixo de 500 concorrentes). 402 = sem crédito. Existe MCP oficial em `https://api.scrapecreators.com/mcp` (OAuth).

### 1.7 Funil
`bio_links[].url` e `external_url` → WebFetch. Se vier 403 ou vazio, use `apify--web-fetch` `{ "url": "..." }`. Siga 1–2 cliques até achar a oferta: produto, preço, garantia, CTA, captura (formulário/WhatsApp) e prova social. Registre a URL final e a data.

## 2. Matriz de roteamento (resumo)
| Precisa de… | Use | Evite |
|---|---|---|
| Perfil e 12 recentes | SC profile | Apify profile (só se precisar do total de posts) |
| 50–100 posts | SC posts paginado | Apify post-scraper (caro) |
| Comentários | Apify comment-scraper em 3–5 posts | Raspar todos os posts |
| Fala do reel | SC transcript (se exposto) > Apify `includeTranscript` | Transcrever tudo |
| Shares | Apify reel-scraper pago | — |
| Saves, alcance, demografia, story views, histórico de seguidores de terceiros | **Indisponível** | Inventar |
| Contas próprias | Ferramenta de analytics conectada à conta (ex.: Zernio) | Scraping |

## 3. Método (passo a passo)
1. **Escopo**: objetivo da pesquisa, handle(s), janela, extras e custo. Confira o cache.
2. **Snapshot do perfil** (1.1). Grave uma linha em `/workspace/stalk/<handle>/snapshots.csv`: `data,seguidores,seguindo,bio_hash,link_bio`.
3. **Feed** (1.2) até 50 posts ou 90 dias, sem contar fixados. Fixado pelo dono = `str(user.pk)` presente em `timeline_pinned_user_ids` (num collab, o fixado pode ser do coautor).
4. **Normalize** em `posts.csv` (dicionário abaixo). Atalho: `python3 /workspace/stalk/_tools/ig_metrics.py <pasta> <seguidores> [dias]`, se existir; ele gera `posts.csv` e `metrics.json` a partir de `sc_posts_p*.json` e `apify_*.json`.
5. **Quantitativo**: cadência (posts/semana), mix de formatos, dias e horários (fuso local), medianas, ER, views/seguidor e outliers.
6. **Outliers** = top 10% por plays (reels) ou por ER (estáticos), mínimo 3. Para eles: transcrição (1.4) e comentários (1.3).
7. **Qualitativo**: ganchos (1ª linha da legenda e primeira frase falada), tamanho da legenda, CTA (`comente X`, link na bio, salvar, compartilhar), hashtags, collabs e marcações, temas. Agrupe em 3–6 **pilares** e, se existir a skill de 3 pilares, marque cada post como isca por palavra-chave / contraste / loop.
8. **Voz da audiência**: nos comentários, classifique dúvidas, objeções (preço, suporte, forma de pagamento, limites), desejo ("quero"), elogio e reclamação. Conte por categoria e cite 3–5 frases curtas, anonimizadas.
9. **Funil** (1.7).
10. **Síntese**: o que copiar (padrão + evidência), o que evitar, oportunidades (lacunas do concorrente que o usuário pode ocupar).
11. **Verificação** (seção 7) e entrega no template (seção 6).

## 4. Dicionário de dados (`posts.csv`)
`code, url, data_local, dia_semana, formato (reel|carrossel|imagem|video), pinned, likes_ocultos, likes, comments, plays, dur, er_likes_comments_pct, er_comments_pct, views_por_seguidor_pct, chars_legenda, gancho, cta_palavra, hashtags, collab, pago`
`metrics.json`: seguidores, janela_dias, posts_na_janela_sem_fixados, fixados, posts_por_semana, mix_formato, pct_likes_ocultos, mediana_comentarios, mediana_plays_reels, p90_plays_reels, mediana_views_por_seguidor_pct, mediana_er_likes_comments_pct, mediana_er_comments_pct, dias_semana, outliers_top10_plays, gerado_em.

## 5. Fórmulas
- **ER por post** = (likes + comentários) / seguidores × 100. **Só se os likes forem visíveis.**
- **ER de comentários** = comentários / seguidores × 100 (sempre calculável).
- **Views/seguidor (reels)** = plays / seguidores × 100. Mostra alcance além da base: acima de 100% indica distribuição para não seguidores.
- **Mediana** como medida central. Média só como nota, porque um viral distorce a média.
- **Outlier** = acima do p90 da janela, ou mais de 3× a mediana.
- **Cadência** = posts na janela / (dias entre o primeiro e o último post / 7).
- **Likes ocultos**: `like_and_view_counts_disabled = true` → SC devolve `like_count = 3` (placeholder) e Apify devolve `likesCount = -1`. Trate como nulo e relate o % de posts afetados.
- Seguidores do dia da coleta. Diga a data.
- Plays do SC = views só do IG (sem crosspost do FB).
- Crescimento = diferença entre linhas de `snapshots.csv`. Sem histórico próprio, "indisponível".

## 6. Template do relatório
```
# Raio-X @<handle> (coleta <dd/mm/aaaa hh:mm> BRT, janela <N posts | dd/mm–dd/mm>)
Fontes: SC (<n> cr) · Apify (<runs>, ≈US$<x>) · Web · Cache: <sim/não, data>
## Resumo executivo (5 bullets, cada um com número e link)
## Perfil: seguidores, seguindo, bio, link(s), verificado, destaques, total de posts (ou "indisponível")
## Cadência e formatos: posts/semana, mix %, dias e horários dominantes
## Engajamento: tabela de medianas (comentários, plays, views/seg, ER) + aviso de likes ocultos
## O que funciona (top 10%): tabela post | data | formato | plays | coment. | gancho | por que funcionou
## Pilares de conteúdo: pilar | % posts | desempenho mediano | exemplo (link)
## Ganchos e CTAs: padrões de 1ª linha, tamanho de legenda, CTAs de palavra-chave, hashtags, collabs
## Funil: bio → LP → oferta (preço, garantia, captura) com URLs
## Voz da audiência: categoria | contagem | citação curta anonimizada
## Copiar / Evitar / Oportunidades
## Não verificado / indisponível
## Evidências: lista de links de todos os posts citados
```
**Comparativo:** as mesmas tabelas em colunas A × B, mais "onde B ganha / onde A ganha".
**Lote:** uma linha por conta (seguidores, posts/sem, mix, mediana de plays, views/seg, ER de comentários, pilar dominante, CTA dominante, oferta) e Raio-X curto só da conta mais relevante.
**Monitor (delta semanal):** compare com a última coleta: posts novos (com métricas), outliers novos (acima do p90 histórico), mudança de bio, link ou oferta (hash), variação de seguidores. Sem mudança relevante: "Sem mudanças em @<h> desde <data>." Custo típico: 1–2 cr por conta.

## 7. Verificação antes de entregar
1. Contagens (posts, formatos, fixados excluídos) batem com `posts.csv` e com o JSON bruto.
2. Medianas e ER recalculados do bruto; seguidores e data da coleta conferidos.
3. Todo post citado tem link; toda afirmação de funil tem URL e data.
4. Likes ocultos tratados; horários no fuso local.
5. Custo real: soma de `credits_charged` do SC e eventos Apify (preço de lista × quantidade).
6. Seção "Não verificado / indisponível" preenchida (ex.: shares no plano FREE, saves, demografia, total de posts).

## 8. Custos de referência (preços de lista, Apify FREE; tiers pagos são mais baratos)
| Pacote | Custo |
|---|---|
| Perfil + 50 posts (SC) | ≈ 6 cr (≈ US$0,011 a US$1,88/1k cr) |
| 5 posts × 15 comentários (Apify) | ≈ US$0,20 |
| 3 transcrições de ~70 s (Apify) | ≈ US$0,30 |
| **Raio-X padrão** | **≈ 6 cr + US$0,50** |
| Monitor semanal por conta | 1–2 cr |
| Apify FREE | US$5/mês de uso; acabou, para até o próximo ciclo |

## 9. Pegadinhas
- `call-actor` espera no máximo 45 s; se não terminar, `get-actor-run` (waitSecs ≤ 45) e depois `get-dataset-items`.
- Sempre `callOptions.maxTotalChargeUsd` (pay-per-event para no teto e não cobra além). Limite também pelo input (`resultsLimit`).
- Datasets sem nome na Apify expiram (FREE: só as 10 últimas runs ficam, por 4 meses). Guarde o bruto localmente.
- O MCP da Apify às vezes dá timeout em `fetch-actor-details` ou `search-apify-docs`. Peça menos campos e tente uma vez. Docs em markdown: `https://docs.apify.com/<caminho>.md` e `https://docs.apify.com/llms.txt`.
- Cursor do SC: repasse exatamente como veio (pode trazer sufixo de outro id).
- Datas dos filtros da Apify são em UTC.
- Regex de CTA ("comente X") é heurística. Confira manualmente nos outliers.
- Post de lançamento fixado e viral pode ter sido impulsionado. Não dá para saber pelo orgânico; diga isso.
