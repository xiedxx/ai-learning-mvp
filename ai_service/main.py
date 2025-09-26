from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
import hmac, hashlib, base64, os, time

import logging
logging.basicConfig(level=logging.INFO)


app = FastAPI()

# 从环境变量读取 origins（逗号分隔字符串 → 列表）
cors_origins = os.getenv("CORS_ORIGINS", "")
origins = [o.strip() for o in cors_origins.split(",") if o.strip()]

# ⚡ 如果 origins 为空，可临时允许全部（开发阶段调试用）
if not origins:
    origins = ["*"]

# ⚡ 明确写出 OPTIONS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,            # 可以改成 ["*"] 测试是否生效
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


# 签名配置
CLIENT_ID = os.getenv("API_CLIENT_ID", "web_mvp")
SIGN_KEY = os.getenv("API_SIGN_KEY", "replace-with-dev-only-key")
SKEW = int(os.getenv("SIGN_SKEW_SECONDS", "300"))

# HMAC 验证依赖
async def verify_hmac(request: Request):

    headers = request.headers
    client_id = headers.get("X-Client-Id")
    ts = headers.get("X-Timestamp")
    nonce = headers.get("X-Nonce")
    sig = headers.get("X-Signature")

    if not all([client_id, ts, nonce, sig]):
        raise HTTPException(400, "Missing signature")
    if client_id != CLIENT_ID:
        raise HTTPException(401, "Bad client")
    
    now = int(time.time())
    ts_int = int(ts)
    if abs(now - ts_int) > SKEW:
        raise HTTPException(401, "Timestamp skew")

    body = await request.body()
    body_hash = hashlib.sha256(body).hexdigest()
    canonical = "\n".join([
        request.method.upper(),
        request.url.path,
        "",
        body_hash,
        ts,
        nonce
    ])
    server_sig = base64.b64encode(
        hmac.new(SIGN_KEY.encode(), canonical.encode(), hashlib.sha256).digest()
    ).decode()

    if not hmac.compare_digest(server_sig, sig):
        raise HTTPException(401, "Bad signature")



# 聊天接口
@app.post("/chat")
async def chat(data: dict,request: Request):
    await verify_hmac(request)   # 显式调用
    prompt = data.get("prompt", "")
    return {"response": f"AI says: {prompt[::-1]}"}

# 健康检查接口（方便确认服务是否启动）
@app.get("/health")
async def health():
    return {"status": "ok"}

@app.options("/{path:path}")
async def options_handler(path: str):
    return {"status-code": "204"}