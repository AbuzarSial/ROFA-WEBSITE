'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { showToast } from './Toast'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  // Load form data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('contactFormData')
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        setFormData(parsed)
      } catch (e) {
        // Ignore parse errors
      }
    }
  }, [])

  // Save form data to localStorage on change
  useEffect(() => {
    if (formData.name || formData.email || formData.message) {
      localStorage.setItem('contactFormData', JSON.stringify(formData))
    }
  }, [formData])

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

      gsap.from(contentRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2,
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      })

      // Animate form inputs on focus
      const inputs = contentRef.current?.querySelectorAll('input, textarea')
      inputs?.forEach((input) => {
        input.addEventListener('focus', () => {
          gsap.to(input, {
            scale: 1.02,
            duration: 0.3,
            ease: 'power2.out',
          })
        })
        input.addEventListener('blur', () => {
          gsap.to(input, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
          })
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required'
        if (value.trim().length < 2) return 'Name must be at least 2 characters'
        if (value.trim().length > 50) return 'Name must be less than 50 characters'
        return undefined
      case 'email':
        if (!value.trim()) return 'Email is required'
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) return 'Please enter a valid email address'
        return undefined
      case 'message':
        if (!value.trim()) return 'Message is required'
        if (value.trim().length < 10) return 'Message must be at least 10 characters'
        if (value.trim().length > 1000) return 'Message must be less than 1000 characters'
        return undefined
      default:
        return undefined
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    
    const error = validateField(name, value)
    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error }))
    } else {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Mark all fields as touched
    setTouched({ name: true, email: true, message: true })
    
    // Validate all fields
    const newErrors: FormErrors = {}
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof typeof formData])
      if (error) {
        newErrors[key as keyof FormErrors] = error
      }
    })
    
    setErrors(newErrors)
    
    // If there are errors, don't submit
    if (Object.keys(newErrors).length > 0) {
      showToast('Please fix the errors in the form', 'error')
      return
    }
    
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      // In a real app, you would send the data to an API
      console.log('Form submitted:', formData)
      
      setIsSubmitting(false)
      setSubmitStatus('success')
      showToast('Message sent successfully! We\'ll get back to you soon.', 'success')
      
      // Clear localStorage
      localStorage.removeItem('contactFormData')
      
      // Reset form after success
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' })
        setSubmitStatus('idle')
        setTouched({})
        setErrors({})
      }, 3000)
    } catch (error) {
      setIsSubmitting(false)
      setSubmitStatus('error')
      showToast('Failed to send message. Please try again.', 'error')
    }
  }

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    gsap.to(e.target, {
      borderColor: 'rgba(255, 255, 255, 0.5)',
      duration: 0.3,
    })
  }

  const handleInputBlurWithAnimation = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    handleInputBlur(e)
    gsap.to(e.target, {
      borderColor: 'rgba(255, 255, 255, 0.1)',
      duration: 0.3,
    })
  }

  return (
    <section ref={sectionRef} id="contact" className="py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <h2
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium mb-8 sm:mb-12 tracking-tight"
        >
          Let&apos;s Build
          <br />
          Something Amazing
        </h2>
        <div ref={contentRef} className="flex flex-col md:flex-row gap-8 sm:gap-12 md:gap-24">
          <div className="flex-1">
            <p className="text-base sm:text-lg text-gray-400 mb-6 sm:mb-8 leading-relaxed">
              Ready to transform your digital presence? Get in touch and let&apos;s
              discuss how we can help you achieve your goals.
            </p>
            <div className="space-y-4 sm:space-y-6">
              <a
                href="mailto:hello@rofa.ai"
                onClick={(e) => {
                  e.preventDefault()
                  navigator.clipboard.writeText('hello@rofa.ai').then(() => {
                    showToast('Email address copied to clipboard!', 'success')
                  }).catch(() => {
                    window.location.href = 'mailto:hello@rofa.ai'
                  })
                }}
                className="block text-base sm:text-lg hover:opacity-70 transition-opacity group cursor-pointer"
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, { x: 5, duration: 0.3 })
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, { x: 0, duration: 0.3 })
                }}
              >
                <span className="text-gray-400">Email:</span>{' '}
                <span className="text-white group-hover:underline break-all">hello@rofa.ai</span>
                <span className="ml-2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:inline">(Click to copy)</span>
              </a>
              <a
                href="tel:+1234567890"
                onClick={(e) => {
                  e.preventDefault()
                  navigator.clipboard.writeText('+1 (234) 567-890').then(() => {
                    showToast('Phone number copied to clipboard!', 'success')
                  }).catch(() => {
                    window.location.href = 'tel:+1234567890'
                  })
                }}
                className="block text-base sm:text-lg text-gray-400 hover:text-white transition-colors group cursor-pointer"
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, { x: 5, duration: 0.3 })
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, { x: 0, duration: 0.3 })
                }}
              >
                <span className="text-gray-400">Phone:</span>{' '}
                <span className="text-white group-hover:underline">+1 (234) 567-890</span>
                <span className="ml-2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:inline">(Click to copy)</span>
              </a>
            </div>
            <div className="mt-8 sm:mt-12 flex flex-wrap gap-3 sm:gap-4">
              {['Twitter', 'LinkedIn', 'GitHub'].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className="px-4 sm:px-6 py-2 sm:py-3 border border-white/20 rounded-full text-xs sm:text-sm hover:border-white/40 hover:bg-white/5 transition-all"
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, { scale: 1.05, duration: 0.3 })
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, { scale: 1, duration: 0.3 })
                  }}
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlurWithAnimation}
                  className={`w-full px-4 py-3 text-sm sm:text-base bg-white/5 border rounded-lg focus:outline-none transition-colors ${
                    errors.name && touched.name
                      ? 'border-red-500/50 focus:border-red-500/70'
                      : 'border-white/10 focus:border-white/30'
                  }`}
                />
                {errors.name && touched.name && (
                  <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlurWithAnimation}
                  className={`w-full px-4 py-3 text-sm sm:text-base bg-white/5 border rounded-lg focus:outline-none transition-colors ${
                    errors.email && touched.email
                      ? 'border-red-500/50 focus:border-red-500/70'
                      : 'border-white/10 focus:border-white/30'
                  }`}
                />
                {errors.email && touched.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Message"
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlurWithAnimation}
                  className={`w-full px-4 py-3 text-sm sm:text-base bg-white/5 border rounded-lg focus:outline-none transition-colors resize-none ${
                    errors.message && touched.message
                      ? 'border-red-500/50 focus:border-red-500/70'
                      : 'border-white/10 focus:border-white/30'
                  }`}
                />
                {errors.message && touched.message && (
                  <p className="text-red-400 text-xs mt-1">{errors.message}</p>
                )}
                <p className="text-gray-500 text-xs mt-1 text-right">
                  {formData.message.length}/1000
                </p>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                aria-label="Send message"
                className="px-8 py-4 bg-white text-black rounded-full font-medium text-sm hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    gsap.to(e.currentTarget, { scale: 1.05, duration: 0.3 })
                  }
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, { scale: 1, duration: 0.3 })
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting && (
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                  )}
                  {isSubmitting ? 'Sending...' : submitStatus === 'success' ? 'Message Sent!' : 'Send Message'}
                </span>
                {submitStatus === 'success' && (
                  <div className="absolute inset-0 bg-green-500 opacity-20"></div>
                )}
              </button>
              {submitStatus === 'error' && (
                <p className="text-red-400 text-sm">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
