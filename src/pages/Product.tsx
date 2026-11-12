import { useState, type FormEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { GEAR, STOCK, fmt, makeRef } from '../data';
import { useStore } from '../store';
import { SlotBox } from '../components/ui';
import NotFound from './NotFound';

export default function Product() {
  const { slug } = useParams();
  const { addLine } = useStore();
  const [askRef, setAskRef] = useState('');
  const g = GEAR.find(x => x.slug === slug);
  if (!g) return <NotFound />;
  const stk = STOCK[g.stock];
  const ask = (e: FormEvent) => { e.preventDefault(); setAskRef(makeRef()); };

  return (
    <div className="page split">
      <SlotBox id={`gear-${g.slug}`} label={g.n} h={360} />
      <div className="col" style={{ gap: 18 }}>
        <div className="crumb"><Link to="/shop">Shop</Link> / {g.cat} / <b>{g.brand}</b></div>
        <h1 className="h1s">{g.title}</h1>
        <div className="serif" style={{ fontSize: 34, fontWeight: 600 }}>{g.p === null ? 'Price on request' : fmt(g.p)}</div>
        <div className="col" style={{ background: stk.bg, border: `1.5px solid ${stk.bd}`, padding: 14, gap: 4 }}>
          <b style={{ fontSize: 16, color: stk.c }}>{stk.t}</b><span style={{ fontSize: 14 }}>{stk.d}</span>
        </div>
        {g.stock === 'in' && g.p !== null && (
          <button className="btn tall" onClick={() => addLine({ n: g.n, w: 'photo', u: g.p!, qty: 1, lead: 'ready now' })}>Add to cart</button>
        )}
        {g.stock === 'order' && g.p !== null && (
          <button className="btn tall" style={{ alignSelf: 'flex-start' }} onClick={() => addLine({ n: `${g.n} (order in)`, w: 'photo', u: g.p!, qty: 1, lead: '3–5 working days' })}>Order in, pay 20% now</button>
        )}
        {(g.stock === 'ask' || g.p === null) && (askRef ? (
          <div className="note" style={{ padding: 14 }} role="status">Thanks. We'll WhatsApp you today with availability. Ref {askRef}.</div>
        ) : (
          <form className="row" style={{ gap: 8 }} onSubmit={ask}>
            <input className="input" type="tel" required placeholder="WhatsApp number" aria-label="WhatsApp number" style={{ flex: 1, height: 52, background: 'var(--sf)' }} />
            <button className="btn plain" style={{ minHeight: 52, padding: '0 18px', fontSize: 16 }}>Ask us</button>
          </form>
        ))}
      </div>
    </div>
  );
}
