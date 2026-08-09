import type { InteractionTargetId } from "@/features/interaction/interaction-targets";

export const INFORMATION_TARGET_IDS = [
  "company-vision-display",
  "smart-factory-console",
  "ai-sdm-monitor",
] as const satisfies readonly InteractionTargetId[];

export type InformationTargetId = (typeof INFORMATION_TARGET_IDS)[number];

export type MissionInteractionEventId =
  | "vision-display-reviewed"
  | "smart-factory-reviewed"
  | "ai-sdm-reviewed";

export type InformationContent = {
  description: string;
  highlights: readonly string[];
  missionEventId: MissionInteractionEventId;
  sourceLabel: string;
  status: "[DEMO DATA]";
  subtitle: string;
  title: string;
};

export type InformationInteractionEvent = {
  missionEventId: MissionInteractionEventId;
  targetId: InformationTargetId;
  type: "information-interaction-confirmed";
};

const USER_PROVIDED_PLAN_SOURCE = "Source · 사용자 제공 X-FACTORY 온보딩 기획";

export const INFORMATION_CONTENT_BY_TARGET: Record<InformationTargetId, InformationContent> = {
  "company-vision-display": {
    description:
      "Company Vision Lab은 신규 입사자가 INTERX의 공식 비전과 회사 정보를 확인하도록 설계된 온보딩 지점입니다. 현재 저장소에는 검증된 회사·비전 원문이 없어 구체적인 내용은 표시하지 않습니다.",
    highlights: [
      "공식 자료가 제공되면 출처와 함께 이 화면에 연결합니다.",
      "확인되지 않은 비전·사업 정보는 온보딩 콘텐츠로 임의 생성하지 않습니다.",
    ],
    missionEventId: "vision-display-reviewed",
    sourceLabel: USER_PROVIDED_PLAN_SOURCE,
    status: "[DEMO DATA]",
    subtitle: "공식 회사·비전 자료 연결 대기",
    title: "Company Vision Lab",
  },
  "smart-factory-console": {
    description:
      "이 체험은 Robot Arm, Conveyor, Monitor로 제조 흐름을 관찰하는 과정을 표현한 로우폴리 데모입니다. 실제 INTERX 제품이나 생산 공정 구조를 재현한 내용은 아닙니다.",
    highlights: [
      "설비와 공정을 짧은 동선에서 살펴보는 온보딩 체험을 검증합니다.",
      "구체적인 기술·공정 설명은 검증된 공식 자료가 제공된 후에만 추가합니다.",
    ],
    missionEventId: "smart-factory-reviewed",
    sourceLabel: USER_PROVIDED_PLAN_SOURCE,
    status: "[DEMO DATA]",
    subtitle: "스타일라이즈드 제조 흐름 체험",
    title: "Smart Factory Experience",
  },
  "ai-sdm-monitor": {
    description:
      "Data → AI → Factory → Optimization은 사용자가 제공한 온보딩 기획의 체험 흐름을 시각화한 데모입니다. 실제 INTERX 시스템 구조나 SDM 제품 정의를 설명하는 자료는 아닙니다.",
    highlights: [
      "데이터와 AI가 제조 현장과 연결되는 온보딩 흐름만 개념적으로 표현합니다.",
      "SDM에 대한 사실 정보는 공식 기술 자료가 확인되기 전까지 추가하지 않습니다.",
    ],
    missionEventId: "ai-sdm-reviewed",
    sourceLabel: USER_PROVIDED_PLAN_SOURCE,
    status: "[DEMO DATA]",
    subtitle: "Data → AI → Factory → Optimization",
    title: "AI / SDM Lab",
  },
};

export function createInformationInteractionEvent(
  targetId: InformationTargetId,
): InformationInteractionEvent {
  return {
    missionEventId: INFORMATION_CONTENT_BY_TARGET[targetId].missionEventId,
    targetId,
    type: "information-interaction-confirmed",
  };
}

export function isInformationTargetId(
  targetId: InteractionTargetId,
): targetId is InformationTargetId {
  return (INFORMATION_TARGET_IDS as readonly InteractionTargetId[]).includes(targetId);
}
