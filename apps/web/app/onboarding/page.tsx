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
          SCENE FOUNDATION / ACTIVE
        </div>
      </header>

      <section className="scene-intro" aria-labelledby="scene-title">
        <p>ONBOARDING SPACE / 01</p>
        <h1 id="scene-title">FACTORY ACCESS</h1>
        <span>3D 환경 초기화 완료</span>
      </section>

      <aside className="scene-telemetry" aria-label="3D Scene 구성 정보">
        <dl>
          <div>
            <dt>CAMERA</dt>
            <dd>PERSPECTIVE</dd>
          </div>
          <div>
            <dt>LIGHT</dt>
            <dd>3 SOURCES</dd>
          </div>
          <div>
            <dt>GROUND</dt>
            <dd>32 × 32</dd>
          </div>
        </dl>
      </aside>

      <p className="scene-foundation-note">
        FACTORY ENVIRONMENT
        <span>NEXT PHASE</span>
      </p>
    </main>
  );
}
