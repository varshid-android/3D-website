import React, { useEffect, useRef } from 'react';
import { Award, GraduationCap, Calendar, CheckCircle2 } from 'lucide-react';
import { AWARDS, EDUCATION } from '../../data/portfolioData';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSectionHeaderAnimation } from '../../hooks/useScrollAnimations';

gsap.registerPlugin(ScrollTrigger);

export const Awards: React.FC = () => {
  const headerRef = useSectionHeaderAnimation();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Award cards - alternating left/right slide-in
      const cards = section.querySelectorAll('[data-award="card"]');
      cards.forEach((card, idx) => {
        const fromX = idx % 2 === 0 ? -80 : 80;
        gsap.fromTo(
          card,
          { opacity: 0, x: fromX, rotateY: idx % 2 === 0 ? 6 : -6, transformPerspective: 1000, filter: 'blur(4px)' },
          {
            opacity: 1, x: 0, rotateY: 0, filter: 'blur(0px)',
            duration: 0.9, delay: idx * 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' },
          }
        );
      });

      // Award icons - pop-in with scale bounce
      const icons = section.querySelectorAll('[data-award="icon"]');
      icons.forEach((icon, idx) => {
        gsap.fromTo(
          icon,
          { scale: 0, rotation: -30 },
          {
            scale: 1, rotation: 0,
            duration: 0.6, delay: 0.3 + idx * 0.15, ease: 'back.out(2)',
            scrollTrigger: { trigger: icon, start: 'top 90%', toggleActions: 'play none none none' },
          }
        );
      });

      // Education banner - slide up with clip reveal
      const eduBanner = section.querySelector('[data-award="edu"]');
      if (eduBanner) {
        gsap.fromTo(
          eduBanner,
          { opacity: 0, y: 50, clipPath: 'inset(10% 5% 10% 5% round 24px)', filter: 'blur(4px)' },
          {
            opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0% round 24px)', filter: 'blur(0px)',
            duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: eduBanner, start: 'top 88%', toggleActions: 'play none none none' },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="awards" className="py-16 sm:py-20 lg:py-28 relative w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full min-w-0">
        
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-2.5 sm:space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-accent/30 text-xs font-mono text-accent">
            <span>05 // Recognition &amp; Honors</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Awards &amp; <span className="text-gradient-accent">Accreditation</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-base leading-relaxed">
            Recognitions for peer collaboration, engineering leadership, and keynote speaking on frontier technology.
          </p>
        </div>

        {/* Awards & Recognition Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 mb-8 sm:mb-12 w-full min-w-0">
          {AWARDS.map((award) => (
            <div
              key={award.id}
              data-award="card"
              className="p-5 sm:p-8 rounded-3xl glass-panel border border-white/10 hover:border-amber-400/40 transition-all duration-300 relative overflow-hidden group w-full min-w-0"
              style={{ opacity: 0 }}
            >
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl">
                <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl group-hover:bg-amber-500/10 transition-colors" />
              </div>

              <div className="flex items-center justify-between gap-3 mb-4 sm:mb-6">
                <div data-award="icon" className="p-3 sm:p-3.5 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400 shrink-0" style={{ transform: 'scale(0)' }}>
                  <Award className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono font-semibold bg-amber-400/10 border border-amber-400/25 text-amber-300 shrink-0">
                  {award.badgeText}
                </span>
              </div>

              <h3 className="text-lg sm:text-2xl font-bold text-white font-display mb-1 group-hover:text-amber-300 transition-colors">
                {award.title}
              </h3>
              <div className="text-xs sm:text-sm font-semibold text-slate-300 mb-1.5 sm:mb-2">
                {award.issuer}
              </div>
              <div className="text-[11px] sm:text-xs font-mono text-slate-500 flex items-center gap-1.5 mb-3 sm:mb-4">
                <Calendar className="w-3.5 h-3.5 shrink-0" />
                <span>{award.date}</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {award.description}
              </p>
            </div>
          ))}
        </div>

        {/* Academic Degree Highlight Banner */}
        <div data-award="edu" className="p-5 sm:p-8 rounded-3xl glass-panel border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 hover:border-accent/30 transition-all w-full min-w-0" style={{ opacity: 0 }}>
          <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 min-w-0">
            <div className="p-3 sm:p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 shrink-0">
              <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div className="space-y-0.5 min-w-0">
              <span className="text-[11px] sm:text-xs font-mono text-accent">Academic Degree</span>
              <h4 className="text-base sm:text-xl font-bold text-white font-display truncate">{EDUCATION.degree}</h4>
              <p className="text-xs sm:text-sm text-slate-400 truncate">{EDUCATION.institution} • Graduated {EDUCATION.year}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-2 rounded-xl shrink-0 w-full sm:w-auto justify-center">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Computer Engineering Graduate</span>
          </div>
        </div>

      </div>
    </section>
  );
};
