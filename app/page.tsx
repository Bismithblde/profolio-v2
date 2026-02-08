"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import ScrollSmoother from "gsap/dist/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function page() {
  useEffect(() => {
    // create smoother FIRST
    let smoother = ScrollSmoother.create({
      smooth: 1.5,
      effects: true,
      normalizeScroll: true,
    });

    // timeline tied to the pinned section that sequences:
    // 1) simultaneous letter "leave" (up/down) using viewport units
    // 2) fade out of letters
    // 3) Projects easing-in from above (pinned so fast scroll follows)
    setTimeout(() => {
      const letters = gsap.utils.toArray<HTMLElement>(".letter");
      const projectsEl = document.querySelector<HTMLElement>(
        ".projects-container",
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".pin-section",
          start: "top top", // pin at the top of the viewport
          end: "+=3600", // extended pin duration so Projects stays pinned longer
          scrub: 1,
          pin: true,
          markers: true,
        },
      });

      // letters move out simultaneously (alternate directions) using viewport height
      tl.to(
        letters,
        {
          y: (i: number) => (i % 2 === 0 ? "-100vh" : "100vh"),
          duration: 1,
          ease: "power1.out",
          stagger: 0, // simultaneous
        },
        0,
      );

      // fade letters out near the end of their travel
      tl.to(
        letters,
        {
          opacity: 0,
          duration: 0.5,
          ease: "none",
        },
        0.7,
      );

      // ensure projects initial state (hidden above)
      if (projectsEl) {
        gsap.set(projectsEl, { y: "-100vh", opacity: 0 });
      }

      // bring Projects in from top — starts after letters have left
      tl.to(
        ".projects-container",
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        },
        1.1, // start later in timeline (after letters move)
      );
    }, 0);

    return () => {
      smoother.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Wrap each letter in a span
  const name = "Ryan Chen";
  const letters = name.split("").map((letter, index) =>
    letter === " " ? (
      <span key={index} className="letter inline-block" aria-hidden="true">
        &nbsp;
      </span>
    ) : (
      <span key={index} className="letter inline-block">
        {letter}
      </span>
    ),
  );

  // Keep projects string static in JSX (we animate .projects-container)
  return (
    <div id="smooth-wrapper" className="overflow-hidden">
      <div id="smooth-content" className="bg-white">
        {/* Pinned section: contains both the name and the Projects overlay */}
        <div className="pin-section h-screen flex items-center justify-center w-full relative overflow-hidden">
          {/* Name: letters on one line, centered in the viewport */}
          <h1 className="name whitespace-nowrap text-black text-7xl jetbrains-mono-500 z-10 mx-auto">
            {letters}
          </h1>

          {/* Projects: absolute at top so it can appear from above while the section is pinned */}
          <h1 className="projects-container absolute top-0 left-0 right-0 flex items-start justify-center text-black text-7xl jetbrains-mono-500 z-20 pointer-events-none pt-6">
            Projects
          </h1>
        </div>

        {/* Following content (appears after pin ends) */}
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
