import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '#beranda', label: 'Beranda' },
  { href: '#tentang-kami', label: 'Tentang Kami' },
  { href: '#katalog', label: 'Katalog & Harga' },
  { href: '#video-produksi', label: 'Video' },
  { href: '#kontak', label: 'Kontak' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-brand-dark via-brand-navy2 to-brand-brown backdrop-blur-md border-b border-brand-gold/20 shadow-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <a href="#beranda" className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Logo CV Baroqah Maju Jaya"
            className="w-12 h-12 object-contain rounded-xl bg-white p-1 border border-brand-gold/30 shadow-sm"
          />
          <div>
            <span className="block font-extrabold text-base sm:text-lg text-white tracking-tight">
              CV BAROQAH MAJU JAYA
            </span>
            <span className="block text-[10px] text-brand-gold tracking-wider font-semibold uppercase">
              Distributor Ayam Broiler
            </span>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-gray-200">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-brand-gold transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="https://wa.me/6285373078847"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-block px-5 py-2.5 rounded-xl bg-brand-gold text-brand-dark text-sm font-bold hover:bg-brand-goldhover transition-all shadow-md animate-wiggle"
          >
            Hubungi Admin
          </a>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-white p-2 rounded-xl bg-brand-brown hover:bg-brand-brownlight transition-all focus:outline-none"
            aria-label="Buka menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-gradient-to-b from-brand-dark to-brand-brown border-b border-brand-gold/20 px-6 py-6 space-y-4 text-center shadow-2xl">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-base font-semibold text-gray-200 hover:text-brand-gold py-2"
            >
              {l.label}
            </a>
          ))}
          <div className="pt-4 border-t border-brand-gold/20">
            <a
              href="https://wa.me/6285373078847"
              target="_blank"
              rel="noreferrer"
              className="block w-full py-3 rounded-xl bg-brand-gold text-brand-dark font-bold text-sm shadow-md"
            >
              Hubungi Admin
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
