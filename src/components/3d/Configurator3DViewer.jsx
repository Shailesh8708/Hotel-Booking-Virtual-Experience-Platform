// VELOCITY ONE — Interactive 3D Turntable for Bespoke Studio Configurator

import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import HypercarModel from './HypercarModel';

export default function Configurator3DViewer({
  paintColor,
  wheelColor,
  caliperColor,
  lightMode,
}) {
  const controlsRef = useRef();

  return (
    <div className="relative w-full h-[360px] sm:h-[440px] rounded-sm overflow-hidden bg-[#07090d] border border-white/10 select-none cursor-grab active:cursor-grabbing">
      {/* Top Floating Telemetry Overlay */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#ff5722] animate-pulse" />
        <span className="font-mono text-[10px] tracking-widest uppercase text-white/80 bg-black/60 px-2.5 py-1 rounded-sm border border-white/10 backdrop-blur-md">
          LIVE BESPOKE 3D TURNTABLE
        </span>
      </div>

      <div className="absolute top-4 right-4 z-10 font-mono text-[9px] tracking-widest uppercase text-neutral-400 bg-black/60 px-2.5 py-1 rounded-sm border border-white/10 backdrop-blur-md hidden sm:block">
        DRAG TO ROTATE 360° // SCROLL TO ZOOM
      </div>

      <Suspense
        fallback={
          <div className="absolute inset-0 flex items-center justify-center bg-[#07090d]">
            <div className="font-mono text-xs uppercase tracking-widest text-neutral-400">
              Loading 3D Turntable...
            </div>
          </div>
        }
      >
        <Canvas
          shadows
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.05,
          }}
          camera={{ position: [3.6, 1.2, 3.8], fov: 36 }}
        >
          <Environment resolution={256}>
            <group rotation={[-Math.PI / 3, 0, 1]}>
              <Lightformer form="rect" intensity={4} position={[0, 6, -6]} scale={[12, 4, 1]} color="#ffffff" />
              <Lightformer form="rect" intensity={3} position={[-8, 3, 0]} scale={[10, 2, 1]} color="#93c5fd" />
              <Lightformer form="rect" intensity={3} position={[8, 3, 0]} scale={[10, 2, 1]} color="#ff7a00" />
            </group>
          </Environment>

          {/* Studio Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 6, 4]} intensity={2.2} castShadow color="#ffffff" />
          <directionalLight position={[-5, 4, -3]} intensity={1.5} color="#93c5fd" />
          <directionalLight position={[0, 4, -5]} intensity={2.0} color="#ff7700" />

          {/* Dais Reflector Floor */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
            <circleGeometry args={[4.5, 64]} />
            <meshStandardMaterial color="#0b0d13" roughness={0.3} metalness={0.7} />
          </mesh>

          {/* Glowing Outer Ring */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
            <ringGeometry args={[4.45, 4.5, 64]} />
            <meshBasicMaterial color="#ff5722" transparent opacity={0.6} />
          </mesh>

          {/* Hypercar Model */}
          <HypercarModel
            paintColor={paintColor}
            wheelColor={wheelColor}
            caliperColor={caliperColor}
            lightMode={lightMode}
          />

          {/* Orbit Controls with gentle Auto-Rotate */}
          <OrbitControls
            ref={controlsRef}
            enablePan={false}
            enableZoom={true}
            minDistance={2.8}
            maxDistance={7.0}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2 - 0.05}
            autoRotate={true}
            autoRotateSpeed={0.6}
            dampingFactor={0.06}
          />
        </Canvas>
      </Suspense>
    </div>
  );
}
