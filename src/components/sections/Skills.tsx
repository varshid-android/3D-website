import React, { useState } from 'react';
import { Smartphone, Code2, Server, Workflow, Cpu, Check, Sparkles } from 'lucide-react';
import { SKILL_CATEGORIES } from '../../data/portfolioData';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | 'all'>('all');

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
      default:
        return <Sparkles className="w-5 h-5 text-accent" />;
    }
  };

  const categoriesToDisplay =
    selectedCategory === 'all'
      ? SKILL_CATEGORIES
      : [SKILL_CATEGORIES[selectedCategory as number]];

  return (
    <section id="skills" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-accent/30 text-xs font-mono text-accent">
            <span>03 // Core Competencies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Technical Stack &amp; <span className="text-gradient-accent">Specializations</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Curated proficiency across modern mobile platforms, distributed backend microservices, and frontier AI architectures.
          </p>
        </div>

        {/* Filter Category Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
              selectedCategory === 'all'
                ? 'bg-accent text-slate-950 shadow-[0_0_15px_rgba(0,245,212,0.3)]'
                : 'glass-panel border border-white/10 text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            All Competencies
          </button>
          {SKILL_CATEGORIES.map((cat, idx) => (
            <button
              key={cat.title}
              onClick={() => setSelectedCategory(idx)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-2 ${
                selectedCategory === idx
                  ? 'bg-accent text-slate-950 shadow-[0_0_15px_rgba(0,245,212,0.3)]'
                  : 'glass-panel border border-white/10 text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{cat.title.split('&')[0].trim()}</span>
            </button>
          ))}
        </div>

        {/* Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoriesToDisplay.map((category) => (
            <div
              key={category.title}
              className="p-6 sm:p-7 rounded-3xl glass-panel border border-white/10 hover:border-accent/30 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10">
                    {getIcon(category.iconName)}
                  </div>
                  <h3 className="text-lg font-bold text-white font-display">
                    {category.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  {category.description}
                </p>

                {/* Individual Skills with meters */}
                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className={`font-medium ${skill.highlight ? 'text-white font-semibold' : 'text-slate-300'}`}>
                          {skill.name}
                        </span>
                        <span className="font-mono text-[11px] text-accent">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800/80 rounded-full overflow-hidden">
                        <div
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
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Production Verified</span>
                <span className="text-accent flex items-center gap-1">
                  <Check className="w-3 h-3 text-accent" />
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
