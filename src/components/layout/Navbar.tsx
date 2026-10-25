import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Download, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Awards', href: '#awards' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#07090e]/85 backdrop-blur-md border-b border-white/10 py-3 shadow-lg shadow-black/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Identity */}
          <a
            href="#home"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Varshid Shekhat Home"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 via-surface to-accent/5 border border-accent/30 flex items-center justify-center font-display font-extrabold text-accent text-base tracking-wider transition-all duration-300 group-hover:scale-105 group-hover:border-accent group-hover:shadow-[0_0_15px_rgba(0,245,212,0.3)]">
              {PERSONAL_INFO.initials}
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-slate-100 text-base tracking-tight group-hover:text-accent transition-colors">
                {PERSONAL_INFO.name}
              </span>
              <span className="text-[11px] font-mono text-slate-400 tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Senior Mobile & AI Engineer
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full glass-panel border border-white/10">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-slate-900 bg-accent font-semibold shadow-[0_0_12px_rgba(0,245,212,0.4)]'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={PERSONAL_INFO.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-200 glass-panel border border-white/15 hover:border-accent/40 hover:text-accent transition-all duration-200 group"
            >
              <Download className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
              <span>Resume</span>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-accent via-cyan-300 to-sky-400 hover:opacity-95 shadow-[0_0_20px_rgba(0,245,212,0.35)] transition-all duration-200 hover:scale-[1.02]"
            >
              <Sparkles className="w-3.5 h-3.5 text-slate-950" />
              <span>Hire Me</span>
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={PERSONAL_INFO.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="p-2 rounded-lg glass-panel border border-white/15 text-accent text-xs flex items-center justify-center"
              aria-label="Download Resume"
            >
              <Download className="w-4 h-4" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg glass-panel border border-white/10 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-white/10 bg-[#07090e]/95 backdrop-blur-xl px-4 pt-3 pb-6 mt-3 space-y-2 animate-in fade-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-slate-950 bg-accent font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </a>
            );
          })}

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <a
              href={PERSONAL_INFO.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              download
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold glass-panel border border-white/15 text-slate-200"
            >
              <Download className="w-4 h-4 text-accent" />
              <span>Download Resume PDF</span>
            </a>

            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-950 bg-accent shadow-[0_0_15px_rgba(0,245,212,0.3)]"
            >
              <ArrowUpRight className="w-4 h-4" />
              <span>Contact / Hire Me</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
