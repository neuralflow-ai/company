import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface UnifiedBackgroundProps {
  variant?: 'header' | 'full';
  intensity?: number;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  height?: string;
}

const FloatingElements = ({ 
  intensity = 0.8, 
  primaryColor = "#00c2ff", 
  secondaryColor = "#ff0080",
  accentColor = "#8b5cf6",
  variant = 'full'
}: Omit<UnifiedBackgroundProps, 'height'>) => {
  const groupRef = useRef<THREE.Group>(null);
  const elementsRef = useRef<THREE.Mesh[]>([]);

  const elements = useMemo(() => {
    const items = [];
    const count = variant === 'header' ? Math.floor(8 * intensity) : Math.floor(15 * intensity);
    
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 0.4 + 0.1;
      const x = (Math.random() - 0.5) * (variant === 'header' ? 25 : 35);
      const y = (Math.random() - 0.5) * (variant === 'header' ? 12 : 20);
      const z = (Math.random() - 0.5) * 15;
      
      const shapeType = Math.floor(Math.random() * 4);
      let geometry;
      
      switch (shapeType) {
        case 0:
          geometry = new THREE.SphereGeometry(size, 12, 12);
          break;
        case 1:
          geometry = new THREE.BoxGeometry(size, size, size);
          break;
        case 2:
          geometry = new THREE.OctahedronGeometry(size);
          break;
        default:
          geometry = new THREE.TetrahedronGeometry(size);
      }
      
      const colors = [primaryColor, secondaryColor, accentColor];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      items.push({
        geometry,
        position: [x, y, z],
        color,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        floatSpeed: (Math.random() - 0.5) * 0.01,
        scale: size,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
    
    return items;
  }, [intensity, primaryColor, secondaryColor, accentColor, variant]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.08) * 0.08;
    }
    
    elementsRef.current.forEach((mesh, index) => {
      if (mesh) {
        const element = elements[index];
        mesh.rotation.x += element.rotationSpeed;
        mesh.rotation.y += element.rotationSpeed * 0.7;
        mesh.position.y += Math.sin(state.clock.elapsedTime + index) * element.floatSpeed;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {elements.map((element, index) => (
        <mesh
          key={index}
          ref={(ref) => {
            if (ref) elementsRef.current[index] = ref;
          }}
          position={element.position as [number, number, number]}
          scale={element.scale}
        >
          <primitive object={element.geometry} />
          <meshBasicMaterial
            color={element.color}
            transparent
            opacity={element.opacity}
          />
        </mesh>
      ))}
    </group>
  );
};

const UnifiedBackground: React.FC<UnifiedBackgroundProps> = ({ 
  variant = 'full',
  intensity = 0.8, 
  primaryColor = "#00c2ff", 
  secondaryColor = "#ff0080",
  accentColor = "#8b5cf6",
  height = "100vh"
}) => {
  const containerClass = variant === 'header' 
    ? "absolute inset-x-0 top-0 w-full overflow-hidden"
    : "absolute inset-0 w-full h-full overflow-hidden";

  return (
    <div 
      className={containerClass}
      style={variant === 'header' ? { height } : {}}
    >
      {/* Gradient Background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 30% 70%, ${primaryColor}12 0%, transparent 50%),
            radial-gradient(circle at 70% 30%, ${secondaryColor}12 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, ${accentColor}08 0%, transparent 50%),
            linear-gradient(180deg, 
              rgba(15, 23, 42, 0.95) 0%, 
              rgba(30, 41, 59, 0.8) 50%,
              rgba(15, 23, 42, 0.95) 100%
            )
          `
        }}
      />
      
      {/* Animated gradient overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `
            radial-gradient(circle at 50% 30%, ${primaryColor}15 0%, transparent 60%)
          `,
          animation: 'pulse-glow 10s ease-in-out infinite'
        }}
      />
      
      {/* Three.js floating elements */}
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[8, 8, 8]} intensity={0.4} color={primaryColor} />
        <pointLight position={[-8, -8, -8]} intensity={0.3} color={secondaryColor} />
        <FloatingElements 
          variant={variant}
          intensity={intensity}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          accentColor={accentColor}
        />
      </Canvas>
      
      {/* Bottom fade for header variant */}
      {variant === 'header' && (
        <div 
          className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
          style={{
            background: `
              linear-gradient(180deg, 
                transparent 0%, 
                rgba(15, 23, 42, 0.3) 50%,
                rgba(15, 23, 42, 0.8) 100%
              )
            `
          }}
        />
      )}
    </div>
  );
};

export default UnifiedBackground;