import Link from "next/link";

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
          OUTDOOR FOUNDATION / ACTIVE
        </div>
      </header>

      <section className="scene-intro" aria-labelledby="scene-title">
        <p>SMART FACTORY / FOUNDATION</p>
        <h1 id="scene-title">OUTDOOR FACTORY</h1>
        <span>밝은 야외 공장 기반 조성 완료</span>
      </section>

      <aside className="scene-telemetry" aria-label="3D Scene 구성 정보">
        <dl>
          <div>
            <dt>CAMERA</dt>
            <dd>OVERVIEW</dd>
          </div>
          <div>
            <dt>LIGHT</dt>
            <dd>DAYLIGHT</dd>
          </div>
          <div>
            <dt>WORLD</dt>
            <dd>COMPACT</dd>
          </div>
        </dl>
      </aside>

      <p className="scene-foundation-note">
        BRIGHT LOW-POLY TERRAIN
        <span>ACTIVE</span>
      </p>
    </main>
  );
}
