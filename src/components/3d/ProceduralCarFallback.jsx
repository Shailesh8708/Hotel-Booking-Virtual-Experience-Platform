// VELOCITY ONE — High-Precision Procedural Concept Hypercar
// Designed as an aerodynamic concept vehicle with realistic automotive shaders

import React, { useRef } from 'react';
import * as THREE from 'three';

export default function ProceduralCarFallback({
  paintColor = '#ff5722',
  wheelColor = '#b0b5be',
  caliperColor = '#ff5722',
  lightMode = { headlights: true, drl: true, underglow: false },
}) {
  const groupRef = useRef();

  // Master Automotive Materials
  const carPaintMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(paintColor),
    metalness: 0.88,
    roughness: 0.2,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    reflectivity: 0.9,
  });

  const carbonMaterial = new THREE.MeshStandardMaterial({
    color: '#121418',
    roughness: 0.4,
    metalness: 0.8,
  });

  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: '#11151c',
    metalness: 0.1,
    roughness: 0.05,
    transmission: 0.85,
    transparent: true,
    opacity: 0.85,
    ior: 1.52,
  });

  const tireMaterial = new THREE.MeshStandardMaterial({
    color: '#15171a',
    roughness: 0.85,
    metalness: 0.1,
  });

  const rimMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(wheelColor),
    metalness: 0.92,
    roughness: 0.22,
  });

  const caliperMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(caliperColor),
    metalness: 0.8,
    roughness: 0.3,
  });

  const headlightMaterial = new THREE.MeshStandardMaterial({
    color: lightMode.headlights ? '#ffffff' : '#444444',
    emissive: lightMode.headlights ? new THREE.Color('#e0f2fe') : new THREE.Color('#000000'),
    emissiveIntensity: lightMode.headlights ? 4.5 : 0,
    roughness: 0.1,
  });

  const drlMaterial = new THREE.MeshStandardMaterial({
    color: lightMode.drl ? '#ff7733' : '#333333',
    emissive: lightMode.drl ? new THREE.Color('#ff5722') : new THREE.Color('#000000'),
    emissiveIntensity: lightMode.drl ? 3.5 : 0,
    roughness: 0.1,
  });

  const taillightMaterial = new THREE.MeshStandardMaterial({
    color: '#ff1100',
    emissive: new THREE.Color('#ff0022'),
    emissiveIntensity: 3.0,
    roughness: 0.1,
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} castShadow receiveShadow>
      {/* Lower Chassis / Carbon Undertray */}
      <mesh position={[0, 0.22, 0]} material={carbonMaterial} castShadow receiveShadow>
        <boxGeometry args={[1.9, 0.12, 4.4]} />
      </mesh>

      {/* Main Aerodynamic Monocoque Body */}
      <mesh position={[0, 0.42, 0]} material={carPaintMaterial} castShadow receiveShadow>
        <boxGeometry args={[1.82, 0.32, 4.2]} />
      </mesh>

      {/* Front Nose Wedge */}
      <mesh position={[0, 0.34, 1.9]} rotation={[0.22, 0, 0]} material={carPaintMaterial} castShadow>
        <boxGeometry args={[1.72, 0.24, 0.9]} />
      </mesh>

      {/* Front Carbon Splitter */}
      <mesh position={[0, 0.14, 2.15]} material={carbonMaterial} castShadow>
        <boxGeometry args={[1.95, 0.05, 0.4]} />
      </mesh>

      {/* Cockpit Canopy / Greenhouse */}
      <mesh position={[0, 0.72, -0.2]} material={glassMaterial} castShadow>
        <boxGeometry args={[1.3, 0.42, 1.9]} />
      </mesh>

      {/* Aerodynamic Roof Scoop */}
      <mesh position={[0, 0.95, -0.35]} material={carbonMaterial} castShadow>
        <boxGeometry args={[0.32, 0.08, 0.8]} />
      </mesh>

      {/* Rear Engine Deck & Haunches */}
      <mesh position={[0, 0.54, -1.25]} material={carPaintMaterial} castShadow>
        <boxGeometry args={[1.78, 0.32, 1.7]} />
      </mesh>

      {/* Rear Carbon Wing & Endplates */}
      <group position={[0, 0.88, -2.0]}>
        <mesh material={carbonMaterial} castShadow>
          <boxGeometry args={[1.86, 0.04, 0.38]} />
        </mesh>
        {/* Wing Struts */}
        <mesh position={[-0.45, -0.18, 0]} material={carbonMaterial}>
          <boxGeometry args={[0.04, 0.35, 0.18]} />
        </mesh>
        <mesh position={[0.45, -0.18, 0]} material={carbonMaterial}>
          <boxGeometry args={[0.04, 0.35, 0.18]} />
        </mesh>
      </group>

      {/* Rear Venturi Diffuser */}
      <mesh position={[0, 0.18, -2.1]} rotation={[-0.2, 0, 0]} material={carbonMaterial} castShadow>
        <boxGeometry args={[1.84, 0.15, 0.45]} />
      </mesh>

      {/* Front Laser Headlights */}
      <mesh position={[-0.68, 0.38, 2.05]} material={headlightMaterial}>
        <boxGeometry args={[0.3, 0.06, 0.12]} />
      </mesh>
      <mesh position={[0.68, 0.38, 2.05]} material={headlightMaterial}>
        <boxGeometry args={[0.3, 0.06, 0.12]} />
      </mesh>

      {/* Daytime Running Light (DRL) Blades */}
      <mesh position={[-0.7, 0.43, 2.06]} material={drlMaterial}>
        <boxGeometry args={[0.34, 0.02, 0.04]} />
      </mesh>
      <mesh position={[0.7, 0.43, 2.06]} material={drlMaterial}>
        <boxGeometry args={[0.34, 0.02, 0.04]} />
      </mesh>

      {/* Rear Continuous OLED Taillight Ribbon */}
      <mesh position={[0, 0.52, -2.15]} material={taillightMaterial}>
        <boxGeometry args={[1.75, 0.04, 0.05]} />
      </mesh>

      {/* Four Precision Wheels with Rims and Calipers */}
      {[
        [-0.98, 0.34, 1.35],  // Front Left
        [0.98, 0.34, 1.35],   // Front Right
        [-0.98, 0.36, -1.35], // Rear Left
        [0.98, 0.36, -1.35],  // Rear Right
      ].map((pos, idx) => (
        <group key={idx} position={pos}>
          {/* Tire */}
          <mesh rotation={[0, 0, Math.PI / 2]} material={tireMaterial} castShadow>
            <cylinderGeometry args={[0.35, 0.35, 0.26, 32]} />
          </mesh>
          {/* Wheel Rim */}
          <mesh rotation={[0, 0, Math.PI / 2]} material={rimMaterial}>
            <cylinderGeometry args={[0.26, 0.26, 0.27, 24]} />
          </mesh>
          {/* Brake Rotor Disc */}
          <mesh rotation={[0, 0, Math.PI / 2]} material={carbonMaterial}>
            <cylinderGeometry args={[0.2, 0.2, 0.05, 24]} />
          </mesh>
          {/* Brake Caliper */}
          <mesh position={[0, 0.12, 0.05]} material={caliperMaterial}>
            <boxGeometry args={[0.1, 0.1, 0.16]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

