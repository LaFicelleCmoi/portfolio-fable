// "il y a 3 jours" / "3 days ago" — via l'API native, zéro dépendance
export function relativeTime(iso, lang = 'fr') {
  const diff = Date.now() - new Date(iso).getTime()
  const rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' })
  const hours = Math.round(diff / 3.6e6)
  if (hours < 1) return lang === 'fr' ? "il y a moins d'une heure" : 'less than an hour ago'
  if (hours < 24) return rtf.format(-hours, 'hour')
  const days = Math.round(hours / 24)
  if (days < 30) return rtf.format(-days, 'day')
  const months = Math.round(days / 30)
  if (months < 12) return rtf.format(-months, 'month')
  return rtf.format(-Math.round(months / 12), 'year')
}
