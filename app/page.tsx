import Link from 'next/link'
import { HeroSection } from '@/components/hero/HeroSection'
import { WineCard } from '@/components/catalog/WineCard'
import { SocialProofBar } from '@/components/shop/SocialProofBar'
import { WineCategories } from '@/components/shop/WineCategories'
import { MembershipCTA } from '@/components/home/MembershipCTA'
import type { Wine, Winemaker } from '@/lib/types'
import wines from '@/data/wines.json'
import winemakers from '@/data/winemakers.json'

const featuredWines = [...(wines as Wine[])]
  .sort((a, b) => b.guiaPenin - a.guiaPenin)
  .slice(0, 6)

const spotlightWinemakers = (winemakers as Winemaker[]).slice(0, 3)

const usps = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
      </svg>
    ),
    title: 'Guia Penin Gecertificeerd',
    description: 'Al onze wijnen scoren minimaal 90 punten in de gerenommeerde Guia Penin, de Spaanse wijnbijbel.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    ),
    title: 'Direct van de Wijnmaker',
    description: 'Geen tussenhandel. Wij werken rechtstreeks samen met 13 zorgvuldig geselecteerde Spaanse wijnmakers.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
    title: 'Persoonlijk Advies',
    description: 'Onze sommeliers helpen je de perfecte wijn te kiezen, afgestemd op jouw smaak en gelegenheid.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.029-.504.887-1.11a60.554 60.554 0 0 0-2.498-8.44c-.36-.838-1.175-1.44-2.087-1.44h-5.377M9 14.25v-4.5m0 0L6.75 7.5M9 9.75l2.25-2.25M3.375 14.25H9" />
      </svg>
    ),
    title: 'Snelle Levering',
    description: 'Binnen 2-3 werkdagen bezorgd. Gratis verzending vanaf 6 flessen.',
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero with segment chooser */}
      <HeroSection />

      {/* Social proof bar */}
      <SocialProofBar />

      {/* Featured Wines */}
      <section className="py-16 lg:py-24 bg-cream-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl text-charcoal-900 mb-3">
              Uitgelichte Wijnen
            </h2>
            <p className="font-accent text-lg text-charcoal-700 italic max-w-2xl mx-auto">
              Onze best beoordeelde wijnen, gesorteerd op Guía Peñín score
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredWines.map((wine) => (
              <WineCard key={wine.slug} wine={wine} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/wijnen"
              className="inline-flex items-center gap-2 text-burgundy-700 font-semibold hover:text-burgundy-600 transition-colors duration-200 group"
            >
              Bekijk alle wijnen
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Wine Categories */}
      <WineCategories />

      {/* Waarom Spanish Terroir - USPs */}
      <section className="py-16 lg:py-24 bg-cream-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="font-heading text-3xl sm:text-4xl text-charcoal-900 mb-3">
              Waarom Spanish Terroir
            </h2>
            <p className="font-accent text-lg text-charcoal-700 italic max-w-2xl mx-auto">
              Kwaliteit en service die u kunt vertrouwen
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {usps.map((usp) => (
              <div
                key={usp.title}
                className="bg-white rounded-xl p-8 shadow-sm border border-cream-200 text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-burgundy-800/5 text-burgundy-700 mb-5">
                  {usp.icon}
                </div>
                <h3 className="font-heading text-lg text-charcoal-900 mb-3">
                  {usp.title}
                </h3>
                <p className="text-sm text-charcoal-700 leading-relaxed font-body">
                  {usp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership CTA */}
      <MembershipCTA />

      {/* Winemaker Spotlights */}
      <section className="py-16 lg:py-24 bg-cream-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl text-charcoal-900 mb-3">
              Onze Wijnmakers
            </h2>
            <p className="font-accent text-lg text-charcoal-700 italic max-w-2xl mx-auto">
              De ambachtslieden achter elke fles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {spotlightWinemakers.map((maker) => (
              <Link
                key={maker.slug}
                href={`/wijnmakers/${maker.slug}`}
                className="group"
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-cream-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                  <div className="relative aspect-[16/10] bg-cream-100 flex items-center justify-center overflow-hidden">
                    <div className="text-5xl opacity-15 group-hover:scale-110 transition-transform duration-500">
                      {maker.region === 'Rioja' ? '🏔' : maker.region === 'Priorat' ? '🌄' : '🌊'}
                    </div>
                    <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-charcoal-900/60 to-transparent" />
                    <div className="absolute bottom-4 left-5 right-5">
                      <span className="text-xs text-cream-50/80 font-body">
                        {maker.region} &middot; Sinds {maker.founded}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-heading text-xl text-charcoal-900 mb-2 group-hover:text-burgundy-700 transition-colors duration-200">
                      {maker.name}
                    </h3>
                    <p className="font-accent text-sm text-gold-600 italic mb-3 line-clamp-2">
                      &ldquo;{maker.philosophy}&rdquo;
                    </p>
                    <p className="text-sm text-charcoal-700 leading-relaxed line-clamp-3 font-body">
                      {maker.story}
                    </p>
                    <div className="mt-4 pt-4 border-t border-cream-100 flex items-center justify-between">
                      <span className="text-xs text-charcoal-700 font-body">
                        {maker.wineCount} wijnen in collectie
                      </span>
                      <span className="text-burgundy-700 text-sm font-semibold group-hover:translate-x-1 transition-transform duration-200 inline-flex items-center gap-1">
                        Ontdek
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/wijnmakers"
              className="inline-flex items-center gap-2 text-burgundy-700 font-semibold hover:text-burgundy-600 transition-colors duration-200 group"
            >
              Bekijk alle wijnmakers
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative bg-burgundy-800 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-burgundy-800 via-burgundy-800/95 to-charcoal-900/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(212,168,75,0.1)_0%,_transparent_60%)]" />

        <div className="relative max-w-4xl mx-auto px-6 py-16 lg:py-20 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl text-cream-50 mb-4">
            Klaar om te ontdekken?
          </h2>
          <p className="font-accent text-lg text-cream-200 italic mb-8 max-w-2xl mx-auto">
            Bekijk onze collectie Spaanse topwijnen of laat onze AI Sommelier u adviseren
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/wijnen"
              className="inline-flex items-center justify-center px-8 py-4 bg-gold-500 text-charcoal-900 font-semibold rounded-lg hover:bg-gold-400 transition-all duration-200 shadow-lg hover:shadow-xl text-base"
            >
              Bekijk de collectie
            </Link>
            <Link
              href="/sommelier"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-cream-50/30 text-cream-50 font-semibold rounded-lg hover:bg-cream-50/10 transition-all duration-200 text-base"
            >
              AI Sommelier
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
