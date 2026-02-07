'use client'

import { useState, useMemo } from 'react'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import type { Order } from '@/lib/types'

interface QuickReorderProps {
  lastOrder: Order
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
  }).format(value)
}

export function QuickReorder({ lastOrder }: QuickReorderProps) {
  const [quantities, setQuantities] = useState<Record<string, number>>(
    Object.fromEntries(lastOrder.items.map((item) => [item.wineSlug, item.quantity]))
  )

  const updateQuantity = (slug: string, value: number) => {
    setQuantities((prev) => ({
      ...prev,
      [slug]: Math.max(0, value),
    }))
  }

  const runningTotal = useMemo(() => {
    return lastOrder.items.reduce((sum, item) => {
      const qty = quantities[item.wineSlug] || 0
      return sum + qty * item.pricePerBottle
    }, 0)
  }, [quantities, lastOrder.items])

  const orderDate = new Date(lastOrder.date).toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading text-lg text-charcoal-900">
              Herbestel je Laatste Order
            </h3>
            <p className="text-sm text-charcoal-700 mt-1">
              {orderDate} &middot; {lastOrder.id}
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gold-400/10 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-gold-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182"
              />
            </svg>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Column Headers */}
          <div className="hidden sm:grid grid-cols-12 gap-4 text-xs text-charcoal-700 uppercase tracking-wider pb-2 border-b border-cream-100">
            <div className="col-span-5">Wijn</div>
            <div className="col-span-2 text-center">Aantal</div>
            <div className="col-span-2 text-right">Per Fles</div>
            <div className="col-span-3 text-right">Subtotaal</div>
          </div>

          {/* Items */}
          {lastOrder.items.map((item) => {
            const qty = quantities[item.wineSlug] || 0
            const lineTotal = qty * item.pricePerBottle

            return (
              <div
                key={item.wineSlug}
                className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center py-3 border-b border-cream-100 last:border-0"
              >
                <div className="sm:col-span-5">
                  <p className="font-medium text-charcoal-900 text-sm">
                    {item.wineName}
                  </p>
                </div>
                <div className="sm:col-span-2 flex items-center justify-center gap-1">
                  <button
                    onClick={() => updateQuantity(item.wineSlug, qty - 1)}
                    className="w-7 h-7 rounded bg-cream-100 text-charcoal-700 hover:bg-cream-200 flex items-center justify-center text-sm font-medium transition-colors"
                    aria-label="Verminder"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={qty}
                    onChange={(e) =>
                      updateQuantity(item.wineSlug, parseInt(e.target.value) || 0)
                    }
                    className="w-12 h-7 text-center rounded border border-cream-200 text-sm font-medium text-charcoal-900 bg-white focus:outline-none focus:ring-1 focus:ring-burgundy-600"
                    min={0}
                  />
                  <button
                    onClick={() => updateQuantity(item.wineSlug, qty + 1)}
                    className="w-7 h-7 rounded bg-cream-100 text-charcoal-700 hover:bg-cream-200 flex items-center justify-center text-sm font-medium transition-colors"
                    aria-label="Verhoog"
                  >
                    +
                  </button>
                </div>
                <div className="sm:col-span-2 text-right text-sm text-charcoal-700">
                  {formatCurrency(item.pricePerBottle)}
                </div>
                <div className="sm:col-span-3 text-right text-sm font-semibold text-charcoal-900">
                  {formatCurrency(lineTotal)}
                </div>
              </div>
            )
          })}

          {/* Running Total */}
          <div className="flex items-center justify-between pt-4 border-t-2 border-burgundy-700/10">
            <span className="text-sm font-medium text-charcoal-700 uppercase tracking-wider">
              Totaal
            </span>
            <span className="text-xl font-bold text-burgundy-700 font-heading">
              {formatCurrency(runningTotal)}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              variant="secondary"
              size="lg"
              className="flex-1"
              onClick={() => {
                // eslint-disable-next-line no-console
                console.log('1-Click Herbestellen', { quantities, total: runningTotal })
              }}
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                />
              </svg>
              1-Click Herbestellen
            </Button>
            <Button variant="outline" size="lg" className="flex-1">
              Aanpassen & Bestellen
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
