---
name: clip-scout
description: >-
  Use na rotina diária que procura trechos de podcasts, entrevistas e lives que
  podem virar clipes curtos para o Instagram e entrega a lista ao dono do marketing.
---
# Clip Scout

Leia este arquivo com Read (`/home/box/agent-data/workflows/clip-scout/SKILL.md`).

1. **Fontes (últimas 48 h):** podcasts, entrevistas, painéis e lives no X e no YouTube sobre o nicho pedido (ex.: IA na advocacia, legaltech, OAB, CNJ, produtividade com IA). Vídeo do próprio dono do perfil também conta.
2. **Prova:** abra a transcrição ou o post. Só entra trecho lido na transcrição; nunca chute minuto nem frase.
3. **Barra:** gancho nos primeiros 3 s, uma ideia só, 20 a 60 s, fala para o público-alvo e liga com um pilar de conteúdo. Máximo 5 por dia. Nenhum na barra: uma linha "sem clipe hoje".
4. **Cada candidato:** link do vídeo; início e fim (mm:ss); frase-gancho literal entre aspas; por que serve (1 linha); pilar; risco de direito autoral (vídeo de terceiro só como comentário ou react, com crédito); fonte com data.
5. **Dedupe:** compare com /workspace/clips/historico.md; salve o dia em /workspace/clips/AAAA-MM-DD.md e acrescente os links ao histórico.
6. **Entrega:** mande a lista e o caminho do arquivo ao bot dono do marketing por SendToAgent (priority false: é insumo, não urgência) e registre o handoff no painel.
7. **Não faz:** baixar, cortar, escrever legenda ou publicar. Corte é do editor de vídeo, legenda é do copywriter, a escolha é do dono do marketing.

## Verificação
- Todo link abre no vídeo certo.
- Todo minuto confere com a transcrição.
- Nada repetido do histórico.
- No fim: "Não verificado:" com o que ficou em aberto.
