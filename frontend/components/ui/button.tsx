import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
};

const sizeMap = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4",
  lg: "h-12 px-6 text-lg",
};

const variantMap = {
  primary: "bg-gray-900 text-white hover:bg-gray-800",
  secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
  ghost: "bg-transparent hover:bg-gray-100",
  danger: "bg-red-600 text-white hover:bg-red-500",
};

export default function Button({ className, children, variant = "primary", size = "md", loading, disabled, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded-md font-medium transition focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:opacity-60",
        sizeMap[size],
        variantMap[variant],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />}
      {children}
    </button>
  );
}