"""Coleta as comunicações de um advogado na API pública do DJEN e agrega a carteira.

Uso: python3 -I djen.py --oab <numero> --uf <UF> --out <pasta>  [--socios <oab1,oab2>] [--bruto <djen_bruto.json> para só reagregar]
Gera <pasta>/djen_bruto.json (comunicações) e <pasta>/djen_metricas.json (dados do dashboard).
O DJEN só cobre de meados de 2024 em diante: processos sem movimento desde então não aparecem.
"""
import argparse, collections as C, html, json, re, time, urllib.request, urllib.parse, datetime as dt, pathlib

API = "https://comunicaapi.pje.jus.br/api/v1/comunicacao"
PJ = r"\b(ltda|s\.?\s?a\.?|s/a|eireli|epp|me|condom[ií]nio|associa[cç][aã]o|sindicato|banco|cooperativa|funda[cç][aã]o|instituto|munic[ií]pio|estado de|uni[aã]o|fazenda|minist[eé]rio|companhia|cia\.?|seguradora|operadora|hospital|cl[ií]nica)\b"
GRANDES = {
    "Hapvida": r"hapvida", "Unimed": r"unimed", "Amil": r"\bamil\b", "Sul América": r"sul ?am[eé]rica",
    "Bradesco Saúde": r"bradesco sa[uú]de", "CASSI": r"\bcassi\b", "GEAP": r"\bgeap\b",
    "Banco do Brasil": r"banco do brasil", "Caixa": r"caixa econ[oô]mica", "Bradesco": r"banco bradesco",
    "Itaú": r"ita[uú] unibanco|banco ita[uú]", "Santander": r"santander", "Nubank": r"nu pagamentos|nubank",
    "Mercado Pago": r"mercado pago", "PicPay": r"picpay", "INSS": r"instituto nacional do seguro social",
    "União Federal": r"uni[aã]o federal|advocacia-geral da uni[aã]o", "Neoenergia": r"neoenergia|celpe",
    "Claro": r"\bclaro s", "Vivo/Telefônica": r"telef[oô]nica|\bvivo s", "TIM": r"\btim s", "Oi": r"\boi s\.?a",
}
MATERIA = [  # ordem importa: a primeira que casar classifica o processo
    ("Saúde suplementar", r"plano de sa[uú]de|operadora de|hapvida|unimed|\bamil\b|sul ?am[eé]rica sa|cassi|geap|home care|rol da ans"),
    ("Bancário e crédito", r"banco|financiamento|empr[eé]stimo|consignado|cart[aã]o de cr[eé]dito|pix|fraude banc"),
    ("Família e sucessões", r"alimentos|div[oó]rcio|guarda|invent[aá]rio|arrolamento|esp[oó]lio|uni[aã]o est[aá]vel|curatela|interdi"),
    ("Trabalhista", r"reclamante|reclamad[ao]|trabalhista"),
    ("Previdenciário e servidor", r"inss|aposentadoria|benef[ií]cio previdenci|servidor p[uú]blico|uni[aã]o federal"),
    ("Imobiliário e condomínio", r"condom[ií]nio|usucapi|loca[cç][aã]o|despejo|incorporadora|construtora"),
    ("Tributário e fazenda", r"execu[cç][aã]o fiscal|tribut|fazenda p[uú]blica|icms|iss\b"),
    ("Consumidor (outros)", r"consumidor|dano moral|neoenergia|celpe|telef|companhia a[eé]rea"),
    ("Criminal", r"den[uú]ncia|penal|crime|inqu[eé]rito"),
]

ATIVO = r"polo ativo|autor|autora|requerente|exequente|reclamante|impetrante|embargante|agravante|apelante|recorrente|demandante|promovente|inventariante|alimentand"
PASSIVO = r"polo passivo|r[eé]u|r[eé]\b|requerid|executad|reclamad|impetrad|embargad|agravad|apelad|recorrid|demandad|promovid"

def lado_do_advogado(tx, oab, nome=""):
    """Acha o advogado no texto e lê o papel processual escrito logo antes do nome.
    Devolve ("Autor"|"Réu"|None, trecho do texto a partir do papel)."""
    m = re.search(rf"(?<!\d)0*{oab}(?!\d)", tx)
    if not m and nome:
        m = re.search(re.escape(nome[:22]), tx)
    if not m:
        return None, ""
    antes = tx[max(0, m.start() - 320):m.start()]
    papeis = list(re.finditer(rf"({ATIVO})|({PASSIVO})", antes))
    if not papeis:
        return None, ""
    ult = papeis[-1]
    lado = "Autor" if ult.group(1) else "Réu"
    inicio = max(0, m.start() - 320) + ult.end()
    resto = tx[m.end():m.end() + 400]
    prox = re.search(rf"\b({ATIVO}|{PASSIVO})\b", resto)
    seg = tx[inicio:m.end() + (prox.start() if prox else 200)]
    return lado, seg

def baixar(oab, uf, nome):
    itens, pagina = [], 1
    while True:
        q = {"pagina": pagina, "itensPorPagina": 100}
        q.update({"numeroOab": oab, "ufOab": uf} if oab else {"nomeAdvogado": nome})
        for tentativa in range(5):  # carteiras grandes (milhares de comunicações) costumam dar timeout no meio
            try:
                with urllib.request.urlopen(f"{API}?{urllib.parse.urlencode(q)}", timeout=120) as r:
                    d = json.load(r)
                break
            except Exception:
                if tentativa == 4:
                    raise
                time.sleep(5 * (tentativa + 1))
        lote = d.get("items") or []
        itens += lote
        if not lote or len(itens) >= d.get("count", 0):
            return itens
        pagina += 1
        time.sleep(0.4)

def sem_acento(s):
    import unicodedata
    return "".join(ch for ch in unicodedata.normalize("NFD", s) if unicodedata.category(ch) != "Mn")

def texto(c):
    return html.unescape(re.sub(r"\s+", " ", re.sub("<[^>]+>", " ", c.get("texto") or ""))).lower()

def agregar(itens, oab, socios=()):
    hoje = dt.date.today()
    procs = C.defaultdict(list)
    for c in itens:
        procs[c["numeroprocessocommascara"] or c["numero_processo"]].append(c)
    m = {"gerado_em": hoje.isoformat(), "n_processos": len(procs), "n_comunicacoes": len(itens)}
    m["por_mes"] = sorted(C.Counter(c["data_disponibilizacao"][:7] for c in itens).items())
    m["tribunais"] = C.Counter(v[0]["siglaTribunal"] for v in procs.values()).most_common()
    m["classes"] = C.Counter(v[0]["nomeClasse"].title() for v in procs.values()).most_common(12)
    ano = C.Counter()
    for k in procs:
        a = re.search(r"-\d{2}\.(\d{4})\.", k)
        ano[a.group(1) if a else "?"] += 1
    m["ano_ajuizamento"] = sorted(ano.items())
    lim90, lim365 = (hoje - dt.timedelta(days=90)).isoformat(), (hoje - dt.timedelta(days=365)).isoformat()
    ult = {k: max(c["data_disponibilizacao"] for c in v) for k, v in procs.items()}
    m["ativos_90d"] = sum(u >= lim90 for u in ult.values())
    m["ativos_365d"] = sum(u >= lim365 for u in ult.values())

    nome = next((sem_acento(a["advogado"]["nome"].lower()) for c in itens for a in c.get("destinatarioadvogados") or []
                 if str((a.get("advogado") or {}).get("numero_oab")) == str(oab)), "")
    mat, grandes, polo, advs_freq, comum, rotulo = C.Counter(), C.Counter(), C.Counter(), C.Counter(), C.Counter(), {}
    clientes = set()
    for k, v in procs.items():
        t = " ".join(texto(c) for c in v) + " " + v[0]["nomeClasse"].lower()
        mat[next((n for n, r in MATERIA if re.search(r, t)), "Cível geral")] += 1
        for n, r in GRANDES.items():
            if re.search(r, t):
                grandes[n] += 1
        lados = C.Counter()
        for c in v:
            tx = sem_acento(texto(c))
            lado, seg = lado_do_advogado(tx, oab, nome)
            if not lado:  # texto não nomeia o advogado: se a intimação vai a um só polo, é o do cliente dele
                ps = {d.get("polo") for d in c.get("destinatarios") or []}
                lado = {"A": "Autor", "P": "Réu"}.get(ps.pop()) if len(ps) == 1 else None
            if lado:
                lados[lado] += 1
                letra = "A" if lado == "Autor" else "P"
                for d in c.get("destinatarios") or []:
                    if d.get("polo") == letra:
                        clientes.add(re.sub(r"^\d+\.\s*|\s*\(.*?\)$", "", d.get("nome", "")).strip().upper())
        presentes = {}
        for c in v:
            for x in c.get("destinatarioadvogados") or []:
                ad = x.get("advogado") or {}
                if ad.get("nome") and str(ad.get("numero_oab")) != str(oab):
                    presentes[re.sub(r"\D", "", str(ad.get("numero_oab")))] = f'{ad["nome"]} ({ad.get("uf_oab")} {ad.get("numero_oab")})'
        advs_freq.update(presentes.values())
        for so in socios:
            if so in presentes:
                comum[rotulo.setdefault(so, presentes[so])] += 1  # um rótulo por OAB (o nome vem com e sem acento)
        polo[lados.most_common(1)[0][0] if lados else "Não classificado"] += 1
    m["materias"] = mat.most_common()
    m["grandes_litigantes"] = grandes.most_common(15)
    m["polo"] = polo.most_common()  # texto da intimação; na falta, o polo único dos destinatários
    m["clientes_distintos"] = len(clientes)
    pj = sum(1 for n in clientes if re.search(PJ, n.lower()))
    m["clientes_pf_pj"] = [["Pessoa física", len(clientes) - pj], ["Pessoa jurídica", pj]]
    # qualquer lado: em contencioso de massa os primeiros costumam ser advogados da parte contrária
    m["advogados_frequentes"] = advs_freq.most_common(15)
    m["processos_com_socios"] = comum.most_common()
    m["exemplos"] = [
        {"processo": k, "tribunal": v[0]["siglaTribunal"], "classe": v[0]["nomeClasse"].title(),
         "orgao": v[0]["nomeOrgao"], "ultima": ult[k], "link": v[0].get("link")}
        for k, v in sorted(procs.items(), key=lambda kv: ult[kv[0]], reverse=True)[:25]
    ]
    return m

if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--oab"); ap.add_argument("--uf", default="PE"); ap.add_argument("--nome")
    ap.add_argument("--out", required=True)
    ap.add_argument("--socios", default="", help="OABs dos sócios separadas por vírgula, para contar processos em comum")
    ap.add_argument("--bruto", help="reaproveita um djen_bruto.json já baixado")
    a = ap.parse_args()
    out = pathlib.Path(a.out); out.mkdir(parents=True, exist_ok=True)
    itens = json.loads(pathlib.Path(a.bruto).read_text()) if a.bruto else baixar(a.oab, a.uf, a.nome)
    (out / "djen_bruto.json").write_text(json.dumps(itens, ensure_ascii=False))
    m = agregar(itens, a.oab, [x.strip() for x in a.socios.split(",") if x.strip()])
    (out / "djen_metricas.json").write_text(json.dumps(m, ensure_ascii=False, indent=1))
    print(json.dumps({k: m[k] for k in ("n_processos", "n_comunicacoes", "ativos_90d", "tribunais", "materias", "polo", "clientes_distintos", "clientes_pf_pj", "processos_com_socios")}, ensure_ascii=False))
    print("advogados frequentes (qualquer lado):", m["advogados_frequentes"][:6])
