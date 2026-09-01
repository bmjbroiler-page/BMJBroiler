import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

// Fungsi sakti untuk mengekstrak ID video dari SEMUA jenis link YouTube (Standar, Shorts, Youtu.be, Embed)
const getYouTubeEmbedUrl = (url) => {
  if (!url) return '';
  let videoId = '';

  if (url.includes('shorts/')) {
    videoId = url.split('shorts/')[1].split('?')[0];
  } else if (url.includes('watch?v=')) {
    videoId = url.split('v=')[1].split('&')[0];
  } else if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1].split('?')[0];
  } else if (url.includes('embed/')) {
    videoId = url.split('embed/')[1].split('?')[0];
  }

  return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
};

export default function VideoSection() {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('id', { ascending: false });

      if (!error && data) {
        setVideos(data);
      }
      setIsLoading(false);
    };

    fetchVideos();
  }, []);

  if (isLoading || videos.length === 0) return null; // Sembunyikan section jika tidak ada video

  return (
    <section id="video-produksi" className="py-20 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">Profil & Dokumentasi</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 justify-center items-center">
          {videos.map((vid) => {
            const embedUrl = getYouTubeEmbedUrl(vid.youtube_url);
            if (!embedUrl) return null;

            // Cek orientasi video (portrait/shorts vs landscape)
            const isPortrait = vid.orientation === 'portrait';

            return (
              <div key={vid.id} className="bg-slate-50 p-3 rounded-2xl border border-slate-200 shadow-sm max-w-md mx-auto w-full">
                {/* 
                  Dinamis Rasio: 
                  - Kalau portrait/shorts pakai tinggi 16:9 dibalik jadi vertikal (paddingTop 177.78% atau max-h)
                  - Kalau landscape pakai standar 16:9 (paddingTop 56.25%)
                */}
                <div
                  className="relative w-full overflow-hidden rounded-xl bg-black"
                  style={{
                    paddingTop: isPortrait ? '177.78%' : '56.25%'
                  }}
                >
                  <iframe
                    className="absolute top-0 left-0 w-full h-full border-0"
                    src={embedUrl}
                    title="Video Dokumentasi Baroqah Maju Jaya"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}