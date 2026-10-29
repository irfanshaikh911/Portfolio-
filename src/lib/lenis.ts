import type Lenis from 'lenis'

let instance: Lenis | null = null

export function setLenis(lenis: Lenis | null) {
  instance = lenis
}

export function stopLenis() {
  instance?.stop()
}

export function startLenis() {
  instance?.start()
}

export function getLenis() {
  return instance
}

export function scrollPageToTop(immediate = true) {
  const lenis = instance
  if (lenis) lenis.scrollTo(0, { immediate, force: true })
  window.scrollTo({ top: 0, left: 0, behavior: immediate ? 'auto' : 'smooth' })
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

