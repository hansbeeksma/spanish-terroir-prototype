'use client'

import { useState, useMemo } from 'react'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import type { TrendData } from '@/lib/types'

interface TrendChartProps {
  data: TrendData[]
}

const WINE_COLORS: Record<string, string> = {
  'Finca Dofi': '#5A2534',
  'Vina Ardanza': '#D4A84B',
  'Do Ferreiro': '#8FB387',
  'Petalos': '#C75B3F',
  'Gramona III': '#3D3D3D',
}

// Normalize wine names for color lookup
function getWineColor(name: string): string {
  const normalized = name
    .replace(/[áéíóúüñ·]/g, (c) => {
      const map: Record<string, string> = {
        '\u00e1': 'a', '\u00e9': 'e', '\u00ed': 'i', '\u00f3': 'o', '\u00fa': 'u',
        '\u00fc': 'u', '\u00f1': 'n', '\u00B7': '',
      }
      return map[c] || c
    })
  const colors = Object.entries(WINE_COLORS)
  const found = colors.find(([key]) => normalized.includes(key.replace(/[áéíóúüñ·]/g, (c) => c)))
  return found ? found[1] : '#5A2534'
}

const TOP_5_WINES = [
  'Viña Ardanza',
  'Pétalos',
  'Finca Dofí',
  'Do Ferreiro',
  'Gramona III',
]

const CHART_COLORS = ['#D4A84B', '#C75B3F', '#5A2534', '#8FB387', '#3D3D3D']

export function TrendChart({ data }: TrendChartProps) {
  const [hoveredPoint, setHoveredPoint] = useState<{
    wine: string
    month: string
    value: number
    x: number
    y: number
  } | null>(null)

  const [activeView, setActiveView] = useState<'bottles' | 'revenue'>('bottles')

  const chartConfig = useMemo(() => {
    const padding = { top: 40, right: 30, bottom: 50, left: 60 }
    const width = 800
    const height = 360

    const innerWidth = width - padding.left - padding.right
    const innerHeight = height - padding.top - padding.bottom

    if (activeView === 'revenue') {
      const maxRevenue = Math.max(...data.map((d) => d.totalRevenue))
      const yScale = (val: number) =>
        padding.top + innerHeight - (val / maxRevenue) * innerHeight

      const xStep = innerWidth / (data.length - 1)
      const xScale = (i: number) => padding.left + i * xStep

      // Revenue line points
      const revenuePoints = data.map((d, i) => ({
        x: xScale(i),
        y: yScale(d.totalRevenue),
        value: d.totalRevenue,
        month: d.month,
      }))

      return { padding, width, height, innerWidth, innerHeight, maxRevenue, yScale, xScale, revenuePoints, xStep }
    }

    // Bottles view - line chart per wine
    let maxBottles = 0
    data.forEach((d) => {
      TOP_5_WINES.forEach((wine) => {
        const val = d.wines[wine] || 0
        if (val > maxBottles) maxBottles = val
      })
    })
    maxBottles = Math.ceil(maxBottles / 10) * 10

    const yScale = (val: number) =>
      padding.top + innerHeight - (val / maxBottles) * innerHeight

    const xStep = innerWidth / (data.length - 1)
    const xScale = (i: number) => padding.left + i * xStep

    const wineLines = TOP_5_WINES.map((wine, wIdx) => {
      const points = data.map((d, i) => ({
        x: xScale(i),
        y: yScale(d.wines[wine] || 0),
        value: d.wines[wine] || 0,
        month: d.month,
      }))
      return { wine, color: CHART_COLORS[wIdx], points }
    })

    return { padding, width, height, innerWidth, innerHeight, maxBottles, yScale, xScale, wineLines, xStep }
  }, [data, activeView])

  const yTicks = useMemo(() => {
    if (activeView === 'revenue') {
      const max = chartConfig.maxRevenue as number
      const step = Math.ceil(max / 5 / 5000) * 5000
      const ticks: number[] = []
      for (let v = 0; v <= max; v += step) {
        ticks.push(v)
      }
      return ticks
    }
    const max = chartConfig.maxBottles as number
    const step = Math.ceil(max / 5 / 10) * 10
    const ticks: number[] = []
    for (let v = 0; v <= max; v += step) {
      ticks.push(v)
    }
    return ticks
  }, [activeView, chartConfig])

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h3 className="font-heading text-lg text-charcoal-900">
              Verkooptrends
            </h3>
            <p className="text-xs text-charcoal-700 mt-1">
              {data[0]?.month} - {data[data.length - 1]?.month}
            </p>
          </div>
          <div className="flex rounded-lg overflow-hidden border border-cream-200">
            <button
              onClick={() => setActiveView('bottles')}
              className={`px-4 py-1.5 text-xs font-medium transition-colors ${
                activeView === 'bottles'
                  ? 'bg-burgundy-700 text-cream-50'
                  : 'bg-white text-charcoal-700 hover:bg-cream-100'
              }`}
            >
              Flessen
            </button>
            <button
              onClick={() => setActiveView('revenue')}
              className={`px-4 py-1.5 text-xs font-medium transition-colors ${
                activeView === 'revenue'
                  ? 'bg-burgundy-700 text-cream-50'
                  : 'bg-white text-charcoal-700 hover:bg-cream-100'
              }`}
            >
              Omzet
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <svg
            viewBox={`0 0 ${chartConfig.width} ${chartConfig.height}`}
            className="w-full h-auto"
            onMouseLeave={() => setHoveredPoint(null)}
          >
            {/* Grid lines */}
            {yTicks.map((tick) => {
              const y = chartConfig.yScale(tick)
              return (
                <g key={tick}>
                  <line
                    x1={chartConfig.padding.left}
                    y1={y}
                    x2={chartConfig.width - chartConfig.padding.right}
                    y2={y}
                    stroke="#EDE2D0"
                    strokeWidth={1}
                  />
                  <text
                    x={chartConfig.padding.left - 10}
                    y={y + 4}
                    textAnchor="end"
                    className="text-[10px] fill-[#3D3D3D]"
                  >
                    {activeView === 'revenue'
                      ? `${(tick / 1000).toFixed(0)}k`
                      : tick}
                  </text>
                </g>
              )
            })}

            {/* X-axis labels */}
            {data.map((d, i) => {
              const x = chartConfig.xScale(i)
              return (
                <text
                  key={d.month}
                  x={x}
                  y={chartConfig.height - 10}
                  textAnchor="middle"
                  className="text-[10px] fill-[#3D3D3D]"
                >
                  {d.month.replace(' 20', ' \u2019')}
                </text>
              )
            })}

            {activeView === 'bottles' && chartConfig.wineLines
              ? chartConfig.wineLines.map(({ wine, color, points }) => {
                  const pathD = points
                    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
                    .join(' ')

                  return (
                    <g key={wine}>
                      {/* Line */}
                      <path
                        d={pathD}
                        fill="none"
                        stroke={color}
                        strokeWidth={2.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {/* Data points */}
                      {points.map((p, i) => (
                        <circle
                          key={i}
                          cx={p.x}
                          cy={p.y}
                          r={hoveredPoint?.wine === wine && hoveredPoint?.month === p.month ? 6 : 4}
                          fill={color}
                          stroke="white"
                          strokeWidth={2}
                          className="cursor-pointer transition-all"
                          onMouseEnter={() =>
                            setHoveredPoint({
                              wine,
                              month: p.month,
                              value: p.value,
                              x: p.x,
                              y: p.y,
                            })
                          }
                        />
                      ))}
                    </g>
                  )
                })
              : null}

            {activeView === 'revenue' && chartConfig.revenuePoints
              ? (() => {
                  const points = chartConfig.revenuePoints
                  const pathD = points
                    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
                    .join(' ')

                  // Area fill
                  const areaD = `${pathD} L ${points[points.length - 1].x} ${
                    chartConfig.padding.top + chartConfig.innerHeight
                  } L ${points[0].x} ${
                    chartConfig.padding.top + chartConfig.innerHeight
                  } Z`

                  return (
                    <g>
                      <defs>
                        <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#5A2534" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#5A2534" stopOpacity="0.02" />
                        </linearGradient>
                      </defs>
                      <path d={areaD} fill="url(#revenueGradient)" />
                      <path
                        d={pathD}
                        fill="none"
                        stroke="#5A2534"
                        strokeWidth={3}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {points.map((p, i) => (
                        <circle
                          key={i}
                          cx={p.x}
                          cy={p.y}
                          r={hoveredPoint?.month === p.month ? 7 : 5}
                          fill="#5A2534"
                          stroke="white"
                          strokeWidth={2}
                          className="cursor-pointer"
                          onMouseEnter={() =>
                            setHoveredPoint({
                              wine: 'Omzet',
                              month: p.month,
                              value: p.value,
                              x: p.x,
                              y: p.y,
                            })
                          }
                        />
                      ))}
                    </g>
                  )
                })()
              : null}

            {/* Tooltip */}
            {hoveredPoint && (
              <g>
                <rect
                  x={Math.min(hoveredPoint.x - 55, chartConfig.width - chartConfig.padding.right - 120)}
                  y={hoveredPoint.y - 48}
                  width={110}
                  height={38}
                  rx={6}
                  fill="#2D2D2D"
                  fillOpacity={0.95}
                />
                <text
                  x={Math.min(hoveredPoint.x, chartConfig.width - chartConfig.padding.right - 65)}
                  y={hoveredPoint.y - 32}
                  textAnchor="middle"
                  className="text-[10px] fill-[#F5EDE0] font-medium"
                >
                  {hoveredPoint.wine}
                </text>
                <text
                  x={Math.min(hoveredPoint.x, chartConfig.width - chartConfig.padding.right - 65)}
                  y={hoveredPoint.y - 18}
                  textAnchor="middle"
                  className="text-[11px] fill-[#D4A84B] font-bold"
                >
                  {activeView === 'revenue'
                    ? `\u20AC${hoveredPoint.value.toLocaleString('nl-NL')}`
                    : `${hoveredPoint.value} flessen`}
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* Legend */}
        {activeView === 'bottles' && (
          <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-cream-100 justify-center">
            {TOP_5_WINES.map((wine, i) => (
              <div key={wine} className="flex items-center gap-2 text-xs text-charcoal-700">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: CHART_COLORS[i] }}
                />
                {wine}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
