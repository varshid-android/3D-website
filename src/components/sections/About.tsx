import React from 'react';
import { Smartphone, Cpu, ShieldCheck, GraduationCap, MapPin, Layers, Terminal } from 'lucide-react';
import { PERSONAL_INFO, EDUCATION } from '../../data/portfolioData';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-accent/30 text-xs font-mono text-accent">
            <span>01 // Professional Overview</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineering High-Performance Apps with <span className="text-gradient-accent">Precision</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Bridging native platform power with cross-platform velocity and next-generation intelligence.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Bento Card 1: Core Summary & Bio */}
          <div className="md:col-span-2 p-8 rounded-3xl glass-panel border border-white/10 hover:border-accent/30 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors pointer-events-none" />
            
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-accent/10 border border-accent/20 text-accent">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Full-Lifecycle Mobile Mastery</h3>
                <p className="text-xs font-mono text-slate-400">Proof-of-Concept to Global App Store Release</p>
              </div>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              {PERSONAL_INFO.summary}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>
                  <strong>Strict Quality Guardrails:</strong> Integrated SonarQube, Sentry telemetry, and Firebase Crashlytics to maintain 99.9% crash-free sessions.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <Layers className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Modular Ecosystems:</strong> Authoring reusable NPM UI components, standardizing state patterns with Zustand &amp; Redux across distributed codebases.
                </span>
              </div>
            </div>
          </div>

          {/* Bento Card 2: Location & Work Availability */}
          <div className="p-8 rounded-3xl glass-panel border border-white/10 hover:border-accent/30 transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="p-3 w-fit rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Base &amp; Reach</h3>
              <p className="text-sm text-slate-300">
                Based in <strong className="text-white">Ahmedabad, Gujarat, India</strong>. Experienced collaborating across global timezones (US, UK, Europe, Australia) with asynchronous precision.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Timezone</span>
                <span className="text-slate-200">IST (UTC +5:30)</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Working Style</span>
                <span className="text-accent">Agile / CI/CD Driven</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Status</span>
                <span className="text-emerald-400 font-semibold">Available for Lead Roles</span>
              </div>
            </div>
          </div>

          {/* Bento Card 3: Education & Foundation */}
          <div className="p-8 rounded-3xl glass-panel border border-white/10 hover:border-accent/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Academic Foundation</h3>
                <p className="text-xs font-mono text-slate-400">Computer Engineering</p>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="text-white font-semibold">{EDUCATION.degree}</div>
              <div className="text-accent text-xs font-mono">{EDUCATION.institution}</div>
              <div className="text-slate-400 text-xs">Graduated Class of {EDUCATION.year} • {EDUCATION.location}</div>
            </div>

            <p className="text-xs text-slate-400 mt-4 leading-relaxed">
              Solid foundation in computer science principles, algorithms, data structures, network protocols, and distributed systems architecture.
            </p>
          </div>

          {/* Bento Card 4: AI & Frontier Engineering */}
          <div className="p-8 rounded-3xl glass-panel border border-white/10 hover:border-accent/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-accent/10 border border-accent/20 text-accent">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">AI Engineering</h3>
                <p className="text-xs font-mono text-slate-400">RAG, MCP &amp; Multi-Agent Systems</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Pioneering practical AI integrations into client apps. Designing autonomous tool-using agents via Model Context Protocol (MCP), Agent-to-Agent (A2A) topologies, and high-speed FastAPI endpoints.
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/5 border border-white/10 text-slate-300">RAG</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/5 border border-white/10 text-slate-300">MCP</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/5 border border-white/10 text-slate-300">A2A</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/5 border border-white/10 text-slate-300">n8n</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/5 border border-white/10 text-slate-300">FastAPI</span>
            </div>
          </div>

          {/* Bento Card 5: Engineering Principles */}
          <div className="p-8 rounded-3xl glass-panel border border-white/10 hover:border-accent/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <Terminal className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Engineering Philosophy</h3>
                <p className="text-xs font-mono text-slate-400">Velocity without Compromise</p>
              </div>
            </div>

            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span>Zero-crash tolerance through automated telemetry</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                <span>Fluid 60fps animations &amp; minimal render cycles</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span>Strict type safety with modern TypeScript &amp; Python</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};
