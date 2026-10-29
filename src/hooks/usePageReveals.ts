import { useEffect, type RefObject } from 'react'
import { initSectionReveals } from '../animations/scrollAnimations'

export function usePageReveals(rootRef: RefObject<HTMLElement | null>, key?: string) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const ctx = initSectionReveals(root)
    return () => ctx.revert()
  }, [rootRef, key])
}

