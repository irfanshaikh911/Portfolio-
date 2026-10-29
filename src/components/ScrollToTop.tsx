import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getLenis, scrollPageToTop } from '../lib/lenis'

gsap.registerPlugin(ScrollTrigger)

export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      let cancelled = false
      const tryScroll = (attempt = 0) => {
        if (cancelled) return
        const el = document.getElementById(hash.slice(1))
        if (!el) {
          if (attempt < 12) window.setTimeout(() => tryScroll(attempt + 1), 50)
          return
        }
        const instance = getLenis()
        if (instance) instance.scrollTo(el, { offset: -8 })
        else el.scrollIntoView({ block: 'start' })
      }
      tryScroll()
      return () => {
        cancelled = true
      }
    }

    scrollPageToTop(true)
    const id = requestAnimationFrame(() => {
      scrollPageToTop(true)
      ScrollTrigger.refresh()
    })
    return () => cancelAnimationFrame(id)
  }, [pathname, hash])

  return null
}
