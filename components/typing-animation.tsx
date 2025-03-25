"use client"

import { useState, useEffect } from "react"

interface TypingAnimationProps {
  text: string | string[]
  speed?: number
  delay?: number
  className?: string
  loop?: boolean
}

export default function TypingAnimation({
  text,
  speed = 100,
  delay = 500,
  className = "",
  loop = false,
}: TypingAnimationProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const phrases = Array.isArray(text) ? text : [text]
  const currentPhrase = phrases[currentPhraseIndex]

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTyping(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (!isTyping || isPaused) return

    if (!isDeleting) {
      // Typing
      if (currentIndex < currentPhrase.length) {
        const timeout = setTimeout(() => {
          setDisplayText((prev) => prev + currentPhrase[currentIndex])
          setCurrentIndex((prev) => prev + 1)
        }, speed)

        return () => clearTimeout(timeout)
      } else {
        // Finished typing current phrase
        if (!loop && currentPhraseIndex === phrases.length - 1) {
          // If not looping and on last phrase, stay there
          return
        }

        // Pause at the end of the phrase
        setIsPaused(true)
        const pauseTimeout = setTimeout(() => {
          setIsDeleting(true)
          setIsPaused(false)
        }, 2000) // Pause for 2 seconds at the end of each phrase

        return () => clearTimeout(pauseTimeout)
      }
    } else {
      // Deleting
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText((prev) => prev.slice(0, -1))
          setCurrentIndex((prev) => prev - 1)
        }, speed / 2) // Delete faster than typing

        return () => clearTimeout(timeout)
      } else {
        // Finished deleting
        setIsDeleting(false)

        // Move to next phrase or loop back to first
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length)

        // Pause before starting next phrase
        setIsPaused(true)
        const pauseTimeout = setTimeout(() => {
          setIsPaused(false)
        }, 500) // Short pause before starting next phrase

        return () => clearTimeout(pauseTimeout)
      }
    }
  }, [
    currentIndex,
    isTyping,
    isDeleting,
    isPaused,
    speed,
    currentPhrase,
    currentPhraseIndex,
    phrases.length,
    loop,
    displayText.length,
  ])

  return (
    <span className={className}>
      {displayText}
      {(isTyping && !isPaused && !isDeleting && currentIndex < currentPhrase.length) ||
      (isTyping && !isPaused && isDeleting && displayText.length > 0) ? (
        <span className="inline-block w-[2px] h-[1em] bg-current animate-pulse ml-1"></span>
      ) : null}
    </span>
  )
}

