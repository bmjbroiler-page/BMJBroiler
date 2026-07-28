import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

// Fungsi untuk mengekstrak ID video dari link YouTube
const getYouTubeEmbedUrl = (url) => {
  let videoId = '';
  if (url.includes('youtube.com/watch?v=')) {
    videoId = url.split('v=')[1].split('&')[0];
  } else if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1].split('?')[0];
  } else if (url.includes('youtube.com/embed/')) {
    return url; // Sudah format embed
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
    <section className="py-20 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">Profil & Dokumentasi</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 justify-center">
          {videos.map((vid) => {
            const embedUrl = getYouTubeEmbedUrl(vid.youtube_url);
            if (!embedUrl) return null;

            return (
              <div key={vid.id} className="bg-slate-50 p-2 rounded-2xl border border-slate-200 shadow-sm">
                <div className="relative w-full overflow-hidden rounded-xl" style={{ paddingTop: '56.25%' /* Rasio 16:9 */ }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={embedUrl}
                    title="Video Dokumentasi Baroqah Maju Jaya"
                    frameBorder="0"
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