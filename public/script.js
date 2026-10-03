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
  /* ---------- image zoom (tap / click to enlarge) ----------
     Every content image zooms automatically (new images too). Logos/icons are skipped; add class "no-zoom" to opt out. */
  const zoomImgs = document.querySelectorAll('img:not(.hero-logo):not(.nav-logo-icon):not(.no-zoom):not(.footer-logo img)');
  if (zoomImgs.length) {
    const box = document.createElement('div');
    box.className = 'zoom-box'; box.hidden = true; box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true'); box.setAttribute('aria-label', '画像の拡大表示');
    box.innerHTML = '<button type="button" class="zoom-close" aria-label="閉じる">×</button><img class="zoom-img no-zoom" alt="">';
    document.body.appendChild(box);
    const big = box.querySelector('.zoom-img');
    let lastFocus = null;
    const open = (img) => {
      lastFocus = document.activeElement;
      big.src = img.currentSrc || img.src; big.alt = img.alt || '';
      box.hidden = false; document.body.classList.add('zoom-open');
      box.querySelector('.zoom-close').focus();
    };
    const close = () => {
      box.hidden = true; document.body.classList.remove('zoom-open'); big.removeAttribute('src');
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    };
    box.addEventListener('click', close);
    document.addEventListener('keydown', (e) => { if (!box.hidden && e.key === 'Escape') close(); });
    zoomImgs.forEach((img) => {
      const wrap = document.createElement('span');
      wrap.className = 'zoom-wrap';
      img.parentNode.insertBefore(wrap, img); wrap.appendChild(img);
      wrap.tabIndex = 0; wrap.setAttribute('role', 'button'); wrap.setAttribute('aria-label', (img.alt || '画像') + '（拡大）');
      wrap.addEventListener('click', () => open(img));
      wrap.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(img); } });
    });
  }
  /* ---------- how-it-works popup ---------- */
  const howDlg = document.getElementById('howDlg');
  const howOpen = document.getElementById('howOpen');
  if (howDlg && howOpen && typeof howDlg.showModal === 'function') {
    const closeHow = () => howDlg.close();
    howOpen.addEventListener('click', () => { howDlg.showModal(); document.body.classList.add('how-open'); });
    document.getElementById('howClose').addEventListener('click', closeHow);
    howDlg.addEventListener('click', (e) => { if (e.target === howDlg) closeHow(); });   // click on the dark backdrop
    howDlg.addEventListener('close', () => document.body.classList.remove('how-open'));
  } else if (howOpen) {
    howOpen.hidden = true;   // very old browsers: just hide the chip
  }
})();
