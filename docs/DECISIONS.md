# X-FACTORY Decisions

중요한 제품·기술 결정을 나중에 추적할 수 있도록 기록한다.

## ADR-001 — 제품명은 X-FACTORY를 유지한다

- 상태: Accepted
- 결정일: 2026-08-09

### 결정

제품명은 `X-FACTORY`를 사용한다. `X-factor`와 `INTERX의 Factory`라는 두 가지 의미를 담는다. 첨부 기획의 `INTERX WORLD`는 초기 콘셉트 명칭으로만 취급한다.

### 이유

사용자가 이름 변경을 이미 확정했고 package와 Landing에도 적용되어 있다. 다시 이름을 바꾸면 제품 정체성과 코드가 불필요하게 흔들린다.

## ADR-002 — 작고 밝은 야외형 Smart Factory를 만든다

- 상태: Accepted
- 결정일: 2026-08-09

### 결정

어두운 실내 공장과 대규모 Campus 대신, 주요 Zone이 짧은 동선 안에 밀집된 밝고 아기자기한 야외형 low-poly 공장 단지를 만든다.

### 이유

온보딩 콘텐츠를 공간적으로 구분하면서도 탐색 피로와 3D 구현량을 줄일 수 있다. 자연물은 공장 분위기를 부드럽게 하는 최소한의 보조 요소로 사용한다.

## ADR-003 — 건물 내부는 MVP에서 구현하지 않는다

- 상태: Accepted
- 결정일: 2026-08-09

### 결정

Player는 건물 내부로 진입하지 않는다. 건물 앞 안내판, 설비, Value Station, IX NPC와 상호작용한다.

### 이유

동일한 온보딩 흐름을 훨씬 작은 Scene과 충돌 범위로 구현할 수 있다.

## ADR-004 — Geometry-first 에셋 전략을 사용한다

- 상태: Accepted
- 결정일: 2026-08-09

### 결정

지형, 도로, 기본 건물, 설비는 Three.js geometry를 우선 재사용한다. Player와 IX를 포함한 외부 GLB는 라이선스와 효과가 명확할 때만 추가한다.

### 이유

초기 로딩 용량과 라이선스 위험을 줄이고, World scale과 상호작용 로직을 먼저 검증할 수 있다.

## ADR-005 — 초기 충돌은 단순 Collider로 구현한다

- 상태: Accepted
- 결정일: 2026-08-09

### 결정

World boundary와 건물·설비 충돌은 bounding box 또는 동등한 단순 collider로 시작한다. physics dependency는 실제 필요성이 확인될 때만 검토한다.

### 이유

MVP에는 중력, 점프, 복잡한 rigid body simulation이 필요하지 않다.

## ADR-006 — Python 3.13.15 기준을 유지한다

- 상태: Accepted
- 결정일: 2026-08-09

### 결정

현재 검증된 Python 3.13.15와 `py313` 도구 설정을 유지한다. 첨부 기획의 Python 3.11 전환은 적용하지 않는다.

### 이유

현재 FastAPI 환경이 동작하고 있으며 즉시 하향할 기술적 근거가 없다. LangChain, Supabase 또는 배포 플랫폼에서 실제 호환 문제가 확인되면 별도 결정으로 재검토한다.

## ADR-007 — 사용자가 Git Commit을 수행한다

- 상태: Accepted
- 결정일: 2026-08-09

### 결정

Codex는 구현과 검증 후 한국어 Conventional Commit 메시지만 추천한다. staging, commit, push는 사용자가 직접 수행한다.

### 이유

사용자가 명시적으로 확정한 협업 방식이며, 각 단계의 검토 지점을 보장한다.

## ADR-008 — Feature Checklist는 저장소 루트에 유지한다

- 상태: Accepted
- 결정일: 2026-08-09

### 결정

기존 [`FEATURE_CHECKLIST.md`](../FEATURE_CHECKLIST.md)를 이동하지 않고 공식 체크리스트로 유지한다.

### 이유

이미 프로젝트 작업 흐름에서 사용 중이며 문서 이동으로 얻는 이점보다 링크와 이력의 혼란이 크다.

## ADR-009 — 방향키 이동은 World 축과 ref 기반 입력을 사용한다

- 상태: Accepted
- 결정일: 2026-08-09

### 결정

`ArrowUp/Down`은 World의 `-Z/+Z`, `ArrowLeft/Right`는 `-X/+X`로 이동한다. 동시 입력은 정규화하고, 눌린 키와 매 프레임 위치는 React state가 아닌 ref로 관리한다.

### 이유

현재 overview camera와 다음 elevated follow camera에서 예측 가능한 조작 방향을 유지할 수 있다. 매 frame React render 없이 이동과 animation을 갱신하여 3D Scene 성능도 안정적으로 유지한다.
