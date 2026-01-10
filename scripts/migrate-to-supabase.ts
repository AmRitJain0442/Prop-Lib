/**
 * Migration Script: Move components from hardcoded array to Supabase
 *
 * Usage:
 * 1. Set up your .env.local file with Supabase credentials
 * 2. Run: npx ts-node --project tsconfig.json scripts/migrate-to-supabase.ts
 */

import { createClient } from '@supabase/supabase-js'
import { componentsData } from '../lib/components-data'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

// Component path mapping (map component name to preview path)
const COMPONENT_PATH_MAP: Record<string, string> = {
  'animated-gradient-header': 'previews/AnimatedGradientHeader',
  'glassmorphic-search-bar': 'previews/GlassmorphicSearchBar',
  'floating-navigation': 'previews/FloatingNav',
  'ferrofluid-tab-bar': 'previews/FerrofluidTabBar',
  'flashlight-sidebar': 'previews/FlashlightSidebar',
  'gravity-well-upload': 'previews/GravityWellUpload',
  'safe-cracker-slider': 'previews/SafeCrackerSlider',
  'kinetic-sand-button': 'previews/KineticSandButton',
  '3d-origami-card': 'previews/OrigamiCard',
}

async function migrate() {
  console.log('🚀 Starting migration to Supabase...\n')

  // Validate environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Error: Missing Supabase credentials')
    console.error('Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local')
    process.exit(1)
  }

  // Create Supabase client with service role key (admin access)
  const supabase = createClient(supabaseUrl, supabaseKey)

  console.log(`📊 Found ${componentsData.length} components to migrate\n`)

  let successCount = 0
  let errorCount = 0

  for (const component of componentsData) {
    try {
      console.log(`📝 Migrating: ${component.name} (${component.id})`)

      // Get preview component path
      const previewPath = COMPONENT_PATH_MAP[component.id]
      if (!previewPath) {
        console.warn(`⚠️  Warning: No preview path mapping for ${component.id}, using default`)
      }

      // Prepare data for insertion
      const componentData = {
        id: component.id,
        name: component.name,
        description: component.description,
        category: component.category,
        tags: component.tags,
        code: component.code,
        dependencies: component.dependencies,
        integration: component.integration,
        smart_prompt: component.smartPrompt || null,
        preview_component_path: previewPath || `previews/${component.name.replace(/\s+/g, '')}`,
      }

      // Insert into Supabase
      const { data, error } = await supabase
        .from('components')
        .insert(componentData)
        .select()

      if (error) {
        throw error
      }

      console.log(`  ✅ Success: ${component.id}`)
      successCount++

    } catch (error) {
      console.error(`  ❌ Failed: ${component.id}`)
      console.error(`     Error: ${error instanceof Error ? error.message : String(error)}`)
      errorCount++
    }
  }

  console.log('\n' + '='.repeat(50))
  console.log(`✨ Migration complete!`)
  console.log(`   Successful: ${successCount}`)
  console.log(`   Failed: ${errorCount}`)
  console.log('='.repeat(50) + '\n')

  if (errorCount > 0) {
    console.log('⚠️  Some components failed to migrate. Please check the errors above.')
    process.exit(1)
  }

  console.log('🎉 All components migrated successfully!')
  console.log('\nNext steps:')
  console.log('1. Verify data in Supabase dashboard')
  console.log('2. Update your frontend to use the API routes')
  console.log('3. Test the application')
}

// Run migration
migrate().catch((error) => {
  console.error('\n❌ Migration failed with error:', error)
  process.exit(1)
})
