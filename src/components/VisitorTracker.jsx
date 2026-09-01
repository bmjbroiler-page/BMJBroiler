import { useEffect } from 'react';
import { supabase } from '../supabaseClient';

// Deteksi jenis perangkat & browser secara sederhana dari user agent
function parseDevice(ua) {
  const isMobile = /Mobile|Android|iP(hone|od)/i.test(ua);
  const isTablet = /Tablet|iPad/i.test(ua);
  const device = isTablet ? 'Tablet' : isMobile ? 'Mobile' : 'Desktop';

  let browser = 'Lainnya';
  if (/Edg\//i.test(ua)) browser = 'Edge';
  else if (/Chrome\//i.test(ua) && !/Chromium/i.test(ua)) browser = 'Chrome';
  else if (/Firefox\//i.test(ua)) browser = 'Firefox';
  else if (/Safari\//i.test(ua) && !/Chrome/i.test(ua)) browser = 'Safari';

  return { device, browser };
}

/**
 * Komponen ini tidak menampilkan apa-apa (return null).
 * Tugasnya cuma satu: setiap kali halaman publik dibuka,
 * catat 1 baris kunjungan ke tabel "visitors" di Supabase,
 * supaya bisa dilihat rekapnya di /admin/visitors.
 *
 * Dibatasi 1x per sesi tab (pakai sessionStorage) supaya
 * refresh berkali-kali tidak membuat data dobel-dobel.
 */
export default function VisitorTracker() {
  useEffect(() => {
    const alreadyTracked = sessionStorage.getItem('bmj_visit_tracked');
    if (alreadyTracked) return;

    const logVisit = async () => {
      try {
        const { device, browser } = parseDevice(navigator.userAgent);

        let city = null;
        let country = null;

        // Ambil perkiraan lokasi dari IP secara best-effort.
        // Kalau API-nya gagal/limit, kunjungan tetap dicatat tanpa lokasi.
        try {
          const res = await fetch('https://ipapi.co/json/');
          if (res.ok) {
            const geo = await res.json();
            city = geo.city || null;
            country = geo.country_name || null;
          }
        } catch (_) {
          // abaikan, lokasi opsional
        }

        await supabase.from('visitors').insert([
          {
            page: window.location.pathname,
            referrer: document.referrer || 'Langsung',
            user_agent: navigator.userAgent,
            device,
            browser,
            city,
            country,
          },
        ]);

        sessionStorage.setItem('bmj_visit_tracked', '1');
      } catch (_) {
        // Jangan pernah biarkan pencatatan kunjungan mengganggu tampilan web
      }
    };

    logVisit();
  }, []);

  return null;
}
