import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text3D, OrbitControls, Sphere, Box, Environment, useTexture } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

// Floating 3D Elements Component
function FloatingElements() {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <group ref={group}>
      {/* Floating Spheres */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={0.5}>
        <Sphere args={[0.3]} position={[2, 1, -1]}>
          <meshStandardMaterial color="#3B82F6" metalness={0.7} roughness={0.2} />
        </Sphere>
      </Float>
      
      <Float speed={2} rotationIntensity={1.5} floatIntensity={0.8}>
        <Sphere args={[0.2]} position={[-2, -1, 0]}>
          <meshStandardMaterial color="#8B5CF6" metalness={0.8} roughness={0.1} />
        </Sphere>
      </Float>
      
      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={0.6}>
        <Box args={[0.4, 0.4, 0.4]} position={[1.5, -1.5, 1]}>
          <meshStandardMaterial color="#10B981" metalness={0.6} roughness={0.3} />
        </Box>
      </Float>
      
      <Float speed={1.2} rotationIntensity={2} floatIntensity={1}>
        <Box args={[0.25, 0.25, 0.25]} position={[-1.8, 1.2, 0.5]}>
          <meshStandardMaterial color="#F59E0B" metalness={0.9} roughness={0.1} />
        </Box>
      </Float>

      {/* Wireframe Elements */}
      <Float speed={1.6} rotationIntensity={1.2} floatIntensity={0.4}>
        <Sphere args={[0.5]} position={[0, 2, -2]}>
          <meshStandardMaterial color="#EC4899" wireframe />
        </Sphere>
      </Float>
    </group>
  );
}

// Animated 3D Text Component
function AnimatedText() {
  const textRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }
  });

  return (
    <Float speed={0.8} rotationIntensity={0.3} floatIntensity={0.2}>
      <Text3D
        ref={textRef}
        font="/fonts/helvetiker_regular.typeface.json"
        size={0.15}
        height={0.02}
        position={[0, 0, 1]}
      >
        AI
        <meshStandardMaterial 
          color="#3B82F6" 
          metalness={0.8} 
          roughness={0.2}
          emissive="#1E40AF"
          emissiveIntensity={0.3}
        />
      </Text3D>
    </Float>
  );
}

// Main Hero3D Component
export const Hero3D = ({ className = "" }: { className?: string }) => {
  return (
    <motion.div 
      className={`absolute inset-0 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ 
          background: 'transparent',
          pointerEvents: 'none'
        }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={1.5}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <pointLight position={[-10, -10, -10]} intensity={0.8} color="#3B82F6" />
          <pointLight position={[10, 10, 10]} intensity={0.6} color="#8B5CF6" />
          
          {/* 3D Elements */}
          <FloatingElements />
          <AnimatedText />
          
          {/* Environment */}
          <Environment preset="city" />
          
          {/* Optional Auto-Rotation */}
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            enableRotate={false}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
      
      {/* Gradient Overlays for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/10 via-transparent to-background/10 pointer-events-none" />
    </motion.div>
  );
};