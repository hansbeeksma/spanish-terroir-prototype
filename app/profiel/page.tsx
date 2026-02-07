'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ProfileSummary } from '@/components/profile/ProfileSummary'
import { PreferenceSliders } from '@/components/profile/PreferenceSliders'
import type { CustomerProfile, Wine, Order } from '@/lib/types'

import profilesData from '@/data/profiles.json'
import winesData from '@/data/wines.json'
import ordersData from '@/data/orders.json'

const profiles = profilesData as CustomerProfile[]
const wines = winesData as Wine[]
const orders = ordersData as Order[]

const statusLabels: Record<Order['status'], { label: string; variant: 'default' | 'wine' | 'score' | 'region' | 'match' }> = {
  pending: { label: 'In afwachting', variant: 'default' },
  confirmed: { label: 'Bevestigd', variant: 'region' },
  shipped: { label: 'Verzonden', variant: 'match' },
  delivered: { label: 'Afgeleverd', variant: 'score' },
}

function bodyFromStyles(styles: string[]): number {
  if (styles.includes('full') && styles.includes('light')) return 3
  if (styles.includes('full')) return 5
  if (styles.includes('medium') && styles.includes('full')) return 4
  if (styles.includes('medium')) return 3
  if (styles.includes('light') && styles.includes('medium')) return 2
  if (styles.includes('light')) return 1
  return 3
}

function priceToSlider(priceRange: string): number {
  switch (priceRange) {
    case 'budget': return 1
    case 'mid': return 2
    case 'premium': return 3
    case 'ultra': return 4
    default: return 2
  }
}

export default function ProfielPage() {
  const [email, setEmail] = useState('')
  const [activeProfile, setActiveProfile] = useState<CustomerProfile | null>(null)
  const [loginError, setLoginError] = useState(false)

  const handleLogin = () => {
    const found = profiles.find((p) => p.email === email.trim().toLowerCase())
    if (found) {
      setActiveProfile(found)
      setLoginError(false)
    } else {
      setLoginError(true)
    }
  }

  const profileOrders = useMemo(() => {
    if (!activeProfile) return []
    return orders.filter((o) => o.customerId === activeProfile.id)
  }, [activeProfile])

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-burgundy-800 text-cream-50 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-3">
            Welkom Terug
          </h1>
          <p className="text-cream-100 text-lg font-accent max-w-xl mx-auto">
            Bekijk je wijnprofiel, pas je voorkeuren aan en ontdek nieuwe matches
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {!activeProfile ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="max-w-md mx-auto">
                <CardContent className="py-8">
                  <h2 className="font-heading text-xl font-semibold text-charcoal-900 mb-2 text-center">
                    Log in met je e-mail
                  </h2>
                  <p className="text-sm text-charcoal-700 text-center mb-6">
                    Voer het e-mailadres in dat gekoppeld is aan je account
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-charcoal-800 mb-1.5">
                        E-mailadres
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          setLoginError(false)
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleLogin()
                        }}
                        placeholder="jouw@email.nl"
                        className="w-full px-4 py-3 rounded-lg border border-cream-200 bg-white text-charcoal-900 placeholder:text-charcoal-700/50 focus:outline-none focus:ring-2 focus:ring-burgundy-700/30 focus:border-burgundy-700 transition-colors"
                      />
                      {loginError && (
                        <p className="text-sm text-terracotta-500 mt-1.5">
                          Geen account gevonden met dit e-mailadres
                        </p>
                      )}
                    </div>

                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full"
                      onClick={handleLogin}
                    >
                      Bekijk mijn profiel
                    </Button>
                  </div>

                  <div className="mt-6 pt-6 border-t border-cream-200 text-center">
                    <p className="text-sm text-charcoal-700 mb-2">Nog geen profiel?</p>
                    <Link href="/profiel/nieuw">
                      <Button variant="outline" size="sm">
                        Maak je wijnprofiel aan
                      </Button>
                    </Link>
                  </div>

                  {/* Demo hint */}
                  <div className="mt-4 p-3 bg-cream-100 rounded-lg">
                    <p className="text-xs text-charcoal-700 text-center">
                      Demo accounts: sophie@dekas.nl, marco@bistrot.nl, elena@grandhotel.nl
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-10"
            >
              {/* Profile summary */}
              <ProfileSummary profile={activeProfile} wines={wines} />

              {/* Preference sliders */}
              <PreferenceSliders
                bodyPreference={bodyFromStyles(activeProfile.preferences.styles)}
                priceRange={priceToSlider(activeProfile.preferences.priceRange)}
                adventurousness={activeProfile.preferences.adventurousness}
                qualityThreshold={activeProfile.preferences.guiaPeninMinimum}
                onChange={() => {
                  // In a real app, this would update preferences via API
                }}
              />

              {/* CTA */}
              <div className="text-center">
                <Link href="/wijnen">
                  <Button variant="primary" size="lg">
                    Bekijk jouw aanbevelingen \u2192
                  </Button>
                </Link>
              </div>

              {/* Recent orders */}
              {profileOrders.length > 0 && (
                <section>
                  <h3 className="font-heading text-xl font-semibold text-charcoal-900 mb-4">
                    Recente Bestellingen
                  </h3>
                  <div className="space-y-4">
                    {profileOrders.map((order) => {
                      const statusInfo = statusLabels[order.status]
                      return (
                        <Card key={order.id}>
                          <CardContent className="py-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <span className="font-heading font-semibold text-charcoal-900">
                                  {order.id}
                                </span>
                                <Badge variant={statusInfo.variant}>
                                  {statusInfo.label}
                                </Badge>
                              </div>
                              <span className="text-sm text-charcoal-700">
                                {new Date(order.date).toLocaleDateString('nl-NL', {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric',
                                })}
                              </span>
                            </div>

                            <div className="space-y-2 mb-3">
                              {order.items.map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between text-sm">
                                  <span className="text-charcoal-800">
                                    {item.wineName} <span className="text-charcoal-700">\u00D7 {item.quantity}</span>
                                  </span>
                                  <span className="text-charcoal-700 tabular-nums">
                                    \u20AC{(item.pricePerBottle * item.quantity).toFixed(2)}
                                  </span>
                                </div>
                              ))}
                            </div>

                            <div className="flex items-center justify-between pt-3 border-t border-cream-100">
                              <span className="text-sm font-medium text-charcoal-700">Totaal</span>
                              <span className="font-heading font-bold text-burgundy-700">
                                \u20AC{order.total.toFixed(2)}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </section>
              )}

              {/* Log out */}
              <div className="text-center pt-4">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setActiveProfile(null)
                    setEmail('')
                  }}
                >
                  Uitloggen
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
