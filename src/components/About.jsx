import { motion } from 'framer-motion'
import InkReveal from './InkReveal'

const STATS = [
  { value: '3+', label: 'Years Experience', jp: '年' },
  { value: '20+', label: 'Projects Delivered', jp: '件' },
  { value: '10+', label: 'Technologies', jp: '技術' },
]

const vp = { once: true, amount: 0.05 }

function AnimatedStat({ stat, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={vp}
      transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        padding: '24px',
        border: '1px solid rgba(217,219,225,0.1)',
        position: 'relative',
      }}
    >
      <span className="corner-tl" />
      <span className="corner-br" />
      <span className="jp" style={{ fontSize: '10px', color: '#8a8f9a', letterSpacing: '2px' }}>
        {stat.jp}
      </span>
      <span className="text-gold" style={{ fontSize: '42px', fontWeight: 700, letterSpacing: '-1px', lineHeight: 1 }}>
        {stat.value}
      </span>
      <span style={{ fontSize: '12px', color: '#8a8f9a', letterSpacing: '1px', marginTop: '4px' }}>
        {stat.label}
      </span>
    </motion.div>
  )
}

export default function About() {
  return (
    <section id="about" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
      <div className="section-inner">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '80px',
            alignItems: 'center',
          }}
        >
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={vp}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ position: 'relative' }}
          >
            <div
              style={{
                position: 'relative',
                paddingBottom: '120%',
                background: '#111318',
                border: '1px solid rgba(217,219,225,0.1)',
                overflow: 'hidden',
              }}
            >
              <img
                src="/IMG_1043.jpg"
                alt="Amar El Arji"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                }}
              />
            </div>

            <div
              style={{
                position: 'absolute',
                top: '16px', left: '16px', right: '-16px', bottom: '-16px',
                border: '1px solid rgba(217,219,225,0.08)',
                zIndex: -1,
              }}
            />

            <div className="seal" style={{ position: 'absolute', bottom: '-12px', right: '-12px' }}>
              <span className="jp" style={{ fontSize: '14px' }}>桜</span>
            </div>
          </motion.div>

          {/* Text side */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.6 }}
            >
              <div className="section-label">
                <span>私について</span>
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
                About{' '}
                <InkReveal color="#D9DBE1" delay={0.2}>
                  <span className="text-gold">Me</span>
                </InkReveal>
              </h2>
              <span className="gold-line" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.6, delay: 0.15 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              <p style={{ color: '#8a8f9a', lineHeight: 1.8, fontSize: '15px' }}>
                I'm Amar El Arji, a versatile digital creator and web developer passionate about building
                immersive and meaningful digital experiences. I consider myself a true "Swiss Army knife"
                in the tech world — combining development, web design, project management, and product
                vision to bring ideas to life from concept to production.
              </p>
              <p style={{ color: '#8a8f9a', lineHeight: 1.8, fontSize: '15px' }}>
                Beyond coding, I also work in project coordination and product management roles, where I
                contribute as a Product Owner and team lead. I enjoy managing workflows, organizing ideas,
                and transforming business needs into clear, efficient, and visually impactful solutions.
              </p>
              <p style={{ color: '#8a8f9a', lineHeight: 1.8, fontSize: '15px' }}>
                Specialized in modern JavaScript ecosystems, React, TypeScript, UI/UX design, and scalable
                web architectures, I create fast, responsive, and premium digital products with strong
                attention to detail and user experience. My approach blends technology, creativity, and
                strategy — because for me, a great product is not only functional, but also memorable.
              </p>
            </motion.div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '12px',
                marginTop: '40px',
              }}
            >
              {STATS.map((stat, i) => (
                <AnimatedStat key={stat.label} stat={stat} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
