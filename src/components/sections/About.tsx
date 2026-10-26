import React, { useEffect, useRef } from 'react';
import { Smartphone, Cpu, ShieldCheck, GraduationCap, MapPin, Layers, Terminal } from 'lucide-react';
import { PERSONAL_INFO, EDUCATION } from '../../data/portfolioData';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSectionHeaderAnimation } from '../../hooks/useScrollAnimations';

gsap.registerPlugin(ScrollTrigger);

export const About: React.FC = () => {
  const headerRef = useSectionHeaderAnimation();
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const ctx = gsap.context(() => {
      // Bio card (large) - slide in from left cleanly
      const bioCard = grid.querySelector('[data-about="bio"]');
      if (bioCard) {
        gsap.fromTo(
          bioCard,
          { opacity: 0, x: -50 },
          {
            opacity: 1, x: 0,
            duration: 0.85, ease: 'power2.out',
            scrollTrigger: { trigger: bioCard, start: 'top 88%', toggleActions: 'play none none none' },
          }
        );
      }

      // Location card - fade up with delay
      const locationCard = grid.querySelector('[data-about="location"]');
      if (locationCard) {
        gsap.fromTo(
          locationCard,
          { opacity: 0, y: 35, scale: 0.96 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.8, delay: 0.1, ease: 'power2.out',
            scrollTrigger: { trigger: locationCard, start: 'top 88%', toggleActions: 'play none none none' },
          }
        );
      }

      // Bento cards row 2 - staggered scale-in from bottom
      const smallCards = grid.querySelectorAll('[data-about="card"]');
      if (smallCards.length) {
        gsap.fromTo(
          smallCards,
          { opacity: 0, y: 35, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.75, stagger: 0.08, ease: 'power2.out',
            scrollTrigger: { trigger: smallCards[0], start: 'top 90%', toggleActions: 'play none none none' },
          }
        );
      }

      // Profile image hover parallax on scroll
      const profileImg = grid.querySelector('[data-about="profile-img"]');
      if (profileImg) {
        gsap.to(profileImg, {
          scrollTrigger: {
            trigger: grid,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1.5,
          },
          y: -15,
          scale: 1.05,
          ease: 'none',
        });
      }

      // Stat rows within bio card - line-by-line reveal
      const statRows = grid.querySelectorAll('[data-about="stat-row"]');
      if (statRows.length) {
        gsap.fromTo(
          statRows,
          { opacity: 0, x: -30 },
          {
            opacity: 1, x: 0,
            duration: 0.6, stagger: 0.08, ease: 'power2.out',
            scrollTrigger: { trigger: statRows[0], start: 'top 90%', toggleActions: 'play none none none' },
          }
        );
      }
    }, grid);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="py-10 sm:py-12 lg:py-14 relative w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full min-w-0">
        
        {/* Section Header (Framer Style) */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ee4405] shrink-0" />
            <span>About Me</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            Bridging native platform power with <span className="font-serif italic font-normal text-white">seamless execution</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Combining 6+ years of rigorous React Native engineering, custom native iOS &amp; Android bridges, and frontier AI workflows to build products that stand out.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 w-full min-w-0">
          
          {/* Bento Card 1: Core Summary & Bio */}
          <div data-about="bio" className="md:col-span-2 p-6 sm:p-8 rounded-3xl apple-glass relative overflow-hidden group w-full min-w-0">
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-5 sm:mb-6">
              <div data-about="profile-img" className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-white/15 shadow-xl shadow-black/60 shrink-0 group">
                <img
                  src="/varshid-shekhat.jpg"
                  alt="Varshid Shekhat"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded text-[10px] font-mono bg-black/80 border border-white/10 text-white font-bold">
                  Varshid
                </span>
              </div>
              
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 sm:p-2 rounded-xl bg-white/[0.05] border border-white/10 text-white shrink-0">
                    <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-mono text-slate-400 font-semibold tracking-wider uppercase">Senior Mobile &amp; AI Engineer</span>
                </div>
                <h3 className="text-lg sm:text-2xl font-bold text-white font-display">Full-Lifecycle Mobile Mastery</h3>
                <p className="text-xs font-mono text-slate-400">Proof-of-Concept to Global App Store Release</p>
              </div>
            </div>

            <p className="text-slate-300 text-xs sm:text-base leading-relaxed mb-5 sm:mb-6">
              {PERSONAL_INFO.summary}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 pt-4 border-t border-white/10 text-xs text-slate-300">
              <div data-about="stat-row" className="flex items-start gap-2.5" style={{ opacity: 0 }}>
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Strict Quality Guardrails:</strong> Integrated SonarQube, Sentry telemetry, and Firebase Crashlytics to maintain 99.9% crash-free sessions.
                </span>
              </div>
              <div data-about="stat-row" className="flex items-start gap-2.5" style={{ opacity: 0 }}>
                <Layers className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Modular Ecosystems:</strong> Authoring reusable NPM UI components, standardizing state patterns with Zustand &amp; Redux across distributed codebases.
                </span>
              </div>
            </div>
          </div>

          {/* Bento Card 2: Location & Work Availability */}
          <div data-about="location" className="p-6 sm:p-8 rounded-3xl apple-glass flex flex-col justify-between">
            <div className="space-y-4">
              <div className="p-3 w-fit rounded-2xl bg-white/[0.05] border border-white/10 text-white">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white">Base &amp; Global Reach</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Based in <strong className="text-white">Ahmedabad, Gujarat, India</strong>. Experienced collaborating across global timezones (US, UK, Europe, Australia) with asynchronous precision.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Timezone</span>
                <span className="text-slate-200">IST (UTC +5:30)</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Working Style</span>
                <span className="text-white font-semibold">Agile / CI/CD Driven</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Status</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Available for Senior Roles
                </span>
              </div>
            </div>
          </div>

          {/* Bento Card 3: Education & Foundation */}
          <div data-about="card" className="p-6 sm:p-8 rounded-3xl apple-glass">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 sm:p-3 rounded-2xl bg-white/[0.05] border border-white/10 text-white shrink-0">
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">Academic Foundation</h3>
                <p className="text-xs font-mono text-slate-400">Computer Engineering</p>
              </div>
            </div>

            <div className="space-y-1.5 text-xs sm:text-sm">
              <div className="text-white font-semibold">{EDUCATION.degree}</div>
              <div className="text-slate-300 text-xs font-mono">{EDUCATION.institution}</div>
              <div className="text-slate-400 text-xs">Graduated Class of {EDUCATION.year} • {EDUCATION.location}</div>
            </div>

            <p className="text-xs text-slate-400 mt-4 leading-relaxed">
              Solid foundation in computer science principles, algorithms, data structures, network protocols, and distributed systems architecture.
            </p>
          </div>

          {/* Bento Card 4: AI & Frontier Engineering */}
          <div data-about="card" className="p-6 sm:p-8 rounded-3xl apple-glass">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 sm:p-3 rounded-2xl bg-white/[0.05] border border-white/10 text-white shrink-0">
                <Cpu className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">AI Engineering</h3>
                <p className="text-xs font-mono text-slate-400">RAG, MCP &amp; Multi-Agent Systems</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Pioneering practical AI integrations into client apps. Designing autonomous tool-using agents via Model Context Protocol (MCP), Agent-to-Agent (A2A) topologies, and high-speed FastAPI endpoints.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono bg-white/5 border border-white/10 text-slate-300">RAG</span>
              <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono bg-white/5 border border-white/10 text-slate-300">MCP</span>
              <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono bg-white/5 border border-white/10 text-slate-300">A2A</span>
              <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono bg-white/5 border border-white/10 text-slate-300">n8n</span>
              <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono bg-white/5 border border-white/10 text-slate-300">FastAPI</span>
            </div>
          </div>

          {/* Bento Card 5: Engineering Principles */}
          <div data-about="card" className="p-6 sm:p-8 rounded-3xl apple-glass">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 sm:p-3 rounded-2xl bg-white/[0.05] border border-white/10 text-white shrink-0">
                <Terminal className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">Engineering Philosophy</h3>
                <p className="text-xs font-mono text-slate-400">Velocity without Compromise</p>
              </div>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" />
                <span>Zero-crash tolerance through automated telemetry</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" />
                <span>Fluid 60fps animations &amp; minimal render cycles</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" />
                <span>Strict type safety with modern TypeScript &amp; Python</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};
