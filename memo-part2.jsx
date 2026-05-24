// =============================================================
// POP — Reward Legibility Note · PART 2
// Sections 07–12 (recommendations, pilot, questions, closing) + App
// =============================================================

// =============================================================
// PHONE MOCKUP COMPONENTS
// =============================================================
function PhoneFrame({ children, height = 660, width = 320 }) {
  return (
    <div className="phone" style={{ width, height }}>
      <div className="notch"></div>
      <div className="screen">
        <div className="status"><span>9:41</span><span>●●●●</span></div>
        <div className="body">{children}</div>
      </div>
    </div>
  );
}

function MiniDealRow({ name, sub }) {
  return (
    <div style={{ background: '#fff', borderRadius: 10, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--pop-canvas-3)' }}></div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 700, lineHeight: 1.2, color: 'var(--pop-ink-900)' }}>{name}</div>
        <div style={{ fontSize: 10, color: 'var(--pop-ink-500)' }}>{sub}</div>
      </div>
      <div style={{ fontSize: 10, color: 'var(--pop-orange-600)', fontWeight: 700 }}>−₹20</div>
    </div>
  );
}

// =============================================================
// S07 — Recommendation 01 · Post-Payment Bridge
// =============================================================
function Rec1() {
  return (
    <section id="s7" className="section section-elev">
      <div className="container">
        <div className="section-tag reveal"><span className="num">07</span> Recommendation 01 of 03</div>
        <h2 className="section-title reveal reveal-rise" data-d="2">The post-payment bridge.</h2>
        <p className="rec-quote reveal" data-d="3">
          The payment success screen is the most-seen screen in the app. It currently stops at the transaction. It could do one more thing.
        </p>

        <div className="rec-grid cols-3">
          {/* BEFORE */}
          <div className="reveal reveal-left" data-d="1">
            <div className="rec-label">Current</div>
            <PhoneFrame height={520}>
              <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ width: 56, height: 56, borderRadius: 999, background: 'var(--pop-success)', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 28 }}>✓</div>
                <h3 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 4px', color: 'var(--pop-ink-900)' }}>Payment successful</h3>
                <p style={{ fontSize: 13, color: 'var(--pop-ink-500)', margin: '0 0 24px' }}>₹240 paid to Nature's Basket</p>
                <div style={{ borderTop: '1px solid var(--pop-line)', paddingTop: 18, marginBottom: 'auto' }}>
                  <p style={{ fontSize: 12, color: 'var(--pop-ink-500)', margin: '0 0 4px' }}>You earned</p>
                  <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 30, margin: 0, color: 'var(--pop-orange-600)' }}>20 POPcoins</p>
                </div>
                <button style={{ background: 'var(--pop-ink-900)', color: '#fff', border: 0, borderRadius: 999, padding: '12px 22px', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', width: '100%' }}>Done</button>
              </div>
            </PhoneFrame>
          </div>

          {/* AFTER */}
          <div className="reveal reveal-scale" data-d="2">
            <div className="rec-label accent">Proposed</div>
            <PhoneFrame height={520}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: 44, height: 44, borderRadius: 999, background: 'var(--pop-success)', margin: '0 auto 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 22 }}>✓</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 2px', color: 'var(--pop-ink-900)' }}>Payment successful</h3>
                <p style={{ fontSize: 11, color: 'var(--pop-ink-500)', margin: 0 }}>₹240 to Nature's Basket · 20 POPcoins earned</p>
              </div>
              <div style={{ background: 'var(--pop-orange-50)', borderRadius: 14, padding: '12px 12px 10px', marginTop: 14 }}>
                <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 700, color: 'var(--pop-orange-700)' }}>
                  <img src={COIN} style={{ width: 12, height: 12, verticalAlign: -2, display: 'inline-block', marginRight: 4 }} /> 20 POPcoins = ₹20 on POP Deals
                </p>
                <p style={{ margin: '0 0 10px', fontSize: 10, color: 'var(--pop-ink-500)' }}>Use them on these today —</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <MiniDealRow name="Yoga Bar protein" sub="₹399 → ₹379 after coins" />
                  <MiniDealRow name="Slurrp Farm muesli" sub="₹260 → ₹240 after coins" />
                  <MiniDealRow name="Wingreens dip" sub="₹120 → ₹100 after coins" />
                </div>
              </div>
              <div style={{ marginTop: 'auto', paddingTop: 12 }}>
                <button style={{ background: 'var(--pop-orange-500)', color: '#fff', border: 0, borderRadius: 999, padding: '11px 20px', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', width: '100%' }}>Open POP Deals</button>
                <button style={{ background: 'transparent', color: 'var(--pop-ink-500)', border: 0, padding: '8px 0 0', fontSize: 11, fontWeight: 600, width: '100%' }}>Done</button>
              </div>
            </PhoneFrame>
          </div>

          {/* DESCRIPTION */}
          <div className="reveal" data-d="3">
            <h3 className="rec-h">One section below the confirmation.</h3>
            <p style={{ fontSize: 16, color: 'var(--site-fg-2)', margin: '0 0 22px', lineHeight: 1.6 }}>
              "20 POPcoins = ₹20 on POP Deals. Here is what you can use them on today." 2–3 deals, category-matched to the merchant just paid at, or to time of day.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
              <div style={{ background: 'var(--site-elev-2)', border: '1px solid var(--site-line)', borderRadius: 12, padding: '14px 16px' }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--site-fg-3)', marginBottom: 4 }}>Grocery payment</div>
                <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--site-fg)' }}>→ household / food deals</div>
              </div>
              <div style={{ background: 'var(--site-elev-2)', border: '1px solid var(--site-line)', borderRadius: 12, padding: '14px 16px' }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--site-fg-3)', marginBottom: 4 }}>Restaurant payment</div>
                <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--site-fg)' }}>→ dining / delivery deals</div>
              </div>
            </div>

            <div className="guardrails">
              <div className="guardrails-h">Guardrails</div>
              <ul>
                <li>— Never more than 3 deals (cognitive load).</li>
                <li>— No deals unrelated to the payment context.</li>
                <li>— Nothing that reads as an ad rather than a reward extension.</li>
              </ul>
            </div>

            <div className="mvp-card">
              <div className="lbl">MVP</div>
              <p>A static "top 3 deals today" block under the confirmation. <strong>No personalisation. No ML.</strong> Merchant category → deal category. Test before adding logic.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// =============================================================
// S08 — Recommendation 02 · Intent Shelves
// =============================================================
function Rec2() {
  const shelves = [
    { n: '01', t: '"Best use of your coins today."',     d: 'Products where coin coverage is highest relative to the user\'s current balance.', featured: true },
    { n: '02', t: '"Under ₹X after your coins."',         d: 'An effective-price filter using the actual balance, not the listed price.' },
    { n: '03', t: '"Deals added since your last visit."', d: 'Novelty — makes return visits feel worthwhile. No recommendation engine needed.' },
    { n: '04', t: '"Trending with POP users this week."', d: 'Social proof. No social graph required.' },
    { n: '05', t: '"Deals expiring soon."',                d: 'Urgency that\'s factual, not manufactured.' },
  ];
  return (
    <section id="s8" className="section">
      <div className="container">
        <div className="section-tag reveal"><span className="num">08</span> Recommendation 02 of 03</div>
        <h2 className="section-title reveal reveal-rise" data-d="2">POPshop intent shelves.</h2>
        <p className="rec-quote reveal" data-d="3">
          The catalogue does not need to change. The entry point does. A wide catalogue feels curated when it is organised around what the user is trying to do.
        </p>

        <div className="rec-grid cols-2">
          <div className="reveal reveal-left" data-d="1">
            <div className="rec-label accent">POPshop — re-entered</div>
            <PhoneFrame height={580}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontSize: 11, color: 'var(--pop-ink-500)', margin: 0 }}>Your balance</p>
                  <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 24, margin: '2px 0 0', color: 'var(--pop-orange-600)' }}>
                    <img src={COIN} style={{ width: 20, height: 20, verticalAlign: -3, display: 'inline-block', marginRight: 4 }} /> 248
                  </p>
                </div>
                <div style={{ width: 28, height: 28, borderRadius: 999, background: 'var(--pop-canvas-3)' }}></div>
              </div>

              <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  { lbl: 'Best use of your coins today', accent: true },
                  { lbl: 'Under ₹100 after your coins' },
                  { lbl: 'Added since your last visit' },
                  { lbl: 'Expiring soon' },
                ].map((row, i) => (
                  <div key={i}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: row.accent ? 'var(--pop-orange-600)' : 'var(--pop-ink-700)', marginBottom: 6 }}>{row.lbl}</div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <div style={{ flex: 1, background: 'var(--pop-canvas-2)', borderRadius: 10, height: 56 }}></div>
                      <div style={{ flex: 1, background: 'var(--pop-canvas-2)', borderRadius: 10, height: 56 }}></div>
                      <div style={{ flex: 1, background: 'var(--pop-canvas-2)', borderRadius: 10, height: 56 }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </PhoneFrame>
          </div>

          <div className="reveal" data-d="3">
            <h3 className="rec-h">Same catalogue. Five intent-led shelves on entry.</h3>
            <p style={{ fontSize: 15, color: 'var(--site-fg-3)', margin: '0 0 28px' }}>
              Each shelf is one question the user is silently asking when they tap into POPshop.
            </p>

            <ol className="rec-list">
              {shelves.map((s) => (
                <li key={s.n} className={s.featured ? 'featured' : ''}>
                  <div className="idx">{s.n}</div>
                  <div>
                    <div className="name">{s.t}</div>
                    <p className="desc">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="hyp-check">
              <div className="lbl">Hypothesis check</div>
              <p>Is the wide catalogue the problem? My hypothesis: no. The issue is that a broad catalogue entered without context feels random. Intent shelves give the same products a reason to exist for the user in <em>this</em> session.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// =============================================================
// S09 — Recommendation 03 · Repeat-Visit Layer
// =============================================================
function Rec3() {
  return (
    <section id="s9" className="section section-elev">
      <div className="container">
        <div className="section-tag reveal"><span className="num">09</span> Recommendation 03 of 03</div>
        <h2 className="section-title reveal reveal-rise" data-d="2">A lightweight repeat-visit layer.</h2>
        <p className="rec-quote reveal" data-d="3">
          A shop that remembers you is harder to leave than one that doesn't. This does not require a recommendation engine — it requires saving a small amount of state between sessions.
        </p>

        <div className="rec-grid cols-2-right">
          <div className="reveal" data-d="1">
            <h3 className="rec-h">Three things to surface on the second visit.</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { tag: 'Resume',         t: '"Continue where you left off."',                                                d: 'Last browsed category or product. One tile. No personalisation engine.' },
                { tag: 'Balance-aware',  t: '"Your coin balance improved — these items are cheaper now."',                   d: 'Dynamic. Re-computed against the wishlist or recently-browsed set.' },
                { tag: 'Cross-signal',   t: '"Deals in categories you\'ve used recently."',                                   d: 'Derived from payment history, not shopping history.' },
              ].map((r, i) => (
                <div key={i} style={{ display: 'flex', gap: 18, padding: '20px 24px', background: 'var(--site-elev-2)', border: '1px solid var(--site-line)', borderRadius: 14 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: 'var(--site-accent)', width: 130, flexShrink: 0, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{r.tag}</div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, lineHeight: 1.2, color: 'var(--site-fg)' }}>{r.t}</div>
                    <p style={{ margin: '4px 0 0', fontSize: 14, color: 'var(--site-fg-3)' }}>{r.d}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div style={{ padding: '20px 24px', border: '1px solid var(--site-line)', borderRadius: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--site-accent)', marginBottom: 8 }}>Switching cost, accrued</div>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: 'var(--site-fg-2)' }}>Each visit deposits into a familiarity layer. Visit two is easier than one. Visit three easier than two. By visit four, a competitor needs equivalent history to feel as good.</p>
              </div>
              <div style={{ padding: '20px 24px', border: '1px solid var(--site-line)', borderRadius: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--site-accent)', marginBottom: 8 }}>Bonus framing</div>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: 'var(--site-fg-2)' }}>Consider surfacing a single <strong style={{ color: 'var(--site-fg)' }}>"Your POP Price"</strong> — the effective price after maximum coins. Keep the coin-plus-cash breakdown one tap away, not the headline.</p>
              </div>
            </div>
          </div>

          {/* YOUR POP PRICE CALLOUT */}
          <div className="reveal reveal-right" data-d="2">
            <div className="rec-label">"Your POP Price" — visualised</div>

            <div style={{ background: 'var(--pop-canvas-2)', borderRadius: 24, padding: 32, boxShadow: '0 24px 60px rgba(0,0,0,0.35)' }}>
              <div style={{ background: '#fff', borderRadius: 16, padding: 24 }}>
                <div style={{ height: 120, background: 'var(--pop-canvas-3)', borderRadius: 10, marginBottom: 18 }}></div>
                <p style={{ margin: 0, fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--pop-ink-500)' }}>Yoga Bar dark chocolate</p>
                <p style={{ margin: '4px 0 14px', fontSize: 17, fontWeight: 700, color: 'var(--pop-ink-900)' }}>Protein bar, pack of 12</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: 'var(--pop-ink-300)', textDecoration: 'line-through' }}>₹599</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', padding: '4px 10px', borderRadius: 999, background: 'var(--pop-orange-100)', color: 'var(--pop-orange-700)', fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Save with coins</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', padding: '14px 16px', background: 'var(--pop-orange-50)', borderRadius: 12, borderLeft: '3px solid var(--pop-orange-500)' }}>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--pop-orange-700)' }}>Your POP price</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 32, color: 'var(--pop-orange-700)', lineHeight: 1, marginTop: 4 }}>₹351</div>
                  </div>
                  <div style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--pop-ink-500)', textAlign: 'right', lineHeight: 1.4 }}>
                    ₹351 cash<br />+ 248 <img src={COIN} style={{ width: 11, height: 11, verticalAlign: -2, display: 'inline-block' }} />
                  </div>
                </div>
                <p style={{ margin: '10px 0 0', fontSize: 11, color: 'var(--pop-ink-500)' }}>Tap to see breakdown</p>
              </div>
            </div>
            <p style={{ margin: '14px 4px 0', fontSize: 13, color: 'var(--site-fg-3)', lineHeight: 1.5 }}>
              Lead with the price the user actually pays, after maximum coin coverage. The math is still there — just one tap away, not in the headline.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// =============================================================
// S10 — 30-Day Pilot
// =============================================================
function Pilot() {
  const m1 = useRef(null), m2 = useRef(null);
  useCountUp(m1, 15, { prefix: '+', suffix: '%', duration: 1400 });
  useCountUp(m2, 10, { prefix: '+', suffix: '%', duration: 1600 });
  return (
    <section id="s10" className="section">
      <div className="container">
        <div className="section-tag reveal"><span className="num">10</span> A 30-day pilot</div>
        <h2 className="section-title reveal reveal-rise" data-d="2">Test the bridge first. The rest follows the result.</h2>

        <div className="hypothesis-card reveal" data-d="3">
          <div className="lbl">Hypothesis</div>
          <p className="text">
            Adding a contextual <span className="hl-block">"use your coins now"</span> section to the post-payment screen will lift POPshop open-rate within 24 hours and improve 7-day retention versus the current experience.
          </p>
        </div>

        <div className="setup-grid">
          <div className="setup-card reveal" data-d="1">
            <div className="lbl">Cohort</div>
            <p className="num">20,000 new users</p>
            <p>One city — Bangalore, for UPI density and merchant coverage.</p>
          </div>
          <div className="setup-card reveal" data-d="2">
            <div className="lbl">Treatment / Control</div>
            <p className="num" style={{ fontSize: 22 }}>Coin → ₹ + 3 matched deals</p>
            <p>Control: today's post-payment screen, unchanged.</p>
          </div>
          <div className="setup-card reveal" data-d="3">
            <div className="lbl">Duration</div>
            <p className="num">30 days</p>
            <p>Enough for 7-day retention to read in two cycles.</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 28, marginTop: 32 }}>
          <div className="reveal" data-d="1">
            <div className="rec-label">Success criteria</div>
            <div className="metrics">
              <div className="metric">
                <span className="v" ref={m1}>+0%</span>
                <div>
                  <div className="lbl">POPshop open rate within 24h of payment</div>
                  <div className="sub">vs. control — primary metric</div>
                </div>
              </div>
              <div className="metric">
                <span className="v" ref={m2}>+0%</span>
                <div>
                  <div className="lbl">7-day retention</div>
                  <div className="sub">vs. control — secondary metric</div>
                </div>
              </div>
              <div className="metric">
                <span className="v" style={{ fontSize: 26 }}>Δ&nbsp;directional</span>
                <div>
                  <div className="lbl">First POPshop purchase within 7 days</div>
                  <div className="sub">a measurable directional improvement is enough</div>
                </div>
              </div>
            </div>
          </div>

          <div className="decision-gate reveal reveal-right" data-d="2">
            <div className="lbl">Decision gate</div>
            <h4>If the test is flat —</h4>
            <p>The problem is not the discovery bridge. It's upstream (coin value perception) or downstream (shop relevance). <strong style={{ color: 'var(--site-fg)' }}>Revisit before building further.</strong></p>
          </div>
        </div>
      </div>
    </section>
  );
}

// =============================================================
// S11 — QUESTIONS
// =============================================================
function Questions() {
  const qs = [
    { n: 'Q1', topic: 'On coin applicability',         t: 'What determines which products allow higher coin coverage vs. lower? My guess: merchant-funded caps, category margins, and campaign budgets — but what other variables are in play, and how visible is that logic to the user today?' },
    { n: 'Q2', topic: 'On UPI → shopping conversion', t: 'At what point in the journey does the shift from UPI user to POPshop user typically happen? Does it correlate with payment frequency, coin-balance thresholds, or a specific merchant category? This would help prioritise where to intervene first.' },
    { n: 'Q3', topic: 'On payment-to-shop signals',    t: 'Is there a relationship between what a user pays for via UPI and what they browse in POPshop? If that signal exists, is it currently being used to surface deals — and if not, is the constraint data or product?' },
    { n: 'Q4', topic: 'On card conversion',            t: 'Does POPshop engagement predict credit-card conversion, or is the card path largely independent of shopping behaviour? Understanding this clarifies whether improving the shopping loop is also improving the LTV path.' },
    { n: 'Q5', topic: 'On merchant deal consistency',  t: 'How does deal depth and duration vary across merchant partners, and does that variation affect how users perceive the shop over time? Inconsistency in available deals could be a hidden retention factor worth tracking.', wide: true },
  ];
  return (
    <section id="s11" className="section section-elev">
      <div className="container">
        <div className="section-tag reveal"><span className="num">11</span> Open questions</div>
        <h2 className="section-title reveal reveal-rise" data-d="2">Five things I'd like to understand from the inside.</h2>
        <p className="section-kicker reveal" data-d="3" style={{ fontStyle: 'italic', fontFamily: 'var(--font-display)' }}>
          These are genuine questions, not critiques. My outside-in view has limits — and I'd learn more from the internal perspective on each of these.
        </p>

        <div className="questions">
          {qs.map((q, i) => (
            <div key={q.n} className={`q-card reveal ${q.wide ? 'wide' : ''}`} data-d={(i % 4) + 1}>
              <div className="idx">{q.n}</div>
              <div>
                <div className="topic">{q.topic}</div>
                <p>{q.t}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =============================================================
// S12 — CLOSING
// =============================================================
function Closing() {
  return (
    <section id="s12" className="section" style={{ paddingBottom: 80 }}>
      <div className="hero-glow b" aria-hidden style={{ left: '-200px', right: 'auto', bottom: '-20%', top: 'auto' }}></div>
      <div className="container" style={{ position: 'relative' }}>
        <div className="section-tag reveal"><span className="num">12</span> Final takeaway</div>

        <p className="closing-quote reveal reveal-rise" data-d="2">
          POP's model has a <span className="accent">structural advantage</span> that most cashback products do not — coins have a destination, a merchant network, and a card attached to them.
        </p>
        <p className="closing-sub reveal" data-d="3">
          That's harder to replicate than a 2% cashback rate — and it compounds with time.
        </p>

        <div className="closing-grid">
          <div className="reveal" data-d="4">
            <div className="lbl">The hypothesis, in one paragraph</div>
            <p>
              The loop may benefit from being made slightly more visible at each handoff — not through a product rebuild, but through a set of <strong>framing and connection changes</strong> that can be tested quickly and cheaply. If the hypothesis holds, the improvement should appear in retention metrics within 30 days, and in card conversion over the following quarter.
            </p>
          </div>
          <div className="reveal" data-d="5">
            <div className="lbl">Closing</div>
            <p>
              I'm genuinely interested in understanding how these questions look from the inside, and in contributing to the thinking around them. The note is short on purpose — happy to go deeper on any single chapter.
            </p>
          </div>
        </div>

        <div className="signoff reveal" data-d="6">
          <div className="by">
            <img src={COIN} alt="" />
            <span>An outside-in note · For the POP team</span>
          </div>
          <span className="meta">Thank you.</span>
        </div>
      </div>
    </section>
  );
}

// =============================================================
// APP
// =============================================================
function App() {
  useReveal();
  return (
    <div id="top">
      <GlobalChrome />
      <Nav />
      <Rail />
      <Hero />
      <Assumptions />
      <LoopDiagram />
      <VsSuperMoney />
      <Priority />
      <Principles />
      <Rec1 />
      <Rec2 />
      <Rec3 />
      <Pilot />
      <Questions />
      <Closing />
      <footer className="foot">
        <span>© {new Date().getFullYear()} · Reward Legibility Note · An outside-in memo</span>
        <span><a href="#top">Back to top ↑</a></span>
      </footer>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
