import React, { useEffect, useState } from 'react'

export default function MountReveal({ children, className = '', style }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    try {
      if (window && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setMounted(true)
        return
      }
    } catch (err) { /* ignore */ }

    const raf = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div
      className={`transition-transform transition-opacity duration-700 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'} ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}
