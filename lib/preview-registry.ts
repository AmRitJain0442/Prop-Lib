import { ComponentType } from 'react'
import AnimatedGradientHeader from '@/components/previews/AnimatedGradientHeader'
import FerrofluidTabBar from '@/components/previews/FerrofluidTabBar'
import FlashlightSidebar from '@/components/previews/FlashlightSidebar'
import FloatingNav from '@/components/previews/FloatingNav'
import GlassmorphicSearchBar from '@/components/previews/GlassmorphicSearchBar'
import GravityWellUpload from '@/components/previews/GravityWellUpload'
import GyroscopicIslands from '@/components/previews/GyroscopicIslands'
import KineticSandButton from '@/components/previews/KineticSandButton'
import OrigamiCard from '@/components/previews/OrigamiCard'
import SafeCrackerSlider from '@/components/previews/SafeCrackerSlider'

export const PREVIEW_REGISTRY: Record<string, ComponentType> = {
  'previews/AnimatedGradientHeader': AnimatedGradientHeader,
  'previews/FerrofluidTabBar': FerrofluidTabBar,
  'previews/FlashlightSidebar': FlashlightSidebar,
  'previews/FloatingNav': FloatingNav,
  'previews/GlassmorphicSearchBar': GlassmorphicSearchBar,
  'previews/GravityWellUpload': GravityWellUpload,
  'previews/GyroscopicIslands': GyroscopicIslands,
  'previews/KineticSandButton': KineticSandButton,
  'previews/OrigamiCard': OrigamiCard,
  'previews/SafeCrackerSlider': SafeCrackerSlider,
}

const DEFAULT_PREVIEW_PATH = 'previews/AnimatedGradientHeader'

export function resolvePreviewComponent(path: string | null | undefined): ComponentType {
  if (!path) {
    return PREVIEW_REGISTRY[DEFAULT_PREVIEW_PATH]
  }

  return PREVIEW_REGISTRY[path] || PREVIEW_REGISTRY[DEFAULT_PREVIEW_PATH]
}
