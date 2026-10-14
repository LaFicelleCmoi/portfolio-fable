// Panneau de base des sections : fond plein, bordure fine, rien qui bouge.
export default function Card({ children, className = '' }) {
  return <div className={`rounded-2xl border border-line bg-panel ${className}`}>{children}</div>
}
