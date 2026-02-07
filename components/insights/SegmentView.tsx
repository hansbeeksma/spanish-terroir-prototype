'use client'

import { useState, useMemo } from 'react'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import type { Segment } from '@/lib/types'
import wines from '@/data/wines.json'
import type { Wine } from '@/lib/types'

const typedWines = wines as Wine[]

interface SegmentViewProps {
  segments: Segment[]
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
  }).format(value)
}

function getWineName(slug: string): string {
  const wine = typedWines.find((w) => w.slug === slug)
  return wine ? wine.name : slug
}

export function SegmentView({ segments }: SegmentViewProps) {
  const [activeSegment, setActiveSegment] = useState<string | null>(null)

  const totalCount = useMemo(
    () => segments.reduce((sum, s) => sum + s.count, 0),
    [segments]
  )

  // Build SVG donut chart
  const donutData = useMemo(() => {
    const cx = 120
    const cy = 120
    const outerR = 100
    const innerR = 60

    let currentAngle = -90 // Start from top

    return segments.map((segment) => {
      const fraction = segment.count / totalCount
      const angle = fraction * 360
      const startAngle = currentAngle
      const endAngle = currentAngle + angle

      const startRad = (startAngle * Math.PI) / 180
      const endRad = (endAngle * Math.PI) / 180

      const largeArc = angle > 180 ? 1 : 0

      const x1Outer = cx + outerR * Math.cos(startRad)
      const y1Outer = cy + outerR * Math.sin(startRad)
      const x2Outer = cx + outerR * Math.cos(endRad)
      const y2Outer = cy + outerR * Math.sin(endRad)

      const x1Inner = cx + innerR * Math.cos(endRad)
      const y1Inner = cy + innerR * Math.sin(endRad)
      const x2Inner = cx + innerR * Math.cos(startRad)
      const y2Inner = cy + innerR * Math.sin(startRad)

      const path = [
        `M ${x1Outer} ${y1Outer}`,
        `A ${outerR} ${outerR} 0 ${largeArc} 1 ${x2Outer} ${y2Outer}`,
        `L ${x1Inner} ${y1Inner}`,
        `A ${innerR} ${innerR} 0 ${largeArc} 0 ${x2Inner} ${y2Inner}`,
        'Z',
      ].join(' ')

      // Label position
      const midAngle = ((startAngle + endAngle) / 2 * Math.PI) / 180
      const labelR = (outerR + innerR) / 2
      const labelX = cx + labelR * Math.cos(midAngle)
      const labelY = cy + labelR * Math.sin(midAngle)

      currentAngle = endAngle

      return {
        ...segment,
        path,
        fraction,
        labelX,
        labelY,
      }
    })
  }, [segments, totalCount])

  const activeSegmentData = activeSegment
    ? segments.find((s) => s.id === activeSegment)
    : null

  return (
    <Card>
      <CardHeader>
        <h3 className="font-heading text-lg text-charcoal-900">
          Klantsegmenten
        </h3>
        <p className="text-xs text-charcoal-700 mt-1">
          Klik op een segment voor details
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          {/* Donut Chart */}
          <svg viewBox="0 0 240 240" className="w-56 h-56 mb-6">
            {donutData.map((d) => (
              <g key={d.id}>
                <path
                  d={d.path}
                  fill={d.color}
                  stroke="white"
                  strokeWidth={2}
                  className="cursor-pointer transition-all duration-200"
                  opacity={
                    activeSegment === null || activeSegment === d.id ? 1 : 0.4
                  }
                  onMouseEnter={() => setActiveSegment(d.id)}
                  onClick={() =>
                    setActiveSegment(activeSegment === d.id ? null : d.id)
                  }
                />
                {d.fraction > 0.1 && (
                  <text
                    x={d.labelX}
                    y={d.labelY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-[10px] fill-white font-bold pointer-events-none"
                  >
                    {Math.round(d.fraction * 100)}%
                  </text>
                )}
              </g>
            ))}
            {/* Center text */}
            <text
              x={120}
              y={115}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-[22px] fill-[#2D2D2D] font-bold"
            >
              {totalCount}
            </text>
            <text
              x={120}
              y={135}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-[10px] fill-[#3D3D3D]"
            >
              klanten
            </text>
          </svg>

          {/* Legend */}
          <div className="w-full space-y-2 mb-4">
            {segments.map((seg) => (
              <button
                key={seg.id}
                onClick={() =>
                  setActiveSegment(activeSegment === seg.id ? null : seg.id)
                }
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                  activeSegment === seg.id
                    ? 'bg-cream-100'
                    : 'hover:bg-cream-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: seg.color }}
                  />
                  <span className="text-sm text-charcoal-900 font-medium">
                    {seg.name}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-charcoal-700">
                  <span>{seg.count} klanten</span>
                  <span>{formatCurrency(seg.avgOrderValue)} gem.</span>
                  <span>{seg.avgFrequency}x/mnd</span>
                </div>
              </button>
            ))}
          </div>

          {/* Detail Panel */}
          {activeSegmentData && (
            <div className="w-full border-t border-cream-200 pt-4 mt-2">
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: activeSegmentData.color }}
                />
                <h4 className="font-heading text-base text-charcoal-900">
                  {activeSegmentData.name}
                </h4>
              </div>
              <p className="text-xs text-charcoal-700 mb-4">
                {activeSegmentData.description}
              </p>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center p-3 bg-cream-50 rounded-lg">
                  <p className="text-lg font-bold text-burgundy-700">
                    {activeSegmentData.count}
                  </p>
                  <p className="text-[10px] text-charcoal-700 uppercase tracking-wider">
                    Klanten
                  </p>
                </div>
                <div className="text-center p-3 bg-cream-50 rounded-lg">
                  <p className="text-lg font-bold text-gold-500">
                    {formatCurrency(activeSegmentData.avgOrderValue)}
                  </p>
                  <p className="text-[10px] text-charcoal-700 uppercase tracking-wider">
                    Gem. Order
                  </p>
                </div>
                <div className="text-center p-3 bg-cream-50 rounded-lg">
                  <p className="text-lg font-bold text-sage-400">
                    {activeSegmentData.avgFrequency}x
                  </p>
                  <p className="text-[10px] text-charcoal-700 uppercase tracking-wider">
                    Per Maand
                  </p>
                </div>
              </div>

              <h5 className="text-xs font-medium text-charcoal-700 uppercase tracking-wider mb-2">
                Top Wijnen
              </h5>
              <div className="space-y-1.5">
                {activeSegmentData.topWines.map((slug) => (
                  <div
                    key={slug}
                    className="flex items-center justify-between py-1.5 px-2 rounded bg-cream-50"
                  >
                    <span className="text-sm text-charcoal-900">
                      {getWineName(slug)}
                    </span>
                    <Badge variant="wine">Favoriet</Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
