import { request } from "./api-client";

const BACKEND_BASE = process.env.NEXT_PUBLIC_BACKEND_BASE_URL!;

export async function getUsers() {
  return request<{ id:number; name:string; email:string }[]>({
    base: BACKEND_BASE,
    path: "/api/users",
    method: "GET",
  });
}

// 示例：用户登录（Laravel 认证可扩展 JWT/Sanctum）
export async function login(email: string, password: string) {
  return request<{ token: string }>({
    base: BACKEND_BASE,
    path: "/api/login",
    method: "POST",
    body: { email, password },
  });
}
