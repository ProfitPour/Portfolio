"use client";

import { useState } from "react";
import { Hero } from "@/components/portfolio/hero";
import { Intro } from "@/components/portfolio/intro";
import { Projects } from "@/components/portfolio/projects";
import { ParallaxBreak } from "@/components/portfolio/parallax-break";
import { About } from "@/components/portfolio/about";
import { Contact } from "@/components/portfolio/contact";
import { Footer } from "@/components/portfolio/footer";
import { Navigation } from "@/components/portfolio/navigation";
import { CustomCursor } from "@/components/portfolio/custom-cursor";
import { SmoothScroll } from "@/components/portfolio/smooth-scroll";
import { NoiseOverlay } from "@/components/portfolio/noise-overlay";
import { LoadingScreen } from "@/components/portfolio/loading-screen";

export default function PortfolioPage() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <CustomCursor />
      <NoiseOverlay />
      <Navigation />
      <SmoothScroll>
        <main>
          <Hero />
          <Intro />
          <ParallaxBreak text="Design is not just what it looks like — Design is how it works" />
          <Projects />
          <ParallaxBreak text="The details are not the details — They make the design" direction="right" />
          <About />
          <Contact />
          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}
