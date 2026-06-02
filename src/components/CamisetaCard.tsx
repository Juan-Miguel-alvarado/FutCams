import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { FALLBACK_IMG, formatPrecio } from '@/lib/constants'
import type { Camiseta } from '@/supabase'

/**
 * Card estilo Adidas: imagen a sangre, sin bordes redondeados.
 * Solo muestra el tipo (conjunto) y la horma. Al hacer clic lleva al detalle,
 * donde se elige talla y sexo.
 */
export function CamisetaCard({ c }: { c: Camiseta }) {
  const [imgError, setImgError] = useState(false)
  const agotado = !c.disponible

  return (
    <Link
      to={`/camiseta/${c.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card shadow-sm outline-none transition-[transform,box-shadow,border-color] duration-500 ease-out hover:-translate-y-1.5 hover:border-foreground/20 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={imgError || !c.foto_url ? FALLBACK_IMG : c.foto_url}
          alt={`Camiseta ${c.pais} ${c.tipo}`}
          loading="lazy"
          onError={() => setImgError(true)}
          className={
            'size-full object-cover transition-transform duration-700 ease-out group-hover:scale-110' +
            (agotado ? ' grayscale' : '')
          }
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {c.destacado && <Badge>Destacado</Badge>}
          {agotado && <Badge variant="destructive">Agotado</Badge>}
        </div>

        {/* Indicador "ver" */}
        <div className="absolute bottom-3 right-3 flex size-9 translate-y-2 items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 shadow-sm transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          <Plus className="size-4" />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold leading-tight">{c.pais}</h3>
          <span className="whitespace-nowrap text-base font-semibold">
            {formatPrecio(c.precio)}
          </span>
        </div>
        {/* En la card solo el tipo (conjunto) y la horma */}
        <p className="text-sm text-muted-foreground">
          {c.tipo} · Horma {c.horma}
        </p>
      </div>
    </Link>
  )
}

export function CardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm">
      <div className="aspect-square w-full animate-pulse bg-muted" />
      <div className="space-y-2 p-4">
        <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
      </div>
    </div>
  )
}
