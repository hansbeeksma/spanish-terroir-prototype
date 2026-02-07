'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const quickFilters = [
  { label: 'Rode wijnen', href: '/wijnen?type=red' },
  { label: 'Witte wijnen', href: '/wijnen?type=white' },
  { label: 'Cava & Bubbels', href: '/wijnen?type=sparkling' },
  { label: 'Rosé', href: '/wijnen?type=rose' },
]

export function ShopHero() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/wijnen?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <section className="relative bg-burgundy-800 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-burgundy-800 via-burgundy-800/95 to-charcoal-900/90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,168,75,0.08)_0%,_transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="flex flex-col items-center text-center">
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-cream-50 leading-tight mb-3 tracking-tight">
            Perfecte{' '}
            <span className="text-gold-400">Spaanse Wijnen</span>
          </h1>

          <p className="font-accent text-lg sm:text-xl text-cream-200 italic mb-10">
            Direct van de wijnmaker, Guía Peñín gecertificeerd
          </p>

          {/* Search bar */}
          <form onSubmit={handleSubmit} className="w-full max-w-3xl mb-6">
            <label htmlFor="shop-search" className="sr-only">
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
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>

              <input
                id="shop-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Bijv. een volle rode wijn bij lamsvlees..."
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
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </button>
            </div>
          </form>

          {/* Quick-filter pills */}
          <div className="flex flex-wrap justify-center gap-2 max-w-2xl mb-10">
            {quickFilters.map((filter) => (
              <Link
                key={filter.href}
                href={filter.href}
                className="px-4 py-2 rounded-full border border-cream-50/15 text-cream-200 text-sm font-body hover:bg-cream-50/10 hover:border-cream-50/30 hover:text-cream-50 transition-all duration-200"
              >
                {filter.label}
              </Link>
            ))}
          </div>

          {/* Secondary CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/wijnen"
              className="inline-flex items-center justify-center px-6 py-3 bg-gold-500 text-charcoal-900 text-sm font-semibold rounded-lg hover:bg-gold-400 transition-all duration-200 shadow-lg"
            >
              <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 2h8l-1 7c-.3 2.2-2 4-5 4s-4.7-1.8-5-4L4 2h4Zm4 11v6m-3 0h6" />
              </svg>
              Bekijk alle wijnen
            </Link>
            <Link
              href="/sommelier"
              className="inline-flex items-center justify-center px-6 py-3 border border-cream-50/20 text-cream-50 text-sm font-semibold rounded-lg hover:bg-cream-50/10 transition-all duration-200"
            >
              <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" />
              </svg>
              AI Sommelier
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
