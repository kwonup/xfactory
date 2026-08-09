import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import { InformationModalContent } from "@/components/onboarding/information-modal";
import {
  createInformationInteractionEvent,
  INFORMATION_CONTENT_BY_TARGET,
  INFORMATION_TARGET_IDS,
} from "@/features/interaction/information-content";

describe("information content", () => {
  it("covers every current mission target and labels unverified content", () => {
    for (const targetId of INFORMATION_TARGET_IDS) {
      const content = INFORMATION_CONTENT_BY_TARGET[targetId];

      expect(content.status).toBe("[DEMO DATA]");
      expect(content.sourceLabel).toContain("사용자 제공");
      expect(content.description).toContain("INTERX");
      expect(content.highlights).toHaveLength(2);
    }
  });

  it("creates a typed Mission connection event for each confirmation", () => {
    expect(createInformationInteractionEvent("company-vision-display")).toEqual({
      missionEventId: "vision-display-reviewed",
      targetId: "company-vision-display",
      type: "information-interaction-confirmed",
    });
    expect(createInformationInteractionEvent("smart-factory-console").missionEventId).toBe(
      "smart-factory-reviewed",
    );
    expect(createInformationInteractionEvent("ai-sdm-monitor").missionEventId).toBe(
      "ai-sdm-reviewed",
    );
  });
});

describe("information modal", () => {
  it("renders an accessible dialog with source status and controls", () => {
    const markup = renderToStaticMarkup(
      createElement(InformationModalContent, {
        content: INFORMATION_CONTENT_BY_TARGET["ai-sdm-monitor"],
        onClose: vi.fn(),
        onConfirm: vi.fn(),
      }),
    );

    expect(markup).toContain('role="dialog"');
    expect(markup).toContain('aria-modal="true"');
    expect(markup).toContain("[DEMO DATA]");
    expect(markup).toContain("Data → AI → Factory → Optimization");
    expect(markup).toContain("정보 창 닫기");
    expect(markup).toContain(">확인</button>");
  });
});
