// Bouton néon avec halo au survol (style uiverse.io)
export default function GlowButton({ children, href, variant = 'primary', className = '', ...props }) {
  const styles = {
    primary: 'bg-gradient-to-r from-neon to-cyan text-white [--glow:var(--color-neon)]',
    ghost: 'border border-line bg-panel/60 text-gray-200 backdrop-blur [--glow:var(--color-cyan)]',
  }
  const Tag = href ? 'a' : 'button'
  return (
    <Tag
      href={href}
      className={`btn-uiverse btn-shine inline-flex cursor-pointer items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}
