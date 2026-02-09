/**
 * Migration Script: Seed Supabase components table from local catalog.
 *
 * Usage:
 * 1. Add Supabase credentials to .env.local
 * 2. Run: npx ts-node --project tsconfig.json scripts/migrate-to-supabase.ts
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import * as path from 'path'
import { localCatalog } from '../lib/local-catalog'

dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

const MAX_ERROR_LOGS = 10

function extractErrorText(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }

  try {
    return JSON.stringify(error)
  } catch {
    return String(error)
  }
}

async function migrate() {
  console.log('Starting migration to Supabase')

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
    process.exit(1)
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  console.log(`Found ${localCatalog.length} components to migrate`)

  let successCount = 0
  let errorCount = 0
  let loggedErrors = 0

  for (const component of localCatalog) {
    try {
      const { error } = await supabase.from('components').upsert(
        {
          id: component.id,
          name: component.name,
          description: component.description,
          category: component.category,
          tags: component.tags,
          code: component.code,
          dependencies: component.dependencies,
          integration: component.integration,
          smart_prompt: component.smart_prompt,
          preview_component_path: component.preview_component_path,
        },
        { onConflict: 'id' }
      )

      if (error) {
        throw error
      }

      successCount += 1
      if (successCount % 25 === 0) {
        console.log(`Migrated ${successCount}/${localCatalog.length}`)
      }
    } catch (error) {
      errorCount += 1
      const errorText = extractErrorText(error)
      const isDnsError = errorText.includes('ENOTFOUND')

      if (loggedErrors < MAX_ERROR_LOGS) {
        console.error(`Failed to migrate ${component.id}:`, error)
        loggedErrors += 1
      }

      if (isDnsError) {
        console.error(
          'DNS resolution failed for Supabase URL. Verify NEXT_PUBLIC_SUPABASE_URL in .env.local and retry.'
        )
        break
      }
    }
  }

  console.log('Migration complete')
  console.log(`Successful: ${successCount}`)
  console.log(`Failed: ${errorCount}`)

  if (errorCount > loggedErrors) {
    console.log(`Additional failures omitted from logs: ${errorCount - loggedErrors}`)
  }

  if (errorCount > 0) {
    process.exit(1)
  }
}

migrate().catch((error) => {
  console.error('Migration failed:', error)
  process.exit(1)
})
