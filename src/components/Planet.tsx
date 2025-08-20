import React from 'react';
import * as THREE from 'three';

interface PlanetProps {
  position?: [number, number, number];
  size?: number;
  color?: string;
}

export function Planet({ position = [5, 0, 0], size = 0.5, color = '#0099ff' }: PlanetProps) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        toneMapped={false}
      />
    </mesh>
  );
}