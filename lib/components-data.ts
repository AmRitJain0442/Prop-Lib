import { ComponentData } from './types'
import AnimatedGradientHeader from '@/components/previews/AnimatedGradientHeader'
import GlassmorphicSearchBar from '@/components/previews/GlassmorphicSearchBar'
import FloatingNav from '@/components/previews/FloatingNav'
import FerrofluidTabBar from '@/components/previews/FerrofluidTabBar'

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
    <div className="relative flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-zinc-950 via-purple-950/20 to-blue-950/20 overflow-hidden p-8">
      {/* Background Texture for Glass Effect */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-purple-500/30 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-500/30 blur-[120px]" />
        <div className="absolute top-[40%] left-[50%] w-[40%] h-[40%] rounded-full bg-pink-500/20 blur-[100px]" />
        
        <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="waves" x="0" y="0" width="100" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 20 Q25 10 50 20 T100 20" fill="none" stroke="rgba(147,51,234,0.4)" strokeWidth="2" />
              <path d="M0 30 Q25 20 50 30 T100 30" fill="none" stroke="rgba(59,130,246,0.3)" strokeWidth="1.5" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#waves)" />
        </svg>
      </div>

      <motion.div
        className="relative w-full max-w-2xl z-10"
        animate={{ scale: isFocused ? 1.02 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="relative backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-1 shadow-2xl shadow-purple-500/20">
          <div className="flex items-center gap-4 px-6 py-4">
            <Search className="w-5 h-5 text-purple-300" />

            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Search components..."
              className="flex-1 bg-transparent outline-none text-white text-base placeholder-gray-300/60"
            />

            {value && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                onClick={() => setValue('')}
                className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
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
            className="absolute top-full left-0 right-0 mt-3 backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-4 shadow-xl"
          >
            <p className="text-sm text-gray-300">Start typing to search...</p>
          </motion.div>
        )}
      </motion.div>
    </div>
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
    <div className="relative flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 overflow-hidden p-8">
      {/* Mild Background Texture */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[80px]" />
        <div className="absolute bottom-[20%] left-[10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[80px]" />
        
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill="rgba(255,255,255,0.2)" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <motion.nav
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10"
      >
        <div className="bg-zinc-950/90 backdrop-blur-xl border border-white/10 rounded-2xl p-1.5 flex gap-1 transition-all duration-300 hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]">
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
    </div>
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
  {
    id: 'ferrofluid-tab-bar',
    name: 'Ferrofluid Tab Bar',
    description: 'Magnetic liquid metal tab bar with morphing blob that follows cursor with mesmerizing fluid animations',
    category: 'navigation',
    tags: ['navigation', 'animated', 'interactive', 'fluid', 'magnetic'],
    preview: FerrofluidTabBar,
    code: `'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Home, Search, Bell, User, Settings, Heart } from 'lucide-react'
import { useState, useRef } from 'react'

const tabs = [
  { icon: Home, label: 'Home' },
  { icon: Search, label: 'Search' },
  { icon: Heart, label: 'Likes' },
  { icon: Bell, label: 'Notifications' },
  { icon: User, label: 'Profile' },
  { icon: Settings, label: 'Settings' },
]

export default function FerrofluidTabBar() {
  const [activeTab, setActiveTab] = useState(0)
  const [hoveredTab, setHoveredTab] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const blobX = useSpring(mouseX, { damping: 20, stiffness: 300 })
  const blobY = useSpring(mouseY, { damping: 20, stiffness: 300 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)
    }
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen w-full bg-zinc-950 overflow-hidden p-8">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-purple-950/10 to-blue-950/10" />
      
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative z-10"
      >
        <nav className="relative bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-3xl p-2">
          {/* Ferrofluid blob - follows cursor */}
          <motion.div
            className="absolute w-16 h-16 pointer-events-none"
            style={{
              x: blobX,
              y: blobY,
              translateX: '-50%',
              translateY: '-50%',
            }}
          >
            <motion.div
              className="w-full h-full rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 blur-xl opacity-60"
              animate={{
                scale: hoveredTab !== null ? [1, 1.2, 1] : 1,
              }}
              transition={{
                duration: 0.6,
                repeat: hoveredTab !== null ? Infinity : 0,
              }}
            />
          </motion.div>

          {/* Active tab indicator - liquid metal blob */}
          <motion.div
            className="absolute top-2 left-2 w-14 h-14 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl"
            animate={{
              x: activeTab * 64,
            }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 400,
              mass: 0.8,
            }}
            style={{
              boxShadow: '0 0 30px rgba(96, 165, 250, 0.6), 0 0 60px rgba(139, 92, 246, 0.4)',
            }}
          />

          <div className="relative flex gap-2">
            {tabs.map((tab, index) => {
              const Icon = tab.icon
              const isActive = activeTab === index
              const isHovered = hoveredTab === index

              return (
                <motion.button
                  key={tab.label}
                  onClick={() => setActiveTab(index)}
                  onMouseEnter={() => setHoveredTab(index)}
                  onMouseLeave={() => setHoveredTab(null)}
                  className="relative w-14 h-14 flex items-center justify-center rounded-2xl transition-colors z-10"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    animate={{
                      scale: isActive ? 1.2 : 1,
                      rotate: isHovered ? [0, -10, 10, 0] : 0,
                    }}
                    transition={{
                      scale: { type: 'spring', stiffness: 300 },
                      rotate: { duration: 0.4 },
                    }}
                  >
                    <Icon
                      className={\`w-5 h-5 transition-colors \${
                        isActive ? 'text-white' : 'text-zinc-400'
                      }\`}
                    />
                  </motion.div>

                  {/* Ripple effect on hover */}
                  {isHovered && (
                    <motion.div
                      className="absolute inset-0 border-2 border-cyan-400/50 rounded-2xl"
                      initial={{ scale: 1, opacity: 1 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                    />
                  )}
                </motion.button>
              )
            })}
          </div>
        </nav>

        {/* Active tab label */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-center"
        >
          <p className="text-sm font-medium text-white">{tabs[activeTab].label}</p>
        </motion.div>
      </div>
    </div>
  )
}`,
    dependencies: ['framer-motion', 'lucide-react', 'react'],
    integration: `Add to your page or layout:

\`\`\`tsx
import FerrofluidTabBar from '@/components/FerrofluidTabBar'

export default function Page() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <FerrofluidTabBar />
    </div>
  )
}
\`\`\``,
  },
]
