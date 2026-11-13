import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Instagram, Facebook, Eraser } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FooterGrid } from './FooterGrid';
import { KineticText } from './KineticText';

const Footer: React.FC<{ className?: string }> = ({ className }) => {
  const [clearTrigger, setClearTrigger] = useState(0);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: 'https://www.facebook.com/people/DomainEdit/61591837791833/' },
    { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/domain.editss/' },
  ];

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Work', path: '/portfolio' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Graphic Design', path: 'https://domaindesign.vercel.app/' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms & Conditions', path: '/terms' },
  ];

  return (
    <footer className={`relative z-10 border-t border-white/5 bg-[#090b18]/90 overflow-hidden pb-32 md:pb-24 ${className || ''}`}>
      <FooterGrid clearTrigger={clearTrigger} />

      {/* GPU CSS Marquee */}
      <div className="relative z-10 py-10 border-b border-white/5 overflow-hidden whitespace-nowrap pointer-events-none">
        <div className="animate-marquee-smooth gap-12 text-[8vw] md:text-[6vw] font-heading font-black uppercase opacity-10 select-none pointer-events-none">
          <span>Let's Build Something Great</span>
          <span>Let's Build Something Great</span>
          <span>Let's Build Something Great</span>
          <span>Let's Build Something Great</span>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-24 pointer-events-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <KineticText
                text="DOMAIN EDITS"
                as="h2"
                className="text-4xl font-heading font-bold tracking-tighter text-white mb-4 justify-start"
              />
              <p className="text-gray-400 max-w-sm text-lg font-light leading-relaxed">
                A video editor specializing in polished visuals that leave a lasting impression.
              </p>
            </motion.div>

            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#a8fbd3] hover:border-[#a8fbd3]/50 hover:-translate-y-1 transition-all duration-300 group pointer-events-auto"
                  data-hover="true"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-mono text-[#a8fbd3] uppercase tracking-[0.3em] mb-8">Navigation</h3>
            <ul className="space-y-4">
              {navLinks.map((item) => {
                const isExternal = item.path.startsWith('/#') || item.path.startsWith('http');
                const isFullExternal = item.path.startsWith('http');

                return (
                  <li key={item.name}>
                    {isExternal ? (
                      <a
                        href={item.path}
                        target={isFullExternal ? '_blank' : undefined}
                        rel={isFullExternal ? 'noopener noreferrer' : undefined}
                        className="text-gray-400 hover:text-white transition-colors text-base font-light group flex items-center gap-2 pointer-events-auto"
                      >
                        <span className="w-0 h-px bg-[#a8fbd3] group-hover:w-4 transition-all duration-300" />
                        {item.name}
                      </a>
                    ) : (
                      <Link
                        to={item.path}
                        className="text-gray-400 hover:text-white transition-colors text-base font-light group flex items-center gap-2 pointer-events-auto"
                      >
                        <span className="w-0 h-px bg-[#a8fbd3] group-hover:w-4 transition-all duration-300" />
                        {item.name}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="relative">
            <h3 className="text-xs font-mono text-[#a8fbd3] uppercase tracking-[0.3em] mb-8">Get in Touch</h3>
            <div className="space-y-6">
              <a href="mailto:Domain.Edits@outlook.com" className="group block pointer-events-auto">
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Email</p>
                <p className="text-lg text-white group-hover:text-[#a8fbd3] transition-colors">Domain.Edits@outlook.com</p>
              </a>
            </div>

            <div className="absolute bottom-0 right-0 md:relative md:mt-12 flex gap-4 pointer-events-auto">
              <button
                onClick={() => setClearTrigger((prev) => prev + 1)}
                className="w-14 h-14 rounded-full bg-white/10 text-white flex items-center justify-center shadow-[0_0_24px_rgba(255,255,255,0.05)] group hover:bg-white/20 hover:scale-105 active:scale-95 transition-all"
                data-cursor-text="CLEAR"
                title="Clear Grid"
              >
                <Eraser className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </button>

              <button
                onClick={scrollToTop}
                className="w-14 h-14 rounded-full bg-[#a8fbd3] text-black flex items-center justify-center shadow-[0_0_24px_rgba(168,251,211,0.3)] group hover:scale-105 active:scale-95 transition-transform"
                data-cursor-text="UP"
              >
                <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-mono text-gray-400 uppercase tracking-widest pointer-events-auto">
          <p>© 2026 DOMAIN EDITS. ALL RIGHTS RESERVED.</p>
        </div>
      </div>

      {/* Radial glow decorations without expensive blur filters */}
      <div
        className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(168,251,211,0.06) 0%, transparent 70%)' }}
      />
      <div
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,122,185,0.06) 0%, transparent 70%)' }}
      />
    </footer>
  );
};

export default Footer;
