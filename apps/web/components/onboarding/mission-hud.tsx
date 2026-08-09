"use client";

import {
  MISSIONS,
  MISSION_BY_ID,
  getCurrentMissionId,
  getMissionProgress,
  getMissionStatus,
  type MissionId,
  type MissionStatus,
} from "@/features/mission/missions";
import { useMissionStore } from "@/stores/mission-store";

type MissionHudContentProps = {
  completedMissionIds: readonly MissionId[];
};

const MISSION_STATUS_LABEL: Record<MissionStatus, string> = {
  completed: "완료",
  current: "진행 중",
  pending: "대기",
};

const MISSION_STATUS_SYMBOL: Record<MissionStatus, string> = {
  completed: "✓",
  current: "→",
  pending: "○",
};

export function MissionHudContent({ completedMissionIds }: MissionHudContentProps) {
  const currentMissionId = getCurrentMissionId(completedMissionIds);
  const currentMission = currentMissionId ? MISSION_BY_ID[currentMissionId] : null;
  const progress = getMissionProgress(completedMissionIds);

  return (
    <aside className="mission-hud" aria-labelledby="mission-hud-title">
      <header className="mission-hud-header">
        <div>
          <span>ONBOARDING</span>
          <h2 id="mission-hud-title">MISSION STATUS</h2>
        </div>
        <strong>
          {progress.completedCount} / {progress.totalCount}
        </strong>
      </header>

      <div className="mission-current-objective">
        <span>CURRENT OBJECTIVE</span>
        <strong>{currentMission?.title ?? "All missions complete"}</strong>
        <p>{currentMission?.objective ?? "모든 Mission 목표를 완료했습니다."}</p>
      </div>

      <ol className="mission-list">
        {MISSIONS.map((mission) => {
          const status = getMissionStatus(mission.id, currentMissionId, completedMissionIds);

          return (
            <li
              key={mission.id}
              className="mission-list-item"
              data-state={status}
              aria-current={status === "current" ? "step" : undefined}
            >
              <span className="mission-list-symbol" aria-hidden="true">
                {MISSION_STATUS_SYMBOL[status]}
              </span>
              <div>
                <span>MISSION {String(mission.order).padStart(2, "0")}</span>
                <strong>{mission.title}</strong>
              </div>
              <small>{MISSION_STATUS_LABEL[status]}</small>
            </li>
          );
        })}
      </ol>

      <footer className="mission-progress">
        <div>
          <span>PROGRESS</span>
          <strong>{progress.percentage}%</strong>
        </div>
        <div
          className="mission-progress-track"
          role="progressbar"
          aria-label="온보딩 Mission 진행률"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress.percentage}
        >
          <span style={{ width: `${progress.percentage}%` }} />
        </div>
      </footer>
    </aside>
  );
}

export function MissionHud() {
  const completedMissionIds = useMissionStore((state) => state.completedMissionIds);

  return <MissionHudContent completedMissionIds={completedMissionIds} />;
}
