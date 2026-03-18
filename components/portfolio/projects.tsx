'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ProjectCard } from './project-card'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: 'Koha Bar & Restaurant',
    description: 'A refined website for a modern Mediterranean bar and restaurant, designed to reflect quality, atmosphere, and a premium dining experience.',
    url: 'https://koha.joshmorrison.co.uk/',
    image: '/images/project-2.png',
    tags: ['UI/UX', 'Web Design', 'Development'],
  },
  {
    title: 'Profit Pour',
    description: 'A modern SaaS solution designed to elevate beverage profitability, offering intuitive margin tracking and advanced analytics for drinks.',
    url: 'https://www.profitpour.co.uk/',
    image: '/images/project-3.png',
    tags: ['UI/UX', 'Web App', 'SaaS'],
  },
  {
    title: 'The Velour',
    description: "A complete branding and web experience crafted for Velour, embracing a slow, immersive digital journey that mirrors the bar's intimate atmosphere.",
    url: 'https://www.thevelour.co.uk/',
    image: '/images/project-1.png',
    tags: ['UI/UX', 'Branding', 'Design'],
  },
  {
    title: 'MCModels',
    description: 'A comprehensive marketplace for Minecraft creators, featuring an intuitive interface for browsing and purchasing premium 3D models and digital assets.',
    url: 'https://mcmodels.net',
    image: '/images/project-4.png',
    tags: ['UI/UX', 'Marketplace', 'Design'],
  },
  {
    title: 'The Beacon Lounge',
    description: 'A modern digital experience for a coastal lounge bar, reflecting its scenic views, lively events, and inviting, social atmosphere.',
    url: 'https://www.thebeaconlounge.co.uk',
    image: '/images/project-5.png',
    tags: ['UI/UX', 'Web Design', 'Web Development'],
  },
]

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-background"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-16 md:mb-24">
          <span className="text-muted-foreground text-sm tracking-[0.3em] uppercase">
            Featured Work
          </span>
          <h2
            ref={titleRef}
            className="mt-4 text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Selected Projects
          </h2>
        </div>

        {/* Projects list */}
        <div className="space-y-16 md:space-y-24">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              {...project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
