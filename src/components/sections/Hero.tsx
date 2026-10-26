import React from 'react';
import { Download, ArrowRight, Sparkles, MapPin, CheckCircle2, ShieldCheck, Terminal } from 'lucide-react';
import { PERSONAL_INFO, STATS } from '../../data/portfolioData';
import { HeroScene } from '../three/HeroScene';
import { useHeroAnimations } from '../../hooks/useScrollAnimations';

export const Hero: React.FC = () => {
  const heroRef = useHeroAnimations();

  return (
    <section ref={heroRef} id="home" className="relative w-full max-w-full overflow-hidden pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-36 lg:pb-24">
      {/* Background radial ambient lights (strictly contained within section wrapper) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" data-hero="bg-glow">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] sm:h-[500px] bg-gradient-radial from-accent/10 via-sky-500/5 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full min-w-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center w-full min-w-0">
          
          {/* Left Column: Core Message & Introduction */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left w-full min-w-0">
            {/* Status Pill */}
            <div data-hero="pill" className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full glass-panel border border-accent/30 text-[11px] sm:text-xs font-mono text-accent shadow-[0_0_15px_rgba(0,245,212,0.15)] max-w-full" style={{ opacity: 0 }}>
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse shrink-0" />
              <span className="truncate">Available for Lead &amp; Senior Roles</span>
              <span className="text-slate-500 hidden xs:inline">•</span>
              <span className="text-slate-400 hidden xs:flex items-center gap-1 shrink-0">
                <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                Ahmedabad, India
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2.5 sm:space-y-3 w-full">
              <h1 data-hero="title" className="text-[26px] xs:text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] break-words" style={{ opacity: 0 }}>
                Crafting <span className="text-gradient-accent">Mobile Apps</span> &amp; Intelligent <span className="text-white">AI Workflows</span>
              </h1>
              <p data-hero="subtitle" className="text-base sm:text-xl font-medium text-slate-300 leading-snug" style={{ opacity: 0 }}>
                I'm <span className="text-accent font-semibold">{PERSONAL_INFO.name}</span> — Senior Mobile Software Engineer with <span className="text-white font-semibold">6+ years</span> delivering enterprise React Native ecosystems, native Android/iOS bridges, and scalable backends.
              </p>
            </div>

            {/* Quick summary snippet */}
            <p data-hero="summary" className="text-xs sm:text-base text-slate-400 leading-relaxed max-w-2xl" style={{ opacity: 0 }}>
              Specialized in guiding mission-critical client products from concept through app-store submission, real-time SignalR architectures, automated Azure DevOps CI/CD pipelines, and frontier AI tools (RAG, MCP &amp; multi-agent systems).
            </p>

            {/* Action CTA Buttons */}
            <div data-hero="cta" className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-2 w-full">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-accent via-cyan-300 to-sky-400 hover:opacity-95 shadow-[0_0_20px_rgba(0,245,212,0.3)] transition-all duration-200 active:scale-[0.98]"
                style={{ opacity: 0 }}
              >
                <span>Explore Featured Work</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={PERSONAL_INFO.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm text-slate-200 glass-panel border border-white/15 hover:border-accent/40 hover:text-accent transition-all duration-200 group active:scale-[0.98]"
                style={{ opacity: 0 }}
              >
                <Download className="w-4 h-4 text-accent group-hover:-translate-y-0.5 transition-transform" />
                <span>Download Resume PDF</span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 rounded-xl font-medium text-xs sm:text-sm text-slate-400 hover:text-white transition-colors"
                style={{ opacity: 0 }}
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Contact Directly</span>
              </a>
            </div>

            {/* Key Quality Pillars */}
            <div data-hero="pillars" className="pt-3 flex flex-wrap items-center gap-3 sm:gap-4 text-[11px] sm:text-xs font-mono text-slate-400">
              <div className="flex items-center gap-1.5" style={{ opacity: 0 }}>
                <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                <span>React Native &amp; Native Bridges</span>
              </div>
              <div className="flex items-center gap-1.5" style={{ opacity: 0 }}>
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>Azure DevOps CI/CD</span>
              </div>
              <div className="flex items-center gap-1.5" style={{ opacity: 0 }}>
                <Terminal className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>FastAPI &amp; Agentic AI</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive 3D Canvas Experience */}
          <div data-hero="canvas" className="lg:col-span-5 relative flex items-center justify-center w-full min-w-0 overflow-hidden" style={{ opacity: 0 }}>
            <div className="w-full h-[360px] sm:h-[460px] lg:h-[560px] relative rounded-3xl glass-panel border border-white/10 overflow-hidden shadow-2xl shadow-black/40">
              {/* Corner tech accents */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 hidden sm:flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-black/60 border border-white/10 text-[10px] sm:text-[11px] font-mono text-slate-300">
                <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Interactive 3D Stage</span>
              </div>

              {/* 3D Scene */}
              <HeroScene />
            </div>
          </div>

        </div>

        {/* Highlight Metrics Banner */}
        <div data-hero="stats" className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 w-full min-w-0">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className="p-3.5 sm:p-5 rounded-2xl glass-panel border border-white/10 text-center hover:border-accent/30 transition-all duration-300 group min-w-0"
              style={{ opacity: 0 }}
            >
              <div className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent to-sky-400 font-display">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-200 mt-1 truncate">
                {stat.label}
              </div>
              <div className="text-[10px] sm:text-[11px] font-mono text-slate-500 mt-0.5 truncate">
                {stat.sublabel}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
