import Image from "next/image";

const projects = [
  {
    title: "WAL Project",
    description: "Concurrent Windows TCP key-value database with durable batched writes.",
    stack: "C++17 / WinSock2 / WSAPoll / RESP2 / WAL",
    github: "https://github.com/Bismithblde/WAL-Project",
  },
  {
    title: "Interlink",
    description: "Student matching by class, interest, and schedule.",
    stack: "React / Express / PostgreSQL / Redis / OpenAI",
    live: "https://interlink-web.vercel.app/",
    github: "https://github.com/Bismithblde/Interlink_web",
  },
  {
    title: "Flash",
    description: "Real-time classroom quiz generation.",
    stack: "FastAPI / Next.js / Gemini / SQLite",
    github: "https://github.com/Bismithblde/popquiz",
  },
  {
    title: "Ecocart",
    description: "Evidence-backed sustainability research.",
    stack: "Next.js / OpenAI / Supabase / Pinecone",
    live: "https://ecocart.rychen.dev/",
    github: "https://github.com/Bismithblde/EcoCart",
  },
  {
    title: "Mineral Water",
    description: "Water comparison and NYC lead-testing data.",
    stack: "Next.js / PostgreSQL / Supabase",
    live: "https://code-a-site-eta.vercel.app/",
    github: "https://github.com/Marreonline0201/code_a_site",
  },
];

const Arrow = () => <span aria-hidden="true">↗</span>;

function NameLine({ children }: { children: string }) {
  return (
    <span className="name-line relative m-0 block p-0 first:z-[1]" aria-hidden="true">
      {Array.from(children).map((letter, index) => (
        <span className="name-letter" key={`${letter}-${index}`}>
          {letter}
        </span>
      ))}
    </span>
  );
}

export default function Home() {
  return (
    <>
      <section className="hero page-section" aria-labelledby="hero-title">
        <div className="page-container hero-inner">
          <h1 id="hero-title" className="display-name" aria-label="Ryan Chen">
            <NameLine>Ryan</NameLine>
            <NameLine>Chen</NameLine>
          </h1>

          <div className="hero-details">
            <div className="hero-introduction">
              <p className="kinetic-line" aria-label="I build. I design. I ship.">
                <span className="phrase-clip inline-block overflow-clip align-bottom" aria-hidden="true">
                  <span className="kinetic-phrase inline-block transition-[color,transform] duration-300 ease-[var(--ease-out)] hover:translate-x-[0.08em] hover:text-[var(--ink-soft)]">I build.</span>
                </span>{" "}
                <span className="phrase-clip inline-block overflow-clip align-bottom" aria-hidden="true">
                  <span className="kinetic-phrase inline-block text-[var(--moss)] transition-[color,transform] duration-300 ease-[var(--ease-out)] hover:translate-x-[0.08em] hover:text-[var(--ink-soft)]">I design.</span>
                </span>{" "}
                <span className="phrase-clip inline-block overflow-clip align-bottom" aria-hidden="true">
                  <span className="kinetic-phrase inline-block transition-[color,transform] duration-300 ease-[var(--ease-out)] hover:translate-x-[0.08em] hover:text-[var(--ink-soft)]">I ship.</span>
                </span>
              </p>
              <p className="hero-summary">
                Useful products from database to interface.
              </p>

              <div className="identity-note">
                <Image
                  className="identity-mark"
                  src="/cat-paw-white.png"
                  alt="Cat raising a paw"
                  width={48}
                  height={48}
                />
                <p>
                  <span>Software engineer</span>
                  <span>Stony Brook CS</span>
                </p>
              </div>
            </div>

            <nav className="wayfinding" aria-label="Page shortcuts">
              <p className="utility-label">Where you can start</p>
              <a href="#work" data-cursor-label="View">
                <span className="wayfinding-glyph" aria-hidden="true">↗</span>
                <span>View selected projects</span>
              </a>
              <a href="/about#skills" data-cursor-label="Open">
                <span className="wayfinding-glyph" aria-hidden="true">≋</span>
                <span>Explore my technical stack</span>
              </a>
              <a href="/about" data-cursor-label="Open">
                <span className="wayfinding-glyph" aria-hidden="true">◎</span>
                <span>Learn how I work</span>
              </a>
              <a href="#contact" data-cursor-label="Write">
                <span className="wayfinding-glyph" aria-hidden="true">×</span>
                <span>Get in touch</span>
              </a>
            </nav>
          </div>
        </div>
      </section>

      <section id="work" className="projects page-section" aria-labelledby="work-title">
        <div className="page-container">
          <header className="section-heading" data-animate>
            <h2 id="work-title">Selected work</h2>
            <p>A selection of products built from database to interface.</p>
          </header>

          <div className="project-list">
            {projects.map((project, index) => (
              <article className="project-row" key={project.title} data-project-row>
                <p className="project-index">{String(index + 1).padStart(2, "0")}</p>
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <p className="project-stack">{project.stack}</p>
                <div className="project-links">
                  {project.live ? (
                    <a href={project.live} target="_blank" rel="noreferrer" data-cursor-label="Open">
                      Live site <Arrow />
                    </a>
                  ) : null}
                  <a href={project.github} target="_blank" rel="noreferrer" data-cursor-label="Open">
                    GitHub <Arrow />
                  </a>
                </div>
              </article>
            ))}
          </div>

          <footer id="contact" className="site-footer" data-animate>
            <p className="utility-label">Get in touch</p>
            <p className="footer-statement">Have a role or project in mind?</p>
            <div className="footer-links">
              <a href="https://www.linkedin.com/in/bismithblde/" target="_blank" rel="noreferrer">
                LinkedIn <Arrow />
              </a>
              <a href="https://github.com/bismithblde" target="_blank" rel="noreferrer">
                GitHub <Arrow />
              </a>
            </div>
          </footer>
        </div>
      </section>
    </>
  );
}
