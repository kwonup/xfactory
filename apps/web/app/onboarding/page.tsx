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
          FACTORY ZONES / ACTIVE
        </div>
      </header>

      <section className="scene-intro" aria-labelledby="scene-title">
        <p>ONBOARDING / FACTORY ZONES</p>
        <h1 id="scene-title">OUTDOOR FACTORY</h1>
        <span>여섯 개의 온보딩 공간을 탐색해보세요</span>
      </section>

      <CurrentZoneIndicator />

      <aside className="scene-telemetry" aria-label="3D Scene 구성 정보">
        <dl>
          <div>
            <dt>ZONES</dt>
            <dd>6 ACTIVE</dd>
          </div>
          <div>
            <dt>STATE</dt>
            <dd>POSITION AWARE</dd>
          </div>
          <div>
            <dt>MOVE</dt>
            <dd>ARROW KEYS</dd>
          </div>
        </dl>
      </aside>

      <p className="scene-foundation-note">
        COMPACT FACTORY WORLD
        <span>ACTIVE</span>
      </p>
    </main>
  );
}
