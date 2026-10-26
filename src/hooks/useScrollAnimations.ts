import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Professional scroll animation hook inspired by The Goonies Webflow site.
 * Uses GSAP ScrollTrigger for cinematic reveal animations:
 * - Staggered fade-in + slide-up for child elements
 * - Parallax background shifts
 * - Scale-down reveal for images/cards
 * - Text line-by-line reveals
 * - Section header cinematic entrance
 */

export type AnimationType =
  | 'fadeUp'
  | 'fadeDown'
  | 'fadeLeft'
  | 'fadeRight'
  | 'scaleIn'
  | 'rotateIn'
  | 'staggerChildren'
  | 'parallax'
  | 'revealText'
  | 'slideInLeft'
  | 'slideInRight'
  | 'clipReveal';

interface ScrollAnimationOptions {
  type?: AnimationType;
  delay?: number;
  duration?: number;
  stagger?: number;
  /** CSS selector for children to stagger (used with staggerChildren) */
  childSelector?: string;
  /** ScrollTrigger start position (default: 'top 85%') */
  start?: string;
  /** ScrollTrigger end position (default: 'bottom 20%') */
  end?: string;
  /** Parallax movement distance in px (only for parallax type) */
  parallaxDistance?: number;
  /** Whether to toggle class instead of gsap animation */
  toggleClass?: string;
  /** Scrub intensity (true for 1:1 scroll link, number for smoothing) */
  scrub?: boolean | number;
  /** Whether to use markers for debugging */
  markers?: boolean;
}

export const useScrollAnimation = (options: ScrollAnimationOptions = {}) => {
  const ref = useRef<HTMLDivElement>(null);

  const {
    type = 'fadeUp',
    delay = 0,
    duration = 0.9,
    stagger = 0.12,
    childSelector,
    start = 'top 85%',
    end = 'bottom 20%',
    parallaxDistance = 60,
    scrub = false,
    markers = false,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      switch (type) {
        case 'fadeUp': {
          gsap.fromTo(
            el,
            { opacity: 0, y: 60, filter: 'blur(4px)' },
            {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration,
              delay,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start,
                toggleActions: 'play none none none',
                markers,
              },
            }
          );
          break;
        }

        case 'fadeDown': {
          gsap.fromTo(
            el,
            { opacity: 0, y: -40 },
            {
              opacity: 1,
              y: 0,
              duration,
              delay,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start,
                toggleActions: 'play none none none',
                markers,
              },
            }
          );
          break;
        }

        case 'fadeLeft': {
          gsap.fromTo(
            el,
            { opacity: 0, x: -80 },
            {
              opacity: 1,
              x: 0,
              duration,
              delay,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start,
                toggleActions: 'play none none none',
                markers,
              },
            }
          );
          break;
        }

        case 'fadeRight': {
          gsap.fromTo(
            el,
            { opacity: 0, x: 80 },
            {
              opacity: 1,
              x: 0,
              duration,
              delay,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start,
                toggleActions: 'play none none none',
                markers,
              },
            }
          );
          break;
        }

        case 'scaleIn': {
          gsap.fromTo(
            el,
            { opacity: 0, scale: 0.85, filter: 'blur(6px)' },
            {
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)',
              duration: duration * 1.1,
              delay,
              ease: 'back.out(1.4)',
              scrollTrigger: {
                trigger: el,
                start,
                toggleActions: 'play none none none',
                markers,
              },
            }
          );
          break;
        }

        case 'rotateIn': {
          gsap.fromTo(
            el,
            { opacity: 0, rotateX: 15, y: 40, transformPerspective: 800 },
            {
              opacity: 1,
              rotateX: 0,
              y: 0,
              duration,
              delay,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start,
                toggleActions: 'play none none none',
                markers,
              },
            }
          );
          break;
        }

        case 'staggerChildren': {
          const children = childSelector
            ? el.querySelectorAll(childSelector)
            : el.children;

          if (children.length > 0) {
            gsap.fromTo(
              children,
              { opacity: 0, y: 50, filter: 'blur(3px)' },
              {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: duration * 0.85,
                stagger,
                delay,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: el,
                  start,
                  toggleActions: 'play none none none',
                  markers,
                },
              }
            );
          }
          break;
        }

        case 'parallax': {
          gsap.fromTo(
            el,
            { y: -parallaxDistance },
            {
              y: parallaxDistance,
              ease: 'none',
              scrollTrigger: {
                trigger: el,
                start: 'top bottom',
                end: 'bottom top',
                scrub: typeof scrub === 'number' ? scrub : 1.2,
                markers,
              },
            }
          );
          break;
        }

        case 'revealText': {
          // Split text lines and animate each with staggered reveals
          gsap.fromTo(
            el,
            { opacity: 0, y: 30, clipPath: 'inset(0 0 100% 0)' },
            {
              opacity: 1,
              y: 0,
              clipPath: 'inset(0 0 0% 0)',
              duration: duration * 1.2,
              delay,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: el,
                start,
                toggleActions: 'play none none none',
                markers,
              },
            }
          );
          break;
        }

        case 'slideInLeft': {
          gsap.fromTo(
            el,
            { opacity: 0, x: -120, rotateY: 8 },
            {
              opacity: 1,
              x: 0,
              rotateY: 0,
              duration,
              delay,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start,
                toggleActions: 'play none none none',
                markers,
              },
            }
          );
          break;
        }

        case 'slideInRight': {
          gsap.fromTo(
            el,
            { opacity: 0, x: 120, rotateY: -8 },
            {
              opacity: 1,
              x: 0,
              rotateY: 0,
              duration,
              delay,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start,
                toggleActions: 'play none none none',
                markers,
              },
            }
          );
          break;
        }

        case 'clipReveal': {
          gsap.fromTo(
            el,
            { clipPath: 'inset(0 100% 0 0)' },
            {
              clipPath: 'inset(0 0% 0 0)',
              duration: duration * 1.4,
              delay,
              ease: 'power4.inOut',
              scrollTrigger: {
                trigger: el,
                start,
                toggleActions: 'play none none none',
                markers,
              },
            }
          );
          break;
        }
      }
    }, el);

    return () => ctx.revert();
  }, [type, delay, duration, stagger, childSelector, start, end, parallaxDistance, scrub, markers]);

  return ref;
};

/**
 * Hook to animate multiple refs within a single section.
 * Useful for animating independent elements within the same section.
 */
export const useSectionAnimations = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Auto-animate elements with data-animate attribute
      const animElements = section.querySelectorAll('[data-animate]');

      animElements.forEach((el) => {
        const animType = (el as HTMLElement).dataset.animate || 'fadeUp';
        const animDelay = parseFloat((el as HTMLElement).dataset.animateDelay || '0');
        const animDuration = parseFloat((el as HTMLElement).dataset.animateDuration || '0.9');
        const animStagger = parseFloat((el as HTMLElement).dataset.animateStagger || '0.12');
        const animStart = (el as HTMLElement).dataset.animateStart || 'top 85%';

        switch (animType) {
          case 'fadeUp':
            gsap.fromTo(el, { opacity: 0, y: 60, filter: 'blur(4px)' }, {
              opacity: 1, y: 0, filter: 'blur(0px)', duration: animDuration, delay: animDelay, ease: 'power3.out',
              scrollTrigger: { trigger: el, start: animStart, toggleActions: 'play none none none' },
            });
            break;

          case 'fadeLeft':
            gsap.fromTo(el, { opacity: 0, x: -80 }, {
              opacity: 1, x: 0, duration: animDuration, delay: animDelay, ease: 'power3.out',
              scrollTrigger: { trigger: el, start: animStart, toggleActions: 'play none none none' },
            });
            break;

          case 'fadeRight':
            gsap.fromTo(el, { opacity: 0, x: 80 }, {
              opacity: 1, x: 0, duration: animDuration, delay: animDelay, ease: 'power3.out',
              scrollTrigger: { trigger: el, start: animStart, toggleActions: 'play none none none' },
            });
            break;

          case 'scaleIn':
            gsap.fromTo(el, { opacity: 0, scale: 0.85, filter: 'blur(6px)' }, {
              opacity: 1, scale: 1, filter: 'blur(0px)', duration: animDuration * 1.1, delay: animDelay, ease: 'back.out(1.4)',
              scrollTrigger: { trigger: el, start: animStart, toggleActions: 'play none none none' },
            });
            break;

          case 'staggerChildren': {
            const childSel = (el as HTMLElement).dataset.animateChildren || ':scope > *';
            const children = el.querySelectorAll(childSel);
            if (children.length > 0) {
              gsap.fromTo(children, { opacity: 0, y: 50, filter: 'blur(3px)' }, {
                opacity: 1, y: 0, filter: 'blur(0px)', duration: animDuration * 0.85, stagger: animStagger, delay: animDelay, ease: 'power3.out',
                scrollTrigger: { trigger: el, start: animStart, toggleActions: 'play none none none' },
              });
            }
            break;
          }

          case 'revealText':
            gsap.fromTo(el, { opacity: 0, y: 30, clipPath: 'inset(0 0 100% 0)' }, {
              opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: animDuration * 1.2, delay: animDelay, ease: 'power4.out',
              scrollTrigger: { trigger: el, start: animStart, toggleActions: 'play none none none' },
            });
            break;

          case 'clipReveal':
            gsap.fromTo(el, { clipPath: 'inset(0 100% 0 0)' }, {
              clipPath: 'inset(0 0% 0 0)', duration: animDuration * 1.4, delay: animDelay, ease: 'power4.inOut',
              scrollTrigger: { trigger: el, start: animStart, toggleActions: 'play none none none' },
            });
            break;
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return { sectionRef, timelineRef };
};

/**
 * Hero section specific animations: 
 * - Parallax depth layers
 * - Title scale + opacity on scroll
 * - Staggered entrance on page load
 */
export const useHeroAnimations = () => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const ctx = gsap.context(() => {
      // Initial entrance: stagger all hero content on page load
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Status pill
      tl.fromTo(
        '[data-hero="pill"]',
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7 },
        0.2
      );

      // Main headline - word by word
      tl.fromTo(
        '[data-hero="title"]',
        { opacity: 0, y: 50, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power4.out' },
        0.4
      );

      // Subtitle
      tl.fromTo(
        '[data-hero="subtitle"]',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.7
      );

      // Summary text
      tl.fromTo(
        '[data-hero="summary"]',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        0.9
      );

      // CTA buttons - stagger
      tl.fromTo(
        '[data-hero="cta"] > *',
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1 },
        1.0
      );

      // Quality pillars
      tl.fromTo(
        '[data-hero="pillars"] > *',
        { opacity: 0, x: -15 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.08 },
        1.2
      );

      // 3D Canvas container
      tl.fromTo(
        '[data-hero="canvas"]',
        { opacity: 0, scale: 0.9, x: 60 },
        { opacity: 1, scale: 1, x: 0, duration: 1.2, ease: 'power3.out' },
        0.5
      );

      // Stats metrics - stagger from bottom
      tl.fromTo(
        '[data-hero="stats"] > *',
        { opacity: 0, y: 40, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.2)' },
        1.3
      );


      // Parallax: Background glow moves slower
      gsap.to('[data-hero="bg-glow"]', {
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        y: 100,
        ease: 'none',
      });

    }, hero);

    return () => ctx.revert();
  }, []);

  return heroRef;
};

/**
 * Section header animation: badge + title + description
 * with a cinematic staggered reveal
 */
export const useSectionHeaderAnimation = () => {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const children = el.children;
      gsap.fromTo(
        children,
        { opacity: 0, y: 40, filter: 'blur(4px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return headerRef;
};

/**
 * Skill bar fill animation - animates width from 0 to actual value
 * on scroll into view.
 */
export const useSkillBarAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const bars = container.querySelectorAll('[data-skill-bar]');
      bars.forEach((bar) => {
        const targetWidth = (bar as HTMLElement).style.width;
        gsap.fromTo(
          bar,
          { width: '0%' },
          {
            width: targetWidth,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return containerRef;
};

/**
 * Counter animation for stat numbers
 */
export const useCounterAnimation = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const counters = el.querySelectorAll('[data-counter]');
      counters.forEach((counter) => {
        const endVal = parseInt((counter as HTMLElement).dataset.counter || '0', 10);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: endVal,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: counter,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          onUpdate: () => {
            (counter as HTMLElement).textContent = Math.round(obj.val).toString() + '+';
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
};
