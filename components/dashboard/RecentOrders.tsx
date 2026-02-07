'use client'

import { useMemo } from 'react'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import type { Order } from '@/lib/types'

interface RecentOrdersProps {
  orders: Order[]
}

const statusConfig: Record<
  Order['status'],
  { label: string; bg: string; text: string }
> = {
  pending: { label: 'In behandeling', bg: 'bg-gold-400/15', text: 'text-gold-600' },
  confirmed: { label: 'Bevestigd', bg: 'bg-sage-300/20', text: 'text-sage-400' },
  shipped: { label: 'Verzonden', bg: 'bg-blue-100', text: 'text-blue-700' },
  delivered: { label: 'Geleverd', bg: 'bg-green-100', text: 'text-green-700' },
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
  }).format(value)
}

export function RecentOrders({ orders }: RecentOrdersProps) {
  const sortedOrders = useMemo(() => {
    return [...orders].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  }, [orders])

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-lg text-charcoal-900">
            Recente Bestellingen
          </h3>
          <span className="text-xs text-charcoal-700">
            {sortedOrders.length} bestellingen
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-cream-100">
                <th className="text-left text-xs text-charcoal-700 uppercase tracking-wider font-medium px-6 py-3">
                  Datum
                </th>
                <th className="text-left text-xs text-charcoal-700 uppercase tracking-wider font-medium px-6 py-3">
                  Order ID
                </th>
                <th className="text-center text-xs text-charcoal-700 uppercase tracking-wider font-medium px-6 py-3">
                  Items
                </th>
                <th className="text-right text-xs text-charcoal-700 uppercase tracking-wider font-medium px-6 py-3">
                  Totaal
                </th>
                <th className="text-center text-xs text-charcoal-700 uppercase tracking-wider font-medium px-6 py-3">
                  Status
                </th>
                <th className="text-right text-xs text-charcoal-700 uppercase tracking-wider font-medium px-6 py-3">
                  Actie
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedOrders.map((order) => {
                const config = statusConfig[order.status]
                const itemCount = order.items.reduce(
                  (sum, item) => sum + item.quantity,
                  0
                )
                const formattedDate = new Date(order.date).toLocaleDateString(
                  'nl-NL',
                  {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  }
                )

                return (
                  <tr
                    key={order.id}
                    className="border-b border-cream-100 last:border-0 hover:bg-cream-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-charcoal-900">
                      {formattedDate}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-mono text-charcoal-700">
                        {order.id}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm text-charcoal-900">
                        {itemCount} flessen
                      </span>
                      <span className="text-xs text-charcoal-700 block">
                        {order.items.length} wijnen
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-semibold text-charcoal-900">
                        {formatCurrency(order.total)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
                      >
                        {config.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm">
                        Herbestellen
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
