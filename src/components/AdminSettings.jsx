import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const AdminSettings = () => {
    const [username, setUsername] = useState('admin');
    const [currentPin, setCurrentPin] = useState('');
    const [newPin, setNewPin] = useState('');
    const [showCurrentPin, setShowCurrentPin] = useState(false);
    const [showNewPin, setShowNewPin] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleUpdate = async (e) => {
        e.preventDefault();
        setStatus({ type: '', message: '' });
        setIsLoading(true);

        const { data: authData, error: authError } = await supabase
            .from('admin_auth')
            .select('*')
            .eq('username', username)
            .eq('pin', currentPin)
            .single();

        if (authError || !authData) {
            setIsLoading(false);
            setStatus({ type: 'error', message: 'PIN saat ini salah!' });
            return;
        }

        const { error: updateError } = await supabase
            .from('admin_auth')
            .update({ username: username, pin: newPin })
            .eq('id', authData.id);

        setIsLoading(false);

        if (updateError) {
            setStatus({ type: 'error', message: 'Gagal memperbarui kredensial.' });
        } else {
            setStatus({ type: 'success', message: 'Username dan PIN berhasil diperbarui!' });
            setCurrentPin('');
            setNewPin('');
        }
    };

    return (
        <div className="w-full max-w-3xl flex flex-col gap-6">
            <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Pengaturan Akun</h2>
                <p className="text-sm text-slate-500 mt-1">Ubah username dan PIN keamanan untuk masuk ke panel admin.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
                {status.message && (
                    <div className={`p-4 mb-6 rounded-xl text-sm font-bold border ${status.type === 'error' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
                        {status.message}
                    </div>
                )}

                <form onSubmit={handleUpdate} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Username Administrator</label>
                        <input type="text" required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">PIN Saat Ini</label>
                            <div className="relative">
                                <input type={showCurrentPin ? "text" : "password"} required placeholder="Masukkan PIN lama" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" value={currentPin} onChange={(e) => setCurrentPin(e.target.value)} />
                                <button type="button" onClick={() => setShowCurrentPin(!showCurrentPin)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-indigo-600">
                                    {showCurrentPin ? <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg> : <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>}
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">PIN Baru</label>
                            <div className="relative">
                                <input type={showNewPin ? "text" : "password"} required placeholder="Masukkan PIN baru" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" value={newPin} onChange={(e) => setNewPin(e.target.value)} />
                                <button type="button" onClick={() => setShowNewPin(!showNewPin)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-indigo-600">
                                    {showNewPin ? <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg> : <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex justify-end">
                        <button type="submit" disabled={isLoading} className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-lg transition-all shadow-sm disabled:opacity-50">
                            {isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminSettings;