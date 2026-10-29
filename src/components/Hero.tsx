import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { Character } from './Character'
import { MagneticButton } from './MagneticButton'
import { TextEffect } from './motion/TextEffect'
import { useChatBooking } from './ChatBookingContext'
import { SITE } from '../data/content'
import { initHeroAnimations } from '../animations/heroAnimations'

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const rootRef = useRef<HTMLElement>(null)
  const { openChat } = useChatBooking()

  useEffect(() => {
    if (!rootRef.current) return
    const ctx = initHeroAnimations(rootRef.current)
    return () => ctx.revert()
  }, [])

  return (
    <section id="home" className="hero" ref={rootRef}>
      <div className="hero__frame">
        <span className="grid-star grid-star--tl" aria-hidden>
          ✦
        </span>
        <span className="grid-star grid-star--tr" aria-hidden>
          ✦
        </span>
        <div className="hero__masthead">
          <motion.div
            className="hero__pill-row"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3, ease }}
          >
            <span className="hero__pill">Hi, I&apos;m {SITE.firstName}</span>
          </motion.div>

          <h1 className="hero-title" data-hero="title" aria-label={SITE.title}>
            <motion.span
              className="hero-word hero-ai"
              initial={{ opacity: 0, x: -48 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease }}
            >
              AI
            </motion.span>

            <motion.div
              className="hero-character"
              data-hero="character"
              aria-hidden
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5, ease }}
            >
              <Character pose="hero" className="hero-character__asset" priority />
            </motion.div>

            <motion.span
              className="hero-word hero-engineer"
              initial={{ opacity: 0, x: 48 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.45, ease }}
            >
              ENGINEER
            </motion.span>
          </h1>
        </div>

        <TextEffect
          className="hero__intro"
          as="p"
          per="word"
          preset="premium"
          delay={0.75}
        >
          {SITE.introText}
        </TextEffect>

        <div className="hero__cta" data-hero="cta">
          <span className="grid-star grid-star--bl" aria-hidden>
            ✦
          </span>
          <span className="grid-star grid-star--br" aria-hidden>
            ✦
          </span>
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 1.55, ease }}
          >
            <MagneticButton type="button" variant="accent" className="hero__chat" onClick={openChat}>
              i Want to Chat
              <span className="hero__chat-dot" aria-hidden />
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      <style>{`
        .hero {
          padding: 0;
          overflow-x: clip;
        }

        .hero__frame {
          position: relative;
          width: 100%;
          margin-inline: 0;
          min-height: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          gap: clamp(1.1rem, 2.4vh, 1.75rem);
          padding:
            clamp(3.5rem, 9vh, 5.5rem)
            clamp(1rem, 2.5vw, 2rem)
            0;
          text-align: center;
          border-left: 1px solid var(--color-border);
          border-right: 1px solid var(--color-border);
          border-bottom: 1px solid var(--color-border);
          box-sizing: border-box;
          background: var(--color-bg);
        }

        .grid-star {
          position: absolute;
          font-size: 13px;
          line-height: 1;
          color: #000;
          opacity: 1;
          z-index: 5;
          pointer-events: none;
          transform: translate(-50%, -50%);
        }
        [data-theme='dark'] .grid-star {
          color: #fff;
        }
        .grid-star--tl { top: 0; left: 0; }
        .grid-star--tr { top: 0; left: 100%; }
        .grid-star--bl { top: 100%; left: 0; }
        .grid-star--br { top: 100%; left: 100%; }

        .hero__masthead {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          gap: clamp(1.35rem, 3vh, 2.25rem);
        }

        .hero__pill-row {
          position: relative;
          /* Span full frame width so the rule meets the side borders */
          width: calc(100% + 2 * clamp(1rem, 2.5vw, 2rem));
          margin-inline: calc(-1 * clamp(1rem, 2.5vw, 2rem));
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 3rem;
        }
        .hero__pill-row::before {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          top: 50%;
          height: 1px;
          background: var(--color-border);
          transform: translateY(-50%);
          z-index: 0;
        }

        .hero__pill {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          padding: 10px 18px;
          border-radius: 999px;
          background: var(--color-bg);
          color: var(--color-fg);
          font-size: 15px;
          font-weight: 700;
          margin: 0;
          flex-shrink: 0;
          border: 1px solid var(--color-border);
          /* Gap in the rule behind the pill */
          box-shadow: 0 0 0 14px var(--color-bg);
        }
        [data-theme='dark'] .hero__pill {
          background: var(--color-bg);
          border-color: var(--color-border);
          box-shadow: 0 0 0 14px var(--color-bg);
        }

        /*
          Equal side tracks pin the portrait on the page center.
          AI right-aligns in the left track; ENGINEER left-aligns in the right.
        */
        .hero-title {
          /* Framer preset w4ms7x: 125 / 90 / 82 */
          --hero-fs: 125px;
          width: 100%;
          margin-top: 1.75rem;
          margin-left: 0;
          margin-right: 0;
          padding-right: clamp(12rem, 30vw, 28rem);
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: flex-end;
          column-gap: 0.14em;
          font-size: var(--hero-fs);
          overflow: visible;
          line-height: 0;
        }

        .hero-word {
          min-width: 0;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 1em;
          line-height: 0.9em;
          letter-spacing: 0;
          text-transform: uppercase;
          color: var(--color-fg);
          white-space: nowrap;
        }

        .hero-ai {
          text-align: right;
          justify-self: stretch;
        }

        .hero-engineer {
          text-align: left;
          justify-self: stretch;
        }

        .hero-character {
          flex: 0 0 auto;
          position: relative;
          z-index: 2;
          width: 0.9em;
          height: 1.05em;
          overflow: visible;
          pointer-events: none;
        }
        .hero-character__asset,
        .hero-character .character {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: visible;
        }
        .hero-character__asset .character__img {
          position: absolute;
          left: 50%;
          bottom: 0;
          transform: translateX(-50%);
          display: block;
          width: auto;
          max-width: none;
          height: 1.32em;
          object-fit: contain;
          object-position: center bottom;
          mix-blend-mode: normal !important;
          filter: drop-shadow(0 10px 18px rgba(0, 0, 0, 0.14));
        }

        .hero__intro {
          margin: 0;
          font-size: clamp(1rem, 1.35vw, 1.125rem);
          line-height: 1.65;
          font-weight: 600;
          color: #555;
          max-width: 36rem;
          text-wrap: balance;
        }
        .hero__intro .text-effect__word {
          will-change: transform, opacity, filter;
        }
        [data-theme='dark'] .hero__intro {
          color: var(--color-muted-fg);
        }

        .hero__cta {
          position: relative;
          display: grid;
          place-items: center;
          width: calc(100% + 2 * clamp(1rem, 2.5vw, 2rem));
          margin: 0.35rem calc(-1 * clamp(1rem, 2.5vw, 2rem)) 0;
          padding: 52px clamp(1rem, 2.5vw, 2rem);
          border-top: 1px solid var(--color-border);
          box-sizing: border-box;
        }
        .hero__chat {
          height: 52px;
          padding: 0 28px !important;
          font-size: 0.9375rem;
          font-weight: 700;
          gap: 0.7rem;
          background: #08b5d1 !important;
          color: #fff !important;
          box-shadow:
            0 10px 22px rgba(8, 181, 209, 0.4),
            0 22px 48px rgba(8, 181, 209, 0.48),
            0 40px 80px rgba(8, 181, 209, 0.28) !important;
          transition: transform 0.3s var(--ease-out), box-shadow 0.3s var(--ease-out);
        }
        .hero__chat:hover {
          transform: translateY(-3px);
          box-shadow:
            0 14px 28px rgba(8, 181, 209, 0.46),
            0 28px 58px rgba(8, 181, 209, 0.55),
            0 48px 96px rgba(8, 181, 209, 0.32) !important;
        }
        .hero__chat:hover .hero__chat-dot {
          transform: translateX(4px);
        }
        .hero__chat-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #fff;
          flex-shrink: 0;
          transition: transform 0.3s var(--ease-out);
        }

        @media (max-width: 1199px) and (min-width: 810px) {
          .hero-title {
            --hero-fs: 90px;
          }
        }

        @media (max-width: 809px) {
          .hero__frame {
            width: 100%;
            min-height: auto;
            padding: 3rem 1rem 0;
            gap: 1.15rem;
          }
          .hero__cta {
            width: calc(100% + 2rem);
            margin: 0.2rem -1rem 0;
            padding: 40px 1rem;
          }
          .hero__pill {
            font-size: 14px;
          }
          .hero-ai,
          .hero-engineer {
            text-align: center;
          }
          .hero-title {
            --hero-fs: 82px;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            margin-top: 1.25rem;
            margin-left: 0;
            margin-right: 0;
            padding-right: 0;
            gap: 0.35rem;
          }
          .hero-character {
            width: 0.95em;
            height: 1.05em;
            order: 2;
          }
          .hero-character__asset .character__img {
            height: 1.28em;
          }
          .hero-engineer {
            order: 3;
          }
          .hero__intro {
            font-size: 0.9375rem;
            max-width: 22rem;
          }
        }
      `}</style>
    </section>
  )
}
