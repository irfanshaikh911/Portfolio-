import { useRef } from 'react'
import aboutPortrait from '../assets/images/character/about-portrait.png'
import {
  ABOUT_LEFT_STATS,
  ABOUT_RIGHT_STATS,
  ABOUT_STACK,
  EXPERIENCE,
} from '../data/content'
import { AnimatedNumber } from './motion/AnimatedNumber'

function Plus() {
  return (
    <>
      <span className="about__plus about__plus--tl" aria-hidden>
        +
      </span>
      <span className="about__plus about__plus--tr" aria-hidden>
        +
      </span>
    </>
  )
}

function StatCell({ value, label }: { value: string; label: string }) {
  const numeric = parseInt(value, 10)
  const suffix = value.replace(/[0-9]/g, '')
  return (
    <div className="about__cell about__cell--stat">
      <Plus />
      <div className="about__stat-value">
        <AnimatedNumber value={numeric} suffix={suffix} />
      </div>
      <div className="about__stat-label">{label}</div>
    </div>
  )
}

export function About() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="about__rail">
        <span className="about__plus about__plus--rtl" aria-hidden>
          +
        </span>
        <span className="about__plus about__plus--rtr" aria-hidden>
          +
        </span>
        <span className="about__plus about__plus--rbl" aria-hidden>
          +
        </span>
        <span className="about__plus about__plus--rbr" aria-hidden>
          +
        </span>

        <div className="about__stage">
          <aside className="about__col about__col--left">
            {ABOUT_LEFT_STATS.map((s) => (
              <StatCell key={s.label} value={s.value} label={s.label} />
            ))}

            <div className="about__cell about__cell--head">
              <Plus />
              <p className="about__head-label">My Stack</p>
            </div>

            {ABOUT_STACK.map((item) => (
              <div key={item.name} className="about__cell about__cell--stack">
                <Plus />
                <img
                  className="about__stack-logo"
                  src={item.logo}
                  alt=""
                  width={54}
                  height={54}
                  loading="lazy"
                  decoding="async"
                />
                <div className="about__stack-copy">
                  <span className="about__stack-name">{item.name}</span>
                  <span>{item.blurb}</span>
                </div>
              </div>
            ))}
          </aside>

          <div className="about__col about__col--center">
            <h2 className="about__title js-reveal-heading">ABOUT ME</h2>
            <div className="about__portrait-track">
              <div className="about__portrait-sticky">
                <div className="about__portrait-wrap">
                  <div className="about__portrait-figure">
                    <img
                      className="about__portrait"
                      src={aboutPortrait}
                      alt="Irfan Shaikh sitting with a laptop"
                      width={680}
                      height={850}
                      loading="lazy"
                      decoding="async"
                    />
                    <p className="about__bubble">Let Me Introduce Myself</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside className="about__col about__col--right">
            {ABOUT_RIGHT_STATS.map((s) => (
              <StatCell key={s.label} value={s.value} label={s.label} />
            ))}

            <div className="about__cell about__cell--head">
              <Plus />
              <p className="about__head-label">My Experience</p>
            </div>

            {EXPERIENCE.map((e, i) => (
              <div
                key={e.role}
                className={`about__cell about__cell--exp${i === EXPERIENCE.length - 1 ? ' about__cell--fill' : ''}`}
              >
                <Plus />
                <h3>{e.role}</h3>
                <p>
                  Company <span>→</span> {e.company}
                </p>
                <p>
                  Year <span>→</span> {e.year}
                </p>
              </div>
            ))}
          </aside>
        </div>
      </div>

      <style>{`
        .about {
          padding: 0;
        }
        .about__rail {
          position: relative;
          width: 100%;
          margin-inline: 0;
          border-left: 1px solid var(--color-border);
          border-right: 1px solid var(--color-border);
          border-bottom: 1px solid var(--color-border);
          background: var(--color-bg);
          box-sizing: border-box;
          overflow: visible;
        }
        .about__plus {
          position: absolute;
          font-size: 11px;
          line-height: 1;
          color: #111;
          pointer-events: none;
          z-index: 4;
          font-weight: 700;
          font-family: Arial, sans-serif;
        }
        [data-theme='dark'] .about__plus {
          color: #fff;
        }
        .about__plus--tl { top: -6px; left: -5px; }
        .about__plus--tr { top: -6px; right: -5px; }
        .about__plus--rtl { top: 0; left: 0; transform: translate(-50%, -50%); }
        .about__plus--rtr { top: 0; left: 100%; transform: translate(-50%, -50%); }
        .about__plus--rbl { top: 100%; left: 0; transform: translate(-50%, -50%); }
        .about__plus--rbr { top: 100%; left: 100%; transform: translate(-50%, -50%); }

        .about__stage {
          display: grid;
          grid-template-columns: minmax(220px, 1fr) minmax(0, 2.15fr) minmax(220px, 1fr);
          align-items: stretch;
          min-height: 0;
          overflow: visible;
          border-top: 1px solid var(--color-border);
        }

        .about__col--left,
        .about__col--right {
          display: flex;
          flex-direction: column;
          min-height: 0;
        }
        .about__col--left {
          border-right: 1px solid var(--color-border);
        }
        .about__col--right {
          border-left: 1px solid var(--color-border);
        }
        .about__col--center {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          overflow: visible;
          padding: 1.15rem 1rem 0;
          box-sizing: border-box;
          min-height: 0;
        }

        .about__cell {
          position: relative;
          padding: 64px 24px;
          border-bottom: 1px solid rgba(224, 224, 224, 0.63);
          box-sizing: border-box;
        }
        .about__col--left .about__cell:last-child,
        .about__col--right .about__cell:last-child {
          border-bottom: none;
        }
        .about__cell--fill {
          flex: 1;
        }

        .about__cell--stat .about__stat-value {
          font-family: var(--font-section);
          font-size: 35px;
          font-weight: 600;
          letter-spacing: 0;
          line-height: 1.1em;
          margin-bottom: 4px;
          color: var(--color-fg);
        }
        .about__stat-label {
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 500;
          letter-spacing: -0.02em;
          line-height: 1.6em;
          color: var(--color-muted-fg);
        }

        .about__cell--head {
          background: #f2f2f2;
          padding: 24px;
        }
        [data-theme='dark'] .about__cell--head {
          background: var(--color-muted);
        }
        .about__head-label {
          margin: 0;
          font-family: var(--font-section);
          font-size: 20px;
          font-weight: 500;
          line-height: 1.4em;
          letter-spacing: 0;
          color: var(--color-fg);
        }

        .about__cell--stack {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .about__stack-logo {
          flex-shrink: 0;
          width: 54px;
          height: 54px;
          object-fit: cover;
          display: block;
          border-radius: 12px;
          background: transparent;
        }
        .about__stack-copy {
          display: flex;
          flex-direction: column;
          gap: 0;
          min-width: 0;
        }
        .about__stack-copy .about__stack-name {
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 500;
          letter-spacing: -0.02em;
          line-height: 1.6em;
          color: var(--color-fg);
        }
        .about__stack-copy span {
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 400;
          letter-spacing: -0.02em;
          line-height: 1.6em;
          color: var(--color-muted-fg);
        }

        .about__cell--exp h3 {
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 500;
          letter-spacing: -0.02em;
          line-height: 1.6em;
          margin: 0 0 4px;
        }
        .about__cell--exp p {
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 400;
          letter-spacing: -0.02em;
          line-height: 1.6em;
          color: var(--color-muted-fg);
          margin: 0;
        }
        .about__cell--exp span {
          color: var(--color-fg);
        }

        .about__title {
          margin: 0;
          font-family: var(--font-section);
          font-size: 80px;
          line-height: 1.1em;
          letter-spacing: -0.06em;
          text-transform: none;
          font-weight: 600;
          text-align: center;
          flex-shrink: 0;
          position: relative;
          z-index: 2;
        }
        .about__portrait-track {
          position: relative;
          flex: 1 1 auto;
          width: 100%;
          min-height: 420px;
          margin-top: 0.35rem;
          overflow: visible;
        }
        /* Full-width sticky shell — sticks under nav, character stays centered */
        .about__portrait-sticky {
          position: sticky;
          top: calc(var(--nav-h) + 8px);
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          z-index: 2;
        }
        .about__portrait-wrap {
          position: relative;
          width: min(96%, 580px);
          margin: 0;
        }
        .about__portrait-figure {
          position: relative;
          width: 100%;
          line-height: 0;
        }
        .about__bubble {
          position: absolute;
          /* Over face, viewer-right — sits on the PNG near the head */
          top: 6%;
          left: 54%;
          margin: 0;
          padding: 0.42rem 0.9rem;
          border-radius: var(--radius-pill);
          background: #f2f2f2;
          color: var(--color-fg);
          font-family: var(--font-section);
          font-size: clamp(14px, 1.35vw, 20px);
          font-weight: 500;
          line-height: 1.35em;
          letter-spacing: 0;
          white-space: nowrap;
          z-index: 2;
          pointer-events: none;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
        }
        [data-theme='dark'] .about__bubble {
          background: var(--color-muted);
          box-shadow: none;
        }
        .about__portrait {
          display: block;
          width: 100%;
          height: auto;
          max-height: min(78vh, 640px);
          margin-inline: auto;
          border-radius: 0;
          object-fit: contain;
          object-position: center center;
          box-shadow: none;
          background: transparent;
        }

        @media (max-width: 1199px) and (min-width: 810px) {
          .about__title { font-size: 56px; }
          .about__cell { padding: 24px 16px; }
          .about__bubble { left: 50%; top: 5%; }
        }
        @media (max-width: 809px) {
          .about__title { font-size: 48px; }
          .about__cell { padding: 24px 16px; }
          .about__stage { grid-template-columns: 1fr; }
          .about__col--left,
          .about__col--right { border: none; }
          .about__col--left { border-bottom: 1px solid rgba(224, 224, 224, 0.63); }
          .about__col--center {
            border-bottom: 1px solid rgba(224, 224, 224, 0.63);
            order: -1;
            padding-bottom: 1rem;
          }
          .about__portrait-track { min-height: 280px; }
          .about__portrait-sticky {
            position: relative;
            top: auto;
          }
          .about__portrait-wrap { width: min(100%, 380px); }
          .about__bubble {
            top: 4%;
            left: 48%;
            font-size: 14px;
            padding: 0.35rem 0.7rem;
          }
        }
      `}</style>
    </section>
  )
}
