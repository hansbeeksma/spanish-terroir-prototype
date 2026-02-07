type Variant = 'default' | 'wine' | 'score' | 'region' | 'match'

interface BadgeProps {
  variant?: Variant
  children: React.ReactNode
  className?: string
}

const variants: Record<Variant, string> = {
  default: 'bg-cream-200 text-charcoal-800',
  wine: 'bg-burgundy-700 text-cream-50',
  score: 'bg-gold-500 text-charcoal-900 font-bold',
  region: 'bg-sage-300 text-charcoal-900',
  match: 'bg-terracotta-500 text-cream-50',
}

export function Badge({ variant = 'default', className = '', children }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}
