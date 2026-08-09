# X-FACTORY Changelog

각 단계에서 실제 변경된 내용을 기록한다. 미래 계획은 [`DEVELOPMENT_PLAN.md`](./DEVELOPMENT_PLAN.md)에서 관리한다.

## [Unreleased]

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
