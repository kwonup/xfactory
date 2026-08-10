import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  IxChatPanelContent,
} from "@/components/onboarding/ix-chat-panel";
import {
  IX_SUGGESTED_QUESTIONS,
  requestIxMockResponse,
  resolveIxMockResponse,
  type IxChatViewState,
} from "@/features/chat/ix-chat";
import { useMissionStore } from "@/stores/mission-store";

afterEach(() => {
  useMissionStore.getState().resetMissions();
});

function renderChatState(state: IxChatViewState, draft = "") {
  return renderToStaticMarkup(
    createElement(IxChatPanelContent, {
      draft,
      onClose: vi.fn(),
      onDraftChange: vi.fn(),
      onRetry: vi.fn(),
      onSubmitQuestion: vi.fn(),
      state,
    }),
  );
}

describe("IX deterministic mock", () => {
  it("returns the same labeled response for the same question", async () => {
    const question = IX_SUGGESTED_QUESTIONS[0];
    const firstResponse = resolveIxMockResponse(question);
    const secondResponse = await requestIxMockResponse(question, { delayMs: 0 });

    expect(secondResponse).toEqual(firstResponse);
    expect(secondResponse.contentStatus).toBe("[DEMO DATA]");
    expect(secondResponse.responseKind).toBe("mock");
    expect(secondResponse.answer).toContain("X-FACTORY");
  });

  it("rejects empty and cancelled requests without completing Meet IX", async () => {
    expect(() => resolveIxMockResponse("   ")).toThrow("질문을 입력해 주세요.");

    const controller = new AbortController();
    const pendingResponse = requestIxMockResponse("IX는 누구야?", {
      delayMs: 100,
      signal: controller.signal,
    });

    controller.abort();

    await expect(pendingResponse).rejects.toThrow("aborted");
    expect(useMissionStore.getState().completedMissionIds).not.toContain("meet-ix");
  });

  it("provides three unique onboarding suggestions", () => {
    expect(IX_SUGGESTED_QUESTIONS).toHaveLength(3);
    expect(new Set(IX_SUGGESTED_QUESTIONS).size).toBe(3);
  });
});

describe("IX Chat Panel states", () => {
  it("renders the idle dialog, recommended questions and input controls", () => {
    const markup = renderChatState({ status: "idle" });

    expect(markup).toContain('role="dialog"');
    expect(markup).toContain('aria-modal="true"');
    expect(markup).toContain("[DEMO DATA] · MOCK CHAT");
    expect(markup).toContain("AI Onboarding Buddy");
    expect(markup).toContain("SUGGESTED QUESTIONS");
    expect(markup).toContain(IX_SUGGESTED_QUESTIONS[0]);
    expect(markup).toContain('name="message"');
    expect(markup).toContain("IX Chat 닫기");
    expect(markup).toContain("ESC 닫기");
  });

  it("distinguishes loading and success with an announced conversation log", () => {
    const loadingMarkup = renderChatState({
      question: "여기는 어떤 곳이야?",
      status: "loading",
    });
    const successMarkup = renderChatState({
      answer: "결정적인 mock 답변입니다.",
      question: "여기는 어떤 곳이야?",
      status: "success",
    });

    expect(loadingMarkup).toContain('aria-busy="true"');
    expect(loadingMarkup).toContain('data-status="loading"');
    expect(loadingMarkup).toContain("IX · THINKING");
    expect(loadingMarkup).toContain("답변을 준비하고 있어요");
    expect(successMarkup).toContain('aria-busy="false"');
    expect(successMarkup).toContain('data-status="success"');
    expect(successMarkup).toContain("[DEMO DATA] · MOCK RESPONSE");
    expect(successMarkup).toContain("결정적인 mock 답변입니다.");
  });

  it("renders an explicit error and retry action", () => {
    const markup = renderChatState({
      errorMessage: "Mock 응답을 준비하지 못했습니다.",
      question: "다시 알려줘",
      status: "error",
    });

    expect(markup).toContain('data-status="error"');
    expect(markup).toContain('role="alert"');
    expect(markup).toContain("IX · ERROR");
    expect(markup).toContain("Mock 응답을 준비하지 못했습니다.");
    expect(markup).toContain("다시 시도");
  });
});
