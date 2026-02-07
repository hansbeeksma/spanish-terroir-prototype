'use client'

import { useState } from 'react'

export interface Filters {
  types: string[]
  regions: string[]
  grapes: string[]
  priceRange: string
  styles: string[]
  pairings: string[]
  minScore: number
  winemakers: string[]
  search: string
}

export const defaultFilters: Filters = {
  types: [],
  regions: [],
  grapes: [],
  priceRange: '',
  styles: [],
  pairings: [],
  minScore: 0,
  winemakers: [],
  search: '',
}

interface FacetedSearchProps {
  filters: Filters
  onFilterChange: (filters: Filters) => void
}

const WINE_TYPES = [
  { value: 'sparkling', label: 'Sparkling' },
  { value: 'white', label: 'Wit' },
  { value: 'rose', label: 'Ros\u00e9' },
  { value: 'red', label: 'Rood' },
  { value: 'dessert', label: 'Dessert' },
]

const REGIONS = [
  'Rioja',
  'Ribera del Duero',
  'Priorat',
  'R\u00edas Baixas',
  'Rueda',
  'Pened\u00e8s',
  'Jumilla',
  'Bierzo',
  'Jerez',
  'Sierra de Gredos',
]

const GRAPES = [
  'Tempranillo',
  'Garnacha',
  'Albari\u00f1o',
  'Verdejo',
  'Menc\u00eda',
  'Monastrell',
  'Macabeo',
  'Cari\u00f1ena',
]

const PRICE_RANGES = [
  { value: '', label: 'Alle prijzen' },
  { value: 'under20', label: 'Onder \u20ac20' },
  { value: '20-40', label: '\u20ac20 - \u20ac40' },
  { value: '40-70', label: '\u20ac40 - \u20ac70' },
  { value: '70plus', label: '\u20ac70+' },
]

const STYLES = [
  { value: 'light', label: 'Licht' },
  { value: 'medium', label: 'Medium' },
  { value: 'full', label: 'Vol' },
]

const FOOD_PAIRINGS = [
  'Rood Vlees',
  'Wit Vlees',
  'Vis & Zeevruchten',
  'Vegetarisch',
  'Kaas',
  'Wild',
  'Pasta & Rijst',
  'Dessert',
]

const GUIA_PENIN_OPTIONS = [
  { value: 0, label: 'Alle scores' },
  { value: 90, label: '90+' },
  { value: 92, label: '92+' },
  { value: 94, label: '94+' },
  { value: 96, label: '96+' },
]

const WINEMAKERS = [
  'La Rioja Alta',
  '\u00c1lvaro Palacios',
  'Do Ferreiro',
  'Marqu\u00e9s de Murrieta',
  'Bodegas Muga',
  'Ra\u00fal P\u00e9rez',
  'Descendientes de J. Palacios',
  'Gramona',
  'Ossian Vides y Vinos',
  'Bodegas El Nido',
  'Equipo Navazos',
  'Comando G',
]

function FilterSection({
  title,
  defaultOpen = false,
  children,
}: {
  title: string
  defaultOpen?: boolean
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-cream-200 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-3 px-1 text-sm font-semibold text-charcoal-900 hover:text-burgundy-700 transition-colors"
      >
        <span>{title}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && <div className="pb-3 px-1">{children}</div>}
    </div>
  )
}

function CheckboxGroup({
  options,
  selected,
  onChange,
}: {
  options: { value: string; label: string }[]
  selected: string[]
  onChange: (values: string[]) => void
}) {
  function toggle(value: string) {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value))
    } else {
      onChange([...selected, value])
    }
  }

  return (
    <div className="space-y-1.5">
      {options.map((option) => (
        <label
          key={option.value}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <input
            type="checkbox"
            checked={selected.includes(option.value)}
            onChange={() => toggle(option.value)}
            className="w-4 h-4 rounded border-cream-200 text-burgundy-700 focus:ring-burgundy-700 accent-burgundy-700"
          />
          <span className="text-sm text-charcoal-700 group-hover:text-charcoal-900 transition-colors">
            {option.label}
          </span>
        </label>
      ))}
    </div>
  )
}

export function FacetedSearch({ filters, onFilterChange }: FacetedSearchProps) {
  function updateFilter<K extends keyof Filters>(key: K, value: Filters[K]) {
    onFilterChange({ ...filters, [key]: value })
  }

  const activeCount =
    filters.types.length +
    filters.regions.length +
    filters.grapes.length +
    (filters.priceRange ? 1 : 0) +
    filters.styles.length +
    filters.pairings.length +
    (filters.minScore > 0 ? 1 : 0) +
    filters.winemakers.length

  return (
    <div className="bg-white rounded-lg border border-cream-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading text-lg text-charcoal-900">Filters</h2>
        {activeCount > 0 && (
          <button
            onClick={() => onFilterChange({ ...defaultFilters, search: filters.search })}
            className="text-xs text-burgundy-700 hover:text-burgundy-600 font-medium transition-colors"
          >
            Wis alle ({activeCount})
          </button>
        )}
      </div>

      <FilterSection title="Type" defaultOpen>
        <CheckboxGroup
          options={WINE_TYPES}
          selected={filters.types}
          onChange={(v) => updateFilter('types', v)}
        />
      </FilterSection>

      <FilterSection title="Regio" defaultOpen>
        <CheckboxGroup
          options={REGIONS.map((r) => ({ value: r, label: r }))}
          selected={filters.regions}
          onChange={(v) => updateFilter('regions', v)}
        />
      </FilterSection>

      <FilterSection title="Druif">
        <CheckboxGroup
          options={GRAPES.map((g) => ({ value: g, label: g }))}
          selected={filters.grapes}
          onChange={(v) => updateFilter('grapes', v)}
        />
      </FilterSection>

      <FilterSection title="Prijsrange" defaultOpen>
        <div className="space-y-1.5">
          {PRICE_RANGES.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <input
                type="radio"
                name="priceRange"
                checked={filters.priceRange === option.value}
                onChange={() => updateFilter('priceRange', option.value)}
                className="w-4 h-4 border-cream-200 text-burgundy-700 focus:ring-burgundy-700 accent-burgundy-700"
              />
              <span className="text-sm text-charcoal-700 group-hover:text-charcoal-900 transition-colors">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Stijl">
        <CheckboxGroup
          options={STYLES}
          selected={filters.styles}
          onChange={(v) => updateFilter('styles', v)}
        />
      </FilterSection>

      <FilterSection title="Food Pairing">
        <CheckboxGroup
          options={FOOD_PAIRINGS.map((p) => ({ value: p, label: p }))}
          selected={filters.pairings}
          onChange={(v) => updateFilter('pairings', v)}
        />
      </FilterSection>

      <FilterSection title="Gu\u00eda Pe\u00f1\u00edn Score">
        <div className="space-y-1.5">
          {GUIA_PENIN_OPTIONS.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <input
                type="radio"
                name="guiaPenin"
                checked={filters.minScore === option.value}
                onChange={() => updateFilter('minScore', option.value)}
                className="w-4 h-4 border-cream-200 text-burgundy-700 focus:ring-burgundy-700 accent-burgundy-700"
              />
              <span className="text-sm text-charcoal-700 group-hover:text-charcoal-900 transition-colors">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Wijnmaker">
        <CheckboxGroup
          options={WINEMAKERS.map((w) => ({ value: w, label: w }))}
          selected={filters.winemakers}
          onChange={(v) => updateFilter('winemakers', v)}
        />
      </FilterSection>
    </div>
  )
}
