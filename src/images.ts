// Photo slots. Drop an image into src/photos/ named after its slot id
// (e.g. src/photos/hero-0.jpg) and it replaces that slot's placeholder; no
// code change needed. jpg, jpeg, png, webp, avif and svg are picked up.
// Slot ids are listed in src/photos/README.md and shown in each placeholder
// when running `npm run dev`.
const files = import.meta.glob<string>('./photos/*.{jpg,jpeg,png,webp,avif,svg}', { eager: true, query: '?url', import: 'default' });

export const images: Record<string, string> = Object.fromEntries(
  // .svg entries first, so a real photo with the same name overrides the stand-in illustration
  Object.entries(files).sort(([a], [b]) => Number(b.endsWith('.svg')) - Number(a.endsWith('.svg'))).map(([path, url]) => [path.slice(path.lastIndexOf('/') + 1, path.lastIndexOf('.')), url]),
);
