'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Intro() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the decorative line
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Animate text reveal
      const words = textRef.current?.querySelectorAll('.word')
      gsap.fromTo(
        words,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.02,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const statement = "I craft digital experiences that blend thoughtful design with cutting-edge technology. Every pixel has purpose. Every interaction tells a story."
  const words = statement.split(' ').map((word, i) => (
    <span key={i} className="word inline-block mr-[0.3em]">
      {word}
    </span>
  ))

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24 bg-background"
    >
      <div className="max-w-5xl mx-auto">
        {/* Decorative line */}
        <div
          ref={lineRef}
          className="w-24 h-px bg-accent mb-12 origin-left"
        />

        {/* Main statement */}
        <p
          ref={textRef}
          className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-display leading-tight text-foreground tracking-tight text-balance"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {words}
        </p>

        {/* Year indicator */}
        <div className="mt-16 flex items-center gap-4">
          <span className="text-muted-foreground text-sm tracking-widest">SINCE</span>
          <span className="text-foreground text-2xl font-display" style={{ fontFamily: 'var(--font-display)' }}>2019</span>
        </div>
      </div>
    </section>
  )
}
