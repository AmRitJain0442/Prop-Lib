'use client'

import { motion } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { useState } from 'react'

export default function GlassmorphicSearchBar() {
  const [isFocused, setIsFocused] = useState(false)
  const [value, setValue] = useState('')

  return (
    <div className="flex items-center justify-center h-full w-full bg-dark-900 p-8">
      <motion.div
        className="relative w-full max-w-md"
        animate={{ scale: isFocused ? 1.02 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="glass rounded-2xl p-1 glow-box">
          <div className="flex items-center gap-3 px-4 py-3">
            <Search className="w-4 h-4 text-purple-400" />

            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Search components..."
              className="flex-1 bg-transparent outline-none text-white text-sm placeholder-gray-400"
            />

            {value && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                onClick={() => setValue('')}
                className="p-1 hover:bg-glass-200 rounded-full transition-colors"
              >
                <X className="w-3 h-3" />
              </motion.button>
            )}
          </div>
        </div>

        {isFocused && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 mt-2 glass rounded-xl p-3"
          >
            <p className="text-xs text-gray-400">Start typing to search...</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
