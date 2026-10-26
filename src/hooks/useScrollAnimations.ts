import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Hook to provide silky-smooth 60/120fps scrolling using Lenis & GSAP ticker.
 * Synchronizes ScrollTrigger seamlessly and handles anchor links with smooth deceleration.
 */
export const useSmoothScroll = () => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Connect Lenis to ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Drive Lenis via GSAP ticker for synchronized 60/120fps frames
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Smooth scroll for anchor navigation links (#about, #contact, etc.)
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!target) return;
      const href = target.getAttribute('href');
      if (href && href.length > 1) {
        const element = document.querySelector(href);
        if (element) {
          e.preventDefault();
          lenis.scrollTo(element as HTMLElement, { offset: -70, duration: 1.2 });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
};

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
  childSelector?: string;
  start?: string;
  end?: string;
  parallaxDistance?: number;
  toggleClass?: string;
  scrub?: boolean | number;
  markers?: boolean;
}

export const useScrollAnimation = (options: ScrollAnimationOptions = {}) => {
  const ref = useRef<HTMLDivElement>(null);

  const {
    type = 'fadeUp',
    delay = 0,
    duration = 0.75,
    stagger = 0.08,
    childSelector,
    start = 'top 88%',
    end = 'bottom 20%',
    parallaxDistance = 50,
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
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration,
              delay,
              ease: 'power2.out',
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
            { opacity: 0, y: -30 },
            {
              opacity: 1,
              y: 0,
              duration,
              delay,
              ease: 'power2.out',
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
            { opacity: 0, x: -45 },
            {
              opacity: 1,
              x: 0,
              duration,
              delay,
              ease: 'power2.out',
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
            { opacity: 0, x: 45 },
            {
              opacity: 1,
              x: 0,
              duration,
              delay,
              ease: 'power2.out',
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
            { opacity: 0, scale: 0.94 },
            {
              opacity: 1,
              scale: 1,
              duration: duration * 1.05,
              delay,
              ease: 'power2.out',
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
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration,
              delay,
              ease: 'power2.out',
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
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                duration: duration * 0.85,
                stagger,
                delay,
                ease: 'power2.out',
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
          gsap.fromTo(
            el,
            { opacity: 0, y: 25 },
            {
              opacity: 1,
              y: 0,
              duration: duration * 1.1,
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

        case 'slideInLeft': {
          gsap.fromTo(
            el,
            { opacity: 0, x: -60 },
            {
              opacity: 1,
              x: 0,
              duration,
              delay,
              ease: 'power2.out',
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
            { opacity: 0, x: 60 },
            {
              opacity: 1,
              x: 0,
              duration,
              delay,
              ease: 'power2.out',
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
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration,
              delay,
              ease: 'power2.out',
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
 */
export const useSectionAnimations = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const animElements = section.querySelectorAll('[data-animate]');

      animElements.forEach((el) => {
        const animType = (el as HTMLElement).dataset.animate || 'fadeUp';
        const animDelay = parseFloat((el as HTMLElement).dataset.animateDelay || '0');
        const animDuration = parseFloat((el as HTMLElement).dataset.animateDuration || '0.75');
        const animStagger = parseFloat((el as HTMLElement).dataset.animateStagger || '0.08');
        const animStart = (el as HTMLElement).dataset.animateStart || 'top 88%';

        switch (animType) {
          case 'fadeUp':
            gsap.fromTo(el, { opacity: 0, y: 35 }, {
              opacity: 1, y: 0, duration: animDuration, delay: animDelay, ease: 'power2.out',
              scrollTrigger: { trigger: el, start: animStart, toggleActions: 'play none none none' },
            });
            break;

          case 'fadeLeft':
            gsap.fromTo(el, { opacity: 0, x: -50 }, {
              opacity: 1, x: 0, duration: animDuration, delay: animDelay, ease: 'power2.out',
              scrollTrigger: { trigger: el, start: animStart, toggleActions: 'play none none none' },
            });
            break;

          case 'fadeRight':
            gsap.fromTo(el, { opacity: 0, x: 50 }, {
              opacity: 1, x: 0, duration: animDuration, delay: animDelay, ease: 'power2.out',
              scrollTrigger: { trigger: el, start: animStart, toggleActions: 'play none none none' },
            });
            break;

          case 'scaleIn':
            gsap.fromTo(el, { opacity: 0, scale: 0.94 }, {
              opacity: 1, scale: 1, duration: animDuration, delay: animDelay, ease: 'power2.out',
              scrollTrigger: { trigger: el, start: animStart, toggleActions: 'play none none none' },
            });
            break;

          case 'staggerChildren': {
            const childSel = (el as HTMLElement).dataset.animateChildren || ':scope > *';
            const children = el.querySelectorAll(childSel);
            if (children.length > 0) {
              gsap.fromTo(children, { opacity: 0, y: 30 }, {
                opacity: 1, y: 0, duration: animDuration * 0.85, stagger: animStagger, delay: animDelay, ease: 'power2.out',
                scrollTrigger: { trigger: el, start: animStart, toggleActions: 'play none none none' },
              });
            }
            break;
          }

          case 'revealText':
            gsap.fromTo(el, { opacity: 0, y: 25 }, {
              opacity: 1, y: 0, duration: animDuration, delay: animDelay, ease: 'power3.out',
              scrollTrigger: { trigger: el, start: animStart, toggleActions: 'play none none none' },
            });
            break;

          case 'clipReveal':
            gsap.fromTo(el, { opacity: 0, y: 30 }, {
              opacity: 1, y: 0, duration: animDuration, delay: animDelay, ease: 'power2.out',
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
 * Hero section entrance animations:
 * Smooth hardware-accelerated transforms, zero blur lag, instant snappy feel
 */
export const useHeroAnimations = () => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Status pill
      tl.fromTo(
        '[data-hero="pill"]',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.1
      );

      // Main headline
      tl.fromTo(
        '[data-hero="title"]',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        0.25
      );

      // Subtitle
      tl.fromTo(
        '[data-hero="subtitle"]',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        0.45
      );

      // Summary text
      tl.fromTo(
        '[data-hero="summary"]',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.6
      );

      // CTA buttons
      tl.fromTo(
        '[data-hero="cta"] > *',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
        0.7
      );

      // Quality pillars
      tl.fromTo(
        '[data-hero="pillars"] > *',
        { opacity: 0, x: -12 },
        { opacity: 1, x: 0, duration: 0.45, stagger: 0.06 },
        0.85
      );

      // 3D Canvas / Visual container
      tl.fromTo(
        '[data-hero="canvas"]',
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out' },
        0.35
      );

      // Stats metrics
      tl.fromTo(
        '[data-hero="stats"] > *',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' },
        0.95
      );

    }, hero);

    return () => ctx.revert();
  }, []);

  return heroRef;
};

/**
 * Section header animation: badge + title + description
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
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
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
            duration: 1.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 92%',
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
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: counter,
            start: 'top 92%',
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
