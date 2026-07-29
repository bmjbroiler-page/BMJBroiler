import { useEffect } from 'react';

export default function Testimonials() {
  useEffect(() => {
    // Menyuntikkan script Elfsight secara aman ke dalam React
    const script = document.createElement('script');
    script.src = "https://elfsightcdn.com/platform.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Membersihkan script saat komponen tidak lagi dirender (misal pindah halaman)
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <section id="testimonial" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER TETAP PAKAI DESAIN ASLI LU BIAR SENADA DENGAN WEB */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-4 py-1.5 rounded-xl bg-brand-green/10 text-brand-green text-xs font-bold uppercase tracking-widest inline-block mb-4">
            Testimoni Mitra
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight mb-4">
            Apa Kata Pelanggan Kami?
          </h2>
          <p className="text-gray-600">
            Kepercayaan mitra bisnis adalah bukti nyata kualitas pelayanan kami langsung dari Google.
          </p>
        </div>

        {/* AREA WIDGET LIVE PREVIEW DARI ELFSIGHT */}
        <div className="w-full min-h-[400px] flex justify-center">
          <div
            className="elfsight-app-da7ebc4a-6fba-498c-b3a2-f4ba86d267b4"
            data-elfsight-app-lazy="true"
            style={{ width: '100%' }}
          ></div>
        </div>

      </div>
    </section>
  );
}