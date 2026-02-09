import { ComponentData } from './types'
import { localCatalog } from './local-catalog'
import { mapRecordToComponentData } from './component-mappers'

// Compatibility export for existing imports.
export const componentsData: ComponentData[] = localCatalog.map(mapRecordToComponentData)
