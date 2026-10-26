import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  color: string;
  glowColor: string;
  pulseSpeed: number;
  pulsePhase: number;
  isSpecialNode?: boolean;
}

export const LiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({
    x: -1000,
    y: -1000,
    targetX: -1000,
    targetY: -1000,
    active: false,
    radius: 190,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // High DPI support with 1.5 cap for smooth 60/120fps performance
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const colors = [
      { fill: 'rgba(238, 68, 5, ', glow: 'rgba(238, 68, 5, 0.9)' },    // Flame Orange
      { fill: 'rgba(251, 146, 60, ', glow: 'rgba(251, 146, 60, 0.85)' }, // Radiant Amber
      { fill: 'rgba(254, 215, 170, ', glow: 'rgba(254, 215, 170, 0.9)' }, // Golden Star
      { fill: 'rgba(255, 90, 31, ', glow: 'rgba(255, 90, 31, 0.85)' },  // Neon Orange
      { fill: 'rgba(255, 255, 255, ', glow: 'rgba(255, 255, 255, 0.95)' }, // Starlight White
    ];

    const isMobile = width < 768;
    const particleCount = isMobile ? 48 : 88;
    const connectionDistance = isMobile ? 95 : 135;
    const mouseRadius = isMobile ? 140 : 190;
    mouseRef.current.radius = mouseRadius;

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const palette = colors[Math.floor(Math.random() * colors.length)];
      const isSpecial = i % 9 === 0; // Every 9th particle is a glowing major star/node
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55,
        radius: isSpecial ? Math.random() * 1.5 + 2.8 : Math.random() * 1.6 + 1.2,
        baseAlpha: isSpecial ? 0.75 : Math.random() * 0.4 + 0.45,
        alpha: isSpecial ? 0.85 : Math.random() * 0.4 + 0.45,
        color: palette.fill,
        glowColor: palette.glow,
        pulseSpeed: Math.random() * 0.03 + 0.015,
        pulsePhase: Math.random() * Math.PI * 2,
        isSpecialNode: isSpecial,
      });
    }

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Smooth mouse damping
      const mouse = mouseRef.current;
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.12;
        mouse.y += (mouse.targetY - mouse.y) * 0.12;
      } else {
        mouse.x = -1000;
        mouse.y = -1000;
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Draw dynamic interactive cursor radiant energy aura
      if (mouse.active && mouse.x > 0 && mouse.y > 0) {
        const cursorGlow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouse.radius * 1.3
        );
        cursorGlow.addColorStop(0, 'rgba(238, 68, 5, 0.16)');
        cursorGlow.addColorStop(0.4, 'rgba(249, 115, 22, 0.07)');
        cursorGlow.addColorStop(0.8, 'rgba(238, 68, 5, 0.02)');
        cursorGlow.addColorStop(1, 'transparent');

        ctx.fillStyle = cursorGlow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius * 1.3, 0, Math.PI * 2);
        ctx.fill();

        // Delicate interactive ripple ring around cursor
        const pulseRing = (time * 0.002) % 1;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 25 + pulseRing * 45, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(251, 146, 60, ${(1 - pulseRing) * 0.28})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // 2. Update & Draw Particles & Constellation Web
      const speedMultiplier = 60 * dt;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move particle
        p.x += p.vx * speedMultiplier;
        p.y += p.vy * speedMultiplier;

        // Wrap around boundaries
        if (p.x < -15) p.x = width + 15;
        else if (p.x > width + 15) p.x = -15;
        if (p.y < -15) p.y = height + 15;
        else if (p.y > height + 15) p.y = -15;

        // Mouse interactive physics (gentle attraction / soft deflection)
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius && dist > 0) {
            const force = (1 - dist / mouse.radius) * 1.1;
            p.x += (dx / dist) * force * speedMultiplier;
            p.y += (dy / dist) * force * speedMultiplier;
          }
        }

        // Pulse alpha
        p.pulsePhase += p.pulseSpeed;
        p.alpha = Math.max(0.2, Math.min(1, p.baseAlpha + Math.sin(p.pulsePhase) * 0.25));

        // Draw particle with glowing halo
        ctx.save();
        ctx.shadowBlur = p.isSpecialNode ? 14 : 7;
        ctx.shadowColor = p.glowColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();

        // If it's a major node, draw a subtle outer glowing ring
        if (p.isSpecialNode) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius + 3.5, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(251, 146, 60, ${p.alpha * 0.4})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
        ctx.restore();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const lineAlpha = (1 - dist / connectionDistance) * 0.32;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(238, 68, 5, ${lineAlpha})`;
            ctx.lineWidth = p.isSpecialNode || p2.isSpecialNode ? 1.2 : 0.85;
            ctx.stroke();
          }
        }

        // Connect particle to mouse if nearby with bright radiant thread
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const lineAlpha = (1 - dist / mouse.radius) * 0.48;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(251, 146, 60, ${lineAlpha})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
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
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibility);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#010000]"
    >
      {/* Dynamic Ambient Living Glowing Orbs (Vibrant Warm Flame Atmosphere) */}
      <div className="absolute -top-[12%] -left-[10%] w-[60vw] h-[60vw] max-w-[850px] max-h-[850px] rounded-full bg-gradient-radial from-[#ee4405]/32 via-[#ff5400]/16 to-transparent blur-[85px] animate-live-orb-1 transform-gpu pointer-events-none" />

      <div className="absolute top-[30%] -right-[12%] w-[55vw] h-[55vw] max-w-[800px] max-h-[800px] rounded-full bg-gradient-radial from-[#ea580c]/28 via-[#c2410c]/14 to-transparent blur-[95px] animate-live-orb-2 transform-gpu pointer-events-none" />

      <div className="absolute top-[65%] -left-[8%] w-[50vw] h-[50vw] max-w-[750px] max-h-[750px] rounded-full bg-gradient-radial from-[#e11d48]/22 via-[#ee4405]/12 to-transparent blur-[90px] animate-live-orb-1 transform-gpu pointer-events-none" />

      <div className="absolute -bottom-[12%] left-[25%] w-[65vw] h-[65vw] max-w-[950px] max-h-[950px] rounded-full bg-gradient-radial from-[#c2410c]/25 via-[#7c2d12]/12 to-transparent blur-[105px] animate-live-orb-3 transform-gpu pointer-events-none" />

      {/* Center Subtle Warm Amber Ambient Breathing Flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[50vh] rounded-full bg-gradient-radial from-[#ee4405]/10 via-[#ea580c]/4 to-transparent blur-[120px] pointer-events-none" />

      {/* Living High-Tech Cyber Grid */}
      <div className="absolute inset-0 bg-live-grid opacity-85 pointer-events-none" />

      {/* Cyber Sweep Scan Beam */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#ee4405]/[0.035] to-transparent animate-scan-beam pointer-events-none" />

      {/* Interactive Glowing Constellation Starfield Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />
    </div>
  );
};
