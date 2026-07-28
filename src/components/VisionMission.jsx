export default function VisionMission() {
  return (
    <section id="visi-misi" className="py-20 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-4 py-1.5 rounded-xl bg-brand-green/10 text-brand-green text-xs font-bold uppercase tracking-widest inline-block mb-4">
            Landasan Kerja
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
            Visi &amp; Misi Perusahaan
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200">
            <div className="w-12 h-12 rounded-xl bg-brand-green text-white flex items-center justify-center font-bold text-lg mb-6 shadow-md">
              01
            </div>
            <h3 className="text-2xl font-bold text-brand-dark mb-4">Visi Utama</h3>
            <p className="text-gray-600 leading-relaxed">
              Menjadi distributor ayam broiler terdepan, terpercaya, dan terbesar yang
              menyediakan produk higienis dengan pelayanan terbaik di tingkat regional
              maupun nasional.
            </p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200">
            <div className="w-12 h-12 rounded-xl bg-brand-green text-white flex items-center justify-center font-bold text-lg mb-6 shadow-md">
              02
            </div>
            <h3 className="text-2xl font-bold text-brand-dark mb-4">Misi Strategis</h3>
            <ul className="space-y-3 text-gray-600 text-sm leading-relaxed">
              <li>• Menyediakan produk ayam broiler segar dan berkualitas tinggi skala besar maupun kecil.</li>
              <li>• Menerapkan standar pemotongan yang halal, bersih, dan higienis.</li>
              <li>• Membangun hubungan kemitraan jangka panjang yang saling menguntungkan dengan pelanggan.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
