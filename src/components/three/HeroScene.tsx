import React, { useRef, Suspense, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Float, MeshDistortMaterial, ContactShadows, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Fallback stylized 3D Holographic Core if GLB is unavailable or loading
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
          wireframe={false}
          emissive="#004d40"
          emissiveIntensity={0.4}
        />
      </mesh>
      {/* Outer Wireframe Ring */}
      <mesh scale={2.4} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1, 0.02, 16, 100]} />
        <meshStandardMaterial color="#38bdf8" wireframe={true} emissive="#0284c7" emissiveIntensity={0.8} />
      </mesh>
    </Float>
  );
}

// 3D Avatar Model with Mouse-Look Tracking
function ModelAvatar({ mousePos }: { mousePos: { x: number; y: number } }) {
  const gltf = useGLTF('/models/character.glb');
  const groupRef = useRef<THREE.Group>(null);
  const headBoneRef = useRef<THREE.Bone | null>(null);

  useEffect(() => {
    if (!gltf.scene) return;
    
    // Find Head / Neck bone for interactive gaze
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

    // Smooth whole-body subtle turn towards cursor
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

    // Subtle head tracking if bone discovered
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

// Safe wrapper to load avatar or fallback gracefully
function SceneContent({ mousePos }: { mousePos: { x: number; y: number } }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return <HologramCore />;
  }

  return (
    <Suspense fallback={<HologramCore />}>
      <ErrorBoundary onCatch={() => setHasError(true)}>
        <ModelAvatar mousePos={mousePos} />
      </ErrorBoundary>
    </Suspense>
  );
}

class ErrorBoundary extends React.Component<{ onCatch: () => void; children: React.ReactNode }> {
  componentDidCatch() {
    this.props.onCatch();
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  state = { hasError: false };
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

export const HeroScene: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
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
    <div ref={containerRef} className="relative w-full h-full min-h-[420px] lg:min-h-[560px] flex items-center justify-center">
      {/* Ambient background glow behind 3D object */}
      <div className="absolute inset-0 bg-gradient-radial from-accent/15 via-transparent to-transparent blur-2xl pointer-events-none" />

      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 8, 5]} intensity={2.2} color="#ffffff" />
        <pointLight position={[-4, 3, -2]} intensity={2} color="#00f5d4" />
        <pointLight position={[4, -2, -2]} intensity={1.5} color="#38bdf8" />
        <spotLight position={[0, 6, 2]} angle={0.6} penumbra={1} intensity={2} color="#ec4899" />

        <SceneContent mousePos={mousePos} />

        <ContactShadows
          position={[0, -1.9, 0]}
          opacity={0.6}
          scale={7}
          blur={2.5}
          far={4}
          color="#000000"
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2 + 0.1}
          minPolarAngle={Math.PI / 3}
          maxAzimuthAngle={Math.PI / 3}
          minAzimuthAngle={-Math.PI / 3}
        />
      </Canvas>

      {/* Floating 3D Badge Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full glass-panel border border-white/10 text-[11px] font-mono text-slate-300 flex items-center gap-2 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <span>Interactive 3D Viewport • Drag to rotate</span>
      </div>
    </div>
  );
};

// Preload GLTF model
useGLTF.preload('/models/character.glb');
