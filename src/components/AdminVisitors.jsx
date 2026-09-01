import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const PAGE_SIZE = 20;

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleString('id-ID', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

const AdminVisitors = () => {
  const [visitors, setVisitors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [todayCount, setTodayCount] = useState(0);
  const [weekCount, setWeekCount] = useState(0);

  useEffect(() => {
    fetchStats();
    fetchVisitors(0);
  }, []);

  const fetchStats = async () => {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();

    const { count: total } = await supabase.from('visitors').select('*', { count: 'exact', head: true });
    const { count: today } = await supabase.from('visitors').select('*', { count: 'exact', head: true }).gte('created_at', startOfDay);
    const { count: week } = await supabase.from('visitors').select('*', { count: 'exact', head: true }).gte('created_at', sevenDaysAgo);

    setTotalCount(total || 0);
    setTodayCount(today || 0);
    setWeekCount(week || 0);
  };

  const fetchVisitors = async (pageIndex) => {
    setIsLoading(true);
    const from = pageIndex * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data, error } = await supabase
      .from('visitors')
      .select('*')
      .order('created_at', { ascending: false })
      .range(from, to);

    if (!error && data) setVisitors(data);
    setIsLoading(false);
  };

  const goToPage = (newPage) => {
    if (newPage < 0) return;
    setPage(newPage);
    fetchVisitors(newPage);
  };

  const handleClearAll = async () => {
    if (!window.confirm('Yakin hapus SEMUA riwayat kunjungan? Tindakan ini tidak bisa dibatalkan.')) return;
    const { error } = await supabase.from('visitors').delete().neq('id', 0);
    if (!error) {
      setVisitors([]);
      fetchStats();
    } else {
      alert('Gagal menghapus data.');
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Data Pengunjung</h2>
          <p className="text-sm text-slate-500 mt-1">Rekap kunjungan ke website oleh calon pembeli.</p>
        </div>
        <button
          onClick={handleClearAll}
          className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-all"
        >
          Bersihkan Riwayat
        </button>
      </div>

      {/* Kartu Ringkasan */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Kunjungan</p>
          <p className="text-3xl font-extrabold text-slate-900">{totalCount.toLocaleString('id-ID')}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Hari Ini</p>
          <p className="text-3xl font-extrabold text-indigo-600">{todayCount.toLocaleString('id-ID')}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">7 Hari Terakhir</p>
          <p className="text-3xl font-extrabold text-emerald-600">{weekCount.toLocaleString('id-ID')}</p>
        </div>
      </div>

      {/* Tabel Riwayat */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden w-full">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
                <th className="px-6 py-4">Waktu Kunjungan</th>
                <th className="px-6 py-4">Halaman</th>
                <th className="px-6 py-4">Asal (Referrer)</th>
                <th className="px-6 py-4">Perangkat</th>
                <th className="px-6 py-4">Lokasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr><td colSpan="5" className="px-6 py-12 text-center text-slate-400 font-medium">Memuat data...</td></tr>
              ) : visitors.length === 0 ? (
                <tr><td colSpan="5" className="px-6 py-12 text-center text-slate-400 font-medium">Belum ada data kunjungan.</td></tr>
              ) : visitors.map((v) => {
                const isToday = isSameDay(new Date(v.created_at), new Date());
                return (
                  <tr key={v.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-semibold text-slate-800 text-sm">{formatDate(v.created_at)}</div>
                      {isToday && <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-600">Hari ini</span>}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{v.page || '/'}</td>
                    <td className="px-6 py-4 text-sm text-slate-500 max-w-[200px] truncate" title={v.referrer}>{v.referrer || 'Langsung'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-slate-100 text-slate-600">
                        {v.device} · {v.browser}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {v.city ? `${v.city}, ${v.country}` : '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
          <button
            onClick={() => goToPage(page - 1)}
            disabled={page === 0}
            className="px-4 py-2 text-sm font-bold text-slate-600 rounded-lg hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            ← Sebelumnya
          </button>
          <span className="text-xs font-semibold text-slate-400">Halaman {page + 1}</span>
          <button
            onClick={() => goToPage(page + 1)}
            disabled={visitors.length < PAGE_SIZE}
            className="px-4 py-2 text-sm font-bold text-slate-600 rounded-lg hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Berikutnya →
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminVisitors;
