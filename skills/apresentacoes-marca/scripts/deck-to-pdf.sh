#!/usr/bin/env bash
# deck-to-pdf.sh — exporta um deck HTML autocontido para PDF (16:9, uma página por slide)
# via impressão headless do Chrome, usando a regra @media print da engine brand-deck-engine.css.
#
# Uso: ./deck-to-pdf.sh caminho/para/deck.html [caminho/para/saida.pdf]
set -uo pipefail

IN="${1:-}"
if [[ -z "${IN}" ]]; then
  echo "Uso: $0 caminho/para/deck.html [saida.pdf]" >&2
  exit 1
fi

OUT="${2:-${IN%.html}.pdf}"

CHROME="$(command -v chromium || command -v google-chrome || echo "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome")"

if [[ ! -x "${CHROME}" ]]; then
  echo "Chrome/Chromium não encontrado. Instale o Google Chrome ou ajuste a variável CHROME neste script." >&2
  exit 1
fi

"${CHROME}" \
  --headless=new \
  --disable-gpu \
  --print-to-pdf="${OUT}" \
  --print-to-pdf-no-header \
  --no-pdf-header-footer \
  --virtual-time-budget=5000 \
  "file://$(cd "$(dirname "${IN}")" && pwd)/$(basename "${IN}")"

echo "PDF gerado em: ${OUT}"
