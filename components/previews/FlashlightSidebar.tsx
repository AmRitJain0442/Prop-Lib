'use client'

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

// Fixed particle positions to avoid hydration mismatch
const particlePositions = [
  { left: 15, top: 12 }, { left: 78, top: 25 }, { left: 45, top: 38 },
  { left: 92, top: 45 }, { left: 23, top: 58 }, { left: 67, top: 65 },
  { left: 38, top: 78 }, { left: 85, top: 82 }, { left: 12, top: 88 },
  { left: 56, top: 15 }, { left: 72, top: 52 }, { left: 34, top: 22 },
  { left: 88, top: 68 }, { left: 19, top: 72 }, { left: 61, top: 35 },
  { left: 43, top: 92 }, { left: 8, top: 48 }, { left: 75, top: 8 },
  { left: 28, top: 95 }, { left: 94, top: 18 }
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

  const calculateDistance = (itemIndex: number, totalItems: number, containerHeight: number) => {
    const itemHeight = containerHeight / totalItems
    const itemCenterY = (itemIndex + 0.5) * itemHeight
    const distance = Math.sqrt(
      Math.pow(mouseX.get() - 150, 2) + Math.pow(mouseY.get() - itemCenterY, 2)
    )
    return distance
  }

  return (
    <div className="relative flex min-h-full w-full bg-black overflow-hidden">
      {/* Main content area */}
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

      {/* Flashlight Sidebar */}
      <motion.div
        className="relative w-80 bg-zinc-950 border-l border-white/5 overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        {/* Flashlight effect - radial gradient that follows cursor */}
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

        {/* Secondary glow */}
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

        {/* Menu items */}
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
                    {/* Icon - always slightly visible */}
                    <motion.div
                      className="relative"
                      animate={{
                        scale: isSelected ? 1.2 : 1,
                      }}
                    >
                      <Icon className="w-5 h-5 text-white/40 group-hover:text-white/70 transition-colors drop-shadow-[0_0_4px_rgba(255,255,255,0.3)]" />
                      
                      {/* Icon glow when in flashlight */}
                      <motion.div
                        className="absolute inset-0"
                        style={{
                          opacity: 0,
                        }}
                      >
                        <Icon className="w-5 h-5 text-purple-300 drop-shadow-[0_0_12px_rgba(168,85,247,1)]" />
                      </motion.div>
                    </motion.div>

                    {/* Text content - hidden by default */}
                    <div className="flex-1 min-w-0">
                      <p className="text-white/35 group-hover:text-white/60 font-medium text-sm transition-colors drop-shadow-[0_0_4px_rgba(255,255,255,0.2)]">
                        {item.label}
                      </p>
                      <p className="text-white/25 text-xs transition-colors drop-shadow-[0_0_2px_rgba(255,255,255,0.2)]">
                        {item.sublabel}
                      </p>
                    </div>

                    {/* Active indicator */}
                    {isSelected && (
                      <motion.div
                        layoutId="active-indicator"
                        className="absolute right-2 w-1.5 h-8 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </motion.div>

                  {/* Ripple effect on click */}
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

        {/* Ambient particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {particlePositions.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-500/30 rounded-full"
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
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
}
