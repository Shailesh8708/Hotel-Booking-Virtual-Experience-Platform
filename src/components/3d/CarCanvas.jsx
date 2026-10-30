// VELOCITY ONE — Master 3D Viewport & Canvas
// Optimized for desktop spectacle, 60fps mobile responsiveness, and progressive loading

import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import HypercarModel from './HypercarModel';
import CarCover from './CarCover';
import StudioStage from './StudioStage';
import CameraController from './CameraController';

function LoadingScreen() {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#050608]/90 backdrop-blur-md">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 border-2 border-white/10 border-t-[#ff5722] rounded-full animate-spin" />
        <div className="font-mono text-xs uppercase tracking-widest text-white/70">
          Calibrating Telemetry &amp; Shaders...
        </div>
      </div>
    </div>
  );
}

export default function CarCanvas({
  isRevealed,
  activePreset,
  paintColor,
  wheelColor,
  caliperColor,
  lightMode,
  resetTrigger,
  onUserInteract,
}) {
  const [webglSupported, setWebglSupported] = useState(true);

  // Check WebGL compatibility
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebglSupported(false);
    } catch {
      setWebglSupported(false);
    }
  }, []);

  if (!webglSupported) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#06070a] p-8 text-center">
        <h3 className="font-editorial text-2xl font-bold text-white mb-3">HARDWARE ACCELERATION NOTICE</h3>
        <p className="font-display text-sm text-neutral-400 max-w-md">
          WebGL is disabled or unsupported on your browser. Please enable hardware acceleration to experience the interactive 3D studio.
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full select-none cursor-grab active:cursor-grabbing">
      <Suspense fallback={<LoadingScreen />}>
        <Canvas
          shadows
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.1,
          }}
          camera={{
            position: [4.6, 1.4, 4.8],
            fov: 44,
            near: 0.1,
            far: 50,
          }}
          onCreated={({ gl }) => {
            gl.setClearColor('#050608', 1);
          }}
        >
          {/* Pure Procedural Studio Softbox Reflections — Zero Network Dependency */}
          <Environment resolution={256}>
            <group rotation={[-Math.PI / 3, 0, 1]}>
              <Lightformer form="rect" intensity={4} position={[0, 6, -6]} scale={[12, 4, 1]} color="#ffffff" />
              <Lightformer form="rect" intensity={3} position={[-8, 3, 0]} scale={[10, 2, 1]} color="#93c5fd" />
              <Lightformer form="rect" intensity={3} position={[8, 3, 0]} scale={[10, 2, 1]} color="#ff7a00" />
              <Lightformer form="circle" intensity={5} position={[0, 8, 0]} scale={4} color="#ffffff" />
            </group>
          </Environment>

          {/* Cinematic Studio Lighting, Reflector Floor & Particles */}
          <StudioStage isRevealed={isRevealed} lightMode={lightMode} />

          {/* The Hypercar (GLB or Procedural Fallback) */}
          <HypercarModel
            paintColor={paintColor}
            wheelColor={wheelColor}
            caliperColor={caliperColor}
            lightMode={lightMode}
          />

          {/* Dynamic Aerodynamic Satin Cover */}
          <CarCover isRevealed={isRevealed} />

          {/* Interactive Camera & Orbit Controls */}
          <CameraController
            activePreset={activePreset}
            isRevealed={isRevealed}
            onInteractionStart={onUserInteract}
            resetTrigger={resetTrigger}
          />
        </Canvas>
      </Suspense>
    </div>
  );
}
