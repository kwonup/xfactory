import Link from "next/link";

import { CoreValueQuestModal } from "@/components/onboarding/core-value-quest-modal";
import { CurrentZoneIndicator } from "@/components/onboarding/current-zone-indicator";
import { InformationModal } from "@/components/onboarding/information-modal";
import { InteractionPrompt } from "@/components/onboarding/interaction-prompt";
import { IxChatPanel } from "@/components/onboarding/ix-chat-panel";
import { MissionHud } from "@/components/onboarding/mission-hud";
import { ValuePassport } from "@/components/onboarding/value-passport";
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
          MISSION HUD / ACTIVE
        </div>
      </header>

      <section className="scene-intro" aria-labelledby="scene-title">
        <p>ONBOARDING / MISSIONS</p>
        <h1 id="scene-title">OUTDOOR FACTORY</h1>
        <span>상호작용 확인 이벤트가 미션 진행 상태로 기록됩니다</span>
      </section>

      <CurrentZoneIndicator />
      <MissionHud />
      <ValuePassport />
      <InteractionPrompt />
      <InformationModal />
      <CoreValueQuestModal />
      <IxChatPanel />

      <aside className="scene-telemetry" aria-label="조작 안내">
        <dl>
          <div>
            <dt>MOVE</dt>
            <dd>ARROW KEYS</dd>
          </div>
          <div>
            <dt>INTERACT</dt>
            <dd>E KEY</dd>
          </div>
          <div>
            <dt>CLOSE</dt>
            <dd>ESC</dd>
          </div>
        </dl>
      </aside>

      <p className="scene-foundation-note">
        LIVE MISSION PROGRESS
        <span>ACTIVE</span>
      </p>
    </main>
  );
}
