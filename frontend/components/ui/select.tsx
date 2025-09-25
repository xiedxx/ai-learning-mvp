import clsx from "clsx";
export default function Select({ className, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={clsx(
        "h-10 w-full rounded-md border bg-white px-3 text-sm outline-none transition focus:ring-2 focus:ring-gray-300",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}
