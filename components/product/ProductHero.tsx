import { GuiaPeninBadge } from '@/components/product/GuiaPeninBadge'
import { MatchBadge } from '@/components/ui/MatchBadge'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { Wine } from '@/lib/types'

interface ProductHeroProps {
  wine: Wine
  matchScore?: number
}

const typeEmoji: Record<string, string> = {
  red: '\ud83c\udf77',
  white: '\ud83e\udd42',
  sparkling: '\ud83c\udf7e',
  rose: '\ud83c\udf38',
  dessert: '\ud83c\udf6f',
}

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

export function ProductHero({ wine, matchScore }: ProductHeroProps) {
  const pricePerBottle6 = wine.price.case6 / 6
  const pricePerBottle12 = wine.price.case12 / 12
  const savings6 = ((1 - pricePerBottle6 / wine.price.bottle) * 100).toFixed(0)
  const savings12 = ((1 - pricePerBottle12 / wine.price.bottle) * 100).toFixed(0)

  return (
    <div className="bg-white rounded-lg border border-cream-200 overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Left: Wine visual */}
        <div className="md:w-2/5 bg-cream-100 flex items-center justify-center py-16 px-8 relative">
          <div className="text-[120px] opacity-20 select-none">
            {typeEmoji[wine.type] || '\ud83c\udf77'}
          </div>
          {matchScore !== undefined && matchScore >= 40 && (
            <div className="absolute top-4 left-4">
              <MatchBadge score={matchScore} size="lg" />
            </div>
          )}
        </div>

        {/* Right: Wine info */}
        <div className="md:w-3/5 p-6 md:p-8 lg:p-10">
          {/* Badges */}
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="wine">{typeLabels[wine.type]}</Badge>
            <Badge variant="region">{wine.region}</Badge>
            <Badge>{styleLabels[wine.style]}</Badge>
          </div>

          {/* Title */}
          <h1 className="font-heading text-2xl md:text-3xl text-charcoal-900 mb-2">
            {wine.name}
          </h1>
          <p className="text-charcoal-700 mb-1">
            {wine.winemaker}
            {wine.subRegion && (
              <span className="text-charcoal-700"> &middot; {wine.subRegion}</span>
            )}
          </p>
          <p className="text-sm text-charcoal-700 mb-4">
            {wine.vintage} &middot; {wine.abv}% ABV &middot;{' '}
            {wine.grapes.join(', ')}
          </p>

          {/* Guia Penin + Match Score */}
          <div className="flex items-center gap-6 mb-6">
            <div className="flex items-center gap-3">
              <GuiaPeninBadge score={wine.guiaPenin} size="lg" />
              <div>
                <p className="text-sm font-semibold text-charcoal-900">
                  Gu\u00eda Pe\u00f1\u00edn
                </p>
                <p className="text-xs text-charcoal-700">Professionele beoordeling</p>
              </div>
            </div>
            {matchScore !== undefined && matchScore >= 40 && (
              <div className="flex items-center gap-3">
                <MatchBadge score={matchScore} size="lg" />
              </div>
            )}
          </div>

          {/* Price table */}
          <div className="bg-cream-50 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-xs text-charcoal-700 mb-1">Per fles</p>
                <p className="text-xl font-bold text-burgundy-700">
                  &euro;{wine.price.bottle.toFixed(2)}
                </p>
              </div>
              <div className="text-center border-x border-cream-200">
                <p className="text-xs text-charcoal-700 mb-1">6 flessen</p>
                <p className="text-xl font-bold text-burgundy-700">
                  &euro;{pricePerBottle6.toFixed(2)}
                </p>
                <p className="text-[10px] text-sage-400 font-medium">
                  -{savings6}% &middot; &euro;{wine.price.case6.toFixed(2)} totaal
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-charcoal-700 mb-1">12 flessen</p>
                <p className="text-xl font-bold text-burgundy-700">
                  &euro;{pricePerBottle12.toFixed(2)}
                </p>
                <p className="text-[10px] text-sage-400 font-medium">
                  -{savings12}% &middot; &euro;{wine.price.case12.toFixed(2)} totaal
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <Button size="lg" className="w-full md:w-auto">
            Toevoegen aan bestelling
          </Button>
        </div>
      </div>
    </div>
  )
}
