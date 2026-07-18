import { ExternalLink, Github } from 'lucide-react'
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
        links: [
          { label: 'f1-2026', site: 'https://f1-2026-gamma.vercel.app/', code: 'https://github.com/LaFicelleCmoi/f1-2026' },
        ],
      },
      {
        emoji: '⚽',
        title: 'Football',
        text: 'Ligue des Champions, Coupe du Monde et Ligue des Nations suivies de près — au point de coder mes propres trackers.',
        color: 'rgba(0, 210, 106, 0.15)',
        links: [
          { label: 'LDC', site: 'https://ldc-2026-2027.vercel.app/', code: 'https://github.com/LaFicelleCmoi/LDC-2026-2027-' },
          { label: 'CDM & Nations', site: 'https://cdm-hazel.vercel.app/', code: 'https://github.com/LaFicelleCmoi/cdm' },
        ],
      },
      {
        emoji: '🎮',
        title: 'Jeux vidéo',
        text: "Joueur et créateur : Marioparty, F1 Retro Racer… j'aime autant jouer que fabriquer le jeu.",
        color: 'rgba(124, 58, 237, 0.2)',
        links: [
          { label: 'Marioparty', site: 'https://marioparty.vercel.app/', code: 'https://github.com/LaFicelleCmoi/Marioparty' },
        ],
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
        links: [
          { label: 'f1-2026', site: 'https://f1-2026-gamma.vercel.app/', code: 'https://github.com/LaFicelleCmoi/f1-2026' },
        ],
      },
      {
        emoji: '⚽',
        title: 'Football',
        text: 'Champions League, World Cup and Nations League followed closely — to the point of coding my own trackers.',
        color: 'rgba(0, 210, 106, 0.15)',
        links: [
          { label: 'UCL', site: 'https://ldc-2026-2027.vercel.app/', code: 'https://github.com/LaFicelleCmoi/LDC-2026-2027-' },
          { label: 'WC & Nations', site: 'https://cdm-hazel.vercel.app/', code: 'https://github.com/LaFicelleCmoi/cdm' },
        ],
      },
      {
        emoji: '🎮',
        title: 'Video games',
        text: 'Player and maker: Marioparty, F1 Retro Racer… I enjoy building the game as much as playing it.',
        color: 'rgba(124, 58, 237, 0.2)',
        links: [
          { label: 'Marioparty', site: 'https://marioparty.vercel.app/', code: 'https://github.com/LaFicelleCmoi/Marioparty' },
        ],
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
                {tile.links?.length > 0 && (
                  <span className="mt-4 flex flex-wrap gap-2">
                    {/* chip segmenté : au recruteur de choisir — le site en ligne ou le code */}
                    {tile.links.map((lnk) => (
                      <span
                        key={lnk.label}
                        className="inline-flex items-stretch overflow-hidden rounded-full border border-line bg-ink/60 text-xs"
                      >
                        <span className="flex items-center px-3 py-1.5 font-medium text-gray-300">{lnk.label}</span>
                        {lnk.site && (
                          <a
                            href={lnk.site}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${lnk.label} — ${lang === 'fr' ? 'voir le site' : 'open the site'}`}
                            title={lang === 'fr' ? 'Voir le site' : 'Open the site'}
                            className="flex items-center gap-1 border-l border-line px-2.5 text-cyan transition-colors hover:bg-panel"
                          >
                            <ExternalLink size={11} /> {lang === 'fr' ? 'site' : 'site'}
                          </a>
                        )}
                        {lnk.code && (
                          <a
                            href={lnk.code}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${lnk.label} — ${lang === 'fr' ? 'code source' : 'source code'}`}
                            title={lang === 'fr' ? 'Code source sur GitHub' : 'Source code on GitHub'}
                            className="flex items-center gap-1 border-l border-line px-2.5 text-gray-400 transition-colors hover:bg-panel hover:text-neon"
                          >
                            <Github size={11} /> code
                          </a>
                        )}
                      </span>
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
