import { ExternalLink } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import SpotlightCard from '../components/SpotlightCard.jsx'
import GlitchText from '../components/GlitchText.jsx'
import { useLang } from '../i18n.jsx'

// « Hors piste » : ce qui me fait vibrer quand l'ordinateur est éteint.
// Le sujet du portfolio encourage à montrer hobbies et personnalité —
// et chaque passion renvoie vers un projet qui la prouve quand c'est possible.
const STRINGS = {
  fr: {
    kicker: 'Hors piste',
    title: 'Quand je ne code pas',
    subtitle: "Les passions nourrissent les projets : la moitié de mon GitHub vient de ce qui suit.",
    proof: 'la preuve',
    tiles: [
      {
        emoji: '🏎️',
        title: 'Formule 1',
        text: "Aucune surprise à ce stade. Week-ends de Grand Prix sacrés, débats stratégie assumés — et trois projets F1 sur mon GitHub.",
        span: true,
        color: 'rgba(225, 6, 0, 0.18)',
        link: { label: 'f1-2026', href: 'https://github.com/LaFicelleCmoi/f1-2026' },
      },
      {
        emoji: '⚽',
        title: 'Football',
        text: 'Ligue des Champions, Coupe du Monde et Ligue des Nations suivies de près — au point de coder mes propres trackers.',
        color: 'rgba(0, 210, 106, 0.15)',
        links: [
          { label: 'LDC tracker', href: 'https://github.com/LaFicelleCmoi/LDC-2026-2027-' },
          { label: 'CDM & Ligue des Nations', href: 'https://cdm-hazel.vercel.app/' },
        ],
      },
      {
        emoji: '🎮',
        title: 'Jeux vidéo',
        text: "Joueur et créateur : Marioparty, F1 Retro Racer… j'aime autant jouer que fabriquer le jeu.",
        color: 'rgba(124, 58, 237, 0.2)',
        link: { label: 'Marioparty', href: 'https://github.com/LaFicelleCmoi/Marioparty' },
      },
      {
        emoji: '🎬',
        title: 'Cinéma',
        text: 'Grand consommateur de films, journal de visionnage tenu sérieusement sur Letterboxd.',
        color: 'rgba(244, 114, 182, 0.16)',
        letterboxd: true,
      },
      {
        emoji: '🧱',
        title: 'LEGO',
        text: "Construire brique par brique, avec des instructions ou sans : au fond, c'est déjà du développement.",
        color: 'rgba(255, 215, 0, 0.14)',
      },
    ],
  },
  en: {
    kicker: 'Off track',
    title: "When I'm not coding",
    subtitle: 'Passions feed the projects: half of my GitHub comes from what follows.',
    proof: 'proof',
    tiles: [
      {
        emoji: '🏎️',
        title: 'Formula 1',
        text: 'No surprise at this point. Grand Prix weekends are sacred, strategy debates fully assumed — and three F1 projects on my GitHub.',
        span: true,
        color: 'rgba(225, 6, 0, 0.18)',
        link: { label: 'f1-2026', href: 'https://github.com/LaFicelleCmoi/f1-2026' },
      },
      {
        emoji: '⚽',
        title: 'Football',
        text: 'Champions League, World Cup and Nations League followed closely — to the point of coding my own trackers.',
        color: 'rgba(0, 210, 106, 0.15)',
        links: [
          { label: 'UCL tracker', href: 'https://github.com/LaFicelleCmoi/LDC-2026-2027-' },
          { label: 'World Cup & Nations League', href: 'https://cdm-hazel.vercel.app/' },
        ],
      },
      {
        emoji: '🎮',
        title: 'Video games',
        text: 'Player and maker: Marioparty, F1 Retro Racer… I enjoy building the game as much as playing it.',
        color: 'rgba(124, 58, 237, 0.2)',
        link: { label: 'Marioparty', href: 'https://github.com/LaFicelleCmoi/Marioparty' },
      },
      {
        emoji: '🎬',
        title: 'Movies',
        text: 'Heavy film watcher, with a viewing diary seriously maintained on Letterboxd.',
        color: 'rgba(244, 114, 182, 0.16)',
        letterboxd: true,
      },
      {
        emoji: '🧱',
        title: 'LEGO',
        text: 'Building brick by brick, with or without instructions: deep down, that is already software development.',
        color: 'rgba(255, 215, 0, 0.14)',
      },
    ],
  },
}

export default function OffTrack() {
  const { lang } = useLang()
  const L = STRINGS[lang]

  return (
    <section className="relative mx-auto max-w-5xl px-6 py-28">
      <SectionHeader sector="06" kicker={L.kicker} title={L.title}>
        {L.subtitle}
      </SectionHeader>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {L.tiles.map((tile, i) => (
          <ScrollReveal key={tile.title} delay={i * 0.07} className={tile.span ? 'sm:col-span-2' : ''}>
            <SpotlightCard className="h-full p-7" color={tile.color}>
              <div className="flex h-full flex-col">
                <span className="mb-4 text-4xl" aria-hidden>
                  <GlitchText>{tile.emoji}</GlitchText>
                </span>
                <h3 className="mb-2 text-lg font-semibold text-white">{tile.title}</h3>
                <p className="flex-1 text-sm leading-relaxed text-gray-400">{tile.text}</p>
                {(tile.links ?? (tile.link ? [tile.link] : [])).length > 0 && (
                  <span className="mt-4 flex flex-wrap gap-2">
                    {(tile.links ?? [tile.link]).map((lnk) => (
                      <a
                        key={lnk.href}
                        href={lnk.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex w-fit items-center gap-1.5 rounded-full border border-line bg-ink/60 px-3 py-1.5 text-xs text-cyan transition-colors hover:border-cyan/50"
                      >
                        {L.proof} : {lnk.label} <ExternalLink size={11} />
                      </a>
                    ))}
                  </span>
                )}
                {tile.letterboxd && (
                  <a
                    href="https://letterboxd.com/LaFicelleCmoi/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Letterboxd — LaFicelleCmoi"
                    className="mt-4 inline-flex w-fit items-center gap-2.5 rounded-full border border-[#2c3440] bg-[#14181c] px-3.5 py-2 transition-all hover:border-[#40bcf4]/60 hover:shadow-[0_0_16px_rgba(64,188,244,0.3)]"
                  >
                    {/* les trois pastilles Letterboxd */}
                    <span className="flex -space-x-1" aria-hidden>
                      <span className="h-3 w-3 rounded-full bg-[#ff8000]" />
                      <span className="h-3 w-3 rounded-full bg-[#00e054] mix-blend-screen" />
                      <span className="h-3 w-3 rounded-full bg-[#40bcf4] mix-blend-screen" />
                    </span>
                    <span className="text-xs font-bold tracking-wide text-white">LaFicelleCmoi</span>
                  </a>
                )}
              </div>
            </SpotlightCard>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
