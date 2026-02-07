'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import type { RfmSegment } from '@/lib/types'

interface RfmSegmentationProps {
  segments: RfmSegment[]
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
  }).format(value)
}

function RfmBar({ label, value, max = 5 }: { label: string; value: number; max?: number }) {
  const percentage = (value / max) * 100
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] font-semibold text-charcoal-700 w-3 uppercase">{label}</span>
      <div className="flex-1 h-2 bg-cream-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-burgundy-700"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>
      <span className="text-[10px] font-bold text-charcoal-900 w-3 text-right">{value}</span>
    </div>
  )
}

export function RfmSegmentation({ segments }: RfmSegmentationProps) {
  const [activeId, setActiveId] = useState<string | null>(null)

  const totalCount = useMemo(
    () => segments.reduce((sum, s) => sum + s.count, 0),
    [segments]
  )

  const activeSegment = activeId
    ? segments.find((s) => s.id === activeId) ?? null
    : null

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-heading text-lg text-charcoal-900">
              Klantsegmentatie (RFM-Analyse)
            </h3>
            <p className="text-xs text-charcoal-700 mt-1">
              Recency, Frequency, Monetary segmentatie van het klantenbestand
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-burgundy-700 font-heading">{totalCount}</p>
            <p className="text-[10px] text-charcoal-700 uppercase tracking-wider">
              klanten in {segments.length} segmenten
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Benchmark Reference */}
        <div className="flex items-center gap-2 mb-6 px-3 py-2 bg-gold-500/10 border border-gold-400/30 rounded-lg">
          <svg className="w-4 h-4 text-gold-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
          <p className="text-xs text-charcoal-800">
            <span className="font-semibold">Benchmark:</span> RFM-segmentatie leidt tot +40% CTR (REI case study)
          </p>
        </div>

        {/* Segment Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
          {segments.map((segment) => {
            const isActive = activeId === segment.id
            return (
              <button
                key={segment.id}
                onClick={() => setActiveId(isActive ? null : segment.id)}
                className={`text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                  isActive
                    ? 'border-burgundy-700 bg-cream-100 shadow-md'
                    : 'border-cream-200 bg-white hover:border-cream-200 hover:shadow-sm'
                }`}
              >
                {/* Color dot + name */}
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: segment.color }}
                  />
                  <span className="text-sm font-semibold text-charcoal-900 truncate">
                    {segment.name}
                  </span>
                </div>

                {/* Count */}
                <p className="text-2xl font-bold font-heading text-charcoal-900 mb-1">
                  {segment.count}
                </p>
                <p className="text-[10px] text-charcoal-700 uppercase tracking-wider mb-3">
                  klanten
                </p>

                {/* Mini RFM bars */}
                <div className="space-y-1">
                  <RfmBar label="R" value={segment.rfm.recency} />
                  <RfmBar label="F" value={segment.rfm.frequency} />
                  <RfmBar label="M" value={segment.rfm.monetary} />
                </div>
              </button>
            )
          })}
        </div>

        {/* Active Segment Detail */}
        <AnimatePresence>
          {activeSegment && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="border-t border-cream-200 pt-5">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="w-5 h-5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: activeSegment.color }}
                  />
                  <h4 className="font-heading text-xl text-charcoal-900">
                    {activeSegment.name}
                  </h4>
                </div>
                <p className="text-sm text-charcoal-700 mb-5">
                  {activeSegment.description}
                </p>

                {/* Stats Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
                  <div className="p-3 bg-cream-50 rounded-lg text-center">
                    <p className="text-lg font-bold text-burgundy-700 font-heading">
                      {activeSegment.count}
                    </p>
                    <p className="text-[10px] text-charcoal-700 uppercase tracking-wider">
                      Klanten
                    </p>
                  </div>
                  <div className="p-3 bg-cream-50 rounded-lg text-center">
                    <p className="text-lg font-bold text-gold-500 font-heading">
                      {formatCurrency(activeSegment.avgOrderValue)}
                    </p>
                    <p className="text-[10px] text-charcoal-700 uppercase tracking-wider">
                      Gem. Order
                    </p>
                  </div>
                  <div className="p-3 bg-cream-50 rounded-lg text-center">
                    <p className="text-lg font-bold text-sage-400 font-heading">
                      {activeSegment.retentionRate}%
                    </p>
                    <p className="text-[10px] text-charcoal-700 uppercase tracking-wider">
                      Retentie
                    </p>
                  </div>
                  <div className="p-3 bg-cream-50 rounded-lg text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-xs font-bold text-charcoal-800">
                        {activeSegment.rfm.recency}
                      </span>
                      <span className="text-[10px] text-charcoal-700">/</span>
                      <span className="text-xs font-bold text-charcoal-800">
                        {activeSegment.rfm.frequency}
                      </span>
                      <span className="text-[10px] text-charcoal-700">/</span>
                      <span className="text-xs font-bold text-charcoal-800">
                        {activeSegment.rfm.monetary}
                      </span>
                    </div>
                    <p className="text-[10px] text-charcoal-700 uppercase tracking-wider mt-1">
                      R / F / M Score
                    </p>
                  </div>
                </div>

                {/* Recommended Action */}
                <div className="p-4 bg-burgundy-800/5 border border-burgundy-700/10 rounded-lg">
                  <h5 className="text-xs font-semibold text-burgundy-700 uppercase tracking-wider mb-1">
                    Aanbevolen Actie
                  </h5>
                  <p className="text-sm text-charcoal-800">
                    {activeSegment.action}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}
