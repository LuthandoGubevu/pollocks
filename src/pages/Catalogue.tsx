import { Link, useSearchParams } from 'react-router-dom';
import { ITEMS, audOf, fmt, mult, type Audience } from '../data';
import { Seg, SlotBox } from '../components/ui';

export default function Catalogue() {
  const [sp, setSp] = useSearchParams();
  const aud = audOf(sp.get('for'));
  const biz = aud === 'business';
  const setAud = (a: Audience) => setSp(a === 'business' ? { for: 'business' } : {}, { replace: true });

  return (
    <div className="page col" style={{ gap: 24 }}>
      <div className="col" style={{ gap: 12, maxWidth: 760 }}>
        <div className="crumb"><b>Gifts, branded products and engraving</b> · one catalogue, two audiences</div>
        <h1 className="h1">{biz ? 'Branded products for business' : 'Personal gifts and keepsakes'}</h1>
        <Seg style={{ alignSelf: 'flex-start' }} value={aud} onChange={setAud}
          options={[{ v: 'personal', n: 'Personal keepsakes' }, { v: 'business', n: 'For business' }]} />
        <div className="mu" style={{ fontSize: 14, lineHeight: 1.5 }} role="status">
          {biz ? 'Showing business pricing with volume tiers. Items marked "Both worlds" are the same product, priced by audience.'
            : 'Showing items for individuals. Business buyer? Switch to see volume pricing, PO references and saved artwork.'}
        </div>
      </div>
      <div className="grid">
        {ITEMS.filter(p => (biz ? p.biz : p.pers)).map(p => (
          <Link key={p.slug} to={`/gifts/${p.slug}${biz ? '?for=business' : ''}`} className="card">
            <SlotBox id={`item-${p.slug}`} label={p.n} h={209} />
            <div className="card-body" style={{ padding: 14, gap: 6 }}>
              <div className="chips" style={{ gap: 6 }}>
                <span className="tag" style={{ padding: '3px 8px' }}>{p.badge}</span>
                {p.both && <span className="tag" style={{ padding: '2px 8px', background: 'none', border: '1px solid var(--mu)' }}>Both worlds</span>}
              </div>
              <div className="card-title" style={{ fontSize: 19 }}>{p.n}</div>
              <div style={{ fontWeight: 600, fontSize: 15 }}>from {fmt(p.p * mult(biz ? 24 : 1, aud))}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
