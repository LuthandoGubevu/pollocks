import type { CSSProperties, ReactNode } from 'react';
import { images } from '../images';

/**
 * Photo slot. Renders the image mapped to `id` in src/images.ts, or a labelled
 * placeholder until one is supplied. Fills its (position: relative) parent.
 */
export function ImageSlot({ id, label = '', dark = false }: { id: string; label?: string; dark?: boolean }) {
  const src = images[id];
  if (src) return <img className="slot" src={src} alt={label} loading="lazy" />;
  return (
    <div className={'slot' + (dark ? ' dark' : '')} aria-hidden="true">
      {label}
      {import.meta.env.DEV ? <><br />{id}</> : null}
    </div>
  );
}

export function SlotBox({ id, label, h, style, dark }: { id: string; label?: string; h?: number | string; style?: CSSProperties; dark?: boolean }) {
  return <div className="slot-box" style={{ height: h, ...style }}><ImageSlot id={id} label={label} dark={dark} /></div>;
}

/** Single-choice chip group. */
export function Chips<T extends string | number>({ options, value, onChange, round, className = '' }: {
  options: { v: T; n: ReactNode; sub?: ReactNode }[]; value: T; onChange: (v: T) => void; round?: boolean; className?: string;
}) {
  return (
    <div className={'chips ' + className}>
      {options.map(o => (
        <button key={String(o.v)} type="button" aria-pressed={o.v === value} onClick={() => onChange(o.v)}
          className={'chip' + (round ? ' round' : '') + (o.sub ? ' two' : '')}>
          {o.sub ? <><b>{o.n}</b><br /><span>{o.sub}</span></> : o.n}
        </button>
      ))}
    </div>
  );
}

export function Seg<T extends string>({ options, value, onChange, style }: {
  options: { v: T; n: string }[]; value: T; onChange: (v: T) => void; style?: CSSProperties;
}) {
  return (
    <div className="seg" style={style}>
      {options.map(o => <button key={o.v} type="button" aria-pressed={o.v === value} onClick={() => onChange(o.v)}>{o.n}</button>)}
    </div>
  );
}

export const idx = <T,>(list: T[]) => list.map((n, v) => ({ v, n }));
