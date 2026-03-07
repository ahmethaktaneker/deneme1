/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  ahmethaktaneker.com — Site Geliştirme Paketi v2.0              ║
 * ║  ─────────────────────────────────────────────────────────────── ║
 * ║  Bu dosyayı tüm sayfalarda </body> kapanmadan önce ekle:        ║
 * ║  <script src="/js/enhancements.js"></script>                    ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 *  İÇİNDEKİLER
 *  ──────────────────────────────────────────────────────────────────
 *  01. CONFIG             — Tüm ayarlar tek yerde
 *  02. PARTICLES          — Hero altın nokta efekti
 *  03. THUMBNAILS         — Kart görselleri + hover zoom
 *  04. GLASSMORPHISM      — Cam efekti CSS enjeksiyonu
 *  05. READING MODE       — Odaklanma modu
 *  06. COOKIE BANNER      — KVKK uyumlu çerez bildirimi
 *  07. TABLE OF CONTENTS  — Otomatik içindekiler
 *  08. SHARE SIDEBAR      — Sabit paylaşım çubuğu
 *  09. LIKE / DISLIKE     — Beğeni → Google Sheets
 *  10. READING COMPLETE   — Yazı bitişi kutlaması
 *  11. BOOKMARKS          — Okuma listesi (localStorage)
 *  12. PRINT STYLES       — Baskı düzeni
 *  13. YEAR FILTERS       — Arşiv yıl filtreleri
 *  14. READING TIME       — Dinamik okuma süresi
 *  15. NEXT / PREV POST   — Yazılar arası navigasyon
 *  16. KEYBOARD NAV       — Arama ok tuşu navigasyonu
 *  17. PAGE TRANSITIONS   — Sayfa geçiş animasyonu
 *  18. ANNOUNCEMENT BAR   — Üst duyuru şeridi
 *  19. INIT               — Sayfa tespiti + modül başlatma
 */

/* ════════════════════════════════════════════════════════════════════
   01. CONFIG
   ════════════════════════════════════════════════════════════════════ */
const AHE = {

  SHEETS_URL: 'https://script.google.com/macros/s/BURAYA_KENDİ_URL_İNİ_YAZ/exec',
  SHEETS_ENABLED: false,

  TWITTER_HANDLE: 'ahmethaktaneker',

  ANNOUNCEMENT: '',

  POSTS: [
    { slug: 'anayasa-mahkemesi-mesruiyet',  title: "Anayasa Mahkemesi'nin İşlevi ve Meşruiyet Krizi",       cat: 'anayasa',       label: 'Anayasa',              date: '15 Ocak 2025',    year: 2025, readTime: '8 dk',  featured: true,
      thumb: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80' },
    { slug: 'genclik-siyasetten-kopus',     title: "Gençliğin Siyasetten Kopuşu: Bir Kriz mi, Fırsat mı?", cat: 'genclik',       label: 'Gençlik & Sivil T.',   date: '28 Aralık 2024',  year: 2024, readTime: '6 dk',  featured: true,
      thumb: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80' },
    { slug: 'ifade-ozgurlugu-sinir',        title: 'İfade Özgürlüğü: Sınır Nerede Çizilmeli?',             cat: 'anayasa',       label: 'Anayasa',              date: '10 Aralık 2024',  year: 2024, readTime: '9 dk',
      thumb: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80' },
    { slug: 'populizmin-anatomisi',         title: 'Populizmin Anatomisi: Siyaset Bilimi Perspektifinden',  cat: 'dunya',         label: 'Dünya Siyaseti',       date: '2 Aralık 2024',   year: 2024, readTime: '10 dk',
      thumb: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&q=80' },
    { slug: 'secim-sistemi-reformu',        title: 'Seçim Sistemi Reformu: Temsil mi, İstikrar mı?',       cat: 'turk-siyaseti', label: 'Türk Siyaseti',        date: '18 Kasım 2024',   year: 2024, readTime: '12 dk',
      thumb: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=600&q=80' },
    { slug: 'sivil-toplum-guclendirilmesi', title: 'Sivil Toplumun Güçlendirilmesi: Orta Sınıfın Rolü',    cat: 'genclik',       label: 'Gençlik & Sivil T.',   date: '5 Kasım 2024',    year: 2024, readTime: '7 dk',
      thumb: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80' },
  ],

  PARTICLE_COUNT: 28,
  PARTICLE_OPACITY_MAX: 0.45,

  FEATURES: {
    particles:       true,
    thumbnails:      true,
    glassmorphism:   true,
    readingMode:     true,
    cookieBanner:    true,
    toc:             true,
    shareSidebar:    true,
    likes:           true,
    readingComplete: true,
    bookmarks:       true,
    yearFilters:     true,
    dynamicReadTime: true,
    nextPrev:        true,
    keyboardNav:     true,
    pageTransitions: true,
    announcement:    true,
  },
};

/* ════════════════════════════════════════════════════════════════════
   YARDIMCI — Sayfa tespiti
   ════════════════════════════════════════════════════════════════════ */
const PAGE = {
  isHome: () => {
    const p = window.location.pathname;
    return p === '/' || p === '/index.html' || (!p.includes('/yazilar/') && (p.endsWith('/') || p.endsWith('index.html')));
  },
  isArchive: () => {
    const p = window.location.pathname;
    if (!p.includes('/yazilar/')) return false;
    const after = p.split('/yazilar/')[1] || '';
    return after === '' || after === 'index.html';
  },
  isPost: () => {
    const p = window.location.pathname;
    if (!p.includes('/yazilar/')) return false;
    const after = p.split('/yazilar/')[1] || '';
    return after !== '' && after !== 'index.html';
  },
  currentSlug: () => {
    const parts = window.location.pathname.split('/').filter(Boolean);
    const last = parts[parts.length - 1];
    return (last && last !== 'index.html') ? last : parts[parts.length - 2] || '';
  },
};


/* ════════════════════════════════════════════════════════════════════
   02. PARTICLES
   ════════════════════════════════════════════════════════════════════ */
function initParticles() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'ahe-particles';
  canvas.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:1;opacity:0.6';
  hero.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let W, H, particles = [], raf;
  const ACCENT = [201, 169, 110];

  function resize() {
    W = canvas.width  = hero.offsetWidth;
    H = canvas.height = hero.offsetHeight;
  }

  function createParticle() {
    return {
      x:    Math.random() * W,
      y:    Math.random() * H,
      r:    Math.random() * 1.8 + 0.4,
      vx:   (Math.random() - 0.5) * 0.18,
      vy:   (Math.random() - 0.5) * 0.12,
      a:    Math.random() * AHE.PARTICLE_OPACITY_MAX,
      da:   (Math.random() - 0.5) * 0.003,
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: AHE.PARTICLE_COUNT }, createParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x  += p.vx;
      p.y  += p.vy;
      p.a  += p.da;

      if (p.a <= 0 || p.a >= AHE.PARTICLE_OPACITY_MAX) p.da *= -1;
      p.a = Math.max(0, Math.min(AHE.PARTICLE_OPACITY_MAX, p.a));

      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10;
      if (p.y > H + 10) p.y = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${ACCENT[0]},${ACCENT[1]},${ACCENT[2]},${p.a})`;
      ctx.fill();
    });
    raf = requestAnimationFrame(draw);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(raf);
    else draw();
  });

  window.addEventListener('resize', () => { resize(); }, { passive: true });

  init();
  draw();
}


/* ════════════════════════════════════════════════════════════════════
   03. THUMBNAILS
   ════════════════════════════════════════════════════════════════════ */
function injectThumbnailStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .post-card {
      padding: 0 !important;
      overflow: hidden;
    }
    .post-thumb {
      width: 100%;
      aspect-ratio: 16/9;
      overflow: hidden;
      position: relative;
      background: var(--bg3);
      flex-shrink: 0;
    }
    .post-thumb img {
      width: 100%; height: 100%;
      object-fit: cover;
      transition: transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94),
                  filter 0.55s ease;
      filter: brightness(0.88) saturate(0.9);
    }
    .post-card:hover .post-thumb img {
      transform: scale(1.06);
      filter: brightness(0.95) saturate(1.05);
    }
    .post-thumb-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(to bottom, transparent 40%, var(--card-bg) 100%);
      pointer-events: none;
    }
    .post-card-inner {
      padding: 1.2rem 1.5rem 1.5rem;
      flex: 1; display: flex; flex-direction: column;
    }
    .featured-main {
      padding: 0 !important;
      flex-direction: column !important;
    }
    .featured-thumb {
      width: 100%; height: 220px; overflow: hidden;
      position: relative; background: var(--bg3);
      flex-shrink: 0;
    }
    .featured-thumb img {
      width: 100%; height: 100%; object-fit: cover;
      transition: transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94);
      filter: brightness(0.8) saturate(0.85);
    }
    .featured-main:hover .featured-thumb img { transform: scale(1.04); }
    .featured-main-inner { padding: 1.75rem 2rem 2rem; flex: 1; display: flex; flex-direction: column; justify-content: space-between; }
    .post-bookmarked-badge {
      position: absolute; top: 0.6rem; right: 0.6rem; z-index: 2;
      background: var(--accent); color: var(--bg);
      font-size: 0.65rem; padding: 0.15rem 0.4rem;
      border-radius: 2px; font-family: 'JetBrains Mono', monospace;
      letter-spacing: 0.08em;
    }
  `;
  document.head.appendChild(style);
}

function upgradeFeaturedCards() {
  const cards = document.querySelectorAll('.featured-main[href]');
  cards.forEach(card => {
    const slug = card.getAttribute('href').replace('yazilar/','').replace('/','');
    const post = AHE.POSTS.find(p => p.slug === slug);
    if (!post?.thumb) return;

    const oldInner = card.innerHTML;
    card.innerHTML = `
      <div class="featured-thumb">
        <img src="${post.thumb}" alt="${post.title}" loading="lazy" />
      </div>
      <div class="featured-main-inner">${oldInner}</div>
    `;
  });
}

function upgradePostCards() {
  const cards = document.querySelectorAll('.post-card[href]');
  cards.forEach(card => {
    const slug = card.getAttribute('href').replace('yazilar/','').replace(/\//g,'');
    const post = AHE.POSTS.find(p => p.slug === slug);
    if (!post?.thumb) return;

    const isBookmarked = getBookmarks().includes(post.slug);
    const oldInner = card.innerHTML;
    card.innerHTML = `
      <div class="post-thumb" style="position:relative">
        <img src="${post.thumb}" alt="${post.title}" loading="lazy" />
        <div class="post-thumb-overlay"></div>
        ${isBookmarked ? '<span class="post-bookmarked-badge">📌</span>' : ''}
      </div>
      <div class="post-card-inner">${oldInner}</div>
    `;
  });
}


/* ════════════════════════════════════════════════════════════════════
   04. GLASSMORPHISM
   ════════════════════════════════════════════════════════════════════ */
function injectGlassmorphism() {
  const style = document.createElement('style');
  style.textContent = `
    [data-theme="dark"] .nav {
      background: rgba(11,13,19,0.72) !important;
      backdrop-filter: blur(28px) saturate(1.6) !important;
      -webkit-backdrop-filter: blur(28px) saturate(1.6) !important;
    }
    [data-theme="dark"] .search-box input {
      background: rgba(18,21,30,0.85) !important;
      backdrop-filter: blur(20px);
    }
    [data-theme="dark"] .post-card,
    [data-theme="dark"] .featured-main,
    [data-theme="dark"] .featured-side-item {
      background: rgba(18,21,30,0.75) !important;
      backdrop-filter: blur(8px);
    }
    [data-theme="dark"] .post-card:hover,
    [data-theme="dark"] .featured-main:hover,
    [data-theme="dark"] .featured-side-item:hover {
      background: rgba(24,28,39,0.88) !important;
    }
    [data-theme="dark"] .mobile-menu {
      background: rgba(18,21,30,0.92) !important;
      backdrop-filter: blur(24px);
    }
    [data-theme="dark"] .post-card:hover,
    [data-theme="dark"] .featured-main:hover {
      box-shadow: 0 0 0 1px rgba(201,169,110,0.12),
                  0 8px 32px rgba(0,0,0,0.4);
    }
  `;
  document.head.appendChild(style);
}


/* ════════════════════════════════════════════════════════════════════
   05. READING MODE
   ════════════════════════════════════════════════════════════════════ */
function initReadingMode() {
  const heroActions = document.querySelector('.hero-actions');
  const isPost = PAGE.isPost();

  const style = document.createElement('style');
  style.textContent = `
    .reading-mode-btn {
      display: inline-flex; align-items: center; gap: 0.5rem;
      padding: 0.7rem 1.4rem;
      border: 1px solid var(--border2); color: var(--text-faint);
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.68rem; letter-spacing: 0.12em; text-transform: uppercase;
      border-radius: 3px; transition: all 0.2s; cursor: pointer; background: transparent;
    }
    .reading-mode-btn:hover { border-color: var(--accent); color: var(--accent); }

    body.reading-mode .nav,
    body.reading-mode footer,
    body.reading-mode .article-footer,
    body.reading-mode .ticker-wrap,
    body.reading-mode .related,
    body.reading-mode .article-share,
    body.reading-mode #ahe-share-sidebar,
    body.reading-mode #back-top {
      display: none !important;
    }
    body.reading-mode .article-body,
    body.reading-mode .pullout-body {
      font-size: 1.28rem !important;
      line-height: 2.05 !important;
      max-width: 640px;
      margin-left: auto; margin-right: auto;
    }
    body.reading-mode .article-wrap {
      padding-top: 3rem !important;
    }
    body.reading-mode .modal-nav { display: none !important; }
    #reading-mode-exit {
      display: none;
      position: fixed; top: 1.25rem; right: 1.25rem; z-index: 9999;
      background: var(--accent); color: var(--bg);
      font-family: 'JetBrains Mono', monospace; font-size: 0.65rem;
      letter-spacing: 0.12em; text-transform: uppercase;
      padding: 0.45rem 0.9rem; border-radius: 3px; cursor: pointer;
      border: none;
    }
    body.reading-mode #reading-mode-exit { display: block; }
  `;
  document.head.appendChild(style);

  const exitBtn = document.createElement('button');
  exitBtn.id = 'reading-mode-exit';
  exitBtn.textContent = '✕ Çıkış';
  exitBtn.onclick = () => document.body.classList.remove('reading-mode');
  document.body.appendChild(exitBtn);

  document.addEventListener('keydown', e => {
    if (e.key === 'r' && !e.ctrlKey && !e.metaKey && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) {
      document.body.classList.toggle('reading-mode');
    }
  });

  if (heroActions) {
    const btn = document.createElement('button');
    btn.className = 'reading-mode-btn';
    btn.innerHTML = '☰ Okuma Modu';
    btn.onclick = () => {
      document.body.classList.toggle('reading-mode');
      const first = document.querySelector('#yazilar, .article-wrap, main');
      if (first) window.scrollTo({ top: first.offsetTop - 20, behavior: 'smooth' });
    };
    heroActions.appendChild(btn);
  }

  if (isPost) {
    const modalNav = document.querySelector('.modal-nav, .nav');
    if (modalNav) {
      const btn = document.createElement('button');
      btn.className = 'reading-mode-btn';
      btn.style.cssText = 'font-size:0.6rem;padding:0.35rem 0.8rem';
      btn.innerHTML = '☰ Odak';
      btn.title = 'Okuma Modu (R)';
      btn.onclick = () => document.body.classList.toggle('reading-mode');
      modalNav.querySelector('.nav-right, div')?.appendChild(btn);
    }
  }
}


/* ════════════════════════════════════════════════════════════════════
   06. COOKIE BANNER
   ════════════════════════════════════════════════════════════════════ */
function initCookieBanner() {
  if (localStorage.getItem('ahe_cookies_accepted')) return;

  const style = document.createElement('style');
  style.textContent = `
    #ahe-cookie {
      position: fixed; bottom: 0; left: 0; right: 0; z-index: 9998;
      background: var(--bg2); border-top: 1px solid var(--border);
      padding: 1rem clamp(1.5rem, 5vw, 3rem);
      display: flex; align-items: center; justify-content: space-between;
      gap: 1rem; flex-wrap: wrap;
      transform: translateY(100%);
      transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      backdrop-filter: blur(20px);
    }
    #ahe-cookie.visible { transform: translateY(0); }
    #ahe-cookie-text {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.65rem; letter-spacing: 0.06em;
      color: var(--text-muted); max-width: 680px; line-height: 1.6;
    }
    #ahe-cookie-text a { color: var(--accent); border-bottom: 1px solid rgba(201,169,110,0.3); }
    #ahe-cookie-btns { display: flex; gap: 0.5rem; flex-shrink: 0; }
    .ahe-cookie-btn {
      font-family: 'JetBrains Mono', monospace; font-size: 0.62rem;
      letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer;
      padding: 0.45rem 1rem; border-radius: 3px; border: 1px solid; transition: all 0.18s;
    }
    .ahe-cookie-accept { background: var(--accent); color: var(--bg); border-color: var(--accent); }
    .ahe-cookie-accept:hover { background: #d4b87a; }
    .ahe-cookie-decline { background: transparent; color: var(--text-muted); border-color: var(--border); }
    .ahe-cookie-decline:hover { border-color: var(--text-muted); }
  `;
  document.head.appendChild(style);

  const banner = document.createElement('div');
  banner.id = 'ahe-cookie';
  banner.innerHTML = `
    <div id="ahe-cookie-text">
      🍪 Bu site, deneyiminizi iyileştirmek için çerezler kullanmaktadır.
      Siteyi kullanmaya devam ederek
      <a href="/kvkk.html">KVKK Aydınlatma Metni</a>'ni kabul etmiş sayılırsınız.
    </div>
    <div id="ahe-cookie-btns">
      <button class="ahe-cookie-btn ahe-cookie-decline" id="ahe-cookie-dec">Reddet</button>
      <button class="ahe-cookie-btn ahe-cookie-accept" id="ahe-cookie-acc">Kabul Et</button>
    </div>
  `;
  document.body.appendChild(banner);

  setTimeout(() => banner.classList.add('visible'), 1200);

  function dismiss(accept) {
    banner.classList.remove('visible');
    setTimeout(() => banner.remove(), 400);
    if (accept) localStorage.setItem('ahe_cookies_accepted', '1');
    else localStorage.setItem('ahe_cookies_accepted', 'declined');
  }

  document.getElementById('ahe-cookie-acc').onclick = () => dismiss(true);
  document.getElementById('ahe-cookie-dec').onclick = () => dismiss(false);
}


/* ════════════════════════════════════════════════════════════════════
   07. TABLE OF CONTENTS
   ════════════════════════════════════════════════════════════════════ */
function initTOC() {
  const body = document.querySelector('.article-body');
  if (!body) return;

  const headings = Array.from(body.querySelectorAll('h2, h3'));
  if (headings.length < 2) return;

  headings.forEach((h, i) => {
    if (!h.id) h.id = `baslik-${i + 1}`;
  });

  const style = document.createElement('style');
  style.textContent = `
    #ahe-toc {
      position: fixed; top: 80px; right: 1.5rem; z-index: 80;
      width: 220px; max-height: calc(100vh - 100px); overflow-y: auto;
      background: var(--bg2); border: 1px solid var(--border); border-radius: 6px;
      padding: 1rem; opacity: 0; pointer-events: none;
      transition: opacity 0.3s, transform 0.3s;
      transform: translateX(8px);
    }
    #ahe-toc.visible { opacity: 1; pointer-events: all; transform: translateX(0); }
    #ahe-toc-label {
      font-family: 'JetBrains Mono', monospace; font-size: 0.58rem;
      letter-spacing: 0.18em; text-transform: uppercase;
      color: var(--accent); margin-bottom: 0.75rem;
      display: flex; align-items: center; gap: 0.5rem;
    }
    #ahe-toc-label::before { content:''; display:block; width:14px; height:1px; background:var(--accent); }
    #ahe-toc-list { list-style: none; }
    #ahe-toc-list li { margin-bottom: 0.4rem; }
    #ahe-toc-list a {
      font-family: 'JetBrains Mono', monospace; font-size: 0.62rem;
      letter-spacing: 0.04em; color: var(--text-faint); display: block;
      transition: color 0.18s; line-height: 1.45;
      border-left: 2px solid transparent;
      padding-left: 0.6rem;
    }
    #ahe-toc-list a:hover,
    #ahe-toc-list a.active { color: var(--accent); border-left-color: var(--accent); }
    #ahe-toc-list li.h3-item a { padding-left: 1.4rem; font-size: 0.58rem; }
    #ahe-toc-toggle {
      position: fixed; right: 1.5rem; bottom: 5rem; z-index: 81;
      width: 36px; height: 36px; border-radius: 4px;
      background: var(--bg3); border: 1px solid var(--border);
      display: flex; align-items: center; justify-content: center;
      color: var(--text-muted); cursor: pointer; transition: all 0.2s;
      font-size: 0.75rem;
    }
    #ahe-toc-toggle:hover { border-color: var(--accent); color: var(--accent); }
    @media(max-width:1200px){ #ahe-toc, #ahe-toc-toggle { display: none !important; } }
  `;
  document.head.appendChild(style);

  const toc = document.createElement('nav');
  toc.id = 'ahe-toc';
  toc.setAttribute('aria-label', 'İçindekiler');
  toc.innerHTML = `<div id="ahe-toc-label">İçindekiler</div>
    <ul id="ahe-toc-list">
      ${headings.map(h => `
        <li class="${h.tagName === 'H3' ? 'h3-item' : ''}">
          <a href="#${h.id}">${h.textContent}</a>
        </li>`).join('')}
    </ul>`;
  document.body.appendChild(toc);

  const toggle = document.createElement('button');
  toggle.id = 'ahe-toc-toggle';
  toggle.title = 'İçindekiler';
  toggle.innerHTML = '☰';
  toggle.onclick = () => toc.classList.toggle('visible');
  document.body.appendChild(toggle);

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      const link = toc.querySelector(`a[href="#${e.target.id}"]`);
      if (link) link.classList.toggle('active', e.isIntersecting);
    });
  }, { rootMargin: '-20% 0px -75% 0px' });
  headings.forEach(h => observer.observe(h));
}


/* ════════════════════════════════════════════════════════════════════
   08. SHARE SIDEBAR
   ════════════════════════════════════════════════════════════════════ */
function initShareSidebar() {
  if (!PAGE.isPost()) return;

  const style = document.createElement('style');
  style.textContent = `
    #ahe-share-sidebar {
      position: fixed; left: 1.5rem; top: 50%; transform: translateY(-50%);
      z-index: 80; display: flex; flex-direction: column; gap: 0.5rem;
      opacity: 0; pointer-events: none; transition: opacity 0.3s;
    }
    #ahe-share-sidebar.visible { opacity: 1; pointer-events: all; }
    .ahe-share-btn {
      width: 40px; height: 40px; border-radius: 4px;
      background: var(--bg2); border: 1px solid var(--border);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; transition: all 0.18s;
      font-size: 0.9rem; color: var(--text-muted);
      position: relative;
    }
    .ahe-share-btn:hover { border-color: var(--accent); color: var(--accent); transform: scale(1.08); }
    .ahe-share-btn[data-tooltip]::after {
      content: attr(data-tooltip);
      position: absolute; left: 48px; top: 50%; transform: translateY(-50%);
      background: var(--bg3); border: 1px solid var(--border);
      color: var(--text-muted); font-family: 'JetBrains Mono', monospace;
      font-size: 0.58rem; letter-spacing: 0.08em; white-space: nowrap;
      padding: 0.25rem 0.6rem; border-radius: 3px;
      opacity: 0; pointer-events: none; transition: opacity 0.2s;
    }
    .ahe-share-btn:hover::after { opacity: 1; }
    .ahe-share-sep { height: 1px; background: var(--border); margin: 0.1rem 0; }
    @media(max-width:1100px){ #ahe-share-sidebar { display: none !important; } }
  `;
  document.head.appendChild(style);

  const sidebar = document.createElement('div');
  sidebar.id = 'ahe-share-sidebar';

  const title = encodeURIComponent(document.title);
  const url   = encodeURIComponent(window.location.href);

  sidebar.innerHTML = `
    <a class="ahe-share-btn" data-tooltip="X'te Paylaş"
      href="https://x.com/intent/tweet?text=${title}&url=${url}"
      target="_blank" rel="noopener noreferrer">𝕏</a>
    <a class="ahe-share-btn" data-tooltip="LinkedIn'de Paylaş"
      href="https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}"
      target="_blank" rel="noopener noreferrer">in</a>
    <a class="ahe-share-btn" data-tooltip="WhatsApp'ta Paylaş"
      href="https://wa.me/?text=${title}%20${url}"
      target="_blank" rel="noopener noreferrer">📲</a>
    <div class="ahe-share-sep"></div>
    <button class="ahe-share-btn" id="ahe-copy-link" data-tooltip="Linki Kopyala">🔗</button>
    <button class="ahe-share-btn" id="ahe-bookmark-btn" data-tooltip="Okuma Listesine Ekle">🔖</button>
  `;
  document.body.appendChild(sidebar);

  document.getElementById('ahe-copy-link').onclick = function() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      this.textContent = '✓';
      this.setAttribute('data-tooltip', 'Kopyalandı!');
      setTimeout(() => { this.textContent = '🔗'; this.setAttribute('data-tooltip', 'Linki Kopyala'); }, 2000);
    });
  };

  const bookmarkBtn = document.getElementById('ahe-bookmark-btn');
  const slug = PAGE.currentSlug();
  function updateBookmarkBtn() {
    const saved = getBookmarks().includes(slug);
    bookmarkBtn.textContent = saved ? '✅' : '🔖';
    bookmarkBtn.setAttribute('data-tooltip', saved ? 'Listeden Çıkar' : 'Okuma Listesine Ekle');
  }
  bookmarkBtn.onclick = () => { toggleBookmark(slug); updateBookmarkBtn(); };
  updateBookmarkBtn();

  window.addEventListener('scroll', () => {
    sidebar.classList.toggle('visible', window.scrollY > 300);
  }, { passive: true });
}


/* ════════════════════════════════════════════════════════════════════
   09. LIKE / DISLIKE
   ════════════════════════════════════════════════════════════════════ */
function initLikes() {
  if (!PAGE.isPost()) return;

  const articleWrap = document.querySelector('.article-wrap, .modal-body');
  if (!articleWrap) return;

  const slug = PAGE.currentSlug();
  const storageKey = `ahe_like_${slug}`;
  const existing = localStorage.getItem(storageKey);

  const style = document.createElement('style');
  style.textContent = `
    #ahe-likes {
      display: flex; align-items: center; gap: 1rem;
      padding: 2rem 0 0; margin-top: 2.5rem;
      border-top: 1px solid var(--border);
    }
    #ahe-likes-label {
      font-family: 'JetBrains Mono', monospace; font-size: 0.65rem;
      letter-spacing: 0.14em; text-transform: uppercase; color: var(--text-muted);
    }
    .ahe-like-btn {
      display: inline-flex; align-items: center; gap: 0.4rem;
      padding: 0.45rem 1rem; border-radius: 3px;
      border: 1px solid var(--border); background: transparent;
      font-family: 'JetBrains Mono', monospace; font-size: 0.65rem;
      letter-spacing: 0.08em; color: var(--text-muted);
      cursor: pointer; transition: all 0.18s;
    }
    .ahe-like-btn:hover { border-color: var(--accent); color: var(--accent); }
    .ahe-like-btn.active-up { background: var(--accent); color: var(--bg); border-color: var(--accent); }
    .ahe-like-btn.active-down { background: var(--red); color: #fff; border-color: var(--red); }
    .ahe-like-btn:disabled { opacity: 0.5; cursor: default; }
    #ahe-likes-thanks {
      font-family: 'JetBrains Mono', monospace; font-size: 0.62rem;
      letter-spacing: 0.08em; color: var(--accent);
      display: none;
    }
  `;
  document.head.appendChild(style);

  const box = document.createElement('div');
  box.id = 'ahe-likes';
  box.innerHTML = `
    <span id="ahe-likes-label">Bu yazıyı beğendin mi?</span>
    <button class="ahe-like-btn ${existing === 'up' ? 'active-up' : ''}"
            id="ahe-like-up" ${existing ? 'disabled' : ''}>
      👍 Evet
    </button>
    <button class="ahe-like-btn ${existing === 'down' ? 'active-down' : ''}"
            id="ahe-like-down" ${existing ? 'disabled' : ''}>
      👎 Hayır
    </button>
    <span id="ahe-likes-thanks" ${existing ? 'style="display:inline"' : ''}>
      Teşekkürler! Geri bildiriminiz kaydedildi.
    </span>
  `;
  articleWrap.appendChild(box);

  function vote(type) {
    localStorage.setItem(storageKey, type);
    document.getElementById('ahe-like-up').disabled   = true;
    document.getElementById('ahe-like-down').disabled = true;
    document.getElementById('ahe-like-up').className   = `ahe-like-btn ${type === 'up'   ? 'active-up'   : ''}`;
    document.getElementById('ahe-like-down').className = `ahe-like-btn ${type === 'down' ? 'active-down' : ''}`;
    document.getElementById('ahe-likes-thanks').style.display = 'inline';

    if (AHE.SHEETS_ENABLED && AHE.SHEETS_URL.includes('script.google.com')) {
      const data = new FormData();
      data.append('slug', slug);
      data.append('vote', type);
      data.append('date', new Date().toISOString());
      data.append('title', document.title);
      fetch(AHE.SHEETS_URL, { method: 'POST', body: data })
        .catch(() => {});
    }
  }

  if (!existing) {
    document.getElementById('ahe-like-up').onclick   = () => vote('up');
    document.getElementById('ahe-like-down').onclick = () => vote('down');
  }
}


/* ════════════════════════════════════════════════════════════════════
   10. READING COMPLETE
   ════════════════════════════════════════════════════════════════════ */
function initReadingComplete() {
  if (!PAGE.isPost()) return;

  const style = document.createElement('style');
  style.textContent = `
    #ahe-complete {
      position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%) translateY(20px);
      z-index: 9990; background: var(--bg2); border: 1px solid var(--accent);
      border-radius: 8px; padding: 1rem 2rem;
      display: flex; align-items: center; gap: 1rem;
      box-shadow: 0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,169,110,0.2);
      opacity: 0; pointer-events: none;
      transition: opacity 0.4s, transform 0.4s;
    }
    #ahe-complete.visible { opacity: 1; pointer-events: all; transform: translateX(-50%) translateY(0); }
    #ahe-complete-icon { font-size: 1.5rem; }
    #ahe-complete-title {
      font-family: 'Playfair Display', serif; font-weight: 700;
      color: var(--headline); font-size: 0.95rem; margin-bottom: 0.1rem;
    }
    #ahe-complete-sub {
      font-family: 'JetBrains Mono', monospace; font-size: 0.6rem;
      letter-spacing: 0.1em; color: var(--text-muted);
    }
    #ahe-complete-close {
      font-family: 'JetBrains Mono', monospace; font-size: 0.58rem;
      letter-spacing: 0.1em; color: var(--text-faint);
      cursor: pointer; transition: color 0.2s; border: none; background: none;
      margin-left: 0.5rem;
    }
    #ahe-complete-close:hover { color: var(--accent); }
    @keyframes ahe-sparkle {
      0%   { transform: translateX(-50%) translateY(0) scale(1); }
      10%  { transform: translateX(-50%) translateY(-4px) scale(1.02); }
      20%  { transform: translateX(-50%) translateY(0) scale(1); }
    }
    #ahe-complete.sparkle { animation: ahe-sparkle 0.4s ease; }
  `;
  document.head.appendChild(style);

  const toast = document.createElement('div');
  toast.id = 'ahe-complete';
  toast.innerHTML = `
    <div id="ahe-complete-icon">🎉</div>
    <div id="ahe-complete-text">
      <div id="ahe-complete-title">Bu yazıyı bitirdin!</div>
      <div id="ahe-complete-sub">Diğer yazılara göz atmak ister misin?</div>
    </div>
    <button id="ahe-complete-close">✕</button>
  `;
  document.body.appendChild(toast);
  document.getElementById('ahe-complete-close').onclick = () => toast.classList.remove('visible');

  let shown = false;
  window.addEventListener('scroll', () => {
    if (shown) return;
    const prog = document.getElementById('read-progress');
    const pct = prog ? parseFloat(prog.style.width) : 0;
    if (pct > 90) {
      shown = true;
      toast.classList.add('visible');
      setTimeout(() => toast.classList.add('sparkle'), 50);
      setTimeout(() => toast.classList.remove('sparkle'), 500);
      setTimeout(() => toast.classList.remove('visible'), 5500);
    }
  }, { passive: true });
}


/* ════════════════════════════════════════════════════════════════════
   11. BOOKMARKS
   ════════════════════════════════════════════════════════════════════ */
function getBookmarks() {
  try { return JSON.parse(localStorage.getItem('ahe_bookmarks') || '[]'); }
  catch { return []; }
}
function toggleBookmark(slug) {
  const list = getBookmarks();
  const idx = list.indexOf(slug);
  if (idx === -1) list.push(slug);
  else list.splice(idx, 1);
  localStorage.setItem('ahe_bookmarks', JSON.stringify(list));
}

function initBookmarksWidget() {
  if (!PAGE.isHome()) return;
  const bookmarks = getBookmarks();
  if (!bookmarks.length) return;

  const savedPosts = bookmarks
    .map(slug => AHE.POSTS.find(p => p.slug === slug))
    .filter(Boolean);
  if (!savedPosts.length) return;

  const style = document.createElement('style');
  style.textContent = `
    #ahe-bookmarks-widget {
      max-width: 1400px; margin: 0 auto;
      padding: 0 clamp(1.5rem,5vw,4rem) 2rem;
    }
    .ahe-bm-row {
      display: flex; align-items: center; justify-content: space-between;
      padding: 0.75rem 1rem; border-bottom: 1px solid var(--border);
      transition: background 0.18s; border-radius: 3px;
    }
    .ahe-bm-row:hover { background: var(--bg2); }
    .ahe-bm-title {
      font-family: 'Playfair Display', serif; font-size: 0.95rem;
      color: var(--headline); transition: color 0.18s;
    }
    .ahe-bm-row:hover .ahe-bm-title { color: var(--accent); }
    .ahe-bm-meta {
      font-family: 'JetBrains Mono', monospace; font-size: 0.58rem;
      letter-spacing: 0.08em; color: var(--text-faint);
    }
    .ahe-bm-remove {
      font-size: 0.8rem; color: var(--text-faint); cursor: pointer;
      transition: color 0.18s; background: none; border: none;
    }
    .ahe-bm-remove:hover { color: var(--red); }
  `;
  document.head.appendChild(style);

  const kicker = document.querySelector('.section-kicker');
  const insertBefore = kicker?.closest('.section');
  if (!insertBefore) return;

  const widget = document.createElement('div');
  widget.id = 'ahe-bookmarks-widget';
  widget.innerHTML = `
    <div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:1rem">
      <div style="font-family:'JetBrains Mono',monospace;font-size:.65rem;letter-spacing:.2em;text-transform:uppercase;color:var(--accent);display:flex;align-items:center;gap:.6rem">
        <span style="display:block;width:20px;height:1px;background:var(--accent)"></span>
        Okuma Listem
      </div>
      <span style="font-family:'JetBrains Mono',monospace;font-size:.6rem;color:var(--text-faint)">(${savedPosts.length} yazı)</span>
    </div>
    ${savedPosts.map(p => `
      <div class="ahe-bm-row">
        <a href="/yazilar/${p.slug}/" style="flex:1;text-decoration:none">
          <div class="ahe-bm-title">${p.title}</div>
          <div class="ahe-bm-meta">${p.label} · ${p.readTime}</div>
        </a>
        <button class="ahe-bm-remove" title="Listeden çıkar" onclick="toggleBookmark('${p.slug}');this.closest('.ahe-bm-row').style.display='none'">✕</button>
      </div>`).join('')}
  `;
  insertBefore.parentNode.insertBefore(widget, insertBefore);
}


/* ════════════════════════════════════════════════════════════════════
   12. PRINT STYLES
   ════════════════════════════════════════════════════════════════════ */
function injectPrintStyles() {
  const style = document.createElement('style');
  style.textContent = `
    @media print {
      .nav, footer, .article-footer, .ticker-wrap,
      #ahe-share-sidebar, #ahe-toc, #ahe-toc-toggle,
      #ahe-cookie, #ahe-complete, #ahe-likes,
      #back-top, #page-progress, #read-progress,
      .hero-actions, .article-share, .related,
      #reading-mode-exit, #ahe-announcement,
      .search-overlay, .mobile-menu { display: none !important; }

      body { background: #fff !important; color: #1a1a1a !important; font-size: 12pt; }
      .article-title { font-size: 24pt; color: #1a1a1a !important; }
      .article-body { font-size: 12pt; line-height: 1.8; color: #222 !important; }
      .article-body a { color: #1a1a1a !important; text-decoration: underline; }
      .article-body blockquote { border-left: 3px solid #999; }
      .article-wrap { padding: 0 !important; max-width: 100%; }

      .article-wrap::before {
        content: 'ahmethaktaneker.com';
        display: block; font-family: monospace; font-size: 8pt;
        color: #999; border-bottom: 1px solid #ddd;
        padding-bottom: 0.5rem; margin-bottom: 1rem;
      }
    }
  `;
  document.head.appendChild(style);
}


/* ════════════════════════════════════════════════════════════════════
   13. YEAR FILTERS
   ════════════════════════════════════════════════════════════════════ */
function initYearFilters() {
  if (!PAGE.isArchive()) return;

  const catBar = document.querySelector('.cats-inline, #archiveCats');
  if (!catBar) return;

  const years = [...new Set(AHE.POSTS.map(p => p.year))].sort((a, b) => b - a);
  if (years.length < 2) return;

  const sep = document.createElement('span');
  sep.style.cssText = 'width:1px;height:24px;background:var(--border);margin:0 0.25rem;flex-shrink:0';
  catBar.appendChild(sep);

  years.forEach(year => {
    const btn = document.createElement('button');
    btn.className = 'cat-btn';
    btn.setAttribute('data-year', year);
    btn.textContent = year;
    btn.onclick = function() {
      document.querySelectorAll('[data-year]').forEach(b => b.classList.remove('active'));
      const alreadyActive = this.classList.contains('active');
      if (!alreadyActive) {
        this.classList.add('active');
        window._ahe_year_filter = year;
      } else {
        window._ahe_year_filter = null;
      }
      if (typeof filterArchive === 'function') filterArchive();
    };
    catBar.appendChild(btn);
  });

  if (typeof filterArchive === 'function') {
    const original = window.filterArchive;
    window.filterArchive = function() {
      original();
      const year = window._ahe_year_filter;
      if (!year) return;
      document.querySelectorAll('.post-row, .ahe-post-row').forEach(row => {
        const postYear = row.getAttribute('data-year');
        if (postYear && parseInt(postYear) !== year) {
          row.style.display = 'none';
        }
      });
    };
  }
}


/* ════════════════════════════════════════════════════════════════════
   14. DYNAMIC READING TIME
   ════════════════════════════════════════════════════════════════════ */
function initDynamicReadTime() {
  if (!PAGE.isPost()) return;
  const body = document.querySelector('.article-body');
  if (!body) return;

  const words = body.innerText.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));

  document.querySelectorAll('.article-meta span, #readTime').forEach(el => {
    if (el.textContent.includes('dk')) {
      el.textContent = `${minutes} dk okuma`;
    }
  });

  const metaEl = document.querySelector('.article-meta');
  if (metaEl) {
    const dot = document.createElement('span');
    dot.style.cssText = 'width:2px;height:2px;background:var(--text-faint);border-radius:50%;display:inline-block';
    const wordEl = document.createElement('span');
    wordEl.style.cssText = 'color:var(--text-faint);font-family:"JetBrains Mono",monospace;font-size:.6rem';
    wordEl.textContent = `~${words} kelime`;
    metaEl.appendChild(dot);
    metaEl.appendChild(wordEl);
  }
}


/* ════════════════════════════════════════════════════════════════════
   15. NEXT / PREV POST
   ════════════════════════════════════════════════════════════════════ */
function initNextPrev() {
  if (!PAGE.isPost()) return;
  const slug = PAGE.currentSlug();
  const idx  = AHE.POSTS.findIndex(p => p.slug === slug);
  if (idx === -1) return;

  const prev = AHE.POSTS[idx + 1];
  const next = AHE.POSTS[idx - 1];

  if (!prev && !next) return;

  const style = document.createElement('style');
  style.textContent = `
    #ahe-nextprev {
      display: grid;
      grid-template-columns: ${prev && next ? '1fr 1fr' : '1fr'};
      gap: 1px; background: var(--border);
      border: 1px solid var(--border);
      margin-top: 3rem; border-radius: 4px; overflow: hidden;
    }
    .ahe-np-card {
      background: var(--card-bg); padding: 1.5rem 1.75rem;
      display: flex; flex-direction: column; gap: 0.5rem;
      transition: background 0.18s; text-decoration: none;
    }
    .ahe-np-card:hover { background: var(--card-hover); }
    .ahe-np-dir {
      font-family: 'JetBrains Mono', monospace; font-size: 0.6rem;
      letter-spacing: 0.14em; text-transform: uppercase;
      color: var(--text-faint); display: flex; align-items: center; gap: 0.4rem;
    }
    .ahe-np-card.next .ahe-np-dir { justify-content: flex-end; text-align: right; }
    .ahe-np-title {
      font-family: 'Playfair Display', serif; font-size: 1rem;
      font-weight: 700; color: var(--headline); line-height: 1.3;
      transition: color 0.18s;
    }
    .ahe-np-card.next .ahe-np-title { text-align: right; }
    .ahe-np-card:hover .ahe-np-title { color: var(--accent); }
    .ahe-np-cat {
      display: inline-block; padding: .15rem .5rem;
      background: var(--tag-bg); color: var(--tag-text);
      font-family: 'JetBrains Mono', monospace; font-size: .55rem;
      letter-spacing: .1em; text-transform: uppercase; border-radius: 2px;
    }
    .ahe-np-card.next { text-align: right; }
  `;
  document.head.appendChild(style);

  const wrap = document.createElement('nav');
  wrap.id = 'ahe-nextprev';
  wrap.setAttribute('aria-label', 'Yazılar arası navigasyon');

  if (prev) wrap.innerHTML += `
    <a class="ahe-np-card prev" href="/yazilar/${prev.slug}/">
      <div class="ahe-np-dir">← Önceki Yazı</div>
      <div class="ahe-np-title">${prev.title}</div>
      <span class="ahe-np-cat">${prev.label}</span>
    </a>`;

  if (next) wrap.innerHTML += `
    <a class="ahe-np-card next" href="/yazilar/${next.slug}/">
      <div class="ahe-np-dir">Sonraki Yazı →</div>
      <div class="ahe-np-title">${next.title}</div>
      <span class="ahe-np-cat">${next.label}</span>
    </a>`;

  const articleWrap = document.querySelector('.article-wrap');
  const related = document.getElementById('relatedGrid')?.closest('.related');
  if (related) related.before(wrap);
  else articleWrap?.appendChild(wrap);
}


/* ════════════════════════════════════════════════════════════════════
   16. KEYBOARD NAV
   ════════════════════════════════════════════════════════════════════ */
function initKeyboardNav() {
  let focusIdx = -1;

  document.addEventListener('keydown', e => {
    const overlay = document.getElementById('searchOverlay');
    if (!overlay?.classList.contains('open')) return;

    const items = Array.from(document.querySelectorAll('.search-result-item[href], .search-result-item'));
    if (!items.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      focusIdx = Math.min(focusIdx + 1, items.length - 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      focusIdx = Math.max(focusIdx - 1, 0);
    } else if (e.key === 'Enter' && focusIdx >= 0) {
      e.preventDefault();
      const item = items[focusIdx];
      if (item.href) window.location.href = item.href;
      else item.click();
      return;
    } else {
      focusIdx = -1;
      items.forEach(i => i.classList.remove('kb-focused'));
      return;
    }

    items.forEach((i, idx) => {
      i.classList.toggle('kb-focused', idx === focusIdx);
      if (idx === focusIdx) i.scrollIntoView({ block: 'nearest' });
    });
  });

  const style = document.createElement('style');
  style.textContent = `
    .search-result-item.kb-focused {
      border-color: var(--accent) !important;
      background: var(--bg3) !important;
    }
  `;
  document.head.appendChild(style);
}


/* ════════════════════════════════════════════════════════════════════
   17. PAGE TRANSITIONS
   ════════════════════════════════════════════════════════════════════ */
function initPageTransitions() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ahe-fade-in {
      from { opacity: 0; transform: translateY(6px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    body.ahe-ready {
      animation: ahe-fade-in 0.3s ease both;
    }
    .ahe-exit {
      opacity: 0 !important;
      transform: translateY(-4px) !important;
      transition: opacity 0.18s ease, transform 0.18s ease !important;
    }
  `;
  document.head.appendChild(style);

  /* Sadece tam sayfa yüklendikten sonra animasyonu tetikle */
  requestAnimationFrame(() => {
    document.body.classList.add('ahe-ready');
  });

  document.addEventListener('click', e => {
    const link = e.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href');
    /* Sadece gerçek navigasyon linklerini yakala - onclick olan linklere dokunma */
    if (!href || href.startsWith('#') || href.startsWith('http') ||
        href.startsWith('mailto') || href.startsWith('javascript') ||
        link.target === '_blank' || link.hasAttribute('onclick') ||
        e.target.hasAttribute('onclick')) return;

    e.preventDefault();
    document.body.classList.add('ahe-exit');
    setTimeout(() => { window.location.href = href; }, 200);
  });
}


/* ════════════════════════════════════════════════════════════════════
   18. ANNOUNCEMENT BAR
   ════════════════════════════════════════════════════════════════════ */
function initAnnouncement() {
  if (!AHE.ANNOUNCEMENT) return;
  const dismissed = sessionStorage.getItem('ahe_announcement_dismissed');
  if (dismissed) return;

  const style = document.createElement('style');
  style.textContent = `
    #ahe-announcement {
      position: fixed; top: 0; left: 0; right: 0; z-index: 200;
      background: var(--accent); color: var(--bg);
      padding: 0.4rem 3rem 0.4rem 1.5rem;
      font-family: 'JetBrains Mono', monospace; font-size: 0.65rem;
      letter-spacing: 0.08em; text-align: center;
      line-height: 1.5;
    }
    #ahe-announcement a { color: var(--bg); text-decoration: underline; }
    #ahe-announcement-close {
      position: absolute; right: 1rem; top: 50%; transform: translateY(-50%);
      background: none; border: none; color: var(--bg);
      cursor: pointer; font-size: 1rem; opacity: 0.7;
    }
    #ahe-announcement ~ .nav { top: calc(var(--ann-h, 32px)) !important; }
    body:has(#ahe-announcement) .mobile-menu { top: calc(64px + var(--ann-h, 32px)) !important; }
  `;
  document.head.appendChild(style);

  const bar = document.createElement('div');
  bar.id = 'ahe-announcement';
  bar.innerHTML = `${AHE.ANNOUNCEMENT}<button id="ahe-announcement-close" aria-label="Kapat">✕</button>`;
  document.body.prepend(bar);

  const h = bar.offsetHeight;
  document.documentElement.style.setProperty('--ann-h', h + 'px');

  document.getElementById('ahe-announcement-close').onclick = () => {
    bar.remove();
    document.documentElement.style.removeProperty('--ann-h');
    sessionStorage.setItem('ahe_announcement_dismissed', '1');
  };
}


/* ════════════════════════════════════════════════════════════════════
   19. INIT
   ════════════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  const f = AHE.FEATURES;

  if (f.glassmorphism)   injectGlassmorphism();
  if (f.cookieBanner)    initCookieBanner();
  if (f.pageTransitions) initPageTransitions();
  if (f.keyboardNav)     initKeyboardNav();
  if (f.announcement)    initAnnouncement();
                         injectPrintStyles();

  if (PAGE.isHome()) {
    if (f.particles)    initParticles();
    if (f.readingMode)  initReadingMode();
    if (f.thumbnails) {
      injectThumbnailStyles();
      const observer = new MutationObserver(() => {
        upgradeFeaturedCards();
        upgradePostCards();
      });
      const grids = document.querySelector('#featuredGrid, #postsGrid');
      if (grids) observer.observe(grids.parentElement, { childList: true, subtree: true });
      setTimeout(() => { upgradeFeaturedCards(); upgradePostCards(); }, 100);
    }
    if (f.bookmarks) initBookmarksWidget();
  }

  if (PAGE.isArchive()) {
    if (f.yearFilters) initYearFilters();
  }

  if (PAGE.isPost()) {
    if (f.toc)             initTOC();
    if (f.shareSidebar)    initShareSidebar();
    if (f.likes)           initLikes();
    if (f.readingComplete) initReadingComplete();
    if (f.nextPrev)        initNextPrev();
    if (f.dynamicReadTime) initDynamicReadTime();
    if (f.readingMode)     initReadingMode();
  }
});
