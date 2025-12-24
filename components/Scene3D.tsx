'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function Particles({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const particlesRef = useRef<THREE.Points>(null)
  
  const particles = useMemo(() => {
    const count = 5000
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    for (let i = 0; i < count * 3; i += 3) {
      const radius = Math.random() * 25
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      
      positions[i] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i + 2] = radius * Math.cos(phi)
      
      const color = new THREE.Color()
      color.setHSL(0.6, 0.5, 0.5 + Math.random() * 0.5)
      colors[i] = color.r
      colors[i + 1] = color.g
      colors[i + 2] = color.b
    }
    
    return { positions, colors }
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.05 + mousePosition.y * 0.3
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.08 + mousePosition.x * 0.3
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.08} vertexColors transparent opacity={0.4} sizeAttenuation={true} />
    </points>
  )
}

function GeometricShape({ mousePosition, position, shape }: { mousePosition: { x: number; y: number }, position: [number, number, number], shape: 'torus' | 'octahedron' | 'tetrahedron' }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 + mousePosition.y * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 + mousePosition.x * 0.2
      meshRef.current.position.x = position[0] + mousePosition.x * 1.5
      meshRef.current.position.y = position[1] + mousePosition.y * 1.5 + Math.sin(state.clock.elapsedTime * 0.5) * 0.3
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      {shape === 'torus' && <torusGeometry args={[1.5, 0.4, 16, 100]} />}
      {shape === 'octahedron' && <octahedronGeometry args={[1.2, 0]} />}
      {shape === 'tetrahedron' && <tetrahedronGeometry args={[1.2, 0]} />}
      <MeshDistortMaterial
        color="#ffffff"
        emissive="#4a5568"
        emissiveIntensity={0.3}
        transparent
        opacity={0.12}
        distort={0.3}
        speed={2}
        roughness={0.1}
        metalness={0.8}
      />
    </mesh>
  )
}

function WireframeSphere({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15 + mousePosition.y * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2 + mousePosition.x * 0.2
      meshRef.current.position.x = mousePosition.x * 1
      meshRef.current.position.y = mousePosition.y * 1
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -8]}>
      <sphereGeometry args={[3, 32, 32]} />
      <meshBasicMaterial
        color="#ffffff"
        wireframe
        transparent
        opacity={0.1}
      />
    </mesh>
  )
}

function LightRays({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.1 + mousePosition.x * 0.2
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, -10]}>
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.cos(angle) * 4, Math.sin(angle) * 4, 0]}>
            <boxGeometry args={[0.05, 8, 0.05]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
          </mesh>
        )
      })}
    </group>
  )
}

export default function Scene3D() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setMousePosition({ x, y })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 10 + scrollY * 0.005], fov: 75 }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 10 + scrollY * 0.005]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.6} />
        <pointLight position={[-10, -10, -10]} intensity={0.4} />
        <directionalLight position={[0, 5, 5]} intensity={0.3} />
        
        <Particles mousePosition={mousePosition} />
        <WireframeSphere mousePosition={mousePosition} />
        <GeometricShape mousePosition={mousePosition} position={[-4, 2, -6]} shape="torus" />
        <GeometricShape mousePosition={mousePosition} position={[4, -2, -7]} shape="octahedron" />
        <GeometricShape mousePosition={mousePosition} position={[0, -3, -5]} shape="tetrahedron" />
        <LightRays mousePosition={mousePosition} />
      </Canvas>
    </div>
  )
}
