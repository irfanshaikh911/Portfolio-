import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** Soft parallax only — never fade hero content out on scroll. */
export function initHeroAnimations(root: HTMLElement) {
  const ctx = gsap.context(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const title = root.querySelector<HTMLElement>('[data-hero="title"]')
    const character = root.querySelector<HTMLElement>('[data-hero="character"]')

    if (title) {
      gsap.to(title, {
        y: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }

    if (character) {
      gsap.to(character, {
        y: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }
  }, root)

  return ctx
}
