/* nav-inject.js — ApexOps shared layout */
document.addEventListener('DOMContentLoaded', () => {

  /* ── NAV ── */
  const navEl = document.getElementById('site-nav');
  if (navEl) navEl.innerHTML = `
    <nav class="nav" role="navigation" aria-label="Main navigation">
      <a class="nav-brand" href="index.html" aria-label="ApexOps Home">
        Apex<span class="accent">Ops</span><span class="dot" aria-hidden="true"></span>
      </a>
      <div class="nav-links" id="nav-links" role="menubar">
        <a href="index.html"   data-page="index.html"   role="menuitem">Home</a>
        <a href="crm.html"     data-page="crm.html"     role="menuitem">CRM &amp; Automation</a>
        <a href="bi.html"      data-page="bi.html"       role="menuitem">Data &amp; BI</a>
        <a href="ai.html"      data-page="ai.html"       role="menuitem">AI &amp; MCP</a>
        <a href="about.html"   data-page="about.html"   role="menuitem">About</a>
        <a href="founder.html" data-page="founder.html" role="menuitem">The Founder</a>
        <a href="schedule.html" data-page="schedule.html" class="nav-cta" role="menuitem">Book a Diagnostic</a>
      </div>
      <button class="hamburger" id="hamburger" aria-label="Open navigation menu" aria-expanded="false" aria-controls="nav-links">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" aria-hidden="true">
          <line x1="3" y1="7"  x2="19" y2="7"/>
          <line x1="3" y1="12" x2="19" y2="12"/>
          <line x1="3" y1="17" x2="19" y2="17"/>
        </svg>
      </button>
    </nav>
    <div id="scroll-bar" aria-hidden="true"></div>
  `;

  /* ── FOOTER ── */
  const footerEl = document.getElementById('site-footer');
  if (footerEl) footerEl.innerHTML = `
    <footer class="footer" role="contentinfo">
      <div class="footer-top">
        <div>
          <div class="footer-brand">Apex<span class="accent">Ops</span></div>
          <p class="footer-tagline">Elite BI, RevOps &amp; CRM automation consulting for data-driven companies ready to scale.</p>
          <span class="footer-pill">Accepting New Clients</span>
        </div>
        <div class="footer-col">
          <h4>Services</h4>
          <a href="crm.html">CRM &amp; Automation</a>
          <a href="bi.html">Data &amp; BI</a>
          <a href="ai.html">AI &amp; MCP Integration</a>
          <a href="schedule.html">Book a Diagnostic</a>
        </div>
        <div class="footer-col">
          <h4>Company</h4>
          <a href="index.html">Home</a>
          <a href="about.html">About</a>
          <a href="founder.html">The Founder</a>
          <a href="contact.html">Client Results</a>
        </div>
        <div class="footer-col">
          <h4>Specialisations</h4>
          <p>Zoho · HubSpot · GoHighLevel · Power BI · Zapier · Make · SQL · REST APIs</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2025 ApexOps Consulting. All rights reserved.</p>
        <p>CRM Automation &middot; Revenue Operations &middot; Business Intelligence</p>
      </div>
    </footer>
  `;

  /* ── ACTIVE LINK ── */
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a[data-page]').forEach(a => {
    a.classList.toggle('active', a.dataset.page === page);
  });

  /* ── MOBILE MENU ── */
  const ham = document.getElementById('hamburger');
  const nl  = document.getElementById('nav-links');
  if (ham && nl) {
    ham.addEventListener('click', () => {
      const open = nl.classList.toggle('open');
      ham.setAttribute('aria-expanded', String(open));
    });
    nl.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nl.classList.remove('open');
      ham.setAttribute('aria-expanded', 'false');
    }));
    document.addEventListener('click', e => {
      if (!ham.contains(e.target) && !nl.contains(e.target)) {
        nl.classList.remove('open');
        ham.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── SCROLL PROGRESS & NAV SHADOW ── */
  const bar = document.getElementById('scroll-bar');
  const nav = document.querySelector('.nav');
  const onScroll = () => {
    const d = document.documentElement;
    const pct = d.scrollTop / (d.scrollHeight - d.clientHeight) * 100;
    if (bar) bar.style.width = Math.max(0, Math.min(pct || 0, 100)) + '%';
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── SCROLL REVEAL ── */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  /* ── ESCAPE CLOSES MODAL ── */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && typeof closeModal === 'function') closeModal();
  });

});
