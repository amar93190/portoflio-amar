import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useSlashStore } from '../store/slashStore'

/**
 * KatanaSlash — full-screen diagonal slash effect.
 * Triggered via useSlashStore.triggerSlash()
 *
 * Visual:
 *   1. Thin white streak sweeps across screen at ~-28° in 90ms
 *   2. Sakura-pink accent line follows 30ms later
 *   3. Brief white screen flash
 *   4. Both fade out
 */
export default function KatanaSlash() {
  const { isSlashing } = useSlashStore()
  const whiteRef = useRef()
  const pinkRef = useRef()
  const flashRef = useRef()
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isSlashing) return
    if (hasAnimated.current) return
    hasAnimated.current = true

    const white = whiteRef.current
    const pink = pinkRef.current
    const flash = flashRef.current

    // Reset
    gsap.set([white, pink, flash], { opacity: 0 })
    gsap.set([white, pink], { clipPath: 'inset(0 100% 0 0)' })

    const tl = gsap.timeline({
      onComplete: () => {
        hasAnimated.current = false
      },
    })

    tl
      // Flash
      .to(flash, { opacity: 0.06, duration: 0.04, ease: 'none' })
      .to(flash, { opacity: 0, duration: 0.18, ease: 'power2.out' })

      // White slash sweeps across
      .set(white, { opacity: 1 }, 0)
      .to(
        white,
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.09,
          ease: 'power4.out',
        },
        0.01
      )
      .to(white, { opacity: 0, duration: 0.28, ease: 'power2.in' }, 0.1)

      // Pink accent follows
      .set(pink, { opacity: 0.7 }, 0.04)
      .to(
        pink,
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.09,
          ease: 'power4.out',
        },
        0.05
      )
      .to(pink, { opacity: 0, duration: 0.32, ease: 'power2.in' }, 0.14)
  }, [isSlashing])

  const lineBase = {
    position: 'fixed',
    top: '50%',
    left: '-10%',
    width: '120%',
    pointerEvents: 'none',
    zIndex: 9990,
    transformOrigin: 'center',
    transform: 'translateY(-50%) rotate(-28deg)',
    clipPath: 'inset(0 100% 0 0)',
    opacity: 0,
  }

  return (
    <>
      {/* Screen flash */}
      <div
        ref={flashRef}
        style={{
          position: 'fixed',
          inset: 0,
          background: '#fff',
          pointerEvents: 'none',
          zIndex: 9989,
          opacity: 0,
        }}
      />

      {/* White core slash */}
      <div
        ref={whiteRef}
        style={{
          ...lineBase,
          height: '3px',
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 10%, #ffffff 40%, #ffffff 60%, rgba(255,255,255,0.3) 90%, transparent 100%)',
          filter: 'blur(0.5px) drop-shadow(0 0 6px rgba(255,255,255,0.9))',
        }}
      />

      {/* Sakura accent slash */}
      <div
        ref={pinkRef}
        style={{
          ...lineBase,
          height: '1.5px',
          marginTop: '5px',
          background:
            'linear-gradient(90deg, transparent 0%, rgba(232,115,154,0.2) 10%, #e8739a 45%, #e8739a 55%, rgba(232,115,154,0.2) 90%, transparent 100%)',
          filter: 'drop-shadow(0 0 4px rgba(232,115,154,0.8))',
        }}
      />
    </>
  )
}
