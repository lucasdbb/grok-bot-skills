#!/usr/bin/env bash
# ebook-to-pdf.sh — exporta um ebook HTML autocontido para PDF (A4, paginação por capítulo)
# via impressão headless do Chrome, usando a regra @media print da engine brand-ebook-engine.css.
#
# Uso: ./ebook-to-pdf.sh caminho/para/ebook.html [caminho/para/saida.pdf]
set -uo pipefail

IN="${1:-}"
if [[ -z "${IN}" ]]; then
  echo "Uso: $0 caminho/para/ebook.html [saida.pdf]" >&2
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
  --virtual-time-budget=8000 \
  "file://$(cd "$(dirname "${IN}")" && pwd)/$(basename "${IN}")"

echo "PDF gerado em: ${OUT}"
