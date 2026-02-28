from fastapi import FastAPI

app = FastAPI(title="AI devops copilot")

@app.get("/health")
def health():
    return {"status": "ai engine running"}
