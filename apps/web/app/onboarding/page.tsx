import Link from "next/link";

import { CurrentZoneIndicator } from "@/components/onboarding/current-zone-indicator";
import { InteractionPrompt } from "@/components/onboarding/interaction-prompt";
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
          INTERACTION SYSTEM / ACTIVE
        </div>
      </header>

      <section className="scene-intro" aria-labelledby="scene-title">
        <p>ONBOARDING / INTERACTION</p>
        <h1 id="scene-title">OUTDOOR FACTORY</h1>
        <span>가까운 안내 설비에서 E 키로 상호작용하세요</span>
      </section>

      <CurrentZoneIndicator />
      <InteractionPrompt />

      <aside className="scene-telemetry" aria-label="3D Scene 구성 정보">
        <dl>
          <div>
            <dt>TARGET</dt>
            <dd>NEAREST</dd>
          </div>
          <div>
            <dt>ACTION</dt>
            <dd>E KEY</dd>
          </div>
          <div>
            <dt>CLOSE</dt>
            <dd>ESC</dd>
          </div>
        </dl>
      </aside>

      <p className="scene-foundation-note">
        PROXIMITY TRACKER
        <span>ACTIVE</span>
      </p>
    </main>
  );
}
