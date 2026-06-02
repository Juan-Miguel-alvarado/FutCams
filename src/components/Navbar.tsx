import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { JerseyIcon } from '@/components/icons'
import { MARCA } from '@/lib/constants'
import { useCart } from '@/lib/cart'

const LINKS = [
  { label: 'Catálogo', hash: '#catalogo' },
  { label: 'Entrega', hash: '#entrega' },
  { label: 'FAQ', hash: '#faq' },
]

export function Navbar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { count, setOpen } = useCart()

  // En la home navega por ancla; en detalle vuelve a la home y al ancla.
  const go = (hash: string) => {
    if (pathname === '/') {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/' + hash)
    }
  }

  return (
    <header className="sticky top-3 z-40 px-3 sm:px-4">
      <nav className="mx-auto flex h-12 max-w-4xl items-center justify-between gap-4 rounded-full border border-border bg-background/70 pl-4 pr-2 shadow-sm backdrop-blur-md">
        <Link to="/" aria-label={MARCA} className="flex items-center">
          <JerseyIcon className="size-6 transition-transform duration-300 hover:scale-110" />
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {LINKS.map((l) => (
            <button
              key={l.hash}
              onClick={() => go(l.hash)}
              className="relative text-sm font-medium text-muted-foreground transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-foreground after:transition-all after:duration-300 hover:text-foreground hover:after:w-full"
            >
              {l.label}
            </button>
          ))}
        </div>

        <Button
          onClick={() => setOpen(true)}
          size="sm"
          aria-label="Abrir carrito"
          className="relative rounded-full"
        >
          <ShoppingBag className="size-4" />
          <span className="hidden sm:inline">Carrito</span>
          {count > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full border border-border bg-background text-[10px] font-bold text-foreground shadow-sm">
              {count}
            </span>
          )}
        </Button>
      </nav>
    </header>
  )
}
