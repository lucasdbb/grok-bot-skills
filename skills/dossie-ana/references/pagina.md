# A página do dossiê

Base: `assets/modelo-dossie.html`. Ela já resolve o visual da ANA (fundo deep space, cyan e purple, gradiente neural, Sora e Inter, glassmorphism, sem emojis, sem balança), as abas com âncora (`#perfil`, `#escritorio`, `#roteiro`, `#dashboard`), os gráficos em SVG sem biblioteca e o layout de celular. Troque o conteúdo e mantenha o CSS e o JS. Confira paleta e o que não pode no [Lovart ANA](https://app.notion.com/p/3937e086a02f8050ae40c132b112fd59) e no [2. Sistema visual](https://app.notion.com/p/4177e086a02f8197b190d45f60ee8fd2).

## Topo

- Eyebrow "Dossiê de lead", nome em duas linhas (a segunda com gradiente), subtítulo de uma frase.
- Cartão de identidade: OAB, escritório, CNPJ, sede, carreira, site ou Instagram.
- **Tese:** uma frase sobre por que a ANA serve para esse escritório, com o dado mais forte.
- Carimbo com a data da call.

## Aba Perfil

KPIs (4) → Quem é (formação e instituições) → O escritório e a atuação real (estrutura, carteira, do outro lado) → O que o Instagram mostra (um cartão por perfil mais um de leitura) → Linha do tempo → Dores prováveis e onde a ANA entra (6 cartões, cada um com um colaborador) → alerta de aderência ao ICP → Confiabilidade e fontes (tags Confirmado, Inferido e Não verificado).

Os colaboradores e o ICP vêm das fontes do Notion listadas no SKILL.md. Se faltar o nome de um colaborador ou o ICP oficial, peça ao DV ANA e não invente.

## Aba Escritório e sócios

Só existe se houver sócios ou marca de escritório além do lead. Se não houver, remova o botão, a `section` e o id da lista do script de abas.

KPIs (advogados, processos somados, processos em comum, promessa do site) → um cartão por sócio (OAB, volume, trajetória, papel na decisão) → barras de volume por advogado → o site (o que diz e o que a análise mostra) → alerta com o achado concreto → como isso muda a leitura.

## Aba Roteiro

Conforme `references/roteiro.md`. A estrutura HTML das fases (`.phase`, `ol.qs`, `.why`, `.listen`) e das objeções (`.obj-row`) está no modelo.

## Aba Dashboard

Os dados vêm do `djen_metricas.json` e entram no objeto `D` do script no fim da página:

| Chave em `D` | Origem no JSON | Ajuste |
|---|---|---|
| `mes` | `por_mes` | começar no primeiro mês com volume relevante; o último mês é parcial, diga na legenda |
| `trib` | `tribunais` | juntar a cauda em "Outros (...)" |
| `materia` | `materias` | barra roxa na primeira linha só se for "Cível geral" |
| `classe` | `classes` | top 10 |
| `contra` | `grandes_litigantes` | |
| `orgao` | contagem por órgão, se o subagente trouxer | senão, remova o cartão |
| `ano` | `ano_ajuizamento` | juntar anos antigos em "até AAAA" |

**Escritório com vários sócios:** o comprador é o escritório. Una os `djen_bruto.json` dos sócios (sem repetir `id`), rode `djen.py --bruto <unido> --oab <sócio com mais volume>` e use esse resultado no dashboard. Acrescente um bloco "A carteira de <lead>" com as matérias e classes só dele. Os processos em comum entre sócios saem das rodadas individuais com `--socios`, não da unida.

Recalcule à mão o que está fixo no HTML: KPIs, a linha de média no gráfico mensal (valor e índice do primeiro mês do ano corrente em `lineChart`), o destaque do ano de pico em `colChart`, as larguras das barras empilhadas de polo e PF/PJ e as alturas máximas (`max`) dos dois gráficos. A tabela de processos de exemplo vem do subagente de processos.

Mantenha a nota de método no fim: o DJEN só cobre de 2024 em diante, e matéria e polo são deduzidos do texto.

## Entrega

`<title>`: "Dossiê <Nome Sobrenome>". Grave o HTML preenchido em `/workspace/dossies/<slug-do-lead>/dossie.html` e entregue como anexo no chat. Esse é o caminho padrão, porque o gabarito tem gráficos em JavaScript. Se quem pediu preferir, publique também como Página do Grok Bot (Canvas), com o HTML como fonte. O arquivo fica no box; só vai para o CRM ou para fora com ok. Avise quem pediu se o dossiê for mostrado para alguém além da equipe.
