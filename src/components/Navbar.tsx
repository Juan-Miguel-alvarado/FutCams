import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { JerseyIcon, WhatsappIcon } from '@/components/icons'
import { MARCA, WHATSAPP } from '@/lib/constants'

const LINKS = [
  { label: 'Catálogo', hash: '#catalogo' },
  { label: 'Entrega', hash: '#entrega' },
  { label: 'FAQ', hash: '#faq' },
]

export function Navbar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

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
          render={<a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" />}
          size="sm"
          className="rounded-full"
        >
          <WhatsappIcon className="size-4" />
          <span className="hidden sm:inline">WhatsApp</span>
        </Button>
      </nav>
    </header>
  )
}
