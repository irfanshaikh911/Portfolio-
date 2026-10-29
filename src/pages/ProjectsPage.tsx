import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { motion, useReducedMotion } from 'motion/react'
import { usePageReveals } from '../hooks/usePageReveals'
import { LetterTitle } from '../components/motion/LetterTitle'
import projectsHero from '../assets/images/character/projects-hero.png'
import { PROJECTS } from '../data/content'
import { ProjectGridCard, projectGridCardStyles } from '../components/ProjectGridCard'

const TICKER = [
  'senior level quality',
  'Fast execution',
  'System thinking',
  'Clear process',
  'On-brand, every time',
  'Smooth handoff',
  'Thoughtful feedback',
  'Reliable partner',
]

const ease = [0.22, 1, 0.36, 1] as const

function Tick() {
  return (
    <span className="projects-page__tick" aria-hidden>
      ✦
    </span>
  )
}

export function ProjectsPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const tickerRef = useRef<HTMLDivElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  const reduce = useReducedMotion()
  usePageReveals(pageRef)

  useEffect(() => {
    const root = tickerRef.current
    if (!root) return
    const track = root.querySelector<HTMLElement>('.projects-page__ticker-track')
    const seq = root.querySelector<HTMLElement>('.projects-page__ticker-seq')
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
    <div className="projects-page" ref={pageRef}>
      <section className="projects-page__hero">
        <span className="grid-star grid-star--tl" aria-hidden>
          ✦
        </span>
        <span className="grid-star grid-star--tr" aria-hidden>
          ✦
        </span>
        <div className="projects-page__title-col">
          <LetterTitle className="projects-page__heading" text="PROJECTS" delay={0.4} />
        </div>
        <div className="projects-page__char-col">
          <motion.div
            className="projects-page__speech"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3, ease }}
          >
            <span>Take a Look at My Portfolio</span>
          </motion.div>
          <motion.img
            src={projectsHero}
            alt=""
            className="projects-page__char"
            initial={reduce ? false : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5, ease }}
          />
        </div>
      </section>

      <div className="projects-page__ticker" ref={tickerRef} aria-hidden>
        <div className="projects-page__ticker-viewport">
          <div className="projects-page__ticker-track">
            {[0, 1, 2].map((copy) => (
              <div key={copy} className="projects-page__ticker-seq">
                {TICKER.map((word) => (
                  <span key={`${copy}-${word}`} className="projects-page__ticker-item">
                    <Tick />
                    {word}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="projects-page__grid" aria-label="All projects">
        {PROJECTS.map((p) => (
          <ProjectGridCard key={p.id} project={p} />
        ))}
      </section>

      <style>{`
        ${projectGridCardStyles}
        .projects-page {
          background: var(--color-bg);
        }
        .projects-page__hero {
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
        .projects-page__title-col {
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          padding: 56px 24px 20px 32px;
          border-right: 1px solid var(--color-border);
          min-width: 0;
        }
        .projects-page__heading {
          margin: 0;
          font-family: var(--font-section);
          font-size: clamp(72px, 10.5vw, 128px);
          font-weight: 700;
          line-height: 0.82;
          letter-spacing: -0.05em;
          color: var(--color-fg);
          white-space: nowrap;
        }
        .projects-page__char-col {
          position: relative;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: 20px 20px 0;
          min-height: 0;
          height: 100%;
          overflow: hidden;
        }
        .projects-page__speech {
          position: absolute;
          top: 14%;
          left: auto;
          right: 8%;
          z-index: 3;
          max-width: min(240px, 70%);
          padding: 12px 16px;
          border-radius: 18px;
          background: #f2f2f2;
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.08);
        }
        .projects-page__speech::after {
          content: '';
          position: absolute;
          left: 28px;
          right: auto;
          bottom: -8px;
          width: 16px;
          height: 16px;
          background: #f2f2f2;
          border-radius: 3px;
          transform: rotate(45deg);
        }
        .projects-page__speech span {
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
        [data-theme='dark'] .projects-page__speech,
        [data-theme='dark'] .projects-page__speech::after {
          background: var(--color-muted);
        }
        [data-theme='dark'] .projects-page__speech span {
          color: var(--color-fg);
        }
        .projects-page__char {
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
        .projects-page__ticker {
          border-left: 1px solid var(--color-border);
          border-right: 1px solid var(--color-border);
          border-bottom: 1px solid var(--color-border);
          overflow: hidden;
        }
        .projects-page__ticker-viewport {
          overflow: hidden;
        }
        .projects-page__ticker-track {
          display: flex;
          width: max-content;
          will-change: transform;
        }
        .projects-page__ticker-seq {
          display: flex;
          flex-shrink: 0;
          align-items: center;
        }
        .projects-page__ticker-item {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 28px 16px 8px;
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 600;
          letter-spacing: -0.02em;
          color: var(--color-fg);
          white-space: nowrap;
        }
        .projects-page__tick {
          color: var(--color-accent);
          font-size: 11px;
        }
        .projects-page__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px 28px;
          padding: 48px 28px 72px;
          border-left: 1px solid var(--color-border);
          border-right: 1px solid var(--color-border);
          border-bottom: 1px solid var(--color-border);
        }
        @media (max-width: 809px) {
          .projects-page__hero {
            grid-template-columns: 1fr;
            height: auto;
            min-height: 0;
          }
          .projects-page__title-col {
            border-right: none;
            border-bottom: 1px solid var(--color-border);
            padding: 40px 20px 16px;
          }
          .projects-page__char-col {
            height: 300px;
            padding: 8px 16px 0;
          }
          .projects-page__grid {
            grid-template-columns: 1fr;
            padding: 32px 20px 56px;
            gap: 32px;
          }
        }
      `}</style>
    </div>
  )
}
