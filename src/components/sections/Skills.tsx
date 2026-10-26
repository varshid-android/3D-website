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
        return <Smartphone className="w-5 h-5 text-accent" />;
      case 'Code2':
        return <Code2 className="w-5 h-5 text-sky-400" />;
      case 'Server':
        return <Server className="w-5 h-5 text-emerald-400" />;
      case 'Workflow':
        return <Workflow className="w-5 h-5 text-purple-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-pink-400" />;
      case 'Cloud':
        return <Cloud className="w-5 h-5 text-amber-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-accent" />;
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
    <section ref={sectionRef} id="skills" className="py-16 sm:py-20 lg:py-28 relative w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full min-w-0">
        
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-2.5 sm:space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-accent/30 text-xs font-mono text-accent">
            <span>03 // Core Competencies</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Technical Stack &amp; <span className="text-gradient-accent">Specializations</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-base leading-relaxed">
            Curated proficiency across modern mobile platforms, distributed backend microservices, and frontier AI architectures.
          </p>
        </div>

        {/* Filter Category Chips: horizontal scroll on mobile */}
        <div className="w-full max-w-full overflow-x-auto flex gap-2 mb-8 sm:mb-12 no-scrollbar sm:flex-wrap sm:justify-center pb-2 touch-pan-x">
          <button
            data-skill="chip"
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 shrink-0 whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-accent text-slate-950 shadow-[0_0_15px_rgba(0,245,212,0.3)]'
                : 'glass-panel border border-white/10 text-slate-400 hover:text-white hover:bg-white/5'
            }`}
            style={{ opacity: 0 }}
          >
            All Competencies
          </button>
          {SKILL_CATEGORIES.map((cat, idx) => (
            <button
              key={cat.title}
              data-skill="chip"
              onClick={() => setSelectedCategory(idx)}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-2 shrink-0 whitespace-nowrap ${
                selectedCategory === idx
                  ? 'bg-accent text-slate-950 shadow-[0_0_15px_rgba(0,245,212,0.3)]'
                  : 'glass-panel border border-white/10 text-slate-400 hover:text-white hover:bg-white/5'
              }`}
              style={{ opacity: 0 }}
            >
              <span>{cat.title.split('&')[0].trim()}</span>
            </button>
          ))}
        </div>

        {/* Skill Category Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 w-full min-w-0">
          {categoriesToDisplay.map((category) => (
            <div
              key={category.title}
              data-skill="card"
              className="p-5 sm:p-7 rounded-3xl glass-panel border border-white/10 hover:border-accent/30 transition-all duration-300 flex flex-col justify-between group w-full min-w-0"
              style={{ opacity: 0 }}
            >
              <div>
                <div className="flex items-center gap-3 mb-3.5 sm:mb-4">
                  <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 shrink-0">
                    {getIcon(category.iconName)}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white font-display truncate">
                    {category.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mb-5 sm:mb-6">
                  {category.description}
                </p>

                {/* Individual Skills with meters */}
                <div className="space-y-3.5 sm:space-y-4 w-full">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="space-y-1.5 w-full">
                      <div className="flex items-center justify-between text-xs">
                        <span className={`font-medium truncate ${skill.highlight ? 'text-white font-semibold' : 'text-slate-300'}`}>
                          {skill.name}
                        </span>
                        <span className="font-mono text-[11px] text-accent shrink-0 ml-2">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800/80 rounded-full overflow-hidden">
                        <div
                          data-skill-bar
                          data-skill-width={`${skill.level}%`}
                          className={`h-full rounded-full transition-all duration-700 ${
                            skill.highlight
                              ? 'bg-gradient-to-r from-accent to-sky-400 shadow-[0_0_8px_rgba(0,245,212,0.5)]'
                              : 'bg-slate-500'
                          }`}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer Badge */}
              <div className="mt-5 sm:mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-slate-500 w-full">
                <span>Production Verified</span>
                <span className="text-accent flex items-center gap-1 shrink-0">
                  <Check className="w-3 h-3 text-accent shrink-0" />
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
