import { forwardRef, useCallback, useEffect, useImperativeHandle } from 'react'
import type { AnimatedIconHandle, AnimatedIconProps } from './types'
import { scaledStrokeWidth } from './types'
import { motion, useAnimate } from 'motion/react'

const KNOB_ON = 12
const KNOB_OFF = 0

const ToggleIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = 'currentColor', strokeWidth = 2, className = '', active },
    ref,
  ) => {
    const [scope, animate] = useAnimate()
    const controlled = active != null
    const restX = controlled && active ? KNOB_ON : KNOB_OFF

    const start = useCallback(async () => {
      const preview = controlled ? (active ? KNOB_OFF : KNOB_ON) : KNOB_ON
      await animate('.toggle-knob', { x: preview }, { duration: 0.4, ease: 'easeInOut' })
      animate(
        '.toggle-track',
        { opacity: [1, 0.8, 1] },
        { duration: 0.4, ease: 'easeInOut' },
      )
    }, [active, animate, controlled])

    const stop = useCallback(() => {
      animate('.toggle-knob', { x: restX }, { duration: 0.2, ease: 'easeOut' })
      animate('.toggle-track', { opacity: 1 }, { duration: 0.2, ease: 'easeOut' })
    }, [animate, restX])

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }))

    useEffect(() => {
      animate('.toggle-knob', { x: restX }, { duration: 0.4, ease: 'easeInOut' })
    }, [animate, restX])

    return (
      <motion.svg
        ref={scope}
        onHoverStart={start}
        onHoverEnd={stop}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        stroke={color}
        strokeWidth={scaledStrokeWidth(strokeWidth, 32)}
        strokeLinecap="square"
        strokeMiterlimit="10"
        className={`theme-toggle-icon ${className}`.trim()}
      >
        <motion.path
          className="toggle-track"
          d="m10,7h12c4.971,0,9,4.029,9,9h0c0,4.971-4.029,9-9,9h-12c-4.971,0-9-4.029-9-9h0c0-4.971,4.029-9,9-9Z"
        />

        <motion.circle
          className="toggle-knob"
          cx="10"
          cy="16"
          r="5"
          style={{ transformOrigin: '10px 16px' }}
        />
      </motion.svg>
    )
  },
)

ToggleIcon.displayName = 'ToggleIcon'
export default ToggleIcon
