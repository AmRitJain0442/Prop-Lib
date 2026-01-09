'use client'

import { ComponentType } from 'react'
import { motion } from 'framer-motion'

interface ComponentPreviewProps {
  component: ComponentType
  className?: string
}

export default function ComponentPreview({
  component: Component,
  className = ''
}: ComponentPreviewProps) {
  return (
    <motion.div
      className={`relative w-full h-48 rounded-xl overflow-hidden bg-dark-900 border border-glass-100 ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute inset-0">
        <Component />
      </div>

      {/* Overlay on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        <span className="text-xs text-white/80">Click to view in sandbox</span>
      </motion.div>
    </motion.div>
  )
}
