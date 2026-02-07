'use client'

import { useState, useRef, useEffect } from 'react'
import wines from '@/data/wines.json'
import type { Wine } from '@/lib/types'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [suggestions, setSuggestions] = useState<Wine[]>([])
  const wrapperRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleInputChange(query: string) {
    onChange(query)
    if (query.length >= 2) {
      const lower = query.toLowerCase()
      const matches = (wines as Wine[]).filter(
        (w) =>
          w.name.toLowerCase().includes(lower) ||
          w.winemaker.toLowerCase().includes(lower) ||
          w.grapes.some((g) => g.toLowerCase().includes(lower))
      )
      setSuggestions(matches.slice(0, 6))
      setIsOpen(matches.length > 0)
    } else {
      setSuggestions([])
      setIsOpen(false)
    }
  }

  function handleSelect(wine: Wine) {
    onChange(wine.name)
    setIsOpen(false)
    inputRef.current?.blur()
  }

  return (
    <div ref={wrapperRef} className="relative w-full max-w-2xl">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <svg
            className="w-5 h-5 text-charcoal-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => {
            if (suggestions.length > 0) setIsOpen(true)
          }}
          placeholder="Zoek op wijnnaam, wijnmaker of druif..."
          className="w-full bg-cream-100 text-charcoal-800 placeholder-charcoal-700/50 rounded-lg pl-12 pr-4 py-3 text-sm border border-cream-200 focus:outline-none focus:ring-2 focus:ring-burgundy-700 focus:border-transparent transition-all"
        />
        {value && (
          <button
            onClick={() => {
              onChange('')
              setSuggestions([])
              setIsOpen(false)
            }}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-charcoal-700 hover:text-burgundy-700"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-50 mt-1 w-full bg-white rounded-lg shadow-lg border border-cream-200 overflow-hidden">
          {suggestions.map((wine) => (
            <button
              key={wine.slug}
              onClick={() => handleSelect(wine)}
              className="w-full text-left px-4 py-3 hover:bg-cream-50 transition-colors border-b border-cream-100 last:border-b-0"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-charcoal-900">{wine.name}</p>
                  <p className="text-xs text-charcoal-700">
                    {wine.winemaker} &middot; {wine.region} &middot; {wine.vintage}
                  </p>
                </div>
                <span className="text-xs font-medium text-burgundy-700">
                  &euro;{wine.price.bottle.toFixed(2)}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
