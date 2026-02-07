'use client'

import { useState } from 'react'
import type { CustomerProfile, StaffMember } from '@/lib/types'
import { RestaurantPicker } from './RestaurantPicker'
import { PinPad } from './PinPad'

interface HorecaLoginProps {
  profiles: CustomerProfile[]
  staffMembers: StaffMember[]
  onAuthenticated: (staff: StaffMember, profile: CustomerProfile) => void
}

type Step = 'selectRestaurant' | 'enterPin'

export function HorecaLogin({ profiles, staffMembers, onAuthenticated }: HorecaLoginProps) {
  const [step, setStep] = useState<Step>('selectRestaurant')
  const [selectedProfile, setSelectedProfile] = useState<CustomerProfile | null>(null)

  function handleSelectRestaurant(profile: CustomerProfile) {
    setSelectedProfile(profile)
    setStep('enterPin')
  }

  function handlePinSuccess(staff: StaffMember) {
    if (selectedProfile) {
      onAuthenticated(staff, selectedProfile)
    }
  }

  function handleBack() {
    setSelectedProfile(null)
    setStep('selectRestaurant')
  }

  if (step === 'enterPin' && selectedProfile) {
    const profileStaff = staffMembers.filter((s) => s.profileId === selectedProfile.id)
    return (
      <PinPad
        restaurantName={selectedProfile.restaurantName}
        staffMembers={profileStaff}
        onSuccess={handlePinSuccess}
        onBack={handleBack}
      />
    )
  }

  return (
    <RestaurantPicker
      profiles={profiles}
      onSelect={handleSelectRestaurant}
    />
  )
}
