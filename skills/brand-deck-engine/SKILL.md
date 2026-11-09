---
name: brand-deck-engine
description: >-
  Fonte única da mecânica de palco e da identidade visual dos decks desta marca.
  Use ao montar qualquer deck — nunca reescreva a mecânica de navegação nem os
  tokens de marca a partir do zero em cada deck. Na primeira vez que for usado,
  faz uma configuração inicial de marca antes de montar qualquer deck.
---
# brand-deck-engine

Contém os assets que todo deck desta marca inline no HTML final, sempre nesta ordem:

1. `assets/brand-tokens.css` — variáveis de marca (cores, fontes, glass, glow).
2. `assets/brand-deck-engine.css` — mecânica de palco (fade, fragments, controles, timer, notas, `@media print`). Agnóstica: só lê variáveis do arquivo 1.
3. `assets/brand-deck-exec.css` — componentes de KPI/tabela/veredito, via variáveis do arquivo 1.
4. `assets/brand-visuals.css` — camada visual "neural/glow" (orbs, cards com borda gradiente, terminal simulado, text-glow), via variáveis do arquivo 1. O arquivo real se chama `brand-visuals.css`, não `brand-deck-visuals.css`.
5. `assets/brand-deck-engine.js` — navegação (teclado/clique), timer, notas, fullscreen. Expõe `window.__deck` para verificação via Playwright.
6. `assets/brand-charts.js` — opcional, só se o deck tiver gráficos Chart.js. Lê os tokens do CSS em tempo de execução, não precisa ser editado quando a marca for configurada.
7. `assets/logos-brand.b64.txt` — logo da marca em base64 (versão pequena para header, versão grande para capa/encerramento). Vazio por padrão — ver "Antes do primeiro uso" abaixo. **Referencie a mesma string uma única vez por tamanho** e reaproveite via variável/template — nunca duplique o `<img>` de header em cada slide individualmente no fonte do template (o `templates/deck.html.tmpl` já resolve isso).
8. `assets/fotos-marca/` — acervo fotográfico (vazio por padrão — ver README da pasta).

## Arquivos neste Grok Bot

Os helpers desta skill ficam no mesmo diretório que este SKILL.md (o Skill tool informa o caminho). Caminhos relativos a partir daí: `assets/`, `templates/deck.html.tmpl`, `scripts/deck-to-pdf.sh`, `docs/EXPORTACAO-PDF.md`. O pacote completo, com as duas engines juntas, está em [apresentacoes-marca](sand-workflow:apresentacoes-marca).

No Grok Bot não existem os comandos `/deck` e `/configurar-marca`: trate o pedido de deck ou de configurar a marca como esses fluxos.

## Antes do primeiro uso: configurar a marca

Antes de montar o **primeiro** deck de verdade, confira `assets/brand-tokens.json`. Se o campo `"configurado"` ainda estiver `false`, ou se `"marca"` ainda for `"Sua Marca Aqui"`, pare e faça estas perguntas ao usuário (não assuma valores):

1. **Nome da marca ou empresa** (vai para o wordmark, título das páginas e rodapé).
2. **Cor primária** de destaque, em hex (equivalente ao antigo "cyan" de referência — a cor usada em ~30% do design, ligada a ação/destaque).
3. **Cor secundária** de destaque, em hex (equivalente ao antigo "purple" — usada em ~10%, para sofisticação/acento).
4. **Tem um arquivo de logo?** Se sim, peça o caminho do arquivo (PNG/JPG, de preferência com fundo transparente ou escuro, boa resolução). Se não tiver, tudo bem: o wordmark em texto já resolve sozinho, sem logo.
5. *(Opcional)* Tipografia própria da marca, se já existir um guia de marca com fontes definidas — senão, mantenha Sora/Inter/JetBrains Mono, que são neutras e já testadas no sistema.

Depois de coletar as respostas:

- Grave as respostas em `assets/brand-tokens.json` (`configurado: true`, mais os campos de identidade).
- Edite `assets/brand-tokens.css`: troque `--primary`/`--primary-dim` e `--secondary`/`--secondary-dim` pelos hex informados, e troque `--primary-rgb`/`--secondary-rgb` pelos MESMOS valores convertidos para canais `R, G, B` (sem "rgb(" em volta) — esses dois alimentam todo `rgba(var(--primary-rgb), 0.3)` de glow/transparência na engine, então têm que ficar em sincronia com o hex. Para a cor "dim", gere uma variante cerca de 15 a 20% mais escura/dessaturada da cor principal.
- Se um logo foi fornecido, converta para base64 e grave as duas tags `<img>` em `assets/logos-brand.b64.txt`, seguindo o formato documentado dentro do próprio arquivo. Se não foi fornecido, deixe o arquivo vazio e lembre-se de omitir as tags `<img>` de logo ao montar decks (o wordmark de texto já aparece sozinho).
- Nunca repita essa pergunta depois que os tokens já tiverem sido configurados — isso é uma configuração única por marca, não por deck.

## Regra de ouro

Nunca edite a mecânica (`brand-deck-engine.css`/`.js`) para resolver um problema pontual de um deck específico — isso quebra todos os decks já gerados com aquela versão da engine. Problemas pontuais de conteúdo se resolvem no HTML do deck; problemas de mecânica exigem decisão deliberada de versão da engine.

## Contrato de slide

```html
<section class="slide <layout>" data-notes="notas do apresentador">
  <div class="bg-orb primary" style="top:-10vh;right:-10vw"></div>
  <div class="brand-header">...logo pequeno + wordmark...</div>
  <span class="eyebrow">...</span>
  <h1 class="brand-text-grad">...</h1>
  <p class="frag" data-delay="1">...</p>
</section>
```

Layouts recomendados por formato de conteúdo ficam a critério de quem usa este pacote — este repositório não traz formatos pré-definidos (eles eram específicos do negócio de origem deste sistema).
