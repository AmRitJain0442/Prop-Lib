'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export default function AnimatedGradientHeader() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden bg-black">
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1), transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(255, 255, 255, 0.05), transparent 50%)',
            'radial-gradient(circle at 50% 80%, rgba(255, 255, 255, 0.1), transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1), transparent 50%)',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />

      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.06), transparent 40%)`,
        }}
      />

      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter"
          >
            PropLib
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm md:text-base text-gray-400 max-w-md mx-auto mb-8"
          >
            AI-Native UI Components
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex gap-3 justify-center"
          >
            <button className="px-5 py-2.5 rounded-full text-xs font-medium bg-white text-black hover:scale-105 transition-transform">
              Explore
            </button>
            <button className="px-5 py-2.5 rounded-full text-xs font-medium border border-white/20 text-white hover:bg-white/10 transition-colors">
              Documentation
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
