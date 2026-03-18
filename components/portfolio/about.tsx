'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content reveal
      const contentElements = contentRef.current?.querySelectorAll('.reveal-item')
      gsap.fromTo(
        contentElements,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Stats counter animation
      const statNumbers = statsRef.current?.querySelectorAll('.stat-number')
      statNumbers?.forEach((stat) => {
        const target = parseInt(stat.getAttribute('data-value') || '0')
        gsap.fromTo(
          stat,
          { innerText: '0' },
          {
            innerText: target,
            duration: 2,
            ease: 'power2.out',
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: stat,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24 bg-secondary/30"
    >
      {/* Decorative element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-border" />

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left column - Title and description */}
          <div ref={contentRef}>
            <span className="reveal-item text-muted-foreground text-sm tracking-[0.3em] uppercase">
              About
            </span>
            
            <h2
              className="reveal-item mt-4 text-4xl md:text-5xl font-display font-bold text-foreground tracking-tight text-balance"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Crafting digital experiences with intention
            </h2>
            
            <div className="reveal-item mt-8 space-y-6 text-muted-foreground text-lg leading-relaxed">
              <p>
                {"I'm Josh Morrison, a digital designer and developer based in the UK. I believe in the power of design to transform ideas into meaningful experiences."}
              </p>
              <p>
                With a passion for clean aesthetics and functional innovation, I work with brands and businesses to create digital products that not only look exceptional but perform flawlessly.
              </p>
              <p>
                Every project is an opportunity to push boundaries and deliver something truly memorable.
              </p>
            </div>

            {/* Skills */}
            <div className="reveal-item mt-12">
              <h3 className="text-foreground text-sm tracking-[0.3em] uppercase mb-4">
                Expertise
              </h3>
              <div className="flex flex-wrap gap-3">
                {['UI/UX', 'Design', 'Branding', 'Web Development'].map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 text-sm text-foreground border border-border rounded-full hover:bg-foreground hover:text-background transition-colors duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right column - Stats */}
          <div ref={statsRef} className="flex flex-col justify-center">
            <div className="grid grid-cols-2 gap-8">
              <div className="p-8 border border-border rounded-sm">
                <span 
                  className="stat-number text-5xl md:text-6xl font-display font-bold text-foreground"
                  data-value="50"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  0
                </span>
                <span className="text-4xl md:text-5xl font-display font-bold text-accent" style={{ fontFamily: 'var(--font-display)' }}>+</span>
                <p className="mt-2 text-muted-foreground text-sm uppercase tracking-wider">
                  Projects Completed
                </p>
              </div>
              
              <div className="p-8 border border-border rounded-sm">
                <span 
                  className="stat-number text-5xl md:text-6xl font-display font-bold text-foreground"
                  data-value="5"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  0
                </span>
                <span className="text-4xl md:text-5xl font-display font-bold text-accent" style={{ fontFamily: 'var(--font-display)' }}>+</span>
                <p className="mt-2 text-muted-foreground text-sm uppercase tracking-wider">
                  Years Experience
                </p>
              </div>
              
              <div className="p-8 border border-border rounded-sm">
                <span 
                  className="stat-number text-5xl md:text-6xl font-display font-bold text-foreground"
                  data-value="30"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  0
                </span>
                <span className="text-4xl md:text-5xl font-display font-bold text-accent" style={{ fontFamily: 'var(--font-display)' }}>+</span>
                <p className="mt-2 text-muted-foreground text-sm uppercase tracking-wider">
                  Happy Clients
                </p>
              </div>
              
              <div className="p-8 border border-border rounded-sm">
                <span 
                  className="stat-number text-5xl md:text-6xl font-display font-bold text-foreground"
                  data-value="100"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  0
                </span>
                <span className="text-4xl md:text-5xl font-display font-bold text-accent" style={{ fontFamily: 'var(--font-display)' }}>%</span>
                <p className="mt-2 text-muted-foreground text-sm uppercase tracking-wider">
                  Dedication
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
