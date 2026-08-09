import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import OnboardingPage from "../app/onboarding/page";
import HomePage from "../app/page";

describe("HomePage", () => {
  it("renders the immersive project identity and factory entry link", () => {
    const markup = renderToStaticMarkup(<HomePage />);

    expect(markup).toContain("INTERX WORLD");
    expect(markup).toContain("AI와 제조가 만나는 공간");
    expect(markup).toContain("ENTER FACTORY");
    expect(markup).toContain('href="/onboarding"');
  });
});

describe("OnboardingPage", () => {
  it("renders the connected gateway placeholder", () => {
    const markup = renderToStaticMarkup(<OnboardingPage />);

    expect(markup).toContain("FACTORY GATEWAY CONNECTED");
    expect(markup).toContain("3D 공장 경험은 다음 단계에서 연결됩니다.");
    expect(markup).toContain('href="/"');
  });
});
