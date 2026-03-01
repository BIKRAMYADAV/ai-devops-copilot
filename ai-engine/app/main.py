from fastapi import FastAPI
from app.api.v1.endpoints.analyze import router
app = FastAPI(title="AI devops copilot")

app.include_router(router, prefix="/api/v1")

@app.get("/health")
def health():
    return {"status": "ai engine running"}
