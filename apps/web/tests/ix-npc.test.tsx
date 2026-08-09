import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it } from "vitest";

import { IxNameplateContent } from "@/components/three/ix-npc";
import { resolveIxAnimation } from "@/features/ix/ix-animation";
import {
  IX_NPC_INTERACTION_POSITION,
  IX_NPC_INTERACTION_RADIUS,
  IX_NPC_TARGET_ID,
} from "@/features/ix/ix-config";
import { INTERACTION_TARGET_BY_ID } from "@/features/interaction/interaction-targets";
import { isPositionBlocked } from "@/features/player/player-collision";
import { useWorldStore } from "@/stores/world-store";

afterEach(() => {
  useWorldStore.getState().resetInteraction();
});

describe("IX animation fallback", () => {
  it("uses Idle for missing and unsupported animation requests", () => {
    expect(resolveIxAnimation()).toBe("idle");
    expect(resolveIxAnimation(null)).toBe("idle");
    expect(resolveIxAnimation("idle")).toBe("idle");
    expect(resolveIxAnimation("wave")).toBe("idle");
  });
});

describe("IX conversation proximity", () => {
  it("defines a reachable NPC target around IX", () => {
    const target = INTERACTION_TARGET_BY_ID[IX_NPC_TARGET_ID];
    const approachPosition = {
      x: target.position[0],
      z: target.position[2] + target.radius * 0.85,
    };

    expect(target.type).toBe("npc");
    expect(target.position).toBe(IX_NPC_INTERACTION_POSITION);
    expect(target.radius).toBe(IX_NPC_INTERACTION_RADIUS);
    expect(target.prompt).toBe("IX와 대화하기");
    expect(isPositionBlocked(approachPosition)).toBe(false);
  });

  it("enters and closes the IX interaction through the shared Store", () => {
    const store = useWorldStore.getState();

    store.setInteractionTarget(IX_NPC_TARGET_ID);
    useWorldStore.getState().activateInteractionTarget();

    expect(useWorldStore.getState().activeInteractionTargetId).toBe(IX_NPC_TARGET_ID);

    useWorldStore.getState().closeInteraction();
    expect(useWorldStore.getState().activeInteractionTargetId).toBeNull();
  });
});

describe("IX nameplate", () => {
  it("shows the AI Buddy identity and proximity instruction", () => {
    const markup = renderToStaticMarkup(
      createElement(IxNameplateContent, { isConversationReady: false }),
    );

    expect(markup).toContain('role="status"');
    expect(markup).toContain("IX");
    expect(markup).toContain("AI ONBOARDING BUDDY");
    expect(markup).toContain("가까이 다가가 E로 대화하기");
    expect(markup).toContain('data-state="idle"');
  });

  it("announces the ready state and ESC close control", () => {
    const markup = renderToStaticMarkup(
      createElement(IxNameplateContent, { isConversationReady: true }),
    );

    expect(markup).toContain("대화 채널 준비");
    expect(markup).toContain("ESC로 닫기");
    expect(markup).toContain('data-state="conversation-ready"');
  });
});
