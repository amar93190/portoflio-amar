export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        padding: '40px 5vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
      }}
    >
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span className="jp" style={{ fontSize: '20px', color: '#A61F2F' }}>
          桜
        </span>
        <span style={{ fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', color: '#8a8f9a' }}>
          Amar El Arji
        </span>
      </div>

      {/* Center */}
      <p style={{ fontSize: '12px', color: '#8a8f9a', letterSpacing: '1px' }}>
        Crafted with{' '}
        <span style={{ color: '#A61F2F' }}>桜</span>
        {' '}and React — {new Date().getFullYear()}
      </p>

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        data-cursor
        className="hover-line"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'none',
          fontSize: '11px',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: '#8a8f9a',
          transition: 'color 0.3s',
          padding: 0,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#D9DBE1')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#8a8f9a')}
      >
        Back to Top ↑
      </button>
    </footer>
  )
}
