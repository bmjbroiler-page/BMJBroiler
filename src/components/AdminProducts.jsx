import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        title: '', description: '', image: '', price: '', is_price_hidden: false
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setIsLoading(true);
        const { data, error } = await supabase.from('products').select('*').order('id', { ascending: true });
        if (!error) setProducts(data);
        setIsLoading(false);
    };

    const openModal = (product = null) => {
        if (product) {
            setEditingId(product.id);
            setFormData({
                title: product.title, description: product.description, image: product.image,
                price: product.price, is_price_hidden: product.is_price_hidden
            });
        } else {
            setEditingId(null);
            setFormData({ title: '', description: '', image: '', price: '', is_price_hidden: false });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);

        if (editingId) {
            // Fungsi Edit
            const { error } = await supabase.from('products').update(formData).eq('id', editingId);
            if (!error) {
                setProducts(products.map(p => p.id === editingId ? { ...formData, id: editingId } : p));
                setIsModalOpen(false);
            } else {
                alert('Gagal mengupdate produk.');
            }
        } else {
            // Fungsi Tambah
            const { data, error } = await supabase.from('products').insert([formData]).select();
            if (!error) {
                setProducts([...products, data[0]]);
                setIsModalOpen(false);
            } else {
                alert('Gagal menambah produk.');
            }
        }
        setIsSaving(false);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Yakin ingin menghapus produk ini?')) {
            const { error } = await supabase.from('products').delete().eq('id', id);
            if (!error) {
                setProducts(products.filter(p => p.id !== id));
            } else {
                alert('Gagal menghapus produk.');
            }
        }
    };

    return (
        <div className="w-full flex flex-col gap-6 relative">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Katalog Produk</h2>
                    <p className="text-sm text-slate-500 mt-1">Kelola data ayam broiler, karkas, filet, dan harganya di sini.</p>
                </div>
                <button onClick={() => openModal()} className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-all shadow-sm">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                    Tambah Produk
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden w-full">
                <div className="overflow-x-auto w-full">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
                                <th className="px-6 py-4">Detail Produk</th>
                                <th className="px-6 py-4">Harga Jual</th>
                                <th className="px-6 py-4">Visibilitas</th>
                                <th className="px-6 py-4 text-right">Opsi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {isLoading ? (
                                <tr><td colSpan="4" className="px-6 py-12 text-center text-slate-400 font-medium">Memuat data...</td></tr>
                            ) : products.map((product) => (
                                <tr key={product.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex-shrink-0">
                                                <img src={product.image.startsWith('http') ? product.image : `/${product.image}`} alt={product.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" onError={(e) => { e.target.src = 'https://via.placeholder.com/150' }} />
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900">{product.title}</div>
                                                <div className="text-sm text-slate-500 line-clamp-1 w-56 lg:w-80" title={product.description}>{product.description}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap"><div className="font-bold text-slate-800">Rp {product.price.toLocaleString('id-ID')}</div></td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-bold ${product.is_price_hidden ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                            {product.is_price_hidden ? 'Disembunyikan' : 'Ditampilkan'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                        <button onClick={() => openModal(product)} className="text-slate-400 hover:text-indigo-600 transition-colors mx-1 p-2 rounded-lg hover:bg-indigo-50" title="Edit">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                        </button>
                                        <button onClick={() => handleDelete(product.id)} className="text-slate-400 hover:text-red-500 transition-colors mx-1 p-2 rounded-lg hover:bg-red-50" title="Hapus">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Tambah/Edit Produk */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
                        <h3 className="text-lg font-bold text-slate-900 mb-4">{editingId ? 'Edit Produk' : 'Tambah Produk Baru'}</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">Nama Produk</label>
                                <input type="text" required className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">Deskripsi</label>
                                <textarea required rows="3" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}></textarea>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">Path / URL Gambar</label>
                                <input type="text" required className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">Harga (Angka saja)</label>
                                <input type="number" required className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
                            </div>
                            <div className="flex items-center mt-2">
                                <input type="checkbox" id="hidePrice" className="w-4 h-4 text-indigo-600 rounded border-slate-300" checked={formData.is_price_hidden} onChange={(e) => setFormData({ ...formData, is_price_hidden: e.target.checked })} />
                                <label htmlFor="hidePrice" className="ml-2 text-sm text-slate-700 font-medium">Sembunyikan harga dari pengunjung</label>
                            </div>
                            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">Batal</button>
                                <button type="submit" disabled={isSaving} className="px-4 py-2 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors disabled:opacity-50">
                                    {isSaving ? 'Menyimpan...' : 'Simpan Produk'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProducts;