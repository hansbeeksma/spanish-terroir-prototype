'use client'

import Link from 'next/link'
import { useState } from 'react'
import { NAV_ITEMS } from '@/lib/constants'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-burgundy-800 text-cream-50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-gold-400 text-2xl font-heading font-bold">ST</span>
            <span className="font-heading text-lg hidden sm:block">Spanish Terroir</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-cream-100 hover:text-gold-400 transition-colors text-sm font-medium tracking-wide uppercase"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/profiel"
              className="text-cream-100 hover:text-gold-400 transition-colors text-sm"
            >
              Inloggen
            </Link>
            <Link
              href="/profiel/nieuw"
              className="bg-gold-500 text-charcoal-900 px-4 py-2 rounded text-sm font-semibold hover:bg-gold-400 transition-colors"
            >
              Account Aanmaken
            </Link>
          </div>

          <button
            className="md:hidden text-cream-50 p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 border-t border-burgundy-600 mt-2 pt-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-2 text-cream-100 hover:text-gold-400 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-burgundy-600 flex flex-col gap-2">
              <Link href="/profiel" className="text-cream-100 hover:text-gold-400">
                Inloggen
              </Link>
              <Link
                href="/profiel/nieuw"
                className="bg-gold-500 text-charcoal-900 px-4 py-2 rounded text-sm font-semibold text-center"
              >
                Account Aanmaken
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
