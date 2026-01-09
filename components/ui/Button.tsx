'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { ReactNode } from 'react'
import clsx from 'clsx'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: ReactNode
  variant?: 'glass' | 'gradient' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function Button({
  children,
  variant = 'glass',
  size = 'md',
  className,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      className={clsx(
        'rounded-2xl font-medium transition-all duration-200',
        variant === 'glass' && 'glass hover:bg-zinc-800',
        variant === 'gradient' && 'bg-white text-black hover:bg-gray-200 hover:shadow-lg',
        variant === 'outline' && 'border border-zinc-800 hover:bg-zinc-900',
        size === 'sm' && 'px-4 py-2 text-sm',
        size === 'md' && 'px-6 py-3 text-base',
        size === 'lg' && 'px-8 py-4 text-lg',
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  )
}
