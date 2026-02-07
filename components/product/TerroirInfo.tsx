import type { Wine } from '@/lib/types'

interface TerroirInfoProps {
  wine: Wine
}

const regionData: Record<
  string,
  {
    description: string
    soil: string
    climate: string
    altitude: string
    vinification: string
  }
> = {
  Rioja: {
    description:
      'De Rioja is Spanje\u2019s meest prestigieuze wijnregio, gelegen langs de rivier de Ebro in het noorden. De combinatie van Atlantische en Mediterrane invloeden cre\u00ebert ideale omstandigheden voor de Tempranillo-druif.',
    soil: 'Kalksteen, klei en alluviale grond',
    climate: 'Continentaal met Atlantische invloed',
    altitude: '400-700 meter',
    vinification:
      'Traditionele vinificatie met lange rijping op Amerikaans en Frans eiken. Reserva\'s rijpen minimaal 12 maanden op vat, Gran Reserva\'s minimaal 24 maanden.',
  },
  Priorat: {
    description:
      'De Priorat is een klein, steil en dramatisch wijngebied in Catalonië. De unieke llicorella (leisteen) bodem dwingt de wijnstokken diep te wortelen, resulterend in extreem geconcentreerde wijnen.',
    soil: 'Llicorella (leisteen en kwarts)',
    climate: 'Mediterraan met koele nachten',
    altitude: '100-800 meter',
    vinification:
      'Lage opbrengsten, handmatige oogst op steile terrassen. Rijping op Frans eiken met minimale interventie.',
  },
  'R\u00edas Baixas': {
    description:
      'Gelegen aan de Atlantische kust van Galici\u00eb, is R\u00edas Baixas het koninkrijk van de Albari\u00f1o-druif. De maritieme invloed en granietbodem geven de wijnen hun karakteristieke frisheid en mineraliteit.',
    soil: 'Graniet en zandsteen',
    climate: 'Atlantisch maritiem, regenrijk',
    altitude: '0-300 meter',
    vinification:
      'Koele vergisting om de aromatische complexiteit te bewaren. Vaak op fijne droesem gerijpt voor extra textuur.',
  },
  Bierzo: {
    description:
      'Verscholen in de bergen van Le\u00f3n, herontdekken wijnmakers de oude Menc\u00eda-wijngaarden van Bierzo. Het microklimaat en de leistenen bodem produceren elegante, Bourgondische wijnen.',
    soil: 'Leisteen, kwarts en klei',
    climate: 'Continentaal met Atlantische invloed',
    altitude: '450-900 meter',
    vinification:
      'Minimale interventie, wilde gisten. Gedeeltelijk hele tros-vergisting voor extra complexiteit.',
  },
  'Pened\u00e8s': {
    description:
      'De Pened\u00e8s in Catalonië is de bakermat van Spaanse mousserende wijn. Met een traditie die meer dan een eeuw teruggaat, produceren de beste huizen Cava\'s die kunnen wedijveren met Champagne.',
    soil: 'Kalksteen en klei',
    climate: 'Mediterraan met zeebries',
    altitude: '200-800 meter',
    vinification:
      'm\u00e9thode traditionnelle met lange rijping op fles. De beste Cava\'s rijpen 60+ maanden.',
  },
  Rueda: {
    description:
      'De hoge vlakte van Castilla y Le\u00f3n herbergt de Verdejo-druif in Rueda. Extreme temperatuurverschillen tussen dag en nacht behouden de frisse zuurgraad van de wijnen.',
    soil: 'Kiezel, kalk en klei',
    climate: 'Continentaal met extreme temperatuurverschillen',
    altitude: '700-850 meter',
    vinification:
      'Koele nachtoogst om frisheid te bewaren. Pre-phylloxera stokken leveren de meest intense wijnen.',
  },
  Jumilla: {
    description:
      'In het zuidoosten van Spanje trotseren oude Monastrell-stokken de hitte van Jumilla. Het extreme klimaat dwingt de druiven tot concentratie, resulterend in krachtige, donkere wijnen.',
    soil: 'Kalksteen en zandsteen',
    climate: 'Semi-aride Mediterraan',
    altitude: '400-800 meter',
    vinification:
      'Lage opbrengsten van oude stokken. Rijping op Frans eiken tempert de kracht met elegantie.',
  },
  Jerez: {
    description:
      'De driehoek Jerez-El Puerto-Sanl\u00facar herbergt een van de meest unieke wijnstijlen ter wereld. Onder een laag flor-gist rijpen Fino en Manzanilla Sherry\'s tot ongekende complexiteit.',
    soil: 'Albariza (krijt)',
    climate: 'Mediterraan met Atlantische invloed',
    altitude: '0-100 meter',
    vinification:
      'Solera-systeem met biologische rijping onder flor. Elke botteling bevat wijnen van verschillende jaargangen.',
  },
  'Sierra de Gredos': {
    description:
      'De Sierra de Gredos ten westen van Madrid is het nieuwe mekka van de Spaanse wijn. Jonge wijnmakers herontdekken oude Garnacha-wijngaarden op grote hoogte met granietbodem.',
    soil: 'Graniet en zand',
    climate: 'Continentaal met extreme amplitudes',
    altitude: '600-1.100 meter',
    vinification:
      'Minimale interventie, wilde gisten, betonnen ei\u00ebn en groot fust. De focus ligt op puurheid en terroir-expressie.',
  },
}

const fallbackRegion = {
  description: 'Een uniek Spaans wijngebied met eigen karakter en traditie.',
  soil: 'Divers terroir',
  climate: 'Mediterraan',
  altitude: 'Variabel',
  vinification: 'Traditionele methoden met moderne precisie.',
}

export function TerroirInfo({ wine }: TerroirInfoProps) {
  const region = regionData[wine.region] || fallbackRegion

  return (
    <div className="space-y-8">
      {/* Region overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Map placeholder */}
        <div className="md:col-span-1">
          <div className="aspect-square bg-cream-100 rounded-lg border border-cream-200 flex items-center justify-center relative overflow-hidden">
            <div className="text-center z-10">
              <div className="text-4xl mb-2">\ud83d\uddfa\ufe0f</div>
              <p className="font-heading text-sm text-charcoal-900">
                {wine.region}
              </p>
              {wine.subRegion && (
                <p className="text-xs text-charcoal-700">{wine.subRegion}</p>
              )}
            </div>
            {/* Decorative background */}
            <div className="absolute inset-0 opacity-5">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <path
                  d="M40,120 Q60,40 120,60 T180,120 Q160,180 100,160 T40,120"
                  fill="var(--color-burgundy-700)"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Region info */}
        <div className="md:col-span-2">
          <h3 className="font-heading text-2xl text-charcoal-900 mb-1">
            {wine.region}
          </h3>
          {wine.subRegion && (
            <p className="text-sm text-gold-500 font-medium mb-3">
              {wine.subRegion}
            </p>
          )}
          <div className="w-16 h-0.5 bg-gold-400 mb-4" />
          <p className="text-charcoal-700 leading-relaxed mb-6">
            {region.description}
          </p>

          {/* Key facts */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-cream-50 rounded-lg border border-cream-200 p-4 text-center">
              <div className="text-2xl mb-1">\ud83e\udea8</div>
              <p className="text-xs text-charcoal-700 mb-1">Bodem</p>
              <p className="text-sm font-semibold text-charcoal-900">
                {region.soil}
              </p>
            </div>
            <div className="bg-cream-50 rounded-lg border border-cream-200 p-4 text-center">
              <div className="text-2xl mb-1">\u2600\ufe0f</div>
              <p className="text-xs text-charcoal-700 mb-1">Klimaat</p>
              <p className="text-sm font-semibold text-charcoal-900">
                {region.climate}
              </p>
            </div>
            <div className="bg-cream-50 rounded-lg border border-cream-200 p-4 text-center">
              <div className="text-2xl mb-1">\u26f0\ufe0f</div>
              <p className="text-xs text-charcoal-700 mb-1">Hoogte</p>
              <p className="text-sm font-semibold text-charcoal-900">
                {region.altitude}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Vinification */}
      <div className="bg-white rounded-lg border border-cream-200 p-6">
        <h3 className="font-heading text-lg text-charcoal-900 mb-3">
          Vinificatie &amp; Rijping
        </h3>
        <div className="w-12 h-0.5 bg-gold-400 mb-4" />
        <p className="text-charcoal-700 leading-relaxed">{region.vinification}</p>

        {/* Process steps */}
        <div className="mt-6 flex flex-col md:flex-row items-start md:items-center gap-4">
          {[
            { icon: '\ud83c\udf47', label: 'Oogst', desc: 'Handmatig geselecteerd' },
            { icon: '\ud83e\ude94', label: 'Vergisting', desc: 'Temperatuur-gecontroleerd' },
            { icon: '\ud83e\udeb5', label: 'Rijping', desc: 'Eiken vaten' },
            { icon: '\ud83c\udf7e', label: 'Botteling', desc: 'Ongefilterd' },
          ].map((step, i) => (
            <div key={step.label} className="flex items-center gap-3 flex-1">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-cream-50 border border-cream-200 flex items-center justify-center text-xl">
                {step.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-charcoal-900">
                  {step.label}
                </p>
                <p className="text-xs text-charcoal-700">{step.desc}</p>
              </div>
              {i < 3 && (
                <div className="hidden md:block flex-shrink-0 w-8 text-center text-cream-200">
                  \u2192
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
