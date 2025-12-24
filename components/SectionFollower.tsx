'use client'

import { useEffect, useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

function FloatingElement({ viewportY, mousePosition }: { viewportY: number, mousePosition: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const targetYRef = useRef<number>(0)

  useEffect(() => {
    targetYRef.current = viewportY
  }, [viewportY])

  useFrame((state, delta) => {
    if (meshRef.current && groupRef.current) {
      // Smoothly lerp to target Y position
      const lerpSpeed = Math.min(delta * 8, 1)
      groupRef.current.position.y += (targetYRef.current - groupRef.current.position.y) * lerpSpeed
      
      // Clamp Y to ensure it never goes outside visible range (-2.5 to 2.5)
      groupRef.current.position.y = Math.max(-2.5, Math.min(2.5, groupRef.current.position.y))
      
      // Fixed X position on left side with subtle mouse offset
      groupRef.current.position.x = -6 + mousePosition.x * 0.3
      groupRef.current.position.z = 0

      // Continuous rotation
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4
      
      // Subtle floating animation on mesh (relative to group, not absolute)
      const floatOffset = Math.sin(state.clock.elapsedTime * 0.8) * 0.2
      meshRef.current.position.y = floatOffset
    }
  })

  return (
    <group ref={groupRef} position={[-6, 0, 0]}>
      <mesh ref={meshRef}>
        <torusGeometry args={[2.5, 0.6, 16, 100]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#6366f1"
          emissiveIntensity={0.6}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.4}
        />
      </mesh>
      {/* Additional inner element */}
      <mesh position={[0, 0, 0]}>
        <octahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#8b5cf6"
          emissiveIntensity={0.7}
          transparent
          opacity={0.3}
          wireframe
        />
      </mesh>
      {/* Glowing particles around it */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.cos(angle) * 3.5, Math.sin(angle) * 3.5, 0]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#6366f1"
              emissiveIntensity={0.9}
              transparent
              opacity={0.5}
            />
          </mesh>
        )
      })}
    </group>
  )
}

export default function SectionFollower() {
  const [viewportY, setViewportY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    // Calculate Y position based on what's currently in the center of the viewport
    const updateViewportY = () => {
      const viewportHeight = window.innerHeight
      const viewportCenter = viewportHeight / 2
      const scrollY = window.scrollY
      
      // Find which section is closest to the viewport center
      const sections = ['hero', 'work', 'about', 'services', 'contact']
      let closestSection = 'hero'
      let minDistance = Infinity
      
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          const sectionCenterY = rect.top + rect.height / 2
          const distance = Math.abs(sectionCenterY - viewportCenter)
          
          if (distance < minDistance) {
            minDistance = distance
            closestSection = sectionId
          }
        }
      })
      
      // Get the section that's closest to center
      const activeElement = document.getElementById(closestSection)
      if (activeElement) {
        const rect = activeElement.getBoundingClientRect()
        const sectionCenterY = rect.top + rect.height / 2
        const viewportCenterY = viewportHeight / 2
        
        // Calculate offset from viewport center
        // Map to Three.js coordinates: viewport center = 0
        const offsetFromCenter = (sectionCenterY - viewportCenterY) / viewportHeight
        // Use smaller scale factor to keep it more centered and visible
        const threeY = offsetFromCenter * 2.5 // Reduced scale for safer range
        
        // Clamp to safe visible range (-2 to 2) - very conservative
        const clampedY = Math.max(-2, Math.min(2, threeY))
        setViewportY(clampedY)
      } else {
        // Fallback: use scroll progress
        const documentHeight = Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight
        )
        const scrollableHeight = documentHeight - viewportHeight
        if (scrollableHeight > 0) {
          const progress = scrollY / scrollableHeight
          const threeY = (progress - 0.5) * 4 // Map to -2 to 2 range
          setViewportY(Math.max(-2, Math.min(2, threeY)))
        }
      }
    }

    // Initial calculation
    updateViewportY()

    // Update on scroll with throttling
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateViewportY()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', updateViewportY)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateViewportY)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-20 pointer-events-none" style={{ willChange: 'transform', visibility: 'visible', opacity: 1 }}>
      <Canvas
        gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
        camera={{ position: [0, 0, 10], fov: 75 }}
        style={{ width: '100%', height: '100%', display: 'block' }}
        dpr={[1, 2]}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <directionalLight position={[0, 5, 5]} intensity={0.4} />
        
        <FloatingElement viewportY={viewportY} mousePosition={mousePosition} />
      </Canvas>
    </div>
  )
}
