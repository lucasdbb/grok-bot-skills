# Frentes de pesquisa

Dois subagentes `executor`, lançados juntos via Task na mesma mensagem. Preencha `<...>` com o que o passo 1 achou. Cada brief pede fontes e a marcação confirmado/inferido, porque quem vai conduzir a call repete esses dados na frente do lead.

Esses executores **não usam o navegador** (só o bot principal dispara `computerUse`). A frente de Processos roda `scripts/djen.py` desta skill no terminal. A frente de Presença online usa WebSearch, WebFetch e firecrawl (`firecrawl_search` / `firecrawl_scrape`). A pasta de saída é `/workspace/dossies/<slug-do-lead>/`.

## Frente 1: processos

> Pesquise a atuação processual de <NOME COMPLETO> (<cidade/UF>, <formação>). Perfil para reunião comercial em breve: máximo de 20 minutos. Você é um executor: use o terminal e APIs públicas; não use o navegador do box.
>
> 1. Ache a OAB pela API pública do DJEN: `https://comunicaapi.pje.jus.br/api/v1/comunicacao?nomeAdvogado=<NOME%20COMPLETO>&itensPorPagina=5`. O campo `destinatarioadvogados[].advogado` traz `numero_oab` e `uf_oab`. Confira se é a pessoa certa (homônimos são comuns).
> 2. Rode `python3 -I <pasta-desta-skill>/scripts/djen.py --oab <N> --uf <UF> --out /workspace/dossies/<slug-do-lead>/djen-<sobrenome>`. Ele gera `djen_metricas.json`.
> 3. Leia o `djen_bruto.json` para escolher 6 a 10 processos que ilustram a carteira (número CNJ, tribunal, matéria, resumo de uma linha).
> 4. Ache o CNPJ do escritório (`https://brasilapi.com.br/api/cnpj/v1/<cnpj>`, buscas por nome) e o quadro societário.
>
> Entregue em português: OAB, CNPJ e escritório, os números principais do `djen_metricas.json`, os processos de exemplo, e uma leitura de porte, maturidade e dores prováveis. Diga o caminho dos arquivos gerados. Marque confirmado e inferido, cite URLs.

## Frente 2: presença online

> Pesquise a presença profissional online de <NOME COMPLETO> (Instagram @<handle>, <cidade/UF>, <formação>). Perfil para reunião comercial (ele é potencial aluno de uma mentoria de IA para advogados): máximo de 20 minutos. Você é um executor: use WebSearch, WebFetch e firecrawl (`firecrawl_search` / `firecrawl_scrape`); não use o navegador do box.
>
> 1. Site do escritório (leia todas as páginas, a partir do `page-sitemap.xml` se for WordPress): nome, sócios e equipe com OAB, áreas, endereço, clientes exibidos, promessas de tecnologia, páginas de anúncio. Olhe o código: tags de Google Ads (`AW-`), Pixel da Meta, Tag Manager, e confira se os links de WhatsApp batem com o telefone publicado.
> 2. Formação: dissertação ou tese (repositório da universidade, BDTD), Lattes, artigos (Migalhas, Conjur, JOTA), aulas e palestras.
> 3. Instituições: comissões da OAB, IAB e IAP, IBDFAM e afins.
> 4. Mídia: entrevistas, notícias, assessoria de imprensa.
> 5. Google Meu Negócio, avaliações, Reclame Aqui, LinkedIn.
> 6. Para cada sócio encontrado: OAB, formação, trajetória, redes.
>
> Escavador, Jusbrasil, LinkedIn e o CNA da OAB costumam bloquear acesso direto: use o trecho do buscador e diga que foi isso. Cuidado com homônimos. Entregue em português, em tópicos, com URLs, terminando com 3 a 5 ganchos para a reunião.

## Checklist de cobertura

Cada item preenchido ou marcado "não encontrado", com fonte:

- [ ] Nome completo, OAB e UF, ano de formatura
- [ ] Formação (graduação, especialização, mestrado ou doutorado com título e ano)
- [ ] Produção e instituições (artigos, comissões, associações)
- [ ] Escritório: nome, CNPJ, data de abertura, endereço, sócios e equipe
- [ ] Site: áreas, posicionamento, anúncios, tecnologia declarada, falhas concretas
- [ ] Carteira no DJEN: processos, comunicações por mês, tribunais, matérias, classes, polo, clientes, grandes litigantes
- [ ] Cada sócio: OAB, trajetória, volume no DJEN, processos em comum com o lead
- [ ] Instagram: todos os perfis lidos (pessoal, profissional, escritório, sócios) — ou frente marcada como bloqueada
- [ ] Mídia e marketing: TV, imprensa, anúncios, conteúdo
- [ ] Aderência ao ICP da ANA: tamanho, faturamento provável, maturidade, quem decide (fontes no SKILL.md; se o ICP oficial estiver em lacuna, peça ao DV ANA e não invente)
