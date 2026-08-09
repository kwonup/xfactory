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
          FOLLOW CAMERA / ACTIVE
        </div>
      </header>

      <section className="scene-intro" aria-labelledby="scene-title">
        <p>ONBOARDING / CAMERA RIG</p>
        <h1 id="scene-title">OUTDOOR FACTORY</h1>
        <span>카메라가 플레이어를 부드럽게 따라갑니다</span>
      </section>

      <aside className="scene-telemetry" aria-label="3D Scene 구성 정보">
        <dl>
          <div>
            <dt>PLAYER</dt>
            <dd>TRACKED</dd>
          </div>
          <div>
            <dt>HEIGHT</dt>
            <dd>ELEVATED</dd>
          </div>
          <div>
            <dt>CAMERA</dt>
            <dd>ROTATION LOCKED</dd>
          </div>
        </dl>
      </aside>

      <p className="scene-foundation-note">
        THIRD PERSON CAMERA
        <span>ACTIVE</span>
      </p>
    </main>
  );
}
