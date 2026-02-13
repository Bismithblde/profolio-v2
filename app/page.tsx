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
        id: "name-pin",
      },
    });
    const nameDiv = document.querySelector<HTMLElement>(".name-div");
    const vw = window.innerWidth;

    const transformDistance = Math.ceil(vw / 2 + 200);

    tl.to(".name1", { x: -transformDistance, ease: "power1.out" }, 0);
    tl.to(".name2", { x: transformDistance, ease: "power1.out" }, 0);

    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".project-div",
        start: "top-=1000 100%",
        end: "center center-=1000",
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

    gsap.timeline({
      scrollTrigger: {
        trigger: ".project-div",
        start: "center center",
        end: "+=1000",
        scrub: 1,
        pin: true,
        markers: true,
      },
    });

    const tl3 = gsap.timeline({
      scrollTrigger: {
        trigger: ".project-container",
        start: "center center",
        end: "+=500",
        scrub: 1,
        markers: true,
      },
    });
    tl3.fromTo(
      ".project-container",
      { opacity: 0 },
      { opacity: 1, ease: "power2.out" },
    );

    ScrollTrigger.create({
      snap: {
        snapTo: [0, 0.6, 0.85],
        duration: 1.2,
        ease: "power2.inOut",
      },
      onRefresh: (self) => {
        if (window.scrollY === 0) {
          self.disable();
          setTimeout(() => self.enable(), 100);
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
        <div className="flex justify-center project-div h-screen items-center flex-col gap-10">
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
          <div className="flex gap-4 justify-center items-center bg-[#fcf5e6] rounded-full w-[200px] h-[100px]">
            <a href="https://github.com/bismithblde" target="_blank">
              <img src="github.png" alt="github" className="w-15 h-15" />
            </a>
            <a href="https://www.linkedin.com/in/bismithblde/" target="_blank">
              <img src="linkedin.png" alt="linkedin" className="w-25 h-25" />
            </a>
          </div>
        </div>
        <div className="project-container flex flex-col items-center justify-center pt-[500px] gap-10">
          <h1
            className={`text-[#fcf5e6] text-[100px] ${blackOpsOne.className} text-center`}
          >
            Projects:
          </h1>
          <div
            className="group flex flex-col w-[1200px] border border-[#fcf5e6]/20 rounded-lg overflow-hidden"
          >
            {/* Interlink */}
            <div
              className="project-item flex flex-col w-full border-b border-[#fcf5e6]/20 transition-all duration-300 group-hover:opacity-40 group-hover:grayscale hover:opacity-100! hover:grayscale-0! last:border-b-0"
            >
              <div className="p-10 flex flex-col gap-4">
                <h2
                  className={`text-[#fcf5e6] text-3xl ${blackOpsOne.className}`}
                >
                  Interlink
                </h2>
                <p
                  className={`text-[#fcf5e6]/90 text-xl ${jetBrainsMono.className} leading-relaxed`}
                >
                  Connect with fellow students based on your interests, hobbies,
                  or shared classes. Schedule-based matching so you always find
                  time to meet.
                </p>
                <div className="flex gap-4 pt-2">
                  <a
                    href="https://github.com/Bismithblde/Interlink_web"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-[#fcf5e6] hover:underline ${jetBrainsMono.className} text-lg`}
                  >
                    GitHub
                  </a>
                  <a
                    href="https://interlink-web.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-[#fcf5e6] hover:underline ${jetBrainsMono.className} text-lg`}
                  >
                    Live site
                  </a>
                </div>
              </div>
            </div>
            {/* Flash (popquiz) */}
            <div
              className="project-item flex flex-col w-full border-b border-[#fcf5e6]/20 transition-all duration-300 group-hover:opacity-40 group-hover:grayscale hover:opacity-100! hover:grayscale-0! last:border-b-0"
            >
              <div className="p-10 flex flex-col gap-4">
                <h2
                  className={`text-[#fcf5e6] text-3xl ${blackOpsOne.className}`}
                >
                  Flash
                </h2>
                <p
                  className={`text-[#fcf5e6]/90 text-xl ${jetBrainsMono.className} leading-relaxed`}
                >
                  Engage your students by generating instant quizzes during your
                  lesson—aligned to what you&apos;re teaching, in the moment.
                </p>
                <div className="flex gap-4 pt-2">
                  <a
                    href="https://github.com/Bismithblde/popquiz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-[#fcf5e6] hover:underline ${jetBrainsMono.className} text-lg`}
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-screen"></div>
      </div>
    </div>
  );
}
