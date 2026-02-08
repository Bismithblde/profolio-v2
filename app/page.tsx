"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import ScrollSmoother from "gsap/dist/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function page() {
  useEffect(() => {
    let smoother = ScrollSmoother.create({
      smooth: 1.5,
      effects: true,
      normalizeScroll: true,
    });

    // Use setTimeout to ensure DOM is ready
    setTimeout(() => {
      // Animate each letter individually
      const letters = document.querySelectorAll(".letter");
      letters.forEach((letter, index) => {
        const isEven = index % 2 === 0;
        const direction = isEven ? -800 : 800; // Even letters go up (-), odd go down (+)

        gsap.to(letter, {
          scrollTrigger: {
            trigger: ".pin-section",
            start: "top top",
            end: "+=2000",
            scrub: 1,
            markers: false,
          },
          y: direction,
        });

        // Fade out after animation completes
        gsap.to(letter, {
          scrollTrigger: {
            trigger: ".pin-section",
            start: "+=2000",
            end: "+=2100",
            scrub: 1,
          },
        });
      });

      // Pin the section AFTER animation completes
      ScrollTrigger.create({
        trigger: ".pin-section",
        pin: true,
        start: "top top",
        end: "+=5000",
      });
    }, 0);

    return () => {
      smoother.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Wrap each letter in a span
  const name = "Ryan Chen";
  const letters = name.split("").map((letter, index) => (
    <span key={index} className="letter inline-block">
      {letter}
    </span>
  ));

  return (
    <div id="smooth-wrapper" className="overflow-hidden h-screen">
      <div id="smooth-content" className="bg-white">
        {/* Viewport-height container - centers name in middle of screen */}
        <div className="pin-section h-screen flex justify-center items-center w-full relative">
          <h1 className="name flex whitespace-pre-wrap text-black text-7xl jetbrains-mono-500">
            {letters}
          </h1>
        </div>

        {/* Extra scroll content below */}
        <div className="h-screen flex justify-center items-center bg-white">
          <p className="text-2xl">Section 2</p>
        </div>

        <div className="h-screen flex justify-center items-center bg-white">
          <p className="text-2xl">Section 3</p>
        </div>

        <div className="h-screen flex justify-center items-center bg-white">
          <p className="text-2xl">Section 4</p>
        </div>
      </div>
    </div>
  );
}
