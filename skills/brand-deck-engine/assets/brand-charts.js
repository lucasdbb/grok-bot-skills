/*
  brand-charts.js — defaults do Chart.js para decks desta marca.
  Namespace: global.BrandCharts. Requer Chart.js já carregado no documento.

  Diferente das folhas de estilo, um gráfico Chart.js não lê var(--primary)
  sozinho: ele precisa do valor resolvido. Por isso este arquivo lê os
  tokens direto do CSS computado em tempo de execução (getComputedStyle),
  em vez de hardcodar hex — assim, ao configurar a marca (trocar só
  brand-tokens.css), os gráficos acompanham automaticamente, sem precisar
  editar este arquivo.
*/
(function (global) {
  'use strict';

  function cssVar(name, fallback) {
    try {
      var v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
      return v || fallback;
    } catch (e) {
      return fallback;
    }
  }

  var BRAND_PALETTE = {
    primary: cssVar('--primary', '#00F0FF'),
    primaryDim: cssVar('--primary-dim', '#00C4D4'),
    accent: cssVar('--secondary', '#6366F1'),
    accentDim: cssVar('--secondary-dim', '#4F51C8'),
    text: cssVar('--ink', '#F8FAFC'),
    textSecondary: cssVar('--ink-soft', '#94A3B8'),
    border: cssVar('--rule', '#334155'),
    surface: cssVar('--bg-soft', '#0A1628'),
    success: cssVar('--success', '#10B981'),
    warning: cssVar('--warning', '#F59E0B'),
    error: cssVar('--error', '#EF4444'),
    info: cssVar('--info', '#3B82F6')
  };

  var SERIES_COLORS = [
    BRAND_PALETTE.primary,
    BRAND_PALETTE.accent,
    BRAND_PALETTE.success,
    BRAND_PALETTE.warning,
    BRAND_PALETTE.info,
    BRAND_PALETTE.error
  ];

  function formatNumberBR(n) {
    return Number(n).toLocaleString('pt-BR');
  }

  function formatBRLThousands(n) {
    return 'R$ ' + (Number(n) / 1000).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' mil';
  }

  function formatPercentBR(n) {
    return Number(n).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + '%';
  }

  function applyDefaults(Chart) {
    if (!Chart) return;
    Chart.defaults.font.family = "'Inter', system-ui, sans-serif";
    Chart.defaults.color = BRAND_PALETTE.textSecondary;
    Chart.defaults.borderColor = BRAND_PALETTE.border;
    Chart.defaults.plugins.legend.labels.color = BRAND_PALETTE.text;
    Chart.defaults.plugins.tooltip.backgroundColor = BRAND_PALETTE.surface;
    Chart.defaults.plugins.tooltip.titleColor = BRAND_PALETTE.text;
    Chart.defaults.plugins.tooltip.bodyColor = BRAND_PALETTE.textSecondary;
    Chart.defaults.plugins.tooltip.borderColor = BRAND_PALETTE.border;
    Chart.defaults.plugins.tooltip.borderWidth = 1;
    Chart.defaults.plugins.tooltip.padding = 12;
    Chart.defaults.plugins.tooltip.cornerRadius = 8;
  }

  global.BrandCharts = {
    PALETTE: BRAND_PALETTE,
    SERIES_COLORS: SERIES_COLORS,
    formatNumberBR: formatNumberBR,
    formatBRLThousands: formatBRLThousands,
    formatPercentBR: formatPercentBR,
    applyDefaults: applyDefaults
  };
})(window);
