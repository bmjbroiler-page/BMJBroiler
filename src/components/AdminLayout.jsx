import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('isAdminLoggedIn');
        navigate('/admin/login');
    };

    const navLinks = [
        { path: '/admin', label: 'Produk Unggulan', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
        { path: '/admin/sliders', label: 'Slider & Banner', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
        { path: '/admin/video', label: 'Video Promosi', icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' },
        { path: '/admin/articles', label: 'Artikel & Info', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15' },
        { path: '/admin/visitors', label: 'Data Pengunjung', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' },
        { path: '/admin/settings', label: 'Pengaturan Akun', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
    ];

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-800">

            {/* Overlay Mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-20 md:hidden transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar - Diperkecil jadi w-56, bg-white biar clean, border kanan */}
            <aside className={`fixed inset-y-0 left-0 z-30 w-56 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } md:relative md:translate-x-0`}>

                {/* Header Sidebar */}
                <div className="h-16 flex items-center px-5 border-b border-slate-100">
                    <img src="/logo.png" alt="Logo" className="w-7 h-7 mr-2.5" />
                    <span className="text-base font-bold text-slate-800 tracking-tight">Baroqah Panel</span>
                </div>

                {/* Menu Navigasi - Jarak dirapatkan (space-y-0.5) */}
                <nav className="flex-1 px-3 py-5 space-y-0.5 overflow-y-auto">
                    <p className="px-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">Menu Utama</p>
                    {navLinks.map((link) => {
                        const isActive = location.pathname === link.path;
                        return (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsSidebarOpen(false)}
                                className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${isActive
                                        ? 'bg-indigo-50 text-indigo-700'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                    }`}
                            >
                                <svg className={`w-5 h-5 mr-3 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive ? "2.5" : "2"} d={link.icon} />
                                </svg>
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer Sidebar (Logout) */}
                <div className="p-3 border-t border-slate-100">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-3 py-2 text-sm font-medium text-slate-500 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                        <svg className="w-5 h-5 mr-3 text-slate-400 group-hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Keluar Akun
                    </button>
                </div>
            </aside>

            {/* Area Konten Utama */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

                {/* Header Atas */}
                <header className="h-16 bg-white border-b border-slate-200 px-6 flex justify-between items-center z-10 shrink-0 shadow-sm shadow-slate-100/50">
                    <div className="flex items-center">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="mr-4 text-slate-500 focus:outline-none md:hidden hover:text-slate-900 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        {/* Breadcrumb ala SaaS */}
                        <div className="hidden sm:flex items-center text-sm text-slate-500 font-medium">
                            <span>Dashboard</span>
                            <span className="mx-2 text-slate-300">/</span>
                            <span className="text-slate-800">Manajemen Data</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block">
                            <div className="text-sm font-bold text-slate-800 leading-none mb-1">Admin Baroqah</div>
                            <div className="text-[11px] text-slate-500 font-medium uppercase tracking-wide">Administrator</div>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center text-white font-bold text-sm shadow-md border-2 border-white">
                            A
                        </div>
                    </div>
                </header>

                {/* Konten yang Di-Render (Fit) */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    <div className="animate-fade-in duration-300 w-full h-full max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>

            </div>
        </div>
    );
};

export default AdminLayout;