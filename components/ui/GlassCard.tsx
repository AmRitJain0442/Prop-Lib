'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { ReactNode } from 'react'
import clsx from 'clsx'

interface GlassCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode
  variant?: 'default' | 'strong'
  hover?: boolean
  glow?: boolean
  className?: string
}

export default function GlassCard({
  children,
  variant = 'default',
  hover = true,
  glow = false,
  className,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      className={clsx(
        'rounded-2xl border transition-all duration-300',
        variant === 'default' && 'glass',
        variant === 'strong' && 'glass-strong',
        glow && 'glow-box',
        hover && 'hover:bg-zinc-900 glow-box-hover cursor-pointer',
        className
      )}
      whileHover={hover ? { scale: 1.02 } : undefined}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
