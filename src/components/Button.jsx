// Bouton-lien : plein (action principale) ou contour (secondaire).
export default function Button({ children, href, variant = 'primary', className = '', ...props }) {
  const styles = {
    primary: 'bg-white text-ink hover:bg-gray-200',
    ghost: 'border border-line text-gray-200 hover:border-gray-500 hover:text-white',
  }
  const Tag = href ? 'a' : 'button'
  return (
    <Tag
      href={href}
      className={`inline-flex cursor-pointer items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}
