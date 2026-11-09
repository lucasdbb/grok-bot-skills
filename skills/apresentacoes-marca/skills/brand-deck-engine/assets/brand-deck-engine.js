/*
  brand-deck-engine.js — mecânica de navegação dos decks da marca.
  Agnóstica de marca. Expõe window.__deck para automação/verificação (Playwright).
*/
(function () {
  'use strict';

  function init() {
    var deckEl = document.querySelector('.deck');
    if (!deckEl) return;

    var slides = Array.prototype.slice.call(deckEl.querySelectorAll('.slide'));
    var total = slides.length;
    var current = 0;
    var startedAt = Date.now();
    var timeLimitMin = parseFloat(deckEl.getAttribute('data-time-limit') || '0');

    var progressFill = deckEl.querySelector('.deck-progress-fill');
    var timerEl = deckEl.querySelector('.deck-timer');
    var notesEl = deckEl.querySelector('.deck-notes');
    var controlsEl = deckEl.querySelector('.deck-controls');
    var prevBtn = deckEl.querySelector('.deck-prev');
    var nextBtn = deckEl.querySelector('.deck-next');

    function fragsOf(slide) {
      return Array.prototype.slice.call(slide.querySelectorAll('.frag'));
    }

    function render() {
      slides.forEach(function (s, i) {
        s.classList.toggle('active', i === current);
      });
      if (progressFill) {
        progressFill.style.width = (total <= 1 ? 100 : (current / (total - 1)) * 100) + '%';
      }
      if (notesEl) {
        var notes = slides[current].getAttribute('data-notes') || '';
        notesEl.textContent = notes;
      }
      deckEl.dispatchEvent(new CustomEvent('deck:slidechange', {
        detail: { index: current, total: total }
      }));
    }

    function revealNextFragOrAdvance() {
      var frags = fragsOf(slides[current]);
      var hidden = frags.filter(function (f) { return !f.classList.contains('frag-visible'); });
      if (hidden.length) {
        hidden[0].classList.add('frag-visible');
        return;
      }
      show(current + 1);
    }

    function show(index) {
      if (index < 0 || index >= total) return;
      current = index;
      render();
    }

    function next() { revealNextFragOrAdvance(); }

    function prev() {
      if (current > 0) {
        show(current - 1);
        // ao voltar, exibe todos os fragments do slide anterior (evita reentrada confusa)
        fragsOf(slides[current]).forEach(function (f) { f.classList.add('frag-visible'); });
      }
    }

    function goto(index) { show(index); }

    function toggleNotes() {
      if (notesEl) notesEl.classList.toggle('visible');
    }

    function toggleFullscreen() {
      if (!document.fullscreenElement) {
        (deckEl.requestFullscreen || function () {}).call(deckEl);
      } else {
        document.exitFullscreen();
      }
    }

    function pulseControls() {
      if (!controlsEl) return;
      controlsEl.classList.add('active-recent');
      clearTimeout(controlsEl._pulseTimer);
      controlsEl._pulseTimer = setTimeout(function () {
        controlsEl.classList.remove('active-recent');
      }, 1800);
    }

    // Teclado
    document.addEventListener('keydown', function (e) {
      var tag = (e.target && e.target.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case 'PageDown':
        case ' ':
          e.preventDefault();
          next();
          pulseControls();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          prev();
          pulseControls();
          break;
        case 'Home':
          show(0);
          break;
        case 'End':
          show(total - 1);
          break;
        case 'f':
        case 'F':
          toggleFullscreen();
          break;
        case 'n':
        case 'N':
          toggleNotes();
          break;
        default:
          if (/^[1-9]$/.test(e.key)) {
            var n = parseInt(e.key, 10) - 1;
            if (n < total) show(n);
          }
      }
    });

    // Clique: metade direita avança, metade esquerda volta
    deckEl.addEventListener('click', function (e) {
      var interactive = e.target.closest('a, button, input, textarea, select, .deck-controls, .deck-notes');
      if (interactive) return;
      var half = deckEl.getBoundingClientRect().width / 2;
      var x = e.clientX - deckEl.getBoundingClientRect().left;
      if (x > half) { next(); } else { prev(); }
      pulseControls();
    });

    if (prevBtn) prevBtn.addEventListener('click', function (e) { e.stopPropagation(); prev(); });
    if (nextBtn) nextBtn.addEventListener('click', function (e) { e.stopPropagation(); next(); });

    // Timer
    if (timerEl) {
      setInterval(function () {
        var elapsedSec = Math.floor((Date.now() - startedAt) / 1000);
        var mm = String(Math.floor(elapsedSec / 60)).padStart(2, '0');
        var ss = String(elapsedSec % 60).padStart(2, '0');
        timerEl.textContent = mm + ':' + ss;
        if (timeLimitMin > 0 && elapsedSec >= timeLimitMin * 60) {
          timerEl.classList.add('over');
        }
      }, 1000);
    }

    render();

    window.__deck = {
      show: show,
      next: next,
      prev: prev,
      goto: goto,
      toggleNotes: toggleNotes,
      toggleFullscreen: toggleFullscreen,
      get current() { return current; },
      get total() { return total; }
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
