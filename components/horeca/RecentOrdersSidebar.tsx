import Image from 'next/image'
import type { Wine, Order } from '@/lib/types'
import { GuiaPeninBadge } from '@/components/product/GuiaPeninBadge'

interface RecentOrdersSidebarProps {
  orders: Order[]
  recommendedWines: Wine[]
  matchScores?: Record<string, number>
  onReorder?: (order: Order) => void
}

const statusLabels: Record<string, { label: string; color: string }> = {
  pending: { label: 'In behandeling', color: 'text-gold-400' },
  confirmed: { label: 'Bevestigd', color: 'text-sage-400' },
  shipped: { label: 'Onderweg', color: 'text-gold-400' },
  delivered: { label: 'Geleverd', color: 'text-sage-400' },
}

export function RecentOrdersSidebar({ orders, recommendedWines, matchScores, onReorder }: RecentOrdersSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Recent Orders */}
      <div className="bg-burgundy-800/50 backdrop-blur-sm border border-cream-200/10 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-cream-200/10">
          <h3 className="font-heading text-base text-cream-50">
            Laatste Bestellingen
          </h3>
        </div>

        <div className="p-4 space-y-3">
          {orders.length === 0 && (
            <p className="text-xs text-cream-200/40 font-body text-center py-4">
              Nog geen bestellingen
            </p>
          )}
          {orders.slice(0, 5).map((order) => {
            const status = statusLabels[order.status]
            return (
              <div
                key={order.id}
                className="bg-cream-50/3 rounded-lg p-3 border border-cream-200/5"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-cream-200/80 font-body">
                    {order.id}
                  </span>
                  <span className={`text-xs font-medium ${status?.color ?? 'text-cream-200'}`}>
                    {status?.label ?? order.status}
                  </span>
                </div>

                <p className="text-xs text-cream-200/50 mb-2 font-body">
                  {new Date(order.date).toLocaleDateString('nl-NL', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>

                <div className="space-y-1 mb-3">
                  {order.items.slice(0, 3).map((item) => (
                    <p key={item.wineSlug} className="text-xs text-cream-200/70 font-body truncate">
                      {item.quantity}x {item.wineName}
                    </p>
                  ))}
                  {order.items.length > 3 && (
                    <p className="text-xs text-cream-200/40 font-body">
                      +{order.items.length - 3} meer
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-cream-50">
                    &euro;{order.total.toFixed(2)}
                  </span>
                  <button
                    type="button"
                    onClick={() => onReorder?.(order)}
                    className="text-xs text-gold-400 hover:text-gold-500 font-medium transition-colors duration-200 font-body"
                  >
                    Opnieuw bestellen
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Recommended Wines */}
      <div className="bg-burgundy-800/50 backdrop-blur-sm border border-cream-200/10 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-cream-200/10">
          <h3 className="font-heading text-base text-cream-50">
            Aanbevolen voor U
          </h3>
        </div>

        <div className="p-4 space-y-3">
          {recommendedWines.slice(0, 5).map((wine) => {
            const score = matchScores?.[wine.slug]
            return (
              <div
                key={wine.slug}
                className="flex items-start gap-3 bg-cream-50/3 rounded-lg p-3 border border-cream-200/5"
              >
                <div className="relative w-8 h-12 flex-shrink-0 rounded overflow-hidden bg-cream-50/5">
                  <Image
                    src={wine.image}
                    alt={wine.name}
                    fill
                    className="object-contain"
                    sizes="32px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <GuiaPeninBadge score={wine.guiaPenin} size="sm" />
                    <p className="text-sm text-cream-50 font-heading truncate">
                      {wine.name}
                    </p>
                    {score != null && (
                      <span className="shrink-0 text-[10px] font-bold text-gold-400 bg-gold-400/10 px-1.5 py-0.5 rounded-full">
                        {score}% match
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-cream-200/60 font-body">
                    {wine.winemaker} &middot; {wine.region}
                  </p>
                  <p className="text-xs font-bold text-gold-400 mt-1">
                    &euro;{(wine.price.case6 / 6).toFixed(2)}/fles
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
