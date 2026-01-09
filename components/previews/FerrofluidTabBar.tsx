'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Home, Search, Bell, User, Settings, Heart } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

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
    <div className="relative flex items-center justify-center min-h-full w-full bg-zinc-950 overflow-hidden p-8">
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
                      className={`w-5 h-5 transition-colors ${
                        isActive ? 'text-white' : 'text-zinc-400'
                      }`}
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
}
