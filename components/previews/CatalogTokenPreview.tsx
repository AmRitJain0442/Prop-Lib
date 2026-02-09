'use client'

interface CatalogTokenPreviewProps {
  name: string
  category: string
  description: string
}

function hashToHue(input: string): number {
  let hash = 0
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 31 + input.charCodeAt(i)) % 360
  }
  return Math.abs(hash)
}

export default function CatalogTokenPreview({
  name,
  category,
  description,
}: CatalogTokenPreviewProps) {
  const hue = hashToHue(name + category)
  const gradientA = `hsla(${hue}, 80%, 55%, 0.45)`
  const gradientB = `hsla(${(hue + 80) % 360}, 82%, 52%, 0.42)`

  return (
    <div className="relative w-full h-full overflow-hidden bg-zinc-950">
      <div
        className="absolute -inset-10 blur-3xl"
        style={{
          background: `radial-gradient(circle at 20% 30%, ${gradientA}, transparent 50%), radial-gradient(circle at 80% 70%, ${gradientB}, transparent 50%)`,
        }}
      />

      <div className="absolute inset-3 rounded-xl border border-white/10 bg-black/45 backdrop-blur-sm p-3 flex flex-col justify-between">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] uppercase tracking-[0.14em] text-zinc-400">
            {category}
          </span>
          <span className="text-[10px] text-zinc-500">Generated</span>
        </div>

        <div className="space-y-1.5">
          <p className="text-xs font-semibold text-zinc-100 line-clamp-2">{name}</p>
          <p className="text-[10px] text-zinc-300/90 line-clamp-2">{description}</p>
        </div>

        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${45 + (hue % 40)}%`,
              background: `linear-gradient(90deg, ${gradientA}, ${gradientB})`,
            }}
          />
        </div>
      </div>
    </div>
  )
}
