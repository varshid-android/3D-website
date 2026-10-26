import React, { useEffect } from 'react';
import { X, CheckCircle2, Award, ExternalLink } from 'lucide-react';
import { ProjectItem } from '../../types/portfolio';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // Prevent background scroll ONLY on Y-axis without wiping overflow-x: hidden
  useEffect(() => {
    if (project) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = '';
    }
    return () => {
      document.body.style.overflowY = '';
    };
  }, [project]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-2xl sm:rounded-3xl glass-panel border border-accent/30 bg-[#0a0e1a] p-5 sm:p-8 shadow-2xl text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 pr-8 sm:pr-10">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="px-2.5 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-mono font-semibold bg-accent/15 border border-accent/30 text-accent">
              {project.category}
            </span>
            {project.badge && (
              <span className="px-2.5 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-mono bg-sky-500/15 border border-sky-500/30 text-sky-400">
                {project.badge}
              </span>
            )}
            <span className="text-[11px] sm:text-xs font-mono text-slate-400">• Role: {project.role}</span>
          </div>
          <h3 className="text-xl sm:text-3xl font-extrabold text-white font-display">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-medium">
            {project.tagline}
          </p>
        </div>

        {/* Project Description */}
        <div className="my-5 sm:my-6 space-y-2 sm:space-y-3">
          <h4 className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
            Architectural Overview
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Highlights & Engineering Accomplishments */}
        <div className="space-y-2.5 sm:space-y-3 my-5 sm:my-6">
          <h4 className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
            Key Deliverables &amp; Features
          </h4>
          <ul className="space-y-2">
            {project.highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Verified Metrics if available */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="my-5 sm:my-6 p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <h4 className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Production Impact</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1.5">
              {project.metrics.map((metric, idx) => (
                <div key={idx} className="text-center p-2 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-[11px] sm:text-xs font-mono font-semibold text-accent">{metric}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack Chips */}
        <div className="space-y-2 pt-4 border-t border-white/10">
          <h4 className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
            Technology Stack
          </h4>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-mono bg-surface-card border border-white/10 text-slate-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Live Packages & Resources */}
        {project.externalLinks && project.externalLinks.length > 0 && (
          <div className="space-y-2 pt-4 border-t border-white/10">
            <h4 className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Live Packages &amp; Resources
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.externalLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium text-slate-200 bg-white/5 border border-white/10 hover:border-accent/40 hover:text-accent hover:bg-white/10 transition-all"
                >
                  <span>{link.label}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-accent" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Footer Close Action */}
        <div className="mt-6 sm:mt-8 pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold glass-panel border border-white/20 text-slate-300 hover:text-white hover:bg-white/10 transition-colors text-center"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
