import type { Metadata } from 'next'
import { Playfair_Display, Source_Sans_3, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-accent',
  weight: ['400', '500', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Spanish Terroir | Spaanse Wijnen voor de Nederlandse Gastronomie',
  description: 'Ontdek de finest Spaanse wijnen, geselecteerd voor fine dining en high-end horeca in Nederland. Guía Peñín gecertificeerd.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl" className={`${playfair.variable} ${sourceSans.variable} ${cormorant.variable}`}>
      <body className="min-h-screen flex flex-col bg-cream-50 text-charcoal-800 font-body antialiased">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
