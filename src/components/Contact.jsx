function cleanWa(number) {
  const digits = number.replace(/\D/g, '')
  return digits.startsWith('0') ? '62' + digits.slice(1) : digits
}

const admins = [
  { label: 'ADMIN 1', phone: '0853-7307-8847' },
  { label: 'ADMIN 2', phone: '0882-4561-5496' },
  { label: 'ADMIN 3', phone: '0882-4561-5483' },
]

export default function Contact() {
  return (
    <section id="kontak" className="py-20 bg-brand-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-4 py-1.5 rounded-xl bg-brand-gold/20 text-brand-gold text-xs font-bold uppercase tracking-widest inline-block mb-4 border border-brand-gold/30">
            Hubungi Kami
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Pesan Langsung via WhatsApp Admin
          </h2>
          <p className="text-gray-300">Pilih admin di bawah ini untuk konsultasi atau pemesanan cepat.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {admins.map((a) => (
            <div
              key={a.label}
              className="bg-brand-card p-6 rounded-3xl border border-brand-green text-center shadow-xl"
            >
              <h3 className="font-bold text-lg mb-2 text-brand-gold">{a.label}</h3>
              <p className="text-sm text-gray-300 mb-6">{a.phone}</p>
              <a
                href={`https://wa.me/${cleanWa(a.phone)}`}
                target="_blank"
                rel="noreferrer"
                className="block w-full py-3 rounded-xl bg-brand-gold text-brand-dark font-bold text-sm hover:bg-brand-goldhover transition-all"
              >
                Chat {a.label}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
