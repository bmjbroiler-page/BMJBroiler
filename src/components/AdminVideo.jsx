import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

// Fungsi sakti untuk mengubah BERBAGAI MACAM link YouTube jadi format Embed
const getYouTubeEmbedUrl = (url) => {
    if (!url) return '';
    let videoId = '';

    if (url.includes('shorts/')) {
        videoId = url.split('shorts/')[1].split('?')[0];
    } else if (url.includes('watch?v=')) {
        videoId = url.split('watch?v=')[1].split('&')[0];
    } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('embed/')) {
        videoId = url.split('embed/')[1].split('?')[0];
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
};

const AdminVideo = () => {
    const [videos, setVideos] = useState([]);
    const [formData, setFormData] = useState({ orientation: 'landscape', youtube_url: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        setIsFetching(true);
        const { data, error } = await supabase.from('videos').select('*').order('id', { ascending: false });
        if (!error) setVideos(data || []);
        setIsFetching(false);
    };

    const handleEdit = (video) => {
        setEditingId(video.id);
        setFormData({ orientation: video.orientation || 'landscape', youtube_url: video.youtube_url });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (editingId) {
            const { error } = await supabase.from('videos').update(formData).eq('id', editingId);
            if (!error) {
                setVideos(videos.map(v => v.id === editingId ? { ...formData, id: editingId } : v));
                setEditingId(null);
                setFormData({ orientation: 'landscape', youtube_url: '' });
            } else alert('Gagal mengupdate video.');
        } else {
            const { data, error } = await supabase.from('videos').insert([formData]).select();
            if (!error) {
                setVideos([data[0], ...videos]);
                setFormData({ orientation: 'landscape', youtube_url: '' });
            } else alert('Gagal menambah video.');
        }
        setIsLoading(false);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Yakin ingin menghapus video ini?')) {
            const { error } = await supabase.from('videos').delete().eq('id', id);
            if (!error) setVideos(videos.filter(v => v.id !== id));
        }
    };

    return (
        <div className="w-full flex flex-col gap-6">
            <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Video Promosi</h2>
                <p className="text-sm text-slate-500 mt-1">Kelola video YouTube (Landscape / Shorts) yang tampil di halaman depan website.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 lg:col-span-1 sticky top-6">
                    <h3 className="text-base font-bold text-slate-800 mb-4 pb-3 border-b border-slate-100">
                        {editingId ? 'Edit Video' : 'Tambah Video Baru'}
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1.5">Orientasi Video</label>
                            <select
                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none"
                                value={formData.orientation}
                                onChange={(e) => setFormData({ ...formData, orientation: e.target.value })}
                            >
                                <option value="landscape">Landscape (Mendatar / 16:9)</option>
                                <option value="portrait">Portrait (Tegak / Shorts / Reels)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1.5">URL YouTube</label>
                            <input
                                type="text"
                                required
                                placeholder="https://youtube.com/watch?v=... atau link shorts"
                                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none"
                                value={formData.youtube_url}
                                onChange={(e) => setFormData({ ...formData, youtube_url: e.target.value })}
                            />
                            <p className="text-[11px] text-slate-400 mt-1">Mendukung link video panjang, youtu.be, maupun YouTube Shorts.</p>
                        </div>

                        {/* Live Preview kecil di Form Admin */}
                        {formData.youtube_url && getYouTubeEmbedUrl(formData.youtube_url) && (
                            <div className="mt-2">
                                <label className="block text-xs font-bold text-slate-600 mb-1">Preview Video:</label>
                                <div className="w-full h-36 bg-black rounded-lg overflow-hidden">
                                    <iframe
                                        src={getYouTubeEmbedUrl(formData.youtube_url)}
                                        title="Preview"
                                        className="w-full h-full border-0"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        )}

                        <div className="flex gap-2 mt-2">
                            {editingId && (
                                <button type="button" onClick={() => { setEditingId(null); setFormData({ orientation: 'landscape', youtube_url: '' }); }} className="w-1/3 py-2.5 bg-slate-100 text-slate-600 font-bold text-sm rounded-lg hover:bg-slate-200 transition-colors">
                                    Batal
                                </button>
                            )}
                            <button type="submit" disabled={isLoading} className={`${editingId ? 'w-2/3' : 'w-full'} py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-lg transition-all disabled:opacity-50`}>
                                {isLoading ? 'Menyimpan...' : editingId ? 'Update Video' : 'Simpan Video'}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                    <h3 className="text-base font-bold text-slate-800 mb-4 pb-3 border-b border-slate-100">Daftar Video</h3>
                    {isFetching ? <div className="text-center py-12 text-slate-400 font-medium">Memuat...</div> : videos.length === 0 ? (
                        <div className="text-center py-12 text-slate-400 text-sm">Belum ada video yang ditambahkan.</div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {videos.map((vid) => {
                                const embedUrl = getYouTubeEmbedUrl(vid.youtube_url);
                                return (
                                    <div key={vid.id} className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50 p-4 flex flex-col justify-between gap-3">
                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-[10px] font-bold uppercase tracking-wider">
                                                    {vid.orientation}
                                                </div>
                                            </div>

                                            {/* Preview Kotak Video di List */}
                                            {embedUrl ? (
                                                <div className="w-full h-40 bg-black rounded-lg overflow-hidden mb-2">
                                                    <iframe
                                                        src={embedUrl}
                                                        title="YouTube Video"
                                                        className="w-full h-full border-0"
                                                        allowFullScreen
                                                    ></iframe>
                                                </div>
                                            ) : (
                                                <div className="w-full h-40 bg-red-50 text-red-500 rounded-lg flex items-center justify-center text-xs font-semibold mb-2 p-2 text-center">
                                                    URL YouTube Tidak Valid
                                                </div>
                                            )}

                                            <a href={vid.youtube_url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline break-all line-clamp-1 font-medium">
                                                {vid.youtube_url}
                                            </a>
                                        </div>
                                        <div className="flex justify-end gap-2 pt-3 border-t border-slate-100/80">
                                            <button onClick={() => handleEdit(vid)} className="text-xs font-bold text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-md transition-colors">Edit</button>
                                            <button onClick={() => handleDelete(vid.id)} className="text-xs font-bold text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-md transition-colors">Hapus</button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminVideo;