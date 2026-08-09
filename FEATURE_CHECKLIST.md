# X-FACTORY — Feature Checklist

> 이 문서는 반드시 구현해야 하는 기능의 진행 상태와 검증 증거를 추적한다.  
> 상세 요구사항과 구현 원칙의 단일 원본은 [`AGENTS.md`](./AGENTS.md)다.

## 상태 관리 규칙

| 상태 | 의미 |
|---|---|
| `TODO` | 아직 구현하지 않음 |
| `IN PROGRESS` | 현재 Commit 범위에서 구현 중 |
| `DONE` | 완료 조건을 충족하고 검증까지 통과함 |
| `BLOCKED` | 외부 자료, 계정, 키 또는 사용자 결정이 필요함 |

- 기능은 관련 Commit의 lint, typecheck, test, build 검증 후에만 `DONE`으로 변경한다.
- `DONE` 처리 시 증거 칸에 Commit hash, 테스트 이름 또는 수동 확인 결과를 남긴다.
- 새로운 요구사항은 먼저 `AGENTS.md`에 반영한 다음 이 문서에 추적 항목을 추가한다.
- 다음 Commit의 기능을 미리 구현하지 않는다.

## 1. Project Foundation

| ID | 필수 기능 | 완료 조건 | 예정 Commit | 상태 | 검증 증거 |
|---|---|---|---:|---|---|
| PF-01 | Next.js + TypeScript 앱 | Frontend 개발 서버와 production build가 실행됨 | 01 | DONE | `npm run build`, `HEAD /` 200 |
| PF-02 | Tailwind CSS 구성 | 기본 스타일과 반응형 유틸리티가 적용됨 | 01 | DONE | Frontend build 및 smoke test 통과 |
| PF-03 | FastAPI 앱 | Backend가 실행되고 `GET /health`가 200을 반환함 | 01 | DONE | `pytest`, `GET /health` 200 |
| PF-04 | Monorepo 기본 구조 | `apps/web`, `apps/api`, `docs` 구조가 구성됨 | 01 | DONE | Commit 01 파일 구조 확인 |
| PF-05 | 환경 변수 템플릿 | `.env.example`만 추적되고 실제 비밀키가 포함되지 않음 | 01 | DONE | `.gitignore`와 추적 파일 확인 |
| PF-06 | 기본 프로젝트 문서 | README에 실행 방법과 기본 구조가 설명됨 | 01 | DONE | README 실행 절차 확인 |

## 2. Landing and Navigation

| ID | 필수 기능 | 완료 조건 | 예정 Commit | 상태 | 검증 증거 |
|---|---|---|---:|---|---|
| LN-01 | Landing Page | 프로젝트명, 설명, 주요 CTA가 표시됨 | 02 | DONE | HomePage render test, production build |
| LN-02 | Factory 진입 | `ENTER FACTORY` 클릭 시 `/onboarding`으로 이동함 | 02 | DONE | CTA route test, `/onboarding` static route build |
| LN-03 | 기본 반응형 대응 | 데스크톱과 모바일에서 핵심 콘텐츠가 잘리지 않음 | 02 | DONE | Responsive breakpoints, production build |

## 3. 3D Factory Experience

| ID | 필수 기능 | 완료 조건 | 예정 Commit | 상태 | 검증 증거 |
|---|---|---|---:|---|---|
| 3D-01 | React Three Fiber Canvas | `/onboarding`에 3D Scene이 안정적으로 표시됨 | 03 | DONE | Build/render test PASS, user browser WebGL confirmation |
| 3D-02 | 기본 Camera와 Light | Scene과 오브젝트를 식별할 수 있음 | 03 | DONE | Typecheck/build PASS, user visual confirmation |
| 3D-03 | Ground와 FactoryScene | 탐색 가능한 최소 공간이 렌더링됨 | 03 | DONE | Typecheck/build PASS, user visual confirmation |
| 3D-04 | Canvas 로딩 fallback | 3D 로딩 중 사용자에게 상태가 표시됨 | 03 | DONE | OnboardingPage loading fallback render test |
| 3D-05 | Factory Environment | 공장으로 인지 가능한 저용량 환경이 구성됨 | 04 | TODO | — |
| 3D-06 | 주요 공간 시각 구분 | Company, Smart Factory, AI/SDM, IX Area가 구분됨 | 04 | TODO | — |
| 3D-07 | 3D Asset 라이선스 기록 | 모든 외부 Asset의 출처·저자·라이선스가 `docs/assets.md`에 기록됨 | 04 | TODO | — |

## 4. Player and Camera

| ID | 필수 기능 | 완료 조건 | 예정 Commit | 상태 | 검증 증거 |
|---|---|---|---:|---|---|
| PL-01 | Player 표시 | 지정된 spawn 위치에 Player가 표시됨 | 05 | TODO | — |
| PL-02 | Idle animation | 정지 상태에서 Idle animation 또는 명시적 fallback이 동작함 | 05 | TODO | — |
| PL-03 | Animation fallback | animation 누락 시 Scene이 중단되지 않음 | 05 | TODO | — |
| PL-04 | 방향키 이동 | 앞·뒤·좌·우 이동이 delta 기반으로 동작함 | 06 | TODO | — |
| PL-05 | Walk/Idle 전환 | 이동 중 Walk, 정지 시 Idle 상태가 적용됨 | 06 | TODO | — |
| PL-06 | 이동 영역 제한 | Player가 최소 Factory 경계 밖으로 이탈하지 않음 | 06 | TODO | — |
| PL-07 | 입력 예외 처리 | 폼 입력 중 이동하지 않고 방향키가 페이지를 스크롤하지 않음 | 06 | TODO | — |
| PL-08 | Third-person Camera | Camera가 Player 뒤·위에서 따라감 | 07 | TODO | — |
| PL-09 | Camera 보간 | 이동과 방향 전환 시 Camera가 급격히 흔들리지 않음 | 07 | TODO | — |

## 5. Zones and Interactions

| ID | 필수 기능 | 완료 조건 | 예정 Commit | 상태 | 검증 증거 |
|---|---|---|---:|---|---|
| ZI-01 | Zone 데이터 모델 | Company, Smart Factory, AI/SDM, IX Zone이 타입과 설정으로 정의됨 | 08 | TODO | — |
| ZI-02 | 현재 Zone 감지 | Player 위치에 따라 Zustand의 current zone이 변경됨 | 08 | TODO | — |
| ZI-03 | Interaction Target 모델 | mission, npc, info 대상을 공통 구조로 관리함 | 09 | TODO | — |
| ZI-04 | 근접 거리 판정 | interaction radius 안에서만 상호작용이 활성화됨 | 09 | TODO | — |
| ZI-05 | 최근접 대상 선택 | 여러 대상이 겹치면 가장 가까운 하나만 선택됨 | 09 | TODO | — |
| ZI-06 | Interaction Prompt | 범위 안에서만 대상별 `E` 안내가 표시됨 | 09 | TODO | — |
| ZI-07 | Keyboard interaction | `E`로 실행하고 `ESC`로 Modal 또는 Chat을 닫을 수 있음 | 09 | TODO | — |
| ZI-08 | Vision Display 정보 | 상호작용 시 확인된 Company/Vision 콘텐츠 Modal이 표시됨 | 10 | TODO | — |
| ZI-09 | Smart Factory 정보 | Machine 또는 Conveyor 상호작용 Modal이 표시됨 | 10 | TODO | — |
| ZI-10 | AI/SDM 정보 | AI Monitor 상호작용 Modal이 표시됨 | 10 | TODO | — |

## 6. Mission System and HUD

| ID | 필수 기능 | 완료 조건 | 예정 Commit | 상태 | 검증 증거 |
|---|---|---|---:|---|---|
| MS-01 | Mission 데이터 모델 | 4개 Mission이 순서와 완료 조건을 포함해 정의됨 | 11 | TODO | — |
| MS-02 | Mission 완료 처리 | 연결된 interaction 또는 chat 성공 시 Mission이 완료됨 | 11 | TODO | — |
| MS-03 | 중복 완료 방지 | 같은 Mission을 반복 완료해도 진행률이 중복 증가하지 않음 | 11 | TODO | — |
| MS-04 | 진행률 계산 | 완료 수와 백분율이 정확하게 계산됨 | 11 | TODO | — |
| MS-05 | Mission HUD | 현재·완료·대기 Mission을 구분해 표시함 | 12 | TODO | — |
| MS-06 | Progress UI | Mission 완료 시 progress bar가 즉시 갱신됨 | 12 | TODO | — |
| MS-07 | Context HUD | 현재 Zone과 조작법이 화면에 표시됨 | 12 | TODO | — |

## 7. Core Value Quest

| ID | 필수 기능 | 완료 조건 | 예정 Commit | 상태 | 검증 증거 |
|---|---|---|---:|---|---|
| CV-01 | 12개 Core Value 데이터 | 제공된 명칭과 설명이 누락 없이 정의됨 | 13 | TODO | — |
| CV-02 | 4개 Value Cluster | 각 Cluster가 정확히 3개 Core Value를 포함함 | 13 | TODO | — |
| CV-03 | 12개 Scenario | 각 Core Value에 정확히 하나의 Scenario가 연결됨 | 13 | TODO | — |
| CV-04 | 선택지와 Feedback | 모든 Scenario에 행동 선택, 설명형 feedback, takeaway가 있음 | 13 | TODO | — |
| CV-05 | 공식 RAG 원천 문서 | `docs/content/core-values.md`에 공식 문구와 UX용 해석이 구분됨 | 13 | TODO | — |
| CV-06 | 4개 Value Station | Factory 안에서 각 Station에 접근할 수 있음 | 14 | TODO | — |
| CV-07 | Scenario Modal | Station 상호작용으로 3개 Micro Quest를 진행할 수 있음 | 14 | TODO | — |
| CV-08 | 설명형 선택 피드백 | 정답 점수 대신 선택의 의미와 권장 행동을 설명함 | 14 | TODO | — |
| CV-09 | Micro Quest 완료 | 선택과 피드백 확인 후 해당 Core Value가 완료 처리됨 | 14 | TODO | — |
| CV-10 | Value Passport | 12개 Core Value의 경험 여부와 진행률을 확인할 수 있음 | 14 | TODO | — |
| CV-11 | 평가 기능 배제 | 직원 적합도, 합격 판정 또는 점수화를 하지 않음 | 14 | TODO | — |
| CV-12 | Reflection | 12개 완료 후 첫 업무 주간의 실천 행동을 선택할 수 있음 | 14 | TODO | — |

## 8. IX NPC and Chat UI

| ID | 필수 기능 | 완료 조건 | 예정 Commit | 상태 | 검증 증거 |
|---|---|---|---:|---|---|
| IX-01 | IX NPC 배치 | NPC가 지정 구역에 표시되고 Idle 상태가 동작함 | 15 | TODO | — |
| IX-02 | NPC 표시 정보 | IX nameplate와 역할을 확인할 수 있음 | 15 | TODO | — |
| IX-03 | NPC 근접 상호작용 | 범위 안에서만 `E: IX와 대화하기`가 표시되고 동작함 | 15 | TODO | — |
| IX-04 | DOM Chat Panel | 3D Canvas 위 일반 React UI로 Chat이 표시됨 | 16 | TODO | — |
| IX-05 | 메시지 입력과 전송 | 질문을 입력하고 전송할 수 있음 | 16 | TODO | — |
| IX-06 | 추천 질문 | 초기 질문 예시를 선택해 전송할 수 있음 | 16 | TODO | — |
| IX-07 | Chat 상태 UI | idle, loading, success, error 상태가 구분됨 | 16 | TODO | — |
| IX-08 | Mock 대화 | Backend 연결 전 결정적인 mock 응답으로 UI를 확인할 수 있음 | 16 | TODO | — |

## 9. Backend API and Integration

| ID | 필수 기능 | 완료 조건 | 예정 Commit | 상태 | 검증 증거 |
|---|---|---|---:|---|---|
| API-01 | Chat API 계약 | `POST /api/v1/chat`이 명시된 request/response schema를 사용함 | 17 | TODO | — |
| API-02 | Context schema | Zone, 완료 Mission, Core Value, Scenario를 전달할 수 있음 | 17 | TODO | — |
| API-03 | Source schema | 응답에 title과 선택적 section이 포함됨 | 17 | TODO | — |
| API-04 | Deterministic API mock | 외부 서비스 없이 endpoint 계약을 테스트할 수 있음 | 17 | TODO | — |
| API-05 | Frontend API client | Chat UI가 FastAPI endpoint를 호출함 | 18 | TODO | — |
| API-06 | Client context 전달 | 현재 Zone과 완료 Mission이 request에 포함됨 | 18 | TODO | — |
| API-07 | API 오류 처리 | offline, timeout, 500 오류가 사용자 메시지로 표시됨 | 18 | TODO | — |

## 10. LangChain RAG

| ID | 필수 기능 | 완료 조건 | 예정 Commit | 상태 | 검증 증거 |
|---|---|---|---:|---|---|
| RG-01 | 공식 Knowledge Base | 제공되거나 확인된 자료만 `docs/content`에 저장됨 | 19 | TODO | — |
| RG-02 | LangChain Document loading | Markdown 문서가 metadata를 가진 Document로 로드됨 | 19 | TODO | — |
| RG-03 | Text splitting | 문서가 설정된 크기와 overlap으로 일관되게 분할됨 | 19 | TODO | — |
| RG-04 | Ingestion script | 문서에서 검색 가능한 chunk를 생성할 수 있음 | 19 | TODO | — |
| RG-05 | Embedding abstraction | 실제 embedding과 test double을 교체할 수 있음 | 19 | TODO | — |
| RG-06 | Supabase pgvector schema | 문서, embedding, metadata를 저장하는 schema가 제공됨 | 20 | TODO | — |
| RG-07 | Vector Store/Retriever | LangChain 연동으로 similarity search가 동작함 | 20 | TODO | — |
| RG-08 | Top-K retrieval | 질문 embedding으로 기본 Top-K 4개 문서를 반환함 | 20 | TODO | — |
| RG-09 | ChatPromptTemplate | IX 역할과 근거 제한 정책이 system prompt에 적용됨 | 21 | TODO | — |
| RG-10 | LLM answer generation | 검색 Context를 이용해 한국어 답변을 생성함 | 21 | TODO | — |
| RG-11 | Source mapping | 사용한 문서의 title과 section을 중복 없이 반환함 | 21 | TODO | — |
| RG-12 | Empty retrieval fallback | 근거가 없으면 지정된 확인 불가 문구를 반환함 | 21 | TODO | — |
| RG-13 | Hallucination 제한 | INTERX 내부 사실을 LLM 사전 지식으로 보충하지 않음 | 21 | TODO | — |
| RG-14 | Prompt injection 방어 | 사용자·문서 지시보다 system 정책과 공식 Context를 우선함 | 21 | TODO | — |
| RG-15 | Zone-aware retrieval | `여기`와 같은 질문을 현재 Zone을 이용해 보강함 | 22 | TODO | — |
| RG-16 | Scenario-aware context | 현재 Core Value와 Scenario를 질문 해석에 사용할 수 있음 | 22 | TODO | — |

## 11. Completion and Persistence

| ID | 필수 기능 | 완료 조건 | 예정 Commit | 상태 | 검증 증거 |
|---|---|---|---:|---|---|
| CP-01 | Meet IX 완료 | 성공한 실제 Chat 응답 후 Mission 04가 완료됨 | 23 | TODO | — |
| CP-02 | Onboarding Complete UI | 완료 조건 충족 시 완료 화면이 표시됨 | 23 | TODO | — |
| CP-03 | Mission 상태 저장 | 새로고침 후 완료 Mission과 진행률이 복원됨 | 24 | TODO | — |
| CP-04 | Core Value 상태 저장 | 완료 Value와 Reflection이 localStorage에서 복원됨 | 24 | TODO | — |
| CP-05 | 저장 데이터 안전 처리 | 손상되거나 오래된 localStorage 값이 앱을 중단시키지 않음 | 24 | TODO | — |

## 12. Accessibility, Resilience, and Performance

| ID | 필수 기능 | 완료 조건 | 예정 Commit | 상태 | 검증 증거 |
|---|---|---|---:|---|---|
| UX-01 | 초기 조작 안내 | 최초 진입 시 방향키, `E`, `ESC` 사용법이 표시됨 | 25 | TODO | — |
| UX-02 | Keyboard focus | 버튼과 Chat 입력을 키보드로 사용할 수 있음 | 25 | TODO | — |
| UX-03 | 모바일 안내 | 3D 조작이 제한된 화면에서 최소 안내가 제공됨 | 25 | TODO | — |
| UX-04 | WebGL fallback | WebGL 미지원 환경에서 대체 안내를 표시함 | 25 | TODO | — |
| UX-05 | 3D 오류 처리 | model 또는 animation 오류가 전체 페이지를 중단시키지 않음 | 25 | TODO | — |
| UX-06 | Chat 오류 문구 | 연결 실패 시 재시도를 안내하는 명확한 메시지가 표시됨 | 25 | TODO | — |
| UX-07 | Empty/loading 상태 | 비어 있음과 로딩 상태가 모든 주요 UI에서 구분됨 | 25 | TODO | — |
| PF-07 | Asset 용량 점검 | GLB와 texture가 웹 MVP에 적절한 크기로 제한됨 | 26 | TODO | — |
| PF-08 | Frame loop 최적화 | `useFrame`에서 불필요한 React state 갱신을 하지 않음 | 26 | TODO | — |
| PF-09 | Rendering 최적화 | 불필요한 shadow, light, clone, rerender가 제거됨 | 26 | TODO | — |

## 13. Tests, Documentation, and Deployment

| ID | 필수 기능 | 완료 조건 | 예정 Commit | 상태 | 검증 증거 |
|---|---|---|---:|---|---|
| QA-01 | Mission 로직 테스트 | 완료, 중복 방지, progress 계산을 자동 검증함 | 11/27 | TODO | — |
| QA-02 | Interaction 테스트 | 거리 계산과 최근접 대상 선택을 자동 검증함 | 09/27 | TODO | — |
| QA-03 | Core Value 테스트 | Scenario 연결과 Passport 진행률을 자동 검증함 | 13/14/27 | TODO | — |
| QA-04 | Frontend API 테스트 | 요청 Context, 성공, 오류 처리를 자동 검증함 | 18/27 | TODO | — |
| QA-05 | Backend health/schema 테스트 | health와 Pydantic API 계약을 자동 검증함 | 01/17/27 | TODO | — |
| QA-06 | RAG fallback 테스트 | 검색 결과 없음과 LLM 오류를 자동 검증함 | 19/21/27 | TODO | — |
| QA-07 | Source 변환 테스트 | Source mapping과 중복 제거를 자동 검증함 | 21/27 | TODO | — |
| QA-08 | Quality gate | Frontend/Backend lint, typecheck, test, build가 통과함 | 모든 Commit/27 | TODO | — |
| DC-01 | Architecture 문서 | Frontend, 3D, API, RAG, DB 구조가 설명됨 | 28 | TODO | — |
| DC-02 | RAG 문서 | ingestion, retrieval, prompt, fallback 정책이 설명됨 | 28 | TODO | — |
| DC-03 | Asset 문서 | 사용 Asset의 출처, 라이선스, 수정 여부가 완전함 | 04/28 | TODO | — |
| DC-04 | 실행·설정 문서 | 로컬 실행, 환경 변수, 제한사항이 README에 정리됨 | 28 | TODO | — |
| DP-01 | Production 환경 검증 | 필수 환경 변수가 시작 시 안전하게 검증됨 | 29 | TODO | — |
| DP-02 | CORS와 API URL | 배포 환경의 허용 origin과 Backend URL을 설정할 수 있음 | 29 | TODO | — |
| DP-03 | 배포 실행 명령 | Frontend build와 Backend start 명령이 문서화됨 | 29 | TODO | — |
| DP-04 | Secret 노출 검사 | Client bundle과 저장소에 비밀키가 포함되지 않음 | 29 | TODO | — |

## 사용자 흐름 최종 확인

- [ ] Landing Page에서 `ENTER FACTORY`를 선택한다.
- [ ] 3D Factory가 로딩되고 Player가 spawn된다.
- [ ] 방향키로 Company Zone에 이동한다.
- [ ] Vision Display와 상호작용하고 Mission 01을 완료한다.
- [ ] Smart Factory Object와 상호작용하고 Mission 02를 완료한다.
- [ ] AI/SDM Monitor와 상호작용하고 Mission 03을 완료한다.
- [ ] 4개 Value Station에서 12개 Core Value Quest를 완료한다.
- [ ] Value Passport에서 12개 완료 상태를 확인한다.
- [ ] 첫 업무 주간 Reflection 행동을 선택한다.
- [ ] IX에게 접근해 Chat Panel을 연다.
- [ ] 질문과 현재 Zone/Scenario Context가 FastAPI에 전달된다.
- [ ] LangChain RAG가 관련 문서를 검색한다.
- [ ] IX의 근거 기반 답변과 Sources가 표시된다.
- [ ] Mission 04가 완료된다.
- [ ] 최종 완료 조건 충족 후 `ONBOARDING COMPLETE`가 표시된다.
- [ ] 새로고침 후 Mission, Core Value, Reflection 진행 상태가 유지된다.

## 구현 전 필요한 외부 준비물

| 항목 | 필요한 시점 | 현재 상태 | 비고 |
|---|---:|---|---|
| 공식 INTERX 회사·비전·기술 자료 | 10/19 | BLOCKED | 제공 자료 또는 검증 가능한 공식 출처 필요 |
| 라이선스가 확인된 Player/NPC/공장 GLB | 04/05/15 | BLOCKED | 기본 geometry fallback 사용 가능 |
| Supabase 프로젝트와 pgvector | 20 | BLOCKED | Migration과 Retriever 검증에 필요 |
| OpenAI-compatible LLM/Embedding API Key | 20/21 | BLOCKED | 테스트에서는 mock 사용 |
| Vercel/Render 등 배포 환경 | MVP 이후 | BLOCKED | 실제 배포는 별도 요청 시 진행 |

## 결정 필요 사항

- [ ] 최종 완료 조건을 확정한다.
  - `AGENTS.md` Commit 23 기준: 4개 Mission 완료
  - MVP 전체 흐름 권장안: 4개 Mission + 12개 Core Value + Reflection 완료
