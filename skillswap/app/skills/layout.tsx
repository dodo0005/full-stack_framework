
export default function SkillsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="skills-section">
      {children}
    </div>
  );
}
