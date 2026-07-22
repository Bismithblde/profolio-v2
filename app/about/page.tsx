import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "About Ryan Chen, his skills, interests, and goals in software engineering.",
};

const facts = [
  {
    label: "Favorite anime",
    title: "Hunter x Hunter",
    description: "The adventure, worldbuilding, and Nen system keep pulling me back.",
    image: "/hunter-x-hunter.jpg",
    alt: "Gon, Killua, Kurapika, and Leorio from Hunter x Hunter standing in front of a sepia map",
    width: 1920,
    height: 1080,
  },
  {
    label: "Favorite game",
    title: "League of Legends",
    description: "The game I keep coming back to, no matter what the patch notes say.",
    image: "/league-of-legends.webp",
    alt: "Ekko and Sona surrounded by magical light in League of Legends artwork",
    width: 4000,
    height: 2000,
  },
];

const skills = [
  ["Frontend engineering", "Placeholder description for building responsive and accessible interfaces."],
  ["Backend systems", "Placeholder description for APIs, data modeling, and reliable services."],
  ["Product thinking", "Placeholder description for turning user needs into focused product decisions."],
  ["Interaction and motion", "Placeholder description for purposeful animation and polished feedback."],
];

const goals = [
  [
    "Build for real users",
    "Turn one of my projects into a product people return to, shaped by feedback instead of stopping at the demo.",
  ],
  [
    "Master the systems behind the screen",
    "Go deeper into databases, distributed systems, and infrastructure so the software I build stays fast and reliable as it grows.",
  ],
  [
    "Lead products from idea to launch",
    "Grow into an engineer who can shape product direction, mentor a strong team, and carry ambitious software all the way to production.",
  ],
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
          </header>
          <div className="border-b border-[var(--line)]">
            {facts.map((fact, index) => (
              <article
                className="group grid gap-6 border-t border-[var(--line)] py-10 md:grid-cols-[4rem_minmax(13rem,0.72fr)_minmax(0,1.28fr)] md:gap-8 md:py-14 lg:grid-cols-[5rem_minmax(17rem,0.7fr)_minmax(0,1.3fr)] lg:gap-12 lg:py-16"
                key={fact.label}
                data-animate
              >
                <div className="flex items-start justify-between md:block">
                  <p className="project-index pt-1">{String(index + 1).padStart(2, "0")}</p>
                  <p className="utility-label pt-1 md:hidden">{fact.label}</p>
                </div>
                <div className="md:pt-1">
                  <p className="utility-label hidden md:block">{fact.label}</p>
                  <h3 className="mt-3 mb-0 text-[clamp(2.6rem,4.2vw,5rem)] font-normal leading-[0.92] tracking-[-0.055em] [text-wrap:balance] md:mt-8">
                    {fact.title}
                  </h3>
                  <p className="mt-5 max-w-[30rem] text-[clamp(1.05rem,1.35vw,1.25rem)] leading-[1.5] text-[var(--ink-soft)] [text-wrap:pretty]">
                    {fact.description}
                  </p>
                </div>
                <div className="overflow-hidden rounded-[1.2rem] md:rounded-[1.5rem]">
                  <Image
                    className="block aspect-video h-auto w-full object-cover transition-transform duration-700 ease-[var(--ease-out)] motion-reduce:transition-none md:group-hover:scale-[1.015]"
                    src={fact.image}
                    alt={fact.alt}
                    width={fact.width}
                    height={fact.height}
                    sizes="(max-width: 768px) 100vw, 58vw"
                  />
                </div>
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
