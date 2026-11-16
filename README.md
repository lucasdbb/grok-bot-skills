# Skills dos Grok Bots do Lucas

Cópia versionada das skills criadas pelos bots do Lucas Braga no Grok Bot (pasta `/home/box/agent-data/workflows`).
A fonte de verdade continua sendo o Grok Bot; este repositório é o histórico.

Este repositório reúne **144 skills**. Cada pasta em [`skills/`](./skills/) tem o seu `SKILL.md` e, quando existem, os arquivos de apoio.

- Skills gerenciadas pela Cursor e skills de plugins não entram aqui.
- Nunca coloque senha, token ou chave em uma skill.
- A lista abaixo descreve o que cada skill faz, com base no próprio `SKILL.md`. Ela não substitui as instruções completas.

Atualizado em 16/11/2026.

## Índice

- [ANA](#ana) (12)
- [Reels e formatos](#reels-e-formatos) (19)
- [Instagram](#instagram) (17)
- [Vídeo](#video) (17)
- [Grok Bot e operação](#grok-bot-e-operacao) (22)
- [Getting started](#getting-started) (26)
- [Outros](#outros) (31)

## ANA

| Skill | Descrição |
| --- | --- |
| [Apresentação ANA](./skills/apresentacao-ana/) | Cria ou edita aulas e palestras da ANA em HTML 1920×1080 com o Brand DNA; não serve para PowerPoint, Google Slides nem criativo de feed. |
| [Carrossel ANA](./skills/carrossel-ana/) | Gera os arquivos finais (PNG/PDF) de um carrossel da ANA com texto exato e marca travada, a partir de um JSON; não escreve a copy. |
| [Cobrança ANA](./skills/cobranca-ana/) | Lista, prioriza e confere recebíveis em aberto ou atrasados da ANA e rascunha mensagens de cobrança para o Lucas revisar. |
| [Entregáveis do CEO ANA](./skills/entregaveis-ceo-ana/) | Entrega o briefing semanal de prioridades do CEO ANA, o ranking de iniciativas, o alerta antecipado ou o one-pager de oferta e posicionamento. |
| [Fluxo visual padrão ANA](./skills/fluxo-visual-padr-o-ana/) | Desenha fluxos na identidade escura da ANA (mapa de funções, rotina em raias, cartão do bot, árvore de decisão ou painel de rotinas) em PNG, SVG ou HTML. |
| [Incluir aula na plataforma ANA](./skills/incluir-aula-plataforma-ana/) | Inclui uma aula nova numa formação da plataforma ANA pelo painel administrativo, com ou sem vídeo, sempre em rascunho e sem publicar sem ok do Lucas. |
| [Método do CFO ANA](./skills/metodo-cfo/) | Aplica a lente completa do CFO ANA: domínios, o método de pensamento em 10 passos, entregáveis típicos e rituais. |
| [Oferta e pitch da ANA](./skills/oferta-e-pitch-ana/) | Desenha ou revisa a oferta comercial da ANA (stack de valor, embalagem, bônus, garantia, faixas de preço e testes A/B) e monta o deck de pitch; o Lucas decide oferta e preço. |
| [PDF Design System ANA](./skills/pdf-design-system-ana/) | Gera ou formata um PDF no design system da ANA (playbook, análise de call, proposta, roteiro, one-pager ou checklist). |
| [Playbook de imersão presencial](./skills/playbook-imersao-presencial/) | Planeja uma nova imersão ou workshop presencial com o checklist completo por etapas, para evitar os erros comuns de sala. |
| [QA da área do aluno](./skills/qa-area-do-aluno/) | Roda a ronda de QA, só leitura, da área do aluno da plataforma ANA com a conta de teste, e relata em pt-BR o que entrou, sumiu ou quebrou desde a última ronda. |
| [Relatório semanal visual ANA](./skills/relat-rio-semanal-visual-ana/) | Gera o PDF visual semanal da ANA: o que cada bot fez na semana e como a operação está em relação à meta oficial do ciclo. |

## Reels e formatos

| Skill | Descrição |
| --- | --- |
| [Formato Bastidores](./skills/formato-bastidores/) | Formato de Reel para quando a curiosidade sobre como algo foi feito e o contraste entre processo e resultado forem centrais. |
| [Formato Caixinha de perguntas polêmica](./skills/formato-caixinha-de-perguntas-pol-mica/) | Formato de Reel em que uma pergunta na tela abre curiosidade, identificação e debate nos comentários. |
| [Formato Cine](./skills/formato-cine/) | Formato de Reel cuja força está na conversa, no desabafo ou na estética que foge do vídeo vertical padrão. |
| [Formato Comparação](./skills/formato-compara-o/) | Formato de Reel em que o contraste visual e a autoidentificação são o principal motor da atenção. |
| [Formato Conflito situacional](./skills/formato-conflito-situacional/) | Formato de Reel em que um conflito visual imediato interrompe a rolagem antes da explicação ou da analogia. |
| [Formato Diálogo](./skills/formato-di-logo/) | Formato de Reel que deixa o conflito cotidiano mais claro ao colocar duas vozes ou personagens em oposição. |
| [Formato Dinamismo](./skills/formato-dinamismo/) | Formato de Reel em que uma ideia estática ganha estímulo visual por deslocamento, postura e expressão. |
| [Formato Experimento social](./skills/formato-experimento-social/) | Formato de Reel para conteúdo com imprevisibilidade, opiniões reais, contraste entre respostas ou interação presencial. |
| [Formato Lo-fi](./skills/formato-lo-fi/) | Formato de Reel em que a força da peça está na familiaridade, no debate mental e na sensação de conversa próxima. |
| [Formato Motion e música](./skills/formato-motion-musica/) | Planeja e produz um Reel de motion curto só com música (6–12 s, sem narração), em que uma comparação ou metáfora visual entrega a ideia sozinha. |
| [Formato Narrado](./skills/formato-narrado/) | Formato de Reel em que a história é contada pela narração enquanto as imagens mostram o que está acontecendo. |
| [Formato Palestrinha](./skills/formato-palestrinha/) | Formato de Reel em que a tese precisa ser provada ou organizada visualmente como uma apresentação. |
| [Formato Storytelling visual](./skills/formato-storytelling-visual/) | Formato de Reel para quando a compreensão do roteiro depende de mostrar visualmente aquilo que está sendo dito. |
| [Formato Tela dividida](./skills/formato-tela-dividida/) | Formato de Reel em que a fala é reforçada por imagens simultâneas na parte de cima ou de baixo da tela. |
| [Formato Tela do Agente](./skills/formato-tela-do-agente/) | Formato de Reel em que a dona pede algo a um agente e a tela da resposta ocupa o miolo do vídeo, com B-roll só no gancho e no CTA. |
| [Formato Tela verde](./skills/formato-tela-verde/) | Formato de Reel em que a pessoa é o elemento principal diante de imagens que explicam ou contextualizam a fala. |
| [Formato The Office](./skills/formato-the-office/) | Formato de Reel em que uma situação cotidiana mistura ação, diálogo, bastidores e revelações em alternância. |
| [Formato Trivial](./skills/formato-trivial/) | Formato de Reel em que uma ação simples, como cozinhar ou se arrumar, cria familiaridade enquanto a tese conduz o vídeo. |
| [Mapeamento de modelos de Reels](./skills/mapeamento-de-modelos-de-reels/) | Mapeia Reels de referência para achar a fórmula que se repete (gancho, formato, ritmo e CTA), testa em lote no contexto do dono e só então declara um modelo; nunca copia texto, fala ou vídeo de terceiro. |

## Instagram

| Skill | Descrição |
| --- | --- |
| [Boas-vindas a novo seguidor](./skills/boas-vindas-novo-seguidor/) | Analisa o perfil de quem acabou de seguir no Instagram e rascunha uma DM de boas-vindas personalizada. |
| [ig-audit](./skills/ig-audit/) | Faz o post-mortem do que já foi publicado no Instagram: quais Reels funcionaram, por quê, e o que parar de fazer, a partir dos insights ou posts colados. |
| [ig-caption](./skills/ig-caption/) | Escreve a legenda do Instagram (a linha que sobrevive ao “… more”, o corpo, o pedido único, os termos de busca e os três hashtags) e faz o lint antes de publicar. |
| [ig-carousel](./skills/ig-carousel/) | Monta um carrossel de Instagram: a capa que gera o swipe, o texto de cada slide e os arquivos 1080×1350 para subir. |
| [ig-comment](./skills/ig-comment/) | Escreve comentários em posts e Reels de outras pessoas com cara de opinião humana, inclusive em lote para a ronda diária de engajamento. |
| [ig-dm](./skills/ig-dm/) | Escreve DMs de Instagram pensadas para resposta: entrega de palavra-chave, primeira mensagem, pitch de collab e os dois follow-ups. |
| [ig-human](./skills/ig-human/) | Tira a marca de máquina de um rascunho (travessões, jargão de IA e caracteres invisíveis) e pontua o texto num painel de cinco checagens antes de sair. |
| [ig-plan](./skills/ig-plan/) | Monta a semana no Instagram: o que publicar, em qual formato, quando, e com quem interagir. |
| [ig-profile](./skills/ig-profile/) | Nota um perfil de Instagram de 0 a 100 numa rubrica de 12 partes e reescreve o que perde ponto (nome, bio, link, destaques, fixados e grade). |
| [ig-reel](./skills/ig-reel/) | Escreve um Reel a partir de uma ideia crua: opções de gancho, roteiro falado, texto na tela e folha de beats, na voz do usuário e pontuado antes da gravação. |
| [ig-reply](./skills/ig-reply/) | Cuida dos comentários nos Reels e posts do próprio usuário: prioriza o que vale responder e rascunha as respostas, inclusive de crítico, haters ou lead. |
| [ig-repurpose](./skills/ig-repurpose/) | Transforma um material longo (YouTube, podcast, live, newsletter, blog ou call) numa semana de Reels e carrosséis. |
| [ig-story](./skills/ig-story/) | Escreve as Stories do dia: a sequência quadro a quadro, quais figurinhas usar e a que leva as pessoas para as DMs. |
| [ig-viral](./skills/ig-viral/) | Encontra Reels que estão performando no nicho, ranqueia pelo quanto cada um passou da média da própria conta, nomeia a fórmula do gancho e monta um swipe file. |
| [Método dos 3 pilares (Instagram)](./skills/metodo-3-pilares-instagram/) | Diagnostica um perfil e cria planos, roteiros de Reel, carrosséis e CTAs de palavra-chave no Instagram com os 3 pilares de ouro. |
| [Pacote semanal de conteúdo](./skills/pacote-semanal-conteudo/) | Toda segunda, ou quando pedirem, monta o pacote da semana (plano, iscas por palavra-chave e brief de copy) para aprovação humana, até o lead com diagnóstico marcado. |
| [Pesquisa profunda de Instagram](./skills/pesquisa-profunda-instagram/) | Analisa com prova uma ou mais contas públicas de Instagram (teardown, benchmark, comparação em lote ou monitor semanal), no menor custo de dados, via ScrapeCreators e Apify. |

## Vídeo

| Skill | Descrição |
| --- | --- |
| [Clip Scout](./skills/clip-scout/) | Na rotina diária, procura trechos de podcasts, entrevistas e lives que podem virar clipes curtos para o Instagram e entrega a lista ao marketing. |
| [Cortes de vídeo](./skills/cortes-de-video/) | Tira clipes, thumbnails e prints de um vídeo existente com ffmpeg, dimensiona para o destino, escreve legenda e alt e faz o polimento padrão no Magnific. |
| [Cut mistakes](./skills/cut-mistakes/) | Depois do cut-silences, propõe cortes de gagueira, repetição, falso começo e retake, e só renderiza o que for aprovado. |
| [Cut silences](./skills/cut-silences/) | Apara silêncio e ar morto de um talking-head a partir do transcript com tempo por palavra, gerando EDL e, se pedido, o MP4. |
| [GSAP](./skills/gsap/) | Referência de GSAP para animações em composições HyperFrames no box (to/from, timeline, easing e stagger). |
| [HyperFrames oficial](./skills/hyperframes/) | Autora e renderiza composição HyperFrames oficial 0.9.45 (HTML + GSAP) no box, em 1080×1920. |
| [HyperFrames (herk)](./skills/hyperframes-herk/) | Autora e renderiza composição HyperFrames (HTML + GSAP) no box: cards, legendas, transições e motion em 1080×1920. |
| [HyperFrames video beats](./skills/hyperframes-video-beats/) | Planeja e valida beats de motion (lower-third, takeover e callout sincronizado ao transcript) em um vídeo falado HyperFrames 1080×1920 da ANA. |
| [media-use](./skills/media-use/) | Obtém ou trata mídia local de um projeto HyperFrames 0.9.45 no box (trilha, sfx, imagem, transcrição, recorte e grade), só com ferramentas locais e gratuitas. |
| [Motion showreel](./skills/motion-showreel/) | Monta um showreel ou brand reel de 10 a 30 s, cortado na grade da batida, com um motivo que atravessa os capítulos e fecha no logo, em 1080×1920 na ANA. |
| [Área vídeo](./skills/rea-video/) | Desmonta um Reel ou vídeo de referência cena a cena (como foi feito, texto na tela, cortes, som e como refazer), para mapear modelos ou modelar uma peça; não publica e não envia o vídeo a modelo remoto. |
| [Remotion to HyperFrames](./skills/remotion-to-hyperframes/) | Porta código Remotion (e afins) para uma composição HyperFrames 0.9.45 no box e confere quadro a quadro; não renderiza no video-shotcraft neste fluxo e não publica. |
| [Short form edit](./skills/short-form-edit/) | Transforma bruto falado em Reel 9:16 (1080×1920) com gancho, cortes no transcript, legenda precisa em pt-BR, motion HyperFrames/GSAP e trilha. |
| [Style library](./skills/style-library/) | Escolhe ou adapta um card da biblioteca de motion (406 rascunhos) dentro de um projeto HyperFrames da ANA, trocando tokens e sem reusar material da AIS. |
| [Vídeo com avatar de IA (HeyGen)](./skills/video-com-avatar-ia/) | Transforma um roteiro em vídeo com avatar falante pelo conector HeyGen: créditos, avatar, voz, custo, ok por vídeo, geração, polimento no Magnific e checagem; inclui consentimento e rotulagem de conteúdo de IA. |
| [Video Shotcraft](./skills/video-shotcraft/) | Cria vídeos de produto a partir de projetos front-end ou páginas, com Remotion, capturas reais, shot cards, o template Ink Press, sincronia na batida e design de som. |
| [Video storytelling](./skills/video-storytelling/) | Desenha a camada visual de um vídeo falado como um mundo contínuo por onde a câmera se move, com cards e destaques sincronizados ao transcript, em 1080×1920 na identidade ANA. |

## Grok Bot e operação

| Skill | Descrição |
| --- | --- |
| [Árvore de integrações](./skills/arvore-de-integracoes/) | Escolhe o caminho para ligar um sistema ao Grok Bot (connector, MCP, HTTP/CLI, rotina, webhook, canal ou navegador), prova a ligação e diagnostica falha. |
| [Autonomia de decisão](./skills/autonomia-de-decisao/) | Decide o que o bot resolve sozinho, como acompanhar e comprovar a entrega, e como transformar correção do dono em regra, antes de devolver a tarefa a ele. |
| [Checagem da frota](./skills/checagem-da-frota/) | Audita a frota de bots em busca de correções repetidas, rotinas desperdiçadas ou sobrepostas e briefs inconsistentes, e propõe correções concretas. |
| [Definir bot principal](./skills/definir-bot-principal/) | Ajuda a escolher ou trocar o bot principal, a porta de entrada que recebe os pedidos e os repassa aos especialistas. |
| [Design Grok Bot](./skills/design-grok-bot/) | Desenha, cria ou atualiza um Grok Bot: barra de qualidade, briefing de um trabalho só, anti-trabalhos, permissões em três níveis e handoff para CreateAgent ou UpdateAgent. |
| [Ritmo da Donna](./skills/donna-ritmo/) | Formatos de briefing, rundown, prep e fechamento da Donna, regras de logística e viagem, e o desenho das rotinas dela. |
| [Caixa de entrada do Gmail](./skills/gmail-inbox/) | Triagem das caixas de Gmail do Lucas: monta o top 5, rascunha respostas, aplica rótulos GB/, cobra follow-ups e resume threads. |
| [Jev: quando e como usar](./skills/jev-roteamento/) | Diz qual ferramenta do Jev chamar quando um bot for ler conteúdo externo, afirmar que algo está verificado ou escolher entre opções, e como registrar no log. |
| [Ligações com Bland AI](./skills/ligacoes-bland/) | Planeja, testa, dispara (só com ok do Lucas e o custo à vista) ou relata ligação ou lote com voz de IA pela Bland AI. |
| [Manutenção de briefs](./skills/manutencao-de-briefs/) | Altera ou audita vários briefs de bots de uma vez: faz backup, insere, confere e mede o tamanho com scripts antes e depois do UpdateAgent. |
| [Método de backup dos bots](./skills/metodo-backup-bots/) | Faz, verifica ou restaura o backup da configuração dos bots do dono (instruções, skills e rotinas). |
| [Navegação eficiente](./skills/navegacao-eficiente/) | Regras para não perder tempo em tarefas de navegador ou desktop: endereço chutado, 404, aviso de cookies e página lenta. |
| [Orquestrar o Claude Code](./skills/orquestrar-claude-code/) | Delega trabalho de código ao Claude Code (headless, worktrees, hooks e plugins), com teto de turnos e de custo, acompanhamento e verificação independente. |
| [Orquestrar o OpenAI Codex](./skills/orquestrar-codex/) | Delega trabalho de código ao OpenAI Codex (CLI, cloud, SDK ou review no GitHub), com checagem de integração, sandbox e revisão rigorosa do resultado. |
| [Painel de status](./skills/painel-de-status/) | A cada mudança de estado (começou, espera o usuário, entregou, falhou ou ficou ocioso), publica a linha de status do bot no painel. |
| [Passagem entre bots](./skills/passagem-entre-bots/) | Regra para um bot deixar arquivo para outro ler, cobrir uma dependência ou delegar por mensagem: toda passagem deixa um HANDOFF.md em /workspace/handoffs/. |
| [Promessas esquecidas](./skills/promessas-esquecidas/) | Procura promessas e follow-ups esquecidos (o que o usuário prometeu e o que devem a ele) em atas, e-mail, Slack e WhatsApp, com prova, e entrega só rascunhos. |
| [Quadro dos Bots](./skills/quadro-dos-bots/) | No começo e no fim de qualquer trabalho ou rodada de rotina, cria ou move o card do bot no Kanban do Notion (Tarefas dos Bots e Rotinas dos Bots). |
| [Reuniões gravadas (Fireflies)](./skills/reunioes-gravadas/) | Trabalha as reuniões gravadas do Lucas no Fireflies: ata e follow-up, pós-call de venda da ANA, coaching ou prova social com falas de cliente, com as regras de privacidade na frente. |
| [Sistema operacional de empresa pequena](./skills/sistema-operacional/) | Método de COO para empresa pequena ou startup: placar semanal, ritual de gestão, OKRs, cobrança de atrasos, o gargalo a atacar e a saúde do time. |
| [Slack da equipe](./skills/slack-equipe/) | Lê, busca, tria ou resume o Slack da equipe do Lucas, ou envia o lembrete ou o toque de follow-up que ele pediu. |
| [Análise de WhatsApp](./skills/whatsapp-analise/) | Analisa sob demanda uma ou mais conversas de WhatsApp (temas, tom, pendências, riscos e padrões) lidas pela UAZAPI, estritamente em modo leitura. |

## Getting started

| Skill | Descrição |
| --- | --- |
| [Getting started — Pesquisador](./skills/getting-started/) | Onboarding na primeira conversa depois de importar o Pesquisador: idioma, foco de pesquisa, destino dos docs e monitor semanal opcional. |
| [Getting started — Assinaturas](./skills/getting-started-assinaturas/) | Na primeira conversa do auditor de assinaturas, confirma fontes, planilha, janela de renovação e quem aprova, e entrega o primeiro inventário. |
| [Getting started — Assinaturas (template)](./skills/getting-started-assinaturas-2/) | Onboarding na primeira conversa depois de importar o template Assinaturas, e montagem do primeiro inventário. |
| [Getting started — Backup de bots](./skills/getting-started-backup-bots/) | Primeira conversa com o novo dono para configurar o guardião de backups dos bots. |
| [Getting started — Copy Max Peters](./skills/getting-started-copy-max-peters/) | Primeira conversa do modelo Copy Max Peters: obtém o briefing e inicia a primeira copy. |
| [Getting started — Criador de bots](./skills/getting-started-criador/) | Onboarding na primeira conversa depois de importar o template de designer de bots: nome, idioma, autonomia, primeiro bot, revisão da frota e retro de proatividade. |
| [Getting started — Design](./skills/getting-started-design/) | Onboarding do dono do bot de design: como tratar a pessoa, sistema de marca, canais, colaboradores e ferramentas pagas de geração. |
| [Getting started — CFO ANA](./skills/getting-started-df/) | Onboarding do CFO ANA: nome, idioma, sistema financeiro, caixa de entrada do Pix e rotina opcional de conciliação. |
| [Getting started — Donna](./skills/getting-started-donna/) | Primeira conversa de um bot importado do modelo Donna (secretária executiva): agenda, contas, rotinas e regras de envio. |
| [Getting started — Dono de processos](./skills/getting-started-dono-de-processos/) | Primeira conversa depois de importar o template de dono de processos: apresenta o trabalho e faz as perguntas de configuração uma a uma. |
| [Getting started — Dust Expert](./skills/getting-started-dust-expert/) | Primeira conversa de um bot Dust Expert importado de modelo, para configurá-lo com o novo dono. |
| [Getting started — Engenheiro de Fluxo](./skills/getting-started-engenheiro-de-fluxo/) | Primeira conversa com o novo dono do Engenheiro de Fluxo: configura o bot e desenha o primeiro fluxo. |
| [Getting started — Eventos](./skills/getting-started-eventos/) | Primeira conversa de um bot de eventos presenciais com o novo dono: perguntas de configuração e o que fazer com as respostas. |
| [Getting started — Financeiro e administrativo](./skills/getting-started-financeiro-adm/) | Primeira conversa de um agente financeiro e administrativo recém-importado com o novo dono. |
| [Getting started — Guru Financeiro](./skills/getting-started-guru-financeiro/) | Onboarding depois de importar o Guru Financeiro: nome, idioma, sistema financeiro, fontes de metas e regras de escrita. |
| [Getting started — Integra](./skills/getting-started-integra/) | Onboarding do Integra: nome, idioma, primeiro sistema a conectar e, se quiser, rotina diária de concorrentes ou acordar por webhook. |
| [Getting started — Luiza Cureau Growth](./skills/getting-started-luiza-growth/) | Primeira conversa com o novo dono: entende perfil, estágio e objetivo antes de entregar o primeiro plano. |
| [Getting started — Orquestrador](./skills/getting-started-orquestrador/) | Onboarding do Orquestrador: nome, idioma, quais agentes especialistas existem e quanto pode delegar sem perguntar. |
| [Getting started — Programador](./skills/getting-started-programador/) | Primeira conversa do Programador: descobre GitHub, repositórios, ferramentas de código e regras de trabalho, e deixa o loop de engenharia pronto. |
| [Getting started — PromptGenius](./skills/getting-started-promptgenius/) | Onboarding depois de importar o template PromptGenius: nome, idioma, onde os prompts serão usados e o primeiro prompt. |
| [Getting started — Saúde](./skills/getting-started-saude/) | Primeira conversa de um bot de saúde pessoal: entende rotina e objetivos e configura os check-ins. |
| [Getting started — Secretária Executiva](./skills/getting-started-secretaria/) | Onboarding depois de importar o template Secretária Executiva: nome, idioma, agenda, e-mail e autonomia. |
| [Getting started — Telefonista](./skills/getting-started-telefonista/) | Onboarding do Telefonista para ligações com Bland AI: chave da API, voz, tom, número de teste e rotina opcional de confirmação de reunião. |
| [Getting started — Teste de Produto](./skills/getting-started-teste-de-produto/) | Primeira conversa depois de importar o template Teste de Produto: abre a conversa e chega rápido à primeira ideia. |
| [Getting started — Tráfego](./skills/getting-started-trafego/) | Primeira conversa de um bot de mídia paga com o novo dono: perguntas de configuração e o que fazer com as respostas. |
| [Primeiros passos — especialista em Dust](./skills/primeiros-passos-dust/) | Primeira conversa de um bot especialista em Dust com o novo dono, antes de qualquer outra tarefa. |

## Outros

| Skill | Descrição |
| --- | --- |
| [Agendar Reunião](./skills/agendar-reuni-o/) | Verifica a agenda, propõe 3 a 5 horários livres e redige a mensagem de convite, sem agir antes da aprovação. |
| [Apresentações da marca](./skills/apresentacoes-marca/) | Monta decks HTML 16:9 e ebooks de leitura contínua com a identidade da marca, inclusive a configuração inicial, e exporta em PDF. |
| [Auditoria de assinaturas](./skills/auditoria-de-assinaturas/) | Inventaria gastos recorrentes com software e serviços a partir de faturas, pontua economia, pesquisa alternativas e rascunha contraproposta ao fornecedor. |
| [Avaliar repositórios GitHub](./skills/avaliar-repos-github/) | Pesquisa, compara e monitora repositórios no GitHub para adoção, com quatro modos, seis dimensões e um veredito padronizado. |
| [Ayman Al-Abdullah](./skills/ayman-al-abdullah/) | Coaching no estilo Ayman Al-Abdullah para founder ou CEO que está escalando, contratando executivos ou saindo do caos de founder. |
| [Brand deck engine](./skills/brand-deck-engine/) | Fonte única da mecânica de palco e da identidade visual dos decks da marca; na primeira vez, faz a configuração inicial de marca. |
| [Brand ebook engine](./skills/brand-ebook-engine/) | Fonte única da mecânica de leitura e da identidade visual dos ebooks da marca, reusando a configuração do brand-deck-engine. |
| [Busca de candidatos](./skills/busca-de-candidatos/) | Transforma a vaga em critérios, busca pessoas em fontes públicas, confere se já estão no ATS e entrega uma shortlist ranqueada, sem contactar ninguém sem aprovação. |
| [Calls de venda](./skills/calls-de-venda/) | Prepara a call de venda consultiva (pesquisa, pré-diagnóstico e roteiro em 1 página) e, depois, o resumo, o follow-up e os aprendizados. |
| [Coaching de calls](./skills/coaching-de-calls/) | Revisa calls gravadas de venda, parceria, patrocínio ou discovery com scorecard fixo, temas de atenção, melhorias de frase e um log de coaching. |
| [Criador de POPs](./skills/criador-de-pops/) | Cria, revisa, analisa ou transforma um fluxo ou uma imagem em um Procedimento Operacional Padrão (POP) completo. |
| [Crítica de telas](./skills/critica-de-telas/) | Faz crítica priorizada de uma tela ou sequência (hierarquia, copy, contraste e acessibilidade), com comparação antes/depois; nunca edita o produto. |
| [Cupom no Digital Manager Guru](./skills/cupom-digital-manager-guru/) | Cria cupom de desconto no Digital Manager Guru (código, valor ou porcentagem, produto, validade e limite de uso). |
| [Diagram design](./skills/diagram-design/) | Gera diagramas e gráficos na identidade da marca em HTML, SVG ou PNG, ou redesenha um draw.io, Mermaid ou Excalidraw no estilo da marca. |
| [Elaborar pesquisa de mercado](./skills/elaborar-pesquisa-de-mercado/) | Estrutura uma pesquisa de mercado em 9 dimensões, em especial para produtos digitais e o mercado jurídico. |
| [Fila de Ideias](./skills/fila-de-ideias-x/) | Guarda na base Fila de Ideias do Notion um link de post (em geral do X) enviado pelo Lucas, e cobra as ideias paradas há 3 dias ou mais. |
| [Fluxogramas visuais](./skills/fluxogramas-visuais/) | Gera fluxogramas em PNG com as cores da marca do cliente para ensinar um processo no chat, em vez de um texto longo. |
| [Frameworks de anúncio](./skills/frameworks-de-anuncio/) | Reúne frameworks de anúncio e copy de performance: avatar, oferta, consciência, mecanismo, ângulos, headlines, criativo, funil e objeções. |
| [Humanizador na voz do Lucas](./skills/humanizador-voz-lucas/) | Reescreve um texto na voz real do autor, tira marcas de IA e mostra cada mudança com o motivo, sem inventar fato. |
| [Inventário de assinaturas](./skills/inventario-de-assinaturas/) | Monta ou atualiza o inventário de assinaturas recorrentes a partir de e-mails e faturas do cartão, e recomenda o que cancelar. |
| [Construir soluções no Lovable](./skills/lovable-builder/) | Transforma um briefing ou diagnóstico numa solução no Lovable (landing, evento com checkout, ferramenta interna, plataforma ou MVP), com PRD, schema e verificação antes de publicar. |
| [Método Copy Max Peters](./skills/metodo-copy-max-peters/) | Escreve ou revisa copy persuasiva com os 3Ms, Super Conteúdo e mecanismo fundamentado em provas. |
| [Método Dust Expert](./skills/metodo-dust-expert/) | Executa, desenha, diagnostica, audita ou ensina algo no Dust (agentes, skills, triggers, Pods ou conversas). |
| [Método de engenharia de prompts](./skills/metodo-engenharia-de-prompts/) | Escreve, revisa ou refina um prompt ou uma instrução de sistema para um LLM ou agente de IA. |
| [Método do Teste de Produto](./skills/metodo-teste-de-produto/) | Conduz um teste de produto (rápido, contraponto, plano, laboratório ou profundo) com graus de evidência, pré-mortem, critérios de morte e o registro da decisão. |
| [Metodologia de pesquisa em 5 fases](./skills/metodologia-de-pesquisa-em-5-fases/) | Conduz uma investigação em camadas: decompõe a pergunta, busca, critica as fontes, sintetiza e entrega um brief acionável com o grau de confiança e os limites. |
| [Noah Kagan](./skills/noah-kagan/) | Aplica o jeito Noah Kagan (AppSumo) para validar ideia rápido, vencer o medo de começar, focar em um objetivo ou escalar uma startup. |
| [Placar e rituais de CFO](./skills/placar-e-rituais-cfo/) | Entrega placar financeiro, ritual semanal de números, previsão de caixa em 13 semanas, unit economics ou o pacote de decisão de preço e margem. |
| [Radar de notícias](./skills/radar-de-noticias/) | Produz um briefing recorrente de notícias de um nicho (digest diário e alertas opcionais), escolhe o que passa no filtro, tira duplicata e fica em silêncio quando nada se qualifica. |
| [Scrapling](./skills/scrapling/) | Extrai dados de páginas com o Scrapling (HTTP, navegador stealth, JavaScript, ações no browser, captura de API e spiders), quando o web_fetch falha ou o site tem proteção anti-bot. |
| [Vídeo para base de conhecimento](./skills/v-deo-para-base-de-conhecimento/) | Insere um vídeo, aula, treinamento ou gravação (Vimeo, YouTube etc.) numa base de conhecimento do Notion, com resumo e link. |
