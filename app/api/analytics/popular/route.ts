import { NextRequest, NextResponse } from 'next/server'
import { isSupabaseConfigured, supabase } from '@/lib/supabase-client'
import { localCatalog } from '@/lib/local-catalog'

// Enable ISR with 10-minute revalidation (less frequent than components)
export const revalidate = 600
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 50)

    if (!isSupabaseConfigured || !supabase) {
      const popular = [...localCatalog]
        .slice(0, limit)
        .map((component, index) => ({
          id: component.id,
          name: component.name,
          category: component.category,
          view_count: 1000 - index * 3,
          copy_count: 300 - index,
          popularity_score: 1900 - index * 4,
        }))

      return NextResponse.json({
        popular,
        count: popular.length,
      })
    }

    // Query the materialized view for popular components
    const { data, error } = await supabase
      .from('popular_components')
      .select('*')
      .limit(limit)

    if (error) {
      throw error
    }

    return NextResponse.json({
      popular: data || [],
      count: data?.length || 0
    })

  } catch (error) {
    console.error('API error in GET /api/analytics/popular:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch popular components',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
