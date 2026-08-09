"use client";

import {
  createInformationInteractionEvent,
  INFORMATION_CONTENT_BY_TARGET,
  type InformationContent,
  type InformationInteractionEvent,
  isInformationTargetId,
} from "@/features/interaction/information-content";
import { useMissionStore } from "@/stores/mission-store";
import { useWorldStore } from "@/stores/world-store";

type InformationModalContentProps = {
  content: InformationContent;
  onClose: () => void;
  onConfirm: () => void;
};

type InformationModalProps = {
  onMissionEvent?: (event: InformationInteractionEvent) => void;
};

export function InformationModalContent({
  content,
  onClose,
  onConfirm,
}: InformationModalContentProps) {
  return (
    <div className="information-modal-backdrop">
      <section
        className="information-modal"
        role="dialog"
        aria-labelledby="information-modal-title"
        aria-describedby="information-modal-description"
        aria-modal="true"
      >
        <header className="information-modal-header">
          <div>
            <span className="information-modal-status">{content.status}</span>
            <p>{content.subtitle}</p>
            <h2 id="information-modal-title">{content.title}</h2>
          </div>
          <button
            className="information-modal-close"
            type="button"
            onClick={onClose}
            aria-label="정보 창 닫기"
            autoFocus
          >
            ×
          </button>
        </header>

        <p id="information-modal-description" className="information-modal-description">
          {content.description}
        </p>

        <ul className="information-modal-highlights">
          {content.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>

        <footer className="information-modal-footer">
          <p>{content.sourceLabel}</p>
          <button type="button" onClick={onConfirm}>
            확인
          </button>
        </footer>
      </section>
    </div>
  );
}

export function InformationModal({ onMissionEvent }: InformationModalProps) {
  const activeTargetId = useWorldStore((state) => state.activeInteractionTargetId);
  const closeInteraction = useWorldStore((state) => state.closeInteraction);
  const completeMissionByEvent = useMissionStore((state) => state.completeMissionByEvent);
  const content =
    activeTargetId && isInformationTargetId(activeTargetId)
      ? INFORMATION_CONTENT_BY_TARGET[activeTargetId]
      : null;

  if (!activeTargetId || !isInformationTargetId(activeTargetId) || !content) {
    return null;
  }

  const handleConfirm = () => {
    const event = createInformationInteractionEvent(activeTargetId);

    completeMissionByEvent(event.missionEventId);
    onMissionEvent?.(event);
    closeInteraction();
  };

  return (
    <InformationModalContent
      content={content}
      onClose={closeInteraction}
      onConfirm={handleConfirm}
    />
  );
}
