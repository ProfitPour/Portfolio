'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, Mail } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation - character by character
      const chars = titleRef.current?.querySelectorAll('.char')
      gsap.fromTo(
        chars,
        { y: 100, opacity: 0 },
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

      // Content fade in
      gsap.fromTo(
        contentRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const title = "Let's build something exceptional"
  const chars = title.split('').map((char, i) => (
    <span key={i} className="char inline-block">
      {char === ' ' ? '\u00A0' : char}
    </span>
  ))

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24 bg-background"
    >
      {/* Top decorative line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-border" />

      <div className="max-w-4xl mx-auto text-center">
        {/* Label */}
        <span className="text-muted-foreground text-sm tracking-[0.3em] uppercase">
          Get in Touch
        </span>

        {/* Main heading */}
        <h2
          ref={titleRef}
          className="mt-8 text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-foreground tracking-tight leading-tight text-balance"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {chars}
        </h2>

        {/* Contact content */}
        <div ref={contentRef} className="mt-12 space-y-8">
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            {"Have a project in mind? I'd love to hear about it. Let's discuss how we can work together to bring your vision to life."}
          </p>

          {/* Email button */}
          <a
            href="mailto:hello@joshmorrison.co.uk"
            className="group inline-flex items-center gap-4 px-8 py-4 bg-foreground text-background rounded-full hover:bg-accent transition-colors duration-300"
          >
            <Mail className="w-5 h-5" />
            <span className="text-lg font-medium">hello@joshmorrison.co.uk</span>
            <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>


        </div>
      </div>
    </section>
  )
}
