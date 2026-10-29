import { useRef } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getMoreProjects, getProject } from '../data/content'
import { ProjectGridCard, projectGridCardStyles } from '../components/ProjectGridCard'
import { usePageReveals } from '../hooks/usePageReveals'

function MetaIcon({ d }: { d: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d={d} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ProjectDetailPage() {
  const pageRef = useRef<HTMLElement>(null)
  const { id = '' } = useParams()
  const project = getProject(id)
  usePageReveals(pageRef, id)

  if (!project) return <Navigate to="/projects" replace />

  const more = getMoreProjects(project.id)
  const hero = project.image
  const wide = project.gallery[0] ?? project.image
  const left = project.gallery[1] ?? project.image
  const right = project.gallery[2] ?? project.image
  const live = project.liveUrl && project.liveUrl !== '#'

  return (
    <article className="case" ref={pageRef}>
      <section className="case__intro">
        <div className="case__copy">
          <Link to="/projects" className="case__back">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path
                d="M11 7H3M6.5 3.5L3 7l3.5 3.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back
          </Link>
          <h1 className="js-reveal-heading">{project.title}</h1>
          <p className="js-fade-up">{project.description}</p>
          {live ? (
            <a
              className="case__demo js-fade-up"
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
            >
              Live Demo
              <span aria-hidden />
            </a>
          ) : (
            <span className="case__demo js-fade-up">
              Live Demo
              <span aria-hidden />
            </span>
          )}
        </div>
        <div className="case__hero-media js-fade-up">
          <img src={hero} alt={`${project.title} preview`} />
        </div>
      </section>

      <dl className="case__meta">
        <div>
          <MetaIcon d="M4 7h16M4 12h10M4 17h7" />
          <div>
            <dt>Services</dt>
            <dd>{project.services}</dd>
          </div>
        </div>
        <div>
          <MetaIcon d="M12 12a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM5 19.5c.9-2.6 3.2-4 7-4s6.1 1.4 7 4" />
          <div>
            <dt>Client</dt>
            <dd>{project.client}</dd>
          </div>
        </div>
        <div>
          <MetaIcon d="M12 7v5l3 2M12 21a9 9 0 100-18 9 9 0 000 18z" />
          <div>
            <dt>Duration</dt>
            <dd>{project.duration}</dd>
          </div>
        </div>
        <div>
          <MetaIcon d="M7 4v2M17 4v2M5 9h14M6 6h12a1 1 0 011 1v12a1 1 0 01-1 1H6a1 1 0 01-1-1V7a1 1 0 011-1z" />
          <div>
            <dt>Date</dt>
            <dd>{project.date}</dd>
          </div>
        </div>
      </dl>

      <section className="case__gallery" aria-label="Project gallery">
        <div className="case__shot case__shot--wide sda-card">
          <img src={wide} alt="" />
        </div>
        <div className="case__shot-row">
          <div className="case__shot sda-card">
            <img src={left} alt="" />
          </div>
          <div className="case__shot sda-card">
            <img src={right} alt="" />
          </div>
        </div>
      </section>

      <section className="case__more">
        <div className="case__more-head">
          <h2 className="js-reveal-heading">MORE PROJECT</h2>
          <Link to="/projects" className="case__all pill">
            View all Projects
            <span className="case__all-dot" aria-hidden />
          </Link>
        </div>
        <div className="case__more-grid">
          {more.map((p) => (
            <ProjectGridCard key={p.id} project={p} />
          ))}
        </div>
      </section>

      <style>{`
        ${projectGridCardStyles}
        .case {
          background: var(--color-bg);
        }
        .case__intro {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
          gap: 32px;
          align-items: center;
          padding: 40px 32px 48px;
          border-left: 1px solid var(--color-border);
          border-right: 1px solid var(--color-border);
          border-bottom: 1px solid var(--color-border);
        }
        .case__copy {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 18px;
          min-width: 0;
        }
        .case__back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          height: 36px;
          padding: 0 14px 0 12px;
          border-radius: 999px;
          background: #f2f2f2;
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 600;
          color: var(--color-fg);
        }
        [data-theme='dark'] .case__back {
          background: var(--color-muted);
        }
        .case__copy h1 {
          margin: 0;
          font-family: var(--font-section);
          font-size: clamp(48px, 7vw, 92px);
          font-weight: 700;
          line-height: 0.95;
          letter-spacing: -0.04em;
        }
        .case__copy p {
          margin: 0;
          max-width: 42ch;
          font-family: var(--font-body);
          font-size: 16px;
          font-weight: 500;
          line-height: 1.6;
          letter-spacing: -0.02em;
          color: #616161;
        }
        [data-theme='dark'] .case__copy p {
          color: var(--color-muted-fg);
        }
        .case__demo {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          height: 44px;
          padding: 0 18px;
          border-radius: 999px;
          background: var(--color-pill);
          color: var(--color-pill-fg);
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 600;
        }
        .case__demo span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--color-accent);
        }
        .case__hero-media {
          border-radius: 24px;
          overflow: hidden;
          background: #f2f2f2;
          min-height: 280px;
        }
        [data-theme='dark'] .case__hero-media {
          background: var(--color-muted);
        }
        .case__hero-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          aspect-ratio: 4 / 3;
        }
        .case__meta {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          margin: 0;
          border-left: 1px solid var(--color-border);
          border-right: 1px solid var(--color-border);
          border-bottom: 1px solid var(--color-border);
        }
        .case__meta > div {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 22px 24px;
          border-right: 1px solid var(--color-border);
        }
        .case__meta > div:last-child {
          border-right: none;
        }
        .case__meta svg {
          flex-shrink: 0;
          color: var(--color-fg);
        }
        .case__meta dt {
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #9a9a9a;
        }
        .case__meta dd {
          margin: 4px 0 0;
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 600;
          color: var(--color-fg);
        }
        .case__gallery {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding: 28px;
          border-left: 1px solid var(--color-border);
          border-right: 1px solid var(--color-border);
          border-bottom: 1px solid var(--color-border);
        }
        .case__shot {
          border-radius: 24px;
          overflow: hidden;
          background: #f2f2f2;
        }
        [data-theme='dark'] .case__shot {
          background: var(--color-muted);
        }
        .case__shot img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          aspect-ratio: 16 / 10;
        }
        .case__shot--wide img {
          aspect-ratio: 16 / 8;
        }
        .case__shot-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .case__more {
          padding: 48px 28px 64px;
          border-left: 1px solid var(--color-border);
          border-right: 1px solid var(--color-border);
          border-bottom: 1px solid var(--color-border);
        }
        .case__more-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 36px;
        }
        .case__more-head h2 {
          margin: 0;
          font-family: var(--font-section);
          font-size: clamp(36px, 5vw, 64px);
          font-weight: 700;
          letter-spacing: -0.04em;
        }
        .case__all {
          flex-shrink: 0;
        }
        .case__all-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--color-accent);
        }
        .case__more-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px 28px;
        }
        @media (max-width: 809px) {
          .case__intro {
            grid-template-columns: 1fr;
            padding: 28px 20px 36px;
          }
          .case__meta {
            grid-template-columns: 1fr 1fr;
          }
          .case__meta > div:nth-child(2) {
            border-right: none;
          }
          .case__meta > div:nth-child(1),
          .case__meta > div:nth-child(2) {
            border-bottom: 1px solid var(--color-border);
          }
          .case__shot-row,
          .case__more-grid {
            grid-template-columns: 1fr;
          }
          .case__more {
            padding: 36px 20px 48px;
          }
          .case__more-head {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </article>
  )
}
