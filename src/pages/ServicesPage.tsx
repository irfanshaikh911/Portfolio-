import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { motion, useReducedMotion } from 'motion/react'
import { usePageReveals } from '../hooks/usePageReveals'
import { LetterTitle } from '../components/motion/LetterTitle'
import servicesHero from '../assets/images/character/services-hero.png'
import iconWeb from '../assets/images/services/web-design-green.png'
import iconBrand from '../assets/images/services/branding-green.png'
import iconProduct from '../assets/images/services/product-design-green.png'
import iconGraphics from '../assets/images/services/graphics-design-green.png'
import { SERVICES } from '../data/content'

const TICKER = [
  'Brand Consistency',
  'Client Focused',
  'Flexible Packages',
  'Mobile Responsive',
  'SEO Optimized',
  'Custom Designs',
  'Ongoing Support',
]

const ICONS: Record<string, string> = {
  '01': iconWeb,
  '02': iconBrand,
  '03': iconProduct,
  '04': iconGraphics,
}

const ease = [0.22, 1, 0.36, 1] as const

function Tick() {
  return (
    <span className="services-page__tick" aria-hidden>
      ✦
    </span>
  )
}

export function ServicesPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const tickerRef = useRef<HTMLDivElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  const reduce = useReducedMotion()
  usePageReveals(pageRef)

  useEffect(() => {
    const root = tickerRef.current
    if (!root) return
    const track = root.querySelector<HTMLElement>('.services-page__ticker-track')
    const seq = root.querySelector<HTMLElement>('.services-page__ticker-seq')
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
        duration: Math.max(18, distance / 70),
        ease: 'none',
        repeat: -1,
      })
      if (prev != null && !Number.isNaN(prev)) tweenRef.current.progress(prev)
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
    <div className="services-page" ref={pageRef}>
      <section className="services-page__hero">
        <span className="grid-star grid-star--tl" aria-hidden>
          ✦
        </span>
        <span className="grid-star grid-star--tr" aria-hidden>
          ✦
        </span>
        <div className="services-page__char-col">
          <motion.div
            className="services-page__speech"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3, ease }}
          >
            <span>What I Bring to the Table</span>
          </motion.div>
          <motion.img
            src={servicesHero}
            alt=""
            className="services-page__char"
            initial={reduce ? false : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5, ease }}
          />
        </div>
        <div className="services-page__title-col">
          <LetterTitle className="services-page__heading" text="SERVICES" delay={0.4} />
        </div>
      </section>

      <div className="services-page__ticker" ref={tickerRef} aria-hidden>
        <div className="services-page__ticker-viewport">
          <div className="services-page__ticker-track">
            {[0, 1, 2].map((copy) => (
              <div key={copy} className="services-page__ticker-seq">
                {TICKER.map((word) => (
                  <span key={`${copy}-${word}`} className="services-page__ticker-item">
                    <Tick />
                    {word}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="services-page__list" aria-label="Services">
        {SERVICES.map((s) => (
          <article key={s.id} className="svc-row sda-card">
            <div className="svc-row__title">
              <span className="svc-row__num">{s.id}</span>
              <h2>{s.title}</h2>
            </div>
            <div className="svc-row__copy">
              <p>{s.detail}</p>
              <div className="svc-row__tags">
                {s.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
            <div className="svc-row__art">
              <img src={ICONS[s.id] ?? s.icon} alt="" />
            </div>
          </article>
        ))}
      </section>

      <style>{`
        .services-page {
          background: var(--color-bg);
        }
        .services-page__hero {
          position: relative;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          align-items: stretch;
          min-height: min(56vh, 520px);
          height: min(56vh, 520px);
          border-left: 1px solid var(--color-border);
          border-right: 1px solid var(--color-border);
          border-bottom: 1px solid var(--color-border);
          overflow: visible;
        }
        .services-page__char-col {
          position: relative;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: 20px 12px 0;
          min-height: 0;
          height: 100%;
          border-right: 1px solid var(--color-border);
          overflow: hidden;
        }
        .services-page__speech {
          position: absolute;
          top: 12%;
          right: 8%;
          left: auto;
          z-index: 3;
          max-width: min(240px, 70%);
          padding: 12px 16px;
          border-radius: 18px;
          background: #f2f2f2;
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.08);
        }
        .services-page__speech::after {
          content: '';
          position: absolute;
          left: 22px;
          bottom: -8px;
          width: 16px;
          height: 16px;
          background: #f2f2f2;
          border-radius: 3px;
          transform: rotate(45deg);
        }
        .services-page__speech span {
          position: relative;
          z-index: 1;
          display: block;
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 600;
          letter-spacing: -0.02em;
          line-height: 1.35;
          color: #111;
        }
        [data-theme='dark'] .services-page__speech,
        [data-theme='dark'] .services-page__speech::after {
          background: var(--color-muted);
        }
        [data-theme='dark'] .services-page__speech span {
          color: var(--color-fg);
        }
        .services-page__char {
          display: block;
          width: auto;
          height: 100%;
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          object-position: center bottom;
          user-select: none;
          -webkit-user-drag: none;
        }
        .services-page__title-col {
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          padding: 56px 32px 20px 28px;
          min-width: 0;
        }
        .services-page__heading {
          margin: 0;
          font-family: var(--font-section);
          font-size: clamp(72px, 10.5vw, 128px);
          font-weight: 700;
          line-height: 0.82;
          letter-spacing: -0.05em;
          color: var(--color-fg);
          white-space: nowrap;
        }
        .services-page__ticker {
          border-left: 1px solid var(--color-border);
          border-right: 1px solid var(--color-border);
          border-bottom: 1px solid var(--color-border);
          overflow: hidden;
        }
        .services-page__ticker-viewport {
          overflow: hidden;
        }
        .services-page__ticker-track {
          display: flex;
          width: max-content;
          will-change: transform;
        }
        .services-page__ticker-seq {
          display: flex;
          flex-shrink: 0;
          align-items: center;
        }
        .services-page__ticker-item {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 28px 16px 8px;
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 600;
          letter-spacing: -0.02em;
          color: var(--color-muted-fg);
          white-space: nowrap;
        }
        .services-page__tick {
          color: var(--color-accent);
          font-size: 11px;
        }
        .services-page__list {
          border-left: 1px solid var(--color-border);
          border-right: 1px solid var(--color-border);
        }
        .svc-row {
          display: grid;
          grid-template-columns: minmax(180px, 0.7fr) minmax(0, 1.15fr) minmax(140px, 0.55fr);
          gap: 24px;
          align-items: center;
          padding: 36px 32px;
          border-bottom: 1px solid var(--color-border);
        }
        .svc-row__num {
          display: block;
          font-family: var(--font-section);
          font-size: 18px;
          font-weight: 600;
          color: var(--color-fg);
          margin-bottom: 4px;
        }
        .svc-row__title h2 {
          margin: 0;
          font-family: var(--font-section);
          font-size: clamp(28px, 3.4vw, 44px);
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1;
        }
        .svc-row__copy p {
          margin: 0 0 16px;
          max-width: 46ch;
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 500;
          line-height: 1.6;
          letter-spacing: -0.02em;
          color: #616161;
        }
        [data-theme='dark'] .svc-row__copy p {
          color: var(--color-muted-fg);
        }
        .svc-row__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .svc-row__tags span {
          display: inline-flex;
          align-items: center;
          height: 32px;
          padding: 0 12px;
          border-radius: 999px;
          background: #f2f2f2;
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 600;
          color: var(--color-fg);
        }
        [data-theme='dark'] .svc-row__tags span {
          background: var(--color-muted);
        }
        .svc-row__art {
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }
        .svc-row__art img {
          width: min(180px, 100%);
          height: auto;
          max-height: 160px;
          object-fit: contain;
          filter: hue-rotate(20deg) saturate(0.62) brightness(0.72);
        }
        @media (max-width: 809px) {
          .services-page__hero {
            grid-template-columns: 1fr;
            height: auto;
            min-height: 0;
          }
          .services-page__char-col {
            height: 300px;
            border-right: none;
            border-bottom: 1px solid var(--color-border);
            order: 2;
          }
          .services-page__title-col {
            padding: 40px 20px 16px;
            order: 1;
          }
          .svc-row {
            grid-template-columns: 1fr;
            padding: 28px 20px;
          }
          .svc-row__art {
            justify-content: flex-start;
          }
        }
      `}</style>
    </div>
  )
}
