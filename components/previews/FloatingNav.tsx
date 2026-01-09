'use client'

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
    <div className="relative flex items-center justify-center min-h-full w-full bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 overflow-hidden p-8">
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
                className="relative px-4 py-2 rounded-xl transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute inset-0 bg-gradient-duotone rounded-xl"
                    transition={{ type: 'spring', duration: 0.6 }}
                  />
                )}

                <div className="relative flex items-center gap-1.5">
                  <Icon className="w-4 h-4" />
                  {isActive && (
                    <motion.span
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 'auto', opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      className="text-xs font-medium whitespace-nowrap"
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
}
