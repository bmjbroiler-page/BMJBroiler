export default function Footer() {
  return (
    <footer className="bg-brand-footer text-white pt-16 pb-24 sm:pb-16 border-t border-brand-green">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img
              src="/logo.png"
              alt="Logo CV Baroqah Maju Jaya"
              className="w-10 h-10 object-contain rounded-xl bg-white p-1 border border-brand-gold/30 shadow-sm"
            />
            <span className="font-extrabold text-base text-white">CV Baroqah Maju Jaya</span>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            Pusat penyedia ayam broiler hidup, karkas, dan filet berkualitas tinggi untuk skala
            besar dan kecil di Palembang.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold text-brand-gold uppercase tracking-wider mb-4">Navigasi Cepat</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#tentang-kami" className="hover:text-white transition-colors">Tentang Kami</a></li>
            <li><a href="#visi-misi" className="hover:text-white transition-colors">Visi &amp; Misi</a></li>
            <li><a href="#katalog" className="hover:text-white transition-colors">Katalog Produk</a></li>
            <li><a href="#video-produksi" className="hover:text-white transition-colors">Video Produksi</a></li>
            <li><a href="#berita" className="hover:text-white transition-colors">Berita &amp; Informasi</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold text-brand-gold uppercase tracking-wider mb-4">Kontak Admin</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Admin 1: 0853-7307-8847</li>
            <li>Admin 2: 0882-4561-5496</li>
            <li>Admin 3: 0882-4561-5483</li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold text-brand-gold uppercase tracking-wider mb-4">Alamat RPU</h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            Jl. Panti Sosial Rt 24 Rw 09, Kel. Kebun Bunga, Kec. Sukarami Km 10, Palembang.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-brand-green/40 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
        <p>&copy; {new Date().getFullYear()} CV Baroqah Maju Jaya. All Rights Reserved.</p>
        <p>
          Created by{' '}
          <a
            href="https://futuralink.id"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-gold hover:underline font-medium"
          >
            Futura Link
          </a>
        </p>
      </div>
    </footer>
  )
}