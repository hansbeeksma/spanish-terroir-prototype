import type { Wine } from '@/lib/types'
import { GuiaPeninBadge } from '@/components/product/GuiaPeninBadge'

interface WijnlijstPanelProps {
  wines: Wine[]
  onAddToOrder?: (wine: Wine) => void
}

const typeLabels: Record<string, string> = {
  red: 'Rode Wijnen',
  white: 'Witte Wijnen',
  sparkling: 'Cava & Mousserende Wijnen',
  rose: 'Rosé',
  dessert: 'Dessert & Sherry',
}

const typeOrder = ['red', 'white', 'sparkling', 'rose', 'dessert']

function groupByType(wines: Wine[]): Record<string, Wine[]> {
  const grouped: Record<string, Wine[]> = {}
  for (const wine of wines) {
    if (!grouped[wine.type]) {
      grouped[wine.type] = []
    }
    grouped[wine.type].push(wine)
  }
  return grouped
}

export function WijnlijstPanel({ wines, onAddToOrder }: WijnlijstPanelProps) {
  const grouped = groupByType(wines)
  const sortedTypes = typeOrder.filter((t) => grouped[t])

  return (
    <div className="bg-burgundy-800/50 backdrop-blur-sm border border-cream-200/10 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-8 pt-8 pb-6 text-center border-b border-cream-200/10">
        <p className="font-accent text-gold-400 italic text-sm mb-1">Spanish Terroir</p>
        <h2 className="font-heading text-2xl sm:text-3xl text-cream-50 tracking-wide uppercase">
          Wijnlijst
        </h2>
        <div className="mt-3 w-16 h-px bg-gold-400/40 mx-auto" />
      </div>

      {/* Wine sections */}
      <div className="px-6 sm:px-8 py-6 space-y-8">
        {sortedTypes.map((type) => (
          <div key={type}>
            <h3 className="font-heading text-lg text-gold-400 mb-4 tracking-wide">
              {typeLabels[type] || type}
            </h3>

            <div className="space-y-3">
              {grouped[type]
                .sort((a, b) => b.guiaPenin - a.guiaPenin)
                .map((wine) => (
                  <button
                    key={wine.slug}
                    type="button"
                    onClick={() => onAddToOrder?.(wine)}
                    className="w-full text-left group px-4 py-3 -mx-4 rounded-lg hover:bg-cream-50/5 transition-colors duration-200"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-heading text-sm sm:text-base text-cream-50 group-hover:text-gold-400 transition-colors duration-200">
                            {wine.name}
                          </span>
                          <GuiaPeninBadge score={wine.guiaPenin} size="sm" />
                        </div>
                        <p className="text-xs text-cream-200/60 font-body">
                          {wine.winemaker} &middot; {wine.region} &middot; {wine.vintage} &middot; {wine.grapes.join(', ')}
                        </p>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <span className="text-sm font-bold text-cream-50">
                          &euro;{wine.price.case6 ? (wine.price.case6 / 6).toFixed(2) : wine.price.bottle.toFixed(2)}
                        </span>
                        <p className="text-[10px] text-cream-200/40 font-body">per fles (6+)</p>
                      </div>
                    </div>
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-8 py-4 border-t border-cream-200/10 text-center">
        <p className="text-xs text-cream-200/40 font-body">
          Prijzen excl. BTW &middot; Staffelkortingen vanaf 12 flessen
        </p>
      </div>
    </div>
  )
}
