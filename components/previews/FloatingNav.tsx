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
    <div className="flex items-center justify-center h-full w-full bg-dark-900 p-8">
      <motion.nav
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="glass-strong rounded-2xl p-1.5 flex gap-1">
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
