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
          PLAYER MOVEMENT / ACTIVE
        </div>
      </header>

      <section className="scene-intro" aria-labelledby="scene-title">
        <p>ONBOARDING / PLAYER CONTROL</p>
        <h1 id="scene-title">OUTDOOR FACTORY</h1>
        <span>방향키로 플레이어를 움직여보세요</span>
      </section>

      <aside className="scene-telemetry" aria-label="3D Scene 구성 정보">
        <dl>
          <div>
            <dt>PLAYER</dt>
            <dd>IDLE / WALK</dd>
          </div>
          <div>
            <dt>MOVE</dt>
            <dd>ARROW KEYS</dd>
          </div>
          <div>
            <dt>CAMERA</dt>
            <dd>STATIC</dd>
          </div>
        </dl>
      </aside>

      <p className="scene-foundation-note">
        KEYBOARD CONTROL
        <span>ACTIVE</span>
      </p>
    </main>
  );
}
