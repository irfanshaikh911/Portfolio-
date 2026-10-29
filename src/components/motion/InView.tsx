import { useRef, useState, type ReactNode } from 'react'
import { motion, useInView, type Transition, type Variant } from 'motion/react'

type Tag = 'div' | 'section' | 'aside' | 'li' | 'span'

type Props = {
  children: ReactNode
  className?: string
  as?: Tag
  once?: boolean
  delay?: number
  variants?: { hidden: Variant; visible: Variant }
  transition?: Transition
}

const defaults = {
  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

export function InView({
  children,
  className,
  as = 'div',
  once = true,
  delay = 0,
  variants = defaults,
  transition = { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once, margin: '-8% 0px' })
  const [viewed, setViewed] = useState(false)
  const Tag = motion[as] as typeof motion.div

  return (
    <Tag
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView || viewed ? 'visible' : 'hidden'}
      variants={variants}
      transition={transition}
      onAnimationComplete={() => {
        if (once && inView) setViewed(true)
      }}
    >
      {children}
    </Tag>
  )
}
