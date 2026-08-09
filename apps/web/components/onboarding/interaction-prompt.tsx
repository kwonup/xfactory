"use client";

import { useEffect } from "react";

import { getInteractionKeyboardAction } from "@/features/interaction/interaction-controls";
import {
  INTERACTION_TARGET_BY_ID,
  type InteractionTarget,
} from "@/features/interaction/interaction-targets";
import { useWorldStore } from "@/stores/world-store";

type InteractionPromptContentProps = {
  active: boolean;
  target: InteractionTarget | null;
};

export function InteractionPromptContent({ active, target }: InteractionPromptContentProps) {
  return (
    <div className="interaction-prompt-slot" aria-live="polite">
      {target ? (
        <div className={`interaction-prompt${active ? " is-active" : ""}`} role="status">
          {active ? (
            <>
              <span>INTERACTION READY</span>
              <strong>{target.title}</strong>
              <small>
                <kbd>ESC</kbd>
                닫기
              </small>
            </>
          ) : (
            <>
              <kbd>E</kbd>
              <span>{target.prompt}</span>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}

export function InteractionPrompt() {
  const activeTargetId = useWorldStore((state) => state.activeInteractionTargetId);
  const targetId = useWorldStore((state) => state.interactionTargetId);
  const visibleTargetId = activeTargetId ?? targetId;
  const target = visibleTargetId ? INTERACTION_TARGET_BY_ID[visibleTargetId] : null;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const action = getInteractionKeyboardAction(event);

      if (!action) {
        return;
      }

      const state = useWorldStore.getState();

      if (action === "close" && state.activeInteractionTargetId) {
        event.preventDefault();
        state.closeInteraction();
        return;
      }

      if (action === "activate" && state.interactionTargetId && !state.activeInteractionTargetId) {
        event.preventDefault();
        state.activateInteractionTarget();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return <InteractionPromptContent active={Boolean(activeTargetId)} target={target} />;
}
