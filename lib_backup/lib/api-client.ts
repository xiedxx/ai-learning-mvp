import { ApiResult } from "@/types";
import { ENV } from "@/lib/env";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export async function request<T>(baseUrl: string, path: string, opts?: { method?: HttpMethod; body?: any; headers?: Record<string,string> }): Promise<ApiResult<T>> {
  try {
    const url = `${baseUrl}${path}`;
    const { method = "GET", body, headers = {} } = opts || {};
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        // ...(ENV.TOKEN ? { Authorization: `Bearer ${ENV.TOKEN}` } : {}),
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      // 需要跨域凭据可加：credentials: "include",
      // Next.js 15 可用 fetch 缓存策略: cache: "no-store"
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return { ok: false, error: text || res.statusText, status: res.status };
    }
    const data = (await res.json()) as T;
    return { ok: true, data };
  } catch (e: any) {
    return { ok: false, error: e?.message || "Network error" };
  }
}

// 也可加入重试：指数退避、超时、AbortController 等（需要的话我再补全）
