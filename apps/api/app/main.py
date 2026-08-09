from fastapi import FastAPI

app = FastAPI(
    title="INTERX WORLD API",
    description="Backend API for the INTERX WORLD onboarding experience.",
    version="0.1.0",
)


@app.get("/health", tags=["system"])
async def health() -> dict[str, str]:
    """Return the API health status."""
    return {"status": "ok"}
