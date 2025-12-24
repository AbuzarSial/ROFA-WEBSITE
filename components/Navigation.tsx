'use client'

import { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'
import { showToast } from './Toast'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeLink, setActiveLink] = useState('')
  const [showSignupModal, setShowSignupModal] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(logoRef.current, {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2,
      })

      gsap.from(linksRef.current?.children || [], {
        y: -20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.1,
        delay: 0.4,
      })

      gsap.from(buttonRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(1.7)',
        delay: 0.6,
      })
    }, navRef)

    return () => ctx.revert()
  }, [])

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - offset
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      })
    }
  }

  const handleLinkHover = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    setActiveLink(link)
    gsap.to(e.currentTarget, {
      y: -2,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const handleLinkLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setActiveLink('')
    gsap.to(e.currentTarget, {
      y: 0,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const handleGetStarted = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      const offset = 100
      const elementPosition = contactSection.getBoundingClientRect().top + window.pageYOffset - offset
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      })
    }
  }

  const handleSignUp = () => {
    const modal = document.getElementById('signup-modal')
    if (modal) {
      if (modal.style.display === 'none' || !modal.style.display) {
        setShowSignupModal(true)
        gsap.fromTo('.signup-modal-overlay',
          { opacity: 0 },
          { opacity: 1, duration: 0.3 }
        )
        gsap.fromTo('.signup-modal-content',
          { scale: 0.8, opacity: 0, y: 50 },
          { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
        )
        modal.style.display = 'flex'
      } else {
        // Close modal if already open
        const signupModal = document.getElementById('signup-modal')
        if (signupModal) {
          gsap.to('.signup-modal-content', {
            scale: 0.8,
            opacity: 0,
            y: 50,
            duration: 0.3,
            onComplete: () => {
              signupModal.style.display = 'none'
              setShowSignupModal(false)
            }
          })
          gsap.to('.signup-modal-overlay', {
            opacity: 0,
            duration: 0.3,
          })
        }
      }
    }
  }

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

  const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const handleButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      backgroundColor: 'transparent',
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const navLinks = [
    { href: '#work', label: 'Work' },
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-2 md:top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          isScrolled
            ? 'w-[95%] max-w-6xl'
            : 'w-[95%] md:w-full max-w-7xl'
        }`}
      >
        <div className={`transition-all duration-500 ${
          isScrolled
            ? 'bg-black/60 backdrop-blur-2xl border border-white/20 rounded-full px-4 md:px-6 lg:px-8 py-3 md:py-4 shadow-2xl shadow-black/50'
            : 'bg-transparent px-4 md:px-6 lg:px-12 py-3 md:py-5'
        }`}>
          <div className="flex items-center justify-between">
            <div
              ref={logoRef}
              onClick={handleLogoClick}
              className="text-lg md:text-xl font-semibold tracking-tight cursor-pointer hover:opacity-80 transition-opacity"
              style={{ color: '#ffffff' }}
            >
              ROFA
            </div>
            <div ref={linksRef} className="hidden lg:flex items-center gap-8 xl:gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-sm font-medium relative group"
                  onMouseEnter={(e) => handleLinkHover(e, link.href)}
                  onMouseLeave={handleLinkLeave}
                >
                  <span className="relative z-10">{link.label}</span>
                  <span
                    className={`absolute bottom-0 left-0 w-full h-[1px] bg-white transition-all duration-300 ${
                      activeLink === link.href ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                  />
                </a>
              ))}
            </div>
            <div className="hidden md:flex items-center gap-2 lg:gap-3">
              <button
                ref={buttonRef}
                onClick={handleGetStarted}
                onMouseEnter={handleButtonHover}
                onMouseLeave={handleButtonLeave}
                aria-label="Get started - scroll to contact section"
                className="text-xs lg:text-sm border border-white/30 px-4 lg:px-6 py-2 lg:py-2.5 rounded-full font-medium hover:border-white/60 transition-all relative overflow-hidden group whitespace-nowrap"
              >
                <span className="relative z-10">Get Started</span>
                <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </button>
              <button
                onClick={handleSignUp}
                onMouseEnter={handleButtonHover}
                onMouseLeave={handleButtonLeave}
                aria-label="Sign up - open signup modal"
                className="text-xs lg:text-sm bg-gradient-to-r from-purple-600 to-indigo-600 px-4 lg:px-6 py-2 lg:py-2.5 rounded-full font-medium hover:from-purple-700 hover:to-indigo-700 transition-all relative overflow-hidden group whitespace-nowrap"
              >
                <span className="relative z-10">Sign Up</span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </button>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-2"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-white/10 animate-fadeIn">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      handleLinkClick(e, link.href)
                      setMobileMenuOpen(false)
                    }}
                    className="text-sm font-medium py-2 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="flex flex-col gap-2 pt-2">
                  <button
                    onClick={() => {
                      handleGetStarted()
                      setMobileMenuOpen(false)
                    }}
                    className="text-sm border border-white/30 px-6 py-2.5 rounded-full font-medium hover:border-white/60 transition-all text-left"
                  >
                    Get Started
                  </button>
                  <button
                    onClick={() => {
                      handleSignUp()
                      setMobileMenuOpen(false)
                    }}
                    className="text-sm bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-2.5 rounded-full font-medium hover:from-purple-700 hover:to-indigo-700 transition-all text-left"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

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
