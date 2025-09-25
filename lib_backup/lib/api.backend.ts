import { request } from "./api-client";
import { ENV } from "@/lib/env";
import { ApiResult, Paginated } from "@/types";

export type User = { id: number; name: string; email: string };

export function getUsers(page = 1, pageSize = 10): Promise<ApiResult<Paginated<User>>> {
  return request<Paginated<User>>(ENV.BACKEND_BASE_URL, `/api/users?page=${page}&pageSize=${pageSize}`);
}

export function createUser(payload: { name: string; email: string; password: string }): Promise<ApiResult<User>> {
  return request<User>(ENV.BACKEND_BASE_URL, "/api/users", { method: "POST", body: payload });
}
  