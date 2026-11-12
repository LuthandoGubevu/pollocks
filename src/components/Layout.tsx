import { useEffect, useState, type FormEvent } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { MEGA, SEARCH_INDEX, SITE, SUBNAV, WORLD, audOf, fmt } from '../data';
import { useStore } from '../store';
import { ImageSlot } from './ui';

type MegaKey = keyof typeof MEGA;

function worldOf(pathname: string, search: string): 'photo' | 'copy' | 'gallery' | 'shared' {
  if (pathname.startsWith('/photography') || pathname.startsWith('/shop')) return 'photo';
  if (pathname === '/print' || pathname === '/account') return 'copy';
  if (pathname.startsWith('/gifts')) return audOf(new URLSearchParams(search).get('for')) === 'business' ? 'copy' : 'photo';
  if (pathname.startsWith('/gallery')) return 'gallery';
  return 'shared';
}

const WHATSAPP_NOTE = "Opens WhatsApp chat with Pollock's";

export default function Layout() {
  const { pathname, search } = useLocation();
  const { cart, subtotal, removeLine, toast, showToast, drawer, setDrawer } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState<MegaKey | null>(null);
  const [menu, setMenu] = useState(false);
  const [searching, setSearching] = useState(false);
  const [q, setQ] = useState('');
  const world = worldOf(pathname, search);

  // Close everything and reset scroll on navigation.
  useEffect(() => {
    setMega(null); setMenu(false); setSearching(false); setQ(''); setDrawer(false);
  }, [pathname, search, setDrawer]);
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setMega(null); setMenu(false); setSearching(false); setDrawer(false); }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('keydown', onKey); };
  }, [setDrawer]);

  useEffect(() => {
    document.body.style.overflow = menu || searching || drawer ? 'hidden' : '';
  }, [menu, searching, drawer]);

  // Scroll-reveal each top-level section of the page.
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('main > div > *');
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (en.isIntersecting) { en.target.setAttribute('data-reveal', 'in'); io.unobserve(en.target); }
    }), { threshold: 0.1 });
    els.forEach(el => { el.setAttribute('data-reveal', ''); io.observe(el); });
    return () => io.disconnect();
  }, [pathname]);

  const ql = q.trim().toLowerCase();
  const results = ql ? SEARCH_INDEX.filter(x => x.t.toLowerCase().includes(ql)) : SEARCH_INDEX.slice(0, 6);
  const sub = world === 'photo' || world === 'copy' ? SUBNAV[world] : null;
  const subOn = (to: string) => {
    const p = to.split('?')[0];
    return p === '/photography' || p === '/print' ? pathname === p : pathname.startsWith(p);
  };
  const m = mega ? MEGA[mega] : null;

  return (
    <div id="app">
      <div className="util">
        <span className="d-only">Cnr Pearce St &amp; 4th Ave, Berea</span>
        <span className="d-only">Capturing moments since 1983</span>
        <a href={'tel:' + SITE.tel}>{SITE.phone}</a>
      </div>

      <header className={'hdr' + (scrolled ? ' scrolled' : '')} onMouseLeave={() => setMega(null)}>
        <div className="hdr-bar">
          <Link to="/" className="wordmark" aria-label="Pollock's home">Pollock's</Link>
          <nav className="d-only" aria-label="Main">
            {(['photo', 'copy'] as const).map(k => (
              <Link key={k} to={k === 'photo' ? '/photography' : '/print'} className={world === k ? 'on' : ''}
                onMouseEnter={() => setMega(k)} onFocus={() => setMega(k)}>{WORLD[k].name}</Link>
            ))}
            <Link to="/gallery" className={world === 'gallery' ? 'on' : ''} onMouseEnter={() => setMega(null)} onFocus={() => setMega(null)}>Gallery</Link>
          </nav>
          <div className="row" style={{ marginLeft: 'auto', alignItems: 'center', gap: 4 }}>
            <button className="hdr-btn" onClick={() => setSearching(true)}>Search</button>
            <Link to="/account" className="hdr-btn d-only">Account</Link>
            <button className="hdr-btn cart" onClick={() => setDrawer(true)}>Cart{cart.length ? ` (${cart.length})` : ''}</button>
            <button className="hdr-btn menu m-only" onClick={() => setMenu(true)}>Menu</button>
            <Link to="/quote" className="btn d-only" style={{ minHeight: 44, padding: '0 18px', marginLeft: 8 }}>Get a quote</Link>
          </div>
        </div>
        {sub && world !== 'gallery' && world !== 'shared' && (
          <div className="subnav">
            <div className="kicker" style={{ fontSize: 12, letterSpacing: '.1em', whiteSpace: 'nowrap', paddingRight: 8 }}>{WORLD[world].name}</div>
            {sub.map(([to, n]) => <Link key={to} to={to} className={subOn(to) ? 'on' : ''}>{n}</Link>)}
            <Link className="other" to={world === 'photo' ? '/print' : '/photography'}>
              {world === 'photo' ? 'Business order? Copy Design & Print →' : 'Personal or photo? Photography & Framing →'}
            </Link>
          </div>
        )}
        {m && mega && (
          <div className="mega d-only">
            <div className="col mega-links" style={{ gap: 2 }}>
              <div className="eyebrow" style={{ letterSpacing: '.14em', marginBottom: 8 }}>{m.n}</div>
              {m.links.map(([n, to]) => <Link key={n} to={to}>{n}</Link>)}
            </div>
            <div className="grid" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
              {m.tiles.map(([n, to], i) => (
                <Link key={n} to={to} className="tile">
                  <div className="slot-box" style={{ aspectRatio: '4/5' }}><div className="zi"><ImageSlot id={`mega-${mega}-${i}`} label={n} /></div></div>
                  <div style={{ fontSize: 13, letterSpacing: '.1em', textTransform: 'uppercase', fontWeight: 600, marginTop: 8 }}>{n}</div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {searching && (
        <div className="overlay" role="dialog" aria-label="Search" style={{ gap: 16 }}>
          <div className="row" style={{ gap: 12, alignItems: 'center' }}>
            <input autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder="Search both worlds: mugs, framing, Instax..." aria-label="Search"
              className="input" style={{ flex: 1, height: 52, background: 'var(--sf)', fontSize: 17 }} />
            <button className="btn plain outline" style={{ minHeight: 52 }} onClick={() => setSearching(false)}>Close</button>
          </div>
          <div className="mu" style={{ fontSize: 14 }} role="status">
            {ql ? `${results.length} result${results.length === 1 ? '' : 's'}, across both worlds` : 'Popular across both worlds'}
          </div>
          {results.map(r => (
            <Link key={r.t} to={r.to} className="result" onClick={() => setSearching(false)}>
              <span>{r.t}</span><span className="pilltag" style={{ background: r.bg }}>{r.tag}</span>
            </Link>
          ))}
        </div>
      )}

      {menu && (
        <div className="overlay m-only" role="dialog" aria-label="Menu" style={{ gap: 10 }}>
          <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontFamily: 'var(--script)', fontSize: 34 }}>Pollock's</div>
            <button className="btn plain outline" style={{ minHeight: 44 }} onClick={() => setMenu(false)}>Close</button>
          </div>
          <Link to="/photography" className="menu-world" style={{ background: 'var(--ph)' }}>Photography &amp; Framing</Link>
          <Link to="/print" className="menu-world" style={{ background: 'var(--cp)' }}>Copy Design &amp; Print</Link>
          {[['/gallery', "Rob Pollock's Gallery"], ['/quote', 'Get a quote'], ['/account', 'Business account'], ['/cart', 'Cart'], ['/about', 'About'], ['/contact', 'Contact']].map(([to, n]) => (
            <Link key={to} to={to} className="menu-link" onClick={() => setMenu(false)}>{n}</Link>
          ))}
        </div>
      )}

      <div className={'scrim' + (drawer ? ' open' : '')} onClick={() => setDrawer(false)} />
      <aside className={'drawer' + (drawer ? ' open' : '')} aria-label="Cart" aria-hidden={!drawer}>
        <div className="line" style={{ padding: '0 20px', minHeight: 64, borderBottom: '1px solid var(--ln)' }}>
          <div className="serif" style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: 18 }}>Your cart ({cart.length})</div>
          <button className="hdr-btn" style={{ fontSize: 13, letterSpacing: '.1em', textTransform: 'uppercase', textDecoration: 'underline' }} onClick={() => setDrawer(false)}>Close</button>
        </div>
        <div className="col" style={{ flex: 1, overflow: 'auto', padding: '8px 20px' }}>
          {!cart.length && <div className="mu" style={{ padding: '20px 0', fontSize: 15 }}>Nothing here yet.</div>}
          {cart.map((l, i) => (
            <div key={l.id} className="row" style={{ gap: 14, padding: '14px 0', borderBottom: '1px solid var(--ln)' }}>
              <div className="slot-box" style={{ width: 72, height: 72, flex: '0 0 72px' }}><ImageSlot id={`cart-${i}`} /></div>
              <div style={{ flex: 1, fontSize: 15, lineHeight: 1.4 }}><b>{l.n}</b><br /><span className="mu" style={{ fontSize: 13 }}>{WORLD[l.w].short} · Qty {l.qty}</span></div>
              <div className="col" style={{ alignItems: 'flex-end', gap: 2 }}>
                <b>{fmt(l.u * l.qty)}</b>
                <button className="link mu" style={{ fontSize: 12, fontWeight: 400, padding: '6px 0', color: 'var(--mu)' }} onClick={() => removeLine(l.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
        <div className="col" style={{ padding: 20, borderTop: '1px solid var(--ln)', gap: 12 }}>
          <div className="line" style={{ fontSize: 15 }}><span>Subtotal</span><b>{fmt(subtotal)}</b></div>
          <Link to="/cart" className="btn tall" onClick={() => setDrawer(false)}>Checkout</Link>
        </div>
      </aside>

      <main id="main" key={pathname}><Outlet /></main>

      <Footer />

      <div className="sticky-cta m-only">
        <Link to="/quote" className="btn plain" style={{ fontSize: 16 }}>Get a quote</Link>
        <button className="btn plain outline" style={{ fontSize: 16 }} onClick={() => showToast(WHATSAPP_NOTE)}>WhatsApp</button>
      </div>
      <button className="wa d-only" onClick={() => showToast(WHATSAPP_NOTE)}>WhatsApp us</button>
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}

function Footer() {
  const { showToast } = useStore();
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark');
  const flip = () => {
    const t = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', t);
    try { localStorage.setItem('pollocks-theme', t); } catch { /* storage unavailable */ }
    setTheme(t);
  };
  const subscribe = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); e.currentTarget.reset(); showToast('Subscribed. Thank you.'); };
  const cols: [string, [string, string][]][] = [
    ['Photography & Framing', [['Portraits & events', '/photography/portraits'], ['Framing & canvas', '/photography/framing'], ['Cameras & Instax', '/shop'], ['Gallery', '/gallery']]],
    ['Copy Design & Print', [['Business printing', '/print'], ['Gifts & branding', '/gifts?for=business'], ['Business account', '/account'], ['Get a quote', '/quote']]],
    ['Information', [['About us', '/about'], ['Contact', '/contact'], ['Pricing & packages', '/quote'], ['Privacy & POPIA', '/about']]],
  ];
  return (
    <footer className="ftr">
      <div className="grid" style={{ '--min': '170px', gap: 32 } as React.CSSProperties}>
        <div className="col" style={{ gap: 12, maxWidth: 260 }}>
          <div style={{ fontFamily: 'var(--script)', fontSize: 42, color: '#f2f2f0' }}>Pollock's</div>
          <div style={{ lineHeight: 1.7 }}>Photography, printing, framing, gifting and branding. Cnr Pearce St and 4th Ave, Berea, East London.<br />
            <a href={'tel:' + SITE.tel}>{SITE.phone}</a><br /><a href={'mailto:' + SITE.email}>{SITE.email}</a></div>
        </div>
        {cols.map(([h, links]) => (
          <div key={h} className="col links">
            <h2>{h}</h2>
            {links.map(([n, to]) => <Link key={n} to={to}>{n}</Link>)}
          </div>
        ))}
        <div className="col" style={{ gap: 12 }}>
          <h2 style={{ margin: 0 }}>Newsletter</h2>
          <div style={{ lineHeight: 1.6 }}>Offers, graduation dates and new arrivals.</div>
          <form className="row" onSubmit={subscribe}>
            <input type="email" required placeholder="Your email" aria-label="Email" />
            <button aria-label="Subscribe" style={{ width: 56, background: '#f2f2f0', color: '#0a0a0a', border: 0, fontSize: 18 }}>→</button>
          </form>
        </div>
      </div>
      <div className="row wrap" style={{ borderTop: '1px solid #1d1d1d', paddingTop: 20, gap: '8px 24px', justifyContent: 'space-between', fontSize: 12 }}>
        <span>© Pollock's Photography &amp; Framing · Pollock's Copy Design &amp; Print</span>
        <span>{SITE.hours}</span>
        <button onClick={flip} style={{ background: 'none', border: 0, padding: 0, color: 'inherit', fontSize: 12, textDecoration: 'underline' }}>
          {theme === 'dark' ? 'Light theme' : 'Dark theme'}
        </button>
      </div>
    </footer>
  );
}
