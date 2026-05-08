import { motion } from 'framer-motion'
import InkReveal from './InkReveal'
import {
  SiReact, SiNextdotjs, SiHtml5, SiJavascript, SiTypescript,
  SiTailwindcss, SiFramer, SiThreedotjs, SiNodedotjs,
  SiGraphql, SiGit, SiGithub, SiVite, SiDocker, SiFigma, SiWebpack,
  SiPostgresql, SiMongodb,
} from 'react-icons/si'

const TECHS = [
  { icon: SiReact,       name: 'React',       color: '#61DAFB' },
  { icon: SiNextdotjs,   name: 'Next.js',     color: '#F2F2F0' },
  { icon: SiJavascript,  name: 'JavaScript',  color: '#F7DF1E' },
  { icon: SiTypescript,  name: 'TypeScript',  color: '#3178C6' },
  { icon: SiHtml5,       name: 'HTML5',       color: '#E34F26' },
  { icon: SiTailwindcss, name: 'Tailwind',    color: '#06B6D4' },
  { icon: SiFramer,      name: 'Framer',      color: '#A61F2F' },
  { icon: SiThreedotjs,  name: 'Three.js',    color: '#F2F2F0' },
  { icon: SiNodedotjs,   name: 'Node.js',     color: '#339933' },
  { icon: SiGraphql,     name: 'GraphQL',     color: '#E10098' },
  { icon: SiGit,         name: 'Git',         color: '#F05032' },
  { icon: SiGithub,      name: 'GitHub',      color: '#F2F2F0' },
  { icon: SiVite,        name: 'Vite',        color: '#646CFF' },
  { icon: SiDocker,      name: 'Docker',      color: '#2496ED' },
  { icon: SiFigma,       name: 'Figma',       color: '#F24E1E' },
  { icon: SiWebpack,     name: 'Webpack',     color: '#8DD6F9' },
  { icon: SiPostgresql,  name: 'PostgreSQL',  color: '#4169E1' },
  { icon: SiMongodb,     name: 'MongoDB',     color: '#47A248' },
]

// Pseudo-random but deterministic float params per index
function floatParams(i) {
  const durations = [3.2, 4.1, 3.7, 4.8, 3.4, 5.0, 3.9, 4.3, 3.6, 4.6, 3.3, 4.9, 3.8, 4.2, 3.5, 4.7, 3.1, 4.4]
  const delays    = [0, 0.6, 1.2, 0.3, 0.9, 1.5, 0.4, 1.0, 1.8, 0.2, 0.8, 1.4, 0.5, 1.1, 1.7, 0.1, 0.7, 1.3]
  const ys        = [10, 14, 8, 16, 12, 10, 14, 8, 16, 12, 10, 14, 8, 12, 16, 10, 14, 8]
  return { duration: durations[i % durations.length], delay: delays[i % delays.length], y: ys[i % ys.length] }
}

const vp = { once: true, amount: 0.05 }

export default function Skills() {
  return (
    <section id="skills" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="section-inner">

        {/* Heading */}
        <div style={{ marginBottom: '72px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.6 }}
          >
            <div className="section-label"><span>スキル</span></div>
            <h2 style={{
              fontSize: 'clamp(36px, 4vw, 52px)',
              fontWeight: 700,
              color: '#F2F2F0',
              letterSpacing: '-1px',
              lineHeight: 1.1,
              margin: 0,
            }}>
              My{' '}
              <InkReveal color="#A61F2F" delay={0.2}>
                <span className="text-sakura">Skills</span>
              </InkReveal>
            </h2>
            <span className="gold-line" />
            <p style={{ color: '#8a8f9a', fontSize: '15px', maxWidth: '480px' }}>
              Tools and technologies I use to bring ideas to life.
            </p>
          </motion.div>
        </div>

        {/* Floating logos grid */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '24px',
          justifyContent: 'center',
        }}>
          {TECHS.map((tech, i) => {
            const { duration, delay, y } = floatParams(i)
            const Icon = tech.icon
            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 0.5, delay: i * 0.05, ease: 'easeOut' }}
              >
                <motion.div
                  animate={{ y: [0, -y, 0] }}
                  transition={{
                    duration,
                    delay,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  whileHover={{ scale: 1.15 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '24px 20px',
                    background: 'rgba(26,29,36,0.6)',
                    border: '1px solid rgba(217,219,225,0.08)',
                    backdropFilter: 'blur(8px)',
                    cursor: 'default',
                    width: '90px',
                    position: 'relative',
                    transition: 'border-color 0.3s, box-shadow 0.3s',
                  }}
                  onHoverStart={(e) => {
                    e.currentTarget.style.borderColor = `${tech.color}55`
                    e.currentTarget.style.boxShadow = `0 0 24px ${tech.color}20`
                  }}
                  onHoverEnd={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(217,219,225,0.08)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <Icon size={32} color={tech.color} style={{ filter: `drop-shadow(0 0 6px ${tech.color}55)` }} />
                  <span style={{
                    fontSize: '9px',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    color: '#8a8f9a',
                    textAlign: 'center',
                    lineHeight: 1.3,
                  }}>
                    {tech.name}
                  </span>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
