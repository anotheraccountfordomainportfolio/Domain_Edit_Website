import LazyYoutube from '../ui/LazyYoutube';
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { 
  Ticket, Globe, Zap, Music, MapPin, Menu, X, Calendar, Play, ChevronLeft, ChevronRight, 
  Facebook, Instagram, Send, Mail, Phone, MessageSquare, ArrowUp, Heart, Users, Sparkles, 
  ArrowRight, Gamepad2, Tv, Smile, Smartphone, Share2, Clapperboard, Layers, Flame, Cpu, 
  Mic, Megaphone, Star, Clock, Repeat, FileCode, ShieldCheck, Crosshair,
  Wand2, CreditCard, CheckCircle2, PackageCheck, Workflow,
  BadgeCheck, TrendingUp,
  Film, Video, Disc3, MonitorPlay
} from 'lucide-react';
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

// GPU-Accelerated Interactive Card with zero React re-render mouse tracking
const InteractiveStoryCard: React.FC<{
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  accentGlow: string;
  iconColor: string;
}> = ({ icon: Icon, title, desc, accentGlow, iconColor }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--card-x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--card-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleCardMouseMove}
      className={`group relative p-6 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 ${accentGlow} transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] flex flex-col items-center text-center cursor-pointer overflow-hidden will-change-transform shadow-[0_8px_30px_rgba(0,0,0,0.3)]`}
    >
      {/* Zero-lag card cursor sheen */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
        style={{
          background:
            'radial-gradient(280px circle at var(--card-x, 50%) var(--card-y, 50%), rgba(255,255,255,0.08), transparent 70%)',
        }}
      />

      <div className="w-13 h-13 p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#a8fbd3] mb-4 group-hover:bg-white/15 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-inner">
        <Icon className={`w-6 h-6 transition-colors duration-300 ${iconColor}`} />
      </div>

      <h4 className="text-3xl font-heading font-black text-white mb-1 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#a8fbd3] transition-all duration-300">
        {title}
      </h4>
      <p className="text-[11px] font-mono uppercase tracking-widest text-gray-400 group-hover:text-gray-200 transition-colors duration-300">
        {desc}
      </p>
    </div>
  );
};

// High-performance, GPU-accelerated Interactive OUR STORY Section
const OurStorySection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <section
      id="our-story"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative z-10 py-16 md:py-24 overflow-hidden select-none group [contain:paint]"
    >
      {/* Zero-lag Interactive Cursor Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 will-change-transform z-0"
        style={{
          background:
            'radial-gradient(650px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(168,251,211,0.12), transparent 70%)',
        }}
      />

      {/* Floating Animated Cyber Orbs (Hardware-accelerated CSS) */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div 
          className="absolute top-1/4 -left-20 w-[40vw] h-[40vw] bg-gradient-to-br from-[#a8fbd3]/15 via-[#4fb7b3]/10 to-transparent rounded-full blur-3xl animate-pulse will-change-transform" 
          style={{ animationDuration: '8s' }} 
        />
        <div 
          className="absolute bottom-0 -right-20 w-[45vw] h-[45vw] bg-gradient-to-tl from-[#637ab9]/15 via-[#a8fbd3]/8 to-transparent rounded-full blur-3xl animate-pulse will-change-transform" 
          style={{ animationDuration: '10s' }} 
        />
      </div>

      {/* Floating Micro-sparkles (CSS animated) */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            style={{
              top: `${18 + i * 13}%`,
              left: `${8 + (i * 16) % 85}%`,
              animationDuration: `${3.5 + i * 0.8}s`,
              animationDelay: `${i * 0.5}s`,
            }}
            className="absolute w-1.5 h-1.5 rounded-full bg-[#a8fbd3] shadow-[0_0_8px_#a8fbd3] animate-bounce opacity-40 will-change-transform"
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 md:mb-16">
          {/* Interactive Badge with spinning sparkle */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-[#a8fbd3]/40 text-[#a8fbd3] text-xs font-mono uppercase tracking-widest mb-4 transition-all duration-300 shadow-[0_0_15px_rgba(168,251,211,0.1)] hover:scale-105 cursor-pointer">
            <Sparkles className="w-3.5 h-3.5 text-[#a8fbd3] animate-spin" style={{ animationDuration: '6s' }} />
            <span>Behind The Edits</span>
          </div>

          {/* Full uncropped "OUR STORY" heading strictly on ONE line */}
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-heading font-black tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-[#a8fbd3] to-white text-center leading-none mb-6 drop-shadow-[0_0_35px_rgba(168,251,211,0.25)] group-hover:drop-shadow-[0_0_55px_rgba(168,251,211,0.5)] transition-all duration-500 select-none whitespace-nowrap">
            OUR STORY
          </h2>

          <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8 font-light max-w-2xl drop-shadow-sm">
            Built on relentless creative passion and technical precision, Domain Edits transforms raw footage into cinematic narratives that captivate viewers, boost retention, and scale creator brands worldwide.
          </p>

          {/* Interactive "Read My Story" Button with glowing aura and arrow slide */}
          <div className="relative group/btn">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#a8fbd3]/40 via-[#4fb7b3]/30 to-[#a8fbd3]/40 blur-md opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none -z-10" />
            <Link
              to="/about"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-white/10 hover:bg-[#a8fbd3] text-white hover:text-black border border-white/15 hover:border-[#a8fbd3] transition-all duration-300 font-heading font-bold text-sm tracking-wider uppercase shadow-[0_10px_25px_rgba(0,0,0,0.4)] backdrop-blur-xl group-hover/btn:scale-105 active:scale-95 will-change-transform"
            >
              <span>Read My Story</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform duration-300" />
            </Link>
          </div>
        </div>

        {/* 3 Interactive Metric Cards with individual sheen */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6 max-w-4xl mx-auto">
          <InteractiveStoryCard
            icon={Heart}
            title="100%"
            desc="Customer Satisfaction"
            accentGlow="hover:border-rose-400/50 hover:shadow-[0_0_30px_rgba(244,63,94,0.3)]"
            iconColor="group-hover:text-rose-400"
          />
          <InteractiveStoryCard
            icon={Zap}
            title="3+ YEARS"
            desc="Industry Experience"
            accentGlow="hover:border-amber-400/50 hover:shadow-[0_0_30px_rgba(251,191,36,0.3)]"
            iconColor="group-hover:text-amber-400"
          />
          <InteractiveStoryCard
            icon={Users}
            title="20+"
            desc="Trusted Clients"
            accentGlow="hover:border-[#a8fbd3]/60 hover:shadow-[0_0_30px_rgba(168,251,211,0.3)]"
            iconColor="group-hover:text-[#a8fbd3]"
          />
        </div>
      </div>
    </section>
  );
};

// Interactive GPU-Accelerated What We Create Card with Equalizer & Moving Icons
const WhatWeCreateCard: React.FC<{
  item: {
    id: string;
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    tag: string;
    category: string;
    spec: string;
    software: string;
    accentBorder: string;
    accentGlow: string;
    badgeColor: string;
    iconColor: string;
  };
}> = ({ item }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = item.icon;

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--card-x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--card-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleCardMouseMove}
      className={`group relative p-5 md:p-6 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/10 ${item.accentBorder} ${item.accentGlow} transition-all duration-300 ease-out hover:-translate-y-2 flex flex-col justify-between cursor-pointer overflow-hidden will-change-transform shadow-[0_10px_30px_rgba(0,0,0,0.3)]`}
    >
      {/* Specular spotlight following cursor inside card */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background:
            'radial-gradient(240px circle at var(--card-x, 50%) var(--card-y, 50%), rgba(255,255,255,0.12), transparent 75%)',
        }}
      />

      {/* Diagonal laser sheen shimmer sweep on hover */}
      <div className="pointer-events-none absolute -inset-full bg-gradient-to-r from-transparent via-white/10 to-transparent -rotate-45 translate-x-[-150%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-out" />

      {/* Cyber HUD Corner Brackets */}
      <div className="absolute top-2 left-2 text-[9px] font-mono text-white/20 group-hover:text-[#a8fbd3]/70 transition-colors pointer-events-none">┌</div>
      <div className="absolute top-2 right-2 text-[9px] font-mono text-white/20 group-hover:text-[#a8fbd3]/70 transition-colors pointer-events-none">┐</div>
      <div className="absolute bottom-2 left-2 text-[9px] font-mono text-white/20 group-hover:text-[#a8fbd3]/70 transition-colors pointer-events-none">└</div>
      <div className="absolute bottom-2 right-2 text-[9px] font-mono text-white/20 group-hover:text-[#a8fbd3]/70 transition-colors pointer-events-none">┘</div>

      <div className="relative z-10 mb-4">
        <div className="flex items-center justify-between mb-4">
          {/* Animated Moving Icon Pod */}
          <div className="relative">
            {/* Pulsing ring aura */}
            <div className="absolute -inset-1 rounded-2xl bg-white/10 group-hover:bg-[#a8fbd3]/20 blur-sm group-hover:animate-pulse transition-all" />
            <div className="relative w-12 h-12 rounded-xl bg-white/5 border border-white/10 group-hover:border-white/30 flex items-center justify-center text-[#a8fbd3] group-hover:bg-white/15 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-inner">
              <Icon className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${item.iconColor}`} />
            </div>
          </div>

          {/* Equalizer animation and step number */}
          <div className="flex items-center gap-2.5">
            {/* Video/Audio timeline audio equalizer bouncing bars */}
            <div className="flex items-end gap-0.5 h-4 opacity-40 group-hover:opacity-100 transition-opacity">
              <div className="w-1 bg-[#a8fbd3] rounded-full animate-eq-1" />
              <div className="w-1 bg-[#4fb7b3] rounded-full animate-eq-2" />
              <div className="w-1 bg-[#a8fbd3] rounded-full animate-eq-3" />
              <div className="w-1 bg-[#4fb7b3] rounded-full animate-eq-4" />
            </div>

            <span className="text-[10px] font-mono text-gray-500 group-hover:text-[#a8fbd3] transition-colors">
              #{item.id}
            </span>
          </div>
        </div>

        <h3 className="text-base md:text-lg font-heading font-black text-white uppercase mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#a8fbd3] transition-all">
          {item.title}
        </h3>

        <div className="flex items-center gap-2 mb-2">
          <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border ${item.badgeColor}`}>
            {item.tag}
          </span>
        </div>

        <p className="text-[11px] font-mono text-gray-400 group-hover:text-gray-300 transition-colors flex items-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-[#a8fbd3] inline-block animate-ping" />
          <span>{item.spec}</span>
        </p>
      </div>

      <div className="relative z-10 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-gray-400">
        <span className="text-gray-500 group-hover:text-gray-300 transition-colors">
          {item.software}
        </span>
        <span className="inline-flex items-center gap-1 text-[#a8fbd3] opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          <span>Format Specs</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </div>
  );
};

// High-performance Animated WHAT WE CREATE Section with Moving Icons & Interactive Pipeline Effects
const WhatWeCreateSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'short' | 'long' | 'vfx' | 'promo'>('all');

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--wc-x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--wc-y', `${e.clientY - rect.top}px`);
  };

  const creationItems = [
    {
      id: '01',
      title: 'Gaming Montage',
      icon: Gamepad2,
      category: 'long',
      tag: 'High Energy',
      spec: '60 FPS • BEAT SYNC',
      software: 'Premiere Pro',
      accentBorder: 'hover:border-cyan-400/50',
      accentGlow: 'hover:shadow-[0_0_35px_rgba(6,182,212,0.3)]',
      badgeColor: 'text-cyan-400 border-cyan-400/30 bg-cyan-400/10',
      iconColor: 'group-hover:text-cyan-400',
    },
    {
      id: '02',
      title: 'Stream Highlight',
      icon: Tv,
      category: 'long',
      tag: 'Fast Paced',
      spec: 'MULTI-CAM • TIMECODE',
      software: 'Premiere & Audition',
      accentBorder: 'hover:border-purple-400/50',
      accentGlow: 'hover:shadow-[0_0_35px_rgba(168,85,247,0.3)]',
      badgeColor: 'text-purple-400 border-purple-400/30 bg-purple-400/10',
      iconColor: 'group-hover:text-purple-400',
    },
    {
      id: '03',
      title: 'Funny Moments Clips',
      icon: Smile,
      category: 'short',
      tag: 'Viral Meme Sync',
      spec: 'SFX & MEME OVERLAYS',
      software: 'After Effects',
      accentBorder: 'hover:border-amber-400/50',
      accentGlow: 'hover:shadow-[0_0_35px_rgba(245,158,11,0.3)]',
      badgeColor: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
      iconColor: 'group-hover:text-amber-400',
    },
    {
      id: '04',
      title: 'YouTube Videos',
      icon: Play,
      category: 'long',
      tag: 'Long-Form',
      spec: '4K RETENTION PACING',
      software: 'DaVinci & Premiere',
      accentBorder: 'hover:border-rose-400/50',
      accentGlow: 'hover:shadow-[0_0_35px_rgba(244,63,94,0.3)]',
      badgeColor: 'text-rose-400 border-rose-400/30 bg-rose-400/10',
      iconColor: 'group-hover:text-rose-400',
    },
    {
      id: '05',
      title: 'YouTube Shorts',
      icon: Smartphone,
      category: 'short',
      tag: 'High Retention',
      spec: '9:16 ALGORITHM READY',
      software: 'CapCut & Premiere',
      accentBorder: 'hover:border-emerald-400/50',
      accentGlow: 'hover:shadow-[0_0_35px_rgba(16,185,129,0.3)]',
      badgeColor: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
      iconColor: 'group-hover:text-emerald-400',
    },
    {
      id: '06',
      title: 'TikTok/Instagram Reel',
      icon: Share2,
      category: 'short',
      tag: 'Vertical Format',
      spec: 'HOOK IN 0.8 SECONDS',
      software: 'After Effects',
      accentBorder: 'hover:border-pink-400/50',
      accentGlow: 'hover:shadow-[0_0_35px_rgba(236,72,153,0.3)]',
      badgeColor: 'text-pink-400 border-pink-400/30 bg-pink-400/10',
      iconColor: 'group-hover:text-pink-400',
    },
    {
      id: '07',
      title: 'Cinematic Reels/Video',
      icon: Clapperboard,
      category: 'long',
      tag: 'Color Graded',
      spec: 'FILM LUT • 24FPS LOOK',
      software: 'DaVinci Resolve Studio',
      accentBorder: 'hover:border-[#a8fbd3]/50',
      accentGlow: 'hover:shadow-[0_0_35px_rgba(168,251,211,0.3)]',
      badgeColor: 'text-[#a8fbd3] border-[#a8fbd3]/30 bg-[#a8fbd3]/10',
      iconColor: 'group-hover:text-[#a8fbd3]',
    },
    {
      id: '08',
      title: 'Motion Graphic',
      icon: Layers,
      category: 'vfx',
      tag: 'VFX & Design',
      spec: '3D KINETIC COMPOSITION',
      software: 'After Effects & Blender',
      accentBorder: 'hover:border-indigo-400/50',
      accentGlow: 'hover:shadow-[0_0_35px_rgba(99,102,241,0.3)]',
      badgeColor: 'text-indigo-400 border-indigo-400/30 bg-indigo-400/10',
      iconColor: 'group-hover:text-indigo-400',
    },
    {
      id: '09',
      title: 'Intro/Outro',
      icon: Flame,
      category: 'promo',
      tag: 'Brand Hooks',
      spec: 'LOGO STINGER & SFX',
      software: 'Cinema 4D / AE',
      accentBorder: 'hover:border-orange-400/50',
      accentGlow: 'hover:shadow-[0_0_35px_rgba(249,115,22,0.3)]',
      badgeColor: 'text-orange-400 border-orange-400/30 bg-orange-400/10',
      iconColor: 'group-hover:text-orange-400',
    },
    {
      id: '10',
      title: 'Logo Animations',
      icon: Cpu,
      category: 'vfx',
      tag: 'Kinetic 2D/3D',
      spec: 'TRANSPARENT ALPHA 4K',
      software: 'After Effects',
      accentBorder: 'hover:border-sky-400/50',
      accentGlow: 'hover:shadow-[0_0_35px_rgba(56,189,248,0.3)]',
      badgeColor: 'text-sky-400 border-sky-400/30 bg-sky-400/10',
      iconColor: 'group-hover:text-sky-400',
    },
    {
      id: '11',
      title: 'Podcast Clips',
      icon: Mic,
      category: 'short',
      tag: 'Dynamic Captions',
      spec: 'KINETIC SUBTITLES',
      software: 'Audition & Premiere',
      accentBorder: 'hover:border-yellow-400/50',
      accentGlow: 'hover:shadow-[0_0_35px_rgba(234,179,8,0.3)]',
      badgeColor: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
      iconColor: 'group-hover:text-yellow-400',
    },
    {
      id: '12',
      title: 'Promotional Videos',
      icon: Megaphone,
      category: 'promo',
      tag: 'Commercial',
      spec: 'BRAND CONVERSION HOOKS',
      software: 'Full Creative Suite',
      accentBorder: 'hover:border-blue-400/50',
      accentGlow: 'hover:shadow-[0_0_35px_rgba(59,130,246,0.3)]',
      badgeColor: 'text-blue-400 border-blue-400/30 bg-blue-400/10',
      iconColor: 'group-hover:text-blue-400',
    },
  ];

  const filteredItems = activeFilter === 'all' 
    ? creationItems 
    : creationItems.filter(item => item.category === activeFilter);

  return (
    <section 
      id="what-we-create" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative z-10 py-16 md:py-24 overflow-hidden select-none group [contain:paint]"
    >
      {/* Zero-lag Interactive Spotlight Ambient Glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 will-change-transform z-0"
        style={{
          background:
            'radial-gradient(750px circle at var(--wc-x, 50%) var(--wc-y, 50%), rgba(168,251,211,0.08), transparent 70%)',
        }}
      />

      {/* Cyber Grid Backing */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-15 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] z-0"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Continuous Animated Floating Telemetry Badges with Moving Icons */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-10">
        {/* Floating Badge 1: Film 4K */}
        <div className="absolute top-12 left-4 md:left-12 animate-float-drift hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-400/30 text-cyan-300 text-[10px] font-mono tracking-widest uppercase shadow-[0_0_20px_rgba(6,182,212,0.2)] backdrop-blur-md">
          <Film className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
          <span>4K 60FPS MASTERING</span>
        </div>

        {/* Floating Badge 2: Zap Retention */}
        <div className="absolute top-20 right-4 md:right-16 animate-float-drift-reverse hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-950/40 border border-amber-400/30 text-amber-300 text-[10px] font-mono tracking-widest uppercase shadow-[0_0_20px_rgba(245,158,11,0.2)] backdrop-blur-md">
          <Zap className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>VIRAL RETENTION PACING</span>
        </div>

        {/* Floating Badge 3: Sparkles VFX */}
        <div className="absolute bottom-16 left-6 md:left-20 animate-float-drift hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-950/40 border border-purple-400/30 text-purple-300 text-[10px] font-mono tracking-widest uppercase shadow-[0_0_20px_rgba(168,85,247,0.2)] backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-spin-slow" />
          <span>3D MOTION & VFX LAB</span>
        </div>

        {/* Floating Badge 4: Disc3 Audio */}
        <div className="absolute bottom-24 right-8 md:right-24 animate-float-drift-reverse hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-950/40 border border-rose-400/30 text-rose-300 text-[10px] font-mono tracking-widest uppercase shadow-[0_0_20px_rgba(244,63,94,0.2)] backdrop-blur-md">
          <Disc3 className="w-3.5 h-3.5 text-rose-400 animate-spin-slow" />
          <span>DYNAMIC SOUNDSCAPES</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-12">
          {/* Animated Interactive Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-[#a8fbd3]/40 text-[#a8fbd3] text-xs font-mono uppercase tracking-widest mb-4 transition-all duration-300 shadow-[0_0_20px_rgba(168,251,211,0.1)] hover:scale-105 cursor-pointer">
            <Sparkles className="w-3.5 h-3.5 text-[#a8fbd3] animate-spin" style={{ animationDuration: '6s' }} />
            <span>Full Spectrum Production // Creative Lab</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-[#a8fbd3] to-white mb-4 drop-shadow-[0_0_35px_rgba(168,251,211,0.2)]">
            WHAT WE CREATE
          </h2>

          <p className="text-gray-300 text-sm md:text-base font-light max-w-2xl mx-auto mb-8">
            From high-energy gaming clips to full-length documentaries and viral short-form hooks, every frame is engineered for maximum retention and viewer conversion.
          </p>

          {/* Continuous Kinetic Capabilities Marquee Bar */}
          <div className="relative max-w-4xl mx-auto overflow-hidden rounded-full border border-white/10 bg-black/40 backdrop-blur-md py-2.5 px-4 mb-8">
            <div className="animate-marquee-smooth flex items-center gap-8 whitespace-nowrap text-xs font-mono text-gray-300 uppercase tracking-widest">
              <span>GAMING MONTAGES</span>
              <span className="text-[#a8fbd3]">✦</span>
              <span>4K CINEMATICS</span>
              <span className="text-[#a8fbd3]">✦</span>
              <span>3D MOTION GRAPHICS</span>
              <span className="text-[#a8fbd3]">✦</span>
              <span>VIRAL MEME PACING</span>
              <span className="text-[#a8fbd3]">✦</span>
              <span>HDR COLOR GRADING</span>
              <span className="text-[#a8fbd3]">✦</span>
              <span>DYNAMIC CAPTIONS</span>
              <span className="text-[#a8fbd3]">✦</span>
              <span>SOUND DESIGN & SFX</span>
              <span className="text-[#a8fbd3]">✦</span>
              <span>GAMING MONTAGES</span>
              <span className="text-[#a8fbd3]">✦</span>
              <span>4K CINEMATICS</span>
              <span className="text-[#a8fbd3]">✦</span>
              <span>3D MOTION GRAPHICS</span>
              <span className="text-[#a8fbd3]">✦</span>
              <span>VIRAL MEME PACING</span>
              <span className="text-[#a8fbd3]">✦</span>
              <span>HDR COLOR GRADING</span>
              <span className="text-[#a8fbd3]">✦</span>
              <span>DYNAMIC CAPTIONS</span>
              <span className="text-[#a8fbd3]">✦</span>
              <span>SOUND DESIGN & SFX</span>
            </div>
          </div>

          {/* Interactive Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
            {[
              { id: 'all', label: 'All Formats', count: 12 },
              { id: 'short', label: 'Short-Form / Vertical', count: 4 },
              { id: 'long', label: 'Long-Form & YouTube', count: 4 },
              { id: 'vfx', label: 'VFX & 3D Motion', count: 2 },
              { id: 'promo', label: 'Promo & Branding', count: 2 },
            ].map(tab => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-[#a8fbd3] text-black font-bold shadow-[0_0_20px_rgba(168,251,211,0.4)] scale-105'
                      : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border border-white/10'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-black text-[#a8fbd3]' : 'bg-white/10 text-gray-400'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Responsive Grid of Animated Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {filteredItems.map(item => (
            <WhatWeCreateCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};


// Interactive GPU-Accelerated Agency Philosophy Card with Specular Mouse Tracking
const AgencyMotoCard: React.FC<{
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  badge: string;
  badgeColor: string;
  accentBorder: string;
  accentGlow: string;
  iconColor: string;
  iconAnim?: string;
  animStyle?: React.CSSProperties;
  meta: string;
  stepNum: string;
}> = ({ title, desc, icon: Icon, badge, badgeColor, accentBorder, accentGlow, iconColor, iconAnim = '', animStyle, meta, stepNum }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--card-x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--card-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleCardMouseMove}
      className={`group relative p-7 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 ${accentBorder} ${accentGlow} transition-all duration-300 ease-out hover:-translate-y-2 hover:bg-white/[0.06] flex flex-col justify-between cursor-pointer overflow-hidden will-change-transform shadow-[0_12px_36px_rgba(0,0,0,0.35)]`}
    >
      {/* Specular spotlight following cursor inside card */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background:
            'radial-gradient(280px circle at var(--card-x, 50%) var(--card-y, 50%), rgba(255,255,255,0.12), transparent 75%)',
        }}
      />
      {/* HUD corner decorations */}
      <div className="absolute top-2.5 left-2.5 text-[9px] font-mono text-white/20 group-hover:text-[#a8fbd3]/60 transition-colors pointer-events-none">┌</div>
      <div className="absolute top-2.5 right-2.5 text-[9px] font-mono text-white/20 group-hover:text-[#a8fbd3]/60 transition-colors pointer-events-none">┐</div>
      <div className="absolute bottom-2.5 left-2.5 text-[9px] font-mono text-white/20 group-hover:text-[#a8fbd3]/60 transition-colors pointer-events-none">└</div>
      <div className="absolute bottom-2.5 right-2.5 text-[9px] font-mono text-white/20 group-hover:text-[#a8fbd3]/60 transition-colors pointer-events-none">┘</div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="w-13 h-13 p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#a8fbd3] group-hover:bg-white/15 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-inner">
            <Icon className={`w-6 h-6 transition-all duration-300 ${iconColor} ${iconAnim}`} style={animStyle} />
          </div>
          <span className={`text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border ${badgeColor} transition-transform group-hover:scale-105`}>
            {badge}
          </span>
        </div>

        <h3 className="text-xl font-heading font-black text-white uppercase mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#a8fbd3] transition-all duration-300">
          {title}
        </h3>
        <p className="text-gray-400 text-xs font-mono leading-relaxed mb-4">
          {desc}
        </p>
      </div>

      <div className="relative z-10 mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-gray-500">
        <span className="group-hover:text-gray-300 transition-colors">{stepNum} // {meta}</span>
        <span className="text-[#a8fbd3] opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-bold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#a8fbd3] animate-ping" />
          ACTIVE
        </span>
      </div>
    </div>
  );
};

// Ultra-smooth, animated & interactive AGENCY MOTO section
const AgencyMotoSection: React.FC = () => {
  const motoRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = motoRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--moto-x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--moto-y', `${e.clientY - rect.top}px`);
  };

  return (
    <section
      id="agency-moto"
      ref={motoRef}
      onMouseMove={handleMouseMove}
      className="relative z-10 py-24 md:py-36 overflow-hidden select-none [contain:paint]"
    >
      {/* Interactive Cursor Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background:
            'radial-gradient(750px circle at var(--moto-x, 50%) var(--moto-y, 50%), rgba(168,251,211,0.08), transparent 70%)',
        }}
      />

      {/* Cyber Matrix Grid in Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-25">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: 'radial-gradient(rgba(168,251,211,0.25) 1px, transparent 1px), radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '48px 48px, 12px 12px',
            backgroundPosition: '0 0, 24px 24px',
            maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          }}
        />
      </div>

      {/* Concentric Rotating Cyber Orbit Rings with Sweeping Radar Beam */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden flex items-center justify-center">
        {/* Outer Tech Ring */}
        <div 
          className="absolute w-[680px] h-[680px] md:w-[980px] md:h-[980px] rounded-full border border-white/[0.05] animate-spin"
          style={{ animationDuration: '90s' }}
        >
          {/* Orbital satellite nodes */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 rounded-full bg-black/80 border border-[#a8fbd3]/40 text-[#a8fbd3] text-[9px] font-mono shadow-[0_0_15px_rgba(168,251,211,0.3)]">
            <Sparkles className="w-3 h-3 text-[#a8fbd3] animate-spin" style={{ animationDuration: '4s' }} />
            <span>ORBIT // ALPHA</span>
          </div>
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/80 border border-white/20 text-white/60 text-[9px] font-mono">
            <Crosshair className="w-3 h-3 text-cyan-400" />
            <span>SYNC // 60FPS</span>
          </div>
        </div>

        {/* Middle Radar Scan Ring with Conic Gradient Sweep */}
        <div 
          className="absolute w-[450px] h-[450px] md:w-[650px] md:h-[650px] rounded-full border border-[#a8fbd3]/10 overflow-hidden animate-radar-sweep"
        >
          <div 
            className="w-full h-full"
            style={{
              background: 'conic-gradient(from 0deg, rgba(168,251,211,0.18) 0deg, rgba(79,183,179,0.06) 45deg, transparent 70deg, transparent 360deg)',
            }}
          />
        </div>

        {/* Inner Tech Ring */}
        <div 
          className="absolute w-[280px] h-[280px] md:w-[400px] md:h-[400px] rounded-full border border-dashed border-white/10 animate-spin"
          style={{ animationDuration: '45s', animationDirection: 'reverse' }}
        />

        {/* Ambient Core Light Glow */}
        <div className="absolute w-[520px] h-[320px] bg-gradient-to-r from-[#a8fbd3]/15 via-[#4fb7b3]/10 to-transparent rounded-full blur-3xl opacity-70 will-change-transform" />
      </div>

      {/* Floating Drifting Moving Icons with Cyber Badges */}
      <div className="pointer-events-none absolute inset-0 -z-5 overflow-hidden">
        {/* Floating Item 1: Clock */}
        <div 
          style={{ top: '12%', left: '5%' }} 
          className="absolute hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 text-amber-400 animate-float-drift shadow-[0_0_20px_rgba(251,191,36,0.15)]"
        >
          <Clock className="w-4 h-4 animate-spin" style={{ animationDuration: '12s' }} />
          <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300/90 font-bold">48H EXPRESS</span>
        </div>

        {/* Floating Item 2: Zap */}
        <div 
          style={{ top: '18%', right: '6%' }} 
          className="absolute hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 text-[#a8fbd3] animate-float-drift-reverse shadow-[0_0_20px_rgba(168,251,211,0.15)]"
        >
          <Zap className="w-4 h-4 fill-current animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#a8fbd3] font-bold">HYPER VELOCITY</span>
        </div>

        {/* Floating Item 3: Layers */}
        <div 
          style={{ bottom: '26%', left: '4%' }} 
          className="absolute hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 text-cyan-400 animate-float-drift-reverse shadow-[0_0_20px_rgba(34,211,238,0.15)]"
        >
          <Layers className="w-4 h-4 animate-bounce" style={{ animationDuration: '4s' }} />
          <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-300 font-bold">MULTI-CAM VFX</span>
        </div>

        {/* Floating Item 4: Flame */}
        <div 
          style={{ bottom: '22%', right: '5%' }} 
          className="absolute hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 text-rose-400 animate-float-drift shadow-[0_0_20px_rgba(244,63,94,0.15)]"
        >
          <Flame className="w-4 h-4 fill-current animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-wider text-rose-300 font-bold">MAX RETENTION</span>
        </div>

        {/* Floating Item 5: Cpu */}
        <div 
          style={{ top: '55%', left: '2%' }} 
          className="absolute hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-xl bg-white/[0.03] border border-white/10 text-white/50 animate-float-drift"
        >
          <Cpu className="w-3.5 h-3.5 text-[#a8fbd3]" />
          <span className="text-[9px] font-mono uppercase tracking-widest text-gray-400">4K 60FPS</span>
        </div>

        {/* Floating Item 6: ShieldCheck */}
        <div 
          style={{ top: '52%', right: '3%' }} 
          className="absolute hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-xl bg-white/[0.03] border border-white/10 text-white/50 animate-float-drift-reverse"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[9px] font-mono uppercase tracking-widest text-gray-400">100% SECURE</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* Animated Futuristic Radar Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-[#a8fbd3]/50 text-[#a8fbd3] text-xs font-mono uppercase tracking-widest mb-6 backdrop-blur-md transition-all duration-300 shadow-[0_0_25px_rgba(168,251,211,0.2)] hover:scale-105 cursor-pointer">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a8fbd3] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#a8fbd3]"></span>
            </span>
            <span>AGENCY MOTO</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black tracking-tighter uppercase text-white mb-5 drop-shadow-[0_0_40px_rgba(255,255,255,0.2)]">
            EVERY DETAIL <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#a8fbd3] to-white">MATTERS.</span>
          </h2>
          <p className="text-gray-300 text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto">
            Strategic concept meets razor-sharp craftsmanship to turn every frame into an unforgettable audience experience.
          </p>
        </div>

        {/* 4 Interactive Motion Pillar Cards with Specular Tracking & Corner HUD */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <AgencyMotoCard
            title="Rapid Turnaround"
            desc="48H delivery windows available without quality compromise."
            icon={Clock}
            badge="48H EXPRESS"
            badgeColor="text-amber-400 bg-amber-400/10 border-amber-400/20"
            accentBorder="hover:border-amber-400/50"
            accentGlow="hover:shadow-[0_0_35px_rgba(251,191,36,0.25)]"
            iconColor="group-hover:text-amber-400"
            iconAnim="animate-spin"
            animStyle={{ animationDuration: '10s' }}
            meta="EXPEDITED"
            stepNum="P-01"
          />
          <AgencyMotoCard
            title="Unlimited Iterations"
            desc="Polished to perfection until you achieve 100% final sign-off."
            icon={Repeat}
            badge="∞ SIGN-OFF"
            badgeColor="text-[#a8fbd3] bg-[#a8fbd3]/10 border-[#a8fbd3]/20"
            accentBorder="hover:border-[#a8fbd3]/50"
            accentGlow="hover:shadow-[0_0_35px_rgba(168,251,211,0.25)]"
            iconColor="group-hover:text-[#a8fbd3]"
            iconAnim="group-hover:rotate-180 transition-transform duration-500"
            meta="INFINITE"
            stepNum="P-02"
          />
          <AgencyMotoCard
            title="Master Source Files"
            desc="Layered project assets including .AEP, .PRPROJ & ProRes masters."
            icon={FileCode}
            badge="FULL PACK"
            badgeColor="text-cyan-400 bg-cyan-400/10 border-cyan-400/20"
            accentBorder="hover:border-cyan-400/50"
            accentGlow="hover:shadow-[0_0_35px_rgba(34,211,238,0.25)]"
            iconColor="group-hover:text-cyan-400"
            iconAnim="group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300"
            meta="ARCHIVE READY"
            stepNum="P-03"
          />
          <AgencyMotoCard
            title="Direct Collaboration"
            desc="Direct 1-on-1 communication with zero account manager friction."
            icon={ShieldCheck}
            badge="1-ON-1 DIRECT"
            badgeColor="text-emerald-400 bg-emerald-400/10 border-emerald-400/20"
            accentBorder="hover:border-emerald-400/50"
            accentGlow="hover:shadow-[0_0_35px_rgba(52,211,153,0.25)]"
            iconColor="group-hover:text-emerald-400"
            iconAnim="group-hover:scale-110 transition-transform duration-300"
            meta="NO MIDDLEMAN"
            stepNum="P-04"
          />
        </div>

        {/* Continuous Kinetic Cyber Marquee Ribbon */}
        <div className="relative mb-14 overflow-hidden rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md py-4">
          <div className="animate-marquee-smooth flex items-center gap-8 text-[11px] font-mono uppercase tracking-[0.25em] text-[#a8fbd3]">
            {/* Duplicated for seamless loop */}
            {[...Array(2)].map((_, loopIdx) => (
              <div key={loopIdx} className="flex items-center gap-8 shrink-0">
                <span className="flex items-center gap-2"><Sparkles className="w-3.5 h-3.5 text-[#a8fbd3] animate-spin" style={{ animationDuration: '4s' }} /> ZERO COMPROMISE</span>
                <span className="text-white/20">✦</span>
                <span className="flex items-center gap-2"><Flame className="w-3.5 h-3.5 text-rose-400 animate-pulse" /> MAX RETENTION</span>
                <span className="text-white/20">✦</span>
                <span className="flex items-center gap-2"><Zap className="w-3.5 h-3.5 text-[#a8fbd3]" /> 4K PRORES 60FPS</span>
                <span className="text-white/20">✦</span>
                <span className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-amber-400" /> RAPID 48H WINDOW</span>
                <span className="text-white/20">✦</span>
                <span className="flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% CLIENT SATISFACTION</span>
                <span className="text-white/20">✦</span>
                <span className="flex items-center gap-2"><Repeat className="w-3.5 h-3.5 text-cyan-400" /> UNLIMITED REVISIONS</span>
                <span className="text-white/20">✦</span>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Glowing "Explore More Services" Button */}
        <div className="text-center">
          <Link
            to="/portfolio"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-[#a8fbd3] text-white hover:text-black border border-white/20 hover:border-[#a8fbd3] font-heading font-bold uppercase tracking-widest rounded-xl transition-all duration-300 shadow-lg hover:shadow-[0_0_35px_rgba(168,251,211,0.4)] hover:scale-105 active:scale-95 will-change-transform"
          >
            <span>Explore More Services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
};

// Interactive Animated HOW WE WORK (Simple Steps) Section with HUD pipeline & moving telemetry
const HowWeWorkSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--work-x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--work-y', `${e.clientY - rect.top}px`);
  };

  const steps = [
    { 
      num: '01', 
      step: 'CONTACT', 
      desc: 'Reach out with your brief & video assets', 
      icon: Send, 
      tag: 'INITIAL PING',
      color: 'from-cyan-500 to-blue-500',
      badgeColor: 'text-cyan-400 border-cyan-400/30 bg-cyan-400/10',
      glow: 'group-hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]',
      duration: 'AVG: 2H RESPONSE'
    },
    { 
      num: '02', 
      step: 'DISCUSS', 
      desc: 'Align creative direction, sound & style', 
      icon: MessageSquare, 
      tag: 'BLUEPRINT',
      color: 'from-blue-500 to-indigo-500',
      badgeColor: 'text-blue-400 border-blue-400/30 bg-blue-400/10',
      glow: 'group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]',
      duration: 'CREATIVE SYNC'
    },
    { 
      num: '03', 
      step: 'PAYMENT', 
      desc: 'Transparent milestones & secure escrow invoice', 
      icon: CreditCard, 
      tag: 'SECURE DEAL',
      color: 'from-emerald-500 to-teal-500',
      badgeColor: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
      glow: 'group-hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]',
      duration: 'PROTECTED ESCROW'
    },
    { 
      num: '04', 
      step: 'DESIGN', 
      desc: 'VFX, rhythm cuts, pacing & auditory magic', 
      icon: Wand2, 
      tag: 'POST-PRODUCTION',
      color: 'from-purple-500 to-pink-500',
      badgeColor: 'text-purple-400 border-purple-400/30 bg-purple-400/10',
      glow: 'group-hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]',
      duration: 'GPU RENDERING'
    },
    { 
      num: '05', 
      step: 'REVIEW', 
      desc: 'Frame-by-frame refinements & zero hassle iterations', 
      icon: CheckCircle2, 
      tag: 'PRECISION QC',
      color: 'from-amber-500 to-orange-500',
      badgeColor: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
      glow: 'group-hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]',
      duration: 'UNLIMITED EDITS'
    },
    { 
      num: '06', 
      step: 'DELIVERY', 
      desc: 'Instant cloud access to crystal 4K masters', 
      icon: PackageCheck, 
      tag: 'FINAL EXPORT',
      color: 'from-[#a8fbd3] to-emerald-400',
      badgeColor: 'text-[#a8fbd3] border-[#a8fbd3]/30 bg-[#a8fbd3]/10',
      glow: 'group-hover:shadow-[0_0_35px_rgba(168,251,211,0.35)]',
      duration: 'PRORES / 4K 60FPS'
    },
  ];

  return (
    <section 
      id="how-we-work" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative z-10 py-20 md:py-32 overflow-hidden select-none [contain:paint]"
    >
      {/* Dynamic Cursor Illumination Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background:
            'radial-gradient(700px circle at var(--work-x, 50%) var(--work-y, 50%), rgba(168,251,211,0.07), transparent 70%)',
        }}
      />

      {/* Cyber Circuit Dot Grid Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-20">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: 'radial-gradient(rgba(168,251,211,0.3) 1px, transparent 1px), radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px, 10px 10px',
            backgroundPosition: '0 0, 20px 20px',
            maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          }}
        />
      </div>

      {/* Floating Animated Ambient Icons & HUD Badges */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* Floating Item 1: Workflow */}
        <div 
          style={{ top: '12%', left: '4%' }} 
          className="absolute hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-white/60 animate-float-drift backdrop-blur-sm"
        >
          <Workflow className="w-3.5 h-3.5 text-[#a8fbd3] animate-spin" style={{ animationDuration: '12s' }} />
          <span className="text-[10px] font-mono uppercase tracking-widest text-gray-300">PIPELINE 6.0</span>
        </div>

        {/* Floating Item 2: Zap (Speed) */}
        <div 
          style={{ top: '18%', right: '5%' }} 
          className="absolute hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-white/60 animate-float-drift-reverse backdrop-blur-sm"
        >
          <Zap className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-gray-300">TURBO WORKFLOW</span>
        </div>

        {/* Floating Item 3: Repeat / Iteration */}
        <div 
          style={{ top: '65%', left: '3%' }} 
          className="absolute hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-white/60 animate-float-drift backdrop-blur-sm"
        >
          <Repeat className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
          <span className="text-[10px] font-mono uppercase tracking-widest text-gray-300">LIVE FEEDBACK LOOP</span>
        </div>

        {/* Floating Item 4: Shield Verification */}
        <div 
          style={{ top: '68%', right: '4%' }} 
          className="absolute hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-white/60 animate-float-drift-reverse backdrop-blur-sm"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-gray-300">SATISFACTION GUARANTEED</span>
        </div>

        {/* Ambient Pulsing Radar Ring in Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full border border-white/[0.04] animate-pulse-ring pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-[#a8fbd3]/50 text-[#a8fbd3] text-xs font-mono uppercase tracking-widest mb-4 backdrop-blur-md transition-all duration-300 shadow-[0_0_20px_rgba(168,251,211,0.15)] hover:scale-105 cursor-pointer">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a8fbd3] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#a8fbd3]"></span>
            </span>
            <span>Studio Production Protocol</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-heading font-black tracking-tighter uppercase text-white mb-3 drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]">
            SIMPLE <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#a8fbd3] to-white">STEPS</span>
          </h2>
          <p className="text-xs md:text-sm font-mono text-[#a8fbd3] uppercase tracking-[0.3em] flex items-center justify-center gap-2">
            <span>✦ Seamless Workflow from Raw Cut to Viral Master ✦</span>
          </p>
        </div>

        {/* Visual Pipeline Progression Tracker (Desktop Bar) */}
        <div className="relative mb-8 hidden lg:block px-4">
          <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden relative">
            {/* Animated Energy Flow Laser */}
            <div className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-[#a8fbd3] to-transparent animate-energy-flow" />
          </div>
          {/* Node checkmarks along track */}
          <div className="flex justify-between items-center -mt-2.5">
            {steps.map((st, i) => (
              <div 
                key={i}
                className={`w-4 h-4 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                  activeStep === i 
                    ? 'border-[#a8fbd3] bg-black scale-125 shadow-[0_0_12px_#a8fbd3]' 
                    : 'border-white/30 bg-black/80 hover:border-[#a8fbd3]'
                }`}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${activeStep === i ? 'bg-[#a8fbd3]' : 'bg-white/40'}`} />
              </div>
            ))}
          </div>
        </div>

        {/* 6 Animated Interactive Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5 mb-14">
          {steps.map((item, idx) => {
            const StepIcon = item.icon;
            const isHovered = activeStep === idx;

            return (
              <div
                key={idx}
                onMouseEnter={() => setActiveStep(idx)}
                onMouseLeave={() => setActiveStep(null)}
                className={`group relative p-6 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] backdrop-blur-xl border border-white/10 hover:border-[#a8fbd3]/60 transition-all duration-300 ease-out flex flex-col justify-between cursor-pointer overflow-hidden will-change-transform hover:-translate-y-2 shadow-[0_12px_32px_rgba(0,0,0,0.3)] ${item.glow}`}
              >
                {/* Specular Card Hover Glow */}
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-b from-white/[0.08] to-transparent" />

                {/* HUD Corner Accents */}
                <div className="absolute top-2 left-2 text-[8px] font-mono text-white/20 group-hover:text-[#a8fbd3]/60 transition-colors pointer-events-none">┌</div>
                <div className="absolute top-2 right-2 text-[8px] font-mono text-white/20 group-hover:text-[#a8fbd3]/60 transition-colors pointer-events-none">┐</div>
                <div className="absolute bottom-2 left-2 text-[8px] font-mono text-white/20 group-hover:text-[#a8fbd3]/60 transition-colors pointer-events-none">└</div>
                <div className="absolute bottom-2 right-2 text-[8px] font-mono text-white/20 group-hover:text-[#a8fbd3]/60 transition-colors pointer-events-none">┘</div>

                {/* Top Bar: Animated Icon + Step Index */}
                <div className="relative z-10 flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#a8fbd3] group-hover:bg-[#a8fbd3] group-hover:text-black group-hover:rotate-6 group-hover:scale-110 transition-all duration-300 shadow-inner">
                    <StepIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
                  </div>
                  <div className="text-xl font-mono font-black text-[#a8fbd3] opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all">
                    {item.num}
                  </div>
                </div>

                {/* Body Content */}
                <div className="relative z-10 mb-4">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className={`text-[8px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded border ${item.badgeColor}`}>
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="text-base md:text-lg font-heading font-black text-white uppercase mb-1.5 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#a8fbd3] transition-all">
                    {item.step}
                  </h3>
                  <p className="text-[11px] text-gray-400 font-mono leading-relaxed group-hover:text-gray-300 transition-colors">
                    {item.desc}
                  </p>
                </div>

                {/* Footer Telemetry */}
                <div className="relative z-10 pt-3 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-gray-500 group-hover:text-[#a8fbd3] transition-colors">
                  <span>{item.duration}</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive CTA Bar */}
        <div className="text-center">
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#a8fbd3] text-black font-heading font-bold uppercase tracking-widest rounded-xl hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(168,251,211,0.35)] hover:scale-105 active:scale-95 cursor-pointer will-change-transform"
          >
            <span>Ready to start? Let's Talk</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
};

// Animated, interactive TRUSTED BY & COMMUNITY section
const AnimatedReviewSection: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--review-x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--review-y', `${e.clientY - rect.top}px`);
  };

  const proofPills = [
    { label: '20+ Active Creators', icon: Users, color: 'text-cyan-400' },
    { label: '99.4% On-Time Delivery', icon: Clock, color: 'text-amber-400' },
    { label: '15M+ Aggregate Views', icon: TrendingUp, color: 'text-[#a8fbd3]' },
    { label: '5.0 Verified Rating', icon: Star, color: 'text-yellow-400' },
  ];

  return (
    <section 
      id="review" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative z-10 py-20 md:py-28 overflow-hidden select-none [contain:paint]"
    >
      {/* Specular Mouse Tracking Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background:
            'radial-gradient(650px circle at var(--review-x, 50%) var(--review-y, 50%), rgba(168,251,211,0.08), transparent 70%)',
        }}
      />

      {/* Futuristic Background Matrix Grid */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-20">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: 'radial-gradient(rgba(168,251,211,0.3) 1px, transparent 1px), radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '36px 36px, 12px 12px',
            backgroundPosition: '0 0, 18px 18px',
            maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          }}
        />
      </div>

      {/* Floating Animated Ambient Icons */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* Floating Facebook Badge */}
        <div 
          style={{ top: '20%', left: '4%' }} 
          className="absolute hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-blue-500/20 text-white/70 animate-float-drift backdrop-blur-sm shadow-[0_0_20px_rgba(24,119,242,0.15)]"
        >
          <Facebook className="w-4 h-4 text-[#1877F2] animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-blue-300">FB VERIFIED</span>
        </div>

        {/* Floating Instagram Badge */}
        <div 
          style={{ top: '22%', right: '4%' }} 
          className="absolute hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-pink-500/20 text-white/70 animate-float-drift-reverse backdrop-blur-sm shadow-[0_0_20px_rgba(228,64,95,0.15)]"
        >
          <Instagram className="w-4 h-4 text-[#E4405F] animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-pink-300">IG COMMUNITY</span>
        </div>

        {/* Floating Star & Sparkle Badge */}
        <div 
          style={{ bottom: '15%', left: '8%' }} 
          className="absolute hidden lg:flex items-center gap-2 px-3 py-1 rounded-xl bg-white/[0.02] border border-white/10 text-white/50 animate-float-drift backdrop-blur-sm"
        >
          <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 animate-spin" style={{ animationDuration: '10s' }} />
          <span className="text-[9px] font-mono uppercase tracking-widest text-gray-400">TOP TIER SATISFACTION</span>
        </div>

        {/* Floating Flame Badge */}
        <div 
          style={{ bottom: '18%', right: '8%' }} 
          className="absolute hidden lg:flex items-center gap-2 px-3 py-1 rounded-xl bg-white/[0.02] border border-white/10 text-white/50 animate-float-drift-reverse backdrop-blur-sm"
        >
          <Flame className="w-3.5 h-3.5 text-amber-400 animate-bounce" style={{ animationDuration: '3s' }} />
          <span className="text-[9px] font-mono uppercase tracking-widest text-gray-400">VIRAL RETENTION</span>
        </div>

        {/* Rotating Concentric Ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] md:w-[850px] md:h-[850px] rounded-full border border-white/[0.03] animate-pulse-ring pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        {/* Animated Pill Header */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-[#a8fbd3]/50 text-[#a8fbd3] text-xs font-mono uppercase tracking-widest mb-4 backdrop-blur-md transition-all duration-300 shadow-[0_0_20px_rgba(168,251,211,0.15)] hover:scale-105 cursor-pointer">
          <BadgeCheck className="w-4 h-4 text-[#a8fbd3] animate-pulse" />
          <span>PROVEN TRACK RECORD</span>
        </div>

        <h3 className="text-3xl md:text-5xl font-heading font-black tracking-tighter uppercase text-white mb-3 drop-shadow-[0_0_25px_rgba(255,255,255,0.15)]">
          TRUSTED BY OVER <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#a8fbd3] to-white">20+ CREATORS</span>
        </h3>
        
        <p className="text-xs md:text-sm font-mono text-gray-400 uppercase tracking-[0.25em] mb-10 max-w-xl mx-auto">
          From high-velocity gaming streamers to authority podcasts and brand channels.
        </p>

        {/* Proof Stats Pills Row */}
        <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4 mb-14 max-w-4xl mx-auto">
          {proofPills.map((pill, idx) => {
            const PillIcon = pill.icon;
            return (
              <div 
                key={idx}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#a8fbd3]/40 transition-all duration-300 hover:scale-105 backdrop-blur-sm text-xs font-mono text-gray-300 shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
              >
                <PillIcon className={`w-3.5 h-3.5 ${pill.color}`} />
                <span>{pill.label}</span>
              </div>
            );
          })}
        </div>

        {/* Interactive Social Channels Showcase with 3D Hover & Glowing Aura */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 md:gap-10 max-w-2xl mx-auto">
          {/* Facebook Card */}
          <a
            href="https://www.facebook.com/people/DomainEdit/61591837791833/"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHoveredCard('facebook')}
            onMouseLeave={() => setHoveredCard(null)}
            className="group relative w-full sm:w-64 p-6 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-[#1877F2]/60 backdrop-blur-xl transition-all duration-300 ease-out hover:-translate-y-2 flex flex-col items-center justify-center cursor-pointer shadow-[0_12px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_0_40px_rgba(24,119,242,0.35)]"
            data-hover="true"
            data-cursor-text="FACEBOOK"
          >
            {/* Ambient Corner Accents */}
            <div className="absolute top-2 left-2 text-[8px] font-mono text-white/20 group-hover:text-[#1877F2] transition-colors pointer-events-none">┌</div>
            <div className="absolute top-2 right-2 text-[8px] font-mono text-white/20 group-hover:text-[#1877F2] transition-colors pointer-events-none">┐</div>
            <div className="absolute bottom-2 left-2 text-[8px] font-mono text-white/20 group-hover:text-[#1877F2] transition-colors pointer-events-none">└</div>
            <div className="absolute bottom-2 right-2 text-[8px] font-mono text-white/20 group-hover:text-[#1877F2] transition-colors pointer-events-none">┘</div>

            <div className="w-16 h-16 rounded-2xl bg-[#1877F2]/10 border border-[#1877F2]/30 flex items-center justify-center mb-4 group-hover:bg-[#1877F2] group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-[0_0_20px_rgba(24,119,242,0.25)]">
              <Facebook className="w-8 h-8 text-[#1877F2] group-hover:text-white transition-colors" />
            </div>

            <h4 className="text-lg font-heading font-black text-white uppercase mb-1 group-hover:text-[#1877F2] transition-colors">
              Facebook
            </h4>
            <p className="text-[11px] font-mono text-gray-400 uppercase tracking-widest mb-3">
              @DomainEdit
            </p>

            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-400 opacity-80 group-hover:opacity-100 transition-opacity">
              <span>Visit Page</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>

          {/* Instagram Card */}
          <a
            href="https://www.instagram.com/domain.editss/"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHoveredCard('instagram')}
            onMouseLeave={() => setHoveredCard(null)}
            className="group relative w-full sm:w-64 p-6 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-[#E4405F]/60 backdrop-blur-xl transition-all duration-300 ease-out hover:-translate-y-2 flex flex-col items-center justify-center cursor-pointer shadow-[0_12px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_0_40px_rgba(228,64,95,0.35)]"
            data-hover="true"
            data-cursor-text="INSTAGRAM"
          >
            {/* Ambient Corner Accents */}
            <div className="absolute top-2 left-2 text-[8px] font-mono text-white/20 group-hover:text-[#E4405F] transition-colors pointer-events-none">┌</div>
            <div className="absolute top-2 right-2 text-[8px] font-mono text-white/20 group-hover:text-[#E4405F] transition-colors pointer-events-none">┐</div>
            <div className="absolute bottom-2 left-2 text-[8px] font-mono text-white/20 group-hover:text-[#E4405F] transition-colors pointer-events-none">└</div>
            <div className="absolute bottom-2 right-2 text-[8px] font-mono text-white/20 group-hover:text-[#E4405F] transition-colors pointer-events-none">┘</div>

            <div className="w-16 h-16 rounded-2xl bg-[#E4405F]/10 border border-[#E4405F]/30 flex items-center justify-center mb-4 group-hover:bg-[#E4405F] group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300 shadow-[0_0_20px_rgba(228,64,95,0.25)]">
              <Instagram className="w-8 h-8 text-[#E4405F] group-hover:text-white transition-colors" />
            </div>

            <h4 className="text-lg font-heading font-black text-white uppercase mb-1 group-hover:text-[#E4405F] transition-colors">
              Instagram
            </h4>
            <p className="text-[11px] font-mono text-gray-400 uppercase tracking-widest mb-3">
              @domain.editss
            </p>

            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-pink-400 opacity-80 group-hover:opacity-100 transition-opacity">
              <span>View Reels & Edits</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

const HomePage: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  
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
      
      {/* Bottom Spread Navigation Menu */}
      <BottomNav glaucusActive={glaucusActive} setGlaucusActive={setGlaucusActive} />

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
          <div className="relative w-full flex justify-center items-center min-h-[24vw] md:min-h-[12vw]">
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
      <div id="recent-work" className="relative max-w-7xl mx-auto px-4 md:px-6 py-16 z-30">
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
                  <LazyYoutube url={project.url} className="w-full h-full border-0 pointer-events-auto" />
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

      {/* 1. OUR STORY SECTION */}
      <OurStorySection />

      {/* 2. WHAT WE CREATE SECTION */}
      <WhatWeCreateSection />

      {/* 3. CLIENTS FEEDBACKS SECTION */}
      <section id="client-feedbacks" className="relative z-10 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#a8fbd3]/10 border border-[#a8fbd3]/30 text-[#a8fbd3] text-xs font-mono uppercase tracking-widest mb-4">
            <Star className="w-3.5 h-3.5 fill-[#a8fbd3]" />
            <span>Verified Testimonials</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-heading font-black tracking-tighter uppercase text-white mb-3">
            CLIENTS FEEDBACK
          </h2>
          <p className="text-[#a8fbd3] font-mono text-sm md:text-base tracking-widest uppercase mb-10">
            100% Original Screenshots
          </p>

          {/* Quick Mockup preview cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto text-left">
            {[
              { client: "Alex Vance", tag: "YouTube (500k+ Subs)", review: "Dominic completely transformed my retention rate! Sound design and pacing are top tier.", rating: 5 },
              { client: "Sarah Jenkins", tag: "Marketing Director", review: "Incredible turnaround time and vertical reels went viral within 48 hours!", rating: 5 },
              { client: "Marcus Evans", tag: "Podcast Host", review: "Audio polishing and multi-cam synching are studio-grade. Clean cuts and zero dead air.", rating: 5 },
            ].map((card, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-[#a8fbd3]/40 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-yellow-400 mb-3">
                    {[...Array(card.rating)].map((_, r) => (
                      <Star key={r} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 text-xs md:text-sm italic mb-4 leading-relaxed">
                    "{card.review}"
                  </p>
                </div>
                <div className="border-t border-white/10 pt-3">
                  <h4 className="font-heading font-bold text-sm text-white">{card.client}</h4>
                  <p className="text-[11px] font-mono text-gray-400">{card.tag}</p>
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/reviews"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#a8fbd3] text-black font-heading font-bold uppercase tracking-widest rounded-xl hover:bg-white transition-all duration-300 shadow-[0_0_25px_rgba(168,251,211,0.3)] group"
          >
            <span>Explore More</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* 4. AGENCY MOTO SECTION */}
      <AgencyMotoSection />

      {/* 5. HOW WE WORK SECTION */}
      <HowWeWorkSection />

      {/* TRUSTED BY / REVIEW SECTION */}
      <AnimatedReviewSection />

      {/* CONTACT SECTION */}
      <section id="contact" className="relative z-10 py-20 md:py-32 px-4 md:px-6 overflow-hidden">
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
