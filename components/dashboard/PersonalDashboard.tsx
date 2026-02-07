'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import type { CustomerProfile, Order } from '@/lib/types'

interface PersonalDashboardProps {
  profile: CustomerProfile
  orders: Order[]
}

const typeLabels: Record<CustomerProfile['type'], string> = {
  'fine-dining': 'Fine Dining',
  casual: 'Casual Dining',
  hotel: 'Hotel & Resort',
  bar: 'Bar & Lounge',
  caterer: 'Catering',
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
  }).format(value)
}

function computeStats(profile: CustomerProfile, orders: Order[]) {
  const customerOrders = orders.filter((o) => o.customerId === profile.id)
  const totalSpent = customerOrders.reduce((sum, o) => sum + o.total, 0)

  const styleMap: Record<string, string> = {
    light: 'Licht',
    medium: 'Medium',
    full: 'Vol',
  }
  const favoriteStyle = profile.preferences.styles
    .map((s) => styleMap[s] || s)
    .join(' & ')

  const allScores = Object.values(profile.matchScores)
  const avgGuiaPenin =
    allScores.length > 0
      ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length)
      : 0

  const lastOrderDate =
    customerOrders.length > 0
      ? new Date(
          customerOrders.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )[0].date
        ).toLocaleDateString('nl-NL', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      : 'Geen bestellingen'

  return { totalSpent, favoriteStyle, avgGuiaPenin, lastOrderDate, customerOrders }
}

export function PersonalDashboard({ profile, orders }: PersonalDashboardProps) {
  const { totalSpent, favoriteStyle, avgGuiaPenin, lastOrderDate } =
    computeStats(profile, orders)

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-burgundy-800 rounded-xl p-8 text-cream-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-gold-400" />
          <div className="absolute -left-10 -bottom-10 w-60 h-60 rounded-full bg-gold-400" />
        </div>
        <div className="relative">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="font-heading text-2xl sm:text-3xl">
              Welkom terug, {profile.restaurantName}
            </h1>
            <Badge variant="score">{typeLabels[profile.type]}</Badge>
          </div>
          <p className="text-cream-200 text-sm mt-2">
            Uw persoonlijke B2B dashboard met aanbevelingen op maat
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Profile Summary Sidebar */}
        <Card className="lg:col-span-1">
          <CardContent className="space-y-4">
            <h3 className="font-heading text-lg text-charcoal-900">Profiel</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-charcoal-700">Type</span>
                <span className="font-medium text-charcoal-900">
                  {typeLabels[profile.type]}
                </span>
              </div>
              <div className="border-t border-cream-100" />
              <div className="flex justify-between">
                <span className="text-charcoal-700">Keuken</span>
                <span className="font-medium text-charcoal-900">
                  {profile.cuisine.join(', ')}
                </span>
              </div>
              <div className="border-t border-cream-100" />
              <div className="flex justify-between">
                <span className="text-charcoal-700">Wijnkaart</span>
                <span className="font-medium text-charcoal-900">
                  {profile.wineListSize} wijnen
                </span>
              </div>
              <div className="border-t border-cream-100" />
              <div className="flex justify-between">
                <span className="text-charcoal-700">Laatste bestelling</span>
                <span className="font-medium text-charcoal-900 text-right text-xs">
                  {lastOrderDate}
                </span>
              </div>
              <div className="border-t border-cream-100" />
              <div className="flex justify-between">
                <span className="text-charcoal-700">Prijsklasse</span>
                <span className="font-medium text-charcoal-900 capitalize">
                  {profile.preferences.priceRange}
                </span>
              </div>
              <div className="border-t border-cream-100" />
              <div className="flex justify-between">
                <span className="text-charcoal-700">Avontuurlijkheid</span>
                <span className="font-medium text-charcoal-900">
                  {profile.preferences.adventurousness}/10
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-burgundy-700/10 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-burgundy-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-charcoal-700 uppercase tracking-wider">
                    Totaal Besteld
                  </p>
                  <p className="text-2xl font-bold text-burgundy-700 font-heading">
                    {formatCurrency(totalSpent)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gold-400/10 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-gold-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-charcoal-700 uppercase tracking-wider">
                    Favoriete Stijl
                  </p>
                  <p className="text-2xl font-bold text-gold-500 font-heading">
                    {favoriteStyle}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-sage-300/20 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-sage-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-charcoal-700 uppercase tracking-wider">
                    Guia Penin Gemiddeld
                  </p>
                  <p className="text-2xl font-bold text-sage-400 font-heading">
                    {avgGuiaPenin}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recommendations Header */}
      <div className="flex items-center justify-between pt-4">
        <h2 className="font-heading text-xl text-charcoal-900">
          Jouw Aanbevelingen
        </h2>
        <Link
          href="/wijnen"
          className="text-burgundy-700 hover:text-burgundy-600 text-sm font-medium transition-colors"
        >
          Bekijk alles &rarr;
        </Link>
      </div>
    </div>
  )
}
