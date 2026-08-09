"use client";

import { useState } from "react";

import { CORE_VALUE_SCENARIO_BY_VALUE_ID } from "@/features/core-values/core-value-scenarios";
import { getCoreValueStationProgress } from "@/features/core-values/core-value-progress";
import {
  CORE_VALUE_CLUSTER_BY_ID,
  CORE_VALUE_BY_ID,
  type CoreValueId,
} from "@/features/core-values/core-values";
import {
  CORE_VALUE_STATION_BY_ID,
  isCoreValueStationId,
  type CoreValueStation,
} from "@/features/core-values/value-stations";
import { useCoreValueStore } from "@/stores/core-value-store";
import { useWorldStore } from "@/stores/world-store";

type CoreValueQuestModalContentProps = {
  experiencedValueIds: readonly CoreValueId[];
  onClose: () => void;
  onContinue: (valueId: CoreValueId) => void;
  onSelectChoice: (choiceId: string) => void;
  selectedChoiceId: string | null;
  station: CoreValueStation;
};

export function CoreValueQuestModalContent({
  experiencedValueIds,
  onClose,
  onContinue,
  onSelectChoice,
  selectedChoiceId,
  station,
}: CoreValueQuestModalContentProps) {
  const cluster = CORE_VALUE_CLUSTER_BY_ID[station.clusterId];
  const stationProgress = getCoreValueStationProgress(station, experiencedValueIds);
  const currentValueId = stationProgress.nextValueId;

  if (!currentValueId) {
    return (
      <div className="core-value-quest-backdrop">
        <section
          className="core-value-quest-modal core-value-station-complete"
          role="dialog"
          aria-labelledby="core-value-station-complete-title"
          aria-modal="true"
        >
          <span className="core-value-demo-label">[DEMO DATA]</span>
          <p>STATION {String(station.order).padStart(2, "0")} COMPLETE</p>
          <h2 id="core-value-station-complete-title">{cluster.title}</h2>
          <strong>3가지 Core Value 경험을 Passport에 기록했습니다.</strong>
          <p>
            이 기록은 학습 경험 여부만 나타내며 직원의 성향, 점수 또는 적합도를 판단하지
            않습니다.
          </p>
          <button type="button" onClick={onClose} autoFocus>
            Park로 돌아가기
          </button>
        </section>
      </div>
    );
  }

  const value = CORE_VALUE_BY_ID[currentValueId];
  const scenario = CORE_VALUE_SCENARIO_BY_VALUE_ID[currentValueId];
  const selectedChoice =
    scenario.choices.find((choice) => choice.id === selectedChoiceId) ?? null;
  const valuePosition = cluster.valueIds.indexOf(currentValueId) + 1;

  return (
    <div className="core-value-quest-backdrop">
      <section
        className="core-value-quest-modal"
        role="dialog"
        aria-labelledby="core-value-quest-title"
        aria-describedby="core-value-quest-situation"
        aria-modal="true"
      >
        <header className="core-value-quest-header">
          <div>
            <span className="core-value-demo-label">{scenario.contentStatus}</span>
            <p>
              STATION {String(station.order).padStart(2, "0")} · VALUE {valuePosition} / 3
            </p>
            <h2 id="core-value-quest-title">{value.name}</h2>
          </div>
          <button
            className="core-value-quest-close"
            type="button"
            onClick={onClose}
            aria-label="Core Value Quest 닫기"
            autoFocus
          >
            ×
          </button>
        </header>

        <div className="core-value-official-copy">
          <span>USER-PROVIDED OFFICIAL VALUE</span>
          <p>{value.officialDescription}</p>
        </div>

        <div className="core-value-scenario-copy">
          <span>MICRO QUEST · {scenario.title}</span>
          <p id="core-value-quest-situation">{scenario.situation}</p>
        </div>

        <div className="core-value-choice-list" role="group" aria-label="행동 선택지">
          {scenario.choices.map((choice, index) => (
            <button
              key={choice.id}
              type="button"
              className={choice.id === selectedChoiceId ? "is-selected" : undefined}
              aria-pressed={choice.id === selectedChoiceId}
              onClick={() => onSelectChoice(choice.id)}
            >
              <span>{String.fromCharCode(65 + index)}</span>
              {choice.label}
            </button>
          ))}
        </div>

        <div className="core-value-feedback-slot" aria-live="polite">
          {selectedChoice ? (
            <section className="core-value-feedback" role="status">
              <span>
                {selectedChoice.recommended ? "핵심가치와 직접 연결" : "선택 돌아보기"}
              </span>
              <p>{selectedChoice.feedback}</p>
              <strong>{scenario.takeaway}</strong>
            </section>
          ) : (
            <p>업무 상황에서 취할 행동을 선택하면 가치와의 연결을 설명해 드립니다.</p>
          )}
        </div>

        <footer className="core-value-quest-footer">
          <p>REFLECTION, NOT ASSESSMENT · 선택은 평가나 점수로 사용되지 않습니다.</p>
          {selectedChoice ? (
            <button type="button" onClick={() => onContinue(currentValueId)}>
              경험 기록하고 {valuePosition === 3 ? "Station 완료" : "다음 가치 보기"}
            </button>
          ) : null}
        </footer>
      </section>
    </div>
  );
}

type ActiveCoreValueQuestProps = {
  onClose: () => void;
  station: CoreValueStation;
};

function ActiveCoreValueQuest({ onClose, station }: ActiveCoreValueQuestProps) {
  const completeValueExperience = useCoreValueStore(
    (state) => state.completeValueExperience,
  );
  const experiencedValueIds = useCoreValueStore((state) => state.experiencedValueIds);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);

  const handleContinue = (valueId: CoreValueId) => {
    completeValueExperience(valueId);
    setSelectedChoiceId(null);
  };

  return (
    <CoreValueQuestModalContent
      experiencedValueIds={experiencedValueIds}
      onClose={onClose}
      onContinue={handleContinue}
      onSelectChoice={setSelectedChoiceId}
      selectedChoiceId={selectedChoiceId}
      station={station}
    />
  );
}

export function CoreValueQuestModal() {
  const activeTargetId = useWorldStore((state) => state.activeInteractionTargetId);
  const closeInteraction = useWorldStore((state) => state.closeInteraction);

  if (!activeTargetId || !isCoreValueStationId(activeTargetId)) {
    return null;
  }

  return (
    <ActiveCoreValueQuest
      key={activeTargetId}
      onClose={closeInteraction}
      station={CORE_VALUE_STATION_BY_ID[activeTargetId]}
    />
  );
}
