'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { TrendChart } from '@/components/insights/TrendChart'
import { RfmSegmentation } from '@/components/insights/RfmSegmentation'
import { SegmentView } from '@/components/insights/SegmentView'
import { AssortmentAdvice } from '@/components/insights/AssortmentAdvice'
import { GapAnalysis } from '@/components/insights/GapAnalysis'
import { BenchmarkBadge } from '@/components/ui/BenchmarkBadge'
import trends from '@/data/trends.json'
import segments from '@/data/segments.json'
import rfmSegments from '@/data/rfm-segments.json'
import orders from '@/data/orders.json'
import type { TrendData, Segment, RfmSegment, Order } from '@/lib/types'

const typedTrends = trends as TrendData[]
const typedSegments = segments as Segment[]
const typedRfmSegments = rfmSegments as RfmSegment[]
const typedOrders = orders as Order[]

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
  }).format(value)
}

export default function InsightsPage() {
  const metrics = useMemo(() => {
    const totalRevenue = typedTrends.reduce((sum, t) => sum + t.totalRevenue, 0)
    const totalOrdersCount = typedTrends.reduce((sum, t) => sum + t.totalOrders, 0)
    const avgOrderValue = totalRevenue / totalOrdersCount
    const activeCustomers = typedSegments.reduce((sum, s) => sum + s.count, 0)

    // Growth %: compare last 2 months
    const lastMonth = typedTrends[typedTrends.length - 1]
    const prevMonth = typedTrends[typedTrends.length - 2]
    const growth = prevMonth.totalRevenue > 0
      ? ((lastMonth.totalRevenue - prevMonth.totalRevenue) / prevMonth.totalRevenue) * 100
      : 0

    return { totalRevenue, avgOrderValue, activeCustomers, growth }
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-charcoal-700">
        <Link href="/dashboard" className="hover:text-burgundy-700 transition-colors">
          Dashboard
        </Link>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-charcoal-900 font-medium">Importeur Insights</span>
      </nav>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl text-charcoal-900">
            Importeur Insights
          </h1>
          <p className="text-charcoal-700 mt-1">
            Data-gedreven assortimentsadvies
          </p>
        </div>
        <Button
          variant="outline"
          size="md"
          onClick={() => {
            // eslint-disable-next-line no-console
            console.log('Download rapport geactiveerd')
          }}
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>
          Download Rapport
        </Button>
      </div>

      {/* Key Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent>
            <p className="text-xs text-charcoal-700 uppercase tracking-wider mb-1">
              Totale Omzet
            </p>
            <p className="text-2xl font-bold text-burgundy-700 font-heading">
              {formatCurrency(metrics.totalRevenue)}
            </p>
            <p className="text-xs text-charcoal-700 mt-1">
              Afgelopen 6 maanden
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-xs text-charcoal-700 uppercase tracking-wider mb-1">
              Gem. Orderwaarde
            </p>
            <p className="text-2xl font-bold text-gold-500 font-heading">
              {formatCurrency(metrics.avgOrderValue)}
            </p>
            <div className="flex items-center flex-wrap mt-1">
              <span className="text-xs text-charcoal-700">Over alle segmenten</span>
              <BenchmarkBadge
                label="+33% AOV"
                source="Commerce7"
                tooltip="Personalisatie leidt tot gemiddeld +33% hogere orderwaarde (Commerce7 benchmark)"
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-xs text-charcoal-700 uppercase tracking-wider mb-1">
              Actieve Klanten
            </p>
            <p className="text-2xl font-bold text-sage-400 font-heading">
              {metrics.activeCustomers}
            </p>
            <p className="text-xs text-charcoal-700 mt-1">
              4 segmenten
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-xs text-charcoal-700 uppercase tracking-wider mb-1">
              Groei
            </p>
            <div className="flex items-center gap-2">
              <p
                className={`text-2xl font-bold font-heading ${
                  metrics.growth >= 0 ? 'text-sage-400' : 'text-terracotta-500'
                }`}
              >
                {metrics.growth >= 0 ? '+' : ''}
                {metrics.growth.toFixed(1)}%
              </p>
              <svg
                className={`w-5 h-5 ${
                  metrics.growth >= 0 ? 'text-sage-400' : 'text-terracotta-500 rotate-180'
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                />
              </svg>
            </div>
            <div className="flex items-center flex-wrap mt-1">
              <span className="text-xs text-charcoal-700">MoM vergelijking</span>
              <BenchmarkBadge
                label="30-50% open rates"
                source="Segmentatie"
                tooltip="Gesegmenteerde emails resulteren in 30-50% hogere open rates vs. bulk verzending"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trend Chart - Full Width */}
      <TrendChart data={typedTrends} />

      {/* RFM Segmentation - Full Width */}
      <RfmSegmentation segments={typedRfmSegments} />

      {/* Two-Column: Segments + Assortment Advice */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SegmentView segments={typedSegments} />
        <AssortmentAdvice />
      </div>

      {/* Gap Analysis - Full Width */}
      <GapAnalysis />

      {/* Back to Dashboard */}
      <div className="flex justify-center pt-4">
        <Link
          href="/dashboard"
          className="text-burgundy-700 hover:text-burgundy-600 text-sm font-medium transition-colors inline-flex items-center gap-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Terug naar Dashboard
        </Link>
      </div>
    </div>
  )
}
