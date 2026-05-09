import { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { useSiteStore } from '../store/siteStore'

export default function Loader() {
  const loaderRef = useRef()
  const videoRef = useRef()
  const slash1Ref = useRef()
  const slash2Ref = useRef()
  const topBlockRef = useRef()
  const btnBlockRef = useRef()
  const [clicked, setClicked] = useState(false)

  const setReady = useSiteStore((s) => s.setReady)

  // Lock scroll while loader is visible
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    window.scrollTo(0, 0)
    return () => { document.body.style.overflow = '' }
  }, [])

  // Intro animation on mount
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 })

    // Video fades + scales in
    tl.fromTo(
      videoRef.current,
      { opacity: 0, scale: 1.08 },
      { opacity: 1, scale: 1, duration: 1.6, ease: 'power3.out' }
    )

    // Title block slides + fades in
    tl.fromTo(
      topBlockRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
      '-=1.0'
    )

    // Button block slides + fades in
    tl.fromTo(
      btnBlockRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
      '-=0.7'
    )
  }, [])

  const handleEnter = () => {
    if (clicked) return
    setClicked(true)

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = ''
        window.scrollTo(0, 0)
        setReady()
        if (videoRef.current) { videoRef.current.pause(); videoRef.current.src = '' }
        if (loaderRef.current) loaderRef.current.style.display = 'none'
      },
    })

    // Slash
    tl.set([slash1Ref.current, slash2Ref.current], { clipPath: 'inset(0 100% 0 0)', opacity: 1 })
      .to(slash1Ref.current, { clipPath: 'inset(0 0% 0 0)', duration: 0.1, ease: 'power4.out' })
      .to(slash2Ref.current, { clipPath: 'inset(0 0% 0 0)', duration: 0.1, ease: 'power4.out' }, '<0.03')
      .to([slash1Ref.current, slash2Ref.current], { opacity: 0, duration: 0.35 })

    // Iris close
    tl.to(loaderRef.current, {
      clipPath: 'circle(0% at 50% 50%)',
      duration: 0.85,
      ease: 'power4.inOut',
    }, '-=0.1')
  }

  return (
    <div
      ref={loaderRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        overflow: 'hidden',
        clipPath: 'circle(150% at 50% 50%)',
        cursor: 'none',
      }}
    >
      {/* ── Video background ──────────────────────────────────────── */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0,
        }}
      >
        <source src="/1769778911.mp4" type="video/mp4" />
      </video>

      {/* ── Slash lines ───────────────────────────────────────────── */}
      <div ref={slash1Ref} style={{
        position: 'absolute', top: 'calc(50% - 1px)', left: '-5%', width: '110%', height: '2px',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15) 20%, #fff 50%, rgba(255,255,255,0.15) 80%, transparent)',
        transform: 'rotate(-1deg)',
        filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.9))',
        clipPath: 'inset(0 100% 0 0)', opacity: 0, zIndex: 10, pointerEvents: 'none',
      }} />
      <div ref={slash2Ref} style={{
        position: 'absolute', top: 'calc(50% + 4px)', left: '-5%', width: '110%', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(166,31,47,0.2) 20%, #A61F2F 50%, rgba(166,31,47,0.2) 80%, transparent)',
        transform: 'rotate(-1deg)',
        filter: 'drop-shadow(0 0 6px rgba(166,31,47,0.8))',
        clipPath: 'inset(0 100% 0 0)', opacity: 0, zIndex: 10, pointerEvents: 'none',
      }} />

      {/* ── Content ───────────────────────────────────────────────── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '60px 5vw',
        zIndex: 5,
      }}>

        {/* Top — title block */}
        <div ref={topBlockRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', opacity: 0 }}>

          {/* Japanese subtitle */}
          <span className="jp" style={{
            fontSize: '11px',
            letterSpacing: '5px',
            color: 'rgba(217,219,225,0.9)',
            textTransform: 'uppercase',
          }}>
            ポートフォリオ
          </span>

          {/* Gold line */}
          <div style={{
            width: '40px', height: '1px',
            background: 'linear-gradient(90deg, transparent, #D9DBE1, transparent)',
          }} />

          {/* Main title */}
          <h1 style={{
            fontFamily: 'Zenjirou, Inter, sans-serif',
            fontSize: 'clamp(28px, 5vw, 56px)',
            fontWeight: 'normal',
            color: '#F2F2F0',
            letterSpacing: '3px',
            textAlign: 'center',
            margin: 0,
            lineHeight: 1.1,
            textShadow: '0 2px 20px rgba(0,0,0,0.6)',
          }}>
            Amar El Arji
          </h1>

          {/* Role */}
          <p style={{
            fontSize: '12px',
            letterSpacing: '4px',
            color: 'rgba(166,31,47,0.9)',
            textTransform: 'uppercase',
            margin: 0,
            textShadow: '0 1px 10px rgba(0,0,0,0.6)',
          }}>
            Web Developer
          </p>
        </div>

        {/* Bottom — enter button */}
        <div ref={btnBlockRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', opacity: 0 }}>

          <button
            onClick={handleEnter}
            disabled={clicked}
            data-cursor
            style={{
              background: 'transparent',
              border: '1px solid rgba(217,219,225,0.6)',
              color: '#D9DBE1',
              fontSize: '11px',
              letterSpacing: '6px',
              textTransform: 'uppercase',
              padding: '18px 56px',
              cursor: 'none',
              fontFamily: 'Inter, sans-serif',
              clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)',
              transition: 'border-color 0.3s, color 0.3s, background 0.3s, box-shadow 0.3s',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#D9DBE1'
              e.currentTarget.style.color = '#050505'
              e.currentTarget.style.background = '#D9DBE1'
              e.currentTarget.style.boxShadow = '0 0 30px rgba(217,219,225,0.4)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(217,219,225,0.6)'
              e.currentTarget.style.color = '#D9DBE1'
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {clicked ? '...' : 'Enter'}
          </button>

          {/* Scroll hint */}
          <span style={{
            fontSize: '10px',
            color: 'rgba(232,220,200,0.5)',
            letterSpacing: '3px',
            textTransform: 'uppercase',
          }}>
            Click to enter
          </span>
        </div>
      </div>
    </div>
  )
}
