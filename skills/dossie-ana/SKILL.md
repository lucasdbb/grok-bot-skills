---
name: dossie-ana
description: >-
  Dossiê de pré-call de um advogado que pode virar aluno da ANA: Instagram (lido
  no navegador do box, com a sessão já logada de @lucasbraga.ia), processos no
  DJEN, site, sócios e presença online, entregue como HTML no visual da ANA com
  perfil, escritório e sócios, roteiro de perguntas e dashboard da carteira. Use
  quando o DV ANA, o Lucas ou o Bruno Tibúrcio pedirem para analisar um seguidor
  ou advogado, montar o perfil ou dossiê de um lead, preparar uma reunião ou
  call, ou fazer o roteiro de perguntas. A equipe comercial pede isso ao DV ANA.
---

# Dossiê de lead ANA

Produz, em uma sessão, o dossiê de pré-call de um advogado que pode virar aluno da ANA. Quem pediu (Lucas, Bruno Tibúrcio ou o DV ANA) costuma ter a reunião em menos de uma hora: corra as frentes em paralelo e entregue um dossiê útil, com cada dado marcado como **confirmado**, **inferido** ou **não verificado**.

O gabarito é [`assets/modelo-dossie.html`](assets/modelo-dossie.html): a página completa, com as quatro abas, os gráficos e o registro de escrita de cada bloco, com o conteúdo substituído por marcadores entre colchetes. Ele é a referência de estrutura, tom e visual, e não contém dado de nenhum lead.

## Fontes de ICP, oferta e marca

Não existe a skill `ana-estrategista`. Antes do passo 5, leia no conector `user-Notion` (só leitura):

- **ICP compilado (ANA):** seção "Público-alvo: ICP, dores e objeções" em [1. Fundação](https://app.notion.com/p/4177e086a02f81e1a091d60a5895e1f5) (Banco de Dados de Marketing ANA, atualizado em 13/11/2026, Recife). Não há página própria chamada "ICP ANA". A Fundação marca o Anti-ICP como LACUNA e pede validação com quem de fato comprou.
- **Página encontrada na busca "ICP ANA", de outro produto:** [ICP e Anti ICP](https://app.notion.com/p/38a7e086a02f80d49bbaeb73d4d70dbd) (ITS EDU / Imersão IA na Prática, edição de 25/06/2026). Não trate como ICP oficial da mentoria ANA.
- **Oferta e preço:** [Oferta](https://app.notion.com/p/33b7e086a02f8015954af841ccb09c29) (A Nova AdvocacIA / Receita / Comercial). A Fundação avisa que o inventário é de 23/09/2026 e pode estar desatualizado. Apoio: [oferta-e-pitch-ana](https://app.notion.com/p/40b7e086a02f8172a43bd588b9ee7470). Preço, condição e garantia: só o que estiver documentado ou o que o Lucas confirmar.
- **Marca:** hub [A Nova AdvocacIA](https://app.notion.com/p/3347e086a02f80f6be9cc672179d8111), sistema [Lovart ANA](https://app.notion.com/p/3937e086a02f8050ae40c132b112fd59) e [2. Sistema visual](https://app.notion.com/p/4177e086a02f8197b190d45f60ee8fd2). O gabarito HTML já traz o visual; use essas páginas para conferir paleta, tipografia e o que não pode.

**TODO — ICP oficial validado:** se a seção da Fundação for insuficiente, conflitar com o que quem pediu disser, ou faltar o Anti-ICP, peça o ICP ao DV ANA. Não invente cliente ideal, piso de faturamento, colaboradores do MVP nem preço. Os nomes dos colaboradores, se não estiverem na Oferta, também se pedem ao DV ANA.

## Permissões

- Sempre: pesquisar em fontes públicas (DJEN, site, notícias, Google, Reclame Aqui); ler o Instagram só no navegador do box, com a sessão já logada de @lucasbraga.ia; montar o HTML e o resumo no chat.
- Só com ok explícito de quem pediu: gravar o dossiê no CRM ou compartilhá-lo fora do box; abrir um destaque/story do Instagram (isso avisa o lead que o perfil foi visto).
- Nunca: mandar DM, comentar, seguir ou curtir; contatar o lead; digitar senha, código ou desafio de login do Instagram (se pedir login ou bloquear, pare e avise); salvar print de perfil privado; inventar dado.

Os arquivos do dossiê ficam no box (`/workspace/dossies/<slug-do-lead>/`). Só vão para o CRM com ok.

## Passos

### 1. Identificar a pessoa

O bot principal dispara um subagente `computerUse` (só um por vez; executores não usam o navegador) para abrir o Instagram informado no navegador do box, que já deve estar logado como @lucasbraga.ia (a mesma sessão do Social Selling ANA). Leia o cabeçalho: nome completo, bio, link, destaques e seguidores em comum. Se a página não existir, o @ provavelmente tem erro de digitação: teste as variações óbvias antes de perguntar. Se o Instagram pedir login, código ou bloquear a leitura, pare, marque a frente do Instagram como **bloqueada** e avise o Lucas: nunca digite senha. Técnica de leitura e armadilhas em [`references/instagram.md`](references/instagram.md); coloque no brief do `computerUse` o recorte técnico que ele precisa (o JavaScript do cabeçalho, no passo 1).

Pronto quando tiver nome completo e pelo menos uma pista de cidade ou formação.

### 2. Disparar as frentes em paralelo

Na mesma mensagem, lance dois subagentes `executor` via Task, com os briefs de [`references/frentes.md`](references/frentes.md):

- **Processos:** acha a OAB e roda [`scripts/djen.py`](scripts/djen.py).
- **Presença online:** site, CNPJ, formação, produção acadêmica, mídia, sócios, com WebSearch, WebFetch e firecrawl (`firecrawl_search` / `firecrawl_scrape`). Esses executores não usam o navegador.

Enquanto eles rodam, faça o passo 3 (ainda no bot principal, com o `computerUse`).

### 3. Ler o Instagram a fundo

Percorra todos os perfis da pessoa: o pessoal, o profissional (procure na bio, nos destaques e nas marcações), o do escritório e o de cada sócio. Separe posts próprios de collabs, leia na íntegra os posts profissionais e anote datas, último post, ritmo e engajamento. Se quem pediu trouxer outro perfil ou o site no meio do caminho, encaixe na frente certa e siga.

Pronto quando cada perfil tiver números, temas, último post e uma leitura do que ele revela. Se a frente do Instagram estiver bloqueada no passo 1, pule este passo, registre o bloqueio e siga com as outras frentes.

### 4. Completar o escritório e os sócios

Quando o site ou os posts revelarem sócios, rode `scripts/djen.py` para cada um e rode de novo para o lead com `--socios <OABs>`, para medir os processos em comum. Confira por conta própria qualquer achado que vá virar argumento na reunião (link quebrado, número de processos, CNPJ): é o que quem vai conduzir a call vai repetir na frente do lead.

Pronto quando todos os campos do [checklist](references/frentes.md#checklist-de-cobertura) estiverem preenchidos ou marcados como "não encontrado", com a fonte.

### 5. Montar a página

Copie `assets/modelo-dossie.html` para `/workspace/dossies/<slug-do-lead>/dossie.html` e troque cada marcador `[...]` pelo conteúdo do lead, seguindo [`references/pagina.md`](references/pagina.md) (abas, mapeamento do `djen_metricas.json` para o dashboard, regras de marca) e [`references/roteiro.md`](references/roteiro.md) (fases e perguntas). A tese do topo é uma frase sobre por que a ANA serve para esse escritório. O ICP, o reframe de preço e os colaboradores saem das fontes do Notion acima, não de memória.

Pronto quando não sobrar nenhum marcador do gabarito na página: rode `grep -n '\[' /workspace/dossies/<slug-do-lead>/dossie.html` e só devem aparecer colchetes dentro do JavaScript. Confira também o `<title>`, o rodapé e os dados de amostra do bloco `D` e `CFG` no script, que precisam virar os números reais do lead.

### 6. Entregar e responder

O caminho padrão é o HTML preenchido em `/workspace/dossies/<slug-do-lead>/dossie.html`, entregue como anexo no chat (o gabarito tem gráficos em JavaScript; o arquivo local preserva isso). Se quem pediu preferir, publique também como Página do Grok Bot (Canvas), deixando o HTML como fonte. Na resposta, em chat:

- caminho (e anexo) do dossiê;
- 4 a 6 achados que mudam a reunião;
- o que confirmar na conversa;
- limites dos dados (o que é inferido, o que ficou bloqueado);
- a linha **Não verificado:** do bloco abaixo.

## Verificação antes de entregar

1. `grep -n '\['` no `dossie.html`: só colchetes dentro do JavaScript; nenhum marcador `[...]` do gabarito sobrou, inclusive em `<title>`, rodapé, `D` e `CFG`.
2. Cada dado está marcado como **confirmado**, **inferido** ou **não verificado**, com fonte (URL, arquivo do DJEN ou "não encontrado").
3. Achados que viram argumento na reunião (link quebrado, número de processos, CNPJ, volume, sócios) foram re-conferidos nesta sessão.
4. A frente do Instagram, se pediu login ou bloqueou, está como **bloqueada**; nenhum print de perfil privado foi salvo.
5. Fim da resposta no chat com **Não verificado:** listando o que não deu para conferir (fonte inacessível, ICP em lacuna, story não aberto, homônimo em dúvida).
