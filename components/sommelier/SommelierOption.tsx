'use client'

import { motion } from 'framer-motion'

interface SommelierOptionProps {
  label: string
  onClick: () => void
  index: number
}

export function SommelierOption({ label, onClick, index }: SommelierOptionProps) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.1 * index, ease: 'easeOut' }}
      onClick={onClick}
      className="block w-full text-left px-4 py-3 rounded-lg border-2 border-cream-200 bg-white text-charcoal-800 text-sm font-medium hover:border-burgundy-600 hover:bg-burgundy-700 hover:text-cream-50 transition-all duration-200 cursor-pointer"
    >
      {label}
    </motion.button>
  )
}
