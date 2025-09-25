"use client";
import { useState } from "react";
export default function Toggle({ onChange, defaultChecked = false }: { onChange?: (v: boolean) => void; defaultChecked?: boolean }) {
  const [on, setOn] = useState(defaultChecked);
  return (
    <button
      onClick={() => {
        setOn((v) => !v);
        onChange?.(!on);
      }}
      className={`relative h-6 w-11 rounded-full transition ${on ? "bg-gray-900" : "bg-gray-300"}`}
      aria-pressed={on}
    >
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${on ? "left-5" : "left-0.5"}`} />
    </button>
  );
}
