import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * InkReveal — wraps children with a sakura-pink ink brush wipe reveal.
 * On scroll into view:
 *   1. Overlay sweeps in from left  (covers text)
 *   2. Overlay sweeps out to right  (reveals text)
 * The irregular clip-path gives it a brushstroke feel.
 */
export default function InkReveal({ children, delay = 0, color = '#e8739a' }) {
  const wrapRef = useRef()
  const overlayRef = useRef()
  const childRef = useRef()

  useEffect(() => {
    const overlay = overlayRef.current
    const child = childRef.current
    if (!overlay || !child) return

    // Start hidden
    gsap.set(child, { opacity: 0 })
    gsap.set(overlay, { scaleX: 0, transformOrigin: 'left center' })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapRef.current,
        start: 'top 95%',
        once: true,
      },
      delay,
    })

    tl
      // Sweep in  →  text still hidden
      .to(overlay, {
        scaleX: 1,
        duration: 0.45,
        ease: 'power3.inOut',
      })
      // Text becomes visible exactly at peak coverage
      .set(child, { opacity: 1 })
      // Sweep out  →  reveals text
      .to(overlay, {
        scaleX: 0,
        transformOrigin: 'right center',
        duration: 0.45,
        ease: 'power3.inOut',
      })

    return () => {
      tl.kill()
      ScrollTrigger.getAll()
        .filter((st) => st.vars.trigger === wrapRef.current)
        .forEach((st) => st.kill())
    }
  }, [delay])

  return (
    <span
      ref={wrapRef}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      {/* Content */}
      <span ref={childRef} style={{ display: 'inline-block' }}>
        {children}
      </span>

      {/* Ink overlay */}
      <span
        ref={overlayRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: '-6px -4px',
          background: color,
          display: 'block',
          transformOrigin: 'left center',
          // Organic brush-stroke edges
          clipPath:
            'polygon(0% 12%, 1% 2%, 4% 0%, 18% 6%, 38% 1%, 58% 7%, 78% 2%, 94% 6%, 100% 0%, 100% 88%, 99% 98%, 96% 100%, 82% 94%, 62% 99%, 42% 93%, 22% 98%, 6% 94%, 0% 100%)',
          zIndex: 1,
        }}
      />
    </span>
  )
}
