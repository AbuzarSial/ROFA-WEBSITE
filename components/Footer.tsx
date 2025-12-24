'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(footerRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      })
    }, footerRef)

    return () => ctx.revert()
  }, [])

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    e.preventDefault()
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleLinkHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      y: -2,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const handleLinkLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      y: 0,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  return (
    <footer ref={footerRef} className="py-8 sm:py-12 px-4 sm:px-6 md:px-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
          <div className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
            © {new Date().getFullYear()} ROFA AI. All rights reserved.
          </div>
          <div className="flex gap-4 sm:gap-6">
            {[
              { name: 'Twitter', url: 'https://twitter.com/rofa', icon: '𝕏' },
              { name: 'LinkedIn', url: 'https://linkedin.com/company/rofa', icon: 'in' },
              { name: 'GitHub', url: 'https://github.com/rofa', icon: '⚡' },
            ].map((social, index) => (
              <a
                key={index}
                href={social.url}
                onClick={(e) => handleLinkClick(e, social.url)}
                onMouseEnter={handleLinkHover}
                onMouseLeave={handleLinkLeave}
                className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1.5 sm:gap-2 group relative"
              >
                <span className="text-base sm:text-lg">{social.icon}</span>
                <span className="hidden sm:inline">{social.name}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

