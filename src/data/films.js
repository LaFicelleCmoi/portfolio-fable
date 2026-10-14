import filmsData from './films.json'

// Top 4 Letterboxd — la source de vérité committée est films.json (pure donnée,
// réécrite par le mode admin via api/content à chaque publication). L'éditeur
// (composant FilmTop4) garde un brouillon dans le navigateur pour l'aperçu ; « Publier »
// commite affiches + JSON dans le dépôt, Vercel redéploie et tout le monde voit la modif.
// Affiches auto-hébergées dans public/ (servies à la racine du site).
export const DEFAULT_FILMS = filmsData

const STORAGE_KEY = 'top-films'

// Charge les modifs locales (aperçu perso) si présentes, sinon le Top 4 committé.
export function loadFilms() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length) return parsed
    }
  } catch { /* stockage indisponible/corrompu : on retombe sur le Top 4 committé */ }
  return DEFAULT_FILMS
}

export function saveFilms(films) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(films))
  } catch { /* quota dépassé ou stockage bloqué : l'aperçu ne persistera pas, pas grave */ }
}

export function clearFilms() {
  try { localStorage.removeItem(STORAGE_KEY) } catch { /* pas grave */ }
}

export function hasLocalFilms() {
  try { return !!localStorage.getItem(STORAGE_KEY) } catch { return false }
}

// Slug ASCII pour nommer les affiches exportées : "Requiem for a Dream" → "requiem-for-a-dream".
export function slugify(title) {
  return (title || '')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'affiche'
}
