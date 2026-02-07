import type { Wine } from './types'

export type Purpose = 'dinner' | 'winelist' | 'dish' | 'discover'
export type DinnerCuisine = 'meat' | 'fish' | 'vegetarian' | 'mixed'
export type VenueType = 'fine-dining' | 'casual' | 'hotel' | 'bar'
export type DishChoice = 'iberico' | 'fish' | 'lamb' | 'risotto' | 'cheese'
export type Occasion = 'celebration' | 'business' | 'romantic' | 'tasting'
export type PricePref = 'under25' | '25to50' | 'over50' | 'any'

export interface SommelierAnswers {
  purpose: Purpose
  subChoice: DinnerCuisine | VenueType | DishChoice | Occasion
  price: PricePref
}

export interface SommelierRecommendation {
  wine: Wine
  score: number
  reason: string
}

const FOOD_MAP: Record<DinnerCuisine, string[]> = {
  meat: ['Rood Vlees', 'Wild'],
  fish: ['Vis & Zeevruchten'],
  vegetarian: ['Vegetarisch', 'Pasta & Rijst'],
  mixed: ['Rood Vlees', 'Vis & Zeevruchten', 'Vegetarisch'],
}

const DISH_FOOD_MAP: Record<DishChoice, string[]> = {
  iberico: ['Rood Vlees', 'Kaas'],
  fish: ['Vis & Zeevruchten'],
  lamb: ['Rood Vlees', 'Wild'],
  risotto: ['Pasta & Rijst', 'Vegetarisch'],
  cheese: ['Kaas'],
}

const VENUE_STYLE_MAP: Record<VenueType, { styles: Wine['style'][]; minScore: number }> = {
  'fine-dining': { styles: ['medium', 'full'], minScore: 94 },
  casual: { styles: ['light', 'medium'], minScore: 90 },
  hotel: { styles: ['medium', 'full'], minScore: 92 },
  bar: { styles: ['light', 'medium'], minScore: 90 },
}

const OCCASION_PREFS: Record<Occasion, { types: Wine['type'][]; styles: Wine['style'][] }> = {
  celebration: { types: ['sparkling', 'red'], styles: ['medium', 'full'] },
  business: { types: ['red', 'white'], styles: ['medium', 'full'] },
  romantic: { types: ['red', 'sparkling'], styles: ['medium', 'full'] },
  tasting: { types: ['red', 'white', 'sparkling', 'dessert'], styles: ['light', 'medium', 'full'] },
}

function matchesPrice(wine: Wine, pref: PricePref): boolean {
  const price = wine.price.bottle
  switch (pref) {
    case 'under25':
      return price < 25
    case '25to50':
      return price >= 25 && price <= 50
    case 'over50':
      return price > 50
    case 'any':
      return true
  }
}

function scoreWine(wine: Wine, answers: SommelierAnswers): { score: number; reason: string } {
  let score = 40
  const reasons: string[] = []

  // Price matching (up to 20 points)
  if (matchesPrice(wine, answers.price)) {
    score += 20
  } else {
    score -= 10
  }

  // Purpose-specific scoring
  switch (answers.purpose) {
    case 'dinner': {
      const cuisine = answers.subChoice as DinnerCuisine
      const targetPairings = FOOD_MAP[cuisine]
      const pairingMatches = wine.foodPairings.filter((p) => targetPairings.includes(p))
      if (pairingMatches.length > 0) {
        score += 15 * pairingMatches.length
        reasons.push(`Past uitstekend bij ${cuisine === 'meat' ? 'vlees en grill' : cuisine === 'fish' ? 'vis en zeevruchten' : cuisine === 'vegetarian' ? 'vegetarische gerechten' : 'een gemengd menu'}`)
      }
      // Prefer full body for meat, lighter for fish/veg
      if (cuisine === 'meat' && wine.style === 'full') {
        score += 10
      } else if (cuisine === 'fish' && (wine.type === 'white' || wine.style === 'light')) {
        score += 10
        reasons.push('De frisheid en mineraliteit complementeren de vis perfect')
      } else if (cuisine === 'vegetarian' && wine.style !== 'full') {
        score += 5
      }
      break
    }

    case 'winelist': {
      const venue = answers.subChoice as VenueType
      const venuePrefs = VENUE_STYLE_MAP[venue]
      if (venuePrefs.styles.includes(wine.style)) {
        score += 15
        reasons.push(`Ideale stijl voor ${venue === 'fine-dining' ? 'fine dining' : venue === 'casual' ? 'casual dining' : venue === 'hotel' ? 'een hotel restaurant' : 'een bar setting'}`)
      }
      if (wine.guiaPenin >= venuePrefs.minScore) {
        score += 10
        reasons.push(`Gu\u00eda Pe\u00f1\u00edn score van ${wine.guiaPenin} past bij het niveau van je zaak`)
      }
      break
    }

    case 'dish': {
      const dish = answers.subChoice as DishChoice
      const dishPairings = DISH_FOOD_MAP[dish]
      const matches = wine.foodPairings.filter((p) => dishPairings.includes(p))
      if (matches.length > 0) {
        score += 20 * matches.length
        const dishNames: Record<DishChoice, string> = {
          iberico: 'Ib\u00e9rico ham',
          fish: 'gegrilde vis',
          lamb: 'lamsrack',
          risotto: 'risotto',
          cheese: 'kaas',
        }
        reasons.push(`Klassieke combinatie met ${dishNames[dish]}`)
      }
      // Specific dish-type bonuses
      if (dish === 'iberico' && wine.type === 'red' && wine.style === 'full') score += 10
      if (dish === 'fish' && (wine.type === 'white' || wine.type === 'sparkling')) score += 10
      if (dish === 'lamb' && wine.type === 'red') score += 10
      if (dish === 'risotto' && wine.type === 'white') score += 10
      if (dish === 'cheese' && wine.type === 'dessert') score += 10
      break
    }

    case 'discover': {
      const occasion = answers.subChoice as Occasion
      const prefs = OCCASION_PREFS[occasion]
      if (prefs.types.includes(wine.type)) {
        score += 15
      }
      if (prefs.styles.includes(wine.style)) {
        score += 10
      }
      const occasionLabels: Record<Occasion, string> = {
        celebration: 'een feestelijke gelegenheid',
        business: 'een zakelijk diner',
        romantic: 'een romantische avond',
        tasting: 'een ontdekkingsproeverij',
      }
      if (occasion === 'celebration' && wine.type === 'sparkling') {
        score += 15
        reasons.push('Niets zegt feest als een verfijnde Cava')
      }
      if (occasion === 'tasting' && wine.guiaPenin >= 95) {
        score += 10
        reasons.push('Een wijn die indruk maakt bij elke proeverij')
      }
      if (reasons.length === 0) {
        reasons.push(`Uitstekende keuze voor ${occasionLabels[occasion]}`)
      }
      break
    }
  }

  // Guia Penin bonus
  if (wine.guiaPenin >= 95) {
    score += 5
  }

  // Clamp score
  const clampedScore = Math.max(0, Math.min(100, score))

  // Default reason if none generated
  if (reasons.length === 0) {
    reasons.push('Aanbevolen op basis van je voorkeuren')
  }

  return { score: clampedScore, reason: reasons[0] }
}

export function getSommelierRecommendations(
  wines: readonly Wine[],
  answers: SommelierAnswers,
  limit = 4
): SommelierRecommendation[] {
  const scored = wines.map((wine) => {
    const { score, reason } = scoreWine(wine, answers)
    return { wine, score, reason }
  })

  const sorted = [...scored].sort((a, b) => b.score - a.score)

  return sorted.slice(0, limit)
}

export function getIsabelleNote(answers: SommelierAnswers): string {
  const { purpose, subChoice, price } = answers

  const priceHints: Record<PricePref, string> = {
    under25: 'Er zijn prachtige wijnen te vinden in dit prijssegment die je gasten zullen verrassen.',
    '25to50': 'In deze prijsklasse vind je de sweet spot tussen kwaliteit en waarde.',
    over50: 'Voor deze gelegenheid verdienen je gasten het allerbeste uit ons portfolio.',
    any: 'Ik heb geselecteerd puur op basis van kwaliteit en pairing, ongeacht de prijs.',
  }

  switch (purpose) {
    case 'dinner': {
      const cuisine = subChoice as DinnerCuisine
      const tips: Record<DinnerCuisine, string> = {
        meat: 'Bij vlees zoek ik altijd naar wijnen met voldoende tanninestructuur om het vet te doorsnijden, maar met genoeg fruit om het gerecht niet te overheersen.',
        fish: 'Vis vraagt om subtiliteit. Ik kies wijnen met mineraliteit en frisheid die de smaken liften zonder te domineren.',
        vegetarian: 'Vegetarische gerechten hebben vaak meer umami dan je verwacht. Een medium-bodied wijn met goede zuurgraad is hier je beste vriend.',
        mixed: 'Bij een gemengd menu kies ik veelzijdige wijnen die zowel bij vis als bij vlees kunnen schitteren.',
      }
      return `${tips[cuisine]} ${priceHints[price]}`
    }

    case 'winelist': {
      const venue = subChoice as VenueType
      const tips: Record<VenueType, string> = {
        'fine-dining': 'Voor fine dining selecteer ik wijnen die een verhaal vertellen. Je gasten verwachten niet alleen kwaliteit, maar ook exclusiviteit.',
        casual: 'Een casual kaart moet toegankelijk zijn maar toch verrassen. Ik zoek wijnen met een hoge drink-factor en een eerlijke prijs-kwaliteitsverhouding.',
        hotel: 'Een hotelrestaurant vraagt om een breed spectrum. Van de instappende hotelgast tot de fijnproever - iedereen moet iets vinden.',
        bar: 'In een bar setting draait het om directe impact. Wijnen die bij het eerste glas overtuigen en uitnodigen tot een tweede.',
      }
      return `${tips[venue]} ${priceHints[price]}`
    }

    case 'dish': {
      const dish = subChoice as DishChoice
      const tips: Record<DishChoice, string> = {
        iberico: 'Ib\u00e9rico ham is een van de mooiste food pairings die er bestaan. De nootachtige, zoute smaken vragen om een wijn met rijp fruit en zachte tannines.',
        fish: 'Gegrilde vis heeft die heerlijke rokerige, zilte tonen. Een Albari\u00f1o uit R\u00edas Baixas is bijna altijd mijn eerste keuze, maar laat je verrassen.',
        lamb: 'Lam is een dankbaar gerecht voor wijn. De aardse, kruidige smaken harmoniseren prachtig met Spaanse rode druiven.',
        risotto: 'Risotto vraagt om een wijn die de romigheid aanvult maar ook frisheid brengt. Denk aan textuur en zuurbalans.',
        cheese: 'Kaas en wijn is tijdloos. Afhankelijk van de kaas kies ik van droge Sherry tot krachtige rode, maar altijd met karakter.',
      }
      return `${tips[dish]} ${priceHints[price]}`
    }

    case 'discover': {
      const occasion = subChoice as Occasion
      const tips: Record<Occasion, string> = {
        celebration: 'Een feestdag verdient iets bijzonders. Ik kies wijnen die het moment markeren en nog lang worden herinnerd.',
        business: 'Bij een zakelijk diner wil je indruk maken zonder te overdrijven. Kies een wijn die professionaliteit en goede smaak uitstraalt.',
        romantic: 'Voor een romantische avond zoek ik wijnen met elegantie en diepte. Wijnen die uitnodigen tot conversatie en het moment verlengen.',
        tasting: 'Een proeverij is een reis. Ik selecteer wijnen die elk een ander verhaal vertellen en samen het beste van Spaans terroir laten zien.',
      }
      return `${tips[occasion]} ${priceHints[price]}`
    }
  }
}
