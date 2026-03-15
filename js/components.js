/* ============================================================
   components.js — Shared nav + footer injection
   To update nav or footer sitewide: edit THIS file only.
   ============================================================ */

const NAV_HTML = `
<a class="skip-nav" href="#main-content">Skip to content</a>
<header class="site-nav" id="site-header" role="banner">
  <a href="/" class="nav-logo" aria-label="4atatime — go to homepage">
    <img src="/assets/images/logo.svg"
         alt="4atatime"
         width="38" height="38"
         onerror="this.style.display='none'; this.nextElementSibling.style.display='block'">
    <span class="nav-logo-text" style="display:none">4atatime</span>
  </a>

  <nav class="nav-links" role="navigation" aria-label="Main navigation">
    <a href="/uiux.html">UI/UX</a>
    <a href="/grafix.html">Grafix</a>
    <a href="/ink.html">Ink!</a>
    <a href="/music.html">m&#956;sic</a>
    <a href="https://www.notion.so/4atatime/Lexie-Yu-4atatime-5d66f27acd654f31a29fca320ad33f63"
       target="_blank" rel="noopener noreferrer">More&#8599;&#65087;</a>
    <a href="/contact.html">Contact</a>
  </nav>

  <button class="nav-hamburger" id="nav-hamburger"
          aria-label="Open navigation menu"
          aria-expanded="false"
          aria-controls="nav-mobile-menu">
    <span aria-hidden="true"></span>
    <span aria-hidden="true"></span>
    <span aria-hidden="true"></span>
  </button>
</header>

<div class="nav-mobile-menu"
     id="nav-mobile-menu"
     role="dialog"
     aria-label="Navigation menu"
     aria-hidden="true">
  <span class="nav-mobile-label" aria-hidden="true">MENU</span>
  <a href="/uiux.html">UI/UX</a>
  <a href="/grafix.html">Grafix</a>
  <a href="/ink.html">Ink!</a>
  <a href="/music.html">m&#956;sic</a>
  <a href="https://www.notion.so/4atatime/Lexie-Yu-4atatime-5d66f27acd654f31a29fca320ad33f63"
     target="_blank" rel="noopener noreferrer">More&#8599;&#65087;</a>
  <a href="/contact.html">Contact</a>
</div>
`;

const FOOTER_HTML = `
<footer class="site-footer" role="contentinfo">
  <nav class="footer-social" aria-label="Social links">
    <a href="mailto:lexieyu42yce@gmail.com">&lt; Email &gt;</a>
    <a href="https://www.instagram.com/4_atatime_/"
       target="_blank" rel="noopener noreferrer">&lt; Instagram &gt;</a>
    <a href="https://www.linkedin.com/in/lexie-yu-720387260/"
       target="_blank" rel="noopener noreferrer">&lt; LinkedIn &gt;</a>
    <a href="https://www.are.na/4-atatime/channels"
       target="_blank" rel="noopener noreferrer">&lt; Are.na &gt;</a>
    <a href="https://soundcloud.com/lexie-yu-270763808/tracks"
       target="_blank" rel="noopener noreferrer">&lt; Soundcloud &gt;</a>
  </nav>

  <div class="footer-meta">
    <span class="footer-meta-left">
      &copy; Site made by
      <a href="https://www.instagram.com/4_atatime_/"
         target="_blank" rel="noopener noreferrer">4atatime</a>
    </span>
    <a href="#site-header" class="back-to-top">&#8679; Back to top</a>
  </div>

  <p class="footer-updated">&gt; Last updated: 03/2026</p>
</footer>
`;

/* ── Inject & initialise ─────────────────────────────── */

function injectComponents() {
  const navEl    = document.getElementById('nav-placeholder');
  const footerEl = document.getElementById('footer-placeholder');

  if (navEl)    navEl.innerHTML    = NAV_HTML;
  if (footerEl) footerEl.innerHTML = FOOTER_HTML;

  markActiveLink();

  // Signal that nav is ready so nav.js can attach its events
  document.dispatchEvent(new Event('componentsReady'));
}

/* Highlight the nav link matching the current page */
function markActiveLink() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';

  document.querySelectorAll('.nav-links a, .nav-mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('http')) return;

    const normalised = href.replace(/\/$/, '') || '/';
    const isHome     = normalised === '/' && path === '/';
    const isSection  = normalised !== '/' && path.startsWith(normalised);

    if (isHome || isSection) {
      link.setAttribute('aria-current', 'page');
    }
  });
}

/* Run as soon as DOM is ready */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectComponents);
} else {
  injectComponents();
}
