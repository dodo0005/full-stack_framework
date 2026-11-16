
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getSkillById, getMemberById, skills } from "@/lib/data";

type SkillPageProps = {
  params: Promise<{ id: string }>;
};

// Generate a static page for every sample skill.
export function generateStaticParams() {
  return skills.map((skill) => ({
    id: skill.id,
  }));
}

// Generate a title and description for each skill.
export async function generateMetadata({
  params,
}: SkillPageProps): Promise<Metadata> {
  const { id } = await params;
  const skill = getSkillById(id);

  if (!skill) {
    return {
      title: "Skill Not Found | SkillSwap",
    };
  }

  return {
    title: `${skill.title} | SkillSwap`,
    description: skill.description,
  };
}

export default async function SkillDetailPage({
  params,
}: SkillPageProps) {
  const { id } = await params;
  const skill = getSkillById(id);

  if (!skill) {
    notFound();
  }

  const member = getMemberById(skill.userId);

  return (
    <section>
      <Link href="/skills">← Back to all skills</Link>

      <article className="skill-detail">
        <p>{skill.category}</p>
        <h1>{skill.title}</h1>
        <p>{skill.description}</p>

        <p>
          <strong>Type:</strong>{" "}
          {skill.type === "offered"
            ? "Offered by this member"
            : "Wanted by this member"}
        </p>

        {member && (
          <div>
            <h2>About the member</h2>
            <p>{member.name}</p>
            <p>{member.bio}</p>
          </div>
        )}
      </article>
    </section>
  );
}
