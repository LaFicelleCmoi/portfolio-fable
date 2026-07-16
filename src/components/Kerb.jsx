// Vibreur de circuit (rouge/blanc) : séparateur discret entre les sections
export default function Kerb() {
  return (
    <div aria-hidden className="flex justify-center">
      <div className="kerb h-1 w-full max-w-xs rounded-full opacity-25" />
    </div>
  )
}
