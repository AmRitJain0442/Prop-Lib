'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Loader2, Search } from 'lucide-react'
import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import ComponentCard from '@/components/ComponentCard'
import { ComponentData, ComponentRecord } from '@/lib/types'
import { generateSmartPrompt, copyToClipboard } from '@/lib/smart-prompt-generator'
import { COMPONENT_CATEGORIES } from '@/lib/catalog-core'
import { mapRecordToComponentData } from '@/lib/component-mappers'

const PreviewModal = dynamic(() => import('@/components/PreviewModal'), {
  ssr: false,
})

const categories = ['all', ...COMPONENT_CATEGORIES] as const
const PAGE_SIZE = 24

export default function ComponentsPage() {
  const [selectedCategory, setSelectedCategory] = useState<(typeof categories)[number]>('all')
  const [searchInput, setSearchInput] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [records, setRecords] = useState<ComponentRecord[]>([])
  const [total, setTotal] = useState(0)
  const [hasMore, setHasMore] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [selectedComponent, setSelectedComponent] = useState<ComponentData | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setSearchTerm(searchInput.trim())
    }, 250)

    return () => window.clearTimeout(timeout)
  }, [searchInput])

  async function fetchComponents({ reset }: { reset: boolean }) {
    const nextOffset = reset ? 0 : records.length
    const params = new URLSearchParams({
      limit: String(PAGE_SIZE),
      offset: String(nextOffset),
    })

    if (selectedCategory !== 'all') {
      params.set('category', selectedCategory)
    }

    if (searchTerm) {
      params.set('search', searchTerm)
    }

    if (reset) {
      setIsLoading(true)
      setErrorMessage(null)
    } else {
      setIsLoadingMore(true)
    }

    try {
      const response = await fetch(`/api/components?${params.toString()}`)

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }

      const payload = (await response.json()) as {
        components: ComponentRecord[]
        total: number
        hasMore: boolean
      }

      setRecords((previous) =>
        reset ? payload.components : [...previous, ...payload.components]
      )
      setTotal(payload.total)
      setHasMore(payload.hasMore)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to fetch components')
      if (reset) {
        setRecords([])
      }
    } finally {
      setIsLoading(false)
      setIsLoadingMore(false)
    }
  }

  useEffect(() => {
    void fetchComponents({ reset: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, searchTerm])

  const components = useMemo(() => records.map(mapRecordToComponentData), [records])

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

      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      <section className="px-6 pt-32 pb-16 relative z-10 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 space-y-2">
            <h1 className="text-4xl md:text-6xl font-bold">Components Library</h1>
            <p className="text-gray-400 text-lg">
              Browse {total.toLocaleString()} AI-ready components with live previews
            </p>
          </div>

          <div className="sticky top-20 z-40 py-4 bg-black/85 backdrop-blur-xl mb-8 -mx-6 px-6 border-b border-white/5">
            <div className="max-w-7xl mx-auto space-y-4">
              <div className="relative w-full md:max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
                <input
                  value={searchInput}
                  onChange={(event) => setSearchInput(event.target.value)}
                  placeholder="Search by name, description, or tag..."
                  className="w-full bg-zinc-900/70 border border-white/10 rounded-xl px-10 py-2.5 text-sm outline-none focus:border-white/30 transition-colors"
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="overflow-x-auto no-scrollbar"
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
          </div>

          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl border border-red-500/30 bg-red-500/10 flex items-center justify-between gap-4">
              <p className="text-sm text-red-200">Failed to load components: {errorMessage}</p>
              <button
                onClick={() => void fetchComponents({ reset: true })}
                className="px-4 py-2 text-sm rounded-lg border border-red-300/30 hover:bg-red-500/20 transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {isLoading ? (
            <div className="py-20 flex items-center justify-center">
              <Loader2 className="w-7 h-7 animate-spin text-zinc-300" />
            </div>
          ) : (
            <>
              <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {components.map((component) => (
                  <motion.div
                    key={component.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <ComponentCard
                      component={component}
                      onPreview={() => handlePreview(component)}
                      onGetPrompt={() => handleGetSmartPrompt(component)}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {components.length === 0 && !errorMessage && (
                <div className="text-center py-20">
                  <p className="text-gray-400">No components found for this filter.</p>
                </div>
              )}

              {hasMore && (
                <div className="mt-10 text-center">
                  <button
                    onClick={() => void fetchComponents({ reset: false })}
                    disabled={isLoadingMore}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 bg-zinc-900/50 hover:bg-zinc-800/70 transition-colors disabled:opacity-60"
                  >
                    {isLoadingMore ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                    {isLoadingMore ? 'Loading...' : 'Load More'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

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

      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        component={selectedComponent}
      />
    </main>
  )
}
