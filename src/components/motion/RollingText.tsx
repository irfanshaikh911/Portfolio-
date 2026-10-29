import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'motion/react'

type Props = {
  text: string
  className?: string
}

const REEL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

function buildReel(char: string) {
  if (char === ' ') return ['\u00A0', '\u00A0']
  const upper = char.toUpperCase()
  const start = Math.max(0, REEL.indexOf(upper))
  const steps = 12
  const reel: string[] = [char]
  for (let i = 1; i <= steps; i++) {
    const next = REEL[(start + i) % REEL.length]
    reel.push(char === char.toUpperCase() ? next : next.toLowerCase())
  }
  reel.push(char)
  return reel
}

function CounterLetter({
  char,
  index,
  hovered,
  total,
}: {
  char: string
  index: number
  hovered: boolean
  total: number
}) {
  const reel = useMemo(() => buildReel(char), [char])
  const endY = `-${((reel.length - 1) / reel.length) * 100}%`
  const display = char === ' ' ? '\u00A0' : char

  return (
    <span className="rolling-text__cell">
      {/* Sets cell width to the real letter only (not the widest reel glyph) */}
      <span className="rolling-text__measure">{display}</span>
      <motion.span
        className="rolling-text__stack"
        style={{ left: '50%', x: '-50%' }}
        initial={false}
        animate={{ y: hovered ? endY : '0%' }}
        transition={{
          type: 'tween',
          duration: hovered ? 0.58 + index * 0.03 : 0.38,
          ease: hovered ? [0.12, 0.75, 0.2, 1] : [0.22, 1, 0.36, 1],
          delay: hovered ? index * 0.04 : (total - 1 - index) * 0.03,
        }}
      >
        {reel.map((glyph, i) => (
          <span key={`${glyph}-${i}`} className="rolling-text__glyph">
            {glyph}
          </span>
        ))}
      </motion.span>
    </span>
  )
}

/** Slot-machine / counter spin for nav labels. */
export function RollingText({ text, className = '' }: Props) {
  const rootRef = useRef<HTMLSpanElement>(null)
  const [hovered, setHovered] = useState(false)
  const chars = Array.from(text)

  useEffect(() => {
    const el = rootRef.current
    const host = el?.closest('a') ?? el
    if (!host) return
    const onEnter = () => setHovered(true)
    const onLeave = () => setHovered(false)
    host.addEventListener('mouseenter', onEnter)
    host.addEventListener('mouseleave', onLeave)
    return () => {
      host.removeEventListener('mouseenter', onEnter)
      host.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <span ref={rootRef} className={`rolling-text ${className}`.trim()} aria-hidden="true">
      {chars.map((char, i) => (
        <CounterLetter
          key={`${char}-${i}`}
          char={char}
          index={i}
          hovered={hovered}
          total={chars.length}
        />
      ))}
    </span>
  )
}
