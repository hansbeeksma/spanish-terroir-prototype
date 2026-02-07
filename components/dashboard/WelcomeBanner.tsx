'use client'

import { motion } from 'framer-motion'

type TenureLevel = 'new' | 'established' | 'veteran'

interface WelcomeBannerProps {
  restaurantName: string
  tenureLevel?: TenureLevel
  tenureMonths?: number
}

const tenureConfig: Record<TenureLevel, {
  greeting: string
  message: (name: string, months: number) => string
  icon: string
}> = {
  new: {
    greeting: 'Welkom',
    message: (name) => `Welkom bij Spanish Terroir, ${name}! Ontdek je eerste selectie.`,
    icon: 'sparkles',
  },
  established: {
    greeting: 'Welkom terug',
    message: (name) => `Goed om je terug te zien, ${name}. Bekijk je nieuwe matches.`,
    icon: 'star',
  },
  veteran: {
    greeting: 'Welkom terug',
    message: (name, months) => {
      const years = Math.floor(months / 12)
      return `Al ${years} jaar partner, ${name}. Bekijk je exclusieve selectie.`
    },
    icon: 'trophy',
  },
}

function BannerIcon({ type }: { type: string }) {
  if (type === 'sparkles') {
    return (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    )
  }
  if (type === 'star') {
    return (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    )
  }
  // trophy
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.023 6.023 0 01-2.77.896m5.25-6.388V2.721" />
    </svg>
  )
}

export function WelcomeBanner({
  restaurantName,
  tenureLevel = 'established',
  tenureMonths = 14,
}: WelcomeBannerProps) {
  const config = tenureConfig[tenureLevel]
  const message = config.message(restaurantName, tenureMonths)

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative rounded-xl overflow-hidden bg-gradient-to-r from-burgundy-800 to-burgundy-700"
    >
      {/* Subtle gold accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(212,168,75,0.12)_0%,_transparent_60%)]" />

      <div className="relative px-6 py-5 flex items-center gap-4">
        <div className="flex-shrink-0 w-11 h-11 rounded-full bg-gold-500/15 flex items-center justify-center text-gold-400">
          <BannerIcon type={config.icon} />
        </div>
        <div>
          <p className="text-cream-50 font-heading text-lg">
            {config.greeting}
          </p>
          <p className="text-cream-200 text-sm mt-0.5">
            {message}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
