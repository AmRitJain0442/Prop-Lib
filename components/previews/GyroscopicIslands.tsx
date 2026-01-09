'use client'

import { motion, useMotionValue, useTransform } from 'framer-motion'
import { Home, Settings, User, FileText, Mail, Heart } from 'lucide-react'
import { useState } from 'react'

const islands = [
  { 
    id: 1, 
    icon: Home, 
    label: 'Home', 
    x: 0, 
    y: 0, 
    scale: 1.2,
    rotation: 0,
    color: 'from-emerald-400 to-teal-600',
  },
  { 
    id: 2, 
    icon: Settings, 
    label: 'Settings', 
    x: -280, 
    y: -120, 
    scale: 0.9,
    rotation: 15,
    color: 'from-purple-400 to-pink-600',
  },
  { 
    id: 3, 
    icon: User, 
    label: 'Profile', 
    x: 280, 
    y: -100, 
    scale: 0.9,
    rotation: -20,
    color: 'from-blue-400 to-cyan-600',
  },
  { 
    id: 4, 
    icon: FileText, 
    label: 'Documents', 
    x: -240, 
    y: 160, 
    scale: 0.75,
    rotation: 10,
    color: 'from-orange-400 to-red-600',
  },
  { 
    id: 5, 
    icon: Mail, 
    label: 'Messages', 
    x: 260, 
    y: 140, 
    scale: 0.8,
    rotation: -15,
    color: 'from-yellow-400 to-amber-600',
  },
  { 
    id: 6, 
    icon: Heart, 
    label: 'Favorites', 
    x: 0, 
    y: 200, 
    scale: 0.7,
    rotation: 5,
    color: 'from-rose-400 to-pink-600',
  },
]

export default function GyroscopicIslands() {
  const [selectedIsland, setSelectedIsland] = useState<number | null>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-300, 300], [20, -20])
  const rotateY = useTransform(mouseX, [-300, 300], [-25, 25])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    mouseX.set(e.clientX - rect.left - centerX)
    mouseY.set(e.clientY - rect.top - centerY)
  }

  return (
    <div 
      className="relative flex items-center justify-center min-h-full w-full bg-gradient-to-b from-indigo-950 via-purple-950 to-black overflow-hidden p-8"
      onMouseMove={handleMouseMove}
    >
      {/* Stars background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative w-full max-w-5xl h-[600px]"
        style={{
          perspective: '1500px',
        }}
      >
        <motion.div
          className="relative w-full h-full flex items-center justify-center"
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
        >
          {islands.map((island) => {
            const Icon = island.icon
            const isSelected = selectedIsland === island.id

            return (
              <motion.div
                key={island.id}
                className="absolute cursor-pointer"
                style={{
                  left: `calc(50% + ${island.x}px)`,
                  top: `calc(50% + ${island.y}px)`,
                  transform: `scale(${island.scale}) rotate(${island.rotation}deg)`,
                }}
                whileHover={{ scale: island.scale * 1.1 }}
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  y: {
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                }}
                onClick={() => setSelectedIsland(island.id)}
              >
                {/* Island terrain - organic mountain-like shape */}
                <div className="relative">
                  {/* Floating shadow */}
                  <motion.div
                    className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-32 h-8 bg-black/30 rounded-full blur-2xl"
                    animate={{
                      scale: isSelected ? [1, 1.3, 1] : [1, 1.1, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                  />

                  {/* Island base - irregular terrain shape */}
                  <div className="relative">
                    {/* Bottom terrain layer */}
                    <motion.div
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-24 bg-gradient-to-t ${island.color} rounded-[60%_60%_50%_50%] opacity-40`}
                      animate={{
                        rotate: [0, 2, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                      }}
                    />
                    
                    {/* Middle terrain layer */}
                    <motion.div
                      className={`absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-20 bg-gradient-to-t ${island.color} rounded-[70%_70%_60%_60%] opacity-60`}
                      animate={{
                        rotate: [0, -3, 0],
                      }}
                      transition={{
                        duration: 3.5,
                        repeat: Infinity,
                      }}
                    />

                    {/* Main island mountain */}
                    <motion.div
                      className={`relative w-28 h-28 bg-gradient-to-br ${island.color} rounded-[40%_60%_50%_70%] shadow-2xl flex items-center justify-center`}
                      animate={{
                        boxShadow: isSelected 
                          ? ['0 20px 60px rgba(139, 92, 246, 0.6), 0 0 40px rgba(139, 92, 246, 0.4)',
                             '0 25px 70px rgba(139, 92, 246, 0.8), 0 0 50px rgba(139, 92, 246, 0.6)',
                             '0 20px 60px rgba(139, 92, 246, 0.6), 0 0 40px rgba(139, 92, 246, 0.4)']
                          : ['0 15px 40px rgba(0, 0, 0, 0.5)', '0 20px 50px rgba(0, 0, 0, 0.6)', '0 15px 40px rgba(0, 0, 0, 0.5)'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    >
                      {/* Surface texture */}
                      <div className="absolute inset-0 rounded-[40%_60%_50%_70%] bg-white/10" />
                      <div className="absolute top-2 left-3 w-8 h-8 bg-white/5 rounded-full blur-sm" />
                      <div className="absolute bottom-3 right-4 w-6 h-6 bg-black/10 rounded-full blur-sm" />

                      {/* Icon with glow */}
                      <motion.div
                        className="relative z-10"
                        animate={{
                          scale: isSelected ? [1, 1.3, 1] : 1,
                          rotateY: isSelected ? [0, 180, 360] : 0,
                        }}
                        transition={{
                          scale: { duration: 1.5, repeat: isSelected ? Infinity : 0 },
                          rotateY: { duration: 1, repeat: isSelected ? Infinity : 0 },
                        }}
                      >
                        <Icon className="w-10 h-10 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                      </motion.div>

                      {/* Glow ring */}
                      {isSelected && (
                        <motion.div
                          className={`absolute inset-0 rounded-[40%_60%_50%_70%] bg-gradient-to-br ${island.color}`}
                          initial={{ scale: 1, opacity: 0.6 }}
                          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      )}
                    </motion.div>

                    {/* Tiny floating rocks/debris */}
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`absolute w-2 h-2 bg-gradient-to-br ${island.color} rounded-full opacity-60`}
                        style={{
                          left: `${20 + i * 30}px`,
                          top: `${-10 - i * 5}px`,
                        }}
                        animate={{
                          y: [0, -8, 0],
                          rotate: [0, 360],
                        }}
                        transition={{
                          duration: 2 + i * 0.5,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                    ))}
                  </div>

                  {/* Label */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute top-full mt-6 left-1/2 -translate-x-1/2 whitespace-nowrap"
                  >
                    <p className="text-sm font-semibold text-white drop-shadow-lg bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                      {island.label}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </motion.div>

      {/* Selected island info */}
      {selectedIsland && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-3"
        >
          <p className="text-white font-medium">
            {islands.find(i => i.id === selectedIsland)?.label} Selected
          </p>
        </motion.div>
      )}
    </div>
  )
}
