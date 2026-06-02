import { WhatsappIcon } from '@/components/icons'
import { WHATSAPP } from '@/lib/constants'

export function FloatingWhatsapp() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg shadow-black/20 transition-transform hover:scale-110 active:scale-95"
    >
      <span className="pulse-ring absolute inset-0 -z-10 rounded-full bg-whatsapp" aria-hidden />
      <WhatsappIcon className="size-7" />
    </a>
  )
}
