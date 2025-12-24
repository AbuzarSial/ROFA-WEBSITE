'use client'

import { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
]

export default function ScrollIndicator() {
  const [activeSection, setActiveSection] = useState('hero')
  const indicatorRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const dotsRef = useRef<(HTMLButtonElement | null)[]>([])

  const updateIndicatorPosition = (index: number) => {
    if (containerRef.current && indicatorRef.current && dotsRef.current[index]) {
      const dot = dotsRef.current[index]
      if (dot) {
        const containerRect = containerRef.current.getBoundingClientRect()
        const dotRect = dot.getBoundingClientRect()
        const offset = dotRect.top - containerRect.top - 6
        
        gsap.to(indicatorRef.current, {
          y: offset,
          duration: 0.6,
          ease: 'power2.out',
        })
      }
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      sections.forEach((section, index) => {
        ScrollTrigger.create({
          trigger: `#${section.id}`,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter: () => {
            setActiveSection(section.id)
            updateIndicatorPosition(index)
          },
          onEnterBack: () => {
            setActiveSection(section.id)
            updateIndicatorPosition(index)
          },
        })
      })
    })

    // Initial position
    setTimeout(() => {
      updateIndicatorPosition(0)
    }, 100)

    return () => ctx.revert()
  }, [])

  const handleDotClick = (sectionId: string, index: number) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 100 // Account for navbar
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - offset
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      })
      
      setActiveSection(sectionId)
      updateIndicatorPosition(index)
    }
  }

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
      <div ref={containerRef} className="relative flex flex-col gap-8 items-center">
        {/* Moving indicator line */}
        <div
          ref={indicatorRef}
          className="absolute left-1/2 -translate-x-1/2 w-0.5 h-14 bg-white rounded-full transition-all duration-500"
          style={{ top: 0 }}
        />
        
        {/* Section dots */}
        {sections.map((section, index) => (
          <button
            key={section.id}
            ref={(el) => (dotsRef.current[index] = el)}
            onClick={() => handleDotClick(section.id, index)}
            className={`relative group w-4 h-4 rounded-full border-2 transition-all duration-300 z-10 ${
              activeSection === section.id
                ? 'border-white bg-white scale-125 shadow-lg shadow-white/50'
                : 'border-white/30 bg-transparent hover:border-white/60 hover:scale-110'
            }`}
            aria-label={`Go to ${section.label}`}
          >
            {/* Tooltip */}
            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xs text-white/80 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {section.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
