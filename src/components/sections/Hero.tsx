import React from 'react';
import { Download, ArrowRight, Sparkles, MapPin, CheckCircle2, ShieldCheck, Terminal } from 'lucide-react';
import { PERSONAL_INFO, STATS } from '../../data/portfolioData';
import { HeroScene } from '../three/HeroScene';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      {/* Background radial ambient lights */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[550px] bg-gradient-radial from-accent/10 via-sky-500/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Message & Introduction */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-accent/30 text-xs font-mono text-accent shadow-[0_0_15px_rgba(0,245,212,0.15)] animate-in fade-in slide-in-from-bottom-2 duration-500">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>Available for Lead & Senior Roles</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                Ahmedabad, India
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Crafting <span className="text-gradient-accent">Mobile Apps</span> &amp; Intelligent <span className="text-white">AI Workflows</span>
              </h1>
              <p className="text-lg sm:text-xl font-medium text-slate-300">
                I'm <span className="text-accent font-semibold">{PERSONAL_INFO.name}</span> — Senior Mobile Software Engineer with <span className="text-white font-semibold">6+ years</span> delivering enterprise React Native ecosystems, native Android/iOS bridges, and scalable full-stack backends.
              </p>
            </div>

            {/* Quick summary snippet */}
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl">
              Specialized in guiding mission-critical client products from concept through app-store submission, real-time SignalR architectures, automated Azure DevOps CI/CD pipelines, and frontier AI tools (RAG, MCP & multi-agent systems).
            </p>

            {/* Action CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-accent via-cyan-300 to-sky-400 hover:opacity-95 shadow-[0_0_25px_rgba(0,245,212,0.35)] transition-all duration-200 hover:scale-[1.02]"
              >
                <span>Explore Featured Work</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={PERSONAL_INFO.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-slate-200 glass-panel border border-white/15 hover:border-accent/40 hover:text-accent transition-all duration-200 hover:scale-[1.02] group"
              >
                <Download className="w-4 h-4 text-accent group-hover:-translate-y-0.5 transition-transform" />
                <span>Download Resume PDF</span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm text-slate-400 hover:text-white transition-colors"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Contact Directly</span>
              </a>
            </div>

            {/* Key Quality Pillars */}
            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                <span>React Native &amp; Native Bridges</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                <span>Azure DevOps CI/CD</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-purple-400" />
                <span>FastAPI &amp; Agentic AI</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive 3D Canvas Experience */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="w-full h-[420px] sm:h-[480px] lg:h-[560px] relative rounded-3xl glass-panel border border-white/10 overflow-hidden shadow-2xl shadow-black/40">
              {/* Corner tech accents */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 border border-white/10 text-[11px] font-mono text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>WebGL 3D Interactive Model</span>
              </div>

              {/* 3D Scene */}
              <HeroScene />
            </div>
          </div>

        </div>

        {/* Highlight Metrics Banner */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl glass-panel border border-white/10 text-center hover:border-accent/30 transition-all duration-300 group"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent to-sky-400 font-display">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-200 mt-1">
                {stat.label}
              </div>
              <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                {stat.sublabel}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
