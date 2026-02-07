'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const benefits = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
    title: 'Gepersonaliseerde Selectie',
    description: 'Op basis van uw keuken, gasten en voorkeuren stellen wij een unieke wijnselectie samen.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
    title: 'Staffelkortingen',
    description: 'Hoe meer u bestelt, hoe voordeliger het wordt. Transparante staffelprijzen vanaf 6 flessen.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
    title: 'Exclusieve Proeverijen',
    description: 'Uitnodigingen voor privé-proeverijen met Spaanse wijnmakers en seizoensgebonden selecties.',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function MembershipCTA() {
  return (
    <section className="relative py-16 lg:py-24 bg-burgundy-800 overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 bg-gradient-to-br from-burgundy-800 via-burgundy-800 to-charcoal-900/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(212,168,75,0.08)_0%,_transparent_50%)]" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gold-500/5 -translate-y-1/2 translate-x-1/3" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="font-accent text-gold-400 italic text-lg mb-3">
            Word lid van Spanish Terroir
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl text-cream-50 mb-4">
            Uw Persoonlijke Wijnpartner
          </h2>
          <p className="text-cream-200 max-w-2xl mx-auto leading-relaxed">
            Ontvang een op maat samengestelde selectie Spaanse wijnen, afgestemd op uw
            keuken, gasten en seizoen. Geen verplichtingen, wel exclusieve voordelen.
          </p>
        </motion.div>

        {/* Benefits */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14"
        >
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.title}
              variants={itemVariants}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gold-500/15 text-gold-400 mb-5">
                {benefit.icon}
              </div>
              <h3 className="font-heading text-lg text-cream-50 mb-3">
                {benefit.title}
              </h3>
              <p className="text-sm text-cream-200 leading-relaxed font-body">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Benchmark + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          {/* Benchmark stat */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cream-50/10 border border-cream-50/15 mb-8">
            <svg className="w-4 h-4 text-gold-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
            </svg>
            <p className="text-sm text-cream-200">
              <span className="font-semibold text-gold-400">8-10%</span>{' '}
              van horeca-professionals kiest voor membership-first
            </p>
          </div>

          <div className="block">
            <Link
              href="/profiel/nieuw"
              className="inline-flex items-center justify-center px-8 py-4 bg-gold-500 text-charcoal-900 font-semibold rounded-lg hover:bg-gold-400 transition-all duration-200 shadow-lg hover:shadow-xl text-base"
            >
              Start je wijnprofiel
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
