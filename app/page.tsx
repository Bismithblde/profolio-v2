"use client";
import React, { useEffect } from "react";
import { Black_Ops_One, JetBrains_Mono } from "next/font/google";
import gsap, { snap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import ScrollSmoother from "gsap/dist/ScrollSmoother";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}
const blackOpsOne = Black_Ops_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-black-ops-one",
});
const jetBrainsMonoLarge = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["800"],
  variable: "--font-jetbrains-mono",
});
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-jetbrains-mono",
});
export default function page() {
  useEffect(() => {
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1,
      effects: true,
      normalizeScroll: true,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".name-div",
        start: "center center",
        end: "+=1500",
        scrub: 1,
        markers: true,
        pin: true,
        snap: {
          snapTo: "labels",
          duration: 0.5, // duration of snap animation
          ease: "power2.inOut",
          delay: 0.1, // small delay before snapping
        },
        id: "name-pin", // helps with debugging
      },
    });

    tl.to(".name1", { x: "-1350", ease: "power1.out" }, 0);
    tl.to(".name2", { x: "1350", ease: "power1.out" }, 0);

    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".project-div",
        start: "top-=750 100%", // starts when entering viewport
        end: "center center-=1000", // extends PAST center by 500px
        scrub: 1,
        markers: true,
        id: "pin",
      },
    });

    tl2.fromTo(
      ".project-div",
      { x: -2000, opacity: 0 },
      { x: 0, opacity: 1, ease: "power2.out" },
    );

    // Timeline 2: Pin it once it's centered
    gsap.timeline({
      scrollTrigger: {
        trigger: ".project-div",
        start: "center center", // pin when centered
        end: "+=1000", // keep pinned for 1000px
        scrub: 1,
        pin: true,
        markers: true,
      },
    });
    ScrollTrigger.create({
      snap: {
        snapTo: [0, 0.7],
        duration: 1.2,
        ease: "power2.inOut",
      },
      onRefresh: (self) => {
        if (window.scrollY === 0) {
          self.disable();
          setTimeout(() => self.enable(), 100); // re-enable after a short delay
        }
      },
    });
    return () => {
      // cleanup
      smoother?.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
  return (
    <div id="smooth-wrapper" className="overflow-hidden">
      <div id="smooth-content">
        <div className="name-div flex justify-center items-center h-screen">
          <div className="flex flex-col">
            <div className="flex flex-col items-center gap-0">
              <h1
                className={`text-center text-[#fcf5e6] text-[175px]  ${blackOpsOne.className} pr-40 name1 leading-50`}
              >
                Ryan
              </h1>
              <h1
                className={`text-center text-[#fcf5e6] text-[175px] -mt-6 ${blackOpsOne.className} pl-40 name2 leading-50`}
              >
                Chen
              </h1>
            </div>
          </div>
        </div>
        <div className="flex justify-center project-div h-screen items-center flex-col">
          <h1
            className={`text-[#fcf5e6] text-[100px] ${blackOpsOne.className} text-center`}
          >
            About Me:
          </h1>
          <h2
            className={`text-4xl text-[#fcf5e6] ${jetBrainsMono.className} w-1/2 text-center `}
          >
            Hi ! I'm Ryan a full stack software engineer based in New York. I
            specialize in agentic integration, AI engineering, and building
            scalable web applications.
          </h2>
          <h3
            className={`${jetBrainsMono.className} pt-10 text-[#fcf5e6] text-2xl`}
          >
            Currently attending Stony Brook University
          </h3>
        </div>
        <div className="h-screen"></div>
      </div>
    </div>
  );
}
