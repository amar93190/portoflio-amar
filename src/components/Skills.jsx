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

export default function Skills() {
  return (
    <section id="skills" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="section-inner">

        <div style={{ marginBottom: '72px' }}>
          <div className="section-label"><span>スキル</span></div>
          <h2 style={{
            fontFamily: 'Norij, Inter, sans-serif',
            fontSize: 'clamp(36px, 4vw, 52px)',
            fontWeight: 'normal',
            color: '#F2F2F0',
            letterSpacing: '1px',
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
        </div>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '24px',
          justifyContent: 'center',
        }}>
          {TECHS.map((tech) => {
            const Icon = tech.icon
            return (
              <div
                key={tech.name}
                className="skill-card"
                style={{ '--tech-color': tech.color }}
              >
                <Icon size={32} color={tech.color} />
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
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
