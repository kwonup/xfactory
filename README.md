# X-FACTORY

Immersive AI Onboarding Experience

X-FACTORY는 `X-factor`와 `INTERX의 Factory`라는 두 가지 의미를 담은 웹 기반 온보딩 프로토타입입니다. 신규 입사자가 작고 밝은 야외형 3D 스마트팩토리를 탐험하며 회사와 기술을 이해하고, Core Value Quest와 AI Onboarding Buddy `IX`를 경험하는 것을 목표로 합니다.

## Current Status

- Next.js와 FastAPI 모노레포 기반 구성 완료
- X-FACTORY Landing과 `/onboarding` route 구현 완료
- React Three Fiber Canvas와 기본 loading fallback 구현 완료
- 밝은 잔디, 순환형 도로, 보행로와 공장 작업 바닥 구현 완료
- 소규모 야외 World 경계와 low-poly 자연물 구현 완료
- 코드 기반 Stylized Player와 절차적 Idle/Walk fallback 구현 완료
- 방향키 이동, 회전 보간과 Idle/Walk 자동 전환 구현 완료
- 높은 Third Person Follow Camera와 부드러운 추적 구현 완료
- Factory Zone, Mission, Core Value Quest, IX Chat, LangChain RAG는 이후 단계에서 구현

현재 3D Scene은 기반 지형 단계입니다. 소형 공장동과 각 온보딩 Zone은 이후 지정된 Commit에서 추가합니다.

## Visual Direction

```text
Bright · Cozy · Low-poly · Miniature · Industrial + Nature
```

- 거대한 Campus나 현실적인 실내 공장이 아닌 작은 야외 공장 단지
- 잔디, 짧은 도로, 보행로, 소형 공장동과 연구동
- 주요 Zone을 짧은 이동으로 탐색
- 건물 내부 대신 설비, 안내판, Value Station, IX와 상호작용

## Repository Structure

```text
.
├── apps/
│   ├── api/                 # FastAPI backend
│   └── web/                 # Next.js frontend
├── docs/
│   ├── content/             # RAG knowledge sources
│   ├── CHANGELOG.md
│   ├── DECISIONS.md
│   ├── DEVELOPMENT_PLAN.md
│   └── assets.md
├── AGENTS.md                # Implementation rules
├── FEATURE_CHECKLIST.md     # Required feature status
└── .env.example
```

## Runtime Baseline

- Node.js 24.x
- npm 11.16.0
- Python 3.13.15

Node 범위는 root `package.json`, Python 정적 분석 기준은 `apps/api/pyproject.toml`에서 관리합니다.

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

`.env.example`을 참고해 로컬 환경 파일을 생성합니다. 실제 API Key와 Supabase Service Role Key는 Git에 포함하지 않습니다.

## Project Documents

- [개발 계획](./docs/DEVELOPMENT_PLAN.md)
- [필수 기능 체크리스트](./FEATURE_CHECKLIST.md)
- [기술·제품 결정](./docs/DECISIONS.md)
- [변경 기록](./docs/CHANGELOG.md)
- [3D 에셋 및 라이선스](./docs/assets.md)
- [Core Value 공식 원문](./docs/content/core-values.md)

## Commit Workflow

한 번에 하나의 Commit 범위만 구현합니다. Codex는 구현과 검증 후 한국어 Conventional Commit 메시지만 추천하며, 실제 staging과 commit, push는 사용자가 수행합니다.
