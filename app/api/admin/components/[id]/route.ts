import { NextRequest, NextResponse } from 'next/server'
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabase-client'
import { requireAdminAuth } from '@/lib/admin-auth'
import { revalidatePath } from 'next/cache'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

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

    // Build update object (only include provided fields)
    const updateData: any = {}
    const allowedFields = [
      'name', 'description', 'category', 'tags', 'code',
      'dependencies', 'integration', 'smart_prompt', 'preview_component_path'
    ]

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field]
      }
    }

    // Update component in database
    const { data, error } = await supabaseAdmin
      .from('components')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Component not found' },
          { status: 404 }
        )
      }
      throw error
    }

    // Revalidate ISR cache
    revalidatePath('/api/components')
    revalidatePath(`/api/components/${id}`)

    return NextResponse.json({
      success: true,
      component: data
    })

  } catch (error) {
    console.error(`API error in PUT /api/admin/components/${id}:`, error)
    return NextResponse.json(
      {
        error: 'Failed to update component',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

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
    // Delete component from database
    const { error } = await supabaseAdmin
      .from('components')
      .delete()
      .eq('id', id)

    if (error) {
      throw error
    }

    // Revalidate ISR cache
    revalidatePath('/api/components')
    revalidatePath(`/api/components/${id}`)

    return NextResponse.json({
      success: true,
      message: 'Component deleted successfully'
    })

  } catch (error) {
    console.error(`API error in DELETE /api/admin/components/${id}:`, error)
    return NextResponse.json(
      {
        error: 'Failed to delete component',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
