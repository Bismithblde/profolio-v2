"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
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
  const motionSequenceRef = useRef(0);

  const setCompensatedRadius = (backdrop: HTMLElement) => {
    const currentScale = Number(gsap.getProperty(backdrop, "scaleX")) || 1;
    const radiusY = backdrop.offsetHeight / 2;
    const radiusX = radiusY / currentScale;
    backdrop.style.borderRadius = `${radiusX}px / ${radiusY}px`;
  };

  const resetBackdropGeometry = (backdrop: HTMLElement) => {
    gsap.set(backdrop, {
      left: 0,
      right: 0,
      width: "auto",
      scaleX: 1,
      transformOrigin: "center",
    });
    backdrop.style.borderRadius = "999px";
    backdrop.dataset.native = "false";
  };

  const renderNativeBubble = (backdrop: HTMLElement, width: number, center: number) => {
    gsap.set(backdrop, {
      left: center - width / 2,
      right: "auto",
      width,
      scaleX: 1,
      transformOrigin: "center",
    });
    backdrop.style.borderRadius = "999px";
    backdrop.dataset.native = "true";
  };

  const prepareNativeBubbleForScale = (backdrop: HTMLElement, nav: HTMLElement) => {
    if (backdrop.dataset.native !== "true") return;

    const navBounds = nav.getBoundingClientRect();
    const bubbleBounds = backdrop.getBoundingClientRect();
    const scaleX = bubbleBounds.width / navBounds.width;
    const targetCenter = bubbleBounds.left - navBounds.left + bubbleBounds.width / 2;
    const unscaledCenter = navBounds.width / 2;
    const originX = (targetCenter - scaleX * unscaledCenter) / (1 - scaleX);

    gsap.set(backdrop, {
      left: 0,
      right: 0,
      width: "auto",
      scaleX,
      transformOrigin: `${originX}px center`,
    });
    setCompensatedRadius(backdrop);
    backdrop.dataset.native = "false";
  };

  const animateBackdropScale = (
    scaleX: number,
    originX?: number,
    onComplete?: () => void,
  ) => {
    const backdrop = backdropRef.current;
    if (!backdrop) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reducedMotion ? 0.22 : 0.58;

    gsap.killTweensOf(backdrop);
    if (originX !== undefined) {
      gsap.set(backdrop, { transformOrigin: `${originX}px center` });
    }

    gsap.to(backdrop, {
      scaleX,
      duration,
      ease: reducedMotion ? "power1.out" : "power3.inOut",
      overwrite: "auto",
      onUpdate: () => setCompensatedRadius(backdrop),
      onComplete,
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
    const unscaledCenter = navBounds.width / 2;
    const correctedOrigin = (targetCenter - targetScale * unscaledCenter) / (1 - targetScale);
    const sequence = ++motionSequenceRef.current;

    const collapse = () => {
      if (sequence !== motionSequenceRef.current) return;
      animateBackdropScale(targetScale, correctedOrigin, () => {
        if (sequence !== motionSequenceRef.current) return;
        renderNativeBubble(backdrop, targetWidth, targetCenter);
      });
    };

    if (backdrop.dataset.native === "true") {
      prepareNativeBubbleForScale(backdrop, nav);
      animateBackdropScale(1, undefined, collapse);
      return;
    }

    const currentScale = Number(gsap.getProperty(backdrop, "scaleX")) || 1;
    if (currentScale < 0.999) {
      animateBackdropScale(1, undefined, collapse);
    } else {
      collapse();
    }
  };

  const expandBackdrop = () => {
    const nav = navRef.current;
    const backdrop = backdropRef.current;
    if (!nav || !backdrop) return;

    const sequence = ++motionSequenceRef.current;
    prepareNativeBubbleForScale(backdrop, nav);
    animateBackdropScale(1, undefined, () => {
      if (sequence === motionSequenceRef.current) resetBackdropGeometry(backdrop);
    });
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
    <div className="page-loader" aria-hidden="true">
      <p>Ryan Chen</p>
    </div>
  );
}

export function SiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const smoother = reducedMotion
      ? null
      : ScrollSmoother.create({
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

      if (smoother) {
        const revealOffset = target.closest("[data-animate]") ? 28 : 0;
        smoother.scrollTo(target, animate, `top top+=${offset + revealOffset}`);
      } else {
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: Math.max(0, top), behavior: animate ? "smooth" : "auto" });
      }
    };

    const onHashLink = (event: MouseEvent) => {
      const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href*="#"]');
      if (!link || link.target === "_blank") return;

      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) return;

      event.preventDefault();
      event.stopPropagation();
      window.history.pushState(null, "", url.hash);
      scrollToHash(url.hash, !reducedMotion);
    };

    document.addEventListener("click", onHashLink, true);

    const hashScroll = window.setTimeout(() => {
      if (window.location.hash) scrollToHash(window.location.hash, false);
    }, 120);

    if (reducedMotion) {
      return () => {
        window.clearTimeout(hashScroll);
        document.removeEventListener("click", onHashLink, true);
      };
    }

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
          x: index % 2 === 0 ? -22 : 22,
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
    <div id="smooth-wrapper">
      <PageLoader />
      <Cursor />
      <SiteNav />
      <div id="smooth-content">{children}</div>
    </div>
  );
}
