---
name: metodo-teste-de-produto
description: Use this when the Teste de Produto bot runs a test (rápido, contraponto, plano, laboratório ou profundo) and needs the full method: evidence grades, evidence hunt, pre-mortem, kill criteria, cheapest test design, opportunity cost, lab rules and the decision log.
---
# Método do Teste de Produto

## 1. Notas de evidência (A–E)
- **A comportamento:** pagou, trocou de fornecedor, assinou, gambiarra observada.
- **B primária forte:** entrevista sobre o passado (não sobre o futuro), dado real, preço público de concorrente, demonstrativo.
- **C reforço:** reviews, Reclame Aqui, Reddit, X, YouTube, estudos de caso.
- **D indício:** volume de busca, vagas, investimento, relatório de mercado.
- **E opinião:** afirmação, intenção declarada, persona ou simulação.
D e E nunca são validação. "Seguir" exige pelo menos uma A ou duas B independentes na crença-gargalo.

## 2. Caçada de evidência (a favor e contra)
- Concorrente que cobra: preço, plano, tempo no ar (Wayback Machine via web).
- Anúncio rodando há mais de 30 dias na Biblioteca de Anúncios (ScrapeCreators facebook_ad_search).
- Reclamação repetida e gente pedindo a solução em público (X, Reddit, Reclame Aqui, comentários de YouTube/TikTok/Instagram via ScrapeCreators).
- Páginas e listas: firecrawl ou Apify, em volume pequeno.
- **Contra, sempre:** para cada premissa importante, procure quem desistiu, cancelou, reclamou ou faliu tentando. Diga o que achou, mesmo se nada.
- Antes de gastar crédito de Apify, ScrapeCreators ou firecrawl acima de volume pequeno (~50 itens), diga o custo estimado e peça ok.

## 3. Crença-gargalo e teste mínimo
A crença-gargalo é a única incerteza que mais muda a decisão. Para ela, monte um **cartão de teste**:
- Hipótese falsificável: "X de Y [quem] fazem [comportamento] em [prazo]".
- Teste mais barato que gera evidência A ou B (ex.: 10 entrevistas sobre o passado, fake door, concierge, pré-venda, landing com lista). Escolha por ganho de informação, custo, prazo e reversibilidade.
- Métrica única, **meta de passar** e **linha de matar**, decididas ANTES de rodar.
- Custo (horas e R$), prazo (data), quem executa.
- Se o resultado cair entre as linhas: um único reteste ajustado; depois decide.

## 4. Critério de matar (kill criteria)
Mate ou troque por tese vizinha quando:
- a crença-gargalo falhou na linha de matar combinada;
- não existe ninguém pagando por nada parecido E ninguém tem gambiarra para a dor;
- a conta de unidade não fecha nem no cenário otimista (CAC > 1/3 do LTV, margem bruta < 50% em software/serviço digital);
- o risco legal ou de plataforma é bloqueante sem saída clara;
- o custo de oportunidade é pior que a melhor alternativa atual do Lucas (seção 6).
Nunca mude a linha de matar depois de ver o resultado.

## 5. Pré-mortem
Antes do veredito "seguir" ou do plano: "É daqui a 12 meses e a ideia morreu. Por quê?" Liste os 3–5 motivos mais prováveis (mercado, canal, preço, execução, legal, atenção do Lucas), a probabilidade de cada um [hipótese] e o sinal precoce que avisaria. Os motivos de maior risco viram itens do plano ou do próximo teste.

## 6. Custo de oportunidade
Compare a alocação pedida com o que o Lucas já tem em andamento (ANA, ITS EDU, Braga Advocacia): mesmas horas e R$ aplicados na melhor alternativa conhecida rendem mais ou menos? Diga em uma frase. Se não sabe as alternativas, pergunte uma vez ou marque [hipótese].

## 7. Alocação (dimensionamento)
Degraus: 0) não investir; 1) até 5 h e R$ 0 (pesquisa de mesa); 2) até 20 h e até R$ 500 (teste mínimo); 3) MVP com prazo de 90 dias e teto de R$; 4) aposta séria. Só suba um degrau com o critério do degrau atual cumprido. Diga "até quando" e o que destrava o próximo.

## 8. Contraponto
Monte a melhor versão (steelman) da tese do Lucas, liste o que precisa ser verdade, a nota de cada ponto e o teste que separa as duas visões. Mude o veredito se a evidência mudar; não por insistência.

## 9. Plano de execução
Cunha de entrada (1º cliente, 1º uso), MVP mínimo, rota para os 10 primeiros clientes, 30/60/90 dias com marcos, custo, kill criteria por fase, riscos do pré-mortem, checagem legal e de plataforma, e o bot dono de cada parte.

## 10. Legal e plataforma
LGPD (dono do dado, base legal para reuso), termos de Meta, WhatsApp e outras APIs, OAB (Provimento 205/2021) quando tocar a Braga Advocacia. Diga quando não tem certeza e o que confirmaria.

## 11. Laboratório (/workspace/teste-produto/sim.py, .venv)
- `sim.py sociedade`, `montecarlo`, `preco` (Van Westendorp), `intencao` (desconto de intenção declarada). Exemplos: exemplo_*.json.
- Parâmetros com fonte ou faixa larga marcada [hipótese]. Personas acertam a direção mas exageram entusiasmo (Argyle et al. 2023; Brand, Israeli e Ngwe 2023): sempre passe intenção pelo `intencao` (pesos padrão também são [hipótese]).
- Van Westendorp com menos de 30 respostas reais é palpite. Rode duas seeds e diga se o veredito muda. Método da sociedade inspirado na Syn.be; o "92%" deles não foi verificado.
- Painel sintético: 20–60 personas com tensões e variância; nunca dado pessoal de cliente. Simulação é nota E.

## 12. Registro de decisões e calibração
- **/workspace/teste-produto/previsoes.csv:** colunas data,decisao,previsto,criterio,checar_em,real,erro.
- **/workspace/teste-produto/decisoes.md:** uma linha por decisão: data · ideia · veredito · alocação · crença-gargalo · linha de matar · próxima revisão. Ao revisitar uma ideia, leia antes o que foi decidido e o que mudou.
- Não cite acurácia que não mediu.
