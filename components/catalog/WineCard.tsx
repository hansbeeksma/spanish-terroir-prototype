import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { GuiaPeninBadge } from '@/components/product/GuiaPeninBadge'
import { MatchBadge } from '@/components/ui/MatchBadge'
import type { Wine } from '@/lib/types'

interface WineCardProps {
  wine: Wine
  matchScore?: number
}

const typeLabels: Record<string, string> = {
  sparkling: 'Sparkling',
  white: 'Wit',
  rose: 'Rosé',
  red: 'Rood',
  dessert: 'Dessert',
}

const typeColors: Record<string, string> = {
  sparkling: 'bg-gold-400 text-charcoal-900',
  white: 'bg-cream-200 text-charcoal-800',
  rose: 'bg-pink-200 text-pink-900',
  red: 'bg-burgundy-700 text-cream-50',
  dessert: 'bg-amber-200 text-amber-900',
}

export function WineCard({ wine, matchScore }: WineCardProps) {
  const hasStaffelkorting = wine.price.case6 / 6 < wine.price.bottle

  return (
    <Link href={`/wijnen/${wine.slug}`}>
      <Card hover className="h-full">
        <div className="relative aspect-[3/4] bg-cream-100 flex items-center justify-center">
          <div className="text-6xl opacity-20">
            {wine.type === 'red' ? '🍷' : wine.type === 'white' ? '🥂' : wine.type === 'sparkling' ? '🍾' : wine.type === 'rose' ? '🌸' : '🍯'}
          </div>
          <div className="absolute top-3 right-3">
            <GuiaPeninBadge score={wine.guiaPenin} size="sm" />
          </div>
          {matchScore !== undefined && matchScore >= 40 && (
            <div className="absolute top-3 left-3">
              <MatchBadge score={matchScore} size="sm" />
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${typeColors[wine.type] || ''}`}>
              {typeLabels[wine.type]}
            </span>
            <Badge variant="region">{wine.region}</Badge>
          </div>
          <h3 className="font-heading text-base text-charcoal-900 mb-1 line-clamp-1">{wine.name}</h3>
          <p className="text-xs text-charcoal-700 mb-2">{wine.winemaker} &middot; {wine.vintage}</p>
          <p className="text-xs text-charcoal-700 mb-3">{wine.grapes.join(', ')}</p>
          <div className="flex items-end justify-between">
            <div>
              <span className="text-lg font-bold text-burgundy-700">&euro;{wine.price.bottle.toFixed(2)}</span>
              <span className="text-xs text-charcoal-700 ml-1">per fles</span>
            </div>
            <span className="text-[10px] text-charcoal-700">
              6x &euro;{(wine.price.case6 / 6).toFixed(2)}
            </span>
          </div>
          {hasStaffelkorting && (
            <p className="text-[10px] text-sage-400 font-medium mt-2">
              Staffelkorting beschikbaar
            </p>
          )}
        </div>
      </Card>
    </Link>
  )
}
