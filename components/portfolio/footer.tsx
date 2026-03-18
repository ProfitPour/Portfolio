'use client'

export function Footer() {
  return (
    <footer className="relative py-8 px-6 md:px-12 lg:px-24 bg-secondary/50 border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Copyright */}
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} Josh Morrison. All rights reserved.
        </p>

        {/* Location */}
        <p className="text-muted-foreground text-sm">
          Based in the United Kingdom
        </p>

        {/* Back to top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-muted-foreground hover:text-foreground transition-colors text-sm uppercase tracking-wider"
        >
          Back to Top ↑
        </button>
      </div>
    </footer>
  )
}
