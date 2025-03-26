"use client"

import { useState, useEffect, useRef } from "react"

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
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const phrases = Array.isArray(text) ? text : [text]
  const currentPhrase = phrases[currentPhraseIndex]

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setIsTyping(true)
    }, delay)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [delay])

  useEffect(() => {
    if (!isTyping || isPaused) return

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    if (!isDeleting) {
      if (currentIndex < currentPhrase.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText((prev) => prev + currentPhrase[currentIndex])
          setCurrentIndex((prev) => prev + 1)
        }, speed)
      } else {
        if (!loop && currentPhraseIndex === phrases.length - 1) {
          return
        }

        setIsPaused(true)
        timeoutRef.current = setTimeout(() => {
          setIsDeleting(true)
          setIsPaused(false)
        }, 2000)
      }
    } else {
      if (displayText.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText((prev) => prev.slice(0, -1))
          setCurrentIndex((prev) => prev - 1)
        }, speed / 2) 
      } else {
        setIsDeleting(false)
        
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length)
        setCurrentIndex(0) 
        
        
        setIsPaused(true)
        timeoutRef.current = setTimeout(() => {
          setIsPaused(false)
        }, 500)
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
