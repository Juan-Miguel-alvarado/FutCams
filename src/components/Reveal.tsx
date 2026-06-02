import { useEffect, useRef, useState, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  /** Retraso en ms para escalonar (stagger) varios elementos. */
  delay?: number
  /** "up" = entra deslizando hacia arriba; "fade" = solo aparece. */
  variant?: 'up' | 'fade'
}

/**
 * Revela su contenido cuando entra en pantalla (IntersectionObserver).
 * El movimiento real vive en index.css, detrás de prefers-reduced-motion,
 * así que con "menos movimiento" el contenido se ve estático y completo.
 */
export function Reveal({ children, className = '', delay = 0, variant = 'up' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const base = variant === 'fade' ? 'reveal-fade' : 'reveal'
  return (
    <div
      ref={ref}
      className={`${base}${visible ? ' is-visible' : ''}${className ? ' ' + className : ''}`}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
