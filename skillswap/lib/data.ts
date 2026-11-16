import membersData from "@/data/members.json";
import skillsData from "@/data/skills.json";

export type Member = {
  id: string;
  name: string;
  email: string;
  bio: string;
  profileImage: string;
};

export type Skill = {
  id: string;
  title: string;
  description: string;
  category: string;
  type: "offered" | "wanted";
  userId: string;
};

export const members = membersData as Member[];
export const skills = skillsData as Skill[];

export function getMemberById(id: string) {
  return members.find((member) => member.id === id);
}

export function getSkillById(id: string) {
  return skills.find((skill) => skill.id === id);
}

export function getSkillsByMemberId(userId: string) {
  return skills.filter((skill) => skill.userId === userId);
}