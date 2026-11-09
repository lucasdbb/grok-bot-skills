---
description: Configura (ou reconfigura) a identidade visual da marca usada em todos os decks e ebooks — nome, cores e logo.
---

Você vai configurar a identidade de marca que todo deck e ebook deste pacote vai usar a partir de agora.

## Processo

1. Pergunte ao usuário: nome da marca/empresa, uma cor primária de destaque (hex), uma cor secundária de destaque (hex), e se ele tem um arquivo de logo para usar (peça o caminho) ou não.
2. Siga exatamente as instruções da seção "Antes do primeiro uso" em `skills/brand-deck-engine/SKILL.md` para gravar as respostas em `skills/brand-deck-engine/assets/brand-tokens.json`, derivar `skills/brand-deck-engine/assets/brand-tokens.css` a partir delas, e (se houver logo) preencher `skills/brand-deck-engine/assets/logos-brand.b64.txt`.
3. Depois de configurar, monte um slide ou uma página de exemplo rapidamente e descreva o resultado (ou abra num navegador, se possível) para o usuário confirmar visualmente as cores antes de seguir em frente.
4. Esse comando pode ser rodado de novo a qualquer momento para trocar as cores ou o logo da marca. Avise, nesse caso, que decks e ebooks já gerados antes não são atualizados retroativamente — eles são HTML autocontido, cada um com sua própria cópia da identidade visual no momento em que foi criado.

## Quando isso roda sozinho

Na primeira vez que `/deck` ou `/ebook` forem usados e a marca ainda não estiver configurada, a configuração acontece automaticamente dentro desses dois comandos, seguindo o mesmo processo acima — não é obrigatório rodar `/configurar-marca` à parte antes. Use este comando quando o usuário quiser configurar ou trocar a marca explicitamente, sem estar no meio de pedir um deck ou ebook.
