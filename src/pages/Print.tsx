import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { COPY_CARDS } from '../data';
import { SlotBox } from '../components/ui';

export default function Print() {
  return (
    <div className="page col" style={{ gap: 36 }}>
      <div className="row wrap" style={{ gap: 28, alignItems: 'center' }}>
        <div className="col" style={{ flex: '1 1 320px', gap: 16 }}>
          <div className="kicker">Copy Design &amp; Print</div>
          <h1 className="h1">Print, brand and supply your business.</h1>
          <p className="lede">Stationery, signage, engraving, embroidery and branded gifts. Volume pricing, saved artwork and repeat orders on a business account.</p>
          <div className="row wrap" style={{ gap: 12, alignItems: 'center' }}>
            <Link to="/quote" className="btn">Start a quote</Link>
            <Link to="/gifts?for=business" className="link" style={{ padding: '0 4px' }}>Browse the catalogue</Link>
          </div>
        </div>
        <SlotBox id="s7" label="Copy Design & Print" style={{ flex: '1 1 300px', minHeight: 480 }} />
      </div>
      <div className="col" style={{ gap: 16 }}>
        <h2 className="serif" style={{ fontSize: 28 }}>What does your business need?</h2>
        <div className="grid">
          {COPY_CARDS.map((c, i) => (
            <Link key={c.t} to={c.to} className="card">
              <SlotBox id={`s8-${i}`} label={c.t} h={209} />
              <div className="card-body">
                <div className="card-title">{c.t}</div>
                <div className="mu" style={{ fontSize: 14, lineHeight: 1.4 }}>{c.d}</div>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{c.p}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="grid" style={{ '--min': '280px' } as CSSProperties}>
        <div className="col" style={{ background: 'var(--cp)', color: '#fff', padding: 24, gap: 10, alignItems: 'flex-start' }}>
          <h2 className="h3">Business account</h2>
          <div style={{ fontSize: 15, lineHeight: 1.5 }}>Saved logos, repeat orders in one click, volume tiers, PO references and 30-day terms.</div>
          <Link to="/account" className="btn plain" style={{ background: '#fff', color: '#0a0a0a' }}>Open demo dashboard</Link>
        </div>
        <div className="col" style={{ background: 'var(--tn)', padding: 24, gap: 10, alignItems: 'flex-start' }}>
          <h2 className="serif" style={{ fontSize: 22, fontWeight: 600 }}>Team headshots for the website?</h2>
          <div className="mu" style={{ fontSize: 15, lineHeight: 1.5 }}>Our studio can photograph your whole team in an afternoon.</div>
          <Link to="/photography/portraits" className="btn plain" style={{ background: 'var(--ph)', color: '#fff' }}>See Photography &amp; Framing</Link>
        </div>
      </div>
    </div>
  );
}
