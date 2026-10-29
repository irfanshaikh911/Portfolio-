import { useRef } from 'react'
import { PROCESS_STEPS } from '../data/content'
import { MagneticButton } from './MagneticButton'
import { useChatBooking } from './ChatBookingContext'
import { useStickyFlip } from '../hooks/useStickyFlip'
import processStep1 from '../assets/images/character/process-step-1.png'
import processStep2 from '../assets/images/character/process-step-2.png'
import processStep3 from '../assets/images/character/process-step-3.png'

const PROCESS_IMAGES = [processStep1, processStep2, processStep3]

function UpArrow() {
  return (
    <span className="process-step__arrow" aria-hidden>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
          d="M9 15V3M9 3L3.5 8.5M9 3l5.5 5.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
          d="M9 15V3M9 3L3.5 8.5M9 3l5.5 5.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

export function Process() {
  const sectionRef = useRef<HTMLElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const { openChat } = useChatBooking()

  useStickyFlip(sectionRef, carouselRef, {
    panelSelector: '.process-step',
    images: PROCESS_IMAGES,
    frontSelector: '.process-card__face--front img',
    backSelector: '.process-card__face--back img',
  })

  return (
    <section id="process" className="process" ref={sectionRef}>
      <div className="process__rail">
        <div className="process__main">
          <div className="process__title-block">
            <h2 className="process__heading js-reveal-heading">PROCESS</h2>
          </div>

          <div className="process__steps">
            {PROCESS_STEPS.map((step, i) => (
              <article
                key={step.id}
                className={`process-step process-step--${step.tone}`}
                style={{ zIndex: i + 1 }}
              >
                <div className="process-step__inner">
                  <div className="process-step__title">
                    <span className="process-step__num">{step.id}</span>
                    <h3>{step.title}</h3>
                  </div>
                  <p>{step.text}</p>
                  <UpArrow />
                </div>
              </article>
            ))}
          </div>

          <div className="process__cta">
            <div className="process__cta-card">
              <h3>Ready to Get Started?</h3>
              <p>
                Tell me about your project and let&apos;s create something amazing
                together. I&apos;ll respond within 24 hours.
              </p>
              <MagneticButton
                type="button"
                className="process__cta-btn"
                onClick={openChat}
              >
                I&apos;m Ready to Start
                <span className="process__cta-dot" aria-hidden>
                  <span className="process__cta-dot-bg" />
                  <span className="process__cta-dot-core" />
                </span>
              </MagneticButton>
            </div>
          </div>
        </div>

        <aside className="process__videos" aria-hidden>
          <div className="process__videos-sticky">
            <div className="process__videos-stage">
              <div className="process__videos-carousel" ref={carouselRef}>
                <div className="process-card">
                  <div className="process-card__face process-card__face--front">
                    <img
                      src={PROCESS_IMAGES[0]}
                      alt=""
                      className="process-card__img"
                      draggable={false}
                    />
                  </div>
                  <div className="process-card__face process-card__face--back">
                    <img
                      src={PROCESS_IMAGES[0]}
                      alt=""
                      className="process-card__img"
                      draggable={false}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <style>{`
        .process {
          padding: 0;
          background: var(--color-bg);
          overflow: visible;
        }
        .process__rail {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          align-items: start;
          width: 100%;
          border-left: 1px solid rgba(224, 224, 224, 0.63);
          border-right: 1px solid rgba(224, 224, 224, 0.63);
          border-bottom: 1px solid rgba(224, 224, 224, 0.63);
          box-sizing: border-box;
          overflow: visible;
        }
        .process__main {
          display: flex;
          flex-direction: column;
          border-right: 1px solid rgba(224, 224, 224, 0.63);
          min-width: 0;
        }
        .process__title-block {
          padding: 128px 24px 24px;
          border-bottom: 1px solid rgba(224, 224, 224, 0.63);
        }
        .process__heading {
          margin: 0;
          font-family: var(--font-section);
          font-size: 100px;
          font-weight: 600;
          line-height: 1.1em;
          letter-spacing: 0;
          color: var(--color-fg);
        }

        /* Stacked sticky cards — next step overlaps the previous (Dean-style) */
        .process__steps {
          position: relative;
          display: flex;
          flex-direction: column;
        }
        .process-step {
          position: sticky;
          top: var(--nav-h);
          min-height: calc(170vh - var(--nav-h));
          height: calc(170vh - var(--nav-h));
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          padding: 0 24px;
          border-bottom: 1px solid rgba(224, 224, 224, 0.63);
          box-sizing: border-box;
        }
        .process-step--light { background: #fff; }
        .process-step--muted { background: #f2f2f2; }
        .process-step--deep { background: #e3e3e3; }
        [data-theme='dark'] .process-step--light { background: var(--color-bg); }
        [data-theme='dark'] .process-step--muted { background: var(--color-muted); }
        [data-theme='dark'] .process-step--deep {
          background: color-mix(in srgb, var(--color-muted) 70%, #000);
        }
        .process-step__inner {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 24px;
          max-width: 42rem;
          width: 100%;
          min-height: calc(100dvh - var(--nav-h));
          padding: 48px 0;
          box-sizing: border-box;
        }
        .process-step__title {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0;
          width: 100%;
        }
        .process-step__num {
          font-family: var(--font-section);
          font-size: 20px;
          font-weight: 500;
          line-height: 1.4em;
          letter-spacing: 0;
          color: var(--color-fg);
        }
        .process-step h3 {
          margin: 0;
          font-family: var(--font-section);
          font-size: 25px;
          font-weight: 500;
          line-height: 1.4em;
          letter-spacing: 0;
          color: var(--color-fg);
        }
        .process-step p {
          margin: 0;
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 500;
          letter-spacing: -0.02em;
          line-height: 1.6em;
          color: #616161;
        }
        [data-theme='dark'] .process-step p {
          color: var(--color-muted-fg);
        }
        .process-step__arrow {
          display: inline-flex;
          align-items: center;
          gap: 2px;
          color: var(--color-fg);
        }
        .process-step__arrow svg:last-child {
          margin-left: -6px;
          opacity: 0.55;
        }

        .process__cta {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 0;
          padding: 48px 24px 56px;
          box-sizing: border-box;
          background: #fff;
          border-bottom: 1px solid rgba(224, 224, 224, 0.63);
        }
        [data-theme='dark'] .process__cta {
          background: var(--color-bg);
        }
        .process__cta-card {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
          padding: 48px 24px;
          border-radius: 30px;
          background: #f2f2f2;
          text-align: center;
          box-sizing: border-box;
        }
        [data-theme='dark'] .process__cta-card {
          background: var(--color-muted);
        }
        .process__cta-card h3 {
          margin: 0;
          font-family: var(--font-section);
          font-size: 25px;
          font-weight: 500;
          line-height: 1.4em;
          color: var(--color-fg);
        }
        .process__cta-card p {
          margin: 0;
          max-width: 28rem;
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 500;
          letter-spacing: -0.02em;
          line-height: 1.6em;
          color: #616161;
        }
        [data-theme='dark'] .process__cta-card p {
          color: var(--color-muted-fg);
        }
        .process__cta-btn {
          height: 52px;
          padding: 0 28px !important;
          background: #000 !important;
          color: #fff !important;
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 600;
          gap: 0.85rem;
          box-shadow:
            0 10px 22px rgba(0, 0, 0, 0.12),
            0 22px 48px rgba(0, 0, 0, 0.1) !important;
        }
        .process__cta-dot {
          position: relative;
          width: 14px;
          height: 14px;
          flex-shrink: 0;
        }
        .process__cta-dot-bg {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: #636363;
        }
        .process__cta-dot-core {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #02d4f5;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 0 4px rgba(2, 212, 245, 0.28);
        }

        /* Sticky under nav — figure fills the Dean image column */
        .process__videos {
          position: sticky;
          top: var(--nav-h);
          align-self: start;
          height: calc(100dvh - var(--nav-h));
          max-height: calc(100vh - var(--nav-h));
          border-left: 1px solid rgba(224, 224, 224, 0.63);
          margin-left: -1px;
          box-sizing: border-box;
          z-index: 2;
        }
        .process__videos-sticky {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px 16px;
          box-sizing: border-box;
        }
        .process__videos-stage {
          position: relative;
          width: 100%;
          height: 100%;
          max-width: none;
          margin: 0;
          perspective: 1600px;
          perspective-origin: 50% 50%;
        }
        .process__videos-carousel {
          position: absolute;
          inset: 0;
          transform-style: preserve-3d;
          will-change: transform;
          transform-origin: 50% 50%;
        }
        .process-card {
          position: absolute;
          inset: 0;
          transform-style: preserve-3d;
        }
        .process-card__face {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .process-card__face--back {
          transform: rotateY(180deg);
        }
        .process-card__img {
          width: 100%;
          height: 100%;
          max-height: 100%;
          object-fit: contain;
          object-position: center center;
          display: block;
          user-select: none;
          -webkit-user-drag: none;
        }

        @media (max-width: 1199px) and (min-width: 810px) {
          .process__heading { font-size: 70px; }
          .process__title-block { padding: 72px 20px 20px; }
        }
        @media (max-width: 809px) {
          .process__rail {
            grid-template-columns: 1fr;
          }
          .process__main {
            border-right: none;
            order: 2;
          }
          .process__videos {
            position: sticky;
            top: var(--nav-h);
            align-self: start;
            height: calc(100dvh - var(--nav-h));
            max-height: calc(100vh - var(--nav-h));
            order: 1;
            border-left: none;
            border-bottom: 1px solid rgba(224, 224, 224, 0.63);
          }
          .process__videos-sticky {
            height: 100%;
            padding: 16px;
          }
          .process__videos-stage {
            width: 100%;
            height: 100%;
            max-width: none;
          }
          .process__heading { font-size: 60px; }
          .process__title-block { padding: 48px 16px 16px; }
          .process-step {
            min-height: calc(150vh - var(--nav-h));
            height: calc(150vh - var(--nav-h));
            padding: 0 16px;
          }
          .process-step__inner {
            min-height: calc(100dvh - var(--nav-h));
            padding: 40px 0;
          }
          .process__cta {
            min-height: auto;
            padding: 40px 16px 48px;
          }
        }
      `}</style>
    </section>
  )
}
