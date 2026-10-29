import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, type SpringOptions } from 'motion/react'

const SPRING: SpringOptions = { stiffness: 26.7, damping: 4.1, mass: 0.2 }

type Props = {
  children: ReactNode
  intensity?: number
  range?: number
  className?: string
}

export function Magnetic({ children, intensity = 0.35, range = 90, className }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, SPRING)
  const springY = useSpring(y, SPRING)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const dx = e.clientX - (rect.left + rect.width / 2)
      const dy = e.clientY - (rect.top + rect.height / 2)
      const dist = Math.hypot(dx, dy)
      if (hovered && dist <= range) {
        const scale = 1 - dist / range
        x.set(dx * intensity * scale)
        y.set(dy * intensity * scale)
      } else {
        x.set(0)
        y.set(0)
      }
    }
    document.addEventListener('mousemove', onMove)
    return () => document.removeEventListener('mousemove', onMove)
  }, [hovered, intensity, range, x, y])

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY, display: 'inline-flex' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false)
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}
