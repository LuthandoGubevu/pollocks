import type { CSSProperties } from 'react';
import { ARTWORK_FILES, REPEATS, WAITING_QUOTES } from '../data';
import { useStore } from '../store';
import { SlotBox } from '../components/ui';

export default function Account() {
  const { addLine, showToast } = useStore();
  return (
    <div className="page col" style={{ gap: 28 }}>
      <div className="row wrap" style={{ gap: 12, justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div><div className="crumb">Business account · demo</div><h1 className="h1s" style={{ marginTop: 4 }}>Mthatha Road Dental</h1></div>
        <div className="chips"><span className="tag" style={{ fontSize: 13, padding: '5px 12px' }}>30-day terms</span><span className="tag" style={{ fontSize: 13, padding: '5px 12px' }}>Tier 2 pricing</span></div>
      </div>
      <div className="grid" style={{ '--min': '300px', gap: 20 } as CSSProperties}>
        <div className="panel" style={{ padding: 20, gap: 14 }}>
          <h2 className="serif" style={{ fontSize: 22, fontWeight: 600 }}>Repeat orders</h2>
          {REPEATS.map(o => (
            <div key={o.n} className="rowline">
              <div><b>{o.n}</b><br /><span className="mu" style={{ fontSize: 13 }}>{o.d}</span></div>
              <button className="btn plain" style={{ minHeight: 44, padding: '0 16px', fontSize: 14, whiteSpace: 'nowrap' }}
                onClick={() => addLine({ n: o.line, w: 'copy', u: o.u, qty: o.qty, lead: 'ready in 5 working days' })}>Reorder</button>
            </div>
          ))}
        </div>
        <div className="panel" style={{ padding: 20, gap: 14 }}>
          <h2 className="serif" style={{ fontSize: 22, fontWeight: 600 }}>Quotes waiting</h2>
          {WAITING_QUOTES.map(o => (
            <div key={o.n} className="rowline">
              <div><b>{o.n}</b><br /><span className="mu" style={{ fontSize: 13 }}>{o.d}</span></div>
              <button className="btn plain outline" style={{ minHeight: 44, padding: '0 16px', fontSize: 14, whiteSpace: 'nowrap' }}
                onClick={() => addLine({ n: o.n, w: 'copy', u: o.u, qty: 1, lead: 'as quoted' })}>Convert to order</button>
            </div>
          ))}
        </div>
      </div>
      <div className="panel" style={{ padding: 20, gap: 14 }}>
        <div className="line" style={{ alignItems: 'baseline' }}>
          <h2 className="serif" style={{ fontSize: 22, fontWeight: 600 }}>Saved artwork</h2>
          <button className="link" style={{ minHeight: 44 }} onClick={() => showToast('Upload dialog would open (POPIA consent shown first)')}>Upload new</button>
        </div>
        <div className="grid" style={{ '--min': '140px', gap: 12 } as CSSProperties}>
          {ARTWORK_FILES.map((a, i) => (
            <div key={a.n} style={{ border: '1px solid var(--ln)' }}>
              <SlotBox id={`s10-${i}`} label={a.n} h={152} />
              <div style={{ padding: 10, fontSize: 13, lineHeight: 1.4 }}><b>{a.n}</b><br /><span className="mu">{a.d}</span></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
