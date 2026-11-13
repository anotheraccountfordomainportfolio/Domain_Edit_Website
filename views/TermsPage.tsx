import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Scale, FileText, CheckCircle2, DollarSign, RefreshCw, Clock, 
  UserCheck, XCircle, ShieldCheck, Film, Eye, HardDrive, 
  MessageSquare, Ban, AlertTriangle, Lock, HelpCircle, ArrowLeft,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import FluidBackground from '../ui/FluidBackground';
import FloatingTextBackground from '../ui/FloatingTextBackground';
import { SmoothCursor } from '../ui/magicui/smooth-cursor';
import BottomNav from '../ui/BottomNav';
import Footer from '../ui/Footer';
import { BlueGlaucus } from '../ui/BlueGlaucus';
import { BlueButterflies } from '../ui/BlueButterflies';

const TermsPage: React.FC = () => {
  const [glaucusActive, setGlaucusActive] = useState(false);

  const sections = [
    {
      num: '01',
      title: 'Our Services',
      icon: Film,
      intro: "DomainEdit provides custom video editing services based on each client's requirements.",
      items: [
        'Gaming montages and gameplay edits',
        'Stream highlights and funny moments',
        'YouTube videos and YouTube Shorts',
        'TikTok videos and Instagram Reels',
        'Cinematic edits and promotional videos',
        'Motion graphics and visual effects',
        'Video intros and outros',
        'Logo animations',
        'Podcast clips and short-form content',
        'Other custom video editing projects agreed upon with the client'
      ],
      closing: 'The exact services included in an order will depend on the project details discussed and agreed upon before work begins.'
    },
    {
      num: '02',
      title: 'Orders and Project Requirements',
      icon: CheckCircle2,
      paragraphs: [
        'Before starting a project, we may discuss your editing style, video length, references, deadlines, required effects, and other details needed to complete the work.',
        'You are responsible for providing the necessary footage, instructions, and reference materials for your project.',
        'Please make sure your requirements are clear before confirming your order. If you request major changes after editing has started, the price and delivery time may need to be adjusted.',
        'We will communicate any significant changes to the project scope before proceeding with additional work.'
      ]
    },
    {
      num: '03',
      title: 'Pricing and Payments',
      icon: DollarSign,
      paragraphs: [
        'DomainEdit aims to provide quality video editing services at reasonable prices.',
        'The price of a project depends on its length, complexity, editing style, required effects, and overall workload. We will communicate the agreed price before starting work.',
        'Any advance payment, remaining balance, or other payment arrangement will be discussed with you before the project begins.',
        'If you request extra services or work beyond the original agreement, an additional fee may apply. We will explain the cost and obtain your agreement before proceeding with the extra work.'
      ]
    },
    {
      num: '04',
      title: 'Revisions and Feedback',
      icon: RefreshCw,
      paragraphs: [
        'We want the final video to match the requirements agreed upon for your project.',
        'The number of revisions included in your order will be communicated before work begins.',
        'A revision may include reasonable adjustments to timing, transitions, text, colors, audio levels, or other elements within the original project scope.',
        'A completely different editing style, replacement of substantial footage, a new concept, or additional work outside the original agreement may require an extra fee.',
        'To help us complete revisions efficiently, please provide clear and specific feedback. Revision requests should be made within any timeframe agreed upon for your project.'
      ]
    },
    {
      num: '05',
      title: 'Delivery Time',
      icon: Clock,
      paragraphs: [
        'The estimated delivery time depends on the complexity of the project, the length of the footage, the requested effects, and our current workload.',
        'We will provide an estimated timeframe before starting the project whenever possible.',
        'Delivery may take longer if you provide footage or instructions late, request additional changes, or delay necessary feedback. If we expect a significant delay, we will aim to inform you as soon as reasonably possible.',
        'Any specific deadline should be discussed and agreed upon before the project begins.'
      ]
    },
    {
      num: '06',
      title: 'Client Responsibilities',
      icon: UserCheck,
      paragraphs: [
        'You are responsible for providing footage, music, images, logos, and other materials that you have the right or permission to use.',
        'Please ensure that the files you provide are accessible and suitable for editing. If a file is damaged, missing, or incompatible with our workflow, we may need you to provide a replacement.',
        'You are also responsible for reviewing the final video before publishing it and checking that it meets the requirements of your intended platform.'
      ]
    },
    {
      num: '07',
      title: 'Cancellations and Refunds',
      icon: XCircle,
      paragraphs: [
        'If you need to cancel a project, please contact us as soon as possible.',
        'Refund eligibility depends on the agreed payment terms, the progress of the project, and the work already completed. If editing has not started, a refund may be possible depending on the circumstances and any agreed terms.',
        'Once substantial work has been completed or the final video has been delivered, the amount refundable, if any, will depend on the applicable agreement and the circumstances of the request.',
        'We aim to handle cancellation and refund requests fairly and communicate our decisions clearly. Nothing in these terms removes any consumer rights that apply under the law.'
      ]
    },
    {
      num: '08',
      title: 'Ownership and Usage Rights',
      icon: ShieldCheck,
      paragraphs: [
        'Once the agreed payment has been completed, the rights to use the final edited video will be determined by the agreement made for your project.',
        'Unless otherwise agreed, the delivered video is intended for the use discussed when the order was placed.',
        'Raw footage, editing project files, timelines, presets, templates, and other working files are not automatically included in the final delivery unless they are specifically included in the agreement.',
        'Third-party music, fonts, stock footage, plugins, templates, and other licensed assets may remain subject to their original licence terms. We cannot transfer rights that we do not own.',
        'If you need editable project files, exclusive rights, or specific licensing arrangements, please discuss these requirements before confirming your order.'
      ]
    },
    {
      num: '09',
      title: 'Music, Footage, and Copyright',
      icon: Film,
      paragraphs: [
        'Video projects may include music, footage, images, sound effects, or other creative materials supplied by you or obtained from third-party sources.',
        'You are responsible for ensuring that materials you provide can legally be used for your intended purpose.',
        'Where third-party assets are used, their licensing conditions may restrict how the finished video can be published, monetized, distributed, or used commercially.',
        'DomainEdit cannot guarantee that a video will never receive a copyright claim, platform restriction, or monetization issue, particularly when the project includes third-party content.'
      ]
    },
    {
      num: '10',
      title: 'Portfolio and Promotional Use',
      icon: Eye,
      paragraphs: [
        'We may wish to showcase selected completed projects to demonstrate our video editing skills and attract potential clients.',
        'We respect client privacy and will not intentionally publish confidential footage or private project materials without appropriate permission.',
        'If you want your project to remain private, please inform us before work begins so that we can agree on suitable arrangements.'
      ]
    },
    {
      num: '11',
      title: 'Project Files and Storage',
      icon: HardDrive,
      paragraphs: [
        'Clients should keep their own copies of the original footage and final delivered videos.',
        'We may retain project files or footage temporarily to complete revisions or manage delivery, but we do not guarantee permanent storage or future access to those files unless we have explicitly agreed to provide that service.',
        'If you need raw footage or editable project files returned, please discuss this before the project begins.'
      ]
    },
    {
      num: '12',
      title: 'Communication and Project Delays',
      icon: MessageSquare,
      paragraphs: [
        'Clear communication helps us deliver the best possible result.',
        'You agree to provide the information and feedback reasonably needed to complete your project. If we cannot reach you for an extended period, work may be paused until we receive the necessary response.',
        'If a project remains inactive for a prolonged period, we may contact you to discuss whether it should be resumed, rescheduled, or closed under the agreed project terms.'
      ]
    },
    {
      num: '13',
      title: 'Prohibited Requests',
      icon: Ban,
      paragraphs: [
        'DomainEdit reserves the right to decline projects that involve illegal activities, fraud, impersonation, or the unauthorized use of protected material.',
        'We may also decline requests that fall outside our services or that we reasonably believe could violate applicable law or another person\'s rights.'
      ]
    },
    {
      num: '14',
      title: 'Limitations of Responsibility',
      icon: AlertTriangle,
      paragraphs: [
        'We aim to deliver work that matches the agreed requirements and is prepared with reasonable care.',
        'However, we cannot guarantee specific results such as increased views, subscribers, followers, engagement, sales, or revenue from using an edited video.',
        'Platform algorithms, copyright policies, audience behavior, and other factors outside our control may affect the performance of your content.',
        'To the extent permitted by applicable law, DomainEdit is not responsible for indirect losses arising from the use of our website or services. Nothing in these terms excludes liability that cannot legally be excluded.'
      ]
    },
    {
      num: '15',
      title: 'Privacy',
      icon: Lock,
      paragraphs: [
        'Any personal information you provide when contacting DomainEdit or ordering a service will be handled in accordance with our Privacy Policy.',
        'We encourage you to review our Privacy Policy to understand how your information and project materials may be collected, used, and protected.'
      ]
    },
    {
      num: '16',
      title: 'Changes to These Terms',
      icon: FileText,
      paragraphs: [
        'We may update these Terms & Conditions when our services, business practices, or legal requirements change.',
        'The latest version will be published on this page. For existing projects, the agreed project terms will continue to apply, subject to any agreed changes and applicable law.'
      ]
    },
    {
      num: '17',
      title: 'Contact Us',
      icon: HelpCircle,
      paragraphs: [
        'If you have any questions about these Terms & Conditions, our editing services, pricing, revisions, or project requirements, please contact us through the contact details or communication channels provided on our website.',
        'At DomainEdit, we believe in clear communication, fair pricing, and delivering editing work that meets the needs of each client.',
        'DomainEdit — Custom Video Editing Services'
      ]
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
          {/* Header without date */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-[#a8fbd3]/10 border border-[#a8fbd3]/30 flex items-center justify-center text-[#a8fbd3] shrink-0">
              <Scale className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-heading font-black tracking-tight uppercase text-white">
                Terms & Conditions
              </h1>
              <p className="text-xs font-mono text-[#a8fbd3] mt-1 tracking-wider uppercase">
                DomainEdit • Custom Video Editing Services
              </p>
            </div>
          </div>

          {/* Intro Text */}
          <div className="space-y-4 text-gray-300 font-light text-sm sm:text-base leading-relaxed mb-10 border-b border-white/10 pb-8">
            <p>
              Welcome to DomainEdit. These Terms & Conditions explain how our video editing services work and what you can expect when working with us.
            </p>
            <p>
              We provide custom video editing for content creators, gamers, streamers, businesses, and individuals who want to improve their video content. By using our website or placing an order with us, you agree to the terms outlined on this page.
            </p>
            <p>
              Our goal is to keep everything clear and straightforward, from the first discussion about your project to the final delivery of your edited video.
            </p>
          </div>

          {/* 17 Structured Sections */}
          <div className="space-y-6">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <div 
                  key={section.num}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 hover:border-[#a8fbd3]/40 transition-colors duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-xs text-[#a8fbd3] font-bold px-2.5 py-1 rounded-lg bg-[#a8fbd3]/10 border border-[#a8fbd3]/30 shrink-0 mt-0.5">
                      {section.num}
                    </span>
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-[#a8fbd3] shrink-0 group-hover:scale-110 transition-transform" />
                        <h2 className="text-base sm:text-lg font-heading font-bold text-white uppercase tracking-wide">
                          {section.title}
                        </h2>
                      </div>

                      {section.intro && (
                        <p className="text-gray-300 font-light text-sm leading-relaxed">
                          {section.intro}
                        </p>
                      )}

                      {section.items && (
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 pb-1">
                          {section.items.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-300 font-light">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#a8fbd3] shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {section.closing && (
                        <p className="text-gray-400 font-light text-xs sm:text-sm leading-relaxed pt-1">
                          {section.closing}
                        </p>
                      )}

                      {section.paragraphs && (
                        <div className="space-y-2">
                          {section.paragraphs.map((para, idx) => (
                            <p key={idx} className="text-gray-400 font-light text-sm leading-relaxed">
                              {para}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Footer Note */}
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-400">
            <span>DomainEdit • Custom Video Editing Services</span>
            <Link to="/privacy" className="text-white hover:text-[#a8fbd3] transition-colors underline">
              View Privacy Policy →
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsPage;
