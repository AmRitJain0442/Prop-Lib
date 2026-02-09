import { ComponentType } from 'react'

export const COMPONENT_CATEGORIES = [
  'headers',
  'search',
  'navigation',
  'cards',
  'forms',
  'animations',
] as const

export type ComponentCategory = (typeof COMPONENT_CATEGORIES)[number]

export interface ComponentRecord {
  id: string
  name: string
  description: string
  category: ComponentCategory
  tags: string[]
  code: string
  dependencies: string[]
  integration: string
  smart_prompt: string | null
  preview_component_path: string
  created_at?: string
  updated_at?: string
  view_count?: number
  copy_count?: number
}

export interface ComponentData {
  id: string
  name: string
  description: string
  category: ComponentCategory
  tags: string[]
  preview: ComponentType
  code: string
  dependencies: string[]
  integration: string
  smartPrompt?: string
  previewPath?: string
}

export interface ComponentsResponse {
  components: ComponentRecord[]
  total: number
  hasMore: boolean
  limit: number
  offset: number
}
