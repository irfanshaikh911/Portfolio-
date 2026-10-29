import {
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react'
import { Magnetic } from './motion/Magnetic'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: 'default' | 'accent' | 'ghost'
  href?: string
  as?: 'button' | 'a'
}

export function MagneticButton({
  children,
  variant = 'default',
  className = '',
  href,
  as,
  ...rest
}: Props) {
  const classes = `pill ${variant === 'accent' ? 'pill--accent' : ''} ${variant === 'ghost' ? 'pill--ghost' : ''} ${className}`.trim()

  if (as === 'a' || href) {
    const { type: _type, ...anchorRest } = rest
    return (
      <Magnetic>
        <a
          className={classes}
          href={href ?? '#contact'}
          {...(anchorRest as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      </Magnetic>
    )
  }

  return (
    <Magnetic>
      <button className={classes} type="button" {...rest}>
        {children}
      </button>
    </Magnetic>
  )
}
