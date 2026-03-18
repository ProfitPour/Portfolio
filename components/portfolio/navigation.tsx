'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-background/80 backdrop-blur-md border-b border-border'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-4 md:py-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="text-foreground font-display font-bold text-xl tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            JM<span className="text-accent">.</span>
          </a>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { name: 'Work', id: 'work' },
              { name: 'About', id: 'about' },
              { name: 'Contact', id: 'contact' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm uppercase tracking-widest"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative w-8 h-8 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-4">
              <span
                className={cn(
                  'absolute left-0 w-full h-px bg-foreground transition-all duration-300',
                  isMenuOpen ? 'top-1/2 rotate-45' : 'top-0'
                )}
              />
              <span
                className={cn(
                  'absolute left-0 top-1/2 w-full h-px bg-foreground transition-all duration-300',
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                )}
              />
              <span
                className={cn(
                  'absolute left-0 w-full h-px bg-foreground transition-all duration-300',
                  isMenuOpen ? 'top-1/2 -rotate-45' : 'bottom-0'
                )}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-background transition-all duration-500 md:hidden',
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {[
            { name: 'Work', id: 'work' },
            { name: 'About', id: 'about' },
            { name: 'Contact', id: 'contact' },
          ].map((item, i) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                'text-4xl font-display font-bold text-foreground hover:text-accent transition-all duration-300',
                isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              )}
              style={{ 
                transitionDelay: isMenuOpen ? `${i * 100}ms` : '0ms',
                fontFamily: 'var(--font-display)'
              }}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
