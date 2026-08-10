"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

import {
  IX_CHAT_INITIAL_STATE,
  IX_SUGGESTED_QUESTIONS,
  requestIxMockResponse,
  type IxChatViewState,
} from "@/features/chat/ix-chat";
import { IX_NPC_TARGET_ID } from "@/features/ix/ix-config";
import { useWorldStore } from "@/stores/world-store";

type IxChatPanelContentProps = {
  draft: string;
  onClose: () => void;
  onDraftChange: (value: string) => void;
  onRetry: () => void;
  onSubmitQuestion: (question: string) => void;
  state: IxChatViewState;
};

export function IxChatPanelContent({
  draft,
  onClose,
  onDraftChange,
  onRetry,
  onSubmitQuestion,
  state,
}: IxChatPanelContentProps) {
  const isLoading = state.status === "loading";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmitQuestion(draft);
  };

  return (
    <div className="ix-chat-backdrop">
      <section
        className="ix-chat-panel"
        role="dialog"
        aria-labelledby="ix-chat-title"
        aria-describedby="ix-chat-description"
        aria-modal="true"
      >
        <header className="ix-chat-header">
          <div className="ix-chat-identity">
            <span className="ix-chat-avatar" aria-hidden="true">
              IX
            </span>
            <div>
              <span>[DEMO DATA] · MOCK CHAT</span>
              <h2 id="ix-chat-title">AI Onboarding Buddy</h2>
            </div>
          </div>
          <button
            className="ix-chat-close"
            type="button"
            onClick={onClose}
            aria-label="IX Chat 닫기"
          >
            ×
          </button>
        </header>

        <p id="ix-chat-description" className="ix-chat-description">
          현재는 UI 검증용 mock 응답입니다. 확인된 자료에 없는 INTERX 내부 사실은 답변하지
          않습니다.
        </p>

        <div
          className="ix-chat-log"
          aria-live="polite"
          aria-busy={isLoading}
          data-status={state.status}
        >
          {state.status === "idle" ? (
            <div className="ix-chat-message" data-speaker="ix">
              <span>IX</span>
              <p>
                안녕하세요! X-FACTORY 탐험을 돕는 IX예요. 아래 질문을 선택하거나 궁금한 내용을
                입력해 보세요.
              </p>
            </div>
          ) : (
            <div className="ix-chat-message" data-speaker="user">
              <span>YOU</span>
              <p>{state.question}</p>
            </div>
          )}

          {state.status === "loading" ? (
            <div className="ix-chat-message" data-speaker="ix" role="status">
              <span>IX · THINKING</span>
              <p className="ix-chat-loading-text">
                답변을 준비하고 있어요
                <span aria-hidden="true">•••</span>
              </p>
            </div>
          ) : null}

          {state.status === "success" ? (
            <div className="ix-chat-message" data-speaker="ix">
              <span>IX · [DEMO DATA] · MOCK RESPONSE</span>
              <p>{state.answer}</p>
            </div>
          ) : null}

          {state.status === "error" ? (
            <div className="ix-chat-message ix-chat-error" data-speaker="ix" role="alert">
              <span>IX · ERROR</span>
              <p>{state.errorMessage}</p>
              <button type="button" onClick={onRetry}>
                다시 시도
              </button>
            </div>
          ) : null}
        </div>

        <section className="ix-chat-suggestions" aria-labelledby="ix-chat-suggestions-title">
          <span id="ix-chat-suggestions-title">SUGGESTED QUESTIONS</span>
          <div>
            {IX_SUGGESTED_QUESTIONS.map((question) => (
              <button
                key={question}
                type="button"
                disabled={isLoading}
                onClick={() => onSubmitQuestion(question)}
              >
                {question}
              </button>
            ))}
          </div>
        </section>

        <form className="ix-chat-form" onSubmit={handleSubmit}>
          <label htmlFor="ix-chat-input">IX에게 질문하기</label>
          <div>
            <input
              id="ix-chat-input"
              name="message"
              type="text"
              value={draft}
              disabled={isLoading}
              maxLength={500}
              placeholder="온보딩 공간에 대해 질문해 보세요"
              onChange={(event) => onDraftChange(event.target.value)}
              autoComplete="off"
              autoFocus
            />
            <button type="submit" disabled={isLoading || !draft.trim()}>
              {isLoading ? "전송 중" : "보내기"}
            </button>
          </div>
          <small>ENTER 전송 · ESC 닫기 · MOCK 응답은 Mission을 완료하지 않습니다.</small>
        </form>
      </section>
    </div>
  );
}

type ActiveIxChatPanelProps = {
  onClose: () => void;
};

function ActiveIxChatPanel({ onClose }: ActiveIxChatPanelProps) {
  const [draft, setDraft] = useState("");
  const [state, setState] = useState<IxChatViewState>(IX_CHAT_INITIAL_STATE);
  const requestControllerRef = useRef<AbortController | null>(null);

  useEffect(
    () => () => {
      requestControllerRef.current?.abort();
    },
    [],
  );

  const submitQuestion = async (rawQuestion: string) => {
    const question = rawQuestion.trim();

    if (!question) {
      return;
    }

    requestControllerRef.current?.abort();
    const requestController = new AbortController();
    requestControllerRef.current = requestController;
    setState({ question, status: "loading" });

    try {
      const response = await requestIxMockResponse(question, {
        signal: requestController.signal,
      });

      if (requestController.signal.aborted) {
        return;
      }

      setState({ answer: response.answer, question, status: "success" });
      setDraft("");
    } catch {
      if (requestController.signal.aborted) {
        return;
      }

      setState({
        errorMessage: "Mock 응답을 준비하지 못했습니다. 잠시 후 다시 시도해 주세요.",
        question,
        status: "error",
      });
    }
  };

  const handleRetry = () => {
    if (state.status === "error") {
      void submitQuestion(state.question);
    }
  };

  const handleClose = () => {
    requestControllerRef.current?.abort();
    onClose();
  };

  return (
    <IxChatPanelContent
      draft={draft}
      onClose={handleClose}
      onDraftChange={setDraft}
      onRetry={handleRetry}
      onSubmitQuestion={(question) => void submitQuestion(question)}
      state={state}
    />
  );
}

export function IxChatPanel() {
  const activeTargetId = useWorldStore((state) => state.activeInteractionTargetId);
  const closeInteraction = useWorldStore((state) => state.closeInteraction);

  if (activeTargetId !== IX_NPC_TARGET_ID) {
    return null;
  }

  return <ActiveIxChatPanel onClose={closeInteraction} />;
}
