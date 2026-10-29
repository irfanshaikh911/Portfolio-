import { MagneticButton } from './MagneticButton'
import { SocialIcons } from './SocialIcons'
import { SITE } from '../data/content'

export function Contact() {
  return (
    <section id="contact" className="contact section">
      <div className="section-head">
        <h2 className="display-section js-reveal-heading">Contact Me</h2>
      </div>

      <div className="contact__panel container grid-frame js-fade-up">
        <span className="marker-bl">+</span>
        <span className="marker-br">+</span>

        <div className="contact__left">
          <h3>Let&apos;s Work Together</h3>
          <p>Have a project in mind? I&apos;d love to hear about it. Drop me a message and I&apos;ll get back to you within 24 hours.</p>
          <MagneticButton href={`mailto:${SITE.email}`} as="a" variant="accent">
            Let&apos;s Set Up a Time →
          </MagneticButton>
        </div>

        <div className="contact__right">
          <div className="contact__row">
            <span className="meta">Email</span>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </div>
          <div className="contact__row">
            <span className="meta">Phone</span>
            <a href={`tel:${SITE.phone.replace(/\s/g, '')}`}>{SITE.phone}</a>
          </div>
          <div className="contact__row">
            <span className="meta">Socials</span>
            <SocialIcons />
          </div>
        </div>
      </div>

      <style>{`
        .contact__panel {
          display: grid;
          grid-template-columns: 1.2fr 0.9fr;
          min-height: 320px;
        }
        .contact__left,
        .contact__right {
          padding: clamp(1.5rem, 4vw, 2.75rem);
        }
        .contact__left {
          border-right: var(--border);
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 1.25rem;
        }
        .contact__left h3 {
          font-family: var(--font-display-condensed);
          font-size: clamp(1.75rem, 4vw, 2.75rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.05;
        }
        .contact__left p {
          max-width: 28rem;
          color: var(--color-muted-fg);
          font-size: 0.95rem;
          line-height: 1.6;
        }
        .contact__right {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 1.75rem;
        }
        .contact__row {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }
        .contact__row a {
          font-size: 1.05rem;
          transition: color 0.25s ease;
        }
        .contact__row a:hover {
          color: var(--color-accent);
        }
        @media (max-width: 800px) {
          .contact__panel {
            grid-template-columns: 1fr;
          }
          .contact__left {
            border-right: none;
            border-bottom: var(--border);
          }
        }
      `}</style>
    </section>
  )
}
