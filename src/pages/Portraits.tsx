import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { DEPOSIT_RATE, SESSIONS, SESSION_PRICE, SLOTS, fmt, makeRef } from '../data';
import { useStore } from '../store';
import { Chips, SlotBox, idx } from '../components/ui';

// Placeholder availability for the next two weeks (no booking backend yet).
const PATTERN = [0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0];
const dayFmt = new Intl.DateTimeFormat('en-ZA', { weekday: 'short', day: 'numeric', month: 'short' });
const longFmt = new Intl.DateTimeFormat('en-ZA', { weekday: 'long', day: 'numeric', month: 'long' });
const wkFmt = new Intl.DateTimeFormat('en-ZA', { weekday: 'short' });

export default function Portraits() {
  const { showToast } = useStore();
  const days = useMemo(() => PATTERN.map((a, i) => {
    const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() + i + 1);
    return { d, open: !!a && d.getDay() !== 0 };
  }), []);
  const [day, setDay] = useState(() => days.findIndex(d => d.open));
  const [slot, setSlot] = useState(1);
  const [sess, setSess] = useState(0);
  const [where, setWhere] = useState(0);
  const [ref, setRef] = useState('');
  const deposit = SESSION_PRICE * DEPOSIT_RATE;

  return (
    <div className="page split">
      <div className="col" style={{ gap: 20 }}>
        <div className="crumb"><Link to="/photography">Photography &amp; Framing</Link> / Photography / <b>Portraits</b></div>
        <h1 className="h1">Portrait sessions</h1>
        <p className="lede">Studio or on location. Edited images in a private proofing gallery within 48 hours.</p>
        <div className="chips">
          <span className="tag">From {fmt(SESSION_PRICE)}</span><span className="tag">Gallery in 48 hours</span><span className="tag">10 edited images included</span>
        </div>
        <SlotBox id="s3" label="Portrait sessions" h={200} />
        <div className="note serif" style={{ fontSize: 19, lineHeight: 1.4 }}>
          "Over 30 years photographing young people at graduations taught us how to keep it quick and relaxed."{' '}
          <span className="mu" style={{ fontFamily: 'var(--sans)', fontSize: 13 }}>· Pollock's studio</span>
        </div>
      </div>

      <div className="panel">
        {ref ? (
          <div className="col" style={{ gap: 12 }} role="status">
            <h2 className="serif" style={{ fontSize: 28, fontWeight: 600 }}>You're booked.</h2>
            <div style={{ fontSize: 16, lineHeight: 1.6 }}>{dayFmt.format(days[day].d)} · {SLOTS[slot]}<br />{SESSIONS[sess].name} · {['Studio', 'On location'][where]}</div>
            <div className="note" style={{ padding: 14 }}><b>Reference {ref}</b><br />Confirmation sent by email and WhatsApp. Your {fmt(deposit)} deposit receipt is attached.</div>
            <div className="row wrap" style={{ gap: 12 }}>
              <Link to="/photography" className="btn plain">Back to Photography</Link>
              <Link to="/photography/framing" className="btn plain outline">Plan framing for your prints</Link>
            </div>
          </div>
        ) : (
          <>
            <h2 className="h3">Book your session</h2>
            <div><div className="label">Session</div><Chips options={SESSIONS.map((s, v) => ({ v, n: s.chip }))} value={sess} onChange={setSess} /></div>
            <div><div className="label">Where</div><Chips options={idx(['Studio', 'Location'])} value={where} onChange={setWhere} className="grow" /></div>
            <div>
              <div className="label">Next two weeks · dashed days are full</div>
              <div className="cal">
                {days.map((d, i) => (
                  <button key={i} type="button" className={d.open ? '' : 'full'} aria-pressed={i === day}
                    aria-label={(d.open ? 'Available ' : 'Full ') + longFmt.format(d.d)}
                    onClick={() => d.open ? setDay(i) : showToast('Fully booked, pick another day')}>
                    <small>{wkFmt.format(d.d)}</small>{d.d.getDate()}
                  </button>
                ))}
              </div>
            </div>
            <div><div className="label">Time</div><Chips options={idx(SLOTS)} value={slot} onChange={setSlot} /></div>
            <div className="col" style={{ borderTop: '1px solid var(--ln)', paddingTop: 14, gap: 6, fontSize: 15 }}>
              <div className="line"><span>{SESSIONS[sess].name} · 60 min</span><span>{fmt(SESSION_PRICE)}</span></div>
              <div className="line" style={{ fontWeight: 600 }}><span>Deposit today ({DEPOSIT_RATE * 100}%)</span><span>{fmt(deposit)}</span></div>
            </div>
            <button className="btn tall" onClick={() => setRef(makeRef())}>Pay deposit and confirm</button>
            <div className="fine">No captcha. Spam is screened invisibly.</div>
          </>
        )}
      </div>
    </div>
  );
}
