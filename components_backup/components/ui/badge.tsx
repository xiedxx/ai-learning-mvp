import clsx from "clsx";
export default function Badge({ className, children, color = "gray" }: { className?: string; children: React.ReactNode; color?: "gray" | "green" | "red" | "blue" }) {
  const colors = {
    gray: "bg-gray-100 text-gray-800",
    green: "bg-green-100 text-green-800",
    red: "bg-red-100 text-red-800",
    blue: "bg-blue-100 text-blue-800",
  } as const;
  return <span className={clsx("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", colors[color], className)}>{children}</span>;
}
