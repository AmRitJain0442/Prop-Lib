import { NextRequest, NextResponse } from 'next/server'
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabase-client'
import { requireAdminAuth } from '@/lib/admin-auth'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  // Check admin authentication
  const authError = requireAdminAuth(request)
  if (authError) return authError

  if (!isSupabaseAdminConfigured || !supabaseAdmin) {
    return NextResponse.json(
      { error: 'Supabase admin client is not configured' },
      { status: 503 }
    )
  }

  try {
    const body = await request.json()

    // Validate required fields
    const required = ['id', 'name', 'description', 'category', 'code', 'integration', 'preview_component_path']
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Insert component into database
    const { data, error } = await supabaseAdmin
      .from('components')
      .insert({
        id: body.id,
        name: body.name,
        description: body.description,
        category: body.category,
        tags: body.tags || [],
        code: body.code,
        dependencies: body.dependencies || [],
        integration: body.integration,
        smart_prompt: body.smart_prompt || null,
        preview_component_path: body.preview_component_path
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    // Revalidate ISR cache
    revalidatePath('/api/components')

    return NextResponse.json({
      success: true,
      component: data
    }, { status: 201 })

  } catch (error) {
    console.error('API error in POST /api/admin/components:', error)
    return NextResponse.json(
      {
        error: 'Failed to create component',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
