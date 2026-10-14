import { useEffect, useMemo, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Texte révélé mot à mot au fil du scroll — adapté de reactbits.dev/text-animations/scroll-reveal.
// Adaptations : rendu en <p> (l'original imbrique un <p> dans un <h2>), pas de rotation,
// et le nettoyage ne tue que les déclencheurs de ce composant (l'original les tuait tous).
export default function ScrollReveal({ children, baseOpacity = 0.15, blurStrength = 3, className = '' }) {
  const ref = useRef(null)

  const words = useMemo(
    () =>
      String(children)
        .split(/(\s+)/)
        .map((word, i) =>
          /^\s+$/.test(word) ? word : (
            <span key={i} className="word inline-block">
              {word}
            </span>
          )
        ),
    [children]
  )

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('.word'),
        { opacity: baseOpacity, filter: `blur(${blurStrength}px)` },
        {
          opacity: 1,
          filter: 'blur(0px)',
          ease: 'none',
          stagger: 0.05,
          scrollTrigger: { trigger: el, start: 'top bottom-=15%', end: 'bottom center', scrub: true },
        }
      )
    }, el)
    return () => ctx.revert()
  }, [words, baseOpacity, blurStrength])

  return (
    <p ref={ref} className={className}>
      {words}
    </p>
  )
}
