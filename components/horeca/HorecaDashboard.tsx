'use client'

import type { Wine, Order, CustomerProfile, StaffMember } from '@/lib/types'
import { WijnlijstPanel } from './WijnlijstPanel'
import { RecentOrdersSidebar } from './RecentOrdersSidebar'

interface HorecaDashboardProps {
  staff: StaffMember
  profile: CustomerProfile
  wines: Wine[]
  orders: Order[]
  onLogout: () => void
}

export function HorecaDashboard({ staff, profile, wines, orders, onLogout }: HorecaDashboardProps) {
  const orderedSlugs = new Set(
    orders.flatMap((o) => o.items.map((i) => i.wineSlug))
  )
  const recommendedWines = [...wines]
    .filter((w) => !orderedSlugs.has(w.slug))
    .sort((a, b) => {
      const scoreA = profile.matchScores[a.slug] ?? 0
      const scoreB = profile.matchScores[b.slug] ?? 0
      return scoreB - scoreA
    })
    .slice(0, 5)

  return (
    <div className="min-h-screen bg-burgundy-800">
      <div className="absolute inset-0 bg-gradient-to-br from-burgundy-800 via-burgundy-800/95 to-charcoal-900/90 fixed" />

      {/* Top bar */}
      <div className="relative border-b border-cream-200/10 bg-burgundy-800/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-heading text-lg sm:text-xl text-cream-50">
              Welkom, <span className="text-gold-400">{staff.name}</span>
            </h1>
            <p className="text-xs text-cream-200/50 font-body">
              {staff.role.charAt(0).toUpperCase() + staff.role.slice(1)} bij {profile.restaurantName} &middot; Spanish Terroir
            </p>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="text-sm text-cream-200/60 hover:text-cream-50 transition-colors duration-200 font-body flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
            </svg>
            Uitloggen
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar — stacked on mobile, left on desktop */}
          <div className="w-full lg:w-72 xl:w-80 flex-shrink-0 order-2 lg:order-1">
            <RecentOrdersSidebar
              orders={orders}
              recommendedWines={recommendedWines}
              matchScores={profile.matchScores}
            />
          </div>

          {/* Main wijnlijst */}
          <div className="flex-1 order-1 lg:order-2">
            <WijnlijstPanel wines={wines} />
          </div>
        </div>
      </div>
    </div>
  )
}
