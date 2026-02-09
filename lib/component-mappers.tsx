import { ComponentType } from 'react'
import CatalogTokenPreview from '@/components/previews/CatalogTokenPreview'
import { ComponentData, ComponentRecord } from './catalog-core'
import { resolvePreviewComponent } from './preview-registry'

const generatedPreviewCache = new Map<string, ComponentType>()

function getGeneratedPreviewComponent(record: ComponentRecord): ComponentType {
  const cacheKey = record.id

  const cached = generatedPreviewCache.get(cacheKey)
  if (cached) {
    return cached
  }

  const GeneratedPreview = () => (
    <CatalogTokenPreview
      name={record.name}
      category={record.category}
      description={record.description}
    />
  )

  GeneratedPreview.displayName = `GeneratedPreview_${record.id.replace(/[^a-zA-Z0-9_]/g, '_')}`
  generatedPreviewCache.set(cacheKey, GeneratedPreview)
  return GeneratedPreview
}

function resolveRecordPreview(record: ComponentRecord): ComponentType {
  if (record.preview_component_path.startsWith('generated/')) {
    return getGeneratedPreviewComponent(record)
  }

  return resolvePreviewComponent(record.preview_component_path)
}

export function mapRecordToComponentData(record: ComponentRecord): ComponentData {
  return {
    id: record.id,
    name: record.name,
    description: record.description,
    category: record.category,
    tags: record.tags,
    preview: resolveRecordPreview(record),
    code: record.code,
    dependencies: record.dependencies,
    integration: record.integration,
    smartPrompt: record.smart_prompt || undefined,
    previewPath: record.preview_component_path,
  }
}
