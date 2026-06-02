import { Star } from 'lucide-react'

/**
 * Cinta horizontal en bucle infinito, sobria (texto muted en mayúsculas).
 * Avanza siempre, incluso con el mouse encima; solo se detiene con
 * prefers-reduced-motion.
 */
export function Marquee({ items }: { items: string[] }) {
  const Track = () => (
    <div className="flex shrink-0 items-center" aria-hidden>
      {items.map((t, i) => (
        <span key={`${t}-${i}`} className="flex items-center">
          <span className="px-6 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {t}
          </span>
          <Star className="size-2.5 shrink-0 fill-muted-foreground/40 text-muted-foreground/40" />
        </span>
      ))}
    </div>
  )

  return (
    <div className="marquee-group relative flex overflow-hidden border-y bg-card/40 py-4">
      <div className="flex animate-marquee whitespace-nowrap">
        <Track />
        <Track />
      </div>
      {/* Degradados laterales que funden la cinta con el fondo */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent sm:w-32" />
    </div>
  )
}
