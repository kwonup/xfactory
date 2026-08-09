# X-FACTORY Changelog

각 단계에서 실제 변경된 내용을 기록한다. 미래 계획은 [`DEVELOPMENT_PLAN.md`](./DEVELOPMENT_PLAN.md)에서 관리한다.

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
