import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-charcoal-900 text-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-heading text-gold-400 text-xl mb-4">Spanish Terroir</h3>
            <p className="text-cream-200 text-sm leading-relaxed">
              Importeur van exclusieve Spaanse wijnen voor de Nederlandse gastronomie.
              Selectie op basis van terroir, vakmanschap en Guía Peñín kwaliteit.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-cream-50 mb-4">Wijnen</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/wijnen?type=red" className="text-cream-200 hover:text-gold-400 transition-colors">Rood</Link></li>
              <li><Link href="/wijnen?type=white" className="text-cream-200 hover:text-gold-400 transition-colors">Wit</Link></li>
              <li><Link href="/wijnen?type=rose" className="text-cream-200 hover:text-gold-400 transition-colors">Rosé</Link></li>
              <li><Link href="/wijnen?type=sparkling" className="text-cream-200 hover:text-gold-400 transition-colors">Sparkling</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-cream-50 mb-4">Regio&apos;s</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/wijnen?region=Rioja" className="text-cream-200 hover:text-gold-400 transition-colors">Rioja</Link></li>
              <li><Link href="/wijnen?region=Ribera+del+Duero" className="text-cream-200 hover:text-gold-400 transition-colors">Ribera del Duero</Link></li>
              <li><Link href="/wijnen?region=Priorat" className="text-cream-200 hover:text-gold-400 transition-colors">Priorat</Link></li>
              <li><Link href="/wijnen?region=Rías+Baixas" className="text-cream-200 hover:text-gold-400 transition-colors">Rías Baixas</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-cream-50 mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-cream-200">
              <li>info@spanishterroir.nl</li>
              <li>+31 (0)20 123 4567</li>
              <li>Amsterdam, Nederland</li>
            </ul>
            <div className="mt-4 flex gap-3">
              <span className="w-8 h-8 bg-burgundy-700 rounded-full flex items-center justify-center text-cream-50 text-xs cursor-pointer hover:bg-burgundy-600 transition-colors">IG</span>
              <span className="w-8 h-8 bg-burgundy-700 rounded-full flex items-center justify-center text-cream-50 text-xs cursor-pointer hover:bg-burgundy-600 transition-colors">LI</span>
              <span className="w-8 h-8 bg-burgundy-700 rounded-full flex items-center justify-center text-cream-50 text-xs cursor-pointer hover:bg-burgundy-600 transition-colors">FB</span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-charcoal-700 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-cream-200">
          <p>&copy; 2026 Spanish Terroir. Alle rechten voorbehouden.</p>
          <div className="flex gap-6">
            <span className="hover:text-gold-400 transition-colors cursor-pointer">Privacy</span>
            <span className="hover:text-gold-400 transition-colors cursor-pointer">Voorwaarden</span>
            <span className="hover:text-gold-400 transition-colors cursor-pointer">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
