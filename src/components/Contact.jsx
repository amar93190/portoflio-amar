import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import { Mail, GitBranch, X, ExternalLink, Send } from 'lucide-react'
import InkReveal from './InkReveal'

const SOCIALS = [
  { icon: GitBranch, label: 'GitHub', href: '#', jp: 'ギットハブ' },
  { icon: X, label: 'Twitter', href: '#', jp: 'ツイッター' },
  { icon: ExternalLink, label: 'LinkedIn', href: '#', jp: 'リンクドイン' },
  { icon: Mail, label: 'Email', href: 'mailto:you@example.com', jp: 'メール' },
]

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 1000))
    toast.success("Message sent! I'll get back to you soon.", {
      style: {
        background: '#111318',
        color: '#F2F2F0',
        border: '1px solid rgba(217,219,225,0.1)',
        borderRadius: '0',
        fontSize: '13px',
      },
      iconTheme: { primary: '#A61F2F', secondary: '#0D0F14' },
    })
    reset()
  }

  return (
    <section
      id="contact"
      style={{
        borderTop: '1px solid var(--border)',
        background: 'var(--surface)',
      }}
    >
      <Toaster position="top-right" />

      <div className="section-inner">

        {/* Heading */}
        <div style={{ marginBottom: '64px' }}>
          <div className="section-label">
            <span>連絡</span>
          </div>
          <h2
            style={{
              fontFamily: 'Norij, Inter, sans-serif',
              fontSize: 'clamp(36px, 4vw, 52px)',
              fontWeight: 'normal',
              color: '#F2F2F0',
              letterSpacing: '1px',
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Let's{' '}
            <InkReveal color="#A61F2F" delay={0.2}>
              <span className="text-sakura">Talk</span>
            </InkReveal>
          </h2>
          <span className="gold-line" />
          <p style={{ color: '#8a8f9a', lineHeight: 1.8, fontSize: '15px', maxWidth: '520px' }}>
            Have a project in mind? I'm open to freelance opportunities, full-time roles,
            and interesting collaborations. Let's build something remarkable together.
          </p>
        </div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '60px',
            alignItems: 'start',
          }}
        >
          {/* Left — contact info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>

            {/* Email */}
            <a
              href="mailto:you@example.com"
              className="hover-line"
              data-cursor
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                color: '#F2F2F0',
                textDecoration: 'none',
                fontSize: '16px',
              }}
            >
              <Mail size={16} color="#D9DBE1" />
              you@example.com
            </a>

            {/* Socials */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {SOCIALS.map((s) => {
                const Icon = s.icon
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    data-cursor
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '16px 20px',
                      border: '1px solid var(--border)',
                      color: '#8a8f9a',
                      textDecoration: 'none',
                      transition: 'border-color 0.3s, color 0.3s',
                      position: 'relative',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#D9DBE1'
                      e.currentTarget.style.color = '#F2F2F0'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(217,219,225,0.1)'
                      e.currentTarget.style.color = '#8a8f9a'
                    }}
                  >
                    <span className="corner-tl" />
                    <span className="corner-br" />
                    <Icon size={18} />
                    <span style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase' }}>
                      {s.label}
                    </span>
                  </a>
                )
              })}
            </div>

            {/* Decorative kanji */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginTop: '20px',
              }}
            >
              <span
                className="jp"
                style={{ fontSize: '72px', color: 'rgba(166,31,47,0.08)', lineHeight: 1 }}
              >
                縁
              </span>
              <div>
                <p style={{ fontSize: '11px', color: '#8a8f9a', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>
                  en — fate / connection
                </p>
                <p style={{ fontSize: '12px', color: 'rgba(217,219,225,0.3)', lineHeight: 1.6 }}>
                  Every great project starts<br />with a conversation.
                </p>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              padding: '40px',
              background: '#0D0F14',
              border: '1px solid var(--border)',
              position: 'relative',
            }}
          >
            <span className="corner-tl" />
            <span className="corner-br" />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <input
                  {...register('name', { required: true })}
                  placeholder="Your Name"
                  className="input-field"
                  style={{ borderColor: errors.name ? '#8B1E2D' : undefined }}
                />
                {errors.name && (
                  <span style={{ fontSize: '11px', color: '#8B1E2D', marginTop: '4px', display: 'block' }}>
                    Required
                  </span>
                )}
              </div>
              <div>
                <input
                  {...register('email', { required: true, pattern: /^\S+@\S+\.\S+$/ })}
                  placeholder="Your Email"
                  className="input-field"
                  style={{ borderColor: errors.email ? '#8B1E2D' : undefined }}
                />
                {errors.email && (
                  <span style={{ fontSize: '11px', color: '#8B1E2D', marginTop: '4px', display: 'block' }}>
                    Valid email required
                  </span>
                )}
              </div>
            </div>

            <input
              {...register('subject')}
              placeholder="Subject"
              className="input-field"
            />

            <textarea
              {...register('message', { required: true })}
              placeholder="Your message..."
              rows={6}
              className="input-field"
              style={{
                resize: 'none',
                borderColor: errors.message ? '#8B1E2D' : undefined,
              }}
            />
            {errors.message && (
              <span style={{ fontSize: '11px', color: '#8B1E2D', marginTop: '-8px' }}>Required</span>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
              data-cursor
              style={{ alignSelf: 'flex-start', opacity: isSubmitting ? 0.6 : 1 }}
            >
              <Send size={14} />
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
