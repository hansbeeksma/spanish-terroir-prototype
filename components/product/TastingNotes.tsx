import type { Wine } from '@/lib/types'

interface TastingNotesProps {
  wine: Wine
}

interface RadarPoint {
  label: string
  value: number
}

function RadarChart({ points }: { points: RadarPoint[] }) {
  const size = 240
  const center = size / 2
  const maxRadius = 90
  const levels = 5

  // Calculate positions for each axis
  function getPoint(index: number, value: number): { x: number; y: number } {
    const angle = (Math.PI * 2 * index) / points.length - Math.PI / 2
    const radius = (value / 5) * maxRadius
    return {
      x: center + Math.cos(angle) * radius,
      y: center + Math.sin(angle) * radius,
    }
  }

  function getLabelPoint(index: number): { x: number; y: number } {
    const angle = (Math.PI * 2 * index) / points.length - Math.PI / 2
    const radius = maxRadius + 28
    return {
      x: center + Math.cos(angle) * radius,
      y: center + Math.sin(angle) * radius,
    }
  }

  // Grid lines
  const gridPaths = Array.from({ length: levels }, (_, level) => {
    const levelValue = level + 1
    const gridPoints = points.map((_, i) => getPoint(i, levelValue))
    return gridPoints.map((p) => `${p.x},${p.y}`).join(' ')
  })

  // Data polygon
  const dataPoints = points.map((p, i) => getPoint(i, p.value))
  const dataPath = dataPoints.map((p) => `${p.x},${p.y}`).join(' ')

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[280px] mx-auto">
      {/* Grid */}
      {gridPaths.map((polygon, i) => (
        <polygon
          key={i}
          points={polygon}
          fill="none"
          stroke="var(--color-cream-200)"
          strokeWidth={1}
          opacity={0.8}
        />
      ))}

      {/* Axis lines */}
      {points.map((_, i) => {
        const end = getPoint(i, 5)
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={end.x}
            y2={end.y}
            stroke="var(--color-cream-200)"
            strokeWidth={1}
          />
        )
      })}

      {/* Data area */}
      <polygon
        points={dataPath}
        fill="var(--color-burgundy-700)"
        fillOpacity={0.15}
        stroke="var(--color-burgundy-700)"
        strokeWidth={2}
      />

      {/* Data points */}
      {dataPoints.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={4}
          fill="var(--color-burgundy-700)"
        />
      ))}

      {/* Labels */}
      {points.map((point, i) => {
        const pos = getLabelPoint(i)
        return (
          <text
            key={i}
            x={pos.x}
            y={pos.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-[11px] fill-charcoal-700 font-body"
          >
            <tspan>{point.label}</tspan>
            <tspan
              x={pos.x}
              dy="14"
              className="text-[10px] fill-burgundy-700 font-semibold"
            >
              {point.value}/5
            </tspan>
          </text>
        )
      })}
    </svg>
  )
}

export function TastingNotes({ wine }: TastingNotesProps) {
  const radarPoints: RadarPoint[] = [
    { label: 'Body', value: wine.bodyScore },
    { label: 'Tannine', value: wine.tanninScore },
    { label: 'Zuurgraad', value: wine.acidityScore },
    { label: 'Zoetheid', value: wine.sweetnessScore },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Radar chart */}
      <div>
        <h3 className="font-heading text-lg text-charcoal-900 mb-4">Smaakprofiel</h3>
        <div className="bg-white rounded-lg border border-cream-200 p-6">
          <RadarChart points={radarPoints} />
        </div>
      </div>

      {/* Tasting details */}
      <div className="space-y-6">
        {/* Nose */}
        <div>
          <h3 className="font-heading text-lg text-charcoal-900 mb-3">Neus</h3>
          <div className="flex flex-wrap gap-2">
            {wine.tastingNotes.nose.map((aroma) => (
              <span
                key={aroma}
                className="inline-flex items-center px-3 py-1.5 rounded-full bg-cream-100 text-charcoal-800 text-sm border border-cream-200"
              >
                {aroma}
              </span>
            ))}
          </div>
        </div>

        {/* Palate */}
        <div>
          <h3 className="font-heading text-lg text-charcoal-900 mb-3">Smaak</h3>
          <div className="flex flex-wrap gap-2">
            {wine.tastingNotes.palate.map((descriptor) => (
              <span
                key={descriptor}
                className="inline-flex items-center px-3 py-1.5 rounded-full bg-burgundy-700/10 text-burgundy-700 text-sm border border-burgundy-700/20"
              >
                {descriptor}
              </span>
            ))}
          </div>
        </div>

        {/* Finish */}
        <div>
          <h3 className="font-heading text-lg text-charcoal-900 mb-3">Afdronk</h3>
          <p className="text-charcoal-700 leading-relaxed font-accent text-lg italic">
            &ldquo;{wine.tastingNotes.finish}&rdquo;
          </p>
        </div>
      </div>
    </div>
  )
}
