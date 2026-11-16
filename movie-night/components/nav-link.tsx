"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Client Component: usePathname reads the current URL
export function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const isPage = pathname === href;
  const isInSection = pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={isPage ? "page" : isInSection ? "true" : undefined}
      className="hover:underline aria-[current=page]:font-bold aria-[current=true]:font-bold"
    >
      {children}
    </Link>
  );
}