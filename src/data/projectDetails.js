// Données éditoriales des projets : catégories, podium et fiches détaillées.
// La carte affiche `tagline`, la modal (au clic) affiche `details` + `tech` + `learned`.
// Chaque fiche porte sa traduction dans `en` ; `getProjectText(name, lang)` fait la fusion.
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

// libellés d'affichage des catégories (les clés internes restent en français)
export const CATEGORY_LABELS = {
  fr: {
    Tous: 'Tous', Foot: 'Foot', Jeux: 'Jeux', Web: 'Web', 'IA & Python': 'IA & Python',
    'Temps réel': 'Temps réel', DevOps: 'DevOps', IoT: 'IoT', Autres: 'Autres',
  },
  en: {
    Tous: 'All', Foot: 'Football', Jeux: 'Games', Web: 'Web', 'IA & Python': 'AI & Python',
    'Temps réel': 'Real-time', DevOps: 'DevOps', IoT: 'IoT', Autres: 'Other',
  },
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

// fiche dans la bonne langue (l'anglais surcharge le français quand il existe)
export const getProjectText = (name, lang = 'fr') => {
  const d = PROJECT_DETAILS[name]
  if (!d) return null
  return lang === 'en' && d.en ? { ...d, ...d.en } : d
}

export const PROJECT_DETAILS = {
  'f1-2026': {
    tagline: 'Tracker temps réel de la saison F1 2026 : classements, résultats et podium style F1 TV.',
    details: "Application web de suivi de la saison de Formule 1 2026 en temps réel : calendrier complet avec statut en direct, classements pilotes et constructeurs avec barres de points animées aux couleurs des équipes, résultats course/sprint/qualifs avec anti-spoiler intégré, podium premium façon F1 TV (colonnes en escalier, couronne P1) et compte à rebours avant la prochaine session, style grille de départ. Mon projet passion : la F1 rencontre le code.",
    tech: ['JavaScript', 'API temps réel', 'CSS animations'],
    learned: 'Consommer une API temps réel proprement, gérer les états de chargement, et pousser le CSS loin sans framework d\'UI.',
    en: {
      tagline: 'Real-time tracker for the 2026 F1 season: standings, results and an F1 TV-style podium.',
      details: 'Web app tracking the 2026 Formula 1 season in real time: full calendar with live status, driver and constructor standings with animated team-coloured point bars, race/sprint/qualifying results with built-in anti-spoiler, a premium F1 TV-style podium (stepped columns, P1 crown) and a starting-grid countdown to the next session. My passion project: F1 meets code.',
      learned: 'Consuming a real-time API cleanly, handling loading states, and pushing CSS far without a UI framework.',
    },
  },
  'LDC-2026-2027-': {
    tagline: 'Tracker live de la Ligue des Champions avec overlay OBS pour le stream.',
    details: "Tracker et simulateur live de la Ligue des Champions 2026-2027, avec un overlay OBS pensé pour le stream. 100 % vanilla (HTML/CSS/JS), aucun build, aucun npm : déploiement statique sur Vercel. Dashboard des matchs du jour (live, à venir, terminés), explorateur de clubs, et données issues de l'API publique d'ESPN. Projet de fan, non affilié à l'UEFA.",
    tech: ['HTML/CSS/JS vanilla', 'API ESPN', 'Overlay OBS', 'Vercel'],
    learned: 'Livrer sans build ni framework : quand le vanilla suffit, il est imbattable en simplicité de déploiement.',
    en: {
      tagline: 'Live Champions League tracker with an OBS overlay for streaming.',
      details: 'Live tracker and simulator for the 2026-27 Champions League, with an OBS overlay built for streaming. 100% vanilla (HTML/CSS/JS), no build step, no npm: static deployment on Vercel. A dashboard of today\'s matches (live, upcoming, finished), a club explorer, and data from ESPN\'s public API. Fan project, not affiliated with UEFA.',
      learned: 'Shipping without a build or framework: when vanilla is enough, nothing beats its deployment simplicity.',
    },
  },
  cdm: {
    tagline: 'Suivi de la Coupe du Monde : matchs, groupes et classements.',
    details: "Petit frère du tracker Ligue des Champions, appliqué à la Coupe du Monde : suivi des matchs, des groupes et des classements, en HTML/CSS/JS sans framework. Même philosophie : léger, statique, direct à l'essentiel.",
    tech: ['HTML', 'CSS', 'JavaScript'],
    learned: 'Réutiliser l\'architecture d\'un projet précédent pour livrer plus vite — le code aussi a une mémoire musculaire.',
    en: {
      tagline: 'World Cup tracker: matches, groups and standings.',
      details: 'Little brother of the Champions League tracker, applied to the World Cup: matches, groups and standings in framework-free HTML/CSS/JS. Same philosophy: light, static, straight to the point.',
      learned: 'Reusing a previous project\'s architecture to ship faster — code has muscle memory too.',
    },
  },
  Marioparty: {
    tagline: 'Jeu multijoueur inspiré de Mario Party : plateau et mini-jeux en JavaScript.',
    details: "Jeu de plateau multijoueur inspiré de Mario Party, développé en JavaScript : déplacement sur le plateau, tours de jeu, et mini-jeux pour départager les joueurs. Un bon terrain d'entraînement pour la logique de jeu, la gestion d'état et les animations.",
    tech: ['JavaScript', 'Canvas / DOM', 'Logique de jeu'],
    learned: 'La logique de tour par tour et la gestion d\'état d\'un jeu multijoueur — bien plus dur qu\'il n\'y paraît.',
    en: {
      tagline: 'Mario Party-inspired multiplayer game: board and mini-games in JavaScript.',
      details: 'Multiplayer board game inspired by Mario Party, built in JavaScript: board movement, turn-taking, and mini-games to decide between players. Great training ground for game logic, state management and animations.',
      learned: 'Turn-based logic and state management in a multiplayer game — much harder than it looks.',
    },
  },
  Alice: {
    tagline: "NLP sur des livres entiers : résumés, thèmes, émotions et clustering.",
    details: "Projet IA (T-AIA-600) : une pipeline NLP complète qui avale des livres entiers (Project Gutenberg) et en sort des résumés automatiques (TextRank), une classification thématique (LDA), une analyse stylistique, des courbes émotionnelles, des nuages de mots et une carte de similarité entre livres (TF-IDF + K-Means). Ma porte d'entrée dans le machine learning.",
    tech: ['Python', 'TF-IDF', 'TextRank', 'LDA', 'K-Means'],
    learned: 'Les fondamentaux du NLP (vectorisation, clustering, résumé extractif) et surtout : évaluer un modèle, pas juste le faire tourner.',
    en: {
      tagline: 'NLP on entire books: summaries, topics, emotions and clustering.',
      details: 'AI project (T-AIA-600): a full NLP pipeline that swallows entire books (Project Gutenberg) and produces automatic summaries (TextRank), topic classification (LDA), stylistic analysis, emotion curves, word clouds and a book-similarity map (TF-IDF + K-Means). My gateway into machine learning.',
      learned: 'NLP fundamentals (vectorisation, clustering, extractive summarisation) and above all: evaluating a model, not just running it.',
    },
  },
  'T-AIA-600---Alice-au-pays-des-merveilles': {
    tagline: "Le module Epitech derrière le projet Alice : découverte de l'IA par le NLP.",
    details: "Dépôt du module T-AIA-600 d'Epitech, socle du projet Alice : découverte de l'intelligence artificielle à travers le traitement du langage naturel appliqué à « Alice au pays des merveilles ».",
    tech: ['Python', 'NLP'],
    en: {
      tagline: 'The Epitech module behind the Alice project: discovering AI through NLP.',
      details: 'Repository for Epitech\'s T-AIA-600 module, the foundation of the Alice project: discovering artificial intelligence through natural language processing applied to "Alice in Wonderland".',
    },
  },
  epitech: {
    tagline: 'ChatFlow : messagerie temps réel moderne en Next.js 14 avec CI/CD.',
    details: "ChatFlow, une application de messagerie temps réel pensée pour les communautés et les équipes : Next.js 14, Node.js 20, PostgreSQL 16, et une CI/CD GitHub Actions. Architecture propre, communication instantanée, et une vraie chaîne d'intégration continue comme en entreprise.",
    tech: ['Next.js 14', 'Node.js', 'PostgreSQL', 'GitHub Actions'],
    learned: 'Monter une CI/CD GitHub Actions complète et travailler avec une base PostgreSQL en production.',
    en: {
      tagline: 'ChatFlow: modern real-time messaging in Next.js 14 with CI/CD.',
      details: 'ChatFlow, a real-time messaging app built for communities and teams: Next.js 14, Node.js 20, PostgreSQL 16, and a GitHub Actions CI/CD. Clean architecture, instant communication, and a real continuous-integration chain like in industry.',
      learned: 'Setting up a full GitHub Actions CI/CD and working with a production PostgreSQL database.',
    },
  },
  'RTC-Projet': {
    tagline: 'ChatFlow (v1) : messagerie type Discord en WebSockets.',
    details: "Première version de ChatFlow : une plateforme de messagerie instantanée inspirée de Discord. Création de serveurs, salons de discussion, échanges en temps réel via WebSockets, avec une architecture séparant clairement frontend, backend et base de données.",
    tech: ['TypeScript', 'WebSockets', 'Architecture front/back/DB'],
    learned: 'Les WebSockets de bout en bout et la séparation front/back/DB — mes premières vraies décisions d\'architecture.',
    en: {
      tagline: 'ChatFlow (v1): Discord-style messaging over WebSockets.',
      details: 'First version of ChatFlow: an instant-messaging platform inspired by Discord. Server creation, chat channels, real-time exchanges over WebSockets, with an architecture that cleanly separates frontend, backend and database.',
      learned: 'End-to-end WebSockets and front/back/DB separation — my first real architecture decisions.',
    },
  },
  'RTC-Project-Bureau': {
    tagline: 'Application temps réel en TypeScript (WebSocket / RTC).',
    details: "Déclinaison bureau du projet RTC : communication temps réel en TypeScript autour des WebSockets, dans la continuité de ChatFlow.",
    tech: ['TypeScript', 'WebSockets'],
    en: {
      tagline: 'Real-time TypeScript application (WebSocket / RTC).',
      details: 'Desktop flavour of the RTC project: real-time communication in TypeScript over WebSockets, continuing the ChatFlow work.',
    },
  },
  BERNSTEIN: {
    tagline: 'Popeye : stack Kubernetes locale complète avec K3d, PostgreSQL et Redis.',
    details: "Projet DevOps (B-DOP-200 « Popeye ») : une stack Kubernetes locale montée avec K3d — PostgreSQL, Redis, services poll/worker/result et ingress Traefik. Manifestes, initialisation de la base, débogage et cycle de vie complet du cluster : du vrai DevOps, en conditions réelles.",
    tech: ['Kubernetes', 'K3d', 'PostgreSQL', 'Redis', 'Traefik'],
    learned: 'Kubernetes en local : manifestes, services, ingress — et déboguer un cluster qui refuse de démarrer à 23 h.',
    en: {
      tagline: 'Popeye: a full local Kubernetes stack with K3d, PostgreSQL and Redis.',
      details: 'DevOps project (B-DOP-200 "Popeye"): a local Kubernetes stack built with K3d — PostgreSQL, Redis, poll/worker/result services and a Traefik ingress. Manifests, database initialisation, debugging and the full cluster lifecycle: real DevOps, in real conditions.',
      learned: 'Local Kubernetes: manifests, services, ingress — and debugging a cluster that refuses to start at 11pm.',
    },
  },
  breinstein: {
    tagline: 'Itération du projet Popeye : orchestration de conteneurs.',
    details: "Seconde itération autour du projet Popeye : orchestration de conteneurs et amélioration de la stack. Le terrain d'entraînement qui accompagne BERNSTEIN.",
    tech: ['Docker', 'Kubernetes'],
    en: {
      tagline: 'Iteration on the Popeye project: container orchestration.',
      details: 'Second iteration around the Popeye project: container orchestration and stack improvements. The training ground alongside BERNSTEIN.',
    },
  },
  qr_app: {
    tagline: 'Générateur de QR codes en Python, simple et efficace.',
    details: "Générateur de QR codes en Python : on lui donne un texte ou une URL, il sort un QR code prêt à partager. Petit projet, mais fini et utilisable — ma philosophie. C'est d'ailleurs lui qui a généré le QR code de la section contact de ce portfolio.",
    tech: ['Python'],
    learned: 'Un petit outil fini vaut mieux qu\'un grand projet abandonné.',
    en: {
      tagline: 'A simple, effective QR-code generator in Python.',
      details: 'Python QR-code generator: give it text or a URL, it returns a share-ready QR code. A small project, but finished and usable — my philosophy. It even generated the QR code in this portfolio\'s contact section.',
      learned: 'A small finished tool beats a big abandoned project.',
    },
  },
  Pendu: {
    tagline: 'Le jeu du pendu en Python, en console.',
    details: "Le grand classique du pendu, codé en Python : gestion des mots, des vies et de la boucle de jeu. Un de mes premiers projets — c'est là qu'on apprend les bases pour de vrai.",
    tech: ['Python'],
    learned: 'Les bases : boucles, conditions, entrées utilisateur — tout le monde commence quelque part.',
    en: {
      tagline: 'The classic hangman game in Python, in the console.',
      details: 'The hangman classic, coded in Python: words, lives and the game loop. One of my first projects — where the basics really sink in.',
      learned: 'The basics: loops, conditions, user input — everyone starts somewhere.',
    },
  },
  'Auto-Clicker': {
    tagline: 'Extension Chrome d\'automatisation de clics via le protocole DevTools.',
    details: "Extension Chrome tout-en-un pour automatiser des clics sur n'importe quel site : elle passe par le protocole Chrome DevTools (chrome.debugger) pour envoyer de vrais clics au niveau du navigateur, avec 4 modes de fonctionnement. Un projet qui m'a fait plonger dans les entrailles du navigateur.",
    tech: ['JavaScript', 'Extension Chrome', 'DevTools Protocol'],
    learned: 'Plonger dans le protocole Chrome DevTools et l\'architecture des extensions navigateur.',
    en: {
      tagline: 'Chrome extension automating clicks through the DevTools protocol.',
      details: 'All-in-one Chrome extension to automate clicks on any website: it uses the Chrome DevTools protocol (chrome.debugger) to send real browser-level clicks, with 4 operating modes. A project that took me deep into the browser\'s internals.',
      learned: 'Diving into the Chrome DevTools protocol and browser-extension architecture.',
    },
  },
  easyjob: {
    tagline: 'API backend CRUD avec Node.js, PostgreSQL et Docker.',
    details: "Découverte du backend : une API REST respectant la méthode CRUD, avec Node.js, PostgreSQL, pgAdmin et un déploiement via docker compose. Le projet qui m'a appris à structurer un serveur proprement.",
    tech: ['Node.js', 'PostgreSQL', 'Docker Compose'],
    learned: 'Structurer une API CRUD proprement : routes, contrôleurs, et pourquoi docker compose change la vie.',
    en: {
      tagline: 'CRUD backend API with Node.js, PostgreSQL and Docker.',
      details: 'Backend discovery: a REST API following the CRUD method, with Node.js, PostgreSQL, pgAdmin and a docker compose deployment. The project that taught me to structure a server properly.',
      learned: 'Structuring a CRUD API cleanly: routes, controllers, and why docker compose is life-changing.',
    },
  },
  'F1-Retro-Game': {
    tagline: 'F1 Retro Racer : endless runner 2D en Java/libGDX, risk vs reward.',
    details: "Jeu d'arcade 2D (endless runner) développé en Java avec libGDX : survivez sur la piste, esquivez le trafic et les flaques d'huile. Mécanique « risk vs reward » : frôler les adversaires déclenche un dépassement risqué à +500 points. Avec une vraie séquence de feux de départ en matrice 5×4. Ma passion F1, version pixel art.",
    tech: ['Java', 'libGDX', 'Game design'],
    learned: 'Le game loop, les collisions et l\'équilibrage d\'une mécanique risk vs reward en Java/libGDX.',
    en: {
      tagline: 'F1 Retro Racer: a 2D endless runner in Java/libGDX with risk-vs-reward.',
      details: '2D arcade game (endless runner) built in Java with libGDX: survive on the track, dodge traffic and oil slicks. Risk-vs-reward mechanic: brushing past opponents triggers a risky overtake worth +500 points. With a proper 5×4 start-light sequence. My F1 passion, pixel-art edition.',
      learned: 'The game loop, collisions and balancing a risk-vs-reward mechanic in Java/libGDX.',
    },
  },
  'Jeu-2D': {
    tagline: 'Hub de jeu 2D en Java réalisé en 3 semaines : moteur, sprites et collisions.',
    details: "Hub de jeu 2D développé en Java en 3 semaines : moteur de rendu, gestion des sprites, collisions et déplacements. Réalisé pendant mon BTS — mon premier « vrai » projet de jeu.",
    tech: ['Java', 'Moteur 2D'],
    learned: 'Mon premier moteur : sprites, collisions, et l\'humilité devant un simple rectangle qui traverse un mur.',
    en: {
      tagline: 'A 2D game hub in Java built in 3 weeks: engine, sprites and collisions.',
      details: 'A 2D game hub developed in Java in 3 weeks: rendering engine, sprite handling, collisions and movement. Built during my BTS — my first "real" game project.',
      learned: 'My first engine: sprites, collisions, and the humility of watching a simple rectangle walk through a wall.',
    },
  },
  'T-ENT-500': {
    tagline: 'Portfolio « F1 Telemetry Edition » : dashboard d\'ingénieur de piste.',
    details: "Version précédente de mon portfolio, immergée dans l'univers F1 : l'interface simule un écran de contrôle d'ingénieur de piste (télémétrie), en flat design strict. Le prototype qui a inspiré le thème du portfolio actuel.",
    tech: ['HTML', 'CSS', 'Flat design'],
    en: {
      tagline: '"F1 Telemetry Edition" portfolio: a race engineer\'s dashboard.',
      details: 'Previous version of my portfolio, fully immersed in the F1 universe: the interface simulates a race engineer\'s telemetry screen, in strict flat design. The prototype that inspired the current portfolio\'s theme.',
    },
  },
  'f1-portfolio': {
    tagline: 'Portfolio single-page façon tableau de bord de télémétrie F1.',
    details: "Portfolio single-page à l'esthétique de tableau de bord F1 : CSS Grid et Flexbox pour un layout dashboard responsive, animations keyframes avec feux de départ et effets de clignotement. La F1 comme fil rouge, déjà.",
    tech: ['HTML5', 'CSS Grid', 'Animations'],
    en: {
      tagline: 'Single-page portfolio styled as an F1 telemetry dashboard.',
      details: 'Single-page portfolio with an F1 dashboard aesthetic: CSS Grid and Flexbox for a responsive dashboard layout, keyframe animations with start lights and blink effects. F1 as the common thread, already.',
    },
  },
  Jenkins: {
    tagline: 'Portfolio avec pipeline CI/CD Jenkins et Docker.',
    details: "Mise en place d'une chaîne CI/CD complète avec Jenkins et Docker autour d'un portfolio : à chaque push, le pipeline build et déploie automatiquement. Découverte concrète de l'automatisation.",
    tech: ['Jenkins', 'Docker', 'Groovy', 'CI/CD'],
    learned: 'Écrire un Jenkinsfile et comprendre ce qu\'automatiser veut vraiment dire.',
    en: {
      tagline: 'Portfolio with a Jenkins + Docker CI/CD pipeline.',
      details: 'A complete CI/CD chain with Jenkins and Docker around a portfolio: on every push, the pipeline builds and deploys automatically. Hands-on discovery of automation.',
      learned: 'Writing a Jenkinsfile and understanding what automation really means.',
    },
  },
  Docker: {
    tagline: 'Découverte de la conteneurisation : Dockerfile et docker compose.',
    details: "Prise en main de Docker : écriture de Dockerfiles, orchestration avec docker compose, et conteneurisation d'applications JavaScript. La base de tout mon apprentissage DevOps.",
    tech: ['Docker', 'JavaScript'],
    learned: 'Images, conteneurs, volumes : la fondation de tout ce que je fais en DevOps depuis.',
    en: {
      tagline: 'Discovering containers: Dockerfile and docker compose.',
      details: 'Getting to grips with Docker: writing Dockerfiles, orchestrating with docker compose, and containerising JavaScript apps. The foundation of all my DevOps learning.',
      learned: 'Images, containers, volumes: the foundation of everything I\'ve done in DevOps since.',
    },
  },
  't-dev': {
    tagline: 'Module DevOps Epitech : outillage et bonnes pratiques.',
    details: "Travaux du module T-DEV d'Epitech : outillage, conteneurisation et bonnes pratiques de développement.",
    tech: ['DevOps'],
    en: {
      tagline: 'Epitech DevOps module: tooling and best practices.',
      details: 'Work from Epitech\'s T-DEV module: tooling, containerisation and development best practices.',
    },
  },
  Arrosage: {
    tagline: 'Arrosage automatique intelligent sur Raspberry Pi 4 (BTS CIEL).',
    details: "Système d'arrosage automatique intelligent sur Raspberry Pi 4 : un capteur mesure l'humidité du sol, et une pompe à eau se déclenche automatiquement quand le sol est trop sec, selon des seuils configurables. Réalisé en BTS CIEL — le projet qui mêle électronique, capteurs et code.",
    tech: ['Raspberry Pi', 'Python', 'Capteurs', 'Électronique'],
    learned: 'Faire dialoguer capteurs, relais et code Python — l\'électronique pardonne moins que le logiciel.',
    en: {
      tagline: 'Smart automatic watering on a Raspberry Pi 4 (BTS CIEL).',
      details: 'Smart automatic watering system on a Raspberry Pi 4: a sensor measures soil moisture and a water pump triggers automatically when the soil gets too dry, with configurable thresholds. Built during my BTS — the project that blends electronics, sensors and code.',
      learned: 'Getting sensors, relays and Python code to talk — electronics is less forgiving than software.',
    },
  },
  'Smart-Fridge': {
    tagline: 'Concept de frigo connecté : gestion intelligente des stocks.',
    details: "Projet exploratoire autour d'un frigo connecté : suivi des produits et gestion intelligente des stocks. Un terrain de jeu pour réfléchir objets connectés et données.",
    tech: ['IoT', 'Conception'],
    en: {
      tagline: 'Connected-fridge concept: smart stock management.',
      details: 'Exploratory project around a connected fridge: product tracking and smart stock management. A playground for thinking about IoT and data.',
    },
  },
  TEPITECH: {
    tagline: "Projet du module TEPITECH d'Epitech, en JavaScript.",
    details: "Travaux réalisés dans le cadre du module TEPITECH d'Epitech, développés en JavaScript.",
    tech: ['JavaScript'],
    en: {
      tagline: "Project from Epitech's TEPITECH module, in JavaScript.",
      details: "Work carried out for Epitech's TEPITECH module, developed in JavaScript.",
    },
  },
  got: {
    tagline: 'Site web statique — exercice front-end HTML/CSS.',
    details: "Exercice front-end : un site web statique en HTML/CSS pour travailler la structure sémantique et la mise en page.",
    tech: ['HTML', 'CSS'],
    en: {
      tagline: 'Static website — an HTML/CSS front-end exercise.',
      details: 'Front-end exercise: a static HTML/CSS website to practise semantic structure and layout.',
    },
  },
  'Site-Web': {
    tagline: 'Un de mes premiers sites web en JavaScript.',
    details: "Un de mes tout premiers sites web : HTML, CSS et JavaScript. C'est par là que tout a commencé.",
    tech: ['HTML', 'CSS', 'JavaScript'],
    en: {
      tagline: 'One of my first JavaScript websites.',
      details: 'One of my very first websites: HTML, CSS and JavaScript. This is where it all began.',
    },
  },
  btelgeuse: {
    tagline: 'Mon profil GitHub : README, stats et stack.',
    details: "Le dépôt spécial qui alimente ma page de profil GitHub : README avec ma stack technique et mes statistiques de contribution.",
    tech: ['Markdown'],
    en: {
      tagline: 'My GitHub profile: README, stats and stack.',
      details: 'The special repository powering my GitHub profile page: a README with my tech stack and contribution stats.',
    },
  },
}
