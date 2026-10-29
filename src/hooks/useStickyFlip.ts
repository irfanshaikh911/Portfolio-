import { useEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Options = {
  panelSelector: string
  images: string[]
  frontSelector: string
  backSelector: string
}

function navOffset() {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--nav-h')
  const n = Number.parseFloat(raw)
  return Number.isFinite(n) ? n : 84
}

/**
 * Flip the character only while the next sticky panel covers the current one.
 * Start when the next panel is halfway up the screen; finish when it docks under the nav.
 */
export function useStickyFlip(
  sectionRef: RefObject<HTMLElement | null>,
  carouselRef: RefObject<HTMLElement | null>,
  { panelSelector, images, frontSelector, backSelector }: Options,
) {
  useEffect(() => {
    const section = sectionRef.current
    const carousel = carouselRef.current
    if (!section || !carousel || images.length < 2) return

    const panels = Array.from(section.querySelectorAll<HTMLElement>(panelSelector))
    if (panels.length < 2) return

    const frontImg = carousel.querySelector<HTMLImageElement>(frontSelector)
    const backImg = carousel.querySelector<HTMLImageElement>(backSelector)
    const pair = { from: 0, to: 0 }

    const setFaces = (from: number, to: number) => {
      if (pair.from === from && pair.to === to) return
      pair.from = from
      pair.to = to
      if (frontImg) frontImg.src = images[from]
      if (backImg) backImg.src = images[to]
    }

    const settle = (index: number) => {
      setFaces(index, index)
      gsap.set(carousel, { rotateY: 0 })
    }

    settle(0)
    gsap.set(carousel, { force3D: true, transformOrigin: '50% 50%' })

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const triggers: ScrollTrigger[] = []

    if (reduce) {
      panels.forEach((panel, i) => {
        triggers.push(
          ScrollTrigger.create({
            trigger: panel,
            start: () => `top top+=${navOffset()}`,
            end: () => `bottom top+=${navOffset()}`,
            onEnter: () => settle(i),
            onEnterBack: () => settle(i),
          }),
        )
      })
    } else {
      for (let i = 0; i < panels.length - 1; i++) {
        const from = i
        const to = i + 1
        triggers.push(
          ScrollTrigger.create({
            trigger: panels[to],
            start: 'top 50%',
            end: () => `top top+=${navOffset()}`,
            scrub: 0.35,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              setFaces(from, to)
              gsap.set(carousel, { rotateY: self.progress * 180 })
            },
            onLeave: () => settle(to),
            onLeaveBack: () => settle(from),
          }),
        )
      }
    }

    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', onResize)
    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 120)

    return () => {
      window.clearTimeout(refreshId)
      window.removeEventListener('resize', onResize)
      triggers.forEach((t) => t.kill())
      gsap.killTweensOf(carousel)
      gsap.set(carousel, { clearProps: 'transform' })
    }
  }, [sectionRef, carouselRef, panelSelector, images, frontSelector, backSelector])
}
