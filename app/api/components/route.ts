import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase-client'

// Enable ISR with 5-minute revalidation
export const revalidate = 300

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Extract query parameters
    const category = searchParams.get('category')
    const tags = searchParams.get('tags')?.split(',').filter(Boolean)
    const search = searchParams.get('search')
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100) // Max 100
    const offset = parseInt(searchParams.get('offset') || '0')

    // Start building the query
    let query = supabase
      .from('components')
      .select('*', { count: 'exact' })

    // Apply category filter
    if (category && category !== 'all') {
      query = query.eq('category', category)
    }

    // Apply tags filter (components must contain all specified tags)
    if (tags && tags.length > 0) {
      query = query.contains('tags', tags)
    }

    // Apply full-text search
    if (search && search.trim()) {
      // Convert search query to tsquery format
      const searchQuery = search.trim().split(/\s+/).join(' & ')
      query = query.textSearch('search_vector', searchQuery, {
        type: 'websearch',
        config: 'english'
      })
    }

    // Order by updated_at (most recent first) and apply pagination
    query = query
      .order('updated_at', { ascending: false })
      .range(offset, offset + limit - 1)

    // Execute query
    const { data, count, error } = await query

    if (error) {
      console.error('Supabase error:', error)
      throw error
    }

    // Return response
    return NextResponse.json({
      components: data || [],
      total: count || 0,
      hasMore: (count || 0) > offset + limit,
      limit,
      offset
    })

  } catch (error) {
    console.error('API error in GET /api/components:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch components',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
