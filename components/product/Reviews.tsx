import { GuiaPeninBadge } from '@/components/product/GuiaPeninBadge'
import type { Wine } from '@/lib/types'

interface ReviewsProps {
  wine: Wine
}

interface MockReview {
  author: string
  role: string
  rating: number
  text: string
  date: string
}

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }, (_, i) => {
        const filled = i < Math.floor(rating)
        const half = !filled && i < rating
        return (
          <svg
            key={i}
            className={`w-4 h-4 ${
              filled
                ? 'text-gold-400'
                : half
                  ? 'text-gold-400'
                  : 'text-cream-200'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            {half ? (
              <>
                <defs>
                  <linearGradient id={`half-${i}`}>
                    <stop offset="50%" stopColor="currentColor" />
                    <stop offset="50%" stopColor="var(--color-cream-200)" />
                  </linearGradient>
                </defs>
                <path
                  fill={`url(#half-${i})`}
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </>
            ) : (
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            )}
          </svg>
        )
      })}
    </div>
  )
}

function ScoreBar({
  label,
  score,
  maxScore = 100,
}: {
  label: string
  score: number
  maxScore?: number
}) {
  const percentage = (score / maxScore) * 100
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-charcoal-700 w-24 shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-cream-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-burgundy-700 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm font-semibold text-charcoal-900 w-8 text-right">
        {score}
      </span>
    </div>
  )
}

function getMockReviews(wine: Wine): MockReview[] {
  const baseRating = wine.guiaPenin >= 95 ? 5 : wine.guiaPenin >= 93 ? 4.5 : 4

  return [
    {
      author: 'Carlos Delgado',
      role: 'Sommelier, Restaurant Arzak',
      rating: baseRating,
      text: `Een prachtige ${wine.name} die het beste van ${wine.region} laat zien. De ${wine.tastingNotes.nose.slice(0, 2).join(' en ')} op de neus zijn betoverend. Uitstekend bij ${wine.foodPairings[0]?.toLowerCase()}.`,
      date: '2025-11-15',
    },
    {
      author: 'Elena Mart\u00ednez',
      role: 'Wine Director, Hotel Maria Cristina',
      rating: Math.max(baseRating - 0.5, 3.5),
      text: `${wine.winemaker} bewijst opnieuw waarom zij tot de top van Spanje behoren. De ${wine.tastingNotes.finish.toLowerCase()} maakt deze wijn bijzonder geschikt voor fine dining. Een must-have voor elke serieuze wijnkaart.`,
      date: '2025-10-22',
    },
    {
      author: 'Pieter van den Berg',
      role: 'Wijnimporteur, Amsterdam',
      rating: baseRating,
      text: `Al jaren een favoriet in onze selectie. De prijs-kwaliteitverhouding is uitstekend, zeker in het segment van ${wine.price.bottle < 30 ? 'betaalbare' : wine.price.bottle < 60 ? 'premium' : 'top'} wijnen. Klanten zijn altijd enthousiast.`,
      date: '2025-09-08',
    },
  ]
}

export function Reviews({ wine }: ReviewsProps) {
  const reviews = getMockReviews(wine)
  const avgRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length

  // Score breakdown based on Guia Penin
  const appearance = Math.min(wine.guiaPenin - 2, 98)
  const nose = Math.min(wine.guiaPenin - 1, 98)
  const palate = wine.guiaPenin
  const harmony = Math.min(wine.guiaPenin + 1, 100)

  return (
    <div className="space-y-8">
      {/* Main score section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Guia Penin */}
        <div className="bg-white rounded-lg border border-cream-200 p-6 text-center">
          <h3 className="font-heading text-sm text-charcoal-700 mb-4 uppercase tracking-wider">
            Gu\u00eda Pe\u00f1\u00edn
          </h3>
          <div className="flex justify-center mb-4">
            <GuiaPeninBadge score={wine.guiaPenin} size="lg" />
          </div>
          <p className="text-sm text-charcoal-700 mb-2">
            {wine.guiaPenin >= 96
              ? 'Uitzonderlijk'
              : wine.guiaPenin >= 94
                ? 'Excellent'
                : wine.guiaPenin >= 92
                  ? 'Zeer goed'
                  : 'Goed'}
          </p>
          <p className="text-xs text-charcoal-700">
            Professioneel beoordeeld door het Gu\u00eda Pe\u00f1\u00edn panel
          </p>
        </div>

        {/* Score breakdown */}
        <div className="md:col-span-2 bg-white rounded-lg border border-cream-200 p-6">
          <h3 className="font-heading text-sm text-charcoal-700 mb-4 uppercase tracking-wider">
            Score Analyse
          </h3>
          <div className="space-y-3">
            <ScoreBar label="Uiterlijk" score={appearance} />
            <ScoreBar label="Neus" score={nose} />
            <ScoreBar label="Smaak" score={palate} />
            <ScoreBar label="Harmonie" score={harmony} />
          </div>
          <div className="mt-4 pt-4 border-t border-cream-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-charcoal-900">
                Totaalscore
              </span>
              <span className="text-lg font-bold text-burgundy-700">
                {wine.guiaPenin}/100
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading text-lg text-charcoal-900">
            Beoordelingen
          </h3>
          <div className="flex items-center gap-2">
            <StarRating rating={avgRating} />
            <span className="text-sm text-charcoal-700">
              {avgRating.toFixed(1)} ({reviews.length} reviews)
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.author}
              className="bg-white rounded-lg border border-cream-200 p-5"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-charcoal-900 text-sm">
                    {review.author}
                  </p>
                  <p className="text-xs text-charcoal-700">{review.role}</p>
                </div>
                <div className="flex items-center gap-2">
                  <StarRating rating={review.rating} />
                  <span className="text-xs text-charcoal-700">
                    {new Date(review.date).toLocaleDateString('nl-NL', {
                      year: 'numeric',
                      month: 'long',
                    })}
                  </span>
                </div>
              </div>
              <p className="text-sm text-charcoal-700 leading-relaxed">
                {review.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
