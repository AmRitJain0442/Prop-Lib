'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Code2, Eye, Copy, Check } from 'lucide-react'
import { ComponentData } from '@/lib/types'
import Button from './ui/Button'
import { useState } from 'react'
import { copyToClipboard } from '@/lib/smart-prompt-generator'

interface PreviewModalProps {
  isOpen: boolean
  onClose: () => void
  component: ComponentData | null
}

export default function PreviewModal({
  isOpen,
  onClose,
  component,
}: PreviewModalProps) {
  const [showCode, setShowCode] = useState(false)
  const [copied, setCopied] = useState(false)

  if (!component) return null

  const PreviewComponent = component.preview

  const handleCopyCode = async () => {
    await copyToClipboard(component.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-6xl h-[85vh] glass-strong rounded-3xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-glass-200">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {component.name}
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  {component.description}
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant={showCode ? 'glass' : 'gradient'}
                  size="sm"
                  onClick={() => setShowCode(!showCode)}
                  className="flex items-center gap-2"
                >
                  {showCode ? (
                    <>
                      <Eye className="w-4 h-4" />
                      Preview
                    </>
                  ) : (
                    <>
                      <Code2 className="w-4 h-4" />
                      Code
                    </>
                  )}
                </Button>

                <Button
                  variant="glass"
                  size="sm"
                  onClick={onClose}
                  className="!rounded-full !p-2"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden">
              {showCode ? (
                <div className="h-full flex flex-col">
                  <div className="flex items-center justify-between px-6 py-3 border-b border-glass-100">
                    <span className="text-sm text-gray-400">Component Code</span>
                    <Button
                      variant="glass"
                      size="sm"
                      onClick={handleCopyCode}
                      className="flex items-center gap-2"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy Code
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="flex-1 overflow-auto p-6">
                    <pre className="text-sm text-gray-300 bg-dark-800/50 rounded-xl p-4 overflow-x-auto">
                      <code>{component.code}</code>
                    </pre>

                    <div className="mt-6 glass rounded-xl p-4">
                      <h3 className="text-white font-semibold mb-2">Dependencies</h3>
                      <div className="flex flex-wrap gap-2">
                        {component.dependencies.map((dep) => (
                          <span
                            key={dep}
                            className="px-3 py-1 bg-glass-100 rounded-lg text-sm text-purple-300"
                          >
                            {dep}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 glass rounded-xl p-4">
                      <h3 className="text-white font-semibold mb-2">Integration</h3>
                      <pre className="text-sm text-gray-400 whitespace-pre-wrap">
                        {component.integration}
                      </pre>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full w-full bg-dark-900 flex items-center justify-center p-8">
                  <div className="w-full max-w-4xl h-full">
                    <PreviewComponent />
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-glass-200 px-6 py-4 flex justify-between items-center">
              <div className="flex gap-2">
                {component.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-glass-50 rounded-full text-xs text-gray-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="text-xs text-gray-500">
                Category: {component.category}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
