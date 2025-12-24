'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function ProgressBar() {
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          if (progressRef.current) {
            gsap.to(progressRef.current, {
              width: `${self.progress * 100}%`,
              duration: 0.1,
              ease: 'none',
            })
          }
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-white/10 z-50">
      <div
        ref={progressRef}
        className="h-full bg-gradient-to-r from-white/50 to-white transition-all duration-300"
        style={{ width: '0%' }}
      />
    </div>
  )
}

