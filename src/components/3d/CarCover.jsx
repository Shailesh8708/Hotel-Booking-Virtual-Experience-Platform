// VELOCITY ONE — Parametric Aerodynamic Automotive Silk Cover
// Unveil sequence: dynamically lifts, ripples, and dissolves backward into the rafters

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function CarCover({ isRevealed }) {
  const meshRef = useRef();
  const clothMatRef = useRef();
  const transitionRef = useRef(isRevealed ? 1 : 0);

  // High-density parametric draped geometry
  const geometry = useMemo(() => {
    // Sculpted capsule-like canopy draped over hypercar profile
    const geom = new THREE.CylinderGeometry(0.85, 1.15, 4.7, 36, 24, false);
    geom.rotateX(Math.PI / 2);
    geom.scale(1.15, 0.55, 1.0);
    geom.translate(0, 0.55, 0);

    // Add organic draped ripples along vertices
    const pos = geom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const z = pos.getZ(i);
      const x = pos.getX(i);

      // Skirt flare touching ground
      if (y < 0.2) {
        pos.setX(i, x * 1.18);
        pos.setY(i, Math.max(0.02, y));
      }
      // Sculpted cabin dip
      if (Math.abs(z) < 0.5 && y > 0.8) {
        pos.setY(i, y * 1.08);
      }
      // Rear spoiler mound
      if (z < -1.4 && y > 0.5) {
        pos.setY(i, y * 1.15);
      }
    }
    geom.computeVertexNormals();
    return geom;
  }, []);

  // Luxurious Satin Fabric Material with Metallic Graphite Silk Sheen
  const material = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#4c5566'),
      roughness: 0.28,
      metalness: 0.72,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      transparent: true,
      opacity: isRevealed ? 0 : 0.98,
      side: THREE.DoubleSide,
      depthWrite: !isRevealed,
    });
  }, []);

  useFrame((state, delta) => {
    const target = isRevealed ? 1 : 0;
    // Smooth transition
    transitionRef.current = THREE.MathUtils.damp(
      transitionRef.current,
      target,
      2.8,
      delta
    );

    const t = transitionRef.current;

    if (meshRef.current && clothMatRef.current) {
      // Lift upward and sweep backwards as it floats off
      meshRef.current.position.y = t * 4.5;
      meshRef.current.position.z = -t * 3.2;
      meshRef.current.rotation.x = -t * 0.45;
      meshRef.current.scale.set(
        1 + t * 0.35,
        1 + t * 0.25,
        1 + t * 0.4
      );

      // Fade opacity
      const opacity = THREE.MathUtils.clamp(1 - t * 1.6, 0, 0.98);
      clothMatRef.current.opacity = opacity;
      clothMatRef.current.depthWrite = opacity > 0.5;

      // Subtle resting ripple when covered
      if (t < 0.1) {
        const time = state.clock.getElapsedTime();
        meshRef.current.position.y = Math.sin(time * 1.5) * 0.008;
      }

      // Hide mesh when fully dissolved
      meshRef.current.visible = opacity > 0.005;
    }
  });

  return (
    <group ref={meshRef}>
      <mesh
        geometry={geometry}
        castShadow
        receiveShadow
      >
        <primitive ref={clothMatRef} object={material} attach="material" />
      </mesh>
      {/* Dynamic Laser Seam along Centerline */}
      <mesh position={[0, 0.65, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.035, 4.2]} />
        <meshBasicMaterial color="#ff5722" transparent opacity={isRevealed ? 0 : 0.75} />
      </mesh>
    </group>
  );
}
