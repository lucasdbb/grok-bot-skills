---
description: Monta um ebook de leitura contínua em HTML autocontido (e, se pedido, em PDF modo livro), com a identidade visual da marca configurada.
---

Você vai montar um ebook (documento HTML de rolagem contínua, com sumário e capítulos) para o usuário.

## Processo

1. Confira `skills/brand-deck-engine/assets/brand-tokens.json`. Se `"configurado"` ainda for `false`, siga primeiro a seção "Antes do primeiro uso" do `SKILL.md` de `skills/brand-deck-engine` (pergunte nome da marca, cores e logo) antes de montar qualquer capítulo.
2. Pergunte ao usuário a fonte do conteúdo, se ele ainda não tiver fornecido: um texto pronto, uma transcrição de aula/reunião, ou um resumo já estruturado. Preserve fidelidade total ao material fornecido — nunca invente fato, número ou citação que não esteja na fonte.
3. Leia `skills/brand-ebook-engine/SKILL.md` por completo e use a skill `brand-ebook-engine` para montar o HTML final: parta de `templates/ebook.html.tmpl`, inline os assets na ordem documentada ali, siga o "Contrato de capítulo". Use `.part-divider` só se a própria fonte já vier organizada em partes nomeadas pelo autor (ver seção específica do `SKILL.md`).
4. Depois de montado, verifique antes de entregar (headless, se houver Playwright disponível via MCP): sem erro de console, `window.__ebook.sections` com a lista de capítulos esperada, barra de progresso chegando a 100% no fim, sem overflow horizontal em largura de celular (~390px).
5. Se o usuário quiser PDF, use `node scripts/ebook-to-pdf-livro.js caminho/para/ebook.html` (modo livro, recomendado — ver `docs/EXPORTACAO-PDF.md`). Depois de gerar, confira a numeração de página: extraia o texto de todas as páginas do PDF (por exemplo com uma biblioteca de leitura de PDF) e confirme que cada capítulo cai exatamente na página que o sumário promete — não confie em amostragem visual de 2-3 páginas, esse tipo de erro de paginação não aparece assim (ver "Armadilhas conhecidas do paginador de PDF" no `SKILL.md`).

## Regras

- Ebooks são sempre um único arquivo HTML autocontido — nunca referencie arquivos externos no resultado final.
- Nunca reescreva a mecânica de leitura (`brand-ebook-engine.css`/`.js`) para resolver um problema específico deste ebook — ver a "Regra de ouro" do `SKILL.md`.
- Nunca use travessão (—) nem emoji no texto do conteúdo, salvo decisão explícita do usuário em contrário (essa era a regra de texto do negócio de origem deste sistema — confirme se também vale para a marca nova).
