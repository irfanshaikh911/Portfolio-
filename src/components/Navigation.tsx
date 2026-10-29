import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'motion/react'
import { MagneticButton } from './MagneticButton'
import { SocialIcons } from './SocialIcons'
import { ThemeToggle } from './ThemeToggle'
import { NavToolbar } from './motion/NavToolbar'
import { useChatBooking } from './ChatBookingContext'

type Props = {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

const ease = [0.22, 1, 0.36, 1] as const

export function Navigation({ theme, onToggleTheme }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const { openChat } = useChatBooking()
  const { pathname } = useLocation()
  const active = pathname.startsWith('/projects')
    ? 'projects'
    : pathname.startsWith('/services')
      ? 'services'
      : 'home'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      className={`nav ${scrolled ? 'is-scrolled' : ''}`}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
    >
      <div className="nav__rail">
        <div className="nav__inner">
          <div className="nav__left">
            <MagneticButton type="button" className="nav__chat" onClick={openChat}>
              i Want to Chat
              <span className="dot dot--white" aria-hidden />
            </MagneticButton>
            <SocialIcons className="nav__socials" />
          </div>

          <div className="nav__center">
            <NavToolbar active={active} />
          </div>

          <div className="nav__right">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          </div>
        </div>
      </div>

      <style>{`
        .nav {
          position: sticky;
          top: 0;
          z-index: 100;
          background: color-mix(in srgb, var(--color-bg) 94%, transparent);
          backdrop-filter: blur(10px);
          width: 100%;
        }
        .nav__rail {
          position: relative;
          width: 100%;
          margin-inline: 0;
          border-top: 1px solid var(--color-border);
          border-bottom: 1px solid var(--color-border);
          border-left: 1px solid var(--color-border);
          border-right: 1px solid var(--color-border);
          background: var(--color-bg);
          overflow: visible;
          box-sizing: border-box;
        }

        .nav__inner {
          height: var(--nav-h);
          width: 100%;
          padding-inline: clamp(0.75rem, 2vw, 1.5rem);
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
          align-items: center;
          gap: 0.75rem;
          box-sizing: border-box;
        }
        .nav__left,
        .nav__right {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          min-width: 0;
        }
        .nav__right {
          justify-content: flex-end;
        }
        .nav__center {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          overflow: visible;
        }

        .nav-toolbar {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          padding-bottom: 0;
          overflow: visible;
        }
        .nav-toolbar__row {
          display: flex;
          align-items: center;
          gap: 1.35rem;
        }

        .nav-mark {
          position: relative;
          width: 44px;
          height: 44px;
          display: grid;
          place-items: center;
          flex-shrink: 0;
          z-index: 2;
          overflow: visible;
        }
        .nav-mark__hit {
          position: relative;
          z-index: 2;
          display: grid;
          place-items: center;
          border-radius: 50%;
          width: 44px;
          height: 44px;
        }
        .nav-mark__core {
          position: relative;
          z-index: 2;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          overflow: hidden;
          background: #0a0a0a;
          box-shadow: 0 0 0 2px var(--color-accent);
        }
        .nav-mark__core img,
        .nav-mark__core svg {
          position: absolute;
          left: 50%;
          top: 46%;
          width: 118%;
          height: 118%;
          max-width: none;
          display: block;
          object-fit: cover;
          object-position: center 18%;
          transform: translate(-50%, -50%);
        }
        [data-accent='red'] .nav-mark__core,
        [data-accent='green'] .nav-mark__core {
          background: var(--color-accent);
          box-shadow: none;
        }
        .nav-mark__core--bag,
        .nav-mark__core--tool {
          display: grid;
          place-items: center;
          color: #111;
        }
        .nav-mark__core--bag svg,
        .nav-mark__core--tool svg,
        .nav-mark__icon {
          position: static;
          left: auto;
          top: auto;
          width: 22px;
          height: 22px;
          transform: none;
          object-fit: unset;
        }
        [data-theme='dark'] .nav-mark__core--bag,
        [data-theme='dark'] .nav-mark__core--tool {
          color: #111;
        }
        /* Full dotted ring around the portrait */
        .nav-mark__ring {
          position: absolute;
          inset: -6px;
          z-index: 1;
          pointer-events: none;
          color: var(--color-accent);
          will-change: transform;
        }
        .nav-mark__ring svg {
          width: 100%;
          height: 100%;
          display: block;
        }
        /* Pin on a separate outer orbit, next to the dotted ring */
        .nav-mark__pin {
          position: absolute;
          inset: -13px;
          z-index: 3;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          pointer-events: none;
          will-change: transform;
          transform-origin: center center;
        }
        .nav-mark__pin-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--color-accent);
          box-shadow: 0 0 0 2px var(--color-bg);
          flex-shrink: 0;
          margin-left: -3.5px;
        }

        .nav__link {
          font-family: var(--font-nav);
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0;
          line-height: 1.2;
          color: var(--color-muted-fg);
          transition: color 0.2s ease;
          display: inline-flex;
        }
        .nav__link:hover,
        .nav__link.is-active {
          color: var(--color-accent);
        }

        /* Home sits under the mark; space is at the pin/dot above it */
        .nav__home {
          position: absolute;
          left: 50%;
          top: calc(100% + 2px);
          transform: translateX(-50%);
          z-index: 20;
          font-family: var(--font-nav);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0;
          color: var(--color-muted-fg);
          background: none;
          padding: 3px 0.5rem 0;
          line-height: 1.2;
          white-space: nowrap;
          transition: color 0.2s ease;
          pointer-events: auto;
          cursor: pointer;
          display: inline-flex;
        }
        .nav__home.is-active,
        .nav__home:hover {
          color: var(--color-accent);
        }

        /* Counter-style letter reel — no extra letter gaps */
        .rolling-text {
          display: inline-flex;
          align-items: baseline;
          letter-spacing: 0;
          gap: 0;
        }
        .rolling-text__cell {
          position: relative;
          display: inline-block;
          overflow: hidden;
          height: 1.15em;
          line-height: 1.15em;
          letter-spacing: 0;
          margin: 0;
          padding: 0;
        }
        .rolling-text__measure {
          display: block;
          visibility: hidden;
          height: 1.15em;
          line-height: 1.15em;
          letter-spacing: 0;
        }
        .rolling-text__stack {
          position: absolute;
          top: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          will-change: transform;
        }
        .rolling-text__glyph {
          display: block;
          height: 1.15em;
          line-height: 1.15em;
          text-align: center;
        }
        @media (prefers-reduced-motion: reduce) {
          .rolling-text__stack {
            transform: none !important;
          }
        }

        .nav__chat {
          padding: 0.7rem 1.55rem;
          min-width: 11.5rem;
          justify-content: center;
          font-size: 0.8125rem;
          font-weight: 700;
          gap: 0.55rem;
          box-shadow: var(--shadow-cta) !important;
          outline: none;
          white-space: nowrap;
        }
        .dot--white {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #fff;
          flex-shrink: 0;
        }

        @media (max-width: 960px) {
          .nav__socials { display: none; }
          .nav__rail {
            width: 100%;
          }
        }
        @media (max-width: 720px) {
          .nav__link { display: none; }
          .nav__chat {
            padding: 0.55rem 1.2rem;
            min-width: 9.5rem;
            font-size: 0.75rem;
          }
          .nav-mark {
            width: 44px;
            height: 44px;
          }
          .nav-mark__hit,
          .nav-mark__core {
            width: 44px;
            height: 44px;
          }
        }
      `}</style>
    </motion.header>
  )
}
