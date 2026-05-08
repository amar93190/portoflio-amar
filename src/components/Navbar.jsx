import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useSlashStore } from '../store/slashStore'

const LINKS = [
  { label: 'About', jp: '私について', href: '#about' },
  { label: 'Skills', jp: 'スキル', href: '#skills' },
  { label: 'Projects', jp: '作品', href: '#projects' },
  { label: 'Contact', jp: '連絡', href: '#contact' },
]

export default function Navbar() {
  const navRef = useRef()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { triggerSlash } = useSlashStore()

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 2.8 }
    )

    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    triggerSlash()
    setTimeout(() => {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 120)
  }

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: '20px 5vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'background 0.4s ease, backdrop-filter 0.4s ease, border-bottom 0.4s',
          background: scrolled ? 'rgba(13,15,20,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(217,219,225,0.08)' : '1px solid transparent',
        }}
      >
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
          }}
          data-cursor
        >
          <span
            className="jp"
            style={{
              fontSize: '24px',
              color: '#A61F2F',
              lineHeight: 1,
            }}
          >
            桜
          </span>
          <span
            style={{
              fontSize: '13px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: '#F2F2F0',
            }}
          >
            Portfolio
          </span>
        </a>

        {/* Desktop links */}
        <ul
          style={{
            display: 'flex',
            gap: '40px',
            listStyle: 'none',
          }}
          className="hidden md:flex"
        >
          {LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                className="nav-link hover-line"
                data-cursor
              >
                <span className="jp-label">{link.jp}</span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          data-cursor
          style={{
            background: 'none',
            border: 'none',
            cursor: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            padding: '4px',
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: 'block',
                width: i === 1 ? '20px' : '28px',
                height: '1px',
                background: '#D9DBE1',
                transition: 'all 0.3s',
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(13,15,20,0.97)',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '40px',
          }}
        >
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              position: 'absolute',
              top: '24px',
              right: '5vw',
              background: 'none',
              border: 'none',
              color: '#D9DBE1',
              fontSize: '24px',
              cursor: 'none',
            }}
            data-cursor
          >
            ✕
          </button>
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                textDecoration: 'none',
              }}
              data-cursor
            >
              <span className="jp" style={{ fontSize: '11px', color: '#D9DBE1' }}>
                {link.jp}
              </span>
              <span
                style={{
                  fontSize: '28px',
                  letterSpacing: '4px',
                  textTransform: 'uppercase',
                  color: '#F2F2F0',
                }}
              >
                {link.label}
              </span>
            </a>
          ))}
        </div>
      )}
    </>
  )
}
