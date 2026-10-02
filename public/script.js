(() => {
  'use strict';

  /* ---------- links from config.js ---------- */
  // config.js の window.TAISA を、ページ内のリンク(data-link)と表示(data-bind)に反映
  const T = window.TAISA || {};
  const L = {
    download: T.downloadUrl, github: T.githubUrl, release: T.releaseUrl, siterepo: T.siteRepoUrl,
    troubleshooting: T.troubleshootingUrl, verify: T.verifyUrl, sharex: T.sharexUrl
  };
  document.querySelectorAll('[data-link]').forEach((a) => {
    const url = L[a.dataset.link];
    if (url) a.setAttribute('href', url);
  });
  document.querySelectorAll('[data-bind]').forEach((el) => {
    const v = T[el.dataset.bind];
    if (v) el.textContent = v;
  });

  /* ---------- mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    navLinks.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- to-top button ---------- */
  const toTop = document.getElementById('toTop');
  if (toTop) {
    window.addEventListener('scroll', () => { toTop.hidden = window.scrollY < 480; }, { passive: true });
    toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
})();
