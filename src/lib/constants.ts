import type { Camiseta } from '@/supabase'

export const WHATSAPP = '573118912962'
export const WHATSAPP_DISPLAY = '+57 311 891 2962'
export const MARCA = "Tu Camisa Pal' Mundial"
export const SLOGAN = 'La del mundo, a tu puerta'
export const UBICACION = 'Montería, Córdoba, Colombia'

export const SEXOS = ['Masculino', 'Femenino'] as const

/** Placeholder monocromo (silueta de camiseta) cuando no hay foto. */
export const FALLBACK_IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600' viewBox='0 0 24 24'%3E%3Crect width='24' height='24' fill='%23262626'/%3E%3Cpath d='M8.5 3 4 5.5 5.8 9l2.2-1v11h8V8l2.2 1L20 5.5 15.5 3a3.5 3.5 0 0 1-7 0Z' fill='none' stroke='%23555555' stroke-width='0.8' stroke-linejoin='round'/%3E%3C/svg%3E"

const cop = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})
export const formatPrecio = (n: number) => cop.format(n)

export function whatsappLink(c: Camiseta, talla: string, sexo: string) {
  const msg =
    `Hola, quiero pedir la camiseta de ${c.pais}. ` +
    `Tipo: ${c.tipo}. Talla: ${talla}. Sexo: ${sexo}. Horma: ${c.horma.toUpperCase()}. ` +
    `Precio: ${formatPrecio(c.precio)}. ¿Está disponible?`
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`
}
