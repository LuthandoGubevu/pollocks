import { Link } from 'react-router-dom';
import { PHOTO_CARDS } from '../data';
import { SlotBox } from '../components/ui';

export default function Photography() {
  return (
    <div className="page col" style={{ gap: 36 }}>
      <div className="row wrap" style={{ gap: 28, alignItems: 'center' }}>
        <div className="col" style={{ flex: '1 1 320px', gap: 16 }}>
          <div className="kicker">Photography &amp; Framing</div>
          <h1 className="h1">Keep the moments that matter.</h1>
          <p className="lede">Book a shoot, print and frame your photos, make an album, or pick up a camera. Prices and turnaround on every page.</p>
          <div className="row wrap" style={{ gap: 12, alignItems: 'center' }}>
            <Link to="/photography/portraits" className="btn">Book a shoot</Link>
            <Link to="/photography/framing" className="link" style={{ padding: '0 4px' }}>Frame or print a photo</Link>
          </div>
        </div>
        <SlotBox id="s1" label="Photography & Framing" style={{ flex: '1 1 300px', minHeight: 480 }} />
      </div>
      <div className="col" style={{ gap: 16 }}>
        <h2 className="serif" style={{ fontSize: 28 }}>What do you need?</h2>
        <div className="grid">
          {PHOTO_CARDS.map((c, i) => (
            <Link key={c.t} to={c.to} className="card">
              <SlotBox id={`s2-${i}`} label={c.t} h={228} />
              <div className="card-body">
                <div className="card-title">{c.t}</div>
                <div className="mu" style={{ fontSize: 14, lineHeight: 1.4 }}>{c.d}</div>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{c.p}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="note row wrap" style={{ padding: 20, gap: '12px 24px', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ flex: '1 1 260px' }}><b>Ordering for a business?</b> Logo mugs, staff wear and bulk gifts live in Copy Design &amp; Print, with volume pricing.</div>
        <Link to="/print" className="btn plain" style={{ background: 'var(--cp)', color: '#fff' }}>Go to Copy Design &amp; Print</Link>
      </div>
    </div>
  );
}
