
import type { Metadata } from "next";
import Link from "next/link";
import { skills } from "@/lib/data";

export const metadata: Metadata = {
  title: "Home | SkillSwap",
  description:
    "Share what you know and learn something new with your community.",
};

export default function HomePage() {
  const featuredSkills = skills
    .filter((skill) => skill.type === "offered")
    .slice(0, 3);

  return (
    <div>
      <section className="hero">
        <h1>Share skills. Learn together.</h1>
        <p>
          SkillSwap connects people who want to share their
          knowledge and learn new things from their community.
        </p>
        <Link href="/skills" className="primary-link">
          Explore available skills
        </Link>
      </section>

      <section>
        <h2>Featured skills</h2>
        <div className="skills-grid">
          {featuredSkills.map((skill) => (
            <article key={skill.id} className="skill-card">
              <p>{skill.category}</p>
              <h3>{skill.title}</h3>
              <p>{skill.description}</p>
              <Link href={`/skills/${skill.id}`}>
                View skill
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
