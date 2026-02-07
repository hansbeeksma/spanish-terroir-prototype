'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface SommelierMessageProps {
  text: string
  sender: 'sommelier' | 'user'
  delay?: number
  onTypingComplete?: () => void
}

function SommelierAvatar() {
  return (
    <div className="w-8 h-8 rounded-full bg-burgundy-700 flex items-center justify-center flex-shrink-0">
      <svg
        className="w-4 h-4 text-gold-400"
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
  )
}

export function SommelierMessage({ text, sender, delay = 0, onTypingComplete }: SommelierMessageProps) {
  const [displayedText, setDisplayedText] = useState(sender === 'user' ? text : '')
  const [isTyping, setIsTyping] = useState(sender === 'sommelier')

  useEffect(() => {
    if (sender !== 'sommelier') return

    let currentIndex = 0
    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        currentIndex += 1
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex))
        } else {
          clearInterval(interval)
          setIsTyping(false)
          onTypingComplete?.()
        }
      }, 18)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(startTimeout)
  }, [text, sender, delay, onTypingComplete])

  if (sender === 'user') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex justify-end"
      >
        <div className="bg-burgundy-700 text-cream-50 px-4 py-3 rounded-2xl rounded-br-sm max-w-[80%] text-sm">
          {text}
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: delay / 1000 }}
      className="flex gap-3 items-start"
    >
      <SommelierAvatar />
      <div className="bg-cream-100 text-charcoal-800 px-4 py-3 rounded-2xl rounded-bl-sm max-w-[80%] text-sm leading-relaxed">
        {displayedText}
        {isTyping && (
          <span className="inline-block w-1 h-4 bg-burgundy-600 ml-0.5 animate-pulse align-text-bottom" />
        )}
      </div>
    </motion.div>
  )
}
