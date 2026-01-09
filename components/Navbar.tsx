'use client'

import { motion } from 'framer-motion'
import { Sparkles, Github } from 'lucide-react'
import Button from './ui/Button'
import Link from 'next/link'

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-black/50 backdrop-blur-md border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight">PropLib</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/components"
             className="text-sm text-gray-400 hover:text-white transition-colors hidden md:block"
          >
             Components
          </Link>
          <a
            href="#"
            className="text-sm text-gray-400 hover:text-white transition-colors hidden md:block"
          >
            Documentation
          </a>
          <div className="h-4 w-[1px] bg-white/10 hidden md:block" />
          <Button variant="glass" size="sm" className="!rounded-lg">
            <Github className="w-4 h-4 mr-2" />
            GitHub
          </Button>
        </div>
      </div>
    </motion.nav>
  )
}
