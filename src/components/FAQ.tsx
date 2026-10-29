import { useState } from 'react'
import { Character } from './Character'
import { FAQS } from '../data/content'

export function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="faq section">
      <div className="section-head">
        <h2 className="display-section js-reveal-heading">FAQ</h2>
      </div>

      <div className="faq__grid container">
        <div className="faq__character js-fade-up">
          <Character pose="faq" className="js-char-float faq__char" />
        </div>

        <div className="faq__list js-fade-up">
          <p className="meta faq__label">Frequently Answered Questions</p>
          {FAQS.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.q} className={`faq-item ${isOpen ? 'is-open' : ''}`}>
                <button
                  type="button"
                  className="faq-item__trigger"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span>{item.q}</span>
                  <span className="faq-item__icon" aria-hidden>
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                <div className="faq-item__panel" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}>
                  <div className="faq-item__inner">
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        .faq__grid {
          display: grid;
          grid-template-columns: 0.9fr 1.2fr;
          gap: clamp(1.5rem, 4vw, 3rem);
          align-items: end;
        }
        .faq__character {
          display: flex;
          justify-content: center;
          align-items: flex-end;
          min-height: 320px;
        }
        .faq__char {
          width: min(100%, 360px);
        }
        .faq__label {
          margin-bottom: 1.25rem;
        }
        .faq-item {
          margin-bottom: 0.65rem;
        }
        .faq-item__trigger {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 1rem 1.25rem;
          border-radius: var(--radius-pill);
          background: var(--color-pill);
          color: var(--color-pill-fg);
          text-align: left;
          font-size: 0.9rem;
          font-weight: 500;
          transition: transform 0.3s var(--ease-out), box-shadow 0.3s ease;
          box-shadow: var(--shadow-cta);
        }
        .faq-item__trigger:hover {
          transform: translateY(-2px);
        }
        .faq-item__icon {
          flex-shrink: 0;
          width: 1.5rem;
          text-align: center;
          font-size: 1.1rem;
        }
        .faq-item__panel {
          display: grid;
          transition: grid-template-rows 0.4s var(--ease-out);
        }
        .faq-item__inner {
          overflow: hidden;
        }
        .faq-item__inner p {
          padding: 0.9rem 1.25rem 0.4rem;
          color: var(--color-muted-fg);
          font-size: 0.9rem;
          line-height: 1.6;
        }
        @media (max-width: 800px) {
          .faq__grid {
            grid-template-columns: 1fr;
          }
          .faq__character {
            order: -1;
            min-height: 240px;
          }
          .faq__char {
            width: min(220px, 55vw);
          }
        }
      `}</style>
    </section>
  )
}
