import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { FRAME_CARDS, makeRef } from '../data';
import { Chips, SlotBox, idx } from '../components/ui';

export default function Framing() {
  const [kind, setKind] = useState(0);
  const [size, setSize] = useState(1);
  const [look, setLook] = useState(0);
  const [ref, setRef] = useState('');
  const submit = (e: FormEvent) => { e.preventDefault(); setRef(makeRef()); };

  return (
    <div className="page col" style={{ gap: 32 }}>
      <div className="col" style={{ gap: 12, maxWidth: 720 }}>
        <div className="crumb"><Link to="/photography">Photography &amp; Framing</Link> / <b>Framing</b></div>
        <h1 className="h1">Framing, done properly.</h1>
        <p className="lede">Ready-made frames off the shelf, or custom framing in our in-house workshop. Mounts, mouldings, glass and conservation materials.</p>
      </div>
      <div className="grid">
        {FRAME_CARDS.map((c, i) => (
          <div key={c.t} className="card">
            <SlotBox id={`s4-${i}`} label={c.t} h={209} />
            <div className="card-body">
              <div className="card-title">{c.t}</div>
              <div className="mu" style={{ fontSize: 14, lineHeight: 1.4 }}>{c.d}</div>
              <div style={{ fontWeight: 600, fontSize: 15 }}>{c.p}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="panel" style={{ maxWidth: 760 }}>
        {ref ? (
          <div className="col" style={{ gap: 12 }} role="status">
            <h2 className="serif" style={{ fontSize: 26, fontWeight: 600 }}>Request received.</h2>
            <div style={{ fontSize: 15, lineHeight: 1.5 }}>Reference <b>{ref}</b>. A framing consultant replies within 1 working day with a quote. Bring the item in whenever suits.</div>
            <div className="note row wrap" style={{ padding: 14, gap: 12, alignItems: 'center', justifyContent: 'space-between' }}>
              <span>Making a keepsake set? Photobooks match framed prints.</span>
              <Link to="/photography" className="btn plain" style={{ minHeight: 44, padding: '0 16px' }}>See photobooks</Link>
            </div>
          </div>
        ) : (
          <form className="col" style={{ gap: 18 }} onSubmit={submit}>
            <h2 className="h3">Custom framing request</h2>
            <div><div className="label">What are we framing?</div><Chips options={idx(['Artwork', 'Photo', 'Certificate', 'Sports memorabilia'])} value={kind} onChange={setKind} /></div>
            <div><div className="label">Approximate size</div><Chips options={idx(['Up to A4', 'A3', 'A2', 'Larger'])} value={size} onChange={setSize} /></div>
            <div><div className="label">Look</div><Chips options={idx(['Modern', 'Classic', 'Box frame', 'Not sure'])} value={look} onChange={setLook} /></div>
            <label className="field">Phone or email<input className="input" required autoComplete="email" /></label>
            <button className="btn">Request framing quote</button>
          </form>
        )}
      </div>
    </div>
  );
}
