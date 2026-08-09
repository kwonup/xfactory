import type { CoreValueId } from "./core-values";

export type CoreValueChoice = {
  feedback: string;
  id: string;
  label: string;
  recommended: boolean;
};

export type CoreValueScenario = {
  choices: readonly CoreValueChoice[];
  contentStatus: "[DEMO DATA]";
  id: string;
  learningMode: "reflection-not-assessment";
  situation: string;
  takeaway: string;
  title: string;
  valueId: CoreValueId;
};

const DEMO_SCENARIO_META = {
  contentStatus: "[DEMO DATA]",
  learningMode: "reflection-not-assessment",
} as const;

export const CORE_VALUE_SCENARIOS: readonly CoreValueScenario[] = [
  {
    ...DEMO_SCENARIO_META,
    id: "define-ai-poc-goal",
    valueId: "quantitative-goal-setting",
    title: "AI PoC의 목표를 선명하게 만들기",
    situation:
      "신규 입사자인 당신은 4주 동안 진행할 AI 비전 PoC를 맡았습니다. 팀의 요청은 '인식 성능을 최대한 개선해 주세요'라는 말뿐입니다.",
    choices: [
      {
        id: "start-without-metrics",
        label: "가능한 모델부터 빠르게 적용하고 마지막 주에 성능을 정리한다.",
        feedback:
          "실행 속도는 빠르지만 중간 판단 기준이 없어 목표 달성 경로를 조정하기 어렵습니다.",
        recommended: false,
      },
      {
        id: "define-linked-indicators",
        label:
          "조직의 기대 효과를 확인하고 목표 수치, 주간 선행 지표와 최종 후행 지표를 합의한다.",
        feedback:
          "조직 목표와 측정 지표를 연결하면 매주 진행 상황을 확인하고 필요한 행동을 조기에 조정할 수 있습니다.",
        recommended: true,
      },
      {
        id: "copy-previous-goal",
        label: "이전 프로젝트의 목표 수치를 그대로 사용한다.",
        feedback:
          "참고 기준은 얻을 수 있지만 이번 과제의 고객 가치와 제약이 반영되지 않을 수 있습니다.",
        recommended: false,
      },
    ],
    takeaway:
      "도전적인 목표는 조직의 목표와 연결하고, 과정과 결과를 보여 주는 수치로 함께 관리합니다.",
  },
  {
    ...DEMO_SCENARIO_META,
    id: "automate-repeated-cleanup",
    valueId: "efficient-time-management",
    title: "반복 업무에서 가치 있는 시간 확보하기",
    situation:
      "매일 아침 40분씩 같은 형식의 센서 데이터를 정리해야 해서 정작 이상 원인을 분석할 시간이 부족합니다.",
    choices: [
      {
        id: "keep-manual-routine",
        label: "정확성이 익숙한 수작업 방식을 계속 유지한다.",
        feedback:
          "당장의 안정성은 있지만 반복 업무가 계속 분석 시간을 잠식하고 개선 기회도 줄어듭니다.",
        recommended: false,
      },
      {
        id: "delay-analysis",
        label: "정리는 유지하고 원인 분석을 마감 이후로 미룬다.",
        feedback:
          "마감은 지킬 수 있어도 더 높은 가치의 판단이 뒤로 밀려 문제 대응이 늦어질 수 있습니다.",
        recommended: false,
      },
      {
        id: "automate-and-verify",
        label: "AI나 스크립트로 정리를 자동화하고 검증 절차를 둔 뒤 확보한 시간을 분석에 쓴다.",
        feedback:
          "자동화 결과를 검증하면서 반복 시간을 줄이면 마감을 지키고 더 중요한 분석에 집중할 수 있습니다.",
        recommended: true,
      },
    ],
    takeaway:
      "도구와 리소스로 반복 업무를 효율화하되 검증 장치를 두고, 확보한 시간을 더 높은 가치에 사용합니다.",
  },
  {
    ...DEMO_SCENARIO_META,
    id: "prepare-customer-demo",
    valueId: "high-standard-results",
    title: "고객 데모의 완성도 높이기",
    situation:
      "고객 데모를 앞두고 이전 시연에서도 나타났던 화면 지연이 다시 발견되었습니다. 핵심 기능은 동작하지만 재발 가능성이 있습니다.",
    choices: [
      {
        id: "quality-gate",
        label: "재현 조건과 원인을 기록하고 회귀 체크리스트와 최종 품질 확인 절차를 수행한다.",
        feedback:
          "반복 실수를 구조적으로 줄이고 결과물의 완성도를 일관되게 유지하는 접근입니다.",
        recommended: true,
      },
      {
        id: "hide-delay",
        label: "지연이 잘 보이지 않는 시연 순서로 바꾼다.",
        feedback:
          "표면적인 위험은 줄어들지만 원인이 남아 있어 전문성과 신뢰를 지속하기 어렵습니다.",
        recommended: false,
      },
      {
        id: "accept-current-quality",
        label: "핵심 기능이 되므로 현재 상태를 최종본으로 확정한다.",
        feedback:
          "마감 부담은 줄지만 반복된 결함을 개선하지 않아 같은 문제가 다시 나타날 수 있습니다.",
        recommended: false,
      },
    ],
    takeaway:
      "높은 수준의 결과는 반복 오류를 줄이는 과정과 마지막까지 품질을 확인하는 태도에서 나옵니다.",
  },
  {
    ...DEMO_SCENARIO_META,
    id: "solve-recurring-alert",
    valueId: "value-centered-problem-solving",
    title: "반복 알림의 본질 찾기",
    situation:
      "한 고객사의 설비 알림이 매주 반복됩니다. 임계값을 올리면 알림 수는 줄지만 고객은 생산 차질 가능성을 걱정합니다.",
    choices: [
      {
        id: "raise-threshold",
        label: "알림 임계값을 즉시 높여 발생 건수부터 줄인다.",
        feedback:
          "눈앞의 증상은 완화되지만 고객의 생산 위험과 반복 원인은 그대로 남을 수 있습니다.",
        recommended: false,
      },
      {
        id: "add-manual-monitoring",
        label: "담당자가 알림을 매일 수동 확인하도록 한다.",
        feedback:
          "단기 대응은 가능하지만 지속적인 인력 부담이 생기고 구조적 개선으로 이어지기 어렵습니다.",
        recommended: false,
      },
      {
        id: "trace-customer-impact",
        label: "고객의 생산 영향과 알림 데이터를 함께 분석해 근본 원인과 구조적 해결안을 찾는다.",
        feedback:
          "고객이 실제로 겪는 가치 손실에서 출발하면 증상이 아니라 문제의 본질을 해결할 수 있습니다.",
        recommended: true,
      },
    ],
    takeaway:
      "문제 해결은 고객과 시장의 가치에서 시작해 원인을 파악하고 재발을 줄이는 구조로 이어져야 합니다.",
  },
  {
    ...DEMO_SCENARIO_META,
    id: "challenge-familiar-approach",
    valueId: "fundamental-critical-thinking",
    title: "익숙한 방식의 가정 검토하기",
    situation:
      "팀이 오랫동안 사용한 예측 방식이 있지만 최근 데이터에서는 오차가 계속 커지고 있습니다. 일정상 기존 방식을 유지하자는 의견이 많습니다.",
    choices: [
      {
        id: "follow-experience",
        label: "경험이 축적된 방식이므로 이번에도 그대로 적용한다.",
        feedback:
          "일정 예측은 쉽지만 달라진 데이터가 보내는 신호와 기존 방식의 한계를 놓칠 수 있습니다.",
        recommended: false,
      },
      {
        id: "review-assumptions",
        label: "오차 수치로 기존 가정을 검토하고 대안별 효과와 비용을 비교한다.",
        feedback:
          "경험을 무조건 버리는 대신 데이터로 가정을 점검하면 더 나은 전략을 근거 있게 선택할 수 있습니다.",
        recommended: true,
      },
      {
        id: "replace-everything",
        label: "기존 방식은 낡았다고 보고 검증 없이 최신 모델로 전환한다.",
        feedback:
          "새로운 가능성은 열리지만 대안 역시 근거 없이 선택하면 같은 판단 오류를 반복할 수 있습니다.",
        recommended: false,
      },
    ],
    takeaway:
      "익숙함이나 새로움 자체가 아니라 수치와 데이터로 가정을 검토하고 대안을 비교합니다.",
  },
  {
    ...DEMO_SCENARIO_META,
    id: "accelerate-weekly-report",
    valueId: "innovation-process-acceleration",
    title: "주간 보고 프로세스 개선하기",
    situation:
      "여러 팀이 같은 데이터를 복사해 주간 보고서를 만들고 있습니다. 형식 오류가 잦고 작성에 반나절이 걸립니다.",
    choices: [
      {
        id: "work-faster",
        label: "담당자들에게 복사 작업을 더 빠르게 끝내 달라고 요청한다.",
        feedback:
          "일시적으로 속도는 높일 수 있지만 반복 구조와 오류 원인은 바뀌지 않습니다.",
        recommended: false,
      },
      {
        id: "pilot-and-spread",
        label: "작은 자동화 시범을 만들고 시간·오류 변화를 확인한 뒤 사용법과 함께 확산한다.",
        feedback:
          "기술의 효과를 작게 검증하고 팀이 재사용할 수 있게 공유하면 프로세스 개선이 조직으로 이어집니다.",
        recommended: true,
      },
      {
        id: "build-private-tool",
        label: "내 업무만 처리하는 개인용 자동화 도구를 만든다.",
        feedback:
          "개인 시간은 줄일 수 있지만 다른 팀의 반복 업무와 전체 프로세스는 그대로 남습니다.",
        recommended: false,
      },
    ],
    takeaway:
      "새 기술은 적용 자체보다 효과를 검증하고 재사용 가능한 프로세스로 제안·확산할 때 더 큰 혁신이 됩니다.",
  },
  {
    ...DEMO_SCENARIO_META,
    id: "learn-from-model-result",
    valueId: "persistent-tenacity",
    title: "첫 모델 결과에서 다음 실험 찾기",
    situation:
      "첫 번째 이상 탐지 모델이 목표 성능에 미치지 못했습니다. 데이터도 제한적이고 어떤 요인이 문제인지 아직 분명하지 않습니다.",
    choices: [
      {
        id: "change-everything",
        label: "데이터와 모델 설정을 한 번에 모두 바꿔 다시 실행한다.",
        feedback:
          "새 결과는 얻지만 어떤 변화가 영향을 줬는지 배우기 어려워 다음 전략을 세우기 힘듭니다.",
        recommended: false,
      },
      {
        id: "stop-experiment",
        label: "현재 조건에서는 어렵다고 판단하고 실험을 종료한다.",
        feedback:
          "불필요한 투입은 막을 수 있지만 아직 확인하지 않은 가설과 개선 가능성도 함께 닫힙니다.",
        recommended: false,
      },
      {
        id: "iterate-with-hypothesis",
        label: "결과와 원인 가설을 기록하고 한 가지 조건씩 바꾸며 반복 검증한다.",
        feedback:
          "첫 결과를 학습 자료로 삼아 전략을 수정하면 불확실성 속에서도 해결책에 가까워질 수 있습니다.",
        recommended: true,
      },
    ],
    takeaway:
      "원하는 결과가 아니어도 배운 점을 기록하고 가설과 전략을 수정하며 끝까지 반복합니다.",
  },
  {
    ...DEMO_SCENARIO_META,
    id: "lead-unfamiliar-task",
    valueId: "self-driven-growth",
    title: "낯선 업무를 성장 기회로 전환하기",
    situation:
      "처음 접하는 제조 데이터 분석 업무가 주어졌습니다. 팀에도 정리된 학습 자료가 많지 않습니다.",
    choices: [
      {
        id: "wait-for-training",
        label: "정식 교육 자료가 준비될 때까지 익숙한 업무만 수행한다.",
        feedback:
          "안전하게 시작할 수 있지만 스스로 학습하고 업무를 주도할 기회가 늦어집니다.",
        recommended: false,
      },
      {
        id: "connect-and-lead",
        label: "업무의 목적을 확인하고 학습 계획을 세운 뒤 작은 분석 결과부터 주도해 공유한다.",
        feedback:
          "일의 의미를 이해한 상태에서 필요한 지식을 스스로 채우고 결과를 만들면 성장과 기여가 연결됩니다.",
        recommended: true,
      },
      {
        id: "delegate-unknown-work",
        label: "경험이 있는 동료에게 업무 전체를 넘긴다.",
        feedback:
          "단기 효율은 높을 수 있지만 자신의 역량을 넓히고 주도성을 발휘할 기회는 줄어듭니다.",
        recommended: false,
      },
    ],
    takeaway:
      "일의 의미를 이해하고 필요한 학습을 스스로 설계해 작은 결과부터 주도적으로 만듭니다.",
  },
  {
    ...DEMO_SCENARIO_META,
    id: "respond-to-requirement-change",
    valueId: "future-optimistic-challenge",
    title: "예상 밖의 변경에서 새 경로 찾기",
    situation:
      "개발 중 고객 요구사항이 바뀌어 기존 계획을 그대로 진행하기 어렵습니다. 남은 기간도 넉넉하지 않습니다.",
    choices: [
      {
        id: "defend-old-plan",
        label: "처음 합의한 계획을 근거로 변경 요청을 모두 거절한다.",
        feedback:
          "일정은 보호할 수 있지만 변화한 고객 가치와 새로운 가능성을 반영하기 어렵습니다.",
        recommended: false,
      },
      {
        id: "accept-all-change",
        label: "가능성 검토 없이 모든 변경을 현재 일정에 추가한다.",
        feedback:
          "적극적으로 보일 수 있지만 제약을 무시하면 팀과 결과물 모두에 더 큰 위험이 생깁니다.",
        recommended: false,
      },
      {
        id: "reframe-and-experiment",
        label: "새 목표와 제약을 다시 정리하고 가능성이 큰 대안을 작은 실험으로 먼저 확인한다.",
        feedback:
          "현실적인 제약을 보면서도 더 나은 결과를 기대하고 도전할 수 있는 실행 경로를 만듭니다.",
        recommended: true,
      },
    ],
    takeaway:
      "변화의 어려움을 인정하되 더 나은 미래를 전제로 제약 안에서 시도할 수 있는 다음 행동을 찾습니다.",
  },
  {
    ...DEMO_SCENARIO_META,
    id: "use-peer-feedback",
    valueId: "growth-oriented-feedback",
    title: "동료의 피드백을 공동 성장으로 연결하기",
    situation:
      "동료가 당신의 화면 설계가 너무 복잡하다는 의견을 주었습니다. 당신은 충분한 이유가 있다고 생각하지만 어떤 부분을 말하는지는 모호합니다.",
    choices: [
      {
        id: "explain-immediately",
        label: "현재 설계의 이유를 길게 설명해 동료를 설득한다.",
        feedback:
          "의도는 전달되지만 상대가 발견한 구체적인 문제를 이해하기 전에 대화가 방어적으로 흐를 수 있습니다.",
        recommended: false,
      },
      {
        id: "ask-align-improve",
        label: "구체적인 사례를 묻고 기준을 맞춘 뒤 개선 결과와 배운 점을 다시 공유한다.",
        feedback:
          "피드백을 열린 마음으로 확인하고 솔직하게 조율하면 결과물과 서로의 판단 기준이 함께 성장합니다.",
        recommended: true,
      },
      {
        id: "ignore-vague-feedback",
        label: "구체적이지 않은 의견이므로 현재 설계를 유지한다.",
        feedback:
          "불필요한 변경은 피하지만 중요한 사용성 신호와 소통 기회를 놓칠 수 있습니다.",
        recommended: false,
      },
    ],
    takeaway:
      "피드백은 방어하거나 따르는 일이 아니라 구체적으로 이해하고 솔직히 조율해 함께 성장하는 과정입니다.",
  },
  {
    ...DEMO_SCENARIO_META,
    id: "align-cross-team-priorities",
    valueId: "relationship-based-strategic-communication",
    title: "서로 다른 팀의 우선순위 연결하기",
    situation:
      "공동 프로젝트가 상대 팀의 다른 긴급 업무 때문에 지연되고 있습니다. 각 팀은 자신의 일정이 더 중요하다고 느낍니다.",
    choices: [
      {
        id: "escalate-first",
        label: "상대 팀의 지연 사실을 바로 상위 책임자에게 알린다.",
        feedback:
          "빠른 주목은 받을 수 있지만 서로의 상황을 이해하고 신뢰를 쌓을 기회가 줄어들 수 있습니다.",
        recommended: false,
      },
      {
        id: "wait-silently",
        label: "관계를 해치지 않도록 상대 팀이 여유가 생길 때까지 기다린다.",
        feedback:
          "갈등은 피하지만 공동 목표와 일정 위험을 함께 관리하지 못합니다.",
        recommended: false,
      },
      {
        id: "align-shared-outcome",
        label: "상대 팀의 목표와 제약을 듣고 공동 성과, 역할, 의사결정 시점을 다시 합의한다.",
        feedback:
          "상대의 맥락을 존중하며 공동 목표를 명확히 하면 신뢰를 유지하면서 실행 가능한 협업 구조를 만들 수 있습니다.",
        recommended: true,
      },
    ],
    takeaway:
      "전략적 소통은 관계를 기반으로 서로의 목표를 이해하고 공동 성과를 위한 역할과 약속을 명확히 합니다.",
  },
  {
    ...DEMO_SCENARIO_META,
    id: "investigate-unfamiliar-anomaly",
    valueId: "obsessive-curiosity",
    title: "낯선 이상 징후를 학습으로 연결하기",
    situation:
      "모니터링 화면에서 원인을 알 수 없는 짧은 진동 패턴을 발견했습니다. 현재 생산에는 눈에 띄는 문제가 없습니다.",
    choices: [
      {
        id: "record-only",
        label: "당장 영향이 없으므로 메모만 남기고 넘어간다.",
        feedback:
          "업무 흐름은 유지하지만 새로운 신호가 가진 의미와 개선 가능성을 확인하지 못합니다.",
        recommended: false,
      },
      {
        id: "question-learn-apply",
        label: "현상에 질문을 붙이고 관련 지식을 찾아 작은 검증을 한 뒤 배운 내용을 모니터링에 반영한다.",
        feedback:
          "호기심을 학습과 실험, 실제 적용까지 연결하면 알려지지 않은 현상에서 더 나은 방법을 찾을 수 있습니다.",
        recommended: true,
      },
      {
        id: "assume-serious-fault",
        label: "중대한 고장 신호라고 가정하고 즉시 전체 공정을 중단한다.",
        feedback:
          "위험에 민감한 태도는 중요하지만 근거를 확인하지 않은 조치는 불필요한 영향을 만들 수 있습니다.",
        recommended: false,
      },
    ],
    takeaway:
      "호기심은 질문에서 끝나지 않고 학습, 검증, 실제 업무 적용으로 이어질 때 개선의 힘이 됩니다.",
  },
];

export const CORE_VALUE_SCENARIO_BY_VALUE_ID = Object.fromEntries(
  CORE_VALUE_SCENARIOS.map((scenario) => [scenario.valueId, scenario]),
) as Record<CoreValueId, CoreValueScenario>;
