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

### 구현 메모

Commit 10에서 Player를 반경 `0.34`의 원형으로, 구조물을 World 좌표 기반 AABB로 표현했다. 충돌은 X/Z축을 나누어 해결해 벽면 이동을 허용하고, 이동 거리를 세부 step으로 나누어 설비 관통을 방지한다.

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

## ADR-010 — Follow Camera는 고정된 World 방향을 유지한다

- 상태: Accepted
- 결정일: 2026-08-09

### 결정

Camera는 Player 위치를 부드럽게 추적하지만 Player 회전에 맞춰 공전하지 않는다. 높은 고정 offset과 look target offset을 사용하고 position과 target을 서로 다른 응답 속도로 보간한다.

### 이유

작은 디오라마형 공장의 방향성을 일관되게 유지하고, 방향 전환 때마다 배경이 회전해 발생하는 멀미와 시각적 혼란을 줄일 수 있다. World 축 기반 방향키 조작과도 자연스럽게 연결된다.

## ADR-011 — Zone 단계에서 최소 Zustand World Store를 도입한다

- 상태: Accepted
- 결정일: 2026-08-09

### 결정

Zustand 5를 직접 dependency로 추가하고 Store에는 `currentZone`과 setter만 둔다. Player Zone Tracker가 bounds 결과가 달라질 때만 Store를 갱신하고 DOM Indicator가 이를 구독한다.

### 이유

Canvas 내부 Player 위치와 Canvas 밖 HUD, 이후 Chat/RAG Context가 동일한 Zone 상태를 공유해야 한다. 현재 필요한 필드만 추가하면 React Context 연결을 반복하지 않으면서 다음 기능을 미리 구현하지 않을 수 있다.

## ADR-012 — Interaction 판정과 UI를 분리한다

- 상태: Accepted
- 결정일: 2026-08-09

### 결정

Interaction target은 World 좌표와 반경을 가진 공통 데이터로 정의한다. Canvas 내 tracker는 Player와 가장 가까운 target만 Zustand에 기록하고, 입력과 Prompt는 Canvas 밖 DOM에서 처리한다.

### 이유

각 3D object에 거리 계산과 키보드 listener를 반복하지 않아도 된다. 최근접 선택을 순수 함수로 검증할 수 있고, 향후 Info Modal·Core Value Quest·IX Chat이 동일한 활성·닫기 흐름을 재사용할 수 있다.

## ADR-013 — 검증되지 않은 INTERX 정보는 Modal에 채우지 않는다

- 상태: Accepted
- 결정일: 2026-08-09

### 결정

공식 회사·비전·기술 자료가 제공되기 전까지 Information Modal은 사용자가 제공한 X-FACTORY 온보딩 체험 구조만 설명한다. 이 내용은 화면에 `[DEMO DATA]`로 표시하고, 공식 사실이 아님을 본문에서도 명확히 안내한다.

### 이유

빈 Modal보다 전체 상호작용 흐름을 검증할 수 있으면서도, 확인되지 않은 INTERX 내부 정보가 실제 사실처럼 노출되는 위험을 피할 수 있다. 후속 공식 자료는 출처와 함께 대체한다.
