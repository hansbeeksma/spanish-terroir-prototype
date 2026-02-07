'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SommelierMessage } from './SommelierMessage'
import { SommelierOption } from './SommelierOption'
import { SommelierResult } from './SommelierResult'
import {
  getSommelierRecommendations,
  getIsabelleNote,
  type Purpose,
  type DinnerCuisine,
  type VenueType,
  type DishChoice,
  type Occasion,
  type PricePref,
  type SommelierAnswers,
  type SommelierRecommendation,
} from '@/lib/sommelier-engine'
import type { Wine } from '@/lib/types'

interface ChatMessage {
  id: string
  text: string
  sender: 'sommelier' | 'user'
}

interface Step {
  question: string
  options: { label: string; value: string }[]
}

const STEP_1: Step = {
  question: 'Welkom! Ik ben Isabelle, jouw persoonlijke sommelier. Waarvoor zoek je een wijn?',
  options: [
    { label: 'Diner met gasten', value: 'dinner' },
    { label: 'Nieuwe wijnkaart samenstellen', value: 'winelist' },
    { label: 'Specifiek gerecht', value: 'dish' },
    { label: 'Iets bijzonders ontdekken', value: 'discover' },
  ],
}

function getStep2(purpose: Purpose): Step {
  switch (purpose) {
    case 'dinner':
      return {
        question: 'Wat voor keuken serveer je?',
        options: [
          { label: 'Vlees & grill', value: 'meat' },
          { label: 'Vis & zeevruchten', value: 'fish' },
          { label: 'Vegetarisch & groenten', value: 'vegetarian' },
          { label: 'Gemengd menu', value: 'mixed' },
        ],
      }
    case 'winelist':
      return {
        question: 'Wat voor zaak heb je?',
        options: [
          { label: 'Fine dining', value: 'fine-dining' },
          { label: 'Casual dining', value: 'casual' },
          { label: 'Hotel restaurant', value: 'hotel' },
          { label: 'Bar & lounge', value: 'bar' },
        ],
      }
    case 'dish':
      return {
        question: 'Bij welk gerecht zoek je een wijn?',
        options: [
          { label: 'Ib\u00e9rico ham', value: 'iberico' },
          { label: 'Gegrilde vis', value: 'fish' },
          { label: 'Lamsrack', value: 'lamb' },
          { label: 'Risotto', value: 'risotto' },
          { label: 'Kaasplank', value: 'cheese' },
        ],
      }
    case 'discover':
      return {
        question: 'Wat is de gelegenheid?',
        options: [
          { label: 'Feestdag', value: 'celebration' },
          { label: 'Zakelijk diner', value: 'business' },
          { label: 'Romantische avond', value: 'romantic' },
          { label: 'Proeverij', value: 'tasting' },
        ],
      }
  }
}

const STEP_3: Step = {
  question: 'Wat is je prijsvoorkeur per fles?',
  options: [
    { label: 'Onder \u20ac25', value: 'under25' },
    { label: '\u20ac25 - \u20ac50', value: '25to50' },
    { label: '\u20ac50+', value: 'over50' },
    { label: 'Prijs maakt niet uit', value: 'any' },
  ],
}

interface SommelierChatProps {
  wines: readonly Wine[]
}

export function SommelierChat({ wines }: SommelierChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [showOptions, setShowOptions] = useState(false)
  const [purpose, setPurpose] = useState<Purpose | null>(null)
  const [subChoice, setSubChoice] = useState<string | null>(null)
  const [recommendations, setRecommendations] = useState<SommelierRecommendation[] | null>(null)
  const [isabelleNote, setIsabelleNote] = useState('')
  const chatEndRef = useRef<HTMLDivElement>(null)
  const [messageCounter, setMessageCounter] = useState(0)

  const scrollToBottom = useCallback(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, showOptions, recommendations, scrollToBottom])

  // Start conversation
  useEffect(() => {
    if (messages.length === 0 && currentStep === 0) {
      setMessages([
        {
          id: 'welcome',
          text: STEP_1.question,
          sender: 'sommelier',
        },
      ])
    }
  }, [messages.length, currentStep])

  const handleTypingComplete = useCallback(() => {
    setShowOptions(true)
  }, [])

  function getCurrentStep(): Step | null {
    switch (currentStep) {
      case 0:
        return STEP_1
      case 1:
        return purpose ? getStep2(purpose) : null
      case 2:
        return STEP_3
      default:
        return null
    }
  }

  function addMessages(newMessages: ChatMessage[]) {
    setMessages((prev) => [...prev, ...newMessages])
    setMessageCounter((prev) => prev + newMessages.length)
  }

  function handleOptionSelect(value: string, label: string) {
    setShowOptions(false)

    const userMsg: ChatMessage = {
      id: `user-${messageCounter}`,
      text: label,
      sender: 'user',
    }

    if (currentStep === 0) {
      setPurpose(value as Purpose)
      const nextStep = getStep2(value as Purpose)
      const sommelierMsg: ChatMessage = {
        id: `sommelier-${messageCounter + 1}`,
        text: nextStep.question,
        sender: 'sommelier',
      }
      addMessages([userMsg, sommelierMsg])
      setCurrentStep(1)
    } else if (currentStep === 1) {
      setSubChoice(value)
      const sommelierMsg: ChatMessage = {
        id: `sommelier-${messageCounter + 1}`,
        text: STEP_3.question,
        sender: 'sommelier',
      }
      addMessages([userMsg, sommelierMsg])
      setCurrentStep(2)
    } else if (currentStep === 2) {
      const price = value as PricePref

      const answers: SommelierAnswers = {
        purpose: purpose!,
        subChoice: subChoice as DinnerCuisine | VenueType | DishChoice | Occasion,
        price,
      }

      const recs = getSommelierRecommendations(wines, answers)
      const note = getIsabelleNote(answers)

      const resultMsg: ChatMessage = {
        id: `sommelier-${messageCounter + 1}`,
        text: `Uitstekend! Op basis van je voorkeuren heb ik ${recs.length} wijnen geselecteerd die perfect passen. Hier zijn mijn aanbevelingen:`,
        sender: 'sommelier',
      }

      addMessages([userMsg, resultMsg])
      setCurrentStep(3)

      // Show results after a slight delay for the typing animation
      setTimeout(() => {
        setRecommendations(recs)
        setIsabelleNote(note)
      }, 800)
    }
  }

  function handleReset() {
    setMessages([])
    setCurrentStep(0)
    setShowOptions(false)
    setPurpose(null)
    setSubChoice(null)
    setRecommendations(null)
    setIsabelleNote('')
    setMessageCounter(0)
  }

  const step = getCurrentStep()

  return (
    <div className="max-w-4xl mx-auto">
      {/* Chat container */}
      <div className="bg-white rounded-xl shadow-sm border border-cream-200 overflow-hidden">
        {/* Chat header */}
        <div className="bg-burgundy-800 px-6 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-burgundy-700 border-2 border-gold-400/50 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-gold-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L3 21h18l-6-8.25M12 3v6.75m-3.75 0h7.5M12 9.75c1.657 0 3-1.007 3-2.25S13.657 5.25 12 5.25 9 6.257 9 7.5s1.343 2.25 3 2.25z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-cream-50 font-heading text-lg">Isabelle</h3>
            <p className="text-cream-200 text-xs">AI Sommelier &middot; Online</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-sage-400 animate-pulse" />
            <span className="text-sage-300 text-xs">Actief</span>
          </div>
        </div>

        {/* Messages area */}
        <div className="p-6 space-y-4 min-h-[300px] max-h-[500px] overflow-y-auto">
          <AnimatePresence mode="popLayout">
            {messages.map((msg) => (
              <SommelierMessage
                key={msg.id}
                text={msg.text}
                sender={msg.sender}
                delay={msg.sender === 'sommelier' ? 300 : 0}
                onTypingComplete={
                  msg.id === messages[messages.length - 1]?.id && msg.sender === 'sommelier' && currentStep < 3
                    ? handleTypingComplete
                    : undefined
                }
              />
            ))}
          </AnimatePresence>

          {/* Options */}
          {showOptions && step && currentStep < 3 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-2 ml-11"
            >
              {step.options.map((option, i) => (
                <SommelierOption
                  key={option.value}
                  label={option.label}
                  onClick={() => handleOptionSelect(option.value, option.label)}
                  index={i}
                />
              ))}
            </motion.div>
          )}

          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Results section (outside chat bubble) */}
      {recommendations && (
        <div className="mt-8">
          <SommelierResult
            recommendations={recommendations}
            isabelleNote={isabelleNote}
            onReset={handleReset}
          />
        </div>
      )}
    </div>
  )
}
