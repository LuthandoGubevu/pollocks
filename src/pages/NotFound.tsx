import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="page col" style={{ gap: 16, maxWidth: 640 }}>
      <h1 className="h1s">Page not found.</h1>
      <p className="lede">That page has moved or never existed. Search, or start from one of the two worlds.</p>
      <div className="row wrap" style={{ gap: 12 }}>
        <Link to="/photography" className="btn plain">Photography &amp; Framing</Link>
        <Link to="/print" className="btn plain outline">Copy Design &amp; Print</Link>
      </div>
    </div>
  );
}
