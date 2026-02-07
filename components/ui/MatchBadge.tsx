'use client'

import { motion } from 'framer-motion'

type MatchLevel = 'great' | 'average' | 'low'

interface MatchBadgeProps {
  score: number
  size?: 'sm' | 'lg'
}

function getMatchLevel(score: number): MatchLevel {
  if (score >= 70) return 'great'
  if (score >= 40) return 'average'
  return 'low'
}

const levelConfig: Record<Exclude<MatchLevel, 'low'>, { bg: string; label: string; ring: string }> = {
  great: {
    bg: 'bg-sage-400 text-cream-50',
    label: 'Uitstekende Match',
    ring: 'ring-sage-300/50',
  },
  average: {
    bg: 'bg-gold-500 text-charcoal-900',
    label: 'Goede Match',
    ring: 'ring-gold-400/50',
  },
}

const sizeConfig = {
  sm: {
    wrapper: 'gap-1 px-2 py-1',
    score: 'text-xs font-bold',
    label: 'text-[9px] font-medium leading-none',
  },
  lg: {
    wrapper: 'gap-1.5 px-3 py-1.5',
    score: 'text-sm font-bold',
    label: 'text-[11px] font-medium leading-none',
  },
}

export function MatchBadge({ score, size = 'sm' }: MatchBadgeProps) {
  const level = getMatchLevel(score)

  // Don't render for low match scores
  if (level === 'low') return null

  const config = levelConfig[level]
  const sizes = sizeConfig[size]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`inline-flex items-center ${sizes.wrapper} rounded-full ${config.bg} ring-1 ${config.ring} shadow-sm`}
    >
      <span className={sizes.score}>{score}%</span>
      <span className={sizes.label}>{config.label}</span>
    </motion.div>
  )
}
