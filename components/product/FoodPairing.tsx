interface FoodPairingProps {
  pairings: string[]
}

const pairingIcons: Record<string, { emoji: string; tip: string }> = {
  'Rood Vlees': {
    emoji: '\ud83e\udd69',
    tip: 'Entrecote, lamsbout, ossobuco',
  },
  'Wit Vlees': {
    emoji: '\ud83c\udf57',
    tip: 'Kip, kalkoen, konijn, kalfsvlees',
  },
  'Vis & Zeevruchten': {
    emoji: '\ud83e\udd90',
    tip: 'Gegrilde vis, gambas, pulpo, coquilles',
  },
  Vegetarisch: {
    emoji: '\ud83e\udd57',
    tip: 'Gegrilde groenten, risotto, paddenstoelen',
  },
  Kaas: {
    emoji: '\ud83e\uddc0',
    tip: 'Manchego, Idiazabal, gerijpte kazen',
  },
  Wild: {
    emoji: '\ud83e\udd8c',
    tip: 'Hert, fazant, everzwijn, eend',
  },
  'Pasta & Rijst': {
    emoji: '\ud83c\udf5d',
    tip: 'Paella, risotto, pasta met vlees- of tomatenragu',
  },
  Dessert: {
    emoji: '\ud83c\udf70',
    tip: 'Cr\u00e8me br\u00fbl\u00e9e, tarta de Santiago, chocolade',
  },
}

const seasonalTips: Record<string, string> = {
  'Rood Vlees':
    'Ideaal in herfst en winter. Serveer de wijn op kamertemperatuur (16-18\u00b0C) en open de fles minimaal 30 minuten voor het serveren.',
  'Wit Vlees':
    'Perfect het hele jaar door. Licht gekoeld serveren bij wit vlees voor optimale frisheid.',
  'Vis & Zeevruchten':
    'Op zijn best in lente en zomer. Serveer goed gekoeld (8-10\u00b0C) bij verse vis en schaaldieren.',
  Vegetarisch:
    'Uitstekend bij seizoensgroenten. In de herfst met paddenstoelen, in de zomer met gegrilde groenten.',
  Kaas:
    'Kaas en wijn zijn tijdloze combinaties. Kies voor gerijpte Spaanse kazen bij rode wijnen, verse kazen bij wit.',
  Wild:
    'De ultieme herfst- en wintercombinatie. Laat de wijn ademen in een karaf voor het beste resultaat.',
  'Pasta & Rijst':
    'Veelzijdig het hele jaar door. Bij rijke sauzen kies voor vollere wijnen, bij lichte gerechten een medium wijn.',
  Dessert:
    'Zorg dat de wijn zoeter is dan het dessert. Licht koelen (10-12\u00b0C) voor de beste beleving.',
}

export function FoodPairing({ pairings }: FoodPairingProps) {
  const mainPairing = pairings[0]
  const seasonTip = seasonalTips[mainPairing] || seasonalTips['Kaas']

  return (
    <div className="space-y-8">
      {/* Pairing grid */}
      <div>
        <h3 className="font-heading text-lg text-charcoal-900 mb-4">
          Aanbevolen combinaties
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {pairings.map((pairing) => {
            const data = pairingIcons[pairing] || {
              emoji: '\ud83c\udf7d\ufe0f',
              tip: pairing,
            }
            return (
              <div
                key={pairing}
                className="bg-white rounded-lg border border-cream-200 p-5 text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="text-4xl mb-3">{data.emoji}</div>
                <h4 className="font-heading text-sm text-charcoal-900 mb-1">
                  {pairing}
                </h4>
                <p className="text-xs text-charcoal-700 leading-relaxed">
                  {data.tip}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Seasonal tip */}
      <div className="bg-cream-50 rounded-lg border border-cream-200 p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold-400/20 flex items-center justify-center text-xl">
            \ud83c\udf1f
          </div>
          <div>
            <h4 className="font-heading text-base text-charcoal-900 mb-2">
              Seizoenstip
            </h4>
            <p className="text-sm text-charcoal-700 leading-relaxed">
              {seasonTip}
            </p>
          </div>
        </div>
      </div>

      {/* Serving suggestion */}
      <div className="bg-white rounded-lg border border-cream-200 p-6">
        <h3 className="font-heading text-lg text-charcoal-900 mb-4">
          Serveersuggesties
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="text-2xl">\ud83c\udf21\ufe0f</div>
            <div>
              <p className="text-sm font-semibold text-charcoal-900">Temperatuur</p>
              <p className="text-xs text-charcoal-700">16-18\u00b0C voor rood, 8-10\u00b0C voor wit</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="text-2xl">\ud83e\ude97</div>
            <div>
              <p className="text-sm font-semibold text-charcoal-900">Decanteren</p>
              <p className="text-xs text-charcoal-700">30-60 minuten voor rijke rode wijnen</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="text-2xl">\ud83c\udf77</div>
            <div>
              <p className="text-sm font-semibold text-charcoal-900">Glastype</p>
              <p className="text-xs text-charcoal-700">Bourgogne glas voor rode, universeel voor wit</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
