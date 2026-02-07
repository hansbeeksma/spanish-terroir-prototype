interface WinemakerStoryProps {
  winemakerName: string
  story: string
}

const philosophyQuotes: Record<string, string> = {
  'La Rioja Alta':
    'De wijn moet de zuiverste expressie zijn van de Rioja Alta. Geduld en traditie zijn onze beste bondgenoten.',
  '\u00c1lvaro Palacios':
    'Wijn maken is de kunst van het luisteren naar de natuur. In de Priorat spreekt het terroir met een stem die je niet kunt negeren.',
  'Do Ferreiro':
    'Vijf generaties hebben ons geleerd dat de beste Albari\u00f1o niet gemaakt wordt, maar geboren wordt uit de granieten bodem.',
  'Marqu\u00e9s de Murrieta':
    'Uitzonderlijkheid is geen keuze, het is een verplichting. Alleen de allerbeste jaren verdienen het Castillo Ygay-etiket.',
  'Bodegas Muga':
    'Wij geloven in de ziel van het eiken. Elk vat vertelt een verhaal dat de wijn verrijkt.',
  'Ra\u00fal P\u00e9rez':
    'Regels zijn er om te overtreden. De mooiste wijnen ontstaan waar conventie ophoudt en intuïtie begint.',
  'Descendientes de J. Palacios':
    'De Menc\u00eda-druif is een vergeten schat. Ons werk is haar opnieuw laten stralen.',
  'Gramona':
    'Tijd is het kostbaarste ingredi\u00ebnt. Onze Cava rijpt tot ze klaar is, niet tot de markt erom vraagt.',
  'Ossian Vides y Vinos':
    'Tweehonderd jaar oude wijnstokken bewaren geheimen die geen technologie kan evenaren.',
  'Bodegas El Nido':
    'In de hitte van Jumilla vindt de Monastrell haar ware kracht. Wij kanaliseren die energie in elegantie.',
  'Equipo Navazos':
    'De bodega\u2019s van Jerez herbergen schatten die de wereld vergeten is. Wij brengen ze terug naar het licht.',
  'Comando G':
    'De Sierra de Gredos is de nieuwe Bourgogne. De Garnacha is onze Pinot Noir.',
}

export function WinemakerStory({ winemakerName, story }: WinemakerStoryProps) {
  const philosophy = philosophyQuotes[winemakerName]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Photo placeholder */}
      <div className="md:col-span-1">
        <div className="aspect-[3/4] bg-cream-100 rounded-lg border border-cream-200 flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl mb-3 opacity-20">
              \ud83e\uddd1\u200d\ud83c\udf3e
            </div>
            <p className="text-xs text-charcoal-700">Foto wijnmaker</p>
          </div>
        </div>
      </div>

      {/* Story content */}
      <div className="md:col-span-2 space-y-6">
        <div>
          <h3 className="font-heading text-2xl text-charcoal-900 mb-1">
            {winemakerName}
          </h3>
          <div className="w-16 h-0.5 bg-gold-400 mb-4" />
        </div>

        <p className="text-charcoal-700 leading-relaxed">{story}</p>

        {philosophy && (
          <blockquote className="border-l-4 border-gold-400 pl-6 py-2">
            <p className="font-accent text-xl text-charcoal-800 italic leading-relaxed">
              &ldquo;{philosophy}&rdquo;
            </p>
            <footer className="mt-3 text-sm text-charcoal-700">
              &mdash; {winemakerName}
            </footer>
          </blockquote>
        )}

        <div className="bg-cream-50 rounded-lg border border-cream-200 p-5">
          <h4 className="font-heading text-sm text-charcoal-900 mb-3">
            Over de bodega
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-charcoal-700">Opgericht</p>
              <p className="font-semibold text-charcoal-900">Traditionele bodega</p>
            </div>
            <div>
              <p className="text-charcoal-700">Wijngaarden</p>
              <p className="font-semibold text-charcoal-900">Eigen wijngaarden</p>
            </div>
            <div>
              <p className="text-charcoal-700">Vinificatie</p>
              <p className="font-semibold text-charcoal-900">Minimale interventie</p>
            </div>
            <div>
              <p className="text-charcoal-700">Certificering</p>
              <p className="font-semibold text-charcoal-900">Biologisch / Biodynamisch</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
