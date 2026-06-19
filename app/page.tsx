"use client";

import React, { useEffect, useState } from "react";
import gsap from "gsap";
import dynamic from "next/dynamic";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import ScrollSmoother from "gsap/dist/ScrollSmoother";

const LiquidGlass = dynamic(() => import("liquid-glass-react"), {
  ssr: false,
});

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

const projects = [
  {
    title: "Interlink",
    stack: "React, Express.js, PostgreSQL, Redis, OpenAI",
    result:
      "Built a student matching platform with class, interest, and schedule-based matching.",
    github: "https://github.com/Bismithblde/Interlink_web",
    live: "https://interlink-web.vercel.app/",
  },
  {
    title: "Flash",
    stack: "FastAPI, Next.js, Gemini API, SQLite, Asyncio",
    result:
      "Built a classroom quiz generator that creates lesson-aligned questions in real time.",
    github: "https://github.com/Bismithblde/popquiz",
  },
  {
    title: "Ecocart",
    stack: "Next.js, OpenAI, Supabase, Pinecone, Serper",
    result:
      "Built an AI research tool that scores brands using retrieved web evidence and stored company data.",
    github: "https://github.com/Bismithblde/EcoCart",
    live: "https://ecocart.rychen.dev/",
  },
  {
    title: "Mineral Water",
    stack: "Next.js, PostgreSQL, Supabase",
    result:
      "Built a comparison tool for water mineral content and NYC lead testing data from 50,000+ sites.",
    github: "https://github.com/Marreonline0201/code_a_site",
    live: "https://code-a-site-eta.vercel.app/",
  },
];

const skills = [
  "Next.js",
  "React",
  "TypeScript",
  "Python",
  "FastAPI",
  "PostgreSQL",
  "Supabase",
  "OpenAI",
  "Redis",
  "Tailwind",
];

function CrosshairCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [hasFinePointer, setHasFinePointer] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    const updatePointerMode = () => {
      setHasFinePointer(mediaQuery.matches);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;

      setPosition({ x: event.clientX, y: event.clientY });
      setIsVisible(true);
    };

    const hideCursor = () => {
      setIsVisible(false);
    };

    updatePointerMode();
    mediaQuery.addEventListener("change", updatePointerMode);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", hideCursor);
    window.addEventListener("blur", hideCursor);

    return () => {
      mediaQuery.removeEventListener("change", updatePointerMode);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", hideCursor);
      window.removeEventListener("blur", hideCursor);
    };
  }, []);

  if (!hasFinePointer) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[100] transition-opacity duration-200 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      <div
        className="absolute left-0 h-px bg-[#fcf5e6]/10"
        style={{
          top: `${position.y}px`,
          width: `${Math.max(position.x - 22, 0)}px`,
        }}
      />
      <div
        className="absolute right-0 h-px bg-[#fcf5e6]/10"
        style={{
          top: `${position.y}px`,
          width: `calc(100vw - ${position.x + 22}px)`,
        }}
      />
      <div
        className="absolute top-0 w-px bg-[#fcf5e6]/10"
        style={{
          left: `${position.x}px`,
          height: `${Math.max(position.y - 22, 0)}px`,
        }}
      />
      <div
        className="absolute bottom-0 w-px bg-[#fcf5e6]/10"
        style={{
          left: `${position.x}px`,
          height: `calc(100vh - ${position.y + 22}px)`,
        }}
      />
      <div
        className="absolute h-7 w-7 rounded-full border border-[#fcf5e6]/70 bg-[#fcf5e6]/10 backdrop-invert"
        style={{
          transform: `translate3d(${position.x - 14}px, ${position.y - 14}px, 0)`,
        }}
      />
    </div>
  );
}

function HeroPhrase({ text }: { text: string }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <span
      className="hero-word inline-block whitespace-nowrap"
      aria-label={text}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {[...text].map((character, index) => {
        const distance =
          hoveredIndex === null ? Number.POSITIVE_INFINITY : Math.abs(index - hoveredIndex);
        const fillOpacity =
          distance === 0
            ? 0
            : distance === 1
              ? 0.12
              : distance === 2
                ? 0.32
                : distance === 3
                  ? 0.58
                  : 1;
        const lift = distance <= 3 ? (4 - distance) * -1.6 : 0;

        return character === " " ? (
          <span
            className="inline-block w-[0.28em]"
            aria-hidden="true"
            key={`${text}-space-${index}`}
          />
        ) : (
          <span
            className="inline-block transition-[color,transform] duration-300 ease-out [-webkit-text-stroke:1.4px_#fcf5e6]"
            aria-hidden="true"
            key={`${text}-${character}-${index}`}
            onMouseEnter={() => setHoveredIndex(index)}
            style={{
              color: `rgba(252, 245, 230, ${fillOpacity})`,
              transform: `translateY(${lift}px)`,
            }}
          >
            {character}
          </span>
        );
      })}
    </span>
  );
}

export default function Page() {
  useEffect(() => {
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.8,
      speed: 0.55,
      effects: true,
      normalizeScroll: true,
    });

    const context = gsap.context(() => {
      const previousBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      gsap.set(".hero-word", { y: 56, opacity: 0 });
      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card, index) => {
        gsap.set(card, {
          clipPath:
            index % 2 === 0
              ? "polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)"
              : "polygon(0% 100%, 0% 100%, 0% 100%, 0% 100%)",
          opacity: 0.2,
        });
      });

      const hero = gsap.timeline({ defaults: { ease: "power3.out" } });
      hero
        .fromTo(
          ".intro-name",
          { y: 40, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5 },
        )
        .to(".intro-name", {
          y: -28,
          opacity: 0,
          duration: 0.44,
          ease: "power2.in",
        })
        .to(
          ".intro-screen",
          {
            yPercent: -100,
            duration: 1.05,
            ease: "power4.inOut",
          },
          "-=0.1",
        )
        .set(".intro-screen", { display: "none" })
        .call(() => {
          document.body.style.overflow = previousBodyOverflow;
        })
        .fromTo(
          ".nav-shell",
          { opacity: 0 },
          { opacity: 1, duration: 0.75 },
        )
        .to(
          ".hero-word",
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.055,
          },
          "-=0.35",
        );

      const projectsTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".projects-title",
          start: "center center",
          toggleActions: "play none none none",
        },
      });

      projectsTimeline
        .to(".project-card", {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          opacity: 1,
          duration: 0.64,
          ease: "power3.inOut",
        })
        .to(".projects-title-letter", {
          keyframes: [
            { y: -28, color: "rgba(252, 245, 230, 0)", duration: 0.18 },
            { y: 0, color: "#fcf5e6", duration: 0.18 },
          ],
          ease: "sine.inOut",
          stagger: 0.045,
        });

      const handleSmoothAnchorClick = (event: Event) => {
        const link = event.currentTarget as HTMLAnchorElement;
        const hash = link.getAttribute("href");
        if (!hash?.startsWith("#")) return;

        event.preventDefault();
        const target = document.querySelector(hash);
        if (!target) return;

        smoother.scrollTo(target, true, "top top");
        window.history.replaceState(null, "", hash);
        window.setTimeout(() => ScrollTrigger.refresh(), 50);
      };

      const internalLinks = gsap.utils.toArray<HTMLAnchorElement>('a[href^="#"]');
      internalLinks.forEach((link) => {
        link.addEventListener("click", handleSmoothAnchorClick);
      });

      gsap.fromTo(
        ".cta-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left center",
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ".cta-section",
            start: "top 78%",
            end: "center center",
            scrub: 1,
          },
        },
      );

      return () => {
        document.body.style.overflow = previousBodyOverflow;
        internalLinks.forEach((link) => {
          link.removeEventListener("click", handleSmoothAnchorClick);
        });
      };
    });

    return () => {
      context.revert();
      smoother?.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main
      id="smooth-wrapper"
      className="w-full max-w-full cursor-none overflow-x-hidden bg-[#091315] text-[#fcf5e6] [font-family:var(--font-geist-sans)]"
    >
      <CrosshairCursor />
      <div className="intro-screen fixed inset-0 z-[90] flex items-center justify-center bg-black text-[#fcf5e6]">
        <h1 className="intro-name text-center text-[clamp(4.5rem,14vw,14rem)] font-semibold leading-none tracking-[-0.1em]">
          Ryan Chen
        </h1>
      </div>
      <div id="smooth-content" className="relative overflow-hidden">
        <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_18%_8%,rgba(252,245,230,0.11),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(122,167,154,0.13),transparent_32%),linear-gradient(180deg,#091315_0%,#071012_56%,#0d1716_100%)]" />
        <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.055] [background-image:linear-gradient(#fcf5e6_1px,transparent_1px),linear-gradient(90deg,#fcf5e6_1px,transparent_1px)] [background-size:56px_56px]" />

        <LiquidGlass
          className="nav-shell z-50 text-[#fcf5e6]"
          style={{
            position: "fixed",
            top: "52px",
            left: "50%",
            width: "min(calc(100vw - 2rem), 64rem)",
          }}
          displacementScale={56}
          blurAmount={0.12}
          saturation={150}
          aberrationIntensity={1.6}
          elasticity={0.24}
          cornerRadius={999}
          padding="0"
          mode="standard"
        >
          <nav
            className="flex items-center justify-between gap-10 rounded-full border border-[#fcf5e6]/18 bg-[#071012]/82 px-5 py-3 text-sm shadow-[inset_0_1px_0_rgba(252,245,230,0.2),inset_0_-16px_30px_rgba(0,0,0,0.28),0_18px_55px_rgba(0,0,0,0.36)] md:px-7"
            style={{ width: "min(calc(100vw - 2rem), 64rem)" }}
          >
            <a href="#top" className="font-medium tracking-[-0.03em]">
              Ryan Chen
            </a>
            <div className="hidden items-center gap-7 text-[#fcf5e6]/68 md:flex">
              <a href="#work" className="transition-colors hover:text-[#fcf5e6]">
                Work
              </a>
              <a href="#contact" className="transition-colors hover:text-[#fcf5e6]">
                Contact
              </a>
            </div>
            <a
              href="https://www.linkedin.com/in/bismithblde/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[#fcf5e6]/35 bg-[#fcf5e6]/82 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#091315] shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_8px_22px_rgba(0,0,0,0.2)] transition-all duration-500 hover:scale-105 hover:bg-[#fcf5e6]"
            >
              LinkedIn
            </a>
          </nav>
        </LiquidGlass>

        <section
          id="top"
          className="hero-section relative z-10 flex min-h-screen items-center px-5 py-28 text-center md:px-10 lg:px-16"
        >
          <div className="mx-auto flex w-full max-w-7xl flex-col items-center">
            <div>
              <div className="mb-7 flex items-center justify-center gap-5 text-sm uppercase tracking-[0.34em] text-[#fcf5e6]/56 [font-family:var(--font-geist-mono)]">
                <p>Ryan Chen</p>
                <p className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  New York
                </p>
              </div>
              <h1 className="mx-auto max-w-7xl text-[clamp(3.35rem,8vw,8.15rem)] font-semibold leading-[0.88] tracking-[-0.085em]">
                <HeroPhrase text="I build." />{" "}
                <span className="inline-block w-4 md:w-8" aria-hidden="true" />
                <HeroPhrase text="I design." />{" "}
                <span className="inline-block w-4 md:w-8" aria-hidden="true" />
                <HeroPhrase text="I ship." />
              </h1>
              <p className="mx-auto mt-8 max-w-5xl text-xl leading-relaxed text-[#fcf5e6]/72 md:text-2xl">
                I&apos;m a <span className="font-semibold text-[#fcf5e6]">computer science</span> student at{" "}
                <span className="font-medium text-[#fcf5e6]">
                  Stony Brook University
                </span>{" "}
                focused on{" "}
                <span className="font-semibold text-[#fcf5e6]">full-stack</span>{" "}
                product engineering. I build{" "}
                <span className="font-semibold text-[#fcf5e6]">
                  user-facing applications
                </span>{" "}
                from database and API design through polished, responsive
                interfaces.
              </p>
              <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
                <a
                  href="#work"
                  className="rounded-full bg-[#fcf5e6] px-7 py-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-[#091315] transition-transform duration-500 hover:scale-105"
                >
                  View projects
                </a>
                <a
                  href="https://github.com/bismithblde"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-[#fcf5e6]/22 px-7 py-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-[#fcf5e6] transition-all duration-500 hover:scale-105 hover:border-[#fcf5e6]/70"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/bismithblde/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-[#fcf5e6]/22 px-7 py-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-[#fcf5e6] transition-all duration-500 hover:scale-105 hover:border-[#fcf5e6]/70"
                >
                  LinkedIn
                </a>
              </div>
              <div className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-2">
                {skills.map((skill) => (
                  <span
                    className="rounded-full border border-[#fcf5e6]/14 bg-[#fcf5e6]/6 px-3 py-1.5 text-sm text-[#fcf5e6]/70"
                    key={skill}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="work"
          className="relative z-10 px-5 py-20 md:px-10 md:py-28 lg:px-16"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 text-center">
              <h2
                className="projects-title mx-auto max-w-4xl text-[clamp(2.8rem,6vw,6.5rem)] font-semibold leading-[0.9] tracking-[-0.085em]"
                aria-label="Projects"
              >
                {"Projects".split("").map((letter, index) => (
                  <span
                    className="projects-title-letter inline-block text-[#fcf5e6] [-webkit-text-stroke:1.4px_#fcf5e6]"
                    aria-hidden="true"
                    key={`${letter}-${index}`}
                  >
                    {letter}
                  </span>
                ))}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">
              {projects.map((project) => (
                <article
                  className="project-card group flex min-h-[360px] flex-col justify-between rounded-[2rem] border border-[#fcf5e6]/12 bg-[#0d1919] p-7 text-center shadow-2xl shadow-black/20 transition-[border-color,background-color] duration-500 hover:border-[#fcf5e6]/38 hover:bg-[#122020] md:p-9"
                  key={project.title}
                >
                  <div>
                    <div className="flex flex-col items-center gap-5">
                      <h3 className="text-[clamp(2rem,3.4vw,3.5rem)] font-semibold leading-[0.92] tracking-[-0.075em]">
                        {project.title}
                      </h3>
                      <div className="flex max-w-xl flex-wrap justify-center gap-2">
                        {project.stack.split(", ").map((tag) => (
                          <span
                            className="rounded-full border border-[#fcf5e6]/12 px-3 py-1.5 text-xs uppercase tracking-[0.14em] text-[#fcf5e6]/52 [font-family:var(--font-geist-mono)]"
                            key={`${project.title}-${tag}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="mx-auto mt-9 max-w-2xl text-lg leading-relaxed text-[#fcf5e6]/74 md:text-xl">
                      {project.result}
                    </p>
                  </div>
                  <div className="mt-10 flex flex-wrap justify-center gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-[#fcf5e6]/20 px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] transition-all duration-500 hover:scale-105 hover:border-[#fcf5e6]/70"
                    >
                      GitHub
                    </a>
                    {project.live ? (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-[#fcf5e6] px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#091315] transition-transform duration-500 hover:scale-105"
                      >
                        Live site
                      </a>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <footer
          id="contact"
          className="cta-section relative z-10 px-5 py-24 md:px-10 md:py-32 lg:px-16"
        >
          <div className="mx-auto max-w-7xl">
            <div className="cta-line mb-12 h-px w-full bg-[#fcf5e6]/50" />
            <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
              <div>
                <h2 className="max-w-4xl text-[clamp(3rem,7vw,7rem)] font-semibold leading-[0.88] tracking-[-0.09em]">
                  Interested in hiring me?
                </h2>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
                <a
                  href="https://www.linkedin.com/in/bismithblde/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-[#fcf5e6] px-7 py-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-[#091315] transition-transform duration-500 hover:scale-105"
                >
                  Message Ryan
                </a>
                <a
                  href="https://github.com/bismithblde"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-[#fcf5e6]/22 px-7 py-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-[#fcf5e6] transition-all duration-500 hover:scale-105 hover:border-[#fcf5e6]/70"
                >
                  View GitHub
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
