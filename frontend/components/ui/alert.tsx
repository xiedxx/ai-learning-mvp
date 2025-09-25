export default function Alert({ title, description, tone = "info" }: { title: string; description?: string; tone?: "info" | "success" | "error" | "warning" }) {
    const map = {
      info: "bg-blue-50 text-blue-800 border-blue-200",
      success: "bg-green-50 text-green-800 border-green-200",
      error: "bg-red-50 text-red-800 border-red-200",
      warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
    } as const;
    return (
      <div className={`rounded-lg border p-3 ${map[tone]}`}>
        <div className="font-medium">{title}</div>
        {description && <div className="mt-1 text-sm">{description}</div>}
      </div>
    );
  }
  