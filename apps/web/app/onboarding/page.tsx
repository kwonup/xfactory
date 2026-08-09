import Link from "next/link";

import { CurrentZoneIndicator } from "@/components/onboarding/current-zone-indicator";
import { OnboardingExperience } from "@/components/three/onboarding-experience";

export default function OnboardingPage() {
  return (
    <main className="onboarding-page">
      <OnboardingExperience />

      <header className="scene-header">
        <Link className="scene-brand" href="/" aria-label="X-FACTORY 시작 화면으로 이동">
          <span className="scene-brand-mark" aria-hidden="true">
            IX
          </span>
          <span>X-FACTORY</span>
        </Link>

        <div className="scene-stage">
          <span className="status-dot" aria-hidden="true" />
          WORLD COLLISION / ACTIVE
        </div>
      </header>

      <section className="scene-intro" aria-labelledby="scene-title">
        <p>ONBOARDING / COLLISION</p>
        <h1 id="scene-title">OUTDOOR FACTORY</h1>
        <span>공장 경계와 주요 구조물을 따라 안전하게 탐색해보세요</span>
      </section>

      <CurrentZoneIndicator />

      <aside className="scene-telemetry" aria-label="3D Scene 구성 정보">
        <dl>
          <div>
            <dt>BOUNDARY</dt>
            <dd>LOCKED</dd>
          </div>
          <div>
            <dt>BUILDINGS</dt>
            <dd>SOLID</dd>
          </div>
          <div>
            <dt>PHYSICS</dt>
            <dd>LIGHTWEIGHT</dd>
          </div>
        </dl>
      </aside>

      <p className="scene-foundation-note">
        AABB COLLIDERS
        <span>ACTIVE</span>
      </p>
    </main>
  );
}
