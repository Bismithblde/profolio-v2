import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "About Ryan Chen, his skills, interests, and goals in software engineering.",
};

const facts = [
  ["Favorite book", "Book title", "Add one short sentence here."],
  ["Favorite podcast", "Podcast title", "Add one short sentence here."],
  ["Current hobby", "Hobby placeholder", "Add one short sentence here."],
  ["Currently learning", "Topic placeholder", "Add one short sentence here."],
];

const skills = [
  ["Frontend engineering", "Placeholder description for building responsive and accessible interfaces."],
  ["Backend systems", "Placeholder description for APIs, data modeling, and reliable services."],
  ["Product thinking", "Placeholder description for turning user needs into focused product decisions."],
  ["Interaction and motion", "Placeholder description for purposeful animation and polished feedback."],
];

const goals = [
  ["Goal one", "Add a concise short-term engineering or learning goal here."],
  ["Goal two", "Add the kind of product, team, or problem you want to work on."],
  ["Goal three", "Add a longer-term direction you want your career to grow toward."],
];

export default function AboutPage() {
  return (
    <>
      <section className="about-intro page-section" aria-labelledby="about-title">
        <div className="page-container about-intro-grid">
          <div data-animate>
            <h1 id="about-title" className="small-section-title">About</h1>
            <div className="about-copy">
              <p>
                I first started coding in middle school, Raspberry Pi in hand and a computer on my desk. Seeing
                something I wrote interact with the real world ignited my love for programming. That followed me
                into high school, where learning C++, number representations, and what was happening inside a
                computer made me want to understand software beyond the surface.
              </p>
              <p>
                Since then, I have built projects, attended hackathons, and completed an internship where I applied
                my skills in a professional environment. Now studying computer science at Stony Brook University, I
                have won a hackathon at my own college and placed third at another. I am still driven by the same
                curiosity: understanding how technology works and using it to create something real.
              </p>
            </div>
          </div>

          <aside className="about-aside" data-animate>
            <h2>Get to know me</h2>
            <nav className="about-anchor-nav" aria-label="About page sections">
              <a href="#facts"><span aria-hidden="true">○</span> Fun facts</a>
              <a href="#skills"><span aria-hidden="true">&lt;/&gt;</span> Skills</a>
              <a href="#goals"><span aria-hidden="true">◎</span> Goals</a>
              <Link href="/#contact"><span aria-hidden="true">□</span> Contact</Link>
            </nav>

            <dl className="status-list">
              <div><dt>Currently</dt><dd>Computer Science at Stony Brook University</dd></div>
              <div><dt>Based in</dt><dd>New York</dd></div>
              <div><dt>Focused on</dt><dd>Full-stack product engineering</dd></div>
            </dl>
          </aside>
        </div>
      </section>

      <section id="facts" className="about-section page-section" aria-labelledby="facts-title">
        <div className="page-container">
          <header className="about-section-heading" data-animate>
            <h2 id="facts-title">Fun facts</h2>
            <p className="utility-label">Placeholder content</p>
          </header>
          <div className="fact-grid">
            {facts.map(([label, title, description]) => (
              <article className="fact-panel" key={label} data-animate>
                <p className="utility-label">{label}</p>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="about-section page-section" aria-labelledby="skills-title">
        <div className="page-container">
          <header className="about-section-heading" data-animate>
            <h2 id="skills-title">Skills</h2>
          </header>
          <div className="skill-grid">
            {skills.map(([title, description]) => (
              <article key={title} data-animate>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
          <div className="technology-line" data-animate>
            <p className="utility-label">Core technologies</p>
            <p>Next.js / React / TypeScript / Python / PostgreSQL / Supabase</p>
          </div>
        </div>
      </section>

      <section id="goals" className="about-section goals-section page-section" aria-labelledby="goals-title">
        <div className="page-container">
          <header className="about-section-heading" data-animate>
            <h2 id="goals-title">Goals</h2>
            <p>What I am working toward.</p>
          </header>
          <div className="goal-list">
            {goals.map(([title, description], index) => (
              <article key={title} data-animate>
                <p className="project-index">{String(index + 1).padStart(2, "0")}</p>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
          <p className="about-close" data-animate>
            Thanks for taking the time to learn a little more about me.
          </p>
        </div>
      </section>
    </>
  );
}
