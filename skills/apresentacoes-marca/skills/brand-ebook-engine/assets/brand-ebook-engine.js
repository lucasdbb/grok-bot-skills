/*
  brand-ebook-engine.js — mecânica de leitura dos ebooks da marca.
  Agnóstica de marca. Expõe window.__ebook para automação/verificação (Playwright),
  no mesmo espírito de window.__deck em brand-deck-engine.js.
*/
(function () {
  'use strict';

  function init() {
    var root = document.querySelector('.ebook');
    if (!root) return;

    var sections = Array.prototype.slice.call(root.querySelectorAll('.ebook-content > .ebook-page, .ebook-content > .chapter, .ebook-content > .part-divider'));
    var tocItems = Array.prototype.slice.call(root.querySelectorAll('.toc-item'));
    var progressFill = root.querySelector('.ebook-progress-fill');
    var tocEl = root.querySelector('.ebook-toc');
    var tocToggle = root.querySelector('.ebook-toc-toggle');
    var current = sections.length ? sections[0].id : null;

    function updateProgress() {
      var scrollTop = window.scrollY || document.documentElement.scrollTop;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var pct = max > 0 ? Math.min(100, Math.max(0, (scrollTop / max) * 100)) : 0;
      if (progressFill) progressFill.style.width = pct + '%';
      return pct;
    }

    function setActive(id) {
      if (!id || id === current) return;
      current = id;
      tocItems.forEach(function (item) {
        item.classList.toggle('active', item.getAttribute('data-chapter') === id);
      });
      root.dispatchEvent(new CustomEvent('ebook:sectionchange', { detail: { id: id } }));
    }

    if ('IntersectionObserver' in window && sections.length) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      }, { rootMargin: '-20% 0px -65% 0px', threshold: 0 });
      sections.forEach(function (s) { if (s.id) observer.observe(s); });
    }

    function toggleToc(force) {
      if (!tocEl) return;
      var open = typeof force === 'boolean' ? force : !tocEl.classList.contains('open');
      tocEl.classList.toggle('open', open);
      if (tocToggle) tocToggle.setAttribute('aria-expanded', String(open));
    }

    if (tocToggle) {
      tocToggle.addEventListener('click', function () { toggleToc(); });
    }
    tocItems.forEach(function (item) {
      item.addEventListener('click', function () {
        if (window.matchMedia('(max-width: 900px)').matches) toggleToc(false);
      });
    });

    document.addEventListener('keydown', function (e) {
      var tag = (e.target && e.target.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === 't' || e.key === 'T') toggleToc();
      if (e.key === 'Escape') toggleToc(false);
      if (e.key === ']' || e.key === '[') {
        var idx = sections.findIndex(function (s) { return s.id === current; });
        var next = e.key === ']' ? idx + 1 : idx - 1;
        if (next >= 0 && next < sections.length) {
          sections[next].scrollIntoView({ behavior: 'smooth' });
        }
        e.preventDefault();
      }
    });

    window.addEventListener('scroll', function () {
      window.requestAnimationFrame(updateProgress);
    }, { passive: true });

    updateProgress();
    if (sections.length) setActive(sections[0].id);

    window.__ebook = {
      get sections() { return sections.map(function (s) { return s.id; }); },
      get current() { return current; },
      get progress() { return updateProgress(); },
      goto: function (id) {
        var el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
      toggleToc: toggleToc
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
