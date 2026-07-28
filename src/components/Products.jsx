import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: true });

      if (!error && data) {
        setProducts(data);
      }
      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <section id="products" className="py-24 bg-slate-50 relative">
      {/* Ornamen latar belakang */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 -left-24 w-72 h-72 bg-indigo-50/50 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-2 block">Katalog Kami</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Pilihan Produk Ayam Broiler</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-600">
            Kami menyediakan berbagai pilihan ayam broiler berkualitas tinggi, higienis, dan bersertifikat halal untuk memenuhi kebutuhan harian maupun bisnis Anda.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center text-slate-500 py-10 bg-white rounded-2xl shadow-sm border border-slate-100">
            Belum ada produk yang ditambahkan.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-lg shadow-slate-200/50 border border-slate-100 group hover:-translate-y-1 transition-all duration-300 flex flex-col">
                <div className="relative h-64 overflow-hidden bg-slate-200">
                  <img
                    src={item.image.startsWith('http') ? item.image : `/${item.image}`}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=Gambar+Tidak+Tersedia' }}
                  />
                  {/* Label Kualitas di sudut gambar */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg shadow-sm text-xs font-bold text-slate-700 flex items-center gap-1">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    Grade A
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">{item.title}</h3>
                  <p className="text-sm text-slate-600 mb-6 flex-grow">{item.description}</p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                    <div className="font-extrabold text-lg text-slate-900">
                      {item.is_price_hidden ? (
                        <span className="text-sm text-slate-400 font-medium">Harga menyesuaikan</span>
                      ) : (
                        `Rp ${item.price.toLocaleString('id-ID')}`
                      )}
                    </div>
                    <a
                      href={`https://wa.me/6285373078847?text=Halo%20Admin,%20saya%20tertarik%20dengan%20produk%20${encodeURIComponent(item.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white rounded-lg text-sm font-bold transition-colors"
                    >
                      Pesan
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}