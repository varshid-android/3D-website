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
          { opacity: 0, x: -60, filter: 'blur(3px)' },
          {
            opacity: 1, x: 0, filter: 'blur(0px)',
            duration: 0.7, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: leftCards[0], start: 'top 88%', toggleActions: 'play none none none' },
          }
        );
      }

      // Status card - special pop animation
      const statusCard = section.querySelector('[data-contact="status"]');
      if (statusCard) {
        gsap.fromTo(
          statusCard,
          { opacity: 0, scale: 0.9, y: 30, filter: 'blur(5px)' },
          {
            opacity: 1, scale: 1, y: 0, filter: 'blur(0px)',
            duration: 0.9, ease: 'back.out(1.3)',
            scrollTrigger: { trigger: statusCard, start: 'top 88%', toggleActions: 'play none none none' },
          }
        );
      }

      // Right form panel - slide-in from right
      const formPanel = section.querySelector('[data-contact="form"]');
      if (formPanel) {
        gsap.fromTo(
          formPanel,
          { opacity: 0, x: 80, rotateY: -4, transformPerspective: 1200, filter: 'blur(4px)' },
          {
            opacity: 1, x: 0, rotateY: 0, filter: 'blur(0px)',
            duration: 1, delay: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: formPanel, start: 'top 85%', toggleActions: 'play none none none' },
          }
        );
      }

      // Form fields - stagger from bottom
      const formFields = section.querySelectorAll('[data-contact="field"]');
      if (formFields.length) {
        gsap.fromTo(
          formFields,
          { opacity: 0, y: 25 },
          {
            opacity: 1, y: 0,
            duration: 0.5, stagger: 0.08, delay: 0.4, ease: 'power2.out',
            scrollTrigger: { trigger: formFields[0], start: 'top 90%', toggleActions: 'play none none none' },
          }
        );
      }

      // Resume download - clip reveal
      const resumeBtn = section.querySelector('[data-contact="resume"]');
      if (resumeBtn) {
        gsap.fromTo(
          resumeBtn,
          { opacity: 0, y: 20, clipPath: 'inset(0 50% 0 50% round 16px)' },
          {
            opacity: 1, y: 0, clipPath: 'inset(0 0% 0 0% round 16px)',
            duration: 0.8, delay: 0.5, ease: 'power3.out',
            scrollTrigger: { trigger: resumeBtn, start: 'top 92%', toggleActions: 'play none none none' },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="py-16 sm:py-20 lg:py-28 relative bg-[#07090e] w-full max-w-full overflow-hidden">
      {/* Ambient background glow (strictly clipped) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 bg-accent/5 blur-3xl pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full min-w-0">
        
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-2.5 sm:space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-accent/30 text-xs font-mono text-accent">
            <span>06 // Let's Connect</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Start a Conversation or <span className="text-gradient-accent">Hire Me</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-base leading-relaxed">
            Interested in scaling your mobile architecture, building a custom React Native platform, or integrating autonomous AI workflows? Let's talk.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start w-full min-w-0">
          
          {/* Left Column: Direct Contact Info Cards */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6 w-full min-w-0">
            
            {/* Status card */}
            <div data-contact="status" className="p-5 sm:p-6 rounded-3xl glass-panel border border-accent/30 bg-gradient-to-br from-surface to-accent/5 space-y-2.5 sm:space-y-3" style={{ opacity: 0 }}>
              <div className="flex items-center gap-2 text-xs font-mono text-accent font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                <span>CURRENT AVAILABILITY</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white font-display">
                Open for Senior / Lead Roles &amp; High-Impact Contracts
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Available for full-time senior mobile software engineering positions, architecture consulting, and AI system design.
              </p>
            </div>

            {/* Email Card */}
            <div data-contact="left-card" className="p-4 sm:p-5 rounded-2xl glass-panel border border-white/10 flex items-center justify-between gap-3 group hover:border-accent/30 transition-all" style={{ opacity: 0 }}>
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2.5 sm:p-3 rounded-xl bg-accent/10 border border-accent/20 text-accent shrink-0">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] sm:text-xs font-mono text-slate-400">Direct Email</div>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-xs sm:text-sm font-semibold text-white hover:text-accent transition-colors break-all"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>

              <button
                onClick={() => handleCopy(PERSONAL_INFO.email, 'email')}
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white shrink-0 active:scale-95 transition-all"
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
            <div data-contact="left-card" className="p-4 sm:p-5 rounded-2xl glass-panel border border-white/10 flex items-center justify-between gap-3 group hover:border-sky-400/30 transition-all" style={{ opacity: 0 }}>
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2.5 sm:p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 shrink-0">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] sm:text-xs font-mono text-slate-400">Phone &amp; WhatsApp</div>
                  <a
                    href={`tel:${PERSONAL_INFO.phone}`}
                    className="text-xs sm:text-sm font-semibold text-white hover:text-sky-400 transition-colors"
                  >
                    {PERSONAL_INFO.phone}
                  </a>
                </div>
              </div>

              <button
                onClick={() => handleCopy(PERSONAL_INFO.phone, 'phone')}
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white shrink-0 active:scale-95 transition-all"
                aria-label="Copy Phone number"
              >
                {copiedField === 'phone' ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Location & Links */}
            <div data-contact="left-card" className="p-4 sm:p-5 rounded-2xl glass-panel border border-white/10 space-y-3 sm:space-y-4" style={{ opacity: 0 }}>
              <div className="flex items-center gap-3">
                <div className="p-2.5 sm:p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 shrink-0">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
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
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 active:scale-98 transition-all"
                >
                  <Linkedin className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 active:scale-98 transition-all"
                >
                  <Github className="w-4 h-4 text-slate-300 shrink-0" />
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
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl glass-panel border border-white/15 hover:border-accent/40 text-slate-200 hover:text-accent font-semibold text-xs sm:text-sm transition-all group active:scale-[0.98]"
              style={{ opacity: 0 }}
            >
              <Download className="w-4 h-4 text-accent group-hover:-translate-y-0.5 transition-transform shrink-0" />
              <span>Download Official Resume PDF</span>
            </a>

          </div>

          {/* Right Column: Interactive Inquiry Form */}
          <div data-contact="form" className="lg:col-span-7 p-5 sm:p-8 rounded-3xl glass-panel border border-white/10 shadow-2xl relative w-full min-w-0 overflow-hidden" style={{ opacity: 0 }}>
            <h3 data-contact="field" className="text-xl sm:text-2xl font-bold text-white font-display mb-1.5 sm:mb-2" style={{ opacity: 0 }}>
              Send a Direct Message
            </h3>
            <p data-contact="field" className="text-[11px] sm:text-xs font-mono text-slate-400 mb-5 sm:mb-6" style={{ opacity: 0 }}>
              Responses are typically delivered within 24 hours.
            </p>

            {submitted ? (
              <div className="p-6 sm:p-8 text-center space-y-3 sm:space-y-4 rounded-2xl bg-accent/10 border border-accent/30 animate-in fade-in duration-300">
                <div className="w-12 h-12 mx-auto rounded-full bg-accent/20 flex items-center justify-center text-accent">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-white font-display">Opening Email Client...</h4>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                  Your message has been formatted and opened in your email client to dispatch directly to <strong className="text-accent">{PERSONAL_INFO.email}</strong>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div data-contact="field" className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4" style={{ opacity: 0 }}>
                  <div className="space-y-1.5">
                    <label className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                      Your Name <span className="text-accent">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Kishan Patel"
                      className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-surface-card border border-white/10 text-white placeholder-slate-500 text-base sm:text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                      Your Email <span className="text-accent">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@company.com"
                      className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-surface-card border border-white/10 text-white placeholder-slate-500 text-base sm:text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
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
                    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-surface-card border border-white/10 text-white placeholder-slate-500 text-base sm:text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                  />
                </div>

                <div data-contact="field" className="space-y-1.5" style={{ opacity: 0 }}>
                  <label className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                    Message <span className="text-accent">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your project, timeline, or open engineering opportunity..."
                    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-surface-card border border-white/10 text-white placeholder-slate-500 text-base sm:text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-y"
                  />
                </div>

                <button
                  data-contact="field"
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 sm:py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-accent via-cyan-300 to-sky-400 hover:opacity-95 shadow-[0_0_20px_rgba(0,245,212,0.3)] transition-all duration-200 active:scale-[0.98]"
                  style={{ opacity: 0 }}
                >
                  <Send className="w-4 h-4 text-slate-950 shrink-0" />
                  <span>Send Direct Message</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
