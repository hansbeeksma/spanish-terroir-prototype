'use client'

import { useState } from 'react'

interface BenchmarkBadgeProps {
  label: string
  source: string
  tooltip: string
}

export function BenchmarkBadge({ label, source, tooltip }: BenchmarkBadgeProps) {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <span
      className="relative inline-flex items-center gap-1 ml-1"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gold-500/15 text-gold-600 border border-gold-400/30 cursor-help">
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
        </svg>
        {label}
        <span className="text-gold-500/70">({source})</span>
      </span>

      {/* Tooltip */}
      {showTooltip && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-charcoal-900 text-cream-50 text-[11px] rounded-lg shadow-lg whitespace-nowrap z-50 max-w-xs">
          {tooltip}
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-charcoal-900" />
        </span>
      )}
    </span>
  )
}
