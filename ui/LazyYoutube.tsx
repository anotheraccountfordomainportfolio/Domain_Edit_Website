import React, { useState } from 'react';
import { Play } from 'lucide-react';

interface LazyYoutubeProps {
  url: string;
  className?: string;
  title?: string;
}

const LazyYoutube: React.FC<LazyYoutubeProps> = ({ url, className = '', title = 'Video' }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  let videoId = '';
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  if (match && match[1]) {
    videoId = match[1];
  }

  if (!videoId) {
    return (
      <iframe 
        src={url} 
        className={className} 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen 
        loading="lazy" 
      />
    );
  }

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const autoplayUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

  if (isLoaded) {
    return (
      <iframe 
        src={autoplayUrl} 
        title={title}
        className={className} 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen 
      />
    );
  }

  return (
    <div 
      className={`relative cursor-pointer group flex items-center justify-center bg-black ${className}`}
      onClick={() => setIsLoaded(true)}
    >
      <img 
        src={thumbnailUrl} 
        alt={title} 
        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
        loading="lazy"
      />
      <div className="absolute w-16 h-12 bg-red-600 rounded-xl flex items-center justify-center shadow-lg group-hover:bg-red-500 transition-colors">
        <Play className="w-6 h-6 text-white fill-white" />
      </div>
    </div>
  );
};

export default LazyYoutube;
