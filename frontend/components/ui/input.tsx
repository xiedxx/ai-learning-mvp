import clsx from "clsx";
export default function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={clsx(
        "h-10 w-full rounded-md border px-3 text-sm outline-none transition placeholder:text-gray-400 focus:ring-2 focus:ring-gray-300",
        className
      )}
      {...props}
    />
  );
}
