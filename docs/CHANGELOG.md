# X-FACTORY Changelog

각 단계에서 실제 변경된 내용을 기록한다. 미래 계획은 [`DEVELOPMENT_PLAN.md`](./DEVELOPMENT_PLAN.md)에서 관리한다.

## [Commit 18] — IX Chat UI

### Added

- IX interaction이 활성화되면 Canvas 위에 표시되는 접근 가능한 DOM Chat Panel을 추가했다.
- 직접 질문을 입력해 전송하는 form과 3개의 추천 질문 버튼을 추가했다.
- `idle`, `loading`, `success`, `error`를 명시적으로 구분하는 Chat view state를 추가했다.
- X-FACTORY 탐색 안내 범위에서 동일 질문에 항상 같은 답을 반환하는 결정적 mock responder를 추가했다.
- loading `aria-busy`, error alert와 재시도, 요청 취소, 입력·버튼 상태를 검증하는 회귀 테스트를 추가했다.

### Changed

- Onboarding 화면에 IX Chat Panel을 연결하고 활성 Chat 중 Player 이동을 기존 Interaction 상태로 정지했다.
- Chat input에 포커스가 있어도 공통 `ESC` 동작으로 Panel을 닫을 수 있도록 기존 keyboard 흐름을 재사용했다.
- 공통 Modal과 Chat의 `ESC` 닫기 항목을 완료 상태로 갱신했다.

### Notes

- 모든 응답은 `[DEMO DATA] · MOCK RESPONSE`로 표시되며 확인된 자료에 없는 INTERX 내부 사실을 생성하지 않는다.
- mock 응답은 실제 API 또는 RAG 응답이 아니므로 Mission 04 `Meet IX`를 완료하지 않는다. 실제 성공 응답 연결과 완료 처리는 Commit 25의 범위다.
- request/response API schema, World Context와 Sources는 Commit 19 이후에 구현한다.

## [Commit 17] — IX NPC

### Added

- 외부 모델 없이 low-poly geometry로 구성한 친근한 로봇형 IX NPC를 추가했다.
- 몸체 bob, 고개 움직임, antenna signal을 가진 가벼운 Idle animation을 추가했다.
- animation 요청이 없거나 지원하지 않는 이름이면 안전하게 Idle을 사용하는 fallback을 추가했다.
- `IX — AI Onboarding Buddy` 정체성과 접근 안내를 보여 주는 DOM nameplate를 3D 위치에 연결했다.
- IX 접근 반경에서 `E`로 대화 진입 상태를 활성화하고 `ESC`로 닫는 공통 Interaction Target을 추가했다.
- animation fallback, 접근 가능 위치, Store 진입·닫기, nameplate 상태를 검증하는 회귀 테스트를 추가했다.

### Changed

- IX Area의 임시 pedestal 표식을 실제 IX NPC와 낮은 전용 platform으로 교체했다.
- 전용 platform 크기에 맞게 Player collider 범위를 조정했다.
- 활성화된 IX nameplate가 대화 채널 준비 상태와 닫기 조작을 안내하도록 했다.

### Notes

- 이번 단계의 `E` 동작은 대화 진입 상태까지만 만든다. 질문 입력, 추천 질문, 응답과 Chat 상태 UI는 Commit 18의 범위다.
- IX 접근만으로 Mission 04를 완료하지 않는다. 성공한 Chat 응답을 받은 뒤에만 Mission event를 전달한다.
- 외부 3D asset을 사용하지 않아 추가 asset 출처나 라이선스 항목은 없다.

## [Commit 16] — Core Value Quest

### Added

- Core Value Park의 기존 조형물 4개를 Cluster별 Value Station 상호작용 대상으로 연결했다.
- 각 Station에서 미경험 Core Value 3개를 순서대로 진행하는 Micro Quest Modal을 추가했다.
- 행동 선택 후 선택과 핵심가치의 연결을 설명하는 feedback과 takeaway 화면을 추가했다.
- 12개 Value의 경험 여부와 진행률을 Cluster별로 보여 주는 Value Passport를 추가했다.
- 12개 경험 완료 후 첫 업무 주간에 실천할 행동을 선택하는 Reflection을 추가했다.
- Station 접근성, 순차 진행, 중복 방지, Passport 진행률, Reflection 잠금과 UI를 검증하는 회귀 테스트를 추가했다.

### Changed

- 공통 Interaction Target에 `core-value` 유형 4개를 추가하고 최근접 대상 선택 흐름을 그대로 재사용했다.
- Core Value Park 조형물이 Station 데이터의 ID, 위치, accent를 사용하도록 연결했다.
- Onboarding 화면에 Quest Modal과 접이식 Value Passport를 배치했다.

### Notes

- Store에는 선택지 결과가 아니라 Core Value 경험 ID와 사용자가 선택한 첫 주 실천 Value만 저장한다.
- 모든 Scenario는 `[DEMO DATA]`이며 feedback은 설명형이다. 점수, 정답, 합격, 적합도 또는 직원 성향 분석을 제공하지 않는다.
- Core Value 진행 상태의 localStorage 저장은 Commit 26의 범위다.

## [Commit 15] — Core Value content model

### Added

- 사용자 제공 공식 자료의 12개 핵심가치 명칭과 설명을 순서·출처 상태와 함께 타입화했다.
- 12개 Value를 정확히 3개씩 묶는 4개 Cluster 데이터와 ID 기반 조회 맵을 추가했다.
- 각 Value마다 업무 상황, 3개 선택지, 설명형 피드백과 takeaway를 가진 온보딩 Scenario 12개를 추가했다.
- 공식 데이터 전체성, Cluster 분할, Scenario 일대일 연결, 비평가 구조를 검증하는 단위 테스트를 추가했다.

### Changed

- Core Value 공식 원문과 UX용 Scenario 해석을 별도 모듈로 분리했다.
- Core Value Quest의 콘텐츠 모델 완료 상태를 기능 체크리스트와 개발 계획에 반영했다.

### Notes

- 모든 Scenario는 `[DEMO DATA]`와 `reflection-not-assessment`로 표시하며 직원 평가 자료가 아니다.
- `recommended`는 기대 행동과 핵심가치의 연결을 설명하는 속성일 뿐 점수, 정답, 합격 판정을 만들지 않는다.
- 4개 Value Station, 진행 상태, Value Passport와 Reflection UI는 Commit 16의 범위다.

## [Commit 14] — Mission HUD

### Added

- 현재 Mission 목표, 4개 Mission 목록, 완료 수와 진행률을 표시하는 DOM Mission HUD를 추가했다.
- Mission별 상태를 `완료`, `진행 중`, `대기`의 텍스트·기호·색상으로 구분했다.
- `aria-current="step"`과 0~100 범위의 `progressbar`를 적용해 현재 위치와 진행률을 의미적으로 표시했다.
- 초기, 중간, 전체 완료 HUD와 상태 판정을 검증하는 회귀 테스트를 추가했다.

### Changed

- 기존 Current Zone Indicator를 유지하고 하단 Context HUD를 방향키, `E`, `ESC` 조작 안내로 전환했다.
- 작은 화면에서는 설명 영역을 숨기고 Mission HUD를 스크롤 가능하게 조정했다.
- Onboarding overlay에 Mission HUD와 실시간 진행 상태를 반영했다.

### Notes

- HUD는 Mission Store의 `completedMissionIds`만 구독하고 현재 Mission과 진행률을 render 시 파생한다.
- Mission 진행을 localStorage에 저장하는 기능은 Commit 26의 범위다.

## [Commit 13] — Mission state

### Added

- Discover INTERX, Explore Smart Factory, Understand AI / SDM, Meet IX의 순서·목표·완료 이벤트를 가진 4개 Mission 데이터를 추가했다.
- 이벤트와 Mission ID를 일대일로 연결하는 매핑을 추가했다.
- 완료한 Mission ID만 저장하고 동일 Mission을 중복 추가하지 않는 Zustand Mission Store를 추가했다.
- 완료 수·전체 수·백분율과 첫 미완료 Mission을 계산하는 순수 함수를 추가했다.
- Mission 정의, 이벤트 매핑, 0·50·100% 진행률, 현재 Mission, Store 중복 방지 테스트를 추가했다.

### Changed

- Information Modal의 확인 버튼이 상응하는 Mission 01~03을 완료하도록 연결했다.
- Information content의 완료 이벤트 타입을 Mission 모듈의 단일 이벤트 정의에서 파생하도록 정리했다.
- Onboarding overlay에 4개 Mission, event mapping, Zustand progress 상태를 반영했다.

### Notes

- Mission HUD와 실시간 진행률 표시는 Commit 14의 범위다.
- Meet IX는 아직 완료될 수 없으며, 후속 Chat에서 성공한 답변을 받았을 때만 `ix-chat-response-received` 이벤트를 전달한다.
- Mission 진행 상태의 localStorage 저장은 Commit 26의 범위다.

## [Commit 12] — Information interactions

### Added

- Company Vision, Smart Factory, AI / SDM 상호작용에 대한 타입화된 정보 콘텐츠 모델을 추가했다.
- 현재 저장소에 검증된 INTERX 회사·기술 자료가 없음을 알리고, 사용자 제공 온보딩 기획 범위만 `[DEMO DATA]`로 표시하는 콘텐츠를 구성했다.
- 제목, 설명, 핵심 안내, 출처 상태, 닫기와 확인을 가진 DOM Information Modal을 추가했다.
- Modal 확인 시 Commit 13의 Mission Store가 소비할 수 있는 타입화된 `information-interaction-confirmed` 이벤트 생성기를 추가했다.
- 세 target의 콘텐츠 커버리지, DEMO 표시, Mission event mapping, Dialog 접근성 회귀 테스트를 추가했다.

### Changed

- Information Modal이 열린 동안 Player 이동과 Walk animation을 멈추도록 했다.
- 활성 interaction은 간이 상태 문구 대신 실제 Modal을 표시하도록 Prompt 흐름을 조정했다.
- Onboarding overlay에 DEMO 표시, Mission event 연결점, DOM information layer 상태를 반영했다.

### Notes

- 실제 INTERX 비전, 제품, 제조 공정, SDM 정의는 임의로 작성하지 않았다.
- Mission 완료 상태와 중복 방지는 Commit 13의 범위다.

## [Commit 11] — Interaction system

### Added

- Company Vision Display, Smart Factory Console, AI / SDM Monitor를 공통 mission `InteractionTarget` 데이터로 정의했다.
- Player의 World 좌표와 target의 반경을 비교해 활성 범위의 가장 가까운 target 하나만 선택하는 tracker를 추가했다.
- 현재 근접 target과 활성 interaction을 Canvas 밖 UI와 공유하는 Zustand 상태를 추가했다.
- 근접 시 `E` 안내를 표시하고, `E`로 활성화한 후 `ESC`로 닫는 DOM Interaction Prompt를 추가했다.
- 반경 경계, 최근접 선택, 실제 collider 기반 접근 가능성, 폼 포커스 예외, Store와 Prompt 상태 테스트를 추가했다.

### Changed

- Onboarding overlay에 nearest target, `E` action, `ESC` close 상태를 반영했다.

### Notes

- 이번 단계에서는 공통 활성 상태까지 연결했으며 실제 정보 콘텐츠와 Modal은 Commit 12에서 추가한다.
- Core Value Station과 IX는 빈 기능을 미리 노출하지 않고 각 구현 단계에서 target을 확장한다.

## [Commit 10] — World collision

### Added

- Player를 수평면의 원형으로 단순화하고, 건물과 주요 설비에 정적 AABB collider를 추가했다.
- 잔디 섬 안쪽에 World boundary를 설정해 Player 중심과 반경이 경계 밖으로 나가지 않도록 했다.
- 한 frame의 이동을 작은 step으로 나누어 빠른 이동이 collider를 관통하는 현상을 방지했다.
- World 경계, 접선, 관통 방지, 벽면 슬라이딩, 건물·컨베이어 차단 회귀 테스트를 추가했다.

### Changed

- X축과 Z축을 나누어 충돌을 해결해 Player가 장애물에 비스듬히 접근해도 벽면을 따라 자연스럽게 이동할 수 있게 했다.
- Onboarding overlay에 World boundary, solid building, lightweight collider 상태를 반영했다.

### Notes

- 중력, 점프, rigid body simulation이 필요하지 않아 물리 엔진 dependency는 추가하지 않았다.
- 자연물과 장식 표면은 이동 동선을 불필요하게 제한하지 않도록 collider에서 제외했다.

## [Commit 09] — Factory zones

### Added

- Welcome Plaza, Company Vision Lab, Smart Factory, AI / SDM Lab, Core Value Park와 IX Area를 compact factory floor에 배치했다.
- Company/AI 연구동, open factory canopy, Robot Arm, Conveyor, 4개 Value Station과 IX Garden을 code geometry로 구성했다.
- 여섯 Zone의 ID, title, accent, bounds를 가진 명시적인 데이터 모델을 추가했다.
- Player 위치를 매 frame 확인하되 Zone이 바뀔 때만 Store를 갱신하는 tracker를 추가했다.
- 현재 위치를 표시하는 DOM `Current Zone` Indicator를 추가했다.
- Zone 개수, ID 중복, bounds 비중첩, spawn 감지와 Store 동작 테스트를 추가했다.

### Dependencies

- `zustand@^5.0.14`: `currentZone`을 3D Scene과 DOM UI, 이후 RAG Context가 공유하기 위한 최소 World Store

### Notes

- Store에는 현재 `currentZone`만 포함하며 Mission과 Chat 상태는 아직 추가하지 않았다.
- 건물과 설비 collision, 근접 Interaction, Mission 완료 로직은 이후 Commit 범위다.
- 모든 Zone 시각 요소는 내부 geometry와 material만 사용하며 외부 Asset은 없다.

## [Commit 08] — Elevated follow camera

### Added

- Player보다 높은 위치에서 내려다보는 Third Person Follow Camera를 추가했다.
- Player position을 기준으로 camera position과 look target을 각각 부드럽게 보간한다.
- frame rate와 무관한 exponential smoothing factor를 적용하고 단위 테스트를 추가했다.
- Player의 Idle/Walk bob이 Camera 흔들림으로 전달되지 않도록 기준 높이를 고정했다.

### Changed

- 초기 Camera 위치와 FOV를 Follow Camera 설정과 일치시켰다.
- Camera orientation을 World 기준으로 고정해 Player 회전 시 화면이 과도하게 회전하지 않도록 했다.
- Onboarding overlay에 tracked, elevated, rotation locked 상태를 표시했다.

### Notes

- Camera가 Player를 따라가는 동안 Player는 화면 중앙보다 약간 아래에 유지된다.
- World boundary가 아직 없으므로 Scene 밖 이동 제한은 Commit 10에서 적용한다.

## [Commit 07] — Arrow-key movement

### Added

- 방향키 입력을 World 축 기반 Player 이동으로 연결했다.
- frame delta를 사용하는 일정한 이동 속도와 diagonal 방향 정규화를 적용했다.
- 최단 각도 보간으로 Player가 이동 방향을 부드럽게 바라보도록 구현했다.
- 이동 중 Walk, 정지 중 Idle animation이 자동으로 선택되도록 연결했다.
- input, textarea, select, button과 editable role에서는 이동 입력을 무시한다.
- 3D 화면에서 방향키가 브라우저 기본 동작을 일으키지 않도록 처리했다.
- Window focus를 잃으면 눌린 키 상태를 초기화한다.

### Tests

- 방향키와 World 방향 mapping
- Diagonal 속도 정규화와 반대 방향 상쇄
- 최단 각도 회전 보간
- Form 및 contenteditable 입력 예외

### Notes

- Camera는 현재 static이며 다음 Commit에서 Player 추적으로 전환한다.
- World boundary와 구조물 collision은 Commit 10 범위다.

## [Commit 06] — Stylized player

### Added

- 큰 머리와 작은 몸 비율의 친근한 low-poly Player를 code geometry로 구현했다.
- 안전모, 작업복, 명찰과 단순한 얼굴을 독자적인 디자인으로 구성했다.
- 공장 작업 바닥 앞쪽에 명시적인 spawn 위치를 추가했다.
- Idle과 Walk를 지원하는 절차적 limb animation 기반을 추가했다.
- animation이 누락되거나 지원되지 않을 때 Idle로 복구하는 fallback과 단위 테스트를 추가했다.

### Notes

- 외부 Character Asset과 새 dependency는 사용하지 않았다.
- 이번 단계에서는 Player를 Idle 상태로 표시하며 키보드 이동은 연결하지 않았다.

## [Commit 05] — Bright outdoor factory foundation

### Changed

- 어두운 실내 Factory Shell과 4개 임시 Area Platform을 제거했다.
- 34×30 규모의 잔디 기반 위에 짧은 순환형 도로, 보행로와 공장 작업 바닥을 구성했다.
- 밝은 하늘, 부드러운 daylight, 기본 shadow를 적용했다.
- 낮은 경계 언덕과 최소한의 low-poly 나무·관목을 추가했다.
- 전체 공장 기반을 한 화면에서 확인할 수 있도록 Camera와 FOV를 조정했다.
- Onboarding overlay와 loading UI를 밝은 Scene에서 읽을 수 있는 색상으로 변경했다.

### Notes

- 외부 3D Asset이나 새 dependency는 추가하지 않았다.
- Player, 건물, Zone 판정과 Interaction은 이후 Commit 범위로 남겼다.

## [Commit 04] — Product direction documentation

### Changed

- 3D 제품 방향을 어두운 실내 공장에서 작고 밝은 야외형 Smart Factory로 전환했다.
- 대규모 Campus 대신 주요 Zone이 짧은 동선 안에 밀집된 구성을 채택했다.
- 제품명 `X-FACTORY`와 사용자 직접 Git Commit 규칙을 유지했다.
- 현재 Python 3.13.15 기준을 유지하고 Python 3.11 전환을 보류했다.
- 새 방향에 맞게 개발 계획과 Feature Checklist를 재구성했다.

### Added

- 제품과 기술 결정을 관리하는 `DECISIONS.md`
- Commit 단위 구현 순서를 관리하는 `DEVELOPMENT_PLAN.md`
- RAG 공식 원천으로 사용할 12가지 Core Value 문서

### Notes

- 이 단계에서는 애플리케이션 코드와 dependency를 변경하지 않는다.
- 작업 트리에 존재하는 기존 실내 공장 구현은 새 3D 완료 조건으로 인정하지 않는다.
