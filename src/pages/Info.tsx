import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { SITE } from '../data';
import { SlotBox } from '../components/ui';

export function About() {
  return (
    <div className="page col" style={{ gap: 28 }}>
      <div className="col" style={{ maxWidth: 720, gap: 14 }}>
        <h1 className="h1">Forty years under one roof.</h1>
        <p className="lede" style={{ lineHeight: 1.6 }}>Founded in 1983 as Rob Pollock Photography, Pollock's grew into a photo lab, professional studio, copy and print centre, framing workshop and camera shop on the corner of Pearce Street and 4th Avenue, Berea. Today it trades as two specialist teams that share one address, one owner and one standard of care.</p>
      </div>
      <div className="grid" style={{ '--min': '260px' } as CSSProperties}>
        <div className="panel" style={{ padding: 20, gap: 6 }}>
          <h2 className="serif" style={{ fontSize: 20 }}>Visit us</h2>
          <span className="mu" style={{ fontSize: 15, lineHeight: 1.6 }}>Cnr Pearce Street and 4th Avenue<br />Berea, East London, Eastern Cape<br />{SITE.hours}</span>
        </div>
        <div className="panel" style={{ padding: 20, gap: 6 }}>
          <h2 className="serif" style={{ fontSize: 20 }}>Talk to us</h2>
          <span className="mu" style={{ fontSize: 15, lineHeight: 1.6 }}><a href={'tel:' + SITE.tel}>{SITE.phone}</a><br /><a href={'mailto:' + SITE.email}>{SITE.email}</a><br />WhatsApp replies within the hour in trading time</span>
        </div>
        <SlotBox id="about-shopfront" label="Shopfront, Pearce Street" style={{ minHeight: 120 }} />
      </div>
      <div><Link to="/quote" className="btn">Send us a message</Link></div>
    </div>
  );
}

export function Contact() {
  return (
    <div className="page">
      <div className="col" style={{ maxWidth: 560, gap: 16 }}>
        <h1 className="h1">Contact</h1>
        <div className="mu" style={{ fontSize: 16, lineHeight: 1.6 }}>
          For anything quote-shaped, the <Link to="/quote" className="link" style={{ fontWeight: 400 }}>quote form</Link> routes you to the right team.
          Otherwise call <a href={'tel:' + SITE.tel} style={{ textDecoration: 'underline' }}>{SITE.phone}</a> or WhatsApp us.
        </div>
      </div>
    </div>
  );
}
