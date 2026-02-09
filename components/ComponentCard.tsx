'use client'

import { motion } from 'framer-motion'
import { Eye, Code, Sparkles } from 'lucide-react'
import { ComponentData } from '@/lib/types'
import GlassCard from './ui/GlassCard'
import Button from './ui/Button'
import ComponentPreview from './ComponentPreview'

interface ComponentCardProps {
  component: ComponentData
  onPreview: () => void
  onGetPrompt: () => void
}

export default function ComponentCard({
  component,
  onPreview,
  onGetPrompt,
}: ComponentCardProps) {
  return (
    <GlassCard glow className="p-4 flex flex-col">
      {/* Live Preview Thumbnail */}
      <div className="mb-4 cursor-pointer" onClick={onPreview}>
        <ComponentPreview component={component.preview} />
      </div>

      <div className="mb-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-semibold text-white">{component.name}</h3>
          <div className="px-2 py-1 rounded-lg text-xs font-medium border border-white/10 bg-zinc-900 text-gray-300">
            {component.category}
          </div>
        </div>

        <p className="text-gray-400 text-sm mb-4">{component.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {component.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-zinc-900 border border-white/5 rounded-full text-xs text-gray-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-auto grid grid-cols-2 gap-2">
        <Button
          variant="glass"
          size="sm"
          onClick={onPreview}
          className="flex items-center justify-center gap-2"
        >
          <Eye className="w-4 h-4" />
          Preview
        </Button>

        <Button
          variant="gradient"
          size="sm"
          onClick={onGetPrompt}
          className="flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          Smart Prompt
        </Button>
      </div>

      <motion.div
        className="mt-3"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        <div className="glass px-3 py-2 rounded-lg">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Code className="w-3 h-3" />
            {component.dependencies.join(' | ')}
          </div>
        </div>
      </motion.div>
    </GlassCard>
  )
}

