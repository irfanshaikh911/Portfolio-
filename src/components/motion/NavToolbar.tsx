import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { animate, motion, useMotionValue, useReducedMotion } from 'motion/react'
import navAvatar from '../../assets/images/character/nav-avatar.png'
import { RollingText } from './RollingText'
import { useAccent } from '../../hooks/useAccent'
import { scrollPageToTop } from '../../lib/lenis'

/**
 * Pin rest is LEFT (flex-start). Only three stops:
 * projects: 0°   → left
 * home:     270° → bottom
 * services: 180° → right
 */
const PIN: Record<string, number> = {
  projects: 0,
  home: 270,
  services: 180,
}

function shortestDelta(from: number, to: number) {
  return ((((to - from) % 360) + 540) % 360) - 180
}

type Props = {
  active: string
  onNavigate?: (id: string) => void
}

function SuitcaseMark() {
  return (
    <svg className="nav-mark__icon" viewBox="0 0 24 24" width="22" height="22" aria-hidden>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M8.2 6.5V4.55C8.2 3.42 9.12 2.5 10.25 2.5h3.5c1.13 0 2.05.92 2.05 2.05V6.5h3.45c1.16 0 2.1.94 2.1 2.1v10.05c0 1.16-.94 2.1-2.1 2.1H4.75c-1.16 0-2.1-.94-2.1-2.1V8.6c0-1.16.94-2.1 2.1-2.1H8.2zm1.7-1.8c0-.08.07-.15.15-.15h3.9c.08 0 .15.07.15.15V6.5h-4.2V4.7zM10.55 12.05h2.9c.36 0 .65.29.65.65v1.85c0 .36-.29.65-.65.65h-2.9c-.36 0-.65-.29-.65-.65v-1.85c0-.36.29-.65.65-.65z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function SettingsToolMark() {
  return (
    <svg className="nav-mark__icon" viewBox="0 0 24 24" width="22" height="22" aria-hidden>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M11.2 1.45h1.6l.26 1.62c.46.13.9.34 1.28.61l1.46-.76 1.13 1.13-.76 1.46c.27.38.48.82.61 1.28l1.62.26v1.6l-1.62.26c-.13.46-.34.9-.61 1.28l.76 1.46-1.13 1.13-1.46-.76a5.2 5.2 0 01-1.28.61l-.26 1.62h-1.6l-.26-1.62a5.2 5.2 0 01-1.28-.61l-1.46.76-1.13-1.13.76-1.46a5.2 5.2 0 01-.61-1.28L2.8 9.85v-1.6l1.62-.26c.13-.46.34-.9.61-1.28l-.76-1.46 1.13-1.13 1.46.76c.38-.27.82-.48 1.28-.61L11.2 1.45zM12 5.2a2.7 2.7 0 100 5.4 2.7 2.7 0 000-5.4z"
        clipRule="evenodd"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M7.55 13.55v-1.2c0-.58.47-1.05 1.05-1.05h6.8c.58 0 1.05.47 1.05 1.05v1.2h2.8c.72 0 1.3.58 1.3 1.3v5.55c0 .72-.58 1.3-1.3 1.3H4.75c-.72 0-1.3-.58-1.3-1.3v-5.55c0-.72.58-1.3 1.3-1.3h2.8zm1.55-1.05v1.05h5.8v-1.05c0-.08-.07-.15-.15-.15H9.25c-.08 0-.15.07-.15.15z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export function NavToolbar({ active, onNavigate }: Props) {
  const reduceMotion = useReducedMotion()
  const navigate = useNavigate()
  const location = useLocation()
  const accent = useAccent()
  const onProjects = accent === 'red'
  const onServices = accent === 'green'
  const startAngle = location.pathname.startsWith('/projects')
    ? PIN.projects
    : location.pathname.startsWith('/services')
      ? PIN.services
      : PIN.home
  const [pinTarget, setPinTarget] = useState(active)
  const pinMv = useMotionValue(startAngle)
  const pinRef = useRef(startAngle)
  const first = useRef(true)

  useEffect(() => {
    setPinTarget(active)
  }, [active])

  useEffect(() => {
    const target = PIN[pinTarget]
    if (target == null) return
    if (first.current) {
      first.current = false
      pinMv.set(target)
      pinRef.current = target
      return
    }
    const next = pinRef.current + shortestDelta(pinRef.current, target)
    pinRef.current = next
    const anim = animate(pinMv, next, {
      type: 'spring',
      stiffness: 220,
      damping: 26,
      mass: 0.65,
    })
    return () => anim.stop()
  }, [pinTarget, pinMv])

  const go = (id: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setPinTarget(id)
    onNavigate?.(id)
    if (id === 'projects') navigate('/projects')
    else if (id === 'home') navigate('/')
    else navigate('/services')
    scrollPageToTop(true)
    requestAnimationFrame(() => scrollPageToTop(true))
  }

  return (
    <div className="nav-toolbar">
      <div className="nav-toolbar__row">
        <a
          href="/projects"
          className={`nav__link ${active === 'projects' ? 'is-active' : ''}`}
          onClick={go('projects')}
          aria-label="Projects"
        >
          <RollingText text="Projects" />
        </a>

        <div className="nav-mark">
          <a href="/" className="nav-mark__hit" aria-label="Home" onClick={go('home')}>
            <span
              className={`nav-mark__core ${onProjects ? 'nav-mark__core--bag' : ''} ${onServices ? 'nav-mark__core--tool' : ''}`}
            >
              {onServices ? (
                <SettingsToolMark />
              ) : onProjects ? (
                <SuitcaseMark />
              ) : (
                <img src={navAvatar} alt="" width={44} height={44} />
              )}
            </span>
          </a>

          <motion.span
            className="nav-mark__ring"
            aria-hidden
            animate={reduceMotion ? undefined : { rotate: 360 }}
            transition={
              reduceMotion
                ? undefined
                : {
                    duration: 14,
                    ease: 'linear',
                    repeat: Infinity,
                  }
            }
          >
            <svg viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                pathLength="36"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeDasharray="0 1"
              />
            </svg>
          </motion.span>

          <motion.div className="nav-mark__pin" style={{ rotate: pinMv }} aria-hidden>
            <span className="nav-mark__pin-dot" />
          </motion.div>
        </div>

        <a
          href="/services"
          className={`nav__link ${active === 'services' ? 'is-active' : ''}`}
          onClick={go('services')}
          aria-label="Services"
        >
          <RollingText text="Services" />
        </a>
      </div>

      <a
        href="/"
        className={`nav__home ${active === 'home' ? 'is-active' : ''}`}
        onClick={go('home')}
        aria-label="Home"
      >
        <RollingText text="Home" />
      </a>
    </div>
  )
}
