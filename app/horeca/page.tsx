'use client'

import { useState } from 'react'
import { HorecaLogin } from '@/components/horeca/HorecaLogin'
import { HorecaDashboard } from '@/components/horeca/HorecaDashboard'
import type { Wine, Order } from '@/lib/types'
import winesData from '@/data/wines.json'
import ordersData from '@/data/orders.json'

const wines = winesData as Wine[]
const orders = ordersData as Order[]

export default function HorecaPage() {
  const [identity, setIdentity] = useState<string | null>(null)

  if (!identity) {
    return <HorecaLogin onAuthenticated={setIdentity} />
  }

  return (
    <HorecaDashboard
      identity={identity}
      wines={wines}
      orders={orders}
      onLogout={() => setIdentity(null)}
    />
  )
}
