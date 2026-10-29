import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { SERVICES } from '../data/content'

const TICKER = Array.from({ length: 6 }, () => 'SERVICES')

export function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  const [open, setOpen] = useState<string | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const track = section.querySelector<HTMLElement>('.services-ticker__track')
    const seq = section.querySelector<HTMLElement>('.services-ticker__seq')
    if (!track || !seq) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const setup = () => {
      const prev = tweenRef.current?.progress()
      tweenRef.current?.kill()
      gsap.set(track, { x: 0 })

      const distance = seq.getBoundingClientRect().width
      if (distance <= 0) return

      tweenRef.current = gsap.to(track, {
        x: -distance,
        duration: Math.max(14, distance / 90),
        ease: 'none',
        repeat: -1,
      })
      if (prev != null && !Number.isNaN(prev)) {
        tweenRef.current.progress(prev)
      }
    }

    setup()
    const ro = new ResizeObserver(() => setup())
    ro.observe(seq)
    window.addEventListener('resize', setup)

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', setup)
      tweenRef.current?.kill()
      tweenRef.current = null
      gsap.set(track, { clearProps: 'transform' })
    }
  }, [])

  return (
    <section id="services" className="services" ref={sectionRef}>
      <div className="services-ticker" aria-hidden>
        <div className="services-ticker__viewport">
          <div className="services-ticker__track">
            {[0, 1, 2].map((copy) => (
              <div key={copy} className="services-ticker__seq">
                {TICKER.map((word, i) => (
                  <span key={`${copy}-${i}`} className="services-ticker__item">
                    <span className="services-ticker__word">{word}</span>
                    <span className="services-ticker__note">what i offer</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="services__list">
        {SERVICES.map((s) => {
          const isOpen = open === s.id
          return (
            <div
              key={s.id}
              className={`service-row ${isOpen ? 'is-open' : ''}`}
              onClick={() => setOpen(isOpen ? null : s.id)}
            >
              <span className="service-row__plus service-row__plus--tl" aria-hidden>
                +
              </span>
              <span className="service-row__plus service-row__plus--tr" aria-hidden>
                +
              </span>

              {/* Fixed top rail — title / pill / + stay put when open */}
              <div className="service-row__stage">
                <div className="service-row__rail">
                  <div className="service-row__title-wrap">
                    <span className="service-row__num">{s.id}</span>
                    <span className="service-row__title">{s.title}</span>
                  </div>

                  <span className="service-row__pill">{s.pill}</span>

                  <span className="service-row__icon" aria-hidden>
                    <svg viewBox="0 0 17 17" width="16" height="16">
                      <path
                        fill="currentColor"
                        d="M16 8.5c0 .391-.317.708-.708.708H9.208v7.084c0 .391-.317.708-.708.708s-.708-.317-.708-.708V9.208H.708A.708.708 0 0 1 .708 7.792h7.084V.708A.708.708 0 0 1 8.5 0c.391 0 .708.317.708.708v7.084h7.084c.391 0 .708.317.708.708Z"
                      />
                    </svg>
                  </span>
                </div>

                {/* Bottom of icon sits on the closed-row border line */}
                <div className="service-row__art" aria-hidden>
                  <img src={s.icon} alt="" width={220} height={220} />
                </div>
              </div>

              {/* Only this block grows downward */}
              <div
                className="service-row__panel"
                style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
              >
                <div className="service-row__details">
                  <p>{s.detail}</p>
                  <div className="service-row__tags">
                    {s.tags.map((tag) => (
                      <span key={tag} className="service-row__tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <style>{`
        .services {
          padding: 0;
          background: var(--color-bg);
          overflow: visible;
        }
        .services-ticker {
          position: relative;
          width: 100%;
          border-bottom: 1px solid rgba(224, 224, 224, 0.63);
          background: var(--color-bg);
          overflow: visible;
        }
        .services-ticker__viewport {
          position: relative;
          width: 100vw;
          max-width: 100vw;
          left: 50%;
          margin-left: -50vw;
          overflow: hidden;
          padding: 24px 0;
          box-sizing: border-box;
          background: var(--color-bg);
        }
        .services-ticker__track {
          display: flex;
          width: max-content;
          will-change: transform;
          align-items: center;
        }
        .services-ticker__seq {
          display: flex;
          flex-shrink: 0;
          align-items: center;
          gap: 64px;
          padding-right: 64px;
        }
        .services-ticker__item {
          display: inline-flex;
          align-items: center;
          gap: 64px;
          flex-shrink: 0;
        }
        .services-ticker__word {
          font-family: var(--font-section);
          font-size: 100px;
          line-height: 1.1em;
          letter-spacing: 0;
          text-transform: none;
          font-weight: 600;
          color: var(--color-fg);
          white-space: nowrap;
        }
        .services-ticker__note {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          font-family: var(--font-section);
          font-size: 15px;
          font-weight: 500;
          letter-spacing: 0;
          line-height: 1.4em;
          color: var(--color-fg);
          white-space: nowrap;
        }
        @media (max-width: 1199px) and (min-width: 810px) {
          .services-ticker__word { font-size: 70px; }
        }
        @media (max-width: 809px) {
          .services-ticker__word { font-size: 60px; }
          .services-ticker__seq,
          .services-ticker__item { gap: 32px; padding-right: 32px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .services-ticker__track { transform: none !important; }
        }

        .services__list {
          overflow: visible;
        }

        .service-row {
          position: relative;
          display: flex;
          flex-direction: column;
          padding: 32px;
          background: transparent;
          border-left: 1px solid rgba(224, 224, 224, 0.63);
          border-right: 1px solid rgba(224, 224, 224, 0.63);
          border-bottom: 1px solid rgba(224, 224, 224, 0.63);
          overflow: visible;
          z-index: 1;
          cursor: pointer;
          transition: background 0.3s var(--ease-out);
        }
        .service-row:hover,
        .service-row.is-open {
          z-index: 5;
        }
        .service-row.is-open {
          background: #f2f2f2;
        }
        [data-theme='dark'] .service-row.is-open {
          background: var(--color-muted);
        }

        .service-row__plus {
          position: absolute;
          font-size: 11px;
          line-height: 1;
          color: #111;
          z-index: 2;
          pointer-events: none;
          font-weight: 700;
          font-family: Arial, sans-serif;
        }
        [data-theme='dark'] .service-row__plus { color: #fff; }
        .service-row__plus--tl { top: -6px; left: -5px; }
        .service-row__plus--tr { top: -6px; right: -5px; }

        /* Equal 3-slot rail: title | pill | + */
        .service-row__stage {
          position: relative;
          width: 100%;
          z-index: 2;
        }
        .service-row__rail {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          align-items: center;
          width: 100%;
          min-height: 40px;
          position: relative;
          z-index: 2;
        }
        .service-row__title-wrap {
          display: flex;
          align-items: center;
          gap: 16px;
          justify-self: start;
          min-width: 0;
        }
        .service-row__num {
          font-family: var(--font-section);
          font-size: 20px;
          font-weight: 500;
          line-height: 1.4em;
          letter-spacing: 0;
          color: var(--color-fg);
        }
        .service-row__title {
          font-family: var(--font-section);
          font-size: 25px;
          font-weight: 700;
          line-height: 1.4em;
          letter-spacing: 0;
          text-transform: none;
          color: var(--color-fg);
        }
        .service-row__pill {
          justify-self: center;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 8px 24px;
          border-radius: 90px;
          background: #f2f2f2;
          color: var(--color-fg);
          font-family: var(--font-section);
          font-size: 15px;
          font-weight: 500;
          letter-spacing: 0;
          line-height: 1.4em;
          white-space: nowrap;
          border: 1px solid rgba(224, 224, 224, 0.63);
          pointer-events: none;
        }
        .service-row.is-open .service-row__pill {
          background: #fff;
        }
        [data-theme='dark'] .service-row__pill {
          background: var(--color-muted);
          color: var(--color-fg);
        }

        .service-row__icon {
          justify-self: end;
          display: grid;
          place-items: center;
          padding: 12px;
          border-radius: 90px;
          border: 1px solid rgba(224, 224, 224, 0.63);
          color: var(--color-fg);
          background: transparent;
          line-height: 0;
        }
        .service-row__icon svg {
          display: block;
          transition: transform 0.3s var(--ease-out);
        }
        .service-row.is-open .service-row__icon svg {
          transform: rotate(-45deg);
        }

        /* Details only expand down — rail stays fixed */
        .service-row__panel {
          display: grid;
          width: 100%;
          max-width: 520px;
          transition: grid-template-rows 0.4s var(--ease-out);
        }
        .service-row__details {
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 24px;
          padding-top: 0;
        }
        .service-row.is-open .service-row__details {
          padding-top: 24px;
        }
        .service-row__details p {
          margin: 0;
          max-width: 36rem;
          color: var(--color-fg);
          font-family: var(--font-section);
          font-size: 15px;
          font-weight: 500;
          letter-spacing: 0;
          line-height: 1.4em;
        }
        [data-theme='dark'] .service-row__details p {
          color: var(--color-fg);
        }
        .service-row__tags {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px;
          width: 100%;
          max-width: 500px;
        }
        .service-row__tag {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 8px 24px;
          border-radius: 90px;
          background: #e3e3e3;
          color: var(--color-fg);
          border: 1px solid #e0e0e0;
          font-family: var(--font-section);
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0;
          line-height: 1.4em;
          white-space: nowrap;
        }
        [data-theme='dark'] .service-row__tag {
          background: var(--color-muted);
          color: var(--color-fg);
          border-color: var(--color-border);
        }

        /* Bottom sits on closed-row border; overflows upward; nudged left */
        .service-row__art {
          position: absolute;
          right: 120px;
          bottom: -32px;
          width: 168px;
          height: 168px;
          pointer-events: none;
          z-index: 3;
        }
        .service-row__art img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center bottom;
          opacity: 0;
          transform: translateY(28px) scale(0.82);
          transform-origin: center bottom;
          transition:
            opacity 0.35s var(--ease-out),
            transform 0.45s cubic-bezier(0.22, 1.4, 0.36, 1);
          filter: drop-shadow(0 14px 24px rgba(8, 181, 209, 0.22));
        }
        .service-row:hover .service-row__art img,
        .service-row.is-open .service-row__art img {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .service-row:hover:not(.is-open) .service-row__art img {
          animation: service-art-pop 0.55s cubic-bezier(0.22, 1.4, 0.36, 1) both;
        }
        @keyframes service-art-pop {
          0% { opacity: 0; transform: translateY(28px) scale(0.82); }
          70% { opacity: 1; transform: translateY(-6px) scale(1.06); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .service-row:hover:not(.is-open) .service-row__art img {
            animation: none;
          }
        }

        @media (max-width: 1199px) and (min-width: 810px) {
          .service-row__num { font-size: 18px; }
          .service-row__title { font-size: 25px; }
          .service-row__art {
            width: 140px;
            height: 140px;
            right: 100px;
            bottom: -32px;
          }
        }
        @media (max-width: 809px) {
          .service-row {
            padding: 24px 20px;
          }
          .service-row__rail {
            grid-template-columns: 1fr auto;
            gap: 12px;
          }
          .service-row__pill { display: none; }
          .service-row__icon { grid-column: 2; grid-row: 1; }
          .service-row__art {
            right: 64px;
            bottom: -24px;
            width: 110px;
            height: 110px;
          }
          .service-row__tag {
            padding: 8px 16px;
          }
        }
      `}</style>
    </section>
  )
}
