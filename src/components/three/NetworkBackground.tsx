
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';

interface NetworkBackgroundProps {
  nodeCount?: number;
  color?: string;
}

const NetworkBackground = ({ nodeCount = 50, color = '#00c2ff' }: NetworkBackgroundProps) => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <NetworkNodes count={nodeCount} color={color} />
      </Canvas>
    </div>
  );
};

function NetworkNodes({ count, color }: { count: number; color: string }) {
  const groupRef = useRef<THREE.Group>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);

  const { nodes, connections } = useMemo(() => {
    const nodes = [];
    const connections = [];

    for (let i = 0; i < count; i++) {
      nodes.push({
        x: (Math.random() - 0.5) * 6,
        y: (Math.random() - 0.5) * 6,
        z: (Math.random() - 0.5) * 6,
      });
    }

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = Math.sqrt(
          Math.pow(nodes[i].x - nodes[j].x, 2) +
          Math.pow(nodes[i].y - nodes[j].y, 2) +
          Math.pow(nodes[i].z - nodes[j].z, 2)
        );
        
        if (distance < 2) {
          connections.push(nodes[i], nodes[j]);
        }
      }
    }

    return { nodes, connections };
  }, [count]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
      groupRef.current.rotation.x += 0.002;
    }
  });

  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(connections.length * 3);
    
    connections.forEach((node, i) => {
      positions[i * 3] = node.x;
      positions[i * 3 + 1] = node.y;
      positions[i * 3 + 2] = node.z;
    });
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [connections]);

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <mesh key={i} position={[node.x, node.y, node.z]}>
          <sphereGeometry args={[0.05]} />
          <meshBasicMaterial color={color} />
        </mesh>
      ))}
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial color={color} transparent opacity={0.3} />
      </lineSegments>
    </group>
  );
}

export default NetworkBackground;
