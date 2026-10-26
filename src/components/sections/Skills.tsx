import React, { useState, useEffect, useRef } from 'react';
import { Smartphone, Code2, Server, Workflow, Cpu, Check, Sparkles, Cloud } from 'lucide-react';
import { SKILL_CATEGORIES } from '../../data/portfolioData';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSectionHeaderAnimation } from '../../hooks/useScrollAnimations';

gsap.registerPlugin(ScrollTrigger);

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | 'all'>('all');
  const headerRef = useSectionHeaderAnimation();
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-white" />;
      case 'Code2':
        return <Code2 className="w-5 h-5 text-white" />;
      case 'Server':
        return <Server className="w-5 h-5 text-white" />;
      case 'Workflow':
        return <Workflow className="w-5 h-5 text-white" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-white" />;
      case 'Cloud':
        return <Cloud className="w-5 h-5 text-white" />;
      default:
        return <Sparkles className="w-5 h-5 text-white" />;
    }
  };

  const categoriesToDisplay =
    selectedCategory === 'all'
      ? SKILL_CATEGORIES
      : [SKILL_CATEGORIES[selectedCategory as number]];

  // Scroll entrance animations
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Filter chips - stagger fade in
      const chips = section.querySelectorAll('[data-skill="chip"]');
      if (chips.length) {
        gsap.fromTo(
          chips,
          { opacity: 0, y: 20, scale: 0.9 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.5, stagger: 0.06, ease: 'back.out(1.3)',
            scrollTrigger: { trigger: chips[0], start: 'top 90%', toggleActions: 'play none none none' },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  // Animate cards when they mount/change
  useEffect(() => {
    const cards = cardsRef.current;
    if (!cards) return;

    const ctx = gsap.context(() => {
      const cardEls = cards.querySelectorAll('[data-skill="card"]');
      if (cardEls.length) {
        gsap.fromTo(
          cardEls,
          { opacity: 0, y: 50, scale: 0.92, filter: 'blur(4px)' },
          {
            opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
            duration: 0.7, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: cards, start: 'top 88%', toggleActions: 'play none none none' },
          }
        );
      }

      // Skill bars - animate width from 0
      const bars = cards.querySelectorAll('[data-skill-bar]');
      bars.forEach((bar) => {
        const targetWidth = (bar as HTMLElement).dataset.skillWidth || '0%';
        gsap.fromTo(
          bar,
          { width: '0%' },
          {
            width: targetWidth,
            duration: 1.2,
            delay: 0.3,
            ease: 'power2.out',
            scrollTrigger: { trigger: bar, start: 'top 92%', toggleActions: 'play none none none' },
          }
        );
      });
    }, cards);

    return () => ctx.revert();
  }, [selectedCategory]);

  return (
    <section ref={sectionRef} id="skills" className="py-10 sm:py-12 lg:py-14 relative w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full min-w-0">
        
        {/* Section Header (Framer Style) */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ee4405] shrink-0" />
            <span>Services &amp; Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            My <span className="font-serif italic font-normal text-white">services</span> &amp; specializations
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Helping brands engineer modern, high-performing mobile apps and autonomous AI workflows with production reliability.
          </p>
        </div>

        {/* Filter Category Chips: pill style */}
        <div className="w-full max-w-full overflow-x-auto flex gap-2 mb-6 sm:mb-8 no-scrollbar sm:flex-wrap sm:justify-center pb-1 touch-pan-x">
          <button
            data-skill="chip"
            onClick={() => setSelectedCategory('all')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 shrink-0 whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-white text-black shadow-xl shadow-white/10 font-bold'
                : 'bg-surface border border-white/10 text-slate-400 hover:text-white hover:bg-surface/80'
            }`}
            style={{ opacity: 0 }}
          >
            All Specializations
          </button>
          {SKILL_CATEGORIES.map((cat, idx) => (
            <button
              key={cat.title}
              data-skill="chip"
              onClick={() => setSelectedCategory(idx)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-2 shrink-0 whitespace-nowrap ${
                selectedCategory === idx
                  ? 'bg-white text-black shadow-xl shadow-white/10 font-bold'
                  : 'bg-surface border border-white/10 text-slate-400 hover:text-white hover:bg-surface/80'
              }`}
              style={{ opacity: 0 }}
            >
              <span>{cat.title.split('&')[0].trim()}</span>
            </button>
          ))}
        </div>

        {/* Skill Category Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 w-full min-w-0">
          {categoriesToDisplay.map((category) => (
            <div
              key={category.title}
              data-skill="card"
              className="p-6 sm:p-8 rounded-3xl bg-surface border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between group w-full min-w-0 relative overflow-hidden"
              style={{ opacity: 0 }}
            >
              <div>
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/10 text-white shrink-0">
                    {getIcon(category.iconName)}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white font-display truncate">
                    {category.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  {category.description}
                </p>

                {/* Individual Skills with meters */}
                <div className="space-y-4 w-full">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="space-y-1.5 w-full">
                      <div className="flex items-center justify-between text-xs">
                        <span className={`font-medium truncate ${skill.highlight ? 'text-white font-semibold' : 'text-slate-300'}`}>
                          {skill.name}
                        </span>
                        <span className="font-mono text-[11px] text-slate-400 shrink-0 ml-2 font-medium">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
                        <div
                          data-skill-bar
                          data-skill-width={`${skill.level}%`}
                          className={`h-full rounded-full transition-all duration-700 ${
                            skill.highlight
                              ? 'bg-gradient-to-r from-orange-500 to-[#ee4405]'
                              : 'bg-white/20'
                          }`}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer Badge */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-slate-500 w-full">
                <span>Production Verified</span>
                <span className="text-slate-300 flex items-center gap-1 shrink-0 font-medium">
                  <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                  Enterprise Ready
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
