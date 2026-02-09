import { ComponentType, createElement } from 'react'

// Cache for loaded preview components
const componentCache = new Map<string, ComponentType>()

/**
 * Dynamically loads a preview component by its path
 * @param path - Component path relative to components directory (e.g., 'previews/AnimatedGradientHeader')
 * @returns Promise that resolves to the component
 */
export async function loadPreviewComponent(path: string): Promise<ComponentType> {
  // Check cache first
  if (componentCache.has(path)) {
    return componentCache.get(path)!
  }

  try {
    // Dynamic import - Webpack/Next.js will bundle all possible components
    const module = await import(`@/components/${path}`)
    const Component = module.default

    if (!Component) {
      throw new Error(`Component at ${path} does not have a default export`)
    }

    // Cache the component
    componentCache.set(path, Component)
    return Component
  } catch (error) {
    console.error(`Failed to load component at ${path}:`, error)
    // Return a fallback error component
    return (() =>
      createElement('div', { className: 'text-red-500 p-4' }, `Failed to load component: ${path}`)) as ComponentType
  }
}

/**
 * Preload all preview components to ensure they're included in the build
 * This object maps component paths to their import functions
 */
export const PREVIEW_COMPONENTS: Record<string, () => Promise<any>> = {
  'previews/AnimatedGradientHeader': () => import('@/components/previews/AnimatedGradientHeader'),
  'previews/GlassmorphicSearchBar': () => import('@/components/previews/GlassmorphicSearchBar'),
  'previews/FloatingNav': () => import('@/components/previews/FloatingNav'),
  'previews/FerrofluidTabBar': () => import('@/components/previews/FerrofluidTabBar'),
  'previews/FlashlightSidebar': () => import('@/components/previews/FlashlightSidebar'),
  'previews/GravityWellUpload': () => import('@/components/previews/GravityWellUpload'),
  'previews/GyroscopicIslands': () => import('@/components/previews/GyroscopicIslands'),
  'previews/SafeCrackerSlider': () => import('@/components/previews/SafeCrackerSlider'),
  'previews/KineticSandButton': () => import('@/components/previews/KineticSandButton'),
  'previews/OrigamiCard': () => import('@/components/previews/OrigamiCard'),
}

/**
 * Clears the component cache (useful for development)
 */
export function clearComponentCache() {
  componentCache.clear()
}
