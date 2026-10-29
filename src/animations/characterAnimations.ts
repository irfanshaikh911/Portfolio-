import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initCharacterParallax(selector = '.js-char-float') {
  const ctx = gsap.context(() => {
    gsap.utils.toArray<HTMLElement>(selector).forEach((el) => {
      gsap.to(el, {
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })
  })

  return ctx
}
