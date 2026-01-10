import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase-client'

// Enable ISR with 5-minute revalidation
export const revalidate = 300

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    // Fetch component by ID
    const { data, error } = await supabase
      .from('components')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        // Not found
        return NextResponse.json(
          { error: 'Component not found' },
          { status: 404 }
        )
      }
      throw error
    }

    return NextResponse.json(data)

  } catch (error) {
    console.error(`API error in GET /api/components/${params.id}:`, error)
    return NextResponse.json(
      {
        error: 'Failed to fetch component',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
