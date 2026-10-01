import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Instagram, Mail, Facebook, Eraser } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FooterGrid } from './FooterGrid';
import { KineticText } from './KineticText';

const Footer: React.FC<{className?: string}> = ({ className }) => {
  const [clearTrigger, setClearTrigger] = useState(0);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: 'https://www.facebook.com/people/DomainEdit/61591837791833/' },
    { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/domain.editss/' },
  ];

  return (
    <footer className={`relative z-10 border-t border-white/5 bg-black/40 backdrop-blur-2xl overflow-hidden ${className || ''}`}>
      <FooterGrid clearTrigger={clearTrigger} />
      {/* Animated Marquee */}
      <div className="relative z-10 py-10 border-b border-white/5 overflow-hidden whitespace-nowrap group pointer-events-none">
        <motion.div 
          className="flex gap-12 text-[8vw] md:text-[6vw] font-heading font-black uppercase opacity-10 select-none pointer-events-none"
          animate={{ x: [0, -1000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <span>Let's Build Something Great</span>
          <span>Let's Build Something Great</span>
          <span>Let's Build Something Great</span>
          <span>Let's Build Something Great</span>
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-24 pointer-events-none">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Section */}
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
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -5, scale: 1.1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#a8fbd3] hover:border-[#a8fbd3]/50 transition-all duration-300 group pointer-events-auto"
                  data-hover="true"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-mono text-[#a8fbd3] uppercase tracking-[0.3em] mb-8">Navigation</h3>
            <ul className="space-y-4">
              {[
                { name: 'Home', path: '/' },
                { name: 'Work', path: '/portfolio' },
                { name: 'About', path: '/about' },
                { name: 'Contact', path: '/contact' },
                { name: 'Reviews', path: '/reviews' },
                { name: 'Graphic Design', path: 'https://domaindesign.vercel.app/' }
              ].map((item) => {
                const isExternal = item.path.startsWith('/#') || item.path.startsWith('http');
                const isFullExternal = item.path.startsWith('http');
                
                return (
                  <li key={item.name}>
                    {isExternal ? (
                      <a 
                        href={item.path} 
                        target={isFullExternal ? "_blank" : undefined}
                        rel={isFullExternal ? "noopener noreferrer" : undefined}
                        className="text-gray-400 hover:text-white transition-colors text-lg font-light group flex items-center gap-2 pointer-events-auto"
                      >
                        <span className="w-0 h-px bg-[#a8fbd3] group-hover:w-4 transition-all duration-300" />
                        {item.name}
                      </a>
                    ) : (
                      <Link to={item.path} className="text-gray-400 hover:text-white transition-colors text-lg font-light group flex items-center gap-2 pointer-events-auto">
                        <span className="w-0 h-px bg-[#a8fbd3] group-hover:w-4 transition-all duration-300" />
                        {item.name}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="relative">
            <h3 className="text-xs font-mono text-[#a8fbd3] uppercase tracking-[0.3em] mb-8">Get in Touch</h3>
            <div className="space-y-6">
              <a href="mailto:Domain.Edits@outlook.com" className="group block pointer-events-auto">
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Email</p>
                <p className="text-lg text-white group-hover:text-[#a8fbd3] transition-colors">Domain.Edits@outlook.com</p>
              </a>
            </div>

            {/* Actions */}
            <div className="absolute bottom-0 right-0 md:relative md:mt-12 flex gap-4 pointer-events-auto">
              <motion.button 
                onClick={() => setClearTrigger(prev => prev + 1)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-14 h-14 rounded-full bg-white/10 text-white flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.05)] group hover:bg-white/20 transition-colors"
                data-cursor-text="CLEAR"
                title="Clear Grid"
              >
                <Eraser className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </motion.button>

              <motion.button 
                onClick={scrollToTop}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-14 h-14 rounded-full bg-[#a8fbd3] text-black flex items-center justify-center shadow-[0_0_30px_rgba(168,251,211,0.3)] group"
                data-cursor-text="UP"
              >
                <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
              </motion.button>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-gray-500 uppercase tracking-widest pointer-events-none">
          <p className="pointer-events-auto">© 2026 DOMAIN EDITS. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8 pointer-events-auto">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#a8fbd3]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#637ab9]/5 rounded-full blur-[120px] pointer-events-none" />
    </footer>
  );
};

export default Footer;
