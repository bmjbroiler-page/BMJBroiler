import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const AdminArticles = () => {
    const [articles, setArticles] = useState([]);
    const [formData, setFormData] = useState({ image: '', description: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        setIsFetching(true);
        const { data, error } = await supabase.from('articles').select('*').order('id', { ascending: false });
        if (!error) setArticles(data || []);
        setIsFetching(false);
    };

    const handleAddArticle = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const { data, error } = await supabase.from('articles').insert([
            { image: formData.image, description: formData.description }
        ]).select();

        setIsLoading(false);

        if (error) {
            alert('Gagal menambah artikel!');
        } else {
            setArticles([data[0], ...articles]);
            setFormData({ image: '', description: '' });
            alert('Artikel berhasil ditambahkan!');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Yakin ingin menghapus artikel ini?')) {
            const { error } = await supabase.from('articles').delete().eq('id', id);
            if (!error) {
                setArticles(articles.filter(item => item.id !== id));
            } else {
                alert('Gagal menghapus artikel.');
            }
        }
    };

    return (
        <div className="w-full flex flex-col gap-6">
            <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Artikel & Wawasan</h2>
                <p className="text-sm text-slate-500 mt-1">Kelola konten edukasi dan kabar terbaru seputar peternakan/ayam broiler.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                {/* Form Tambah Artikel */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 lg:col-span-1">
                    <h3 className="text-base font-bold text-slate-800 mb-4 pb-3 border-b border-slate-100">Tambah Artikel Baru</h3>
                    <form onSubmit={handleAddArticle} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">URL Gambar Sampul</label>
                            <input
                                type="text"
                                placeholder="https://images.unsplash.com/..."
                                required
                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Deskripsi / Ringkasan Artikel</label>
                            <textarea
                                rows="5"
                                placeholder="Tuliskan isi atau ringkasan wawasan di sini..."
                                required
                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full mt-2 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-lg transition-all shadow-sm shadow-indigo-200 disabled:opacity-50"
                        >
                            {isLoading ? 'Menyimpan...' : 'Terbitkan Artikel'}
                        </button>
                    </form>
                </div>

                {/* Tabel / Daftar Artikel */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-100">
                        <h3 className="text-base font-bold text-slate-800">Daftar Artikel Terbit</h3>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {isFetching ? (
                            <div className="p-8 text-center text-slate-400 font-medium">Memuat artikel...</div>
                        ) : articles.length === 0 ? (
                            <div className="p-8 text-center text-slate-400 font-medium">Belum ada artikel.</div>
                        ) : (
                            articles.map((item) => (
                                <div key={item.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                                    <div className="flex items-start gap-4">
                                        <img
                                            src={item.image.startsWith('http') ? item.image : `/${item.image}`}
                                            alt="Gambar Artikel"
                                            className="w-20 h-20 rounded-xl object-cover border border-slate-200 shrink-0"
                                            onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=No+Image' }}
                                        />
                                        <div>
                                            <p className="text-sm text-slate-700 line-clamp-3 leading-relaxed">{item.description}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="self-end sm:self-center text-slate-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-colors shrink-0"
                                        title="Hapus Artikel"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminArticles;