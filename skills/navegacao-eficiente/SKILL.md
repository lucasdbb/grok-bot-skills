---
name: navegacao-eficiente
description: >-
  Use antes de qualquer tarefa de navegador ou desktop (QA de site, prints de
  tela, preço em loja, leitura de página): regras para não perder tempo com
  endereço chutado, 404, aviso de cookies e página lenta.
---
# Navegação eficiente

Regras tiradas de um estudo de 45 tarefas reais de agentes no navegador: 12% das chamadas não levaram a nada e gastaram um terço do tempo nas páginas. A maior causa foi digitar endereço de cabeça.

## Regras (passe ao subagente de navegador junto com a tarefa)
1. **Endereço nunca de cabeça.** A URL vem de: um link visto na página, a busca do próprio site, um buscador, ou uma URL oficial já registrada no brief/skill. Não monte caminhos tipo `/pricing` ou `/docs/x` por palpite.
2. **Depois de um 404 ou de um redirecionamento para a home**, o próximo endereço vem de uma página que carregou (menu, mapa do site, busca), não de outro chute.
3. **Aviso de cookies, consentimento ou pop-up primeiro.** Aceite o mínimo ou feche antes de clicar em qualquer coisa da página; um clique por baixo do aviso só espera e falha.
4. **Página que não carrega:** tente de novo uma única vez (a primeira navegação depois de abrir o navegador às vezes falha e a segunda carrega). Página que passa de ~45 s: registre como "lenta" com a URL e siga, sem esperar até estourar o tempo.
5. **Leitura que falha logo depois de navegar:** tente ler mais uma vez antes de concluir que a página está vazia.
6. **Voltar ou recarregar** = navegar de novo para a URL anterior ou a própria URL.

## No relatório da tarefa
- Para cada tela: URL real, status (ok / erro / vazio / lento) e mensagem de erro exata.
- Endereço que deu 404 aparece como 404, com de onde veio o link.
- O que não carregou entra em "Não verificado:".
