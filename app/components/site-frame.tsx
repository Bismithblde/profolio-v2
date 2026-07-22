"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import ScrollSmoother from "gsap/dist/ScrollSmoother";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

function HomeMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4.5 10.8 12 4.5l7.5 6.3v8.1a.6.6 0 0 1-.6.6H5.1a.6.6 0 0 1-.6-.6Z" />
      <path d="M9.2 19.5v-5.8h5.6v5.8" />
    </svg>
  );
}

function SiteNav() {
  const pathname = usePathname();
  const isAbout = pathname === "/about";
  const isWork = pathname === "/";
  const navRef = useRef<HTMLElement>(null);
  const backdropRef = useRef<HTMLSpanElement>(null);
  const activeLinkRef = useRef<HTMLElement | null>(null);

  const setCompensatedRadius = (backdrop: HTMLElement) => {
    const currentScale = Math.max(Number(gsap.getProperty(backdrop, "scaleX")) || 1, 0.001);
    const radiusY = backdrop.offsetHeight / 2;
    const radiusX = radiusY / currentScale;
    backdrop.style.borderRadius = `${radiusX}px / ${radiusY}px`;
  };

  const animateBackdrop = (scaleX: number, x: number) => {
    const backdrop = backdropRef.current;
    if (!backdrop) return;

    gsap.killTweensOf(backdrop);
    gsap.to(backdrop, {
      x,
      scaleX,
      duration: 0.58,
      ease: "power3.inOut",
      overwrite: true,
      onUpdate: () => setCompensatedRadius(backdrop),
    });
  };

  const contractBackdrop = (target: HTMLElement) => {
    const nav = navRef.current;
    const backdrop = backdropRef.current;
    if (!nav || !backdrop) return;

    const navBounds = nav.getBoundingClientRect();
    const label = target.querySelector<HTMLElement>(".nav-label, svg") ?? target;
    const labelBounds = label.getBoundingClientRect();
    const isHome = target.classList.contains("home-link");
    const horizontalPadding = 32;
    const targetWidth = isHome
      ? navBounds.height
      : labelBounds.width + horizontalPadding * 2;
    const targetCenter = labelBounds.left - navBounds.left + labelBounds.width / 2;
    const targetScale = targetWidth / navBounds.width;
    const targetX = targetCenter - navBounds.width / 2;

    animateBackdrop(targetScale, targetX);
  };

  const expandBackdrop = () => {
    animateBackdrop(1, 0);
  };

  return (
    <header className="nav-position">
      <nav
        ref={navRef}
        className="site-nav"
        aria-label="Primary navigation"
        onPointerOver={(event) => {
          const link = (event.target as HTMLElement).closest<HTMLElement>("a");
          if (link && activeLinkRef.current !== link) {
            activeLinkRef.current = link;
            contractBackdrop(link);
          }
        }}
        onPointerLeave={() => {
          activeLinkRef.current = null;
          expandBackdrop();
        }}
        onFocus={(event) => {
          activeLinkRef.current = event.target as HTMLElement;
          contractBackdrop(event.target as HTMLElement);
        }}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            activeLinkRef.current = null;
            expandBackdrop();
          }
        }}
      >
        <span ref={backdropRef} className="nav-backdrop" aria-hidden="true" />
        <Link className="home-link" href="/" aria-label="Home">
          <HomeMark />
        </Link>
        <Link href="/#work" aria-current={isWork ? "page" : undefined}>
          <span className="nav-label">Work</span>
        </Link>
        <Link href="/about" aria-current={isAbout ? "page" : undefined}>
          <span className="nav-label">About</span>
        </Link>
        <a href="https://github.com/bismithblde" target="_blank" rel="noreferrer">
          <span className="nav-label">GitHub</span>
        </a>
        <Link href="/#contact">
          <span className="nav-label">Contact</span>
        </Link>
      </nav>
    </header>
  );
}

function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const cursor = cursorRef.current;
    const label = labelRef.current;
    if (!cursor || !label) return;

    const move = (event: PointerEvent) => {
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      cursor.dataset.visible = "true";
    };

    const over = (event: PointerEvent) => {
      const target = (event.target as HTMLElement).closest<HTMLElement>("a, button, [data-cursor-label]");
      const text = target?.dataset.cursorLabel ?? "";
      cursor.dataset.active = text ? "true" : "false";
      label.textContent = text;
    };

    const leave = () => {
      cursor.dataset.visible = "false";
    };

    window.addEventListener("pointermove", move);
    document.addEventListener("pointerover", over);
    window.addEventListener("blur", leave);
    document.documentElement.addEventListener("mouseleave", leave);

    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      window.removeEventListener("blur", leave);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div ref={cursorRef} className="custom-cursor" aria-hidden="true">
      <span ref={labelRef} />
    </div>
  );
}

function PageLoader() {
  return (
    <div
      className="page-loader fixed inset-0 z-[80] grid place-content-center bg-white text-[var(--ink)] [transform:translate3d(0,0,0)] will-change-transform"
      aria-hidden="true"
      data-page-loader
    >
      <p className="m-0 font-[family-name:var(--font-editorial)] text-[clamp(1.45rem,2.4vw,2.4rem)] font-light leading-none tracking-[-0.035em]">
        live, laugh, love
      </p>
    </div>
  );
}

export function SiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const initialPathnameRef = useRef(pathname);
  const shellRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const shell = shellRef.current;
    const loader = shell?.querySelector<HTMLElement>("[data-page-loader]");
    if (!shell || !loader) return;

    const context = gsap.context(() => {
      const loaderText = loader.querySelector("p");
      const nameLines = gsap.utils.toArray<HTMLElement>(".name-line");
      const firstName = gsap.utils.toArray<HTMLElement>(".name-line:first-child .name-letter");
      const lastName = gsap.utils.toArray<HTMLElement>(".name-line:last-child .name-letter");
      const phrases = gsap.utils.toArray<HTMLElement>(".kinetic-phrase");
      const timeline = gsap.timeline({ defaults: { overwrite: "auto" } });

      gsap.set(loader, { yPercent: 0, autoAlpha: 1 });

      if (initialPathnameRef.current === "/") {
        gsap.set(nameLines, { overflow: "clip" });
        gsap.set([...firstName, ...lastName], { yPercent: 118 });
        gsap.set(phrases, { yPercent: 115 });
      }

      timeline
        .fromTo(
          loaderText,
          { y: 5 },
          { y: 0, duration: 0.4, ease: "power2.out" },
          0,
        )
        .to(
          loader,
          {
            yPercent: -100,
            duration: 1,
            ease: "power4.inOut",
            onComplete: () => {
              gsap.set(loader, { autoAlpha: 0 });
            },
          },
          0.8,
        );

      if (initialPathnameRef.current === "/") {
        timeline
          .to(
            firstName,
            { yPercent: 0, duration: 0.72, stagger: 0.075, ease: "power4.out" },
            1.38,
          )
          .to(
            lastName,
            { yPercent: 0, duration: 0.72, stagger: 0.075, ease: "power4.out" },
            1.68,
          )
          .set(nameLines[0], { overflow: "visible" }, 2.33)
          .set(nameLines[1], { overflow: "visible" }, 2.63)
          .to(
            phrases,
            { yPercent: 0, duration: 0.42, stagger: 0.3, ease: "power3.out" },
            2.08,
          )
          .set(
            [...firstName, ...lastName, ...phrases],
            { clearProps: "transform" },
            3.1,
          );
      }
    }, shell);

    return () => context.revert();
  }, []);

  useEffect(() => {
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.15,
      speed: 0.92,
      normalizeScroll: true,
      effects: true,
    });

    const scrollToHash = (hash: string, animate: boolean) => {
      const anchor = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!anchor) return;

      const labelledBy = anchor.getAttribute("aria-labelledby");
      const target = labelledBy ? document.getElementById(labelledBy) ?? anchor : anchor;

      const nav = document.querySelector<HTMLElement>(".nav-position");
      const offset = (nav?.offsetHeight ?? 54) + (nav?.offsetTop ?? 24) + 24;

      const revealOffset = target.closest("[data-animate]") ? 28 : 0;
      smoother.scrollTo(target, animate, `top top+=${offset + revealOffset}`);
    };

    const onHashLink = (event: MouseEvent) => {
      const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href*="#"]');
      if (!link || link.target === "_blank") return;

      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) return;

      event.preventDefault();
      event.stopPropagation();
      window.history.pushState(null, "", url.hash);
      scrollToHash(url.hash, true);
    };

    document.addEventListener("click", onHashLink, true);

    const hashScroll = window.setTimeout(() => {
      if (window.location.hash) scrollToHash(window.location.hash, false);
    }, 120);

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-animate]").forEach((element) => {
        gsap.from(element, {
          y: 28,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 88%",
            once: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-project-row]").forEach((row, index) => {
        gsap.from(row, {
          x: window.innerWidth <= 680 ? 0 : index % 2 === 0 ? -22 : 22,
          duration: 0.75,
          ease: "power2.out",
          scrollTrigger: {
            trigger: row,
            start: "top 92%",
            once: true,
          },
        });
      });
    });

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 100);

    return () => {
      window.clearTimeout(hashScroll);
      window.clearTimeout(refresh);
      document.removeEventListener("click", onHashLink, true);
      context.revert();
      smoother?.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [pathname]);

  return (
    <div ref={shellRef} className="site-shell">
      <PageLoader />
      <Cursor />
      <SiteNav />
      <div id="smooth-wrapper">
        <div id="smooth-content">{children}</div>
      </div>
    </div>
  );
}
