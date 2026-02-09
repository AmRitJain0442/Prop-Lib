/**
 * API Client for fetching components from Supabase
 */

import { ComponentRecord, ComponentsResponse } from './catalog-core'

export type { ComponentsResponse }

export interface PopularComponentsResponse {
  popular: Array<{
    id: string
    name: string
    category: string
    view_count: number
    copy_count: number
    popularity_score: number
  }>
  count: number
}

/**
 * Fetch components with optional filtering
 */
export async function fetchComponents(params?: {
  category?: string
  tags?: string[]
  search?: string
  limit?: number
  offset?: number
}): Promise<ComponentsResponse> {
  const searchParams = new URLSearchParams()

  if (params?.category) searchParams.set('category', params.category)
  if (params?.tags) searchParams.set('tags', params.tags.join(','))
  if (params?.search) searchParams.set('search', params.search)
  if (params?.limit) searchParams.set('limit', String(params.limit))
  if (params?.offset) searchParams.set('offset', String(params.offset))

  const url = `/api/components?${searchParams.toString()}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to fetch components: ${response.statusText}`)
  }

  return response.json()
}

/**
 * Fetch a single component by ID
 */
export async function fetchComponent(id: string): Promise<ComponentRecord> {
  const response = await fetch(`/api/components/${id}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch component: ${response.statusText}`)
  }

  return response.json()
}

/**
 * Fetch popular components
 */
export async function fetchPopularComponents(limit = 10): Promise<PopularComponentsResponse> {
  const response = await fetch(`/api/analytics/popular?limit=${limit}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch popular components: ${response.statusText}`)
  }

  return response.json()
}

/**
 * Track an analytics event
 */
export async function trackEvent(
  componentId: string,
  eventType: 'view' | 'copy',
  eventData?: Record<string, any>
): Promise<void> {
  try {
    await fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ componentId, eventType, eventData }),
    })
  } catch (error) {
    // Don't throw - analytics failures shouldn't break the UI
    console.error('Failed to track event:', error)
  }
}
