import { motion, useReducedMotion } from 'motion/react'

const ease = [0.22, 1, 0.36, 1] as const

type Props = {
  text: string
  className?: string
  delay?: number
}

export function LetterTitle({ text, className = '', delay = 0.35 }: Props) {
  const reduce = useReducedMotion()
  const letters = Array.from(text)

  if (reduce) {
    return <h1 className={className}>{text}</h1>
  }

  return (
    <h1 className={className} aria-label={text}>
      {letters.map((char, i) => (
        <span key={`${char}-${i}`} className="letter-title__mask" aria-hidden>
          <motion.span
            className="letter-title__char"
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.55, delay: delay + i * 0.055, ease }}
          >
            {char}
          </motion.span>
        </span>
      ))}
    </h1>
  )
}
