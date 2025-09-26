import { request } from "./api-client";

const AI_BASE = process.env.NEXT_PUBLIC_AI_BASE_URL!;

export async function chat(prompt: string) {
  return request<{ response: string }>({
    base: AI_BASE,
    path: "/chat",
    method: "POST",
    body: { prompt },
  });
}
