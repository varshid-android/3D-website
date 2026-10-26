import React, { useState } from 'react';
import { Download, ArrowUpRight, MapPin, CheckCircle2, ShieldCheck, Terminal, Box, UserCheck } from 'lucide-react';
import { PERSONAL_INFO, STATS } from '../../data/portfolioData';
import { HeroScene } from '../three/HeroScene';
import { useHeroAnimations } from '../../hooks/useScrollAnimations';

export const Hero: React.FC = () => {
  const heroRef = useHeroAnimations();
  const [viewMode, setViewMode] = useState<'portrait' | '3d'>('portrait');

  return (
    <section ref={heroRef} id="home" className="relative w-full max-w-full overflow-hidden pt-24 pb-8 sm:pt-28 sm:pb-10 lg:pt-32 lg:pb-12">
      {/* Background warm radial ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" data-hero="bg-glow">
        <div className="absolute top-0 right-1/4 w-[500px] sm:w-[700px] h-[500px] sm:h-[600px] bg-gradient-radial from-accent/15 via-orange-600/5 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-10 w-72 sm:w-96 h-72 sm:h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full min-w-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center w-full min-w-0">
          
          {/* Left Column: Core Message & Introduction */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7 text-left w-full min-w-0">
            {/* Status Pill Tag */}
            <div data-hero="pill" className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300 shadow-sm max-w-full" style={{ opacity: 0 }}>
              <span className="w-2 h-2 rounded-full bg-[#ee4405] animate-pulse shrink-0" />
              <span className="text-white font-medium">✦ Mobile Architect &amp; AI Engineer</span>
              <span className="text-slate-600 hidden xs:inline">•</span>
              <span className="text-slate-400 hidden xs:flex items-center gap-1 shrink-0">
                <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                Ahmedabad, India
              </span>
            </div>

            {/* Main Editorial Headline */}
            <div className="space-y-4 w-full">
              <h1 data-hero="title" className="text-4xl xs:text-5xl sm:text-6xl lg:text-[68px] font-bold tracking-tight text-white leading-[1.08] break-words" style={{ opacity: 0 }}>
                Hi, I'm Varshid.<br />
                Building High-Performance<br />
                <span className="font-serif italic font-normal text-white">Mobile &amp; AI Systems</span>
              </h1>
              <p data-hero="subtitle" className="text-base sm:text-xl font-normal text-slate-300 leading-relaxed max-w-2xl" style={{ opacity: 0 }}>
                Senior Mobile Software Engineer &amp; AI Solutions Engineer with <span className="text-white font-semibold">6+ years</span> delivering enterprise React Native ecosystems, native iOS/Android bridges, and autonomous AI workflows.
              </p>
            </div>

            {/* Quick summary snippet */}
            <p data-hero="summary" className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xl" style={{ opacity: 0 }}>
              Specialized in guiding mission-critical client products from concept through global store launches, real-time SignalR architectures, automated Azure DevOps CI/CD pipelines, and frontier AI tools (RAG, MCP &amp; multi-agent systems).
            </p>

            {/* Action CTA Buttons */}
            <div data-hero="cta" className="flex flex-wrap items-center gap-3 pt-2 w-full">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-full font-semibold text-xs sm:text-sm text-slate-950 bg-white hover:bg-slate-200 transition-all duration-200 shadow-xl shadow-white/10 active:scale-95 group"
                style={{ opacity: 0 }}
              >
                <span>Let's Build Together</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-xs sm:text-sm text-white bg-surface border border-white/10 hover:border-white/20 hover:bg-surface/80 transition-all duration-200 active:scale-95"
                style={{ opacity: 0 }}
              >
                <span>Explore Projects</span>
              </a>

              <a
                href={PERSONAL_INFO.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full font-medium text-xs sm:text-sm text-slate-400 hover:text-white transition-colors"
                style={{ opacity: 0 }}
              >
                <Download className="w-4 h-4 text-slate-300" />
                <span>Download Resume</span>
              </a>
            </div>

            {/* Key Quality Pillars */}
            <div data-hero="pillars" className="pt-2 flex flex-wrap items-center gap-3 sm:gap-5 text-[11px] sm:text-xs font-mono text-slate-400">
              <div className="flex items-center gap-1.5" style={{ opacity: 0 }}>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>React Native &amp; Native Bridges</span>
              </div>
              <div className="flex items-center gap-1.5" style={{ opacity: 0 }}>
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Azure DevOps CI/CD</span>
              </div>
              <div className="flex items-center gap-1.5" style={{ opacity: 0 }}>
                <Terminal className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>FastAPI &amp; Agentic AI</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual (Portrait Card with 3D Toggle) */}
          <div data-hero="canvas" className="lg:col-span-5 relative flex items-center justify-center w-full min-w-0" style={{ opacity: 0 }}>
            <div className="w-full max-w-[480px] lg:max-w-none relative rounded-3xl bg-surface border border-white/10 p-3 overflow-hidden shadow-2xl shadow-black/80 group">
              
              {/* Warm Amber-Orange Ambient Corner Glow */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-accent/20 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-orange-600/15 rounded-full blur-2xl pointer-events-none" />

              {/* View Switcher Pill (Top Right) */}
              <div className="absolute top-5 right-5 z-20 flex items-center gap-1 p-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10">
                <button
                  type="button"
                  onClick={() => setViewMode('portrait')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium transition-all ${
                    viewMode === 'portrait'
                      ? 'bg-white text-slate-950 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <UserCheck className="w-3 h-3" />
                  <span>Portrait</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('3d')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium transition-all ${
                    viewMode === '3d'
                      ? 'bg-white text-slate-950 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Box className="w-3 h-3" />
                  <span>Interactive 3D</span>
                </button>
              </div>

              {/* Card Main Stage */}
              <div className="relative w-full h-[400px] sm:h-[480px] lg:h-[530px] rounded-2xl overflow-hidden bg-[#090a0d]">
                {viewMode === 'portrait' ? (
                  <div className="relative w-full h-full flex flex-col justify-end">
                    {/* User portrait */}
                    <img
                      src="/varshid-shekhat.jpg"
                      alt="Varshid Shekhat - Senior React Native & AI Solutions Engineer"
                      className="absolute inset-0 w-full h-full object-cover object-top filter brightness-[0.95] contrast-[1.02] transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                    
                    {/* Subtle gradient vignette to blend with dark card */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#131516] via-transparent to-black/30 pointer-events-none" />
                    
                    {/* Floating Bottom Card Label */}
                    <div className="relative z-10 p-5 bg-[#131516]/90 backdrop-blur-md border-t border-white/10 m-3 rounded-2xl flex items-center justify-between">
                      <div>
                        <div className="text-white font-bold text-sm tracking-tight">
                          Varshid Shekhat
                        </div>
                        <div className="text-xs text-slate-400 font-mono">
                          MobMaxime • Senior Engineer
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-slate-200 text-xs font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        <span>6+ Yrs Exp</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full relative">
                    <HeroScene />
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>

        {/* Highlight Metrics Banner (Framer Style Big Number Cards) */}
        <div data-hero="stats" className="mt-8 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full min-w-0">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-3xl bg-surface border border-white/10 hover:border-white/20 hover:bg-white/[0.02] transition-all duration-300 group min-w-0"
              style={{ opacity: 0 }}
            >
              <div className="text-3xl sm:text-5xl font-bold text-white font-display tracking-tight transition-colors">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-200 mt-2 truncate">
                {stat.label}
              </div>
              <div className="text-[11px] font-mono text-slate-500 mt-1 truncate">
                {stat.sublabel}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
