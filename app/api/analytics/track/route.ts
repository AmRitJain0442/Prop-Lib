import { NextRequest, NextResponse } from 'next/server'
import { isSupabaseConfigured, supabase } from '@/lib/supabase-client'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { componentId, eventType, eventData } = body

    // Validate input
    if (!componentId || !eventType) {
      return NextResponse.json(
        { error: 'Missing required fields: componentId and eventType' },
        { status: 400 }
      )
    }

    if (!['view', 'copy', 'search'].includes(eventType)) {
      return NextResponse.json(
        { error: 'Invalid eventType. Must be view, copy, or search' },
        { status: 400 }
      )
    }

    if (!isSupabaseConfigured || !supabase) {
      return NextResponse.json({ success: true, mode: 'local-noop' })
    }

    // Increment counter in components table (atomic operation)
    if (eventType === 'view') {
      await supabase.rpc('increment_view_count', { component_id: componentId })
    } else if (eventType === 'copy') {
      await supabase.rpc('increment_copy_count', { component_id: componentId })
    }

    // Insert event into analytics_events table (fire and forget - don't await)
    supabase
      .from('analytics_events')
      .insert({
        component_id: componentId,
        event_type: eventType,
        event_data: eventData || null
      })
      .then(({ error }) => {
        if (error) {
          console.error('Failed to insert analytics event:', error)
        }
      })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('API error in POST /api/analytics/track:', error)
    return NextResponse.json(
      {
        error: 'Failed to track event',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
