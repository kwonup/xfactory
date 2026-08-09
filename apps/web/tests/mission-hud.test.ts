import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { MissionHudContent } from "@/components/onboarding/mission-hud";

describe("mission HUD", () => {
  it("renders the initial current and pending Mission states", () => {
    const markup = renderToStaticMarkup(
      createElement(MissionHudContent, { completedMissionIds: [] }),
    );

    expect(markup).toContain("MISSION STATUS");
    expect(markup).toContain("Discover INTERX");
    expect(markup).toContain('data-state="current"');
    expect(markup).toContain('aria-current="step"');
    expect(markup.match(/data-state="pending"/g)).toHaveLength(3);
    expect(markup).toContain('aria-valuenow="0"');
    expect(markup).toContain("0%");
  });

  it("renders completed, current and pending states with derived progress", () => {
    const markup = renderToStaticMarkup(
      createElement(MissionHudContent, {
        completedMissionIds: ["discover-interx", "understand-ai-sdm"],
      }),
    );

    expect(markup.match(/data-state="completed"/g)).toHaveLength(2);
    expect(markup).toContain("Explore Smart Factory");
    expect(markup).toContain('aria-valuenow="50"');
    expect(markup).toContain("2 / 4");
    expect(markup).toContain("50%");
  });

  it("renders the fully completed state at 100 percent", () => {
    const markup = renderToStaticMarkup(
      createElement(MissionHudContent, {
        completedMissionIds: [
          "discover-interx",
          "explore-smart-factory",
          "understand-ai-sdm",
          "meet-ix",
        ],
      }),
    );

    expect(markup).toContain("All missions complete");
    expect(markup.match(/data-state="completed"/g)).toHaveLength(4);
    expect(markup).toContain('aria-valuenow="100"');
    expect(markup).toContain("100%");
  });
});
