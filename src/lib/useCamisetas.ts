import { useEffect, useState } from 'react'
import { supabase, type Camiseta } from '@/supabase'

/**
 * Carga las camisetas desde Supabase y se mantiene sincronizado en tiempo real:
 * cualquier INSERT/UPDATE/DELETE en la tabla refresca el catálogo sin recargar.
 */
export function useCamisetas() {
  const [camisetas, setCamisetas] = useState<Camiseta[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let activo = true

    async function cargar() {
      const { data, error } = await supabase
        .from('camisetas')
        .select('*')
        .order('destacado', { ascending: false })
        .order('created_at', { ascending: true })
      if (!activo) return
      if (error) {
        setError(error.message)
      } else {
        setCamisetas((data as Camiseta[]) ?? [])
        setError(null)
      }
      setLoading(false)
    }

    cargar()

    const canal = supabase
      .channel('camisetas-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'camisetas' }, () => {
        cargar()
      })
      .subscribe()

    return () => {
      activo = false
      supabase.removeChannel(canal)
    }
  }, [])

  return { camisetas, loading, error }
}
