import React from 'react';
import { Mail, Phone, Linkedin, Github, ArrowUp, Heart } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#06080d] overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-40 bg-accent/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 pb-12 border-b border-white/10">
          {/* Identity & Tagline */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center font-display font-extrabold text-accent text-sm">
                {PERSONAL_INFO.initials}
              </div>
              <span className="font-display font-bold text-slate-100 text-lg">
                {PERSONAL_INFO.name}
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Senior React Native & Mobile Software Engineer specializing in scalable cross-platform architecture, native bridges, and frontier AI workflows.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for high-impact roles & technical consulting</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
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
                  Awards & Honors
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
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Connect
            </h4>
            <div className="flex flex-col gap-2.5 text-sm">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-2 text-slate-400 hover:text-accent transition-colors group"
              >
                <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 group-hover:border-accent/40 group-hover:bg-accent/10">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span className="truncate">{PERSONAL_INFO.email}</span>
              </a>

              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                className="flex items-center gap-2 text-slate-400 hover:text-accent transition-colors group"
              >
                <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 group-hover:border-accent/40 group-hover:bg-accent/10">
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
                <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 group-hover:border-accent/40 group-hover:bg-accent/10">
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
                <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 group-hover:border-accent/40 group-hover:bg-accent/10">
                  <Github className="w-3.5 h-3.5" />
                </div>
                <span>GitHub Repositories</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} {PERSONAL_INFO.name}. Crafted with</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
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
