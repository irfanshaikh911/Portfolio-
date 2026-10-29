import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'motion/react'

type Props = {
  value: number
  suffix?: string
  className?: string
}

export function AnimatedNumber({ value, suffix = '', className }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { stiffness: 60, damping: 18 })

  useEffect(() => {
    if (inView) motionValue.set(value)
  }, [inView, motionValue, value])

  useEffect(() => {
    const unsub = spring.on('change', (latest) => {
      if (!ref.current) return
      ref.current.textContent = `${Math.round(latest)}${suffix}`
    })
    return () => unsub()
  }, [spring, suffix])

  return (
    <motion.span ref={ref} className={className}>
      0{suffix}
    </motion.span>
  )
}
