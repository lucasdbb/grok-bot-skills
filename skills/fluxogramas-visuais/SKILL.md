---
name: fluxogramas-visuais
description: Use sempre que for ensinar, explicar ou mostrar um processo à pessoa (treino depois da instalação, "como funciona", "o que eu faço agora", um passo novo, uma mudança no método). Gera fluxogramas bonitos em PNG (HTML renderizado no Chromium headless) com as cores da marca do cliente, para mandar como imagem no chat em vez de texto longo. Leia antes de explicar qualquer etapa com mais de 3 passos.
---

# Fluxogramas visuais

A pessoa aprende olhando, não lendo. Quando precisar explicar um processo, mande **uma imagem** com o fluxo, **até 2 linhas** de texto e **uma ação pequena** para ela fazer. Nunca mande "leia a página", tabelas longas ou listas com mais de 5 itens no chat.

## Regras de uma boa imagem

- **Um assunto por imagem.** Até 7 caixas. Se passar disso, quebre em 2 imagens.
- **Título = a ideia em até 6 palavras** ("Nada vai ao ar sem o seu OK"). Subtítulo de 1 frase.
- **Texto da caixa:** título de até 6 palavras e, se precisar, 1 linha de apoio. Verbo no começo ("Você grava", "Eu edito").
- **Quem faz:** toda caixa tem dono. `voce` (cor de destaque) ou `bot` (cor primária). A pessoa precisa ver em 2 segundos o que é dela.
- **Sempre termina com "Sua vez":** uma ação de até 1 minuto (responder uma palavra, mandar um vídeo de 10 s, marcar 6 ganchos). É o checkpoint.
- **Rótulo no topo** diz onde ela está: "PASSO 2 DE 5 · CICLO SEMANAL".
- Estilo limpo: fundo liso, caixas com borda fina, sem gradiente, sem ícone, sem emoji, sem foto. Setas simples; seta tracejada = volta/repete.
- Formato vertical (1080 px de largura, altura automática ≥ 1350), legível no celular. Renderize com `--escala 2`.
- Dado real (números, horários, nomes) só se você verificou. Se faltar, escreva "sem dado". Nunca invente número para a imagem ficar bonita.

## Cores e fontes da marca (tema)

Monte um `tema.json` com as cores e fontes do intake (campo Visual). Se o cliente não tiver identidade definida, use o tema padrão do script (claro e neutro). Chaves:

| Chave | Uso |
|---|---|
| `fundo` | fundo da imagem |
| `card` | caixas comuns |
| `superficie` | caixas em destaque, chips, "Sua vez" |
| `borda` | bordas finas |
| `primaria` | cor do BOT, rótulo do topo, setas com texto |
| `destaque` | cor do VOCÊ, decisões, "Sua vez" |
| `titulo` / `texto` / `secundario` | cores de texto |
| `fonte_titulo` / `fonte_texto` / `fonte_rotulo` | nomes das fontes instaladas no box |

Confira se as fontes existem com `fc-list | grep -i "<nome>"`. Se não existirem, baixe do Google Fonts para `~/.fonts/` e rode `fc-cache -f`; senão o navegador troca por uma fonte genérica. Contraste: texto claro em fundo escuro ou o contrário; nunca texto sobre cor parecida.

EXEMPLO de tema (paleta clara e quente; troque pelas cores da marca do cliente):

~~~json
{"fundo":"#F7EFE1","card":"#FBF4E8","superficie":"#EFE3CF","borda":"rgba(28,18,10,.10)","primaria":"#8A5A1E","destaque":"#1C120A","titulo":"#1C120A","texto":"#4A3728","secundario":"#6B5440","fonte_titulo":"Newsreader","fonte_texto":"Work Sans","fonte_rotulo":"Work Sans"}
~~~


## Como gerar

1. **Instale uma vez no box:** `pip install playwright && python3 -m playwright install --with-deps chromium`. Salve o script do Apêndice em `~/conteudo/scripts/fluxograma.py`. Salve os 5 modelos do Apêndice em `~/conteudo/fluxogramas/modelos/` e o tema do cliente em `~/conteudo/fluxogramas/tema.json`.
2. **Copie o modelo** mais próximo e troque os textos pelos do cliente (palavra-chave, dia do pacote, horários, nome do bot). Para trocar a tag "BOT" pelo nome do bot, use `"nomes": {"bot": "NOME"}`.
3. **Renderize:** `python3 ~/conteudo/scripts/fluxograma.py modelo.json saida.png --tema ~/conteudo/fluxogramas/tema.json --escala 2`.
4. **Olhe a imagem antes de mandar** (abra o PNG). Confira: nada cortado, nenhuma seta passando por cima de caixa, texto legível, máximo 7 caixas. Se uma seta cruzar uma caixa, reorganize as linhas.
5. **Mande no chat:** a imagem + até 2 linhas + a ação. Espere a resposta antes da próxima imagem.

## Layouts que o script entende

- **Fluxo em linha:** linhas com 1 caixa cada. Sem `setas`, ele liga em sequência.
- **Zigue-zague (2 por linha):** linhas com 2 caixas e `setas` explícitas (`["a","b"]`). Mesma linha = seta horizontal; linha de baixo = seta para baixo.
- **Ciclo:** a última seta volta para a primeira caixa (`["fim","inicio","repete"]`). Ela sai tracejada pela lateral.
- **Decisão:** uma caixa com `"tipo":"decisao"` e duas caixas na linha de baixo, cada uma com `etiqueta` dizendo a resposta ("Aprovado" / "Muda X"). Uma seta de volta mostra o ajuste.
- **Raias (quem faz o quê):** `"raias": ["Você","Bot"]` e linhas com 2 caixas (uma por raia). Sem setas.
- **Extras:** `"tipo":"destaque"` (o resultado), `"tipo":"nota"` (exemplo, tracejado), `chips` (lista curta de itens soltos), `sua_vez` (a ação final).

## Quando usar cada modelo

| Modelo | Quando mandar |
|---|---|
| `01-quem-faz-o-que` | logo depois da instalação; quando ela perguntar "o que eu faço?" |
| `02-ciclo-semanal` | treino; quando ela se perder na semana; Dia 10 (revisão) |
| `03-fluxo-de-um-reel` | treino; antes da primeira gravação |
| `04-como-dar-feedback` | treino; na primeira correção dela |
| `05-aprovacoes` | treino; antes do primeiro pacote de domingo |

Para assuntos novos (ler os números, escada de CTA, como escolher um gancho, gravar em lote), monte um fluxo novo com as mesmas regras.

## Apêndice A — `~/conteudo/scripts/fluxograma.py`

~~~python
#!/usr/bin/env python3
"""Renderiza um fluxograma bonito (PNG) a partir de um JSON, via HTML + headless Chromium.
Uso: python3 fluxograma.py SPEC.json SAIDA.png [--tema TEMA.json] [--largura 1080] [--escala 2] [--html]
Requer: pip install playwright && python3 -m playwright install chromium
        (ou um Chrome instalado: o script tenta channel="chrome" se o Chromium do playwright faltar).

SPEC (todas as chaves opcionais, menos "linhas"):
{
  "rotulo": "PASSO 1 DE 5 · QUEM FAZ O QUÊ",      # etiqueta mono no topo
  "titulo": "Você decide. Eu faço o resto.",
  "subtitulo": "Uma frase curta.",
  "raias": ["VOCÊ", "BOT"],                      # opcional: cabeçalho de colunas (modo raias)
  "linhas": [                                    # cada linha = 1 a 3 caixas lado a lado
     [ {"id":"a","titulo":"...","texto":"...","quem":"voce|bot|ambos","tipo":"normal|decisao|destaque|nota","etiqueta":"SEX"} ],
     ...
  ],
  "setas": [["a","b"], ["d","a","repete"]],      # [de, para, rótulo opcional]; sem "setas" e sem "raias",
                                                 # liga em sequência as linhas de 1 caixa
  "chips_titulo": "SEMPRE PEDEM SEU OK", "chips": ["Ganchos", "..."],
  "sua_vez": "Uma ação pequena para a pessoa fazer agora."
}
Roteamento das setas: mesma linha = horizontal; destino abaixo = vertical (com cotovelo se precisar);
destino acima = volta pela lateral (direita, ou esquerda se a origem estiver à esquerda), tracejada.
"""
import argparse, html, json, os, sys

TEMA_PADRAO = {  # genérico, claro e neutro; troque pelas cores da marca do cliente
    "fundo": "#F6F7F9", "card": "#FFFFFF", "superficie": "#EEF1F5", "borda": "#D9DEE7",
    "primaria": "#2563EB", "destaque": "#F97316", "titulo": "#0F172A", "texto": "#334155",
    "secundario": "#64748B", "fonte_titulo": "Inter", "fonte_texto": "Inter", "fonte_rotulo": "monospace",
}

CSS = """
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:var(--fundo)}
body{width:var(--W);font-family:var(--ft),system-ui,sans-serif;color:var(--texto);-webkit-font-smoothing:antialiased}
#pg{position:relative;padding:76px 72px 72px;min-height:calc(var(--W)*1.25);display:flex;flex-direction:column}
.lbl{font-family:var(--fr),monospace;text-transform:uppercase;letter-spacing:.14em;font-size:21px;font-weight:600}
.rot{color:var(--primaria);margin-bottom:22px}
h1{font-family:var(--fh),sans-serif;font-weight:700;color:var(--titulo);font-size:66px;line-height:1.04;letter-spacing:-.02em}
.sub{font-size:31px;line-height:1.35;margin-top:18px;color:var(--texto);max-width:900px}
.leg{display:flex;gap:28px;margin-top:30px}
.leg span{display:flex;align-items:center;gap:10px}
.sw{width:18px;height:18px;border-radius:5px;display:inline-block}
#corpo{position:relative;margin-top:44px;display:flex;flex-direction:column;gap:var(--gap)}
.raias{display:grid;gap:28px;margin-bottom:-14px}
.raias div{padding:0 0 12px;border-bottom:3px solid}
.linha{display:flex;gap:84px;justify-content:center;position:relative;z-index:1}
.linha.r{gap:28px}
.n{flex:1;max-width:var(--maxw);background:var(--card);border:2px solid var(--borda);border-radius:22px;padding:26px 28px 26px;position:relative}
.linha.r .n{max-width:none;display:flex;flex-direction:column;justify-content:center}
.n.voce{border-left:10px solid var(--destaque)} .n.bot{border-left:10px solid var(--primaria)}
.n.ambos{border-left:10px solid var(--secundario)}
.n.decisao{border:3px solid var(--destaque);background:var(--superficie)}
.n.destaque{background:var(--superficie);border-color:var(--primaria)}
.n.nota{background:transparent;border:2px dashed var(--borda)}
.n .top{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;gap:12px}
.n .et{color:var(--secundario);font-size:19px}
.tag{font-family:var(--fr),monospace;font-size:17px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;padding:5px 11px;border-radius:8px;border:2px solid;white-space:nowrap}
.tag.voce{color:var(--destaque);border-color:var(--destaque)} .tag.bot{color:var(--primaria);border-color:var(--primaria)}
.tag.ambos{color:var(--secundario);border-color:var(--secundario)}
.n h3{font-family:var(--fh),sans-serif;color:var(--titulo);font-size:34px;font-weight:700;line-height:1.12;letter-spacing:-.01em}
.n p{font-size:25px;line-height:1.35;margin-top:8px;color:var(--texto)}
svg#setas{position:absolute;left:0;top:0;overflow:visible;z-index:0;pointer-events:none}
.chips{margin-top:46px}
.chips .lbl{color:var(--secundario);margin-bottom:16px}
.chips .wrap{display:flex;flex-wrap:wrap;gap:12px}
.chip{font-size:24px;padding:10px 18px;border-radius:12px;background:var(--superficie);border:2px solid var(--borda);color:var(--titulo)}
.sv{margin-top:auto;padding-top:48px}
.sv .box{background:var(--superficie);border:2px solid var(--destaque);border-radius:22px;padding:26px 30px;display:flex;gap:26px;align-items:baseline}
.sv .lbl{color:var(--destaque);white-space:nowrap}
.sv p{font-size:29px;line-height:1.35;color:var(--titulo)}
"""

JS = r"""
() => {
  const corpo = document.getElementById('corpo'), cr = corpo.getBoundingClientRect();
  const svg = document.getElementById('setas');
  svg.setAttribute('width', cr.width); svg.setAttribute('height', cr.height);
  const st = getComputedStyle(document.documentElement);
  const cor = st.getPropertyValue('--secundario').trim(), corP = st.getPropertyValue('--primaria').trim();
  const fr = st.getPropertyValue('--fr').trim();
  const box = id => { const e = document.querySelector(`[data-id="${id}"]`); if(!e) return null;
    const r = e.getBoundingClientRect();
    return {l:r.left-cr.left, r:r.right-cr.left, t:r.top-cr.top, b:r.bottom-cr.top, cx:(r.left+r.right)/2-cr.left, cy:(r.top+r.bottom)/2-cr.top, row:+e.dataset.row}; };
  const NS='http://www.w3.org/2000/svg';
  const defs=document.createElementNS(NS,'defs');
  defs.innerHTML=`<marker id="m" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${cor}"/></marker>`;
  svg.appendChild(defs);
  let lado = {direita: 0, esquerda: 0};
  for (const [a,b,rot] of window.SETAS) {
    const A=box(a), B=box(b); if(!A||!B) continue;
    let d, lx, ly, volta=false;
    if (A.row===B.row) { const dir = B.cx > A.cx ? 1 : -1;
      const x1 = dir>0?A.r:A.l, x2 = dir>0?B.l:B.r; d=`M${x1+dir*6},${A.cy} L${x2-dir*8},${B.cy}`; lx=(x1+x2)/2; ly=A.cy-16; }
    else if (B.row > A.row) {
      if (Math.abs(A.cx-B.cx) < 4) d=`M${A.cx},${A.b+6} L${B.cx},${B.t-8}`;
      else { const my=(A.b+B.t)/2; d=`M${A.cx},${A.b+6} L${A.cx},${my} L${B.cx},${my} L${B.cx},${B.t-8}`; }
      lx=B.cx+14; ly=(A.b+B.t)/2+7; }
    else { volta=true;
      const todos=[...document.querySelectorAll('[data-id]')].map(e=>box(e.dataset.id));
      const dir = (A.cx < cr.width/2 && B.cx < cr.width/2) ? 'esquerda':'direita';
      lado[dir]++; const off = 34 + 26*(lado[dir]-1);
      const vizinho = todos.some(o => o.row===B.row && (dir==='direita' ? o.cx>B.cx+4 : o.cx<B.cx-4));
      const x = dir==='direita' ? Math.max(...todos.map(o=>o.r))+off : Math.min(...todos.map(o=>o.l))-off;
      const xa = dir==='direita' ? A.r+6 : A.l-6;
      if (!vizinho) { const xb = dir==='direita' ? B.r+8 : B.l-8;
        d=`M${xa},${A.cy} L${x},${A.cy} L${x},${B.cy} L${xb},${B.cy}`; }
      else { const yt=B.t-24; d=`M${xa},${A.cy} L${x},${A.cy} L${x},${yt} L${B.cx},${yt} L${B.cx},${B.t-8}`; }
      lx=x; ly=(A.cy+(vizinho?B.t-24:B.cy))/2; }
    const p=document.createElementNS(NS,'path'); p.setAttribute('d',d); p.setAttribute('fill','none');
    p.setAttribute('stroke',cor); p.setAttribute('stroke-width','3'); p.setAttribute('stroke-linejoin','round');
    if (volta) p.setAttribute('stroke-dasharray','10 8');
    p.setAttribute('marker-end','url(#m)'); svg.appendChild(p);
    if (rot) { const t=document.createElementNS(NS,'text'); t.textContent=rot.toUpperCase();
      t.setAttribute('x',lx); t.setAttribute('y',ly); t.setAttribute('fill',corP);
      t.setAttribute('font-family',fr+',monospace'); t.setAttribute('font-size','17'); t.setAttribute('font-weight','700');
      t.setAttribute('letter-spacing','2'); t.setAttribute('dominant-baseline','middle');
      if (volta) { t.setAttribute('text-anchor','middle'); t.setAttribute('transform',`rotate(-90 ${lx} ${ly})`); }
      else if (A.row===B.row) { t.setAttribute('text-anchor','middle'); }
      svg.appendChild(t);
      if (volta) { const bb=t.getBBox(); const r=document.createElementNS(NS,'rect');
        r.setAttribute('x',bb.x-8); r.setAttribute('y',bb.y-4); r.setAttribute('width',bb.width+16); r.setAttribute('height',bb.height+8);
        r.setAttribute('fill',st.getPropertyValue('--fundo').trim()); r.setAttribute('transform',`rotate(-90 ${lx} ${ly})`);
        svg.insertBefore(r,t); } }
  }
}
"""

QUEM = {"voce": "VOCÊ", "bot": "BOT", "ambos": "JUNTOS"}

def esc(s): return html.escape(str(s or ""))

def montar(spec, tema, largura):
    t = {**TEMA_PADRAO, **tema}
    nomes = spec.get("nomes", {})  # ex.: {"bot": "GROK"} para trocar o texto das tags
    quem = {**QUEM, **{k: v.upper() for k, v in nomes.items()}}
    linhas = spec["linhas"]; raias = spec.get("raias")
    maxw = 560 if any(len(l) > 1 for l in linhas) else 760
    corpo = []
    if raias:
        cols = " ".join(["1fr"] * len(raias))
        cs = ["destaque", "primaria", "secundario"]
        corpo.append(f'<div class="raias" style="grid-template-columns:{cols}">' + "".join(
            f'<div class="lbl" style="color:var(--{cs[i % 3]});border-color:var(--{cs[i % 3]})">{esc(r)}</div>'
            for i, r in enumerate(raias)) + "</div>")
    ids_seq = []
    for i, linha in enumerate(linhas):
        cel = []
        for j, n in enumerate(linha):
            nid = n.get("id") or f"n{i}_{j}"
            q = n.get("quem", ""); tipo = n.get("tipo", "normal")
            tag = f'<span class="tag {q}">{esc(quem.get(q, q))}</span>' if (q and not raias) else ""
            et = f'<span class="lbl et">{esc(n["etiqueta"])}</span>' if n.get("etiqueta") else "<span></span>"
            top = f'<div class="top">{et}{tag}</div>' if (tag or n.get("etiqueta")) else ""
            txt = f'<p>{esc(n["texto"])}</p>' if n.get("texto") else ""
            cel.append(f'<div class="n {q} {tipo}" data-id="{esc(nid)}" data-row="{i}">{top}<h3>{esc(n.get("titulo"))}</h3>{txt}</div>')
            if len(linha) == 1: ids_seq.append(nid)
        corpo.append(f'<div class="linha{" r" if raias else ""}">' + "".join(cel) + "</div>")
    setas = spec.get("setas")
    if setas is None:
        setas = [] if raias else [[ids_seq[k], ids_seq[k + 1]] for k in range(len(ids_seq) - 1)]
    leg = ""
    usados = {n.get("quem") for l in linhas for n in l if n.get("quem")}
    if usados and not raias:
        cor = {"voce": "destaque", "bot": "primaria", "ambos": "secundario"}
        leg = '<div class="leg">' + "".join(
            f'<span class="lbl" style="color:var(--{cor[k]})"><i class="sw" style="background:var(--{cor[k]})"></i>{quem[k]}</span>'
            for k in ("voce", "bot", "ambos") if k in usados) + "</div>"
    chips = ""
    if spec.get("chips"):
        chips = (f'<div class="chips"><div class="lbl">{esc(spec.get("chips_titulo", ""))}</div><div class="wrap">'
                 + "".join(f'<span class="chip">{esc(c)}</span>' for c in spec["chips"]) + "</div></div>")
    sv = ""
    if spec.get("sua_vez"):
        sv = f'<div class="sv"><div class="box"><span class="lbl">{esc(spec.get("sua_vez_rotulo", "Sua vez"))}</span><p>{esc(spec["sua_vez"])}</p></div></div>'
    vars_ = (f'--W:{largura}px;--fundo:{t["fundo"]};--card:{t["card"]};--superficie:{t["superficie"]};--borda:{t["borda"]};'
             f'--primaria:{t["primaria"]};--destaque:{t["destaque"]};--titulo:{t["titulo"]};--texto:{t["texto"]};'
             f'--secundario:{t["secundario"]};--fh:"{t["fonte_titulo"]}";--ft:"{t["fonte_texto"]}";--fr:"{t["fonte_rotulo"]}";'
             f'--maxw:{maxw}px;--gap:{spec.get("espaco", 56)}px')
    sub = f'<p class="sub">{esc(spec["subtitulo"])}</p>' if spec.get("subtitulo") else ""
    rot = f'<div class="lbl rot">{esc(spec["rotulo"])}</div>' if spec.get("rotulo") else ""
    return f"""<!doctype html><html style='{vars_}'><head><meta charset="utf-8"><style>{CSS}</style></head>
<body><div id="pg">{rot}<h1>{esc(spec.get("titulo"))}</h1>{sub}{leg}
<div id="corpo"><svg id="setas"></svg>{"".join(corpo)}</div>{chips}{sv}</div>
<script>window.SETAS={json.dumps(setas, ensure_ascii=False)};</script></body></html>"""

def render(html_str, out, largura, escala):
    from playwright.sync_api import sync_playwright
    with sync_playwright() as p:
        try: b = p.chromium.launch()
        except Exception: b = p.chromium.launch(channel="chrome")
        pg = b.new_page(viewport={"width": largura, "height": 800}, device_scale_factor=escala)
        pg.set_content(html_str, wait_until="load")
        pg.evaluate("document.fonts.ready")
        pg.evaluate(JS)
        pg.locator("#pg").screenshot(path=out)
        b.close()

if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("spec"); ap.add_argument("out")
    ap.add_argument("--tema", default=""); ap.add_argument("--largura", type=int, default=1080)
    ap.add_argument("--escala", type=float, default=2); ap.add_argument("--html", action="store_true", help="salva também o .html")
    a = ap.parse_args()
    spec = json.load(open(a.spec, encoding="utf-8"))
    tema = json.load(open(a.tema, encoding="utf-8")) if a.tema else {}
    h = montar(spec, tema, a.largura)
    if a.html: open(os.path.splitext(a.out)[0] + ".html", "w", encoding="utf-8").write(h)
    render(h, a.out, a.largura, a.escala)
    print("OK", a.out)
~~~

## Apêndice B — modelos (`~/conteudo/fluxogramas/modelos/`)

Textos genéricos. Troque dia, horário, palavra-chave e nome do bot pelos do intake.

### `01-quem-faz-o-que.json`

~~~json
{
 "rotulo": "Passo 1 de 5 · Quem faz o quê",
 "titulo": "Você decide. Eu faço o resto.",
 "subtitulo": "Seu tempo por semana: cerca de 1h gravando e 15 min aprovando.",
 "raias": [
  "Você",
  "Bot"
 ],
 "linhas": [
  [
   {
    "titulo": "Conta quem compra de você",
    "quem": "voce"
   },
   {
    "titulo": "Pesquisa o que está acontecendo no seu nicho",
    "quem": "bot"
   }
  ],
  [
   {
    "titulo": "Marca os ganchos que quer gravar",
    "quem": "voce"
   },
   {
    "titulo": "Escreve ganchos, roteiros e legendas",
    "quem": "bot"
   }
  ],
  [
   {
    "titulo": "Grava em lote e sobe na pasta",
    "quem": "voce"
   },
   {
    "titulo": "Edita áudio, legenda e capa",
    "quem": "bot"
   }
  ],
  [
   {
    "titulo": "Faz os stories ao vivo",
    "quem": "voce"
   },
   {
    "titulo": "Monta o pacote da semana com os números",
    "quem": "bot"
   }
  ],
  [
   {
    "titulo": "Responde \"aprovado\" ou \"muda X\"",
    "quem": "voce"
   },
   {
    "titulo": "Agenda só o que você aprovou",
    "quem": "bot"
   }
  ]
 ],
 "espaco": 22,
 "sua_vez": "Qual dessas tarefas suas te preocupa mais? Me responde com uma palavra."
}
~~~

### `02-ciclo-semanal.json`

~~~json
{
 "rotulo": "Passo 2 de 5 · Ciclo semanal",
 "titulo": "Uma semana, do começo ao fim",
 "subtitulo": "Toda semana repete. As caixas VOCÊ são as suas.",
 "linhas": [
  [
   {
    "id": "pesq",
    "etiqueta": "Sexta",
    "titulo": "Pesquiso e escrevo 10 a 15 ganchos",
    "quem": "bot"
   },
   {
    "id": "marca",
    "etiqueta": "Sex ou sáb",
    "titulo": "Você marca os que quer gravar",
    "quem": "voce"
   }
  ],
  [
   {
    "id": "edita",
    "etiqueta": "Todo dia",
    "titulo": "Edito cada vídeo que chega",
    "quem": "bot"
   },
   {
    "id": "grava",
    "etiqueta": "1 sessão",
    "titulo": "Você grava tudo de uma vez",
    "quem": "voce"
   }
  ],
  [
   {
    "id": "pacote",
    "etiqueta": "Domingo",
    "titulo": "Mando o pacote da semana",
    "quem": "bot"
   },
   {
    "id": "aprova",
    "etiqueta": "Domingo",
    "titulo": "Você responde \"aprovado\"",
    "quem": "voce"
   }
  ],
  [
   {
    "id": "agenda",
    "etiqueta": "Seg a dom",
    "titulo": "Agendo, confiro e meço",
    "quem": "bot"
   }
  ]
 ],
 "setas": [
  [
   "pesq",
   "marca"
  ],
  [
   "marca",
   "grava"
  ],
  [
   "grava",
   "edita"
  ],
  [
   "edita",
   "pacote"
  ],
  [
   "pacote",
   "aprova"
  ],
  [
   "aprova",
   "agenda"
  ],
  [
   "agenda",
   "pesq",
   "repete"
  ]
 ],
 "sua_vez": "Me diga o melhor dia e hora pra você aprovar o pacote."
}
~~~

### `03-fluxo-de-um-reel.json`

~~~json
{
 "rotulo": "Passo 3 de 5 · Fluxo de um Reel",
 "titulo": "Da ideia ao post em 7 passos",
 "subtitulo": "Você faz 3 deles. O resto fica comigo.",
 "linhas": [
  [
   {
    "id": "g",
    "etiqueta": "1",
    "titulo": "Escrevo o gancho",
    "texto": "A primeira frase do vídeo",
    "quem": "bot"
   },
   {
    "id": "m",
    "etiqueta": "2",
    "titulo": "Você marca",
    "texto": "O que seu comprador pararia pra ver",
    "quem": "voce"
   }
  ],
  [
   {
    "id": "e",
    "etiqueta": "4",
    "titulo": "Edito",
    "texto": "Áudio limpo, legenda, capa",
    "quem": "bot"
   },
   {
    "id": "r",
    "etiqueta": "3",
    "titulo": "Você grava",
    "texto": "Celular em pé, luz de frente",
    "quem": "voce"
   }
  ],
  [
   {
    "id": "l",
    "etiqueta": "5",
    "titulo": "Escrevo a legenda",
    "texto": "Com a palavra-chave da DM",
    "quem": "bot"
   },
   {
    "id": "a",
    "etiqueta": "6",
    "titulo": "Você aprova",
    "texto": "No pacote de domingo",
    "quem": "voce"
   }
  ],
  [
   {
    "id": "p",
    "etiqueta": "7",
    "titulo": "Agendo e acompanho",
    "texto": "A palavra-chave puxa a conversa no direct",
    "quem": "bot",
    "tipo": "destaque"
   }
  ]
 ],
 "setas": [
  [
   "g",
   "m"
  ],
  [
   "m",
   "r"
  ],
  [
   "r",
   "e"
  ],
  [
   "e",
   "l"
  ],
  [
   "l",
   "a"
  ],
  [
   "a",
   "p"
  ]
 ],
 "sua_vez": "Grave um vídeo de 10 segundos falando seu nome e mande aqui. É só um teste."
}
~~~

### `04-como-dar-feedback.json`

~~~json
{
 "rotulo": "Passo 4 de 5 · Como dar feedback",
 "titulo": "Uma correção vira regra",
 "subtitulo": "Diga o que mudar e por quê. Eu não repito o erro.",
 "linhas": [
  [
   {
    "id": "ex",
    "tipo": "nota",
    "etiqueta": "Exemplo",
    "titulo": "\"Capa com menos palavras. Está difícil de ler.\""
   }
  ],
  [
   {
    "id": "f",
    "etiqueta": "1",
    "titulo": "Você diz o que mudar e por quê",
    "quem": "voce"
   }
  ],
  [
   {
    "id": "c",
    "etiqueta": "2",
    "titulo": "Confirmo o que entendi em 1 frase",
    "quem": "bot"
   }
  ],
  [
   {
    "id": "s",
    "etiqueta": "3",
    "titulo": "Salvo como regra sua, com data",
    "quem": "bot"
   }
  ],
  [
   {
    "id": "v",
    "etiqueta": "4",
    "titulo": "Vale a partir do próximo post",
    "quem": "bot",
    "tipo": "destaque"
   }
  ]
 ],
 "setas": [
  [
   "f",
   "c"
  ],
  [
   "c",
   "s"
  ],
  [
   "s",
   "v"
  ]
 ],
 "espaco": 48,
 "sua_vez": "Me mande uma regra agora: algo que você nunca quer ver nos seus posts."
}
~~~

### `05-aprovacoes.json`

~~~json
{
 "rotulo": "Passo 5 de 5 · Aprovações",
 "titulo": "Nada vai ao ar sem o seu OK",
 "subtitulo": "Você responde no chat. Uma palavra basta.",
 "linhas": [
  [
   {
    "id": "prep",
    "titulo": "Eu preparo e te mostro",
    "texto": "Pacote, capa, texto ou gasto",
    "quem": "bot"
   }
  ],
  [
   {
    "id": "dec",
    "titulo": "Você olha e decide",
    "quem": "voce",
    "tipo": "decisao"
   }
  ],
  [
   {
    "id": "ok",
    "etiqueta": "\"Aprovado\"",
    "titulo": "Agendo e confiro",
    "quem": "bot",
    "tipo": "destaque"
   },
   {
    "id": "muda",
    "etiqueta": "\"Muda X\"",
    "titulo": "Ajusto só aquilo e te mostro de novo",
    "quem": "bot"
   }
  ]
 ],
 "setas": [
  [
   "prep",
   "dec"
  ],
  [
   "dec",
   "ok"
  ],
  [
   "dec",
   "muda"
  ],
  [
   "muda",
   "dec",
   "de novo"
  ]
 ],
 "chips_titulo": "Sempre pedem o seu OK",
 "chips": [
  "Ganchos escolhidos",
  "Pacote da semana",
  "Textos da DM automática",
  "Números e depoimentos",
  "Vídeo feito com IA",
  "Qualquer gasto",
  "Mensagem para outras pessoas"
 ],
 "sua_vez": "Responda \"aprovado\" aqui para eu ver que você entendeu."
}
~~~
