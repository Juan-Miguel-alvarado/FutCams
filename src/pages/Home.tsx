import { useMemo, useState } from 'react'
import {
  ArrowRight,
  SearchX,
  TriangleAlert,
  Clock,
  MessageCircle,
  BadgeCheck,
  Truck,
  SlidersHorizontal,
  X,
  Check,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { CamisetaCard, CardSkeleton } from '@/components/CamisetaCard'
import { WhatsappIcon } from '@/components/icons'
import { Reveal } from '@/components/Reveal'
import { Marquee } from '@/components/Marquee'
import { useCamisetas } from '@/lib/useCamisetas'
import { SLOGAN, UBICACION, WHATSAPP } from '@/lib/constants'

const TODOS = 'Todos'

/** Etiqueta "eyebrow" sobria sobre cada sección. */
function SectionLabel({ children }: { children: string }) {
  return (
    <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
      {children}
    </span>
  )
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: string[]
}) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as string)}>
      <SelectTrigger
        className="h-10 w-full transition-colors hover:border-foreground/30 sm:w-auto sm:min-w-[9.5rem]"
        data-size="default"
      >
        <span className="text-muted-foreground">{label}</span>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o} value={o}>
            {o}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

/* ── Hero ─────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-background text-foreground">
      {/* Mosaico de camisetas reales de varias selecciones, difuminado hacia el negro */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-70"
        style={{ backgroundImage: "url('/hero-jerseys.jpg')" }}
      />
      {/* Capas de degradado: oscurece la izquierda (texto) y funde con la página */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-background/60" />
      <div className="relative mx-auto w-full max-w-7xl px-4 py-24 sm:px-6">
        <div className="max-w-2xl">
          <Reveal>
            <Badge variant="secondary" className="rounded-full">
              {UBICACION}
            </Badge>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-6 text-5xl font-bold tracking-tight sm:text-7xl">
              Viste los colores del mundo
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Camisetas de selecciones en calidad{' '}
              <strong className="font-semibold text-foreground">1.1</strong> y{' '}
              <strong className="font-semibold text-foreground">Conjunto AAA</strong>. Desde $60.000
              COP, con entregas todos los jueves en Montería. {SLOGAN}.
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button render={<a href="#catalogo" />} size="lg" className="group h-12 px-8 text-base">
                Ver catálogo
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button
                render={<a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" />}
                size="lg"
                variant="outline"
                className="h-12 px-8 text-base"
              >
                <WhatsappIcon className="size-5" /> Pedir por WhatsApp
              </Button>
            </div>
          </Reveal>
          <Reveal delay={480}>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {['+10 selecciones', 'Calidad 1.1 y Conjunto AAA', 'Entrega todos los jueves'].map(
                (t) => (
                  <li key={t} className="flex items-center gap-2">
                    <Check className="size-4 text-foreground" strokeWidth={2.25} />
                    {t}
                  </li>
                ),
              )}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ── Catálogo + filtros ───────────────────────────────── */
function Catalogo() {
  const { camisetas, loading, error } = useCamisetas()
  const [pais, setPais] = useState(TODOS)
  const [tipo, setTipo] = useState(TODOS)
  const [sexo, setSexo] = useState(TODOS)

  const paises = useMemo(
    () => Array.from(new Set(camisetas.map((c) => c.pais))).sort(),
    [camisetas],
  )

  const filtradas = useMemo(
    () =>
      camisetas.filter(
        (c) =>
          (pais === TODOS || c.pais === pais) &&
          (tipo === TODOS || c.tipo === tipo) &&
          (sexo === TODOS || c.sexo === sexo),
      ),
    [camisetas, pais, tipo, sexo],
  )

  const activos = pais !== TODOS || tipo !== TODOS || sexo !== TODOS
  const limpiar = () => {
    setPais(TODOS)
    setTipo(TODOS)
    setSexo(TODOS)
  }

  // Filtros activos como "chips" removibles.
  const chips = [
    pais !== TODOS && { label: pais, clear: () => setPais(TODOS) },
    tipo !== TODOS && { label: tipo, clear: () => setTipo(TODOS) },
    sexo !== TODOS && { label: sexo, clear: () => setSexo(TODOS) },
  ].filter(Boolean) as { label: string; clear: () => void }[]

  return (
    <section id="catalogo" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <Reveal className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <SectionLabel>Catálogo</SectionLabel>
          <h2 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Encuentra tu camiseta
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Toca una camiseta para elegir talla y sexo, y pedir por WhatsApp.
          </p>
        </div>
        {!loading && !error && (
          <span className="shrink-0 rounded-full border bg-card px-3 py-1 text-sm text-muted-foreground">
            <strong className="font-semibold text-foreground">{filtradas.length}</strong>{' '}
            {filtradas.length === 1 ? 'camiseta' : 'camisetas'}
          </span>
        )}
      </Reveal>

      {/* Barra de filtros */}
      <Reveal variant="fade" delay={100} className="mb-12">
        <div className="rounded-2xl border bg-card p-3 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex shrink-0 items-center gap-2 px-1.5 text-sm font-medium">
              <SlidersHorizontal className="size-4 text-muted-foreground" strokeWidth={1.75} />
              Filtrar
            </div>
            <div className="grid grid-cols-1 gap-2 sm:flex sm:flex-1 sm:flex-wrap">
              <FilterSelect
                label="País"
                value={pais}
                onChange={setPais}
                options={[TODOS, ...paises]}
              />
              <FilterSelect
                label="Tipo"
                value={tipo}
                onChange={setTipo}
                options={[TODOS, '1.1', 'Conjunto AAA']}
              />
              <FilterSelect
                label="Sexo"
                value={sexo}
                onChange={setSexo}
                options={[TODOS, 'Masculino', 'Femenino']}
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={limpiar}
              className={
                'shrink-0 text-muted-foreground transition-opacity duration-300 hover:text-foreground ' +
                (activos ? 'opacity-100' : 'pointer-events-none opacity-0')
              }
            >
              <X className="size-4" /> Limpiar
            </Button>
          </div>

          {/* Chips de filtros activos */}
          {activos && (
            <div className="mt-3 flex flex-wrap items-center gap-2 border-t pt-3">
              <span className="px-1 text-xs uppercase tracking-wide text-muted-foreground">
                Activos
              </span>
              {chips.map((ch) => (
                <button
                  key={ch.label}
                  onClick={ch.clear}
                  className="group inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1 text-xs font-medium transition-colors duration-300 hover:border-foreground/30 hover:bg-accent"
                >
                  {ch.label}
                  <X className="size-3 text-muted-foreground transition-colors group-hover:text-foreground" />
                </button>
              ))}
            </div>
          )}
        </div>
      </Reveal>

      {error && (
        <div className="flex flex-col items-center rounded-xl border border-destructive/30 bg-destructive/5 p-12 text-center">
          <TriangleAlert className="size-8 text-destructive" />
          <p className="mt-3 font-semibold text-destructive">No pudimos cargar el catálogo.</p>
          <p className="mt-1 text-sm text-destructive/80">{error}</p>
        </div>
      )}

      {loading && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      )}

      {!loading && !error && filtradas.length === 0 && (
        <div className="flex flex-col items-center rounded-xl border bg-muted/30 p-16 text-center">
          <SearchX className="size-8 text-muted-foreground" strokeWidth={1.5} />
          <p className="mt-4 font-semibold">No hay camisetas con estos filtros.</p>
          <p className="mt-1 text-sm text-muted-foreground">Prueba limpiando los filtros.</p>
        </div>
      )}

      {!loading && !error && filtradas.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtradas.map((c, i) => (
            <Reveal key={c.id} delay={(i % 4) * 90} className="h-full">
              <CamisetaCard c={c} />
            </Reveal>
          ))}
        </div>
      )}
    </section>
  )
}

/* ── Entrega ──────────────────────────────────────────── */
function Entrega() {
  const pasos = [
    {
      Icon: MessageCircle,
      titulo: 'Haz tu pedido',
      desc: 'Elige tu camiseta, talla y escríbenos por WhatsApp.',
    },
    {
      Icon: BadgeCheck,
      titulo: 'Confirmación',
      desc: 'Confirmamos disponibilidad y precio por WhatsApp.',
    },
    {
      Icon: Truck,
      titulo: 'Entrega el jueves',
      desc: 'Recibe tu camiseta en Montería y alrededores.',
    },
  ]
  return (
    <section id="entrega" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <Reveal className="mb-14">
        <SectionLabel>Entrega</SectionLabel>
        <h2 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
          Cómo recibes tu pedido
        </h2>
        <p className="mt-3 text-muted-foreground">
          Entregas todos los jueves · Cobertura: {UBICACION}
        </p>
      </Reveal>

      <div className="relative grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
        {/* Línea que conecta los pasos (solo desktop) */}
        <div className="pointer-events-none absolute inset-x-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block" />

        {pasos.map((p, i) => (
          <Reveal key={p.titulo} delay={i * 140} className="relative">
            <div className="group flex flex-col items-center text-center">
              <div className="relative mb-5 flex size-18 items-center justify-center rounded-2xl border bg-card shadow-sm transition-[transform,box-shadow] duration-500 ease-out group-hover:-translate-y-1.5 group-hover:shadow-lg">
                <p.Icon className="size-7 transition-transform duration-500 ease-out group-hover:scale-110" strokeWidth={1.6} />
                <span className="absolute -right-2 -top-2 flex size-7 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-sm transition-transform duration-500 ease-out group-hover:scale-110">
                  {i + 1}
                </span>
              </div>
              <h3 className="text-lg font-semibold">{p.titulo}</h3>
              <p className="mt-2 max-w-[15rem] text-sm text-muted-foreground">{p.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal
        variant="fade"
        delay={200}
        className="mx-auto mt-14 flex max-w-md items-center justify-center gap-2.5 rounded-xl border bg-muted/50 px-5 py-4 text-center text-sm text-muted-foreground"
      >
        <Clock className="size-4 shrink-0" strokeWidth={1.75} />
        Haz tu pedido antes del miércoles para recibir ese mismo jueves.
      </Reveal>
    </section>
  )
}

/* ── FAQ ──────────────────────────────────────────────── */
function FAQ() {
  const preguntas = [
    {
      q: '¿Cuándo llegan los pedidos?',
      a: 'Hacemos entregas todos los jueves. Necesitamos aproximadamente 1 semana de anticipación, así que pide antes del miércoles para recibir ese jueves.',
    },
    {
      q: '¿Cómo sé mi talla?',
      a: 'Manejamos tallas S, M, L, XL y XXL según el modelo. Cuéntanos tu talla habitual por WhatsApp y te asesoramos según la horma (Slim, Regular u Oversized).',
    },
    {
      q: '¿Cuál es la diferencia entre 1.1 y Conjunto AAA?',
      a: 'La 1.1 es calidad alta (la camiseta más fiel al original). El Conjunto AAA es calidad media e incluye camisa + pantaloneta. Ambas son excelentes opciones según tu presupuesto.',
    },
    {
      q: '¿Hacen envíos fuera de Montería?',
      a: 'Nuestra cobertura principal es Montería, Córdoba y alrededores. Para otras zonas escríbenos por WhatsApp y miramos cómo ayudarte.',
    },
    {
      q: '¿Puedo pedir varios productos?',
      a: 'Claro. Puedes pedir todas las camisetas que quieras. Escríbenos por WhatsApp con tu lista y coordinamos la entrega del jueves.',
    },
  ]

  return (
    <section id="faq" className="border-t bg-muted/30">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* Columna izquierda: título + CTA (fija al hacer scroll en desktop) */}
        <Reveal className="lg:sticky lg:top-24 lg:self-start">
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Preguntas frecuentes
          </h2>
          <p className="mt-4 max-w-sm text-muted-foreground">
            ¿No encuentras lo que buscas? Escríbenos y te respondemos al instante.
          </p>
          <Button
            render={<a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" />}
            className="mt-6"
          >
            <WhatsappIcon className="size-4" /> Pregúntanos por WhatsApp
          </Button>
        </Reveal>

        {/* Columna derecha: cada pregunta es una tarjeta independiente */}
        <div className="flex flex-col gap-3">
          {preguntas.map((p, i) => (
            <Reveal key={i} variant="fade" delay={i * 70}>
              <Accordion>
                <AccordionItem
                  value={`item-${i}`}
                  className="rounded-xl border bg-card px-5 shadow-sm transition-colors duration-300 hover:border-foreground/20"
                >
                  <AccordionTrigger className="py-4 text-left text-base font-medium hover:no-underline">
                    {p.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {p.a}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Home() {
  return (
    <>
      <Hero />
      <Marquee
        items={[
          'Argentina',
          'Brasil',
          'Colombia',
          'España',
          'Francia',
          'Italia',
          'Alemania',
          'Portugal',
          'México',
          'Inglaterra',
          'Calidad 1.1',
          'Conjunto AAA',
          'Entrega los jueves',
        ]}
      />
      <Catalogo />
      <Entrega />
      <FAQ />
    </>
  )
}
