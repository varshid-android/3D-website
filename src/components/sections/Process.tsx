import React, { useState } from 'react';
import { ChevronDown, CheckCircle2, HelpCircle } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimations';

interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
}

interface FaqItem {
  question: string;
  answer: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Research & System Architecture',
    subtitle: 'Strategic Technical Foundation',
    description:
      'Understanding client goals, user expectations, and scalability requirements. Defining the data flow, native bridge contracts, state architecture, and third-party dependencies before writing code.',
    highlights: ['System topology & API contracts', 'Native iOS/Android bridge assessment', 'Security, OAuth & compliance review'],
  },
  {
    number: '02',
    title: 'Agile Engineering & AI Integration',
    subtitle: 'High-Velocity, Type-Safe Development',
    description:
      'Developing responsive 60fps mobile interfaces with React Native, paired with robust backend services and intelligent AI workflows (RAG, MCP, n8n) engineered for production speed.',
    highlights: ['Modular component architecture', 'State management with Zustand & Redux', 'Live SignalR & WebSocket telemetry'],
  },
  {
    number: '03',
    title: 'Automated CI/CD & Store Launch',
    subtitle: 'Zero-Downtime Deployment & Scale',
    description:
      'Setting up automated build pipelines via Azure DevOps, executing rigorous end-to-end testing, and steering apps through strict App Store and Google Play approval guidelines.',
    highlights: ['App Store & Google Play submission', '99.9% crash-free telemetry integration', 'Long-term maintenance & optimization'],
  },
];

const FAQS: FaqItem[] = [
  {
    question: 'What is your primary engineering focus and tech stack?',
    answer:
      'I am a Senior Mobile Software Engineer with 6+ years specializing in React Native (iOS & Android) with custom native Java/Kotlin and Swift/Objective-C bridges, ReactJS platforms, and Node.js/FastAPI backends. Additionally, I build autonomous AI workflows utilizing Retrieval-Augmented Generation (RAG) and Model Context Protocol (MCP).',
  },
  {
    question: 'Do you manage complete App Store and Google Play submissions?',
    answer:
      'Yes. I oversee the end-to-end production launch lifecycle: provisioning profiles, signing certificates, Privacy Manifests, Google Play data safety compliance, App Store review guidelines, and automated Azure DevOps release tracks.',
  },
  {
    question: 'Can you work with remote clients across international timezones?',
    answer:
      'Yes, absolutely. Based in Ahmedabad (IST, UTC+5:30), I have extensive experience collaborating asynchronously and synchronously with distributed engineering and product teams across the US, UK, Europe, and Australia.',
  },
  {
    question: 'How do you guarantee production reliability and performance?',
    answer:
      'I implement SonarQube static analysis, comprehensive unit/integration testing, Sentry telemetry, and Firebase Crashlytics to maintain a proven 99.9% crash-free session rate across 25+ deployed commercial mobile apps.',
  },
];

export const Process: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const sectionRef = useScrollAnimation({ type: 'fadeUp' });

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section ref={sectionRef} id="process" className="py-10 sm:py-12 lg:py-14 relative bg-[#010000] w-full max-w-full overflow-hidden">
      {/* Background warm flame glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full min-w-0">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ee4405] shrink-0" />
            <span>Workflow &amp; Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            How I transform ideas into <span className="font-serif italic font-normal text-white">high-performing apps</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            A battle-tested 3-stage delivery framework designed to minimize technical risk, accelerate time-to-market, and achieve scalable production quality.
          </p>
        </div>

        {/* 3-Step Process Bento Grid (Framer Style) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-14 w-full min-w-0">
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.number}
              className="p-7 sm:p-9 rounded-3xl bg-surface border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="space-y-5">
                {/* Step Number & Badge */}
                <div className="flex items-center justify-between">
                  <div className="text-4xl sm:text-5xl font-serif italic text-white/20 group-hover:text-white/40 transition-colors">
                    {step.number}
                  </div>
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono text-slate-300 bg-white/[0.04] border border-white/10">
                    Step {step.number}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-display mb-1.5 transition-colors">
                    {step.title}
                  </h3>
                  <div className="text-xs font-mono text-slate-400 mb-3.5">
                    {step.subtitle}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Highlights List */}
              <div className="pt-6 mt-6 border-t border-white/10 space-y-2.5">
                {step.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Frequently Asked Questions Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 sm:mb-8 space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300">
              <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
              <span>Common Questions</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-bold text-white font-display">
              Frequently <span className="font-serif italic font-normal text-white">asked questions</span>
            </h3>
          </div>

          <div className="space-y-3.5">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl sm:rounded-3xl bg-surface border border-white/10 overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 sm:p-7 text-left flex items-center justify-between gap-4 focus:outline-none group"
                  >
                    <span className="font-display font-semibold text-white text-sm sm:text-base group-hover:text-slate-200 transition-colors">
                      {faq.question}
                    </span>
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-slate-400 group-hover:text-white transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-white' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-7 pb-6 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-3 animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
