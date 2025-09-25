import clsx from "clsx";
export default function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={clsx(
        "min-h-[120px] w-full rounded-md border px-3 py-2 text-sm outline-none transition placeholder:text-gray-400 focus:ring-2 focus:ring-gray-300",
        className
      )}
      {...props}
    />
  );
}
