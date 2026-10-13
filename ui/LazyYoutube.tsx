import React, { useState, useEffect, useId } from 'react';
import { Play } from 'lucide-react';
import { useVideoAutoScroll } from './useVideoAutoScroll';

interface LazyYoutubeProps {
  url: string;
  className?: string;
  title?: string;
  thumbnail?: string;
}

const LazyYoutube: React.FC<LazyYoutubeProps> = ({ url, className = '', title = 'Video', thumbnail }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const instanceId = useId() + '-' + url;
  const containerRef = useVideoAutoScroll(isPlaying);

  useEffect(() => {
    const handleStopOthers = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail !== instanceId) {
        setIsPlaying(false);
      }
    };

    window.addEventListener('stop-other-videos', handleStopOthers);
    return () => {
      window.removeEventListener('stop-other-videos', handleStopOthers);
    };
  }, [instanceId]);

  const handlePlay = () => {
    setIsPlaying(true);
    window.dispatchEvent(new CustomEvent('stop-other-videos', { detail: instanceId }));
  };

  let videoId = '';
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/|watch\?.+&v=))([\w-]{11})/);
  if (match && match[1]) {
    videoId = match[1];
  }

  const thumbUrl = thumbnail || (videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '');

  const embedUrl = videoId 
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&iv_load_policy=3` 
    : url;

  if (!isPlaying) {
    return (
      <div 
        ref={containerRef}
        tabIndex={0}
        className={`relative w-full h-full cursor-pointer group bg-black overflow-hidden flex items-center justify-center outline-none focus:ring-2 focus:ring-[#a8fbd3] ${className}`}
        onClick={handlePlay}
      >
        {thumbUrl ? (
          <img 
            src={thumbUrl} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-zinc-900 to-black flex items-center justify-center" />
        )}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-[#a8fbd3] text-black flex items-center justify-center shadow-[0_0_30px_rgba(168,251,211,0.5)] transform group-hover:scale-110 transition-transform duration-300">
            <Play className="w-6 h-6 fill-black ml-0.5" />
          </div>
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-mono bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 pointer-events-none">
          <span className="truncate">{title}</span>
          <span className="text-[#a8fbd3] font-bold flex items-center gap-1">▶ Play</span>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} tabIndex={0} className={`w-full h-full outline-none focus:ring-2 focus:ring-[#a8fbd3] ${className}`}>
      <iframe 
        src={embedUrl}
        title={title}
        className="w-full h-full border-0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" 
        allowFullScreen 
        loading="eager"
      />
    </div>
  );
};

export default LazyYoutube;
