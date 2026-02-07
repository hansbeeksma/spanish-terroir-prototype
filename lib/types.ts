export interface Wine {
  slug: string
  name: string
  winemaker: string
  winemakerSlug: string
  region: string
  subRegion?: string
  type: 'sparkling' | 'white' | 'rose' | 'red' | 'dessert'
  grapes: string[]
  vintage: number
  abv: number
  guiaPenin: number
  price: { bottle: number; case6: number; case12: number }
  style: 'light' | 'medium' | 'full'
  tastingNotes: { nose: string[]; palate: string[]; finish: string }
  bodyScore: number
  tanninScore: number
  acidityScore: number
  sweetnessScore: number
  foodPairings: string[]
  story: string
  image: string
}

export interface Winemaker {
  slug: string
  name: string
  region: string
  philosophy: string
  story: string
  image: string
  wineCount: number
  founded: number
}

export interface Order {
  id: string
  date: string
  customerId: string
  items: OrderItem[]
  total: number
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered'
}

export interface OrderItem {
  wineSlug: string
  wineName: string
  quantity: number
  pricePerBottle: number
}

export interface CustomerProfile {
  id: string
  email: string
  restaurantName: string
  type: 'fine-dining' | 'casual' | 'hotel' | 'bar' | 'caterer'
  cuisine: string[]
  wineListSize: number
  preferences: {
    styles: ('light' | 'medium' | 'full')[]
    types: ('red' | 'white' | 'rose' | 'sparkling')[]
    priceRange: 'budget' | 'mid' | 'premium' | 'ultra'
    adventurousness: number
    guiaPeninMinimum: number
  }
  matchScores: Record<string, number>
}

export interface Segment {
  id: string
  name: string
  description: string
  count: number
  avgOrderValue: number
  avgFrequency: number
  topWines: string[]
  color: string
}

export interface TrendData {
  month: string
  wines: Record<string, number>
  totalRevenue: number
  totalOrders: number
}

export interface RfmSegment {
  id: string
  name: string
  description: string
  rfm: { recency: number; frequency: number; monetary: number }
  count: number
  avgOrderValue: number
  retentionRate: number
  action: string
  color: string
}

export type WineType = Wine['type']
export type WineStyle = Wine['style']
export type RestaurantType = CustomerProfile['type']
export type PriceRange = CustomerProfile['preferences']['priceRange']
