'use client'

import { useState } from 'react'
import { WineCard } from '@/components/catalog/WineCard'
import type { Wine } from '@/lib/types'

type SortOption = 'relevance' | 'price-asc' | 'price-desc' | 'score' | 'new'

interface WineGridProps {
  wines: Wine[]
  matchScores?: Record<string, number>
}

const sortLabels: Record<SortOption, string> = {
  relevance: 'Relevantie',
  'price-asc': 'Prijs laag-hoog',
  'price-desc': 'Prijs hoog-laag',
  score: 'Score',
  new: 'Nieuw',
}

function sortWines(wines: Wine[], sort: SortOption, matchScores?: Record<string, number>): Wine[] {
  const sorted = [...wines]

  switch (sort) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price.bottle - b.price.bottle)
    case 'price-desc':
      return sorted.sort((a, b) => b.price.bottle - a.price.bottle)
    case 'score':
      return sorted.sort((a, b) => b.guiaPenin - a.guiaPenin)
    case 'new':
      return sorted.sort((a, b) => b.vintage - a.vintage)
    case 'relevance':
    default:
      if (matchScores) {
        return sorted.sort(
          (a, b) => (matchScores[b.slug] || 0) - (matchScores[a.slug] || 0)
        )
      }
      return sorted
  }
}

export function WineGrid({ wines, matchScores }: WineGridProps) {
  const [sort, setSort] = useState<SortOption>('relevance')

  const sortedWines = sortWines(wines, sort, matchScores)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-charcoal-700">
          <span className="font-semibold text-charcoal-900">{wines.length}</span>{' '}
          {wines.length === 1 ? 'wijn' : 'wijnen'} gevonden
        </p>
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-sm text-charcoal-700">
            Sorteer op:
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="text-sm bg-cream-100 text-charcoal-800 border border-cream-200 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-burgundy-700 focus:border-transparent"
          >
            {Object.entries(sortLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {sortedWines.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4 opacity-30">🍇</div>
          <h3 className="font-heading text-lg text-charcoal-900 mb-2">
            Geen wijnen gevonden
          </h3>
          <p className="text-sm text-charcoal-700">
            Pas je filters aan om meer resultaten te zien.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedWines.map((wine) => (
            <WineCard
              key={wine.slug}
              wine={wine}
              matchScore={matchScores?.[wine.slug]}
            />
          ))}
        </div>
      )}
    </div>
  )
}
