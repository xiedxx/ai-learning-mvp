import { request } from "./api-client";
import { ENV } from "@/lib/env";
import { ApiResult } from "@/types";

export type EchoResp = { echo: string };
export function echo(msg: string): Promise<ApiResult<EchoResp>> {
  return request<EchoResp>(ENV.AI_BASE_URL, `/ai/echo?msg=${encodeURIComponent(msg)}`);
}

export type ChatReq = { messages: { role: "user"|"system"|"assistant"; content: string }[] };
export type ChatResp = { reply: string; usage?: any };
export function chat(body: ChatReq): Promise<ApiResult<ChatResp>> {
  return request<ChatResp>(ENV.AI_BASE_URL, "/v1/chat", { method: "POST", body });
}
