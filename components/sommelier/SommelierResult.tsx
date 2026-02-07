'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import type { SommelierRecommendation } from '@/lib/sommelier-engine'
import { Card } from '@/components/ui/Card'
import { GuiaPeninBadge } from '@/components/product/GuiaPeninBadge'

interface SommelierResultProps {
  recommendations: SommelierRecommendation[]
  isabelleNote: string
  onReset: () => void
}

const typeIcons: Record<string, string> = {
  red: '/wines/red-icon.svg',
  white: '/wines/white-icon.svg',
  sparkling: '/wines/sparkling-icon.svg',
  rose: '/wines/rose-icon.svg',
  dessert: '/wines/dessert-icon.svg',
}

const typeLabels: Record<string, string> = {
  sparkling: 'Sparkling',
  white: 'Wit',
  rose: 'Ros\u00e9',
  red: 'Rood',
  dessert: 'Dessert',
}

const typeColors: Record<string, string> = {
  sparkling: 'bg-gold-400 text-charcoal-900',
  white: 'bg-cream-200 text-charcoal-800',
  rose: 'bg-pink-200 text-pink-900',
  red: 'bg-burgundy-700 text-cream-50',
  dessert: 'bg-amber-200 text-amber-900',
}

function ScoreBadge({ score }: { score: number }) {
  const bg = score >= 80 ? 'bg-sage-400 text-cream-50' : score >= 60 ? 'bg-gold-500 text-charcoal-900' : 'bg-cream-200 text-charcoal-700'
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${bg}`}>
      {score}% match
    </span>
  )
}

function WineRecommendationCard({ rec, index }: { rec: SommelierRecommendation; index: number }) {
  const { wine, score, reason } = rec

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 * index, ease: 'easeOut' }}
    >
      <Card hover className="h-full">
        <div className="relative aspect-[3/2] bg-cream-100 flex items-center justify-center">
          <div className="text-5xl opacity-20">
            {wine.type === 'red' ? '\uD83C\uDF77' : wine.type === 'white' ? '\uD83E\uDD42' : wine.type === 'sparkling' ? '\uD83C\uDF7E' : wine.type === 'rose' ? '\uD83C\uDF38' : '\uD83C\uDF6F'}
          </div>
          <div className="absolute top-3 left-3">
            <ScoreBadge score={score} />
          </div>
          <div className="absolute top-3 right-3">
            <GuiaPeninBadge score={wine.guiaPenin} size="sm" />
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${typeColors[wine.type] || ''}`}>
              {typeLabels[wine.type]}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-cream-200 text-charcoal-700 font-medium">
              {wine.region}
            </span>
          </div>
          <h3 className="font-heading text-base text-charcoal-900 mb-0.5 line-clamp-1">
            {wine.name}
          </h3>
          <p className="text-xs text-charcoal-700 mb-3">
            {wine.winemaker} &middot; {wine.vintage}
          </p>

          <p className="text-xs text-burgundy-700 italic mb-3 line-clamp-2">
            &ldquo;{reason}&rdquo;
          </p>

          <div className="flex items-end justify-between mb-3">
            <div>
              <span className="text-lg font-bold text-burgundy-700">
                &euro;{wine.price.bottle.toFixed(2)}
              </span>
              <span className="text-xs text-charcoal-700 ml-1">per fles</span>
            </div>
          </div>

          <Link
            href={`/wijnen/${wine.slug}`}
            className="block w-full text-center bg-burgundy-700 text-cream-50 py-2 rounded-md text-sm font-semibold hover:bg-burgundy-600 transition-colors"
          >
            Bekijk in catalogus
          </Link>
        </div>
      </Card>
    </motion.div>
  )
}

export function SommelierResult({ recommendations, isabelleNote, onReset }: SommelierResultProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Isabelle's notitie */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative bg-cream-100 border border-gold-400/30 rounded-xl p-6 overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-1 h-full bg-gold-500" />
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-burgundy-700 flex items-center justify-center flex-shrink-0">
            <svg
              className="w-5 h-5 text-gold-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L3 21h18l-6-8.25M12 3v6.75m-3.75 0h7.5M12 9.75c1.657 0 3-1.007 3-2.25S13.657 5.25 12 5.25 9 6.257 9 7.5s1.343 2.25 3 2.25z"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-burgundy-700 mb-1">Isabelle&apos;s notitie</p>
            <p className="font-accent text-base italic text-charcoal-800 leading-relaxed">
              {isabelleNote}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Wine recommendations grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {recommendations.map((rec, i) => (
          <WineRecommendationCard key={rec.wine.slug} rec={rec} index={i} />
        ))}
      </div>

      {/* Reset CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.8 }}
        className="text-center"
      >
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-6 py-3 border-2 border-burgundy-700 text-burgundy-700 rounded-md font-semibold text-sm hover:bg-burgundy-700 hover:text-cream-50 transition-all duration-200"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
          </svg>
          Nieuwe vraag stellen
        </button>
      </motion.div>
    </motion.div>
  )
}
