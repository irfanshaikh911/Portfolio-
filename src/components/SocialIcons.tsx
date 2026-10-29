import type { ReactNode } from 'react'

const ICON = 20

type SocialLink = {
  label: string
  href: string
  icon: ReactNode
}

export function SocialIcons({ className = '' }: { className?: string }) {
  const links: SocialLink[] = [
    {
      label: 'Dribbble',
      href: 'https://dribbble.com',
      icon: (
        <svg width={ICON} height={ICON} viewBox="0 0 24 24" fill="#EA4C89" aria-hidden>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.191-5.705zM12 20.547a8.455 8.455 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.512 8.512 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" />
        </svg>
      ),
    },
    {
      label: 'X',
      href: 'https://x.com',
      icon: (
        <svg width={ICON} height={ICON} viewBox="0 0 24 24" fill="#111" aria-hidden>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.743l7.227-8.451L1.61 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
        </svg>
      ),
    },
    {
      label: 'Instagram',
      href: 'https://instagram.com',
      icon: (
        <svg width={ICON} height={ICON} viewBox="0 0 24 24" aria-hidden>
          <defs>
            <radialGradient id="ig" cx="30%" cy="107%" r="150%">
              <stop offset="0%" stopColor="#fdf497" />
              <stop offset="45%" stopColor="#fd5949" />
              <stop offset="60%" stopColor="#d6249f" />
              <stop offset="90%" stopColor="#285AEB" />
            </radialGradient>
          </defs>
          <path
            fill="url(#ig)"
            d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
          />
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com',
      icon: (
        <svg width={ICON} height={ICON} viewBox="0 0 24 24" aria-hidden>
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
        <svg width={ICON} height={ICON} viewBox="0 0 24 24" aria-hidden>
          <path
            fill="#1877F2"
            d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"
          />
        </svg>
      ),
    },
  ]

  return (
    <ul className={`social-icons ${className}`}>
      {links.map((l) => (
        <li key={l.label}>
          <a
            href={l.href}
            target="_blank"
            rel="noreferrer"
            aria-label={l.label}
            className="social-icons__link"
          >
            <span className="social-icons__glyph">{l.icon}</span>
          </a>
        </li>
      ))}
      <style>{`
        .social-icons {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        /* Framer-style Icon slot: equal circular hit area, equal glyph box */
        .social-icons__link {
          display: grid;
          place-items: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #fff;
          border: 1px solid #ececec;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease;
        }
        .social-icons__glyph {
          display: grid;
          place-items: center;
          width: 20px;
          height: 20px;
          line-height: 0;
        }
        .social-icons__glyph svg {
          display: block;
          width: 20px;
          height: 20px;
        }
        .social-icons__link:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
        }
        [data-theme='dark'] .social-icons__link {
          background: #141414;
          border-color: #2a2a2a;
        }
        [data-theme='dark'] .social-icons__glyph svg[fill="#111"] {
          fill: #fff;
        }
      `}</style>
    </ul>
  )
}
