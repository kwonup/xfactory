from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_app_metadata_uses_x_factory_brand() -> None:
    assert app.title == "X-FACTORY API"
    assert "X-FACTORY" in app.description


def test_health_returns_ok() -> None:
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}
