import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Star, Quote, Sparkles, ExternalLink } from 'lucide-react';
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
  rating: number;
  comment: string;
  image: string;
  platform: string;
}

const reviewsData: Review[] = [
  {
    id: 1,
    client: 'Alex Vance',
    role: 'YouTube Creator (500k+ Subs)',
    rating: 5,
    comment: 'Dominic completely transformed my retention rate! The pacing, sound design, and color grading on my latest long-form video are absolute masterclasses.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    platform: 'YouTube Project',
  },
  {
    id: 2,
    client: 'Sarah Jenkins',
    role: 'Marketing Director, Vibe Media',
    rating: 5,
    comment: 'Incredible turnaround time and flawless communication. The vertical reels he edited went viral within 48 hours. Will definitely hire again!',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    platform: 'Instagram Reels Campaign',
  },
  {
    id: 3,
    client: 'Marcus Thorne',
    role: 'Podcast Host',
    rating: 5,
    comment: 'The audio polishing and multi-cam synching are studio-grade. Clean cuts and zero dead air. Absolutely phenomenal work ethic.',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
    platform: 'Podcast Editing',
  },
  {
    id: 4,
    client: 'Elena Rostova',
    role: 'E-Commerce Brand Founder',
    rating: 5,
    comment: 'Our product promo video looks like a Super Bowl commercial. The cinematic color grading and dynamic text effects elevated our brand instantly.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    platform: 'Commercial Promo',
  },
  {
    id: 5,
    client: 'David Chen',
    role: 'Tech Reviewer',
    rating: 5,
    comment: 'Fast, precise, and deeply creative. Dominic knows how to hook viewers in the first 3 seconds and keep them glued to the screen.',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
    platform: 'Tech Showcase Video',
  },
  {
    id: 6,
    client: 'Jessica Taylor',
    role: 'Lifestyle Influencer',
    rating: 5,
    comment: 'The kinetic captions and seamless transitions are unreal! My followers keep asking who edits my videos. Top tier talent!',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
    platform: 'Shorts & TikToks',
  },
];

const ReviewsPage: React.FC = () => {
  const [glaucusActive, setGlaucusActive] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

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
                  {/* Top Bar: Platform & Stars */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono tracking-wider uppercase bg-white/5 border border-white/10 px-3 py-1 rounded-full text-[#a8fbd3]">
                      {review.platform}
                    </span>
                    <div className="flex items-center gap-1 text-yellow-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>

                  {/* Comment */}
                  <div className="relative mb-6">
                    <Quote className="absolute -top-2 -left-2 w-8 h-8 text-white/5 pointer-events-none" />
                    <p className="text-gray-300 text-sm leading-relaxed relative z-10 italic">
                      "{review.comment}"
                    </p>
                  </div>
                </div>

                <div>
                  {/* Clickable Review Image Preview */}
                  <div 
                    onClick={() => setActiveImageIndex(index)}
                    className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 group-hover:border-[#a8fbd3]/40 cursor-pointer mb-6 transition-all"
                  >
                    <img 
                      src={review.image} 
                      alt={review.client} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-xs font-mono uppercase tracking-widest text-[#a8fbd3] bg-black/60 px-3 py-1.5 rounded-xl border border-[#a8fbd3]/30 backdrop-blur-md">
                        Click to Expand
                      </span>
                    </div>
                  </div>

                  {/* Client Info */}
                  <div className="flex items-center justify-between border-t border-white/10 pt-4">
                    <div>
                      <h4 className="font-heading font-bold text-base text-white">{review.client}</h4>
                      <p className="text-xs font-mono text-gray-400">{review.role}</p>
                    </div>
                    <span className="text-xs font-mono text-[#a8fbd3]">#0{review.id}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </main>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-4 md:p-12 select-none"
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

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center bg-slate-950/80 rounded-3xl border border-white/20 p-6 overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden mb-6 border border-white/10 relative">
                <img
                  src={reviewsData[activeImageIndex].image}
                  alt={reviewsData[activeImageIndex].client}
                  className="w-full h-full object-cover"
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
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-white">
                    {reviewsData[activeImageIndex].client} — <span className="text-gray-400 font-sans text-sm font-normal">{reviewsData[activeImageIndex].role}</span>
                  </h3>
                  <p className="text-gray-300 text-sm mt-2 italic">
                    "{reviewsData[activeImageIndex].comment}"
                  </p>
                </div>

                <div className="text-xs font-mono text-gray-400 self-end md:self-center">
                  Review {activeImageIndex + 1} of {reviewsData.length}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer className="mt-auto" />
    </div>
  );
};

export default ReviewsPage;
