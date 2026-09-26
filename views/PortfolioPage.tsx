import LazyYoutube from '../ui/LazyYoutube';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUp, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [glaucusActive, setGlaucusActive] = useState(false);

  
  
  const projects: Array<{ title: string, category: string, video?: string, image?: string, description?: string, tags: string[] }> = [
    { title: 'Shorts 1', category: 'Video Edit', video: 'https://www.youtube.com/embed/-EbQmeQ5y9c', tags: ['Editing'] },
    { title: 'Shorts 2', category: 'Video Edit', video: 'https://www.youtube.com/embed/d0mbJpaAnCw', tags: ['Editing'] },
    { title: 'Shorts 3', category: 'Video Edit', video: 'https://www.youtube.com/embed/sy_PCFRjkRo', tags: ['Editing'] },
    { title: 'Shorts 4', category: 'Video Edit', video: 'https://www.youtube.com/embed/TGBVWOrcwwM', tags: ['Editing'] },
    { title: 'Shorts 5', category: 'Video Edit', video: 'https://www.youtube.com/embed/k9jhiu3CzPQ', tags: ['Editing'] },
    { title: 'Shorts 6', category: 'Video Edit', video: 'https://www.youtube.com/embed/vd0mjr189zI', tags: ['Editing'] },
    { title: 'Shorts 7', category: 'Video Edit', video: 'https://www.youtube.com/embed/tTirwetIqDY', tags: ['Editing'] },
    { title: 'Shorts 8', category: 'Video Edit', video: 'https://www.youtube.com/embed/7STTCpmyHw8', tags: ['Editing'] },
    { title: 'Shorts 9', category: 'Video Edit', video: 'https://www.youtube.com/embed/h-s1VuOXErk', tags: ['Editing'] },
    { title: 'Shorts 10', category: 'Video Edit', video: 'https://www.youtube.com/embed/30MjIz5SizQ', tags: ['Editing'] },
    { title: 'Shorts 11', category: 'Video Edit', video: 'https://www.youtube.com/embed/vEFswt6v9UE', tags: ['Editing'] },
    { title: 'Shorts 12', category: 'Video Edit', video: 'https://www.youtube.com/embed/HdVfgA2TnYA', tags: ['Editing'] },
    { title: 'Shorts 13', category: 'Video Edit', video: 'https://www.youtube.com/embed/dtb9YFXW4Nk', tags: ['Editing'] },
    { title: 'Shorts 14', category: 'Video Edit', video: 'https://www.youtube.com/embed/NWc9FxBngMo', tags: ['Editing'] },
    { title: 'Shorts 15', category: 'Video Edit', video: 'https://www.youtube.com/embed/uJFBC9fy2sM', tags: ['Editing'] },
    { title: 'Shorts 16', category: 'Video Edit', video: 'https://www.youtube.com/embed/7cKIJ_JLlyw', tags: ['Editing'] },
    { title: 'Shorts 17', category: 'Video Edit', video: 'https://www.youtube.com/embed/zTzMi3EaHVI', tags: ['Editing'] },
    { title: 'Shorts 18', category: 'Video Edit', video: 'https://www.youtube.com/embed/dEkoPx_VyXc', tags: ['Editing'] },
    { title: 'Shorts 19', category: 'Video Edit', video: 'https://www.youtube.com/embed/e6KWI9wXzsc', tags: ['Editing'] },
    { title: 'Video 1', category: 'Video Edit', video: 'https://www.youtube.com/embed/dbkR1kKdDO4', tags: ['Editing'] },
    { title: 'Video 2', category: 'Video Edit', video: 'https://www.youtube.com/embed/mIBLnHvF2zE', tags: ['Editing'] },
    { title: 'Video 3', category: 'Video Edit', video: 'https://www.youtube.com/embed/LsEX2jZpgZg', tags: ['Editing'] },
    { title: 'Video 4', category: 'Video Edit', video: 'https://www.youtube.com/embed/3c-TMPbXIrk', tags: ['Editing'] },
    { title: 'Video 5', category: 'Video Edit', video: 'https://www.youtube.com/embed/hHUlfQZsO9o', tags: ['Editing'] }
  ];



  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen flex flex-col text-white selection:bg-[#4fb7b3] selection:text-black cursor-auto overflow-x-hidden">
      <SmoothCursor />
      <FluidBackground />
      <FloatingTextBackground />
      <BlueButterflies />
      
      {/* The actual Blue Glaucus element */}
      <BlueGlaucus active={glaucusActive} />
      
      {/* Navigation Top Header */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-8 py-6 mix-blend-difference pointer-events-auto">
        <Link to="/" className="font-heading text-xl md:text-2xl font-bold tracking-tighter text-white cursor-pointer z-50">
          DE
        </Link>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden z-50 p-2 text-white hover:text-[#a8fbd3] transition-colors"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Main Spread Bottom Navigation Menu */}
      <BottomNav glaucusActive={glaucusActive} setGlaucusActive={setGlaucusActive} />

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-[#31326f]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {[
              { name: 'HOME', path: '/' },
              { name: 'WORK', path: '/portfolio' },
              { name: 'ABOUT', path: '/about' },
              { name: 'CONTACT', path: '/contact' },
              { name: 'REVIEW', path: '/#review' },
              { name: 'GRAPHIC DESIGN', path: 'https://domaindesign.vercel.app/' }
            ].map((item) => {
              const isExternal = item.path.startsWith('/#') || item.path.startsWith('http');
              const isFullExternal = item.path.startsWith('http');
              
              if (isExternal) {
                return (
                  <a
                    key={item.name}
                    href={item.path}
                    target={isFullExternal ? "_blank" : undefined}
                    rel={isFullExternal ? "noopener noreferrer" : undefined}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-3xl font-heading font-bold text-white hover:text-[#a8fbd3] transition-colors uppercase bg-transparent border-none"
                  >
                    {item.name}
                  </a>
                );
              }

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-3xl font-heading font-bold text-white hover:text-[#a8fbd3] transition-colors uppercase bg-transparent border-none"
                >
                  {item.name}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 relative h-[10vw] md:h-[15vw] flex items-center justify-center overflow-visible">
             <h1 className="text-[10vw] font-heading font-bold opacity-50 text-transparent bg-clip-text bg-gradient-to-r from-[#a8fbd3] via-white to-[#a8fbd3] whitespace-nowrap leading-none select-none pointer-events-none tracking-tighter absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 drop-shadow-[0_0_30px_rgba(168,251,211,0.4)]">
               SELECTED WORK
             </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {projects.map((project, index) => (
              <div
                key={project.title}
                className="group relative overflow-visible"
              >
                
                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden border border-white/10 mb-6">
                  {project.video ? (
                    project.video.includes('youtube.com') || project.video.includes('youtu.be') ? (
                      <LazyYoutube url={project.video} className="w-full h-full border-0 bg-black pointer-events-auto" />
                    ) : project.video.includes('collection.cloudinary.com') ? (
                      <iframe src={project.video}
                        
                        className="w-full h-full border-0 bg-black pointer-events-auto"
                        allow="autoplay; fullscreen"
                        allowFullScreen
                      loading={index < 4 ? "eager" : "lazy"} />
                    ) : (
                      <video src={project.video}
                        
                        controls
                        playsInline
                        className="w-full h-full object-cover bg-black"
                      preload="metadata" />
                    )
                  ) : (
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                      referrerPolicy="no-referrer"
                    loading={index < 4 ? "eager" : "lazy"} />
                  )}
                  {!project.video && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 pointer-events-none">
                      <button className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:bg-[#a8fbd3] transition-colors pointer-events-auto">
                        <ExternalLink className="w-5 h-5" />
                      </button>
                    </div>
                  )}
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
            ))}
          </div>
        </div>
      </main>

      <Footer className="mt-auto" />
    </div>
  );
};

export default PortfolioPage;
