'use client'

import { useState, useCallback } from 'react'

interface SliderConfig {
  id: string
  label: string
  leftLabel: string
  rightLabel: string
  min: number
  max: number
  step: number
  value: number
}

interface PreferenceSlidersProps {
  bodyPreference: number
  priceRange: number
  adventurousness: number
  qualityThreshold: number
  onChange: (values: {
    bodyPreference: number
    priceRange: number
    adventurousness: number
    qualityThreshold: number
  }) => void
}

function SliderTrack({ config, onChange }: { config: SliderConfig; onChange: (id: string, value: number) => void }) {
  const percentage = ((config.value - config.min) / (config.max - config.min)) * 100

  return (
    <div className="mb-8 last:mb-0">
      <div className="flex items-center justify-between mb-2">
        <label className="font-heading text-sm font-semibold text-charcoal-900">
          {config.label}
        </label>
        <span className="text-sm font-medium text-burgundy-700 tabular-nums">
          {config.id === 'qualityThreshold' ? config.value : config.value}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-charcoal-700 w-24 text-right shrink-0">
          {config.leftLabel}
        </span>
        <div className="relative flex-1 h-10 flex items-center">
          <div className="absolute inset-x-0 h-2 rounded-full bg-cream-200">
            <div
              className="absolute h-full rounded-full bg-gradient-to-r from-burgundy-700 to-burgundy-600"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <input
            type="range"
            min={config.min}
            max={config.max}
            step={config.step}
            value={config.value}
            onChange={(e) => onChange(config.id, Number(e.target.value))}
            className="
              absolute inset-x-0 w-full h-2 appearance-none bg-transparent cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-5
              [&::-webkit-slider-thumb]:h-5
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-burgundy-700
              [&::-webkit-slider-thumb]:border-2
              [&::-webkit-slider-thumb]:border-cream-50
              [&::-webkit-slider-thumb]:shadow-md
              [&::-webkit-slider-thumb]:transition-transform
              [&::-webkit-slider-thumb]:duration-150
              [&::-webkit-slider-thumb]:hover:scale-110
              [&::-moz-range-thumb]:w-5
              [&::-moz-range-thumb]:h-5
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-burgundy-700
              [&::-moz-range-thumb]:border-2
              [&::-moz-range-thumb]:border-cream-50
              [&::-moz-range-thumb]:shadow-md
            "
          />
        </div>
        <span className="text-xs text-charcoal-700 w-24 shrink-0">
          {config.rightLabel}
        </span>
      </div>
    </div>
  )
}

export function PreferenceSliders({
  bodyPreference,
  priceRange,
  adventurousness,
  qualityThreshold,
  onChange,
}: PreferenceSlidersProps) {
  const [values, setValues] = useState({
    bodyPreference,
    priceRange,
    adventurousness,
    qualityThreshold,
  })

  const handleChange = useCallback((id: string, value: number) => {
    const updated = { ...values, [id]: value }
    setValues(updated)
    onChange(updated)
  }, [values, onChange])

  const sliders: SliderConfig[] = [
    {
      id: 'bodyPreference',
      label: 'Body Voorkeur',
      leftLabel: 'Licht',
      rightLabel: 'Vol',
      min: 1,
      max: 5,
      step: 1,
      value: values.bodyPreference,
    },
    {
      id: 'priceRange',
      label: 'Prijsrange',
      leftLabel: 'Budget',
      rightLabel: 'Ultra-premium',
      min: 1,
      max: 4,
      step: 1,
      value: values.priceRange,
    },
    {
      id: 'adventurousness',
      label: 'Avontuurlijkheid',
      leftLabel: 'Klassiek',
      rightLabel: 'Ontdekking',
      min: 1,
      max: 10,
      step: 1,
      value: values.adventurousness,
    },
    {
      id: 'qualityThreshold',
      label: 'Kwaliteitsdrempel (Guia Penin)',
      leftLabel: '88',
      rightLabel: '98',
      min: 88,
      max: 98,
      step: 1,
      value: values.qualityThreshold,
    },
  ]

  return (
    <div className="bg-white rounded-lg border border-cream-200 p-6">
      <h3 className="font-heading text-lg font-semibold text-charcoal-900 mb-6">
        Pas je voorkeuren aan
      </h3>
      {sliders.map((slider) => (
        <SliderTrack key={slider.id} config={slider} onChange={handleChange} />
      ))}
    </div>
  )
}
