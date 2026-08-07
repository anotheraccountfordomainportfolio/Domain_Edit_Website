import React, { useRef, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Ticket, Globe, Zap, Music, MapPin, Menu, X, Calendar, Play, ChevronLeft, ChevronRight, Facebook, Instagram, Heart, Users, Send, Mail, Phone, MessageSquare, ArrowUp, Video, Sparkles, Palette, Headphones, Smartphone, Tv } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import FluidBackground from '../ui/FluidBackground';
import FloatingTextBackground from '../ui/FloatingTextBackground';
import GradientText from '../ui/GlitchText';
import { KineticText } from '../ui/KineticText';
import Footer from '../ui/Footer';
import { SmoothCursor } from '../ui/magicui/smooth-cursor';
import BottomNav from '../ui/BottomNav';
import { BlueButterflies } from '../ui/BlueButterflies';
import { Snail } from '../ui/Snail';
import { BlueGlaucus } from '../ui/BlueGlaucus';

// Dummy Data
const SKILLS = [
  { name: 'Video Editing', level: 'Adobe Premiere Pro', icon: <Video className="w-6 h-6" />, description: 'Crafting seamless cuts and compelling narratives.' },
  { name: 'Visual Effects', level: 'Adobe After Effects', icon: <Sparkles className="w-6 h-6" />, description: 'Adding dynamic elements and animations.' },
  { name: 'Finishing', level: 'DaVinci Resolve', icon: <Palette className="w-6 h-6" />, description: 'Enhancing mood and visual consistency.' },
  { name: 'Audio Enhancement', level: 'Adobe Audition', icon: <Headphones className="w-6 h-6" />, description: 'Mastering audio for optimal clarity.' },
  { name: 'Vertical Videos', level: 'TikTok • Reels • Shorts', icon: <Smartphone className="w-6 h-6" />, description: 'Optimizing content for vertical viewing and high engagement.' },
  { name: 'Extended Videos', level: 'YouTube • Documentary', icon: <Tv className="w-6 h-6" />, description: 'Structuring extended videos for maximum retention.' },
];

const HomePage: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [glaucusActive, setGlaucusActive] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success('Message sent! I will get back to you soon.');
    }, 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <div className="relative min-h-screen flex flex-col text-white selection:bg-[#4fb7b3] selection:text-black cursor-auto overflow-x-hidden">
      <SmoothCursor />
      <FluidBackground />
      <FloatingTextBackground />

      {/* The actual Blue Glaucus element */}
      <BlueGlaucus active={glaucusActive} />
      
      {/* Navigation Top Header */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-8 py-6 mix-blend-difference pointer-events-auto">
        <Link to="/" className="font-heading text-xl md:text-2xl font-bold tracking-tighter text-white cursor-pointer z-50">
          DE
        </Link>
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
              { name: 'WORK', path: '/portfolio' },
              { name: 'SKILL', path: '/skill' },
              { name: 'ABOUT', path: '/about' },
              { name: 'CONTACT', path: '/contact' }
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="text-4xl font-heading font-bold text-white hover:text-[#a8fbd3] transition-colors uppercase bg-transparent border-none"
              >
                {item.name}
              </Link>
            ))}
            

          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <header className="relative h-[100svh] min-h-[600px] flex flex-col items-center justify-center overflow-hidden px-4">
        <BlueButterflies />
        <motion.div 
          style={{ y, opacity }}
          className="z-10 text-center flex flex-col items-center w-full max-w-6xl pb-24 md:pb-20"
        >
           {/* Date / Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center gap-3 md:gap-6 text-xs md:text-base font-mono text-[#a8fbd3] tracking-[0.2em] md:tracking-[0.3em] uppercase mb-4 bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm"
          >
            <span>VIDEO</span>
            <span>EDITOR</span>
          </motion.div>

          {/* Main Title */}
          <div className="relative w-full flex justify-center items-center">
            <KineticText 
              text="DOMAIN EDITS" 
              as="h1" 
              className="text-[12vw] md:text-[10vw] leading-[0.9] font-black tracking-tighter text-center z-10" 
            />
            
            {/* Static Orb */}
            <div 
               className="absolute -z-20 w-[50vw] h-[50vw] bg-white/5 blur-[40px] rounded-full pointer-events-none opacity-40"
            />
          </div>
          
          <motion.div
             initial={{ scaleX: 0 }}
             animate={{ scaleX: 1 }}
             transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
             className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-white/50 to-transparent mt-4 md:mt-8 mb-6 md:mb-8"
          />

        </motion.div>

        {/* MARQUEE CONTAINER WITH SLOW-WALKING SNAIL */}
        <div className="absolute bottom-12 md:bottom-24 left-[-5vw] w-[110vw] z-20 overflow-visible pointer-events-none transform rotate-3 origin-center">
          <Snail />
          <div className="w-full py-4 md:py-6 bg-white text-black overflow-hidden border-y-4 border-black shadow-[0_0_40px_rgba(255,255,255,0.4)] pointer-events-auto">
            <motion.div 
              className="flex w-fit will-change-transform"
              animate={{ x: "-50%" }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
              {/* Duplicate content for seamless loop */}
              {[0, 1].map((key) => (
                <div key={key} className="flex whitespace-nowrap shrink-0">
                  {[...Array(4)].map((_, i) => (
                    <span key={i} className="text-3xl md:text-7xl font-heading font-black px-8 flex items-center gap-4">
                      SKILLS <span className="text-black text-2xl md:text-4xl">●</span> 
                      ABILITIES <span className="text-black text-2xl md:text-4xl">●</span> 
                    </span>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </header>

      {/* Recent Works / Video Showcase */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-16 z-30">
        <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-[#a8fbd3]/5 via-transparent to-[#4fb7b3]/5 blur-[80px] rounded-3xl" />
        
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[#a8fbd3] font-mono text-xs uppercase tracking-widest mb-4">
            Featured Projects
          </div>
          <h2 className="text-4xl md:text-6xl font-heading font-bold uppercase tracking-tight text-white justify-center text-center">
            Recent Work
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "LATEST SHOWCASE", tag: "Post Production", url: "https://www.youtube.com/embed/hHUlfQZsO9o", desc: "Featured video editing and post-production highlight." },
            { title: "VIDEO EDITING", tag: "Premiere Pro", url: "https://www.youtube.com/embed/-EbQmeQ5y9c", desc: "Fast-paced cuts, pacing, and seamless transitions." },
            { title: "VISUAL EFFECTS", tag: "After Effects", url: "https://www.youtube.com/embed/d0mbJpaAnCw", desc: "Dynamic motion graphics, visual effects, and hooks." },
            { title: "COLOR & FINISHING", tag: "DaVinci Resolve", url: "https://www.youtube.com/embed/dbkR1kKdDO4", desc: "Mood enhancement and professional color grading." },
            { title: "AUDIO DESIGN", tag: "Audition", url: "https://www.youtube.com/embed/mIBLnHvF2zE", desc: "Immersive sound design and crisp audio mastering." },
            { title: "VERTICAL CONTENT", tag: "TikTok • Reels • Shorts", url: "https://www.youtube.com/embed/sy_PCFRjkRo", desc: "High retention vertical content editing." }
          ].map((project, idx) => (
            <div key={idx} className="bg-white/[0.02] backdrop-blur-xl border border-white/10 p-4 md:p-6 rounded-3xl shadow-[0_16px_36px_rgba(0,0,0,0.4)] flex flex-col justify-between hover:border-[#a8fbd3]/40 transition-all duration-300 group">
              <div>
                <div className="relative overflow-hidden rounded-2xl aspect-video border border-white/5 bg-black mb-4 shadow-inner">
                  <iframe
                    src={project.url}
                    className="w-full h-full border-0 pointer-events-auto"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#a8fbd3] text-[10px] font-mono uppercase tracking-widest bg-[#a8fbd3]/10 px-2.5 py-0.5 rounded-full">
                    {project.tag}
                  </span>
                </div>
                <h3 className="text-xl font-heading font-bold uppercase mb-2 text-white group-hover:text-[#a8fbd3] transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  {project.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-heading font-bold uppercase tracking-widest rounded-xl hover:bg-[#a8fbd3] transition-all duration-300 shadow-lg"
          >
            View All Work
          </Link>
        </div>
      </div>

      {/* LINEUP SECTION */}
      <section id="skill" className="relative z-10 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 px-4">
             <KineticText
              text="what we do best"
              as="h2"
              className="text-5xl md:text-8xl font-heading font-bold uppercase leading-[0.9] drop-shadow-lg break-words w-full md:w-auto justify-center md:justify-start"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            {SKILLS.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl hover:border-[#a8fbd3]/50 transition-colors group"
                data-hover="true"
                data-cursor-text={skill.name.toUpperCase()}
              >
                <div className="w-12 h-12 rounded-full bg-[#a8fbd3]/10 flex items-center justify-center text-[#a8fbd3] mb-6 group-hover:scale-110 transition-transform">
                  {skill.icon}
                </div>
                <h3 className="text-2xl font-heading font-bold mb-2 uppercase">{skill.name}</h3>
                <p className="text-[#a8fbd3] text-xs font-mono uppercase tracking-widest mb-4">{skill.level}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{skill.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section id="about" className="relative z-10 py-20 md:py-32 bg-black/20 backdrop-blur-sm border-t border-white/10 overflow-hidden">
        {/* Decorative blurred circle - Optimized */}
        <div className="absolute top-1/2 right-[-20%] w-[50vw] h-[50vw] bg-[#4fb7b3]/20 rounded-full blur-[40px] pointer-events-none will-change-transform" style={{ transform: 'translateZ(0)' }} />

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
          <div className="max-w-4xl mx-auto">
            <div className="relative pt-12 pb-8 flex flex-col items-center lg:items-start w-full min-h-[300px]">
              {/* Backing large text "VIDEO EDITORS" */}
              <div
                className="absolute top-4 left-1/2 lg:left-8 -translate-x-1/2 lg:translate-x-0 z-0 whitespace-nowrap"
              >
                <h2 className="text-6xl md:text-[8vw] font-heading font-black tracking-tighter uppercase drop-shadow-[0_0_35px_rgba(168,251,211,0.25)] select-none pointer-events-none justify-center bg-gradient-to-r from-white via-[#a8fbd3] via-[#4fb7b3] via-[#637ab9] to-white bg-[length:200%_auto] bg-clip-text text-transparent">
                  VIDEO EDITORS
                </h2>
              </div>

              {/* Clean static card without any float, transition, or gradient animations */}
              <div
                className="relative z-10 mt-16 md:mt-24 lg:ml-20 bg-black/45 border border-white/10 p-6 md:p-8 rounded-3xl max-w-xl text-center lg:text-left"
              >
                <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4 leading-tight uppercase text-white">
                  Built on <br/> 
                  <span className="text-4xl md:text-6xl justify-center lg:justify-start mt-2 inline-block text-white font-black">
                    CREATIVITY
                  </span>
                </h2>
                
                <div className="inline-block bg-white/10 border border-white/5 px-4 py-1.5 rounded-full">
                  <h3 className="text-[10px] md:text-xs font-mono text-[#a8fbd3] tracking-[0.15em] uppercase">
                    EDITOR. CREATOR. PROBLEM SOLVER.
                  </h3>
                </div>
              </div>
            </div>
            
            <div className="text-center lg:text-left mt-8">
              <p className="text-lg md:text-xl text-gray-200 mb-4 font-light leading-relaxed drop-shadow-md">
                With 3+ years of experience in video editing, I combine creativity with technical precision to craft engaging, high-impact content. I adapt quickly, solve creative challenges efficiently, and deliver edits that strengthen brands, capture attention, and drive results.
              </p>
              <p className="text-xs md:text-sm text-[#a8fbd3]/70 font-mono uppercase tracking-[0.2em] mb-8 md:mb-12 italic">
                I don't just edit videos. I create experiences that resonate.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                {[
                  { icon: Heart, title: '100%', desc: 'Customer Satisfaction' },
                  { icon: Zap, title: '3+ YEARS', desc: 'Industry Experience' },
                  { icon: Users, title: '20+', desc: 'Trusted Clients' },
                ].map((feature, i) => (
                  <div
                    key={i} 
                    className="flex flex-col items-center lg:items-start gap-4"
                  >
                    <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/5">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg md:text-xl font-bold mb-1 font-heading uppercase">{feature.title}</h4>
                      <p className="text-[10px] md:text-xs font-mono text-[#a8fbd3] uppercase tracking-[0.2em]">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUSTED BY SECTION */}
      <section className="relative z-10 py-16 bg-black/40 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm font-mono text-gray-400 uppercase tracking-[0.3em] mb-10">Trusted by over 20+ clients</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 hover:opacity-100 transition-opacity duration-500">
            <a 
              href="https://www.facebook.com/people/DomainEdit/61591837791833/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="cursor-pointer text-gray-400 hover:text-[#1877F2]"
              data-hover="true"
              data-cursor-text="FACEBOOK"
            >
              <Facebook className="w-8 h-8 md:w-10 md:h-10 transition-colors" />
            </a>
            <a 
              href="https://www.instagram.com/domain.editss/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="cursor-pointer text-gray-400 hover:text-[#E4405F]"
              data-hover="true"
              data-cursor-text="INSTAGRAM"
            >
              <Instagram className="w-8 h-8 md:w-10 md:h-10 transition-colors" />
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="relative z-10 py-20 md:py-32 px-4 md:px-6 bg-black/30 backdrop-blur-lg overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-20 relative h-[10vw] md:h-[15vw] flex items-center justify-center overflow-visible">
             <h2 className="text-[14vw] md:text-[16vw] font-heading font-bold opacity-50 text-transparent bg-clip-text bg-gradient-to-r from-[#a8fbd3] via-white to-[#a8fbd3] whitespace-nowrap leading-none select-none pointer-events-none tracking-tighter absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 drop-shadow-[0_0_30px_rgba(168,251,211,0.4)]">
               LETS TALK
             </h2>
             
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-4xl md:text-6xl font-heading font-bold mb-8 uppercase leading-tight">
                WANNA <br/> <KineticText text="DISCUSS" as="span" className="justify-start mt-2" />
              </h3>
              <p className="text-gray-400 text-lg mb-12 max-w-md">
                I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6 group">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#a8fbd3] group-hover:text-black transition-all duration-300">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-[#a8fbd3] uppercase tracking-widest mb-1">Email me</p>
                    <p className="text-xl font-bold">Domain.Edits@outlook.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 group">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#a8fbd3] group-hover:text-black transition-all duration-300">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-[#a8fbd3] uppercase tracking-widest mb-1">Socials</p>
                    <div className="flex gap-4">
                      <a 
                        href="https://www.facebook.com/people/DomainEdit/61591837791833/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:text-[#a8fbd3] transition-colors cursor-pointer"
                        data-hover="true"
                        data-cursor-text="FACEBOOK"
                      >
                        Facebook
                      </a>
                      <a 
                        href="https://www.instagram.com/domain.editss/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:text-[#a8fbd3] transition-colors cursor-pointer"
                        data-hover="true"
                        data-cursor-text="INSTAGRAM"
                      >
                        Instagram
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl relative overflow-visible"
            >
              
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-[#a8fbd3] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Zap className="w-10 h-10 text-black" />
                  </div>
                  <h4 className="text-3xl font-heading font-bold mb-4">MESSAGE SENT!</h4>
                  <p className="text-gray-400">I'll get back to you as soon as possible.</p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="mt-8 text-[#a8fbd3] font-mono text-xs uppercase tracking-widest hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-[#a8fbd3] uppercase tracking-widest ml-1">Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="John Doe"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-[#a8fbd3] transition-colors placeholder:text-white/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-[#a8fbd3] uppercase tracking-widest ml-1">Email</label>
                      <input 
                        required
                        type="email" 
                        placeholder="john@example.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-[#a8fbd3] transition-colors placeholder:text-white/20"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-[#a8fbd3] uppercase tracking-widest ml-1">Subject</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Project Inquiry"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-[#a8fbd3] transition-colors placeholder:text-white/20"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-[#a8fbd3] uppercase tracking-widest ml-1">Message</label>
                    <textarea 
                      required
                      rows={4}
                      placeholder="Tell me about your project..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-[#a8fbd3] transition-colors placeholder:text-white/20 resize-none"
                    />
                  </div>
                  
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-5 bg-white text-black font-heading font-bold uppercase tracking-widest rounded-xl hover:bg-[#a8fbd3] transition-all duration-300 flex items-center justify-center gap-3 group"
                    data-cursor-text="SEND"
                  >
                    {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                    <Send className={`w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform ${isSubmitting ? 'animate-pulse' : ''}`} />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer className="mt-auto" />
    </div>
  );
};

export default HomePage;
