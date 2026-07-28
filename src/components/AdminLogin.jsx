import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [pin, setPin] = useState('');
    const [showPin, setShowPin] = useState(false); // State untuk Hide/Unhide
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const { data, error } = await supabase
            .from('admin_auth')
            .select('*')
            .eq('username', username)
            .eq('pin', pin)
            .single();

        if (data) {
            localStorage.setItem('isAdminLoggedIn', 'true');
            setTimeout(() => {
                navigate('/admin');
            }, 300);
        } else {
            setError('Username atau PIN tidak valid.');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-8 transition-all">

                <div className="text-center mb-8">
                    <img src="/logo.png" alt="Logo" className="w-16 h-auto mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Selamat Datang</h2>
                    <p className="text-slate-500 text-sm mt-1">Masuk ke panel admin CV. Baroqah Maju Jaya</p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-3 mb-6 rounded-lg text-sm font-medium">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-slate-700 font-bold mb-1.5 text-xs uppercase tracking-wider">Username</label>
                        <input
                            type="text"
                            required
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none text-slate-800 text-sm"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-slate-700 font-bold mb-1.5 text-xs uppercase tracking-wider">PIN</label>
                        <div className="relative">
                            <input
                                type={showPin ? "text" : "password"}
                                required
                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none text-slate-800 text-sm"
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                                placeholder="••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPin(!showPin)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-indigo-600 transition-colors"
                            >
                                {showPin ? (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full mt-2 text-white font-bold py-3 rounded-lg transition-all duration-200 shadow-sm ${isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'
                            }`}
                    >
                        {isLoading ? 'Memproses...' : 'Masuk'}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                    <Link to="/" className="inline-flex items-center text-sm text-slate-500 hover:text-indigo-600 font-bold transition-colors">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        Kembali ke Beranda
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;