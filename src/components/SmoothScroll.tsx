import { useEffect, type ReactNode } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { setLenis } from '../lib/lenis'

gsap.registerPlugin(ScrollTrigger)

type Props = { children: ReactNode }

export function SmoothScroll({ children }: Props) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.07,
      duration: 1.4,
      anchors: true,
      wheelMultiplier: 0.7,
      touchMultiplier: 0.85,
      respectReducedMotion: true,
    })

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }

    setLenis(lenis)
    lenis.on('scroll', ScrollTrigger.update)

    const ticker = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      gsap.ticker.remove(ticker)
      setLenis(null)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
