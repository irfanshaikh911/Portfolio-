import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initSectionReveals(root: HTMLElement | Document = document) {
  if (typeof CSS !== 'undefined' && CSS.supports?.('animation-timeline', 'view()')) {
    return { revert: () => undefined }
  }
  const ctx = gsap.context(() => {
    gsap.utils.toArray<HTMLElement>('.js-reveal-heading', root).forEach((el) => {
      gsap.fromTo(
        el,
        { clipPath: 'inset(0 0 100% 0)', y: 40 },
        {
          clipPath: 'inset(0 0 0% 0)',
          y: 0,
          duration: 1.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
          },
        },
      )
    })

    gsap.utils.toArray<HTMLElement>('.js-fade-up', root).forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
          },
        },
      )
    })

    gsap.utils.toArray<HTMLElement>('.sda-card', root).forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0.55, y: 32, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
          },
        },
      )
    })
  }, root)

  return ctx
}

export function initProjectsScroll(section: HTMLElement) {
  const track = section.querySelector<HTMLElement>('.projects__track')
  if (!track) return { revert: () => undefined }

  const mm = gsap.matchMedia()

  mm.add('(min-width: 901px)', () => {
    const getScroll = () => Math.max(0, track.scrollWidth - section.clientWidth)

    const tween = gsap.to(track, {
      x: () => -getScroll(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${getScroll()}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
      gsap.set(track, { clearProps: 'transform' })
    }
  })

  return mm
}

export function initProcessScroll(section: HTMLElement) {
  const steps = section.querySelectorAll<HTMLElement>('.process__step')
  const line = section.querySelector<HTMLElement>('.process__line-progress')
  const character = section.querySelector<HTMLElement>('.process__character')
  if (!steps.length) return { revert: () => undefined }

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=220%',
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    })

    if (line) {
      gsap.set(line, { scaleX: 0, transformOrigin: 'left center' })
      tl.to(line, { scaleX: 1, ease: 'none', duration: 1 }, 0)
    }

    steps.forEach((step, i) => {
      const fromX = i % 2 === 0 ? -60 : 60
      tl.fromTo(
        step,
        { opacity: 0.15, x: fromX, y: 20 },
        { opacity: 1, x: 0, y: 0, ease: 'power2.out', duration: 0.2 },
        i * 0.12,
      )
    })

    if (character) {
      tl.fromTo(
        character,
        { xPercent: -30, opacity: 0.4 },
        { xPercent: 30, opacity: 1, ease: 'none', duration: 1 },
        0,
      )
    }
  }, section)

  return ctx
}

export function initMarqueeScroll(section: HTMLElement) {
  const track = section.querySelector<HTMLElement>('.marquee__track')
  if (!track) return { revert: () => undefined }

  const ctx = gsap.context(() => {
    const loop = gsap.to(track, {
      xPercent: -50,
      duration: 28,
      ease: 'none',
      repeat: -1,
    })

    ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const v = self.getVelocity()
        const dir = v < 0 ? 1 : -1
        const speed = gsap.utils.clamp(0.6, 2.4, 1 + Math.abs(v) / 3000)
        loop.timeScale(dir * speed)
      },
    })
  }, section)

  return ctx
}
