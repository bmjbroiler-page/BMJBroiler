import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('id', { ascending: false });

      if (!error && data) {
        setArticles(data);
      }
      setIsLoading(false);
    };

    fetchArticles();
  }, []);

  if (isLoading || articles.length === 0) return null;

  return (
    <section id="articles" className="py-24 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-blue-400 font-bold tracking-wider uppercase text-sm mb-2 block">Informasi Terkini</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Wawasan & Berita Peternakan</h2>
            <div className="w-16 h-1 bg-blue-500 rounded-full mb-6 md:mb-0"></div>
          </div>
          <p className="text-slate-400 text-sm md:max-w-xs md:text-right">
            Ikuti pembaruan terbaru mengenai standar kualitas kami, edukasi ayam broiler, dan informasi perusahaan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article) => (
            <div key={article.id} className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 flex flex-col sm:flex-row group hover:border-blue-500/50 transition-colors">
              <div className="sm:w-2/5 h-48 sm:h-auto overflow-hidden shrink-0">
                <img
                  src={article.image.startsWith('http') ? article.image : `/${article.image}`}
                  alt="Artikel"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/400?text=Gambar' }}
                />
              </div>
              <div className="p-6 sm:w-3/5 flex flex-col justify-center">
                <p className="text-slate-300 text-sm leading-relaxed line-clamp-4">
                  {article.description}
                </p>
                <div className="mt-4 pt-4 border-t border-slate-700">
                  <span className="text-blue-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H14"></path></svg>
                    Kabar Baroqah
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}