"use client";

import {
  CORE_VALUE_SCENARIO_BY_VALUE_ID,
} from "@/features/core-values/core-value-scenarios";
import {
  getCoreValueProgress,
  isCoreValueExperienced,
  isCoreValueQuestComplete,
} from "@/features/core-values/core-value-progress";
import {
  CORE_VALUE_CLUSTERS,
  CORE_VALUES,
  CORE_VALUE_BY_ID,
  type CoreValueId,
} from "@/features/core-values/core-values";
import { useCoreValueStore } from "@/stores/core-value-store";

type ValuePassportContentProps = {
  experiencedValueIds: readonly CoreValueId[];
  onSelectReflection: (valueId: CoreValueId) => void;
  reflectionValueId: CoreValueId | null;
};

export function ValuePassportContent({
  experiencedValueIds,
  onSelectReflection,
  reflectionValueId,
}: ValuePassportContentProps) {
  const progress = getCoreValueProgress(experiencedValueIds);
  const isComplete = isCoreValueQuestComplete(experiencedValueIds);
  const reflectionValue = reflectionValueId ? CORE_VALUE_BY_ID[reflectionValueId] : null;

  return (
    <details className="value-passport">
      <summary>
        <span>
          <small>CORE VALUE</small>
          <strong>VALUE PASSPORT</strong>
        </span>
        <b>
          {progress.completedCount} / {progress.totalCount}
        </b>
      </summary>

      <div className="value-passport-body">
        <div
          className="value-passport-progress"
          role="progressbar"
          aria-label="Core Value 경험 진행률"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress.percentage}
        >
          <span style={{ width: `${progress.percentage}%` }} />
        </div>

        <div className="value-passport-clusters">
          {CORE_VALUE_CLUSTERS.map((cluster) => (
            <section key={cluster.id}>
              <h3>{cluster.title}</h3>
              <ul>
                {cluster.valueIds.map((valueId) => {
                  const value = CORE_VALUE_BY_ID[valueId];
                  const isExperienced = isCoreValueExperienced(experiencedValueIds, valueId);

                  return (
                    <li key={valueId} data-state={isExperienced ? "experienced" : "pending"}>
                      <span aria-hidden="true">{isExperienced ? "✓" : "○"}</span>
                      {value.name}
                      <small>{isExperienced ? "경험함" : "미경험"}</small>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>

        <section className="value-reflection" aria-labelledby="value-reflection-title">
          <span>FIRST WEEK REFLECTION</span>
          <h3 id="value-reflection-title">첫 업무 주간에 실천할 행동</h3>
          {isComplete ? (
            <>
              <p>12가지 경험 중 실제 업무에서 먼저 시도할 행동을 하나 선택해 보세요.</p>
              <div className="value-reflection-options">
                {CORE_VALUES.map((value) => (
                  <button
                    key={value.id}
                    type="button"
                    aria-pressed={reflectionValueId === value.id}
                    className={reflectionValueId === value.id ? "is-selected" : undefined}
                    onClick={() => onSelectReflection(value.id)}
                  >
                    <strong>{value.name}</strong>
                    <span>{CORE_VALUE_SCENARIO_BY_VALUE_ID[value.id].takeaway}</span>
                  </button>
                ))}
              </div>
              {reflectionValue ? (
                <div className="value-reflection-selection" role="status" aria-live="polite">
                  <span>MY FIRST-WEEK ACTION</span>
                  <strong>{reflectionValue.name}</strong>
                  <p>{CORE_VALUE_SCENARIO_BY_VALUE_ID[reflectionValue.id].takeaway}</p>
                </div>
              ) : null}
            </>
          ) : (
            <p>
              12가지 Core Value를 모두 경험하면 실천 행동을 선택할 수 있습니다. 현재 {progress.completedCount}개를
              경험했습니다.
            </p>
          )}
          <small>Reflection은 평가, 점수 또는 직원 성향 분석에 사용되지 않습니다.</small>
        </section>
      </div>
    </details>
  );
}

export function ValuePassport() {
  const experiencedValueIds = useCoreValueStore((state) => state.experiencedValueIds);
  const reflectionValueId = useCoreValueStore((state) => state.reflectionValueId);
  const selectReflectionValue = useCoreValueStore((state) => state.selectReflectionValue);

  return (
    <ValuePassportContent
      experiencedValueIds={experiencedValueIds}
      onSelectReflection={selectReflectionValue}
      reflectionValueId={reflectionValueId}
    />
  );
}
