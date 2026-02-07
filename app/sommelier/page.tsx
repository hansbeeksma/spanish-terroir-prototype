'use client'

import { motion } from 'framer-motion'
import { SommelierChat } from '@/components/sommelier/SommelierChat'
import winesData from '@/data/wines.json'
import type { Wine } from '@/lib/types'

const wines = winesData as Wine[]

export default function SommelierPage() {
  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero */}
      <div className="bg-burgundy-800 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-burgundy-700/50 px-4 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
              <span className="text-gold-400 text-xs font-medium tracking-wide uppercase">
                AI-Powered
              </span>
            </div>
            <h1 className="font-heading text-3xl md:text-5xl text-cream-50 mb-4">
              Jouw Persoonlijke AI Sommelier
            </h1>
            <p className="text-cream-200 text-lg max-w-2xl mx-auto font-accent leading-relaxed">
              Vertel ons wat je zoekt en onze AI sommelier Isabelle vindt de
              perfecte Spaanse wijnen voor jouw situatie. Gebaseerd op food
              pairing data, stijlprofielen en jarenlange expertise.
            </p>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-8 mt-8"
          >
            <div className="text-center">
              <p className="text-gold-400 font-heading text-2xl font-bold">93%</p>
              <p className="text-cream-200 text-xs">Match nauwkeurigheid</p>
            </div>
            <div className="w-px h-8 bg-burgundy-600" />
            <div className="text-center">
              <p className="text-gold-400 font-heading text-2xl font-bold">47</p>
              <p className="text-cream-200 text-xs">Wijnen in portfolio</p>
            </div>
            <div className="w-px h-8 bg-burgundy-600" />
            <div className="text-center">
              <p className="text-gold-400 font-heading text-2xl font-bold">+6%</p>
              <p className="text-cream-200 text-xs">Cheque gemiddelde</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Chat section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SommelierChat wines={wines} />
      </div>

      {/* How it works */}
      <div className="bg-cream-100 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl text-charcoal-900 text-center mb-10">
            Hoe het werkt
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Vertel ons je context',
                description:
                  'Is het voor een diner, wijnkaart of een specifiek gerecht? Isabelle stelt gerichte vragen om je situatie te begrijpen.',
              },
              {
                step: '02',
                title: 'AI matching',
                description:
                  'Onze engine analyseert food pairings, stijlprofielen, prijssegmenten en Gu\u00eda Pe\u00f1\u00edn scores om de perfecte match te vinden.',
              },
              {
                step: '03',
                title: 'Persoonlijk advies',
                description:
                  'Je ontvangt een shortlist met match scores en een persoonlijke notitie van Isabelle met context-specifieke tips.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 * i }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-burgundy-700 text-gold-400 font-heading text-lg font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="font-heading text-lg text-charcoal-900 mb-2">{item.title}</h3>
                <p className="text-sm text-charcoal-700 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
