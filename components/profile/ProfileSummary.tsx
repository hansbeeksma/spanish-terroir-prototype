'use client'

import { useMemo } from 'react'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent } from '@/components/ui/Card'
import type { CustomerProfile, Wine } from '@/lib/types'

interface ProfileSummaryProps {
  profile: CustomerProfile
  wines: Wine[]
}

const typeLabels: Record<CustomerProfile['type'], string> = {
  'fine-dining': 'Fine Dining',
  'casual': 'Casual Dining',
  'hotel': 'Hotel',
  'bar': 'Wijnbar',
  'caterer': 'Cateraar',
}

const styleLabels: Record<string, string> = {
  light: 'Licht',
  medium: 'Medium',
  full: 'Vol',
}

const typeWineLabels: Record<string, string> = {
  red: 'Rood',
  white: 'Wit',
  rose: 'Ros\u00E9',
  sparkling: 'Bubbels',
}

const priceLabels: Record<string, string> = {
  budget: 'Budget',
  mid: 'Mid-range',
  premium: 'Premium',
  ultra: 'Ultra-premium',
}

function priceToScore(priceRange: string): number {
  switch (priceRange) {
    case 'budget': return 1
    case 'mid': return 2
    case 'premium': return 4
    case 'ultra': return 5
    default: return 3
  }
}

function bodyToScore(styles: string[]): number {
  if (styles.includes('full') && styles.includes('light')) return 3
  if (styles.includes('full')) return 5
  if (styles.includes('medium') && styles.includes('full')) return 4
  if (styles.includes('medium')) return 3
  if (styles.includes('light') && styles.includes('medium')) return 2
  if (styles.includes('light')) return 1
  return 3
}

function gpToScore(gpMin: number): number {
  if (gpMin >= 95) return 5
  if (gpMin >= 93) return 4
  if (gpMin >= 91) return 3
  if (gpMin >= 89) return 2
  return 1
}

interface RadarPoint {
  label: string
  value: number
  maxValue: number
}

function RadarChart({ points }: { points: RadarPoint[] }) {
  const size = 240
  const center = size / 2
  const maxRadius = 90
  const levels = 5

  const angleStep = (2 * Math.PI) / points.length
  const startAngle = -Math.PI / 2

  function polarToCartesian(angle: number, radius: number) {
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    }
  }

  // Grid circles
  const gridCircles = Array.from({ length: levels }, (_, i) => {
    const radius = ((i + 1) / levels) * maxRadius
    const gridPoints = points.map((_, j) => {
      const angle = startAngle + j * angleStep
      return polarToCartesian(angle, radius)
    })
    return gridPoints.map((p) => `${p.x},${p.y}`).join(' ')
  })

  // Axis lines
  const axisLines = points.map((_, i) => {
    const angle = startAngle + i * angleStep
    const end = polarToCartesian(angle, maxRadius)
    return { x1: center, y1: center, x2: end.x, y2: end.y }
  })

  // Data points
  const dataPoints = points.map((point, i) => {
    const angle = startAngle + i * angleStep
    const normalizedValue = Math.min(point.value / point.maxValue, 1)
    const radius = normalizedValue * maxRadius
    return polarToCartesian(angle, radius)
  })
  const dataPolygon = dataPoints.map((p) => `${p.x},${p.y}`).join(' ')

  // Labels
  const labels = points.map((point, i) => {
    const angle = startAngle + i * angleStep
    const labelRadius = maxRadius + 28
    const pos = polarToCartesian(angle, labelRadius)
    return { ...pos, label: point.label, value: point.value }
  })

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[280px] mx-auto">
      {/* Grid */}
      {gridCircles.map((polygon, i) => (
        <polygon
          key={i}
          points={polygon}
          fill="none"
          stroke="var(--color-cream-200)"
          strokeWidth="1"
        />
      ))}

      {/* Axes */}
      {axisLines.map((line, i) => (
        <line
          key={i}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke="var(--color-cream-200)"
          strokeWidth="1"
        />
      ))}

      {/* Data area */}
      <polygon
        points={dataPolygon}
        fill="var(--color-burgundy-700)"
        fillOpacity="0.15"
        stroke="var(--color-burgundy-700)"
        strokeWidth="2"
      />

      {/* Data points */}
      {dataPoints.map((point, i) => (
        <circle
          key={i}
          cx={point.x}
          cy={point.y}
          r="4"
          fill="var(--color-burgundy-700)"
          stroke="var(--color-cream-50)"
          strokeWidth="2"
        />
      ))}

      {/* Labels */}
      {labels.map((label, i) => (
        <text
          key={i}
          x={label.x}
          y={label.y}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-charcoal-700 text-[10px] font-body"
        >
          {label.label}
        </text>
      ))}
    </svg>
  )
}

export function ProfileSummary({ profile, wines }: ProfileSummaryProps) {
  const radarPoints: RadarPoint[] = useMemo(() => [
    {
      label: 'Avontuurlijk',
      value: Math.ceil(profile.preferences.adventurousness / 2),
      maxValue: 5,
    },
    {
      label: 'Prijsniveau',
      value: priceToScore(profile.preferences.priceRange),
      maxValue: 5,
    },
    {
      label: 'Body',
      value: bodyToScore(profile.preferences.styles),
      maxValue: 5,
    },
    {
      label: 'Kwaliteitsfocus',
      value: gpToScore(profile.preferences.guiaPeninMinimum),
      maxValue: 5,
    },
  ], [profile])

  const topMatches = useMemo(() => {
    const entries = Object.entries(profile.matchScores)
    const sorted = entries.sort((a, b) => b[1] - a[1]).slice(0, 5)

    return sorted.map(([slug, score]) => {
      const wine = wines.find((w) => w.slug === slug)
      return {
        slug,
        name: wine?.name ?? slug,
        winemaker: wine?.winemaker ?? '',
        score,
        guiaPenin: wine?.guiaPenin ?? 0,
      }
    })
  }, [profile.matchScores, wines])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="font-heading text-3xl font-bold text-charcoal-900 mb-2">
          {profile.restaurantName || 'Jouw Restaurant'}
        </h2>
        <Badge variant="wine">{typeLabels[profile.type]}</Badge>
        {profile.cuisine.length > 0 && (
          <div className="flex items-center justify-center gap-2 mt-3 flex-wrap">
            {profile.cuisine.map((c) => (
              <Badge key={c} variant="region">{c}</Badge>
            ))}
          </div>
        )}
      </div>

      {/* Radar chart */}
      <Card>
        <CardContent className="py-6">
          <h3 className="font-heading text-xl font-semibold text-charcoal-900 text-center mb-4">
            Jouw Wijn DNA
          </h3>
          <RadarChart points={radarPoints} />
        </CardContent>
      </Card>

      {/* Preference tags */}
      <Card>
        <CardContent className="py-6">
          <h3 className="font-heading text-lg font-semibold text-charcoal-900 mb-4">
            Voorkeuren
          </h3>
          <div className="space-y-3">
            <div>
              <span className="text-sm text-charcoal-700 block mb-1.5">Stijl</span>
              <div className="flex flex-wrap gap-2">
                {profile.preferences.styles.map((s) => (
                  <Badge key={s} variant="default">{styleLabels[s]}</Badge>
                ))}
              </div>
            </div>
            <div>
              <span className="text-sm text-charcoal-700 block mb-1.5">Type</span>
              <div className="flex flex-wrap gap-2">
                {profile.preferences.types.map((t) => (
                  <Badge key={t} variant="wine">{typeWineLabels[t]}</Badge>
                ))}
              </div>
            </div>
            <div>
              <span className="text-sm text-charcoal-700 block mb-1.5">Prijssegment</span>
              <Badge variant="match">{priceLabels[profile.preferences.priceRange]}</Badge>
            </div>
            <div>
              <span className="text-sm text-charcoal-700 block mb-1.5">Gu\u00EDa Pe\u00F1\u00EDn minimum</span>
              <Badge variant="score">{profile.preferences.guiaPeninMinimum}+</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top matches */}
      {topMatches.length > 0 && (
        <Card>
          <CardContent className="py-6">
            <h3 className="font-heading text-lg font-semibold text-charcoal-900 mb-4">
              Top 5 Wijn Matches
            </h3>
            <div className="space-y-4">
              {topMatches.map((match, idx) => (
                <div key={match.slug} className="flex items-center gap-4">
                  <span className="text-sm font-bold text-burgundy-700 w-6 shrink-0 text-center">
                    {idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-heading text-sm font-semibold text-charcoal-900 truncate">
                      {match.name}
                    </p>
                    <p className="text-xs text-charcoal-700 truncate">
                      {match.winemaker}
                    </p>
                  </div>
                  {match.guiaPenin > 0 && (
                    <Badge variant="score" className="shrink-0">
                      GP {match.guiaPenin}
                    </Badge>
                  )}
                  <div className="w-24 shrink-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-bold text-burgundy-700">{match.score}%</span>
                    </div>
                    <div className="h-2 bg-cream-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-burgundy-700 to-gold-400"
                        style={{ width: `${match.score}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
