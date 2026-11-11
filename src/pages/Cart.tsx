import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { WORLD, fmt, makeRef, type World } from '../data';
import { useStore } from '../store';
import { Chips, Seg } from '../components/ui';

const DELIVERY_FEE = 95;
const ORDER: World[] = ['photo', 'copy', 'gallery'];
const GROUP = { photo: 'From Photography & Framing', copy: 'From Copy Design & Print', gallery: "From Rob Pollock's Gallery" };
const FULFIL = {
  photo: 'Collect from the Berea front desk as soon as each item is ready.',
  copy: 'Branded items are produced after you approve the proof we send you.',
  gallery: 'Ships in 5–10 working days with certificate of authenticity.',
};

export default function Cart() {
  const { cart, subtotal, removeLine, clearCart } = useStore();
  const [cust, setCust] = useState<'guest' | 'biz'>('guest');
  const [deliv, setDeliv] = useState<'collect' | 'deliver'>('collect');
  const [done, setDone] = useState<{ ref: string; worlds: World[] } | null>(null);
  const worlds = ORDER.filter(w => cart.some(l => l.w === w));
  const total = subtotal + (deliv === 'deliver' ? DELIVERY_FEE : 0);

  const pay = (e: FormEvent) => {
    e.preventDefault();
    setDone({ ref: makeRef(), worlds });
    clearCart();
    window.scrollTo(0, 0);
  };

  if (done) {
    return (
      <div className="page">
        <div className="col" style={{ gap: 16, maxWidth: 720 }} role="status">
          <h1 className="h1s">Thank you. Order {done.ref}.</h1>
          <div className="lede" style={{ fontSize: 16 }}>
            {done.worlds.length > 1 ? `One order, fulfilled in ${done.worlds.length} groups. We'll WhatsApp you as each is ready.` : "We'll WhatsApp you as soon as it's ready."}
          </div>
          {done.worlds.map(w => (
            <div key={w} className="note" style={{ background: 'var(--sf)', border: '1px solid var(--ln)', borderLeft: `6px solid ${WORLD[w].col}`, lineHeight: 1.6 }}>
              <b>{WORLD[w].name}</b><br />{FULFIL[w]}
            </div>
          ))}
          <Link to="/" className="btn plain" style={{ alignSelf: 'flex-start', padding: '0 24px', fontSize: 16 }}>Back to home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page split" style={{ gap: 28 }}>
      <div className="col" style={{ gap: 20, flexBasis: 340 }}>
        <h1 className="h1s">Your cart</h1>
        {!cart.length && (
          <div className="note" style={{ padding: 20, fontSize: 16 }}>Nothing here yet. Browse <Link to="/photography" className="link">Photography &amp; Framing</Link> or <Link to="/print" className="link">Copy Design &amp; Print</Link>.</div>
        )}
        {worlds.map(w => (
          <section key={w} style={{ border: '1px solid var(--ln)', background: 'var(--sf)' }}>
            <h2 style={{ padding: '10px 16px', fontSize: 12, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', background: WORLD[w].col, color: '#fff' }}>{GROUP[w]}</h2>
            {cart.filter(l => l.w === w).map(l => (
              <div key={l.id} className="line" style={{ padding: '14px 16px', borderTop: '1px solid var(--ln)' }}>
                <div style={{ fontSize: 15, lineHeight: 1.4 }}><b>{l.n}</b><br /><span className="mu" style={{ fontSize: 13 }}>Qty {l.qty} · {l.lead}</span></div>
                <div className="row" style={{ alignItems: 'center', gap: 12 }}>
                  <b style={{ whiteSpace: 'nowrap' }}>{fmt(l.u * l.qty)}</b>
                  <button className="link" style={{ minHeight: 44, padding: '0 10px', color: 'var(--mu)', fontSize: 13, fontWeight: 400 }} aria-label={`Remove ${l.n}`} onClick={() => removeLine(l.id)}>Remove</button>
                </div>
              </div>
            ))}
          </section>
        ))}
      </div>

      {!!cart.length && (
        <form className="panel" style={{ padding: 22, gap: 16 }} onSubmit={pay}>
          <h2 className="serif" style={{ fontSize: 22, fontWeight: 600 }}>Checkout</h2>
          <Seg value={cust} onChange={setCust} options={[{ v: 'guest', n: 'Guest checkout' }, { v: 'biz', n: 'Business account' }]} />
          {cust === 'biz'
            ? <label className="field">Purchase order reference<input className="input" placeholder="PO-2026-118" /></label>
            : <label className="field">Email or WhatsApp for updates<input className="input" required autoComplete="email" /></label>}
          <Chips className="grow" value={deliv} onChange={setDeliv} options={[{ v: 'collect', n: 'Collect in store' }, { v: 'deliver', n: `Deliver (${fmt(DELIVERY_FEE)})` }]} />
          <div className="col mu" style={{ borderTop: '1px solid var(--ln)', paddingTop: 12, gap: 6, fontSize: 15 }}>
            <div className="line"><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
            <div className="line"><span>{deliv === 'deliver' ? 'Delivery, one fee for the whole order' : 'Collection'}</span><span>{deliv === 'deliver' ? fmt(DELIVERY_FEE) : 'Free'}</span></div>
            <div className="line serif" style={{ color: 'var(--ink)', fontSize: 28, fontWeight: 600 }}><span>Total</span><span>{fmt(total)}</span></div>
          </div>
          <div className="note" style={{ padding: 12, fontSize: 14 }}>
            {worlds.length > 1 ? `Mixed order: one payment, one order number, ${worlds.length} fulfilment groups. Items from each team are ready on their own dates.` : 'One team is fulfilling this order.'}
          </div>
          <button className="btn tall">{cust === 'biz' ? 'Place order on account' : 'Pay ' + fmt(total)}</button>
          <div className="fine" style={{ fontSize: 12 }}>Cards, Instant EFT and SnapScan. Uploaded files are kept for 90 days. POPIA notice.</div>
        </form>
      )}
    </div>
  );
}
