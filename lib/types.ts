import { ComponentType } from 'react'

export interface ComponentData {
  id: string
  name: string
  description: string
  category: 'headers' | 'search' | 'navigation' | 'cards' | 'forms' | 'animations'
  tags: string[]
  preview: ComponentType
  code: string
  dependencies: string[]
  integration: string
  smartPrompt?: string
}

export interface ComponentCategory {
  id: string
  name: string
  icon: string
  count: number
}
