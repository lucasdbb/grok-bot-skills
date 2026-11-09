---
name: Relatório semanal visual ANA
description: >-
  Use ao gerar o PDF visual semanal da A Nova AdvocacIA (ANA): o que cada bot
  fez na semana e como a operação está em relação à meta oficial do ciclo.
  Também use na rotina de domingo, ao testar, refazer ou redesenhar esse
  relatório.
---
# Relatório semanal visual ANA

Gera o PDF visual semanal da A Nova AdvocacIA (ANA): o que cada bot fez na semana e como a operação está em relação à meta oficial do ciclo.

O visual desta receita foi aprovado pelo Lucas em 08/11/2026, no relatório da semana 2026-W46. Repita esse padrão; não volte ao visual editorial claro.

## Entrega

- Um PDF A4 enviado no chat com o Lucas.
- Caminho canônico: `/workspace/ana/relatorios/ceo-ana/AAAA-Www-relatorio-semanal.pdf` (semana ISO).
- Entregar sempre, inclusive em semana quieta — diga o que não avançou.
- Recorte: segunda a sábado da semana que termina naquele domingo, horário de Recife.
- No chat: 2 a 4 frases com o recorte, se a meta está no rumo e o principal que não avançou. Não cole o corpo inteiro do relatório.

## Visual (Brand DNA / Lovart ANA)

Fonte canônica: Brand DNA do Design ANA / Lovart ANA no Notion. Nunca usar fundo claro ou branco.

### Tokens

- Deep Space `#050811` — fundo de página
- Electric Cyan `#00F0FF` — acento primário, kickers, cantos HUD
- Aurora Purple `#6366F1` — acento secundário e constelação
- Holographic Gold `#D4AF37` — meta, destaques e caixas de aviso
- Neural White `#FAFBFF` — texto
- Surface `#0A1628` — cards
- Elevated `#0F1E35` — trilhos de barra e fundos internos
- Gray `#94A3B8` e linha `#334155`
- Erro `#EF4444`; sucesso `#10B981` / `#34D399`

Pode reutilizar tokens de produto que não conflitem (Void, Surface, Elevated). Não usar Sora nos títulos — Sora é do design system de produto, não deste relatório.

### Tipografia

- Títulos: Orbitron Bold (600/700)
- Corpo: Inter (400–700)
- Números, kickers e rodapé: JetBrains Mono
- Bug do Orbitron: `ã` e `õ` podem virar `à` e `ò`. Palavras com til (como “Relatório” e “Não”) vão em Inter, não em Orbitron
- Usar cópias estáticas locais das fontes. Não depender de Google Fonts nem de variable fonts no WeasyPrint

### Chrome

- Constelação Neural no fundo (ciano e roxo sobre Deep Space)
- Cantos HUD ciano/roxo em cada página
- Cards em vidro escuro com borda ciano suave
- Capa full-bleed; demais páginas com margem cerca de 13 mm e rodapé `ANA · Relatório semanal AAAA-Www` + número da página
- Logo: lockup oficial (dois diamantes + wordmark) com fundo recortado. Preferir `/workspace/ana-snap/assets/ana-brand-lockup.png`. Não usar `ANA_Logo_Original.png` se o xadrez de transparência estiver achatado em RGB

Não usar o visual editorial claro (fundo bege, Fraunces, IBM Plex).

## Estrutura das páginas

1. **Capa** — logo, título “Relatório semanal ANA”, semana ISO, período, para quem, preparado por, gerado em (Recife), regra de dado
2. **A semana em resumo** — cards da meta vs realizado vs ritmo; indicadores líderes (calls, leads, alcance); alerta se fora do rumo; até 6 achados com fonte
3. **Placar da meta** — tabela meta × prazo × medição × realizado × esperado linear × ritmo restante; gráfico de avanço no ciclo
4. **Atividade por bot** — gráfico de barras + cards (nome, papel, status ativo/parcial/ausente/travado, bullets, fonte)
5. **Demais diretorias** — continuação dos cards
6. **O que não avançou** — gargalos e ausências da semana
7. **Próxima semana** — no máximo 3 prioridades, cada uma com dono
8. **Fontes e Não verificado** — lista de fontes com data; o que ficou em aberto

Páginas com ar no rodapé são aceitáveis: a constelação preenche. Não invente texto só para encher.

## Dados

1. Ler a meta oficial em KPI's Vendas (`https://app.notion.com/p/38f7e086a02f80c5ab8fd464d6ea408f`) e a decisão vigente em 🤝 Decisões. Usar o número, o prazo e o jeito de medir que estiverem lá.
2. Número só com fonte e data. Sem fonte: escrever “dado ausente”. Não inventar.
3. Não misturar ITS EDU nem Braga Advogados com números da ANA.
4. Realizado do ciclo = o jeito de medir oficial (caixa recebido da ANA, quando for o vigente).
5. Ritmo linear = meta restante ÷ semanas (ou dias) restantes; mostrar a conta.
6. No gráfico da meta, ajustar a escala ao valor oficial. Não deixar o eixo preso num valor antigo.
7. Atividade por bot: contar arquivos de trabalho datados no recorte. Se as datas de modificação do sistema estiverem zeradas (restauração), ler a data dentro do arquivo.
8. Separar leading (atividade da semana) de lagging (caixa, vendas, CAC, NPS).

## Como gerar

1. Reusar e atualizar `/workspace/ana/relatorios/ceo-ana/build/gen.py` (HTML → WeasyPrint → PDF). Não recomeçar o visual do zero.
2. Atualizar textos, números, gráficos e o rodapé da semana.
3. Preparar as fontes estáticas em `build/fonts/` e o logo recortado.
4. Exportar para o caminho canônico da semana.
5. Enviar o PDF no chat como anexo.

## Não fazer

- Fundo branco ou claro
- Inventar venda, caixa ou KPI
- Tratar meta vencida ou meta de trabalho não documentada como oficial
- Misturar contas de outras empresas
- Publicar o PDF fora do chat com o Lucas, salvo pedido explícito
