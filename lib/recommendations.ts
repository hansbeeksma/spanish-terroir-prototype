import type { Wine, CustomerProfile, Order } from './types'

export function getRecommendations(
  wines: Wine[],
  profile: CustomerProfile,
  orders: Order[],
  limit = 6
): { wine: Wine; score: number; reason: string }[] {
  const orderedSlugs = new Set(
    orders
      .filter((o) => o.customerId === profile.id)
      .flatMap((o) => o.items.map((i) => i.wineSlug))
  )

  const scored = wines
    .filter((w) => !orderedSlugs.has(w.slug))
    .map((wine) => ({
      wine,
      score: profile.matchScores[wine.slug] || calculateFallbackScore(wine, profile),
      reason: getMatchReason(wine, profile),
    }))
    .sort((a, b) => b.score - a.score)

  return scored.slice(0, limit)
}

function calculateFallbackScore(wine: Wine, profile: CustomerProfile): number {
  let score = 50

  if (profile.preferences.styles.includes(wine.style)) score += 15
  if ((profile.preferences.types as string[]).includes(wine.type)) score += 15
  if (wine.guiaPenin >= profile.preferences.guiaPeninMinimum) score += 10

  const priceRanges: Record<string, [number, number]> = {
    budget: [0, 15],
    mid: [15, 30],
    premium: [30, 60],
    ultra: [60, 999],
  }
  const [min, max] = priceRanges[profile.preferences.priceRange] || [0, 999]
  if (wine.price.bottle >= min && wine.price.bottle < max) score += 10

  return Math.min(score, 100)
}

function getMatchReason(wine: Wine, profile: CustomerProfile): string {
  const reasons: string[] = []

  if (profile.preferences.styles.includes(wine.style)) {
    reasons.push(`Past bij je ${wine.style === 'full' ? 'volle' : wine.style === 'medium' ? 'medium' : 'lichte'} stijlvoorkeur`)
  }

  if (wine.guiaPenin >= 95) {
    reasons.push(`Uitzonderlijke Guía Peñín score: ${wine.guiaPenin}`)
  }

  if (reasons.length === 0) {
    reasons.push('Aanbevolen op basis van je profiel')
  }

  return reasons[0]
}

export function getSeasonalPick(wines: Wine[]): { wine: Wine; reason: string } {
  const month = new Date().getMonth()

  if (month >= 3 && month <= 5) {
    const whites = wines.filter((w) => w.type === 'white' || w.type === 'rose')
    return {
      wine: whites[0] || wines[0],
      reason: 'Lente tip: fris en mineraal voor de nieuwe seizoenskaart',
    }
  }

  if (month >= 6 && month <= 8) {
    const light = wines.filter((w) => w.style === 'light' || w.type === 'sparkling')
    return {
      wine: light[0] || wines[0],
      reason: 'Zomer favoriet: perfect voor het terras en lichte gerechten',
    }
  }

  if (month >= 9 && month <= 10) {
    const medium = wines.filter((w) => w.style === 'medium')
    return {
      wine: medium[0] || wines[0],
      reason: 'Herfst keuze: ideaal bij wildgerechten en paddenstoelen',
    }
  }

  const full = wines.filter((w) => w.style === 'full')
  return {
    wine: full[0] || wines[0],
    reason: 'Winter warmer: krachtig en complex voor de feestdagen',
  }
}
