// Bandeau défilant infini de technologies (style reactbits.dev/components/logo-loop)
export default function Marquee({ items }) {
  const doubled = [...items, ...items]
  return (
    <div className="relative overflow-hidden py-6 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
      <div className="animate-marquee flex w-max gap-10">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-2 whitespace-nowrap rounded-full border border-line bg-panel/60 px-5 py-2 text-sm text-gray-300"
          >
            <span className="text-cyan">◆</span> {item}
          </span>
        ))}
      </div>
    </div>
  )
}
