export default function About() {
  const admins = [
    { label: 'Admin 1', phone: '0853-7307-8847' },
    { label: 'Admin 2', phone: '0882-4561-5496' },
    { label: 'Admin 3', phone: '0882-4561-5483' },
  ]

  return (
    <section id="tentang-kami" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-6 space-y-6">
            <span className="px-4 py-1.5 rounded-xl bg-brand-green/10 text-brand-green text-xs font-bold uppercase tracking-widest inline-block">
              Tentang Perusahaan
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
              CV. Baroqah Maju Jaya Distributor Ayam Broiler Terpercaya
            </h2>
            <p className="text-gray-600 leading-relaxed text-base">
              Kami adalah pusat penyedia dan Rumah Pemotongan Unggas (RPU) yang melayani
              kebutuhan ayam broiler segar berkualitas tinggi di wilayah Palembang dan
              sekitarnya. Kami berkomitmen untuk selalu menjaga standar kebersihan,
              kesehatan hewan, serta ketepatan waktu pengiriman.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-brand-bg border border-gray-200">
                <h4 className="font-extrabold text-brand-green text-xl mb-1">100%</h4>
                <p className="text-xs text-gray-600">Halal &amp; Higienis</p>
              </div>
              <div className="p-4 rounded-2xl bg-brand-bg border border-gray-200">
                <h4 className="font-extrabold text-brand-green text-xl mb-1">Skala</h4>
                <p className="text-xs text-gray-600">Besar &amp; Kecil Dilayani</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-brand-dark p-8 rounded-3xl text-white shadow-xl border border-brand-green">
              <h3 className="text-2xl font-bold mb-4 text-brand-gold">Alamat &amp; Lokasi RPU</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Jl. Panti Sosial Rt 24 Rw 09, Kel. Kebun Bunga, Kec. Sukarami Km 10, Palembang.
              </p>
              <div className="border-t border-brand-green pt-6 space-y-4">
                <h4 className="font-bold text-sm text-brand-gold">Kontak Admin Pemesanan:</h4>
                <div className="text-sm space-y-1 text-gray-300">
                  {admins.map((a) => (
                    <p key={a.label}>• {a.label}: {a.phone}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-200">
          <div className="bg-brand-dark text-white p-4 font-bold text-center text-sm tracking-wider uppercase">
            Peta Lokasi Rumah Pemotongan Unggas (RPU) CV Baroqah Maju Jaya
          </div>
          <div className="w-full h-96 bg-gray-200">
            <iframe
              title="Lokasi RPU CV Baroqah Maju Jaya"
              src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d4181.8097867284005!2d104.7070857!3d-2.9159329!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMsKwNTQnNTUuOCJTIDEwNMKwNDInMjkuMyJF!5e1!3m2!1sid!2sid!4v1785258565426!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
