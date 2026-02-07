'use client'

import type { CustomerProfile } from '@/lib/types'

const typeLabels: Record<CustomerProfile['type'], string> = {
  'fine-dining': 'Fine Dining',
  casual: 'Casual Dining',
  hotel: 'Hotel Restaurant',
  bar: 'Bar',
  caterer: 'Catering',
}

interface RestaurantPickerProps {
  profiles: CustomerProfile[]
  onSelect: (profile: CustomerProfile) => void
}

export function RestaurantPicker({ profiles, onSelect }: RestaurantPickerProps) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-burgundy-800 px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-burgundy-800 via-burgundy-800/95 to-charcoal-900/90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,168,75,0.06)_0%,_transparent_60%)]" />

      <div className="relative w-full max-w-lg">
        <div className="text-center mb-8">
          <p className="font-accent text-gold-400 italic text-lg mb-2">
            Spanish Terroir
          </p>
          <h1 className="font-heading text-2xl sm:text-3xl text-cream-50 mb-2">
            Horeca Portaal
          </h1>
          <p className="text-sm text-cream-200/70 font-body">
            Selecteer uw restaurant
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {profiles.map((profile) => (
            <button
              key={profile.id}
              type="button"
              onClick={() => onSelect(profile)}
              className="bg-cream-50/5 border border-cream-50/15 rounded-xl p-5 text-left hover:border-gold-400 hover:bg-cream-50/10 transition-all duration-200 group"
            >
              <h2 className="font-heading text-lg text-cream-50 group-hover:text-gold-400 transition-colors duration-200">
                {profile.restaurantName}
              </h2>
              <span className="inline-block mt-1.5 text-xs font-medium text-gold-400/80 bg-gold-400/10 px-2 py-0.5 rounded-full font-body">
                {typeLabels[profile.type]}
              </span>
              <div className="mt-3 flex items-center gap-3 text-xs text-cream-200/50 font-body">
                <span>{profile.cuisine.join(', ')}</span>
                <span className="text-cream-200/20">&middot;</span>
                <span>{profile.wineListSize} wijnen</span>
              </div>
            </button>
          ))}
        </div>

        <p className="text-center text-xs text-cream-200/40 mt-8 font-body">
          Prototype — selecteer een restaurant en voer uw PIN in
        </p>
      </div>
    </div>
  )
}
