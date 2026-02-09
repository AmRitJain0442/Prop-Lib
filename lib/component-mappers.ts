import { ComponentData, ComponentRecord } from './catalog-core'
import { resolvePreviewComponent } from './preview-registry'

export function mapRecordToComponentData(record: ComponentRecord): ComponentData {
  return {
    id: record.id,
    name: record.name,
    description: record.description,
    category: record.category,
    tags: record.tags,
    preview: resolvePreviewComponent(record.preview_component_path),
    code: record.code,
    dependencies: record.dependencies,
    integration: record.integration,
    smartPrompt: record.smart_prompt || undefined,
    previewPath: record.preview_component_path,
  }
}
