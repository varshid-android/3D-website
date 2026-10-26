import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, CheckCircle2, Layers, Smartphone, Cpu, ShieldCheck } from 'lucide-react';
import { PROJECTS } from '../../data/portfolioData';
import { ProjectItem } from '../../types/portfolio';
import { ProjectModal } from '../ui/ProjectModal';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSectionHeaderAnimation } from '../../hooks/useScrollAnimations';

gsap.registerPlugin(ScrollTrigger);

export const Projects: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const headerRef = useSectionHeaderAnimation();
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const categories = ['All', 'Mobile', 'Full-Stack', 'AI & Automation', 'DevOps & Tooling'];

  const filteredProjects =
    filter === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === filter);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Mobile':
        return <Smartphone className="w-4 h-4 text-accent" />;
      case 'Full-Stack':
        return <Layers className="w-4 h-4 text-sky-400" />;
      case 'AI & Automation':
        return <Cpu className="w-4 h-4 text-pink-400" />;
      default:
        return <ShieldCheck className="w-4 h-4 text-purple-400" />;
    }
  };

  // Scroll entrance animations
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Filter chips stagger
      const chips = section.querySelectorAll('[data-project="chip"]');
      if (chips.length) {
        gsap.fromTo(
          chips,
          { opacity: 0, y: 20, scale: 0.9 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.5, stagger: 0.06, ease: 'back.out(1.3)',
            scrollTrigger: { trigger: chips[0], start: 'top 90%', toggleActions: 'play none none none' },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  // Animate project cards when filter changes
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const ctx = gsap.context(() => {
      const cards = grid.querySelectorAll('[data-project="card"]');
      if (cards.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, scale: 0.9, rotateX: 8, transformPerspective: 1000, filter: 'blur(4px)' },
          {
            opacity: 1, y: 0, scale: 1, rotateX: 0, filter: 'blur(0px)',
            duration: 0.8, stagger: 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: grid, start: 'top 88%', toggleActions: 'play none none none' },
          }
        );
      }
    }, grid);

    return () => ctx.revert();
  }, [filter]);

  return (
    <section ref={sectionRef} id="projects" className="py-16 sm:py-20 lg:py-28 relative bg-[#07090e] w-full max-w-full overflow-hidden">
      {/* Background ambient lighting (strictly clipped) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-0 w-72 sm:w-80 h-72 sm:h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full min-w-0">
        
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-2.5 sm:space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-accent/30 text-xs font-mono text-accent">
            <span>04 // Selected Works</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Featured Projects &amp; <span className="text-gradient-accent">Case Studies</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-base leading-relaxed">
            A showcase of production mobile applications, scalable platforms, and frontier AI tools engineered from concept to deployment.
          </p>
        </div>

        {/* Filter Chips */}
        <div className="w-full max-w-full overflow-x-auto flex gap-2 mb-8 sm:mb-12 no-scrollbar sm:flex-wrap sm:justify-center pb-2 touch-pan-x">
          {categories.map((cat) => (
            <button
              key={cat}
              data-project="chip"
              onClick={() => setFilter(cat)}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 shrink-0 whitespace-nowrap ${
                filter === cat
                  ? 'bg-accent text-slate-950 shadow-[0_0_15px_rgba(0,245,212,0.3)]'
                  : 'glass-panel border border-white/10 text-slate-400 hover:text-white hover:bg-white/5'
              }`}
              style={{ opacity: 0 }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 w-full min-w-0">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              data-project="card"
              className="rounded-3xl glass-panel border border-white/10 hover:border-accent/40 p-5 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/5 group w-full min-w-0"
              style={{ opacity: 0 }}
            >
              <div className="w-full min-w-0">
                {/* Card Top Meta */}
                <div className="flex items-center justify-between gap-2 mb-3.5 sm:mb-4">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      {getCategoryIcon(project.category)}
                    </span>
                    <span className="text-xs font-mono font-medium text-slate-400">
                      {project.category}
                    </span>
                  </div>

                  {project.badge && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono bg-accent/10 border border-accent/25 text-accent shrink-0">
                      {project.badge}
                    </span>
                  )}
                </div>

                {/* Project Title */}
                <h3 className="text-lg sm:text-2xl font-bold text-white font-display group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-[11px] sm:text-xs font-mono text-slate-400 mt-1 mb-2.5">
                  Role: <strong className="text-slate-200">{project.role}</strong>
                </p>

                {/* Tagline */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 sm:mb-6">
                  {project.tagline}
                </p>

                {/* Key Bullet Highlights */}
                <div className="space-y-2 mb-5 sm:mb-6 text-xs text-slate-300">
                  {project.highlights.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
                      <span className="line-clamp-2">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Tech Stack & Action */}
              <div className="space-y-3.5 sm:space-y-4 pt-4 border-t border-white/10 w-full min-w-0">
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-mono bg-surface-card border border-white/5 text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 5 && (
                    <span className="px-2 py-1 rounded-lg text-[10px] sm:text-[11px] font-mono bg-white/5 text-slate-500">
                      +{project.techStack.length - 5}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-1 w-full">
                  <button
                    onClick={() => setActiveProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline active:scale-95 transition-all"
                  >
                    <span>View Case Study</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  {project.metrics && project.metrics[0] && (
                    <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 truncate max-w-[130px] sm:max-w-none text-right">
                      {project.metrics[0]}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
};
