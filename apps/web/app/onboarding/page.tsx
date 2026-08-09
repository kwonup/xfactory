import Link from "next/link";

import { CurrentZoneIndicator } from "@/components/onboarding/current-zone-indicator";
import { InformationModal } from "@/components/onboarding/information-modal";
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
          MISSION STATE / ACTIVE
        </div>
      </header>

      <section className="scene-intro" aria-labelledby="scene-title">
        <p>ONBOARDING / MISSIONS</p>
        <h1 id="scene-title">OUTDOOR FACTORY</h1>
        <span>상호작용 확인 이벤트가 미션 진행 상태로 기록됩니다</span>
      </section>

      <CurrentZoneIndicator />
      <InteractionPrompt />
      <InformationModal />

      <aside className="scene-telemetry" aria-label="3D Scene 구성 정보">
        <dl>
          <div>
            <dt>MISSIONS</dt>
            <dd>4 CONFIGURED</dd>
          </div>
          <div>
            <dt>EVENTS</dt>
            <dd>MAPPED</dd>
          </div>
          <div>
            <dt>PROGRESS</dt>
            <dd>ZUSTAND</dd>
          </div>
        </dl>
      </aside>

      <p className="scene-foundation-note">
        MISSION LOGIC
        <span>ACTIVE</span>
      </p>
    </main>
  );
}
