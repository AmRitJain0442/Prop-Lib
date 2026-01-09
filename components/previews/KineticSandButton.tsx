'use client'

import { motion, useAnimation } from 'framer-motion'
import { Check, Loader2 } from 'lucide-react'
import { useState } from 'react'

// Fixed particle positions for SSR safety
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

    // Simulate loading
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
          {/* Base background */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-20 rounded-2xl" />

          {/* Particle system */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="-100 -40 200 80"
            style={{ overflow: 'visible' }}
          >
            {particleGrid.map((particle) => {
              let animation = {}
              
              if (state === 'hover') {
                // Trembling effect
                animation = {
                  x: [particle.x, particle.x + (Math.random() - 0.5) * 2, particle.x],
                  y: [particle.y, particle.y + (Math.random() - 0.5) * 2, particle.y],
                }
              } else if (state === 'loading') {
                // Explode outward
                const angle = Math.atan2(particle.y, particle.x)
                const distance = 100 + Math.random() * 50
                animation = {
                  x: [particle.x, Math.cos(angle) * distance],
                  y: [particle.y, Math.sin(angle) * distance],
                  opacity: [1, 0],
                }
              } else if (state === 'success') {
                // Form checkmark or circle based on position
                const t = particle.id / particleGrid.length
                const checkX = -40 + (t * 80)
                const checkY = Math.sin(t * Math.PI) * 20 - 10
                
                animation = {
                  x: [particle.x, checkX],
                  y: [particle.y, checkY],
                  opacity: [0, 1],
                }
              } else {
                // Return to idle position
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

          {/* Text and icons */}
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

          {/* Hover glow */}
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

        {/* Ambient glow */}
        <motion.div
          className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-2xl"
          animate={{
            opacity: state === 'loading' || state === 'success' ? [0.2, 0.4, 0.2] : 0.2,
            scale: state === 'loading' ? [1, 1.2, 1] : 1,
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Instruction text */}
        <motion.p
          className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-purple-300/60 text-sm whitespace-nowrap"
          animate={{ opacity: state === 'idle' || state === 'hover' ? 1 : 0 }}
        >
          Hover to see particles tremble, click to explode
        </motion.p>
      </div>
    </div>
  )
}
