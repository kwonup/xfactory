export type CoreValueClusterId =
  | "goal-execution"
  | "problem-solving-innovation"
  | "growth-resilience"
  | "collaboration-curiosity";

export type CoreValueId =
  | "quantitative-goal-setting"
  | "efficient-time-management"
  | "high-standard-results"
  | "value-centered-problem-solving"
  | "fundamental-critical-thinking"
  | "innovation-process-acceleration"
  | "persistent-tenacity"
  | "self-driven-growth"
  | "future-optimistic-challenge"
  | "growth-oriented-feedback"
  | "relationship-based-strategic-communication"
  | "obsessive-curiosity";

export type CoreValue = {
  clusterId: CoreValueClusterId;
  id: CoreValueId;
  name: string;
  officialDescription: string;
  order: number;
  source: "user-provided-official";
};

export type CoreValueCluster = {
  id: CoreValueClusterId;
  order: number;
  title: string;
  valueIds: readonly CoreValueId[];
};

export const CORE_VALUE_CLUSTERS: readonly CoreValueCluster[] = [
  {
    id: "goal-execution",
    order: 1,
    title: "Goal & Execution",
    valueIds: [
      "quantitative-goal-setting",
      "efficient-time-management",
      "high-standard-results",
    ],
  },
  {
    id: "problem-solving-innovation",
    order: 2,
    title: "Problem Solving & Innovation",
    valueIds: [
      "value-centered-problem-solving",
      "fundamental-critical-thinking",
      "innovation-process-acceleration",
    ],
  },
  {
    id: "growth-resilience",
    order: 3,
    title: "Growth & Resilience",
    valueIds: [
      "persistent-tenacity",
      "self-driven-growth",
      "future-optimistic-challenge",
    ],
  },
  {
    id: "collaboration-curiosity",
    order: 4,
    title: "Collaboration & Curiosity",
    valueIds: [
      "growth-oriented-feedback",
      "relationship-based-strategic-communication",
      "obsessive-curiosity",
    ],
  },
];

export const CORE_VALUES: readonly CoreValue[] = [
  {
    clusterId: "goal-execution",
    id: "quantitative-goal-setting",
    name: "선도적/정량 목표의식",
    officialDescription:
      "조직의 목표와 연결된 도전적인 목표를 설정하고, 선행·후행 지표를 수치화하여 목표 달성 과정을 체계적으로 관리한다.",
    order: 1,
    source: "user-provided-official",
  },
  {
    clusterId: "goal-execution",
    id: "efficient-time-management",
    name: "초효율적 시간관리",
    officialDescription:
      "AI 등 다양한 도구와 리소스를 적극 활용하여 업무를 자동화/효율화하고, 확보한 시간을 더 높은 가치의 업무에 집중하며 마감기한을 준수한다.",
    order: 2,
    source: "user-provided-official",
  },
  {
    clusterId: "goal-execution",
    id: "high-standard-results",
    name: "최고수준의 결과지향",
    officialDescription:
      "반복적인 실수를 줄이고 높은 품질을 지속적으로 유지하며, 결과물에 높은 수준의 완성도와 전문성을 추구한다.",
    order: 3,
    source: "user-provided-official",
  },
  {
    clusterId: "problem-solving-innovation",
    id: "value-centered-problem-solving",
    name: "가치중심적 문제해결",
    officialDescription:
      "고객과 시장에 대한 이해를 바탕으로 문제의 본질을 파악하고, 단기적인 임시 해결이 아닌 구조적인 해결방안을 고민한다.",
    order: 4,
    source: "user-provided-official",
  },
  {
    clusterId: "problem-solving-innovation",
    id: "fundamental-critical-thinking",
    name: "근본적 비판 사고",
    officialDescription:
      "수치와 데이터를 근거로 기존 방식과 경험을 비판적으로 검토하고, 더 나은 전략과 근본적인 대안을 도출한다.",
    order: 5,
    source: "user-provided-official",
  },
  {
    clusterId: "problem-solving-innovation",
    id: "innovation-process-acceleration",
    name: "혁신 프로세스 가속화",
    officialDescription:
      "AI와 새로운 기술을 적극 활용하여 업무 방식을 개선하고, 효율적인 프로세스를 제안하고 확산한다.",
    order: 6,
    source: "user-provided-official",
  },
  {
    clusterId: "growth-resilience",
    id: "persistent-tenacity",
    name: "집요한 끈기",
    officialDescription:
      "실패를 통해 빠르게 배우고 전략을 수정하며 반복적으로 실행한다. 불확실한 상황에서도 끝까지 해결책을 찾는다.",
    order: 7,
    source: "user-provided-official",
  },
  {
    clusterId: "growth-resilience",
    id: "self-driven-growth",
    name: "자발적 성장동기",
    officialDescription:
      "자신의 일의 의미와 가치를 이해하고, 스스로 학습하고 성장하며 업무를 주도한다.",
    order: 8,
    source: "user-provided-official",
  },
  {
    clusterId: "growth-resilience",
    id: "future-optimistic-challenge",
    name: "미래낙관적 도전",
    officialDescription:
      "예상치 못한 변화와 어려움 속에서도 긍정적인 태도를 유지하고, 더 나은 미래를 믿고 새로운 도전을 이어간다.",
    order: 9,
    source: "user-provided-official",
  },
  {
    clusterId: "collaboration-curiosity",
    id: "growth-oriented-feedback",
    name: "성장지향 피드백",
    officialDescription:
      "피드백을 적극적으로 주고받고 열린 마음으로 수용하며, 솔직한 소통을 통해 함께 성장한다.",
    order: 10,
    source: "user-provided-official",
  },
  {
    clusterId: "collaboration-curiosity",
    id: "relationship-based-strategic-communication",
    name: "관계기반 전략소통",
    officialDescription:
      "내·외부 이해관계자와 신뢰를 형성하고, 전략적인 협업과 네트워크를 통해 더 큰 시너지를 만든다.",
    order: 11,
    source: "user-provided-official",
  },
  {
    clusterId: "collaboration-curiosity",
    id: "obsessive-curiosity",
    name: "강박적 호기심",
    officialDescription:
      "새로운 분야에 끊임없이 질문하고 학습하며, 배운 내용을 실제 업무에 적용해 더 나은 방법을 찾는다.",
    order: 12,
    source: "user-provided-official",
  },
];

export const CORE_VALUE_BY_ID = Object.fromEntries(
  CORE_VALUES.map((value) => [value.id, value]),
) as Record<CoreValueId, CoreValue>;

export const CORE_VALUE_CLUSTER_BY_ID = Object.fromEntries(
  CORE_VALUE_CLUSTERS.map((cluster) => [cluster.id, cluster]),
) as Record<CoreValueClusterId, CoreValueCluster>;
