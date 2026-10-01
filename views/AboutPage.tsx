import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUp, User, Award, Coffee, Code, Video, Facebook, Instagram } from 'lucide-react';
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

interface ExperienceItem {
  role: string;
  company: string;
  desc: string;
  years: string;
}

const InteractiveExperienceRow: React.FC<{ item: ExperienceItem; index: number }> = ({ item, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(!window.matchMedia("(any-hover: hover)").matches);
  }, []);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => !isTouch && setIsHovered(true)}
      onMouseLeave={() => !isTouch && setIsHovered(false)}
      className="w-full py-8 border-b border-white/10 hover:border-[#a8fbd3]/40 transition-colors duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 relative group overflow-hidden cursor-pointer select-none"
      data-hover="true"
      data-cursor-text={item.years}
    >
      {/* Background slide highlight on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#a8fbd3]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      <div className="flex-1 md:max-w-xs relative z-10">
        <span className="text-[10px] font-mono tracking-widest text-[#a8fbd3] uppercase bg-[#a8fbd3]/10 px-2.5 py-0.5 rounded-full mb-2 inline-block">
          {item.company}
        </span>
        <h3 className="text-xl md:text-2xl font-heading font-bold uppercase text-white group-hover:text-[#a8fbd3] transition-colors duration-300">
          {item.role}
        </h3>
      </div>
      
      <div className="flex-1 md:max-w-xl text-gray-400 text-xs md:text-sm leading-relaxed relative z-10 group-hover:text-white transition-colors duration-300">
        {item.desc}
      </div>

      {/* Physics-like responsive display of years on hover */}
      <div className="relative h-12 w-36 flex items-center justify-end overflow-hidden z-10 pr-2">
        <AnimatePresence mode="wait">
          {isHovered || isTouch ? (
            <motion.div
              key="years"
              initial={{ y: 25, opacity: 0, scale: 0.8, rotate: -6 }}
              animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
              exit={{ y: -25, opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 220, damping: 14 }}
              className="text-right text-base md:text-lg font-mono font-bold text-[#a8fbd3] bg-[#a8fbd3]/10 border border-[#a8fbd3]/30 px-4 py-1.5 rounded-xl shadow-[0_0_20px_rgba(168,251,211,0.25)]"
            >
              {item.years}
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ y: -25, opacity: 0 }}
              animate={{ y: 0, opacity: 0.4 }}
              exit={{ y: 25, opacity: 0 }}
              className="text-right text-xs font-mono uppercase tracking-widest text-gray-500"
            >
              Hover to view
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const AboutPage = () => {
  const [glaucusActive, setGlaucusActive] = useState(false);

  const stats = [
    { label: 'Years Experience', value: '3+', icon: <Award className="w-5 h-5" /> },
    { label: 'Edited Videos', value: '50+', icon: <Video className="w-5 h-5" /> },
    { label: 'Cups of Coffee', value: '1000+', icon: <Coffee className="w-5 h-5" /> },
  ];

  const expertise = [
    { title: 'Premium Video Editing', desc: 'Crafting pacing, structure, and emotional rhythm.' },
    { title: 'Color Correction', desc: 'DaVinci Resolve color correction, look matching, and creative grading.' },
    { title: 'Visual Enhancements', desc: 'Keyframed animations, dynamic titles, and clean brand assets.' },
    { title: 'Creative Storytelling', desc: 'Developing strong narrative hooks and engaging visual sequences.' },
    { title: 'Audio Polish', desc: 'Immersive sound environments, Foley effects, and impact styling.' },
    { title: 'Sound Mastering', desc: 'Level balancing, clean narration tracks, and ambient blending.' },
    { title: 'Smooth Cuts', desc: 'Smooth match cuts, dynamic whips, and customized seamless shifts.' },
    { title: 'Text Effects', desc: 'Kinetic text styling, subtitles, and engaging callout designs.' },
    { title: 'Vertical Formats', desc: 'High-retention edits optimized for TikTok, Instagram Reels, and YouTube Shorts.' },
    { title: 'Long-Form Edits', desc: 'Engaging pacing, multi-cam coordination, and visual retention strategies.' },
    { title: 'Bite-Sized Content', desc: 'Attention-grabbing vertical hooks and viral format designs.' },
    { title: 'Business Promos', desc: 'Professional, clean, polished, and structured company presentations.' },
    { title: 'Audio/Video Syncing', desc: 'Multi-track audio enhancement, talking head layouts, and highlight clips.' },
    { title: 'Dynamic Captions', desc: 'Eye-catching auto-captions with custom animation styles.' },
  ];

  const stack = [
    { name: 'Adobe Premiere Pro', category: 'Core Editing & Assembly' },
    { name: 'Adobe After Effects', category: 'VFX & Visual Enhancements' },
    { name: 'DaVinci Resolve', category: 'Color Correction & Finishing' },
    { name: 'Adobe Photoshop', category: 'Asset Design & Thumbnails' },
    { name: 'Adobe Illustrator', category: 'Vector Assets & Logos' },
    { name: 'Adobe Audition', category: 'Audio Rescue & Precision Mix' },
  ];

  const experienceList = [
    {
      role: 'Lead Video Editor & Post-Production Specialist',
      company: 'Creative Media Agency',
      desc: 'Spearheaded premium video editing projects, designed Audio Polish templates, and optimized content delivery pipelines for social networks and commercials.',
      years: '2019-2023',
    },
    {
      role: 'Senior Creative Editor & Motion Graphic Artist',
      company: 'Domain Edits Studio',
      desc: 'Formulated visual strategies for high-retention short-form edits, created customized after-effects presets, and oversaw the digital content framework.',
      years: '2024-2025',
    },
    {
      role: 'Creative Director & Post-Production Specialist',
      company: 'Elite Production Lab',
      desc: 'Steered narrative flow for high-end digital releases, coordinated high-fidelity audio workflows, and executed premium DaVinci Resolve grading routines.',
      years: '2025-2026',
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen flex flex-col text-white selection:bg-[#4fb7b3] selection:text-black cursor-auto overflow-x-hidden">
      <SmoothCursor />
      <FluidBackground />
      <FloatingTextBackground />
      
      {/* The actual Blue Glaucus element */}
      <BlueGlaucus active={glaucusActive} />
      
      {/* Bottom Spread Navigation Menu */}
      <BottomNav glaucusActive={glaucusActive} setGlaucusActive={setGlaucusActive} />

      {/* Main Content */}
      <main className="relative z-10 pt-32 pb-20 px-6 overflow-hidden">
        <BlueButterflies />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 relative h-[10vw] md:h-[15vw] flex items-center justify-center">
             <h1 className="text-[14vw] md:text-[16vw] font-heading font-bold opacity-10 text-white whitespace-nowrap leading-none select-none pointer-events-none tracking-tighter absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
               ABOUT ME
             </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div
              className="flex flex-col"
            >
              <div className="mb-6">
                <GradientText text="VIDEO EDITORS" className="text-3xl md:text-4xl font-heading font-black tracking-tighter uppercase mb-2" />
                <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                  <strong>Domain Edits</strong> is a boutique video editing and creative post-production studio dedicated to transforming raw footage into compelling visual stories. We specialize in Premium Video Editing, Visual Enhancements, Color Correction, and dynamic Creative Storytelling that captivate audiences and bring ideas to life. Every frame is crafted with precision, creativity, and purpose—bridging the gap between imagination and reality.
                </p>
              </div>

              <div className="relative group" data-hover="true" data-cursor-text="HELLO">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#a8fbd3] to-[#4fb7b3] rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
                <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10">
                  <img 
                    src="https://res.cloudinary.com/dhejaxxje/image/upload/v1786132094/1000427662_11zon_uhhcph.jpg" 
                    alt="Domain Edits" 
                    className="w-full h-full object-cover transition-all duration-700 scale-110 hover:scale-100"
                    referrerPolicy="no-referrer"
                   />
                </div>
              </div>

              <div className="mt-8 text-gray-400 text-xs md:text-sm leading-relaxed space-y-4">
                <p>
                  At <strong>Domain Edits</strong>, we believe the most powerful videos are created when storytelling, editing, and visual design work together as one seamless process. Our work combines cinematic creativity with technical precision to produce content that is engaging, impactful, and memorable.
                </p>
                <p>
                  We specialize in premium video editing, Color Correction, Visual Enhancements, and Creative Storytelling for brands, creators, and businesses. Every cut, transition, sound cue, and frame is carefully refined to enhance the narrative, evoke emotion, and deliver a polished viewing experience. We are driven by the details—because every second matters.
                </p>
              </div>
            </div>

            <div
            >
              <h3 className="text-2xl md:text-3xl font-heading font-bold mb-6 uppercase">Crafting Stories That Keep Audiences Watching.</h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center">
                    <div className="w-10 h-10 rounded-full bg-[#a8fbd3]/10 flex items-center justify-center text-[#a8fbd3] mx-auto mb-4">
                      {stat.icon}
                    </div>
                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                    <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* EXPERTISE SECTION */}
          <div className="mt-32">
            <div className="text-center md:text-left mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[#a8fbd3] font-mono text-xs uppercase tracking-widest mb-4"
              >
                Capabilities
              </motion.div>
              <h2 className="text-[15vw] md:text-[18vw] font-heading font-black uppercase tracking-tighter text-white opacity-15 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] block overflow-hidden text-center whitespace-nowrap leading-none select-none pointer-events-none py-2">
                Expertise
              </h2>
              <p className="text-gray-400 max-w-2xl mt-4 text-sm md:text-base">
                A breakdown of core video production competencies refined through creative exploration and client delivery.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {expertise.map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className="p-6 rounded-2xl bg-white/[0.02] backdrop-blur-md border border-white/5 hover:border-[#a8fbd3]/30 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between"
                  data-hover="true"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#a8fbd3]/10 to-transparent rounded-bl-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div>
                    <span className="text-xs font-mono text-gray-600 group-hover:text-[#a8fbd3]/60 transition-colors duration-300 block mb-4">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-lg font-heading font-bold uppercase mb-2 text-white group-hover:text-[#a8fbd3] transition-colors duration-300">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed group-hover:text-gray-300 transition-colors duration-300 mt-2">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* EXPERIENCE SECTION */}
          <div className="mt-32">
            <div className="text-center md:text-left mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[#a8fbd3] font-mono text-xs uppercase tracking-widest mb-4"
              >
                Journey
              </motion.div>
              <h2 className="text-[15vw] md:text-[18vw] font-heading font-black uppercase tracking-tighter text-white opacity-15 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] block overflow-hidden text-center whitespace-nowrap leading-none select-none pointer-events-none py-2">
                Experience
              </h2>
              <p className="text-gray-400 max-w-2xl mt-4 text-sm md:text-base">
                A selection of milestones and long-term production contracts completed with agencies and studios.
              </p>
            </div>

            <div className="flex flex-col border-t border-white/10">
              {experienceList.map((item, idx) => (
                <InteractiveExperienceRow key={item.role} item={item} index={idx} />
              ))}
            </div>
          </div>

          {/* STACK SECTION */}
          <div className="mt-32">
            <div className="text-center md:text-left mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[#4fb7b3] font-mono text-xs uppercase tracking-widest mb-4"
              >
                Production Tools
              </motion.div>
              <h2 className="text-[15vw] md:text-[18vw] font-heading font-black uppercase tracking-tighter text-white opacity-15 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] block overflow-hidden text-center whitespace-nowrap leading-none select-none pointer-events-none py-2">
                Creative Stack
              </h2>
              <p className="text-gray-400 max-w-2xl mt-4 text-sm md:text-base">
                Industry-standard software suites utilized to deliver pixel-perfect precision and high-fidelity post-production.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {stack.map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="p-6 rounded-2xl bg-white/[0.01] hover:bg-white/[0.03] backdrop-blur-md border border-white/5 hover:border-[#4fb7b3]/40 transition-all duration-300 relative overflow-hidden group cursor-pointer select-none"
                  data-hover="true"
                  data-cursor-text={item.name.split(' ').pop()?.toUpperCase()}
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#a8fbd3]/0 via-[#4fb7b3]/0 to-[#a8fbd3]/0 group-hover:from-[#a8fbd3]/5 group-hover:via-[#4fb7b3]/5 group-hover:to-[#a8fbd3]/5 transition-all duration-700 blur" />
                  
                  <div className="relative flex flex-col justify-between h-full">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-[#4fb7b3] uppercase bg-[#4fb7b3]/10 px-2.5 py-0.5 rounded-full block w-fit mb-4">
                        {item.category}
                      </span>
                      <h3 className="text-xl md:text-2xl font-heading font-black uppercase text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#a8fbd3] transition-colors duration-300">
                        {item.name}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Find Us On Floating Bar with Glass Effect */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-24 md:mb-32 relative z-20">
        <div className="w-full bg-white/[0.02] border border-white/10 rounded-3xl py-10 md:py-14 px-8 md:px-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-xl shadow-[0_25px_60px_rgba(0,0,0,0.5)]">
          {/* Subtle decorative background glow */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 bg-[#a8fbd3]/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 bg-[#4fb7b3]/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#a8fbd3] mb-3">Connect with the Studio</span>
            <h2 className="text-3xl md:text-5xl font-heading font-black uppercase tracking-tight text-white">
              Find Us On
            </h2>
          </div>

          <div className="relative z-10 flex items-center justify-center gap-5">
            {[
              { name: 'Facebook', icon: Facebook, url: 'https://www.facebook.com/people/DomainEdit/61591837791833/' },
              { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/domain.editss/' },
            ].map((social, idx) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -6, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 rounded-2xl bg-white/[0.03] hover:bg-[#a8fbd3]/10 border border-white/10 hover:border-[#a8fbd3]/40 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.3)] group cursor-pointer"
                data-hover="true"
                data-cursor-text={social.name.toUpperCase()}
              >
                <social.icon className="w-6 h-6 group-hover:text-[#a8fbd3] transition-colors duration-300" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      <Footer className="mt-auto" />
    </div>
  );
};

export default AboutPage;
