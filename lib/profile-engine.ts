import type { Wine, CustomerProfile } from './types'

export interface QuizAnswers {
  restaurantType: CustomerProfile['type']
  cuisines: string[]
  wineListSize: '10-20' | '20-50' | '50+'
  styles: ('light' | 'medium' | 'full')[]
  types: ('red' | 'white' | 'rose' | 'sparkling')[]
  priceRange: CustomerProfile['preferences']['priceRange']
  foodPairings: string[]
  adventurousness: number
  guiaPeninPreference: 'yes-90' | 'somewhat' | 'no'
}

export interface Preferences {
  styles: ('light' | 'medium' | 'full')[]
  types: ('red' | 'white' | 'rose' | 'sparkling')[]
  priceRange: CustomerProfile['preferences']['priceRange']
  adventurousness: number
  guiaPeninMinimum: number
  foodPairings: string[]
}

export interface WineWithScore {
  wine: Wine
  score: number
}

function priceRangeToRange(range: CustomerProfile['preferences']['priceRange']): { min: number; max: number } {
  switch (range) {
    case 'budget': return { min: 0, max: 15 }
    case 'mid': return { min: 15, max: 30 }
    case 'premium': return { min: 30, max: 60 }
    case 'ultra': return { min: 60, max: Infinity }
  }
}

function normalizeFoodPairing(pairing: string): string {
  const map: Record<string, string[]> = {
    'vlees': ['Rood Vlees', 'Wit Vlees', 'Wild'],
    'vis': ['Vis & Zeevruchten'],
    'vegetarisch': ['Vegetarisch'],
    'breed': ['Rood Vlees', 'Wit Vlees', 'Wild', 'Vis & Zeevruchten', 'Vegetarisch', 'Kaas', 'Pasta & Rijst', 'Dessert'],
  }
  return pairing.toLowerCase()
}

function getExpandedFoodPairings(pairings: string[]): string[] {
  const expanded: string[] = []
  for (const p of pairings) {
    const lower = p.toLowerCase()
    if (lower === 'vlees') {
      expanded.push('Rood Vlees', 'Wit Vlees', 'Wild')
    } else if (lower === 'vis') {
      expanded.push('Vis & Zeevruchten')
    } else if (lower === 'vegetarisch') {
      expanded.push('Vegetarisch')
    } else if (lower === 'breed') {
      expanded.push('Rood Vlees', 'Wit Vlees', 'Wild', 'Vis & Zeevruchten', 'Vegetarisch', 'Kaas', 'Pasta & Rijst', 'Dessert')
    } else {
      expanded.push(p)
    }
  }
  return [...new Set(expanded)]
}

export function calculateMatchScore(wine: Wine, preferences: Preferences): number {
  let score = 0
  let maxScore = 0

  // Style match (weight: 30)
  maxScore += 30
  if (preferences.styles.includes(wine.style)) {
    score += 30
  } else {
    // Partial credit for adjacent styles
    const styleOrder: Wine['style'][] = ['light', 'medium', 'full']
    const wineIdx = styleOrder.indexOf(wine.style)
    for (const pref of preferences.styles) {
      const prefIdx = styleOrder.indexOf(pref)
      if (Math.abs(wineIdx - prefIdx) === 1) {
        score += 15
        break
      }
    }
  }

  // Type match (weight: 25)
  maxScore += 25
  const wineTypeMap: Record<string, string> = { 'dessert': 'white', 'rose': 'rose' }
  const mappedType = wineTypeMap[wine.type] || wine.type
  if (preferences.types.includes(mappedType as typeof preferences.types[number])) {
    score += 25
  }

  // Price range match (weight: 20)
  maxScore += 20
  const range = priceRangeToRange(preferences.priceRange)
  const bottlePrice = wine.price.bottle
  if (bottlePrice >= range.min && bottlePrice <= range.max) {
    score += 20
  } else {
    // Partial credit for close prices
    const distance = bottlePrice < range.min
      ? range.min - bottlePrice
      : bottlePrice - range.max
    const maxDistance = 20
    if (distance < maxDistance) {
      score += Math.round(20 * (1 - distance / maxDistance))
    }
  }

  // Food pairing overlap (weight: 15)
  maxScore += 15
  const expandedPairings = getExpandedFoodPairings(preferences.foodPairings)
  if (expandedPairings.length > 0) {
    const overlap = wine.foodPairings.filter(fp => expandedPairings.includes(fp)).length
    const ratio = overlap / Math.max(wine.foodPairings.length, 1)
    score += Math.round(15 * ratio)
  } else {
    score += 8 // Neutral if no pairing preference
  }

  // Guia Penin quality (weight: 10)
  maxScore += 10
  if (wine.guiaPenin >= preferences.guiaPeninMinimum) {
    score += 10
  } else {
    const diff = preferences.guiaPeninMinimum - wine.guiaPenin
    if (diff <= 2) {
      score += 5
    }
  }

  return Math.round((score / maxScore) * 100)
}

export function getTopMatches(wines: Wine[], preferences: Preferences, limit: number = 5): WineWithScore[] {
  const scored = wines.map(wine => ({
    wine,
    score: calculateMatchScore(wine, preferences),
  }))

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
}

export function quizAnswersToProfile(answers: QuizAnswers): CustomerProfile {
  const gpMinimum = answers.guiaPeninPreference === 'yes-90' ? 92
    : answers.guiaPeninPreference === 'somewhat' ? 90
    : 88

  const wineListSize = answers.wineListSize === '10-20' ? 15
    : answers.wineListSize === '20-50' ? 35
    : 75

  return {
    id: `prof-${Date.now()}`,
    email: '',
    restaurantName: '',
    type: answers.restaurantType,
    cuisine: answers.cuisines,
    wineListSize,
    preferences: {
      styles: answers.styles,
      types: answers.types,
      priceRange: answers.priceRange,
      adventurousness: answers.adventurousness,
      guiaPeninMinimum: gpMinimum,
    },
    matchScores: {},
  }
}

export function preferencesFromProfile(profile: CustomerProfile, foodPairings: string[] = []): Preferences {
  return {
    styles: profile.preferences.styles,
    types: profile.preferences.types,
    priceRange: profile.preferences.priceRange,
    adventurousness: profile.preferences.adventurousness,
    guiaPeninMinimum: profile.preferences.guiaPeninMinimum,
    foodPairings,
  }
}
