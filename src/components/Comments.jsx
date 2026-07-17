import { useEffect, useRef } from 'react'
import { MessagesSquare } from 'lucide-react'
import ScrollReveal from './ScrollReveal.jsx'
import { useLang } from '../i18n.jsx'

// Commentaires visiteurs via giscus (adossés aux GitHub Discussions du repo).
// repoId déjà renseigné. Pour activer :
//   1) GitHub → portfolio-fable → Settings → Features → cocher "Discussions"
//   2) installer l'app https://github.com/apps/giscus sur le repo
//   3) remplir categoryId (je le récupère via l'API une fois les étapes 1-2 faites)
// Tant que categoryId est vide, la section ne s'affiche pas.
const GISCUS = {
  repo: 'LaFicelleCmoi/portfolio-fable',
  repoId: 'R_kgDOTah75Q',
  category: 'Announcements',
  categoryId: '',
}

const STRINGS = {
  fr: { title: 'PADDOCK — LIVRE D\'OR', subtitle: 'Un mot, un retour, un encouragement ? Signez le livre d\'or (via GitHub).' },
  en: { title: 'PADDOCK — GUESTBOOK', subtitle: 'A word, some feedback, a cheer? Sign the guestbook (via GitHub).' },
}

export default function Comments() {
  const ref = useRef(null)
  const { lang } = useLang()
  const L = STRINGS[lang]

  useEffect(() => {
    if (!GISCUS.categoryId || !ref.current) return
    ref.current.innerHTML = ''
    const s = document.createElement('script')
    s.src = 'https://giscus.app/client.js'
    s.async = true
    s.crossOrigin = 'anonymous'
    const attrs = {
      'data-repo': GISCUS.repo,
      'data-repo-id': GISCUS.repoId,
      'data-category': GISCUS.category,
      'data-category-id': GISCUS.categoryId,
      'data-mapping': 'specific',
      'data-term': 'Livre d\'or du portfolio',
      'data-strict': '0',
      'data-reactions-enabled': '1',
      'data-emit-metadata': '0',
      'data-input-position': 'top',
      'data-theme': 'transparent_dark',
      'data-lang': lang,
    }
    for (const [k, v] of Object.entries(attrs)) s.setAttribute(k, v)
    ref.current.appendChild(s)
  }, [lang])

  if (!GISCUS.categoryId) return null

  return (
    <ScrollReveal className="mt-12">
      <p className="mb-2 flex items-center justify-center gap-2 text-center font-mono text-[11px] tracking-[0.3em] text-gray-500">
        <MessagesSquare size={13} className="text-cyan" /> {L.title}
      </p>
      <p className="mb-6 text-center text-sm text-gray-400">{L.subtitle}</p>
      <div ref={ref} className="mx-auto max-w-3xl" />
    </ScrollReveal>
  )
}
