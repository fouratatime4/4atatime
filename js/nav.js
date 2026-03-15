/* ============================================================
   nav.js — Mobile menu toggle + scroll-aware nav
   Runs after components.js dispatches 'componentsReady'
   ============================================================ */

function initNav() {
  const hamburger  = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('nav-mobile-menu');
  const siteNav    = document.getElementById('site-header');

  if (!hamburger || !mobileMenu) return;

  /* ── Hamburger toggle ──────────────────────── */

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    toggleMenu(!isOpen);
  });

  /* Close when a menu link is clicked */
  mobileMenu.addEventListener('click', e => {
    if (e.target.tagName === 'A') toggleMenu(false);
  });

  /* Close on click outside */
  document.addEventListener('click', e => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      toggleMenu(false);
    }
  });

  /* Close on Escape */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      toggleMenu(false);
      hamburger.focus();
    }
  });

  /* Close when viewport widens past mobile breakpoint */
  window.matchMedia('(min-width: 769px)').addEventListener('change', e => {
    if (e.matches) toggleMenu(false);
  });

  function toggleMenu(open) {
    hamburger.setAttribute('aria-expanded', String(open));
    hamburger.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    mobileMenu.setAttribute('aria-hidden', String(!open));
    mobileMenu.classList.toggle('is-open', open);

    /* Prevent body scroll while menu is open */
    document.body.style.overflow = open ? 'hidden' : '';
  }

  /* ── Scroll-aware nav border ───────────────── */

  if (siteNav) {
    const onScroll = () => {
      siteNav.classList.toggle('is-scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Run once on load
  }
}

/* Wait for components to be injected */
document.addEventListener('componentsReady', initNav);

/* Fallback if event already fired */
if (document.getElementById('nav-hamburger')) initNav();
