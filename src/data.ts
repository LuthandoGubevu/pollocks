// Site content. Everything here is placeholder data lifted from the design
// prototype; replace with real catalogue / CMS data when a backend exists.

export type World = 'photo' | 'copy' | 'gallery';
export type Audience = 'personal' | 'business';

export const WORLD = {
  photo: { name: 'Photography & Framing', short: 'Photography', col: 'var(--ph)' },
  copy: { name: 'Copy Design & Print', short: 'Copy Design', col: 'var(--cp)' },
  gallery: { name: "Rob Pollock's Gallery", short: 'Gallery', col: '#0a0a0a' },
} as const;

export const SITE = {
  phone: '043 721 0966',
  tel: '+27437210966',
  email: 'info@pollocks.co.za',
  hours: 'Mon–Fri 8:00–17:00 · Sat 8:00–13:00',
};

export const fmt = (n: number) =>
  'R ' + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

/** Placeholder order/booking reference until a backend issues real ones. */
export const makeRef = () =>
  'PK-' + String(new Date().getFullYear()).slice(2) + '-' + String(Math.floor(1000 + Math.random() * 9000));

// ── Navigation ──────────────────────────────────────────────────────────
export const SUBNAV: Record<'photo' | 'copy', [string, string][]> = {
  photo: [['/photography', 'Home'], ['/photography/portraits', 'Photography'], ['/photography/framing', 'Framing'], ['/shop', 'Camera & Instax shop']],
  copy: [['/print', 'Home'], ['/gifts?for=business', 'Catalogue'], ['/account', 'Business account'], ['/quote', 'Get a quote']],
};

export const MEGA = {
  photo: {
    n: WORLD.photo.name,
    links: [['Portraits & events', '/photography/portraits'], ['Graduations', '/photography/portraits'], ['Print & canvas', '/photography/framing'], ['Custom framing', '/photography/framing'], ['Photobooks', '/photography'], ['Cameras & Instax', '/shop']],
    tiles: [['Portraits', '/photography/portraits'], ['Framing', '/photography/framing'], ['Cameras', '/shop']],
  },
  copy: {
    n: WORLD.copy.name,
    links: [['Business printing', '/quote'], ['Stationery', '/gifts?for=business'], ['Drinkware & pens', '/gifts?for=business'], ['Trophies & engraving', '/gifts?for=business'], ['Embroidery', '/quote'], ['Signage', '/quote']],
    tiles: [['Branded gifts', '/gifts?for=business'], ['Engraving', '/gifts?for=business'], ['Account', '/account']],
  },
} as const;

export const SEARCH_INDEX: { t: string; to: string; tag: string; bg: string }[] = [
  ['Portrait photography', '/photography/portraits', 'Photography', 'var(--ph)'],
  ['Graduation photos', '/photography/portraits', 'Photography', 'var(--ph)'],
  ['Custom framing', '/photography/framing', 'Photography', 'var(--ph)'],
  ['Canvas printing', '/photography/framing', 'Photography', 'var(--ph)'],
  ['Instax film', '/shop', 'Photography', 'var(--ph)'],
  ['Canon cameras', '/shop/canon-eos-r100-kit', 'Photography', 'var(--ph)'],
  ['Photobooks', '/photography', 'Photography', 'var(--ph)'],
  ['Photo mug', '/gifts/photo-mug', 'Both worlds', '#595959'],
  ['Candles', '/gifts/candle', 'Both worlds', '#595959'],
  ['Business cards', '/print', 'Copy Design', 'var(--cp)'],
  ['Trophies and engraving', '/gifts?for=business', 'Copy Design', 'var(--cp)'],
  ['Embroidery for staff wear', '/print', 'Copy Design', 'var(--cp)'],
  ['Banners and signage', '/print', 'Copy Design', 'var(--cp)'],
  ['Nahoon at Dawn print', '/gallery/nahoon-at-dawn', 'Gallery', '#0a0a0a'],
].map(([t, to, tag, bg]) => ({ t, to, tag, bg }));

// ── Home ────────────────────────────────────────────────────────────────
export const HERO_SLIDES = ['Hero 1 · studio portrait', 'Hero 2 · framed prints', 'Hero 3 · branded stock'];

export const STRIP = [
  { i: '01', t: 'Photography', d: 'Portraits, events, graduations', to: '/photography/portraits' },
  { i: '02', t: 'Print', d: 'Photo, canvas, large format', to: '/photography/framing' },
  { i: '03', t: 'Framing', d: 'Ready-made and custom', to: '/photography/framing' },
  { i: '04', t: 'Gifting', d: 'Keepsakes and branded', to: '/gifts' },
  { i: '05', t: 'Cameras', d: 'Gear, Instax and film', to: '/shop' },
  { i: '06', t: 'Gallery', d: 'Rob Pollock fine art', to: '/gallery' },
];

export const PORTFOLIO = [
  { k: 'Portraits', t: 'People & expressions', to: '/photography/portraits' },
  { k: 'Graduations', t: 'Proud moments', to: '/photography/portraits' },
  { k: 'Framing', t: 'Made to last', to: '/photography/framing' },
  { k: 'Branding', t: 'Details that matter', to: '/print' },
  { k: 'Gallery', t: 'Wild & beautiful', to: '/gallery' },
];

export const BRANDS = ['Canon', 'Fujifilm', 'GoPro', 'Manfrotto', 'Lowepro', 'Hähnel', 'Bushnell', 'Energizer', 'Parker', 'Zippo', 'Instax', 'Kodak'];

export const PACKAGES = [
  { n: 'Essential', p: 'R 950', d: ['60-minute studio session', '10 edited images', 'Online proofing gallery'], featured: false },
  { n: 'Signature', p: 'R 1 650', d: ['90-minute session, studio or location', '20 edited images', 'One framed 8×10 print'], featured: true },
  { n: 'Premium', p: 'R 4 500', d: ['Half-day coverage', 'Full edited gallery', 'Photobook and prints'], featured: false },
];

export const BESTSELLERS = [
  { n: 'Portrait session', w: 'Photography', r: '142', p: 'From R 950', to: '/photography/portraits' },
  { n: 'Canvas print A2', w: 'Photography', r: '88', p: 'R 640', to: '/photography/framing' },
  { n: 'Photo mug', w: 'Both worlds', r: '210', p: 'From R 98', to: '/gifts/photo-mug' },
  { n: 'Engraved Parker pen', w: 'Copy Design', r: '64', p: 'R 420', to: '/gifts/parker-pen?for=business' },
  { n: 'Instax Mini film', w: 'Photography', r: '176', p: 'R 249', to: '/shop' },
];

export const REVIEWS = [
  { q: 'Amazing experience. The photos turned out better than we imagined.', n: 'Sarah J. · Portraits' },
  { q: 'Quality was outstanding, the mugs were perfect, and the service exceptional.', n: 'Faye · Gifting' },
  { q: 'Professional, punctual and talented. The framing is beautiful.', n: 'David T. · Framing' },
];

// ── Photography & Framing ───────────────────────────────────────────────
export const PHOTO_CARDS = [
  { t: 'Portraits and events', d: 'Studio or on location', p: 'From R 950', to: '/photography/portraits' },
  { t: 'Graduations and schools', d: 'Individual and group', p: 'From R 180', to: '/photography/portraits' },
  { t: 'Print and canvas', d: 'Upload, choose size, see price', p: 'From R 45', to: '/photography/framing' },
  { t: 'Framing', d: 'Ready-made and custom', p: 'From R 120', to: '/photography/framing' },
  { t: 'Photobooks', d: 'Lay-flat albums, hand finished', p: 'From R 790', to: '/quote' },
  { t: 'Cameras and Instax', d: 'Stock status shown', p: 'From R 89', to: '/shop' },
  { t: 'Keepsakes and leather', d: 'Mugs, candles, wallets', p: 'From R 79', to: '/gifts' },
];

export const SESSIONS = [
  { chip: 'Family', name: 'Family portrait' },
  { chip: 'Newborn', name: 'Newborn session' },
  { chip: 'Graduation', name: 'Graduation portrait' },
  { chip: 'ID photos', name: 'ID photos' },
];
export const SLOTS = ['09:00', '10:00', '11:30', '14:00'];
export const SESSION_PRICE = 950;
export const DEPOSIT_RATE = 0.3;

export const FRAME_CARDS = [
  ['Ready-made frames', 'Shelf range, great value gifts', 'From R 120'],
  ['Canvas', 'Stretched over a wooden frame', 'From R 640'],
  ['Block mount', 'Frameless, hang-ready board', 'From R 780'],
  ['Snapper frames', 'Swap posters in seconds', 'From R 450'],
  ['Custom framing', 'Mouldings, mounts, glass, conservation', 'Quote in 1 day'],
].map(([t, d, p]) => ({ t, d, p }));

// ── Camera & Instax shop ────────────────────────────────────────────────
export type Stock = 'in' | 'order' | 'ask';

export const STOCK: Record<Stock, { t: string; d: string; bg: string; bd: string; c: string }> = {
  in: { t: 'In stock', d: 'On the shelf at Berea. Collect today or we deliver.', bg: 'rgba(26,127,75,.12)', bd: '#1a7f4b', c: 'var(--ok)' },
  order: { t: 'Order in', d: 'Usually 3–5 working days. Pay 20% now to reserve.', bg: 'var(--tn)', bd: 'var(--warn)', c: 'var(--warn)' },
  ask: { t: 'Ask about availability', d: 'Not listed as stock. We reply on WhatsApp the same day.', bg: 'var(--tn)', bd: 'var(--mu)', c: 'var(--ink)' },
};

export const INSTAX = [
  { n: 'Instax Mini film x10', stock: 'in' as Stock, p: 139 },
  { n: 'Instax Mini film x20', stock: 'in' as Stock, p: 249 },
  { n: 'Instax Square film x10', stock: 'order' as Stock, p: 189 },
];

export const SHOP_CATS = ['Cameras', 'Lenses', 'Tripods and monopods', 'Bags', 'Binoculars', 'Scopes', 'Memory cards', 'Batteries', 'Accessories'];

export interface Gear { slug: string; n: string; title: string; brand: string; cat: string; p: number | null; stock: Stock }
export const GEAR: Gear[] = [
  { slug: 'canon-eos-r100-kit', n: 'Canon EOS R100 kit', title: 'Canon EOS R100 + 18–45mm', brand: 'Canon', cat: 'Cameras', p: 12999, stock: 'in' },
  { slug: 'fujifilm-instax-mini-12', n: 'Fujifilm Instax Mini 12', title: 'Fujifilm Instax Mini 12', brand: 'Fujifilm', cat: 'Cameras', p: 1799, stock: 'in' },
  { slug: 'manfrotto-tripod', n: 'Manfrotto tripod', title: 'Manfrotto tripod', brand: 'Manfrotto', cat: 'Tripods and monopods', p: 1450, stock: 'order' },
  { slug: 'lowepro-backpack', n: 'Lowepro backpack', title: 'Lowepro backpack', brand: 'Lowepro', cat: 'Bags', p: null, stock: 'ask' },
];

// ── Copy Design & Print ─────────────────────────────────────────────────
export const COPY_CARDS = [
  { t: 'Design and print', d: 'Business cards, flyers, booklets, programmes', p: 'From R 190 / 100', to: '/quote' },
  { t: 'Stationery', d: '2027 diaries, notebooks, folders', p: 'From R 65', to: '/gifts?for=business' },
  { t: 'Drinkware and writing', d: 'Bottles, travel mugs, Parker pens, Zippos', p: 'From R 95', to: '/gifts?for=business' },
  { t: 'Trophies and engraving', d: 'Trophies, medals, plaques, name badges', p: 'From R 85', to: '/gifts?for=business' },
  { t: 'Embroidery', d: 'Caps, shirts, jackets, 3D embroidery', p: 'From R 60 / item', to: '/quote' },
  { t: 'Signage and large format', d: 'Vinyl, contra vision, wallpaper, banners', p: 'From R 240 / m²', to: '/quote' },
];

// ── Catalogue (one product record, two audience views) ──────────────────
export interface Item { n: string; slug: string; p: number; both: boolean; badge: string; pers: boolean; biz: boolean; lead: string }
export const ITEMS: Item[] = [
  { n: 'Photo mug', slug: 'photo-mug', p: 129, both: true, badge: 'Ready in 3 days', pers: true, biz: true, lead: '3 working days' },
  { n: 'Scented candle with photo', slug: 'candle', p: 179, both: true, badge: 'Ready in 5 days', pers: true, biz: true, lead: '5 working days' },
  { n: 'Memory block', slug: 'memory-block', p: 210, both: false, badge: 'Keepsake', pers: true, biz: false, lead: '4 working days' },
  { n: 'Keychain', slug: 'keychain', p: 79, both: false, badge: 'Keepsake', pers: true, biz: false, lead: '2 working days' },
  { n: 'Parker pen, engraved', slug: 'parker-pen', p: 420, both: false, badge: 'Engraved', pers: false, biz: true, lead: '3 working days' },
  { n: 'Travel mug', slug: 'travel-mug', p: 185, both: false, badge: 'Branded', pers: false, biz: true, lead: '5 working days' },
  { n: '2027 diary, branded', slug: 'diary-2027', p: 165, both: false, badge: 'Stationery', pers: false, biz: true, lead: '7 working days' },
  { n: 'Glass, laser engraved', slug: 'glass', p: 95, both: false, badge: 'Engraved', pers: true, biz: true, lead: '3 working days' },
];

/** Volume price multiplier for a quantity, by audience. */
export const mult = (q: number, aud: Audience) =>
  aud === 'business' ? (q >= 100 ? 0.72 : q >= 24 ? 0.85 : q >= 6 ? 0.92 : 1) : q >= 6 ? 0.95 : 1;

export const TIERS: Record<Audience, [string, number][]> = {
  business: [['1–5', 1], ['6–23', 6], ['24–99', 24], ['100+', 100]],
  personal: [['1–5', 1], ['6+', 6]],
};

export const audOf = (v: string | null): Audience => (v === 'business' ? 'business' : 'personal');

// ── Business account (demo) ─────────────────────────────────────────────
export const REPEATS = [
  { n: 'Branded pens ×200', d: 'Last ordered 14 Aug · R 9 240', line: 'Branded pens', u: 46.2, qty: 200 },
  { n: 'Appointment cards ×500', d: 'Last ordered 2 Sep · R 1 150', line: 'Appointment cards', u: 2.3, qty: 500 },
  { n: 'Staff polo shirts ×12', d: 'Last ordered 30 Sep · R 3 480', line: 'Staff polo shirts', u: 290, qty: 12 },
];
export const WAITING_QUOTES = [
  { n: 'Reception signage', d: 'PK-24-0388 · R 4 860 · valid 14 days', u: 4860 },
  { n: 'Glass etching, 6 panels', d: 'PK-24-0401 · R 7 200', u: 7200 },
];
export const ARTWORK_FILES = [
  { n: 'Logo, full colour', d: 'PNG · 1.2 MB' },
  { n: 'Logo, white', d: 'SVG · 18 KB' },
  { n: 'Appointment card', d: 'PDF · 640 KB' },
  { n: 'Letterhead', d: 'PDF · 410 KB' },
];

// ── Gallery ─────────────────────────────────────────────────────────────
export const ARTS = [
  { slug: 'nahoon-at-dawn', n: 'Nahoon at Dawn', cat: 'Seascapes', edition: 50, sold: 12 },
  { slug: 'drakensberg-mist', n: 'Drakensberg Mist', cat: 'Wildlife and landscape', edition: 50, sold: 7 },
];
export const ART_SIZES: [string, number][] = [['40×30', 2400], ['60×40', 3900], ['90×60', 6400], ['120×80', 9800]];
export const PAPER_DISCOUNT = 600;

// ── Quote engine ────────────────────────────────────────────────────────
export const QUOTE_DEPTS: { n: string; w: string; col: string; routeTo: string; fields: string[] }[] = [
  { n: 'Portrait or event photography', w: 'Photography', col: 'var(--ph)', routeTo: "Pollock's Photography & Framing", fields: ['Type of shoot', 'Number of people', 'Preferred date'] },
  { n: 'Print or frame a photo', w: 'Photography', col: 'var(--ph)', routeTo: "Pollock's Photography & Framing", fields: ['What are you printing or framing?', 'Size', 'How many?'] },
  { n: 'Camera gear', w: 'Photography', col: 'var(--ph)', routeTo: "Pollock's Photography & Framing", fields: ['Which brand or model?', 'Budget range', 'Need it by when?'] },
  { n: 'Business printing or stationery', w: 'Copy Design', col: 'var(--cp)', routeTo: "Pollock's Copy Design & Print", fields: ['What are you printing?', 'Quantity', 'Deadline'] },
  { n: 'Branded gifts, engraving or embroidery', w: 'Copy Design', col: 'var(--cp)', routeTo: "Pollock's Copy Design & Print", fields: ['Which product(s)?', 'Quantity', 'Logo ready? (yes / no)'] },
  { n: 'Not sure', w: 'Front desk', col: '#595959', routeTo: 'the front desk, who will route it', fields: ['Tell us briefly', 'Deadline'] },
];
