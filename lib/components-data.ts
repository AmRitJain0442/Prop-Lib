import { ComponentData } from './types'
import AnimatedGradientHeader from '@/components/previews/AnimatedGradientHeader'
import GlassmorphicSearchBar from '@/components/previews/GlassmorphicSearchBar'
import FloatingNav from '@/components/previews/FloatingNav'
import FerrofluidTabBar from '@/components/previews/FerrofluidTabBar'
import FlashlightSidebar from '@/components/previews/FlashlightSidebar'
import GravityWellUpload from '@/components/previews/GravityWellUpload'
import SafeCrackerSlider from '@/components/previews/SafeCrackerSlider'
import KineticSandButton from '@/components/previews/KineticSandButton'

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
  {
    id: 'flashlight-sidebar',
    name: 'Flashlight Sidebar',
    description: 'Mysterious dark sidebar that reveals navigation items only within cursor radius - like exploring with a torch',
    category: 'navigation',
    tags: ['sidebar', 'navigation', 'dark', 'interactive', 'mysterious'],
    preview: FlashlightSidebar,
    code: `'use client'

import { motion, useMotionValue } from 'framer-motion'
import { Home, Search, Bell, User, Settings, File, Heart, Star, Calendar, Mail } from 'lucide-react'
import { useState } from 'react'

const menuItems = [
  { icon: Home, label: 'Home', sublabel: 'Dashboard' },
  { icon: Search, label: 'Search', sublabel: 'Find anything' },
  { icon: Bell, label: 'Notifications', sublabel: '5 new alerts' },
  { icon: Mail, label: 'Messages', sublabel: '12 unread' },
  { icon: Calendar, label: 'Calendar', sublabel: 'Schedule' },
  { icon: File, label: 'Documents', sublabel: 'Your files' },
  { icon: Star, label: 'Favorites', sublabel: 'Saved items' },
  { icon: Heart, label: 'Likes', sublabel: 'Liked posts' },
  { icon: User, label: 'Profile', sublabel: 'Your account' },
  { icon: Settings, label: 'Settings', sublabel: 'Preferences' },
]

// Pre-defined particle positions to avoid SSR hydration mismatch
const particlePositions = [
  { left: 15, top: 12 }, { left: 78, top: 25 }, { left: 45, top: 38 },
  { left: 89, top: 52 }, { left: 22, top: 65 }, { left: 67, top: 78 },
  { left: 8, top: 88 }, { left: 93, top: 15 }, { left: 34, top: 45 },
  { left: 72, top: 72 }, { left: 51, top: 8 }, { left: 12, top: 92 },
  { left: 85, top: 35 }, { left: 28, top: 58 }, { left: 63, top: 18 },
  { left: 5, top: 48 }, { left: 95, top: 68 }, { left: 41, top: 82 },
  { left: 76, top: 5 }, { left: 18, top: 95 },
]

export default function FlashlightSidebar() {
  const [selectedItem, setSelectedItem] = useState<number | null>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  return (
    <div className="relative flex min-h-screen w-full bg-black overflow-hidden">
      <div className="flex-1 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <motion.h2 
              className="text-4xl font-bold text-white/10 mb-4"
              animate={{ opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Main Content
            </motion.h2>
            <p className="text-white/5">Move cursor to sidebar to explore</p>
          </div>
        </div>
      </div>

      <motion.div
        className="relative w-80 bg-zinc-950 border-l border-white/5 overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        <motion.div
          className="absolute pointer-events-none z-20"
          style={{
            width: 500,
            height: 500,
            left: mouseX,
            top: mouseY,
            x: '-50%',
            y: '-50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.4) 15%, rgba(255,255,255,0.2) 35%, rgba(255,255,255,0.05) 55%, transparent 75%)',
            filter: 'blur(3px)',
          }}
        />

        <motion.div
          className="absolute pointer-events-none z-10"
          style={{
            width: 700,
            height: 700,
            left: mouseX,
            top: mouseY,
            x: '-50%',
            y: '-50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, rgba(59,130,246,0.25) 20%, rgba(139,92,246,0.12) 45%, transparent 70%)',
          }}
        />

        <nav className="relative h-full py-8 px-6">
          <div className="space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon
              const isSelected = selectedItem === index

              return (
                <motion.button
                  key={index}
                  onClick={() => setSelectedItem(index)}
                  className="relative w-full text-left group"
                  whileHover={{ x: 8 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="flex items-center gap-4 px-4 py-3 rounded-xl transition-colors"
                    style={{
                      backgroundColor: isSelected ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
                    }}
                  >
                    <motion.div
                      className="relative"
                      animate={{
                        scale: isSelected ? 1.2 : 1,
                      }}
                    >
                      <Icon className="w-5 h-5 text-white/40 group-hover:text-white/70 transition-colors drop-shadow-[0_0_4px_rgba(255,255,255,0.3)]" />
                      
                      <motion.div
                        className="absolute inset-0"
                        style={{
                          opacity: 0,
                        }}
                      >
                        <Icon className="w-5 h-5 text-purple-300 drop-shadow-[0_0_12px_rgba(168,85,247,1)]" />
                      </motion.div>
                    </motion.div>

                    <div className="flex-1 min-w-0">
                      <p className="text-white/35 group-hover:text-white/60 font-medium text-sm transition-colors drop-shadow-[0_0_4px_rgba(255,255,255,0.2)]">
                        {item.label}
                      </p>
                      <p className="text-white/25 text-xs transition-colors drop-shadow-[0_0_2px_rgba(255,255,255,0.2)]">
                        {item.sublabel}
                      </p>
                    </div>

                    {isSelected && (
                      <motion.div
                        layoutId="active-indicator"
                        className="absolute right-2 w-1.5 h-8 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </motion.div>

                  {isSelected && (
                    <motion.div
                      className="absolute inset-0 border-2 border-purple-500/30 rounded-xl"
                      initial={{ scale: 0.8, opacity: 1 }}
                      animate={{ scale: 1.1, opacity: 0 }}
                      transition={{ duration: 0.6 }}
                    />
                  )}
                </motion.button>
              )
            })}
          </div>
        </nav>

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {particlePositions.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-500/30 rounded-full"
              style={{
                left: \`\${pos.left}%\`,
                top: \`\${pos.top}%\`,
              }}
              animate={{
                opacity: [0, 0.5, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2 + (i % 3),
                repeat: Infinity,
                delay: (i % 4) * 0.5,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}`,
    dependencies: ['framer-motion', 'lucide-react', 'react'],
    integration: `Add to your layout:

\`\`\`tsx
import FlashlightSidebar from '@/components/FlashlightSidebar'

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen">
      <FlashlightSidebar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
\`\`\``,
  },
  {
    id: 'gravity-well-upload',
    name: 'Gravity Well Upload',
    description: 'File upload zone that acts like a planetary gravity well - files get pulled into orbit and absorbed with warp speed animation',
    category: 'forms',
    tags: ['upload', 'file', 'interactive', 'animation', 'gravity'],
    preview: GravityWellUpload,
    code: `'use client'

import { motion, useMotionValue, useAnimation } from 'framer-motion'
import { Upload, File, CheckCircle } from 'lucide-react'
import { useState, useRef } from 'react'

export default function GravityWellUpload() {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploaded, setIsUploaded] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [fileName, setFileName] = useState('')
  const [dragCounter, setDragCounter] = useState(0)
  const [orbitalAngle, setOrbitalAngle] = useState(0)
  
  const fileX = useMotionValue(0)
  const fileY = useMotionValue(0)
  const controls = useAnimation()
  const buttonControls = useAnimation()
  const containerRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    setDragCounter(prev => prev + 1)
    if (!isDragging) {
      setIsDragging(true)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top
      
      const dx = centerX - mouseX
      const dy = centerY - mouseY
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      const angleToMouse = Math.atan2(dy, dx)
      
      const orbitalSpeed = Math.max(0, 1 - distance / 300) * 0.15
      setOrbitalAngle(prev => prev + orbitalSpeed)
      
      const gravityStrength = Math.max(0, 1 - distance / 300)
      const orbitRadius = distance * (1 - gravityStrength * 0.3)
      
      const swirledAngle = angleToMouse + orbitalAngle
      const targetX = centerX - Math.cos(swirledAngle) * orbitRadius
      const targetY = centerY - Math.sin(swirledAngle) * orbitRadius
      
      fileX.set(targetX)
      fileY.set(targetY)
    }
  }

  const handleFileSelect = async (file: File) => {
    setFileName(file.name)
    setIsUploading(true)
    
    if (isDragging) {
      await controls.start({
        scale: [1, 0.5, 0],
        rotate: [0, 720],
        opacity: [1, 1, 0],
        transition: { duration: 0.6, ease: 'easeIn' }
      })
    }
    
    buttonControls.start({
      scale: [1, 1.2, 1],
      transition: { duration: 0.8, ease: 'easeOut' }
    })
    
    setTimeout(() => {
      setIsUploaded(true)
      setIsUploading(false)
      setIsDragging(false)
      
      setTimeout(() => {
        setIsUploaded(false)
        setFileName('')
      }, 3000)
    }, 2000)
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragCounter(0)
    
    const files = e.dataTransfer.files
    
    if (files.length > 0) {
      handleFileSelect(files[0])
    } else {
      setIsDragging(false)
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragCounter(prev => prev - 1)
    if (dragCounter <= 1) {
      setIsDragging(false)
      setOrbitalAngle(0)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-full w-full bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 p-8">
      <div
        ref={containerRef}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        className="relative w-full max-w-md aspect-square"
      >
        {isDragging && (
          <>
            <motion.div
              className="absolute inset-0 border-2 border-purple-500/30 rounded-full"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute inset-8 border-2 border-blue-500/30 rounded-full"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute inset-16 border-2 border-pink-500/30 rounded-full"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            />
          </>
        )}

        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          animate={isDragging ? {
            scale: [1, 1.1, 1],
            boxShadow: [
              '0 0 20px rgba(168,85,247,0.5)',
              '0 0 40px rgba(168,85,247,0.8)',
              '0 0 20px rgba(168,85,247,0.5)',
            ]
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={handleButtonClick}
        >
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileInputChange}
            className="hidden"
            accept="*/*"
          />
          <div className="relative">
            <motion.div
              className="w-32 h-32 rounded-full flex items-center justify-center shadow-2xl overflow-hidden"
              animate={buttonControls}
              style={{
                background: isUploading || isUploaded
                  ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 30%, #10b981 60%, #059669 100%)'
                  : 'linear-gradient(to bottom right, rgb(147, 51, 234), rgb(219, 39, 119))'
              }}
              whileHover={{ scale: 1.05 }}
            >
              {(isUploading || isUploaded) && (
                <>
                  <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="absolute top-4 left-6 w-8 h-6 bg-green-600/60 rounded-full" />
                    <div className="absolute top-8 right-8 w-12 h-8 bg-green-700/60 rounded-lg rotate-45" />
                    <div className="absolute bottom-6 left-8 w-10 h-10 bg-green-600/60 rounded-full" />
                    <div className="absolute bottom-8 right-6 w-6 h-8 bg-green-700/60 rounded-lg -rotate-12" />
                  </motion.div>
                  <motion.div
                    className="absolute inset-0"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  >
                    <div className="absolute top-6 right-4 w-6 h-3 bg-white/30 rounded-full blur-sm" />
                    <div className="absolute top-12 left-4 w-8 h-3 bg-white/30 rounded-full blur-sm" />
                    <div className="absolute bottom-10 right-8 w-5 h-2 bg-white/30 rounded-full blur-sm" />
                  </motion.div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-300/20 via-transparent to-transparent" />
                </>
              )}
              
              {isUploaded ? (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="relative z-10"
                >
                  <CheckCircle className="w-16 h-16 text-white drop-shadow-lg" />
                </motion.div>
              ) : isUploading ? (
                <motion.div
                  className="relative z-10"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <Upload className="w-16 h-16 text-white/80 drop-shadow-lg" />
                </motion.div>
              ) : (
                <Upload className="w-16 h-16 text-white" />
              )}
            </motion.div>

            {isDragging && (
              <motion.div
                className="absolute inset-0 rounded-full bg-purple-500/20"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </div>
        </motion.div>

        {isDragging && !isUploaded && (
          <motion.div
            className="absolute pointer-events-none"
            style={{
              left: fileX,
              top: fileY,
              x: '-50%',
              y: '-50%',
            }}
            animate={controls}
          >
            <motion.div
              className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-2xl flex items-center gap-3"
              animate={{
                rotate: orbitalAngle * 57.2958,
              }}
              transition={{ duration: 0.1, ease: 'linear' }}
            >
              <File className="w-8 h-8 text-purple-600" />
              <span className="text-sm font-medium text-gray-800">
                {fileName || 'Drop file here'}
              </span>
            </motion.div>
          </motion.div>
        )}

        {!isDragging && !isUploaded && !isUploading && (
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-white/60 text-sm">Click to upload or drag a file to experience the gravity well</p>
          </motion.div>
        )}

        {isUploaded && (
          <motion.div
            className="absolute top-4 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-lg px-4 py-2">
              <p className="text-green-300 text-sm font-medium">File uploaded successfully!</p>
            </div>
          </motion.div>
        )}

        {isUploading && fileName && (
          <motion.div
            className="absolute top-4 left-1/2 -translate-x-1/2 max-w-xs"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 rounded-lg px-4 py-2">
              <p className="text-purple-300 text-sm font-medium truncate">Uploading {fileName}...</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}`,
    dependencies: ['framer-motion', 'lucide-react', 'react'],
    integration: `Add to your form:

\`\`\`tsx
import GravityWellUpload from '@/components/GravityWellUpload'

export default function UploadForm() {
  return (
    <div className="p-8">
      <GravityWellUpload />
    </div>
  )
}
\`\`\``,
  },
  {
    id: 'safe-cracker-slider',
    name: 'Safe Cracker Slider',
    description: 'Rotary dial slider like a safe combination lock - clicks haptically and rotates with momentum as you drag',
    category: 'forms',
    tags: ['slider', 'range', 'interactive', 'haptic', 'dial'],
    preview: SafeCrackerSlider,
    code: `'use client'

import { motion, useMotionValue } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'

export default function SafeCrackerSlider() {
  const [value, setValue] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const rotation = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const snapValue = (val: number) => Math.round(val / 5) * 5

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    updateRotation(e)
  }

  const updateRotation = (e: MouseEvent | React.MouseEvent) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX)
    let degrees = (angle * 180) / Math.PI + 90

    if (degrees < 0) degrees += 360

    const snappedDegrees = snapValue(degrees)
    rotation.set(snappedDegrees)

    const newValue = Math.round((snappedDegrees / 360) * 100)
    setValue(newValue)

    if ('vibrate' in navigator && snappedDegrees !== degrees) {
      navigator.vibrate(1)
    }
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        updateRotation(e)
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging])

  return (
    <div className="flex items-center justify-center min-h-full w-full bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-8">
      <div className="text-center space-y-8">
        <motion.div animate={{ opacity: isDragging ? 1 : 0.7 }}>
          <div className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 text-transparent bg-clip-text">
            <motion.p
              className="text-7xl font-bold tabular-nums"
              key={value}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            >
              {value}
            </motion.p>
          </div>
          <p className="text-zinc-400 text-sm mt-2">Turn the dial to adjust</p>
        </motion.div>

        <div
          ref={containerRef}
          className="relative w-80 h-80 mx-auto cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 shadow-2xl border-8 border-zinc-700">
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30) - 90
              const isActive = Math.abs(angle - (rotation.get() - 90)) < 30
              return (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 origin-left"
                  style={{
                    width: '45%',
                    height: 4,
                    transform: \`rotate(\${angle}deg)\`,
                  }}
                  animate={{
                    opacity: isActive ? 1 : 0.3,
                  }}
                >
                  <div className="absolute right-0 w-8 h-4 bg-gradient-to-r from-transparent to-amber-500 rounded-r-full" />
                  <div className="absolute right-2 text-amber-500 font-bold text-xs transform -translate-y-1">
                    {i * 10}
                  </div>
                </motion.div>
              )
            })}

            {Array.from({ length: 72 }).map((_, i) => {
              if (i % 6 === 0) return null
              const angle = (i * 5) - 90
              return (
                <div
                  key={\`minor-\${i}\`}
                  className="absolute top-1/2 left-1/2 origin-left"
                  style={{
                    width: '45%',
                    height: 2,
                    transform: \`rotate(\${angle}deg)\`,
                  }}
                >
                  <div className="absolute right-0 w-4 h-2 bg-gradient-to-r from-transparent to-zinc-600 rounded-r-full" />
                </div>
              )
            })}
          </div>

          <motion.div
            className="absolute inset-8 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 shadow-inner"
            style={{
              rotate: rotation,
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
              mass: 0.8,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 shadow-2xl flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 shadow-inner" />
                </div>
              </div>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-32 bg-gradient-to-b from-amber-500 to-transparent origin-bottom -translate-y-16 rounded-t-full shadow-lg shadow-amber-500/50" />

            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 origin-left"
                style={{
                  width: '42%',
                  height: 8,
                  transform: \`rotate(\${i * 45}deg)\`,
                }}
              >
                <div className="absolute right-2 w-6 h-8 bg-zinc-800 rounded-sm shadow-inner" />
              </div>
            ))}
          </motion.div>

          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
          
          {isDragging && (
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(251,146,60,0.3)',
                  '0 0 40px rgba(251,146,60,0.5)',
                  '0 0 20px rgba(251,146,60,0.3)',
                ],
              }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </div>

        {isDragging && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-full px-4 py-2">
              <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-zinc-400 text-sm">Click positions: {Math.round(value / 5)}</span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}`,
    dependencies: ['framer-motion', 'react'],
    integration: `Add to your form:

\`\`\`tsx
import SafeCrackerSlider from '@/components/SafeCrackerSlider'

export default function Settings() {
  return (
    <div className="p-8">
      <SafeCrackerSlider />
    </div>
  )
}
\`\`\``,
  },
  {
    id: 'kinetic-sand-button',
    name: 'Kinetic Sand Button',
    description: 'Submit button made of particles that tremble on hover and explode into dust before reassembling into success state',
    category: 'forms',
    tags: ['button', 'submit', 'particles', 'animation', 'interactive'],
    preview: KineticSandButton,
    code: `'use client'

import { motion } from 'framer-motion'
import { Check, Loader2 } from 'lucide-react'
import { useState } from 'react'

const particleGrid = Array.from({ length: 15 }, (_, row) =>
  Array.from({ length: 40 }, (_, col) => ({
    x: (col / 39) * 160 - 80,
    y: (row / 14) * 50 - 25,
    id: row * 40 + col,
  }))
).flat()

type ButtonState = 'idle' | 'hover' | 'loading' | 'success'

export default function KineticSandButton() {
  const [state, setState] = useState<ButtonState>('idle')
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = async () => {
    if (state !== 'idle' && state !== 'hover') return

    setState('loading')

    setTimeout(() => {
      setState('success')
      setTimeout(() => {
        setState('idle')
      }, 2000)
    }, 2000)
  }

  return (
    <div className="flex items-center justify-center min-h-full w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="relative">
        <motion.button
          onMouseEnter={() => {
            setIsHovered(true)
            if (state === 'idle') setState('hover')
          }}
          onMouseLeave={() => {
            setIsHovered(false)
            if (state === 'hover') setState('idle')
          }}
          onClick={handleClick}
          disabled={state === 'loading' || state === 'success'}
          className="relative w-64 h-16 overflow-hidden rounded-2xl cursor-pointer disabled:cursor-not-allowed"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-20 rounded-2xl" />

          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="-100 -40 200 80"
            style={{ overflow: 'visible' }}
          >
            {particleGrid.map((particle) => {
              let animation = {}
              
              if (state === 'hover') {
                animation = {
                  x: [particle.x, particle.x + (Math.random() - 0.5) * 2, particle.x],
                  y: [particle.y, particle.y + (Math.random() - 0.5) * 2, particle.y],
                }
              } else if (state === 'loading') {
                const angle = Math.atan2(particle.y, particle.x)
                const distance = 100 + Math.random() * 50
                animation = {
                  x: [particle.x, Math.cos(angle) * distance],
                  y: [particle.y, Math.sin(angle) * distance],
                  opacity: [1, 0],
                }
              } else if (state === 'success') {
                const t = particle.id / particleGrid.length
                const checkX = -40 + (t * 80)
                const checkY = Math.sin(t * Math.PI) * 20 - 10
                
                animation = {
                  x: [particle.x, checkX],
                  y: [particle.y, checkY],
                  opacity: [0, 1],
                }
              } else {
                animation = {
                  x: particle.x,
                  y: particle.y,
                  opacity: 1,
                }
              }

              return (
                <motion.circle
                  key={particle.id}
                  cx={particle.x}
                  cy={particle.y}
                  r={0.8}
                  fill={state === 'success' ? '#10b981' : '#a855f7'}
                  initial={false}
                  animate={animation}
                  transition={{
                    duration: state === 'loading' ? 0.6 : state === 'success' ? 0.8 : 0.3,
                    ease: state === 'loading' ? 'easeOut' : 'easeInOut',
                    repeat: state === 'hover' ? Infinity : 0,
                    repeatType: 'reverse',
                  }}
                />
              )
            })}
          </svg>

          <div className="relative z-10 flex items-center justify-center h-full">
            {state === 'loading' && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-2"
              >
                <Loader2 className="w-6 h-6 text-purple-300 animate-spin" />
                <span className="text-purple-300 font-semibold">Processing...</span>
              </motion.div>
            )}

            {state === 'success' && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-2"
              >
                <Check className="w-6 h-6 text-green-400" />
                <span className="text-green-400 font-semibold">Success!</span>
              </motion.div>
            )}

            {(state === 'idle' || state === 'hover') && (
              <motion.span
                className="text-white font-semibold text-lg"
                animate={{
                  scale: state === 'hover' ? 1.05 : 1,
                }}
              >
                Submit
              </motion.span>
            )}
          </div>

          {isHovered && state === 'hover' && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-2xl"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </motion.button>

        <motion.div
          className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-2xl"
          animate={{
            opacity: state === 'loading' || state === 'success' ? [0.2, 0.4, 0.2] : 0.2,
            scale: state === 'loading' ? [1, 1.2, 1] : 1,
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        <motion.p
          className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-purple-300/60 text-sm whitespace-nowrap"
          animate={{ opacity: state === 'idle' || state === 'hover' ? 1 : 0 }}
        >
          Hover to see particles tremble, click to explode
        </motion.p>
      </div>
    </div>
  )
}`,
    dependencies: ['framer-motion', 'lucide-react', 'react'],
    integration: `Add to your form:

\`\`\`tsx
import KineticSandButton from '@/components/KineticSandButton'

export default function Form() {
  return (
    <form className="space-y-4">
      {/* Your form fields */}
      <KineticSandButton />
    </form>
  )
}
\`\`\``,
  },
]

