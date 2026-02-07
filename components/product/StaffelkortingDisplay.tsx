'use client'

import { motion } from 'framer-motion'

interface StaffelkortingDisplayProps {
  price: {
    bottle: number
    case6: number
    case12: number
  }
}

interface PriceTier {
  label: string
  quantity: number
  totalPrice: number
  pricePerBottle: number
  savingPerBottle: number
  discountPercent: number
  isBestValue: boolean
}

function calculateTiers(price: { bottle: number; case6: number; case12: number }): readonly PriceTier[] {
  const perBottle6 = price.case6 / 6
  const perBottle12 = price.case12 / 12
  const saving6 = price.bottle - perBottle6
  const saving12 = price.bottle - perBottle12
  const discount6 = (saving6 / price.bottle) * 100
  const discount12 = (saving12 / price.bottle) * 100

  return [
    {
      label: 'Per fles',
      quantity: 1,
      totalPrice: price.bottle,
      pricePerBottle: price.bottle,
      savingPerBottle: 0,
      discountPercent: 0,
      isBestValue: false,
    },
    {
      label: '6 flessen',
      quantity: 6,
      totalPrice: price.case6,
      pricePerBottle: perBottle6,
      savingPerBottle: saving6,
      discountPercent: discount6,
      isBestValue: false,
    },
    {
      label: '12 flessen',
      quantity: 12,
      totalPrice: price.case12,
      pricePerBottle: perBottle12,
      savingPerBottle: saving12,
      discountPercent: discount12,
      isBestValue: true,
    },
  ] as const
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function StaffelkortingDisplay({ price }: StaffelkortingDisplayProps) {
  const tiers = calculateTiers(price)

  return (
    <div className="bg-white rounded-lg border border-cream-200 p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-heading text-lg text-charcoal-900">
            Staffelkorting
          </h3>
          <p className="text-sm text-charcoal-700 mt-0.5">
            Meer bestellen, minder betalen per fles
          </p>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {tiers.map((tier) => (
          <motion.div
            key={tier.label}
            variants={cardVariants}
            className={`relative rounded-lg border-2 p-4 transition-shadow ${
              tier.isBestValue
                ? 'border-burgundy-700 bg-burgundy-700/5 shadow-md'
                : 'border-cream-200 bg-cream-50'
            }`}
          >
            {tier.isBestValue && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-[10px] font-bold bg-burgundy-700 text-cream-50 uppercase tracking-wider">
                  Meest voordelig
                </span>
              </div>
            )}

            <div className="text-center">
              <p className={`text-sm font-medium mb-3 ${
                tier.isBestValue ? 'text-burgundy-700' : 'text-charcoal-700'
              }`}>
                {tier.label}
              </p>

              <p className={`text-2xl font-bold mb-1 ${
                tier.isBestValue ? 'text-burgundy-700' : 'text-charcoal-900'
              }`}>
                &euro;{tier.pricePerBottle.toFixed(2)}
              </p>
              <p className="text-xs text-charcoal-700 mb-3">per fles</p>

              {tier.discountPercent > 0 ? (
                <div className="space-y-1">
                  <p className={`text-xs font-semibold ${
                    tier.isBestValue ? 'text-burgundy-700' : 'text-sage-400'
                  }`}>
                    -{tier.discountPercent.toFixed(0)}% korting
                  </p>
                  <p className="text-[11px] text-charcoal-700">
                    Bespaar &euro;{tier.savingPerBottle.toFixed(2)} per fles
                  </p>
                  <p className="text-[11px] text-charcoal-700">
                    Totaal: &euro;{tier.totalPrice.toFixed(2)}
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  <p className="text-xs text-charcoal-700">Standaard prijs</p>
                  <p className="text-[11px] text-charcoal-700">&nbsp;</p>
                  <p className="text-[11px] text-charcoal-700">&nbsp;</p>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
