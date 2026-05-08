import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowUpRight, GitBranch } from 'lucide-react'
import InkReveal from './InkReveal'

const PROJECTS = [
  {
    title: 'Project Alpha',
    description:
      'Full-stack web app with real-time features — React, Node.js, WebSockets. Clean UI with smooth animations.',
    tags: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    github: '#',
    live: '#',
    color: '#A61F2F',
    jp: '壱',
    year: '2024',
  },
  {
    title: 'Project Beta',
    description:
      'E-commerce platform with custom checkout, Stripe integration, and an intuitive admin dashboard.',
    tags: ['Next.js', 'Stripe', 'Tailwind', 'Prisma'],
    github: '#',
    live: '#',
    color: '#D9DBE1',
    jp: '弐',
    year: '2024',
  },
  {
    title: 'Project Gamma',
    description:
      '3D interactive experience — immersive scroll-driven storytelling with Three.js and custom GLSL shaders.',
    tags: ['Three.js', 'GSAP', 'GLSL', 'Vite'],
    github: '#',
    live: '#',
    color: '#9b8cff',
    jp: '参',
    year: '2023',
  },
  {
    title: 'Project Delta',
    description:
      'Mobile-first design system and component library built with accessibility and performance at its core.',
    tags: ['React', 'Storybook', 'TypeScript', 'Radix UI'],
    github: '#',
    live: '#',
    color: '#4ecca3',
    jp: '四',
    year: '2023',
  },
  {
    title: 'Project Epsilon',
    description:
      'AI-powered SaaS dashboard with real-time data visualization, dark mode, and custom chart animations.',
    tags: ['Next.js', 'OpenAI', 'Recharts', 'PostgreSQL'],
    github: '#',
    live: '#',
    color: '#f59e0b',
    jp: '五',
    year: '2023',
  },
]

function ProjectCard({ project, index, isDragging }) {
  const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `${r},${g},${b}`
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: 'easeOut' }}
      whileHover={isDragging ? {} : { y: -6 }}
      style={{
        flexShrink: 0,
        width: '360px',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.4s',
        userSelect: 'none',
        pointerEvents: isDragging ? 'none' : 'auto',
      }}
      onHoverStart={(e) => {
        if (isDragging) return
        e.currentTarget.style.borderColor = `rgba(${hexToRgb(project.color)}, 0.4)`
      }}
      onHoverEnd={(e) => {
        e.currentTarget.style.borderColor = 'rgba(217,219,225,0.1)'
      }}
    >
      {/* Top accent bar */}
      <div
        style={{
          height: '2px',
          background: `linear-gradient(90deg, ${project.color}, transparent)`,
        }}
      />

      {/* Image area */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '16/10',
          background: `linear-gradient(135deg, #0a0a0a, rgba(${hexToRgb(project.color)}, 0.05))`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <span
          className="jp"
          style={{ fontSize: '100px', color: project.color, opacity: 0.08, userSelect: 'none' }}
        >
          {project.jp}
        </span>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse at center, rgba(${hexToRgb(project.color)}, 0.04) 0%, transparent 70%)`,
          }}
        />
      </div>

      {/* Content */}
      <div style={{ padding: '24px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px',
          }}
        >
          <span
            style={{ fontSize: '10px', letterSpacing: '3px', color: project.color, textTransform: 'uppercase' }}
          >
            {project.year}
          </span>
          <span className="jp" style={{ fontSize: '16px', color: 'rgba(217,219,225,0.2)' }}>
            {project.jp}
          </span>
        </div>

        <h3
          style={{
            fontSize: '20px',
            fontWeight: 600,
            color: '#F2F2F0',
            letterSpacing: '-0.5px',
            marginBottom: '10px',
          }}
        >
          {project.title}
        </h3>

        <p style={{ fontSize: '13px', color: '#8a8f9a', lineHeight: 1.75, marginBottom: '20px' }}>
          {project.description}
        </p>

        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: '9px',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: project.color,
                border: `1px solid ${project.color}30`,
                padding: '3px 10px',
                background: `rgba(${hexToRgb(project.color)}, 0.04)`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            gap: '10px',
            borderTop: '1px solid var(--border)',
            paddingTop: '20px',
          }}
        >
          <a href={project.github} className="btn-outline" style={{ padding: '8px 16px', fontSize: '11px' }} data-cursor>
            <GitBranch size={13} /> Code
          </a>
          <a href={project.live} className="btn-primary" style={{ padding: '8px 16px', fontSize: '11px' }} data-cursor>
            <ArrowUpRight size={13} /> Live
          </a>
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const containerRef = useRef()
  const trackRef = useRef()
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 })
  const [isDragging, setIsDragging] = useState(false)

  const { ref: headRef, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  useEffect(() => {
    const calc = () => {
      const track = trackRef.current
      const container = containerRef.current
      if (!track || !container) return
      const maxDrag = -(track.scrollWidth - container.offsetWidth + 0)
      setDragConstraints({ left: Math.min(maxDrag, 0), right: 0 })
    }

    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [])

  return (
    <section
      id="projects"
      style={{
        background: 'var(--surface)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div style={{ padding: '80px 0 0', maxWidth: '1200px', margin: '0 auto', paddingLeft: '5vw', paddingRight: '5vw' }}>
        {/* Heading */}
        <div ref={headRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="section-label">
              <span>作品</span>
            </div>
            <h2
              style={{
                fontSize: 'clamp(36px, 4vw, 52px)',
                fontWeight: 700,
                color: '#F2F2F0',
                letterSpacing: '-1px',
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              Selected{' '}
              <InkReveal color="#D9DBE1" delay={0.3}>
                <span className="text-gold">Work</span>
              </InkReveal>
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '16px' }}>
              <span className="gold-line" style={{ margin: 0 }} />
              <span style={{ fontSize: '12px', color: '#8a8f9a', letterSpacing: '2px' }}>
                DRAG TO EXPLORE
              </span>
              <span style={{ fontSize: '16px', color: '#8a8f9a' }}>→</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Drag-to-scroll track */}
      <div
        ref={containerRef}
        style={{
          overflow: 'hidden',
          padding: '40px 0 60px',
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
      >
        <motion.div
          ref={trackRef}
          drag="x"
          dragConstraints={dragConstraints}
          dragElastic={0.08}
          dragTransition={{ bounceStiffness: 200, bounceDamping: 30 }}
          onPointerDown={(e) => e.preventDefault()}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          style={{
            display: 'flex',
            gap: '20px',
            paddingLeft: '5vw',
            paddingRight: '5vw',
            width: 'max-content',
          }}
        >
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} isDragging={isDragging} />
          ))}

          {/* End card */}
          <div
            style={{
              flexShrink: 0,
              width: '200px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px dashed rgba(217,219,225,0.1)',
              gap: '16px',
              alignSelf: 'stretch',
            }}
          >
            <span className="jp" style={{ fontSize: '36px', color: 'rgba(166,31,47,0.2)' }}>終</span>
            <span style={{ fontSize: '10px', letterSpacing: '3px', color: '#8a8f9a', textTransform: 'uppercase' }}>
              More coming
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
