'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Download, ArrowRight, Code2, Zap, Layers, Palette, CheckCircle2, Copy, Terminal, Rocket, Users, Star, TrendingUp, Check } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Button from '@/components/ui/Button'
import GlassCard from '@/components/ui/GlassCard'
import Link from 'next/link'
import { useState, useEffect } from 'react'

// Animated Demo Component
function AnimatedDemo() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 3)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="browse"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 p-8"
          >
            {/* Component Grid View */}
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Component Library</h3>
                <div className="text-sm text-gray-400">Step 1: Browse</div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className={`aspect-video rounded-lg border ${
                      i === 3
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-white/10 bg-zinc-800/50'
                    } p-4 flex items-center justify-center`}
                  >
                    <div className="text-center">
                      <div className="w-8 h-8 bg-zinc-700 rounded-lg mb-2 mx-auto" />
                      <div className="text-xs text-gray-400">Component {i}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="copy"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 p-6 overflow-y-auto"
          >
            {/* Component Detail View with Copy Prompt */}
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">Gradient Button</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded">React</span>
                    <span className="text-xs px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded">Framer Motion</span>
                  </div>
                </div>
                <div className="text-xs text-gray-400">Step 2: Copy Prompt</div>
              </div>

              {/* Preview Box */}
              <div className="border border-white/10 rounded-lg bg-zinc-800/30 p-6">
                <div className="text-xs text-gray-400 mb-3">Live Preview</div>
                <div className="flex items-center justify-center py-4">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg text-white font-medium shadow-lg"
                  >
                    Click Me
                  </motion.div>
                </div>
              </div>

              {/* Smart Prompt Box - Detailed */}
              <div className="border border-blue-500/30 rounded-lg bg-blue-500/5 overflow-hidden">
                <div className="bg-blue-500/10 border-b border-blue-500/20 px-4 py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-semibold text-white">AI-Ready Smart Prompt</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{ boxShadow: ['0 0 0 0 rgba(59, 130, 246, 0.5)', '0 0 0 8px rgba(59, 130, 246, 0)'] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="flex items-center gap-2 px-4 py-1.5 bg-blue-500 rounded-md text-xs font-medium text-white"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    Copy All
                  </motion.button>
                </div>

                <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
                  {/* Installation Section */}
                  <div>
                    <div className="text-xs font-semibold text-gray-300 mb-2 flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5" />
                      Installation
                    </div>
                    <div className="bg-zinc-900 border border-white/5 rounded p-2 font-mono text-[10px] text-green-400">
                      npm install framer-motion clsx
                    </div>
                  </div>

                  {/* Component Code Section */}
                  <div>
                    <div className="text-xs font-semibold text-gray-300 mb-2 flex items-center gap-2">
                      <Code2 className="w-3.5 h-3.5" />
                      Component Code
                    </div>
                    <div className="bg-zinc-900 border border-white/5 rounded p-2 font-mono text-[9px] text-gray-400 space-y-0.5">
                      <div><span className="text-purple-400">import</span> <span className="text-blue-400">{"{ motion }"}</span> <span className="text-purple-400">from</span> <span className="text-green-400">'framer-motion'</span></div>
                      <div className="text-gray-600">// Component implementation...</div>
                      <div><span className="text-purple-400">export</span> <span className="text-blue-400">default</span> <span className="text-yellow-400">GradientButton</span></div>
                    </div>
                  </div>

                  {/* Usage Example */}
                  <div>
                    <div className="text-xs font-semibold text-gray-300 mb-2 flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5" />
                      Usage Example
                    </div>
                    <div className="bg-zinc-900 border border-white/5 rounded p-2 font-mono text-[9px] text-gray-400">
                      <span className="text-blue-400">{'<GradientButton>'}</span>
                      <span className="text-white">Click Me</span>
                      <span className="text-blue-400">{'</GradientButton>'}</span>
                    </div>
                  </div>

                  {/* Props & Options */}
                  <div>
                    <div className="text-xs font-semibold text-gray-300 mb-2">Props & Customization</div>
                    <div className="text-[10px] text-gray-400 space-y-1">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        variant: 'gradient' | 'solid' | 'outline'
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        size: 'sm' | 'md' | 'lg'
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        Fully typed with TypeScript
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="integrate"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 p-6 overflow-y-auto"
          >
            {/* AI Integration View */}
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-sm font-bold">
                    AI
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Claude Code</h3>
                    <div className="text-xs text-gray-400">AI Assistant</div>
                  </div>
                </div>
                <div className="text-xs text-gray-400">Step 3: Integrate</div>
              </div>

              {/* Chat Interface */}
              <div className="space-y-3">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="max-w-[85%] bg-blue-500/10 border border-blue-500/30 rounded-xl p-3">
                    <div className="text-xs text-blue-400 font-medium mb-1">You</div>
                    <div className="text-sm text-gray-200 mb-2">
                      Add this gradient button component to my Next.js project
                    </div>
                    <div className="bg-zinc-900/80 border border-white/5 rounded p-2 mt-2">
                      <div className="text-[9px] text-gray-500 font-mono">
                        [Smart Prompt - 250 lines of context]
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Response 1 - Analysis */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex justify-start"
                >
                  <div className="max-w-[85%] bg-zinc-800/50 border border-white/10 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full" />
                      <span className="text-xs font-medium text-white">Claude</span>
                    </div>
                    <div className="text-xs text-gray-300 mb-2">
                      I'll help you integrate the Gradient Button component. Let me set this up for you.
                    </div>

                    {/* Terminal-like output */}
                    <div className="bg-zinc-950 border border-white/5 rounded-lg p-2 space-y-1 font-mono text-[9px]">
                      <div className="flex items-center gap-1.5 text-green-400">
                        <Check className="w-3 h-3" />
                        <span>Analyzing dependencies...</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-green-400">
                        <Check className="w-3 h-3" />
                        <span>Installing framer-motion clsx</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-yellow-400">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        >
                          <Sparkles className="w-3 h-3" />
                        </motion.div>
                        <span>Creating component files...</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* AI Response 2 - File Creation */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex justify-start"
                >
                  <div className="max-w-[85%] bg-zinc-800/50 border border-white/10 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full" />
                      <span className="text-xs font-medium text-white">Claude</span>
                    </div>

                    <div className="space-y-2">
                      {/* File 1 */}
                      <div className="bg-zinc-950 border border-emerald-500/20 rounded-lg overflow-hidden">
                        <div className="bg-emerald-500/10 border-b border-emerald-500/20 px-2 py-1 flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-[9px] font-mono text-emerald-400">components/ui/GradientButton.tsx</span>
                        </div>
                        <div className="p-2 font-mono text-[8px] text-gray-400 space-y-0.5">
                          <div><span className="text-purple-400">import</span> <span className="text-blue-400">{"{ motion }"}</span> <span className="text-purple-400">from</span> <span className="text-green-400">'framer-motion'</span></div>
                          <div><span className="text-purple-400">import</span> <span className="text-blue-400">{"{ clsx }"}</span> <span className="text-purple-400">from</span> <span className="text-green-400">'clsx'</span></div>
                          <div className="text-gray-600">...</div>
                          <div><span className="text-purple-400">export</span> <span className="text-blue-400">default</span> <span className="text-yellow-400">GradientButton</span></div>
                        </div>
                      </div>

                      {/* File 2 */}
                      <div className="bg-zinc-950 border border-emerald-500/20 rounded-lg overflow-hidden">
                        <div className="bg-emerald-500/10 border-b border-emerald-500/20 px-2 py-1 flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-[9px] font-mono text-emerald-400">app/page.tsx</span>
                        </div>
                        <div className="p-2 font-mono text-[8px] text-gray-400">
                          <div><span className="text-purple-400">import</span> <span className="text-blue-400">GradientButton</span> <span className="text-purple-400">from</span> <span className="text-green-400">'@/components/ui/GradientButton'</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* AI Response 3 - Success */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="flex justify-start"
                >
                  <div className="max-w-[85%] bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/30 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-xs font-medium text-emerald-400">Integration Complete!</span>
                    </div>

                    <div className="text-xs text-gray-300 space-y-2">
                      <div>Your Gradient Button is ready to use:</div>

                      <div className="bg-zinc-950 border border-white/5 rounded p-2 font-mono text-[9px] text-gray-400">
                        <span className="text-blue-400">{'<GradientButton '}</span>
                        <span className="text-purple-400">variant</span>
                        <span className="text-white">=</span>
                        <span className="text-green-400">"gradient"</span>
                        <span className="text-blue-400">{'>'}</span>
                        <br />
                        <span className="ml-2 text-white">Click Me</span>
                        <br />
                        <span className="text-blue-400">{'</GradientButton>'}</span>
                      </div>

                      <div className="flex items-start gap-1.5 text-[10px] text-emerald-400">
                        <Rocket className="w-3 h-3 mt-0.5 flex-shrink-0" />
                        <span>Component integrated with full TypeScript support, animations, and all customization options!</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              step === i ? 'bg-blue-500 w-8' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default function Home() {
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

      {/* Hero Section */}
      <section className="relative px-6 pt-32 pb-20 md:pt-48 md:pb-32">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 border border-white/10 bg-zinc-900/50 backdrop-blur-md px-4 py-2 rounded-full mb-8">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-sm text-gray-300">AI-Native UI Platform</span>
            </div>

            <h1 className="text-6xl md:text-9xl font-bold mb-8 tracking-tighter">
              PropLib
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              Curated collection of high-fidelity, interactive frontend components with{' '}
              <span className="text-white font-semibold border-b border-white/20 pb-1">Smart Prompts</span>{' '}
              for seamless AI integration
            </p>

            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/components">
                <Button variant="gradient" size="lg" className="!rounded-full px-10">
                  <Download className="w-5 h-5 mr-2" />
                  Explore Components
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="!rounded-full px-10">
                View Documentation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="px-6 py-20 relative z-10 border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Components", value: "50+", icon: <Layers className="w-6 h-6" /> },
              { label: "Ready Prompts", value: "200+", icon: <Sparkles className="w-6 h-6" /> },
              { label: "Active Users", value: "10K+", icon: <Users className="w-6 h-6" /> },
              { label: "GitHub Stars", value: "2.5K+", icon: <Star className="w-6 h-6" /> }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  ease: [0.21, 0.45, 0.27, 0.9]
                }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center"
              >
                <motion.div
                  initial={{ opacity: 0, rotate: -180 }}
                  whileInView={{ opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 + 0.2 }}
                  viewport={{ once: true }}
                  className="flex justify-center mb-3 text-white/60"
                >
                  {stat.icon}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
                >
                  {stat.value}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.1 + 0.4 }}
                  viewport={{ once: true }}
                  className="text-gray-400 text-sm md:text-base"
                >
                  {stat.label}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-6 py-24 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.21, 0.45, 0.27, 0.9] }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
            >
              How It Works
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-xl text-gray-400 max-w-2xl mx-auto"
            >
              Three simple steps to supercharge your development workflow with AI-powered components
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                step: "01",
                title: "Browse & Select",
                description: "Explore our curated component library. Each component comes with live previews, detailed documentation, and usage examples.",
                icon: <Code2 className="w-8 h-8" />,
                color: "from-blue-500 to-cyan-500"
              },
              {
                step: "02",
                title: "Copy Smart Prompt",
                description: "Get AI-ready prompts that include component code, dependencies, installation steps, and integration instructions all in one click.",
                icon: <Copy className="w-8 h-8" />,
                color: "from-purple-500 to-pink-500"
              },
              {
                step: "03",
                title: "Paste & Integrate",
                description: "Use the smart prompt with any AI assistant (Claude, ChatGPT, etc.) to instantly integrate the component into your project.",
                icon: <Rocket className="w-8 h-8" />,
                color: "from-orange-500 to-red-500"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50, rotateX: 10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.15,
                  ease: [0.21, 0.45, 0.27, 0.9]
                }}
                viewport={{ once: true, margin: "-80px" }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <GlassCard className="p-8 h-full relative overflow-hidden group" hover={false}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 0.1, scale: 1 }}
                    transition={{ duration: 0.8, delay: i * 0.15 + 0.3 }}
                    viewport={{ once: true }}
                    className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} blur-3xl group-hover:opacity-20 transition-opacity`}
                  />

                  <div className="relative">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 0.05, x: 0 }}
                      transition={{ duration: 0.6, delay: i * 0.15 + 0.2 }}
                      viewport={{ once: true }}
                      className="text-6xl font-bold text-white/5 mb-4"
                    >
                      {item.step}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0, rotate: -180 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: i * 0.15 + 0.4,
                        ease: [0.34, 1.56, 0.64, 1]
                      }}
                      viewport={{ once: true }}
                      className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {item.icon}
                    </motion.div>

                    <motion.h3
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.15 + 0.5 }}
                      viewport={{ once: true }}
                      className="text-2xl font-bold mb-4"
                    >
                      {item.title}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: i * 0.15 + 0.6 }}
                      viewport={{ once: true }}
                      className="text-gray-400 leading-relaxed"
                    >
                      {item.description}
                    </motion.p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Animated Window Demo Section */}
      <section className="px-6 py-24 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.21, 0.45, 0.27, 0.9] }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
            >
              See It In Action
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-xl text-gray-400 max-w-2xl mx-auto"
            >
              Watch how easy it is to find, copy, and integrate components into your project
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.21, 0.45, 0.27, 0.9] }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-6xl mx-auto"
          >
            {/* Browser Window Mockup */}
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl opacity-50" />

              <div className="relative bg-zinc-900 rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                {/* Browser Chrome */}
                <div className="bg-zinc-800/50 border-b border-white/10 px-4 py-3 flex items-center gap-3">
                  {/* Traffic Lights */}
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>

                  {/* Address Bar */}
                  <div className="flex-1 bg-zinc-900/50 rounded-lg px-4 py-2 flex items-center gap-2 border border-white/5">
                    <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="text-sm text-gray-400">proplib.dev/components</span>
                  </div>
                </div>

                {/* Animated Content Area */}
                <div className="relative bg-black aspect-[16/10] overflow-hidden">
                  <AnimatedDemo />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Detailed Features Grid */}
      <section className="px-6 py-24 relative z-10 bg-gradient-to-b from-transparent via-zinc-950/50 to-transparent overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.21, 0.45, 0.27, 0.9] }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
            >
              Built for Modern Developers
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-xl text-gray-400 max-w-2xl mx-auto"
            >
              Everything you need to build beautiful, production-ready interfaces faster than ever
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "AI-Ready Smart Prompts",
                desc: "Every component includes optimized prompts with complete context: code snippets, dependencies, installation commands, and integration guides. Just copy and paste into your AI assistant.",
                icon: <Sparkles className="w-6 h-6" />,
                features: ["Complete context included", "Copy with one click", "Works with any AI tool"]
              },
              {
                title: "Live Interactive Preview",
                desc: "Test every component in a real-time sandboxed environment. See animations, interactions, and responsiveness before adding to your project.",
                icon: <Zap className="w-6 h-6" />,
                features: ["Real-time editing", "Mobile responsive preview", "No installation needed"]
              },
              {
                title: "Production-Ready Code",
                desc: "Built with industry-standard tools: React 18+, TypeScript, Tailwind CSS, and Framer Motion. Clean, maintainable, and fully typed.",
                icon: <Code2 className="w-6 h-6" />,
                features: ["TypeScript support", "Fully accessible", "SEO optimized"]
              },
              {
                title: "Customizable Themes",
                desc: "Every component supports dark mode out of the box and can be customized to match your brand with CSS variables and Tailwind config.",
                icon: <Palette className="w-6 h-6" />,
                features: ["Dark mode included", "Custom color schemes", "Tailwind integration"]
              },
              {
                title: "Zero Config Setup",
                desc: "No complex build tools or configuration files. Install dependencies and you're ready to go. Works with Next.js, Vite, Create React App, and more.",
                icon: <Terminal className="w-6 h-6" />,
                features: ["Framework agnostic", "Quick installation", "No build config needed"]
              },
              {
                title: "Regular Updates",
                desc: "New components added weekly. Community-driven improvements and bug fixes. Always up-to-date with the latest React and Tailwind features.",
                icon: <TrendingUp className="w-6 h-6" />,
                features: ["Weekly new components", "Active community", "Version compatibility"]
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.21, 0.45, 0.27, 0.9]
                }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <GlassCard className="p-8 h-full group hover:border-white/20 transition-all duration-300" hover={true}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0, rotate: -90 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.08 + 0.2,
                      ease: [0.34, 1.56, 0.64, 1]
                    }}
                    viewport={{ once: true }}
                    className="w-14 h-14 bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-white/20 transition-all duration-300"
                  >
                    {feature.icon}
                  </motion.div>

                  <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.08 + 0.3 }}
                    viewport={{ once: true }}
                    className="text-xl font-bold mb-3"
                  >
                    {feature.title}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: i * 0.08 + 0.4 }}
                    viewport={{ once: true }}
                    className="text-gray-400 leading-relaxed mb-6"
                  >
                    {feature.desc}
                  </motion.p>

                  <ul className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.08 + 0.5 + idx * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2 text-sm text-gray-500"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="px-6 py-24 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.21, 0.45, 0.27, 0.9] }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
            >
              Perfect For Every Use Case
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-xl text-gray-400 max-w-2xl mx-auto"
            >
              Whether you're building a startup MVP or a enterprise application, PropLib accelerates your workflow
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Rapid Prototyping",
                description: "Build stunning prototypes in hours, not days. Perfect for startups and agencies that need to move fast and impress clients.",
                example: "A startup used PropLib to build their entire landing page in 2 hours, securing seed funding the next week.",
                tags: ["Startups", "Agencies", "MVPs"],
                gradient: "from-violet-500/10 to-purple-500/10"
              },
              {
                title: "AI-Assisted Development",
                description: "Leverage AI coding assistants to their full potential. Smart Prompts ensure AI tools understand exactly what you need.",
                example: "Developers report 3x faster component integration when using PropLib prompts with Claude or ChatGPT.",
                tags: ["AI Development", "Productivity", "Automation"],
                gradient: "from-blue-500/10 to-cyan-500/10"
              },
              {
                title: "Design System Foundation",
                description: "Start your design system with battle-tested components. Customize and extend them to match your brand guidelines.",
                example: "A fintech company built their entire component library on PropLib, saving 200+ hours of development time.",
                tags: ["Enterprise", "Design Systems", "Teams"],
                gradient: "from-emerald-500/10 to-teal-500/10"
              },
              {
                title: "Learning & Education",
                description: "Study modern React patterns, animation techniques, and best practices through well-documented, production-quality code.",
                example: "Bootcamp students learn advanced React patterns by studying and customizing PropLib components.",
                tags: ["Education", "Learning", "Best Practices"],
                gradient: "from-orange-500/10 to-red-500/10"
              }
            ].map((useCase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.15,
                  ease: [0.21, 0.45, 0.27, 0.9]
                }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
              >
                <GlassCard className="p-8 h-full group hover:border-white/20 transition-all" hover={true}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 0, scale: 1 }}
                    transition={{ duration: 0.6, delay: i * 0.15 + 0.2 }}
                    viewport={{ once: true }}
                    className={`absolute inset-0 bg-gradient-to-br ${useCase.gradient} group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl`}
                  />

                  <div className="relative">
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.15 + 0.3 }}
                      viewport={{ once: true }}
                      className="text-2xl font-bold mb-4"
                    >
                      {useCase.title}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: i * 0.15 + 0.4 }}
                      viewport={{ once: true }}
                      className="text-gray-400 leading-relaxed mb-6"
                    >
                      {useCase.description}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.15 + 0.5 }}
                      viewport={{ once: true }}
                      className="bg-zinc-900/50 border border-white/5 rounded-xl p-4 mb-6"
                    >
                      <p className="text-sm text-gray-300 italic">
                        "{useCase.example}"
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: i * 0.15 + 0.6 }}
                      viewport={{ once: true }}
                      className="flex flex-wrap gap-2"
                    >
                      {useCase.tags.map((tag, idx) => (
                        <motion.span
                          key={idx}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: i * 0.15 + 0.7 + idx * 0.1 }}
                          viewport={{ once: true }}
                          className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </motion.div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="px-6 py-24 relative z-10 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.21, 0.45, 0.27, 0.9] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Animated background glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 0.3, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-[120px] pointer-events-none"
            />

            <motion.h2
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold mb-6 tracking-tight relative z-10"
            >
              Start Building Today
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto relative z-10"
            >
              Join thousands of developers who are building faster with PropLib and AI
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              className="relative z-10 inline-block"
            >
              <Link href="/components">
                <Button variant="gradient" size="lg" className="!rounded-full px-12 text-lg">
                  <Download className="w-5 h-5 mr-2" />
                  Explore All Components
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
