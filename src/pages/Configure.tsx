import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ITEMS, TIERS, audOf, fmt, mult } from '../data';
import { useStore } from '../store';
import { Chips } from '../components/ui';
import NotFound from './NotFound';

export default function Configure() {
  const { slug } = useParams();
  const [sp] = useSearchParams();
  const aud = audOf(sp.get('for'));
  const biz = aud === 'business';
  const { addLine, showToast } = useStore();
  const [qty, setQty] = useState(biz ? 24 : 6);
  const [logo, setLogo] = useState(true);
  useEffect(() => setQty(biz ? 24 : 6), [biz]);

  const it = ITEMS.find(x => x.slug === slug);
  if (!it) return <NotFound />;
  const unit = it.p * mult(qty, aud);
  const tiers = TIERS[aud];
  const step = (n: number) => setQty(q => Math.max(1, q + n * (q >= 24 ? 6 : 1)));

  return (
    <div className="page split">
      <div className="col" style={{ gap: 12 }}>
        <div className="crumb"><Link to={`/gifts${biz ? '?for=business' : ''}`}>Catalogue</Link> / <b>{it.n}</b> · <span style={{ color: 'var(--ac)', fontWeight: 600 }}>{biz ? 'Business · Copy Design & Print' : 'Personal · Photography & Framing'}</span></div>
        <div style={{ height: 340, background: 'var(--tn)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }} aria-hidden="true">
          <div style={{ width: 190, height: 220, background: 'var(--sf)', border: '2px solid var(--ln)', borderRadius: '10px 10px 24px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {logo && <div style={{ width: 110, height: 76, border: '2px dashed var(--ac)', color: 'var(--ac)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600 }}>{biz ? 'your logo' : 'your photo'}</div>}
          </div>
          <div className="mu" style={{ position: 'absolute', bottom: 8, right: 12, fontFamily: 'monospace', fontSize: 11 }}>mockup preview</div>
        </div>
      </div>
      <div className="col" style={{ gap: 20 }}>
        <h1 className="h1s">{it.n}</h1>
        <Chips value={logo ? 1 : 0} onChange={v => setLogo(!!v)} options={[
          { v: 1, n: 'Upload artwork', sub: biz ? 'Logo, PNG, SVG or PDF' : 'Photo, JPG or PNG' },
          { v: 0, n: 'Design with us', sub: 'From R 150' },
        ]} />
        <div className="row wrap" style={{ alignItems: 'center', gap: 14 }}>
          <div style={{ fontWeight: 600, fontSize: 15 }}>Quantity</div>
          <div className="qty">
            <button type="button" aria-label="Fewer" onClick={() => step(-1)}>−</button>
            <output aria-live="polite">{qty}</output>
            <button type="button" aria-label="More" onClick={() => step(1)}>+</button>
          </div>
          <div className="row" style={{ gap: 6 }}>
            {[6, 24, 100].map(n => <button key={n} type="button" className="chip round" style={{ minHeight: 40, padding: '0 10px', fontSize: 13 }} aria-label={`Set quantity to ${n}`} onClick={() => setQty(n)}>{n}</button>)}
          </div>
        </div>
        <div style={{ border: '1px solid var(--ln)' }}>
          {tiers.map(([label, min], i) => {
            const on = qty >= min && (i === tiers.length - 1 || qty < tiers[i + 1][1]);
            return <div key={label} className={'tier' + (on ? ' on' : '')}><span>{label}</span><span style={{ textAlign: 'right' }}>{fmt(it.p * mult(min, aud))} each</span></div>;
          })}
        </div>
        <div className="line" style={{ alignItems: 'baseline', borderTop: '1px solid var(--ln)', paddingTop: 14 }}>
          <span className="mu" style={{ fontSize: 15 }}>{qty} × {fmt(unit)} · ready in {it.lead}</span>
          <span className="serif" style={{ fontSize: 32, fontWeight: 600 }}>{fmt(unit * qty)}</span>
        </div>
        <div className="row wrap" style={{ gap: 10 }}>
          <button className="btn tall" style={{ flex: '1 1 180px' }}
            onClick={() => addLine({ n: it.n + (logo ? (biz ? ', logo' : ', photo') : ''), w: biz ? 'copy' : 'photo', u: unit, qty, lead: it.lead })}>Add to cart</button>
          <button className="btn tall plain outline" style={{ minHeight: 56, padding: '0 18px' }} onClick={() => showToast('Saved to your artwork library')}>Save artwork</button>
        </div>
        <div className="fine">
          {biz ? <>Buying for yourself? <Link className="link" style={{ fontSize: 13 }} to={`/gifts/${it.slug}`}>See personal pricing</Link>.</>
            : <>Ordering for a business? <Link className="link" style={{ fontSize: 13 }} to={`/gifts/${it.slug}?for=business`}>See volume pricing</Link>, PO references and saved artwork.</>}
        </div>
      </div>
    </div>
  );
}
