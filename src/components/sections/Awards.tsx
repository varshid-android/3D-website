import React, { useEffect, useRef, useState } from 'react';
import { Award, GraduationCap, Calendar, CheckCircle2, ExternalLink, Maximize2, Sparkles, X, Image as ImageIcon } from 'lucide-react';
import { AWARDS, EDUCATION } from '../../data/portfolioData';
import { AwardItem, AwardImage } from '../../types/portfolio';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSectionHeaderAnimation } from '../../hooks/useScrollAnimations';

gsap.registerPlugin(ScrollTrigger);

export const Awards: React.FC = () => {
  const headerRef = useSectionHeaderAnimation();
  const sectionRef = useRef<HTMLElement>(null);

  // Active image selector state for cards with multiple images
  const [activeImageIndices, setActiveImageIndices] = useState<Record<string, number>>({});

  // Lightbox modal state for viewing award images in high-res
  const [lightboxData, setLightboxData] = useState<{
    image: AwardImage;
    award: AwardItem;
  } | null>(null);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxData) {
      document.body.style.overflowY = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setLightboxData(null);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflowY = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflowY = '';
    }
  }, [lightboxData]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Award cards - alternating left/right slide-in
      const cards = section.querySelectorAll('[data-award="card"]');
      cards.forEach((card, idx) => {
        const fromX = idx % 2 === 0 ? -80 : 80;
        gsap.fromTo(
          card,
          { opacity: 0, x: fromX, rotateY: idx % 2 === 0 ? 6 : -6, transformPerspective: 1000, filter: 'blur(4px)' },
          {
            opacity: 1, x: 0, rotateY: 0, filter: 'blur(0px)',
            duration: 0.9, delay: idx * 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' },
          }
        );
      });

      // Award icons - pop-in with scale bounce
      const icons = section.querySelectorAll('[data-award="icon"]');
      icons.forEach((icon, idx) => {
        gsap.fromTo(
          icon,
          { scale: 0, rotation: -30 },
          {
            scale: 1, rotation: 0,
            duration: 0.6, delay: 0.3 + idx * 0.15, ease: 'back.out(2)',
            scrollTrigger: { trigger: icon, start: 'top 90%', toggleActions: 'play none none none' },
          }
        );
      });

      // Education banner - slide up with clip reveal
      const eduBanner = section.querySelector('[data-award="edu"]');
      if (eduBanner) {
        gsap.fromTo(
          eduBanner,
          { opacity: 0, y: 50, clipPath: 'inset(10% 5% 10% 5% round 24px)', filter: 'blur(4px)' },
          {
            opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0% round 24px)', filter: 'blur(0px)',
            duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: eduBanner, start: 'top 88%', toggleActions: 'play none none none' },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="awards" className="py-10 sm:py-12 lg:py-14 relative w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full min-w-0">
        
        {/* Section Header (Framer Style) */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ee4405] shrink-0" />
            <span>Recognition &amp; Honors</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            Awards &amp; <span className="font-serif italic font-normal text-white">accreditation</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Verified accolades for peer collaboration, enterprise mobile delivery, and keynote speaking on frontier AI.
          </p>
        </div>

        {/* Awards & Recognition Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8 w-full min-w-0 items-stretch">
          {AWARDS.map((award) => {
            const hasImages = award.images && award.images.length > 0;
            const currentImgIdx = activeImageIndices[award.id] || 0;
            const currentImg = hasImages ? award.images![currentImgIdx] : null;

            return (
              <div
                key={award.id}
                data-award="card"
                className="p-6 sm:p-8 rounded-3xl bg-surface border border-white/10 hover:border-white/20 transition-all duration-300 relative overflow-hidden group w-full min-w-0 flex flex-col justify-between"
                style={{ opacity: 0 }}
              >
                {/* Background ambient radial glow */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />
                </div>

                <div className="relative z-10 space-y-4 sm:space-y-5">
                  {/* Card Top Meta Bar */}
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-3">
                      <div
                        data-award="icon"
                        className={`p-3 sm:p-3.5 rounded-2xl shrink-0 ${
                          award.iconName === 'Sparkles'
                            ? 'bg-purple-500/15 border border-purple-500/30 text-purple-300'
                            : 'bg-amber-400/10 border border-amber-400/25 text-amber-400'
                        }`}
                        style={{ transform: 'scale(0)' }}
                      >
                        {award.iconName === 'Sparkles' ? (
                          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
                        ) : (
                          <Award className="w-5 h-5 sm:w-6 sm:h-6" />
                        )}
                      </div>
                      <div>
                        <span className="px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono font-semibold bg-amber-400/10 border border-amber-400/25 text-amber-300 inline-block">
                          {award.badgeText}
                        </span>
                        {award.project && (
                          <div className="text-[11px] font-mono text-slate-300 mt-1 flex items-center gap-1">
                            <span className="text-slate-500">Focus:</span>
                            <span className="font-semibold">{award.project}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Official external link (e.g. LinkedIn announcement) */}
                    {award.link && (
                      <a
                        href={award.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium text-slate-300 bg-white/5 border border-white/10 hover:border-white/25 hover:text-white hover:bg-white/10 transition-all duration-200"
                        title="View official post on LinkedIn"
                      >
                        <span>{award.linkLabel || 'Verified Post'}</span>
                        <ExternalLink className="w-3 h-3 text-slate-400 shrink-0" />
                      </a>
                    )}
                  </div>

                  {/* Title & Issuer */}
                  <div>
                    <h3 className="text-lg sm:text-2xl font-bold text-white font-display mb-1 group-hover:text-amber-300 transition-colors">
                      {award.title}
                    </h3>
                    <div className="text-xs sm:text-sm font-semibold text-slate-300">
                      {award.issuer}
                    </div>
                    <div className="text-[11px] sm:text-xs font-mono text-slate-400 flex items-center gap-1.5 mt-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{award.date}</span>
                    </div>
                  </div>

                  {/* Interactive Visual Media Showcase */}
                  {hasImages && currentImg && (
                    <div className="space-y-2.5 pt-1">
                      {/* Image selector tabs if award has multiple photos */}
                      {award.images!.length > 1 && (
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                            <ImageIcon className="w-3 h-3 text-slate-400" />
                            <span>Media:</span>
                          </span>
                          <div className="flex items-center gap-1.5">
                            {award.images!.map((img, idx) => (
                              <button
                                key={idx}
                                onClick={() =>
                                  setActiveImageIndices((prev) => ({
                                    ...prev,
                                    [award.id]: idx,
                                  }))
                                }
                                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all ${
                                  currentImgIdx === idx
                                    ? 'bg-amber-400/20 border border-amber-400/40 text-amber-300 font-semibold'
                                    : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                                }`}
                              >
                                {img.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Photo Container with zoom overlay */}
                      <div
                        onClick={() => setLightboxData({ image: currentImg, award })}
                        className="relative w-full h-52 sm:h-64 rounded-2xl overflow-hidden border border-white/10 bg-slate-950/60 group/photo cursor-pointer shadow-lg"
                      >
                        <img
                          src={currentImg.url}
                          alt={currentImg.caption}
                          className="w-full h-full object-cover sm:object-contain object-center transition-transform duration-500 group-hover/photo:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover/photo:opacity-95 transition-opacity" />

                        {/* Top-right zoom action button */}
                        <div className="absolute top-2.5 right-2.5 p-2 rounded-xl bg-black/60 border border-white/15 text-white/80 group-hover/photo:text-amber-300 group-hover/photo:border-amber-400/40 transition-all backdrop-blur-sm shadow-md">
                          <Maximize2 className="w-4 h-4" />
                        </div>

                        {/* Bottom caption bar */}
                        <div className="absolute bottom-0 inset-x-0 p-3 sm:p-3.5 flex items-center justify-between gap-2 text-left">
                          <p className="text-[11px] sm:text-xs font-mono text-slate-200 line-clamp-1 drop-shadow-md">
                            {currentImg.caption}
                          </p>
                          <span className="text-[10px] font-mono text-amber-300 shrink-0 bg-black/50 px-2 py-0.5 rounded border border-amber-400/30">
                            Click to Enlarge
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Award Citation Description */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {award.description}
                  </p>

                  {/* Highlights Bullet List */}
                  {award.highlights && award.highlights.length > 0 && (
                    <div className="pt-1 space-y-1.5 border-t border-white/5">
                      {award.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Footer Actions */}
                <div className="pt-4 sm:pt-5 border-t border-white/10 mt-4 sm:mt-5 flex items-center justify-between gap-2.5 flex-wrap">
                  {hasImages && (
                    <button
                      onClick={() => setLightboxData({ image: currentImg!, award })}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-300 hover:text-amber-200 transition-colors"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Inspect High-Res Photo</span>
                    </button>
                  )}

                  {award.link && (
                    <a
                      href={award.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-200 glass-panel border border-white/15 hover:border-white/30 hover:text-white transition-all duration-200 ml-auto"
                    >
                      <span>LinkedIn Post</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Academic Degree Highlight Banner */}
        <div data-award="edu" className="p-5 sm:p-8 rounded-3xl glass-panel border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 hover:border-white/20 transition-all w-full min-w-0" style={{ opacity: 0 }}>
          <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 min-w-0">
            <div className="p-3 sm:p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 shrink-0">
              <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div className="space-y-0.5 min-w-0">
              <span className="text-[11px] sm:text-xs font-mono text-slate-400">Academic Degree</span>
              <h4 className="text-base sm:text-xl font-bold text-white font-display truncate">{EDUCATION.degree}</h4>
              <p className="text-xs sm:text-sm text-slate-400 truncate">{EDUCATION.institution} • Graduated {EDUCATION.year}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-2 rounded-xl shrink-0 w-full sm:w-auto justify-center">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Computer Engineering Graduate</span>
          </div>
        </div>

      </div>

      {/* High-Resolution Award Media Lightbox Modal */}
      {lightboxData && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-3.5 sm:p-6 md:p-8 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto"
          onClick={() => setLightboxData(null)}
        >
          <div
            className="relative w-full max-w-3xl my-auto rounded-2xl sm:rounded-3xl glass-panel border border-amber-400/30 bg-[#0a0e1a]/98 backdrop-blur-2xl p-4 sm:p-6 shadow-2xl text-left flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              onClick={() => setLightboxData(null)}
              className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 p-2 rounded-xl bg-white/10 border border-white/15 text-slate-300 hover:text-white hover:bg-white/20 hover:border-amber-400/40 transition-all z-20"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="mb-3.5 sm:mb-4 pr-10 shrink-0">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-amber-400/15 border border-amber-400/30 text-amber-300">
                  {lightboxData.award.badgeText}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {lightboxData.award.date}
                </span>
              </div>
              <h3 className="text-lg sm:text-2xl font-bold text-white font-display">
                {lightboxData.award.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                {lightboxData.award.issuer}
              </p>
            </div>

            {/* High-Res Image Display */}
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/80 flex items-center justify-center max-h-[50vh] sm:max-h-[54vh] p-2 sm:p-3">
              <img
                src={lightboxData.image.url}
                alt={lightboxData.image.caption}
                className="max-h-[46vh] sm:max-h-[50vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
              />
            </div>

            {/* Caption & Actions Footer */}
            <div className="mt-3.5 sm:mt-4 pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
              <p className="text-xs sm:text-sm font-mono text-slate-300">
                {lightboxData.image.caption}
              </p>
              {lightboxData.award.link && (
                <a
                  href={lightboxData.award.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-950 bg-white hover:bg-slate-200 transition-colors shrink-0"
                >
                  <span>Open LinkedIn Post</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-950" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
