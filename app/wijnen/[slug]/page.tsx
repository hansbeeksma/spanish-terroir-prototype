'use client'

import { use } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import winesData from '@/data/wines.json'
import profilesData from '@/data/profiles.json'
import type { Wine, CustomerProfile } from '@/lib/types'
import { ProductHero } from '@/components/product/ProductHero'
import { StaffelkortingDisplay } from '@/components/product/StaffelkortingDisplay'
import { TastingNotes } from '@/components/product/TastingNotes'
import { WinemakerStory } from '@/components/product/WinemakerStory'
import { TerroirInfo } from '@/components/product/TerroirInfo'
import { FoodPairing } from '@/components/product/FoodPairing'
import { Reviews } from '@/components/product/Reviews'
import { Tabs } from '@/components/ui/Tabs'
import { WineCard } from '@/components/catalog/WineCard'

const wines = winesData as Wine[]
const profiles = profilesData as CustomerProfile[]

// Mock current profile: De Kas (prof-001)
const currentProfile = profiles.find((p) => p.id === 'prof-001')
const matchScores: Record<string, number> = currentProfile?.matchScores ?? {}

function getWineBySlug(slug: string): Wine | undefined {
  return wines.find((w) => w.slug === slug)
}

function getCrossSellWines(wine: Wine): Wine[] {
  // First try same region, then same type
  const sameRegion = wines.filter(
    (w) => w.region === wine.region && w.slug !== wine.slug
  )
  const sameType = wines.filter(
    (w) => w.type === wine.type && w.slug !== wine.slug && w.region !== wine.region
  )
  const combined = [...sameRegion, ...sameType]
  // Deduplicate and limit to 3
  const seen = new Set<string>()
  const result: Wine[] = []
  for (const w of combined) {
    if (!seen.has(w.slug) && result.length < 3) {
      seen.add(w.slug)
      result.push(w)
    }
  }
  return result
}

export default function WineDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)
  const wine = getWineBySlug(slug)

  if (!wine) {
    notFound()
  }

  const crossSellWines = getCrossSellWines(wine)

  const tabs = [
    {
      id: 'tasting',
      label: 'Proefnotities',
      content: <TastingNotes wine={wine} />,
    },
    {
      id: 'winemaker',
      label: 'Wijnmaker',
      content: (
        <WinemakerStory winemakerName={wine.winemaker} story={wine.story} />
      ),
    },
    {
      id: 'terroir',
      label: 'Terroir & Productie',
      content: <TerroirInfo wine={wine} />,
    },
    {
      id: 'pairing',
      label: 'Food Pairing',
      content: <FoodPairing pairings={wine.foodPairings} />,
    },
    {
      id: 'reviews',
      label: 'Reviews & Scores',
      content: <Reviews wine={wine} />,
    },
  ]

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-charcoal-700">
            <Link
              href="/"
              className="hover:text-burgundy-700 transition-colors"
            >
              Home
            </Link>
            <span className="text-cream-200">/</span>
            <Link
              href="/wijnen"
              className="hover:text-burgundy-700 transition-colors"
            >
              Wijnen
            </Link>
            <span className="text-cream-200">/</span>
            <span className="text-charcoal-900 font-medium">{wine.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Product Hero */}
        <section className="mb-10">
          <ProductHero wine={wine} matchScore={matchScores[wine.slug]} />
        </section>

        {/* Staffelkorting */}
        <section className="mb-10">
          <StaffelkortingDisplay price={wine.price} />
        </section>

        {/* Tabs */}
        <section className="mb-12">
          <Tabs tabs={tabs} defaultTab="tasting" />
        </section>

        {/* Cross-sell */}
        {crossSellWines.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-heading text-2xl text-charcoal-900">
                  Vergelijkbare wijnen
                </h2>
                <p className="text-sm text-charcoal-700 mt-1">
                  Op basis van regio en stijl
                </p>
              </div>
              <Link
                href="/wijnen"
                className="text-sm text-burgundy-700 hover:text-burgundy-600 font-medium transition-colors"
              >
                Bekijk alle wijnen &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {crossSellWines.map((w) => (
                <WineCard key={w.slug} wine={w} matchScore={matchScores[w.slug]} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
