export const SITE_NAME = 'Spanish Terroir'
export const SITE_TAGLINE = 'Spaanse Wijnen voor de Nederlandse Gastronomie'

export const TRUST_STATS = {
  wines: 47,
  winemakers: 13,
  restaurants: 30,
  michelinStars: 7,
}

export const WINE_TYPES = [
  { value: 'sparkling', label: 'Sparkling' },
  { value: 'white', label: 'Wit' },
  { value: 'rose', label: 'Rosé' },
  { value: 'red', label: 'Rood' },
  { value: 'dessert', label: 'Dessert' },
] as const

export const WINE_STYLES = [
  { value: 'light', label: 'Licht' },
  { value: 'medium', label: 'Medium' },
  { value: 'full', label: 'Vol' },
] as const

export const REGIONS = [
  'Rioja',
  'Ribera del Duero',
  'Priorat',
  'Rías Baixas',
  'Rueda',
  'Penedès',
  'Jumilla',
  'Toro',
  'Navarra',
  'Somontano',
] as const

export const GRAPES = [
  'Tempranillo',
  'Garnacha',
  'Albariño',
  'Verdejo',
  'Monastrell',
  'Mencía',
  'Godello',
  'Macabeo',
  'Cariñena',
  'Graciano',
] as const

export const FOOD_PAIRINGS = [
  'Vis & Zeevruchten',
  'Rood Vlees',
  'Wit Vlees',
  'Vegetarisch',
  'Kaas',
  'Wild',
  'Pasta & Rijst',
  'Dessert',
] as const

export const RESTAURANT_TYPES = [
  { value: 'fine-dining', label: 'Fine Dining' },
  { value: 'casual', label: 'Casual Dining' },
  { value: 'hotel', label: 'Hotel' },
  { value: 'bar', label: 'Bar & Lounge' },
  { value: 'caterer', label: 'Cateraar' },
] as const

export const CUISINE_TYPES = [
  'Frans',
  'Italiaans',
  'Nederlands',
  'Aziatisch',
  'Fusion',
  'Mediterraans',
  'Spaans',
] as const

export const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/wijnen', label: 'Wijnen' },
  { href: '/sommelier', label: 'AI Sommelier' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/profiel', label: 'Mijn Profiel' },
] as const
