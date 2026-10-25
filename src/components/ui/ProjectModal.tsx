import React from 'react';
import { X, CheckCircle2, Award } from 'lucide-react';
import { ProjectItem } from '../../types/portfolio';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl glass-panel border border-accent/30 bg-[#0a0e1a] p-6 sm:p-8 shadow-2xl text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 pr-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-accent/15 border border-accent/30 text-accent">
              {project.category}
            </span>
            {project.badge && (
              <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-sky-500/15 border border-sky-500/30 text-sky-400">
                {project.badge}
              </span>
            )}
            <span className="text-xs font-mono text-slate-400">• Role: {project.role}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            {project.title}
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed font-medium">
            {project.tagline}
          </p>
        </div>

        {/* Project Description */}
        <div className="my-6 space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
            Architectural Overview
          </h4>
          <p className="text-sm text-slate-300 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Highlights & Engineering Accomplishments */}
        <div className="space-y-3 my-6">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
            Key Deliverables &amp; Features
          </h4>
          <ul className="space-y-2.5">
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
          <div className="my-6 p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Production Impact</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {project.metrics.map((metric, idx) => (
                <div key={idx} className="text-center p-2 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-xs font-mono font-semibold text-accent">{metric}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack Chips */}
        <div className="space-y-2 pt-4 border-t border-white/10">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
            Technology Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-lg text-xs font-mono bg-surface-card border border-white/10 text-slate-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Close Action */}
        <div className="mt-8 pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold glass-panel border border-white/20 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
