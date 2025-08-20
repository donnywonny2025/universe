import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface MarsProps {
  position?: [number, number, number];
  orbitRadius?: number;
  speed?: number;
}

export function Mars({
  position = [10, 0, -5],
  orbitRadius = 10,
  speed = 0.2,
}: MarsProps) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    meshRef.current.position.x = Math.cos(elapsedTime * speed) * orbitRadius;
    meshRef.current.position.z = Math.sin(elapsedTime * speed) * orbitRadius;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.4, 32, 32]} />
      <meshStandardMaterial
        color="#c1440e"
        emissive="#c1440e"
        emissiveIntensity={0.3}
        toneMapped={false}
      />
    </mesh>
  );
}