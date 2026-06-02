import { useEffect } from 'react'
import { ShoppingBag, X, Plus, Minus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { WhatsappIcon } from '@/components/icons'
import { useCart, lineKey, type CartItem } from '@/lib/cart'
import { FALLBACK_IMG, formatPrecio, UBICACION, WHATSAPP } from '@/lib/constants'

/** Arma un mensaje de WhatsApp ordenado con todas las camisetas del carrito. */
function buildWhatsappLink(items: CartItem[], total: number) {
  const lineas = items
    .map(
      (i, idx) =>
        `${idx + 1}. ${i.pais} — ${i.tipo}, Horma ${i.horma}\n` +
        `   Talla ${i.talla} · ${i.sexo} · x${i.cantidad} · ${formatPrecio(i.precio * i.cantidad)}`,
    )
    .join('\n\n')

  const msg =
    `Hola! Quiero pedir estas camisetas:\n\n${lineas}\n\n` +
    `Total: ${formatPrecio(total)}\n\n` +
    `¿Me confirmas disponibilidad para el próximo jueves en ${UBICACION}?`

  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`
}

export function CartSheet() {
  const { items, open, setOpen, setQty, remove, clear, count, total } = useCart()

  // Cerrar con Escape y bloquear el scroll del fondo cuando está abierto.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, setOpen])

  return (
    <div className={'fixed inset-0 z-[60]' + (open ? '' : ' pointer-events-none')} aria-hidden={!open}>
      {/* Fondo */}
      <div
        onClick={() => setOpen(false)}
        className={
          'absolute inset-0 bg-foreground/40 backdrop-blur-sm transition-opacity duration-300 ' +
          (open ? 'opacity-100' : 'opacity-0')
        }
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-label="Carrito de compras"
        className={
          'absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l bg-background shadow-xl transition-transform duration-300 ease-out ' +
          (open ? 'translate-x-0' : 'translate-x-full')
        }
      >
        {/* Encabezado */}
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="size-5" strokeWidth={1.75} />
            <h2 className="text-base font-semibold">Tu carrito</h2>
            {count > 0 && (
              <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                {count}
              </span>
            )}
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Cerrar"
            className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Contenido */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-muted">
              <ShoppingBag className="size-6 text-muted-foreground" strokeWidth={1.5} />
            </div>
            <p className="font-medium">Tu carrito está vacío</p>
            <p className="text-sm text-muted-foreground">
              Agrega camisetas desde el catálogo y pídelas todas juntas por WhatsApp.
            </p>
            <Button variant="outline" onClick={() => setOpen(false)} className="mt-2">
              Ver catálogo
            </Button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y overflow-y-auto px-5">
              {items.map((i) => {
                const k = lineKey(i)
                return (
                  <li key={k} className="flex gap-3 py-4">
                    <div className="size-20 shrink-0 overflow-hidden rounded-md border bg-muted">
                      <img
                        src={i.foto_url ?? FALLBACK_IMG}
                        alt={`Camiseta ${i.pais}`}
                        className="size-full object-cover"
                      />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <p className="truncate font-semibold leading-tight">{i.pais}</p>
                        <button
                          onClick={() => remove(k)}
                          aria-label={`Quitar ${i.pais}`}
                          className="shrink-0 text-muted-foreground transition-colors hover:text-destructive"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">
                        {i.tipo} · Talla {i.talla} · {i.sexo}
                      </p>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        {/* Cantidad */}
                        <div className="flex items-center rounded-md border">
                          <button
                            onClick={() => setQty(k, i.cantidad - 1)}
                            aria-label="Restar"
                            className="flex size-7 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                          >
                            <Minus className="size-3.5" />
                          </button>
                          <span className="w-7 text-center text-sm font-medium">{i.cantidad}</span>
                          <button
                            onClick={() => setQty(k, i.cantidad + 1)}
                            aria-label="Sumar"
                            className="flex size-7 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                          >
                            <Plus className="size-3.5" />
                          </button>
                        </div>
                        <span className="text-sm font-semibold">
                          {formatPrecio(i.precio * i.cantidad)}
                        </span>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>

            {/* Pie */}
            <div className="border-t px-5 py-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total</span>
                <span className="text-lg font-bold">{formatPrecio(total)}</span>
              </div>
              <Button
                render={
                  <a
                    href={buildWhatsappLink(items, total)}
                    target="_blank"
                    rel="noreferrer"
                  />
                }
                size="lg"
                className="h-12 w-full text-base"
              >
                <WhatsappIcon className="size-5" /> Pedir por WhatsApp
              </Button>
              <button
                onClick={clear}
                className="mt-3 w-full text-center text-xs text-muted-foreground transition-colors hover:text-destructive"
              >
                Vaciar carrito
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
