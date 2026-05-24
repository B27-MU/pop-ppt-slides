// =============================================================
// POP UPI — Motion Design site (single-file React app)
// =============================================================
const { useEffect, useRef, useState, useLayoutEffect } = React;

// ---------- shared assets ----------
const COIN = 'assets/popcoin-icon.svg';
const CARD = 'assets/pop-credit-card.svg';
const LOGO_DARK_BG = 'assets/pop-logo.png';

// ---------- IntersectionObserver hook for .reveal ----------
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

// ---------- count-up hook (only fires when .in becomes true) ----------
function useCountUp(ref, target, opts = {}) {
  const { duration = 1400, prefix = '', suffix = '', decimals = 0 } = opts;
  useEffect(() => {
    if (!ref.current) return;
    const node = ref.current;
    const fmt = (v) => `${prefix}${decimals ? v.toFixed(decimals) : Math.round(v)}${suffix}`;
    node.textContent = fmt(0);
    let raf;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const start = performance.now();
            const tick = (now) => {
              const t = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - t, 3);
              node.textContent = fmt(target * eased);
              if (t < 1) raf = requestAnimationFrame(tick);
            };
            raf = requestAnimationFrame(tick);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.5 }
    );
    io.observe(node);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [ref, target, duration, prefix, suffix, decimals]);
}

// ---------- POPcoin glyph ----------
function PopCoin({ size = 24, style = {} }) {
  return <img src={COIN} width={size} height={size} alt="" style={{ display: 'inline-block', verticalAlign: 'middle', ...style }} />;
}

// =============================================================
// SCROLL PROGRESS + CURSOR
// =============================================================
function GlobalChrome() {
  const dotRef = useRef(null);
  const progRef = useRef(null);

  useEffect(() => {
    let raf, tx = 0, ty = 0, x = 0, y = 0;
    const onMove = (e) => { tx = e.clientX; ty = e.clientY; };
    const onOver = (e) => {
      if (e.target.closest('a, button, .letter, .brand-card, .card-tilt, .promo-card-img')) {
        dotRef.current?.classList.add('hot');
      }
    };
    const onOut = (e) => {
      if (e.target.closest('a, button, .letter, .brand-card, .card-tilt, .promo-card-img')) {
        dotRef.current?.classList.remove('hot');
      }
    };
    const loop = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      if (dotRef.current) dotRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    window.addEventListener('mouseout', onOut);
    loop();
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mouseout', onOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop) / (h.scrollHeight - h.clientHeight);
      if (progRef.current) progRef.current.style.width = `${Math.min(100, pct * 100)}%`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div ref={progRef} className="scroll-progress"></div>
      <div ref={dotRef} className="cursor-dot"></div>
    </>
  );
}

// =============================================================
// NAV
// =============================================================
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const links = ['POP UPI', 'POPshop', 'Credit Card', 'Brands', 'Blog'];
  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-row">
        <a href="#" aria-label="POP" style={{ display: 'inline-flex', alignItems: 'center' }}>
          <img src={LOGO_DARK_BG} alt="pop" style={{ height: 30, width: 'auto', filter: 'invert(1) hue-rotate(180deg) saturate(0)' }} />
        </a>
        <div className="nav-links">
          {links.map((l) => (
            <a key={l} href="#" className="nav-link">{l}</a>
          ))}
        </div>
        <a href="#download" className="btn-cta brand sm btn-pulse">Download App</a>
      </div>
    </nav>
  );
}

// =============================================================
// TOP PROMO
// =============================================================
function TopPromo() {
  return (
    <section className="top-promo">
      <div className="promo-row">
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, flex: '1 1 360px' }}>
          <img src={CARD} className="promo-card-img" alt="POP-CLUB Credit Card" />
          <div>
            <div style={{ fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--pop-ink-500)' }}>Say hello to</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 22, lineHeight: 1.1 }}>YES BANK POP-CLUB Credit Card</div>
            <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 500, color: 'var(--pop-orange-700)', marginTop: 2, fontSize: 14 }}>
              The G.O.A.T. of all credit cards
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, flex: '1 1 360px', justifyContent: 'center' }}>
          <div className="benefit">Earn <PopCoin size={20} /> <strong>10</strong> on every ₹100 spent online</div>
          <div className="promo-divider"></div>
          <div className="benefit"><strong>Zero</strong><br />Joining Fee</div>
          <div className="promo-divider"></div>
          <div className="benefit"><strong>₹2k</strong><br />Joining Benefits</div>
        </div>
        <a href="#apply" className="btn-cta ink">Apply Now</a>
      </div>
    </section>
  );
}

// =============================================================
// HERO
// =============================================================
function Hero() {
  const letters = ['P', 'O', 'P', 'U', 'P', 'I'];
  const coinRef = useRef(null);

  // gentle parallax on hero coin from mouse position
  useEffect(() => {
    const onMove = (e) => {
      if (!coinRef.current) return;
      const r = coinRef.current.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / window.innerWidth;
      const dy = (e.clientY - cy) / window.innerHeight;
      coinRef.current.style.setProperty('--mx', `${dx * 16}px`);
      coinRef.current.style.setProperty('--my', `${dy * 16}px`);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section className="hero">
      <div className="hero-bg" aria-hidden></div>
      <div className="hero-grid container">
        <div>
          <div className="eyebrow reveal" data-d="1">Pay with</div>
          <div className="letter-grid" aria-label="POP UPI">
            {letters.map((l, i) => (
              <span
                key={i}
                className={`letter ${i === 1 || i === 4 ? 'is-orange' : ''}`}
                style={{ animationDelay: `${120 + i * 110}ms` }}
              >{l}</span>
            ))}
          </div>
          <p className="hero-tagline reveal" data-d="3">UPI payments made refreshing</p>
          <div className="reveal" data-d="4">
            <a href="#download" className="btn-cta ink lg btn-pulse">Download the App</a>
          </div>
        </div>

        <div className="coin-stage">
          <div ref={coinRef} style={{ position: 'relative', transform: 'translate(var(--mx, 0), var(--my, 0))', transition: 'transform 300ms var(--ease-out)' }}>
            <img src={COIN} className="coin-hero" alt="POPcoin" />
            <img src={COIN} className="coin-orbit" alt="" aria-hidden />
            <img src={COIN} className="coin-orbit b" alt="" aria-hidden />
          </div>
          <div className="coin-eq reveal reveal-scale" data-d="5">
            <PopCoin size={28} /><strong>1 POPcoin</strong><span className="eq">=</span><strong>₹1</strong>
          </div>
          <span className="coin-ps reveal" data-d="6">PS: It's that simple.</span>
        </div>
      </div>
    </section>
  );
}

// =============================================================
// REWARD BANNER
// =============================================================
function RewardBanner() {
  const sectionRef = useRef(null);
  const pctRef = useRef(null);

  // when the section enters viewport, toggle .in on the section itself
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          node.classList.add('in');
          io.disconnect();
        }
      }
    }, { threshold: 0.35 });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useCountUp(pctRef, 2, { suffix: '%', duration: 1100 });

  return (
    <section className="reward" ref={sectionRef}>
      <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
        <div className="eyebrow reveal" style={{ color: 'rgba(255,255,255,0.78)' }}>Designed to reward you</div>
        <h2 className="reveal reveal-rise" data-d="2">
          <span className="pct" ref={pctRef}>0%</span> POPcoins on every UPI transaction <br />
          <span className="every">every. single. time.</span>
        </h2>
        <div className="coin-row">
          <img src={COIN} alt="" />
          <img src={COIN} alt="" />
          <img src={COIN} alt="" />
        </div>
      </div>
    </section>
  );
}

// =============================================================
// POPSHOP SECTION
// =============================================================
function PopShopSection() {
  const countRef = useRef(null);
  useCountUp(countRef, 500, { suffix: '+', duration: 1400 });

  return (
    <section className="popshop">
      <div className="wash-l" aria-hidden></div>
      <div className="wash-r" aria-hidden></div>
      <div className="container" style={{ position: 'relative' }}>
        <div className="eyebrow reveal">POPshop</div>
        <h2 className="reveal reveal-rise" data-d="2">Indulge your inner shopaholic!</h2>
        <div className="sub reveal" data-d="3">Explore India's finest new-age brands at POPshop</div>
        <p className="body-copy reveal" data-d="4">
          Discover over <strong ref={countRef}>500+</strong> <strong>purpose-driven D2C brands</strong> we've carefully curated just for you. Plus, here's the exciting part — you can pay using <strong>POPcoins</strong> to unlock fantastic benefits across all these brands!
        </p>

        <div className="happy-block reveal reveal-scale" data-d="5">
          to the <span className="happy-em">happy shopper</span>
          <br />
          <span className="happy-em b">happy shopper</span> in you
        </div>
      </div>
    </section>
  );
}

// =============================================================
// BRAND SLIDER (marquee)
// =============================================================
const BRAND_NAMES = [
  'cult.fit', 'PharmEasy', 'zomato', 'cleartrip', 'rapido', 'blinkit',
  'Swiggy', 'Myntra', 'Nykaa', 'BookMyShow', 'Tata 1mg', 'Urban Company',
  'boAt', 'Lenskart', 'CRED', 'mamaearth', 'Licious', 'Noise',
];
const ACCENTS = ['var(--pop-orange-500)', 'var(--pop-ink-900)', 'var(--pop-navy-700)', 'var(--pop-gold-600)'];

function BrandCard({ name, accent }) {
  return <div className="brand-card" style={{ color: accent }}>{name}</div>;
}

function BrandSlider() {
  const all = [...BRAND_NAMES, ...BRAND_NAMES];
  return (
    <section className="brand-slider" aria-label="Partner brands">
      <div className="brand-track">
        {all.map((n, i) => <BrandCard key={i} name={n} accent={ACCENTS[i % ACCENTS.length]} />)}
      </div>
    </section>
  );
}

// =============================================================
// PARTNERS
// =============================================================
function PartnersSection() {
  const countRef = useRef(null);
  useCountUp(countRef, 250, { suffix: '+', duration: 1400 });
  return (
    <section className="partners">
      <div className="partners-grid">
        <div>
          <span className="tag reveal">POPcoins × Brand Partners</span>
          <h2 className="reveal reveal-left" data-d="2">A match made in <span className="heaven">heaven</span></h2>
          <p className="reveal" data-d="3" style={{ fontSize: 18, lineHeight: 1.65, color: 'var(--pop-ink-700)', margin: '0 0 28px', maxWidth: 520 }}>
            Earn POPcoins when you shop from over <strong ref={countRef}>250+</strong> <strong>brand partner websites</strong> integrated with POPcoins loyalty and unlock discounts, exclusive perks, and more!
          </p>
          <a href="#brands" className="btn-cta ink reveal" data-d="4">View All Brands</a>
        </div>
        <div className="partners-cards reveal reveal-right" data-d="2">
          {BRAND_NAMES.slice(0, 9).map((n, i) => (
            <BrandCard key={i} name={n} accent={ACCENTS[i % 3]} />
          ))}
        </div>
      </div>
    </section>
  );
}

// =============================================================
// FINAL CTA — credit card with 3D tilt
// =============================================================
function FinalCTA() {
  const cardRef = useRef(null);
  useEffect(() => {
    const stage = cardRef.current?.parentElement;
    if (!stage) return;
    const onMove = (e) => {
      const r = stage.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / r.width;
      const dy = (e.clientY - cy) / r.height;
      const rx = 34 - dy * 10;   // base 34deg
      const ry = -3 + dx * 14;
      if (cardRef.current) {
        cardRef.current.style.transform = `perspective(900px) rotateX(${rx}deg) rotateZ(${ry}deg) translateY(${-dy * 12}px)`;
      }
    };
    const onLeave = () => {
      if (cardRef.current) cardRef.current.style.transform = `perspective(900px) rotateX(34deg) rotateZ(-3deg)`;
    };
    stage.addEventListener('mousemove', onMove);
    stage.addEventListener('mouseleave', onLeave);
    return () => {
      stage.removeEventListener('mousemove', onMove);
      stage.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <section className="final-cta" id="apply">
      <div className="final-glow" aria-hidden></div>

      <div className="final-top">
        <span className="brandmark">
          RuPay <span style={{ color: '#FF6A00' }}>▶</span>
        </span>
        <span className="brandmark">
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
            <path d="M3 12 q4 -10 11 -8 t8 6" stroke="#E50019" strokeWidth="3" fill="none" strokeLinecap="round" />
          </svg>
          YES BANK
        </span>
      </div>

      <h2 className="final-headline reveal reveal-rise">
        India's first <strong>MultiBrand</strong><br />
        Co-branded Credit Card
      </h2>

      <div className="card-stage reveal reveal-scale" data-d="2">
        <img ref={cardRef} src={CARD} className="card-tilt" alt="POP-CLUB Credit Card" />
      </div>

      <div className="partner-strip reveal" data-d="3">
        {['cult.fit', 'PharmEasy', 'zomato', 'cleartrip', 'rapido', 'blinkit'].map((b) => (
          <span key={b}>{b}</span>
        ))}
      </div>

      <div className="final-cta-btn-row reveal" data-d="4">
        <a href="#apply" className="btn-cta brand lg btn-pulse">Apply Now</a>
      </div>
    </section>
  );
}

// =============================================================
// FOOTER
// =============================================================
function Footer() {
  const cols = [
    { title: 'Products', items: ['POP UPI', 'POPshop', 'POP Credit Card', 'POPcoins'] },
    { title: 'Company',  items: ['About', 'Blog', 'Careers', 'Press'] },
    { title: 'Support',  items: ['Help Centre', 'FAQs', 'Contact us', 'Status'] },
    { title: 'Legal',    items: ['Terms', 'Privacy', 'Grievance', 'Cookies'] },
  ];
  return (
    <footer className="footer" id="download">
      <div className="footer-grid">
        <div>
          <img src={LOGO_DARK_BG} alt="pop" style={{ height: 40, width: 'auto' }} />
          <p style={{ marginTop: 18, color: 'var(--pop-ink-500)', fontSize: 14, lineHeight: 1.6, maxWidth: 280 }}>
            UPI payments made refreshing. Earn POPcoins on every transaction.
          </p>
          <div style={{ marginTop: 18 }} className="store-badges">
            <a href="#" className="store-badge">
              <span className="ic" aria-hidden></span>
              <span className="lbl"><span className="small">Download on the</span><span className="big">App Store</span></span>
            </a>
            <a href="#" className="store-badge">
              <span className="ic" aria-hidden>▶</span>
              <span className="lbl"><span className="small">Get it on</span><span className="big">Google Play</span></span>
            </a>
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h4>{c.title}</h4>
            <ul>{c.items.map((it) => <li key={it}><a href="#">{it}</a></li>)}</ul>
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} PopClub. All rights reserved.</span>
        <span>Made in India · UPI by NPCI</span>
      </div>
    </footer>
  );
}

// =============================================================
// APP
// =============================================================
function App() {
  useReveal();
  return (
    <>
      <GlobalChrome />
      <TopPromo />
      <Nav />
      <Hero />
      <RewardBanner />
      <PopShopSection />
      <BrandSlider />
      <PartnersSection />
      <FinalCTA />
      <Footer />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
