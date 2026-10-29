import { useEffect } from 'react'
import { Hero } from '../components/Hero'
import { Projects } from '../components/Projects'
import { About } from '../components/About'
import { Services } from '../components/Services'
import { Process } from '../components/Process'
import { Closeout } from '../components/Closeout'
import { initSectionReveals } from '../animations/scrollAnimations'
import { initCharacterParallax } from '../animations/characterAnimations'

export function HomePage() {
  useEffect(() => {
    const supportsView =
      typeof CSS !== 'undefined' && CSS.supports?.('animation-timeline', 'view()')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const reveals = supportsView || reduce ? { revert: () => undefined } : initSectionReveals()
    const chars = reduce ? { revert: () => undefined } : initCharacterParallax()
    return () => {
      reveals.revert()
      chars.revert()
    }
  }, [])

  return (
    <>
      <Hero />
      <Projects />
      <About />
      <Services />
      <Process />
      <Closeout />
    </>
  )
}
