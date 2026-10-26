import React, { useEffect, useRef } from 'react';
import { Mail, Phone, Linkedin, Github, ArrowUp, Heart } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      // Footer columns stagger up
      const columns = footer.querySelectorAll('[data-footer="col"]');
      if (columns.length) {
        gsap.fromTo(
          columns,
          { opacity: 0, y: 40, filter: 'blur(3px)' },
          {
            opacity: 1, y: 0, filter: 'blur(0px)',
            duration: 0.7, stagger: 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: footer, start: 'top 90%', toggleActions: 'play none none none' },
          }
        );
      }

      // Bottom bar slide up
      const bottomBar = footer.querySelector('[data-footer="bottom"]');
      if (bottomBar) {
        gsap.fromTo(
          bottomBar,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0,
            duration: 0.6, delay: 0.4, ease: 'power2.out',
            scrollTrigger: { trigger: bottomBar, start: 'top 95%', toggleActions: 'play none none none' },
          }
        );
      }
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative border-t border-white/10 bg-[#06080d] w-full max-w-full overflow-hidden">
      {/* Ambient background glow (strictly clipped) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-40 bg-accent/5 blur-3xl pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16 relative z-10 w-full min-w-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 pb-10 sm:pb-12 border-b border-white/10 w-full min-w-0">
          {/* Identity & Tagline */}
          <div data-footer="col" className="sm:col-span-2 space-y-3.5" style={{ opacity: 0 }}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center font-display font-extrabold text-accent text-sm shrink-0">
                {PERSONAL_INFO.initials}
              </div>
              <span className="font-display font-bold text-slate-100 text-base sm:text-lg">
                {PERSONAL_INFO.name}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
              Senior React Native &amp; Mobile Software Engineer specializing in scalable cross-platform architecture, native bridges, and frontier AI workflows.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] sm:text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span>Available for high-impact roles &amp; technical consulting</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div data-footer="col" className="space-y-3" style={{ opacity: 0 }}>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#about" className="text-slate-400 hover:text-accent transition-colors">
                  About Me
                </a>
              </li>
              <li>
                <a href="#experience" className="text-slate-400 hover:text-accent transition-colors">
                  Career Experience
                </a>
              </li>
              <li>
                <a href="#skills" className="text-slate-400 hover:text-accent transition-colors">
                  Technical Stack
                </a>
              </li>
              <li>
                <a href="#projects" className="text-slate-400 hover:text-accent transition-colors">
                  Featured Projects
                </a>
              </li>
              <li>
                <a href="#awards" className="text-slate-400 hover:text-accent transition-colors">
                  Awards &amp; Honors
                </a>
              </li>
              <li>
                <a href="#contact" className="text-slate-400 hover:text-accent transition-colors">
                  Get in Touch
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Social & Connect */}
          <div data-footer="col" className="space-y-3" style={{ opacity: 0 }}>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Connect
            </h4>
            <div className="flex flex-col gap-2.5 text-xs sm:text-sm">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-2 text-slate-400 hover:text-accent transition-colors group min-w-0"
              >
                <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 group-hover:border-accent/40 group-hover:bg-accent/10 shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span className="break-all">{PERSONAL_INFO.email}</span>
              </a>

              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                className="flex items-center gap-2 text-slate-400 hover:text-accent transition-colors group"
              >
                <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 group-hover:border-accent/40 group-hover:bg-accent/10 shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>{PERSONAL_INFO.phone}</span>
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-400 hover:text-accent transition-colors group"
              >
                <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 group-hover:border-accent/40 group-hover:bg-accent/10 shrink-0">
                  <Linkedin className="w-3.5 h-3.5" />
                </div>
                <span>LinkedIn Profile</span>
              </a>

              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-400 hover:text-accent transition-colors group"
              >
                <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 group-hover:border-accent/40 group-hover:bg-accent/10 shrink-0">
                  <Github className="w-3.5 h-3.5" />
                </div>
                <span>GitHub Repositories</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Copyright */}
        <div data-footer="bottom" className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left" style={{ opacity: 0 }}>
          <p className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} {PERSONAL_INFO.name}. Crafted with</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" />
            <span>in Ahmedabad, India.</span>
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-panel border border-white/10 text-slate-400 hover:text-accent hover:border-accent/30 transition-all group"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};
