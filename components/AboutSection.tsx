'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const beliefs = [
  {
    title: 'Design First, Always',
    description: 'Every product starts with empathy and storytelling. We prioritize user-centric design to create intuitive and engaging interfaces.',
    longDescription: 'We believe that great products are born from understanding people first. Before writing a single line of code, we immerse ourselves in our users\' world—their challenges, aspirations, and daily workflows. Our design process involves extensive user research, persona development, journey mapping, and iterative prototyping. We conduct usability testing sessions with real users, analyze behavioral data, and create design systems that ensure consistency across all touchpoints. Our team uses tools like Figma for design, Principle for prototyping, and conducts A/B testing to validate design decisions. We believe that beautiful design is not just about aesthetics—it\'s about creating experiences that feel natural, reduce cognitive load, and delight users at every interaction.',
    icon: '🎨',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop&q=80',
    examples: ['User research & testing', 'Design systems', 'Prototyping', 'Usability studies', 'A/B testing', 'Design thinking workshops'],
  },
  {
    title: 'AI Should Amplify Humans',
    description: 'We develop AI solutions that enhance human capabilities, not replace them. Technology should empower people.',
    longDescription: 'In an era where AI is transforming industries, we take a human-centered approach to artificial intelligence. Our AI solutions are designed to augment human intelligence, automate repetitive tasks, and provide insights that help people make better decisions. We work with machine learning models including transformer architectures, computer vision systems, natural language processing pipelines, and recommendation engines. Our AI implementations prioritize explainability—we build systems where users can understand why AI made certain decisions. We implement ethical AI practices, ensuring fairness, transparency, and accountability. We use frameworks like TensorFlow, PyTorch, and Hugging Face transformers, and deploy models using TensorFlow Serving or custom API endpoints. Our AI solutions include real-time inference capabilities, batch processing pipelines, and continuous learning systems that improve over time.',
    icon: '🤖',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop&q=80',
    examples: ['Explainable AI', 'Ethical ML practices', 'Human-AI collaboration', 'Computer vision', 'NLP pipelines', 'Recommendation systems'],
  },
  {
    title: 'Innovation Drives Impact',
    description: 'Innovation is only meaningful when it drives measurable results. We focus on solutions that deliver real value.',
    longDescription: 'Innovation without impact is just novelty. We measure success not by the complexity of our solutions, but by the tangible value they create for our clients and their users. Every project begins with clear success metrics—whether it\'s increasing conversion rates, reducing operational costs, improving user satisfaction scores, or accelerating time-to-market. We use data analytics platforms like Google Analytics, Mixpanel, and Amplitude to track user behavior and measure impact. Our innovation process includes rapid prototyping with tools like Next.js and Vercel for quick iterations, user feedback loops, and continuous improvement cycles. We conduct regular retrospectives, analyze performance metrics, and iterate based on real-world data. We believe in building MVPs quickly, testing hypotheses, and scaling what works.',
    icon: '💡',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&q=80',
    examples: ['Data-driven validation', 'Rapid iteration', 'Measurable outcomes', 'A/B testing', 'Analytics integration', 'Performance metrics'],
  },
  {
    title: 'Quality Over Speed',
    description: 'We move fast, but never at the cost of quality or integrity. Excellence is our standard.',
    longDescription: 'While we understand the need for speed in today\'s fast-paced market, we never compromise on quality. Our development process includes comprehensive testing with Jest, React Testing Library, and Cypress for end-to-end testing. We conduct thorough code reviews using GitHub Pull Requests, maintain high test coverage (aiming for 80%+), and use static analysis tools like ESLint and TypeScript for code quality. We implement performance optimization techniques including code splitting, lazy loading, image optimization, and CDN caching. Our security practices include regular dependency audits with npm audit, penetration testing, OWASP Top 10 compliance, and security headers configuration. We build scalable architectures using microservices patterns, implement proper error handling and logging, and ensure our applications can handle traffic spikes with auto-scaling infrastructure.',
    icon: '⚡',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80',
    examples: ['Comprehensive testing', 'Security audits', 'Scalable architecture', 'Code reviews', 'Performance optimization', 'Documentation'],
  },
]

const stats = [
  { number: '50+', label: 'Projects Delivered', description: 'Successfully launched products', icon: '🚀' },
  { number: '30+', label: 'Happy Clients', description: 'From startups to Fortune 500', icon: '💼' },
  { number: '5', label: 'Years Experience', description: 'Building digital products', icon: '⭐' },
  { number: '100%', label: 'Client Satisfaction', description: 'On time and on budget', icon: '✨' },
]

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const beliefsRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [expandedCard, setExpandedCard] = useState<number | null>(null)

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

      gsap.from('.belief-card', {
        scale: 0.95,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: beliefsRef.current,
          start: 'top 75%',
          end: 'bottom 25%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.from('.stat-item', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      })

      const statNumbers = statsRef.current?.querySelectorAll('.stat-number')
      statNumbers?.forEach((stat) => {
        const target = stat.textContent
        if (target) {
          ScrollTrigger.create({
            trigger: stat,
            start: 'top 80%',
            onEnter: () => {
              const num = parseInt(target.replace(/\D/g, ''))
              if (!isNaN(num)) {
                gsap.to({ value: 0 }, {
                  value: num,
                  duration: 2,
                  ease: 'power2.out',
                  onUpdate: function() {
                    stat.textContent = Math.floor(this.targets()[0].value) + (target.includes('%') ? '%' : '+')
                  },
                })
              }
            },
          })
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    setHoveredCard(index)
    gsap.to(e.currentTarget, {
      y: -10,
      scale: 1.02,
      duration: 0.4,
      ease: 'power2.out',
    })
  }

  const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setHoveredCard(null)
    gsap.to(e.currentTarget, {
      y: 0,
      scale: 1,
      duration: 0.4,
      ease: 'power2.out',
    })
  }

  return (
    <section ref={sectionRef} id="about" className="py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/5 to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 md:mb-20 gap-4">
          <h2
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight"
          >
            Our Beliefs
          </h2>
          <p className="text-gray-500 text-sm hidden md:block max-w-md text-right">
            The principles that guide everything we do
          </p>
        </div>

        {/* Beliefs Grid */}
        <div ref={beliefsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-20 sm:mb-24 md:mb-32">
          {beliefs.map((belief, index) => (
            <div
              key={index}
              className={`belief-card group relative overflow-hidden rounded-2xl sm:rounded-3xl border transition-all duration-500 cursor-pointer ${
                expandedCard === index 
                  ? 'border-white/40 bg-gradient-to-br from-white/10 to-white/5' 
                  : 'border-white/10 hover:border-white/30 bg-white/5'
              }`}
              onMouseEnter={(e) => handleCardHover(e, index)}
              onMouseLeave={handleCardLeave}
              onClick={() => setExpandedCard(expandedCard === index ? null : index)}
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <img
                  src={belief.image}
                  alt={belief.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/800x600/000000/FFFFFF?text=ROFA'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/70 to-black/90"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 p-6 sm:p-8 md:p-10 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between mb-4 sm:mb-6">
                  <div className="flex items-center gap-3 sm:gap-4 flex-1">
                    <div className="text-5xl sm:text-6xl md:text-7xl transition-transform duration-300 group-hover:scale-110 flex-shrink-0">
                      {belief.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-medium mb-1 sm:mb-2 group-hover:text-white transition-colors">
                        {belief.title}
                      </h3>
                      <div className="h-1 w-8 sm:w-12 bg-gradient-to-r from-white/50 to-transparent rounded-full"></div>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setExpandedCard(expandedCard === index ? null : index)
                    }}
                    className={`text-white/60 hover:text-white transition-colors text-xl sm:text-2xl w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full flex-shrink-0 ${
                      expandedCard === index ? 'bg-white/20' : 'bg-white/10 group-hover:bg-white/20'
                    }`}
                  >
                    {expandedCard === index ? '−' : '+'}
                  </button>
                </div>

                {/* Description */}
                <p className={`text-sm sm:text-base text-gray-400 leading-relaxed mb-4 sm:mb-6 group-hover:text-gray-300 transition-colors flex-grow ${
                  expandedCard === index ? '' : 'line-clamp-3'
                }`}>
                  {expandedCard === index ? belief.longDescription : belief.description}
                </p>

                {/* Examples Tags */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {belief.examples.map((example, exampleIndex) => (
                    <span
                      key={exampleIndex}
                      className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs bg-white/10 border border-white/20 rounded-full text-gray-300 group-hover:border-white/40 group-hover:text-white transition-all"
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Stats Section - Modern Design */}
        <div ref={statsRef} className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-2xl sm:rounded-3xl"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 relative z-10">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="stat-item text-center p-4 sm:p-6 md:p-8 border border-white/10 rounded-xl sm:rounded-2xl hover:border-white/30 hover:bg-white/5 transition-all duration-300 group relative overflow-hidden bg-white/2"
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, { 
                    scale: 1.05, 
                    y: -5,
                    duration: 0.3 
                  })
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, { 
                    scale: 1, 
                    y: 0,
                    duration: 0.3 
                  })
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-3 transition-transform duration-300 group-hover:scale-110 inline-block">
                    {stat.icon}
                  </div>
                  <div className="stat-number text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-1 sm:mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm md:text-base text-gray-400 mb-1 font-medium">{stat.label}</div>
                  <div className="text-xs text-gray-500">{stat.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
