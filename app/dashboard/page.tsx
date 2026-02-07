'use client'

import Link from 'next/link'
import { PersonalDashboard } from '@/components/dashboard/PersonalDashboard'
import { WelcomeBanner } from '@/components/dashboard/WelcomeBanner'
import { QuickReorder } from '@/components/dashboard/QuickReorder'
import { Recommendations } from '@/components/dashboard/Recommendations'
import { RecentOrders } from '@/components/dashboard/RecentOrders'
import wines from '@/data/wines.json'
import orders from '@/data/orders.json'
import profiles from '@/data/profiles.json'
import type { Wine, Order, CustomerProfile } from '@/lib/types'

const typedWines = wines as Wine[]
const typedOrders = orders as Order[]
const typedProfiles = profiles as CustomerProfile[]

export default function DashboardPage() {
  // Mock "logged in" as De Kas (prof-001)
  const currentProfile = typedProfiles.find((p) => p.id === 'prof-001')!
  const customerOrders = typedOrders
    .filter((o) => o.customerId === currentProfile.id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const mostRecentOrder = customerOrders[0]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <WelcomeBanner
        restaurantName={currentProfile.restaurantName}
        tenureLevel="established"
        tenureMonths={14}
      />

      <PersonalDashboard profile={currentProfile} orders={typedOrders} />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Quick Reorder - 3 cols */}
        <div className="lg:col-span-3">
          {mostRecentOrder && <QuickReorder lastOrder={mostRecentOrder} />}
        </div>

        {/* Sidebar with Insights link - 2 cols */}
        <div className="lg:col-span-2 space-y-6">
          <Recommendations
            wines={typedWines}
            matchScores={currentProfile.matchScores}
          />
        </div>
      </div>

      <RecentOrders orders={customerOrders} />

      {/* Insights CTA */}
      <div className="bg-burgundy-800 rounded-xl p-6 sm:p-8 text-cream-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute right-0 top-0 w-96 h-96 rounded-full bg-gold-400 -translate-y-1/2 translate-x-1/3" />
        </div>
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-heading text-xl text-cream-50 mb-1">
              Importeur Insights
            </h3>
            <p className="text-cream-200 text-sm">
              Bekijk trends, segmentanalyses en assortimentsadvies op basis van echte
              data.
            </p>
          </div>
          <Link
            href="/dashboard/insights"
            className="inline-flex items-center gap-2 bg-gold-500 text-charcoal-900 px-6 py-3 rounded-md font-semibold hover:bg-gold-400 transition-colors text-sm whitespace-nowrap"
          >
            Bekijk Importeur Insights
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
