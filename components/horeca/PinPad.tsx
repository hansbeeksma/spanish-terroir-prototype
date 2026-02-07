'use client'

import { useState, useCallback } from 'react'
import type { StaffMember } from '@/lib/types'

interface PinPadProps {
  restaurantName: string
  staffMembers: StaffMember[]
  onSuccess: (staff: StaffMember) => void
  onBack: () => void
}

export function PinPad({ restaurantName, staffMembers, onSuccess, onBack }: PinPadProps) {
  const [digits, setDigits] = useState<string>('')
  const [error, setError] = useState(false)

  const handleDigit = useCallback((digit: string) => {
    setError(false)
    const next = digits + digit
    if (next.length < 4) {
      setDigits(next)
      return
    }

    // 4 digits entered — validate
    setDigits(next)
    const match = staffMembers.find((s) => s.pin === next)
    if (match) {
      onSuccess(match)
    } else {
      setError(true)
      setTimeout(() => {
        setDigits('')
        setError(false)
      }, 600)
    }
  }, [digits, staffMembers, onSuccess])

  const handleBackspace = useCallback(() => {
    setError(false)
    setDigits((prev) => prev.slice(0, -1))
  }, [])

  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'back', '0', 'enter']

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-burgundy-800 px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-burgundy-800 via-burgundy-800/95 to-charcoal-900/90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,168,75,0.06)_0%,_transparent_60%)]" />

      <div className="relative w-full max-w-xs">
        <div className="text-center mb-8">
          <p className="font-accent text-gold-400 italic text-lg mb-1">
            {restaurantName}
          </p>
          <div className="w-12 h-px bg-gold-400/30 mx-auto mb-3" />
          <p className="text-sm text-cream-200/70 font-body">
            Voer je persoonlijke PIN in
          </p>
        </div>

        {/* PIN dots */}
        <div className={`flex justify-center gap-4 mb-8 ${error ? 'animate-shake' : ''}`}>
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full transition-all duration-150 ${
                i < digits.length
                  ? 'bg-gold-400 scale-110'
                  : 'border-2 border-cream-200/30'
              }`}
            />
          ))}
        </div>

        {/* Error message */}
        {error && (
          <p className="text-center text-terracotta-500 text-sm font-body mb-4">
            Ongeldige PIN
          </p>
        )}

        {/* Numpad */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {keys.map((key) => {
            if (key === 'back') {
              return (
                <button
                  key={key}
                  type="button"
                  onClick={handleBackspace}
                  className="w-16 h-16 mx-auto rounded-xl bg-cream-50/5 text-cream-200/60 text-xl hover:bg-cream-50/10 transition-colors duration-150 flex items-center justify-center"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z" />
                  </svg>
                </button>
              )
            }
            if (key === 'enter') {
              return <div key={key} className="w-16 h-16" />
            }
            return (
              <button
                key={key}
                type="button"
                onClick={() => handleDigit(key)}
                className="w-16 h-16 mx-auto rounded-xl bg-cream-50/5 text-cream-50 text-2xl font-heading hover:bg-cream-50/10 active:bg-gold-400/20 transition-colors duration-150"
              >
                {key}
              </button>
            )
          })}
        </div>

        {/* Back link */}
        <button
          type="button"
          onClick={onBack}
          className="w-full text-sm text-cream-200/60 hover:text-cream-200 transition-colors duration-200 font-body flex items-center justify-center gap-1.5"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Ander restaurant
        </button>
      </div>
    </div>
  )
}
