import {
  COMPONENT_CATEGORIES,
  ComponentCategory,
  ComponentRecord,
  ComponentsResponse,
} from './catalog-core'

const ITEMS_PER_CATEGORY = 60

const MATERIALS = [
  'Glass',
  'Carbon',
  'Aero',
  'Plasma',
  'Quartz',
  'Prism',
  'Velvet',
  'Atlas',
  'Cinder',
  'Nimbus',
] as const

const MOTIONS = [
  'Drift',
  'Pulse',
  'Ripple',
  'Flux',
  'Glide',
  'Orbit',
  'Cascade',
  'Shift',
  'Bloom',
  'Snap',
] as const

const FLAVORS = [
  'Aurora',
  'Solar',
  'Tidal',
  'Lunar',
  'Ember',
  'Pixel',
  'Neon',
  'Frost',
  'Signal',
  'Nova',
] as const

const TAG_BANK = [
  'interactive',
  'responsive',
  'micro-interaction',
  'production-ready',
  'design-system',
  'motion',
  'accessible',
  'ai-ready',
  'tailwind',
  'typescript',
] as const

const CATEGORY_BLUEPRINTS: Record<
  ComponentCategory,
  {
    nouns: string[]
    summaries: string[]
    dependencies: string[]
  }
> = {
  headers: {
    nouns: ['Hero Header', 'Split Hero', 'Launch Header', 'Landing Masthead', 'Brand Header'],
    summaries: ['headline focus', 'conversion CTA', 'feature storytelling', 'animated branding', 'product launch'],
    dependencies: ['framer-motion', 'react'],
  },
  search: {
    nouns: ['Search Bar', 'Command Finder', 'Instant Lookup', 'Global Search', 'Smart Query Dock'],
    summaries: ['query suggestions', 'quick filtering', 'keyboard-friendly search', 'fuzzy lookup', 'result ranking'],
    dependencies: ['framer-motion', 'react', 'lucide-react'],
  },
  navigation: {
    nouns: ['Top Navigation', 'Floating Nav', 'Tab Dock', 'Sidebar Rail', 'Navigation Hub'],
    summaries: ['active state feedback', 'gesture-friendly layout', 'adaptive menus', 'dense navigation', 'focus visibility'],
    dependencies: ['framer-motion', 'react', 'lucide-react'],
  },
  cards: {
    nouns: ['Feature Card', 'Product Card', 'Profile Card', 'Metric Card', 'Case Study Card'],
    summaries: ['rich content blocks', 'progressive disclosure', 'data emphasis', 'storytelling layout', 'compact details'],
    dependencies: ['framer-motion', 'react', 'lucide-react'],
  },
  forms: {
    nouns: ['Signup Form', 'Checkout Form', 'Contact Form', 'Settings Form', 'Action Form'],
    summaries: ['inline validation', 'submission feedback', 'progressive steps', 'clear input hierarchy', 'error recovery'],
    dependencies: ['framer-motion', 'react', 'lucide-react'],
  },
  animations: {
    nouns: ['Reveal Animation', 'Loader Sequence', 'Background Motion', 'Transition Pattern', 'Accent Animation'],
    summaries: ['ambient movement', 'staged entrances', 'status transitions', 'attention guidance', 'loop stability'],
    dependencies: ['framer-motion', 'react'],
  },
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function toPascalIdentifier(value: string): string {
  const cleaned = value.replace(/[^a-zA-Z0-9 ]+/g, ' ')
  const pascal = cleaned
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')

  return /^[0-9]/.test(pascal) ? `Ui${pascal}` : pascal
}

function buildComponentCode(name: string, category: ComponentCategory, accent: string): string {
  const functionName = toPascalIdentifier(name)

  return `'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function ${functionName}() {
  const [active, setActive] = useState(false)

  return (
    <section className="w-full min-h-full p-6 bg-zinc-950 text-white rounded-2xl border border-white/10">
      <motion.button
        type="button"
        onClick={() => setActive((current) => !current)}
        whileTap={{ scale: 0.98 }}
        className="w-full text-left p-5 rounded-xl border border-white/10 bg-zinc-900/60"
      >
        <motion.div
          animate={{
            opacity: active ? 1 : 0.72,
            y: active ? -2 : 0,
          }}
          transition={{ duration: 0.25 }}
          className="space-y-2"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">${category}</p>
          <h3 className="text-2xl font-semibold">${name}</h3>
          <p className="text-sm text-zinc-300">Accent: ${accent}. Click to toggle interaction state.</p>
        </motion.div>
      </motion.button>
    </section>
  )
}
`
}

function buildIntegrationSnippet(name: string): string {
  const functionName = toPascalIdentifier(name)
  return `Import and render in your page:

\`\`\`tsx
import ${functionName} from '@/components/${functionName}'

export default function Page() {
  return <${functionName} />
}
\`\`\``
}

function createComponent(category: ComponentCategory, index: number): ComponentRecord {
  const blueprint = CATEGORY_BLUEPRINTS[category]
  const material = MATERIALS[(index + 1) % MATERIALS.length]
  const motion = MOTIONS[(index + 3) % MOTIONS.length]
  const flavor = FLAVORS[(index + 5) % FLAVORS.length]
  const noun = blueprint.nouns[index % blueprint.nouns.length]
  const summary = blueprint.summaries[(index + 2) % blueprint.summaries.length]
  const serial = String(index + 1).padStart(3, '0')
  const name = `${flavor} ${material} ${motion} ${noun} ${serial}`
  const id = `${slugify(name)}-${category}`

  const tags = [
    category,
    summary.split(' ')[0],
    TAG_BANK[index % TAG_BANK.length],
    TAG_BANK[(index + 4) % TAG_BANK.length],
    TAG_BANK[(index + 7) % TAG_BANK.length],
  ]

  const accent = `${flavor.toLowerCase()}-${material.toLowerCase()}`

  return {
    id,
    name,
    description: `A ${summary} pattern tuned for ${category} interfaces with a ${motion.toLowerCase()} interaction profile.`,
    category,
    tags: Array.from(new Set(tags)),
    code: buildComponentCode(name, category, accent),
    dependencies: blueprint.dependencies,
    integration: buildIntegrationSnippet(name),
    smart_prompt: null,
    preview_component_path: `generated/${id}`,
  }
}

function generateCatalog(): ComponentRecord[] {
  const generated: ComponentRecord[] = []

  for (const category of COMPONENT_CATEGORIES) {
    for (let i = 0; i < ITEMS_PER_CATEGORY; i += 1) {
      generated.push(createComponent(category, i))
    }
  }

  return generated
}

export const localCatalog: ComponentRecord[] = generateCatalog()

export function getLocalComponentById(id: string): ComponentRecord | null {
  return localCatalog.find((component) => component.id === id) || null
}

export function queryLocalComponents(params: {
  category?: string | null
  tags?: string[]
  search?: string | null
  limit?: number
  offset?: number
}): ComponentsResponse {
  const limit = Math.max(1, Math.min(params.limit ?? 60, 200))
  const offset = Math.max(0, params.offset ?? 0)
  const normalizedSearch = params.search?.trim().toLowerCase()

  let filtered = localCatalog

  if (params.category && params.category !== 'all') {
    filtered = filtered.filter((component) => component.category === params.category)
  }

  if (params.tags && params.tags.length > 0) {
    filtered = filtered.filter((component) =>
      params.tags!.every((tag) => component.tags.includes(tag))
    )
  }

  if (normalizedSearch) {
    filtered = filtered.filter((component) => {
      const haystack = `${component.name} ${component.description} ${component.tags.join(' ')}`
      return haystack.toLowerCase().includes(normalizedSearch)
    })
  }

  const components = filtered.slice(offset, offset + limit)

  return {
    components,
    total: filtered.length,
    hasMore: filtered.length > offset + limit,
    limit,
    offset,
  }
}
