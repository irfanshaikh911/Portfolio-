import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring } from 'motion/react'
import gsap from 'gsap'
import { PROJECTS } from '../data/content'

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  const [cursorOn, setCursorOn] = useState(false)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 380, damping: 32, mass: 0.35 })
  const y = useSpring(rawY, { stiffness: 380, damping: 32, mass: 0.35 })

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const track = section.querySelector<HTMLElement>('.projects__track')
    const seq = section.querySelector<HTMLElement>('.projects__seq')
    if (!track || !seq) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const setup = () => {
      const prevProgress = tweenRef.current?.progress()
      tweenRef.current?.kill()
      gsap.set(track, { x: 0 })

      // Exact width of one sequence = seamless loop distance
      const distance = seq.getBoundingClientRect().width
      if (distance <= 0) return

      tweenRef.current = gsap.to(track, {
        x: -distance,
        duration: Math.max(9, distance / 78),
        ease: 'none',
        repeat: -1,
      })
      tweenRef.current.progress(
        prevProgress != null && !Number.isNaN(prevProgress)
          ? prevProgress
          : Math.random() * 0.8 + 0.1,
      )
    }

    setup()
    // Recalc after images/layout settle
    const ro = new ResizeObserver(() => setup())
    ro.observe(seq)

    const onResize = () => setup()
    window.addEventListener('resize', onResize)

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', onResize)
      tweenRef.current?.kill()
      tweenRef.current = null
      gsap.set(track, { clearProps: 'transform' })
    }
  }, [])

  useEffect(() => {
    const tween = tweenRef.current
    if (!tween) return
    gsap.to(tween, {
      timeScale: cursorOn ? 1.85 : 1,
      duration: 0.45,
      ease: 'power2.out',
      overwrite: true,
    })
  }, [cursorOn])

  const onCardEnter = (e: PointerEvent) => {
    setCursorOn(true)
    rawX.set(e.clientX)
    rawY.set(e.clientY)
  }

  const onCardLeave = () => setCursorOn(false)

  const onCardMove = (e: PointerEvent) => {
    rawX.set(e.clientX)
    rawY.set(e.clientY)
  }

  const renderSeq = (copy: number, hidden: boolean) => (
    <div className="projects__seq" key={`seq-${copy}`} aria-hidden={hidden || undefined}>
      {PROJECTS.map((p) => (
        <div key={`${p.id}-${copy}`} className="project-cell">
          <Link
            to={`/projects/${p.id}`}
            className="project-card sda-card"
            onPointerEnter={onCardEnter}
            onPointerLeave={onCardLeave}
            onPointerMove={onCardMove}
          >
            <div className="project-card__media">
              <img
                src={p.image}
                alt={hidden ? '' : `${p.title} preview`}
                loading="lazy"
                draggable={false}
              />
              <h3 className="project-card__title">{p.title}</h3>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )

  return (
    <section id="projects" className="projects" ref={sectionRef}>
      <div className="projects__rail">
        <span className="grid-star grid-star--tl" aria-hidden>
          ✦
        </span>
        <span className="grid-star grid-star--tr" aria-hidden>
          ✦
        </span>
        <span className="grid-star grid-star--bl" aria-hidden>
          ✦
        </span>
        <span className="grid-star grid-star--br" aria-hidden>
          ✦
        </span>

        <div className="projects__head">
          <h2 className="display-section js-reveal-heading">PROJECTS</h2>
          <Link to="/projects" className="projects__view pill js-fade-up">
            View all projects
          </Link>
        </div>

        <div className="projects__viewport-wrap">
          <div className="projects__viewport">
            <div className="projects__track">
              {renderSeq(0, false)}
              {renderSeq(1, true)}
              {renderSeq(2, true)}
            </div>
          </div>
        </div>
      </div>

      <motion.div
        className="projects__cursor"
        aria-hidden
        style={{ x, y }}
        initial={false}
        animate={{
          opacity: cursorOn ? 1 : 0,
          scale: cursorOn ? 1 : 0.55,
        }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      >
        View
      </motion.div>

      <style>{`
        .projects {
          position: relative;
          padding: 0;
          overflow: visible;
        }
        .projects__rail {
          position: relative;
          width: 100%;
          margin-inline: 0;
          border-bottom: 0;
          background: var(--color-bg);
          box-sizing: border-box;
          overflow: visible;
        }
        .projects__rail .grid-star {
          position: absolute;
          font-size: 13px;
          line-height: 1;
          color: #000;
          z-index: 5;
          pointer-events: none;
          transform: translate(-50%, -50%);
        }
        [data-theme='dark'] .projects__rail .grid-star {
          color: #fff;
        }
        .projects__rail .grid-star--tl { top: 0; left: 0; }
        .projects__rail .grid-star--tr { top: 0; left: 100%; }
        .projects__rail .grid-star--bl { top: 100%; left: 0; }
        .projects__rail .grid-star--br { top: 100%; left: 100%; }

        .projects__head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          padding: clamp(2rem, 5vw, 3.5rem) clamp(1rem, 2.5vw, 2rem) clamp(1.5rem, 3vw, 2.25rem);
          border-top: 1px solid var(--color-border);
          border-left: 1px solid var(--color-border);
          border-right: 1px solid var(--color-border);
          box-sizing: border-box;
        }
        .projects__head .display-section {
          margin: 0;
          font-size: 80px;
          letter-spacing: -0.06em;
        }
        @media (max-width: 1199px) and (min-width: 810px) {
          .projects__head .display-section { font-size: 56px; }
        }
        @media (max-width: 809px) {
          .projects__head .display-section { font-size: 48px; }
        }
        .projects__view {
          display: inline-flex;
          align-items: center;
          padding: 0.7rem 1.25rem;
          font-size: 0.8125rem;
          font-weight: 500;
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.16);
          flex-shrink: 0;
        }
        .projects__view:hover {
          transform: translateY(-2px);
        }
        .projects__viewport-wrap {
          position: relative;
          width: 100%;
        }
        .projects__viewport {
          position: relative;
          width: 100vw;
          max-width: 100vw;
          left: 50%;
          margin-left: -50vw;
          overflow: hidden;
          border-top: 1px solid var(--color-border);
          border-bottom: 1px solid var(--color-border);
          box-sizing: border-box;
          background: var(--color-bg);
        }
        .projects__track {
          display: flex;
          width: max-content;
          will-change: transform;
          align-items: stretch;
        }
        .projects__seq {
          display: flex;
          flex-shrink: 0;
          align-items: stretch;
        }
        .project-cell {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          padding: clamp(1.25rem, 2.5vw, 2rem) 1.35rem;
          border-right: 1px solid var(--color-border);
          box-sizing: border-box;
          overflow: visible;
        }
        .project-card {
          display: block;
          width: min(86vw, 720px);
          flex-shrink: 0;
          border: 0;
          background: transparent;
          border-radius: 22px;
          overflow: hidden;
          cursor: pointer;
          box-shadow: none;
          color: inherit;
          text-decoration: none;
          transition: transform 0.45s var(--ease-out);
        }
        .project-card:hover {
          transform: translateY(-8px);
          box-shadow: none;
        }
        .project-card__media {
          position: relative;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          background: var(--color-muted);
          border-radius: 22px;
          box-shadow: none;
        }
        .project-card__media::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.72) 0%,
            rgba(0, 0, 0, 0.28) 42%,
            transparent 70%
          );
          pointer-events: none;
          z-index: 1;
        }
        .project-card__media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s var(--ease-out);
          pointer-events: none;
          box-shadow: none;
          filter: none;
        }
        .project-card:hover .project-card__media img {
          transform: scale(1.05);
        }
        .project-card__title {
          position: absolute;
          left: 1.15rem;
          right: 1.15rem;
          bottom: 1.1rem;
          z-index: 2;
          margin: 0;
          font-family: var(--font-display-condensed);
          font-size: clamp(1.35rem, 2.2vw, 1.85rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #fff;
          text-shadow: none;
          pointer-events: none;
        }

        .projects__cursor {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 80;
          width: 108px;
          height: 108px;
          /* Offset so the system hand pointer stays visible beside View */
          margin: -70px 0 0 14px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          pointer-events: none;
          color: #fff;
          font-family: var(--font-body);
          font-size: 1.05rem;
          font-weight: 500;
          letter-spacing: -0.01em;
          background: rgba(120, 120, 120, 0.38);
          backdrop-filter: blur(14px) saturate(1.15);
          -webkit-backdrop-filter: blur(14px) saturate(1.15);
          box-shadow:
            inset 0 0 0 1px rgba(255, 255, 255, 0.18),
            0 8px 28px rgba(0, 0, 0, 0.12);
        }

        @media (max-width: 900px) {
          .project-card {
            width: min(90vw, 560px);
          }
          .projects__cursor {
            display: none;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .projects__viewport {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
          }
          .projects__track {
            transform: none !important;
          }
          .projects__cursor {
            display: none;
          }
        }
      `}</style>
    </section>
  )
}
