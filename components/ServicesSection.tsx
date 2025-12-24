'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const services = [
  {
    title: 'Frontend Development',
    description: 'React and Next.js for building dynamic and responsive user interfaces with modern design patterns',
    longDescription: 'We specialize in creating beautiful, performant frontend applications using the latest web technologies. Our team builds responsive, accessible interfaces that work seamlessly across all devices. We leverage React 18 with Server Components, Next.js 14 App Router for optimal performance, TypeScript for type safety, and Tailwind CSS for rapid UI development. Our frontend solutions include advanced state management with Zustand or Redux Toolkit, form handling with React Hook Form, animations with Framer Motion and GSAP, and comprehensive testing with Jest and React Testing Library.',
    tech: ['React 18', 'Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'React Query', 'Zustand'],
    icon: '⚛️',
    color: 'from-blue-500/30 to-cyan-500/30',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop&q=80',
    features: ['Server Components & SSR', 'Responsive Design', 'Performance Optimization (Lighthouse 95+)', 'Accessibility (WCAG 2.1)', 'PWA Support', 'SEO Optimization', 'Component Libraries', 'Design Systems'],
    deliverables: ['Fully responsive web applications', 'Component libraries', 'Design systems', 'Performance audits', 'Accessibility reports', 'SEO optimization'],
  },
  {
    title: 'Backend & APIs',
    description: 'Node.js for developing efficient server-side applications and microservices architecture',
    longDescription: 'We build robust, scalable backend systems that power modern applications. Our backend solutions include RESTful and GraphQL APIs, microservices architecture, and real-time data processing. We use Node.js with Express or Fastify for high-performance APIs, TypeScript for type safety, PostgreSQL or MongoDB for data persistence, Redis for caching, and message queues like RabbitMQ or Bull for background jobs. Our APIs feature comprehensive authentication with JWT and OAuth2, rate limiting, request validation, error handling, and API documentation with Swagger/OpenAPI.',
    tech: ['Node.js', 'Express/Fastify', 'TypeScript', 'GraphQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker'],
    icon: '🔧',
    color: 'from-green-500/30 to-emerald-500/30',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&q=80',
    features: ['RESTful & GraphQL APIs', 'Microservices Architecture', 'Real-time Processing', 'Authentication & Authorization', 'Database Design', 'Caching Strategies', 'Message Queues', 'API Documentation'],
    deliverables: ['RESTful/GraphQL APIs', 'Database schemas', 'API documentation', 'Authentication systems', 'Microservices architecture', 'Performance optimization'],
  },
  {
    title: 'Mobile Development',
    description: 'Flutter for creating native mobile applications across platforms with seamless performance',
    longDescription: 'We develop cross-platform mobile applications that deliver native performance on both iOS and Android. Using Flutter and Dart, we create beautiful, fast mobile apps with a single codebase. Our mobile solutions include state management with Provider or Riverpod, local storage with Hive or SQLite, API integration with Dio, push notifications with Firebase Cloud Messaging, offline-first architecture, app analytics, crash reporting with Sentry, and seamless App Store and Play Store deployment.',
    tech: ['Flutter', 'Dart', 'Firebase', 'Provider/Riverpod', 'Hive', 'SQLite', 'Dio', 'iOS/Android'],
    icon: '📱',
    color: 'from-purple-500/30 to-pink-500/30',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&q=80',
    features: ['Cross-platform Development', 'Offline-first Architecture', 'Push Notifications', 'App Store Optimization', 'Native Performance', 'Custom UI/UX', 'Analytics Integration', 'Crash Reporting'],
    deliverables: ['iOS & Android apps', 'App Store listings', 'App icons & assets', 'User documentation', 'App analytics setup', 'Push notification configuration'],
  },
  {
    title: 'Cloud & DevOps',
    description: 'Docker for containerization and streamlined deployment processes with CI/CD pipelines',
    longDescription: 'We help you deploy and scale your applications with modern DevOps practices. Our cloud solutions include containerization with Docker, orchestration with Kubernetes, and CI/CD pipeline setup. We work with AWS, Google Cloud Platform, and Azure to provide scalable infrastructure. Our DevOps services include infrastructure as code with Terraform, container orchestration with Kubernetes, CI/CD pipelines with GitHub Actions or GitLab CI, monitoring with Prometheus and Grafana, logging with ELK stack, security scanning, and automated testing pipelines.',
    tech: ['Docker', 'Kubernetes', 'AWS/GCP/Azure', 'Terraform', 'GitHub Actions', 'Prometheus', 'Grafana', 'ELK Stack'],
    icon: '☁️',
    color: 'from-orange-500/30 to-red-500/30',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&q=80',
    features: ['Containerization & Orchestration', 'Auto-scaling Infrastructure', 'CI/CD Pipelines', 'Monitoring & Logging', 'Infrastructure as Code', 'Security Hardening', 'Disaster Recovery', 'Cost Optimization'],
    deliverables: ['Docker configurations', 'Kubernetes manifests', 'CI/CD pipelines', 'Infrastructure documentation', 'Monitoring dashboards', 'Deployment guides'],
  },
]

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const [hoveredService, setHoveredService] = useState<number | null>(null)
  const [expandedService, setExpandedService] = useState<number | null>(null)

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

      gsap.from('.service-card', {
        rotationY: 15,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: servicesRef.current,
          start: 'top 75%',
          end: 'bottom 25%',
          toggleActions: 'play none none reverse',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    setHoveredService(index)
    gsap.to(e.currentTarget, {
      y: -8,
      duration: 0.4,
      ease: 'power2.out',
    })
    
    const icon = e.currentTarget.querySelector('.service-icon')
    if (icon) {
      gsap.to(icon, {
        scale: 1.1,
        rotation: 5,
        duration: 0.3,
      })
    }
  }

  const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setHoveredService(null)
    gsap.to(e.currentTarget, {
      y: 0,
      duration: 0.4,
      ease: 'power2.out',
    })
    
    const icon = e.currentTarget.querySelector('.service-icon')
    if (icon) {
      gsap.to(icon, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
      })
    }
  }

  return (
    <section ref={sectionRef} id="services" className="py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 md:mb-20 gap-4">
          <h2
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight"
          >
            Our Services
          </h2>
          <p className="text-gray-500 text-sm hidden md:block max-w-md text-right">
            Comprehensive solutions tailored to your needs
          </p>
        </div>
        
        <div ref={servicesRef} className="space-y-4 sm:space-y-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={`service-card group relative overflow-hidden rounded-xl sm:rounded-2xl border transition-all duration-500 ${
                expandedService === index 
                  ? 'border-white/30 bg-white/5 h-auto' 
                  : 'border-white/10 hover:border-white/20 bg-white/2 h-auto min-h-[180px] sm:min-h-[200px] md:h-[240px]'
              }`}
              onMouseEnter={(e) => handleCardHover(e, index)}
              onMouseLeave={handleCardLeave}
              onClick={() => setExpandedService(expandedService === index ? null : index)}
            >
              {/* Animated background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              {/* Content */}
              <div className="relative z-10 p-4 sm:p-6 md:p-8 h-full flex items-center">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-center">
                  {/* Left: Icon and Title */}
                  <div className="md:col-span-4 flex items-center gap-4 sm:gap-6">
                    <div className="service-icon text-5xl sm:text-6xl md:text-7xl lg:text-8xl transition-transform duration-300 flex-shrink-0">
                      {service.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-medium mb-2 group-hover:text-white transition-colors">
                        {service.title}
                      </h3>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-3">
                        {service.tech.slice(0, 2).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-0.5 sm:py-1 text-xs bg-white/10 border border-white/20 rounded-full text-gray-400 group-hover:border-white/40 group-hover:text-white transition-all"
                          >
                            {tech}
                          </span>
                        ))}
                        {service.tech.length > 2 && (
                          <span className="px-2 py-0.5 sm:py-1 text-xs bg-white/10 border border-white/20 rounded-full text-gray-400">
                            +{service.tech.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Middle: Description */}
                  <div className="md:col-span-5">
                    <p className={`text-sm sm:text-base text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors ${
                      expandedService === index ? '' : 'line-clamp-2'
                    }`}>
                      {expandedService === index ? service.longDescription : service.description}
                    </p>
                  </div>

                  {/* Right: Features Preview / Expand Button */}
                  <div className="md:col-span-3 flex flex-col items-start md:items-end justify-between h-full">
                    {expandedService === index ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setExpandedService(null)
                        }}
                        className="text-white/80 hover:text-white transition-colors text-2xl mb-4 self-end"
                      >
                        ×
                      </button>
                    ) : (
                      <div className="w-full md:text-right">
                        <div className="space-y-1 mb-3 sm:mb-4">
                          {service.features.slice(0, 2).map((feature, featureIndex) => (
                            <div
                              key={featureIndex}
                              className="flex items-center md:justify-end gap-2 text-xs text-gray-500 group-hover:text-gray-400 transition-colors"
                            >
                              <span className="w-1 h-1 bg-white rounded-full"></span>
                              <span className="line-clamp-1">{feature}</span>
                            </div>
                          ))}
                        </div>
                        <button className="text-xs sm:text-sm text-gray-400 group-hover:text-white transition-colors flex items-center gap-2 md:justify-end">
                          Learn More
                          <span className="text-base sm:text-lg group-hover:translate-x-1 transition-transform">→</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedService === index && (
                <div className="relative z-10 px-4 sm:px-6 md:px-8 pb-4 sm:pb-6 md:pb-8 animate-fadeIn border-t border-white/10 mt-4 pt-4 sm:pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    {/* Features */}
                    <div>
                      <h4 className="text-xs sm:text-sm font-medium text-gray-300 mb-3 sm:mb-4 uppercase tracking-wider">Key Features</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                        {service.features.map((feature, featureIndex) => (
                          <div
                            key={featureIndex}
                            className="flex items-start gap-2 text-xs sm:text-sm text-gray-400 group-hover:text-gray-300 transition-colors"
                          >
                            <span className="w-1.5 h-1.5 bg-white rounded-full mt-1.5 flex-shrink-0"></span>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Deliverables */}
                    {service.deliverables && (
                      <div>
                        <h4 className="text-xs sm:text-sm font-medium text-gray-300 mb-3 sm:mb-4 uppercase tracking-wider">What You'll Get</h4>
                        <div className="space-y-2">
                          {service.deliverables.map((deliverable, delIndex) => (
                            <div
                              key={delIndex}
                              className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 border border-white/10 rounded-lg text-xs sm:text-sm text-gray-400 hover:border-white/20 hover:text-gray-300 transition-all group/item"
                            >
                              <span className="text-green-400 flex-shrink-0">✓</span>
                              <span>{deliverable}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
