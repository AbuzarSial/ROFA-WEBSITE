'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { showToast } from './Toast'

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setMousePosition({ x, y })

      // Parallax effect on text
      if (titleRef.current) {
        gsap.to(titleRef.current, {
          x: x * 20,
          y: y * 20,
          duration: 1,
          ease: 'power2.out',
        })
      }

      if (subtitleRef.current) {
        gsap.to(subtitleRef.current, {
          x: x * 15,
          y: y * 15,
          duration: 1,
          ease: 'power2.out',
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split animation for each word
      const words = titleRef.current?.querySelectorAll('.word')
      words?.forEach((word, i) => {
        gsap.from(word, {
          y: 150,
          opacity: 0,
          duration: 1.2,
          ease: 'power4.out',
          delay: 0.1 * i,
        })
      })

      gsap.from(subtitleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
        delay: 0.8,
      })

      if (buttonRef.current) {
        // Ensure button is visible after animation
        const button = buttonRef.current
        
        // Set initial state
        gsap.set(button, { opacity: 0, scale: 0.8, visibility: 'visible' })
        
        // Animate to visible state
        gsap.to(button, {
          scale: 1,
          opacity: 1,
          visibility: 'visible',
          duration: 0.8,
          ease: 'back.out(1.7)',
          delay: 1.2,
          onComplete: () => {
            // Ensure button stays visible after animation
            if (button) {
              gsap.set(button, { opacity: 1, visibility: 'visible', display: 'block' })
            }
          }
        })
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ESC to close modals
      if (e.key === 'Escape') {
        const signupModal = document.getElementById('signup-modal')
        if (signupModal && signupModal.style.display !== 'none') {
          handleSignUp() // This will close it
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleViewWork = () => {
    console.log('View Work clicked')
    const workSection = document.getElementById('work')
    if (workSection) {
      // Try using Lenis if available
      const lenis = (window as any).lenis
      if (lenis) {
        lenis.scrollTo(workSection, { offset: -100, duration: 1.5 })
      } else {
        // Fallback to native scroll
        const offset = 100
        const elementPosition = workSection.getBoundingClientRect().top + window.pageYOffset - offset
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth',
        })
      }
    }
  }

  const handleLearnMore = () => {
    console.log('Learn More clicked')
    const aboutSection = document.getElementById('about')
    if (aboutSection) {
      // Try using Lenis if available
      const lenis = (window as any).lenis
      if (lenis) {
        lenis.scrollTo(aboutSection, { offset: -100, duration: 1.5 })
      } else {
        // Fallback to native scroll
        const offset = 100
        const elementPosition = aboutSection.getBoundingClientRect().top + window.pageYOffset - offset
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth',
        })
      }
    }
  }

  const handleSignUp = () => {
    console.log('Sign Up clicked')
    // Show signup modal
    const modal = document.getElementById('signup-modal')
    if (modal) {
      gsap.fromTo('.signup-modal-overlay',
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      )
      gsap.fromTo('.signup-modal-content',
        { scale: 0.8, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
      )
      modal.style.display = 'flex'
    }
  }

  const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.out',
    })
    
    // Add glow effect for Learn More and Sign Up buttons
    const button = e.currentTarget
    if (button.textContent?.includes('Learn More')) {
      gsap.to(button, {
        boxShadow: '0 0 30px rgba(255, 255, 255, 0.3)',
        borderColor: 'rgba(255, 255, 255, 0.8)',
        duration: 0.3,
      })
    } else if (button.textContent?.includes('Sign Up')) {
      gsap.to(button, {
        boxShadow: '0 0 40px rgba(139, 92, 246, 0.6)',
        duration: 0.3,
      })
    }
  }

  const handleButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out',
    })
    
    // Remove glow effect
    const button = e.currentTarget
    if (button.textContent?.includes('Learn More')) {
      gsap.to(button, {
        boxShadow: 'none',
        borderColor: 'rgba(255, 255, 255, 0.3)',
        duration: 0.3,
      })
    } else if (button.textContent?.includes('Sign Up')) {
      gsap.to(button, {
        boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)',
        duration: 0.3,
      })
    }
  }

  const handleWordHover = (e: React.MouseEvent<HTMLSpanElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.1,
      y: -10,
      duration: 0.4,
      ease: 'power2.out',
    })
  }

  const handleWordLeave = (e: React.MouseEvent<HTMLSpanElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      y: 0,
      duration: 0.4,
      ease: 'power2.out',
    })
  }

  const titleWords = [
    'Design-led',
    'AI',
    'studio',
    'building',
    'impactful',
    'digital',
    'solutions',
  ]

  return (
    <>
      <section
        id="hero"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-6 md:px-12 overflow-hidden"
        style={{ position: 'relative', zIndex: 30, pointerEvents: 'auto' }}
      >
        <div className="max-w-7xl mx-auto w-full relative" style={{ zIndex: 30, pointerEvents: 'auto' }}>
          <div className="max-w-5xl relative" style={{ zIndex: 30, pointerEvents: 'auto' }}>
            <h1
              ref={titleRef}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium leading-[1.1] mb-6 md:mb-8 tracking-tight"
            >
              {titleWords.map((word, index) => (
                <span
                  key={index}
                  className="word inline-block mr-2 sm:mr-3 mb-1 sm:mb-2 cursor-default hover:text-white transition-colors"
                  onMouseEnter={handleWordHover}
                  onMouseLeave={handleWordLeave}
                  style={{
                    background:
                      index % 3 === 0
                        ? 'linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%)'
                        : index % 3 === 1
                        ? 'linear-gradient(135deg, #ffffff 0%, #ffffff 100%)'
                        : 'linear-gradient(135deg, #e0e0e0 0%, #ffffff 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {word}
                </span>
              ))}
            </h1>
            <p
              ref={subtitleRef}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 md:mb-12 max-w-3xl leading-relaxed font-light"
            >
              We integrate{' '}
              <span className="text-white font-medium">cutting-edge technology</span>{' '}
              with{' '}
              <span className="text-white font-medium">transformative design</span>{' '}
              to create digital experiences that drive meaningful impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 relative" style={{ zIndex: 50, pointerEvents: 'auto' }}>
              <button
                ref={buttonRef}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  console.log('Button clicked: View Our Work')
                  handleViewWork()
                }}
                onMouseEnter={handleButtonHover}
                onMouseLeave={handleButtonLeave}
                aria-label="View our work - scroll to work section"
                className="px-6 sm:px-8 md:px-10 py-4 sm:py-5 rounded-full font-medium text-sm sm:text-base hover:shadow-2xl hover:shadow-white/20 transition-all relative overflow-hidden group cursor-pointer w-full sm:w-auto"
                type="button"
                style={{ 
                  pointerEvents: 'auto', 
                  position: 'relative', 
                  zIndex: 50,
                  backgroundColor: '#ffffff',
                  color: '#000000',
                  opacity: 1,
                  visibility: 'visible',
                  display: 'block'
                }}
              >
                <span className="relative z-10" style={{ color: '#000000' }}>View Our Work</span>
                <span className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  console.log('Button clicked: Learn More')
                  handleLearnMore()
                }}
                onMouseEnter={handleButtonHover}
                onMouseLeave={handleButtonLeave}
                aria-label="Learn more - scroll to about section"
                className="px-6 sm:px-8 md:px-10 py-4 sm:py-5 border-2 border-white/30 text-white rounded-full font-medium text-sm sm:text-base hover:border-white/60 hover:bg-white/5 transition-all relative overflow-hidden group cursor-pointer w-full sm:w-auto z-50"
                type="button"
                style={{ pointerEvents: 'auto', position: 'relative', zIndex: 100 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Learn More
                  <span className="text-lg group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></span>
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  console.log('Button clicked: Sign Up')
                  handleSignUp()
                }}
                onMouseEnter={handleButtonHover}
                onMouseLeave={handleButtonLeave}
                aria-label="Sign up - open signup modal"
                className="px-6 sm:px-8 md:px-10 py-4 sm:py-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full font-medium text-sm sm:text-base hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg shadow-purple-500/30 relative overflow-hidden group cursor-pointer w-full sm:w-auto z-50"
                type="button"
                style={{ pointerEvents: 'auto', position: 'relative', zIndex: 100 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Sign Up
                  <span className="text-lg group-hover:rotate-12 transition-transform duration-300">✨</span>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Signup Modal */}
      <SignupModal />
    </>
  )
}

function SignupModal() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Load form data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('signupFormData')
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        setFormData(parsed)
      } catch (e) {
        // Ignore parse errors
      }
    }
  }, [])

  const handleCloseSignup = () => {
    gsap.to('.signup-modal-content', {
      scale: 0.8,
      opacity: 0,
      y: 50,
      duration: 0.3,
      onComplete: () => {
        const modal = document.getElementById('signup-modal')
        if (modal) {
          modal.style.display = 'none'
        }
        // Reset form when closing
        setFormData({ name: '', email: '', password: '' })
        setErrors({})
      }
    })
    gsap.to('.signup-modal-overlay', {
      opacity: 0,
      duration: 0.3,
    })
  }

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required'
        if (value.trim().length < 2) return 'Name must be at least 2 characters'
        return undefined
      case 'email':
        if (!value.trim()) return 'Email is required'
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) return 'Please enter a valid email address'
        return undefined
      case 'password':
        if (!value) return 'Password is required'
        if (value.length < 8) return 'Password must be at least 8 characters'
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          return 'Password must contain uppercase, lowercase, and number'
        }
        return undefined
      default:
        return undefined
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    
    // Save to localStorage
    const updated = { ...formData, [name]: value }
    localStorage.setItem('signupFormData', JSON.stringify(updated))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const error = validateField(name, value)
    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error }))
    } else {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSignupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Validate all fields
    const newErrors: Record<string, string> = {}
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof typeof formData])
      if (error) {
        newErrors[key] = error
      }
    })
    
    setErrors(newErrors)
    
    // If there are errors, don't submit
    if (Object.keys(newErrors).length > 0) {
      showToast('Please fix the errors in the form', 'error')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      console.log('Signup data:', formData)
      
      // Clear localStorage
      localStorage.removeItem('signupFormData')
      
      showToast('Account created successfully! Welcome to ROFA!', 'success')
      
      setIsSubmitting(false)
      
      // Close modal after success
      setTimeout(() => {
        handleCloseSignup()
      }, 1000)
    } catch (error) {
      setIsSubmitting(false)
      showToast('Failed to create account. Please try again.', 'error')
    }
  }

  return (
    <div
      id="signup-modal"
      className="signup-modal-overlay fixed inset-0 z-50 hidden items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleCloseSignup()
        }
      }}
    >
      <div
        className="signup-modal-content bg-gradient-to-br from-black via-black to-gray-900 border border-white/20 rounded-3xl p-8 md:p-10 max-w-md w-full relative overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-600/20 to-cyan-600/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-medium mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Join ROFA
              </h2>
              <p className="text-sm text-gray-400">Create your account to get started</p>
            </div>
            <button
              onClick={handleCloseSignup}
              className="text-white hover:text-gray-400 text-2xl transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10"
              aria-label="Close modal"
            >
              ×
            </button>
          </div>
          
          <form onSubmit={handleSignupSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onFocus={(e) => {
                  gsap.to(e.target, { scale: 1.02, duration: 0.2 })
                }}
                className={`w-full px-4 py-3.5 bg-white/5 border rounded-xl focus:outline-none transition-all backdrop-blur-sm ${
                  errors.name
                    ? 'border-red-500/50 focus:border-red-500/70 focus:ring-2 focus:ring-red-500/20'
                    : 'border-white/10 focus:border-white/30 focus:ring-2 focus:ring-white/10'
                }`}
              />
              {errors.name && (
                <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                  <span>⚠</span> {errors.name}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onFocus={(e) => {
                  gsap.to(e.target, { scale: 1.02, duration: 0.2 })
                }}
                className={`w-full px-4 py-3.5 bg-white/5 border rounded-xl focus:outline-none transition-all backdrop-blur-sm ${
                  errors.email
                    ? 'border-red-500/50 focus:border-red-500/70 focus:ring-2 focus:ring-red-500/20'
                    : 'border-white/10 focus:border-white/30 focus:ring-2 focus:ring-white/10'
                }`}
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                  <span>⚠</span> {errors.email}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  onFocus={(e) => {
                    gsap.to(e.target, { scale: 1.02, duration: 0.2 })
                  }}
                  className={`w-full px-4 py-3.5 bg-white/5 border rounded-xl focus:outline-none transition-all backdrop-blur-sm pr-12 ${
                    errors.password
                      ? 'border-red-500/50 focus:border-red-500/70 focus:ring-2 focus:ring-red-500/20'
                      : 'border-white/10 focus:border-white/30 focus:ring-2 focus:ring-white/10'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors text-sm font-medium px-2 py-1 rounded"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                  <span>⚠</span> {errors.password}
                </p>
              )}
              {!errors.password && formData.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[
                      formData.password.length >= 8,
                      /[a-z]/.test(formData.password),
                      /[A-Z]/.test(formData.password),
                      /\d/.test(formData.password),
                    ].map((valid, i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded ${
                          valid ? 'bg-green-500' : 'bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-500 text-xs">
                    Must contain uppercase, lowercase, and number
                  </p>
                </div>
              )}
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-medium text-sm hover:from-purple-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group shadow-lg shadow-purple-500/30"
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  gsap.to(e.currentTarget, { scale: 1.02, duration: 0.2 })
                }
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, { scale: 1, duration: 0.2 })
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
                  </>
                )}
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </button>
            
            <p className="text-xs text-gray-500 text-center mt-4">
              By signing up, you agree to our{' '}
              <a href="#" className="text-purple-400 hover:text-purple-300 underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-purple-400 hover:text-purple-300 underline">
                Privacy Policy
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
