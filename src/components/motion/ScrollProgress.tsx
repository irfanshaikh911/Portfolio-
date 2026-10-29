import { motion, useScroll, useSpring } from 'motion/react'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.2 })

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX, transformOrigin: '0% 50%' }}
      aria-hidden
    />
  )
}
