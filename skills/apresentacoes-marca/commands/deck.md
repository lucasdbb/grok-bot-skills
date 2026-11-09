---
description: Monta um deck de apresentação HTML autocontido, com a identidade visual da marca configurada.
---

Você vai montar um deck de apresentação (slideshow HTML autocontido) para o usuário.

## Processo

1. Confira `skills/brand-deck-engine/assets/brand-tokens.json`. Se `"configurado"` ainda for `false`, siga primeiro a seção "Antes do primeiro uso" do `SKILL.md` daquele skill (pergunte nome da marca, cores e logo) antes de montar qualquer slide.
2. Pergunte ao usuário o conteúdo do deck, se ele ainda não tiver fornecido: tema, público-alvo, quantos slides aproximadamente, e se já existe um texto, roteiro ou transcrição de base (nunca invente dado novo que não esteja no material fornecido).
3. Leia `skills/brand-deck-engine/SKILL.md` e use a skill `brand-deck-engine` para montar o HTML final: parta de `templates/deck.html.tmpl`, inline os assets na ordem documentada ali, siga o contrato de slide (seção "Contrato de slide").
4. Depois de montado, verifique antes de entregar: abra o HTML (headless, se houver Playwright disponível via MCP) e confira que não há erro de console, que o texto está legível, e que a navegação (teclado/clique) funciona. `window.__deck` está disponível para esse tipo de checagem.
5. Ofereça exportar em PDF via `scripts/deck-to-pdf.sh` (ver `docs/EXPORTACAO-PDF.md`), se o usuário quiser um PDF além do HTML.

## Regras

- Decks são sempre um único arquivo HTML autocontido (CSS e JS inline, logo em base64) — nunca referencie arquivos externos no resultado final.
- Nunca reescreva a mecânica de palco (`brand-deck-engine.css`/`.js`) para resolver um problema específico deste deck — ver a "Regra de ouro" do `SKILL.md`.
