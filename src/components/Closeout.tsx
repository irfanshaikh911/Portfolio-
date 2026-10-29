import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FAQS, SITE, TESTIMONIALS } from '../data/content'
import { MagneticButton } from './MagneticButton'
import { useChatBooking } from './ChatBookingContext'
import { useStickyFlip } from '../hooks/useStickyFlip'
import figure1 from '../assets/images/character/1.png'
import figure2 from '../assets/images/character/2.png'
import figure3 from '../assets/images/character/3.png'

gsap.registerPlugin(ScrollTrigger)

const FIGURES = [figure1, figure2, figure3]

const PANELS = [
  { id: 'testimonials', tone: 'light' as const },
  { id: 'faq', tone: 'muted' as const },
  { id: 'contact', tone: 'deep' as const },
]

function Stars() {
  return (
    <div className="closeout-stars" aria-label="5 star rating">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width="18" height="18" viewBox="0 0 24 24" aria-hidden>
          <path
            fill="#02D4F5"
            d="M12 2.5l2.7 6.1 6.6.6-5 4.4 1.5 6.4L12 16.8 6.2 20l1.5-6.4-5-4.4 6.6-.6L12 2.5z"
          />
        </svg>
      ))}
    </div>
  )
}

function Arrow({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      {dir === 'left' ? (
        <path
          d="M11.5 3.5L6 9l5.5 5.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M6.5 3.5L12 9l-5.5 5.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 6.5h16v11H4v-11z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M4.5 7l7.5 6 7.5-6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8.5 4.5h3l1.2 4.2-1.8 1.1a11.5 11.5 0 005.3 5.3l1.1-1.8 4.2 1.2v3a1.5 1.5 0 01-1.5 1.5A14.5 14.5 0 017 6a1.5 1.5 0 011.5-1.5z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const SOCIAL_LINKS = [
  {
    label: 'Dribbble',
    href: 'https://dribbble.com',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="#EA4C89" aria-hidden>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.191-5.705zM12 20.547a8.455 8.455 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.512 8.512 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" />
      </svg>
    ),
  },
  {
    label: 'X',
    href: 'https://x.com',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="#111" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.743l7.227-8.451L1.61 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
        <defs>
          <radialGradient id="closeout-ig" cx="30%" cy="107%" r="150%">
            <stop offset="0%" stopColor="#fdf497" />
            <stop offset="45%" stopColor="#fd5949" />
            <stop offset="60%" stopColor="#d6249f" />
            <stop offset="90%" stopColor="#285AEB" />
          </radialGradient>
        </defs>
        <path
          fill="url(#closeout-ig)"
          d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
        />
      </svg>
    ),
  },
  {
    label: 'Linkedin',
    href: 'https://linkedin.com',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
        <rect x="2" y="2" width="20" height="20" rx="4" fill="#0A66C2" />
        <path
          fill="#fff"
          d="M8.34 18.16H5.67V9.8h2.67v8.36zM7 8.57a1.55 1.55 0 110-3.1 1.55 1.55 0 010 3.1zM18.33 18.16h-2.66v-4.07c0-.97-.02-2.21-1.35-2.21-1.35 0-1.56 1.05-1.56 2.14v4.14h-2.66V9.8h2.55v1.14h.04c.35-.67 1.22-1.38 2.51-1.38 2.69 0 3.18 1.77 3.18 4.07v4.53z"
        />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
        <path
          fill="#1877F2"
          d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"
        />
      </svg>
    ),
  },
]

export function Closeout() {
  const sectionRef = useRef<HTMLElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const speechRef = useRef<HTMLDivElement>(null)
  const [slide, setSlide] = useState(0)
  const [faqOpen, setFaqOpen] = useState(0)
  const { openChat } = useChatBooking()

  useStickyFlip(sectionRef, carouselRef, {
    panelSelector: '.closeout-panel',
    images: FIGURES,
    frontSelector: '.closeout-card__face--front img',
    backSelector: '.closeout-card__face--back img',
  })

  // Bubble only on testimonials pose — fade out as FAQ takes over
  useEffect(() => {
    const section = sectionRef.current
    const speech = speechRef.current
    const faq = section?.querySelector<HTMLElement>('#faq')
    if (!section || !speech || !faq) return

    const navH = () => {
      const raw = getComputedStyle(document.documentElement).getPropertyValue('--nav-h')
      const n = Number.parseFloat(raw)
      return Number.isFinite(n) ? n : 84
    }

    gsap.set(speech, { opacity: 1, visibility: 'visible' })

    const trigger = ScrollTrigger.create({
      trigger: faq,
      start: 'top 50%',
      end: () => `top top+=${navH()}`,
      scrub: 0.35,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const opacity = 1 - self.progress
        gsap.set(speech, {
          opacity,
          visibility: opacity < 0.05 ? 'hidden' : 'visible',
        })
      },
      onLeave: () => gsap.set(speech, { opacity: 0, visibility: 'hidden' }),
      onLeaveBack: () => gsap.set(speech, { opacity: 1, visibility: 'visible' }),
    })

    return () => {
      trigger.kill()
      gsap.set(speech, { clearProps: 'opacity,visibility' })
    }
  }, [])

  const active = TESTIMONIALS[slide]
  const prevSlide = () =>
    setSlide((s) => (s - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  const nextSlide = () => setSlide((s) => (s + 1) % TESTIMONIALS.length)

  return (
    <section className="closeout" ref={sectionRef}>
      <div className="closeout__rail">
        <aside className="closeout__media" aria-hidden>
          <div className="closeout__media-sticky">
            <div className="closeout__media-stage">
              <div className="closeout__carousel" ref={carouselRef}>
                <div className="closeout-card">
                  <div className="closeout-card__face closeout-card__face--front">
                    <img
                      src={FIGURES[0]}
                      alt=""
                      className="closeout-card__img"
                      draggable={false}
                    />
                  </div>
                  <div className="closeout-card__face closeout-card__face--back">
                    <img
                      src={FIGURES[0]}
                      alt=""
                      className="closeout-card__img"
                      draggable={false}
                    />
                  </div>
                </div>
              </div>
              <div className="closeout__speech" ref={speechRef}>
                <span>What my Clients said</span>
              </div>
            </div>
          </div>
        </aside>

        <div className="closeout__main">
          <div className="closeout__title-block">
            <h2 className="closeout__heading js-reveal-heading">TESTIMONIAL</h2>
          </div>

          {/* Testimonials */}
          <article
            id="testimonials"
            className={`closeout-panel closeout-panel--testimonial closeout-panel--${PANELS[0].tone}`}
            style={{ zIndex: 1 }}
          >
            <div className="closeout-panel__inner closeout-panel__inner--testimonial">
              <Stars />
              <p className="closeout-quote__text">“{active.quote}”</p>
              <div className="closeout-quote__person">
                <strong>{active.name}</strong>
                <span>{active.role}</span>
              </div>

              <div className="closeout-quote__nav">
                <div className="closeout-quote__dots" role="tablist" aria-label="Testimonials">
                  {TESTIMONIALS.map((t, i) => (
                    <button
                      key={t.id}
                      type="button"
                      role="tab"
                      aria-selected={i === slide}
                      className={i === slide ? 'is-active' : ''}
                      onClick={() => setSlide(i)}
                    />
                  ))}
                </div>
                <div className="closeout-quote__arrows">
                  <button type="button" aria-label="Previous testimonial" onClick={prevSlide}>
                    <Arrow dir="left" />
                  </button>
                  <button type="button" aria-label="Next testimonial" onClick={nextSlide}>
                    <Arrow dir="right" />
                  </button>
                </div>
              </div>
            </div>
          </article>

          {/* FAQ */}
          <article
            id="faq"
            className={`closeout-panel closeout-panel--${PANELS[1].tone}`}
            style={{ zIndex: 2 }}
          >
            <div className="closeout-panel__inner">
              <header className="closeout-panel__head">
                <h2 className="closeout-panel__heading js-reveal-heading">FAQ</h2>
                <p>Here are some answers to the most common questions.</p>
                <span className="closeout-panel__rule" aria-hidden />
              </header>

              <div className="closeout-faq">
                {FAQS.map((item, i) => {
                  const isOpen = faqOpen === i
                  return (
                    <div key={item.q} className={`closeout-faq__item${isOpen ? ' is-open' : ''}`}>
                      <button
                        type="button"
                        className="closeout-faq__trigger"
                        aria-expanded={isOpen}
                        onClick={() => setFaqOpen(isOpen ? -1 : i)}
                      >
                        <span>{item.q}</span>
                        <span className="closeout-faq__icon" aria-hidden>
                          {isOpen ? '−' : '+'}
                        </span>
                      </button>
                      <div
                        className="closeout-faq__panel"
                        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                      >
                        <div className="closeout-faq__inner">
                          <p>{item.a}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </article>

          {/* Contact */}
          <article
            id="contact"
            className="closeout-panel closeout-panel--contact"
            style={{ zIndex: 3 }}
          >
            <div className="closeout-panel__inner closeout-panel__inner--contact">
              <header className="closeout-contact__intro">
                <h2 className="closeout-contact__title js-reveal-heading">
                  Let&apos;s Work Together
                </h2>
                <p>
                  Have a project in mind? I&apos;d love to hear about it. Drop me a
                  message and I&apos;ll get back to you within 24 hours.
                </p>
              </header>

              <div className="closeout-contact__grid">
                <a href={`mailto:${SITE.email}`} className="closeout-contact__cell">
                  <span className="closeout-contact__cell-icon" aria-hidden>
                    <MailIcon />
                  </span>
                  <div>
                    <strong>Email</strong>
                    <span>{SITE.email}</span>
                  </div>
                </a>
                <a
                  href={`tel:${SITE.phone.replace(/\s/g, '')}`}
                  className="closeout-contact__cell"
                >
                  <span className="closeout-contact__cell-icon" aria-hidden>
                    <PhoneIcon />
                  </span>
                  <div>
                    <strong>Phone</strong>
                    <span>{SITE.phone}</span>
                  </div>
                </a>
              </div>

              <div className="closeout-contact__socials">
                <h3>Socials</h3>
                <ul className="closeout-contact__pills">
                  {SOCIAL_LINKS.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="closeout-contact__pill"
                      >
                        <span className="closeout-contact__pill-icon">{s.icon}</span>
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="closeout-contact__cta">
                <p>
                  Prefer to schedule a call instead? Book a free 30-minute consultation
                  and let&apos;s discuss your project.
                </p>
                <MagneticButton
                  type="button"
                  className="closeout-contact__cta-btn"
                  onClick={openChat}
                >
                  Let&apos;s Set Up a Time
                  <span className="closeout-contact__cta-dot" aria-hidden />
                </MagneticButton>
              </div>
            </div>
          </article>
        </div>
      </div>

      <style>{`
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
        .closeout {
          padding: 0;
          background: var(--color-bg);
          overflow: visible;
        }
        .closeout__rail {
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
        .closeout__main {
          display: flex;
          flex-direction: column;
          border-left: 1px solid rgba(224, 224, 224, 0.63);
          min-width: 0;
        }
        .closeout__title-block {
          padding: 96px 28px 28px;
          border-bottom: 1px solid rgba(224, 224, 224, 0.63);
          background: #fff;
        }
        [data-theme='dark'] .closeout__title-block {
          background: var(--color-bg);
        }
        .closeout__heading {
          margin: 0;
          font-family: var(--font-section);
          font-size: clamp(56px, 9vw, 100px);
          font-weight: 600;
          line-height: 1;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          color: var(--color-fg);
        }

        /* Sticky stacked panels — one viewport each, next slides over current */
        .closeout-panel {
          position: sticky;
          top: var(--nav-h);
          min-height: calc(170vh - var(--nav-h));
          height: calc(170vh - var(--nav-h));
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          padding: 36px 28px 40px;
          border-bottom: 1px solid rgba(224, 224, 224, 0.63);
          box-sizing: border-box;
        }
        .closeout-panel--light {
          background: #fff;
        }
        .closeout-panel--muted { background: #f2f2f2; }
        .closeout-panel--deep { background: #e8e8e8; }
        .closeout-panel--contact { background: #fff; }
        [data-theme='dark'] .closeout-panel--light,
        [data-theme='dark'] .closeout-panel--contact { background: var(--color-bg); }
        [data-theme='dark'] .closeout-panel--muted { background: var(--color-muted); }
        [data-theme='dark'] .closeout-panel--deep {
          background: color-mix(in srgb, var(--color-muted) 70%, #000);
        }
        .closeout-panel__inner {
          display: flex;
          flex-direction: column;
          gap: 28px;
          max-width: 44rem;
          width: 100%;
        }
        .closeout-panel__head {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
        }
        .closeout-panel__heading {
          margin: 0;
          font-family: var(--font-section);
          font-size: clamp(42px, 7vw, 72px);
          font-weight: 600;
          line-height: 1.05;
          letter-spacing: 0;
          color: var(--color-fg);
        }
        .closeout-panel__head p {
          margin: 0;
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 500;
          letter-spacing: -0.02em;
          line-height: 1.5;
          color: #616161;
        }
        [data-theme='dark'] .closeout-panel__head p {
          color: var(--color-muted-fg);
        }
        .closeout-panel__rule {
          width: 48px;
          height: 3px;
          border-radius: 999px;
          background: #7ED8F0;
          margin-top: 4px;
        }

        /* Testimonials — Dean: centered stars + condensed quote */
        .closeout-panel--testimonial {
          justify-content: flex-start;
          padding-top: 0;
          padding-bottom: 0;
        }
        .closeout-panel__inner--testimonial {
          max-width: 36rem;
          margin: 0 auto;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 22px;
          min-height: calc(100dvh - var(--nav-h));
          padding: 48px 0;
          box-sizing: border-box;
        }
        .closeout-stars {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
        }
        .closeout-quote__text {
          margin: 0;
          font-family: var(--font-section);
          font-size: clamp(22px, 2.8vw, 32px);
          font-weight: 600;
          letter-spacing: -0.02em;
          line-height: 1.35;
          color: var(--color-fg);
          text-wrap: balance;
        }
        .closeout-quote__person {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          margin-top: 4px;
        }
        .closeout-quote__person strong {
          display: block;
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 700;
          color: var(--color-fg);
        }
        .closeout-quote__person span {
          display: block;
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 500;
          color: #616161;
        }
        [data-theme='dark'] .closeout-quote__person span {
          color: var(--color-muted-fg);
        }
        .closeout-quote__nav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-top: 12px;
          width: 100%;
        }
        .closeout-quote__dots {
          display: flex;
          gap: 8px;
        }
        .closeout-quote__dots button {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          padding: 0;
          border: none;
          background: #d0d0d0;
          cursor: pointer;
        }
        .closeout-quote__dots button.is-active {
          background: #02d4f5;
          transform: scale(1.2);
        }
        .closeout-quote__arrows {
          display: flex;
          gap: 8px;
        }
        .closeout-quote__arrows button {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid rgba(224, 224, 224, 0.9);
          background: #fff;
          color: var(--color-fg);
          display: grid;
          place-items: center;
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .closeout-quote__arrows button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 18px rgba(0, 0, 0, 0.08);
        }
        [data-theme='dark'] .closeout-quote__arrows button {
          background: var(--color-bg);
          border-color: rgba(255, 255, 255, 0.12);
        }

        /* FAQ */
        .closeout-faq {
          display: flex;
          flex-direction: column;
        }
        .closeout-faq__item {
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }
        [data-theme='dark'] .closeout-faq__item {
          border-bottom-color: rgba(255, 255, 255, 0.1);
        }
        .closeout-faq__trigger {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 18px 0;
          background: transparent;
          border: none;
          text-align: left;
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 600;
          letter-spacing: -0.02em;
          color: var(--color-fg);
          cursor: pointer;
        }
        .closeout-faq__icon {
          flex-shrink: 0;
          width: 1.5rem;
          text-align: center;
          font-size: 1.25rem;
          font-weight: 400;
          color: #616161;
        }
        .closeout-faq__panel {
          display: grid;
          transition: grid-template-rows 0.35s var(--ease-out, cubic-bezier(0.16, 1, 0.3, 1));
        }
        .closeout-faq__inner {
          overflow: hidden;
        }
        .closeout-faq__inner p {
          margin: 0;
          padding: 0 0 18px;
          font-size: 14px;
          line-height: 1.6;
          color: #616161;
        }
        [data-theme='dark'] .closeout-faq__inner p {
          color: var(--color-muted-fg);
        }

        /* Contact — Dean-style editorial panel */
        .closeout-panel__inner--contact {
          max-width: 100%;
          gap: 32px;
        }
        .closeout-contact__intro {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .closeout-contact__title {
          margin: 0;
          font-family: var(--font-section);
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 600;
          line-height: 1.05;
          letter-spacing: -0.02em;
          color: var(--color-fg);
        }
        .closeout-contact__intro p {
          margin: 0;
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 500;
          letter-spacing: -0.02em;
          line-height: 1.6;
          color: #616161;
        }
        [data-theme='dark'] .closeout-contact__intro p {
          color: var(--color-muted-fg);
        }
        .closeout-contact__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-top: 1px solid rgba(224, 224, 224, 0.9);
          border-bottom: 1px solid rgba(224, 224, 224, 0.9);
        }
        .closeout-contact__cell {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 22px 16px;
          min-width: 0;
          text-decoration: none;
          color: inherit;
        }
        .closeout-contact__cell:first-child {
          border-right: 1px solid rgba(224, 224, 224, 0.9);
        }
        .closeout-contact__cell-icon {
          color: #3d3d3d;
          margin-top: 2px;
          flex-shrink: 0;
        }
        .closeout-contact__cell strong {
          display: block;
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 700;
          color: var(--color-fg);
        }
        .closeout-contact__cell span {
          display: block;
          font-size: 13px;
          font-weight: 500;
          color: #616161;
          white-space: nowrap;
        }
        .closeout-contact__socials h3 {
          margin: 0 0 14px;
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 700;
          color: var(--color-fg);
        }
        .closeout-contact__pills {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .closeout-contact__pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          height: 36px;
          padding: 0 14px;
          border-radius: 999px;
          background: #ececec;
          font-size: 13px;
          font-weight: 600;
          color: var(--color-fg);
          text-decoration: none;
        }
        .closeout-contact__pill-icon {
          display: grid;
          place-items: center;
          width: 14px;
          height: 14px;
        }
        .closeout-contact__pill-icon svg {
          width: 14px;
          height: 14px;
        }
        .closeout-contact__cta {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 18px;
        }
        .closeout-contact__cta p {
          margin: 0;
          font-family: var(--font-section);
          font-size: 20px;
          font-weight: 600;
          line-height: 1.35;
          color: var(--color-fg);
        }
        .closeout-contact__cta-btn {
          height: 50px;
          padding: 0 26px !important;
          background: #000 !important;
          color: #fff !important;
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 600;
          gap: 0.75rem;
          box-shadow:
            0 10px 22px rgba(0, 0, 0, 0.12),
            0 22px 48px rgba(0, 0, 0, 0.1) !important;
        }
        .closeout-contact__cta-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #02d4f5;
          box-shadow: 0 0 0 4px rgba(2, 212, 245, 0.28);
          flex-shrink: 0;
        }

        /* Sticky under nav — same Dean image column as Process, mirrored */
        .closeout__media {
          position: sticky;
          top: var(--nav-h);
          align-self: start;
          height: calc(100dvh - var(--nav-h));
          max-height: calc(100vh - var(--nav-h));
          margin-right: -1px;
          box-sizing: border-box;
          z-index: 2;
        }
        .closeout__media-sticky {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px 16px;
          box-sizing: border-box;
        }
        .closeout__media-stage {
          position: relative;
          width: 100%;
          height: 100%;
          max-width: none;
          margin: 0;
          perspective: 1600px;
          perspective-origin: 50% 50%;
        }
        .closeout__speech {
          position: absolute;
          top: 10%;
          right: 6%;
          z-index: 4;
          max-width: min(210px, 58%);
          padding: 12px 16px;
          border-radius: 18px;
          background: #f2f2f2;
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.08);
          pointer-events: none;
        }
        .closeout__speech::after {
          content: '';
          position: absolute;
          left: 18px;
          bottom: -8px;
          width: 16px;
          height: 16px;
          background: #f2f2f2;
          border-radius: 3px;
          transform: rotate(45deg);
        }
        .closeout__speech span {
          position: relative;
          z-index: 1;
          display: block;
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 600;
          letter-spacing: -0.02em;
          line-height: 1.35;
          color: #111;
          white-space: nowrap;
        }
        [data-theme='dark'] .closeout__speech,
        [data-theme='dark'] .closeout__speech::after {
          background: var(--color-muted);
        }
        [data-theme='dark'] .closeout__speech span {
          color: var(--color-fg);
        }
        .closeout__carousel {
          position: absolute;
          inset: 0;
          transform-style: preserve-3d;
          will-change: transform;
          transform-origin: 50% 50%;
        }
        .closeout-card {
          position: absolute;
          inset: 0;
          transform-style: preserve-3d;
        }
        .closeout-card__face {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .closeout-card__face--back {
          transform: rotateY(180deg);
        }
        .closeout-card__img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center center;
          display: block;
          user-select: none;
          -webkit-user-drag: none;
        }

        @media (max-width: 1199px) and (min-width: 810px) {
          .closeout__heading,
          .closeout-panel__heading { font-size: 56px; }
          .closeout__title-block { padding: 72px 20px 20px; }
        }
        @media (max-width: 809px) {
          .closeout__rail {
            grid-template-columns: 1fr;
          }
          .closeout__main {
            border-left: none;
          }
          .closeout__media {
            position: sticky;
            top: var(--nav-h);
            align-self: start;
            height: calc(100dvh - var(--nav-h));
            max-height: calc(100vh - var(--nav-h));
            order: -1;
            border-bottom: 1px solid rgba(224, 224, 224, 0.63);
          }
          .closeout__media-sticky {
            height: 100%;
            padding: 16px;
          }
          .closeout__media-stage {
            width: 100%;
            height: 100%;
            max-width: none;
          }
          .closeout__title-block { padding: 48px 16px 16px; }
          .closeout__heading { font-size: 48px; }
          .closeout-panel {
            min-height: calc(150vh - var(--nav-h));
            height: calc(150vh - var(--nav-h));
            padding: 24px 16px 32px;
          }
          .closeout-panel__heading { font-size: 48px; }
          .closeout-contact__grid {
            grid-template-columns: 1fr;
          }
          .closeout-contact__cell:first-child {
            border-right: none;
            border-bottom: 1px solid rgba(224, 224, 224, 0.9);
          }
        }
      `}</style>
    </section>
  )
}
