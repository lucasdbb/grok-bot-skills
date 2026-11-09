#!/usr/bin/env node
/*
  ebook-to-pdf-livro.js — exportação "modo livro" de um ebook da marca para PDF.

  Diferença para scripts/ebook-to-pdf.sh (impressão nativa do navegador): aqui o
  documento é repaginado de verdade antes da impressão, via
  skills/brand-ebook-engine/assets/brand-ebook-paginator.js + brand-ebook-livro.css:
  folhas A4 dark de ponta a ponta (sem moldura branca de margem de @page),
  rodapé com título e número de página, sumário com número de página, capítulo
  abrindo em folha nova e cards nunca órfãos em página vazia.

  Uso:
    node scripts/ebook-to-pdf-livro.js entrada.html [saida.pdf] [--fonts fonts.css]

  --fonts: CSS com @font-face das fontes da marca embutidas em base64
  (Sora/Inter/JetBrains Mono). Padrão: brand-fonts-embedded.css da engine, que
  garante a tipografia da marca mesmo sem acesso a fonts.googleapis.com no momento
  da exportação (sem fontes embutidas o PDF sairia silenciosamente com fonte
  de fallback do sistema). Passe --fonts none para desativar e usar só a rede.

  Requisitos: playwright com Chromium. Overrides por variável de ambiente:
    PLAYWRIGHT_MODULE — caminho do módulo playwright (ex.: instalação global)
    CHROME_PATH       — executável do Chromium/Chrome a usar
*/
'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');

function resolvePlaywright() {
  const candidates = [
    process.env.PLAYWRIGHT_MODULE,
    'playwright',
    '/opt/node22/lib/node_modules/playwright'
  ].filter(Boolean);
  for (const candidate of candidates) {
    try { return require(candidate); } catch (e) { /* tenta o próximo */ }
  }
  console.error('playwright não encontrado. Instale (npm i -D playwright) ou aponte PLAYWRIGHT_MODULE.');
  process.exit(1);
}

async function main() {
  const args = process.argv.slice(2);
  const positional = [];
  let fontsCssPath = null;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--fonts') { fontsCssPath = args[++i]; }
    else positional.push(args[i]);
  }
  const input = positional[0];
  if (!input) {
    console.error('Uso: node scripts/ebook-to-pdf-livro.js entrada.html [saida.pdf] [--fonts fonts.css]');
    process.exit(1);
  }
  const output = positional[1] || input.replace(/\.html?$/i, '') + '.pdf';

  const engineDir = path.join(__dirname, '..', 'skills', 'brand-ebook-engine', 'assets');
  const livroCss = path.join(engineDir, 'brand-ebook-livro.css');
  const paginatorJs = path.join(engineDir, 'brand-ebook-paginator.js');

  if (!fontsCssPath) {
    const vendored = path.join(engineDir, 'brand-fonts-embedded.css');
    if (fs.existsSync(vendored)) fontsCssPath = vendored;
  } else if (fontsCssPath === 'none') {
    fontsCssPath = null;
  }

  let html = fs.readFileSync(input, 'utf8');
  if (fontsCssPath) {
    const fontsCss = fs.readFileSync(fontsCssPath, 'utf8');
    // remove os <link> do Google Fonts (inúteis offline) e injeta as fontes inline
    html = html.replace(/<link[^>]+fonts\.g(oogleapis|static)\.com[^>]*>\s*/g, '');
    html = html.replace('</head>', '<style>\n' + fontsCss + '\n</style>\n</head>');
  }
  const tmpHtml = path.join(os.tmpdir(), 'brand-ebook-livro-' + process.pid + '.html');
  fs.writeFileSync(tmpHtml, html);

  const { chromium } = resolvePlaywright();
  const browser = await chromium.launch({
    executablePath: process.env.CHROME_PATH || undefined
  });
  try {
    const page = await browser.newPage();
    await page.goto('file://' + tmpHtml, { waitUntil: 'load' });
    await page.addStyleTag({ path: livroCss });
    await page.addScriptTag({ path: paginatorJs });
    const stats = await page.evaluate(() => window.__anaEbookLivro.paginate());
    await page.pdf({
      path: output,
      printBackground: true,
      preferCSSPageSize: true
    });
    console.log('PDF gerado em: ' + output + ' (' + stats.pages + ' páginas)');
    console.log('Sumário: ' + stats.toc.map(t => t.num + ' "' + t.title + '" p.' + t.page).join(' | '));
  } finally {
    await browser.close();
    fs.unlinkSync(tmpHtml);
  }
}

main().catch(err => { console.error(err); process.exit(1); });
