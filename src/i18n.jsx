import { createContext, useContext, useEffect, useState } from 'react'

// i18n maison, volontairement minimaliste : un contexte, deux langues.
// Chaque section déclare ses textes dans un objet STRINGS = { fr: {...}, en: {...} }.
const LangContext = createContext({ lang: 'fr', toggle: () => {} })

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem('lang')
      if (saved === 'fr' || saved === 'en') return saved
    } catch { /* stockage indisponible : on reste en français */ }
    return 'fr'
  })

  useEffect(() => {
    try {
      localStorage.setItem('lang', lang)
    } catch { /* pas grave */ }
    document.documentElement.lang = lang
  }, [lang])

  const toggle = () => setLang((l) => (l === 'fr' ? 'en' : 'fr'))
  return <LangContext.Provider value={{ lang, toggle }}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)
