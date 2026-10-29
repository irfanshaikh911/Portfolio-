import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import heroPortrait from '../assets/images/character/hero-portrait.png'
import { SITE } from '../data/content'
import { startLenis, stopLenis } from '../lib/lenis'

type Step = 'pick' | 'details' | 'done'

type Props = {
  open: boolean
  onClose: () => void
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const SLOT_HOURS = [13, 14, 15, 16, 17, 18]

function startOfDay(d: Date) {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function isAvailableDay(day: Date, today: Date) {
  const t = startOfDay(today).getTime()
  const d = startOfDay(day).getTime()
  return d >= t
}

function formatMonth(d: Date) {
  return d.toLocaleString('en-US', { month: 'long', year: 'numeric' })
}

function formatDayHeader(d: Date) {
  const day = d.getDate()
  const suffix =
    day % 10 === 1 && day !== 11
      ? 'st'
      : day % 10 === 2 && day !== 12
        ? 'nd'
        : day % 10 === 3 && day !== 13
          ? 'rd'
          : 'th'
  return `${d.toLocaleString('en-US', { weekday: 'short' })} ${day}${suffix}`
}

function formatLongDate(d: Date) {
  return d.toLocaleString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function formatTime(h: number, m: number, mode24: boolean) {
  if (mode24) return `${pad(h)}:${pad(m)}`
  const ampm = h >= 12 ? 'PM' : 'AM'
  const hr = h % 12 || 12
  return `${hr}:${pad(m)} ${ampm}`
}

function buildSlots(mode24: boolean) {
  const slots: { label: string; minutes: number }[] = []
  for (const h of SLOT_HOURS) {
    for (const m of [0, 30]) {
      if (h === 18 && m === 30) continue
      slots.push({ label: formatTime(h, m, mode24), minutes: h * 60 + m })
    }
  }
  return slots
}

export function ChatBookingModal({ open, onClose }: Props) {
  const today = useMemo(() => startOfDay(new Date()), [])
  const [step, setStep] = useState<Step>('pick')
  const [cursor, setCursor] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1))
  const [selected, setSelected] = useState<Date>(() => today)
  const [timeLabel, setTimeLabel] = useState<string | null>(null)
  const [timeMinutes, setTimeMinutes] = useState<number | null>(null)
  const [mode24, setMode24] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [notes, setNotes] = useState('')
  const slotsCleanup = useRef<(() => void) | null>(null)

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    stopLenis()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    // Block page wheel while modal is open (Lenis + native)
    const onDocWheel = (e: WheelEvent) => {
      const t = e.target as HTMLElement | null
      if (t?.closest?.('.booking__slots')) return
      e.preventDefault()
    }
    window.addEventListener('keydown', onKey)
    document.addEventListener('wheel', onDocWheel, { passive: false })
    return () => {
      document.body.style.overflow = prev
      startLenis()
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('wheel', onDocWheel)
      slotsCleanup.current?.()
      slotsCleanup.current = null
    }
  }, [open, onClose])

  const bindSlotsScroll = (el: HTMLDivElement | null) => {
    slotsCleanup.current?.()
    slotsCleanup.current = null
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      e.stopPropagation()
      el.scrollTop += e.deltaY
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    slotsCleanup.current = () => el.removeEventListener('wheel', onWheel)
  }

  useEffect(() => {
    if (!open) return
    setStep('pick')
    setTimeLabel(null)
    setTimeMinutes(null)
    setName('')
    setEmail('')
    setNotes('')
    setSelected(today)
    setCursor(new Date(today.getFullYear(), today.getMonth(), 1))
  }, [open, today])

  const slots = useMemo(() => buildSlots(mode24), [mode24])

  const calendarDays = useMemo(() => {
    const year = cursor.getFullYear()
    const month = cursor.getMonth()
    const first = new Date(year, month, 1)
    const startPad = first.getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const cells: (Date | null)[] = []
    for (let i = 0; i < startPad; i++) cells.push(null)
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d))
    while (cells.length % 7 !== 0) cells.push(null)
    return cells
  }, [cursor])

  const endLabel = useMemo(() => {
    if (timeMinutes == null) return ''
    const end = timeMinutes + 30
    const h = Math.floor(end / 60)
    const m = end % 60
    return formatTime(h, m, mode24)
  }, [timeMinutes, mode24])

  const onPickTime = (label: string, minutes: number) => {
    setTimeLabel(label)
    setTimeMinutes(minutes)
    setStep('details')
  }

  const onConfirm = (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return
    setStep('done')
  }

  const resetAndClose = () => {
    onClose()
  }

  return (
    <>
    <AnimatePresence>
      {open && (
        <motion.div
          className="booking"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button type="button" className="booking__backdrop" aria-label="Close" onClick={onClose} />

          <motion.div
            className="booking__stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <motion.button
              type="button"
              className="booking__close"
              onClick={onClose}
              aria-label="Close dialog"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ delay: 0.22, duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              ×
            </motion.button>

            <motion.div
              className="booking__reveal"
              initial={{ clipPath: 'circle(0% at 50% 50%)', scale: 0.35 }}
              animate={{ clipPath: 'circle(150% at 50% 50%)', scale: 1 }}
              exit={{ clipPath: 'circle(0% at 50% 50%)', scale: 0.35 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: '50% 50%' }}
            >
            <div
              className={`booking__panel booking__panel--${step}`}
              role="dialog"
              aria-modal="true"
              aria-label="Book a chat"
            >
            {step === 'pick' && (
              <>
                <aside className="booking__info">
                  <img className="booking__avatar" src={heroPortrait} alt="" width={44} height={44} />
                  <p className="booking__host">{SITE.name}</p>
                  <h2 className="booking__title">30 min meeting</h2>
                  <p className="booking__desc">
                    I&apos;m {SITE.name}, an AI engineer who builds intelligent products. Pick a date
                    and time to chat about your project.
                  </p>
                  <ul className="booking__meta">
                    <li>
                      <ClockIcon /> 30m
                    </li>
                    <li>
                      <VideoIcon /> Cal Video
                    </li>
                    <li>
                      <GlobeIcon /> Asia/Kolkata
                    </li>
                  </ul>
                </aside>

                <section className="booking__calendar">
                  <div className="booking__cal-head">
                    <button
                      type="button"
                      className="booking__nav-btn"
                      aria-label="Previous month"
                      onClick={() =>
                        setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))
                      }
                    >
                      ‹
                    </button>
                    <h3>{formatMonth(cursor)}</h3>
                    <button
                      type="button"
                      className="booking__nav-btn"
                      aria-label="Next month"
                      onClick={() =>
                        setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))
                      }
                    >
                      ›
                    </button>
                  </div>
                  <div className="booking__weekdays">
                    {WEEKDAYS.map((d) => (
                      <span key={d}>{d}</span>
                    ))}
                  </div>
                  <div className="booking__grid">
                    {calendarDays.map((day, i) => {
                      if (!day) return <span key={`e-${i}`} className="booking__day is-empty" />
                      const available = isAvailableDay(day, today)
                      const isSelected = sameDay(day, selected)
                      const isPast = startOfDay(day).getTime() < today.getTime()
                      return (
                        <button
                          key={day.toISOString()}
                          type="button"
                          disabled={isPast}
                          className={[
                            'booking__day',
                            available && !isPast ? 'is-available' : '',
                            isSelected ? 'is-selected' : '',
                            isPast ? 'is-past' : '',
                          ]
                            .filter(Boolean)
                            .join(' ')}
                          onClick={() => {
                            setSelected(day)
                            setTimeLabel(null)
                            setTimeMinutes(null)
                          }}
                        >
                          {day.getDate()}
                        </button>
                      )
                    })}
                  </div>
                </section>

                <section className="booking__times">
                  <div className="booking__times-head">
                    <h3>{formatDayHeader(selected)}</h3>
                    <div className="booking__toggle" role="group" aria-label="Time format">
                      <button
                        type="button"
                        className={!mode24 ? 'is-on' : ''}
                        onClick={() => setMode24(false)}
                      >
                        12h
                      </button>
                      <button
                        type="button"
                        className={mode24 ? 'is-on' : ''}
                        onClick={() => setMode24(true)}
                      >
                        24h
                      </button>
                    </div>
                  </div>
                  <div
                    ref={bindSlotsScroll}
                    className="booking__slots"
                    data-lenis-prevent
                  >
                    {slots.map((s) => (
                      <button
                        key={s.minutes}
                        type="button"
                        className={`booking__slot ${timeMinutes === s.minutes ? 'is-selected' : ''}`}
                        onClick={() => onPickTime(s.label, s.minutes)}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </section>
              </>
            )}

            {step === 'details' && (
              <>
                <aside className="booking__info">
                  <img className="booking__avatar" src={heroPortrait} alt="" width={44} height={44} />
                  <p className="booking__host">{SITE.name}</p>
                  <h2 className="booking__title">30 min meeting</h2>
                  <p className="booking__desc">
                    I&apos;m {SITE.name}, an AI engineer who builds intelligent products. Pick a date
                    and time to chat about your project.
                  </p>
                  <ul className="booking__meta">
                    <li>
                      <CalIcon />
                      {formatLongDate(selected)}
                      {timeLabel ? `, ${timeLabel} – ${endLabel}` : ''}
                    </li>
                    <li>
                      <ClockIcon /> 30m
                    </li>
                    <li>
                      <VideoIcon /> Cal Video
                    </li>
                    <li>
                      <GlobeIcon /> Asia/Kolkata
                    </li>
                  </ul>
                </aside>

                <form className="booking__form" onSubmit={onConfirm}>
                  <label className="booking__field">
                    <span>Your name *</span>
                    <input
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                    />
                  </label>
                  <label className="booking__field">
                    <span>Email address *</span>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                    />
                  </label>
                  <label className="booking__field">
                    <span>Additional notes</span>
                    <textarea
                      rows={4}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Please share anything that will help prepare for our meeting."
                    />
                  </label>
                  <button type="button" className="booking__guests" disabled>
                    + Add guests
                  </button>
                  <p className="booking__legal">
                    By proceeding, you agree to our scheduling terms and privacy policy.
                  </p>
                  <div className="booking__form-actions">
                    <button type="button" className="booking__back" onClick={() => setStep('pick')}>
                      Back
                    </button>
                    <button type="submit" className="booking__confirm">
                      Confirm
                    </button>
                  </div>
                </form>
              </>
            )}

            {step === 'done' && (
              <div className="booking__success">
                <div className="booking__success-icon" aria-hidden>
                  ✓
                </div>
                <h2>Meeting scheduled</h2>
                <p>
                  Thanks{name.trim() ? `, ${name.trim().split(' ')[0]}` : ''}! Your 30 min chat with{' '}
                  {SITE.name} is confirmed.
                </p>
                <div className="booking__success-card">
                  <p>
                    <strong>{formatLongDate(selected)}</strong>
                  </p>
                  <p>
                    {timeLabel} – {endLabel} · Asia/Kolkata
                  </p>
                  <p className="booking__success-email">A confirmation was sent to {email}</p>
                </div>
                <button type="button" className="booking__confirm" onClick={resetAndClose}>
                  Done
                </button>
              </div>
            )}
            </div>
            </motion.div>
          </motion.div>

          <p className="booking__brand">Cal.com</p>
        </motion.div>
      )}
    </AnimatePresence>

      <style>{`
        .booking {
          position: fixed;
          inset: 0;
          z-index: 2000;
          display: grid;
          place-items: center;
          padding: 1.25rem;
        }
        .booking__backdrop {
          position: absolute;
          inset: 0;
          border: 0;
          background: rgba(20, 20, 20, 0.55);
          backdrop-filter: blur(6px);
          cursor: pointer;
        }
        .booking__stage {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          width: min(1100px, calc(100vw - 2rem));
          max-width: 100%;
        }
        .booking__reveal {
          width: 100%;
          overflow: hidden;
          border-radius: 12px;
          will-change: clip-path, transform;
        }
        .booking__close {
          position: relative;
          top: auto;
          left: auto;
          transform: none;
          z-index: 3;
          flex-shrink: 0;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 0;
          background: #111;
          color: #fff;
          font-size: 1.5rem;
          line-height: 1;
          cursor: pointer;
          display: grid;
          place-items: center;
        }
        .booking__panel {
          position: relative;
          z-index: 2;
          width: 100%;
          max-height: min(86vh, 720px);
          overflow: hidden;
          background: #fff;
          color: #111;
          border-radius: 12px;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.28);
          display: grid;
        }
        .booking__panel--pick {
          grid-template-columns: 1.05fr 1.35fr 0.95fr;
          align-items: start;
        }
        .booking__panel--details {
          grid-template-columns: 1fr 1.15fr;
          overflow: auto;
        }
        .booking__panel--done {
          grid-template-columns: 1fr;
          max-width: 440px;
          overflow: auto;
        }

        .booking__info,
        .booking__calendar,
        .booking__times {
          min-width: 0;
          min-height: 0;
        }
        .booking__info {
          padding: 1.5rem 1.35rem;
          border-right: 1px solid #eee;
          overflow-y: auto;
        }
        .booking__avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          object-fit: cover;
          object-position: 50% 18%;
          background: var(--color-cta);
        }
        .booking__host {
          margin: 0.65rem 0 0.2rem;
          font-size: 0.9rem;
          color: #666;
        }
        .booking__title {
          margin: 0 0 0.65rem;
          font-size: 1.45rem;
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.2;
        }
        .booking__desc {
          margin: 0 0 1.1rem;
          font-size: 0.9rem;
          line-height: 1.5;
          color: #555;
        }
        .booking__meta {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: 0.65rem;
          font-size: 0.875rem;
          color: #333;
        }
        .booking__meta li {
          display: flex;
          align-items: flex-start;
          gap: 0.55rem;
        }
        .booking__meta svg {
          flex-shrink: 0;
          margin-top: 0.1rem;
        }

        .booking__calendar {
          padding: 1.25rem 1rem 1.35rem;
          border-right: 1px solid #eee;
          overflow-y: auto;
        }
        .booking__cal-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }
        .booking__cal-head h3 {
          margin: 0;
          font-size: 1rem;
          font-weight: 600;
        }
        .booking__nav-btn {
          width: 32px;
          height: 32px;
          border: 0;
          border-radius: 8px;
          background: transparent;
          font-size: 1.35rem;
          cursor: pointer;
          color: #333;
        }
        .booking__nav-btn:hover {
          background: #f3f3f3;
        }
        .booking__weekdays {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 0.25rem;
          margin-bottom: 0.35rem;
          font-size: 0.7rem;
          color: #888;
          text-align: center;
        }
        .booking__grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 0.35rem;
        }
        .booking__day {
          aspect-ratio: 1;
          border: 0;
          border-radius: 999px;
          background: transparent;
          font-size: 0.875rem;
          cursor: pointer;
          color: #222;
        }
        .booking__day.is-empty {
          pointer-events: none;
        }
        .booking__day.is-past {
          color: #ccc;
          cursor: default;
        }
        .booking__day.is-available:not(.is-selected) {
          background: #f1f1f1;
        }
        .booking__day.is-available:not(.is-selected):hover {
          background: #e6e6e6;
        }
        .booking__day.is-selected {
          background: #111;
          color: #fff;
          box-shadow: 0 0 0 2px #fff, 0 0 0 3px #111;
        }

        .booking__times {
          padding: 1.25rem 1rem 1.35rem;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .booking__times-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          margin-bottom: 0.85rem;
          flex-shrink: 0;
        }
        .booking__slots {
          display: grid;
          gap: 0.45rem;
          flex: 0 1 auto;
          /* ~7 slots visible, then scroll */
          max-height: calc(7 * (1.3rem + 1.2em + 2px) + 6 * 0.45rem);
          overflow-x: hidden;
          overflow-y: auto;
          padding-right: 0.25rem;
          overscroll-behavior: contain;
          -webkit-overflow-scrolling: touch;
        }
        .booking__times-head h3 {
          margin: 0;
          font-size: 0.95rem;
          font-weight: 600;
        }
        .booking__toggle {
          display: inline-flex;
          background: #f1f1f1;
          border-radius: 999px;
          padding: 2px;
        }
        .booking__toggle button {
          border: 0;
          background: transparent;
          border-radius: 999px;
          padding: 0.25rem 0.55rem;
          font-size: 0.75rem;
          cursor: pointer;
          color: #666;
        }
        .booking__toggle button.is-on {
          background: #fff;
          color: #111;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
        }
        .booking__slot {
          border: 1px solid #ddd;
          border-radius: 999px;
          background: #fff;
          padding: 0.65rem 0.75rem;
          font-size: 0.9rem;
          cursor: pointer;
          transition: background 0.15s ease, border-color 0.15s ease;
        }
        .booking__slot:hover,
        .booking__slot.is-selected {
          border-color: #111;
          background: #fafafa;
        }

        .booking__form {
          padding: 1.5rem 1.35rem;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }
        .booking__field {
          display: grid;
          gap: 0.35rem;
          font-size: 0.85rem;
          color: #333;
        }
        .booking__field input,
        .booking__field textarea {
          width: 100%;
          border: 1px solid #ddd;
          border-radius: 10px;
          padding: 0.7rem 0.8rem;
          font: inherit;
          background: #fff;
          color: #111;
          box-sizing: border-box;
        }
        .booking__field input:focus,
        .booking__field textarea:focus {
          outline: 2px solid color-mix(in srgb, var(--color-accent) 35%, transparent);
          border-color: var(--color-accent);
        }
        .booking__guests {
          align-self: start;
          border: 0;
          background: #f1f1f1;
          border-radius: 999px;
          padding: 0.55rem 0.9rem;
          font-size: 0.85rem;
          color: #555;
          cursor: not-allowed;
        }
        .booking__legal {
          margin: 0;
          font-size: 0.75rem;
          color: #888;
          line-height: 1.4;
        }
        .booking__form-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 0.35rem;
        }
        .booking__back {
          border: 0;
          background: transparent;
          font: inherit;
          cursor: pointer;
          color: #444;
          padding: 0.5rem 0.25rem;
        }
        .booking__confirm {
          border: 0;
          background: #111;
          color: #fff;
          border-radius: 999px;
          padding: 0.7rem 1.35rem;
          font: inherit;
          font-weight: 600;
          cursor: pointer;
        }
        .booking__confirm:hover {
          background: #000;
        }

        .booking__success {
          padding: 2.25rem 1.75rem 1.75rem;
          text-align: center;
          display: grid;
          gap: 0.75rem;
          justify-items: center;
        }
        .booking__success-icon {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: var(--color-cta);
          color: #fff;
          display: grid;
          place-items: center;
          font-size: 1.5rem;
          font-weight: 700;
        }
        .booking__success h2 {
          margin: 0.25rem 0 0;
          font-size: 1.4rem;
          letter-spacing: -0.03em;
        }
        .booking__success > p {
          margin: 0;
          color: #555;
          line-height: 1.5;
          max-width: 28rem;
        }
        .booking__success-card {
          width: 100%;
          margin: 0.35rem 0 0.5rem;
          padding: 1rem;
          border-radius: 12px;
          background: #f6f6f6;
          text-align: left;
        }
        .booking__success-card p {
          margin: 0.2rem 0;
          font-size: 0.9rem;
        }
        .booking__success-email {
          color: #666;
          font-size: 0.82rem !important;
        }

        .booking__brand {
          position: absolute;
          bottom: 0.85rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          margin: 0;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.75);
          pointer-events: none;
        }

        @media (max-width: 860px) {
          .booking__panel--pick,
          .booking__panel--details {
            grid-template-columns: 1fr;
            height: auto;
            max-height: 88vh;
            overflow: auto;
          }
          .booking__times {
            height: auto;
            max-height: none;
          }
          .booking__slots {
            max-height: calc(7 * (1.3rem + 1.2em + 2px) + 6 * 0.45rem);
          }
          .booking__info,
          .booking__calendar {
            border-right: 0;
            border-bottom: 1px solid #eee;
          }
        }
      `}</style>
    </>
  )
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function VideoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="7" width="11" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M14 10l6-3v10l-6-3V10z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  )
}

function GlobeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 12h18M12 3c2.5 2.8 3.8 5.8 3.8 9S14.5 18.2 12 21c-2.5-2.8-3.8-5.8-3.8-9S9.5 5.8 12 3z" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  )
}

function CalIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}
