import { useEffect, useRef, useState, type CSSProperties } from 'react'

import heroPortraitImg from '../assets/images/character/hero-portrait.png'
import aboutImg from '../assets/images/character/about.png'
import processImg from '../assets/images/character/process.png'
import faqImg from '../assets/images/character/faq.png'
import ideaImg from '../assets/images/character/idea.png'

export type CharacterPose = 'hero' | 'about' | 'process' | 'faq' | 'idea'

const POSE_SRC: Record<CharacterPose, string> = {
  hero: heroPortraitImg,
  about: aboutImg,
  process: processImg,
  faq: faqImg,
  idea: ideaImg,
}

type Props = {
  pose: CharacterPose
  className?: string
  alt?: string
  style?: CSSProperties
  priority?: boolean
  parallax?: boolean
}

export function Character({
  pose,
  className = '',
  alt = 'Irfan character',
  style,
  priority = false,
  parallax = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(priority)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (priority) {
      setVisible(true)
      return
    }
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { rootMargin: '200px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [priority])

  useEffect(() => {
    if (!parallax || !ref.current) return
    const el = ref.current
    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const mid = rect.top + rect.height / 2
      const offset = (mid - window.innerHeight / 2) * -0.04
      el.style.setProperty('--char-y', `${offset}px`)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [parallax])

  return (
    <div
      ref={ref}
      className={`character character--${pose} ${className}`}
      style={{ ...style, transform: parallax ? 'translateY(var(--char-y, 0))' : style?.transform }}
      data-pose={pose}
    >
      {visible && (
        <img
          src={POSE_SRC[pose]}
          alt={alt}
          className={`character__img ${loaded ? 'is-loaded' : ''}`}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          draggable={false}
        />
      )}
      <style>{`
        .character {
          position: relative;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          pointer-events: none;
          user-select: none;
          will-change: transform;
        }
        .character__img {
          width: 100%;
          height: auto;
          object-fit: contain;
          opacity: 0;
          transition: opacity 0.6s ease;
          filter: drop-shadow(0 18px 40px rgba(0, 0, 0, 0.12));
        }
        .character:not(.character--hero) .character__img {
          mix-blend-mode: screen;
          filter: drop-shadow(0 18px 40px rgba(0, 0, 0, 0.18));
        }
        [data-theme='dark'] .character:not(.character--hero) .character__img {
          mix-blend-mode: normal;
          filter: drop-shadow(0 18px 40px rgba(0, 0, 0, 0.45));
        }
        .character__img.is-loaded {
          opacity: 1;
        }
      `}</style>
    </div>
  )
}
