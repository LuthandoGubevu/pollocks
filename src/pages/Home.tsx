import { useEffect, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { BESTSELLERS, BRANDS, HERO_SLIDES, PACKAGES, PORTFOLIO, REVIEWS, STRIP } from '../data';
import { ImageSlot } from '../components/ui';

const section: CSSProperties = { display: 'flex', flexDirection: 'column' };

export default function Home() {
  const [hero, setHero] = useState(0);
  useEffect(() => {
    const iv = window.setInterval(() => setHero(h => (h + 1) % HERO_SLIDES.length), 6000);
    return () => window.clearInterval(iv);
  }, [hero]);

  return (
    <div className="col">
      <div className="hero">
        {HERO_SLIDES.map((ph, i) => (
          <div key={i} className={'hero-slide' + (hero === i ? ' on' : '')}><div><ImageSlot id={`hero-${i}`} label={ph} /></div></div>
        ))}
        <div className="hero-shade" />
        <div className="hero-text">
          <div className="hero-kicker">We don't just take photos</div>
          <h1>Photographed.<br />Printed.<br /><i>Made yours.</i></h1>
          <div className="hero-rule" />
          <div className="hero-lede">Photography, printing, framing, gifting and branding under one roof in Berea, East London.</div>
          <div className="row wrap" style={{ gap: 12 }}>
            <Link to="/photography/portraits" className="btn big">Book a session</Link>
            <Link to="/print" className="btn big outline">Business &amp; print</Link>
          </div>
        </div>
        <div className="seal d-only" aria-hidden="true">
          <div className="serif" style={{ fontSize: 38, fontWeight: 600, lineHeight: 1 }}>40+</div>
          <div style={{ fontSize: 9, letterSpacing: '.2em', textTransform: 'uppercase', marginTop: 4 }}>Years of craft</div>
        </div>
        <div className="dots">
          {HERO_SLIDES.map((_, i) => (
            <button key={i} aria-label={`Slide ${i + 1}`} aria-current={hero === i} onClick={() => setHero(i)}><span /></button>
          ))}
        </div>
      </div>

      <div className="strip">
        {STRIP.map(x => (
          <Link key={x.i} to={x.to}>
            <span className="mu" style={{ fontSize: 11, letterSpacing: '.2em' }}>{x.i}</span>
            <span style={{ fontSize: 12, letterSpacing: '.16em', textTransform: 'uppercase', fontWeight: 600 }}>{x.t}</span>
            <span className="mu" style={{ fontSize: 12, lineHeight: 1.5 }}>{x.d}</span>
          </Link>
        ))}
      </div>

      <div style={{ ...section, padding: 'var(--padXL) var(--pad) var(--padL)', gap: 28 }}>
        <div className="row wrap" style={{ gap: 16, justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div><div className="eyebrow" style={{ marginBottom: 10 }}>Our portfolio</div><h2 className="h2">Moments we've captured</h2></div>
          <Link to="/gallery" className="more">View all work →</Link>
        </div>
        <div className="grid" style={{ '--min': 'var(--pf-min)', gap: 14 } as CSSProperties}>
          {PORTFOLIO.map((p, i) => (
            <Link key={p.k} to={p.to} className="tile pf">
              <div className="zi"><ImageSlot id={`pf-${i}`} label={p.t} dark /></div>
              <div className="pf-cap">
                <div style={{ fontSize: 10, letterSpacing: '.24em', textTransform: 'uppercase', color: '#bdbdba' }}>{p.k}</div>
                <div className="serif" style={{ fontSize: 24, fontWeight: 600, marginTop: 2 }}>{p.t}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div style={{ background: '#000', overflow: 'hidden', borderTop: '1px solid #222', borderBottom: '1px solid #222' }} aria-label="Brands we stock">
        <div className="mq">
          {[...BRANDS, ...BRANDS].map((b, i) => (
            <span key={i} aria-hidden={i >= BRANDS.length} style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: 26, letterSpacing: '.14em', textTransform: 'uppercase', padding: '20px 32px', whiteSpace: 'nowrap', color: '#bdbdba' }}>{b}</span>
          ))}
        </div>
      </div>

      <div className="grid" style={{ '--min': '320px', gap: 0 } as CSSProperties}>
        {[
          { id: 'home-photo', to: '/photography', who: 'Families · graduates · photographers', a: 'Photography', b: '& Framing', btn: 'light' },
          { id: 'home-copy', to: '/print', who: 'Teams · schools · clubs · businesses', a: 'Copy Design', b: '& Print', btn: 'light-outline' },
        ].map(w => (
          <div key={w.id} className="tile world">
            <div className="zi"><ImageSlot id={w.id} label={`${w.a} ${w.b}`} dark /></div>
            <div className="world-shade" />
            <div className="world-cap">
              <div style={{ fontSize: 11, letterSpacing: '.28em', textTransform: 'uppercase', color: '#bdbdba' }}>{w.who}</div>
              <h2 className="h2" style={{ lineHeight: .95, textTransform: 'uppercase' }}>{w.a}<br />{w.b}</h2>
              <Link to={w.to} className={'btn big ' + w.btn} aria-label={`Enter ${w.a} ${w.b}`}>Enter</Link>
            </div>
          </div>
        ))}
      </div>

      <div style={{ ...section, padding: 'var(--padXL) var(--pad)', gap: 32 }}>
        <div style={{ textAlign: 'center' }}><div className="eyebrow" style={{ marginBottom: 10 }}>Choose your session</div><h2 className="h2">Packages that fit every moment</h2></div>
        <div className="pkgs">
          {PACKAGES.map(k => (
            <div key={k.n} className={'pkg' + (k.featured ? ' featured' : '')}>
              <div className="eyebrow" style={{ letterSpacing: '.24em' }}>{k.n}</div>
              <div className="serif" style={{ fontSize: 44, fontWeight: 600, lineHeight: 1 }}>{k.p}</div>
              <div className="mu" style={{ fontSize: 14, lineHeight: 1.7 }}>{k.d.join(' · ')}</div>
              <Link to="/photography/portraits" className={'btn' + (k.featured ? '' : ' outline')} aria-label={`Book ${k.n}`}
                style={{ marginTop: 8, minHeight: 48, padding: '0 24px', fontSize: 12, letterSpacing: '.16em', border: '1px solid var(--ink)' }}>Book now</Link>
            </div>
          ))}
        </div>
      </div>

      <div style={{ ...section, padding: 'var(--padL) 0 var(--padXL) var(--pad)', gap: 24 }}>
        <div className="line" style={{ alignItems: 'flex-end', paddingRight: 'var(--pad)' }}>
          <h2 className="h2">Best sellers</h2>
          <Link to="/gifts" className="more">Shop all →</Link>
        </div>
        <div className="rail" style={{ paddingRight: 'var(--pad)' }}>
          {BESTSELLERS.map((p, i) => (
            <Link key={p.n} to={p.to} className="tile card" style={{ width: 'var(--card-w)' }}>
              <div className="slot-box" style={{ aspectRatio: '1/1' }}><div className="zi"><ImageSlot id={`bs-${i}`} label="Product photo" /></div></div>
              <div className="card-body" style={{ gap: 6 }}>
                <div className="mu" style={{ fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase' }}>{p.w}</div>
                <div className="serif" style={{ fontSize: 24, fontWeight: 600, lineHeight: 1.1 }}>{p.n}</div>
                <div className="mu" style={{ fontSize: 12 }}><span aria-label="5 out of 5 stars">★★★★★</span> {p.r}</div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{p.p}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div style={{ ...section, padding: 'var(--padXL) var(--pad)', background: 'var(--tn)', borderTop: '1px solid var(--ln)', borderBottom: '1px solid var(--ln)', gap: 28 }}>
        <div style={{ textAlign: 'center' }}><div className="eyebrow" style={{ marginBottom: 10 }}>Kind words</div><h2 className="h2">What our clients say</h2></div>
        <div className="grid" style={{ '--min': '260px' } as CSSProperties}>
          {REVIEWS.map(v => (
            <figure key={v.n} className="panel" style={{ padding: 28, gap: 16, margin: 0 }}>
              <div style={{ fontSize: 14, letterSpacing: '.2em' }} aria-label="5 out of 5 stars">★★★★★</div>
              <blockquote className="serif" style={{ margin: 0, fontSize: 24, lineHeight: 1.3, fontWeight: 500 }}>"{v.q}"</blockquote>
              <figcaption className="eyebrow" style={{ letterSpacing: '.2em' }}>{v.n}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="row wrap" style={{ alignItems: 'stretch', background: 'var(--bg)', borderTop: '1px solid var(--ln)' }}>
        <div className="col" style={{ flex: '0 1 300px', padding: '24px var(--pad)', justifyContent: 'center', gap: 6 }}>
          <div className="mu" style={{ fontSize: 10, letterSpacing: '.3em', textTransform: 'uppercase' }}>Follow us</div>
          <div className="serif" style={{ fontSize: 24, fontWeight: 600 }}>@pollocks.photography</div>
        </div>
        <div className="rail" style={{ flex: '1 1 300px', gap: 2 }}>
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="slot-box" style={{ width: 'var(--ig-w)', aspectRatio: '1/1' }}><ImageSlot id={`ig-${i}`} dark /></div>
          ))}
        </div>
      </div>
    </div>
  );
}
