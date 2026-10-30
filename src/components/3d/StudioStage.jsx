// VELOCITY ONE — Cinematic Automotive Studio Stage
// Sweeping spotlights, floor reflections, runway grid, and atmospheric particles

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function StudioStage({ isRevealed, lightMode }) {
  const sweepSpotRef = useRef();
  const spotlightTargetRef = useRef(new THREE.Object3D());
  const underglowLightRef = useRef();
  const particlesRef = useRef();

  // Create atmospheric dust / lighting particles
  const [particlePositions, particleCount] = useMemo(() => {
    const count = 120;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = Math.random() * 4.5 + 0.2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return [pos, count];
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Cinematic Spotlight Sweep
    if (sweepSpotRef.current && spotlightTargetRef.current) {
      if (!isRevealed) {
        // Dramatic slow sweeping arc over the covered car
        const angle = Math.sin(time * 0.8) * 1.8;
        sweepSpotRef.current.position.x = Math.sin(time * 0.8) * 4.2;
        sweepSpotRef.current.position.z = Math.cos(time * 0.8) * 3.5 + 2.0;
        sweepSpotRef.current.intensity = 160 + Math.sin(time * 2.0) * 30;
        spotlightTargetRef.current.position.x = angle * 0.6;
        spotlightTargetRef.current.position.z = 0;
      } else {
        // High-power focused key spotlight on the revealed hypercar
        sweepSpotRef.current.position.x = THREE.MathUtils.damp(sweepSpotRef.current.position.x, 4.2, 2.0, delta);
        sweepSpotRef.current.position.y = THREE.MathUtils.damp(sweepSpotRef.current.position.y, 6.2, 2.0, delta);
        sweepSpotRef.current.position.z = THREE.MathUtils.damp(sweepSpotRef.current.position.z, 4.5, 2.0, delta);
        sweepSpotRef.current.intensity = THREE.MathUtils.damp(sweepSpotRef.current.intensity, 220, 2.0, delta);
        spotlightTargetRef.current.position.set(0, 0.4, 0);
      }
    }

    // Dynamic Underglow
    if (underglowLightRef.current) {
      const targetIntensity = (lightMode?.underglow) ? 35 : 0;
      underglowLightRef.current.intensity = THREE.MathUtils.damp(
        underglowLightRef.current.intensity,
        targetIntensity,
        4.0,
        delta
      );
    }

    // Gentle particle drift
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += Math.sin(time + i) * 0.002;
        if (positions[i * 3 + 1] < 0.2) positions[i * 3 + 1] = 4.5;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Target for the Sweeping Spotlight */}
      <primitive object={spotlightTargetRef.current} />

      {/* Main Studio Key Directional Light */}
      <directionalLight
        position={[4, 8, 4]}
        intensity={isRevealed ? 2.6 : 2.2}
        color="#ffffff"
        castShadow
      />

      {/* Main Sweeping Key Spotlight */}
      <spotLight
        ref={sweepSpotRef}
        position={[0, 6.5, 3]}
        target={spotlightTargetRef.current}
        angle={0.65}
        penumbra={0.8}
        intensity={180}
        color="#ffffff"
        castShadow
        shadow-bias={-0.0001}
        shadow-mapSize={[1024, 1024]}
      />

      {/* Cool Silver Rim Light (Left) */}
      <directionalLight
        position={[-6, 4, -4]}
        intensity={isRevealed ? 2.8 : 1.2}
        color="#a5b4fc"
        castShadow
      />

      {/* Warm Electric Amber Accent Light (Right Rear) */}
      <directionalLight
        position={[6, 3.5, -3]}
        intensity={isRevealed ? 3.4 : 1.5}
        color="#ff7a00"
      />

      {/* Soft Top Down Fill Light */}
      <directionalLight
        position={[0, 8, 0]}
        intensity={isRevealed ? 1.4 : 0.6}
        color="#d1d5db"
      />

      {/* Subtle Ambient Light */}
      <ambientLight intensity={isRevealed ? 0.65 : 0.45} />

      {/* Dynamic Chassis Underglow PointLight */}
      <pointLight
        ref={underglowLightRef}
        position={[0, 0.08, 0]}
        color="#ff5722"
        distance={3.5}
        decay={2}
        intensity={0}
      />

      {/* Studio Stage Ground - Deep Obsidian with Soft Sheen */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[45, 45]} />
        <meshStandardMaterial
          color="#060709"
          roughness={0.25}
          metalness={0.85}
          envMapIntensity={0.6}
        />
      </mesh>

      {/* Stage Circular Dais */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]} receiveShadow>
        <circleGeometry args={[4.2, 64]} />
        <meshStandardMaterial
          color="#090b10"
          roughness={0.32}
          metalness={0.7}
        />
      </mesh>

      {/* Stage Circular Glowing Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.003, 0]}>
        <ringGeometry args={[4.18, 4.22, 64]} />
        <meshBasicMaterial
          color={isRevealed ? '#ff5722' : '#334155'}
          transparent
          opacity={isRevealed ? 0.8 : 0.25}
        />
      </mesh>

      {/* Center Runway Caliper Lines */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.004, 0]}>
        <planeGeometry args={[0.04, 8.0]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.08} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.004, 0]}>
        <planeGeometry args={[8.0, 0.04]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.08} />
      </mesh>

      {/* Atmospheric Dust / Volumetric Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color="#f8fafc"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
