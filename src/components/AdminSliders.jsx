import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const AdminSliders = () => {
    const [sliders, setSliders] = useState([]);
    const [formData, setFormData] = useState({ image_url: '', title: '', subtitle: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [editingId, setEditingId] = useState(null); // State Edit

    useEffect(() => {
        fetchSliders();
    }, []);

    const fetchSliders = async () => {
        setIsFetching(true);
        const { data, error } = await supabase.from('sliders').select('*').order('id', { ascending: false });
        if (!error) setSliders(data || []);
        setIsFetching(false);
    };

    const handleEdit = (slider) => {
        setEditingId(slider.id);
        setFormData({ image_url: slider.image_url, title: slider.title, subtitle: slider.subtitle });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (editingId) {
            const { error } = await supabase.from('sliders').update(formData).eq('id', editingId);
            if (!error) {
                setSliders(sliders.map(s => s.id === editingId ? { ...formData, id: editingId } : s));
                setEditingId(null);
                setFormData({ image_url: '', title: '', subtitle: '' });
            } else alert('Gagal mengupdate banner.');
        } else {
            const { data, error } = await supabase.from('sliders').insert([formData]).select();
            if (!error) {
                setSliders([data[0], ...sliders]);
                setFormData({ image_url: '', title: '', subtitle: '' });
            } else alert('Gagal menambah banner.');
        }
        setIsLoading(false);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Hapus banner ini?')) {
            const { error } = await supabase.from('sliders').delete().eq('id', id);
            if (!error) setSliders(sliders.filter(s => s.id !== id));
        }
    };

    return (
        <div className="w-full flex flex-col gap-6">
            <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Slider & Banner</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 lg:col-span-1 sticky top-6">
                    <h3 className="text-base font-bold text-slate-800 mb-4 pb-3 border-b border-slate-100">
                        {editingId ? 'Edit Banner' : 'Tambah Banner Baru'}
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1.5">URL Gambar</label>
                            <input type="text" required className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm" value={formData.image_url} onChange={(e) => setFormData({ ...formData, image_url: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1.5">Judul</label>
                            <input type="text" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1.5">Sub-judul</label>
                            <input type="text" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm" value={formData.subtitle} onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })} />
                        </div>
                        <div className="flex gap-2 mt-2">
                            {editingId && (
                                <button type="button" onClick={() => { setEditingId(null); setFormData({ image_url: '', title: '', subtitle: '' }); }} className="w-1/3 py-2.5 bg-slate-100 text-slate-600 font-bold text-sm rounded-lg hover:bg-slate-200 transition-colors">
                                    Batal
                                </button>
                            )}
                            <button type="submit" disabled={isLoading} className={`${editingId ? 'w-2/3' : 'w-full'} py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-lg transition-all disabled:opacity-50`}>
                                {isLoading ? 'Menyimpan...' : editingId ? 'Update Banner' : 'Simpan Banner'}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                    <h3 className="text-base font-bold text-slate-800 mb-4 pb-3 border-b border-slate-100">Banner Aktif</h3>
                    {isFetching ? <div className="text-center py-12 text-slate-400 font-medium">Memuat...</div> : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {sliders.map((slider) => (
                                <div key={slider.id} className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50 flex flex-col justify-between">
                                    <div>
                                        <img src={slider.image_url.startsWith('http') ? slider.image_url : `/${slider.image_url}`} alt="Slider" className="w-full h-36 object-cover" />
                                        <div className="p-4">
                                            <h4 className="font-bold text-slate-800 text-sm">{slider.title || '(Tanpa Judul)'}</h4>
                                            <p className="text-xs text-slate-500 mt-1 line-clamp-2">{slider.subtitle || '(Tanpa Sub-judul)'}</p>
                                        </div>
                                    </div>
                                    <div className="px-4 pb-4 border-t border-slate-100/80 flex justify-end gap-2 pt-3">
                                        <button onClick={() => handleEdit(slider)} className="text-xs font-bold text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-md transition-colors">Edit</button>
                                        <button onClick={() => handleDelete(slider.id)} className="text-xs font-bold text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-md transition-colors">Hapus</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminSliders;