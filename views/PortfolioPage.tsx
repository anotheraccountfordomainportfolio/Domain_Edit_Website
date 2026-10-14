import LazyYoutube from '../ui/LazyYoutube';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUp, ExternalLink, Play, Zap, Clapperboard, Smile, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import FluidBackground from '../ui/FluidBackground';
import FloatingTextBackground from '../ui/FloatingTextBackground';
import GradientText from '../ui/GlitchText';
import Footer from '../ui/Footer';
import { SmoothCursor } from '../ui/magicui/smooth-cursor';
import BottomNav from '../ui/BottomNav';
import { BlueGlaucus } from '../ui/BlueGlaucus';
import { BlueButterflies } from '../ui/BlueButterflies';

const PortfolioPage = () => {
  const [glaucusActive, setGlaucusActive] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialCategory = searchParams.get('category') || (location.state as any)?.category || 'All';
  
  const [activeTab, setActiveTab] = useState<string>(initialCategory);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  const getThumbnail = (url?: string) => {
    if (!url) return '';
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/|watch\?.+&v=))([\w-]{11})/);
    if (match && match[1]) {
      return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
    }
    return '';
  };

  const categories = [
    'All',
    'Gaming Montage',
    'Highlights',
    'Funny Gaming Clips',
    'YouTube Video',
    'Cinematic Reel/Edits',
    'Motion Graphics',
    'Outros',
    'Intro',
    'App/Icon Animations',
    'Podcasts Clip',
    'Promotional Videos',
    'Gaming Edits'
  ];

  const projects: Array<{ title: string, category: string, video?: string, image?: string, description?: string, tags: string[], type: 'video' | 'short' }> = [
    { title: 'Promotional Short Edit', category: 'Promotional Videos', video: 'https://www.youtube.com/embed/-EbQmeQ5y9c', tags: ['Editing'], type: 'short' },
    { title: 'TikTok Reel', category: 'Promotional Videos', video: 'https://www.youtube.com/embed/d0mbJpaAnCw', tags: ['Editing'], type: 'short' },
    { title: 'Motion Graphics', category: 'Motion Graphics', video: 'https://www.youtube.com/embed/sy_PCFRjkRo', tags: ['Editing'], type: 'short' },
    { title: 'Promotional Short Edit', category: 'Promotional Videos', video: 'https://www.youtube.com/embed/TGBVWOrcwwM', tags: ['Editing'], type: 'short' },
    { title: 'Tips n Trick YouTube short', category: 'Promotional Videos', video: 'https://www.youtube.com/embed/k9jhiu3CzPQ', tags: ['Editing'], type: 'short' },
    { title: 'Promotional Short Edit', category: 'Promotional Videos', video: 'https://www.youtube.com/embed/vd0mjr189zI', tags: ['Editing'], type: 'short' },
    { title: 'Promotional Short Edit', category: 'Promotional Videos', video: 'https://www.youtube.com/embed/tTirwetIqDY', tags: ['Editing'], type: 'short' },
    { title: 'Promotional Edit', category: 'Promotional Videos', video: 'https://www.youtube.com/embed/7STTCpmyHw8', tags: ['Editing'], type: 'short' },
    { title: 'Motion Graphics', category: 'Motion Graphics', video: 'https://www.youtube.com/embed/h-s1VuOXErk', tags: ['Editing'], type: 'short' },
    { title: 'Podcast Edit', category: 'Podcasts Clip', video: 'https://www.youtube.com/embed/30MjIz5SizQ', tags: ['Editing'], type: 'short' },
    { title: 'Podcast Edit', category: 'Podcasts Clip', video: 'https://www.youtube.com/embed/vEFswt6v9UE', tags: ['Editing'], type: 'short' },
    { title: 'Motion/Promotional Edit', category: 'Promotional Videos', video: 'https://www.youtube.com/embed/HdVfgA2TnYA', tags: ['Editing'], type: 'short' },
    { title: 'Ai Podcast Edit', category: 'Podcasts Clip', video: 'https://www.youtube.com/embed/dtb9YFXW4Nk', tags: ['Editing'], type: 'short' },
    { title: 'Promotional Short', category: 'Promotional Videos', video: 'https://www.youtube.com/embed/NWc9FxBngMo', tags: ['Editing'], type: 'short' },
    { title: 'App/Icon Animations', category: 'App/Icon Animations', video: 'https://www.youtube.com/embed/mCfc9RZss04', tags: ['Animation'], type: 'short' },
    { title: 'TikTok/Instagram Reel Edit', category: 'Promotional Videos', video: 'https://www.youtube.com/embed/7cKIJ_JLlyw', tags: ['Editing'], type: 'short' },
    { title: 'Cinematic Edit', category: 'Cinematic Reel/Edits', video: 'https://www.youtube.com/embed/zTzMi3EaHVI', tags: ['Editing'], type: 'short' },
    { title: 'Ad/Promotional Edit', category: 'Promotional Videos', video: 'https://www.youtube.com/embed/dEkoPx_VyXc', tags: ['Editing'], type: 'short' },
    { title: 'Ad/Promotional Edit', category: 'Promotional Videos', video: 'https://www.youtube.com/embed/e6KWI9wXzsc', tags: ['Editing'], type: 'short' },
    { title: 'Dr Strange Cinematic Edit', category: 'Cinematic Reel/Edits', video: 'https://www.youtube.com/embed/ow-UWKWz4i0', tags: ['Editing'], type: 'short' },
    { title: 'Intros', category: 'Intro', video: 'https://www.youtube.com/embed/PuUYYV_s8DU', tags: ['Intro'], type: 'short' },
    { title: 'Mbappe Montage', category: 'Gaming Montage', video: 'https://www.youtube.com/embed/Jz1bGijVXzs', description: 'Mbappe montage edit', tags: ['Gaming'], type: 'short' },
    { title: 'Mc Queen Cinematic Edit', category: 'Cinematic Reel/Edits', video: 'https://www.youtube.com/embed/XKQ5IdFBzIQ', description: 'MCQueen cinematic edit', tags: ['Cinematic'], type: 'short' },
    { title: 'YT Video Edit', category: 'YouTube Video', video: 'https://www.youtube.com/embed/dbkR1kKdDO4', tags: ['Video'], type: 'video' },
    { title: 'Showing Work YT Video Edit', category: 'YouTube Video', video: 'https://www.youtube.com/embed/mIBLnHvF2zE', tags: ['Video'], type: 'video' },
    { title: 'Documentary Style Edit Video', category: 'YouTube Video', video: 'https://www.youtube.com/embed/LsEX2jZpgZg', tags: ['Video'], type: 'video' },
    { title: 'Faceless Motion graphics Edit', category: 'YouTube Video', video: 'https://www.youtube.com/embed/3c-TMPbXIrk', tags: ['Video'], type: 'video' },
    { title: 'Promotional Video', category: 'Promotional Videos', video: 'https://www.youtube.com/embed/hHUlfQZsO9o', tags: ['Video'], type: 'video' },
    { title: 'Spidermen Cinematic Edit', category: 'Cinematic Reel/Edits', video: 'https://www.youtube.com/embed/GHs3bkO6AN0', tags: ['Stream'], type: 'video' },
    { title: 'IronMen Cinematic Edit', category: 'Cinematic Reel/Edits', video: 'https://www.youtube.com/embed/5Otejr2OY00', tags: ['Funny'], type: 'video' },
    { title: 'Smooth Transition Cinematic Edit', category: 'Cinematic Reel/Edits', video: 'https://www.youtube.com/embed/SjSjMARyc6s', tags: ['Podcast'], type: 'video' },
    { title: 'Thor vs Doomsday Cinematic Edit', category: 'Cinematic Reel/Edits', video: 'https://www.youtube.com/embed/EL8IBUZqa5w', tags: ['Promo'], type: 'video' },
    { title: 'Outros', category: 'Outros', video: 'https://www.youtube.com/embed/M4oxWMqXACU', tags: ['Outro'], type: 'video' },
    { title: 'PixelForge Studio Intro', category: 'Motion Graphics', video: 'https://www.youtube.com/embed/7jQYAQKlgBQ', tags: ['Motion'], type: 'video' },
    { title: 'Snow Skii Cinematic Edit', category: 'Cinematic Reel/Edits', video: 'https://www.youtube.com/embed/EHl092P2HUo', description: 'Snow ski montage edit', tags: ['Montage'], type: 'video' },
    { title: 'Ronaldo Cinematic Edit', category: 'Cinematic Reel/Edits', video: 'https://www.youtube.com/embed/QDPEFzZ5lgU', description: 'Ronaldo cinematic edit', tags: ['Cinematic'], type: 'video' },
    { title: 'Gtr Gaming Style Edit', category: 'Gaming Edits', video: 'https://www.youtube.com/embed/0Z-tdW2BnsE', description: 'Gta san Andreas gtr car edit', tags: ['Gaming'], type: 'video' },
    { title: 'Porsche 911 Gaming Style Edit', category: 'Gaming Edits', video: 'https://www.youtube.com/embed/ea-xQmrFX00', description: 'Porsche car edit', tags: ['Gaming'], type: 'video' },
    { title: 'Call of Duty Funny Moments', category: 'Funny Gaming Clips', video: 'https://www.youtube.com/embed/Ps8dq8YgHEU', description: 'Call of Duty game funny clips', tags: ['Funny', 'Gaming'], type: 'short' },
    { title: 'Cant Drive Funny Clip', category: 'Funny Gaming Clips', video: 'https://www.youtube.com/embed/jVMdyFe4eDM', description: 'A person who cant drive funny clip', tags: ['Funny'], type: 'short' },
    { title: 'Gorilla Need Peanuts', category: 'Funny Gaming Clips', video: 'https://www.youtube.com/embed/rVbLtwyLRhE', description: 'Gorilla need peanuts funny clip', tags: ['Funny'], type: 'short' },
    { title: 'Outro', category: 'Outros', video: 'https://www.youtube.com/embed/A9JYuUvavwk', description: 'Outro Johnplays', tags: ['Outro'], type: 'short' },
    { title: 'Valorant Montage', category: 'Gaming Montage', video: 'https://www.youtube.com/embed/HMrMlwNVMws', description: 'Valorant gameplay edit montage', tags: ['Gaming', 'Montage'], type: 'short' },
    { title: 'Intro', category: 'Intro', video: 'https://www.youtube.com/embed/ne7qG3Z6Kcw', description: 'Intro animation edit', tags: ['Intro'], type: 'short' },
    { title: 'CREEPER BLAST STYLE INTRO', category: 'Intro', video: 'https://www.youtube.com/embed/snvfcjmoM8Q', description: 'Creeper blast style intro animation', tags: ['Intro'], type: 'short' }
  ];

  const filteredProjects = projects.filter(project => {
    if (activeTab === 'All') return true;
    if (
      activeTab === 'PROMOTIONAL YT SHORT EDIT' ||
      activeTab === 'PROMOTIONAL YT SHORT EDIT SECTION' ||
      activeTab === 'YT SHORT EDIT SECTION' ||
      activeTab === 'YT SHORT EDIT'
    ) {
      return (
        project.category === 'PROMOTIONAL YT SHORT EDIT' ||
        project.category === 'YT SHORT EDIT' ||
        project.category === 'YT SHORT EDIT SECTION'
      );
    }
    if (
      activeTab === 'Promotional Videos' ||
      activeTab === 'PROMOTIONAL VIDEOS SECTION' ||
      activeTab === 'PROMOTIONAL VIDEOS' ||
      activeTab === 'Promotional Video'
    ) {
      return (
        project.category === 'Promotional Videos' ||
        project.category === 'PROMOTIONAL VIDEOS SECTION' ||
        project.category === 'Promotional Video' ||
        project.category === 'PROMOTIONAL VIDEOS'
      );
    }
    return project.category === activeTab;
  });

  return (
    <div className="relative min-h-screen flex flex-col text-white selection:bg-[#4fb7b3] selection:text-black cursor-auto overflow-x-hidden">
      <SmoothCursor />
      <FluidBackground />
      <FloatingTextBackground />
      <BlueButterflies />
      
      {/* The actual Blue Glaucus element */}
      <BlueGlaucus active={glaucusActive} />
      
      {/* Bottom Spread Navigation Menu */}
      <BottomNav glaucusActive={glaucusActive} setGlaucusActive={setGlaucusActive} />

      {/* Main Content */}
      <main className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 relative h-[10vw] md:h-[15vw] flex items-center justify-center overflow-visible">
             <h1 className="text-[10vw] font-heading font-bold opacity-50 text-transparent bg-clip-text bg-gradient-to-r from-[#a8fbd3] via-white to-[#a8fbd3] whitespace-nowrap leading-none select-none pointer-events-none tracking-tighter absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 drop-shadow-[0_0_30px_rgba(168,251,211,0.4)]">
               SELECTED WORK
             </h1>
          </div>



          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-5 py-2.5 rounded-2xl font-heading font-bold uppercase tracking-wider transition-all duration-300 text-xs md:text-sm ${
                  activeTab === cat
                    ? 'bg-[#a8fbd3] text-black shadow-[0_0_25px_rgba(168,251,211,0.5)] scale-105'
                    : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {filteredProjects.map((project, index) => {
              const thumb = getThumbnail(project.video) || project.image || 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop';
              return (
                <div
                  key={`${project.title}-${index}`}
                  onClick={() => setSelectedProject(project)}
                  className="group relative overflow-visible cursor-pointer"
                >
                  <div className="relative aspect-[16/10] rounded-3xl overflow-hidden border border-white/10 mb-6 bg-black">
                    <img 
                      src={thumb} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      referrerPolicy="no-referrer"
                      loading={index < 4 ? "eager" : "lazy"} 
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-[#a8fbd3] text-black flex items-center justify-center shadow-[0_0_30px_rgba(168,251,211,0.5)] transform group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-6 h-6 fill-black ml-0.5" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-mono bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 pointer-events-none">
                      <span className="truncate">{project.title}</span>
                      <span className="text-[#a8fbd3] font-bold flex items-center gap-1">▶ Play Video</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-[#a8fbd3] text-xs font-mono uppercase tracking-widest mb-2">{project.category}</div>
                      <h3 className="text-2xl font-heading font-bold uppercase mb-2">{project.title}</h3>
                      <p className="text-gray-400 text-sm max-w-md">{project.description}</p>
                    </div>
                    <div className="flex gap-2 flex-wrap justify-end max-w-[150px]">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-[10px] px-2 py-1 rounded-full border border-white/10 text-gray-500 uppercase">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Video Modal Preview */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-[#0a0a0a] border border-[#a8fbd3]/40 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(168,251,211,0.3)] cursor-default p-6"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-[#a8fbd3] text-white hover:text-black border border-white/20 flex items-center justify-center transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-4">
                <span className="text-[10px] font-mono text-[#a8fbd3] uppercase tracking-widest bg-[#a8fbd3]/10 px-3 py-1 rounded-full">
                  {selectedProject.category}
                </span>
                <h3 className="text-2xl font-heading font-black uppercase text-white mt-2">
                  {selectedProject.title}
                </h3>
                {selectedProject.description && (
                  <p className="text-xs font-mono text-gray-400 mt-1">
                    {selectedProject.description}
                  </p>
                )}
              </div>

              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-white/10 shadow-inner">
                <LazyYoutube url={selectedProject.video} className="w-full h-full border-0 pointer-events-auto" title={selectedProject.title} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer className="mt-auto" />
    </div>
  );
};

export default PortfolioPage;
