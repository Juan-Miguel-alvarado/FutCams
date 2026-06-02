import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, TriangleAlert, Truck, ShieldCheck, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { WhatsappIcon } from '@/components/icons'
import { Reveal } from '@/components/Reveal'
import { supabase, type Camiseta } from '@/supabase'
import {
  FALLBACK_IMG,
  formatPrecio,
  SEXOS,
  UBICACION,
  WHATSAPP,
  whatsappLink,
} from '@/lib/constants'

export function Detalle() {
  const { id } = useParams<{ id: string }>()
  const [c, setC] = useState<Camiseta | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [talla, setTalla] = useState('')
  const [sexo, setSexo] = useState('')
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    let activo = true
    async function cargar() {
      setLoading(true)
      const { data, error } = await supabase
        .from('camisetas')
        .select('*')
        .eq('id', id)
        .maybeSingle()
      if (!activo) return
      if (error) {
        setError(error.message)
      } else if (!data) {
        setError('Camiseta no encontrada.')
      } else {
        const cam = data as Camiseta
        setC(cam)
        setTalla(cam.tallas[0] ?? '')
        // Si el sexo guardado ya no es una opción ofrecida (p. ej. "Unisex"),
        // caemos a la primera opción válida para que siempre haya una seleccionada.
        setSexo(SEXOS.includes(cam.sexo as (typeof SEXOS)[number]) ? cam.sexo : SEXOS[0])
        setError(null)
      }
      setLoading(false)
    }
    cargar()
    return () => {
      activo = false
    }
  }, [id])

  if (loading) {
    return (
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2">
        <div className="aspect-square w-full animate-pulse rounded-xl bg-muted" />
        <div className="space-y-4">
          <div className="h-10 w-2/3 animate-pulse rounded bg-muted" />
          <div className="h-6 w-1/3 animate-pulse rounded bg-muted" />
          <div className="h-24 w-full animate-pulse rounded bg-muted" />
          <div className="h-12 w-full animate-pulse rounded bg-muted" />
        </div>
      </div>
    )
  }

  if (error || !c) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
        <TriangleAlert className="size-9 text-muted-foreground" strokeWidth={1.5} />
        <h1 className="mt-5 text-3xl font-bold tracking-tight">{error ?? 'Algo salió mal'}</h1>
        <Button render={<Link to="/" />} className="mt-6 h-11 px-6">
          Volver al catálogo
        </Button>
      </div>
    )
  }

  const agotado = !c.disponible

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Link
        to="/#catalogo"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> Volver al catálogo
      </Link>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* Imagen */}
        <Reveal variant="fade" className="group relative aspect-square overflow-hidden rounded-xl border bg-muted shadow-sm">
          <img
            src={imgError || !c.foto_url ? FALLBACK_IMG : c.foto_url}
            alt={`Camiseta ${c.pais} ${c.tipo}`}
            onError={() => setImgError(true)}
            className={
              'size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105' +
              (agotado ? ' grayscale' : '')
            }
          />
          <div className="absolute left-4 top-4 flex flex-col gap-2">
            {c.destacado && <Badge>Destacado</Badge>}
            {agotado && <Badge variant="destructive">Agotado</Badge>}
          </div>
        </Reveal>

        {/* Info + selección */}
        <Reveal variant="up" delay={120} className="flex flex-col">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{c.pais}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{c.tipo}</Badge>
            <Badge variant="secondary">Horma {c.horma}</Badge>
          </div>
          <p className="mt-5 text-3xl font-semibold">{formatPrecio(c.precio)}</p>

          <Separator className="my-6" />

          {/* Sexo */}
          <div className="mb-6">
            <p className="mb-2 text-sm font-medium">Sexo</p>
            <div className="flex flex-wrap gap-2">
              {SEXOS.map((s) => (
                <button
                  key={s}
                  onClick={() => setSexo(s)}
                  disabled={agotado}
                  className={
                    'rounded-md border px-4 py-2 text-sm font-medium transition-[transform,background-color,border-color,color] duration-200 active:scale-95 disabled:opacity-40 ' +
                    (sexo === s
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-input bg-background hover:bg-accent')
                  }
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Talla */}
          <div className="mb-8">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-medium">Talla</p>
              <a
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-muted-foreground underline-offset-2 transition-colors hover:text-foreground hover:underline"
              >
                ¿No sabes tu talla?
              </a>
            </div>
            <div className="flex flex-wrap gap-2">
              {c.tallas.map((t) => (
                <button
                  key={t}
                  onClick={() => setTalla(t)}
                  disabled={agotado}
                  className={
                    'min-w-11 rounded-md border px-3 py-2 text-sm font-medium transition-[transform,background-color,border-color,color] duration-200 active:scale-95 disabled:opacity-40 ' +
                    (talla === t
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-input bg-background hover:bg-accent')
                  }
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Button
            render={
              agotado ? (
                <button type="button" />
              ) : (
                <a href={whatsappLink(c, talla, sexo)} target="_blank" rel="noreferrer" />
              )
            }
            disabled={agotado}
            size="lg"
            className="h-13 w-full text-base font-medium"
          >
            <WhatsappIcon className="size-5" />
            {agotado ? 'Agotado' : 'Pedir por WhatsApp'}
          </Button>

          {/* Garantías */}
          <div className="mt-6 grid gap-3 rounded-xl border bg-card p-4 text-sm text-muted-foreground shadow-sm">
            <div className="flex items-center gap-2.5">
              <Truck className="size-4 shrink-0 text-muted-foreground" strokeWidth={1.75} />
              <span>
                Entrega todos los jueves en <span className="text-foreground">{UBICACION}</span>
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="size-4 shrink-0 text-muted-foreground" strokeWidth={1.75} />
              <span>
                Calidad premium <span className="text-foreground">{c.tipo}</span>
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <MessageCircle className="size-4 shrink-0 text-muted-foreground" strokeWidth={1.75} />
              <span>Coordinamos todo por WhatsApp, sin complicaciones</span>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
