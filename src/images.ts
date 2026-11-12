// Photo slots. Drop an image into src/photos/ named after its slot id
// (e.g. src/photos/hero-0.jpg) and it replaces that slot's placeholder; no
// code change needed. jpg, jpeg, png, webp and avif are picked up.
// Slot ids are listed in src/photos/README.md and shown in each placeholder
// when running `npm run dev`.
const files = import.meta.glob<string>('./photos/*.{jpg,jpeg,png,webp,avif}', { eager: true, query: '?url', import: 'default' });

export const images: Record<string, string> = Object.fromEntries(
  Object.entries(files).map(([path, url]) => [path.slice(path.lastIndexOf('/') + 1, path.lastIndexOf('.')), url]),
);
