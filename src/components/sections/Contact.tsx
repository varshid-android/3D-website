import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Send, Copy, Check, Download } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSectionHeaderAnimation } from '../../hooks/useScrollAnimations';

gsap.registerPlugin(ScrollTrigger);

export const Contact: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const headerRef = useSectionHeaderAnimation();
  const sectionRef = useRef<HTMLElement>(null);

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    // Create mailto link as direct action
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
      formData.subject || `Inquiry from ${formData.name}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoUrl;

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  // Scroll entrance animations
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Left column cards - stagger slide-in from left
      const leftCards = section.querySelectorAll('[data-contact="left-card"]');
      if (leftCards.length) {
        gsap.fromTo(
          leftCards,
          { opacity: 0, x: -35 },
          {
            opacity: 1, x: 0,
            duration: 0.7, stagger: 0.08, ease: 'power2.out',
            scrollTrigger: { trigger: leftCards[0], start: 'top 90%', toggleActions: 'play none none none' },
          }
        );
      }

      // Status card - special pop animation
      const statusCard = section.querySelector('[data-contact="status"]');
      if (statusCard) {
        gsap.fromTo(
          statusCard,
          { opacity: 0, scale: 0.95, y: 20 },
          {
            opacity: 1, scale: 1, y: 0,
            duration: 0.75, ease: 'back.out(1.2)',
            scrollTrigger: { trigger: statusCard, start: 'top 90%', toggleActions: 'play none none none' },
          }
        );
      }

      // Right form panel - slide-in from right
      const formPanel = section.querySelector('[data-contact="form"]');
      if (formPanel) {
        gsap.fromTo(
          formPanel,
          { opacity: 0, x: 40 },
          {
            opacity: 1, x: 0,
            duration: 0.8, delay: 0.1, ease: 'power2.out',
            scrollTrigger: { trigger: formPanel, start: 'top 88%', toggleActions: 'play none none none' },
          }
        );
      }

      // Form fields - stagger from bottom
      const formFields = section.querySelectorAll('[data-contact="field"]');
      if (formFields.length) {
        gsap.fromTo(
          formFields,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0,
            duration: 0.45, stagger: 0.06, delay: 0.2, ease: 'power2.out',
            scrollTrigger: { trigger: formFields[0], start: 'top 92%', toggleActions: 'play none none none' },
          }
        );
      }

      // Resume download - smooth reveal
      const resumeBtn = section.querySelector('[data-contact="resume"]');
      if (resumeBtn) {
        gsap.fromTo(
          resumeBtn,
          { opacity: 0, y: 15 },
          {
            opacity: 1, y: 0,
            duration: 0.6, delay: 0.3, ease: 'power2.out',
            scrollTrigger: { trigger: resumeBtn, start: 'top 92%', toggleActions: 'play none none none' },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="py-10 sm:py-12 lg:py-14 relative bg-transparent w-full max-w-full overflow-hidden">
      {/* Ambient background glow (warm flame atmosphere) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-accent/10 blur-3xl pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full min-w-0">
        
        {/* Section Header (Framer Style Big Impact) */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ee4405] shrink-0" />
            <span>Collaboration &amp; Inquiries</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
            Ready to build your <span className="font-serif italic font-normal text-white">next project?</span><br />
            Let's work together!
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Interested in scaling your mobile architecture, engineering a custom React Native platform, or integrating autonomous AI workflows? Let's connect.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start w-full min-w-0">
          
          {/* Left Column: Direct Contact Info Cards */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6 w-full min-w-0">
            
            {/* Status card */}
            <div data-contact="status" className="p-6 sm:p-7 rounded-3xl apple-glass space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>CURRENT AVAILABILITY</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white font-display">
                Open for Senior / Lead Roles &amp; High-Impact Contracts
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Available for full-time senior mobile software engineering positions, architecture consulting, and AI system design.
              </p>
            </div>

            {/* Email Card with Quick Copy */}
            <div data-contact="left-card" className="p-5 sm:p-6 rounded-3xl apple-glass flex items-center justify-between gap-3 group">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/10 text-white shrink-0">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] sm:text-xs font-mono text-slate-400">Direct Email</div>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-xs sm:text-sm font-semibold text-white hover:text-orange-400 transition-colors break-all"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>

              <button
                onClick={() => handleCopy(PERSONAL_INFO.email, 'email')}
                className="p-2.5 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white shrink-0 active:scale-95 transition-all"
                aria-label="Copy Email address"
              >
                {copiedField === 'email' ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Phone Card */}
            <div data-contact="left-card" className="p-5 sm:p-6 rounded-3xl apple-glass flex items-center justify-between gap-3 group">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/10 text-white shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] sm:text-xs font-mono text-slate-400">Phone &amp; WhatsApp</div>
                  <a
                    href={`tel:${PERSONAL_INFO.phone}`}
                    className="text-xs sm:text-sm font-semibold text-white hover:text-orange-400 transition-colors"
                  >
                    {PERSONAL_INFO.phone}
                  </a>
                </div>
              </div>

              <button
                onClick={() => handleCopy(PERSONAL_INFO.phone, 'phone')}
                className="p-2.5 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white shrink-0 active:scale-95 transition-all"
                aria-label="Copy Phone number"
              >
                {copiedField === 'phone' ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Location & Social Links */}
            <div data-contact="left-card" className="p-5 sm:p-6 rounded-3xl apple-glass space-y-4">
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/10 text-white shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-[11px] sm:text-xs font-mono text-slate-400">Location</div>
                  <div className="text-xs sm:text-sm font-semibold text-white">
                    {PERSONAL_INFO.location}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center gap-2.5 sm:gap-3">
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
                >
                  <Linkedin className="w-4 h-4 text-white shrink-0" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
                >
                  <Github className="w-4 h-4 text-white shrink-0" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>

            {/* Direct Resume Download */}
            <a
              data-contact="resume"
              href={PERSONAL_INFO.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full apple-glass-pill text-slate-200 hover:text-white font-semibold text-xs sm:text-sm transition-all group active:scale-95"
            >
              <Download className="w-4 h-4 text-white group-hover:-translate-y-0.5 transition-transform shrink-0" />
              <span>Download Official Resume PDF</span>
            </a>

          </div>

          {/* Right Column: Interactive Inquiry Form (Apple Glass Sheet) */}
          <div data-contact="form" className="lg:col-span-7 p-6 sm:p-9 rounded-3xl apple-glass-sheet relative w-full min-w-0 overflow-hidden">
            <h3 data-contact="field" className="text-xl sm:text-2xl font-bold text-white font-display mb-1.5 sm:mb-2" style={{ opacity: 0 }}>
              Send a Direct Message
            </h3>
            <p data-contact="field" className="text-xs sm:text-sm text-slate-400 mb-6" style={{ opacity: 0 }}>
              Got a project in mind or need an experienced mobile engineering lead? Send a message and let's discuss.
            </p>

            {submitted ? (
              <div className="p-8 text-center space-y-4 rounded-2xl bg-white/[0.04] border border-white/10 animate-in fade-in duration-300">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-white font-display">Opening Email Client...</h4>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                  Your message has been formatted and opened in your email client to dispatch directly to <strong className="text-white">{PERSONAL_INFO.email}</strong>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div data-contact="field" className="grid grid-cols-1 sm:grid-cols-2 gap-4" style={{ opacity: 0 }}>
                  <div className="space-y-1.5">
                    <label className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                      Your Name <span className="text-[#ee4405]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Kishan Patel"
                      className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-white/30 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                      Your Email <span className="text-[#ee4405]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@company.com"
                      className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-white/30 transition-all"
                    />
                  </div>
                </div>

                <div data-contact="field" className="space-y-1.5" style={{ opacity: 0 }}>
                  <label className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                    Subject / Project Context
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Senior Mobile Lead Role / React Native Project"
                    className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-white/30 transition-all"
                  />
                </div>

                <div data-contact="field" className="space-y-1.5" style={{ opacity: 0 }}>
                  <label className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                    Message <span className="text-[#ee4405]">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your project, timeline, or open engineering opportunity..."
                    className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-white/30 transition-all resize-y"
                  />
                </div>

                <button
                  data-contact="field"
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 sm:py-4 px-8 rounded-full font-semibold text-xs sm:text-sm text-slate-950 bg-white hover:bg-slate-200 shadow-md transition-all duration-200 active:scale-95 group"
                  style={{ opacity: 0 }}
                >
                  <span>Send Direct Message</span>
                  <Send className="w-4 h-4 text-slate-950 transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
