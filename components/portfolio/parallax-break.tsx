'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ParallaxBreakProps {
  text: string
  direction?: 'left' | 'right'
}

export function ParallaxBreak({ text, direction = 'left' }: ParallaxBreakProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal scroll effect
      gsap.fromTo(
        textRef.current,
        { x: direction === 'left' ? '10%' : '-10%' },
        {
          x: direction === 'left' ? '-10%' : '10%',
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [direction])

  return (
    <div
      ref={containerRef}
      className="relative py-16 md:py-24 overflow-hidden bg-secondary/50"
    >
      <div
        ref={textRef}
        className="flex whitespace-nowrap"
      >
        {/* Repeat text for seamless effect */}
        {Array.from({ length: 4 }).map((_, i) => (
          <span
            key={i}
            className="text-[15vw] md:text-[12vw] font-display font-bold text-foreground/5 uppercase tracking-tighter mx-8"
            style={{ fontFamily: 'var(--font-display)' }}
            aria-hidden={i > 0}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  )
}
