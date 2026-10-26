import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Download } from 'lucide-react';
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

  // Prevent background scroll ONLY on Y-axis without wiping overflow-x: hidden
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = '';
    }
    return () => {
      document.body.style.overflowY = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Services', href: '#skills' },
    { label: 'Work', href: '#projects' },
    { label: 'Process', href: '#process' },
    { label: 'Awards', href: '#awards' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#010000]/80 backdrop-blur-xl border-b border-white/10 py-3 sm:py-3.5 shadow-2xl shadow-black/60'
          : 'bg-transparent py-4 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full min-w-0">
        <div className="flex items-center justify-between gap-4 w-full min-w-0">
          {/* Logo & Identity */}
          <a
            href="#home"
            className="flex items-center gap-2.5 group focus:outline-none min-w-0 shrink-0"
            aria-label="Varshid Shekhat Home"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-surface border border-white/10 flex items-center justify-center font-display font-extrabold text-white text-xs sm:text-sm tracking-wider transition-all duration-300 group-hover:border-white/30 shrink-0">
              <span>V</span><span className="text-[#ee4405]">S</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-display font-bold text-white text-sm sm:text-base tracking-tight transition-colors truncate">
                Varshid <span className="font-serif italic font-normal text-slate-300">Shekhat</span>
              </span>
              <span className="text-[10px] sm:text-[11px] text-slate-400 font-mono tracking-wider hidden sm:flex items-center gap-1.5 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                Senior Mobile &amp; AI Engineer
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links (Floating Glass Pill) */}
          <nav className="hidden md:flex items-center gap-1 px-4 py-1.5 rounded-full bg-surface/80 backdrop-blur-xl border border-white/10 shadow-inner">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-white bg-white/10 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Action CTAs (Desktop) */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <a
              href={PERSONAL_INFO.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium text-slate-300 bg-surface border border-white/10 hover:border-white/20 hover:text-white transition-all duration-200 group"
            >
              <Download className="w-3.5 h-3.5 text-slate-400 group-hover:text-white group-hover:-translate-y-0.5 transition-transform" />
              <span>Resume</span>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-[#ee4405] hover:bg-[#d93d04] shadow-sm transition-all duration-200 active:scale-95 group"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center gap-2 shrink-0">
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-[#ee4405] hover:bg-[#d93d04] shadow-sm"
            >
              <span>Talk</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full bg-surface border border-white/10 text-slate-300 hover:text-white active:scale-95 transition-all focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu & Overlay */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="relative z-50 md:hidden bg-surface/95 border border-white/10 backdrop-blur-2xl px-5 pt-4 pb-6 mx-4 mt-2 rounded-3xl shadow-2xl max-h-[calc(100vh-90px)] overflow-y-auto animate-in fade-in slide-in-from-top-3 duration-200">
            <div className="space-y-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-white bg-white/10 font-semibold'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>

            <div className="pt-4 mt-3 border-t border-white/10 flex flex-col gap-2.5">
              <a
                href={PERSONAL_INFO.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-slate-200 hover:border-white/20"
              >
                <Download className="w-4 h-4 text-slate-300" />
                <span>Download Resume PDF</span>
              </a>

              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold text-white bg-[#ee4405] hover:bg-[#d93d04] shadow-sm"
              >
                <span>Let's Talk Together</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
