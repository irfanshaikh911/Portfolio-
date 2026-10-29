import { Link } from 'react-router-dom'
import type { Project } from '../data/content'

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M3 7h8M7.5 3.5L11 7l-3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ProjectGridCard({ project }: { project: Project }) {
  return (
    <Link to={`/projects/${project.id}`} className="pg-card sda-card">
      <div className="pg-card__media">
        <img src={project.image} alt={`${project.title} preview`} loading="lazy" />
      </div>
      <div className="pg-card__meta">
        <p>
          <strong>{project.title}</strong>
          <span aria-hidden> · </span>
          <span>{project.category}</span>
        </p>
        <span className="pg-card__go" aria-hidden>
          <Arrow />
        </span>
      </div>
    </Link>
  )
}

export const projectGridCardStyles = `
  .pg-card {
    display: flex;
    flex-direction: column;
    gap: 16px;
    min-width: 0;
  }
  .pg-card__media {
    position: relative;
    aspect-ratio: 16 / 11;
    border-radius: 22px;
    overflow: hidden;
    background: #f2f2f2;
  }
  [data-theme='dark'] .pg-card__media {
    background: var(--color-muted);
  }
  .pg-card__media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.7s var(--ease-out);
  }
  .pg-card:hover .pg-card__media img {
    transform: scale(1.04);
  }
  .pg-card__meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 0 4px 4px;
  }
  .pg-card__meta p {
    margin: 0;
    font-family: var(--font-body);
    font-size: 15px;
    font-weight: 500;
    letter-spacing: -0.02em;
    color: var(--color-fg);
  }
  .pg-card__meta span {
    color: var(--color-muted-fg);
    font-weight: 500;
  }
  .pg-card__meta strong {
    font-weight: 650;
    color: var(--color-fg);
    transition: color 0.2s ease;
  }
  .pg-card:hover .pg-card__meta strong {
    color: var(--color-accent);
  }
  .pg-card__go {
    display: grid;
    place-items: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1px solid var(--color-border);
    color: var(--color-fg);
    flex-shrink: 0;
    transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
  }
  .pg-card:hover .pg-card__go {
    background: var(--color-fg);
    color: var(--color-bg);
    border-color: var(--color-fg);
  }
`
