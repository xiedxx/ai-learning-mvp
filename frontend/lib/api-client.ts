import { sha256, hmacSHA256Base64 } from "./crypto";

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID!;
const SIGN_KEY = process.env.NEXT_PUBLIC_SIGN_KEY!;

export async function sign(
  path: string,
  method: string,
  body?: Record<string, unknown>
) {
  const ts = Math.floor(Date.now() / 1000).toString();
  const nonce = crypto.randomUUID().replace(/-/g, "");
  const bodyJson = body ? JSON.stringify(body) : "";
  const bodyHash = await sha256(bodyJson);

  const canonical = [method, path, "", bodyHash, ts, nonce].join("\n");
  const sig = await hmacSHA256Base64(SIGN_KEY, canonical);

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "X-Client-Id": CLIENT_ID,
    "X-Timestamp": ts,
    "X-Nonce": nonce,
    "X-Signature": sig,
  };

  return { headers, body: bodyJson };
}

export async function request<T>(opts: {
  base: string;       // base URL
  path: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: Record<string, unknown>; // 避免 any
}): Promise<T> {
  const method = opts.method ?? "GET";
  const { headers, body } = await sign(opts.path, method, opts.body);

  const res = await fetch(`${opts.base}${opts.path}`, {
    method,
    headers,
    body: body || undefined,
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json() as Promise<T>;
}

