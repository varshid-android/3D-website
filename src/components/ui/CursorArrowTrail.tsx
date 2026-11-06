import { useEffect, useRef } from 'react';

/**
 * CursorArrowTrail — Multi-coloured arrow cursor swarm trail.
 *
 * Spawns small triangular cursor-arrow particles on mouse movement.
 * Each particle has its own colour, velocity, rotation (aligned to
 * movement direction), lifetime, and fades + shrinks before removal.
 *
 * Uses HTML Canvas 2D + requestAnimationFrame.  No extra dependencies.
 *
 * Disabled on:
 *  • touch-only / mobile devices (no pointer:fine)
 *  • prefers-reduced-motion
 *
 * Canvas has pointer-events:none so it never blocks interaction.
 */

// ── Palette ──────────────────────────────────────────────
const COLORS = [
  '#00e5ff', // Cyan
  '#a855f7', // Purple
  '#ec4899', // Pink
  '#facc15', // Yellow
  '#22c55e', // Green
  '#f97316', // Orange
  '#38bdf8', // Sky blue
  '#e879f9', // Light magenta
  '#34d399', // Emerald
  '#fb7185', // Rose
];

// ── Tunables ─────────────────────────────────────────────
const MAX_PARTICLES = 180;
/** Minimum pointer travel (px) before spawning a new batch */
const SPAWN_DISTANCE_THRESHOLD = 6;
/** Particles to spawn per eligible move event */
const SPAWN_COUNT = 3;
/** Base lifetime in seconds */
const BASE_LIFETIME = 0.8;
/** Additional random lifetime */
const RANDOM_LIFETIME = 0.5;
/** Base arrow half-size in px */
const BASE_SIZE = 7;
/** Random extra size */
const RANDOM_SIZE = 4;
/** How far from the pointer particles may spawn (px) */
const SPAWN_SPREAD = 18;
/** Base speed given to each particle (px/s) */
const BASE_SPEED = 30;
/** Random extra speed */
const RANDOM_SPEED = 60;

// ── Types ────────────────────────────────────────────────
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;     // rad — aligned with movement dir
  rotationSpeed: number; // rad/s — subtle spin
  lifetime: number;     // total seconds
  age: number;          // seconds elapsed
}

// ── Component ────────────────────────────────────────────
export const CursorArrowTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // ── Bail on touch-only or reduced motion ──
    const prefersReducedMotion =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasFineMouse =
      window.matchMedia('(pointer: fine)').matches;

    if (prefersReducedMotion || !hasFineMouse) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // ── State ──
    const particles: Particle[] = [];
    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let lastSpawnX = -9999;
    let lastSpawnY = -9999;
    let rafId = 0;
    let lastTime = 0;
    let isSwarmActive = false;

    const onSwarmStart = () => {
      isSwarmActive = true;
      particles.length = 0;
      ctx.clearRect(0, 0, width, height);
    };
    const onSwarmEnd = () => {
      isSwarmActive = false;
    };
    window.addEventListener('swarm:start', onSwarmStart);
    window.addEventListener('swarm:end', onSwarmEnd);

    // ── Canvas sizing ──
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // ── Spawn helper ──
    const spawn = (px: number, py: number, dirX: number, dirY: number) => {
      const baseAngle = Math.atan2(dirY, dirX);

      for (let i = 0; i < SPAWN_COUNT; i++) {
        if (particles.length >= MAX_PARTICLES) {
          // Recycle the oldest particle
          particles.shift();
        }

        const angleOffset = (Math.random() - 0.5) * 1.2; // ±~35°
        const angle = baseAngle + angleOffset;
        const speed = BASE_SPEED + Math.random() * RANDOM_SPEED;

        const spreadX = (Math.random() - 0.5) * SPAWN_SPREAD * 2;
        const spreadY = (Math.random() - 0.5) * SPAWN_SPREAD * 2;

        particles.push({
          x: px + spreadX,
          y: py + spreadY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: BASE_SIZE + Math.random() * RANDOM_SIZE,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          rotation: angle, // point in travel direction
          rotationSpeed: (Math.random() - 0.5) * 2.0,
          lifetime: BASE_LIFETIME + Math.random() * RANDOM_LIFETIME,
          age: 0,
        });
      }
    };

    // ── Event handlers ──
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch' || isSwarmActive) return; // ignore touch or active swarm
      const px = e.clientX;
      const py = e.clientY;

      // Compute travel distance since last spawn
      const dx = px - lastSpawnX;
      const dy = py - lastSpawnY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist >= SPAWN_DISTANCE_THRESHOLD) {
        const dirLen = dist || 1;
        spawn(px, py, dx / dirLen, dy / dirLen);
        lastSpawnX = px;
        lastSpawnY = py;
      }
    };

    const onPointerLeave = () => {
      // Let remaining particles fade naturally
    };

    const onPointerEnter = () => {
      // Pointer is back — spawning resumes on next move
    };

    // ── Draw a single cursor-arrow shape ──
    //
    // Classic pointer-arrow silhouette pointing right (rotation=0):
    //
    //       ╱▏
    //      ╱ ▏
    //     ╱  ▏
    //    ╱  ╱
    //   ╱  ╱
    //  ╱ ╱
    // ╱╱
    //
    const drawArrow = (
      x: number,
      y: number,
      size: number,
      rotation: number,
      color: string,
      alpha: number,
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = alpha;

      // Arrow / pointer shape
      ctx.beginPath();
      // Tip (front)
      ctx.moveTo(size, 0);
      // Top-left wing
      ctx.lineTo(-size * 0.65, -size * 0.55);
      // Inner notch
      ctx.lineTo(-size * 0.25, 0);
      // Bottom-left wing
      ctx.lineTo(-size * 0.65, size * 0.55);
      ctx.closePath();

      // Subtle glow via shadow
      ctx.shadowColor = color;
      ctx.shadowBlur = 6;

      ctx.fillStyle = color;
      ctx.fill();

      // Thin brighter outline to make shape crisp
      ctx.shadowBlur = 0;
      ctx.globalAlpha = alpha * 0.5;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 0.5;
      ctx.stroke();

      ctx.restore();
    };

    // ── Animation loop ──
    const render = (time: number) => {
      if (lastTime === 0) lastTime = time;
      const rawDt = (time - lastTime) / 1000;
      const dt = Math.min(rawDt, 0.1); // cap at 100 ms
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // Update & draw alive particles (iterate backwards for safe splice)
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.age += dt;

        if (p.age >= p.lifetime) {
          particles.splice(i, 1);
          continue;
        }

        const progress = p.age / p.lifetime; // 0→1

        // Ease out decay curves
        const alphaCurve = 1 - progress * progress;        // fades gently then fast
        const sizeCurve = 1 - progress * progress * progress; // shrinks later

        // Slow down over time (gentle drag)
        const drag = 1 - dt * 2.5;
        p.vx *= drag;
        p.vy *= drag;

        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.rotation += p.rotationSpeed * dt;

        const currentSize = p.size * sizeCurve;
        const currentAlpha = alphaCurve * 0.85; // max 0.85 so never fully opaque

        if (currentSize < 0.5 || currentAlpha < 0.01) {
          particles.splice(i, 1);
          continue;
        }

        drawArrow(p.x, p.y, currentSize, p.rotation, p.color, currentAlpha);
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    // ── Pause on tab hidden ──
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
      } else {
        lastTime = 0;
        rafId = requestAnimationFrame(render);
      }
    };

    // ── Attach listeners ──
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('pointerenter', onPointerEnter);
    window.addEventListener('resize', resize, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);

    // ── Cleanup ──
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('swarm:start', onSwarmStart);
      window.removeEventListener('swarm:end', onSwarmEnd);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('pointerenter', onPointerEnter);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      role="presentation"
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9999 }}
    />
  );
};

export default CursorArrowTrail;
