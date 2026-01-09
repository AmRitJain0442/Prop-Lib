'use client'

import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'

export default function SafeCrackerSlider() {
  const [value, setValue] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const rotation = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Snap to nearest 5-degree increment for haptic clicks
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

    // Normalize to 0-360
    if (degrees < 0) degrees += 360

    // Snap for haptic feedback
    const snappedDegrees = snapValue(degrees)
    rotation.set(snappedDegrees)

    // Convert to 0-100 value
    const newValue = Math.round((snappedDegrees / 360) * 100)
    setValue(newValue)

    // Haptic feedback (if supported)
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
        {/* Value display */}
        <motion.div
          className="mb-8"
          animate={{ opacity: isDragging ? 1 : 0.7 }}
        >
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

        {/* Safe dial */}
        <div
          ref={containerRef}
          className="relative w-80 h-80 mx-auto cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
        >
          {/* Outer ring with markings */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 shadow-2xl border-8 border-zinc-700">
            {/* Major tick marks */}
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
                    transform: `rotate(${angle}deg)`,
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

            {/* Minor tick marks */}
            {Array.from({ length: 72 }).map((_, i) => {
              if (i % 6 === 0) return null
              const angle = (i * 5) - 90
              return (
                <div
                  key={`minor-${i}`}
                  className="absolute top-1/2 left-1/2 origin-left"
                  style={{
                    width: '45%',
                    height: 2,
                    transform: `rotate(${angle}deg)`,
                  }}
                >
                  <div className="absolute right-0 w-4 h-2 bg-gradient-to-r from-transparent to-zinc-600 rounded-r-full" />
                </div>
              )
            })}
          </div>

          {/* Rotating dial */}
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
            {/* Center knob */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 shadow-2xl flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 shadow-inner" />
                </div>
              </div>
            </div>

            {/* Pointer */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-32 bg-gradient-to-b from-amber-500 to-transparent origin-bottom -translate-y-16 rounded-t-full shadow-lg shadow-amber-500/50" />

            {/* Grip notches */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 origin-left"
                style={{
                  width: '42%',
                  height: 8,
                  transform: `rotate(${i * 45}deg)`,
                }}
              >
                <div className="absolute right-2 w-6 h-8 bg-zinc-800 rounded-sm shadow-inner" />
              </div>
            ))}
          </motion.div>

          {/* Glass cover effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
          
          {/* Glow effect when dragging */}
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

        {/* Click indicator */}
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
}
