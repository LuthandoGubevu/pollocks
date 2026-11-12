import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { QUOTE_DEPTS, makeRef } from '../data';

export default function Quote() {
  const [step, setStep] = useState(0);
  const [dept, setDept] = useState(0);
  const [ref, setRef] = useState('');
  const d = QUOTE_DEPTS[dept];
  const go = (n: number) => { setStep(s => Math.max(0, Math.min(3, s + n))); window.scrollTo(0, 0); };
  const next = (e: FormEvent) => { e.preventDefault(); if (step === 2) setRef(makeRef()); go(1); };

  return (
    <div className="page">
      {/* Inputs stay mounted across steps so answers survive Back/Continue. */}
      <form className="col" style={{ gap: 22, maxWidth: 760 }} onSubmit={next}>
        <div className="row" style={{ alignItems: 'center', gap: 10 }}>
          <div style={{ flex: 1, height: 4, background: 'var(--ln)' }} role="progressbar" aria-valuemin={1} aria-valuemax={4} aria-valuenow={step + 1} aria-label="Quote progress">
            <div style={{ height: 4, background: 'var(--ac)', width: `${(step + 1) * 25}%`, transition: 'width .3s' }} />
          </div>
          <span className="mu" style={{ fontSize: 14 }}>Step {step + 1} of 4</span>
        </div>

        {step === 0 && (
          <div className="col" style={{ gap: 12 }}>
            <h1 className="h1s">What are you after?</h1>
            {QUOTE_DEPTS.map((q, i) => (
              <button key={q.n} type="button" className="chip line" aria-pressed={dept === i} style={{ minHeight: 56, padding: '0 16px', fontSize: 17, textAlign: 'left' }} onClick={() => setDept(i)}>
                <span>{q.n}</span><span className="pilltag" style={{ background: q.col }}>{q.w}</span>
              </button>
            ))}
          </div>
        )}

        <div className="col" style={{ gap: 16, display: step === 1 ? 'flex' : 'none' }}>
          <h1 className="h1s">{d.n}</h1>
          <div className="mu" style={{ fontSize: 15 }}>{d.fields.length === 3 ? 'Three' : 'Two'} quick questions. Skip any you're unsure about.</div>
          {d.fields.map(f => <label key={dept + f} className="field">{f}<input className="input" style={{ background: 'var(--sf)' }} /></label>)}
        </div>

        <div className="col" style={{ gap: 16, display: step === 2 ? 'flex' : 'none' }}>
          <h1 className="h1s">How do we reach you?</h1>
          <label className="field">Your name<input className="input" style={{ background: 'var(--sf)' }} required={step === 2} autoComplete="name" /></label>
          <label className="field">WhatsApp or email<input className="input" style={{ background: 'var(--sf)' }} required={step === 2} /></label>
          <div className="fine">No captcha. Spam is screened invisibly. We use your details only to reply (POPIA).</div>
        </div>

        {step === 3 && (
          <div className="col" style={{ gap: 14 }} role="status">
            <h1 className="h1s">Quote requested.</h1>
            <div className="note" style={{ fontSize: 16, lineHeight: 1.55 }}><b>Reference {ref}</b><br />Routed to <b>{d.routeTo}</b>. Expect a reply by WhatsApp or email within one working day.</div>
            <Link to="/" className="btn plain" style={{ alignSelf: 'flex-start', padding: '0 24px', fontSize: 16 }}>Back to home</Link>
          </div>
        )}

        {step < 3 && (
          <div className="row" style={{ gap: 12, alignItems: 'center' }}>
            <button className="btn">{step === 2 ? 'Send quote request' : 'Continue'}</button>
            {step > 0 && <button type="button" className="link" style={{ minHeight: 48, color: 'var(--ink)', fontSize: 15, fontWeight: 400 }} onClick={() => go(-1)}>Back</button>}
          </div>
        )}
      </form>
    </div>
  );
}
