import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Star, Sparkles, ExternalLink } from 'lucide-react';
import BottomNav from '../ui/BottomNav';
import FluidBackground from '../ui/FluidBackground';
import FloatingTextBackground from '../ui/FloatingTextBackground';
import Footer from '../ui/Footer';
import { SmoothCursor } from '../ui/magicui/smooth-cursor';
import { BlueGlaucus } from '../ui/BlueGlaucus';
import { BlueButterflies } from '../ui/BlueButterflies';

interface Review {
  id: number;
  client: string;
  role: string;
  bio?: string;
  rating: number;
  comment: string;
  image: string;
  platform: string;
}

const reviewsData: Review[] = [
  {
    id: 1,
    client: 'Valorant Creator',
    role: 'Gaming Creator & Streamer',
    bio: 'Radiant-tier competitive streamer and YouTube montage artist delivering high-octane FPS clutches to 180K+ subscribers.',
    rating: 5,
    comment: 'The Valorant montage was insane! Clean beat sync, crisp color grading, and flawless flow throughout.',
    image: 'https://i.postimg.cc/sfhmHG8J/Valorant-Montage-Chat-with-Puppy-Profile-(1).png',
    platform: 'Valorant Montage',
  },
  {
    id: 2,
    client: 'Artisan Beans Roastery',
    role: 'Specialty Coffee Brand Director',
    bio: 'Direct-to-consumer specialty craft coffee roastery known for ethical single-origin harvests and sensory culinary storytelling.',
    rating: 5,
    comment: 'Our roasted bean commercial looks like a high-end cinematic documentary. Rich warm color grading, sensory macro pacing, and flawless audio mix that drove massive direct sales.',
    image: 'https://i.postimg.cc/QCphw2mb/2-beans-enhanced.png',
    platform: 'Brand Commercial & Social Ads',
  },
  {
    id: 3,
    client: 'Fairy Candles Studio',
    role: 'Aesthetic Lifestyle Founder',
    bio: 'Artisan botanical candle studio crafting hand-poured soy wax goods, aesthetic home decor, and viral calming ASMR showcases.',
    rating: 5,
    comment: 'The ethereal lighting and dreamy aesthetic transitions made our candle collection look truly magical. Highest converting product showcase we have ever run!',
    image: 'https://i.postimg.cc/PqRXwzNZ/3-fairy-candles-enhanced.png',
    platform: 'E-Commerce Product Showcase',
  },
  {
    id: 4,
    client: 'Apex Creator Podcast',
    role: 'Podcast Host & Video Producer',
    bio: 'Weekly creator economy & tech entrepreneurship podcast producing high-retention multi-cam clips and viral vertical reels across YouTube Shorts, Reels, and TikTok.',
    rating: 5,
    comment: 'These podcast clip highlights are unreal! Sharp speaker framing, punchy animated captions, and tight pacing that doubled our short-form reach overnight.',
    image: 'https://i.postimg.cc/HLF44944/Podcast-Clip-Highlights-Chat-(1).png',
    platform: 'Podcast Clips & Short-Form Reels',
  },
  {
    id: 5,
    client: 'Neon Pulse Reacts',
    role: 'Reaction & Entertainment Creator',
    bio: 'High-energy reaction YouTuber and variety streamer with 290K+ subscribers known for vibrant neon motion graphics, comedic timing, and interactive end screens.',
    rating: 5,
    comment: 'Love how the neon reaction outro turned out! The glowing cyan-magenta accents, crisp sound effects, and end-card motion flow keep viewers clicking right into the next video.',
    image: 'https://i.postimg.cc/nLNYYGYr/Neon-Reaction-Outro-Chat-Screenshot-(1).jpg',
    platform: 'Neon Reaction Outro & Branding',
  },
  {
    id: 6,
    client: 'WildHorizon Docs',
    role: 'Nature & Wildlife Filmmaker',
    bio: 'Independent wildlife cinematographer and conservation storyteller capturing raw expedition footage and atmospheric nature documentaries in 4K HDR.',
    rating: 5,
    comment: 'Truly breathtaking documentary pacing! The natural color grading, immersive ambient foley soundscape, and seamless storytelling elevated our expedition footage to broadcast quality.',
    image: 'https://i.postimg.cc/k5LFFvFN/Wildlife-Documentary-Chat-Preview-(1).png',
    platform: 'Wildlife Documentary Edit',
  },
  {
    id: 7,
    client: 'Banter Brigade',
    role: 'Comedy & Gaming Creator Collective',
    bio: 'High-energy gaming and comedy squad with 450K+ subscribers known for hilarious squad banter, chaotic challenge videos, and viral funny moments compilations.',
    rating: 5,
    comment: 'The funny moments edit had our entire squad crying laughing! Perfect comedic zoom cuts, meme SFX timing, and animated subtitles that kept viewers glued from start to finish.',
    image: 'https://i.postimg.cc/yN2XXyXy/Banter-Brigade-Funny-Moments-Chat-(1).png',
    platform: 'Gaming Funny Moments Edit',
  },
];

const ReviewsPage: React.FC = () => {
  const [glaucusActive, setGlaucusActive] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeImageIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeImageIndex]);

  const handleNext = () => {
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex + 1) % reviewsData.length);
    }
  };

  const handlePrev = () => {
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex - 1 + reviewsData.length) % reviewsData.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImageIndex === null) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setActiveImageIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex]);

  return (
    <div className="relative min-h-screen flex flex-col text-white selection:bg-[#4fb7b3] selection:text-black cursor-auto overflow-x-hidden">
      <SmoothCursor />
      <FluidBackground />
      <FloatingTextBackground />
      <BlueButterflies />
      
      {/* Blue Glaucus element */}
      <BlueGlaucus active={glaucusActive} />
      
      {/* Navigation */}
      <BottomNav glaucusActive={glaucusActive} setGlaucusActive={setGlaucusActive} />

      {/* Main Content */}
      <main className="relative z-10 pt-32 pb-28 px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-20 relative">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#a8fbd3]/10 border border-[#a8fbd3]/30 text-[#a8fbd3] text-xs font-mono uppercase tracking-widest mb-6"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Client Testimonials</span>
            </motion.div>

            <h1 className="text-4xl md:text-7xl font-heading font-black tracking-tighter uppercase mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-[#a8fbd3] to-white drop-shadow-[0_0_35px_rgba(168,251,211,0.3)]">
              CLIENT REVIEWS
            </h1>

            <p className="text-gray-400 font-sans text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Read authentic feedback and inspect real project satisfaction metrics from creators, brands, and agencies worldwide.
            </p>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviewsData.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-[#a8fbd3]/50 p-6 rounded-3xl flex flex-col justify-between transition-all duration-500 hover:shadow-[0_10px_30px_rgba(168,251,211,0.15)]"
              >
                <div>
                  {/* Top Bar: Client & Stars */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <h3 className="text-lg font-heading font-bold text-white">
                      {review.client}
                    </h3>
                    <div className="flex items-center gap-1 text-yellow-400 shrink-0">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  {/* Clickable Review Image Thumbnail - Cleanly Framed */}
                  <div 
                    onClick={() => setActiveImageIndex(index)}
                    className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 group-hover:border-[#a8fbd3]/40 cursor-pointer mb-3 transition-all bg-black/60 flex items-center justify-center p-2"
                  >
                    <img 
                      src={review.image} 
                      alt={review.platform} 
                      className="w-full h-full object-contain rounded-xl group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                      <span className="text-xs font-mono uppercase tracking-widest text-[#a8fbd3] bg-black/80 px-3 py-1.5 rounded-xl border border-[#a8fbd3]/30 backdrop-blur-md">
                        Open Review
                      </span>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="flex items-center justify-between border-t border-white/10 pt-3">
                    <button
                      type="button"
                      onClick={() => setActiveImageIndex(index)}
                      className="text-xs font-mono text-[#a8fbd3] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>View Screenshot</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-mono text-gray-500">#0{review.id}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </main>

      {/* LIGHTBOX MODAL - Shows properly sized pic when each review is opened */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {activeImageIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-4 md:p-10 select-none"
              onClick={() => setActiveImageIndex(null)}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveImageIndex(null)}
                className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 border border-white/20 text-white hover:text-[#a8fbd3] hover:border-[#a8fbd3]/50 transition-all shadow-xl"
                aria-label="Close image"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Previous Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-white/10 border border-white/20 text-white hover:text-[#a8fbd3] hover:border-[#a8fbd3]/50 transition-all shadow-xl"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-white/10 border border-white/20 text-white hover:text-[#a8fbd3] hover:border-[#a8fbd3]/50 transition-all shadow-xl"
                aria-label="Next review"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Modal Content - Properly Sized Pic */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center bg-[#0a0a0a] rounded-3xl border border-white/20 p-5 md:p-6 overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.95)] my-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Properly Sized Pic Container */}
                <div className="w-full max-h-[64vh] rounded-2xl overflow-hidden mb-4 border border-white/10 relative bg-black/90 flex items-center justify-center p-3">
                  <img
                    src={reviewsData[activeImageIndex].image}
                    alt={reviewsData[activeImageIndex].client}
                    className="max-w-full max-h-[60vh] w-auto h-auto object-contain rounded-xl shadow-2xl"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-white/10 pt-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-[#a8fbd3] uppercase tracking-wider">
                        {reviewsData[activeImageIndex].platform}
                      </span>
                      <span className="text-gray-500">•</span>
                      <div className="flex items-center text-yellow-400">
                        {[...Array(reviewsData[activeImageIndex].rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </div>
                    <h3 className="text-lg md:text-xl font-heading font-bold text-white">
                      {reviewsData[activeImageIndex].client} — <span className="text-gray-400 font-sans text-xs md:text-sm font-normal">{reviewsData[activeImageIndex].role}</span>
                    </h3>
                    {reviewsData[activeImageIndex].bio && (
                      <div className="mt-2 mb-2 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 max-w-xl">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-[#a8fbd3] block mb-0.5">Creator Bio</span>
                        <p className="text-gray-300 text-xs leading-relaxed">
                          {reviewsData[activeImageIndex].bio}
                        </p>
                      </div>
                    )}
                    <p className="text-gray-300 text-xs md:text-sm mt-1 italic">
                      "{reviewsData[activeImageIndex].comment}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-xs font-mono text-gray-400 whitespace-nowrap">
                      Review {activeImageIndex + 1} of {reviewsData.length}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      <Footer className="mt-auto" />
    </div>
  );
};

export default ReviewsPage;
