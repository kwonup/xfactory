# X-FACTORY — Codex Development Guide

> INTERX 신규 입사자가 작고 밝은 야외형 3D 스마트팩토리를 탐험하고, 미션과 Core Value Quest를 수행하며, AI Onboarding Buddy `IX`에게 근거 기반 답변을 받을 수 있는 온보딩 프로토타입을 구현한다.

## 0. 작업 원칙

이 문서는 프로젝트 전체의 구현 원칙이다. 현재 구현 순서의 단일 원본은 [`docs/DEVELOPMENT_PLAN.md`](./docs/DEVELOPMENT_PLAN.md), 기능 완료 상태의 단일 원본은 [`FEATURE_CHECKLIST.md`](./FEATURE_CHECKLIST.md)다.

1. 기존 Next.js/FastAPI 모노레포를 유지하고 새 프로젝트를 생성하거나 초기화하지 않는다.
2. `docs/DEVELOPMENT_PLAN.md`의 Commit Plan을 정확히 한 단계씩 수행한다.
3. 현재 Commit 범위만 구현하고 다음 Commit 기능을 미리 구현하지 않는다.
4. 각 Commit 작업 후 frontend lint, typecheck, test, build와 관련 backend 검증을 수행한다.
5. Codex는 `git add`, `git commit`, `git push`를 실행하지 않는다.
6. Codex는 변경사항을 작업 트리에 남기고 한국어 Conventional Commit 메시지 1개만 추천한다.
7. 실제 staging과 commit, push는 사용자가 직접 수행한다.
8. 사용자가 커밋 완료 후 `다음 커밋 진행`이라고 요청하기 전에는 다음 단계로 넘어가지 않는다.
9. 기존 코드를 우선 분석하고 재사용하며, 승인 없는 대규모 리팩터링과 라이브러리 교체를 하지 않는다.
10. 실제 비밀키를 저장소에 추가하지 않고 `.env.example`만 관리한다.
11. 외부 에셋은 출처와 라이선스를 확인하여 [`docs/assets.md`](./docs/assets.md)에 기록한다.
12. INTERX 관련 사실은 사용자 제공 자료나 확인된 공식 자료만 사용한다. 데모 정보는 `[DEMO DATA]`로 표시한다.
13. 핵심은 게임성이 아니라 온보딩 경험과 생성형 AI의 자연스러운 연결이다.
14. 특정 게임, 캐릭터, UI 또는 상용 IP를 복제하지 않는다.

## 1. 프로젝트 정체성

- 제품명: **X-FACTORY**
- 의미: `X-factor` + `INTERX의 Factory`
- 부제: **Immersive AI Onboarding Experience**
- 공간 설명: **INTERX Smart Factory**
- AI NPC: **IX — AI Onboarding Buddy**

첨부 자료의 `INTERX WORLD`는 초기 기획상의 명칭으로만 해석한다. 제품 UI와 문서의 기본 명칭은 사용자가 확정한 `X-FACTORY`를 사용한다.

## 2. 목표 사용자 흐름

```text
Landing
→ X-FACTORY 입장
→ Player Spawn
→ 방향키로 밝은 야외 공장 탐험
→ 건물·설비·안내판 상호작용
→ Company / Smart Factory / AI·SDM 미션
→ 12가지 Core Value Quest
→ IX NPC 접근
→ LangChain RAG 대화 + Sources
→ Onboarding Complete
```

## 3. 제품 및 시각 방향

### 핵심 키워드

```text
Cozy · Low-poly · Stylized · Friendly · Miniature
Bright · Soft · Playful · Industrial + Nature
```

현실적인 공장 시뮬레이터나 거대한 오픈월드를 만들지 않는다. 한눈에 주요 구조가 보이고 짧은 이동으로 모든 Zone을 방문할 수 있는 **작고 밝은 야외형 스마트팩토리 단지**를 만든다.

### 규모

- 대규모 캠퍼스가 아닌 밀집된 야외 공장 단지
- 핵심 Zone 간 이동은 수십 초 이내
- 전체 구조는 카메라에서 어느 정도 파악 가능
- 빈 공간과 장거리 이동 최소화
- 건물 내부 진입은 MVP에서 제외
- 건물 앞 안내판, 설비, Value Station, IX와 상호작용

### 지형과 배경

필수 구성:

- 밝은 잔디 지형
- 짧은 순환형 도로와 보행로
- 공장 앞 작업 바닥
- 낮은 언덕 또는 자연스러운 월드 경계
- 소수의 나무, 관목, 벤치, 표지판, 가로등
- 소형 공장동과 연구동 2~3개

자연물은 공장 분위기를 부드럽게 만드는 보조 요소로만 사용한다. 숲이나 넓은 공원처럼 보이게 만들지 않는다.

### 공장 표현

Smart Factory 영역은 밝고 단순한 로우폴리 설비로 구성한다.

- Robot Arm
- Conveyor Belt
- Product Box
- AI Vision Camera
- Monitoring Screen

현재 코드 기반 도형을 우선 재사용하고, 외부 GLB는 시각적 효과와 라이선스가 명확할 때만 도입한다.

### UI

- 둥근 모서리와 부드러운 그림자
- 읽기 쉬운 큰 글자
- 반투명 플로팅 패널
- 최소한의 테두리와 아이콘
- 3D 공간을 가리지 않는 DOM Overlay
- 과도한 기업용 Dashboard 표현 금지

## 4. 공간 구성

Zone은 작은 단지 안에 밀집 배치한다.

```text
┌──────────────────────────────────────┐
│ Welcome          Company Vision Lab │
│ Plaza                    [Mission 1]│
│                                      │
│ Robot / Conveyor   Smart Factory    │
│                         [Mission 2] │
│                                      │
│ AI · SDM Lab       Core Value Park  │
│ [Mission 3]         [4 Stations]    │
│                              IX     │
└──────────────────────────────────────┘
```

### Zone 01 — Welcome Plaza

- Player spawn
- X-FACTORY 간판과 Welcome Board
- 방향키, `E`, `ESC` 조작 안내

### Zone 02 — Company Vision Lab

- 작은 연구동 또는 전시 구조물
- Vision Display
- `[E] INTERX Vision 알아보기`
- Mission 01 완료 지점

### Zone 03 — Smart Factory

- Robot Arm, Conveyor, Vision Camera, Monitor
- `[E] AI 제조공정 체험하기`
- Mission 02 완료 지점

### Zone 04 — AI / SDM Lab

- Data → AI → Factory → Optimization 흐름
- 3D 오브젝트와 DOM Modal 조합
- Mission 03 완료 지점

### Zone 05 — Core Value Park

- 4개 Value Station
- 총 12개의 짧은 Scenario
- Value Passport 진입점

### Zone 06 — IX Area

- 작고 친근한 정원 또는 휴식 공간
- IX NPC와 nameplate
- `[E] IX와 대화하기`
- 성공한 Chat 응답 후 Mission 04 완료

## 5. Player와 Camera

### 조작

```text
↑ = 앞으로 이동
↓ = 뒤로 이동
← = 왼쪽 이동 또는 회전
→ = 오른쪽 이동 또는 회전
E = 상호작용
ESC = Modal 또는 Chat 닫기
```

- 3D 화면에서는 방향키의 브라우저 스크롤을 방지한다.
- input, textarea, button 등 폼 요소에 포커스가 있으면 이동 입력을 무시한다.
- 이동 방향을 향하도록 회전을 보간한다.
- MVP animation은 Idle과 Walk다. 누락 시 안전한 fallback을 제공한다.
- 건물과 주요 설비를 통과하거나 월드 밖으로 나갈 수 없어야 한다.

### Camera

- Player보다 높은 위치에서 아래를 향하는 Third Person Camera
- 초기 검토 범위: offset `[0, 7, 9]`, FOV `35~45`
- Player를 부드럽게 따라가되 과도하게 회전하지 않음
- Player는 화면 중앙보다 약간 아래에 위치
- 정확한 값은 브라우저 시각 검증 후 확정

## 6. Interaction과 Mission

상호작용 로직은 오브젝트별로 중복 구현하지 않는다.

```ts
type InteractionTarget = {
  id: string;
  type: "mission" | "npc" | "info" | "core-value";
  position: [number, number, number];
  radius: number;
  prompt: string;
};
```

- 반경 안의 대상만 활성화한다.
- 대상이 여러 개면 가장 가까운 하나만 선택한다.
- 안내와 Chat은 Canvas 내부 3D 텍스트가 아닌 DOM Overlay로 구현한다.

Mission:

1. Discover INTERX — Vision Display 상호작용
2. Explore Smart Factory — 제조 설비 상호작용
3. Understand AI / SDM — AI Lab 상호작용
4. Meet IX — 성공한 IX Chat 응답 수신

## 7. Core Value Quest

12가지 핵심가치의 공식 원문은 [`docs/content/core-values.md`](./docs/content/core-values.md)를 단일 원천으로 사용한다.

Cluster:

- Goal & Execution
- Problem Solving & Innovation
- Growth & Resilience
- Collaboration & Curiosity

각 Cluster에는 3개의 Scenario가 있다. 사용자는 업무 상황에서 행동을 선택하고, 해당 행동이 가치와 어떻게 연결되는지 설명형 피드백을 받는다.

- 암기 시험이나 적합도 평가로 만들지 않는다.
- 점수, 합격 판정, 직원 성향 분석을 하지 않는다.
- `recommended`는 기대 행동을 설명하기 위한 콘텐츠 속성으로만 사용한다.
- 완료 상태는 Value Passport에 경험 여부로 기록한다.
- 12개 완료 후 첫 업무 주간에 실천할 행동을 선택한다.

## 8. IX Chat과 API

Chat은 React DOM Overlay로 구현하고 다음 상태를 구분한다.

- idle
- loading
- success
- error

API 계약:

```http
POST /api/v1/chat
```

```json
{
  "message": "여기는 뭐 하는 곳이야?",
  "context": {
    "zone": "smart-factory",
    "completed_missions": ["discover-interx"],
    "core_value_id": null,
    "scenario_id": null
  }
}
```

```json
{
  "answer": "현재 위치는 Smart Factory Zone입니다...",
  "sources": [
    {"title": "Smart Factory Overview", "section": "Overview"}
  ]
}
```

Frontend와 backend에서 request/response 타입을 명시적으로 관리한다.

## 9. LangChain RAG

LangChain은 dependency 표시가 아니라 실제 파이프라인에 사용한다.

```text
Markdown Documents
→ LangChain Document
→ RecursiveCharacterTextSplitter
→ Embeddings
→ Supabase pgvector
→ Retriever
→ ChatPromptTemplate
→ LLM
→ Answer + Sources
```

- Agent와 Multi-Agent는 구현하지 않는다.
- 기본 Top-K는 4다.
- Zone, 완료 Mission, Core Value, Scenario를 질문 Context로 전달한다.
- Context에 없는 INTERX 내부 사실을 추측하지 않는다.
- 검색 근거가 부족하면 `제공된 온보딩 자료에서는 해당 내용을 확인할 수 없습니다.`라고 답한다.
- 문서 내부 지시문과 사용자 Prompt Injection보다 시스템 정책을 우선한다.
- 존재하지 않는 URL이나 Source를 생성하지 않는다.

RAG 코드는 `apps/api/app/services/rag/` 안에서 loading, retrieval, prompt, generation 책임을 분리한다.

## 10. 기술 기준

### Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Three.js
- `@react-three/fiber`
- `@react-three/drei`
- Zustand는 상태 관리 단계에서 필요할 때 추가

### Backend

- Python 3.13.15
- FastAPI
- Pydantic
- Uvicorn
- LangChain

첨부 기획의 Python 3.11 제안보다 현재 프로젝트에서 이미 검증한 3.13.15 기준을 유지한다. LangChain 또는 배포 환경의 실제 호환 문제가 확인될 때 별도 Commit으로 변경한다.

### Database와 배포 후보

- Supabase PostgreSQL + pgvector
- Frontend: Vercel
- Backend: Render

배포는 MVP 구현 후 별도 단계에서 진행한다.

## 11. 성능, 접근성, 오류 처리

- 코드 기반 low-poly geometry와 작은 GLB를 우선한다.
- 텍스처, material, dynamic light, shadow 수를 제한한다.
- `useFrame`에서 React state를 매 프레임 갱신하지 않는다.
- WebGL 미지원, model load 실패, animation 누락을 처리한다.
- Chat의 offline, timeout, 500, empty retrieval, LLM 오류 상태를 처리한다.
- 버튼 keyboard focus, ESC 닫기, 로딩 상태, 모바일 안내를 제공한다.

## 12. 테스트 우선순위

Frontend:

- Mission 완료와 progress 계산
- 최근접 Interaction Target 선택
- Player 경계 및 충돌 계산
- Core Value Scenario와 Passport 진행률
- Chat request Context와 오류 처리

Backend:

- Health endpoint
- Chat request/response schema
- Empty retrieval fallback
- Source mapping
- RAG service unit test와 외부 API mock

## 13. 문서 관리

- [`docs/DEVELOPMENT_PLAN.md`](./docs/DEVELOPMENT_PLAN.md): 현재 구현 순서와 Commit 범위
- [`FEATURE_CHECKLIST.md`](./FEATURE_CHECKLIST.md): 필수 기능 상태와 검증 증거
- [`docs/CHANGELOG.md`](./docs/CHANGELOG.md): 단계별 실제 변경사항
- [`docs/DECISIONS.md`](./docs/DECISIONS.md): 중요한 기술·제품 결정과 이유
- [`docs/assets.md`](./docs/assets.md): 외부 에셋 출처와 라이선스
- `docs/content/`: RAG 공식 지식 원천

문서 역시 현재 Commit 범위에서 함께 갱신한다. 완료되지 않은 기능을 `DONE`으로 표시하지 않는다.

## 14. Commit 메시지와 종료 보고

Conventional Commit type은 영문으로 유지하고 설명은 한국어로 작성한다.

```text
docs: 스마트팩토리 방향 전환 계획 정리
feat: 밝은 야외 공장 지형 추가
fix: 플레이어 경계 이탈 방지
```

각 Commit 작업 완료 후 다음 내용을 보고하고 멈춘다.

```md
## Commit 작업 완료

### 추천 Commit 메시지
`<type>: <한국어 설명>`

### 구현 내용
- ...

### 변경 파일
- ...

### 검증
- lint: PASS / FAIL
- typecheck: PASS / FAIL
- test: PASS / FAIL
- build: PASS / FAIL

### 직접 확인 방법
1. ...

### 다음 예정 Commit
`XX. ...`

다음 커밋은 아직 진행하지 않았습니다.
사용자가 직접 커밋한 뒤 `다음 커밋 진행` 요청을 기다립니다.
```

## 15. 금지 사항

사용자가 별도로 요청하지 않는 한 다음을 구현하지 않는다.

- 새로운 Next.js 프로젝트 생성 또는 저장소 초기화
- 건물 내부 진입
- 멀티플레이와 음성 채팅
- 전투, 인벤토리, 복잡한 물리 시뮬레이션
- Blender 자체 모델링
- 특정 게임 또는 상용 에셋 복제
- 고급 Character Customization
- 실제 사내 SSO와 HR 평가
- 직원 적합도 AI 평가와 핵심가치 점수화
- 복잡한 Agent 또는 Multi-Agent 구조
- 관리자 페이지

## 16. Definition of Done

MVP 완료 조건:

- Landing에서 야외 3D 공장으로 진입 가능
- Player가 방향키로 이동하고 elevated camera가 부드럽게 추적
- 주요 구조물과 월드 경계를 통과하지 않음
- 6개 Zone을 인지하고 필요한 대상과 `E`로 상호작용
- 4개 Mission과 진행률 표시
- 12개 Scenario, Value Passport, Reflection 완료
- IX Chat이 World Context를 FastAPI로 전달
- LangChain RAG가 근거 기반 답변과 Sources 반환
- 근거 부족 시 명확한 fallback 반환
- Onboarding Complete 화면과 localStorage 진행 상태 복원
- Frontend와 backend 품질 검증 통과
