import React from "react";

export default function page() {
  return (
    <div className="">
      <div className="flex justify-center jetbrains-mono-500 text-7xl pt-20 text-white">
        Ryan Chen
      </div>
      <div className="flex justify-center jetbrains-mono-200 pt-10">
        <p className="w-1/2 text-center text-3xl">
          Hello! I am a CS Student @{" "}
          <span className="jetbrains-mono-500">Stony Brook University</span>{" "}
          based in <b>New York City</b>. I specialize in full stack web
          development, but I am also skilled in machine learning and agentic
          integration.
        </p>
      </div>
    </div>
  );
}
