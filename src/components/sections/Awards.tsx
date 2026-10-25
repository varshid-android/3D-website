import React from 'react';
import { Award, GraduationCap, Calendar, CheckCircle2 } from 'lucide-react';
import { AWARDS, EDUCATION } from '../../data/portfolioData';

export const Awards: React.FC = () => {
  return (
    <section id="awards" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-accent/30 text-xs font-mono text-accent">
            <span>05 // Recognition &amp; Honors</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Awards &amp; <span className="text-gradient-accent">Accreditation</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Recognitions for peer collaboration, engineering leadership, and keynote speaking on frontier technology.
          </p>
        </div>

        {/* Awards & Recognition Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {AWARDS.map((award) => (
            <div
              key={award.id}
              className="p-8 rounded-3xl glass-panel border border-white/10 hover:border-amber-400/40 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/10 transition-colors" />

              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="p-3.5 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400">
                  <Award className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-amber-400/10 border border-amber-400/25 text-amber-300">
                  {award.badgeText}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white font-display mb-1 group-hover:text-amber-300 transition-colors">
                {award.title}
              </h3>
              <div className="text-sm font-semibold text-slate-300 mb-2">
                {award.issuer}
              </div>
              <div className="text-xs font-mono text-slate-500 flex items-center gap-1.5 mb-4">
                <Calendar className="w-3.5 h-3.5" />
                <span>{award.date}</span>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {award.description}
              </p>
            </div>
          ))}
        </div>

        {/* Academic Degree Highlight Banner */}
        <div className="p-8 rounded-3xl glass-panel border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-accent/30 transition-all">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <GraduationCap className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-mono text-accent">Academic Degree</span>
              <h4 className="text-xl font-bold text-white font-display">{EDUCATION.degree}</h4>
              <p className="text-sm text-slate-400">{EDUCATION.institution} • Graduated {EDUCATION.year}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl">
            <CheckCircle2 className="w-4 h-4" />
            <span>Computer Engineering Graduate</span>
          </div>
        </div>

      </div>
    </section>
  );
};
