import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import OnboardingPage from "../app/onboarding/page";
import HomePage from "../app/page";

describe("HomePage", () => {
  it("renders the immersive project identity and factory entry link", () => {
    const markup = renderToStaticMarkup(<HomePage />);

    expect(markup).toContain("X-FACTORY");
    expect(markup).toContain("X-FACTOR");
    expect(markup).toContain("INTERX FACTORY");
    expect(markup).toContain("AI와 제조가 만나는 공간");
    expect(markup).toContain("ENTER FACTORY");
    expect(markup).toContain('href="/onboarding"');
  });
});

describe("OnboardingPage", () => {
  it("renders the 3D scene shell and loading fallback", () => {
    const markup = renderToStaticMarkup(<OnboardingPage />);

    expect(markup).toContain("OUTDOOR FACTORY");
    expect(markup).toContain("OUTDOOR FOUNDATION / ACTIVE");
    expect(markup).toContain("INITIALIZING 3D SCENE");
    expect(markup).toContain("CAMERA");
    expect(markup).toContain("WORLD");
    expect(markup).toContain('href="/"');
  });
});
