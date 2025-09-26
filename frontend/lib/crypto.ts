// 计算 SHA256 (hex 输出)
export async function sha256(data: string) {
  const enc = new TextEncoder().encode(data);
  const digest = await crypto.subtle.digest("SHA-256", enc);
  return Array.from(new Uint8Array(digest))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

// HMAC-SHA256 (Base64 输出)
export async function hmacSHA256Base64(key: string, data: string) {
  const enc = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    enc.encode(key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", cryptoKey, enc.encode(data));
  return Buffer.from(new Uint8Array(sig)).toString("base64");
}
  