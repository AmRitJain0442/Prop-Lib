'use client'

import { motion } from 'framer-motion'
import { Sparkles, Download, ArrowRight } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Button from '@/components/ui/Button'
import GlassCard from '@/components/ui/GlassCard'
import Link from 'next/link'

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

      {/* Features Section */}
      <section className="px-6 py-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-24">
            {[
              { title: "Smart Prompts", desc: "AI-ready prompts with code, dependencies, and integration logic", icon: <Sparkles className="w-6 h-6" /> },
              { title: "Live Preview", desc: "Test components in a sandboxed environment before downloading", icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg> },
              { title: "Golden Standard", desc: "Built with React, Tailwind CSS, and Framer Motion", icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> }
            ].map((feature, i) => (
              <GlassCard key={i} className="p-8 group hover:border-white/20 transition-colors" hover={false}>
                <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.desc}
                </p>
              </GlassCard>
            ))}
          </div>

          <div className="text-center py-12">
             <Link href="/components">
               <span className="inline-flex items-center gap-2 text-white hover:text-gray-300 transition-colors text-lg font-medium cursor-pointer group">
                  Go to Components Library <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
               </span>
             </Link>
          </div>

        </div>
      </section>
    </main>
  )
}
