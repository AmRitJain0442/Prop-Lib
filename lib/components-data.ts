import { ComponentData } from './types'
import AnimatedGradientHeader from '@/components/previews/AnimatedGradientHeader'
import GlassmorphicSearchBar from '@/components/previews/GlassmorphicSearchBar'
import FloatingNav from '@/components/previews/FloatingNav'

export const componentsData: ComponentData[] = [
  {
    id: 'animated-gradient-header',
    name: 'Animated Gradient Header',
    description: 'A mesmerizing header with flowing gradient animations and smooth parallax effects',
    category: 'headers',
    tags: ['animation', 'gradient', 'parallax', 'hero'],
    preview: AnimatedGradientHeader,
    code: `'use client'

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
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black">
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
          background: \`radial-gradient(600px circle at \${mousePosition.x}px \${mousePosition.y}px, rgba(255, 255, 255, 0.06), transparent 40%)\`,
        }}
      />

      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-7xl md:text-9xl font-bold mb-6 tracking-tighter"
          >
            PropLib
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-10"
          >
            AI-Native UI Components for the Future
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex gap-4 justify-center"
          >
            <button className="px-8 py-4 rounded-full text-base font-medium bg-white text-black hover:scale-105 transition-transform">
              Explore Components
            </button>
            <button className="px-8 py-4 rounded-full text-base font-medium border border-white/20 text-white hover:bg-white/10 transition-colors">
              Get Started
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}`,
    dependencies: ['framer-motion', 'react'],
    integration: `Import the component and add it to your page:

\`\`\`tsx
import AnimatedGradientHeader from '@/components/AnimatedGradientHeader'

export default function Page() {
  return <AnimatedGradientHeader />
}
\`\`\``,
  },
  {
    id: 'glassmorphic-search-bar',
    name: 'Glassmorphic Search Bar',
    description: 'Elegant search bar with glassmorphism design and smooth focus animations',
    category: 'search',
    tags: ['glassmorphism', 'input', 'search', 'interactive'],
    preview: GlassmorphicSearchBar,
    code: `'use client'

import { motion } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { useState } from 'react'

export default function GlassmorphicSearchBar() {
  const [isFocused, setIsFocused] = useState(false)
  const [value, setValue] = useState('')

  return (
    <motion.div
      className="relative w-full max-w-2xl"
      animate={{ scale: isFocused ? 1.02 : 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="glass rounded-3xl p-1 glow-box">
        <div className="flex items-center gap-3 px-5 py-4">
          <Search className="w-5 h-5 text-purple-400" />

          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search components..."
            className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
          />

          {value && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              onClick={() => setValue('')}
              className="p-1 hover:bg-glass-200 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </motion.button>
          )}
        </div>
      </div>

      {isFocused && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 mt-2 glass rounded-2xl p-4"
        >
          <p className="text-sm text-gray-400">Start typing to search...</p>
        </motion.div>
      )}
    </motion.div>
  )
}`,
    dependencies: ['framer-motion', 'lucide-react', 'react'],
    integration: `Add to your layout or page:

\`\`\`tsx
import GlassmorphicSearchBar from '@/components/GlassmorphicSearchBar'

export default function Page() {
  return (
    <div className="flex justify-center p-8">
      <GlassmorphicSearchBar />
    </div>
  )
}
\`\`\``,
  },
  {
    id: 'floating-nav',
    name: 'Floating Navigation',
    description: 'Modern floating navigation bar with smooth animations and hover effects',
    category: 'navigation',
    tags: ['navigation', 'floating', 'animated', 'menu'],
    preview: FloatingNav,
    code: `'use client'

import { motion } from 'framer-motion'
import { Home, Layers, Zap, Settings } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { icon: Home, label: 'Home' },
  { icon: Layers, label: 'Components' },
  { icon: Zap, label: 'Features' },
  { icon: Settings, label: 'Settings' },
]

export default function FloatingNav() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="glass-strong rounded-3xl p-2 flex gap-2">
        {navItems.map((item, index) => {
          const Icon = item.icon
          const isActive = activeIndex === index

          return (
            <motion.button
              key={item.label}
              onClick={() => setActiveIndex(index)}
              className="relative px-6 py-3 rounded-2xl transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isActive && (
                <motion.div
                  layoutId="active-nav"
                  className="absolute inset-0 bg-gradient-duotone rounded-2xl"
                  transition={{ type: 'spring', duration: 0.6 }}
                />
              )}

              <div className="relative flex items-center gap-2">
                <Icon className="w-5 h-5" />
                {isActive && (
                  <motion.span
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 'auto', opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="text-sm font-medium"
                  >
                    {item.label}
                  </motion.span>
                )}
              </div>
            </motion.button>
          )
        })}
      </div>
    </motion.nav>
  )
}`,
    dependencies: ['framer-motion', 'lucide-react', 'react'],
    integration: `Add to your root layout:

\`\`\`tsx
import FloatingNav from '@/components/FloatingNav'

export default function RootLayout({ children }) {
  return (
    <>
      {children}
      <FloatingNav />
    </>
  )
}
\`\`\``,
  },
]
