import React, { useRef, Suspense, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, ContactShadows, OrbitControls, Image as DreiImage, Sparkles, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Sparkles as SparklesIcon } from 'lucide-react';

// 3D Spatial Hologram with Varshid's Real Photo
function PhotoHologram({ mousePos, isMobile }: { mousePos: { x: number; y: number }; isMobile: boolean }) {
  const cardGroupRef = useRef<THREE.Group>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!cardGroupRef.current) return;

    // Smooth 3D tilt tracking mouse
    const targetRotY = (mousePos.x * Math.PI) / (isMobile ? 12 : 6);
    const targetRotX = -(mousePos.y * Math.PI) / (isMobile ? 14 : 8);
    
    cardGroupRef.current.rotation.y = THREE.MathUtils.damp(
      cardGroupRef.current.rotation.y,
      targetRotY,
      4,
      delta
    );
    cardGroupRef.current.rotation.x = THREE.MathUtils.damp(
      cardGroupRef.current.rotation.x,
      targetRotX,
      4,
      delta
    );

    const t = state.clock.getElapsedTime();
    if (ringRef1.current) {
      ringRef1.current.rotation.z = t * 0.3;
      ringRef1.current.rotation.x = Math.PI / 4 + Math.sin(t * 0.5) * 0.1;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.z = -t * 0.25;
      ringRef2.current.rotation.y = Math.PI / 3 + Math.cos(t * 0.4) * 0.1;
    }
  });

  const cardScale = isMobile ? 0.72 : 1;

  return (
    <group ref={cardGroupRef} position={[0, isMobile ? 0.1 : 0, 0]} scale={cardScale}>
      {/* Floating 3D Sparkle Dust */}
      <Sparkles count={isMobile ? 20 : 45} scale={3.8} size={2.8} speed={0.5} color="#ee4405" opacity={0.6} />

      {/* Outer 3D Gyro Rings */}
      <mesh ref={ringRef1} scale={2.4}>
        <torusGeometry args={[1, 0.015, 16, 80]} />
        <meshStandardMaterial
          color="#ee4405"
          wireframe={true}
          emissive="#ee4405"
          emissiveIntensity={0.6}
          transparent
          opacity={0.4}
        />
      </mesh>

      <mesh ref={ringRef2} scale={2.7}>
        <torusGeometry args={[1, 0.012, 16, 80]} />
        <meshStandardMaterial
          color="#ff7a45"
          wireframe={true}
          emissive="#ff7a45"
          emissiveIntensity={0.5}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Main 3D Card Glass Backing */}
      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[2.3, 3.1]} />
        <meshPhysicalMaterial
          color="#131516"
          roughness={0.15}
          metalness={0.2}
          transmission={0.4}
          thickness={0.5}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Glowing Border Frame */}
      <mesh position={[0, 0, -0.04]}>
        <ringGeometry args={[1.55, 1.6, 4]} />
        <meshBasicMaterial color="#ee4405" transparent opacity={0.3} wireframe />
      </mesh>

      {/* Varshid's Real Portrait Texture with Smooth Beveled Mask */}
      <Float speed={2} rotationIntensity={0.05} floatIntensity={0.1}>
        <DreiImage
          url="/varshid-shekhat.jpg"
          scale={[2.2, 3]}
          position={[0, 0, 0.02]}
          radius={0.18}
          transparent
        />
      </Float>

      {/* 3D Floating Parallax Badges around the portrait */}
      {isMobile ? (
        <>
          <Html position={[0, 1.35, 0.35]} center distanceFactor={4.5}>
            <div className="px-2.5 py-1 rounded-full glass-panel border border-white/10 bg-surface/95 text-white text-[10px] font-mono whitespace-nowrap shadow-sm flex items-center gap-1.5 select-none pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ee4405]" />
              <span>React Native Lead</span>
            </div>
          </Html>

          <Html position={[0, -1.35, 0.35]} center distanceFactor={4.5}>
            <div className="px-2.5 py-1 rounded-full glass-panel border border-white/10 bg-surface/95 text-slate-300 text-[10px] font-mono whitespace-nowrap shadow-sm flex items-center gap-1.5 select-none pointer-events-none">
              <SparklesIcon className="w-3 h-3 text-amber-300" />
              <span>AI &amp; Mobile Architect</span>
            </div>
          </Html>
        </>
      ) : (
        <>
          <Html position={[-1.15, 1.25, 0.35]} transform distanceFactor={3.5}>
            <div className="px-3 py-1 rounded-full glass-panel border border-white/10 bg-surface/90 text-white text-[11px] font-mono whitespace-nowrap shadow-sm flex items-center gap-1.5 select-none pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-[#ee4405]" />
              <span>React Native Lead</span>
            </div>
          </Html>

          <Html position={[1.05, -1.15, 0.45]} transform distanceFactor={3.5}>
            <div className="px-3 py-1 rounded-full glass-panel border border-white/10 bg-surface/90 text-slate-300 text-[11px] font-mono whitespace-nowrap shadow-sm flex items-center gap-1.5 select-none pointer-events-none">
              <SparklesIcon className="w-3 h-3 text-amber-300" />
              <span>AI &amp; Mobile Architect</span>
            </div>
          </Html>

          <Html position={[-0.85, -1.25, 0.3]} transform distanceFactor={3.5}>
            <div className="px-2.5 py-1 rounded-full glass-panel border border-white/10 bg-surface/90 text-slate-300 text-[10px] font-mono whitespace-nowrap shadow-sm flex items-center gap-1 select-none pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>6+ Years Exp</span>
            </div>
          </Html>
        </>
      )}
    </group>
  );
}

// Holographic geometric fallback
function HologramCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.25;
    meshRef.current.rotation.y = t * 0.35;
  });

  return (
    <Float speed={2.5} rotationIntensity={0.6} floatIntensity={0.8}>
      <mesh ref={meshRef} scale={1.8}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color="#ee4405"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          emissive="#450f00"
          emissiveIntensity={0.4}
        />
      </mesh>
    </Float>
  );
}

export const HeroScene: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      setMousePos({
        x: Math.max(-1, Math.min(1, x)),
        y: Math.max(-1, Math.min(1, y)),
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-full h-full min-h-[360px] sm:min-h-[440px] lg:min-h-[580px] flex items-center justify-center touch-pan-y overflow-hidden"
    >
      {/* Ambient background glow behind 3D object */}
      <div className="absolute inset-0 bg-gradient-radial from-accent/15 via-transparent to-transparent blur-2xl pointer-events-none overflow-hidden" />

      <Canvas
        camera={{ position: [0, 0, isMobile ? 4.6 : 4.4], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ touchAction: 'pan-y', overflow: 'hidden' }}
        className="w-full h-full cursor-grab active:cursor-grabbing overflow-hidden"
      >
        <ambientLight intensity={1.3} />
        <directionalLight position={[5, 8, 5]} intensity={2.4} color="#ffffff" />
        <pointLight position={[-4, 3, 2]} intensity={2.5} color="#ee4405" />
        <pointLight position={[4, -2, 2]} intensity={2} color="#fbbf24" />
        <spotLight position={[0, 6, 3]} angle={0.6} penumbra={1} intensity={2} color="#ee4405" />

        <Suspense fallback={<HologramCore />}>
          <PhotoHologram mousePos={mousePos} isMobile={isMobile} />
        </Suspense>

        <ContactShadows
          position={[0, isMobile ? -1.8 : -2, 0]}
          opacity={0.65}
          scale={6}
          blur={2.5}
          far={4}
          color="#000000"
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2 + 0.15}
          minPolarAngle={Math.PI / 3}
          maxAzimuthAngle={Math.PI / 3}
          minAzimuthAngle={-Math.PI / 3}
        />
      </Canvas>

      {/* Floating 3D Badge Indicator */}
      <div className="absolute bottom-2.5 sm:bottom-3 left-1/2 -translate-x-1/2 px-2.5 sm:px-3 py-1 rounded-full glass-panel border border-white/10 text-[9px] sm:text-[11px] font-mono text-slate-300 flex items-center gap-1.5 sm:gap-2 pointer-events-none whitespace-nowrap z-20">
        <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#ee4405] animate-pulse shrink-0" />
        <span className="hidden xs:inline">3D Spatial Viewport • </span>
        <span>Interactive Tilt</span>
      </div>
    </div>
  );
};
