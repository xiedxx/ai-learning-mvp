"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const nav = [
  { href: "/", label: "首页" },
  { href: "/docs", label: "文档" },
  { href: "/playground", label: "Playground" },
];

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="font-semibold text-lg tracking-tight hover:opacity-80">
          AI Workstation
        </Link>
        <nav className="flex items-center gap-4">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "rounded-md px-3 py-1.5 text-sm hover:bg-gray-100",
                pathname === item.href && "bg-gray-900 text-white hover:bg-gray-800"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}