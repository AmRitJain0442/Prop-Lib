import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase-client'

// Enable ISR with 10-minute revalidation (less frequent than components)
export const revalidate = 600

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 50)

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
