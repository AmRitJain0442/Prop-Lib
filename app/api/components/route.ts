import { NextRequest, NextResponse } from 'next/server'
import { queryLocalComponents } from '@/lib/local-catalog'
import { isSupabaseConfigured, supabase } from '@/lib/supabase-client'

// Enable ISR with 5-minute revalidation
export const revalidate = 300
export const dynamic = 'force-dynamic'

function parseQueryParams(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const tags = searchParams.get('tags')?.split(',').map((tag) => tag.trim()).filter(Boolean) || []
  const search = searchParams.get('search')
  const limit = Math.max(1, Math.min(parseInt(searchParams.get('limit') || '60', 10), 200))
  const offset = Math.max(0, parseInt(searchParams.get('offset') || '0', 10))

  return { category, tags, search, limit, offset }
}

export async function GET(request: NextRequest) {
  const { category, tags, search, limit, offset } = parseQueryParams(request)

  // Local fallback allows development without Supabase credentials.
  if (!isSupabaseConfigured || !supabase) {
    return NextResponse.json(
      queryLocalComponents({
        category,
        tags,
        search,
        limit,
        offset,
      })
    )
  }

  try {
    let query = supabase.from('components').select('*', { count: 'exact' })

    if (category && category !== 'all') {
      query = query.eq('category', category)
    }

    if (tags.length > 0) {
      query = query.contains('tags', tags)
    }

    if (search && search.trim()) {
      const searchQuery = search.trim().split(/\s+/).join(' & ')
      query = query.textSearch('search_vector', searchQuery, {
        type: 'websearch',
        config: 'english',
      })
    }

    query = query.order('updated_at', { ascending: false }).range(offset, offset + limit - 1)

    const { data, count, error } = await query

    if (error) {
      throw error
    }

    return NextResponse.json({
      components: data || [],
      total: count || 0,
      hasMore: (count || 0) > offset + limit,
      limit,
      offset,
    })
  } catch (error) {
    console.error('Supabase query failed, serving local fallback:', error)

    return NextResponse.json(
      queryLocalComponents({
        category,
        tags,
        search,
        limit,
        offset,
      })
    )
  }
}
