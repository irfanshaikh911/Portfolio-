import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import ideaImg from '../assets/images/character/idea.png'
import ideaRedImg from '../assets/images/character/idea-red.png'
import ideaGreenImg from '../assets/images/character/idea-green.png'
import { SITE } from '../data/content'
import { useAccent } from '../hooks/useAccent'
import { getLenis } from '../lib/lenis'

const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/services', label: 'Services' },
  { href: '/#about', label: 'About' },
  { href: '/#process', label: 'Process' },
  { href: '/#contact', label: 'Contact' },
]

const socials: { href: string; label: string; icon: ReactNode }[] = [
  {
    href: 'https://dribbble.com',
    label: 'Dribbble',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#EA4C89" aria-hidden>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.191-5.705zM12 20.547a8.455 8.455 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.512 8.512 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" />
      </svg>
    ),
  },
  {
    href: 'https://x.com',
    label: 'X (Twitter)',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#111" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.743l7.227-8.451L1.61 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
      </svg>
    ),
  },
  {
    href: 'https://instagram.com',
    label: 'Instagram',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
        <defs>
          <radialGradient id="footer-ig" cx="30%" cy="107%" r="150%">
            <stop offset="0%" stopColor="#fdf497" />
            <stop offset="45%" stopColor="#fd5949" />
            <stop offset="60%" stopColor="#d6249f" />
            <stop offset="90%" stopColor="#285AEB" />
          </radialGradient>
        </defs>
        <path
          fill="url(#footer-ig)"
          d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
        />
      </svg>
    ),
  },
  {
    href: 'https://linkedin.com',
    label: 'LinkedIn',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
        <rect x="2" y="2" width="20" height="20" rx="4" fill="#0A66C2" />
        <path
          fill="#fff"
          d="M8.34 18.16H5.67V9.8h2.67v8.36zM7 8.57a1.55 1.55 0 110-3.1 1.55 1.55 0 010 3.1zM18.33 18.16h-2.66v-4.07c0-.97-.02-2.21-1.35-2.21-1.35 0-1.56 1.05-1.56 2.14v4.14h-2.66V9.8h2.55v1.14h.04c.35-.67 1.22-1.38 2.51-1.38 2.69 0 3.18 1.77 3.18 4.07v4.53z"
        />
      </svg>
    ),
  },
  {
    href: 'https://facebook.com',
    label: 'Facebook',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2" aria-hidden>
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
      </svg>
    ),
  },
]

export function Footer() {
  const [copied, setCopied] = useState(false)
  const year = new Date().getFullYear()
  const accent = useAccent()
  const character =
    accent === 'red' ? ideaRedImg : accent === 'green' ? ideaGreenImg : ideaImg

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <footer className="footer">
      <div className="footer__grid">
        <div className="footer__char">
          <img src={character} alt="" className="footer__char-img" />
          <p className="footer__char-caption">Got an idea?</p>
        </div>

        <nav className="footer__nav" aria-label="Footer">
          <p className="footer__label">Sitemap</p>
          {footerLinks.map((l) => (
            <Link key={l.href} to={l.href} className="footer__nav-link">
              <span>{l.label}</span>
              <span className="footer__nav-dot" aria-hidden />
            </Link>
          ))}
        </nav>

        <div className="footer__socials">
          <p className="footer__label">Socials</p>
          <ul>
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer">
                  <span className="footer__social-icon">{s.icon}</span>
                  {s.label}
                  <span className="footer__social-arrow" aria-hidden>
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__email-col">
          <div>
            <p className="footer__label">{copied ? 'Copied to clipboard' : 'Click to copy'}</p>
            <button type="button" className="footer__email" onClick={copyEmail}>
              <span className="footer__contact-icon" aria-hidden>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M4 6.5h16v11H4v-11z" stroke="currentColor" strokeWidth="1.6" />
                  <path
                    d="M4.5 7l7.5 6 7.5-6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              {SITE.email}
            </button>
            <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="footer__phone">
              <span className="footer__contact-icon" aria-hidden>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M8.5 4.5h3l1.2 4.2-1.8 1.1a11.5 11.5 0 005.3 5.3l1.1-1.8 4.2 1.2v3a1.5 1.5 0 01-1.5 1.5A14.5 14.5 0 017 6a1.5 1.5 0 011.5-1.5z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              {SITE.phone}
            </a>
          </div>
          <div className="footer__status">
            <span className="footer__status-dot" aria-hidden />
            Available for new projects
          </div>
        </div>
      </div>

      <div className="footer__bar">
        <p className="footer__copy">
          © {year} {SITE.firstName}
        </p>
        <p className="footer__role">{SITE.title}</p>
        <a
          href="#top"
          className="footer__top"
          onClick={(e) => {
            e.preventDefault()
            const lenis = getLenis()
            if (lenis) lenis.scrollTo(0)
            else window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          Back to top
          <span aria-hidden>↑</span>
        </a>
      </div>

      <style>{`
        .footer {
          padding: 0;
          background: var(--color-bg);
          border-left: 1px solid rgba(224, 224, 224, 0.63);
          border-right: 1px solid rgba(224, 224, 224, 0.63);
        }
        .footer__grid {
          display: grid;
          grid-template-columns: minmax(160px, 0.85fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1.35fr);
          align-items: stretch;
          min-height: 340px;
          border-top: 1px solid rgba(224, 224, 224, 0.63);
        }
        .footer__char {
          position: relative;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: 16px 12px 0;
          border-right: 1px solid rgba(224, 224, 224, 0.63);
          overflow: hidden;
          min-height: 280px;
          background: transparent;
        }
        .footer__char-img {
          width: min(220px, 100%);
          height: auto;
          max-height: 300px;
          display: block;
          object-fit: contain;
          object-position: center bottom;
          user-select: none;
          -webkit-user-drag: none;
        }
        .footer__char-caption {
          position: absolute;
          top: 22px;
          left: 22px;
          margin: 0;
          font-family: var(--font-section);
          font-size: 18px;
          font-weight: 600;
          letter-spacing: -0.02em;
          color: var(--color-fg);
        }
        .footer__nav {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 28px 24px;
          border-right: 1px solid rgba(224, 224, 224, 0.63);
        }
        .footer__nav-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 11px 0;
          border-bottom: 1px solid rgba(224, 224, 224, 0.63);
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 500;
          letter-spacing: -0.02em;
          color: var(--color-fg);
          transition: color 0.2s ease, padding-left 0.2s ease;
        }
        .footer__nav-link:first-of-type {
          border-top: 1px solid rgba(224, 224, 224, 0.63);
        }
        .footer__nav-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--color-accent);
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-accent) 18%, transparent);
          flex-shrink: 0;
        }
        .footer__nav-link:hover {
          color: var(--color-accent);
          padding-left: 6px;
        }
        .footer__socials {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 14px;
          padding: 28px 24px;
          border-right: 1px solid rgba(224, 224, 224, 0.63);
        }
        .footer__label {
          margin: 0 0 4px;
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #9a9a9a;
        }
        .footer__socials ul {
          display: flex;
          flex-direction: column;
        }
        .footer__socials a {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 0;
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 500;
          letter-spacing: -0.02em;
          color: var(--color-fg);
          border-bottom: 1px solid rgba(224, 224, 224, 0.4);
        }
        .footer__social-icon {
          display: grid;
          place-items: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #fff;
          border: 1px solid #ececec;
          flex-shrink: 0;
        }
        .footer__social-icon svg {
          display: block;
          width: 14px;
          height: 14px;
        }
        .footer__social-arrow {
          margin-left: auto;
          font-size: 13px;
          opacity: 0;
          transform: translate(-4px, 2px);
          transition: opacity 0.2s ease, transform 0.2s ease;
          color: var(--color-accent);
        }
        .footer__socials a:hover {
          color: var(--color-accent);
        }
        .footer__socials a:hover .footer__social-arrow {
          opacity: 1;
          transform: translate(0, 0);
        }
        .footer__email-col {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 28px;
          padding: 32px 28px 28px;
          min-height: 100%;
        }
        .footer__email {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin: 10px 0 8px;
          padding: 0;
          background: none;
          border: none;
          text-align: left;
          cursor: pointer;
          font-family: var(--font-section);
          font-size: clamp(16px, 1.55vw, 24px);
          font-weight: 600;
          line-height: 1.2;
          letter-spacing: -0.03em;
          color: var(--color-fg);
          white-space: nowrap;
        }
        .footer__email:hover {
          color: var(--color-accent);
        }
        .footer__phone {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 500;
          color: #616161;
          white-space: nowrap;
        }
        .footer__contact-icon {
          display: grid;
          place-items: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #fff;
          border: 1px solid #ececec;
          color: var(--color-fg);
          flex-shrink: 0;
        }
        .footer__contact-icon svg {
          display: block;
          width: 14px;
          height: 14px;
        }
        .footer__phone:hover {
          color: var(--color-accent);
        }
        .footer__status {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          align-self: flex-start;
          height: 36px;
          padding: 0 14px;
          border-radius: 999px;
          background: #f2f2f2;
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 600;
          color: var(--color-fg);
        }
        .footer__status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--color-accent);
          box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-accent) 22%, transparent);
          animation: footer-pulse 2.2s ease-in-out infinite;
        }
        @keyframes footer-pulse {
          0%, 100% { box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-accent) 22%, transparent); }
          50% { box-shadow: 0 0 0 7px color-mix(in srgb, var(--color-accent) 8%, transparent); }
        }
        .footer__bar {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 16px;
          padding: 18px 28px;
          border-top: 1px solid rgba(224, 224, 224, 0.63);
        }
        .footer__copy,
        .footer__role,
        .footer__top {
          margin: 0;
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 500;
          letter-spacing: -0.02em;
          color: #616161;
        }
        .footer__role {
          text-align: center;
          font-family: var(--font-section);
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-fg);
        }
        .footer__top {
          display: inline-flex;
          align-items: center;
          justify-content: flex-end;
          gap: 8px;
          color: var(--color-fg);
        }
        .footer__top:hover {
          color: var(--color-accent);
        }
        [data-theme='dark'] .footer__social-icon,
        [data-theme='dark'] .footer__contact-icon {
          background: #141414;
          border-color: #2a2a2a;
        }
        [data-theme='dark'] .footer__social-icon svg[fill="#111"] {
          fill: #fff;
        }
        [data-theme='dark'] .footer__status {
          background: var(--color-muted);
        }
        [data-theme='dark'] .footer__phone,
        [data-theme='dark'] .footer__copy {
          color: var(--color-muted-fg);
        }
        @media (max-width: 809px) {
          .footer__grid {
            grid-template-columns: 1fr;
            min-height: 0;
          }
          .footer__char {
            min-height: 220px;
            border-right: none;
            border-bottom: 1px solid rgba(224, 224, 224, 0.63);
          }
          .footer__nav,
          .footer__socials {
            border-right: none;
            border-bottom: 1px solid rgba(224, 224, 224, 0.63);
          }
          .footer__email-col {
            min-height: 160px;
          }
          .footer__email {
            font-size: 18px;
          }
          .footer__bar {
            grid-template-columns: 1fr;
            text-align: left;
            gap: 8px;
          }
          .footer__role,
          .footer__top {
            justify-content: flex-start;
            text-align: left;
          }
        }
      `}</style>
    </footer>
  )
}
