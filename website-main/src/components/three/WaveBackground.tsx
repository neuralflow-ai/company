
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo, useState, useEffect } from 'react';

interface WaveBackgroundProps {
  color?: string;
  speed?: number;
  amplitude?: number;
  frequency?: number;
}

const WaveBackground = ({ color = '#ff00c1', speed = 1, amplitude = 0.3, frequency = 0.5 }: WaveBackgroundProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile device
    setIsMobile(window.innerWidth < 768);
    
    // Intersection observer for performance
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('wave-background-container');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  if (!isVisible) {
    return <div id="wave-background-container" className="absolute inset-0 z-0" />;
  }

  return (
    <div id="wave-background-container" className="absolute inset-0 z-0">
      <Canvas 
        camera={{ position: [0, 0, 3] }}
        performance={{ min: 0.5 }}
        frameloop="demand"
      >
        <ambientLight intensity={0.4} />
        <WaveMesh 
          color={color} 
          speed={speed} 
          amplitude={amplitude} 
          frequency={frequency}
          isMobile={isMobile}
        />
      </Canvas>
    </div>
  );
};

function WaveMesh({ 
  color, 
  speed, 
  amplitude, 
  frequency, 
  isMobile 
}: { 
  color: string; 
  speed: number; 
  amplitude: number; 
  frequency: number;
  isMobile: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  const geometry = useMemo(() => {
    // Reduce geometry complexity on mobile
    const segments = isMobile ? 16 : 24;
    const geo = new THREE.PlaneGeometry(8, 8, segments, segments);
    return geo;
  }, [isMobile]);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime() * speed;
      const positions = meshRef.current.geometry.attributes.position;
      
      // Optimize loop with reduced calculations
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const z = Math.sin(x * frequency + time) * Math.cos(y * frequency + time) * amplitude;
        positions.setZ(i, z);
      }
      
      positions.needsUpdate = true;
      meshRef.current.rotation.z += 0.001 * speed;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 4, 0, 0]}>
      <meshBasicMaterial color={color} wireframe transparent opacity={0.3} />
    </mesh>
  );
}

export default WaveBackground;
