'use client'

import { motion } from 'framer-motion'
import { Sparkles, Download, ArrowRight, Code2, Zap, Layers, Palette, CheckCircle2, Copy, Terminal, Rocket, Users, Star, TrendingUp } from 'lucide-react'
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

      {/* Statistics Section */}
      <section className="px-6 py-20 relative z-10 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { label: "Components", value: "50+", icon: <Layers className="w-6 h-6" /> },
              { label: "Ready Prompts", value: "200+", icon: <Sparkles className="w-6 h-6" /> },
              { label: "Active Users", value: "10K+", icon: <Users className="w-6 h-6" /> },
              { label: "GitHub Stars", value: "2.5K+", icon: <Star className="w-6 h-6" /> }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="flex justify-center mb-3 text-white/60">
                  {stat.icon}
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-6 py-24 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              How It Works
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Three simple steps to supercharge your development workflow with AI-powered components
            </p>
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <GlassCard className="p-8 h-full relative overflow-hidden group" hover={false}>
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity`} />

                  <div className="relative">
                    <div className="text-6xl font-bold text-white/5 mb-4">
                      {item.step}
                    </div>

                    <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      {item.icon}
                    </div>

                    <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Features Grid */}
      <section className="px-6 py-24 relative z-10 bg-gradient-to-b from-transparent via-zinc-950/50 to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Built for Modern Developers
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to build beautiful, production-ready interfaces faster than ever
            </p>
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <GlassCard className="p-8 h-full group hover:border-white/20 transition-all duration-300" hover={true}>
                  <div className="w-14 h-14 bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-white/20 transition-all duration-300">
                    {feature.icon}
                  </div>

                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed mb-6">
                    {feature.desc}
                  </p>

                  <ul className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-500">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="px-6 py-24 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Perfect For Every Use Case
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Whether you're building a startup MVP or a enterprise application, PropLib accelerates your workflow
            </p>
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <GlassCard className="p-8 h-full group hover:border-white/20 transition-all" hover={true}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${useCase.gradient} opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl`} />

                  <div className="relative">
                    <h3 className="text-2xl font-bold mb-4">{useCase.title}</h3>
                    <p className="text-gray-400 leading-relaxed mb-6">
                      {useCase.description}
                    </p>

                    <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-4 mb-6">
                      <p className="text-sm text-gray-300 italic">
                        "{useCase.example}"
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {useCase.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="px-6 py-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Start Building Today
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Join thousands of developers who are building faster with PropLib and AI
            </p>

            <Link href="/components">
              <Button variant="gradient" size="lg" className="!rounded-full px-12 text-lg">
                <Download className="w-5 h-5 mr-2" />
                Explore All Components
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
