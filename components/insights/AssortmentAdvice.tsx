import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface GapCard {
  title: string
  description: string
  urgency: 'Hoog' | 'Medium'
  icon: React.ReactNode
}

const gapCards: GapCard[] = [
  {
    title: 'Biologische wijnen',
    description:
      'Groeiende vraag vanuit fine dining en casual segment. Momenteel 0 biologisch gecertificeerde wijnen in assortiment. 34% van klanten heeft hier actief naar gevraagd.',
    urgency: 'Hoog',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
        />
      </svg>
    ),
  },
  {
    title: 'Rose premium segment',
    description:
      'Seizoensvraag stijgt 40% in lente/zomer. Momenteel 0 premium rose wijnen (>20 EUR/fles). Hotels en catering vragen specifiek om kwaliteitsrose voor terrassen en events.',
    urgency: 'Hoog',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
        />
      </svg>
    ),
  },
  {
    title: 'Natuurwijnen',
    description:
      'Trending bij het casual dining segment. Steeds meer restaurants willen een selectie low-intervention wijnen aanbieden. Past bij het groeiende bewustzijn rond duurzaamheid.',
    urgency: 'Medium',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
        />
      </svg>
    ),
  },
]

export function AssortmentAdvice() {
  return (
    <Card>
      <CardHeader>
        <h3 className="font-heading text-lg text-charcoal-900">Gap Analyse</h3>
        <p className="text-xs text-charcoal-700 mt-1">
          Ontbrekende categorieen met marktpotentieel
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {gapCards.map((card) => (
          <div
            key={card.title}
            className="border border-cream-200 rounded-lg p-4 hover:border-burgundy-600/30 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-cream-100 flex items-center justify-center flex-shrink-0 text-burgundy-700">
                {card.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-semibold text-charcoal-900">
                    {card.title}
                  </h4>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      card.urgency === 'Hoog'
                        ? 'bg-terracotta-500/10 text-terracotta-500'
                        : 'bg-gold-400/15 text-gold-600'
                    }`}
                  >
                    {card.urgency}
                  </span>
                </div>
                <p className="text-xs text-charcoal-700 leading-relaxed mb-3">
                  {card.description}
                </p>
                <Button variant="outline" size="sm">
                  Onderzoek
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
