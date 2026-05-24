// =============================================================
// POP — A Reward Legibility Note · DARK SITE
// The 12-chapter strategy memo, as a long-scroll website.
// =============================================================
const { useEffect, useRef, useState } = React;

const COIN = (typeof window !== 'undefined' && window.__resources?.coin) || 'assets/popcoin-icon.svg';

// ---------- Section index for the side rail + nav anchors ----------
const SECTIONS = [
  { id: 's1',  num: '01', label: 'Thesis' },
  { id: 's2',  num: '02', label: 'Assumptions' },
  { id: 's3',  num: '03', label: 'The loop' },
  { id: 's4',  num: '04', label: 'Vs. super.money' },
  { id: 's5',  num: '05', label: 'Priority' },
  { id: 's6',  num: '06', label: 'Principles' },
  { id: 's7',  num: '07', label: 'Bridge' },
  { id: 's8',  num: '08', label: 'Shelves' },
  { id: 's9',  num: '09', label: 'Memory' },
  { id: 's10', num: '10', label: 'Pilot' },
  { id: 's11', num: '11', label: 'Questions' },
  { id: 's12', num: '12', label: 'Closing' },
];

// =============================================================
// HOOKS
// =============================================================
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -10% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

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

function useActiveSection() {
  const [active, setActive] = useState('s1');
  useEffect(() => {
    const opts = { rootMargin: '-40% 0px -50% 0px', threshold: 0 };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setActive(e.target.id);
      });
    }, opts);
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return active;
}

// =============================================================
// GLOBAL CHROME — cursor + scroll progress
// =============================================================
function GlobalChrome() {
  const dotRef = useRef(null);
  const progRef = useRef(null);

  useEffect(() => {
    let raf, tx = 0, ty = 0, x = 0, y = 0;
    const onMove = (e) => { tx = e.clientX; ty = e.clientY; };
    const onOver = (e) => {
      if (e.target.closest('a, button, .assumption-card, .loop-node, .principle, .brand-card, .metric, .gap-card, .rail-dot')) {
        dotRef.current?.classList.add('hot');
      }
    };
    const onOut = (e) => {
      if (e.target.closest('a, button, .assumption-card, .loop-node, .principle, .brand-card, .metric, .gap-card, .rail-dot')) {
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
      const pct = h.scrollTop / (h.scrollHeight - h.clientHeight);
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
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-row">
        <a href="#top" className="nav-brand">
          <span className="dot"></span>
          <span>POP &nbsp;·&nbsp; Reward Legibility Note</span>
        </a>
        <span className="nav-meta">An outside-in memo · 12 chapters</span>
        <a href="#s10" className="nav-cta">Read the pilot</a>
      </div>
    </nav>
  );
}

// =============================================================
// RAIL — chapter dots
// =============================================================
function Rail() {
  const active = useActiveSection();
  return (
    <div className="rail">
      {SECTIONS.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={`rail-dot ${active === s.id ? 'active' : ''}`}
          aria-label={`Go to ${s.label}`}
        >
          <span className="label">{s.num} · {s.label}</span>
        </a>
      ))}
    </div>
  );
}

// =============================================================
// S01 — HERO / THESIS
// =============================================================
function Hero() {
  return (
    <section id="s1" className="hero">
      <div className="hero-glow" aria-hidden></div>
      <div className="hero-glow b" aria-hidden></div>
      <div className="container">
        <div className="hero-eyebrow reveal">Chapter 01 · The thesis</div>
        <h1 className="hero-quote reveal reveal-rise" data-d="2">
          POP may not have a rewards&nbsp;problem.<br />
          It may have a <span className="hl">reward&nbsp;legibility</span> problem&nbsp;—
        </h1>
        <p className="hero-sub reveal" data-d="4">
          the value of POPcoins may not become visible to a new user fast enough to convert UPI frequency into a shopping habit.
        </p>
        <div className="hero-meta reveal" data-d="5">
          <span>By an active POP user</span>
          <span className="dot"></span>
          <span>Outside-in · No internal data</span>
          <span className="dot"></span>
          <span><b>12</b> chapters · ~7 min read</span>
        </div>
      </div>
      <div className="scroll-hint" aria-hidden>
        <span>Scroll to read</span>
        <div className="line"></div>
      </div>
    </section>
  );
}

// =============================================================
// S02 — ASSUMPTIONS
// =============================================================
function Assumptions() {
  const cards = [
    { n: '01', t: 'My standing',
      b: 'I am an active POP user. This note is an outside-in hypothesis — not an internal audit, and I have no access to metrics or roadmap.' },
    { n: '02', t: 'The loop is sound',
      b: 'POP\'s loop — pay, earn, understand, shop, return — is structurally sound. The question is whether each handoff in the loop is visible at the right moment.' },
    { n: '03', t: 'The real competitor',
      b: 'POP is not only competing with UPI apps. It is competing with the user\'s mental model of what a reward is worth, right now, before they have experienced the ecosystem.' },
    { n: '04', t: 'The constraint I\'m holding', featured: true,
      b: 'None of the recommendations require increasing reward spend. The goal is to make existing value more legible — not to create new value from scratch.' },
  ];
  return (
    <section id="s2" className="section">
      <div className="container">
        <div className="section-tag reveal"><span className="num">02</span> Framing</div>
        <h2 className="section-title reveal reveal-rise" data-d="2">My outside-in assumptions, stated plainly.</h2>
        <p className="section-kicker reveal" data-d="3">
          Four things I'm taking as given before the rest of the note runs. If any of these are wrong, the recommendations downstream change shape.
        </p>
        <div className="cards-grid">
          {cards.map((c, i) => (
            <div key={c.n} className={`assumption-card reveal ${c.featured ? 'featured' : ''}`} data-d={i + 1}>
              <div className="assumption-num">{c.n}</div>
              <h3>{c.t}</h3>
              <p>{c.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =============================================================
// S03 — LOOP DIAGRAM
// =============================================================
function Arrow({ broken }) {
  return (
    <div className={`loop-arrow ${broken ? 'broken' : ''}`}>
      <svg width="42" height="14" viewBox="0 0 42 14">
        <path d="M0 7 H32 M26 1 L34 7 L26 13" stroke="currentColor" strokeWidth="1.6" fill="none" />
      </svg>
    </div>
  );
}
function LoopDiagram() {
  return (
    <section id="s3" className="section section-elev">
      <div className="container">
        <div className="section-tag reveal"><span className="num">03</span> Problem map</div>
        <h2 className="section-title reveal reveal-rise" data-d="2">Where the loop may break.</h2>
        <p className="section-kicker reveal" data-d="3">
          Five nodes, three gaps. The starting point and the desired outcome are intact — the breaks live in the three handoffs between them.
        </p>

        <div className="loop reveal reveal-scale" data-d="2">
          <div className="loop-node"><div className="step">Step 01</div><div className="label">UPI payment</div><div className="meta">starting point</div></div>
          <Arrow />
          <div className="loop-node broken"><div className="step">Step 02</div><div className="label">POPcoins earned</div><div className="gap">↑ Gap 01</div></div>
          <Arrow broken />
          <div className="loop-node broken"><div className="step">Step 03</div><div className="label">POPshop / Deals</div><div className="gap">↑ Gap 02</div></div>
          <Arrow broken />
          <div className="loop-node broken"><div className="step">Step 04</div><div className="label">Purchase</div><div className="gap">↑ Gap 03</div></div>
          <Arrow />
          <div className="loop-node"><div className="step">Step 05</div><div className="label">Repeat</div><div className="meta">desired outcome</div></div>
        </div>

        <div className="gap-cards">
          <div className="gap-card reveal" data-d="1">
            <div className="lbl">Gap 01 · Value abstraction</div>
            <h4>"20 POPcoins" lands as a token, not a price.</h4>
            <p>The user may not immediately feel what 20 coins means in shopping terms. The rupee equivalence exists in the product but isn't always felt in the moment of earning.</p>
          </div>
          <div className="gap-card reveal" data-d="2">
            <div className="lbl">Gap 02 · Discovery friction</div>
            <h4>Peak attention, but no on-ramp.</h4>
            <p>After payment the user is at peak attention. Getting to POPshop still requires a deliberate navigation step — the connection between earning and spending is not automatic.</p>
          </div>
          <div className="gap-card reveal" data-d="3">
            <div className="lbl">Gap 03 · No repeat trigger</div>
            <h4>Visit two starts at zero.</h4>
            <p>After a first purchase there is no visible reason the shop gets easier or more relevant on the second visit. The loop restarts from scratch rather than from a remembered state.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// =============================================================
// S04 — VS SUPER.MONEY
// =============================================================
function VsSuperMoney() {
  return (
    <section id="s4" className="section">
      <div className="container">
        <div className="section-tag reveal"><span className="num">04</span> Competitive contrast</div>
        <h2 className="section-title reveal reveal-rise" data-d="2">POP vs. super.money — where each one wins.</h2>
        <p className="section-kicker reveal" data-d="3">
          A side-by-side on the four dimensions that actually move a new user. The first row is the one to watch.
        </p>

        <div className="reveal" data-d="3">
          <table className="cmp">
            <thead>
              <tr>
                <th>Dimension</th>
                <th>super.money</th>
                <th className="pop">POP</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hi">
                <td className="dim">First impression</td>
                <td>
                  <strong>"₹20 cashback"</strong>
                  Instant. No translation step.
                </td>
                <td className="col-pop">
                  <strong>"20 POPcoins"</strong>
                  Requires one additional step to translate to value.
                </td>
              </tr>
              <tr>
                <td className="dim">Long-term model</td>
                <td>Cashback <em>is</em> the product. No ecosystem depth beyond it.</td>
                <td className="col-pop">Coins have a destination — shop, card, merchant network.</td>
              </tr>
              <tr>
                <td className="dim">Switching cost</td>
                <td>Low. Once cashback is collected, nothing anchors the user.</td>
                <td className="col-pop">Higher, once the user is inside the ecosystem.</td>
              </tr>
              <tr>
                <td className="dim">Where it wins</td>
                <td>The first 30 seconds.</td>
                <td className="col-pop">Week 2 onwards — if the user stays long enough to get there.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="cmp-note reveal" data-d="3">
          <div className="arrow">↳ The question.</div>
          <p>
            Not whether POP's model is better in the long run — I think it is. The question is whether POP's model becomes <em>legible fast enough</em> to survive the comparison at first impression.
          </p>
        </div>
      </div>
    </section>
  );
}

// =============================================================
// S05 — PRIORITY
// =============================================================
function Priority() {
  const rows = [
    { n: '01', p: 'Coin value feels abstract at the earn moment.',  cac: 'high', ret: 'med',  ease: 'high', hi: true,  easeText: 'High · framing change' },
    { n: '02', p: 'No bridge from payment to shop.',                cac: 'med',  ret: 'high', ease: 'high', hi: true,  easeText: 'High · one screen change' },
    { n: '03', p: 'Ecosystem value not visible early.',             cac: 'high', ret: 'high', ease: 'med',  hi: true,  easeText: 'Medium' },
    { n: '04', p: 'POPshop feels browsable, not intent-led.',       cac: 'low',  ret: 'med',  ease: 'med',  hi: false, easeText: 'Medium · shelf reorder' },
    { n: '05', p: 'No repeat-visit memory or trigger.',             cac: 'low',  ret: 'high', ease: 'med',  hi: false, easeText: 'Medium' },
    { n: '06', p: 'Coin / cash combination logic unclear.',         cac: 'low',  ret: 'low',  ease: 'high', hi: false, easeText: 'High · label change' },
  ];
  const pill = (k) => k === 'high' ? <span className="pill pill-high">High</span>
                    : k === 'med'  ? <span className="pill pill-med">Medium</span>
                    : <span className="pill pill-low">Low</span>;
  return (
    <section id="s5" className="section section-elev">
      <div className="container">
        <div className="section-tag reveal"><span className="num">05</span> Prioritisation</div>
        <h2 className="section-title reveal reveal-rise" data-d="2">Problems ranked by impact and feasibility.</h2>
        <p className="section-kicker reveal" data-d="3">
          The top three are connected. Solving them together produces more impact than solving each separately — and they're all framing or screen-level changes, not roadmap-level rebuilds.
        </p>

        <div className="reveal" data-d="3">
          <table className="pri">
            <thead>
              <tr>
                <th style={{ width: 72 }}>#</th>
                <th>Problem</th>
                <th style={{ width: 160 }}>CAC impact</th>
                <th style={{ width: 180 }}>Retention</th>
                <th style={{ width: 240 }}>Ease to test</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.n} className={r.hi ? 'hi' : ''}>
                  <td className="num">{r.n}</td>
                  <td><strong>{r.p}</strong></td>
                  <td>{pill(r.cac)}</td>
                  <td>{pill(r.ret)}</td>
                  <td><span className="pill pill-soft">{r.easeText}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="cluster-note reveal" data-d="4">
          <div className="lbl">Priority cluster</div>
          <p><strong>Start with 01, 02 and 03.</strong> They share a root cause — value isn't visible at the moments when the user is actually paying attention. Treat them as one workstream.</p>
        </div>
      </div>
    </section>
  );
}

// =============================================================
// S06 — PRINCIPLES
// =============================================================
function Principles() {
  const ps = [
    { r: 'I.',   t: 'Show value at the moment of earning — not on a separate screen.',
      b: 'Coins should feel spendable the second they appear, not after the user navigates to a help section or opens the shop independently. The earn moment and the value explanation should be one event.' },
    { r: 'II.',  t: 'Make the post-payment screen do double duty.',
      b: 'It currently closes the transaction. It could also open the shopping loop. The user\'s attention is already there — this is the lowest-cost entry point into commerce POP has.' },
    { r: 'III.', t: 'Make POPshop answer "what do I do with my coins right now."',
      b: 'Not "what does POP sell." Intent-led surfacing does not require a new catalogue. It requires a different entry point to the same one.' },
  ];
  return (
    <section id="s6" className="section">
      <div className="container">
        <div className="section-tag reveal"><span className="num">06</span> Framework</div>
        <h2 className="section-title reveal reveal-rise" data-d="2">Three principles before the recommendations.</h2>
        <p className="section-kicker reveal" data-d="3">
          Each principle answers a separate "when" or "where" question. The three recommendations that follow are direct expressions of these.
        </p>
        <div className="principles">
          {ps.map((p, i) => (
            <div key={p.r} className="principle reveal reveal-rise" data-d={i + 1}>
              <div className="roman">{p.r}</div>
              <h3>{p.t}</h3>
              <p>{p.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, {
  COIN, SECTIONS, useReveal, useCountUp, useActiveSection,
  GlobalChrome, Nav, Rail, Hero, Assumptions, LoopDiagram, VsSuperMoney, Priority, Principles,
});
