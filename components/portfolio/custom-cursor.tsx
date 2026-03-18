"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    // Check if device has touch capability (mobile/tablet)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      cursor.style.display = 'none';
      follower.style.display = 'none';
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX - 10,
        y: e.clientY - 10,
        duration: 0.1,
        ease: "power2.out",
      });
      gsap.to(follower, {
        x: e.clientX - 20,
        y: e.clientY - 20,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const onMouseEnterLink = () => {
      gsap.to(cursor, { scale: 1.5, duration: 0.2 });
      gsap.to(follower, { scale: 1.5, opacity: 0.5, duration: 0.2 });
    };

    const onMouseLeaveLink = () => {
      gsap.to(cursor, { scale: 1, duration: 0.2 });
      gsap.to(follower, { scale: 1, opacity: 1, duration: 0.2 });
    };

    window.addEventListener("mousemove", onMouseMove);

    const links = document.querySelectorAll("a, button, [data-cursor-hover]");
    links.forEach((link) => {
      link.addEventListener("mouseenter", onMouseEnterLink);
      link.addEventListener("mouseleave", onMouseLeaveLink);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      links.forEach((link) => {
        link.removeEventListener("mouseenter", onMouseEnterLink);
        link.removeEventListener("mouseleave", onMouseLeaveLink);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-5 h-5 rounded-full border-2 border-foreground pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{ transform: "translate(-100px, -100px)" }}
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full bg-foreground/20 pointer-events-none z-[9998] hidden md:block"
        style={{ transform: "translate(-100px, -100px)" }}
      />
    </>
  );
}
