// Données éditoriales des projets : catégories, podium et fiches détaillées.
// La carte affiche `tagline`, la modal (au clic) affiche `details` + `tech`.
// Tout repo absent d'ici retombe sur sa description GitHub.

export const CATEGORY_MAP = {
  cdm: 'Foot', 'LDC-2026-2027-': 'Foot',
  Marioparty: 'Jeux', Pendu: 'Jeux', 'Jeu-2D': 'Jeux', 'F1-Retro-Game': 'Jeux', 'Auto-Clicker': 'Jeux',
  'f1-2026': 'Web', easyjob: 'Web', got: 'Web', 'T-ENT-500': 'Web', 'Site-Web': 'Web',
  'f1-portfolio': 'Web', TEPITECH: 'Web', epitech: 'Web', btelgeuse: 'Web',
  Alice: 'IA & Python', 'T-AIA-600---Alice-au-pays-des-merveilles': 'IA & Python',
  qr_app: 'IA & Python', 'Smart-Fridge': 'IA & Python',
  'RTC-Project-Bureau': 'Temps réel', 'RTC-Projet': 'Temps réel',
  Docker: 'DevOps', Jenkins: 'DevOps', BERNSTEIN: 'DevOps', breinstein: 'DevOps', 't-dev': 'DevOps',
  Arrosage: 'IoT',
}

export const CATEGORY_ICONS = {
  'Tous': '🏁', 'Foot': '⚽', 'Jeux': '🎮', 'Web': '🌐', 'IA & Python': '🧠',
  'Temps réel': '⚡', 'DevOps': '🐳', 'IoT': '🔌', 'Autres': '📦',
}

export const categoryOf = (repo) => CATEGORY_MAP[repo.name] ?? 'Autres'

// Le podium est dynamique : les 3 premières cartes de la grille portent P1/P2/P3.
// DEFAULT_ORDER est l'ordre de départ, réorganisable par glisser-déposer.
export const DEFAULT_ORDER = ['f1-2026', 'Marioparty', 'Alice']
export const PODIUM_STYLE = {
  1: { label: 'P1', color: '#ffd700' },
  2: { label: 'P2', color: '#c0c4cc' },
  3: { label: 'P3', color: '#cd7f32' },
}

export const PROJECT_DETAILS = {
  'f1-2026': {
    tagline: 'Tracker temps réel de la saison F1 2026 : classements, résultats et podium style F1 TV.',
    details: "Application web de suivi de la saison de Formule 1 2026 en temps réel : calendrier complet avec statut en direct, classements pilotes et constructeurs avec barres de points animées aux couleurs des équipes, résultats course/sprint/qualifs avec anti-spoiler intégré, podium premium façon F1 TV (colonnes en escalier, couronne P1) et compte à rebours avant la prochaine session, style grille de départ. Mon projet passion : la F1 rencontre le code.",
    tech: ['JavaScript', 'API temps réel', 'CSS animations'],
  },
  'LDC-2026-2027-': {
    tagline: 'Tracker live de la Ligue des Champions avec overlay OBS pour le stream.',
    details: "Tracker et simulateur live de la Ligue des Champions 2026-2027, avec un overlay OBS pensé pour le stream. 100 % vanilla (HTML/CSS/JS), aucun build, aucun npm : déploiement statique sur Vercel. Dashboard des matchs du jour (live, à venir, terminés), explorateur de clubs, et données issues de l'API publique d'ESPN. Projet de fan, non affilié à l'UEFA.",
    tech: ['HTML/CSS/JS vanilla', 'API ESPN', 'Overlay OBS', 'Vercel'],
  },
  cdm: {
    tagline: 'Suivi de la Coupe du Monde : matchs, groupes et classements.',
    details: "Petit frère du tracker Ligue des Champions, appliqué à la Coupe du Monde : suivi des matchs, des groupes et des classements, en HTML/CSS/JS sans framework. Même philosophie : léger, statique, direct à l'essentiel.",
    tech: ['HTML', 'CSS', 'JavaScript'],
  },
  Marioparty: {
    tagline: 'Jeu multijoueur inspiré de Mario Party : plateau et mini-jeux en JavaScript.',
    details: "Jeu de plateau multijoueur inspiré de Mario Party, développé en JavaScript : déplacement sur le plateau, tours de jeu, et mini-jeux pour départager les joueurs. Un bon terrain d'entraînement pour la logique de jeu, la gestion d'état et les animations.",
    tech: ['JavaScript', 'Canvas / DOM', 'Logique de jeu'],
  },
  Alice: {
    tagline: "NLP sur des livres entiers : résumés, thèmes, émotions et clustering.",
    details: "Projet IA (T-AIA-600) : une pipeline NLP complète qui avale des livres entiers (Project Gutenberg) et en sort des résumés automatiques (TextRank), une classification thématique (LDA), une analyse stylistique, des courbes émotionnelles, des nuages de mots et une carte de similarité entre livres (TF-IDF + K-Means). Ma porte d'entrée dans le machine learning.",
    tech: ['Python', 'TF-IDF', 'TextRank', 'LDA', 'K-Means'],
  },
  'T-AIA-600---Alice-au-pays-des-merveilles': {
    tagline: "Le module Epitech derrière le projet Alice : découverte de l'IA par le NLP.",
    details: "Dépôt du module T-AIA-600 d'Epitech, socle du projet Alice : découverte de l'intelligence artificielle à travers le traitement du langage naturel appliqué à « Alice au pays des merveilles ».",
    tech: ['Python', 'NLP'],
  },
  epitech: {
    tagline: 'ChatFlow : messagerie temps réel moderne en Next.js 14 avec CI/CD.',
    details: "ChatFlow, une application de messagerie temps réel pensée pour les communautés et les équipes : Next.js 14, Node.js 20, PostgreSQL 16, et une CI/CD GitHub Actions. Architecture propre, communication instantanée, et une vraie chaîne d'intégration continue comme en entreprise.",
    tech: ['Next.js 14', 'Node.js', 'PostgreSQL', 'GitHub Actions'],
  },
  'RTC-Projet': {
    tagline: 'ChatFlow (v1) : messagerie type Discord en WebSockets.',
    details: "Première version de ChatFlow : une plateforme de messagerie instantanée inspirée de Discord. Création de serveurs, salons de discussion, échanges en temps réel via WebSockets, avec une architecture séparant clairement frontend, backend et base de données.",
    tech: ['TypeScript', 'WebSockets', 'Architecture front/back/DB'],
  },
  'RTC-Project-Bureau': {
    tagline: 'Application temps réel en TypeScript (WebSocket / RTC).',
    details: "Déclinaison bureau du projet RTC : communication temps réel en TypeScript autour des WebSockets, dans la continuité de ChatFlow.",
    tech: ['TypeScript', 'WebSockets'],
  },
  BERNSTEIN: {
    tagline: 'Popeye : stack Kubernetes locale complète avec K3d, PostgreSQL et Redis.',
    details: "Projet DevOps (B-DOP-200 « Popeye ») : une stack Kubernetes locale montée avec K3d — PostgreSQL, Redis, services poll/worker/result et ingress Traefik. Manifestes, initialisation de la base, débogage et cycle de vie complet du cluster : du vrai DevOps, en conditions réelles.",
    tech: ['Kubernetes', 'K3d', 'PostgreSQL', 'Redis', 'Traefik'],
  },
  breinstein: {
    tagline: 'Itération du projet Popeye : orchestration de conteneurs.',
    details: "Seconde itération autour du projet Popeye : orchestration de conteneurs et amélioration de la stack. Le terrain d'entraînement qui accompagne BERNSTEIN.",
    tech: ['Docker', 'Kubernetes'],
  },
  qr_app: {
    tagline: 'Générateur de QR codes en Python, simple et efficace.',
    details: "Générateur de QR codes en Python : on lui donne un texte ou une URL, il sort un QR code prêt à partager. Petit projet, mais fini et utilisable — ma philosophie.",
    tech: ['Python'],
  },
  Pendu: {
    tagline: 'Le jeu du pendu en Python, en console.',
    details: "Le grand classique du pendu, codé en Python : gestion des mots, des vies et de la boucle de jeu. Un de mes premiers projets — c'est là qu'on apprend les bases pour de vrai.",
    tech: ['Python'],
  },
  'Auto-Clicker': {
    tagline: 'Extension Chrome d\'automatisation de clics via le protocole DevTools.',
    details: "Extension Chrome tout-en-un pour automatiser des clics sur n'importe quel site : elle passe par le protocole Chrome DevTools (chrome.debugger) pour envoyer de vrais clics au niveau du navigateur, avec 4 modes de fonctionnement. Un projet qui m'a fait plonger dans les entrailles du navigateur.",
    tech: ['JavaScript', 'Extension Chrome', 'DevTools Protocol'],
  },
  easyjob: {
    tagline: 'API backend CRUD avec Node.js, PostgreSQL et Docker.',
    details: "Découverte du backend : une API REST respectant la méthode CRUD, avec Node.js, PostgreSQL, pgAdmin et un déploiement via docker compose. Le projet qui m'a appris à structurer un serveur proprement.",
    tech: ['Node.js', 'PostgreSQL', 'Docker Compose'],
  },
  'F1-Retro-Game': {
    tagline: 'F1 Retro Racer : endless runner 2D en Java/libGDX, risk vs reward.',
    details: "Jeu d'arcade 2D (endless runner) développé en Java avec libGDX : survivez sur la piste, esquivez le trafic et les flaques d'huile. Mécanique « risk vs reward » : frôler les adversaires déclenche un dépassement risqué à +500 points. Avec une vraie séquence de feux de départ en matrice 5×4. Ma passion F1, version pixel art.",
    tech: ['Java', 'libGDX', 'Game design'],
  },
  'Jeu-2D': {
    tagline: 'Hub de jeu 2D en Java réalisé en 3 semaines : moteur, sprites et collisions.',
    details: "Hub de jeu 2D développé en Java en 3 semaines : moteur de rendu, gestion des sprites, collisions et déplacements. Réalisé pendant mon BTS — mon premier « vrai » projet de jeu.",
    tech: ['Java', 'Moteur 2D'],
  },
  'T-ENT-500': {
    tagline: 'Portfolio « F1 Telemetry Edition » : dashboard d\'ingénieur de piste.',
    details: "Version précédente de mon portfolio, immergée dans l'univers F1 : l'interface simule un écran de contrôle d'ingénieur de piste (télémétrie), en flat design strict. Le prototype qui a inspiré le thème du portfolio actuel.",
    tech: ['HTML', 'CSS', 'Flat design'],
  },
  'f1-portfolio': {
    tagline: 'Portfolio single-page façon tableau de bord de télémétrie F1.',
    details: "Portfolio single-page à l'esthétique de tableau de bord F1 : CSS Grid et Flexbox pour un layout dashboard responsive, animations keyframes avec feux de départ et effets de clignotement. La F1 comme fil rouge, déjà.",
    tech: ['HTML5', 'CSS Grid', 'Animations'],
  },
  Jenkins: {
    tagline: 'Portfolio avec pipeline CI/CD Jenkins et Docker.',
    details: "Mise en place d'une chaîne CI/CD complète avec Jenkins et Docker autour d'un portfolio : à chaque push, le pipeline build et déploie automatiquement. Découverte concrète de l'automatisation.",
    tech: ['Jenkins', 'Docker', 'Groovy', 'CI/CD'],
  },
  Docker: {
    tagline: 'Découverte de la conteneurisation : Dockerfile et docker compose.',
    details: "Prise en main de Docker : écriture de Dockerfiles, orchestration avec docker compose, et conteneurisation d'applications JavaScript. La base de tout mon apprentissage DevOps.",
    tech: ['Docker', 'JavaScript'],
  },
  't-dev': {
    tagline: 'Module DevOps Epitech : outillage et bonnes pratiques.',
    details: "Travaux du module T-DEV d'Epitech : outillage, conteneurisation et bonnes pratiques de développement.",
    tech: ['DevOps'],
  },
  Arrosage: {
    tagline: 'Arrosage automatique intelligent sur Raspberry Pi 4 (BTS CIEL).',
    details: "Système d'arrosage automatique intelligent sur Raspberry Pi 4 : un capteur mesure l'humidité du sol, et une pompe à eau se déclenche automatiquement quand le sol est trop sec, selon des seuils configurables. Réalisé en BTS CIEL — le projet qui mêle électronique, capteurs et code.",
    tech: ['Raspberry Pi', 'Python', 'Capteurs', 'Électronique'],
  },
  'Smart-Fridge': {
    tagline: 'Concept de frigo connecté : gestion intelligente des stocks.',
    details: "Projet exploratoire autour d'un frigo connecté : suivi des produits et gestion intelligente des stocks. Un terrain de jeu pour réfléchir objets connectés et données.",
    tech: ['IoT', 'Conception'],
  },
  TEPITECH: {
    tagline: "Projet du module TEPITECH d'Epitech, en JavaScript.",
    details: "Travaux réalisés dans le cadre du module TEPITECH d'Epitech, développés en JavaScript.",
    tech: ['JavaScript'],
  },
  got: {
    tagline: 'Site web statique — exercice front-end HTML/CSS.',
    details: "Exercice front-end : un site web statique en HTML/CSS pour travailler la structure sémantique et la mise en page.",
    tech: ['HTML', 'CSS'],
  },
  'Site-Web': {
    tagline: 'Un de mes premiers sites web en JavaScript.',
    details: "Un de mes tout premiers sites web : HTML, CSS et JavaScript. C'est par là que tout a commencé.",
    tech: ['HTML', 'CSS', 'JavaScript'],
  },
  btelgeuse: {
    tagline: 'Mon profil GitHub : README, stats et stack.',
    details: "Le dépôt spécial qui alimente ma page de profil GitHub : README avec ma stack technique et mes statistiques de contribution.",
    tech: ['Markdown'],
  },
}
