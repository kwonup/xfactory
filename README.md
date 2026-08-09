# INTERX WORLD

Immersive AI Onboarding Experience

INTERX WORLD는 신규 입사자가 웹 브라우저의 3D 공장을 탐색하고, 미션형 온보딩과 AI Onboarding Buddy `IX`를 경험하는 프로토타입입니다.

현재 저장소는 Commit 01의 최소 Frontend/Backend 실행 환경만 포함합니다. 3D Scene, Mission, Core Value Quest, NPC, RAG는 이후 Commit Plan에 따라 한 단계씩 추가합니다.

## Repository Structure

```text
.
├── apps/
│   ├── api/       # FastAPI backend
│   └── web/       # Next.js frontend
├── docs/          # Architecture and content documents
├── .env.example
├── AGENTS.md
└── FEATURE_CHECKLIST.md
```

## Prerequisites

- Node.js 20.9 이상
- npm 10 이상
- Python 3.9 이상

## Frontend

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`을 엽니다.

검증 명령:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

## Backend

```bash
cd apps/api
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -r requirements-dev.txt
uvicorn app.main:app --reload
```

API는 기본적으로 `http://localhost:8000`에서 실행됩니다.

```bash
curl http://localhost:8000/health
```

예상 응답:

```json
{"status":"ok"}
```

Backend 검증 명령:

```bash
ruff check .
mypy app tests
pytest
```

## Environment Variables

`.env.example`을 참고해 로컬 환경 파일을 생성합니다. 실제 API Key와 Service Role Key는 Git에 커밋하지 않습니다.
