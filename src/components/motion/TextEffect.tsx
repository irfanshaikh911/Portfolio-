import { motion, type Variants } from 'motion/react'

type Props = {
  children: string
  className?: string
  as?: 'p' | 'span' | 'h1' | 'h2'
  per?: 'word' | 'char'
  delay?: number
  preset?: 'blur' | 'slide' | 'premium'
}

const presets: Record<string, Variants> = {
  blur: {
    hidden: { opacity: 0, y: 12, filter: 'blur(10px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
  slide: {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
  },
  premium: {
    hidden: {
      opacity: 0,
      y: '0.65em',
      rotateX: 45,
      filter: 'blur(8px)',
    },
    visible: {
      opacity: 1,
      y: '0em',
      rotateX: 0,
      filter: 'blur(0px)',
    },
  },
}

export function TextEffect({
  children,
  className,
  as = 'p',
  per = 'word',
  delay = 0,
  preset = 'blur',
}: Props) {
  const Tag = motion[as] as typeof motion.p
  const segments = per === 'char' ? Array.from(children) : children.split(/(\s+)/)
  const item = presets[preset]
  const stagger = per === 'char' ? 0.018 : preset === 'premium' ? 0.065 : 0.045

  return (
    <Tag
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
      style={preset === 'premium' ? { perspective: 800 } : undefined}
    >
      <span className="sr-only">{children}</span>
      {segments.map((seg, i) => {
        const isSpace = /^\s+$/.test(seg)
        if (isSpace) {
          return (
            <span key={`sp-${i}`} aria-hidden style={{ whiteSpace: 'pre' }}>
              {seg}
            </span>
          )
        }
        return (
          <motion.span
            key={`${seg}-${i}`}
            aria-hidden
            className={preset === 'premium' ? 'text-effect__word' : undefined}
            variants={item}
            transition={{
              duration: preset === 'premium' ? 0.55 : 0.45,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              display: 'inline-block',
              whiteSpace: 'pre',
              transformOrigin: '50% 100%',
              transformStyle: 'preserve-3d',
            }}
          >
            {seg}
          </motion.span>
        )
      })}
    </Tag>
  )
}
