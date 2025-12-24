'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { showToast } from './Toast'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface ProjectTechStack {
  frontend?: string[]
  backend?: string[]
  infrastructure?: string[]
  tools?: string[]
}

interface Project {
  title: string
  year: string
  description: string
  longDescription: string
  tags: string[]
  image: string
  image2: string
  link: string
  category: string
  results: string[]
  client: string
  techStack?: ProjectTechStack
}

const projects: Project[] = [
  {
    title: 'OWASP Redesign',
    year: '2024',
    description: 'Complete transformation of OWASP\'s global web presence, focusing on community engagement and improved user experience.',
    longDescription: 'This project involved a complete overhaul of OWASP\'s digital ecosystem. We conducted extensive user research with security professionals worldwide, redesigned the information architecture to improve content discoverability, and implemented a modern design system that reflects OWASP\'s mission. The new platform features a headless CMS architecture using Next.js 14 with App Router, TypeScript for type safety, and Tailwind CSS for styling. We integrated MDX for content management, allowing security researchers to write technical documentation with ease. The backend leverages Supabase for real-time data synchronization and user authentication, while Cloudflare provides global CDN distribution and edge computing capabilities. The site features advanced search functionality using Algolia, automated CI/CD pipelines with GitHub Actions, and comprehensive analytics integration.',
    tags: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'MDX', 'Supabase', 'Cloudflare', 'Algolia', 'GitHub Actions'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop&q=80',
    image2: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&q=80',
    link: '#',
    category: 'Web Development',
    results: ['40% increase in engagement', '60% reduction in bounce rate', '3x faster load times', '95% Lighthouse score'],
    client: 'OWASP Foundation',
    techStack: {
      frontend: ['Next.js 14', 'React 18', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'React Query'],
      backend: ['Supabase', 'PostgreSQL', 'Edge Functions', 'Real-time Subscriptions'],
      infrastructure: ['Cloudflare Pages', 'Cloudflare Workers', 'CDN', 'Edge Computing'],
      tools: ['MDX', 'Algolia Search', 'GitHub Actions', 'Vercel Analytics', 'Sentry'],
    },
  },
  {
    title: 'AI Platform',
    year: '2024',
    description: 'Enterprise AI solution with intuitive interface and powerful capabilities. Built with React and Node.js, featuring advanced machine learning integration.',
    longDescription: 'We developed a comprehensive AI platform that democratizes access to machine learning capabilities. The platform features a no-code interface for building custom AI models, real-time data processing pipelines, and seamless integration with existing business systems.',
    tags: ['React', 'Node.js', 'AI/ML', 'TensorFlow'],
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&h=800&fit=crop&q=80',
    image2: 'https://images.unsplash.com/photo-1676299080923-7e740c5b95a4?w=1200&h=800&fit=crop&q=80',
    link: '#',
    category: 'AI/ML',
    results: ['200+ enterprise clients', '99.9% uptime', '10M+ API calls/day'],
    client: 'TechCorp Inc.',
  },
  {
    title: 'Mobile App',
    year: '2023',
    description: 'Cross-platform mobile application with native performance. Developed using Flutter and Dart, integrated with Firebase for real-time data synchronization.',
    longDescription: 'We created a feature-rich mobile application that works flawlessly across iOS and Android platforms. Using Flutter and Dart, we achieved native performance while maintaining a single codebase. The app features real-time synchronization with Firebase, offline-first architecture, and push notifications.',
    tags: ['Flutter', 'Dart', 'Firebase', 'iOS/Android'],
    image: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=1200&h=800&fit=crop&q=80',
    image2: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=800&fit=crop&q=80',
    link: '#',
    category: 'Mobile',
    results: ['1M+ downloads', '4.8-star rating', '50% faster development'],
    client: 'StartupXYZ',
  },
]

export default function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [selectedProject, setSelectedProject] = useState<number | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.from('.project-card', {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: projectsRef.current,
          start: 'top 75%',
          end: 'bottom 25%',
          toggleActions: 'play none none reverse',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    setHoveredIndex(index)
    const card = e.currentTarget.querySelector('.card-3d')
    if (card) {
      gsap.to(card, {
        y: -15,
        rotateX: 5,
        rotateY: -5,
        scale: 1.03,
        duration: 0.5,
        ease: 'power3.out',
      })
    }
  }

  const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setHoveredIndex(null)
    const card = e.currentTarget.querySelector('.card-3d')
    if (card) {
      gsap.to(card, {
        y: 0,
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.5,
        ease: 'power3.out',
      })
    }
  }

  const handleCardMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (hoveredIndex === null) return
    const card = e.currentTarget.querySelector('.card-3d')
    if (!card) return
    
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateX = ((y - centerY) / centerY) * -10
    const rotateY = ((x - centerX) / centerX) * 10
    
    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const handleViewCaseStudy = (e: React.MouseEvent<HTMLElement>, index: number) => {
    e.stopPropagation()
    setSelectedProject(index)
    
    const modal = document.getElementById('project-modal')
    if (modal) {
      gsap.fromTo('.modal-overlay', 
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      )
      gsap.fromTo('.modal-content',
        { scale: 0.8, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
      )
      modal.style.display = 'flex'
    }
  }

  const handleCloseModal = () => {
    gsap.to('.modal-content', {
      scale: 0.8,
      opacity: 0,
      y: 50,
      duration: 0.3,
      onComplete: () => {
        const modal = document.getElementById('project-modal')
        if (modal) {
          modal.style.display = 'none'
        }
        setSelectedProject(null)
      }
    })
    gsap.to('.modal-overlay', {
      opacity: 0,
      duration: 0.3,
    })
  }

  // Keyboard shortcuts for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedProject !== null) {
        handleCloseModal()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedProject])

  return (
    <>
      <section ref={sectionRef} id="work" className="py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 md:mb-20 gap-4">
            <h2
              ref={titleRef}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight"
            >
              Selected Work
            </h2>
            <span className="text-sm text-gray-500 hidden md:block">Scroll to explore →</span>
          </div>
          <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="project-card group relative cursor-pointer"
                onMouseEnter={(e) => handleCardHover(e, index)}
                onMouseLeave={handleCardLeave}
                onMouseMove={handleCardMove}
                onClick={(e) => handleViewCaseStudy(e, index)}
              >
                <div
                  className="card-3d relative h-[400px] sm:h-[450px] md:h-[500px] rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-black/20 transition-all duration-500"
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* 3D Card Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Image Section */}
                  <div className="relative h-2/3 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/1200x800/000000/FFFFFF?text=ROFA'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    
                    {/* Badges */}
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex flex-col gap-2">
                      <span className="px-2 sm:px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs text-white border border-white/30 font-medium">
                        {project.category}
                      </span>
                      <span className="px-2 sm:px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs text-white border border-white/30 font-medium">
                        {project.year}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/95 to-black/60 backdrop-blur-sm">
                    <h3 className="text-xl sm:text-2xl font-medium mb-1 sm:mb-2 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-all duration-300">
                      {project.title}
                    </h3>
                    <p className="text-white/70 text-xs sm:text-sm mb-2 sm:mb-4">{project.client}</p>
                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                      {project.tags.slice(0, 2).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-0.5 sm:py-1 text-xs bg-white/10 border border-white/20 rounded-full text-gray-300 group-hover:border-white/40 group-hover:text-white transition-all"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 2 && (
                        <span className="px-2 py-0.5 sm:py-1 text-xs bg-white/10 border border-white/20 rounded-full text-gray-300">
                          +{project.tags.length - 2}
                        </span>
                      )}
                    </div>

                    {/* Results Preview */}
                    <div className="flex gap-2 mb-3 sm:mb-4">
                      {project.results.slice(0, 2).map((result, resultIndex) => (
                        <div
                          key={resultIndex}
                          className="flex-1 text-center p-1.5 sm:p-2 bg-white/5 rounded-lg border border-white/10 group-hover:border-white/20 transition-all"
                        >
                          <p className="text-xs text-gray-400">{result.split(' ')[0]}</p>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-white/80 group-hover:text-white transition-colors">
                      <span>View Case Study</span>
                      <span className="text-base sm:text-lg group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>

                  {/* 3D Shadow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Project Modal */}
      <div
        id="project-modal"
        className="modal-overlay fixed inset-0 z-50 hidden items-center justify-center p-4"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.95)' }}
        onClick={handleCloseModal}
      >
        <div
          className="modal-content bg-black border border-white/20 rounded-2xl p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {selectedProject !== null && (
            <>
              <div className="flex flex-col sm:flex-row justify-between items-start mb-4 sm:mb-6 gap-4">
                <div>
                  <span className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider mb-1 sm:mb-2 block">
                    {projects[selectedProject].category} • {projects[selectedProject].year}
                  </span>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-medium mb-1 sm:mb-2">{projects[selectedProject].title}</h3>
                  <p className="text-sm sm:text-base text-gray-400">Client: {projects[selectedProject].client}</p>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="text-white hover:text-gray-400 text-xl sm:text-2xl transition-colors self-end sm:self-auto"
                >
                  ×
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <img
                  src={projects[selectedProject].image}
                  alt={projects[selectedProject].title}
                  className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/1200x800/000000/FFFFFF?text=ROFA'
                  }}
                />
                <img
                  src={projects[selectedProject].image2}
                  alt={projects[selectedProject].title}
                  className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/1200x800/000000/FFFFFF?text=ROFA'
                  }}
                />
              </div>
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h4 className="text-lg sm:text-xl font-medium mb-2 sm:mb-3">Overview</h4>
                  <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
                    {projects[selectedProject].longDescription}
                  </p>
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-medium mb-2 sm:mb-3">Key Results</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                    {projects[selectedProject].results.map((result, resultIndex) => (
                      <div
                        key={resultIndex}
                        className="p-3 sm:p-4 bg-white/5 border border-white/10 rounded-lg"
                      >
                        <p className="text-xs sm:text-sm text-gray-300">{result}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-medium mb-3">Technologies</h4>
                  <div className="flex flex-wrap gap-3">
                    {projects[selectedProject].tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-4 py-1.5 text-xs border border-white/20 rounded-full text-gray-400 hover:border-white/40 hover:text-white transition-all cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {projects[selectedProject].techStack && (
                  <div className="space-y-4">
                    <h4 className="text-xl font-medium mb-3">Tech Stack Breakdown</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                        <h5 className="text-sm font-medium text-gray-300 mb-2">Frontend</h5>
                        <div className="flex flex-wrap gap-2">
                          {projects[selectedProject].techStack?.frontend.map((tech, i) => (
                            <span key={i} className="px-2 py-1 text-xs bg-white/10 rounded text-gray-400">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                        <h5 className="text-sm font-medium text-gray-300 mb-2">Backend</h5>
                        <div className="flex flex-wrap gap-2">
                          {projects[selectedProject].techStack?.backend.map((tech, i) => (
                            <span key={i} className="px-2 py-1 text-xs bg-white/10 rounded text-gray-400">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                        <h5 className="text-sm font-medium text-gray-300 mb-2">Infrastructure</h5>
                        <div className="flex flex-wrap gap-2">
                          {projects[selectedProject].techStack?.infrastructure.map((tech, i) => (
                            <span key={i} className="px-2 py-1 text-xs bg-white/10 rounded text-gray-400">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                        <h5 className="text-sm font-medium text-gray-300 mb-2">Tools & Services</h5>
                        <div className="flex flex-wrap gap-2">
                          {projects[selectedProject].techStack?.tools.map((tech, i) => (
                            <span key={i} className="px-2 py-1 text-xs bg-white/10 rounded text-gray-400">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => {
                    const contactSection = document.getElementById('contact')
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' })
                    }
                    handleCloseModal()
                    showToast('Redirecting to contact form...', 'info')
                  }}
                  className="px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors relative overflow-hidden group"
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, { scale: 1.05, duration: 0.2 })
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, { scale: 1, duration: 0.2 })
                  }}
                >
                  <span className="relative z-10">Get in Touch</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </button>
                <button
                  onClick={handleCloseModal}
                  className="px-8 py-3 border-2 border-white text-white rounded-full font-medium hover:bg-white/10 transition-colors relative overflow-hidden group"
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, { scale: 1.05, duration: 0.2 })
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, { scale: 1, duration: 0.2 })
                  }}
                >
                  <span className="relative z-10">Close</span>
                  <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
