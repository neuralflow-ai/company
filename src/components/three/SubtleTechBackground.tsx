import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SubtleTechBackgroundProps {
  intensity?: number;
  color?: string;
  opacity?: number;
}

const TechGrid = ({ intensity = 0.5, color = "#00c2ff", opacity = 0.3 }: SubtleTechBackgroundProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Create grid geometry
  const gridGeometry = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(50, 50, 20, 20);
    return geometry;
  }, []);

  // Create particles
  const particlesGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(100 * 3);
    
    for (let i = 0; i < 100; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.02;
    }
    
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <>
      {/* Wireframe grid */}
      <mesh ref={meshRef} position={[0, 0, -5]}>
        <primitive object={gridGeometry} />
        <meshBasicMaterial 
          color={color} 
          wireframe 
          transparent 
          opacity={opacity * 0.3}
        />
      </mesh>
      
      {/* Floating particles */}
      <points ref={particlesRef}>
        <primitive object={particlesGeometry} />
        <pointsMaterial 
          color={color} 
          size={0.05} 
          transparent 
          opacity={opacity * intensity}
        />
      </points>
    </>
  );
};

const SubtleTechBackground: React.FC<SubtleTechBackgroundProps> = ({ 
  intensity = 0.5, 
  color = "#00c2ff", 
  opacity = 0.3 
}) => {
  return (
    <div className="absolute inset-0 w-full h-full">
      {/* CSS Grid overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(${color}22 1px, transparent 1px),
            linear-gradient(90deg, ${color}22 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'subtle-grid-move 20s linear infinite'
        }}
      />
      
      {/* Three.js scene */}
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <TechGrid intensity={intensity} color={color} opacity={opacity} />
      </Canvas>
      
      {/* Subtle gradient overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${color}08, transparent 70%)`
        }}
      />
    </div>
  );
};

export default SubtleTechBackground;