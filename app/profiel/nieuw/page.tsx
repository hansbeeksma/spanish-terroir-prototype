'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { TasteQuiz } from '@/components/profile/TasteQuiz'
import { ProfileSummary } from '@/components/profile/ProfileSummary'
import { quizAnswersToProfile, getTopMatches, preferencesFromProfile } from '@/lib/profile-engine'
import type { QuizAnswers } from '@/lib/profile-engine'
import type { CustomerProfile, Wine } from '@/lib/types'

import winesData from '@/data/wines.json'

const wines = winesData as Wine[]

export default function NieuwProfielPage() {
  const [generatedProfile, setGeneratedProfile] = useState<CustomerProfile | null>(null)

  const handleQuizComplete = (answers: QuizAnswers) => {
    const profile = quizAnswersToProfile(answers)

    // Calculate match scores for all wines
    const preferences = preferencesFromProfile(profile, answers.foodPairings)
    const matches = getTopMatches(wines, preferences, wines.length)

    const matchScores: Record<string, number> = {}
    for (const match of matches) {
      matchScores[match.wine.slug] = match.score
    }

    setGeneratedProfile({
      ...profile,
      matchScores,
    })
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-burgundy-800 text-cream-50 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-3">
            Stel Je Wijnprofiel Samen
          </h1>
          <p className="text-cream-100 text-lg font-accent max-w-xl mx-auto">
            Beantwoord een paar vragen en ontdek welke Spaanse wijnen perfect passen bij jouw zaak
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {!generatedProfile ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TasteQuiz onComplete={handleQuizComplete} />
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-10"
            >
              {/* Success message */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sage-300/30 mb-4">
                  <span className="text-3xl">{'\u2713'}</span>
                </div>
                <h2 className="font-heading text-2xl font-bold text-charcoal-900 mb-2">
                  Je wijnprofiel is klaar!
                </h2>
                <p className="text-charcoal-700 max-w-md mx-auto">
                  Op basis van jouw voorkeuren hebben we de beste Spaanse wijnen voor je geselecteerd
                </p>
              </div>

              {/* Profile */}
              <ProfileSummary profile={generatedProfile} wines={wines} />

              {/* CTA */}
              <div className="text-center space-y-4">
                <Link href="/wijnen">
                  <Button variant="primary" size="lg">
                    Bekijk je gepersonaliseerde selectie \u2192
                  </Button>
                </Link>
                <div>
                  <button
                    onClick={() => setGeneratedProfile(null)}
                    className="text-sm text-charcoal-700 hover:text-burgundy-700 underline underline-offset-4 transition-colors"
                  >
                    Quiz opnieuw doen
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
