import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://mxrhugvilkzcryfuqtpb.supabase.co'
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14cmh1Z3ZpbGt6Y3J5ZnVxdHBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzNzY2NTMsImV4cCI6MjA5NTk1MjY1M30.eyATxpOD3ILQy1Su7ACB_VG06X56LoCmpCbuPicYUZU'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export type Camiseta = {
  id: string
  pais: string
  tipo: string
  tallas: string[]
  sexo: string
  horma: string
  precio: number
  foto_url: string | null
  disponible: boolean
  destacado: boolean
  created_at: string
}
