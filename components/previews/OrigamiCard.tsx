'use client'

import { motion } from 'framer-motion'
import { ChevronDown, ShoppingCart } from 'lucide-react'
import { useState } from 'react'

export default function OrigamiCard() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div 
      className="flex items-center justify-center min-h-full w-full bg-gradient-to-br from-gray-100 to-gray-200 p-8"
      style={{ perspective: '1500px' }}
    >
      <div className="relative w-80">
        <motion.div
          className="relative cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
          animate={{
            marginBottom: isOpen ? '0px' : '0px',
          }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Fold 1: Cover (Always Visible) */}
          <motion.div
            className="relative z-10 bg-white rounded-sm p-6 shadow-md"
            style={{
              transformStyle: 'preserve-3d',
              transformOrigin: 'top center',
              backfaceVisibility: 'hidden',
            }}
            animate={{
              boxShadow: isOpen 
                ? '0 10px 20px rgba(0,0,0,0.1)' 
                : '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
            }}
          >
            <div className="text-xs text-gray-400 uppercase tracking-widest mb-2">
              Design System
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Minimal Chair
            </h2>
            <div className="text-xl font-bold text-green-500 mb-4">
              $350.00
            </div>

            {/* Toggle Button */}
            <motion.div
              className="absolute -bottom-5 right-5 w-10 h-10 rounded-full flex items-center justify-center shadow-lg z-20"
              animate={{
                rotate: isOpen ? 180 : 0,
                backgroundColor: isOpen ? '#ff4757' : '#333',
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <ChevronDown className="w-5 h-5 text-white" />
            </motion.div>
          </motion.div>

          {/* Fold 2: Middle Section */}
          <motion.div
            className="relative z-[9] bg-white rounded-sm p-6 overflow-hidden shadow-md"
            style={{
              transformStyle: 'preserve-3d',
              transformOrigin: 'top center',
              backfaceVisibility: 'hidden',
              background: 'linear-gradient(to bottom, #e0e0e0 0%, #ffffff 15%)',
            }}
            initial={{
              height: 0,
              opacity: 0,
              rotateX: -120,
            }}
            animate={{
              height: isOpen ? 'auto' : 0,
              opacity: isOpen ? 1 : 0,
              rotateX: isOpen ? 0 : -120,
              marginTop: isOpen ? '-5px' : 0,
              boxShadow: isOpen ? '0 10px 20px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.12)',
            }}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.8, 0.25, 1],
            }}
          >
            <div className="space-y-3">
              <div>
                <p className="text-sm font-semibold text-gray-700">Dimensions:</p>
                <p className="text-sm text-gray-600">H: 80cm x W: 45cm</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700">Material:</p>
                <p className="text-sm text-gray-600">Oak Wood & Canvas</p>
              </div>
            </div>
          </motion.div>

          {/* Fold 3: Bottom Section */}
          <motion.div
            className="relative z-[8] bg-white rounded-sm p-6 overflow-hidden shadow-md"
            style={{
              transformStyle: 'preserve-3d',
              transformOrigin: 'top center',
              backfaceVisibility: 'hidden',
              background: 'linear-gradient(to bottom, #e0e0e0 0%, #ffffff 15%)',
            }}
            initial={{
              height: 0,
              opacity: 0,
              rotateX: -90,
            }}
            animate={{
              height: isOpen ? 'auto' : 0,
              opacity: isOpen ? 1 : 0,
              rotateX: isOpen ? 0 : -90,
              marginTop: isOpen ? '-5px' : 0,
              boxShadow: isOpen ? '0 10px 20px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.12)',
            }}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.8, 0.25, 1],
              delay: isOpen ? 0.2 : 0, // Chain reaction effect
            }}
          >
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Handcrafted in Sweden. Ships within 3-5 business days.
              </p>
              <button className="w-full py-3 bg-gray-800 hover:bg-gray-900 text-white rounded flex items-center justify-center gap-2 transition-colors">
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
