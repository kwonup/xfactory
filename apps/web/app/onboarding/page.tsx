import Link from "next/link";

export default function OnboardingPage() {
  return (
    <main className="gateway-page">
      <div className="landing-grid" aria-hidden="true" />
      <section className="gateway-panel">
        <p className="gateway-index">FACTORY ACCESS / 01</p>
        <div className="gateway-symbol" aria-hidden="true">
          <span>IX</span>
        </div>
        <h1>FACTORY GATEWAY CONNECTED</h1>
        <p>
          INTERX WORLD 입장 경로가 준비되었습니다.
          <br />
          3D 공장 경험은 다음 단계에서 연결됩니다.
        </p>
        <Link className="gateway-back-link" href="/">
          ← BACK TO ENTRANCE
        </Link>
      </section>
    </main>
  );
}
