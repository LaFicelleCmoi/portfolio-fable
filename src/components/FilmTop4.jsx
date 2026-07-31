import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Pencil, X, Upload, Download, RotateCcw, Check } from 'lucide-react'
import {
  DEFAULT_FILMS, loadFilms, saveFilms, clearFilms, hasLocalFilms, slugify,
} from '../data/films.js'

// Affiche le Top 4 Letterboxd (posters cliquables) — et, en mode édition
// (?edit=films dans l'URL, réservé à moi), un éditeur : glisser-déposer d'affiches
// + champs titre/année/lien, sauvegardé dans le navigateur pour l'aperçu. Le bouton
// « Exporter » télécharge les affiches renommées et copie le nouveau data/films.js
// prêt à committer : c'est le commit qui met les changements en ligne pour tous.
const T = {
  fr: {
    edit: 'Éditer le Top 4',
    editorTitle: 'Éditer mon Top 4 Letterboxd',
    hint: "Glisse une affiche sur une case (ou clique), édite titre/année/lien. Tout est sauvegardé dans TON navigateur (aperçu perso, invisible pour les visiteurs). « Exporter » génère les fichiers à committer pour la mise en ligne.",
    drop: 'Glisser',
    fTitle: 'Titre du film',
    fYear: 'Année',
    fUrl: 'Lien Letterboxd',
    export: 'Exporter',
    reset: 'Réinitialiser',
    close: 'Fermer',
    exported: 'Copié dans le presse-papiers ! Colle-moi ce contenu et dépose les affiches téléchargées dans public/ — je committe.',
    localBadge: 'aperçu local non publié',
    view: 'voir sur Letterboxd',
    poster: 'Affiche',
  },
  en: {
    edit: 'Edit the Top 4',
    editorTitle: 'Edit my Letterboxd Top 4',
    hint: 'Drop a poster onto a slot (or click), edit title/year/link. Everything is saved in YOUR browser (personal preview, invisible to visitors). “Export” generates the files to commit for going live.',
    drop: 'Drop',
    fTitle: 'Film title',
    fYear: 'Year',
    fUrl: 'Letterboxd link',
    export: 'Export',
    reset: 'Reset',
    close: 'Close',
    exported: 'Copied to clipboard! Send me this content and drop the downloaded posters into public/ — I commit.',
    localBadge: 'local preview, unpublished',
    view: 'view on Letterboxd',
    poster: 'Poster',
  },
}

const INPUT_CLS =
  'rounded-lg border border-line bg-panel/60 px-2.5 py-1.5 text-xs text-white outline-none transition-colors focus:border-cyan'

// déclenche le téléchargement d'une image encodée en data URL
function triggerDownload(dataUrl, filename) {
  const a = document.createElement('a')
  a.href = dataUrl
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
}

// une ligne de l'éditeur : zone de dépôt (affiche) + champs
function FilmSlot({ idx, film, onFile, onField, L }) {
  const inputRef = useRef(null)
  const pick = () => inputRef.current?.click()
  return (
    <div className="flex gap-3 rounded-2xl border border-line bg-ink/40 p-3">
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault()
          onFile(idx, e.dataTransfer.files?.[0])
        }}
        onClick={pick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            pick()
          }
        }}
        role="button"
        tabIndex={0}
        title={L.drop}
        className="group relative aspect-[2/3] w-16 shrink-0 cursor-pointer overflow-hidden rounded-lg border border-dashed border-line bg-panel/60 focus:outline-none focus-visible:border-cyan"
      >
        {film.img && <img src={film.img} alt="" className="h-full w-full object-cover" />}
        <span className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-ink/70 text-center text-[8px] text-gray-200 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          <Upload size={13} className="text-cyan" /> {L.drop}
        </span>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => onFile(idx, e.target.files?.[0])}
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <input
          value={film.title}
          onChange={(e) => onField(idx, 'title', e.target.value)}
          placeholder={L.fTitle}
          aria-label={L.fTitle}
          className={INPUT_CLS}
        />
        <div className="flex gap-2">
          <input
            value={film.year}
            onChange={(e) => onField(idx, 'year', e.target.value)}
            placeholder={L.fYear}
            aria-label={L.fYear}
            inputMode="numeric"
            className={`${INPUT_CLS} w-20 shrink-0`}
          />
          <input
            value={film.url}
            onChange={(e) => onField(idx, 'url', e.target.value)}
            placeholder={L.fUrl}
            aria-label={L.fUrl}
            className={`${INPUT_CLS} min-w-0 flex-1`}
          />
        </div>
      </div>
    </div>
  )
}

export default function FilmTop4({ lang, label }) {
  const L = T[lang]
  const [films, setFilms] = useState(loadFilms)
  const [open, setOpen] = useState(false)
  const [local, setLocal] = useState(hasLocalFilms)
  const [exportText, setExportText] = useState('')

  // l'éditeur n'apparaît qu'avec ?edit=films (bookmark perso) — invisible pour les visiteurs
  const editMode = useMemo(() => {
    try {
      return new URLSearchParams(window.location.search).get('edit') === 'films'
    } catch {
      return false
    }
  }, [])

  const commit = (next) => {
    setFilms(next)
    saveFilms(next)
    setLocal(true)
  }
  const onField = (idx, key, val) =>
    commit(films.map((f, i) => (i === idx ? { ...f, [key]: val } : f)))

  const onFile = (idx, file) => {
    if (!file || !file.type?.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = () => onField(idx, 'img', reader.result)
    reader.readAsDataURL(file)
  }

  const reset = () => {
    clearFilms()
    setFilms(DEFAULT_FILMS)
    setLocal(false)
    setExportText('')
  }

  const doExport = async () => {
    // affiches nouvellement déposées = data URLs → on les télécharge sous un nom stable
    const out = films.map((f) => {
      if (typeof f.img === 'string' && f.img.startsWith('data:')) {
        const name = `${slugify(f.title)}.jpg`
        triggerDownload(f.img, name)
        return { ...f, img: `/${name}` }
      }
      return f
    })
    const body = out
      .map(
        (f) =>
          `  { title: ${JSON.stringify(f.title)}, year: ${Number(f.year) || JSON.stringify(f.year)}, img: ${JSON.stringify(f.img)}, url: ${JSON.stringify(f.url)} },`
      )
      .join('\n')
    const text = `export const DEFAULT_FILMS = [\n${body}\n]\n`
    setExportText(text)
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      /* presse-papiers indisponible : le texte reste affiché pour copie manuelle */
    }
  }

  // fermeture au clavier + verrou du scroll pendant l'édition
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <div className="mt-4">
      <p className="mb-2 flex items-center justify-between gap-2 font-mono text-[10px] tracking-[0.25em] text-gray-500">
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#00e054] mix-blend-screen" />
          {label}
        </span>
        {local && (
          <span className="rounded-full border border-[#40bcf4]/40 px-1.5 py-0.5 text-[8px] tracking-normal text-[#40bcf4]">
            {L.localBadge}
          </span>
        )}
      </p>

      <div className="grid grid-cols-4 gap-2">
        {films.map((film, i) => (
          <a
            key={i}
            href={film.url}
            target="_blank"
            rel="noreferrer"
            title={`${film.title} (${film.year}) — Letterboxd`}
            aria-label={`${film.title} (${film.year}) — ${L.view}`}
            className="group/film block overflow-hidden rounded-lg border border-line bg-ink/60 transition-all hover:border-[#40bcf4]/60 hover:shadow-[0_0_14px_rgba(64,188,244,0.3)]"
          >
            <img
              src={film.img}
              alt={`${L.poster} : ${film.title}`}
              loading="lazy"
              className="aspect-[2/3] h-full w-full object-cover transition-transform duration-300 group-hover/film:scale-105"
            />
          </a>
        ))}
      </div>

      {editMode && (
        <button
          onClick={() => setOpen(true)}
          className="btn-uiverse mt-3 inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-line bg-ink/60 px-3 py-1.5 text-[11px] text-cyan transition-colors hover:border-cyan/50 [--glow:var(--color-cyan)]"
        >
          <Pencil size={11} /> {L.edit}
        </button>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[75] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={L.editorTitle}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 22, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-line bg-panel shadow-2xl shadow-black/60"
            >
              <div className="checkered h-2 w-full opacity-80" />
              <button
                onClick={() => setOpen(false)}
                aria-label={L.close}
                className="absolute top-5 right-4 cursor-pointer rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-line hover:text-white"
              >
                <X size={18} />
              </button>

              <div className="max-h-[80vh] overflow-y-auto p-6 sm:p-7">
                <h3 className="mb-1 pr-8 text-lg font-bold text-white">{L.editorTitle}</h3>
                <p className="mb-5 text-xs leading-relaxed text-gray-400">{L.hint}</p>

                <div className="space-y-3">
                  {films.map((film, i) => (
                    <FilmSlot key={i} idx={i} film={film} onFile={onFile} onField={onField} L={L} />
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={doExport}
                    className="btn-uiverse inline-flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-neon to-cyan px-4 py-2 text-xs font-semibold text-white"
                  >
                    <Download size={14} /> {L.export}
                  </button>
                  <button
                    onClick={reset}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-line bg-ink/60 px-4 py-2 text-xs text-gray-300 transition-colors hover:border-f1/50 hover:text-white"
                  >
                    <RotateCcw size={13} /> {L.reset}
                  </button>
                </div>

                {exportText && (
                  <div className="mt-4">
                    <p className="mb-2 flex items-start gap-1.5 text-xs leading-relaxed text-green-300">
                      <Check size={13} className="mt-0.5 shrink-0" /> {L.exported}
                    </p>
                    <textarea
                      readOnly
                      value={exportText}
                      onFocus={(e) => e.target.select()}
                      className="h-40 w-full rounded-xl border border-line bg-ink/60 p-3 font-mono text-[11px] leading-relaxed text-gray-300 outline-none"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
