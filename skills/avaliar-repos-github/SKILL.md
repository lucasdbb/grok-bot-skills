---
name: avaliar-repos-github
description: Use this when researching, evaluating, comparing or monitoring GitHub repositories for adoption: 4 modes, intake, 6 dimensions, search operators, anti-repos and verdict format.
---
# Avaliar repositórios GitHub

FILOSOFIA — Princípio do Custo Real de Adoção: stars e forks são popularidade, não qualidade. Repo com 50k stars abandonado há 2 anos é mais perigoso que um com 800 stars ativo. Toda avaliação começa pela vitalidade real.

4 MODOS (se não declarado, inferir do contexto e confirmar antes de prosseguir):
1) DISCOVERY: usuário não sabe o que existe → mapeamento do ecossistema + curadoria ranqueada por critérios explícitos (queries usadas, fontes além do GitHub Search, recomendação principal + alternativas A/B, repositórios descartados e por quê, plano de avaliação em 3 dias antes de adotar).
2) AVALIAÇÃO: um repo específico → diagnóstico nas 6 dimensões + veredicto (✅ Adotar / ⚠️ Adotar com ressalvas / ❌ Não adotar) com raciocínio em 3 linhas e evidências citadas.
3) COMPARAÇÃO: 2–5 alternativas → matriz lado a lado, recomendação por cenário e o trade-off central.
4) MONITORAMENTO: já usa um repo → checklist de sinais de alerta, cadência de revisão e critérios de substituição.

MÉTODO:
A) INTAKE antes de qualquer busca (5 blocos): objetivo técnico (uso interno/produto/aprendizado; criticidade); stack (linguagem, framework, ambiente, runtime); critérios de adoção (licença aceitável, manutenção mínima, popularidade, dependências); contexto (candidatos, tentativas anteriores, prazo); anti-requisitos.
B) Complexidade da busca: Simples (top 3 com justificativa), Moderada (6D + tabela comparativa), Alta (mapa de ecossistema, multi-fonte, dependências transitivas).
C) 6 DIMENSÕES: (1) Vitalidade: último commit <60d bom, 60–180d alerta, >180d crítico; issues respondidas <7d; releases com changelog; múltiplos mantenedores; arquivado = crítico. (2) Qualidade técnica: CI/CD, testes/cobertura, tipagem, lint, Dependabot, security scanning. (3) Comunidade: razão issues abertas/fechadas, contribuidores únicos, Discussions, fork-to-star (<0.05 awareness sem adoção; 0.05–0.15 saudável; >0.15 alta adoção), dependents ("Used by", >1000 = adoção real). (4) Documentação: README com instalação/quickstart/exemplos, docs separada, CHANGELOG, CONTRIBUTING; red flags: "WIP", exemplos quebrados, sem aviso de breaking changes. (5) Segurança e licença: MIT/Apache/BSD livres; GPL/LGPL/AGPL/SSPL exigem atenção; sem LICENSE = inutilizável; advisories, CVEs, OpenSSF Scorecard. (6) Fit arquitetural: runtime, async, deploy (Lambda/containers/edge), conflitos e peso de dependências transitivas.
D) Operadores de busca GitHub: stars:>1000, stars:500..5000, forks:, pushed:>AAAA-MM-DD, created:, archived:false, language:, topic:, org:, user:, license:, path:, filename:, extension:, OR/NOT. Ex.: language:python topic:rag stars:>500 pushed:>2024-01-01 archived:false. Code search: "termo" path:requirements.txt.
E) Fontes além do GitHub Search: github.com/topics/[tema], awesome-[tema], GitHub Trending/Collections, PyPI/npm/pkg.go.dev/crates.io, Papers With Code, Hacker News, deps.dev, libraries.io, star-history.com.
F) Anti-repos: absolutos (repo fantasma >1 ano, mantenedor único inativo, sem testes, sem licença, 0.0.x sem changelog, deps abandonadas); situacionais (fork sem upstream, crescimento explosivo recente, breaking changes frequentes, "Won't fix" excessivo). Armadilha "popular mas morto": sempre checar pushed: recente mesmo em repos famosos.
G) Estratégias por caso: biblioteca para produto (vitalidade > qualidade > licença > fit; commit <90d, MIT/Apache, CI passando; testar quickstart isolado); referência de aprendizado (qualidade > docs > comunidade); CLI/DevOps (vitalidade > fit > segurança); inteligência competitiva (org:[empresa] pushed:>..., analisar dependências).

RESTRIÇÕES: nunca recomendar sem verificar vitalidade; nunca lista sem critérios de ranqueamento explícitos; nunca ignorar licença; nunca confundir popularidade com qualidade; nunca recomendar fork sem analisar divergência do upstream; nunca sugerir "ler o código" como único critério; nunca dar veredicto sem evidências específicas. Estrutura de saída adaptada ao modo, nunca usar todas as seções.
