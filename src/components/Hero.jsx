import { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { gsap } from 'gsap'
import { TypeAnimation } from 'react-type-animation'
import Sakura from './Sakura'
import ParallaxLayers from './ParallaxLayers'
import { useSiteStore } from '../store/siteStore'

export default function Hero() {
  const heroRef = useRef()
  const contentRef = useRef()
  const lineRef = useRef()
  const scrollRef = useRef()
  const isReady = useSiteStore((s) => s.isReady)
  const [canvasActive, setCanvasActive] = useState(true)

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => setCanvasActive(entry.isIntersecting),
      { threshold: 0 }
    )
    if (heroRef.current) io.observe(heroRef.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!isReady) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 })

      tl.fromTo(
        '.hero-label',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      )
        .fromTo(
          '.hero-name',
          { opacity: 0, y: 40, skewX: -4 },
          { opacity: 1, y: 0, skewX: 0, duration: 0.9, ease: 'power3.out' },
          '-=0.2'
        )
        .fromTo(
          '.hero-sub',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(
          '.hero-btns',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          '-=0.3'
        )
        .fromTo(
          scrollRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          '-=0.2'
        )
    }, contentRef)

    // Scroll indicator bounce
    gsap.to(scrollRef.current, {
      y: 8,
      duration: 1.2,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
      delay: 4,
    })

    return () => ctx.revert()
  }, [isReady])

  const handleScroll = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={heroRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100svh',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse 60% 55% at 50% 38%, rgba(139, 30, 45, 0.22) 0%, rgba(13,15,20,0.6) 50%, #0D0F14 75%)',
      }}
    >
      {/* 3D Cherry Blossom Canvas */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          frameloop={canvasActive ? 'always' : 'demand'}
          style={{ width: '100%', height: '100%' }}
        >
          <ambientLight intensity={0.5} />
          <Sakura />
        </Canvas>
      </div>

      {/* Parallax mountain / tree layers */}
      <ParallaxLayers heroRef={heroRef} />

      {/* Big background kanji */}
      <div
        className="jp"
        style={{
          position: 'absolute',
          bottom: '-5%',
          right: '-2%',
          fontSize: 'clamp(200px, 30vw, 420px)',
          color: 'rgba(166, 31, 47, 0.04)',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        侍
      </div>

      {/* Decorative vertical line left */}
      <div
        ref={lineRef}
        style={{
          position: 'absolute',
          left: '5vw',
          top: '20%',
          bottom: '20%',
          width: '1px',
          background: 'linear-gradient(to bottom, transparent, rgba(217,219,225,0.2), transparent)',
        }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 10,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 5vw 0 calc(5vw + 28px)',
          maxWidth: '900px',
        }}
      >
        {/* JP label */}
        <div
          className="hero-label jp"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '20px',
            opacity: 0,
          }}
        >
          <span style={{ width: '32px', height: '1px', background: '#D9DBE1' }} />
          <span style={{ fontSize: '13px', color: '#D9DBE1', letterSpacing: '3px' }}>
            ウェブ開発者
          </span>
        </div>

        {/* Name */}
        <h1
          className="hero-name"
          style={{
            fontFamily: 'Zenjirou, Inter, sans-serif',
            fontSize: 'clamp(52px, 8vw, 120px)',
            fontWeight: 'normal',
            letterSpacing: '2px',
            lineHeight: 0.9,
            color: '#F2F2F0',
            margin: 0,
            opacity: 0,
          }}
        >
          Amar
          <br />
          <span className="text-sakura">El Arji</span>
        </h1>

        {/* Typewriter subtitle */}
        <div
          className="hero-sub"
          style={{
            marginTop: '24px',
            fontSize: 'clamp(14px, 1.5vw, 18px)',
            color: '#8a8f9a',
            letterSpacing: '1px',
            opacity: 0,
            minHeight: '28px',
          }}
        >
          <TypeAnimation
            sequence={[
              2800,
              'I craft beautiful web experiences.',
              2000,
              'I build with React & Three.js.',
              2000,
              'I turn ideas into pixels.',
              2000,
            ]}
            wrapper="span"
            speed={55}
            repeat={Infinity}
            style={{ display: 'inline-block' }}
          />
        </div>

        {/* Buttons */}
        <div
          className="hero-btns"
          style={{
            display: 'flex',
            gap: '16px',
            marginTop: '40px',
            flexWrap: 'wrap',
            opacity: 0,
          }}
        >
          <a
            href="#projects"
            className="btn-primary"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
            }}
            data-cursor
          >
            View Work
          </a>
          <a
            href="#contact"
            className="btn-outline"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            data-cursor
          >
            Contact
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        ref={scrollRef}
        onClick={handleScroll}
        data-cursor
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'none',
          border: 'none',
          cursor: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          opacity: 0,
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontSize: '10px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: '#8a8f9a',
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: '1px',
            height: '48px',
            background: 'linear-gradient(to bottom, #D9DBE1, transparent)',
          }}
        />
      </button>
    </section>
  )
}
