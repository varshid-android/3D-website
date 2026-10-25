import React, { useState } from 'react';
import { Calendar, MapPin, ChevronRight, CheckCircle2 } from 'lucide-react';
import { EXPERIENCES } from '../../data/portfolioData';

export const Experience: React.FC = () => {
  const [selectedExpId, setSelectedExpId] = useState<string>(EXPERIENCES[0].id);

  const activeExp = EXPERIENCES.find((exp) => exp.id === selectedExpId) || EXPERIENCES[0];

  return (
    <section id="experience" className="py-20 lg:py-28 relative bg-[#07090e]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 -left-32 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-accent/30 text-xs font-mono text-accent">
            <span>02 // Career Trajectory</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Work Experience &amp; <span className="text-gradient-accent">Leadership</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Over 6 years of progressive engineering excellence, driving client applications from POC to app-store dominance.
          </p>
        </div>

        {/* Experience Showcase Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Company List Tabs (Left) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 px-2 font-semibold">
              Select Organization
            </div>

            <div className="space-y-2">
              {EXPERIENCES.map((exp) => {
                const isSelected = exp.id === selectedExpId;
                return (
                  <button
                    key={exp.id}
                    onClick={() => setSelectedExpId(exp.id)}
                    className={`w-full text-left p-4 rounded-2xl transition-all duration-300 flex items-center justify-between border ${
                      isSelected
                        ? 'bg-surface/90 border-accent/40 shadow-[0_0_20px_rgba(0,245,212,0.15)] translate-x-1'
                        : 'glass-panel border-white/5 hover:border-white/20 hover:bg-surface/40'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-base font-bold font-display ${isSelected ? 'text-accent' : 'text-slate-200'}`}>
                          {exp.company}
                        </span>
                        {exp.current && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                            Present
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-400 font-medium">
                        {exp.role.split('/')[0]}
                      </div>
                      <div className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        <span>{exp.period}</span>
                      </div>
                    </div>

                    <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-accent translate-x-1' : 'text-slate-600'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Experience Detailed Panel (Right) */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 shadow-2xl relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                    {activeExp.role}
                  </h3>
                </div>
                <div className="text-accent font-semibold text-base flex items-center gap-2">
                  <span>{activeExp.company}</span>
                  {activeExp.parentCompany && (
                    <span className="text-xs font-normal text-slate-400">
                      ({activeExp.parentCompany})
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:items-end gap-1 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                  <Calendar className="w-3.5 h-3.5 text-accent" />
                  <span>{activeExp.period}</span>
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{activeExp.location}</span>
                </div>
              </div>
            </div>

            {/* Key Deliverables & Achievements */}
            <div className="py-6 space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                Key Responsibilities &amp; Impact
              </h4>
              <ul className="space-y-3.5">
                {activeExp.description.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-accent mt-1 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack Pills */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                Technologies &amp; Architecture Utilized
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeExp.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-xl text-xs font-mono font-medium bg-surface-card border border-white/10 text-slate-200 hover:border-accent/40 hover:text-accent transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
