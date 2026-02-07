'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import winesData from '@/data/wines.json'
import type { Wine } from '@/lib/types'

const wines = winesData as Wine[]

const popularWines = [...wines]
  .sort((a, b) => b.guiaPenin - a.guiaPenin)
  .slice(0, 6)

type Segment = 'particulier' | 'horeca'

const segmentConfig = {
  particulier: {
    placeholder: 'Bijv. een volle rode wijn bij lamsvlees...',
    pills: popularWines.map((wine) => ({
      label: wine.name,
      href: `/wijnen/${wine.slug}`,
    })),
    ctas: [
      { label: 'Bekijk alle wijnen', href: '/wijnen', icon: 'wine' },
      { label: 'AI Sommelier', href: '/sommelier', icon: 'sparkle' },
    ],
  },
  horeca: {
    placeholder: 'Bijv. cava voor aperitief, Ribera del Duero rood...',
    pills: [
      { label: 'Snel bijbestellen', href: '/profiel' },
      { label: 'Advies bij een gerecht', href: '/sommelier' },
      { label: 'Mijn wijnprofiel', href: '/profiel' },
      { label: 'Alle wijnen', href: '/wijnen' },
    ],
    ctas: [
      { label: 'Haal je profiel op', href: '/profiel', icon: 'user' },
      { label: 'Stel je wijnprofiel samen', href: '/profiel/nieuw', icon: 'sparkle' },
    ],
  },
} as const

function CtaIcon({ type }: { type: string }) {
  if (type === 'wine') {
    return (
      <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 2h8l-1 7c-.3 2.2-2 4-5 4s-4.7-1.8-5-4L4 2h4Zm4 11v6m-3 0h6" />
      </svg>
    )
  }
  if (type === 'user') {
    return (
      <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    )
  }
  return (
    <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" />
    </svg>
  )
}

export function HeroSection() {
  const [query, setQuery] = useState('')
  const [segment, setSegment] = useState<Segment | null>(null)
  const router = useRouter()

  const activeSegment: Segment = segment ?? 'particulier'
  const config = segmentConfig[activeSegment]
  const showBanner = segment === null

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/wijnen?q=${encodeURIComponent(query.trim())}`)
    }
  }

  function handleSegmentChoice(choice: Segment) {
    if (choice === 'horeca') {
      router.push('/horeca')
      return
    }
    setSegment(choice)
  }

  return (
    <>
      <section className="relative bg-burgundy-800 overflow-hidden">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-burgundy-800 via-burgundy-800/95 to-charcoal-900/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,168,75,0.08)_0%,_transparent_60%)]" />

        <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-24">
          <div className="flex flex-col items-center text-center">
            {/* Heading */}
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-cream-50 leading-tight mb-3 tracking-tight">
              Perfecte{' '}
              <span className="text-gold-400">Spaanse Wijnen</span>
            </h1>

            {/* Subtitle */}
            <p className="font-accent text-lg sm:text-xl text-cream-200 italic mb-10">
              Voor horeca en wijnliefhebbers
            </p>

            {/* Search bar */}
            <form onSubmit={handleSubmit} className="w-full max-w-3xl mb-6">
              <label htmlFor="hero-search" className="sr-only">
                Zoek wijnen
              </label>
              <div className="flex items-center gap-2 rounded-full border-2 border-cream-50/20 bg-cream-50/5 backdrop-blur-sm px-4 sm:px-5 py-3 sm:py-4 focus-within:border-gold-400 focus-within:shadow-[0_0_20px_rgba(212,168,75,0.2)] transition-all duration-200">
                <svg
                  className="w-5 h-5 flex-shrink-0 text-cream-200/50"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z"
                  />
                </svg>

                <input
                  id="hero-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={config.placeholder}
                  className="flex-1 bg-transparent text-cream-50 text-sm sm:text-base lg:text-lg font-body placeholder:text-cream-200/40 focus:outline-none"
                />

                <button
                  type="submit"
                  className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-gold-500 text-charcoal-900 hover:bg-gold-400 transition-colors duration-200"
                  aria-label="Zoek"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
                    />
                  </svg>
                </button>
              </div>
            </form>

            {/* Quick-action pills */}
            <div className="flex flex-wrap justify-center gap-2 max-w-2xl mb-10">
              {config.pills.map((pill) => (
                <Link
                  key={pill.href + pill.label}
                  href={pill.href}
                  className="px-3 py-1.5 rounded-full border border-cream-50/15 text-cream-200 text-xs sm:text-sm font-body hover:bg-cream-50/10 hover:border-cream-50/30 hover:text-cream-50 transition-all duration-200"
                >
                  {pill.label}
                </Link>
              ))}
            </div>

            {/* Secondary CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              {config.ctas.map((cta) => (
                <Link
                  key={cta.href + cta.label}
                  href={cta.href}
                  className="inline-flex items-center justify-center px-6 py-3 border border-cream-50/20 text-cream-50 text-sm font-semibold rounded-lg hover:bg-cream-50/10 transition-all duration-200"
                >
                  <CtaIcon type={cta.icon} />
                  {cta.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Segment chooser — cookie-banner style overlay */}
      {showBanner && (
        <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-none">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-charcoal-900/40 backdrop-blur-[2px] pointer-events-auto" />

          {/* Banner */}
          <div className="relative w-full pointer-events-auto bg-burgundy-800 border-t-2 border-gold-400/30 shadow-[0_-8px_30px_rgba(0,0,0,0.3)] animate-slide-up">
            <div className="max-w-3xl mx-auto px-6 py-8 sm:py-10">
              <p className="text-center font-heading text-xl sm:text-2xl text-cream-50 mb-2">
                Welkom bij Spanish Terroir
              </p>
              <p className="text-center text-sm text-cream-200/70 font-body mb-6">
                Hoe kunnen we je het beste helpen?
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Particulier */}
                <button
                  type="button"
                  onClick={() => handleSegmentChoice('particulier')}
                  className="group rounded-xl border-2 border-cream-50/15 bg-cream-50/5 p-5 text-left cursor-pointer hover:border-gold-400 hover:bg-cream-50/10 transition-all duration-200"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 text-cream-200 group-hover:text-gold-400 transition-colors duration-200">
                      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 2h8l-1 7c-.3 2.2-2 4-5 4s-4.7-1.8-5-4L4 2h4Zm4 11v6m-3 0h6" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="font-heading text-lg text-cream-50 mb-0.5">Wijnliefhebber</h2>
                      <p className="text-sm text-cream-200/70 font-body">
                        Ontdek en bestel bijzondere Spaanse wijnen
                      </p>
                    </div>
                  </div>
                </button>

                {/* Horeca */}
                <button
                  type="button"
                  onClick={() => handleSegmentChoice('horeca')}
                  className="group rounded-xl border-2 border-cream-50/15 bg-cream-50/5 p-5 text-left cursor-pointer hover:border-gold-400 hover:bg-cream-50/10 transition-all duration-200"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 text-cream-200 group-hover:text-gold-400 transition-colors duration-200">
                      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="font-heading text-lg text-cream-50 mb-0.5">Horeca & Zakelijk</h2>
                      <p className="text-sm text-cream-200/70 font-body">
                        Snel bijbestellen, wijnkaart advies of profiel beheren
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
