from fastapi import FastAPI
import redis

app = FastAPI()
r = redis.Redis(host="redis", port=6379, decode_responses=True)

@app.get("/")
def health_check():
    return {"status": "ok"}

@app.get("/ai/echo")
def echo(msg: str):
    return {"echo": msg}

