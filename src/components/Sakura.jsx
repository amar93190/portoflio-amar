import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'

const COUNT = 700

export default function Sakura() {
  const pointsRef = useRef()

  const elapsed = useRef(0)

  const { positions, particles } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3)
    const particles = []

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 28
      positions[i * 3 + 1] = (Math.random() - 0.5) * 22
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12

      particles.push({
        speed:  0.003 + Math.random() * 0.009,
        phase:  Math.random() * Math.PI * 2,
        wobble: 0.001 + Math.random() * 0.004,
      })
    }

    return { positions, particles }
  }, [])

  useFrame((_, delta) => {
    if (!pointsRef.current) return
    elapsed.current += delta
    const t = elapsed.current
    const attr = pointsRef.current.geometry.attributes.position

    for (let i = 0; i < COUNT; i++) {
      const p = particles[i]

      // Fall
      attr.array[i * 3 + 1] -= p.speed
      // Horizontal drift
      attr.array[i * 3]     += Math.sin(t * 0.35 + p.phase) * p.wobble
      // Slight z drift
      attr.array[i * 3 + 2] += Math.cos(t * 0.2 + p.phase) * 0.001

      // Wrap to top
      if (attr.array[i * 3 + 1] < -11) {
        attr.array[i * 3 + 1] = 11
        attr.array[i * 3]     = (Math.random() - 0.5) * 28
      }
    }

    attr.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#f4a7c3"
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}
