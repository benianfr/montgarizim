/* ════════════════════════════════════════════════════════════
   ASSEMBLÉE MONT GARIZIM DOKUI — Script commun à toutes les pages
   ════════════════════════════════════════════════════════════ */

// ─── MENU MOBILE PLEIN ÉCRAN ───
(function () {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('mobileMenu');
  const closeBtn = document.getElementById('mobileMenuClose');
  if (!toggle || !menu) return;

  function openMenu() {
    menu.classList.add('open');
    menu.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
    if (closeBtn) closeBtn.focus();
  }
  function closeMenu() {
    menu.classList.remove('open');
    menu.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    toggle.focus();
  }

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('open')) closeMenu();
  });
})();

// ─── SCROLL REVEAL ───
(function () {
  const rvEls = document.querySelectorAll('.rv');
  if (!rvEls.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('on'); });
  }, { threshold: 0.1 });
  rvEls.forEach(el => obs.observe(el));
})();

// ─── ONGLETS (tabs) ───
function tab(btn, id) {
  // Le conteneur réel des onglets est le parent du bandeau .tabs :
  // c'est lui qui regroupe à la fois les boutons et les panneaux .tab-pane.
  const tabsBar = btn.closest('.tabs');
  const scope = tabsBar ? tabsBar.parentElement : btn.closest('section,div');
  scope.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('on'));
  scope.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('on'));
  btn.classList.add('on');
  document.getElementById(id).classList.add('on');
}

// ─── BANDEAU STICKY (CTA ticket) ───
(function () {
  const sticky = document.getElementById('sticky');
  if (!sticky) return;
  function update() {
    sticky.classList.toggle('on', window.scrollY > 360);
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
})();

// ─── COMPTE À REBOURS (page d'accueil uniquement) ───
(function () {
  const cdVis = document.getElementById('cdVis');
  if (!cdVis) return;
  function countdown() {
    const target = new Date('2026-07-01T18:30:00').getTime();
    const diff = target - Date.now();
    if (diff <= 0) { cdVis.style.display = 'none'; return; }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    document.getElementById('cd-d').textContent = String(d).padStart(2, '0');
    document.getElementById('cd-h').textContent = String(h).padStart(2, '0');
    document.getElementById('cd-m').textContent = String(m).padStart(2, '0');
    document.getElementById('cd-s').textContent = String(s).padStart(2, '0');
  }
  countdown();
  setInterval(countdown, 1000);
})();