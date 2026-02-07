import type { Wine } from './types'

export interface Filters {
  types: string[]
  regions: string[]
  grapes: string[]
  priceRange: string
  styles: string[]
  pairings: string[]
  minScore: number
  winemakers: string[]
  search: string
}

export const defaultFilters: Filters = {
  types: [],
  regions: [],
  grapes: [],
  priceRange: '',
  styles: [],
  pairings: [],
  minScore: 0,
  winemakers: [],
  search: '',
}

export function filterWines(wines: Wine[], filters: Filters): Wine[] {
  return wines.filter((wine) => {
    if (filters.search) {
      const q = filters.search.toLowerCase()
      const matchesSearch =
        wine.name.toLowerCase().includes(q) ||
        wine.winemaker.toLowerCase().includes(q) ||
        wine.region.toLowerCase().includes(q) ||
        wine.grapes.some((g) => g.toLowerCase().includes(q))
      if (!matchesSearch) return false
    }

    if (filters.types.length > 0 && !filters.types.includes(wine.type)) return false
    if (filters.regions.length > 0 && !filters.regions.includes(wine.region)) return false
    if (filters.grapes.length > 0 && !wine.grapes.some((g) => filters.grapes.includes(g))) return false
    if (filters.styles.length > 0 && !filters.styles.includes(wine.style)) return false
    if (filters.pairings.length > 0 && !wine.foodPairings.some((p) => filters.pairings.includes(p))) return false
    if (filters.winemakers.length > 0 && !filters.winemakers.includes(wine.winemaker)) return false
    if (filters.minScore > 0 && wine.guiaPenin < filters.minScore) return false

    if (filters.priceRange) {
      switch (filters.priceRange) {
        case 'under20':
          if (wine.price.bottle >= 20) return false
          break
        case '20-40':
          if (wine.price.bottle < 20 || wine.price.bottle >= 40) return false
          break
        case '40-70':
          if (wine.price.bottle < 40 || wine.price.bottle >= 70) return false
          break
        case '70+':
          if (wine.price.bottle < 70) return false
          break
      }
    }

    return true
  })
}

export type SortOption = 'relevance' | 'price-asc' | 'price-desc' | 'score' | 'new'

export function sortWines(wines: Wine[], sort: SortOption): Wine[] {
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
    default:
      return sorted
  }
}
