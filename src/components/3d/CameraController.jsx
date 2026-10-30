// VELOCITY ONE — Camera & Orbit Controller
// Handles cinematic preset interpolation, user drag, and zoom limits

import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

export default function CameraController({
  activePreset,
  isRevealed,
  userInteracting,
  onInteractionStart,
  onInteractionEnd,
  resetTrigger,
}) {
  const { camera } = useThree();
  const controlsRef = useRef();
  const targetPosRef = useRef(new THREE.Vector3(4.6, 1.4, 4.8));
  const targetLookAtRef = useRef(new THREE.Vector3(0, 0.4, 0));
  const isTransitioningRef = useRef(false);

  // Handle Preset Changes
  useEffect(() => {
    if (activePreset) {
      targetPosRef.current.set(...activePreset.position);
      targetLookAtRef.current.set(...activePreset.target);
      isTransitioningRef.current = true;
    }
  }, [activePreset]);

  // Handle Reveal Camera Swoop
  useEffect(() => {
    if (isRevealed) {
      // Swoop to dynamic 3/4 hero stance
      targetPosRef.current.set(4.6, 1.4, 4.8);
      targetLookAtRef.current.set(0, 0.4, 0);
      isTransitioningRef.current = true;
    } else {
      // Low, mysterious dramatic starting angle with full car in view
      targetPosRef.current.set(4.2, 1.1, 4.5);
      targetLookAtRef.current.set(0, 0.35, 0);
      isTransitioningRef.current = true;
    }
  }, [isRevealed, resetTrigger]);

  // Smooth Camera Interpolation
  useFrame((_, delta) => {
    if (isTransitioningRef.current && controlsRef.current) {
      // Smoothly damp camera position towards target
      camera.position.lerp(targetPosRef.current, delta * 3.5);

      // Smoothly damp controls target
      controlsRef.current.target.lerp(targetLookAtRef.current, delta * 3.5);
      controlsRef.current.update();

      // Check if arrived
      if (
        camera.position.distanceTo(targetPosRef.current) < 0.05 &&
        controlsRef.current.target.distanceTo(targetLookAtRef.current) < 0.02
      ) {
        isTransitioningRef.current = false;
      }
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={true}
      minDistance={2.8}
      maxDistance={8.5}
      minPolarAngle={Math.PI / 4}
      maxPolarAngle={Math.PI / 2 - 0.04}
      enableDamping={true}
      dampingFactor={0.06}
      rotateSpeed={0.7}
      onStart={() => {
        isTransitioningRef.current = false;
        if (onInteractionStart) onInteractionStart();
      }}
      onEnd={() => {
        if (onInteractionEnd) onInteractionEnd();
      }}
    />
  );
}
