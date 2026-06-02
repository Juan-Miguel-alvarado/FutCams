import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { FloatingWhatsapp } from '@/components/FloatingWhatsapp'
import { Home } from '@/pages/Home'
import { Detalle } from '@/pages/Detalle'

/** Al cambiar de ruta sube al inicio; si la URL trae un hash, hace scroll a él. */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo({ top: 0 })
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <div className="flex min-h-svh flex-col">
      <ScrollManager />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/camiseta/:id" element={<Detalle />} />
        </Routes>
      </main>
      <Footer />
      <FloatingWhatsapp />
    </div>
  )
}
