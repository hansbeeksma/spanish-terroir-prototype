'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { RestaurantType } from './RestaurantType'
import type { RestaurantType as RestaurantTypeValue } from '@/lib/types'
import type { QuizAnswers } from '@/lib/profile-engine'

const TOTAL_STEPS = 8

interface TasteQuizProps {
  onComplete: (answers: QuizAnswers) => void
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
}

function MultiSelectGrid({
  options,
  selected,
  onToggle,
}: {
  options: string[]
  selected: string[]
  onToggle: (value: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((option) => {
        const isSelected = selected.includes(option)
        return (
          <button
            key={option}
            type="button"
            onClick={() => onToggle(option)}
            className={`
              px-5 py-3 rounded-lg border-2 text-sm font-medium transition-all duration-200
              ${isSelected
                ? 'border-burgundy-700 bg-burgundy-700 text-cream-50'
                : 'border-cream-200 bg-white text-charcoal-800 hover:border-burgundy-600/30'
              }
            `}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}

function LargeOptionButtons({
  options,
  selected,
  onSelect,
}: {
  options: { value: string; label: string; subtitle?: string }[]
  selected: string | null
  onSelect: (value: string) => void
}) {
  return (
    <div className="grid gap-3">
      {options.map((option) => {
        const isSelected = selected === option.value
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onSelect(option.value)}
            className={`
              p-5 rounded-lg border-2 text-left transition-all duration-200
              ${isSelected
                ? 'border-burgundy-700 bg-white shadow-md'
                : 'border-cream-200 bg-white hover:border-burgundy-600/30 hover:shadow-sm'
              }
            `}
          >
            <span className={`block font-heading text-lg font-semibold ${isSelected ? 'text-burgundy-700' : 'text-charcoal-900'}`}>
              {option.label}
            </span>
            {option.subtitle && (
              <span className="block text-sm text-charcoal-700 mt-0.5">{option.subtitle}</span>
            )}
            {isSelected && (
              <div className="mt-2 w-8 h-1 rounded-full bg-gold-400" />
            )}
          </button>
        )
      })}
    </div>
  )
}

function StylePicker({
  selectedStyles,
  selectedTypes,
  onToggleStyle,
  onToggleType,
}: {
  selectedStyles: string[]
  selectedTypes: string[]
  onToggleStyle: (value: string) => void
  onToggleType: (value: string) => void
}) {
  const styles = [
    { value: 'light', label: 'Licht', color: 'bg-gold-400/20 border-gold-400' },
    { value: 'medium', label: 'Medium', color: 'bg-terracotta-500/20 border-terracotta-500' },
    { value: 'full', label: 'Vol', color: 'bg-burgundy-700/20 border-burgundy-700' },
  ]

  const types = [
    { value: 'red', label: 'Rood', color: 'bg-burgundy-700/20 border-burgundy-700' },
    { value: 'white', label: 'Wit', color: 'bg-gold-400/20 border-gold-400' },
    { value: 'rose', label: 'Ros\u00E9', color: 'bg-terracotta-500/15 border-terracotta-500' },
    { value: 'sparkling', label: 'Bubbels', color: 'bg-sage-300/30 border-sage-300' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-charcoal-700 mb-3">Body</p>
        <div className="grid grid-cols-3 gap-3">
          {styles.map((style) => {
            const isSelected = selectedStyles.includes(style.value)
            return (
              <button
                key={style.value}
                type="button"
                onClick={() => onToggleStyle(style.value)}
                className={`
                  p-4 rounded-lg border-2 text-center transition-all duration-200
                  ${isSelected
                    ? `${style.color} shadow-sm`
                    : 'border-cream-200 bg-white hover:border-cream-200/50'
                  }
                `}
              >
                <span className={`block font-heading text-base font-semibold ${isSelected ? 'text-charcoal-900' : 'text-charcoal-700'}`}>
                  {style.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-charcoal-700 mb-3">Type</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {types.map((type) => {
            const isSelected = selectedTypes.includes(type.value)
            return (
              <button
                key={type.value}
                type="button"
                onClick={() => onToggleType(type.value)}
                className={`
                  p-4 rounded-lg border-2 text-center transition-all duration-200
                  ${isSelected
                    ? `${type.color} shadow-sm`
                    : 'border-cream-200 bg-white hover:border-cream-200/50'
                  }
                `}
              >
                <span className={`block font-heading text-base font-semibold ${isSelected ? 'text-charcoal-900' : 'text-charcoal-700'}`}>
                  {type.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function AdventureSlider({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const percentage = ((value - 1) / 9) * 100

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-charcoal-700">Klassiek</span>
        <span className="text-sm font-medium text-charcoal-700">Ontdekking</span>
      </div>
      <div className="relative h-12 flex items-center">
        <div className="absolute inset-x-0 h-3 rounded-full bg-cream-200">
          <div
            className="absolute h-full rounded-full bg-gradient-to-r from-burgundy-800 via-burgundy-700 to-gold-400"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <input
          type="range"
          min={1}
          max={10}
          step={1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="
            absolute inset-x-0 w-full h-3 appearance-none bg-transparent cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-7
            [&::-webkit-slider-thumb]:h-7
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-burgundy-700
            [&::-webkit-slider-thumb]:border-3
            [&::-webkit-slider-thumb]:border-cream-50
            [&::-webkit-slider-thumb]:shadow-lg
            [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:duration-150
            [&::-webkit-slider-thumb]:hover:scale-110
            [&::-moz-range-thumb]:w-7
            [&::-moz-range-thumb]:h-7
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-burgundy-700
            [&::-moz-range-thumb]:border-3
            [&::-moz-range-thumb]:border-cream-50
            [&::-moz-range-thumb]:shadow-lg
          "
        />
      </div>
      <div className="text-center">
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-burgundy-700 text-cream-50 font-heading font-bold text-lg">
          {value}
        </span>
      </div>
    </div>
  )
}

export function TasteQuiz({ onComplete }: TasteQuizProps) {
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)

  // Quiz state
  const [restaurantType, setRestaurantType] = useState<RestaurantTypeValue | null>(null)
  const [cuisines, setCuisines] = useState<string[]>([])
  const [wineListSize, setWineListSize] = useState<string | null>(null)
  const [selectedStyles, setSelectedStyles] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<string | null>(null)
  const [foodPairings, setFoodPairings] = useState<string[]>([])
  const [adventurousness, setAdventurousness] = useState(5)
  const [guiaPenin, setGuiaPenin] = useState<string | null>(null)

  const toggleInArray = useCallback((arr: string[], value: string): string[] => {
    return arr.includes(value)
      ? arr.filter((v) => v !== value)
      : [...arr, value]
  }, [])

  const canProceed = (): boolean => {
    switch (step) {
      case 0: return restaurantType !== null
      case 1: return cuisines.length > 0
      case 2: return wineListSize !== null
      case 3: return selectedStyles.length > 0 && selectedTypes.length > 0
      case 4: return priceRange !== null
      case 5: return foodPairings.length > 0
      case 6: return true // slider always has a value
      case 7: return guiaPenin !== null
      default: return false
    }
  }

  const goNext = () => {
    if (step < TOTAL_STEPS - 1) {
      setDirection(1)
      setStep(step + 1)
    }
  }

  const goPrev = () => {
    if (step > 0) {
      setDirection(-1)
      setStep(step - 1)
    }
  }

  const handleComplete = () => {
    if (!canProceed()) return

    const answers: QuizAnswers = {
      restaurantType: restaurantType!,
      cuisines,
      wineListSize: wineListSize as QuizAnswers['wineListSize'],
      styles: selectedStyles as QuizAnswers['styles'],
      types: selectedTypes as QuizAnswers['types'],
      priceRange: priceRange as QuizAnswers['priceRange'],
      foodPairings,
      adventurousness,
      guiaPeninPreference: guiaPenin as QuizAnswers['guiaPeninPreference'],
    }

    onComplete(answers)
  }

  const steps = [
    {
      title: 'Wie ben je?',
      subtitle: 'Selecteer het type horecazaak',
      content: (
        <RestaurantType
          selected={restaurantType}
          onChange={setRestaurantType}
        />
      ),
    },
    {
      title: 'Wat serveer je?',
      subtitle: 'Kies de keuken(s) die bij jouw zaak passen',
      content: (
        <MultiSelectGrid
          options={['Frans', 'Italiaans', 'Nederlands', 'Aziatisch', 'Fusion', 'Mediterraans', 'Spaans']}
          selected={cuisines}
          onToggle={(v) => setCuisines(toggleInArray(cuisines, v))}
        />
      ),
    },
    {
      title: 'Hoeveel wijnen op je kaart?',
      subtitle: 'Dit helpt ons de juiste breedte aan te bieden',
      content: (
        <LargeOptionButtons
          options={[
            { value: '10-20', label: '10 \u2013 20 wijnen', subtitle: 'Compact en curated' },
            { value: '20-50', label: '20 \u2013 50 wijnen', subtitle: 'Uitgebalanceerd aanbod' },
            { value: '50+', label: '50+ wijnen', subtitle: 'Uitgebreide wijnkaart' },
          ]}
          selected={wineListSize}
          onSelect={setWineListSize}
        />
      ),
    },
    {
      title: 'Welke stijl spreekt aan?',
      subtitle: 'Kies body en type voorkeuren (meerdere mogelijk)',
      content: (
        <StylePicker
          selectedStyles={selectedStyles}
          selectedTypes={selectedTypes}
          onToggleStyle={(v) => setSelectedStyles(toggleInArray(selectedStyles, v))}
          onToggleType={(v) => setSelectedTypes(toggleInArray(selectedTypes, v))}
        />
      ),
    },
    {
      title: 'Prijssegment?',
      subtitle: 'Waar zit het zwaartepunt van je wijnkaart?',
      content: (
        <LargeOptionButtons
          options={[
            { value: 'budget', label: 'Budget', subtitle: 'Onder \u20AC15 per fles' },
            { value: 'mid', label: 'Mid-range', subtitle: '\u20AC15 \u2013 \u20AC30 per fles' },
            { value: 'premium', label: 'Premium', subtitle: '\u20AC30 \u2013 \u20AC60 per fles' },
            { value: 'ultra', label: 'Ultra-premium', subtitle: '\u20AC60+ per fles' },
          ]}
          selected={priceRange}
          onSelect={setPriceRange}
        />
      ),
    },
    {
      title: 'Food pairing focus?',
      subtitle: 'Welke gerechten staan centraal?',
      content: (
        <MultiSelectGrid
          options={['Vlees', 'Vis', 'Vegetarisch', 'Breed']}
          selected={foodPairings}
          onToggle={(v) => setFoodPairings(toggleInArray(foodPairings, v))}
        />
      ),
    },
    {
      title: 'Avontuurlijk of vertrouwd?',
      subtitle: 'Hoe open staan jullie gasten voor onbekende wijnen?',
      content: (
        <AdventureSlider
          value={adventurousness}
          onChange={setAdventurousness}
        />
      ),
    },
    {
      title: 'Gu\u00EDa Pe\u00F1\u00EDn belangrijk?',
      subtitle: 'Hoe zwaar weegt de Spaanse wijnbeoordeling?',
      content: (
        <LargeOptionButtons
          options={[
            { value: 'yes-90', label: 'Ja, minimaal 90+ punten', subtitle: 'Kwaliteit staat voorop' },
            { value: 'somewhat', label: 'Enigszins', subtitle: 'Orienterend maar niet leidend' },
            { value: 'no', label: 'Nee, niet belangrijk', subtitle: 'Smaak gaat boven score' },
          ]}
          selected={guiaPenin}
          onSelect={setGuiaPenin}
        />
      ),
    },
  ]

  const currentStep = steps[step]
  const isLastStep = step === TOTAL_STEPS - 1
  const progress = ((step + 1) / TOTAL_STEPS) * 100

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-charcoal-700 font-medium">
            Stap {step + 1} van {TOTAL_STEPS}
          </span>
          <span className="text-sm text-charcoal-700 font-medium">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-2 bg-cream-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-burgundy-700 to-gold-400 rounded-full"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Step content */}
      <div className="relative overflow-hidden min-h-[400px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="mb-6">
              <h2 className="font-heading text-2xl font-bold text-charcoal-900 mb-1">
                {currentStep.title}
              </h2>
              <p className="text-charcoal-700">
                {currentStep.subtitle}
              </p>
            </div>
            {currentStep.content}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-cream-200">
        <Button
          variant="ghost"
          onClick={goPrev}
          disabled={step === 0}
        >
          \u2190 Vorige
        </Button>

        {isLastStep ? (
          <Button
            variant="primary"
            size="lg"
            onClick={handleComplete}
            disabled={!canProceed()}
          >
            Bekijk je profiel \u2192
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={goNext}
            disabled={!canProceed()}
          >
            Volgende \u2192
          </Button>
        )}
      </div>
    </div>
  )
}
