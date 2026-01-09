'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'
import Navbar from '@/components/Navbar'
import ComponentCard from '@/components/ComponentCard'
import PreviewModal from '@/components/PreviewModal'
import { componentsData } from '@/lib/components-data'
import { ComponentData } from '@/lib/types'
import { generateSmartPrompt, copyToClipboard } from '@/lib/smart-prompt-generator'

const categories = ['all', 'headers', 'search', 'navigation', 'cards', 'forms', 'animations']

export default function ComponentsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedComponent, setSelectedComponent] = useState<ComponentData | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const filteredComponents = useMemo(() => {
    if (selectedCategory === 'all') return componentsData
    return componentsData.filter((c) => c.category === selectedCategory)
  }, [selectedCategory])

  const handleGetSmartPrompt = async (component: ComponentData) => {
    const smartPrompt = generateSmartPrompt(component)
    await copyToClipboard(smartPrompt)
    setCopiedId(component.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handlePreview = (component: ComponentData) => {
    setSelectedComponent(component)
    setIsPreviewOpen(true)
  }

  return (
    <main className="min-h-screen relative bg-black text-white selection:bg-white/20">
      <Navbar />

      {/* Background Grid Animation */}
       <div className="fixed inset-0 z-0 pointer-events-none opacity-20" 
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />
      
      <section className="px-6 pt-32 pb-12 relative z-10 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Components Library</h1>
            <p className="text-gray-400 text-lg">Browse our collection of AI-ready components</p>
          </div>

          {/* Sticky Category Filter */}
          <div className="sticky top-20 z-40 py-4 bg-black/80 backdrop-blur-xl mb-8 -mx-6 px-6 border-b border-white/5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-7xl mx-auto overflow-x-auto no-scrollbar"
            >
              <div className="flex gap-2 min-w-max pb-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all capitalize border ${
                      selectedCategory === category
                        ? 'bg-white text-black border-white'
                        : 'bg-zinc-900/50 text-gray-400 border-transparent hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Components Grid */}
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode='popLayout'>
              {filteredComponents.map((component) => (
                <motion.div
                  layout
                  key={component.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ComponentCard
                    component={component}
                    onPreview={() => handlePreview(component)}
                    onGetPrompt={() => handleGetSmartPrompt(component)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredComponents.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400">No components found in this category</p>
            </div>
          )}
        </div>
      </section>

      {/* Copy Notification */}
      {copiedId && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-8 right-8 glass-strong rounded-2xl p-4 flex items-center gap-3 z-50"
        >
          <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
            <Check className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-sm">Smart Prompt copied to clipboard!</p>
        </motion.div>
      )}

      {/* Preview Modal */}
      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        component={selectedComponent}
      />
    </main>
  )
}
