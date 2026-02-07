"use client";

import React, { useRef } from "react";

export default function page() {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--x", `${x}px`);
    el.style.setProperty("--y", `${y}px`);
  };

  const handleLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    // move the circle off-screen
    el.style.setProperty("--x", `-200px`);
    el.style.setProperty("--y", `-200px`);
  };

  return (
    <div className="flex justify-center p-10">
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="relative bg-white w-1/2 rounded-2xl flex justify-center flex-col items-center gap-10 p-10 overflow-hidden"
        style={{
          // initial CSS variables for the radial position
          // these are updated in JS on mouse move
          // --x and --y are used by the overlay radial-gradient
          // keep as inline style so Tailwind doesn't need custom CSS
          ["--x" as any]: `-200px`,
          ["--y" as any]: `-200px`,
        }}
      >
        {/* Main content (base, black text) */}
        <div className="content z-0 w-full flex justify-center flex-col items-center gap-10">
          <div className="jetbrains-mono-500 text-7xl text-black">
            Ryan Chen
          </div>
          <div className="flex justify-center jetbrains-mono-200 pt-10 text-black">
            <p className="w-1/2 text-center text-3xl">
              Hello! I am a CS Student @{" "}
              <span className="jetbrains-mono-500">Stony Brook University</span>{" "}
              based in <b>New York City</b>.
            </p>
          </div>
        </div>

        {/* Black circular overlay that follows the cursor */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background: `radial-gradient(circle 90px at var(--x) var(--y), rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70px, rgba(0,0,0,0) 71px)`,
            transition: "background 120ms ease-out",
          }}
        />

        {/* White text duplicate, visible only inside the circle using a mask */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 flex justify-center flex-col items-center gap-10"
          style={{
            WebkitMaskImage: `radial-gradient(circle 90px at var(--x) var(--y), black 0%, black 70px, transparent 71px)`,
            maskImage: `radial-gradient(circle 90px at var(--x) var(--y), black 0%, black 70px, transparent 71px)`,
          }}
        >
          <div className="jetbrains-mono-500 text-7xl text-white">
            Ryan Chen
          </div>
          <div className="flex justify-center jetbrains-mono-200 pt-10 text-white">
            <p className="w-1/2 text-center text-3xl">
              Hello! I am a CS Student @{" "}
              <span className="jetbrains-mono-500">Stony Brook University</span>{" "}
              based in <b>New York City</b>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
