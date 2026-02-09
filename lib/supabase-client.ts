import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { ComponentCategory, ComponentRecord } from './catalog-core'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)
export const isSupabaseAdminConfigured = Boolean(supabaseUrl && supabaseServiceRoleKey)

function createOptionalClient(url: string | undefined, key: string | undefined): SupabaseClient | null {
  if (!url || !key) {
    return null
  }

  return createClient(url, key)
}

export const supabase = createOptionalClient(supabaseUrl, supabaseAnonKey)
export const supabaseAdmin = createOptionalClient(supabaseUrl, supabaseServiceRoleKey)

export interface ComponentRow extends ComponentRecord {
  category: ComponentCategory
  created_at: string
  updated_at: string
  view_count: number
  copy_count: number
}

export interface AnalyticsEvent {
  id: number
  component_id: string
  event_type: 'view' | 'copy' | 'search'
  event_data: Record<string, unknown> | null
  created_at: string
}

export interface SearchQuery {
  id: number
  query: string
  results_count: number
  created_at: string
}

export interface PopularComponent {
  id: string
  name: string
  category: string
  view_count: number
  copy_count: number
  popularity_score: number
}
