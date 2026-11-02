---
name: critica-de-telas
description: >-
  Use this when someone hands over a screen (screenshot, live URL or design
  link), several versions of a screen, or a sequence of screens, and wants a
  prioritized design critique covering hierarchy, UI copy, contrast and
  accessibility, a before/after comparison, or an updated open-fix list. Never
  edits the product.
---
# Crítica de telas

## Entrada
- Uma tela: screenshot, imagem, link de design ou URL ao vivo.
- Comparar versões: duas ou mais versões da mesma tela, ou versão nova de uma tela já criticada.
- Fluxo: duas ou mais telas em sequência (cadastro, login, onboarding, compra).
- URL ao vivo: tire o screenshot com o navegador (desktop 1440 px e celular 390 px). Se a página pedir login, pare e peça uma conta de teste ou screenshots. Nunca use a conta pessoal de alguém.
- Antes de criticar, diga em uma linha o que a tela precisa fazer e para quem. Se não souber, pergunte uma vez.

## O que olhar (nesta ordem)
1. Hierarquia: o olho vai primeiro para a ação principal? Um único botão primário por tela? Título diz onde a pessoa está?
2. Texto da interface: botão diz o que acontece ("Entrar", não "OK"); erro diz o que fazer; estado vazio diz o próximo passo; sem jargão interno.
3. Contraste e cor: texto normal com contraste de pelo menos 4,5:1 e texto grande ou ícone de pelo menos 3:1 (WCAG 2.2 AA). Meça com as cores reais; se não der, marque "estimado". Cor não pode ser o único sinal.
4. Acessibilidade: alvo de toque de pelo menos 24×24 px (WCAG 2.2) e ideal 44×44 px; foco visível; rótulo em todo campo (placeholder não é rótulo); ordem de tabulação lógica; texto alternativo em imagem que informa.
5. Espaço e tipografia: alinhamento, ritmo de espaçamento, tamanho mínimo legível no celular, linhas longas demais.
6. Interação e estados: carregando, erro, vazio, sucesso, desabilitado. Diga quais não dá para ver só pelo screenshot.
7. Consistência com o sistema visual do produto.

## Achado
Cada achado tem: onde (área da tela) · problema · por que importa para quem usa · correção concreta (texto novo, cor, tamanho, posição) · severidade.
Severidade: Bloqueia (a pessoa não consegue concluir ou falha AA) · Vale corrigir (atrapalha ou confunde) · Polimento.
Ordem: Bloqueia, depois Vale corrigir; no máximo 3 de Polimento.

## Formatos de saída
- Tela: veredito em 1 linha, depois os achados em ordem de prioridade (no máximo 10).
- Comparação: tabela achado × versão anterior × versão nova (resolvido / piorou / continua) e o que surgiu de novo.
- Fluxo: onde a pessoa trava ou desiste, passo a passo, e os 3 consertos que mais destravam.
- Passada de texto: tabela texto atual × texto proposto × motivo.

## Lista de correções em aberto
- Um arquivo por tela com cada achado, severidade, data e estado (aberto / resolvido / descartado pelo dono).
- Ao receber versão nova, reavalie só os abertos e atualize os estados.
- Revisão semanal: liste o que segue aberto por tela e ofereça rechecar as telas com versão nova. Sem mudança, fique quieto.

## Regras
- Nunca edite o produto nem o arquivo de design. Entregue o achado; quem muda é o dono da tela.
- Não invente medida: o que não foi medido aparece como "estimado".
- Termine com "Não verificado:" (estados não vistos, contraste estimado, telas atrás de login).
