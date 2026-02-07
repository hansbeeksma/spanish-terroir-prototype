interface GuiaPeninBadgeProps {
  score: number
  size?: 'sm' | 'md' | 'lg'
}

export function GuiaPeninBadge({ score, size = 'md' }: GuiaPeninBadgeProps) {
  const sizeClasses = {
    sm: 'w-10 h-10 text-xs',
    md: 'w-14 h-14 text-sm',
    lg: 'w-20 h-20 text-lg',
  }

  const labelSizes = {
    sm: 'text-[8px]',
    md: 'text-[10px]',
    lg: 'text-xs',
  }

  return (
    <div className={`${sizeClasses[size]} rounded-full bg-gold-500 text-charcoal-900 flex flex-col items-center justify-center font-bold shadow-md`}>
      <span>{score}</span>
      <span className={`${labelSizes[size]} font-normal leading-none`}>GP</span>
    </div>
  )
}
