import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, Lock, Eye, FileText, ArrowLeft, Cpu, Database, 
  Globe, Film, HardDrive, KeyRound, AlertCircle, UserCheck, MailQuestion 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import FluidBackground from '../ui/FluidBackground';
import FloatingTextBackground from '../ui/FloatingTextBackground';
import { SmoothCursor } from '../ui/magicui/smooth-cursor';
import BottomNav from '../ui/BottomNav';
import Footer from '../ui/Footer';
import { BlueGlaucus } from '../ui/BlueGlaucus';
import { BlueButterflies } from '../ui/BlueButterflies';

const PrivacyPage: React.FC = () => {
  const [glaucusActive, setGlaucusActive] = useState(false);

  const policyPoints = [
    {
      num: '01',
      title: 'Introduction & Scope',
      icon: Shield,
      content: 'Welcome to DOMAIN EDITS ("we," "our," or "us"). We are committed to protecting your personal privacy and safeguarding any information shared with us. This Privacy Policy outlines how we collect, handle, store, and protect your information across our website, portfolio showcase, Progressive Web App (PWA), and associated communications.'
    },
    {
      num: '02',
      title: 'Information We Collect Directly',
      icon: Eye,
      content: 'When you interact with our website or submit inquiries through our contact form, we collect personal information that you voluntarily provide, including your full name or creative alias, email address (for project quotes and correspondence), project requirements, video editing scope, timeline expectations, and direct creative feedback regarding editing commissions.'
    },
    {
      num: '03',
      title: 'Automatically Collected Technical Data',
      icon: Cpu,
      content: 'When you browse our portfolio, certain non-identifying technical information is automatically logged by your browser to ensure optimal performance, including device model, operating system, browser version, screen resolution, viewport dimensions, approximate geographic region (country/city level without GPS tracking), and page interaction telemetry.'
    },
    {
      num: '04',
      title: 'Purpose and Legal Basis for Processing',
      icon: Database,
      content: 'DOMAIN EDITS utilizes collected information strictly for legitimate creative and business purposes: delivering professional video editing, post-production, and motion graphics services, responding promptly to client inquiries and quote requests, coordinating asset delivery and editing schedules, and preventing abusive or automated form submissions.'
    },
    {
      num: '05',
      title: 'Progressive Web App (PWA) & Offline Caching',
      icon: HardDrive,
      content: 'Our website features Progressive Web App (PWA) technology powered by Workbox service workers. When you visit our website, essential site assets (HTML, CSS, JavaScript, fonts, and interface icons) are cached locally on your device, enabling continuous browsing of our portfolio showcase even when your internet connection is unavailable or offline. Cached data is stored locally in your browser and is never transmitted to external servers without authorization.'
    },
    {
      num: '06',
      title: 'Cookies & Local Device Storage',
      icon: KeyRound,
      content: 'We adhere to a privacy-first standard. We do not use third-party behavioral advertising cookies or cross-site profiling trackers. Any local storage utilized is strictly functional, such as retaining interactive visual effects preferences (e.g., Blue Glaucus toggle state) or cache manifests. You can clear your browser cache or disable service workers at any time through your browser settings.'
    },
    {
      num: '07',
      title: 'Client Media, Raw Footage & Confidentiality',
      icon: Film,
      content: 'As a creative video editing studio, we treat all client footage and creative assets with utmost confidentiality. Any raw video footage, audio files, project scripts, or branding assets shared with us for commissioned work are kept strictly private. Unreleased commercial footage, private influencer content, and proprietary project materials are never published or shared with third parties without your explicit prior written consent.'
    },
    {
      num: '08',
      title: 'Third-Party Service Providers',
      icon: Globe,
      content: 'We integrate trusted third-party services to deliver seamless website functionality: FormSubmit (formsubmit.co) for securely routing contact messages to our official inbox (Domain.Edits@outlook.com), YouTube iframe embeds to showcase sample video edits, Google Fonts for stylized typography, and links to our external design showcase (domaindesign.vercel.app) or social media profiles (Instagram, Facebook), which operate under their own independent privacy terms.'
    },
    {
      num: '09',
      title: 'Data Retention & Disposal',
      icon: FileText,
      content: 'We retain personal data and project records only as long as necessary. Contact form inquiries and email communications are retained for the duration of the professional relationship or project lifecycle. Raw project footage and working editing cache files are retained during the revision window and subsequently archived or purged according to client agreement. You may request deletion of your contact records or creative assets at any time.'
    },
    {
      num: '10',
      title: 'Data Security & Protection Safeguards',
      icon: Lock,
      content: 'We enforce technical and organizational safeguards to protect your information, including end-to-end HTTPS/TLS encryption across all site traffic and form transmissions, secure storage environments with restricted access protocols, and regular audits of external dependencies and build artifacts. No financial credentials or payment details are stored directly on this portfolio.'
    },
    {
      num: '11',
      title: 'Children’s Online Privacy Protection',
      icon: AlertCircle,
      content: 'Our website and creative services are directed toward businesses, creators, and general audiences. We do not knowingly solicit or collect personal information from children under the age of 13 (or under 16 where applicable by local law). If we become aware that personal information of a minor has been collected without parental consent, we will promptly delete it.'
    },
    {
      num: '12',
      title: 'Your Privacy Rights & Choices',
      icon: UserCheck,
      content: 'Depending on your jurisdiction (such as GDPR, CCPA, or applicable regional regulations), you possess the right to access a summary of your personal information, request correction of inaccurate records, request complete erasure of your contact records ("Right to be Forgotten"), or object to non-essential data processing. To exercise any of these rights, please contact us at Domain.Edits@outlook.com.'
    },
    {
      num: '13',
      title: 'Policy Revisions & Contact Information',
      icon: MailQuestion,
      content: 'We may periodically update this Privacy Policy to reflect enhancements in our editing capabilities, new site features, or legal requirements. Any modifications will be indicated with an updated revision date. For any questions, project inquiries, or privacy concerns, please contact DOMAIN EDITS directly at Domain.Edits@outlook.com or through our social channels.'
    }
  ];

  return (
    <div className="relative min-h-screen flex flex-col text-white selection:bg-[#4fb7b3] selection:text-black cursor-auto overflow-x-hidden bg-[#07080f]">
      <SmoothCursor />
      <FluidBackground />
      <FloatingTextBackground />
      <BlueButterflies />
      <BlueGlaucus active={glaucusActive} />
      <BottomNav glaucusActive={glaucusActive} setGlaucusActive={setGlaucusActive} />

      <main className="relative z-10 pt-36 pb-24 px-6 max-w-5xl mx-auto w-full">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-xs font-mono uppercase text-[#a8fbd3] hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="bg-[#111432]/75 border border-white/10 rounded-3xl p-6 sm:p-10 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-[#a8fbd3]/10 border border-[#a8fbd3]/30 flex items-center justify-center text-[#a8fbd3] shrink-0">
              <Shield className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-heading font-black tracking-tight uppercase text-white">
                Privacy Policy
              </h1>
              <p className="text-xs font-mono text-[#a8fbd3] mt-1 tracking-wider uppercase">
                DOMAIN EDITS • 13 Core Privacy Points • Last Updated: October 2026
              </p>
            </div>
          </div>

          <p className="text-gray-300 font-light text-sm sm:text-base leading-relaxed mb-8 border-b border-white/10 pb-6">
            This Privacy Policy governs the manner in which DOMAIN EDITS collects, maintains, protects, and discloses information collected from visitors and clients of this website. Please review the 13 points below to understand our commitments.
          </p>

          {/* 13 Structured Privacy Policy Points */}
          <div className="space-y-6">
            {policyPoints.map((item) => {
              const Icon = item.icon;
              return (
                <div 
                  key={item.num}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 hover:border-[#a8fbd3]/40 transition-colors duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-xs text-[#a8fbd3] font-bold px-2.5 py-1 rounded-lg bg-[#a8fbd3]/10 border border-[#a8fbd3]/30 shrink-0 mt-0.5">
                      {item.num}
                    </span>
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-[#a8fbd3] shrink-0 group-hover:scale-110 transition-transform" />
                        <h2 className="text-base sm:text-lg font-heading font-bold text-white uppercase tracking-wide">
                          {item.title}
                        </h2>
                      </div>
                      <p className="text-gray-400 font-light text-sm leading-relaxed">
                        {item.content}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Direct Contact Callout */}
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-400">
            <span>Official Inquiries: <a href="mailto:Domain.Edits@outlook.com" className="text-[#a8fbd3] underline">Domain.Edits@outlook.com</a></span>
            <Link to="/terms" className="text-white hover:text-[#a8fbd3] transition-colors underline">
              View Terms & Conditions →
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPage;
