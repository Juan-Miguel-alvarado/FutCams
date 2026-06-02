import { Link } from 'react-router-dom'
import { MapPin, Truck, Clock, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { JerseyIcon, WhatsappIcon } from '@/components/icons'
import { MARCA, SLOGAN, UBICACION, WHATSAPP, WHATSAPP_DISPLAY } from '@/lib/constants'

const NAV = [
  { label: 'Catálogo', to: '/#catalogo' },
  { label: 'Entrega', to: '/#entrega' },
  { label: 'FAQ', to: '/#faq' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t bg-card text-card-foreground">
      {/* Llamado a la acción */}
      <div className="border-b">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
              ¿Listo para vestir los colores del mundo?
            </h3>
            <p className="mt-2 max-w-lg text-muted-foreground">
              Pídela por WhatsApp y recíbela el próximo jueves en {UBICACION}.
            </p>
          </div>
          <Button
            render={<a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" />}
            size="lg"
            className="h-12 shrink-0 px-8 text-base"
          >
            <WhatsappIcon className="size-5" /> Pedir por WhatsApp
          </Button>
        </div>
      </div>

      {/* Columnas */}
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <Link to="/" aria-label={MARCA} className="flex items-center gap-2">
            <JerseyIcon className="size-6" />
            <span className="text-lg font-bold tracking-tight">{MARCA}</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            {SLOGAN}. Camisetas de selecciones en calidad 1.1 y Conjunto AAA.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Navegación</h4>
          <ul className="mt-3 space-y-2.5">
            {NAV.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                  <ArrowUpRight className="size-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Contacto</h4>
          <ul className="mt-3 space-y-2.5">
            <li>
              <a
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <WhatsappIcon className="size-4" /> {WHATSAPP_DISPLAY}
              </a>
            </li>
            <li className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-4 shrink-0" strokeWidth={1.5} /> {UBICACION}
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Entregas</h4>
          <ul className="mt-3 space-y-2.5">
            <li className="flex items-center gap-2 text-sm text-muted-foreground">
              <Truck className="size-4 shrink-0" strokeWidth={1.5} /> Todos los jueves
            </li>
            <li className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="size-4 shrink-0" strokeWidth={1.5} /> Pide con 1 semana
            </li>
          </ul>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <span>
            © {year} {MARCA}. Todos los derechos reservados.
          </span>
          <span>Hecho en Montería, Córdoba</span>
        </div>
      </div>
    </footer>
  )
}
