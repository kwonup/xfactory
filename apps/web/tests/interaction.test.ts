import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it } from "vitest";

import { InteractionPromptContent } from "@/components/onboarding/interaction-prompt";
import { getInteractionKeyboardAction } from "@/features/interaction/interaction-controls";
import {
  INTERACTION_TARGETS,
  findNearestInteractionTarget,
  isWithinInteractionRange,
  type InteractionTarget,
} from "@/features/interaction/interaction-targets";
import { isPositionBlocked } from "@/features/player/player-collision";
import { useWorldStore } from "@/stores/world-store";

afterEach(() => {
  useWorldStore.getState().resetInteraction();
});

describe("interaction targets", () => {
  it("defines unique mission targets with an unobstructed approach point", () => {
    const ids = INTERACTION_TARGETS.map((target) => target.id);

    expect(INTERACTION_TARGETS).toHaveLength(3);
    expect(new Set(ids).size).toBe(ids.length);

    for (const target of INTERACTION_TARGETS) {
      const approachPosition = {
        x: target.position[0],
        z: target.position[2] + target.radius * 0.85,
      };

      expect(target.type).toBe("mission");
      expect(target.radius).toBeGreaterThan(0);
      expect(target.prompt.length).toBeGreaterThan(0);
      expect(isWithinInteractionRange(approachPosition, target)).toBe(true);
      expect(isPositionBlocked(approachPosition)).toBe(false);
    }
  });

  it("includes the interaction radius boundary and rejects distant positions", () => {
    const target = INTERACTION_TARGETS[0];
    const boundaryPosition = {
      x: target.position[0] + target.radius,
      z: target.position[2],
    };

    expect(isWithinInteractionRange(boundaryPosition, target)).toBe(true);
    expect(findNearestInteractionTarget({ x: 14, z: 12 })).toBeNull();
  });

  it("selects the closest target when ranges overlap", () => {
    const targets: InteractionTarget[] = [
      {
        id: "company-vision-display",
        position: [0, 0, 0],
        prompt: "A",
        radius: 3,
        title: "A",
        type: "mission",
      },
      {
        id: "smart-factory-console",
        position: [1, 0, 0],
        prompt: "B",
        radius: 3,
        title: "B",
        type: "mission",
      },
    ];

    expect(findNearestInteractionTarget({ x: 0.8, z: 0 }, targets)?.id).toBe(
      "smart-factory-console",
    );
  });
});

describe("interaction keyboard controls", () => {
  const ordinaryTarget = { tagName: "DIV" } as unknown as EventTarget;
  const inputTarget = { tagName: "INPUT" } as unknown as EventTarget;

  it("maps E to activation and ignores repeated or editable input", () => {
    expect(getInteractionKeyboardAction({ code: "KeyE", key: "e", target: ordinaryTarget })).toBe(
      "activate",
    );
    expect(
      getInteractionKeyboardAction({ code: "KeyE", key: "e", repeat: true, target: ordinaryTarget }),
    ).toBeNull();
    expect(getInteractionKeyboardAction({ code: "KeyE", key: "e", target: inputTarget })).toBeNull();
  });

  it("allows Escape to close while a form field is focused", () => {
    expect(getInteractionKeyboardAction({ key: "Escape", target: inputTarget })).toBe("close");
  });
});

describe("interaction store", () => {
  it("activates only the current nearby target and closes with a shared action", () => {
    const store = useWorldStore.getState();

    store.activateInteractionTarget();
    expect(useWorldStore.getState().activeInteractionTargetId).toBeNull();

    store.setInteractionTarget("ai-sdm-monitor");
    useWorldStore.getState().activateInteractionTarget();

    expect(useWorldStore.getState().activeInteractionTargetId).toBe("ai-sdm-monitor");

    useWorldStore.getState().closeInteraction();
    expect(useWorldStore.getState().activeInteractionTargetId).toBeNull();
  });
});

describe("interaction prompt", () => {
  it("shows the nearby action and switches to the ESC close state", () => {
    const target = INTERACTION_TARGETS[0];

    const nearbyMarkup = renderToStaticMarkup(
      createElement(InteractionPromptContent, { active: false, target }),
    );

    expect(nearbyMarkup).toContain("Vision Display 알아보기");
    expect(nearbyMarkup).toContain("<kbd>E</kbd>");

    const activeMarkup = renderToStaticMarkup(
      createElement(InteractionPromptContent, { active: true, target }),
    );

    expect(activeMarkup).toContain("INTERACTION READY");
    expect(activeMarkup).toContain("Company Vision Display");
    expect(activeMarkup).toContain("<kbd>ESC</kbd>");
  });
});
