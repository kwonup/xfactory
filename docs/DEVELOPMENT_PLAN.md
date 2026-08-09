# X-FACTORY Development Plan

## 1. 현재 기준

X-FACTORY는 기존 Next.js/FastAPI 모노레포를 유지하면서 단계적으로 구현한다. 현재 커밋된 코드 기준으로 프로젝트 기반, Landing, React Three Fiber Canvas가 준비되어 있다.

새 3D 방향은 거대한 캠퍼스나 사실적인 실내 공장이 아니다. 주요 Zone이 짧은 동선 안에 모여 있는 **작고 밝은 야외형 로우폴리 Smart Factory**다.

현재 작업 트리에 남아 있는 어두운 실내 공장 코드는 새 완료 조건을 충족하지 않는다. Canvas와 컴포넌트 경계, Robot/Conveyor 등 코드 기반 geometry는 재사용할 수 있지만 시각 구성은 다음 3D Commit에서 전환한다.

## 2. 구현 전략

### 유지

- Next.js App Router와 `/onboarding` route
- FastAPI app과 `/health`
- React Three Fiber Canvas, Suspense, loading fallback
- `FactoryScene`과 `FactoryEnvironment`의 책임 분리
- 코드 기반 low-poly geometry
- Frontend/Backend 테스트와 품질 명령

### 전환

- 어두운 실내 셸 → 밝은 야외 지형
- 금속 grid 바닥 → 잔디, 도로, 보행로, 공장 작업 바닥
- 4개 색상 플랫폼 → 의미 있는 6개 Zone
- 고정된 전시 카메라 → elevated follow camera
- 대형 공간 → 한눈에 파악되는 밀집형 단지

### 나중에 추가

- Stylized Player와 IX GLB 또는 geometry fallback
- Zustand 기반 World state
- Interaction, Mission, Core Value Quest
- FastAPI Chat API와 LangChain RAG
- Supabase pgvector

## 3. Target Architecture

```text
apps/web
├── app
├── components
│   ├── three
│   │   ├── factory-canvas
│   │   ├── factory-scene
│   │   ├── factory-environment
│   │   ├── player
│   │   └── ix
│   └── onboarding
│       ├── mission-hud
│       ├── interaction-prompt
│       ├── info-modal
│       ├── value-quest
│       ├── value-passport
│       └── ix-chat
├── features
│   ├── player
│   ├── interaction
│   ├── mission
│   ├── core-values
│   └── chat
└── stores

apps/api/app
├── api
├── schemas
└── services/rag
    ├── loader
    ├── splitter
    ├── retrieval
    ├── prompt
    └── generation
```

현재 구조에 필요해지는 시점에만 폴더를 추가한다. 계획을 맞추기 위한 빈 폴더나 wrapper는 만들지 않는다.

## 4. Commit Plan

### Commit 01 — Project bootstrap · 완료

- Next.js, TypeScript, Tailwind CSS
- FastAPI와 `/health`
- Monorepo와 기본 문서

### Commit 02 — Landing page · 완료

- X-FACTORY Hero와 CTA
- `/onboarding` route
- 기본 반응형 UI

### Commit 03 — 3D canvas foundation · 완료

- React Three Fiber Canvas
- 기본 Camera, Light, Ground
- Suspense와 loading fallback

### Commit 04 — Product direction documentation · 완료

- 밝은 야외 Smart Factory 방향 확정
- `AGENTS.md`와 Feature Checklist 갱신
- Development Plan, Decisions, Changelog 생성
- Core Value 공식 원문 분리
- 코드와 dependency는 변경하지 않음

### Commit 05 — Bright outdoor factory foundation · 완료

- 밝은 sky/background와 부드러운 light
- Grass, factory floor, 짧은 road와 sidewalk
- 낮은 경계와 소수의 자연물
- 전체가 한눈에 들어오는 소규모 layout
- Player, Zone 판정, Interaction은 구현하지 않음

### Commit 06 — Stylized player · 완료

- 친근한 low-poly Player 또는 geometry fallback
- spawn 위치
- Idle/Walk animation 연결과 안전한 fallback

### Commit 07 — Arrow-key movement · 완료

- 방향키 입력과 delta 기반 이동
- 이동 방향 회전 보간
- Idle/Walk 전환
- 폼 focus와 브라우저 scroll 예외 처리

### Commit 08 — Elevated follow camera

- 높은 Third Person Camera
- 부드러운 position/look-at 보간
- FOV, offset, 회전 범위 조정

### Commit 09 — Factory zones

- Welcome Plaza
- Company Vision Lab
- Smart Factory
- AI / SDM Lab
- Core Value Park
- IX Area
- Zone data와 위치 감지

### Commit 10 — World collision

- World boundary
- 건물과 주요 설비 collider
- 단순 bounding box 기반 충돌
- physics dependency는 필요성이 확인될 때만 검토

### Commit 11 — Interaction system

- 공통 Interaction Target
- proximity와 nearest target
- `E` prompt와 `ESC` 닫기

### Commit 12 — Information interactions

- Company Vision, Smart Factory, AI/SDM 정보 Modal
- 확인된 공식 콘텐츠만 사용
- Mission event 연결점 제공

### Commit 13 — Mission state

- 4개 Mission 데이터
- 완료, 중복 방지, progress 계산
- Zustand state

### Commit 14 — Mission HUD

- 현재·완료·대기 Mission
- Progress bar
- 현재 Zone과 controls

### Commit 15 — Core Value content model

- 12개 Value와 4개 Cluster
- 12개 Scenario, choices, feedback, takeaway
- 공식 원문과 UX용 해석 구분

### Commit 16 — Core Value Quest

- 4개 Station에서 Micro Quest 진행
- 설명형 feedback
- Value Passport와 Reflection
- 평가와 점수화 배제

### Commit 17 — IX NPC

- Stylized IX 또는 geometry fallback
- Idle, nameplate, 대화 proximity

### Commit 18 — IX Chat UI

- DOM Chat Panel
- 질문 입력과 추천 질문
- idle, loading, success, error
- 결정적인 mock 응답

### Commit 19 — Chat API contract

- `POST /api/v1/chat`
- World Context request schema
- Answer와 Source response schema
- 외부 서비스 없는 API 계약 테스트

### Commit 20 — Frontend/backend integration

- API client
- Zone과 완료 Mission 전달
- offline, timeout, 500 처리

### Commit 21 — LangChain document pipeline

- 공식 Markdown knowledge base
- LangChain Document loader
- RecursiveCharacterTextSplitter
- Embedding abstraction과 ingestion test

### Commit 22 — Supabase pgvector

- pgvector migration
- LangChain Vector Store와 Retriever
- Top-K 4 검색
- test double 유지

### Commit 23 — RAG answer generation

- ChatPromptTemplate
- LLM chain
- Sources mapping
- empty retrieval fallback
- Prompt Injection 방어

### Commit 24 — World-aware AI context

- currentZone
- completedMissions
- coreValueId
- scenarioId
- `여기`, `방금 선택`, `다음 위치` 질문 해석

### Commit 25 — Onboarding completion

- 실제 Chat 성공 후 Mission 04 완료
- 전체 완료 조건
- Onboarding Complete UI

### Commit 26 — Progress persistence

- Mission, Value, Reflection localStorage 저장
- versioning과 손상 데이터 fallback

### Commit 27 — UX and accessibility

- 밝은 World와 일치하는 UI polish
- 최초 controls 안내
- keyboard focus, mobile, WebGL fallback
- model과 Chat 오류 상태

### Commit 28 — Performance

- Asset 크기 점검
- light, shadow, material 제한
- frame loop와 rerender 최적화

### Commit 29 — Tests and quality gate

- 핵심 frontend/backend 회귀 테스트 보강
- lint, typecheck, test, build 전체 검증

### Commit 30 — Final documentation

- Architecture와 RAG 문서
- 실행, 환경 변수, 제한사항
- Asset attribution 최종 확인

### Commit 31 — Deployment readiness

- Production 환경 변수 검증
- CORS와 API URL
- 실행 명령과 Secret 노출 검사
- 실제 배포는 별도 승인 후 진행

## 5. Commit 경계 원칙

- 현재 단계의 acceptance criteria를 충족하는 최소 변경만 수행한다.
- UI와 state, API와 RAG처럼 큰 관심사를 한 Commit에 섞지 않는다.
- 각 단계에서 변경된 기능만 `FEATURE_CHECKLIST.md`의 `DONE`으로 바꾼다.
- `CHANGELOG.md`에는 실제 변경된 내용만 기록한다.
- 새 dependency나 중요한 기술 선택은 `DECISIONS.md`에 이유를 남긴다.
- 모든 변경은 작업 트리에 남기며 실제 Commit은 사용자가 수행한다.
