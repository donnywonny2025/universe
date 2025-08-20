import React from 'react';
import * as THREE from 'three';

interface StarProps {
  position?: [number, number, number];
  size?: number;
  color?: string;
}

export function Star({ position = [0, 0, 0], size = 1, color = '#ffcc00' }: StarProps) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2}
        toneMapped={false}
      />
      <pointLight
        distance={100}
        intensity={1000}
        color={color}
      />
    </mesh>
  );
}