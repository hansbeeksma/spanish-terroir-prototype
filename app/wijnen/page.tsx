'use client'

import { useState, useMemo } from 'react'
import { SearchBar } from '@/components/catalog/SearchBar'
import { FacetedSearch, defaultFilters } from '@/components/catalog/FacetedSearch'
import type { Filters } from '@/components/catalog/FacetedSearch'
import { WineGrid } from '@/components/catalog/WineGrid'
import winesData from '@/data/wines.json'
import profilesData from '@/data/profiles.json'
import type { Wine, CustomerProfile } from '@/lib/types'

const wines = winesData as Wine[]
const profiles = profilesData as CustomerProfile[]

// Mock current profile: De Kas (prof-001)
const currentProfile = profiles.find((p) => p.id === 'prof-001')
const matchScores: Record<string, number> = currentProfile?.matchScores ?? {}

const typeLabels: Record<string, string> = {
  sparkling: 'Sparkling',
  white: 'Wit',
  rose: 'Ros\u00e9',
  red: 'Rood',
  dessert: 'Dessert',
}

const styleLabels: Record<string, string> = {
  light: 'Licht',
  medium: 'Medium',
  full: 'Vol',
}

const priceRangeLabels: Record<string, string> = {
  under20: 'Onder \u20ac20',
  '20-40': '\u20ac20 - \u20ac40',
  '40-70': '\u20ac40 - \u20ac70',
  '70plus': '\u20ac70+',
}

function matchesPriceRange(price: number, range: string): boolean {
  switch (range) {
    case 'under20':
      return price < 20
    case '20-40':
      return price >= 20 && price <= 40
    case '40-70':
      return price > 40 && price <= 70
    case '70plus':
      return price > 70
    default:
      return true
  }
}

function filterWines(allWines: Wine[], filters: Filters): Wine[] {
  return allWines.filter((wine) => {
    if (filters.search) {
      const lower = filters.search.toLowerCase()
      const matchesSearch =
        wine.name.toLowerCase().includes(lower) ||
        wine.winemaker.toLowerCase().includes(lower) ||
        wine.grapes.some((g) => g.toLowerCase().includes(lower)) ||
        wine.region.toLowerCase().includes(lower)
      if (!matchesSearch) return false
    }

    if (filters.types.length > 0 && !filters.types.includes(wine.type)) {
      return false
    }

    if (filters.regions.length > 0 && !filters.regions.includes(wine.region)) {
      return false
    }

    if (
      filters.grapes.length > 0 &&
      !wine.grapes.some((g) => filters.grapes.includes(g))
    ) {
      return false
    }

    if (filters.priceRange && !matchesPriceRange(wine.price.bottle, filters.priceRange)) {
      return false
    }

    if (filters.styles.length > 0 && !filters.styles.includes(wine.style)) {
      return false
    }

    if (
      filters.pairings.length > 0 &&
      !wine.foodPairings.some((p) => filters.pairings.includes(p))
    ) {
      return false
    }

    if (filters.minScore > 0 && wine.guiaPenin < filters.minScore) {
      return false
    }

    if (filters.winemakers.length > 0 && !filters.winemakers.includes(wine.winemaker)) {
      return false
    }

    return true
  })
}

interface ActivePill {
  key: string
  label: string
  remove: () => void
}

function getActivePills(filters: Filters, onFilterChange: (f: Filters) => void): ActivePill[] {
  const pills: ActivePill[] = []

  for (const type of filters.types) {
    pills.push({
      key: `type-${type}`,
      label: typeLabels[type] || type,
      remove: () =>
        onFilterChange({
          ...filters,
          types: filters.types.filter((t) => t !== type),
        }),
    })
  }

  for (const region of filters.regions) {
    pills.push({
      key: `region-${region}`,
      label: region,
      remove: () =>
        onFilterChange({
          ...filters,
          regions: filters.regions.filter((r) => r !== region),
        }),
    })
  }

  for (const grape of filters.grapes) {
    pills.push({
      key: `grape-${grape}`,
      label: grape,
      remove: () =>
        onFilterChange({
          ...filters,
          grapes: filters.grapes.filter((g) => g !== grape),
        }),
    })
  }

  if (filters.priceRange) {
    pills.push({
      key: 'price',
      label: priceRangeLabels[filters.priceRange] || filters.priceRange,
      remove: () => onFilterChange({ ...filters, priceRange: '' }),
    })
  }

  for (const style of filters.styles) {
    pills.push({
      key: `style-${style}`,
      label: styleLabels[style] || style,
      remove: () =>
        onFilterChange({
          ...filters,
          styles: filters.styles.filter((s) => s !== style),
        }),
    })
  }

  for (const pairing of filters.pairings) {
    pills.push({
      key: `pairing-${pairing}`,
      label: pairing,
      remove: () =>
        onFilterChange({
          ...filters,
          pairings: filters.pairings.filter((p) => p !== pairing),
        }),
    })
  }

  if (filters.minScore > 0) {
    pills.push({
      key: 'score',
      label: `GP ${filters.minScore}+`,
      remove: () => onFilterChange({ ...filters, minScore: 0 }),
    })
  }

  for (const winemaker of filters.winemakers) {
    pills.push({
      key: `winemaker-${winemaker}`,
      label: winemaker,
      remove: () =>
        onFilterChange({
          ...filters,
          winemakers: filters.winemakers.filter((w) => w !== winemaker),
        }),
    })
  }

  return pills
}

export default function WijnenPage() {
  const [filters, setFilters] = useState<Filters>(defaultFilters)

  const filteredWines = useMemo(() => filterWines(wines, filters), [filters])

  const activePills = getActivePills(filters, setFilters)

  function handleSearchChange(value: string) {
    setFilters((prev) => ({ ...prev, search: value }))
  }

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero header */}
      <div className="bg-burgundy-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-3xl md:text-4xl text-cream-50 mb-3">
            Onze Wijnen
          </h1>
          <p className="text-cream-200 text-lg max-w-2xl font-accent">
            Ontdek onze zorgvuldig geselecteerde collectie Spaanse wijnen, van
            gerenommeerde bodega&apos;s tot opkomende wijnmakers.
          </p>
          <div className="mt-6">
            <SearchBar value={filters.search} onChange={handleSearchChange} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Active filter pills */}
        {activePills.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm text-charcoal-700 font-medium">Actieve filters:</span>
            {activePills.map((pill) => (
              <button
                key={pill.key}
                onClick={pill.remove}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-burgundy-700 text-cream-50 text-xs font-medium hover:bg-burgundy-600 transition-colors"
              >
                {pill.label}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            ))}
            <button
              onClick={() => setFilters({ ...defaultFilters, search: filters.search })}
              className="text-xs text-burgundy-700 hover:text-burgundy-600 font-medium underline transition-colors"
            >
              Alles wissen
            </button>
          </div>
        )}

        {/* Main layout: sidebar + grid */}
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-1/4 shrink-0">
            <FacetedSearch filters={filters} onFilterChange={setFilters} />
          </aside>
          <div className="flex-1">
            <WineGrid wines={filteredWines} matchScores={matchScores} />
          </div>
        </div>
      </div>
    </div>
  )
}
