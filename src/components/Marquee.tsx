import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useChatBooking } from './ChatBookingContext'

function ArrowBadge() {
  return (
    <span className="marquee__badge" aria-hidden>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
          d="M5 13L13 5M13 5H6.5M13 5V11.5"
          stroke="#fff"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

const ITEMS = Array.from({ length: 8 }, (_, i) => i)

export function Marquee() {
  const sectionRef = useRef<HTMLElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  const { openChat } = useChatBooking()

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const track = section.querySelector<HTMLElement>('.marquee__track')
    const seq = section.querySelector<HTMLElement>('.marquee__seq')
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
        duration: Math.max(12, distance / 90),
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
    <section className="marquee" ref={sectionRef}>
      <button type="button" className="marquee__link" onClick={openChat} aria-label="Start a project">
        <div className="marquee__viewport">
          <div className="marquee__track">
            <div className="marquee__seq">
              {ITEMS.map((i) => (
                <span key={`a-${i}`} className="marquee__item">
                  <span className="marquee__word">START A PROJECT</span>
                  <ArrowBadge />
                </span>
              ))}
            </div>
            <div className="marquee__seq" aria-hidden>
              {ITEMS.map((i) => (
                <span key={`b-${i}`} className="marquee__item">
                  <span className="marquee__word">START A PROJECT</span>
                  <ArrowBadge />
                </span>
              ))}
            </div>
          </div>
        </div>
      </button>

      <style>{`
        .marquee {
          position: relative;
          left: 50%;
          width: 100vw;
          max-width: 100vw;
          margin-left: -50vw;
          padding: 0;
          background: var(--color-bg);
          overflow: hidden;
          border-top: 1px solid rgba(224, 224, 224, 0.63);
          border-bottom: 1px solid rgba(224, 224, 224, 0.63);
          border-left: 0;
          border-right: 0;
        }
        .marquee__link {
          display: block;
          width: 100%;
          padding: 0;
          border: 0;
          background: none;
          cursor: pointer;
          text-align: inherit;
        }
        .marquee__viewport {
          position: relative;
          width: 100%;
          overflow: hidden;
          padding: 18px 0;
          box-sizing: border-box;
        }
        .marquee__track {
          display: flex;
          width: max-content;
          will-change: transform;
          align-items: center;
        }
        .marquee__seq {
          display: flex;
          flex-shrink: 0;
          align-items: center;
          gap: 28px;
          padding-right: 28px;
        }
        .marquee__item {
          display: inline-flex;
          align-items: center;
          gap: 28px;
          flex-shrink: 0;
        }
        .marquee__word {
          font-family: var(--font-section);
          font-size: clamp(42px, 8vw, 100px);
          font-weight: 600;
          line-height: 1.1em;
          letter-spacing: 0;
          color: var(--color-fg);
          white-space: nowrap;
        }
        .marquee__badge {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #000;
          display: grid;
          place-items: center;
          flex-shrink: 0;
        }
        [data-theme='dark'] .marquee__badge {
          background: #fff;
        }
        [data-theme='dark'] .marquee__badge svg path {
          stroke: #000;
        }
        .marquee__link:hover .marquee__word {
          color: var(--color-accent);
        }
        [data-accent='red'] .marquee__link:hover .marquee__word {
          color: var(--color-fg);
        }
        @media (max-width: 809px) {
          .marquee__badge {
            width: 32px;
            height: 32px;
          }
        }
      `}</style>
    </section>
  )
}
