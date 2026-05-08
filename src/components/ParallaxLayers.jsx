import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const SPEEDS = [0.06, 0.15]

export default function ParallaxLayers({ heroRef }) {
  const layerRefs = useRef([])

  // Scroll parallax
  useEffect(() => {
    if (!heroRef?.current) return

    const ctx = gsap.context(() => {
      SPEEDS.forEach((speed, i) => {
        const el = layerRefs.current[i]
        if (!el) return
        gsap.to(el, {
          y: -(speed * 220),
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      })

      gsap.to('.parallax-group', {
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: '60% top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [heroRef])

  return (
    <div
      className="parallax-group"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}
    >

      {/* ── Layer 0 — Distant misty background ───────────────────── */}
      <svg
        ref={(el) => (layerRefs.current[0] = el)}
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100%' }}
      >
        <path
          d="M0,580 C120,520 260,555 400,495 C510,448 620,472 730,435 C840,398 960,450 1100,478 C1240,506 1360,482 1440,468 L1440,900 L0,900 Z"
          fill="rgba(199,202,209,0.04)"
        />
      </svg>

      {/* ── Layer 1 — Both Fuji images superimposed in same container */}
      <div
        ref={(el) => (layerRefs.current[1] = el)}
        style={{ position: 'absolute', inset: 0 }}
      >
        <img
          src="/ChatGPT Image 8 mai 2026, 19_29_17.png"
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center bottom',
            opacity: 0.28,
            mixBlendMode: 'luminosity',
          }}
        />

        {/* Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(13,15,20,0.4) 0%, rgba(13,15,20,0.05) 50%, rgba(13,15,20,0.5) 100%)',
          }}
        />
      </div>

      {/* Bottom fade */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '30%',
          background: 'linear-gradient(to top, rgba(13,15,20,0.75) 0%, transparent 100%)',
        }}
      />
    </div>
  )
}
