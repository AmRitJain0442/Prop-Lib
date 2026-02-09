import { NextRequest, NextResponse } from 'next/server'
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabase-client'
import { requireAdminAuth } from '@/lib/admin-auth'

export async function POST(request: NextRequest) {
  // Check admin authentication (for manual calls)
  // For Vercel Cron, you can add a separate auth check using CRON_SECRET
  const authHeader = request.headers.get('authorization')
  const cronSecret = request.headers.get('x-vercel-cron-secret')

  if (!authHeader && cronSecret !== process.env.CRON_SECRET) {
    const authError = requireAdminAuth(request)
    if (authError) return authError
  }

  try {
    if (!isSupabaseAdminConfigured || !supabaseAdmin) {
      return NextResponse.json(
        { error: 'Supabase admin client is not configured' },
        { status: 503 }
      )
    }

    // Call the refresh function
    const { error } = await supabaseAdmin.rpc('refresh_popular_components')

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
      message: 'Analytics refreshed successfully',
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('API error in POST /api/admin/refresh-analytics:', error)
    return NextResponse.json(
      {
        error: 'Failed to refresh analytics',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
