import React, { useState, useEffect, useRef } from 'react';
import { Calendar, MapPin, ChevronRight, CheckCircle2 } from 'lucide-react';
import { EXPERIENCES } from '../../data/portfolioData';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSectionHeaderAnimation } from '../../hooks/useScrollAnimations';

gsap.registerPlugin(ScrollTrigger);

export const Experience: React.FC = () => {
  const [selectedExpId, setSelectedExpId] = useState<string>(EXPERIENCES[0].id);
  const headerRef = useSectionHeaderAnimation();
  const tabsRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const activeExp = EXPERIENCES.find((exp) => exp.id === selectedExpId) || EXPERIENCES[0];

  // Initial scroll entrance animations
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Company tabs - staggered slide-in from left
      const tabs = section.querySelectorAll('[data-exp="tab"]');
      if (tabs.length) {
        gsap.fromTo(
          tabs,
          { opacity: 0, x: -60, filter: 'blur(3px)' },
          {
            opacity: 1, x: 0, filter: 'blur(0px)',
            duration: 0.7, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: tabs[0], start: 'top 88%', toggleActions: 'play none none none' },
          }
        );
      }

      // Detail panel - slide-in from right with perspective
      const panel = section.querySelector('[data-exp="panel"]');
      if (panel) {
        gsap.fromTo(
          panel,
          { opacity: 0, x: 80, rotateY: -5, transformPerspective: 1200, filter: 'blur(4px)' },
          {
            opacity: 1, x: 0, rotateY: 0, filter: 'blur(0px)',
            duration: 1, delay: 0.2, ease: 'power3.out',
            scrollTrigger: { trigger: panel, start: 'top 85%', toggleActions: 'play none none none' },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  // Animate detail panel content transition when switching companies
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    // Quick content swap animation
    const tl = gsap.timeline();
    tl.fromTo(
      panel.children,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out' }
    );

    return () => { tl.kill(); };
  }, [selectedExpId]);

  return (
    <section ref={sectionRef} id="experience" className="py-16 sm:py-20 lg:py-28 relative bg-[#07090e] w-full max-w-full overflow-hidden">
      {/* Background ambient lighting (strictly clipped) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-72 sm:w-80 h-72 sm:h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full min-w-0">
        
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-2.5 sm:space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-accent/30 text-xs font-mono text-accent">
            <span>02 // Career Trajectory</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Work Experience &amp; <span className="text-gradient-accent">Leadership</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-base leading-relaxed">
            Over 6 years of progressive engineering excellence, driving client applications from POC to app-store dominance.
          </p>
        </div>

        {/* Experience Showcase Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start w-full min-w-0">
          
          {/* Company List Tabs */}
          <div ref={tabsRef} className="lg:col-span-4 space-y-2 sm:space-y-3 w-full min-w-0">
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-slate-400 px-1 font-semibold">
              <span>Organizations</span>
              <span className="lg:hidden text-[10px] text-accent">Swipe ➔</span>
            </div>

            <div className="w-full max-w-full overflow-x-auto flex lg:flex-col gap-2 pb-2 lg:pb-0 no-scrollbar touch-pan-x">
              {EXPERIENCES.map((exp) => {
                const isSelected = exp.id === selectedExpId;
                return (
                  <button
                    key={exp.id}
                    data-exp="tab"
                    onClick={() => setSelectedExpId(exp.id)}
                    className={`text-left p-3.5 sm:p-4 rounded-2xl transition-all duration-200 flex items-center justify-between border shrink-0 min-w-[200px] sm:min-w-[220px] lg:min-w-0 lg:w-full ${
                      isSelected
                        ? 'bg-surface/90 border-accent/40 shadow-[0_0_20px_rgba(0,245,212,0.15)] lg:translate-x-1'
                        : 'glass-panel border-white/5 hover:border-white/20 hover:bg-surface/40'
                    }`}
                    style={{ opacity: 0 }}
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm sm:text-base font-bold font-display truncate ${isSelected ? 'text-accent' : 'text-slate-200'}`}>
                          {exp.company}
                        </span>
                        {exp.current && (
                          <span className="px-1.5 py-0.5 rounded-full text-[9px] font-mono bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 shrink-0">
                            Present
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-400 font-medium truncate">
                        {exp.role.split('/')[0]}
                      </div>
                      <div className="text-[10px] sm:text-[11px] font-mono text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-500 shrink-0" />
                        <span>{exp.period}</span>
                      </div>
                    </div>

                    <ChevronRight className={`w-4 h-4 hidden lg:block transition-transform ${isSelected ? 'text-accent translate-x-1' : 'text-slate-600'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Experience Detailed Panel (Right) */}
          <div data-exp="panel" className="lg:col-span-8 p-5 sm:p-8 rounded-3xl glass-panel border border-white/10 shadow-2xl relative w-full min-w-0" style={{ opacity: 0 }}>
            <div ref={panelRef}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/10 w-full min-w-0">
                <div className="space-y-1 min-w-0">
                  <h3 className="text-lg sm:text-2xl font-bold text-white font-display truncate">
                    {activeExp.role}
                  </h3>
                  <div className="text-accent font-semibold text-sm sm:text-base flex flex-wrap items-center gap-1.5">
                    <span>{activeExp.company}</span>
                    {activeExp.parentCompany && (
                      <span className="text-xs font-normal text-slate-400">
                        ({activeExp.parentCompany})
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap sm:flex-col sm:items-end gap-1.5 text-xs font-mono text-slate-400 pt-1 sm:pt-0 shrink-0">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                    <Calendar className="w-3.5 h-3.5 text-accent shrink-0" />
                    <span>{activeExp.period}</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-[11px]">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>{activeExp.location}</span>
                  </div>
                </div>
              </div>

              {/* Key Deliverables & Achievements */}
              <div className="py-5 sm:py-6 space-y-3.5 w-full">
                <h4 className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                  Key Responsibilities &amp; Impact
                </h4>
                <ul className="space-y-3">
                  {activeExp.description.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-base text-slate-300 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 sm:mt-1 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack Pills */}
              <div className="pt-5 border-t border-white/10 space-y-2.5 w-full">
                <h4 className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                  Technologies &amp; Architecture Utilized
                </h4>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {activeExp.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 sm:px-3 py-1 rounded-xl text-[11px] sm:text-xs font-mono font-medium bg-surface-card border border-white/10 text-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
