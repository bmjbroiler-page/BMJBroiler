const testimonials = [
  {
    quote:
      '"Pasokan ayam broiler dari CV Baroqah Maju Jaya selalu tepat waktu. Kualitas karkasnya sangat bersih dan segar untuk kebutuhan restoran kami di Palembang."',
    name: 'Bapak H. Abdullah',
    role: 'Pengelola Rumah Makan Padang',
  },
  {
    quote:
      '"Adminnya sangat responsif dan ramah. Membeli ayam hidup skala kecil maupun besar dilayani dengan sangat profesional. Harga sangat bersaing!"',
    name: 'Ibu Siti Aminah',
    role: 'Pedagang Pasar Tradisional',
  },
  {
    quote:
      '"Dada ayam filetnya sangat segar dan higienis. Sangat membantu operasional katering harian kami tanpa perlu repot membersihkan ulang."',
    name: 'Chef Hendra',
    role: 'Owner Katering Komersial',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonial" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-4 py-1.5 rounded-xl bg-brand-green/10 text-brand-green text-xs font-bold uppercase tracking-widest inline-block mb-4">
            Testimoni Mitra
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight mb-4">
            Apa Kata Pelanggan Kami?
          </h2>
          <p className="text-gray-600">Kepercayaan mitra bisnis adalah bukti nyata kualitas pelayanan kami.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-brand-bg p-8 rounded-3xl border border-gray-200 shadow-sm">
              <p className="text-gray-700 text-sm italic mb-6">{t.quote}</p>
              <h4 className="font-bold text-brand-dark">{t.name}</h4>
              <span className="text-xs text-gray-500">{t.role}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
