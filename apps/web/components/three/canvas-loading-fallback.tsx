type CanvasLoadingFallbackProps = {
  compact?: boolean;
};

export function CanvasLoadingFallback({ compact = false }: CanvasLoadingFallbackProps) {
  return (
    <div
      className={compact ? "canvas-loader canvas-loader-compact" : "canvas-loader"}
      role="status"
      aria-live="polite"
    >
      <span className="canvas-loader-ring" aria-hidden="true" />
      <span>{compact ? "LOADING ASSETS" : "INITIALIZING 3D SCENE"}</span>
    </div>
  );
}
