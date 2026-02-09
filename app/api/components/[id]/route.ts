import { NextRequest, NextResponse } from 'next/server'
import { getLocalComponentById } from '@/lib/local-catalog'
import { isSupabaseConfigured, supabase } from '@/lib/supabase-client'

// Enable ISR with 5-minute revalidation
export const revalidate = 300

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  if (!isSupabaseConfigured || !supabase) {
    const localComponent = getLocalComponentById(id)
    if (!localComponent) {
      return NextResponse.json({ error: 'Component not found' }, { status: 404 })
    }
    return NextResponse.json(localComponent)
  }

  try {
    const { data, error } = await supabase
      .from('components')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Component not found' }, { status: 404 })
      }
      throw error
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error(`Supabase query failed for component ${id}, trying local fallback:`, error)

    const localComponent = getLocalComponentById(id)
    if (!localComponent) {
      return NextResponse.json({ error: 'Component not found' }, { status: 404 })
    }

    return NextResponse.json(localComponent)
  }
}
