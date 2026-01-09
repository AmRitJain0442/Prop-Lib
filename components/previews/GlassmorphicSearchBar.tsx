'use client'

import { motion } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { useState } from 'react'

export default function GlassmorphicSearchBar() {
  const [isFocused, setIsFocused] = useState(false)
  const [value, setValue] = useState('')

  return (
    <div className="relative flex items-center justify-center min-h-full w-full bg-gradient-to-br from-zinc-950 via-purple-950/20 to-blue-950/20 overflow-hidden p-8">
      {/* Background Texture for Glass Effect */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-purple-500/30 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-500/30 blur-[120px]" />
        <div className="absolute top-[40%] left-[50%] w-[40%] h-[40%] rounded-full bg-pink-500/20 blur-[100px]" />
        
        <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="waves" x="0" y="0" width="100" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 20 Q25 10 50 20 T100 20" fill="none" stroke="rgba(147,51,234,0.4)" strokeWidth="2" />
              <path d="M0 30 Q25 20 50 30 T100 30" fill="none" stroke="rgba(59,130,246,0.3)" strokeWidth="1.5" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#waves)" />
        </svg>
      </div>

      <motion.div
        className="relative w-full max-w-2xl z-10"
        animate={{ scale: isFocused ? 1.02 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="relative backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-1 shadow-2xl shadow-purple-500/20">
          <div className="flex items-center gap-4 px-6 py-4">
            <Search className="w-5 h-5 text-purple-300" />

            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Search components..."
              className="flex-1 bg-transparent outline-none text-white text-base placeholder-gray-300/60"
            />

            {value && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                onClick={() => setValue('')}
                className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </motion.button>
            )}
          </div>
        </div>

        {isFocused && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 mt-3 backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-4 shadow-xl"
          >
            <p className="text-sm text-gray-300">Start typing to search...</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
