'use client'

import { useState } from 'react'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'

const searchTerms = [
  { term: 'biologisch', count: 47 },
  { term: 'rose premium', count: 38 },
  { term: 'natuurwijn', count: 34 },
  { term: 'orange wine', count: 28 },
  { term: 'pet-nat', count: 22 },
  { term: 'amontillado', count: 18 },
  { term: 'monastrell rose', count: 15 },
  { term: 'garnacha blanca', count: 12 },
]

const trendingStyles = [
  {
    style: 'Biologisch & Biodynamisch',
    region: 'Diverse regio\u2019s',
    growth: '+42%',
    color: '#8FB387',
  },
  {
    style: 'Premium Rose',
    region: 'Navarra, Priorat',
    growth: '+38%',
    color: '#C75B3F',
  },
  {
    style: 'Natuurwijnen',
    region: 'Penedes, Bierzo',
    growth: '+31%',
    color: '#D4A84B',
  },
  {
    style: 'Skin-Contact Wit',
    region: 'Rueda, Rias Baixas',
    growth: '+24%',
    color: '#5A2534',
  },
]

const actionItems = [
  {
    id: 1,
    text: 'Contact opnemen met 3 biologische producenten in Priorat en Penedes',
    priority: 'hoog',
  },
  {
    id: 2,
    text: 'Rose-selectie samenstellen: 2 premium (>25 EUR) en 1 mid-range',
    priority: 'hoog',
  },
  {
    id: 3,
    text: 'Natuurwijn-proeverij organiseren voor casual dining segment',
    priority: 'medium',
  },
  {
    id: 4,
    text: 'Orange wine / skin-contact categorie evalueren met 2 referenties',
    priority: 'medium',
  },
  {
    id: 5,
    text: 'Amontillado-selectie uitbreiden naast huidige Fino-aanbod',
    priority: 'laag',
  },
]

export function GapAnalysis() {
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set())

  const maxCount = Math.max(...searchTerms.map((t) => t.count))

  const toggleItem = (id: number) => {
    setCheckedItems((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <Card>
      <CardHeader>
        <h3 className="font-heading text-lg text-charcoal-900">
          Wat zoeken klanten dat je niet hebt?
        </h3>
        <p className="text-xs text-charcoal-700 mt-1">
          Zoektermen en stijlen zonder match in het huidige assortiment
        </p>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Search Terms Bar Chart */}
        <div>
          <h4 className="text-sm font-medium text-charcoal-900 mb-4">
            Onbeantwoorde Zoekopdrachten
          </h4>
          <svg viewBox="0 0 600 240" className="w-full h-auto">
            {searchTerms.map((term, i) => {
              const barWidth = (term.count / maxCount) * 400
              const y = i * 28 + 5

              return (
                <g key={term.term}>
                  {/* Label */}
                  <text
                    x={120}
                    y={y + 16}
                    textAnchor="end"
                    className="text-[11px] fill-[#3D3D3D]"
                  >
                    {term.term}
                  </text>
                  {/* Bar background */}
                  <rect
                    x={130}
                    y={y + 3}
                    width={400}
                    height={18}
                    rx={3}
                    fill="#F5EDE0"
                  />
                  {/* Bar fill */}
                  <rect
                    x={130}
                    y={y + 3}
                    width={barWidth}
                    height={18}
                    rx={3}
                    fill={i < 3 ? '#5A2534' : i < 5 ? '#C75B3F' : '#D4A84B'}
                    opacity={0.85}
                  />
                  {/* Count label */}
                  <text
                    x={130 + barWidth + 8}
                    y={y + 16}
                    className="text-[10px] fill-[#3D3D3D] font-medium"
                  >
                    {term.count} zoekopdrachten
                  </text>
                </g>
              )
            })}
          </svg>
        </div>

        {/* Trending Styles */}
        <div>
          <h4 className="text-sm font-medium text-charcoal-900 mb-4">
            Trending Stijlen
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {trendingStyles.map((style) => (
              <div
                key={style.style}
                className="flex items-center gap-3 p-3 rounded-lg border border-cream-200 hover:border-cream-200/70 transition-colors"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${style.color}15` }}
                >
                  <svg
                    className="w-5 h-5"
                    style={{ color: style.color }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-charcoal-900">
                      {style.style}
                    </span>
                    <span
                      className="text-xs font-bold"
                      style={{ color: style.color }}
                    >
                      {style.growth}
                    </span>
                  </div>
                  <span className="text-xs text-charcoal-700">{style.region}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Items */}
        <div>
          <h4 className="text-sm font-medium text-charcoal-900 mb-4">
            Actie-items
          </h4>
          <div className="space-y-2">
            {actionItems.map((item) => (
              <label
                key={item.id}
                className={`flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                  checkedItems.has(item.id)
                    ? 'border-sage-300 bg-sage-300/5'
                    : 'border-cream-200 hover:border-cream-200/70'
                }`}
              >
                <input
                  type="checkbox"
                  checked={checkedItems.has(item.id)}
                  onChange={() => toggleItem(item.id)}
                  className="mt-0.5 w-4 h-4 rounded border-cream-200 text-burgundy-700 focus:ring-burgundy-700/20"
                />
                <div className="flex-1">
                  <span
                    className={`text-sm ${
                      checkedItems.has(item.id)
                        ? 'text-charcoal-700 line-through'
                        : 'text-charcoal-900'
                    }`}
                  >
                    {item.text}
                  </span>
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${
                    item.priority === 'hoog'
                      ? 'bg-terracotta-500/10 text-terracotta-500'
                      : item.priority === 'medium'
                        ? 'bg-gold-400/15 text-gold-600'
                        : 'bg-cream-200 text-charcoal-700'
                  }`}
                >
                  {item.priority}
                </span>
              </label>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-cream-100 flex items-center justify-between">
            <span className="text-xs text-charcoal-700">
              {checkedItems.size} van {actionItems.length} afgerond
            </span>
            <div className="w-32 h-2 rounded-full bg-cream-200 overflow-hidden">
              <div
                className="h-full bg-sage-400 rounded-full transition-all duration-300"
                style={{
                  width: `${(checkedItems.size / actionItems.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
