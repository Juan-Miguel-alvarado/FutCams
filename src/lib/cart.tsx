import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Camiseta } from '@/supabase'

export type CartItem = {
  id: string
  pais: string
  tipo: string
  horma: string
  precio: number
  foto_url: string | null
  talla: string
  sexo: string
  cantidad: number
}

/** Una línea del carrito se identifica por camiseta + talla + sexo. */
export const lineKey = (i: { id: string; talla: string; sexo: string }) =>
  `${i.id}|${i.talla}|${i.sexo}`

type CartCtx = {
  items: CartItem[]
  add: (c: Camiseta, talla: string, sexo: string) => void
  remove: (key: string) => void
  setQty: (key: string, cantidad: number) => void
  clear: () => void
  count: number
  total: number
  open: boolean
  setOpen: (v: boolean) => void
}

const Ctx = createContext<CartCtx | null>(null)
const STORAGE_KEY = 'carrito-v1'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? (JSON.parse(raw) as CartItem[]) : []
    } catch {
      return []
    }
  })
  const [open, setOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const add: CartCtx['add'] = (c, talla, sexo) => {
    setItems((prev) => {
      const k = lineKey({ id: c.id, talla, sexo })
      if (prev.some((i) => lineKey(i) === k)) {
        return prev.map((i) => (lineKey(i) === k ? { ...i, cantidad: i.cantidad + 1 } : i))
      }
      return [
        ...prev,
        {
          id: c.id,
          pais: c.pais,
          tipo: c.tipo,
          horma: c.horma,
          precio: c.precio,
          foto_url: c.foto_url,
          talla,
          sexo,
          cantidad: 1,
        },
      ]
    })
  }

  const remove = (key: string) => setItems((prev) => prev.filter((i) => lineKey(i) !== key))

  const setQty = (key: string, cantidad: number) =>
    setItems((prev) =>
      cantidad <= 0
        ? prev.filter((i) => lineKey(i) !== key)
        : prev.map((i) => (lineKey(i) === key ? { ...i, cantidad } : i)),
    )

  const clear = () => setItems([])

  const count = items.reduce((n, i) => n + i.cantidad, 0)
  const total = items.reduce((s, i) => s + i.precio * i.cantidad, 0)

  return (
    <Ctx.Provider value={{ items, add, remove, setQty, clear, count, total, open, setOpen }}>
      {children}
    </Ctx.Provider>
  )
}

export function useCart() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useCart debe usarse dentro de <CartProvider>')
  return ctx
}
