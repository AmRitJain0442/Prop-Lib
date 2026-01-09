'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Code2, Eye, Copy, Check, Sparkles, Terminal } from 'lucide-react'
import { ComponentData } from '@/lib/types'
import Button from './ui/Button'
import { useState, useMemo } from 'react'
import { copyToClipboard, generateSmartPrompt } from '@/lib/smart-prompt-generator'
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from '@codesandbox/sandpack-react'

interface PreviewModalProps {
  isOpen: boolean
  onClose: () => void
  component: ComponentData | null
}

const CustomTheme = {
  colors: {
    surface1: '#09090b', // Zinc 950
    surface2: '#000000', // Black
    surface3: '#27272a', // Zinc 800
    clickable: '#a1a1aa', // Zinc 400
    base: '#e4e4e7', // Zinc 200
    disabled: '#52525b', // Zinc 600
    hover: '#ffffff',
    accent: '#ffffff',
    error: '#ef4444',
    errorSurface: '#2a1a1a',
  },
  syntax: {
    plain: '#e4e4e7',
    comment: { color: '#71717a', fontStyle: 'italic' },
    keyword: '#c084fc', // Purple for keywords
    tag: '#2dd4bf', // Teal for tags
    punctuation: '#a1a1aa',
    definition: '#ffffff',
    property: '#60a5fa', // Blue for props
    static: '#f472b6',
    string: '#fcd34d', // Yellow for strings
  },
  font: {
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    mono: '"Fira Mono", "DejaVu Sans Mono", Menlo, Consolas, "Liberation Mono", Monaco, "Lucida Console", monospace',
    size: '13px',
    lineHeight: '20px',
  },
}

export default function PreviewModal({
  isOpen,
  onClose,
  component,
}: PreviewModalProps) {
  const [view, setView] = useState<'preview' | 'editor' | 'prompt'>('preview')
  const [copied, setCopied] = useState(false)

  // Generate the smart prompt once when component content is available
  const smartPrompt = useMemo(() => component ? generateSmartPrompt(component) : '', [component])

  if (!component) return null

  const handleCopy = async () => {
    // Copy content based on current view
    const contentToCopy = view === 'editor' ? component.code : smartPrompt
    await copyToClipboard(contentToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Combine default dependencies with component specific ones
  const dependencies = {
    'framer-motion': 'latest',
    'lucide-react': 'latest',
    'clsx': 'latest',
    'tailwind-merge': 'latest',
    ...component.dependencies.reduce((acc, dep) => ({ ...acc, [dep]: 'latest' }), {}),
  }

  const files = {
    '/App.tsx': `import Component from "./Component";
import "./styles.css";

export default function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white p-4 overflow-x-hidden">
       <div className="w-full h-full flex items-center justify-center">
         <Component />
       </div>
    </div>
  );
}`,
    '/Component.tsx': component.code,
    '/styles.css': `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background: #000;
  color: #fff;
}
`
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.5, bounce: 0.3 }}
            className="relative w-full max-w-7xl h-[90vh] bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4 border-b border-white/5 bg-zinc-950 gap-4">
              <div className="flex items-center gap-4 w-full md:w-auto">
                 <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    {component.name}
                  </h2>
                  <div className="flex gap-2 mt-1">
                    {component.tags.map(tag => (
                      <span key={tag} className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                <div className="flex bg-zinc-900 border border-white/5 rounded-lg p-1">
                  <button
                    onClick={() => setView('preview')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-all ${
                      view === 'preview' 
                        ? 'bg-white text-black shadow-sm font-medium' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Eye className="w-4 h-4" />
                    Preview
                  </button>
                  <button
                    onClick={() => setView('editor')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-all ${
                      view === 'editor' 
                        ? 'bg-white text-black shadow-sm font-medium' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Code2 className="w-4 h-4" />
                    Editor
                  </button>
                  <button
                    onClick={() => setView('prompt')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-all ${
                      view === 'prompt' 
                        ? 'bg-white text-black shadow-sm font-medium' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Sparkles className="w-4 h-4" />
                    Prompt
                  </button>
                </div>

                <div className="w-[1px] h-8 bg-white/10 mx-1 hidden md:block" />

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    className="!rounded-lg border-white/10 hover:bg-zinc-900 hidden md:flex"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-2 text-green-500" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        {view === 'editor' ? 'Copy Code' : 'Copy Prompt'}
                      </>
                    )}
                  </Button>

                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden relative flex flex-col">
              {/* Show Smart Prompt when selected */}
              {view === 'prompt' && (
                <div className="absolute inset-0 bg-black p-6 overflow-auto z-20">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-purple-400" />
                                AI Smart Prompt
                            </h3>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleCopy}
                                className="!rounded-lg border-white/10 hover:bg-zinc-900"
                            >
                                {copied ? 'Copied' : 'Copy Prompt'}
                            </Button>
                        </div>
                        <pre className="text-sm font-mono text-gray-300 bg-zinc-900 border border-white/10 rounded-xl p-6 whitespace-pre-wrap leading-relaxed selection:bg-white/20">
                            {smartPrompt}
                        </pre>
                    </div>
                </div>
              )}

              <div className="flex-1 min-h-0">
                <SandpackProvider
                  template="react-ts"
                  theme={CustomTheme}
                  files={files}
                  options={{
                    externalResources: ['https://cdn.tailwindcss.com'],
                  }}
                  customSetup={{
                    dependencies: dependencies
                  }}
                  style={{ height: '100%' }}
                >
                  <SandpackLayout style={{ height: '100%', border: 'none', borderRadius: 0 }}>
                    
                    {/* Preview Tab Content */}
                    {view === 'preview' && (
                       <SandpackPreview 
                        showNavigator={false} 
                        showOpenInCodeSandbox={false}
                        style={{ height: '100%' }}
                      />
                    )}

                    {/* Editor Tab Content */}
                    {view === 'editor' && (
                      <SandpackCodeEditor 
                        showTabs 
                        showLineNumbers 
                        showInlineErrors 
                        wrapContent 
                        closableTabs={false}
                        style={{ height: '100%' }}
                      />
                    )}

                  </SandpackLayout>
                </SandpackProvider>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
