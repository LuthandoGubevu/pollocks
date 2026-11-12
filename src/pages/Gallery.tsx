import { useState, type CSSProperties } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ARTS, ART_SIZES, PAPER_DISCOUNT, fmt } from '../data';
import { useStore } from '../store';
import { Chips, SlotBox } from '../components/ui';
import NotFound from './NotFound';

export function Gallery() {
  return (
    <div className="page col" style={{ gap: 28 }}>
      <div className="col" style={{ maxWidth: 720, gap: 12 }}>
        <div className="kicker mu">Fine art, shared by both worlds</div>
        <h1 className="h1">Rob Pollock's Gallery</h1>
        <p className="lede">Forty-five years of African landscapes and wildlife as fine-art prints and museum-quality canvas. Limited editions, shipped worldwide.</p>
      </div>
      <div className="grid" style={{ '--min': '280px', gap: 20 } as CSSProperties}>
        {ARTS.map(a => (
          <Link key={a.slug} to={`/gallery/${a.slug}`} className="card">
            <SlotBox id={`art-${a.slug}`} label={a.n} h={220} />
            <div className="card-body" style={{ gap: 4 }}>
              <div className="card-title" style={{ fontSize: 22 }}>{a.n}</div>
              <div className="mu" style={{ fontSize: 14 }}>{a.cat} · edition of {a.edition}</div>
              <div style={{ fontWeight: 600 }}>From {fmt(ART_SIZES[0][1])}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function Artwork() {
  const { slug } = useParams();
  const { addLine } = useStore();
  const [size, setSize] = useState(1);
  const [paper, setPaper] = useState(0);
  const a = ARTS.find(x => x.slug === slug);
  if (!a) return <NotFound />;
  const price = ART_SIZES[size][1] - (paper ? PAPER_DISCOUNT : 0);

  return (
    <div className="page split">
      <SlotBox id={`art-${a.slug}`} label={a.n} style={{ flexBasis: 340, minHeight: 360 }} />
      <div className="col" style={{ gap: 18 }}>
        <div className="crumb"><Link to="/gallery">Gallery</Link> / <b>{a.cat}</b></div>
        <h1 className="h1s">{a.n}</h1>
        <div className="mu" style={{ fontSize: 15 }}>Limited edition of {a.edition} · {a.sold} sold</div>
        <Chips value={size} onChange={setSize} options={ART_SIZES.map(([s], v) => ({ v, n: `${s} cm` }))} />
        <Chips className="grow" value={paper} onChange={setPaper} options={[
          { v: 0, n: 'Museum canvas', sub: 'Ready to hang' },
          { v: 1, n: 'Fine-art paper', sub: `Unframed, ${fmt(PAPER_DISCOUNT)} less` },
        ]} />
        <div className="serif" style={{ fontSize: 34, fontWeight: 600 }} aria-live="polite">{fmt(price)}</div>
        <button className="btn tall"
          onClick={() => addLine({ n: `${a.n} ${ART_SIZES[size][0]} cm, ${paper ? 'paper' : 'canvas'}`, w: 'gallery', u: price, qty: 1, lead: 'ships in 5–10 days' })}>Add to cart</button>
        <div className="mu" style={{ fontSize: 14, lineHeight: 1.6 }}>Insured shipping to 60+ countries · certificate of authenticity included</div>
      </div>
    </div>
  );
}
