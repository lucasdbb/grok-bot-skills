---
name: pdf-design-system-ana
description: >-
  Use quando precisar gerar ou formatar um PDF no design system da ANA
  (playbook, análise de call, proposta, roteiro, one-pager, checklist).
---
# PDF Design System ANA

Gera documentos PDF com a identidade visual da ANA — A Nova Advocacia: fundo escuro, ciano #00F0FF e roxo #6366F1, cards arredondados, linhas em degradê, capa com spotlights. Padrão de referência: playbook "Objeções e Quebras".

Não use para PDFs de terceiros, peças processuais forenses, DOCX ou PPTX. Nunca use emoji (não renderizam bem e a regra de copy do Lucas proíbe).

## Ambiente na box

1. Python do venv: `/home/box/skill-assets/_venvs/pdf-ana/bin/python` (já tem reportlab). Se o venv não existir, crie com `python3 -m venv /home/box/skill-assets/_venvs/pdf-ana` e `pip install reportlab`.
2. Biblioteca: leia e importe `/home/box/skill-assets/pdf-design-system-ana/ana_pdf.py`. Nunca reescreva cores, fontes ou fundo do zero.
3. Fontes Noto Sans (latin) em `/home/box/skill-assets/pdf-design-system-ana/fonts/`; DejaVu do sistema para símbolos.
4. Ferramentas de QA: `pdfinfo`, `pdftotext`, `pdftoppm` (poppler). `qpdf` pode não estar instalado — ignore se faltar.
5. Alternativa se reportlab falhar: WeasyPrint já está no sistema, mas o visual ANA desta skill é o de `ana_pdf.py` (reportlab). Não troque a stack sem pedido explícito.

## Processo

1. Organize o conteúdo: capa (overline, título curto, subtítulo de 1 frase, 2–3 badges), seções numeradas, e escolha o componente certo para cada bloco.
2. Escreva um script (ex.: `/tmp/gerar_ana_pdf.py`) com:
   ```python
   import sys
   sys.path.insert(0, "/home/box/skill-assets/pdf-design-system-ana")
   from ana_pdf import *
   ```
3. Monte o documento com `AnaDoc` e salve em `/workspace/output/<Nome_Descritivo>.pdf` (sem espaços; nunca sobrescreva o arquivo de origem do usuário). Use o interpretador do venv.
4. Verifique: `pdfinfo` (páginas); contagem de palavras por página com `pdftotext -f N -l N` (páginas com menos de ~60 palavras estão quase vazias — remova `new_page=True` ou reagrupe); renderize capa e 1–2 páginas internas com `pdftoppm -r 55` e um recorte de parágrafo em `-r 150`, olhe as imagens; depois apague as imagens de teste.
5. Entregue o PDF e um resumo curto. Mencione pendências marcadas como [CONFIRMAR].

## API (AnaDoc)

- `d=AnaDoc(header="TÍTULO CURTO · TIPO", footer="ANA — A Nova Advocacia · uso interno")`
- `d.cover(title, subtitle, overline, badges=(...))` — omitir em docs de 1–2 páginas
- `d.section(title, overline=None, new_page=False)` — numeração automática 01, 02…
- `d.h3(t)`, `d.p(t)`, `d.small(t)`, `d.bullets([..])`
- `d.card(items, title, kind)` — kinds: `info` (ciano: scripts/falas), `analogia` (roxo), `alerta` (âmbar: cuidados/[CONFIRMAR]), `erro` (vermelho: proibições), `sucesso` (verde), `neutro`. `italic=True` para falas. `ret=True` devolve sem inserir.
- `d.table(rows, widths_mm)` — 1ª linha cabeçalho; larguras somam 170 mm
- `d.steps([(1,"..."),(2,"...")])`, `d.numbered_title(n, t)`, `d.label("Retomada", texto, "#10B981")`
- `d.divider()`, `d.closing(frase)`, `d.page_break()`, `d.build(caminho, title)`

## Regras de estilo

- Markup do reportlab: escape `&` como `&amp;`; use `<b>`, `<i>`, `<br/>`; destaque com `<font color='#00F0FF'>`. Sem gradiente em texto.
- Símbolos ⚖ ⚠ ✓ ✗ ★ passam por `fx()`. Sem emoji.
- Espaçamento fluido obrigatório: a biblioteca já define WORD_SPACE 340/1000, corpo 9,8 pt / leading 15,8, 7 pt entre parágrafos, 11 pt entre blocos, padding 14/12 nos cards. Nunca reduza; nunca justifique; nunca ParagraphStyle com leading < 1,5× ou corpo < 8,4 pt (exceto rótulos em caixa-alta). Prefira dividir parágrafos longos a apertar texto.
- `KeepTogether` só para título + primeiro parágrafo. Cards/tabelas longas fluem.
- Hierarquia: uma ideia por card; no máximo ~3 cards seguidos sem texto ou tabela.
- Tom ANA: autoridade acessível, urgência digna, sem promessas de resultado, sem jargão tech gratuito.
- Nunca mude paleta, fundo escuro ou estrutura de capa/cabeçalho/rodapé sem pedido explícito. Sem fundo branco.

## Restrições

- Não invente conteúdo só para preencher layout.
- Não grave senhas, tokens ou chaves no PDF; use [armazenar em cofre seguro].
