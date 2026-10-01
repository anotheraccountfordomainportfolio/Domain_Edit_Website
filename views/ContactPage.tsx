import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Send, Mail, Zap, ArrowUp, Phone, Instagram, Facebook } from 'lucide-react';
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

const ContactPage = () => {
  const [glaucusActive, setGlaucusActive] = useState(false);
  
  // Standard Form State
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFlying, setIsFlying] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await fetch('https://formsubmit.co/ajax/Domain.Edits@outlook.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          _subject: `New Inquiry from ${formData.name}: ${formData.subject}`
        })
      });
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success('Message sent! I will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
    } catch (error) {
      setIsSubmitting(false);
      toast.error('Failed to send message. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
      
      {/* Bottom Spread Navigation Menu */}
      <BottomNav glaucusActive={glaucusActive} setGlaucusActive={setGlaucusActive} />

      {/* Main Content */}
      <main className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-20 relative h-[10vw] md:h-[15vw] flex items-center justify-center overflow-visible">
             <h1 className="text-[14vw] md:text-[16vw] font-heading font-bold opacity-50 text-transparent bg-clip-text bg-gradient-to-r from-[#a8fbd3] via-white to-[#a8fbd3] whitespace-nowrap leading-none select-none pointer-events-none tracking-tighter absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 drop-shadow-[0_0_30px_rgba(168,251,211,0.4)]">
               LETS TALK
             </h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 uppercase">Get in Touch</h2>
              <p className="text-gray-400 mb-12 font-light leading-relaxed max-w-md">
                Ready to elevate your visuals? Whether it's a dynamic edit or a complete post-production package, let's discuss how we can bring your vision to life.
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
                  <div className="flex gap-4">
                    <a href="https://www.instagram.com/domain.editss/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#a8fbd3] hover:text-black transition-all duration-300">
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a href="https://www.facebook.com/people/DomainEdit/61591837791833/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#a8fbd3] hover:text-black transition-all duration-300">
                      <Facebook className="w-5 h-5" />
                    </a>
                  </div>
                  <div>
                    <p className="text-xs font-mono text-[#a8fbd3] uppercase tracking-widest mb-1">Social</p>
                    <div className="flex flex-col">
                      <a href="https://www.instagram.com/domain.editss/" target="_blank" rel="noopener noreferrer" className="text-xl font-bold hover:text-[#a8fbd3] transition-colors">@domain.editss</a>
                      <a href="https://www.facebook.com/people/DomainEdit/61591837791833/" target="_blank" rel="noopener noreferrer" className="text-xl font-bold hover:text-[#a8fbd3] transition-colors">Domain Edit</a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl"
            >
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-[#a8fbd3]/20 rounded-full flex items-center justify-center mx-auto mb-6 text-[#a8fbd3]">
                    <Zap className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Message Received</h3>
                  <p className="text-gray-400 mb-8">Thanks for reaching out! I'll get back to you within 24 hours.</p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 transition-colors font-bold tracking-widest uppercase text-sm"
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-gray-400 uppercase tracking-widest">Name</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#a8fbd3] transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-gray-400 uppercase tracking-widest">Email</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#a8fbd3] transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-gray-400 uppercase tracking-widest">Subject</label>
                    <input 
                      type="text" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#a8fbd3] transition-colors"
                      placeholder="Project Inquiry"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-gray-400 uppercase tracking-widest">Message</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#a8fbd3] transition-colors resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-[#a8fbd3] text-black font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </main>

      <Footer className="mt-auto" />
    </div>
  );
};
export default ContactPage;
