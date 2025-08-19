import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface TechBackgroundProps {
  intensity?: number;
  color?: string;
  secondaryColor?: string;
}

const TechBackground = ({ 
  intensity = 1, 
  color = '#00c2ff', 
  secondaryColor = '#ff0080' 
}: TechBackgroundProps) => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <FloatingElements color={color} secondaryColor={secondaryColor} intensity={intensity} />
        <CircuitLines color={color} intensity={intensity} />
        <DataParticles color={color} secondaryColor={secondaryColor} />
      </Canvas>
      
      {/* CSS Grid Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(${color}40 1px, transparent 1px),
              linear-gradient(90deg, ${color}40 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'grid-move 20s linear infinite'
          }}
        />
      </div>
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-background/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
    </div>
  );
};

// Floating geometric elements
function FloatingElements({ color, secondaryColor, intensity }: { 
  color: string; 
  secondaryColor: string; 
  intensity: number; 
}) {
  const groupRef = useRef<THREE.Group>(null!);
  
  const elements = useMemo(() => {
    const items = [];
    const count = Math.floor(15 * intensity);
    
    for (let i = 0; i < count; i++) {
      items.push({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10
        ],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        ],
        scale: 0.1 + Math.random() * 0.3,
        type: Math.floor(Math.random() * 4), // 0: cube, 1: octahedron, 2: tetrahedron, 3: torus
        speed: 0.01 + Math.random() * 0.02,
        color: Math.random() > 0.7 ? secondaryColor : color
      });
    }
    
    return items;
  }, [intensity, color, secondaryColor]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
      groupRef.current.children.forEach((child, i) => {
        const element = elements[i];
        child.rotation.x += element.speed;
        child.rotation.y += element.speed * 0.7;
        child.rotation.z += element.speed * 0.5;
        
        // Floating motion
        child.position.y += Math.sin(state.clock.elapsedTime + i) * 0.001;
      });
    }
  });

  const renderGeometry = (type: number) => {
    switch (type) {
      case 0:
        return <boxGeometry args={[1, 1, 1]} />;
      case 1:
        return <octahedronGeometry args={[1]} />;
      case 2:
        return <tetrahedronGeometry args={[1]} />;
      case 3:
        return <torusGeometry args={[1, 0.3, 8, 16]} />;
      default:
        return <boxGeometry args={[1, 1, 1]} />;
    }
  };

  return (
    <group ref={groupRef}>
      {elements.map((element, i) => (
        <mesh
          key={i}
          position={element.position as [number, number, number]}
          rotation={element.rotation as [number, number, number]}
          scale={element.scale}
        >
          {renderGeometry(element.type)}
          <meshBasicMaterial 
            color={element.color} 
            transparent 
            opacity={0.6}
            wireframe={Math.random() > 0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

// Circuit-like connecting lines
function CircuitLines({ color, intensity }: { color: string; intensity: number }) {
  const linesRef = useRef<THREE.LineSegments>(null!);
  
  const { geometry, material } = useMemo(() => {
    const points = [];
    const lineCount = Math.floor(30 * intensity);
    
    for (let i = 0; i < lineCount; i++) {
      // Create L-shaped circuit lines
      const startX = (Math.random() - 0.5) * 15;
      const startY = (Math.random() - 0.5) * 15;
      const startZ = (Math.random() - 0.5) * 5;
      
      const midX = startX + (Math.random() - 0.5) * 3;
      const midY = startY;
      const midZ = startZ;
      
      const endX = midX;
      const endY = startY + (Math.random() - 0.5) * 3;
      const endZ = startZ;
      
      points.push(
        new THREE.Vector3(startX, startY, startZ),
        new THREE.Vector3(midX, midY, midZ),
        new THREE.Vector3(midX, midY, midZ),
        new THREE.Vector3(endX, endY, endZ)
      );
    }
    
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ 
      color: color, 
      transparent: true, 
      opacity: 0.4 
    });
    
    return { geometry, material };
  }, [color, intensity]);

  useFrame(() => {
    if (linesRef.current) {
      linesRef.current.rotation.z += 0.001;
    }
  });

  return <lineSegments ref={linesRef} geometry={geometry} material={material} />;
}

// Data flow particles
function DataParticles({ color, secondaryColor }: { color: string; secondaryColor: string }) {
  const particlesRef = useRef<THREE.Points>(null!);
  
  const { geometry, material } = useMemo(() => {
    const particleCount = 100;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    const colorObj1 = new THREE.Color(color);
    const colorObj2 = new THREE.Color(secondaryColor);
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      
      const useSecondary = Math.random() > 0.8;
      const selectedColor = useSecondary ? colorObj2 : colorObj1;
      
      colors[i * 3] = selectedColor.r;
      colors[i * 3 + 1] = selectedColor.g;
      colors[i * 3 + 2] = selectedColor.b;
    }
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    
    return { geometry, material };
  }, [color, secondaryColor]);

  useFrame((state) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime + i) * 0.01;
        positions[i] += Math.cos(state.clock.elapsedTime + i * 0.1) * 0.005;
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
      particlesRef.current.rotation.y += 0.001;
    }
  });

  return <points ref={particlesRef} geometry={geometry} material={material} />;
}

export default TechBackground;