import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import HomePage from "../app/page";

describe("HomePage", () => {
  it("renders the project identity", () => {
    const markup = renderToStaticMarkup(<HomePage />);

    expect(markup).toContain("INTERX WORLD");
    expect(markup).toContain("프로젝트 실행 환경이 준비되었습니다.");
  });
});
