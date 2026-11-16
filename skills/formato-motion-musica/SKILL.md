---
name: formato-motion-musica
description: >-
  Use esta skill ao planejar, roteirizar ou produzir um Reel de motion curto só
  com música (6–12 s, sem narração), em que uma comparação ou metáfora visual
  entrega a ideia sozinha. Visual copiado das referências: boneco palito
  simples, pequeno no centro, fundo preto, âmbar de destaque, legenda pequena
  embaixo, sem identidade de marca. Animado em código, com movimento vivo e
  fluido (2 a 4 cenas contínuas, easing, gestos na batida, sem corte seco).
---
# Formato: motion curto só com música

Referências (abra antes da primeira peça da semana):
- @visualhustles, planejador x procrastinador, 14 s: https://www.instagram.com/reel/DfcBmyGvz5r/ (a principal)
- @christiantriad, 2h todo dia x 10h no fim de semana, 13 s: https://www.instagram.com/reel/DfZ4RyixvuV/
- @christiantriad, quadrado x bola x rampa, 6 s: https://www.instagram.com/reel/DfUeShIRTPC/

## Decisões de referência (aprendidas nos pilotos)
- **10/11/2026:** copiar as referências "na cara dura", inclusive o visual: bonecos palito em fundo preto, **sem identidade de marca**. O foco é a animação, gostosa de ver e que dá curiosidade.
- **10/11/2026, depois dos pilotos v2:** "Se preocupe menos com detalhes de luz, expressão facial… os desenhos podem ser mais simples, boneco palito, e deixe menor também, concentrado no dentro da tela e mantendo a legenda embaixo. O Motion precisa ter movimentos mais dinâmicos e rápidos, estão muito lentos."
- **11/11/2026, depois do piloto v4:** rápido não é picotado. O movimento tem que ser contínuo e coordenado, como nas referências: sempre se mexendo, mas fluido.
- **11/11/2026, QUA-MS v2 reprovado:** "A história não tá fazendo muito sentido, tá sem contexto, tá difícil de entender a mensagem… não deve passar uma mensagem complexa. Deve passar algo simples e que possa ser compreendido de preferência em uma única imagem, com pouquíssimas palavras". A regra está em "Quando usar".

## Quando usar (a ideia: uma imagem, pouquíssimas palavras)
- **Uma ideia só, que se entende numa única imagem:** contraste de dois comportamentos, antes x depois, esforço x alavanca, muitos x um. O último quadro do vídeo é essa imagem pronta: se alguém só vir o print dele, entende a mensagem.
- **Pouquíssimas palavras:** no máximo ~8 no vídeo todo (rótulos curtos + uma frase de fecho). Nada de história em etapas, ação que precisa de contexto ou frase que explica a anterior. Se o tema não cabe numa imagem simples, escolha o recorte mais simples dele, mesmo perdendo nuance; a nuance vai para a legenda do post. Se precisa de explicação, use o motion narrado.
- **Referência:** [post do @sougustavoferreira](https://www.instagram.com/p/DfXVLf3l-33/). Uma imagem só: título de 5 palavras, um monte de bolinhas que vai diminuindo em faixas com rótulos de 2 a 4 palavras, e no fim só duas bolinhas, "outro cara" e "você". A quantidade de elementos conta a ideia; o texto só nomeia.
- **Exemplo aplicado:** QUA-MS v3. Em cima, "vários agentes" ligados por fios, e o documento pula de um para o outro até virar "?". Embaixo, "um agente", e cada documento ganha ✓. Fecho: "Comece com um." São 7 palavras e uma cena que se monta até virar a imagem final.

## Estrutura e ritmo
1. **0–1 s, gancho:** a comparação já montada na tela. Os dois lados entram em escada nos primeiros 0,5 s, e quem assiste fica para ver no que dá.
2. **Desenvolvimento:** a consequência aparece no corpo dos personagens e nos objetos (pula, cai, voa, encaixa, enche, transborda). Um gesto puxa o próximo.
3. **Final:** a última ação fecha a ideia, ou uma parada limpa (tudo assenta com follow-through) para o loop.

- **1 a 3 cenas contínuas** em 6 a 12 s (o ideal é uma cena que se monta até virar a imagem final). Dentro da cena, a ação avança sem corte. Cada texto de tela da Copy é um momento da mesma cena (entra um elemento novo, o anterior fica), não um plano novo.
- **Troca de cena sem corte seco:** deslize de câmera ou fade com sobreposição de 12 a 16 quadros (`Scene` + `play`). No curto, prefira o deslize, que mantém a energia.
- **Ritmo na batida:** 120 BPM = um tempo a cada 0,5 s. O início de cada gesto principal cai na batida, e a antecipação começa 60 a 120 ms antes dela.
- **Curvas:**
  - entrada `EZ_IN` (0,3 a 0,4 s no curto);
  - saída `EZ_OUT` (0,2 s);
  - deslocamento `EZ_MOVE`;
  - chegada de impacto com `EZ_POP` (passada leve, sem quique repetido);
  - follow-through de 40 a 80 ms;
  - trajetos em arco.
  Nada linear, a não ser ciclo ambiente e câmera.
- **Um protagonista por vez:** quando um lado age, o outro só respira. No máximo 1/3 dos elementos em movimento ativo.
- **Vivo sem tremer:** um início de movimento a cada 0,4 a 0,8 s. Ciclos (correr, digitar) com a caminhada de pé travado (`walker`, `gait`) e poses interpoladas (`pose_kf`), sem alternar duas poses no seco.
- Câmera: regra de câmera do passo 12 da `motion-reels`.
- **Nunca desacelere** uma ação para encher o tempo. Se sobrar tempo, acrescente o próximo gesto da história.
- **Conferência:** checador do passo 12 da `motion-reels` com **PASSA**. No curto, a % de ação pode ficar perto do teto de 60%; se passar, tire gestos secundários (deixe o objeto ser o protagonista) e encurte deslocamentos, sem desacelerar.

## Visual
- Fundo preto (#0A0A0A). Traço creme (#F0EADC) de ~7 px, pontas redondas. Âmbar (#E8B04C) só no que importa (o 2º lugar, a barra cheia, as engrenagens que encaixam, o ✓).
- **Boneco palito simples:** cabeça redonda vazada, tronco, braços e pernas em linha, membros de comprimento fixo e pés travados no chão (`fig_ik`). Sem rosto, sem brilho, sem luz de cena, sem sombra. O robô é o mesmo boneco com cabeça quadrada, antena e dois pontos âmbar.
- **Pequeno e no centro:** personagem com ~250 px de altura num quadro de 1080x1920. Tudo no terço do meio (y ≈ 600 a 1250), com bastante preto em volta e uma linha cinza de chão.
- Molduras, setas e barras se desenham ou enchem (`draw_on`, `rect_on`); números contam (`count`).

## Texto na tela
- Use os textos de tela aprovados na Copy, sem reescrever, dentro do limite de palavras de "Quando usar". Se a Copy passar disso, avise antes de animar.
- **Rótulos curtos e uma frase de fecho** (mono ~30 px nos rótulos; fecho em Work Sans ~104 px; a capa é outra, pelo passo 14 da `motion-reels`), **ou** legenda embaixo, pequena: Work Sans ~46 px, creme, centralizada em y ≈ 1560, trocando sem sobrepor (`caption_track`).
- Fonte de um dado: mono maiúsculo ~22 px, cinza claro, logo abaixo da legenda (y ≈ 1665), enquanto o número estiver na tela.
- Nada fora da zona segura (acima de y ≈ 220 ou abaixo de y ≈ 1700).

## Som
- Som: só SFX de movimento, sem música de fundo (regra de 12/11/2026); níveis, master e folha de eventos na seção Som da `motion-reels`. Nunca use música por nome sem direito confirmado.
- No curto, ponha na lista `SFX` da cena as ações desenhadas com `rect` que o detector não vê (documento pulando, computador se desenhando) e o fecho da ideia (`ding`).

## Regras
- Metáfora física no lugar de explicação (peso, atrito, velocidade, volume). Para IA ou automação, a IA é o robô ou a alavanca.
- Duração alvo de 6 a 12 s. CTA da linha só na legenda do post.

## Checklist antes de entregar
- [ ] Entende-se no mudo, só com a animação e o pouco texto, e o último quadro sozinho passa a ideia (regra de "Quando usar")?
- [ ] A comparação está clara no 1º segundo?
- [ ] 1 a 3 cenas contínuas, sem corte seco, com os gestos principais na batida?
- [ ] Um protagonista por vez, trajetos em arco, poses interpoladas e pés travados?
- [ ] `checa_ritmo_motion.py` deu **PASSA**?
- [ ] Boneco palito simples, pequeno, no centro, com preto em volta?
- [ ] Legenda pequena embaixo, nunca sobreposta; número com fonte no rodapé?
- [ ] Som conforme a seção Som da `motion-reels`, com a folha de eventos aberta?
- [ ] Capa conforme o passo 14 da `motion-reels`?
