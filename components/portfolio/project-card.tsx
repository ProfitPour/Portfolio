'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface ProjectCardProps {
  title: string
  description: string
  url: string
  image?: string
  index: number
  tags?: string[]
  useIframe?: boolean
}

export function ProjectCard({ title, description, url, image, index, tags = [], useIframe = false }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [iframeLoaded, setIframeLoaded] = useState(false)

  const isEven = index % 2 === 0

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect on image
      gsap.fromTo(
        imageContainerRef.current?.querySelector('.project-image-inner'),
        { y: -50 },
        {
          y: 50,
          ease: 'none',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      )

      // Fade in animation
      gsap.fromTo(
        cardRef.current,
        { 
          y: 100, 
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Content slide in
      gsap.fromTo(
        contentRef.current,
        { 
          x: isEven ? -50 : 50, 
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, cardRef)

    return () => ctx.revert()
  }, [isEven])

  return (
    <div
      ref={cardRef}
      className="relative py-12 md:py-24"
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-16`}>
          {/* Image/Iframe Container */}
          <div
            ref={imageContainerRef}
            className="relative w-full lg:w-3/5 aspect-[16/10] overflow-hidden bg-secondary rounded-sm"
          >
            {useIframe ? (
              <>
                {/* Live site iframe */}
                <div className="project-image-inner absolute inset-0 scale-110 pointer-events-none">
                  <iframe
                    src={url}
                    title={title}
                    className={`w-[200%] h-[200%] border-0 origin-top-left scale-50 transition-opacity duration-500 ${
                      iframeLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => setIframeLoaded(true)}
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin"
                  />
                </div>
                {/* Loading placeholder */}
                {!iframeLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </>
            ) : (
              <div className="project-image-inner absolute inset-0 scale-110">
                {image && (
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 60vw"
                  />
                )}
              </div>
            )}
            
            {/* Overlay on hover */}
            <div 
              className={`absolute inset-0 bg-background/20 backdrop-blur-[2px] transition-opacity duration-500 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            />
            
            {/* View Project indicator */}
            <div 
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <span className="flex items-center gap-2 text-foreground text-lg font-medium tracking-wide">
                View Project
                <ArrowUpRight className="w-5 h-5" />
              </span>
            </div>
          </div>

          {/* Content */}
          <div
            ref={contentRef}
            className={`w-full lg:w-2/5 ${isEven ? 'lg:pr-8' : 'lg:pl-8'}`}
          >
            <span className="text-muted-foreground text-sm tracking-[0.3em] uppercase">
              Project {String(index + 1).padStart(2, '0')}
            </span>
            
            <h3 
              className="mt-4 text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground tracking-tight text-balance"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {title}
            </h3>
            
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              {description}
            </p>

            {tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs tracking-wider uppercase text-muted-foreground border border-border rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Animated underline */}
            <div className="mt-8 flex items-center gap-4 group/link">
              <span className="text-foreground text-sm tracking-widest uppercase group-hover:text-accent transition-colors">
                Explore
              </span>
              <div className="relative h-px flex-1 max-w-24 bg-border overflow-hidden">
                <div 
                  className={`absolute inset-0 bg-accent transition-transform duration-500 origin-left ${
                    isHovered ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </div>
              <ArrowUpRight 
                className={`w-4 h-4 text-foreground transition-transform duration-300 ${
                  isHovered ? 'translate-x-1 -translate-y-1' : ''
                }`}
              />
            </div>
          </div>
        </div>
      </a>
    </div>
  )
}
