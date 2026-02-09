'use client'

import { ComponentType, useState } from 'react'
import { motion } from 'framer-motion'

interface ComponentPreviewProps {
  component: ComponentType
  className?: string
}

export default function ComponentPreview({
  component: Component,
  className = '',
}: ComponentPreviewProps) {
  const [isActive, setIsActive] = useState(false)

  return (
    <motion.div
      className={`relative w-full h-48 rounded-xl overflow-hidden bg-dark-900 border border-glass-100 ${className}`}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.15 }}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
      tabIndex={0}
    >
      <div className="absolute inset-0">
        {isActive ? (
          <Component />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute -top-10 -left-10 w-36 h-36 rounded-full bg-blue-500/30 blur-3xl" />
              <div className="absolute -bottom-10 -right-10 w-36 h-36 rounded-full bg-purple-500/30 blur-3xl" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="px-3 py-1.5 rounded-full border border-white/15 bg-black/40 text-xs text-zinc-300">
                Hover to run preview
              </div>
            </div>
          </div>
        )}
      </div>

      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-end justify-center pb-4 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        <span className="text-xs text-white/80">Click to open full sandbox</span>
      </motion.div>
    </motion.div>
  )
}
