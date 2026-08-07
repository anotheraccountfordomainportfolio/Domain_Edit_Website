import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { 
  Menu, X, ArrowUp, Video, Sparkles, Palette, Headphones, Smartphone, 
  Tv, Cpu, Film, Layers, Scissors, Volume2, Mic, Play, ChevronRight, CheckCircle2, Award, Zap, RefreshCw, Send, Target
} from 'lucide-react';
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
import { Snail } from '../ui/Snail';

// Custom styles for high-performance animations
const CustomStyleInject = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    @keyframes shinesweep {
      0% { transform: translateX(-150%) skewX(-25deg); }
      100% { transform: translateX(150%) skewX(-25deg); }
    }
    .animate-shinesweep {
      animation: shinesweep 1.8s cubic-bezier(0.25, 1, 0.5, 1) infinite;
    }
  `}} />
);

interface SkillCardProps {
  name: string;
  desc: string;
  index: number;
  icon: React.ReactNode;
  key?: any;
}

// Highly dynamic, GPU-accelerated SkillCard with liquid hover, morphing borders, floating icons, and soft glow shadows
const SkillCard = ({ name, desc, index, icon }: SkillCardProps) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: (index % 3) * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        toast.info(name, {
          description: desc,
          icon: icon,
        });
      }}
      className="relative overflow-hidden cursor-pointer select-none border border-white/10 backdrop-blur-xl bg-white/[0.02] p-8 rounded-2xl group will-change-transform"
      style={{
        borderRadius: isHovered ? "28px 16px 28px 16px" : "16px",
        borderColor: isHovered ? "rgba(168, 251, 211, 0.4)" : "rgba(255, 255, 255, 0.1)",
        boxShadow: isHovered 
          ? "0 10px 30px -10px rgba(0,0,0,0.5), 0 0 20px 2px rgba(168, 251, 211, 0.15)" 
          : "none",
        transform: isHovered ? "translateY(-6px) translateZ(0) scale(1.02)" : "translateY(0px) translateZ(0) scale(1)",
        transition: "border-radius 0.6s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      data-hover="true"
      data-cursor-text={name.toUpperCase()}
    >
      {/* Liquid Hover / Spotlight Radial Glow Effect */}
      {isHovered && (
        <span 
          className="absolute pointer-events-none rounded-full blur-[65px] opacity-25 mix-blend-screen bg-[#a8fbd3] transition-opacity duration-300"
          style={{
            left: mousePos.x - 75,
            top: mousePos.y - 75,
            width: 150,
            height: 150,
          }}
        />
      )}

      {/* Shine Sweep Overlay */}
      <div 
        className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-full group-hover:animate-shinesweep pointer-events-none"
        style={{
          transform: "skewX(-25deg)",
        }}
      />

      <div className="flex items-center justify-between mb-6">
        <span className="font-mono text-xs text-white/40 group-hover:text-[#a8fbd3] transition-colors duration-300">
          {(index + 1).toString().padStart(2, '0')}
        </span>
        
        {/* Floating Icons container */}
        <div 
          className="text-white/60 group-hover:text-[#a8fbd3] p-2.5 rounded-xl bg-white/[0.03] group-hover:bg-[#a8fbd3]/10 border border-white/5 group-hover:border-[#a8fbd3]/20 transition-all duration-300"
          style={{
            transform: isHovered ? "translateY(-6px) rotate(8deg)" : "translateY(0px) rotate(0deg)",
            transition: "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), color 0.3s ease, background-color 0.3s ease",
          }}
        >
          {icon}
        </div>
      </div>

      <h4 className="text-xl font-heading font-bold uppercase mb-2 tracking-wide text-white group-hover:text-[#a8fbd3] transition-colors duration-300">
        {name}
      </h4>
      <p className="text-gray-400 font-sans text-sm leading-relaxed font-light group-hover:text-white/90 transition-colors duration-300">
        {desc}
      </p>

      {/* Neon Pulse visual dot in the corner */}
      <div className="absolute bottom-4 right-4 flex items-center justify-center">
        <span className="relative flex h-1.5 w-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a8fbd3] opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#a8fbd3]" />
        </span>
      </div>
    </motion.div>
  );
};

// Click Ripple Component for buttons
const RippleButton = ({ children, className, onClick, ...props }: any) => {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRipples((prev) => [...prev, { x, y, id: Date.now() }]);
    if (onClick) onClick(e);
  };

  return (
    <button
      onClick={handleClick}
      className={`relative overflow-hidden cursor-pointer ${className}`}
      {...props}
    >
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute rounded-full bg-[#a8fbd3]/45 pointer-events-none"
            style={{
              left: ripple.x - 25,
              top: ripple.y - 25,
              width: 50,
              height: 50,
            }}
          />
        ))}
      </AnimatePresence>
      <span className="relative z-10">{children}</span>
    </button>
  );
};

// Animated Progress Bar with real count up animation and custom click pulse
const ToolProgressBar = ({ name, icon }: { name: string; icon: any; key?: any }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [isClicked, setIsClicked] = useState(false);

  const handleBarClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 500);
    toast.success(`${name} Level: Active`, {
      description: "Optimized workflow with frame-accurate performance.",
    });
  };

  return (
    <motion.div 
      ref={ref}
      onClick={handleBarClick}
      whileHover={{ y: -4, scale: 1.01 }}
      className={`bg-white/5 backdrop-blur-xl border p-6 rounded-2xl transition-all duration-300 cursor-pointer select-none group relative overflow-hidden ${
        isClicked 
          ? "border-[#a8fbd3] shadow-[0_0_20px_rgba(168,251,211,0.25)] scale-[0.98]" 
          : "border-white/10 hover:border-[#a8fbd3]/40"
      }`}
    >
      {/* Click Pulse Glow Effect */}
      {isClicked && (
        <span className="absolute inset-0 bg-[#a8fbd3]/5 animate-pulse pointer-events-none" />
      )}

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#a8fbd3]/10 text-[#a8fbd3] group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <span className="text-lg font-bold uppercase tracking-wider text-white group-hover:text-[#a8fbd3] transition-colors duration-300">{name}</span>
        </div>
      </div>

      <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/5 p-[2px]">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: "100%" } : { width: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-[#50dcd6] to-[#a8fbd3] rounded-full shadow-[0_0_12px_rgba(168,251,211,0.6)]"
        />
      </div>
    </motion.div>
  );
};

const SkillPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [glaucusActive, setGlaucusActive] = useState(false);
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(0);

  // My Skills list
  const mainSkills = [
    { name: 'Premium Video Editing', desc: 'Splicing footage with pacing, drama, and continuity.', icon: <Film className="w-5 h-5" /> },
    { name: 'Color Correction', desc: 'Crafting atmospheric palettes and professional grading looks.', icon: <Palette className="w-5 h-5" /> },
    { name: 'Visual Enhancements', desc: 'Dynamic dynamic titles, typography, VFX, and visual elements.', icon: <Sparkles className="w-5 h-5" /> },
    { name: 'Creative Storytelling', desc: 'Connecting scenes emotionally to engage viewers.', icon: <Tv className="w-5 h-5" /> },
    { name: 'Audio Polish', desc: 'Layering immersive soundscapes, foley, and ambient depth.', icon: <Headphones className="w-5 h-5" /> },
    { name: 'Sound Mastering', desc: 'Polished audio tracks with balanced gain and clean dynamics.', icon: <Mic className="w-5 h-5" /> },
    { name: 'Smooth Cuts', desc: 'Invisible cuts, speed ramps, and seamless visual flows.', icon: <Scissors className="w-5 h-5" /> },
    { name: 'Text Effects', desc: 'Cinematic text tracks, kinetic typography, and styling.', icon: <Layers className="w-5 h-5" /> },
    { name: 'Vertical Formats', desc: 'Fast-paced, highly engaging vertical layouts.', icon: <Smartphone className="w-5 h-5" /> },
    { name: 'Long-Form Edits', desc: 'Retaining viewer retention with optimized sequences.', icon: <Video className="w-5 h-5" /> },
    { name: 'Bite-Sized Content', desc: 'Instant hooks and loops designed for maximum virality.', icon: <Zap className="w-5 h-5" /> },
    { name: 'Business Promos', desc: 'Clean, professional presentations for corporate clients.', icon: <Award className="w-5 h-5" /> },
    { name: 'Audio/Video Syncing', desc: 'Multi-cam synching, cutting dead air, and stellar master sound.', icon: <Volume2 className="w-5 h-5" /> },
    { name: 'Dynamic Captions', desc: 'Interactive animated captions styled for optimal reading.', icon: <Send className="w-5 h-5" /> },
    { name: 'Green Screen (Chroma Key)', desc: 'Flawless compositing, clean keying, and custom backdrops.', icon: <Cpu className="w-5 h-5" /> },
  ];

  // Tool Stack
  const tools = [
    { name: 'Adobe Premiere Pro', icon: <Scissors className="w-5 h-5" /> },
    { name: 'Adobe After Effects', icon: <Sparkles className="w-5 h-5" /> },
    { name: 'DaVinci Resolve', icon: <Palette className="w-5 h-5" /> },
    { name: 'Adobe Photoshop', icon: <Layers className="w-5 h-5" /> },
    { name: 'Adobe Illustrator', icon: <Cpu className="w-5 h-5" /> },
    { name: 'Adobe Audition', icon: <Volume2 className="w-5 h-5" /> },
  ];

  // Creative Workflow
  const workflowSteps = [
    { id: '01', title: 'Idea', icon: <Target className="w-5 h-5" />, desc: 'Brainstorming concepts, establishing visual direction, and mapping emotional triggers.' },
    { id: '02', title: 'Script', icon: <Send className="w-5 h-5" />, desc: 'Pacing the voiceover or narrative text to synchronize perfectly with custom visuals.' },
    { id: '03', title: 'Footage Review', icon: <Film className="w-5 h-5" />, desc: 'Filtering raw source files for the absolute best takes, expressions, and key details.' },
    { id: '04', title: 'Editing', icon: <Scissors className="w-5 h-5" />, desc: 'Rough-cuts, multi-cam synch, speed ramps, and locking the absolute narrative flow.' },
    { id: '05', title: 'Color Correction', icon: <Palette className="w-5 h-5" />, desc: 'Correcting exposure, matching camera profiles, and applying premium finishing.' },
    { id: '06', title: 'Audio Polish', icon: <Volume2 className="w-5 h-5" />, desc: 'Balancing dialog, placing foley effects, and rendering professional master sound mixes.' },
    { id: '07', title: 'Final Export', icon: <Play className="w-5 h-5" />, desc: 'High-bitrate cinematic rendering in optimal codecs tailored for specific web platforms.' },
  ];

  // What Can I Edit
  const whatIEditList = [
    "Premium Video Editing", "Color Correction", "Visual Enhancements", "Creative Storytelling", 
    "Audio Polish", "Sound Mastering", "Smooth Cuts", "Text Effects", 
    "Vertical Formats", "Long-Form Edits", "Bite-Sized Content", "Business Promos", 
    "Audio/Video Syncing", "Dynamic Captions"
  ];

  // Why Client Choose Me
  const whyChooseMe = [
    { title: "Fast Turnaround", desc: "Rapid processing speed that gets your videos ready in record time without compromising depth.", icon: <Zap className="w-6 h-6" /> },
    { title: "Unlimited Revisions", desc: "Re-cutting and perfecting your footage until it matches your exact aesthetic vision.", icon: <RefreshCw className="w-6 h-6" /> },
    { title: "High-Quality Exports", desc: "Renders in full pristine 4K resolution, optimized container codecs, and rich audio levels.", icon: <CheckCircle2 className="w-6 h-6" /> },
    { title: "Creative Storytelling", desc: "Pacing techniques and emotional audio design to hold viewer attention from start to finish.", icon: <Film className="w-6 h-6" /> },
    { title: "Attention to Detail", desc: "Frame-by-frame precision cuts, sub-frame audio alignments, and flawless transition speeds.", icon: <Award className="w-6 h-6" /> },
    { title: "Clear Communication", desc: "Transparent progress reports, prompt feedback responses, and stress-free creative alignment.", icon: <Cpu className="w-6 h-6" /> },
    { title: "On-Time Delivery", desc: "Reliable schedules you can plan campaigns around, delivering exactly as committed or earlier.", icon: <Play className="w-6 h-6" /> }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen flex flex-col text-white selection:bg-[#4fb7b3] selection:text-black cursor-auto overflow-x-hidden">
      <CustomStyleInject />
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

      {/* Main Content */}
      <main className="relative z-10 pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section with elegant fade and cascade */}
          <div className="text-center mb-24 relative h-[10vw] md:h-[15vw] flex items-center justify-center">
             <motion.h1 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 0.1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 1 }}
               className="text-[14vw] md:text-[16vw] font-heading font-bold text-white whitespace-nowrap leading-none select-none pointer-events-none tracking-tighter absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
             >
               CAPABILITIES
             </motion.h1>
             
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="relative z-10"
             >
               <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tight uppercase mb-4">
                 My <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a8fbd3] to-[#50dcd6]">Skills</span>
               </h2>
               <p className="text-gray-400 font-sans max-w-xl mx-auto text-base md:text-lg font-light leading-relaxed">
                 A comprehensive layout of technical video production suites, specialized editorial skills, creative workflows, and client dedication values.
               </p>
             </motion.div>
          </div>

          {/* Section 1: Core Skills Bento / Staggered Cards Cascade */}
          <div className="mb-32">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <span className="text-[#a8fbd3] font-mono text-xs uppercase tracking-widest block mb-2">// CAPABILITIES INDEX</span>
                <h3 className="text-3xl md:text-4xl font-heading font-bold uppercase tracking-tight">SPECIALIZED SERVICES</h3>
              </div>
              <p className="text-gray-400 max-w-md font-light text-sm mt-4 md:mt-0 leading-relaxed font-sans">
                Highly targeted expertise optimized for frame precision, visual impact, pacing rhythm, and emotional storytelling across all genres.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mainSkills.map((skill, index) => (
                <SkillCard
                  key={skill.name}
                  name={skill.name}
                  desc={skill.desc}
                  index={index}
                  icon={skill.icon}
                />
              ))}
            </div>
          </div>

          {/* Section 2: Tools Stack with Progress Bars and Counter Animation */}
          <div className="mb-32 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#31326f]/15 rounded-full blur-[120px] pointer-events-none -z-10" />
            
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <span className="text-[#a8fbd3] font-mono text-xs uppercase tracking-widest block mb-2">// TECHNICAL UTILITY</span>
                <h3 className="text-3xl md:text-4xl font-heading font-bold uppercase tracking-tight">SOFTWARE STACK</h3>
              </div>
              <p className="text-gray-400 max-w-md font-light text-sm mt-4 md:mt-0 leading-relaxed font-sans">
                Mastery levels in industry-standard tools. Click each bar to pulse details and trigger localized sea dragon interactions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool) => (
                <ToolProgressBar
                  key={tool.name}
                  name={tool.name}
                  icon={tool.icon}
                />
              ))}
            </div>
          </div>

          {/* Section 3: Creative Workflow interactive flowchart pipeline */}
          <div className="mb-32 relative">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
              <div>
                <span className="text-[#a8fbd3] font-mono text-xs uppercase tracking-widest block mb-2">// STEP BY STEP</span>
                <h3 className="text-3xl md:text-4xl font-heading font-bold uppercase tracking-tight">CREATIVE WORKFLOW</h3>
              </div>
              <p className="text-gray-400 max-w-md font-light text-sm mt-4 md:mt-0 leading-relaxed font-sans">
                A seamless editorial pipeline structured for clarity, visual pacing, premium color standards, and consistent results.
              </p>
            </div>

            {/* Desktop Timeline (horizontal / flex) */}
            <div className="flex flex-row gap-8 overflow-x-auto pb-8">
              {/* Connecting glow line */}
              <div className="absolute top-[42px] left-[6%] right-[6%] h-[2px] bg-gradient-to-r from-[#a8fbd3]/20 via-[#a8fbd3]/80 to-[#a8fbd3]/20 -z-10" />

              {workflowSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  onClick={() => {
                    setActiveWorkflowStep(index);
                    toast(`Step ${step.id}: ${step.title}`, {
                      description: step.desc,
                    });
                  }}
                  className={`text-center cursor-pointer select-none group relative flex-shrink-0 w-[200px]`}
                >
                  <div className="mx-auto w-16 h-16 rounded-full border flex items-center justify-center transition-all duration-300 relative z-10 mb-6 bg-[#161730]">
                    {/* Pulsing Outer Glow */}
                    <span className={`absolute inset-0 rounded-full transition-all duration-500 scale-100 opacity-0 group-hover:opacity-100 group-hover:scale-110 ${
                      activeWorkflowStep === index 
                        ? "bg-[#a8fbd3]/15 shadow-[0_0_15px_rgba(168,251,211,0.5)] border-[#a8fbd3]" 
                        : "bg-white/5 border-white/20 group-hover:border-[#a8fbd3]/40"
                    }`} />
                    
                    <div className={`relative transition-colors duration-300 ${
                      activeWorkflowStep === index ? "text-[#a8fbd3]" : "text-white/60 group-hover:text-[#a8fbd3]"
                    }`}>
                      {step.icon}
                    </div>
                  </div>

                  <span className="font-mono text-[10px] text-[#a8fbd3] tracking-widest block mb-1">
                    {step.id}
                  </span>
                  <h4 className="font-heading font-bold text-sm uppercase tracking-wide mb-2 group-hover:text-[#a8fbd3] transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-gray-500 font-sans leading-relaxed transition-colors duration-300 group-hover:text-gray-300 font-light opacity-0 group-hover:opacity-100 h-0 group-hover:h-auto overflow-hidden transition-all">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>


          </div>

          {/* Section 4: What Can I Edit list */}
          <div className="mb-32">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#a8fbd3]/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="max-w-2xl">
                <span className="text-[#a8fbd3] font-mono text-xs uppercase tracking-widest block mb-3">// EDITING EXPERTISES</span>
                <h3 className="text-3xl md:text-5xl font-heading font-bold uppercase tracking-tight mb-6">
                  What Can I Edit?
                </h3>
                <p className="text-gray-400 font-sans font-light leading-relaxed mb-10 text-base md:text-lg">
                  Whether you are launching high-impact short-form loops or producing extensive long-form feature films, I customize my technical suites for flawless integration.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8">
                {whatIEditList.map((item, idx) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center gap-3 group cursor-pointer"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#a8fbd3] group-hover:scale-150 transition-transform duration-300 shadow-[0_0_6px_#a8fbd3]" />
                    <span className="text-sm font-sans tracking-wide text-gray-300 group-hover:text-white transition-colors duration-200 uppercase font-medium">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 5: Why Client Choose Me Grid */}
          <div className="mb-24">
            <div className="text-center max-w-xl mx-auto mb-16">
              <span className="text-[#a8fbd3] font-mono text-xs uppercase tracking-widest block mb-2">// DEDICATION VALUES</span>
              <h3 className="text-3xl md:text-4xl font-heading font-bold uppercase tracking-tight">WHY CLIENTS CHOOSE ME</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyChooseMe.map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.6 }}
                  whileHover={{ y: -6, borderColor: 'rgba(168, 251, 211, 0.45)' }}
                  className="bg-white/5 border border-white/10 p-8 rounded-2xl group transition-all duration-300 select-none"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#a8fbd3]/10 text-[#a8fbd3] flex items-center justify-center group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <h4 className="text-lg font-heading font-bold uppercase tracking-wide group-hover:text-[#a8fbd3] transition-colors">{item.title}</h4>
                  </div>
                  <p className="text-gray-400 font-sans text-sm font-light leading-relaxed group-hover:text-white/80 transition-colors">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact CTA with click ripple effect wrapped with a slow crawling snail on the border */}
          <div className="relative overflow-visible">
            <div className="text-center bg-white/5 border border-white/10 py-16 px-6 rounded-3xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#a8fbd3]/5 via-transparent to-[#a8fbd3]/5 pointer-events-none" />
              <h3 className="text-2xl md:text-4xl font-heading font-bold uppercase mb-4">Ready to start your project?</h3>
              <p className="text-gray-400 font-sans font-light max-w-md mx-auto mb-8 text-sm">
                Let's craft creative storytelling, dynamic motion, and polished cinematic content that captures and holds absolute retention.
              </p>
              <div className="flex justify-center gap-4">
                <Link to="/contact">
                  <RippleButton className="px-8 py-4 bg-[#a8fbd3] text-black font-heading font-bold tracking-wider rounded-full hover:shadow-[0_0_25px_rgba(168,251,211,0.5)] transition-shadow uppercase text-sm border-none">
                    Talk with me
                  </RippleButton>
                </Link>
              </div>
            </div>
            {/* The snail walks slowly along the top border of the Contact CTA card */}
            <Snail />
          </div>

        </div>
      </main>

      <Footer className="mt-auto" />
    </div>
  );
};

export default SkillPage;
