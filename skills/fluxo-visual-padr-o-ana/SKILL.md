---
name: Fluxo visual padrão ANA
description: >-
  Use quando o Lucas pedir um fluxo bonito, com as cores da ANA, para o time
  (PNG/SVG/HTML): escolhe entre 5 desenhos (mapa de funções, rotina em raias,
  cartão do bot, árvore de decisão, painel de rotinas de um bot) ou o pacote
  completo para um sistema de bots, sempre no visual escuro ANA e com as regras
  de legibilidade.
---
# Fluxo visual padrão ANA

Esta skill é a parte visual dos fluxos. O conteúdo (etapas, donos, decisões) tem que estar fechado antes, no Mermaid e na tabela de etapas. Ela não cria etapa, responsável, prazo nem número: o que não tiver fonte fica [a definir]. Fluxo de processo da ANA é do Processos ANA; esta skill vale só para fluxos fora da ANA que o Lucas quer com a identidade visual da ANA.

Modelo visual aprovado em 09/11/2026: `/workspace/fluxos/_padrao-ana/modelo-swimlane-ana.html`, com a imagem em `referencia.png`. Exemplo do pacote completo testado em 12/11/2026 e refeito com as regras de legibilidade no mesmo dia (versão anterior em `pacote/_v1/`), com os scripts geradores (`ana.py` com as partes comuns e a checagem automática de legibilidade, e um script por desenho): `/workspace/fluxos/exemplo-handoff-bots/pacote/`. Reaproveite as defs (markers, glows, constelação), o estilo dos nós e os scripts. Não reinvente o estilo.

## 1. Escolha o desenho
Cada desenho responde a uma pergunta diferente do time:

| Pedido | Desenho | Pergunta que responde |
|---|---|---|
| "que bots/áreas preciso", começo de operação | A. Mapa de funções | O que a operação precisa entregar? |
| um processo com várias pessoas ou bots | B. Rotina em raias | Quem faz o quê, em que ordem? |
| detalhar um bot só | C. Cartão do bot | O que ele recebe e o que entrega? |
| regra de go/no-go, triagem, aprovação | D. Árvore de decisão | Como ele decide? |
| "rotinas do bot X", agenda de um bot | E. Painel de rotinas | Quando ele roda sozinho e o que cada rodada entrega? |
| um sistema inteiro de bots | Pacote | A + B + um C por bot + D só onde houver decisão importante + E dos bots que têm rotinas |

Na dúvida, o padrão é B. Avise em 1 linha qual desenho escolheu e por quê.

## 2. Regras comuns aos 5 desenhos
- Topo: eyebrow em JetBrains Mono, caixa alta, cyan (`<TIPO> · <NOME> · ANA`), com um ponto dourado antes.
- Título em Orbitron com a CONCLUSÃO, não o assunto. Por exemplo, "O Lucas só entra em 2 portões", e não "Fluxo de handoff". O trecho-chave vai destacado numa etiqueta de vidro roxo.
- Subtítulo de 1 linha em Inter, com a cadeia resumida (A → B → C).
- Cada seta que leva algo de um lado a outro ganha uma etiqueta (chip) dizendo o que passa (arquivo, pedido, aprovação), em JetBrains Mono sobre fundo `#050811`.
- Portão humano (onde o Lucas ou uma pessoa aprova) fica em DOURADO com borda tracejada, para se distinguir dos bots. O dourado também marca a entrega final. Não use mais de 3 nós ou cartões dourados por desenho (setas, chips, caixas de resumo como SEU TEMPO e o fundo sutil da raia do Lucas não contam).
- Elemento opcional sem fonte (id do bot, coluna de agendados, moldura "roda sem você", bloco de fechamento) é omitido, nunca preenchido com conteúdo inventado.
- No rodapé: legenda (símbolos usados) e, à direita, um contador em mono (por exemplo `1 gatilho · 5 bots · 2 portões`).
- Caixa "RESUMO" com 3 linhas numeradas (01, 02, 03) nos desenhos B, C, D e E.
- Número sem fonte aparece como `[est]` ou `[a definir]`, nunca inventado.

## 3. Tokens (fixos)
- Fundo Deep Space `#050811`, sempre escuro, com o padrão de constelação (pattern de 48px com pontos cyan e roxos; opacidade do padrão inteiro 0.45, para não competir com o texto).
- Electric Cyan `#00F0FF`: setas, bordas, chips, texto secundário.
- Aurora Purple `#6366F1`: decisões e o destaque do título.
- Holographic Gold `#D4AF37`: entrega final e portões humanos.
- Neural White `#FAFBFF`: texto principal.
- Vidro: `rgba(0,240,255,0.10)`, sempre por cima de um retângulo `#050811`.
- Glows: feDropShadow com stdDeviation de 2.2 a 2.4 e opacidade de 0.55 a 0.65.
- Fontes: Orbitron 700 em caixa alta (rótulos e títulos de cartão), Inter (texto corrido, rótulos Sim e Não), JetBrains Mono (arquivos, status, chips, horários). Atenção: no Orbitron o til de "Õ" sai pequeno; se incomodar, reescreva o rótulo.
- Proibido: cores quentes, fundo claro e logo inventado.

## 3b. Legibilidade (obrigatório; valores no canvas, o PNG sai em 2x)
- Tamanho mínimo: nada abaixo de 14px. Texto corrido 17–18px (Inter); nome de etapa em Orbitron 16–17px; chips de seta e SIM/NÃO 15px; eyebrow 15px; subtítulo 19px; título 30–34px; RESUMO 18px; legenda 16px.
- Hierarquia: título > rótulo da raia (18px) > nome da etapa (16–17px) > detalhe/status (15px mono). Etapas numeradas com badge em círculo (colunas da rotina, cartões do mapa, checagens da árvore).
- Contraste: texto principal Neural White `#FAFBFF`; texto secundário com opacidade de 0.85 a 0.9 (nunca abaixo de 0.8); nada de cinza fraco sobre `#050811`. Etiqueta roxa = fundo `rgba(99,102,241,0.40)` com texto branco (roxo puro em texto pequeno não tem contraste).
- Chips e SIM/NÃO com fundo sólido `#050811` + borda 1–1.4px; chip ao lado da seta quando o trecho for curto (menos de 80px), nunca em cima de nó, de outro chip ou de linha divisória de raia.
- Texto por nó: nome com no máximo 2 linhas curtas + 1 linha de status/detalhe. O que passar disso vai para o RESUMO, as caixas de baixo ou uma etiqueta no canto do nó.
- Setas: 2.6px (handoff 3px), pontas de 15×12 (markerUnits userSpaceOnUse); trecho mínimo de cerca de 50px entre nós vizinhos; nenhuma seta cruzando texto ou nó.
- Respiro: line-height 1.35; padding interno de 22 a 30px; pelo menos 60px de vão vertical entre linhas de nós; 24 a 28px entre cartões; aumente o canvas quando faltar espaço (altura calculada pelo rodapé).
- Legenda: quebra em mais linhas quando não couber; o contador desce para a 2ª linha à direita em vez de encostar na legenda.
- Conferência: o gerador (`ana.py`) acusa sozinho fonte < 14px, opacidade < 0.8, texto que vaza e nó com mais de 2 linhas; só entregue com zero avisos.

## 4. Os 5 desenhos

### A. Mapa de funções (paisagem, cerca de 1640×740)
- Uma linha com 4 a 6 cartões de vidro, um por função ou área. Cada cartão leva uma barra de cor no topo, alternando cyan e roxo.
- Cada cartão tem número em círculo, nome da função (Orbitron) e, embaixo, uma linha do que ela faz. Depois de um divisor, vem `SAÍDA SEMANAL` (mono cyan) com uma saída CONTÁVEL. No pé, `DONO` com um chip do bot ou da pessoa.
- Rodapé com uma frase-regra em itálico (por exemplo, "Linha que não dá pra contar ainda é sensação").
- A saída e o dono só entram com fonte; sem fonte, `[a definir]`.

### B. Rotina em raias (paisagem, cerca de 2040 de largura)
- É a evolução do modelo aprovado. Uma raia horizontal por bot ou pessoa, com rótulo à esquerda (nome em Orbitron e, embaixo, em mono, quando roda: "seg 09:00" ou "depois de X DONE").
- Opcional: uma coluna `TEMPO · CUSTO` ao lado do rótulo. Colunas numeradas no topo com badge em círculo (`1 PEDIDO`, `2 TRIAGEM`...).
- Os nós de atividade são retângulos (cerca de 210×84) com o nome da tarefa e, embaixo, em mono, o arquivo ou status que produzem.
- A ÚLTIMA raia é a do Lucas, em vidro dourado bem sutil, e só contém os portões dele.
- Passos que rodam sozinhos podem ser agrupados numa moldura tracejada com a etiqueta "roda sem você".
- Rotinas paralelas ou agendadas vão numa coluna à direita ("TAMBÉM AGENDADO"), em cartões tracejados.
- Embaixo ficam 3 caixas de até 2 linhas: O GATILHO (o que faz cada passo começar), O CUSTO (só números verificados, senão `[est]`) e SEU TEMPO (quantos portões o Lucas tem).
- Seta de handoff com gradiente de cyan para roxo. Seta depois de um portão humano em dourado. Retorno depois de espera, tracejado.

### C. Cartão do bot (retrato, cerca de 1240×1360)
- 4 blocos numerados, de cima para baixo:
  - `01 · ENTRA`: cartões das entradas (de qual bot ou fonte) com o chip do arquivo; uma entrada que depende de aprovação humana vai em dourado.
  - `02 · O BOT`: cartão grande com nome (Orbitron 30px), id em mono (se houver fonte), 2 linhas do que faz, um chip de quando roda e um chip do que lê.
  - `03 · ESCREVE`: à direita, os arquivos ou saídas.
  - `04 · PASSA PARA`: os bots seguintes (blocos de cerca de 360×124), com "lê X · começa quando Y". Quando a seta se divide, a etiqueta no ponto da divisão, em caixa roxa sólida com texto branco, diz o tipo: "em paralelo", "um ou outro" ou "conforme a checagem".
- Setas ortogonais com chips. Caixa RESUMO de 3 linhas embaixo.

### D. Árvore de decisão (paisagem, cerca de 1960×1170)
- Na esquerda, um cartão INÍCIO com o que o bot carrega (arquivos em mono).
- No meio, 2 a 6 losangos roxos em linha (cerca de 240×150), cada um com uma pergunta curta. O número em círculo com o nome (`01 · DEMANDA`...) e o critério, em Inter cyan, ficam no lado livre do losango (o lado por onde não sai seta).
- O caminho que leva à próxima checagem segue na horizontal (normalmente o SIM, mas pode ser o NÃO). O outro sai para cima ou para baixo, tracejado, até uma caixa de destino (por exemplo REFAZER, SEGURAR, CANCELAR), que leva o nome em Orbitron e até 2 linhas do que acontece; quais checagens caem ali vai numa etiqueta roxa no canto da caixa.
- Na direita, um cartão DOURADO com a única saída que avança (por exemplo, APROVADO) e o que ela escreve ou para quem passa.
- Embaixo, opcionalmente, o "bloco de fechamento" que o bot escreve (STATUS, DECISÃO, FONTES, PRÓXIMO PASSO) em mono, só se houver fonte.
- O critério de cada losango só entra com fonte; sem fonte, `[a definir]`.

### E. Painel de rotinas de um bot (paisagem, cerca de 2000 de largura)
- Fonte das rotinas, nesta ordem: o que o Lucas disser, as rotinas do próprio bot (o dono pode listá-las; um bot não lê as rotinas de outro), o painel de status, se tiver a lista. Nunca invente rotina, horário ou saída; se não houver fonte, peça a lista ao Lucas ou marque [a definir].
- Topo: cartão do bot (nome em Orbitron, 1 linha do papel dele, chip com o total de rotinas e chip "próxima: <dia e hora>" em mono).
- Centro: grade semanal (colunas SEG a DOM, mais uma coluna `DIÁRIO` se houver rotinas diárias; linhas por faixa de horário). Cada rotina é um bloco de vidro cyan no dia e no horário em que roda, com o nome curto e, embaixo, em mono, o horário (fuso America/Sao_Paulo). Siga as regras de legibilidade: se a grade apertar, aumente o canvas em vez de diminuir a letra.
- Rotinas disparadas por evento (e-mail, webhook, Slack, PR) não têm horário: vão numa faixa à direita, "DISPARA QUANDO", em cartões tracejados com o gatilho em mono.
- Rotina pausada fica apagada (opacidade do bloco 0.5, mas o texto dela nunca abaixo de 14px) e com o chip `pausada`. Rotina que depende de aprovação do Lucas leva borda dourada tracejada.
- Embaixo, uma tabela-cartão por rotina: nome, quando (por extenso), o que lê, o que entrega e para quem, e se fica quieta quando não há novidade.
- Rodapé com contador (por exemplo `4 rotinas · 3 agendadas · 1 por evento · 1 pausada`) e caixa RESUMO de 3 linhas.

## 5. Saída
1. Salve em `/workspace/fluxos/<nome>/` (no pacote completo, em `/workspace/fluxos/<nome>/pacote/`), um arquivo por desenho: `mapa-funcoes.*`, `rotina.*`, `cartao-<bot>.*`, `decisao-<bot>.*` (ou `decisao.*` quando a árvore cobre mais de um bot), `rotinas-<bot>.*`, cada um em `.html`, `.svg` e `.png`. Guarde junto os scripts que geram os desenhos, para reaproveitar. Ao refazer um desenho já entregue, guarde antes os PNGs antigos em `_vN/`.
2. Exporte o PNG em 2x com o Chrome headless: `google-chrome --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=2 --virtual-time-budget=10000 --window-size=<largura+100>,<altura+100> --screenshot=<arquivo>.png file:///workspace/fluxos/<nome>/<arquivo>.html`. O `--virtual-time-budget` espera as fontes do Google carregarem. Use o export_png.py da skill diagram-design só se o Playwright estiver instalado.
3. Copie cada PNG para `/tmp/<nome>-vN.png` (N novo a cada render, para não ver versão velha), abra e confira, incluindo se o Orbitron e o Inter carregaram:
   - zero avisos da checagem de legibilidade do gerador;
   - nenhum texto vaza do nó e nenhuma seta cruza um nó;
   - todo losango tem SIM e NÃO e todo caminho chega a um fim;
   - o título traz a conclusão;
   - os desenhos do pacote contam a mesma história do Mermaid e da tabela (mesmos bots, mesmas etapas, mesmos arquivos, mesmas rotinas).
4. Mande os PNGs no chat (no pacote, na ordem A, B, C, D, E) com 1 ou 2 linhas sobre cada um e onde ficaram os arquivos.
5. Revisão de marca pelo Design ANA, cena no Excalidraw e envio para outra pessoa: só com o ok explícito do Lucas.

## Excalidraw (só com ok)
Mesma paleta: canvas `#050811`, traço `#00F0FF`, preenchimento `#0A1A24`, decisão `#6366F1`, final e portões `#D4AF37`.
