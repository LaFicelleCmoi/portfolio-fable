# Portfolio — Loïs ⚡

Portfolio personnel construit avec **React + Vite + TailwindCSS v4 + Framer Motion**.
Design inspiré de [reactbits.dev](https://reactbits.dev) et [uiverse.io](https://uiverse.io).

## ✨ Fonctionnalités

- **Projets synchronisés en direct** avec l'API GitHub (`LaFicelleCmoi`) — le portfolio
  se met à jour automatiquement à chaque nouveau repo publié, avec filtres par langage.
- **Composants animés maison** (dossier `src/components/`) :
  - `Particles` — fond de particules interactif sur canvas
  - `Aurora` — blobs lumineux flottants
  - `SplitText` / `BlurText` / `GradientText` / `ShinyText` — animations de texte
  - `Typewriter` — machine à écrire en boucle
  - `CountUp` — compteurs animés au scroll
  - `TiltCard` — cartes 3D suivant la souris
  - `Magnetic` — éléments aimantés au curseur
  - `Navbar` — dock flottant avec pilule animée (layoutId)
  - `Marquee`, `Loader`, `GlowButton`, cartes *border-beam*… (style uiverse.io)
- Responsive, flat design, SEO (meta OG/Twitter, HTML sémantique, aria-labels).

## 🚀 Lancer en local

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build de production dans dist/
```

## 📋 À personnaliser

- **CV** : remplacer `public/cv-lois.pdf` par ton vrai CV.
- **LinkedIn** : pointer vers ton profil public (`/in/...`) dans `src/sections/Contact.jsx`.
- **Photo** : l'avatar GitHub est utilisé par défaut (`src/sections/Hero.jsx`).

## 🌐 Déploiement GitHub Pages

`vite.config.js` est déjà configuré avec `base: './'`. Exemple de workflow CI/CD :
pousser sur `main` → GitHub Actions build → déploiement Pages (bonus DevOps ✅).
