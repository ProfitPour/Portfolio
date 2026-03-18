'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text animation for the name
      const chars = titleRef.current?.querySelectorAll('.split-char')
      
      gsap.fromTo(
        chars,
        {
          y: 100,
          opacity: 0,
          rotateX: -90,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.03,
          duration: 1.2,
          ease: 'power4.out',
          delay: 0.3,
        }
      )

      // Subtitle fade in
      gsap.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          delay: 1,
        }
      )

      // Scroll indicator animation
      gsap.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 1.5,
          ease: 'power3.out',
        }
      )

      // Parallax effect on scroll
      gsap.to(titleRef.current, {
        y: 200,
        opacity: 0.3,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      gsap.to(subtitleRef.current, {
        y: 100,
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '50% top',
          scrub: 1,
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // Split the name into individual characters
  const name = 'JOSH MORRISON'
  const splitChars = name.split('').map((char, i) => (
    <span
      key={i}
      className="split-char inline-block"
      style={{ perspective: '1000px' }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ))

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/30" />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--foreground) 1px, transparent 1px),
            linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center px-4 md:px-8">
        <h1
          ref={titleRef}
          className="font-display font-bold leading-none tracking-tighter text-foreground"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 10vw, 9rem)',
          }}
        >
          {splitChars}
        </h1>
        
        <p
          ref={subtitleRef}
          className="mt-6 md:mt-8 text-lg md:text-xl lg:text-2xl text-muted-foreground tracking-widest uppercase"
        >
          Digital Designer & Developer
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-muted-foreground to-transparent" />
      </div>

      {/* Corner accents */}
      <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-muted-foreground/20" />
      <div className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-muted-foreground/20" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-muted-foreground/20" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-muted-foreground/20" />
    </section>
  )
}
