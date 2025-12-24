'use client'

import { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

interface Toast {
  id: string
  message: string
  type: ToastType
}

let toastListeners: ((toast: Toast) => void)[] = []

export const showToast = (message: string, type: ToastType = 'info') => {
  const toast: Toast = {
    id: Date.now().toString(),
    message,
    type,
  }
  toastListeners.forEach((listener) => listener(toast))
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    const listener = (toast: Toast) => {
      setToasts((prev) => [...prev, toast])
      
      // Auto remove after 4 seconds
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id))
      }, 4000)
    }

    toastListeners.push(listener)
    return () => {
      toastListeners = toastListeners.filter((l) => l !== listener)
    }
  }, [])

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div className="fixed top-20 right-6 z-[100] space-y-2 pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  )
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(
        ref.current,
        { x: 400, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, ease: 'power3.out' }
      )
    }
  }, [])

  const handleRemove = () => {
    if (ref.current) {
      gsap.to(ref.current, {
        x: 400,
        opacity: 0,
        duration: 0.3,
        onComplete: () => onRemove(toast.id),
      })
    } else {
      onRemove(toast.id)
    }
  }

  const colors = {
    success: 'bg-green-500/20 border-green-500/50 text-green-400',
    error: 'bg-red-500/20 border-red-500/50 text-red-400',
    info: 'bg-blue-500/20 border-blue-500/50 text-blue-400',
    warning: 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400',
  }

  const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
    warning: '⚠',
  }

  return (
    <div
      ref={ref}
      className={`${colors[toast.type]} border rounded-lg px-4 py-3 min-w-[300px] max-w-[400px] pointer-events-auto backdrop-blur-md flex items-center gap-3 shadow-lg`}
    >
      <span className="text-xl font-bold">{icons[toast.type]}</span>
      <p className="flex-1 text-sm font-medium">{toast.message}</p>
      <button
        onClick={handleRemove}
        className="text-white/60 hover:text-white transition-colors text-xl"
      >
        ×
      </button>
    </div>
  )
}

