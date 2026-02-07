import Link from 'next/link'

const categories = [
  {
    title: 'Per Regio',
    description: 'Rioja, Priorat, Rías Baixas en meer',
    href: '/wijnen?view=regio',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    ),
  },
  {
    title: 'Per Stijl',
    description: 'Licht, medium of vol — vind jouw smaak',
    href: '/wijnen?view=stijl',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
      </svg>
    ),
  },
  {
    title: 'Per Druif',
    description: 'Tempranillo, Garnacha, Albariño...',
    href: '/wijnen?view=druif',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
  },
  {
    title: 'Top Scores',
    description: 'Guía Peñín 95+ punten selectie',
    href: '/wijnen?minScore=95',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
      </svg>
    ),
  },
]

export function WineCategories() {
  return (
    <section className="py-16 lg:py-20 bg-cream-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl text-charcoal-900 mb-3">
            Ontdek op jouw manier
          </h2>
          <p className="font-accent text-lg text-charcoal-700 italic max-w-2xl mx-auto">
            Navigeer door onze collectie zoals het jou past
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="group bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-cream-200 text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-burgundy-800/5 text-burgundy-700 mb-4 group-hover:bg-burgundy-800/10 group-hover:text-burgundy-600 transition-colors duration-200">
                {cat.icon}
              </div>
              <h3 className="font-heading text-base sm:text-lg text-charcoal-900 mb-2">
                {cat.title}
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed font-body">
                {cat.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
