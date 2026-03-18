"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isClient]);

  useEffect(() => {
    if (!isClient) return;

    const container = containerRef.current;
    const progress = progressRef.current;
    const counter = counterRef.current;
    if (!container || !progress || !counter) return;

    const tl = gsap.timeline({
          onComplete: () => {
        gsap.to(container, {
          yPercent: -100,
          duration: 0.8,
          ease: "power3.inOut",
          onComplete: () => {
            document.body.style.overflow = "";
            onComplete();
          },
        });
      },
    });

    // Counter animation
    const obj = { value: 0 };
    tl.to(obj, {
      value: 100,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => {
        counter.textContent = Math.round(obj.value).toString().padStart(3, "0");
      },
    });

    // Progress bar
    tl.to(
      progress,
      {
        scaleX: 1,
        duration: 2,
        ease: "power2.inOut",
      },
      0
    );

    return () => {
      tl.kill();
    };
  }, [onComplete, isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-background z-[10000] flex flex-col items-center justify-center"
    >
      <div className="relative">
        <span
          ref={counterRef}
          className="font-display text-[15vw] md:text-[10vw] font-bold tracking-tighter"
        >
          000
        </span>
      </div>
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-muted overflow-hidden">
        <div
          ref={progressRef}
          className="h-full bg-foreground origin-left"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
      <p className="absolute bottom-10 left-1/2 -translate-x-1/2 text-sm text-muted-foreground tracking-widest uppercase">
        Loading Experience
      </p>
    </div>
  );
}
