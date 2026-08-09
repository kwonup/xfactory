# X-FACTORY — Feature Checklist

> 반드시 구현해야 하는 기능의 상태와 검증 증거를 추적한다. 상세 원칙은 [`AGENTS.md`](./AGENTS.md), 구현 순서는 [`docs/DEVELOPMENT_PLAN.md`](./docs/DEVELOPMENT_PLAN.md)를 따른다.

## 상태 관리 규칙

| 상태 | 의미 |
|---|---|
| `TODO` | 아직 완료 조건을 충족하지 않음 |
| `IN PROGRESS` | 현재 Commit 범위에서 작업 중 |
| `DONE` | 구현과 관련 검증을 모두 통과함 |
| `BLOCKED` | 외부 자료, 계정, 키 또는 사용자 결정이 필요함 |

- 관련 Commit의 lint, typecheck, test, build 이후에만 `DONE`으로 변경한다.
- 방향이 폐기된 기존 구현은 새 완료 조건의 증거로 사용하지 않는다.
- 새로운 요구사항은 계획과 결정 문서에 먼저 반영한다.
- 다음 Commit 기능을 미리 구현하지 않는다.

## 1. Project Foundation

| ID | 필수 기능 | 완료 조건 | Commit | 상태 | 검증 증거 |
|---|---|---|---:|---|---|
| PF-01 | Next.js + TypeScript 앱 | 개발 서버와 production build 실행 | 01 | DONE | Frontend build, route smoke |
| PF-02 | Tailwind CSS | 기본 스타일과 반응형 구성 | 01 | DONE | Frontend quality gate |
| PF-03 | FastAPI 앱 | `GET /health`가 200 반환 | 01 | DONE | Backend pytest, health smoke |
| PF-04 | Monorepo 구조 | `apps/web`, `apps/api`, `docs` 구성 | 01 | DONE | Repository structure |
| PF-05 | 환경 변수 안전성 | `.env.example`만 관리하고 비밀키 미포함 | 01 | DONE | `.gitignore`, tracked files |
| PF-06 | X-FACTORY 명칭 | package, UI, 문서에 제품명 적용 | 02/04 | DONE | Repository search |

## 2. Direction and Documentation

| ID | 필수 기능 | 완료 조건 | Commit | 상태 | 검증 증거 |
|---|---|---|---:|---|---|
| DC-01 | 제품 방향 | 작고 밝은 야외형 Smart Factory로 정의 | 04 | DONE | `AGENTS.md`, `DECISIONS.md` |
| DC-02 | 구현 계획 | 새 방향의 단계별 Commit Plan 작성 | 04 | DONE | `DEVELOPMENT_PLAN.md` |
| DC-03 | 기능 추적 | 새 완료 조건과 Commit 번호 반영 | 04 | DONE | 현재 문서 |
| DC-04 | 변경 기록 | 방향 전환 내역과 문서 변경 기록 | 04 | DONE | `CHANGELOG.md` |
| DC-05 | 에셋 정책 | 외부 에셋 출처·저자·라이선스 관리 | 04 | DONE | `docs/assets.md` |
| DC-06 | Core Value 원천 | 사용자 제공 12개 가치의 공식 원문 분리 | 04 | DONE | `docs/content/core-values.md` |

## 3. Landing and Navigation

| ID | 필수 기능 | 완료 조건 | Commit | 상태 | 검증 증거 |
|---|---|---|---:|---|---|
| LN-01 | Landing Page | 제품명, 설명, CTA 표시 | 02 | DONE | HomePage render test, build |
| LN-02 | Factory 진입 | CTA가 `/onboarding`으로 이동 | 02 | DONE | Route test |
| LN-03 | 반응형 기본 대응 | 핵심 콘텐츠가 주요 viewport에서 유지 | 02 | DONE | Responsive styles, build |
| LN-04 | 밝은 World UI 정합성 | Landing과 Onboarding UI가 새 분위기와 일치 | 27 | TODO | — |

## 4. Bright Outdoor Factory

| ID | 필수 기능 | 완료 조건 | Commit | 상태 | 검증 증거 |
|---|---|---|---:|---|---|
| 3D-01 | React Three Fiber Canvas | `/onboarding`에 Scene 표시 | 03 | DONE | Build/render test, browser check |
| 3D-02 | 기본 Camera와 Light | 기본 geometry를 식별할 수 있음 | 03 | DONE | Typecheck/build, browser check |
| 3D-03 | Canvas loading fallback | 로딩 상태가 표시됨 | 03 | DONE | Render test |
| 3D-04 | 밝은 야외 지형 | 잔디, 공장 바닥, 도로와 보행로 구성 | 05 | TODO | — |
| 3D-05 | 소규모 World 경계 | 전체 구조가 밀집되고 장거리 빈 공간이 없음 | 05 | TODO | — |
| 3D-06 | 야외 조명과 색감 | 밝고 부드러운 low-poly 분위기 구현 | 05 | TODO | — |
| 3D-07 | Welcome Plaza | Spawn과 첫 조작 안내 공간 구분 | 09 | TODO | — |
| 3D-08 | Company Vision Lab | 작은 연구동과 Vision Display 배치 | 09 | TODO | — |
| 3D-09 | Smart Factory | Robot, Conveyor, Vision 설비 배치 | 09 | TODO | — |
| 3D-10 | AI / SDM Lab | Data-AI-Factory 흐름 시각화 | 09 | TODO | — |
| 3D-11 | Core Value Park | 4개 Station 배치 공간 구성 | 09 | TODO | — |
| 3D-12 | IX Area | IX를 위한 친근한 휴식 공간 구성 | 09 | TODO | — |

## 5. Player, Movement, Camera, Collision

| ID | 필수 기능 | 완료 조건 | Commit | 상태 | 검증 증거 |
|---|---|---|---:|---|---|
| PL-01 | Stylized Player | Spawn 위치에 친근한 Player 표시 | 06 | TODO | — |
| PL-02 | Idle/Walk fallback | Animation 누락 시에도 Scene 유지 | 06 | TODO | — |
| PL-03 | 방향키 이동 | 앞·뒤·좌·우 이동이 delta 기반으로 동작 | 07 | TODO | — |
| PL-04 | 회전 보간 | Player가 이동 방향을 부드럽게 바라봄 | 07 | TODO | — |
| PL-05 | 입력 예외 | 폼 포커스 중 이동하지 않고 스크롤 방지 | 07 | TODO | — |
| PL-06 | Elevated follow camera | 높은 위치에서 Player를 부드럽게 추적 | 08 | TODO | — |
| PL-07 | Camera 안정성 | 과도한 회전·흔들림 없이 주변 공간 표시 | 08 | TODO | — |
| PL-08 | World boundary | Player가 공장 단지 밖으로 나가지 않음 | 10 | TODO | — |
| PL-09 | 구조물 충돌 | 건물과 주요 설비를 통과하지 않음 | 10 | TODO | — |

## 6. Zones and Interaction

| ID | 필수 기능 | 완료 조건 | Commit | 상태 | 검증 증거 |
|---|---|---|---:|---|---|
| ZI-01 | Zone 데이터 모델 | 6개 Zone 타입과 bounds 정의 | 09 | TODO | — |
| ZI-02 | 현재 Zone 감지 | Player 위치에 따라 current zone 변경 | 09 | TODO | — |
| ZI-03 | Interaction Target | 공통 target 데이터 구조 사용 | 11 | TODO | — |
| ZI-04 | 근접 판정 | radius 안에서만 활성화 | 11 | TODO | — |
| ZI-05 | 최근접 대상 | 겹칠 때 가장 가까운 하나 선택 | 11 | TODO | — |
| ZI-06 | `E` Prompt | 대상별 DOM 안내 표시 | 11 | TODO | — |
| ZI-07 | `ESC` 닫기 | Modal과 Chat을 키보드로 닫음 | 11 | TODO | — |
| ZI-08 | 정보 Modal | Vision, Factory, AI/SDM 콘텐츠 표시 | 12 | TODO | — |

## 7. Mission System

| ID | 필수 기능 | 완료 조건 | Commit | 상태 | 검증 증거 |
|---|---|---|---:|---|---|
| MS-01 | 4개 Mission | 순서와 완료 조건을 데이터로 정의 | 13 | TODO | — |
| MS-02 | 완료와 중복 방지 | 이벤트당 한 번만 완료 | 13 | TODO | — |
| MS-03 | Progress 계산 | 완료 수와 백분율 계산 | 13 | TODO | — |
| MS-04 | Mission HUD | 현재·완료·대기 상태 구분 | 14 | TODO | — |
| MS-05 | Context HUD | 현재 Zone과 조작법 표시 | 14 | TODO | — |

## 8. Core Value Quest

| ID | 필수 기능 | 완료 조건 | Commit | 상태 | 검증 증거 |
|---|---|---|---:|---|---|
| CV-01 | 12개 Core Value 데이터 | 공식 명칭과 설명 누락 없음 | 15 | TODO | — |
| CV-02 | 4개 Cluster | Cluster마다 정확히 3개 Value | 15 | TODO | — |
| CV-03 | 12개 Scenario | Value별 상황, 선택지, feedback, takeaway | 15 | TODO | — |
| CV-04 | 4개 Value Station | Station에서 3개 Micro Quest 실행 | 16 | TODO | — |
| CV-05 | 설명형 피드백 | 점수 대신 선택과 기대 행동의 관계 설명 | 16 | TODO | — |
| CV-06 | Value Passport | 12개 경험 여부와 진행률 표시 | 16 | TODO | — |
| CV-07 | Reflection | 12개 완료 후 실천 행동 선택 | 16 | TODO | — |
| CV-08 | 평가 기능 배제 | 적합도·합격·성향 점수 없음 | 16 | TODO | — |

## 9. IX NPC and Chat

| ID | 필수 기능 | 완료 조건 | Commit | 상태 | 검증 증거 |
|---|---|---|---:|---|---|
| IX-01 | IX NPC | NPC, Idle fallback, nameplate 표시 | 17 | TODO | — |
| IX-02 | 근접 대화 진입 | 범위 안에서 `E`로 Chat 열기 | 17 | TODO | — |
| IX-03 | DOM Chat Panel | Canvas 위 일반 React UI 사용 | 18 | TODO | — |
| IX-04 | 입력과 추천 질문 | 질문 입력·전송·예시 선택 | 18 | TODO | — |
| IX-05 | Chat 상태 | idle/loading/success/error 구분 | 18 | TODO | — |

## 10. API and LangChain RAG

| ID | 필수 기능 | 완료 조건 | Commit | 상태 | 검증 증거 |
|---|---|---|---:|---|---|
| API-01 | Chat API 계약 | `POST /api/v1/chat` schema 구현 | 19 | TODO | — |
| API-02 | Context와 Source schema | World Context 입력과 Sources 출력 | 19 | TODO | — |
| API-03 | Frontend API client | 성공, timeout, offline, 500 처리 | 20 | TODO | — |
| RG-01 | 공식 Knowledge Base | 확인된 자료만 `docs/content`에 저장 | 21 | BLOCKED | 회사·기술 자료 필요 |
| RG-02 | LangChain Documents | metadata를 가진 문서 로딩 | 21 | TODO | — |
| RG-03 | Text splitter | 설정된 크기와 overlap으로 분할 | 21 | TODO | — |
| RG-04 | Embedding abstraction | 실제 구현과 test double 교체 가능 | 21 | TODO | — |
| RG-05 | Supabase pgvector | schema, Vector Store, Retriever 구현 | 22 | BLOCKED | Supabase 프로젝트 필요 |
| RG-06 | Top-K retrieval | 기본 4개 관련 문서 반환 | 22 | TODO | — |
| RG-07 | ChatPromptTemplate | IX 역할과 근거 제한 정책 적용 | 23 | TODO | — |
| RG-08 | LLM generation | Context 기반 한국어 답변 생성 | 23 | BLOCKED | LLM/Embedding API Key 필요 |
| RG-09 | Sources와 fallback | 출처 매핑 및 근거 부족 문구 반환 | 23 | TODO | — |
| RG-10 | World-aware context | Zone, Mission, Value, Scenario 활용 | 24 | TODO | — |
| RG-11 | Prompt injection 방어 | 시스템 정책과 공식 Context 우선 | 23 | TODO | — |

## 11. Completion, Persistence, UX

| ID | 필수 기능 | 완료 조건 | Commit | 상태 | 검증 증거 |
|---|---|---|---:|---|---|
| CP-01 | Meet IX 완료 | 성공한 실제 Chat 응답 후 Mission 04 완료 | 25 | TODO | — |
| CP-02 | Complete UI | 전체 조건 충족 후 완료 화면 표시 | 25 | TODO | — |
| CP-03 | localStorage | Mission, Value, Reflection 상태 복원 | 26 | TODO | — |
| CP-04 | 손상 데이터 처리 | 잘못된 저장값이 앱을 중단하지 않음 | 26 | TODO | — |
| UX-01 | 초기 조작 안내 | 방향키, `E`, `ESC` 안내 | 27 | TODO | — |
| UX-02 | 접근성 | keyboard focus, 모바일, WebGL fallback | 27 | TODO | — |
| UX-03 | 오류 상태 | model, animation, Chat 오류 안내 | 27 | TODO | — |
| PF-07 | Asset 용량 점검 | GLB와 texture 용량 제한 | 28 | TODO | — |
| PF-08 | Rendering 최적화 | frame state, light, shadow, rerender 최적화 | 28 | TODO | — |

## 12. Quality and Delivery

| ID | 필수 기능 | 완료 조건 | Commit | 상태 | 검증 증거 |
|---|---|---|---:|---|---|
| QA-01 | Frontend 핵심 로직 테스트 | 이동, 충돌, interaction, mission, value, chat 검증 | 관련 단계/29 | TODO | — |
| QA-02 | Backend 테스트 | health, schema, fallback, source, RAG 검증 | 관련 단계/29 | TODO | — |
| QA-03 | Quality gate | lint, typecheck, test, build 전체 통과 | 모든 단계/29 | TODO | — |
| DOC-01 | Architecture/RAG 문서 | 구현 기준으로 문서 최신화 | 30 | TODO | — |
| DOC-02 | 실행·제약 문서 | README에 설정과 제한사항 정리 | 30 | TODO | — |
| DP-01 | 배포 준비 | CORS, 환경 변수, 실행 명령 검증 | 31 | TODO | — |
| DP-02 | Secret 검사 | 저장소와 client bundle에 비밀키 없음 | 31 | TODO | — |

## 최종 사용자 흐름

- [ ] Landing에서 X-FACTORY에 입장한다.
- [ ] 작고 밝은 야외 공장이 로딩되고 Player가 spawn된다.
- [ ] 방향키로 모든 Zone을 짧은 동선 안에서 탐험한다.
- [ ] 건물과 주요 설비를 통과하거나 World 밖으로 나가지 않는다.
- [ ] Vision, Smart Factory, AI/SDM 미션을 완료한다.
- [ ] 4개 Station에서 12개 Core Value Quest를 완료한다.
- [ ] Value Passport와 Reflection을 확인한다.
- [ ] IX에게 접근해 Chat Panel을 연다.
- [ ] World Context가 FastAPI와 LangChain RAG에 전달된다.
- [ ] IX의 근거 기반 답변과 Sources가 표시된다.
- [ ] Mission 04와 Onboarding Complete가 표시된다.
- [ ] 새로고침 후 진행 상태가 복원된다.

## 외부 준비물

| 항목 | 필요한 Commit | 상태 | 대안 |
|---|---:|---|---|
| 공식 INTERX 회사·비전·기술 자료 | 12/21 | BLOCKED | 확인 전 UI placeholder만 사용 |
| 라이선스가 확인된 Player/IX GLB | 06/17 | BLOCKED | 자체 code geometry fallback |
| Supabase 프로젝트 | 22 | BLOCKED | Retriever test double |
| OpenAI-compatible API Key | 22/23 | BLOCKED | Mock embedding/LLM |
| 배포 환경 | 31 | BLOCKED | 로컬 검증으로 진행 |

## 확정할 사항

- [ ] 최종 완료 조건을 `4개 Mission + 12개 Core Value + Reflection`으로 확정한다.
