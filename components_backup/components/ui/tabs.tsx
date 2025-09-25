"use client";
import { useState } from "react";
export default function Tabs({ tabs }: { tabs: { key: string; label: string; content: React.ReactNode }[] }) {
  const [active, setActive] = useState(tabs[0]?.key);
  return (
    <div>
      <div className="mb-3 flex gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            className={`rounded-md px-3 py-1.5 text-sm ${active === t.key ? "bg-gray-900 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="rounded-xl border bg-white p-4 shadow-sm">{tabs.find((t) => t.key === active)?.content}</div>
    </div>
  );
}
