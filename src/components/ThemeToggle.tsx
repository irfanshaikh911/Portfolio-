import { useRef } from 'react'
import ToggleIcon from './icons/toggle-icon'
import type { AnimatedIconHandle } from './icons/types'

type Props = {
  theme: 'light' | 'dark'
  onToggle: () => void
}

export function ThemeToggle({ theme, onToggle }: Props) {
  const isLight = theme === 'light'
  const iconRef = useRef<AnimatedIconHandle>(null)

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onToggle}
      onPointerEnter={() => iconRef.current?.startAnimation()}
      onPointerLeave={() => iconRef.current?.stopAnimation()}
      aria-pressed={isLight}
      aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      <ToggleIcon ref={iconRef} size={28} active={isLight} strokeWidth={1.75} />
      <style>{`
        .theme-toggle {
          display: grid;
          place-items: center;
          width: 36px;
          height: 36px;
          padding: 0;
          border: none;
          background: transparent;
          color: var(--color-fg);
          cursor: pointer;
        }
        .theme-toggle-icon {
          display: block;
          pointer-events: none;
        }
      `}</style>
    </button>
  )
}
