export const ENV = {
    BACKEND_BASE_URL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "http://localhost:8080",
    AI_BASE_URL: process.env.NEXT_PUBLIC_AI_BASE_URL || "http://localhost:5000",
    // 若需要 auth:
    // TOKEN: typeof window !== "undefined" ? localStorage.getItem("token") : undefined,
  };
  