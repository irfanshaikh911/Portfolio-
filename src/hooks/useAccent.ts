import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export type Accent = 'cyan' | 'red' | 'green'

export function useAccent(): Accent {
  const { pathname } = useLocation()
  const accent: Accent = pathname.startsWith('/projects')
    ? 'red'
    : pathname.startsWith('/services')
      ? 'green'
      : 'cyan'

  useEffect(() => {
    const root = document.documentElement
    if (accent === 'cyan') root.removeAttribute('data-accent')
    else root.setAttribute('data-accent', accent)
  }, [accent])

  return accent
}
