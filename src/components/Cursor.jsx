import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

// Min distance cursor must travel before spawning a new petal
const SPAWN_DISTANCE = 28
// Max petals alive at once
const MAX_PETALS = 40

export default function Cursor() {
  const dotRef = useRef()
  const ringRef = useRef()
  const mouse = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const lastSpawn = useRef({ x: 0, y: 0 })
  const petalCount = useRef(0)
  const rafId = useRef()

  useEffect(() => {
    const dot = dotRef.current
    const circle = ringRef.current

    // ── Cursor movement ──────────────────────────────────────────────
    const onMouseMove = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
      dot.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`

      // Petal trail
      const dx = e.clientX - lastSpawn.current.x
      const dy = e.clientY - lastSpawn.current.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist > SPAWN_DISTANCE && petalCount.current < MAX_PETALS) {
        spawnPetal(e.clientX, e.clientY)
        lastSpawn.current = { x: e.clientX, y: e.clientY }
      }
    }

    // ── Ring lag animation ───────────────────────────────────────────
    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.1
      ring.current.y += (mouse.current.y - ring.current.y) * 0.1
      circle.style.transform = `translate(${ring.current.x - 18}px, ${ring.current.y - 18}px)`
      rafId.current = requestAnimationFrame(animate)
    }

    // ── Link hover expand ────────────────────────────────────────────
    const onEnter = () => {
      gsap.to(circle, { width: 54, height: 54, duration: 0.25, ease: 'power2.out' })
      circle.style.borderColor = '#e8739a'
      circle.style.marginTop = '-9px'
      circle.style.marginLeft = '-9px'
    }
    const onLeave = () => {
      gsap.to(circle, { width: 36, height: 36, duration: 0.25, ease: 'power2.out' })
      circle.style.borderColor = '#c9a84c'
      circle.style.marginTop = '0'
      circle.style.marginLeft = '0'
    }

    // Event delegation — mouseover/mouseout bubble unlike mouseenter/mouseleave
    const onOver = (e) => {
      if (e.target.closest('a, button, [data-cursor]')) onEnter()
    }
    const onOut = (e) => {
      if (e.target.closest('a, button, [data-cursor]') &&
          !e.relatedTarget?.closest('a, button, [data-cursor]')) onLeave()
    }

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    rafId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}

// ── Petal spawner ────────────────────────────────────────────────────
function spawnPetal(x, y) {
  const size = 4 + Math.random() * 7
  const angle = Math.random() * 360
  const hue = Math.random() > 0.5 ? '#f9c5d5' : '#e8739a'

  const petal = document.createElement('div')
  petal.style.cssText = `
    position: fixed;
    left: ${x}px;
    top: ${y}px;
    width: ${size}px;
    height: ${size * 0.65}px;
    background: ${hue};
    border-radius: 50% 0 50% 0;
    pointer-events: none;
    z-index: 99990;
    transform: rotate(${angle}deg);
    will-change: transform, opacity;
  `
  document.body.appendChild(petal)

  const fallX = (Math.random() - 0.5) * 60
  const fallY = 50 + Math.random() * 60
  const spinDeg = (Math.random() - 0.5) * 200

  gsap.to(petal, {
    x: fallX,
    y: fallY,
    rotation: `+=${spinDeg}`,
    opacity: 0,
    duration: 0.9 + Math.random() * 0.5,
    ease: 'power1.in',
    onComplete: () => {
      petal.remove()
    },
  })
}
