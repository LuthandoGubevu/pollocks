import { useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { GEAR, INSTAX, SHOP_CATS, STOCK, fmt } from '../data';
import { useStore } from '../store';
import { Chips, SlotBox, idx } from '../components/ui';

export default function Shop() {
  const { addLine, showToast } = useStore();
  const [remind, setRemind] = useState(0);
  const [cat, setCat] = useState('All');
  const gear = cat === 'All' ? GEAR : GEAR.filter(g => g.cat === cat);

  return (
    <div className="page col" style={{ gap: 32 }}>
      <div className="col" style={{ gap: 12, maxWidth: 720 }}>
        <div className="crumb"><Link to="/photography">Photography &amp; Framing</Link> / <b>Camera &amp; Instax shop</b></div>
        <h1 className="h1">Cameras, lenses and Instax.</h1>
        <p className="lede">Stock status is shown on every item. Not on the shelf? We can order it in.</p>
      </div>

      <div className="note col" style={{ padding: 20, gap: 14 }}>
        <div className="row wrap" style={{ gap: '8px 16px', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 className="h3">Instax film shelf</h2>
          <div className="row wrap mu" style={{ fontSize: 14, alignItems: 'center', gap: 8 }}>Reminder to restock:
            <Chips round options={idx(['Off', '30 days', '60 days'])} value={remind}
              onChange={v => { setRemind(v); showToast(v ? `We'll remind you in ${v * 30} days` : 'Restock reminder off'); }} />
          </div>
        </div>
        <div className="grid" style={{ '--min': '220px', gap: 12 } as CSSProperties}>
          {INSTAX.map(p => (
            <div key={p.n} className="card" style={{ padding: 14, gap: 6 }}>
              <div style={{ fontWeight: 600, fontSize: 16 }}>{p.n}</div>
              <div className="line mu" style={{ fontSize: 14 }}><span>{STOCK[p.stock].t}</span><b style={{ color: 'var(--ink)' }}>{fmt(p.p)}</b></div>
              <button className="btn plain" style={{ minHeight: 44 }} onClick={() => addLine({ n: p.n, w: 'photo', u: p.p, qty: 1, lead: p.stock === 'in' ? 'ready now' : '3–5 working days' })}>Re-order</button>
            </div>
          ))}
        </div>
      </div>

      <div className="col" style={{ gap: 14 }}>
        <h2 className="serif" style={{ fontSize: 26 }}>Shop by category</h2>
        <Chips round options={['All', ...SHOP_CATS].map(c => ({ v: c, n: c }))} value={cat} onChange={setCat} />
        {!gear.length && <div className="note">Nothing listed online in {cat.toLowerCase()} yet. <Link to="/quote" className="link">Ask us</Link> and we'll check the shelf or order it in.</div>}
        <div className="grid" style={{ '--min': '220px' } as CSSProperties}>
          {gear.map(g => (
            <Link key={g.slug} to={`/shop/${g.slug}`} className="card">
              <SlotBox id={`gear-${g.slug}`} label={g.n} h={247} />
              <div className="card-body" style={{ padding: 14, gap: 6 }}>
                <span className="tag" style={{ alignSelf: 'flex-start', background: STOCK[g.stock].bg, color: STOCK[g.stock].c }}>{STOCK[g.stock].t}</span>
                <div className="card-title" style={{ fontSize: 19 }}>{g.n}</div>
                <div style={{ fontWeight: 600 }}>{g.p === null ? 'Ask' : fmt(g.p)}</div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mu" style={{ fontSize: 14 }}>Brands: Bushnell · Canon · Energizer · Fujifilm · GoPro · Hähnel · Lowepro · Manfrotto</div>
      </div>
    </div>
  );
}
