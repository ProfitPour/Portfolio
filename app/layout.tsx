import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Syne } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-sans',
  display: 'swap',
});

const syne = Syne({ 
  subsets: ["latin"],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Josh Morrison | Digital Designer & Developer',
  description: 'Award-winning digital designer and developer crafting exceptional digital experiences. View my portfolio of innovative web projects.',
  keywords: ['digital designer', 'web developer', 'portfolio', 'UI/UX', 'creative developer'],
  authors: [{ name: 'Josh Morrison' }],
  openGraph: {
    title: 'Josh Morrison | Digital Designer & Developer',
    description: 'Crafting exceptional digital experiences',
    url: 'https://joshmorrison.co.uk',
    siteName: 'Josh Morrison',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Josh Morrison | Digital Designer & Developer',
    description: 'Crafting exceptional digital experiences',
  },
}

export const viewport: Viewport = {
  themeColor: '#111111',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${syne.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground overflow-x-hidden">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
