import Link from "next/link";

export default function HomePage() {
  return (
    <main className="landing-page">
      <div className="landing-grid" aria-hidden="true" />
      <div className="landing-glow landing-glow-left" aria-hidden="true" />
      <div className="landing-glow landing-glow-right" aria-hidden="true" />

      <header className="landing-header">
        <div className="brand-lockup" aria-label="X-FACTORY">
          <span className="brand-mark" aria-hidden="true">
            <span>IX</span>
          </span>
          <span className="brand-name">X-FACTORY</span>
        </div>

        <p className="system-status">
          <span className="status-dot" aria-hidden="true" />
          ONBOARDING SYSTEM ONLINE
        </p>
      </header>

      <section className="landing-hero">
        <div className="hero-copy">
          <p className="hero-eyebrow">
            <span>01</span>
            IMMERSIVE AI ONBOARDING
          </p>

          <h1 className="hero-title">
            <span>WELCOME TO</span>
            X-<strong>FACTORY</strong>
          </h1>

          <p className="brand-meaning">
            X-FACTOR <span aria-hidden="true">×</span> INTERX FACTORY
          </p>

          <p className="hero-description">
            AI와 제조가 만나는 공간을 직접 탐험하며
            <br className="desktop-break" />
            INTERX의 기술과 가치를 경험하세요.
          </p>

          <div className="hero-actions">
            <Link
              className="enter-factory-button"
              href="/onboarding"
              aria-label="X-FACTORY 3D 공장 입장"
            >
              <span>ENTER FACTORY</span>
              <span className="button-arrow" aria-hidden="true">
                ↗
              </span>
            </Link>
            <p className="control-hint">
              <span aria-hidden="true">⌁</span>
              DESKTOP EXPERIENCE
            </p>
          </div>
        </div>

        <div className="factory-visual" aria-hidden="true">
          <div className="visual-label visual-label-top">
            <span>INTERX VIRTUAL FACTORY</span>
            <span>NODE / 001</span>
          </div>

          <div className="factory-orbit factory-orbit-outer" />
          <div className="factory-orbit factory-orbit-inner" />

          <svg
            className="factory-blueprint"
            viewBox="0 0 620 520"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="blueprint-soft"
              d="M87 342L309 214L533 343L310 472L87 342Z"
            />
            <path
              className="blueprint-soft"
              d="M123 321L309 214L497 322L310 430L123 321Z"
            />
            <path d="M169 294L306 215L445 295L307 375L169 294Z" />
            <path d="M169 294V334L307 414V375" />
            <path d="M445 295V334L307 414" />
            <path d="M229 266V217L307 172L386 217V262" />
            <path d="M229 217L307 261L386 217" />
            <path d="M307 172V261" />
            <path d="M274 244V196L307 177L340 196V244" />
            <path d="M199 310L307 372L416 310" />
            <path d="M249 339V371M364 339V371" />
            <path d="M126 321L126 369L310 476L496 369V322" />
            <path className="blueprint-accent" d="M307 107V172" />
            <path className="blueprint-accent" d="M286 119L307 98L328 119" />
            <circle className="blueprint-node" cx="307" cy="98" r="7" />
            <circle className="blueprint-node" cx="169" cy="294" r="5" />
            <circle className="blueprint-node" cx="445" cy="295" r="5" />
            <circle className="blueprint-node" cx="307" cy="414" r="5" />
            <path className="blueprint-detail" d="M89 399H202" />
            <path className="blueprint-detail" d="M420 158H536" />
            <path className="blueprint-detail" d="M106 389L89 399L106 409" />
            <path className="blueprint-detail" d="M519 148L536 158L519 168" />
          </svg>

          <div className="visual-crosshair visual-crosshair-one" />
          <div className="visual-crosshair visual-crosshair-two" />
          <div className="visual-label visual-label-bottom">
            <span>AI · SDM · SMART FACTORY</span>
            <span>EXPLORE / LEARN / CONNECT</span>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <p>WEB-BASED 3D EXPERIENCE</p>
        <p className="footer-coordinate">VIRTUAL SPACE / ONLINE</p>
        <p>POWERED BY GENERATIVE AI</p>
      </footer>
    </main>
  );
}
