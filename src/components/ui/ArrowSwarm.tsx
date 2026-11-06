import React, { useEffect, useRef, useState } from 'react';

/**
 * ArrowSwarm & Multi-Agent Swarm Rebuild Controller
 *
 * 1. Multi-Cursor Swarm Rebuild Engine (inspired by touquirakhtar.com, Joel Califa's Swarm & DhvanilPatel/swarm-cursors):
 *    - Blanks live webpage to a dark canvas
 *    - Spawns 20+ multiplayer colored cursor agents (Varshid, Mobile Arch, AI Engineer, UI Lead, etc.)
 *    - Crosshair rects with live size badges, blue ruler guidelines, typing carets, alt-drag duplicates
 *    - Procedural mechanical typewriter clicks & placement snaps (Web Audio API)
 *    - Auto-scrolling Tour mode down the entire page
 *    - Interactive bottom HUD pill: agents count, layer progress, Tour, 1x/2x/3x speed, sound toggle, Go Live, Replay
 *    - Smooth cross-fade back to live interactive website
 *
 * 2. Background Cursor-Reactive Floating Particles:
 *    - Subtle geometric particles drifting lazily across the background
 *    - Reacts to cursor proximity with gentle organic repulsion
 */

type ParticleShape = 'cross' | 'triangle';

interface FloatingParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  baseAlpha: number;
  shape: ParticleShape;
  rotation: number;
  rotationSpeed: number;
  driftSpeed: number;
}

const PARTICLE_COLORS = [
  '#00e5ff', // Cyan
  '#ff00e5', // Magenta
  '#39ff14', // Neon Green
  '#ffe500', // Yellow
  '#ff3c78', // Hot Pink
  '#7c3aed', // Violet/Purple
  '#ffffff', // White
  '#f97316', // Orange
  '#34d399', // Emerald
  '#e879f9', // Light Magenta
];

const PARTICLE_COUNT = 45;
const MOUSE_RADIUS = 160;
const PUSH_FORCE = 3.5;
const FRICTION = 0.96;

/**
 * Triggers the Swarm Rebuild effect.
 * Can be called programmatically from anywhere in the app (Navbar, Hero, shortcut, floating pill).
 */
export const triggerSwarmRebuild = async (options: { tour?: boolean } = { tour: true }) => {
  // Ensure body scroll is unlocked if a mobile drawer was open
  if (typeof document !== 'undefined') {
    document.body.style.overflow = '';
  }

  // If already running, toggle
  if ((window as any).__swarmRebuild?.app) {
    (window as any).__swarmRebuild.toggle();
    return;
  }

  // Ensure script is loaded
  if (!(window as any).__swarmRebuild) {
    (window as any).__swarmNoAutoStart = true;
    await new Promise<void>((resolve, reject) => {
      if (document.querySelector('script[data-swarm-script]')) {
        const check = setInterval(() => {
          if ((window as any).__swarmRebuild) {
            clearInterval(check);
            resolve();
          }
        }, 50);
        setTimeout(() => {
          clearInterval(check);
          resolve();
        }, 4000);
        return;
      }

      const script = document.createElement('script');
      script.src = '/swarm.js';
      script.dataset.swarmScript = 'true';
      script.async = true;
      script.onload = () => resolve();
      script.onerror = (err) => reject(err);
      document.body.appendChild(script);
    });
  }

  // Launch swarm
  if ((window as any).__swarmRebuild) {
    (window as any).__swarmRebuild.start();

    // Auto-enable Tour mode if requested so it tours down the whole page
    if (options.tour !== false) {
      const checkReady = setInterval(() => {
        const swarm = (window as any).__swarmRebuild;
        if (swarm?.app?.engine?.ready && swarm?.app?.view?.root) {
          clearInterval(checkReady);
          const tourBtn = swarm.app.view.root.querySelector('[data-a="tour"]');
          if (tourBtn && !swarm.app.tour) {
            tourBtn.click();
          }
        }
      }, 70);
      setTimeout(() => clearInterval(checkReady), 10000);
    }
  }
};

export const ArrowSwarm: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const particlesRef = useRef<FloatingParticle[]>([]);
  const [isSwarmActive, setIsSwarmActive] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // ── Pre-load /swarm.js in background so clicking is instantaneous ──
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!(window as any).__swarmRebuild && !document.querySelector('script[data-swarm-script]')) {
        (window as any).__swarmNoAutoStart = true;
        const script = document.createElement('script');
        script.src = '/swarm.js';
        script.dataset.swarmScript = 'true';
        script.async = true;
        document.body.appendChild(script);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // ── Listen to Swarm lifecycle & global keyboard shortcut (Alt + Shift + S) ──
  useEffect(() => {
    const onSwarmStart = () => setIsSwarmActive(true);
    const onSwarmEnd = () => setIsSwarmActive(false);

    window.addEventListener('swarm:start', onSwarmStart);
    window.addEventListener('swarm:end', onSwarmEnd);

    const onKeyDown = (e: KeyboardEvent) => {
      // Alt + Shift + S (or Option + Shift + S)
      if (e.altKey && e.shiftKey && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        triggerSwarmRebuild({ tour: true });
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('swarm:start', onSwarmStart);
      window.removeEventListener('swarm:end', onSwarmEnd);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  // ── Ambient Floating Particles Canvas ──
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Skip ambient particle loop on touch screens or small mobile viewports
    // to preserve GPU memory and battery for Three.js and swarm rebuild
    const isTouchOnly = window.matchMedia('(pointer: coarse)').matches && !window.matchMedia('(pointer: fine)').matches;
    const isSmallScreen = window.innerWidth < 768;
    if (isTouchOnly || isSmallScreen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const setCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setCanvasSize();

    // Create particles
    const particles: FloatingParticle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const isCross = Math.random() < 0.5;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: 3.5 + Math.random() * 5.5,
        color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
        alpha: 0.35 + Math.random() * 0.35,
        baseAlpha: 0.35 + Math.random() * 0.35,
        shape: isCross ? 'cross' : 'triangle',
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        driftSpeed: 0.3 + Math.random() * 0.5,
      });
    }
    particlesRef.current = particles;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    const handleResize = () => setCanvasSize();

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize, { passive: true });

    const drawCross = (x: number, y: number, size: number, rotation: number, color: string, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.6;
      ctx.lineCap = 'round';

      ctx.beginPath();
      ctx.moveTo(-size, 0);
      ctx.lineTo(size, 0);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.lineTo(0, size);
      ctx.stroke();

      ctx.restore();
    };

    const drawTriangle = (x: number, y: number, size: number, rotation: number, color: string, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;

      ctx.beginPath();
      ctx.moveTo(size, 0);
      ctx.lineTo(-size * 0.6, -size * 0.55);
      ctx.lineTo(-size * 0.6, size * 0.55);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    let lastTime = performance.now();

    const render = (time: number) => {
      const rawDt = (time - lastTime) / 1000;
      const dt = Math.min(rawDt, 0.1);
      lastTime = time;
      const speedMult = 60 * dt;

      ctx.clearRect(0, 0, width, height);

      // Don't draw ambient particles while swarm rebuild canvas is active
      if (!isSwarmActive) {
        const mouse = mouseRef.current;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          if (mouse.active) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const distSq = dx * dx + dy * dy;
            const dist = Math.sqrt(distSq);

            if (dist < MOUSE_RADIUS && dist > 0) {
              const force = ((MOUSE_RADIUS - dist) / MOUSE_RADIUS) * PUSH_FORCE;
              p.vx += (dx / dist) * force * speedMult * 0.15;
              p.vy += (dy / dist) * force * speedMult * 0.15;
              p.alpha = Math.min(0.9, p.baseAlpha + (1 - dist / MOUSE_RADIUS) * 0.4);
            } else {
              p.alpha += (p.baseAlpha - p.alpha) * 0.05;
            }
          } else {
            p.alpha += (p.baseAlpha - p.alpha) * 0.05;
          }

          p.vx += (Math.random() - 0.5) * 0.035 * p.driftSpeed;
          p.vy += (Math.random() - 0.5) * 0.035 * p.driftSpeed;

          p.vx *= FRICTION;
          p.vy *= FRICTION;

          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (speed > 3.5) {
            p.vx = (p.vx / speed) * 3.5;
            p.vy = (p.vy / speed) * 3.5;
          }

          p.x += p.vx * speedMult;
          p.y += p.vy * speedMult;
          p.rotation += p.rotationSpeed * speedMult;

          const pad = p.size * 2;
          if (p.x < -pad) p.x = width + pad;
          else if (p.x > width + pad) p.x = -pad;
          if (p.y < -pad) p.y = height + pad;
          else if (p.y > height + pad) p.y = -pad;

          if (p.shape === 'cross') {
            drawCross(p.x, p.y, p.size, p.rotation, p.color, p.alpha);
          } else {
            drawTriangle(p.x, p.y, p.size, p.rotation, p.color, p.alpha);
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [isSwarmActive]);

  return (
    <>
      {/* Background Particles Canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-30"
      />

      {/* Persistent Floating "Rebuild UI" Trigger Pill (Bottom-Left) */}
      {!isSwarmActive && (
        <div className="fixed bottom-5 left-5 sm:bottom-7 sm:left-7 z-40 flex items-center gap-2 group">
          <button
            type="button"
            onClick={() => triggerSwarmRebuild({ tour: true })}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            aria-label="Rebuild UI with AI Agent Swarm (Alt+Shift+S)"
            className="flex items-center gap-2 px-3.5 py-2 rounded-full apple-glass-sheet border border-orange-500/35 hover:border-orange-500/80 bg-black/60 hover:bg-orange-950/40 text-white text-xs font-medium shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
          >
            {/* Pulsing Swarm Dot */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ee4405]"></span>
            </span>

            {/* Label */}
            <span className="font-mono text-[11px] sm:text-xs text-slate-200 group-hover:text-white transition-colors flex items-center gap-1.5">
              <span>✦ Rebuild UI</span>
            </span>

            {/* Shortcut Badge */}
            <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold bg-white/10 text-slate-400 group-hover:text-slate-200 border border-white/10">
              ⌥⇧S
            </span>
          </button>

          {/* Hover Tooltip */}
          {showTooltip && (
            <div className="hidden sm:block absolute left-full ml-2 px-3 py-1.5 rounded-lg bg-black/90 backdrop-blur-md border border-white/10 text-[11px] text-slate-300 whitespace-nowrap shadow-xl pointer-events-none animate-in fade-in duration-150">
              Watch multiplayer AI cursors rebuild the UI
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ArrowSwarm;
