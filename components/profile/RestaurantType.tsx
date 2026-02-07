'use client'

import type { RestaurantType as RestaurantTypeValue } from '@/lib/types'

interface RestaurantTypeOption {
  value: RestaurantTypeValue
  label: string
  emoji: string
  description: string
}

const options: RestaurantTypeOption[] = [
  {
    value: 'fine-dining',
    label: 'Fine Dining',
    emoji: '\u2B50',
    description: 'Gastronomisch restaurant met uitgebreide wijnkaart',
  },
  {
    value: 'casual',
    label: 'Casual Dining',
    emoji: '\uD83C\uDF7D\uFE0F',
    description: 'Gezellig restaurant met toegankelijke selectie',
  },
  {
    value: 'hotel',
    label: 'Hotel',
    emoji: '\uD83C\uDFE8',
    description: 'Hotel restaurant met breed aanbod voor gasten',
  },
  {
    value: 'bar',
    label: 'Wijnbar',
    emoji: '\uD83C\uDF77',
    description: 'Wijnbar met focus op by-the-glass en ontdekking',
  },
  {
    value: 'caterer',
    label: 'Cateraar',
    emoji: '\uD83C\uDF7E',
    description: 'Catering voor evenementen en feesten',
  },
]

interface RestaurantTypeProps {
  selected: RestaurantTypeValue | null
  onChange: (value: RestaurantTypeValue) => void
}

export function RestaurantType({ selected, onChange }: RestaurantTypeProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {options.map((option) => {
        const isSelected = selected === option.value
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`
              relative p-6 rounded-lg border-2 text-left transition-all duration-200
              ${isSelected
                ? 'border-burgundy-700 bg-white shadow-md'
                : 'border-cream-200 bg-white hover:border-burgundy-600/30 hover:shadow-sm'
              }
            `}
          >
            {isSelected && (
              <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-gold-400" />
            )}
            <div className="text-3xl mb-3">{option.emoji}</div>
            <h3 className={`font-heading text-lg font-semibold mb-1 ${isSelected ? 'text-burgundy-700' : 'text-charcoal-900'}`}>
              {option.label}
            </h3>
            <p className="text-sm text-charcoal-700 leading-relaxed">
              {option.description}
            </p>
          </button>
        )
      })}
    </div>
  )
}
