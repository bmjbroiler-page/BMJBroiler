import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { supabase } from '../supabaseClient';
import SEO from './SEO';

export default function Hero() {
  const [slides, setSlides] = useState([]);
  const [active, setActive] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSliders = async () => {
      const { data, error } = await supabase
        .from('sliders')
        .select('*')
        .order('id', { ascending: false });

      if (!error && data && data.length > 0) {
        setSlides(data);
      } else {
        setSlides([
          {
            title: 'CV. BAROQAH MAJU JAYA',
            subtitle: 'Distributor Ayam Broiler Berkualitas - Melayani Sekala Besar & Kecil',
            image_url: '/0fb7950f-d79c-4458-9aa7-cc5c9fef1cac.png',
          }
        ]);
      }
      setIsLoading(false);
    };

    fetchSliders();
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, [slides]);

  if (isLoading) {
    return <div className="min-h-screen bg-slate-900 flex items-center justify-center font-bold text-slate-400">Memuat tampilan utama...</div>;
  }

  const slide = slides[active];
  const imageUrl = slide.image_url.startsWith('http') ? slide.image_url : `/${slide.image_url}`;

  return (
    <section id="beranda" className="relative bg-slate-900 text-white py-24 lg:py-32 overflow-hidden">

      <SEO
        title={`${slide.title || 'Baroqah Maju Jaya'} | Distributor Ayam Broiler`}
        description={slide.subtitle || 'Distributor ayam broiler berkualitas di Palembang.'}
      />

      {/* Background Gambar */}
      <div
        className="absolute inset-0 z-0 opacity-50 transition-all duration-1000 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />

      {/* Overlay Gradien: Menggunakan Slate (Abu-abu gelap) bukan biru murni */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900/20 z-0" />

      {/* Elemen Dekorasi Hiasan Biru (Tipis di sudut) */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Sisi Kiri: Teks Konten */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">

            <span className="px-5 py-2 rounded-full bg-slate-800/80 border border-slate-700 text-blue-400 text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              Pilihan Utama Palembang
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white drop-shadow-lg transition-all duration-500">
              {slide.title || 'CV. BAROQAH MAJU JAYA'}
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium transition-all duration-500">
              {slide.subtitle || 'Menyediakan bermacam-macam jenis ayam broiler skala besar & skala kecil dengan jaminan mutu terbaik langsung dari RPU.'}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href="#products"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/50 text-center border border-blue-500"
              >
                Lihat Katalog &amp; Harga
              </a>
              <a
                href="https://wa.me/6285373078847"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-800/80 backdrop-blur-sm border-2 border-slate-700 text-slate-200 font-bold hover:border-blue-500 hover:text-white transition-all text-center"
              >
                Hubungi Admin
              </a>
            </div>

            {/* Indikator Slider (Dots) */}
            {slides.length > 1 && (
              <div className="flex items-center justify-center lg:justify-start gap-2 pt-6">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${active === i ? 'w-8 bg-blue-500' : 'w-2 bg-slate-600 hover:bg-slate-400'
                      }`}
                    aria-label={`Pindah ke slide ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Sisi Kanan: Glassmorphism Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative bg-slate-800/40 backdrop-blur-xl p-8 rounded-3xl border border-slate-700/50 shadow-2xl text-center max-w-sm w-full transform transition-transform hover:-translate-y-2 duration-500">

              {/* Badge "Kualitas Premium" */}
              <div className="absolute -top-4 -right-4 bg-blue-600 text-white text-xs font-black uppercase px-4 py-2 rounded-xl shadow-lg shadow-blue-900/50 rotate-6 border border-blue-400">
                Kualitas Premium
              </div>

              <div className="w-24 h-24 mx-auto rounded-full bg-slate-900 border-4 border-slate-700 flex items-center justify-center mb-6 shadow-md overflow-hidden p-3">
                <img src="/logo.png" alt="Logo BMJ" className="w-full h-full object-contain drop-shadow-sm" />
              </div>

              <h3 className="text-xl font-extrabold text-white mb-1">KEPUASAN ANDA</h3>
              <p className="text-blue-400 font-extrabold text-2xl tracking-widest mb-6 drop-shadow-sm">PRIORITAS KAMI</p>

              <div className="space-y-3 text-sm text-slate-300 border-t border-slate-700/80 pt-5 text-left font-semibold">
                {['Skala Besar & Skala Kecil', 'Pemotongan Higienis & Halal', 'Harga Bersaing Setiap Hari'].map((t) => (
                  <p key={t} className="flex items-center gap-3">
                    <Check size={18} className="text-white shrink-0 bg-blue-600 p-0.5 rounded-full" /> {t}
                  </p>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}