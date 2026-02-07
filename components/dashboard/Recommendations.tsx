import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { Wine } from '@/lib/types'

interface RecommendationsProps {
  wines: Wine[]
  matchScores: Record<string, number>
}

const typeEmoji: Record<string, string> = {
  red: '🍷',
  white: '🥂',
  sparkling: '🍾',
  rose: '🌸',
  dessert: '🍯',
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
  }).format(value)
}

function WineRow({ wine, matchScore }: { wine: Wine; matchScore: number }) {
  return (
    <div className="flex items-center gap-4 py-3">
      <div className="w-16 h-16 rounded-lg bg-cream-100 flex items-center justify-center flex-shrink-0">
        <span className="text-2xl opacity-40">{typeEmoji[wine.type] || '🍷'}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h4 className="font-heading text-sm text-charcoal-900 truncate">
            {wine.name}
          </h4>
          <Badge variant="match">{matchScore}%</Badge>
        </div>
        <p className="text-xs text-charcoal-700">
          {wine.winemaker} &middot; {wine.region} &middot; {wine.vintage}
        </p>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="text-sm font-bold text-burgundy-700">
          {formatCurrency(wine.price.bottle)}
        </p>
        <Button variant="ghost" size="sm" className="mt-1 text-xs">
          Toevoegen
        </Button>
      </div>
    </div>
  )
}

export function Recommendations({ wines, matchScores }: RecommendationsProps) {
  // Sort wines by match score descending
  const sortedByMatch = [...wines].sort(
    (a, b) => (matchScores[b.slug] || 0) - (matchScores[a.slug] || 0)
  )

  // "Nieuw voor Jou" - Top 3 by match score (simulating not in order history)
  const nieuwVoorJou = sortedByMatch.slice(0, 3)

  // "Populair bij Vergelijkbare Restaurants" - Mock selection: picks 3 mid-range wines
  const populairBij = sortedByMatch.slice(3, 6)

  // "Seizoenstip" - Featured seasonal wine
  const seizoensWijn = wines.find((w) => w.type === 'white') || wines[0]

  return (
    <div className="space-y-6">
      {/* Nieuw voor Jou */}
      <Card>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-terracotta-500/10 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-terracotta-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                />
              </svg>
            </div>
            <h3 className="font-heading text-base text-charcoal-900">
              Nieuw voor Jou
            </h3>
          </div>
          <div className="divide-y divide-cream-100">
            {nieuwVoorJou.map((wine) => (
              <WineRow
                key={wine.slug}
                wine={wine}
                matchScore={matchScores[wine.slug] || 0}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Populair bij Vergelijkbare Restaurants */}
      <Card>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-sage-300/20 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-sage-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                />
              </svg>
            </div>
            <h3 className="font-heading text-base text-charcoal-900">
              Populair bij Vergelijkbare Restaurants
            </h3>
          </div>
          <div className="divide-y divide-cream-100">
            {populairBij.map((wine) => (
              <WineRow
                key={wine.slug}
                wine={wine}
                matchScore={matchScores[wine.slug] || 0}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Seizoenstip */}
      <Card className="border-gold-400/30 bg-gradient-to-br from-white to-gold-400/5">
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-gold-400/15 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-gold-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                />
              </svg>
            </div>
            <h3 className="font-heading text-base text-charcoal-900">Seizoenstip</h3>
            <Badge variant="score">Februari</Badge>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-lg bg-cream-100 flex items-center justify-center flex-shrink-0">
              <span className="text-3xl opacity-40">
                {typeEmoji[seizoensWijn.type] || '🍷'}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-heading text-base text-charcoal-900">
                  {seizoensWijn.name}
                </h4>
                <Badge variant="match">
                  {matchScores[seizoensWijn.slug] || 0}%
                </Badge>
              </div>
              <p className="text-xs text-charcoal-700 mb-2">
                {seizoensWijn.winemaker} &middot; {seizoensWijn.region}
              </p>
              <p className="text-xs text-charcoal-700 leading-relaxed mb-3">
                Perfecte keuze voor het winterseizoen. De frisheid en complexiteit van
                deze wijn complementeren seizoensgerechten met wortelgroenten, vis uit de
                Noordzee en lichte voorgerechten. Gasten zoeken in februari naar verfrissende
                alternatieven naast de zwaardere rode wijnen.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-burgundy-700">
                  {formatCurrency(seizoensWijn.price.bottle)}
                </span>
                <Button variant="primary" size="sm">
                  Toevoegen
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
