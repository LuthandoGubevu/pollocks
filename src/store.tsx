import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type { World } from './data';

export interface CartLine { id: string; n: string; w: World; u: number; qty: number; lead: string }

interface Store {
  cart: CartLine[];
  subtotal: number;
  addLine: (l: Omit<CartLine, 'id'>) => void;
  removeLine: (id: string) => void;
  clearCart: () => void;
  toast: string;
  showToast: (t: string) => void;
  drawer: boolean;
  setDrawer: (v: boolean) => void;
}

const Ctx = createContext<Store | null>(null);
const KEY = 'pollocks-cart';

function load(): CartLine[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || '[]');
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>(load);
  const [toast, setToast] = useState('');
  const [drawer, setDrawer] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch { /* storage unavailable */ }
  }, [cart]);

  const showToast = useCallback((t: string) => {
    setToast(t);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(''), 2200);
  }, []);

  const addLine = useCallback((l: Omit<CartLine, 'id'>) => {
    setCart(c => [...c, { ...l, id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6) }]);
    showToast('Added: ' + l.n);
  }, [showToast]);

  const removeLine = useCallback((id: string) => setCart(c => c.filter(l => l.id !== id)), []);
  const clearCart = useCallback(() => setCart([]), []);

  const value = useMemo<Store>(() => ({
    cart, subtotal: cart.reduce((a, l) => a + l.u * l.qty, 0),
    addLine, removeLine, clearCart, toast, showToast, drawer, setDrawer,
  }), [cart, addLine, removeLine, clearCart, toast, showToast, drawer]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const s = useContext(Ctx);
  if (!s) throw new Error('useStore outside StoreProvider');
  return s;
}
