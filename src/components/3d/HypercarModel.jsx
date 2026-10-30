// VELOCITY ONE — Interactive 3D Hypercar Component
// Supports real GLTF/GLB vehicle model with custom automotive shaders & fallback

import React, { useMemo, useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import ProceduralCarFallback from './ProceduralCarFallback';

function GLBCar({ paintColor, wheelColor, caliperColor, lightMode }) {
  const { scene } = useGLTF('/models/velocity_hypercar.glb');
  const carRef = useRef();

  // Create isolated materials for the vehicle
  const materials = useMemo(() => {
    const bodyMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(paintColor),
      metalness: 0.9,
      roughness: 0.18,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      reflectivity: 0.95,
      envMapIntensity: 1.2,
    });

    const rimMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(wheelColor),
      metalness: 0.95,
      roughness: 0.18,
      envMapIntensity: 1.0,
    });

    const caliperMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(caliperColor),
      metalness: 0.85,
      roughness: 0.25,
    });

    const carbonMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#121418'),
      roughness: 0.45,
      metalness: 0.8,
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#0d1117'),
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.88,
      transparent: true,
      opacity: 0.85,
      ior: 1.52,
    });

    const headlightMat = new THREE.MeshStandardMaterial({
      color: lightMode.headlights ? new THREE.Color('#ffffff') : new THREE.Color('#333333'),
      emissive: lightMode.headlights
        ? new THREE.Color('#f0f9ff')
        : lightMode.drl
        ? new THREE.Color('#ff5722')
        : new THREE.Color('#000000'),
      emissiveIntensity: lightMode.headlights ? 5.0 : lightMode.drl ? 3.0 : 0,
      roughness: 0.1,
    });

    const taillightMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#ff0033'),
      emissive: new THREE.Color('#ff0033'),
      emissiveIntensity: 3.5,
      roughness: 0.1,
    });

    const tireMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#141619'),
      roughness: 0.9,
      metalness: 0.05,
    });

    return { bodyMat, rimMat, caliperMat, carbonMat, glassMat, headlightMat, taillightMat, tireMat };
  }, [paintColor, wheelColor, caliperColor, lightMode]);

  // Clone scene on initial load
  const clonedScene = useMemo(() => {
    return scene.clone(true);
  }, [scene]);

  // Apply materials dynamically
  useEffect(() => {
    if (!clonedScene) return;

    clonedScene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        const name = (child.name || '').toLowerCase();
        const matName = (child.material?.name || '').toLowerCase();

        if (name === 'body' || matName.includes('body_color') || matName.includes('dodgerblue')) {
          child.material = materials.bodyMat;
        } else if (name.includes('rim_') || name.includes('centre')) {
          child.material = materials.rimMat;
        } else if (name.includes('brake')) {
          child.material = materials.caliperMat;
        } else if (name.includes('carbon')) {
          child.material = materials.carbonMat;
        } else if (name.includes('glass')) {
          child.material = materials.glassMat;
        } else if (name.includes('lights_red') || matName.includes('taillight')) {
          child.material = materials.taillightMat;
        } else if (name.includes('lights') || name.includes('leds') || matName.includes('projector') || matName.includes('turn_signal')) {
          child.material = materials.headlightMat;
        } else if (name.includes('tire')) {
          child.material = materials.tireMat;
        }
      }
    });
  }, [clonedScene, materials]);

  return (
    <group>
      <primitive
        ref={carRef}
        object={clonedScene}
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
        scale={[1, 1, 1]}
      />

      {/* Dynamic Laser Matrix Headlight Beams */}
      {lightMode?.headlights && (
        <group position={[0, 0.4, 2.1]}>
          <spotLight
            position={[-0.65, 0, 0]}
            angle={0.35}
            penumbra={0.5}
            intensity={90}
            color="#f0f9ff"
            distance={12}
          />
          <spotLight
            position={[0.65, 0, 0]}
            angle={0.35}
            penumbra={0.5}
            intensity={90}
            color="#f0f9ff"
            distance={12}
          />
        </group>
      )}
    </group>
  );
}

// Error Boundary & Robust Wrapper
export default class HypercarModel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn('3D Car GLB load notice, transitioning to procedural concept model:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ProceduralCarFallback {...this.props} />;
    }

    return (
      <React.Suspense fallback={<ProceduralCarFallback {...this.props} />}>
        <GLBCar {...this.props} />
      </React.Suspense>
    );
  }
}

// Preload the GLB model
useGLTF.preload('/models/velocity_hypercar.glb');
