export type IxChatStatus = "error" | "idle" | "loading" | "success";

export type IxChatViewState =
  | { status: "idle" }
  | { question: string; status: "loading" }
  | { answer: string; question: string; status: "success" }
  | { errorMessage: string; question: string; status: "error" };

export type IxMockResponse = {
  answer: string;
  contentStatus: "[DEMO DATA]";
  responseKind: "mock";
};

type MockRequestOptions = {
  delayMs?: number;
  signal?: AbortSignal;
};

export const IX_CHAT_INITIAL_STATE: IxChatViewState = { status: "idle" };

export const IX_SUGGESTED_QUESTIONS = [
  "X-FACTORY에서는 무엇을 할 수 있어?",
  "Core Value Quest는 어떻게 진행해?",
  "IX는 어떤 도움을 줄 수 있어?",
] as const;

const DEFAULT_MOCK_DELAY_MS = 480;

function createAbortError(): Error {
  return new Error("IX mock request aborted");
}

export function resolveIxMockResponse(question: string): IxMockResponse {
  const normalizedQuestion = question.trim().toLowerCase();

  if (!normalizedQuestion) {
    throw new Error("질문을 입력해 주세요.");
  }

  let answer: string;

  if (normalizedQuestion.includes("core value") || normalizedQuestion.includes("핵심가치")) {
    answer =
      "Core Value Park에는 4개의 Station과 12개의 짧은 Scenario가 준비되어 있어요. 행동을 선택하고 설명형 피드백을 확인하면 Value Passport에 경험이 기록됩니다.";
  } else if (normalizedQuestion.includes("x-factory") || normalizedQuestion.includes("무엇")) {
    answer =
      "X-FACTORY에서는 밝은 야외 스마트팩토리 단지를 탐험하며 Mission, Core Value Quest와 IX 대화 진입 경험을 확인할 수 있어요.";
  } else if (normalizedQuestion.includes("ix") || normalizedQuestion.includes("도움")) {
    answer =
      "저는 IX, AI Onboarding Buddy예요. 현재는 Chat UI를 검증하는 mock 단계이며, 실제 회사 정보에 대한 근거 기반 답변과 Sources는 후속 RAG 단계에서 연결됩니다.";
  } else if (normalizedQuestion.includes("미션") || normalizedQuestion.includes("mission")) {
    answer =
      "Mission HUD에서 현재 목표를 확인하고 Company Vision, Smart Factory, AI / SDM 지점과 IX를 차례로 경험해 보세요. 실제 Chat 응답이 연결되기 전에는 Meet IX Mission이 완료되지 않습니다.";
  } else {
    answer =
      "질문을 확인했어요. 지금은 IX Chat의 입력과 상태 흐름을 검증하는 mock 응답만 제공합니다. 확인된 자료에 없는 INTERX 내부 사실은 답변하지 않습니다.";
  }

  return {
    answer,
    contentStatus: "[DEMO DATA]",
    responseKind: "mock",
  };
}

export function requestIxMockResponse(
  question: string,
  { delayMs = DEFAULT_MOCK_DELAY_MS, signal }: MockRequestOptions = {},
): Promise<IxMockResponse> {
  if (signal?.aborted) {
    return Promise.reject(createAbortError());
  }

  return new Promise((resolve, reject) => {
    const handleAbort = () => {
      clearTimeout(timeoutId);
      reject(createAbortError());
    };
    const timeoutId = setTimeout(() => {
      signal?.removeEventListener("abort", handleAbort);

      try {
        resolve(resolveIxMockResponse(question));
      } catch (error) {
        reject(error);
      }
    }, Math.max(0, delayMs));

    signal?.addEventListener("abort", handleAbort, { once: true });
  });
}
