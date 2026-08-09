from fastapi import FastAPI

app = FastAPI(
    title="X-FACTORY API",
    description="Backend API for the X-FACTORY onboarding experience.",
    version="0.1.0",
)


@app.get("/health", tags=["system"])
async def health() -> dict[str, str]:
    """Return the API health status."""
    return {"status": "ok"}
