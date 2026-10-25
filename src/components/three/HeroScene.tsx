import React, { useRef, Suspense, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Float, MeshDistortMaterial, ContactShadows, OrbitControls, Image as DreiImage, Sparkles, Html } from '@react-three/drei';
import * as THREE from 'three';
import { User, Bot, Sparkles as SparklesIcon } from 'lucide-react';

// 3D Spatial Hologram with Varshid's Real Photo
function PhotoHologram({ mousePos }: { mousePos: { x: number; y: number } }) {
  const cardGroupRef = useRef<THREE.Group>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!cardGroupRef.current) return;

    // Smooth 3D tilt tracking mouse
    const targetRotY = (mousePos.x * Math.PI) / 6;
    const targetRotX = -(mousePos.y * Math.PI) / 8;
    
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

  return (
    <group ref={cardGroupRef} position={[0, 0, 0]}>
      {/* Floating 3D Sparkle Dust */}
      <Sparkles count={45} scale={4.5} size={3.5} speed={0.6} color="#00f5d4" opacity={0.6} />

      {/* Outer 3D Gyro Rings */}
      <mesh ref={ringRef1} scale={2.5}>
        <torusGeometry args={[1, 0.015, 16, 80]} />
        <meshStandardMaterial
          color="#00f5d4"
          wireframe={true}
          emissive="#00f5d4"
          emissiveIntensity={0.6}
          transparent
          opacity={0.4}
        />
      </mesh>

      <mesh ref={ringRef2} scale={2.8}>
        <torusGeometry args={[1, 0.012, 16, 80]} />
        <meshStandardMaterial
          color="#38bdf8"
          wireframe={true}
          emissive="#38bdf8"
          emissiveIntensity={0.5}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Main 3D Card Glass Backing */}
      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[2.3, 3.1]} />
        <meshPhysicalMaterial
          color="#0d1424"
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
        <meshBasicMaterial color="#00f5d4" transparent opacity={0.3} wireframe />
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
      <Html position={[-1.2, 1.3, 0.35]} transform distanceFactor={3.5}>
        <div className="px-3 py-1 rounded-full glass-panel border border-accent/40 bg-surface/90 text-accent text-[11px] font-mono whitespace-nowrap shadow-[0_0_15px_rgba(0,245,212,0.3)] flex items-center gap-1.5 select-none pointer-events-none">
          <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
          <span>React Native Lead</span>
        </div>
      </Html>

      <Html position={[1.1, -1.2, 0.45]} transform distanceFactor={3.5}>
        <div className="px-3 py-1 rounded-full glass-panel border border-sky-400/40 bg-surface/90 text-sky-400 text-[11px] font-mono whitespace-nowrap shadow-[0_0_15px_rgba(56,189,248,0.3)] flex items-center gap-1.5 select-none pointer-events-none">
          <SparklesIcon className="w-3 h-3 text-sky-400" />
          <span>AI &amp; Mobile Architect</span>
        </div>
      </Html>

      <Html position={[-0.9, -1.3, 0.3]} transform distanceFactor={3.5}>
        <div className="px-2.5 py-1 rounded-full glass-panel border border-purple-400/40 bg-surface/90 text-purple-300 text-[10px] font-mono whitespace-nowrap shadow-[0_0_15px_rgba(168,85,247,0.25)] flex items-center gap-1 select-none pointer-events-none">
          <span>⚡ 6+ Years Exp</span>
        </div>
      </Html>
    </group>
  );
}

// 3D Avatar Model with Mouse-Look Tracking
function ModelAvatar({ mousePos }: { mousePos: { x: number; y: number } }) {
  const gltf = useGLTF('/models/character.glb');
  const groupRef = useRef<THREE.Group>(null);
  const headBoneRef = useRef<THREE.Bone | null>(null);

  useEffect(() => {
    if (!gltf.scene) return;
    
    gltf.scene.traverse((child: any) => {
      if (child.isBone && (child.name.toLowerCase().includes('head') || child.name.toLowerCase().includes('neck'))) {
        headBoneRef.current = child;
      }
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material.roughness = Math.max(0.4, child.material.roughness || 0.5);
        }
      }
    });
  }, [gltf]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const targetY = (mousePos.x * Math.PI) / 8;
    const targetX = -(mousePos.y * Math.PI) / 16;
    
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetY,
      3,
      delta
    );
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      targetX,
      3,
      delta
    );

    if (headBoneRef.current) {
      headBoneRef.current.rotation.y = THREE.MathUtils.damp(
        headBoneRef.current.rotation.y,
        (mousePos.x * Math.PI) / 6,
        4,
        delta
      );
      headBoneRef.current.rotation.x = THREE.MathUtils.damp(
        headBoneRef.current.rotation.x,
        (-mousePos.y * Math.PI) / 8,
        4,
        delta
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, -1.9, 0]} scale={1.85}>
      <primitive object={gltf.scene} />
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
          color="#00f5d4"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          emissive="#004d40"
          emissiveIntensity={0.4}
        />
      </mesh>
    </Float>
  );
}

export const HeroScene: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [viewMode, setViewMode] = useState<'photo' | 'avatar'>('photo');
  const containerRef = useRef<HTMLDivElement>(null);

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
    <div ref={containerRef} className="relative w-full h-full min-h-[440px] lg:min-h-[580px] flex items-center justify-center">
      {/* Ambient background glow behind 3D object */}
      <div className="absolute inset-0 bg-gradient-radial from-accent/15 via-transparent to-transparent blur-2xl pointer-events-none" />

      {/* Mode Switcher Pill in Top Right */}
      <div className="absolute top-4 right-4 z-30 flex items-center gap-1 p-1 rounded-full glass-panel border border-white/15 bg-black/60 shadow-lg">
        <button
          onClick={() => setViewMode('photo')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium transition-all ${
            viewMode === 'photo'
              ? 'bg-accent text-slate-950 font-bold shadow-[0_0_10px_rgba(0,245,212,0.4)]'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>3D Photo</span>
        </button>

        <button
          onClick={() => setViewMode('avatar')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium transition-all ${
            viewMode === 'avatar'
              ? 'bg-accent text-slate-950 font-bold shadow-[0_0_10px_rgba(0,245,212,0.4)]'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <Bot className="w-3.5 h-3.5" />
          <span>3D Rig</span>
        </button>
      </div>

      <Canvas
        camera={{ position: [0, 0, 4.4], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={1.3} />
        <directionalLight position={[5, 8, 5]} intensity={2.4} color="#ffffff" />
        <pointLight position={[-4, 3, 2]} intensity={2.5} color="#00f5d4" />
        <pointLight position={[4, -2, 2]} intensity={2} color="#38bdf8" />
        <spotLight position={[0, 6, 3]} angle={0.6} penumbra={1} intensity={2} color="#a855f7" />

        <Suspense fallback={<HologramCore />}>
          {viewMode === 'photo' ? (
            <PhotoHologram mousePos={mousePos} />
          ) : (
            <ModelAvatar mousePos={mousePos} />
          )}
        </Suspense>

        <ContactShadows
          position={[0, -2, 0]}
          opacity={0.65}
          scale={7}
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
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full glass-panel border border-white/10 text-[11px] font-mono text-slate-300 flex items-center gap-2 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <span>Spatial 3D Hologram • Interactive Mouse Tilt &amp; Drag</span>
      </div>
    </div>
  );
};

useGLTF.preload('/models/character.glb');
