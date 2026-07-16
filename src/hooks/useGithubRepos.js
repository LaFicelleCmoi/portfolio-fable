import { useEffect, useState } from 'react'

const USERNAME = 'LaFicelleCmoi'
const EXCLUDED = new Set(['Portfolio', 'Portfolio.V2', 'portfolio-lois-clerc', 'CV-Num-rique-Portfolio', 'portfolio-fable'])

// Récupère les repos publics en direct : le portfolio se met à jour
// automatiquement à chaque nouveau projet publié sur GitHub.
// Stratégie "stale-while-revalidate" : on affiche tout de suite le cache
// de l'onglet, puis on re-vérifie auprès de GitHub à chaque chargement —
// un nouveau repo apparaît donc au simple rafraîchissement de la page.
export default function useGithubRepos() {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const cached = sessionStorage.getItem('gh-repos')
    if (cached) {
      setRepos(JSON.parse(cached))
      setLoading(false)
    }
    fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`)
      .then((r) => {
        if (!r.ok) throw new Error(`GitHub API : ${r.status}`)
        return r.json()
      })
      .then((data) => {
        const cleaned = data
          .filter((r) => !r.fork && !EXCLUDED.has(r.name))
          .map((r) => ({
            name: r.name,
            description: r.description,
            language: r.language,
            url: r.html_url,
            homepage: r.homepage,
            stars: r.stargazers_count,
            updatedAt: r.updated_at,
            topics: r.topics ?? [],
          }))
        sessionStorage.setItem('gh-repos', JSON.stringify(cleaned))
        setRepos(cleaned)
        setError(null)
      })
      .catch((e) => {
        // en cas d'échec (rate limit, hors-ligne), on garde le cache affiché
        if (!cached) setError(e.message)
      })
      .finally(() => setLoading(false))
  }, [])

  return { repos, loading, error }
}
