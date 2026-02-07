'use client'

import { useState } from 'react'
import { HorecaLogin } from '@/components/horeca/HorecaLogin'
import { HorecaDashboard } from '@/components/horeca/HorecaDashboard'
import type { Wine, Order, CustomerProfile, StaffMember } from '@/lib/types'
import winesData from '@/data/wines.json'
import ordersData from '@/data/orders.json'
import profilesData from '@/data/profiles.json'
import staffData from '@/data/staff.json'

const wines = winesData as Wine[]
const orders = ordersData as Order[]
const profiles = profilesData as CustomerProfile[]
const staff = staffData as StaffMember[]

interface HorecaSession {
  staff: StaffMember
  profile: CustomerProfile
}

export default function HorecaPage() {
  const [session, setSession] = useState<HorecaSession | null>(null)

  if (!session) {
    return (
      <HorecaLogin
        profiles={profiles}
        staffMembers={staff}
        onAuthenticated={(s, p) => setSession({ staff: s, profile: p })}
      />
    )
  }

  const profileOrders = orders.filter((o) => o.customerId === session.profile.id)

  return (
    <HorecaDashboard
      staff={session.staff}
      profile={session.profile}
      wines={wines}
      orders={profileOrders}
      onLogout={() => setSession(null)}
    />
  )
}
