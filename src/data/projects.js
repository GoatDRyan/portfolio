export const projects = [
  {
    slug: "acthys",
    number: "01",
    title: "ACTHYS",
    accent: "#1a9bad",
    page: "/projects/acthys",
    image: `${import.meta.env.BASE_URL}projects/acthys/hero.jpg`,

    seo: {
      fr: {
        title: "ACTHYS – Projet WordPress QHSE/RSE | Ryan Mumbata",
        description:
          "Étude de cas ACTHYS : site WordPress pour un cabinet QHSE/RSE avec chatbot Tidio, newsletter MailPoet, SEO SureRank, RGPD Complianz et mise en production.",
      },
      en: {
        title: "ACTHYS – WordPress QHSE/RSE Project | Ryan Mumbata",
        description:
          "ACTHYS case study: WordPress website for a QHSE/RSE consulting firm with Tidio chatbot, MailPoet newsletter, SureRank SEO, Complianz GDPR and production launch.",
      },
    },

    links: [
      {
        label: {
          fr: "Voir le site",
          en: "View website",
        },
        href: "https://acthys.fr",
        external: true,
      },
    ],

    card: {
      fr: {
        type: "Site client réel",
        description:
          "Mise en production d'un site institutionnel WordPress pour un cabinet QHSE/RSE. Intégration d'outils d'acquisition (chatbot Tidio, newsletter MailPoet), optimisation SEO (SureRank), et mise en conformité RGPD stricte (Complianz).",
        tags: ["WordPress", "SEO", "RGPD", "Chatbot", "Client réel"],
        imageAlt:
          "Aperçu du projet ACTHYS, site institutionnel WordPress pour un cabinet QHSE RSE",
      },
      en: {
        type: "Real client website",
        description:
          "Production of a WordPress institutional website for a QHSE/RSE consulting firm. Integration of acquisition tools (Tidio chatbot, MailPoet newsletter), SEO optimization (SureRank), and strict GDPR compliance (Complianz).",
        tags: ["WordPress", "SEO", "GDPR", "Chatbot", "Real client"],
        imageAlt:
          "Preview of the ACTHYS project, WordPress institutional website for a QHSE RSE consulting firm",
      },
    },

    detail: {
      fr: {
        badge: "Projet réel · WordPress · SEO · RGPD",
        fullTitle:
          "ACTHYS — Site institutionnel et acquisition de leads pour un cabinet de conseil",
        subtitle:
          "Un site professionnel conçu pour présenter l'expertise de Magali Perrin, avec une automatisation de la prise de contact et une conformité légale irréprochable.",
        backLabel: "Retour au portfolio",
        liveLabel: "Projet en ligne",

        info: {
          title: "Power Stats",
          items: [
            ["Type", "Site client réel"],
            ["Rôle", "Webmaster / Intégrateur WordPress"],
            ["Année", "2026"],
            ["Durée", "Stage / mission client"],
            ["Statut", "En production"],
          ],
          stackTitle: "Stack",
          stack: [
            "WordPress",
            "Tidio (Bot)",
            "MailPoet",
            "Complianz",
            "SureRank",
            "OVHcloud",
          ],
        },

        overview: {
          title: "Mission Brief",
          text:
            "ACTHYS est un cabinet de conseil spécialisé en QHSE, RSE et IA Act. La fondatrice étant souvent en intervention, le site devait non seulement servir de vitrine, mais aussi agir comme un assistant virtuel capable de capter des prospects en son absence, le tout dans un cadre légal (RGPD) strict.",
          cards: [
            {
              title: "Objectif principal",
              text:
                "Créer une plateforme d'acquisition autonome : un site crédible, optimisé pour le référencement local, et équipé d'un chatbot automatisé pour récolter des demandes de devis.",
            },
            {
              title: "Enjeu légal",
              text:
                "Assurer une conformité totale avec la CNIL via une gestion dynamique du consentement aux cookies et une Politique de Confidentialité à jour.",
            },
          ],
        },

        role: {
          title: "Hero Role",
          text:
            "J'ai pris en charge la configuration technique complète, l'intégration des outils marketing, la gestion du SEO et la mise en conformité légale du site.",
          items: [
            "Installation et paramétrage d'un chatbot automatisé (Tidio) avec scénario de capture de leads.",
            "Configuration d'un système de Newsletter (MailPoet).",
            "Mise en place d'un bandeau de cookies (Complianz) bloquant les scripts externes avant consentement.",
            "Mise à jour et intégration de la Politique de Confidentialité (V2).",
            "Optimisation du référencement naturel avec SureRank (Titres, Meta-descriptions limitées à 160 caractères).",
            "Déploiement et sécurisation sur un hébergement OVHcloud.",
          ],
        },

        process: {
          title: "Origin Process",
          items: [
            {
              title: "Acquisition",
              text:
                "Mise en place de Tidio avec un flux automatisé pour orienter les visiteurs (Formation, Audit, RSE) et capturer leur e-mail.",
            },
            {
              title: "Fidélisation",
              text:
                "Configuration de MailPoet pour gérer l'envoi de la newsletter mensuelle de manière 100% hébergée sur WordPress.",
            },
            {
              title: "Conformité (RGPD)",
              text:
                "Scan des cookies via Complianz et rédaction des clauses juridiques pour le chatbot et la newsletter.",
            },
            {
              title: "Visibilité (SEO)",
              text:
                "Optimisation des balises avec SureRank et préparation pour l'indexation Google Search Console.",
            },
          ],
        },

        features: {
          title: "Main Features",
          items: [
            "Assistant virtuel automatisé (Chatbot Tidio).",
            "Système de Newsletter intégré (MailPoet).",
            "Bandeau de consentement dynamique (Complianz).",
            "Politique de confidentialité exhaustive (RGPD & IA Act).",
            "Optimisation SEO On-Page (SureRank).",
            "Design responsive et performant.",
          ],
        },

        challenges: {
          title: "Boss Fight",
          items: [
            {
              problem:
                "Capter des prospects pendant que la consultante est en formation chez des clients.",
              solution:
                "Création d'un scénario de chatbot asynchrone proposant des choix multiples et demandant l'adresse e-mail pour un recontact ultérieur.",
            },
            {
              problem:
                "Collecter des e-mails et déposer des cookies techniques en toute légalité.",
              solution:
                "Paramétrage de Complianz pour bloquer le chatbot Tidio tant que le visiteur n'a pas cliqué sur 'Accepter', et rédaction d'une clause spécifique dans les CGU.",
            },
          ],
        },

        technical: {
          title: "Technical Focus",
          items: [
            {
              title: "RGPD & Cookies",
              text:
                "Synchronisation technique entre les scripts tiers (Tidio, Analytics) et le gestionnaire de consentement Complianz.",
            },
            {
              title: "Automatisation",
              text:
                "Création de 'Flows' logiques dans Tidio basés sur des déclencheurs (ex: nouveau visiteur) et des actions (demande d'email avec validation de format).",
            },
            {
              title: "SEO",
              text:
                "Respect strict des contraintes techniques de Google (Meta descriptions < 160 caractères, structure H1/H2/H3 claire).",
            },
          ],
        },

        gallery: {
          title: "Visual Gallery",
          text:
            "Un aperçu des éléments techniques mis en place sur le site d'ACTHYS.",
          items: [
            {
              label: "Chatbot & Lead Gen",
              image: `${import.meta.env.BASE_URL}projects/acthys/chatbot.jpg`,
            },
            {
              label: "Conformité RGPD",
              image: `${import.meta.env.BASE_URL}projects/acthys/rgpd.jpg`,
            },
            {
              label: "Version Mobile",
              image: `${import.meta.env.BASE_URL}projects/acthys/mobile.jpg`,
            },
          ],
        },

        results: {
          title: "Final Form",
          items: [
            "Site 100% conforme aux exigences de la CNIL.",
            "Système d'acquisition de prospects actif 24h/24.",
            "Bases solides pour le référencement local en Normandie.",
            "Client autonome pour la gestion de sa newsletter.",
          ],
        },

        lessons: {
          title: "XP Gained",
          text:
            "Ce projet m'a appris que le développement web ne se limite pas au design : l'aspect légal (RGPD), la stratégie d'acquisition (Chatbot) et la visibilité (SEO) sont tout aussi cruciaux pour livrer un produit viable à un professionnel.",
        },
      },

      en: {
        badge: "Real project · WordPress · SEO · GDPR",
        fullTitle:
          "ACTHYS — Institutional website and lead generation for a consulting firm",
        subtitle:
          "A professional website designed to showcase expertise, automate contact requests, and ensure flawless legal compliance.",
        backLabel: "Back to portfolio",
        liveLabel: "Live project",

        info: {
          title: "Power Stats",
          items: [
            ["Type", "Real client website"],
            ["Role", "Webmaster / WordPress Integrator"],
            ["Year", "2026"],
            ["Duration", "Internship / client mission"],
            ["Status", "Live"],
          ],
          stackTitle: "Stack",
          stack: [
            "WordPress",
            "Tidio (Bot)",
            "MailPoet",
            "Complianz",
            "SureRank",
            "OVHcloud",
          ],
        },

        overview: {
          title: "Mission Brief",
          text:
            "ACTHYS is a consulting firm specializing in QHSE, CSR, and the AI Act. Since the founder is often on-site with clients, the website needed to act as a virtual assistant to capture leads in her absence, all within a strict legal framework (GDPR).",
          cards: [
            {
              title: "Main objective",
              text:
                "Create an autonomous acquisition platform: a credible website, optimized for local SEO, and equipped with an automated chatbot to collect quote requests.",
            },
            {
              title: "Legal challenge",
              text:
                "Ensure total compliance with French privacy laws (CNIL) through dynamic cookie consent management and an updated Privacy Policy.",
            },
          ],
        },

        role: {
          title: "Hero Role",
          text:
            "I managed the full technical configuration, marketing tools integration, SEO management, and legal compliance of the website.",
          items: [
            "Installation and setup of an automated chatbot (Tidio) with a lead capture flow.",
            "Configuration of a Newsletter system (MailPoet).",
            "Implementation of a cookie banner (Complianz) blocking third-party scripts prior to consent.",
            "Updating and integrating the Privacy Policy.",
            "On-page SEO optimization with SureRank (Titles, Meta-descriptions).",
            "Deployment and security setup on OVHcloud hosting.",
          ],
        },

        process: {
          title: "Origin Process",
          items: [
            {
              title: "Acquisition",
              text:
                "Setting up Tidio with an automated flow to guide visitors (Training, Audit, CSR) and capture their email.",
            },
            {
              title: "Retention",
              text:
                "Configuring MailPoet to manage monthly newsletter sending directly from WordPress.",
            },
            {
              title: "Compliance (GDPR)",
              text:
                "Scanning cookies via Complianz and drafting legal clauses for the chatbot and newsletter.",
            },
            {
              title: "Visibility (SEO)",
              text:
                "Tag optimization with SureRank and preparation for Google Search Console indexing.",
            },
          ],
        },

        features: {
          title: "Main Features",
          items: [
            "Automated virtual assistant (Tidio Chatbot).",
            "Integrated Newsletter system (MailPoet).",
            "Dynamic consent banner (Complianz).",
            "Comprehensive privacy policy (GDPR & AI Act).",
            "On-Page SEO Optimization (SureRank).",
            "Responsive and performant design.",
          ],
        },

        challenges: {
          title: "Boss Fight",
          items: [
            {
              problem:
                "Capturing prospects while the consultant is busy training clients.",
              solution:
                "Creating an asynchronous chatbot scenario offering multiple choices and requesting an email address for a later callback.",
            },
            {
              problem:
                "Collecting emails and dropping technical cookies legally.",
              solution:
                "Configuring Complianz to block the Tidio chatbot until the visitor clicks 'Accept', and drafting a specific clause in the Terms of Service.",
            },
          ],
        },

        technical: {
          title: "Technical Focus",
          items: [
            {
              title: "GDPR & Cookies",
              text:
                "Technical synchronization between third-party scripts (Tidio, Analytics) and the Complianz consent manager.",
            },
            {
              title: "Automation",
              text:
                "Creating logic 'Flows' in Tidio based on triggers (e.g. new visitor) and actions (email request with format validation).",
            },
            {
              title: "SEO",
              text:
                "Strict adherence to Google's technical constraints (Meta descriptions < 160 characters, clear H1/H2/H3 structure).",
            },
          ],
        },

        gallery: {
          title: "Visual Gallery",
          text:
            "A look at the technical features implemented on the ACTHYS website.",
          items: [
            {
              label: "Chatbot & Lead Gen",
              image: `${import.meta.env.BASE_URL}projects/acthys/chatbot.jpg`,
            },
            {
              label: "GDPR Compliance",
              image: `${import.meta.env.BASE_URL}projects/acthys/rgpd.jpg`,
            },
            {
              label: "Mobile Version",
              image: `${import.meta.env.BASE_URL}projects/acthys/mobile.jpg`,
            },
          ],
        },

        results: {
          title: "Final Form",
          items: [
            "Website 100% compliant with privacy requirements.",
            "Lead acquisition system active 24/7.",
            "Solid foundations for local SEO.",
            "Client is fully autonomous for managing their newsletter.",
          ],
        },

        lessons: {
          title: "XP Gained",
          text:
            "This project taught me that web development is not just about design: legal aspects (GDPR), acquisition strategy (Chatbot), and visibility (SEO) are equally crucial to deliver a viable product to a professional.",
        },
      },
    },
  },

  {
    slug: "shiftup",
    number: "02",
    title: "Shift’Up",
    accent: "#ff4800",
    page: "/projects/shiftup",
    image: `${import.meta.env.BASE_URL}projects/shiftup/hero.jpg`,

    seo: {
      fr: {
        title: "Shift’Up – SaaS RSE gamifié PHP/MySQL | Ryan Mumbata",
        description:
          "Étude de cas Shift’Up : prototype SaaS B2B RSE développé en PHP/MySQL avec authentification, rôles, défis, XP, badges, boutique, base de données et gamification.",
      },
      en: {
        title: "Shift’Up – Gamified CSR SaaS PHP/MySQL | Ryan Mumbata",
        description:
          "Shift’Up case study: gamified B2B CSR SaaS prototype built with PHP/MySQL, authentication, roles, challenges, XP, badges, shop, database and gamification.",
      },
    },

    links: [],

    card: {
      fr: {
        type: "Prototype SaaS B2B",
        description:
          "Application web RSE gamifiée destinée aux entreprises, conçue pour motiver les salariés à réaliser des actions écologiques grâce à des défis, de l’XP, des badges, une monnaie virtuelle et une logique de progression.",
        tags: ["PHP", "MySQL", "PDO", "Gamification", "Auth"],
        imageAlt:
          "Aperçu du projet Shift’Up, prototype SaaS B2B gamifié autour de la RSE",
      },
      en: {
        type: "B2B SaaS prototype",
        description:
          "Gamified CSR web application designed for companies, helping employees take ecological actions through challenges, XP, badges, virtual currency and progression mechanics.",
        tags: ["PHP", "MySQL", "PDO", "Gamification", "Auth"],
        imageAlt:
          "Preview of the Shift’Up project, a gamified B2B SaaS prototype focused on CSR",
      },
    },

    detail: {
      fr: {
        badge: "Projet de groupe · PHP · MySQL · RSE · Gamification",
        fullTitle:
          "Shift’Up — Prototype SaaS B2B pour engager les salariés dans la RSE",
        subtitle:
          "Une application web gamifiée pensée pour transformer les engagements RSE d’une entreprise en actions concrètes, motivantes et mesurables pour les collaborateurs.",
        backLabel: "Retour au portfolio",
        liveLabel: "Projet privé / non publié",

        info: {
          title: "Power Stats",
          items: [
            ["Type", "Prototype SaaS B2B"],
            ["Contexte", "Projet de groupe"],
            ["Équipe", "7 personnes · 3 dev · 4 créa"],
            ["Rôle", "Développeur principal application & BDD"],
            ["Année", "2026"],
            ["Statut", "Prototype fonctionnel"],
          ],
          stackTitle: "Stack",
          stack: [
            "PHP",
            "MySQL",
            "PDO",
            "Sessions PHP",
            "JavaScript",
            "Chart.js",
            "Tailwind CDN",
            "HTML/CSS",
          ],
        },

        overview: {
          title: "Mission Brief",
          text:
            "Shift’Up est un prototype de startup SaaS B2B imaginé pour accompagner la transition écologique des entreprises. L’objectif est de créer un lien entre les engagements RSE de l’entreprise et les actions quotidiennes de chaque salarié grâce à une application motivante, collective et gamifiée.",
          cards: [
            {
              title: "Objectif produit",
              text:
                "Rendre l’écologie plus accessible et attractive en transformant les bonnes pratiques RSE en défis quotidiens, progression, badges, classements et récompenses.",
            },
            {
              title: "Objectif technique",
              text:
                "Développer une application web dynamique avec authentification, base de données relationnelle, rôles utilisateurs, défis, gamification et persistance des données.",
            },
          ],
        },

        role: {
          title: "Hero Role",
          text:
            "Dans une équipe de 7 personnes, j’ai principalement développé la partie applicative et la base de données de Shift’Up. Les créatifs ont produit l’univers graphique, les visuels et la maquette, que j’ai ensuite majoritairement intégrés côté application.",
          items: [
            "Conception d’environ 85% de la base de données MySQL.",
            "Développement de la majorité de l’application côté utilisateur.",
            "Création des pages de connexion, inscription et paramètres.",
            "Création et rédaction des défis RSE, hors visuels.",
            "Développement de la logique de gamification : XP, niveaux, streak, badges, monnaie virtuelle et boutique.",
            "Intégration des maquettes fournies par l’équipe créative.",
            "Participation légère au wireframe initial pour aider la conception de la maquette.",
            "Création du dépôt Git et résolution de conflits pendant le projet.",
            "Intervention ponctuelle sur les espaces admin et super-admin, principalement développés par un autre développeur.",
          ],
        },

        process: {
          title: "Origin Process",
          items: [
            {
              title: "Concept & identité",
              text:
                "Le projet s’appuie sur une identité de marque forte : Shifter, Daily Shift, Shift League, Shift Center, Shift Master et Shift Impact. L’objectif était de rendre la RSE plus positive, accessible et motivante.",
            },
            {
              title: "Base de données",
              text:
                "J’ai conçu la majorité du modèle de données : utilisateurs, entreprises, départements, défis, actions validées, badges, récompenses, inventaire et progression.",
            },
            {
              title: "Parcours utilisateur",
              text:
                "J’ai développé les principales pages côté Shifter : authentification, inscription, paramètres, défis, boutique et mécaniques de progression.",
            },
            {
              title: "Gamification",
              text:
                "J’ai mis en place une logique de récompense avec XP, niveaux, streaks, badges, monnaie virtuelle et objets utilisables pour renforcer l’engagement.",
            },
          ],
        },

        features: {
          title: "Main Features",
          items: [
            "Authentification avec connexion, inscription et récupération de mot de passe.",
            "Gestion des rôles : Shifter, Admin entreprise et Super-admin.",
            "Défis RSE avec difficulté, catégorie, durée, limite quotidienne et validation.",
            "Système d’XP, de niveaux et de progression.",
            "Streak utilisateur pour encourager la régularité.",
            "Badges débloqués selon certaines actions.",
            "Monnaie virtuelle gagnée grâce aux défis.",
            "Boutique avec récompenses et objets utilisables.",
            "Inventaire utilisateur.",
            "Base de données relationnelle MySQL.",
            "Interface bilingue français / anglais.",
            "Intégration responsive à partir des maquettes créatives.",
          ],
        },

        challenges: {
          title: "Boss Fight",
          items: [
            {
              problem:
                "Créer une application RSE motivante sans tomber dans un ton moralisateur ou culpabilisant.",
              solution:
                "Le projet utilise une approche positive basée sur les défis, la progression, les récompenses et un vocabulaire de marque plus ludique.",
            },
            {
              problem:
                "Transformer des actions écologiques simples en vraie logique applicative.",
              solution:
                "Chaque défi possède des règles : XP, CO₂ économisé, durée, limite quotidienne, difficulté, catégorie et validation enregistrée en base de données.",
            },
            {
              problem:
                "Gérer une progression utilisateur persistante avec PHP/MySQL.",
              solution:
                "J’ai relié les actions validées à la base de données pour mettre à jour XP, monnaie, streak, badges, inventaire et niveau.",
            },
            {
              problem:
                "Travailler à plusieurs sur un projet avec des devs et des créatifs.",
              solution:
                "J’ai participé à l’intégration des maquettes, créé le dépôt Git et aidé à résoudre les conflits pour garder une base de travail commune.",
            },
          ],
        },

        technical: {
          title: "Technical Focus",
          items: [
            {
              title: "Base de données relationnelle",
              text:
                "La base MySQL structure les utilisateurs, entreprises, départements, défis, récompenses, badges, actions et inventaires afin de rendre la progression persistante.",
            },
            {
              title: "Gamification PHP/MySQL",
              text:
                "La validation d’un défi déclenche plusieurs mises à jour : ajout d’XP, monnaie virtuelle, CO₂ économisé, streak, progression multi-jours et déblocage potentiel de badges.",
            },
            {
              title: "Authentification & rôles",
              text:
                "L’application utilise des sessions PHP et des rôles pour séparer les accès entre Shifter, Admin entreprise et Super-admin.",
            },
            {
              title: "Travail d’équipe",
              text:
                "Le projet a été développé dans une équipe de 7 personnes : 3 développeurs et 4 créatifs. Mon rôle s’est concentré sur la partie application, la base de données, la gamification et l’intégration.",
            },
          ],
        },

        gallery: {
          title: "Visual Gallery",
          text:
            "Les visuels doivent montrer à la fois l’expérience utilisateur gamifiée et la richesse fonctionnelle de l’application.",
          items: [
            {
              label: "Dashboard Shifter",
              image: `${import.meta.env.BASE_URL}projects/shiftup/dashboard.jpg`,
            },
            {
              label: "Défis RSE",
              image: `${import.meta.env.BASE_URL}projects/shiftup/defis.jpg`,
            },
            {
              label: "Boutique & récompenses",
              image: `${import.meta.env.BASE_URL}projects/shiftup/shop.jpg`,
            },
          ],
        },

        results: {
          title: "Final Form",
          items: [
            "Prototype fonctionnel d’application SaaS B2B autour de la RSE.",
            "Application développée en PHP/MySQL avec authentification, rôles et sessions.",
            "Base de données relationnelle complète pour gérer utilisateurs, défis, actions, badges et récompenses.",
            "Système de gamification complet : XP, niveaux, streaks, monnaie, badges et boutique.",
            "Projet pertinent pour montrer mes compétences fullstack, ma logique applicative et mon expérience en projet de groupe.",
          ],
        },

        lessons: {
          title: "XP Gained",
          text:
            "Shift’Up m’a permis de passer d’une logique de site web à une vraie logique d’application : base de données, authentification, rôles, progression utilisateur, gamification, intégration de maquettes et travail en équipe. J’ai aussi compris l’importance de bien répartir les responsabilités entre développement, design, contenu et gestion de projet.",
        },
      },

      en: null,
    },
  },

  {
    slug: "moodmix",
    number: "03",
    title: "MoodMix",
    accent: "#2454d6",
    page: "/projects/moodmix",
    image: `${import.meta.env.BASE_URL}projects/moodmix/hero.jpg`,

    seo: {
      fr: {
        title: "MoodMix – Application React avec API musicale | Ryan Mumbata",
        description:
          "Étude de cas MoodMix : application React avec API musicale, gestion des états, routing, favoris en localStorage et interface responsive.",
      },
      en: {
        title: "MoodMix – React Music API Application | Ryan Mumbata",
        description:
          "MoodMix case study: React music API application with loading states, routing, localStorage favourites and responsive interface.",
      },
    },

    links: [],

    card: {
      fr: {
        type: "Application React API",
        description:
          "Application React de génération de playlists locales à partir d’un mood, d’un artiste et d’un morceau de référence. Le projet utilisera des APIs musicales pour proposer des sons similaires, gérer les états de chargement, les erreurs, le routing, les favoris en localStorage et une interface visuelle immersive.",
        tags: [
          "React",
          "Spotify API",
          "Last.fm API",
          "JavaScript",
          "localStorage",
        ],
        imageAlt:
          "Aperçu du projet MoodMix, application React de génération de playlists selon un mood, un artiste et un morceau",
      },
      en: {
        type: "React API application",
        description:
          "React application that generates local playlists based on a mood, an artist and a reference track. The project will use music APIs to suggest similar songs, handle loading states, errors, routing, localStorage favourites and an immersive visual interface.",
        tags: [
          "React",
          "Spotify API",
          "Last.fm API",
          "JavaScript",
          "localStorage",
        ],
        imageAlt:
          "Preview of the MoodMix project, React playlist generator based on a mood, an artist and a track",
      },
    },

    detail: {
      fr: {
        badge: "React · API musicale · JavaScript",
        fullTitle: "MoodMix — Application React de playlists selon un mood",
        subtitle:
          "Un projet React pensé pour prouver mes compétences en JavaScript moderne, API, routing, états dynamiques et interface immersive.",
        backLabel: "Retour au portfolio",
        liveLabel: "Projet à créer",

        info: {
          title: "Power Stats",
          items: [
            ["Type", "Application React"],
            ["Rôle", "Développeur front-end"],
            ["Année", "2026"],
            ["Durée", "Projet personnel"],
            ["Statut", "À créer"],
          ],
          stackTitle: "Stack",
          stack: [
            "React",
            "JavaScript",
            "Spotify API",
            "Last.fm API",
            "React Router",
            "Tailwind",
            "localStorage",
          ],
        },

        overview: {
          title: "Mission Brief",
          text:
            "MoodMix sera une application React qui génère des playlists locales selon un mood, un artiste et un morceau de référence. L’objectif est de montrer une vraie maîtrise du JavaScript moderne dans un contexte React et API.",
          cards: [
            {
              title: "Objectif principal",
              text:
                "Prouver la capacité à récupérer, afficher, filtrer et organiser des données externes.",
            },
            {
              title: "Pourquoi ce projet",
              text:
                "C’est le projet qui manque le plus au portfolio pour montrer des compétences React/API solides.",
            },
          ],
        },

        role: {
          title: "Hero Role",
          text:
            "Je vais concevoir l’interface, gérer les appels API, les états de chargement, les erreurs, le routing, les favoris et la logique de recommandation.",
          items: [
            "Recherche de sons.",
            "Génération de playlists selon un mood.",
            "Gestion du loading state.",
            "Gestion des erreurs.",
            "Favoris en localStorage.",
            "Responsive design.",
          ],
        },

        process: {
          title: "Origin Process",
          items: [
            {
              title: "API",
              text:
                "Connexion à une API musicale comme Spotify ou Last.fm pour récupérer des données musicales.",
            },
            {
              title: "Routing",
              text: "Création des routes principales et des pages détail.",
            },
            {
              title: "États",
              text: "Gestion des états de chargement, d’erreur et de données.",
            },
            {
              title: "UI",
              text: "Création d’une interface immersive, responsive et claire.",
            },
          ],
        },

        features: {
          title: "Main Features",
          items: [
            "Recherche d’artiste.",
            "Recherche de morceau.",
            "Mood selector.",
            "Génération de playlist.",
            "Favoris.",
            "Loading state.",
            "Error state.",
            "localStorage.",
          ],
        },

        challenges: {
          title: "Boss Fight",
          items: [
            {
              problem:
                "Créer un projet React/API suffisamment clair pour prouver mes compétences JavaScript modernes.",
              solution:
                "Je vais structurer le projet autour de fetch, async/await, états de chargement, erreurs, routing et localStorage.",
            },
            {
              problem:
                "Éviter une simple application de recherche trop basique.",
              solution:
                "L’idée du mood, de l’artiste et du morceau de référence rend le projet plus original et plus proche de mon univers créatif.",
            },
          ],
        },

        technical: {
          title: "Technical Focus",
          items: [
            {
              title: "API",
              text:
                "Utilisation de fetch, async/await, gestion des réponses et des erreurs.",
            },
            {
              title: "React",
              text:
                "Découpage en composants, hooks, routing et gestion d’état local.",
            },
          ],
        },

        gallery: {
          title: "Visual Gallery",
          text: "Ajoute ici les captures quand le projet sera terminé.",
          items: [
            {
              label: "Search",
              image: `${import.meta.env.BASE_URL}projects/moodmix/search.jpg`,
            },
            {
              label: "Playlist",
              image: `${import.meta.env.BASE_URL}projects/moodmix/playlist.jpg`,
            },
            {
              label: "Favorites",
              image: `${import.meta.env.BASE_URL}projects/moodmix/favorites.jpg`,
            },
          ],
        },

        results: {
          title: "Final Form",
          items: [
            "Projet React/API à créer en priorité.",
            "Preuve concrète de JavaScript moderne.",
            "Projet utile pour les candidatures front-end.",
          ],
        },

        lessons: {
          title: "XP Gained",
          text:
            "Ce projet servira à renforcer ma maîtrise de React, du JavaScript asynchrone, du routing et de la gestion d’interfaces dynamiques.",
        },
      },

      en: null,
    },
  },

  {
    slug: "figma-to-code",
    number: "04",
    title: "Figma to Code",
    accent: "#c1121f",
    page: "/projects/figma-to-code",
    image: `${import.meta.env.BASE_URL}projects/figma-to-code/hero.jpg`,

    seo: {
      fr: {
        title: "Figma to Code – Intégration pixel-perfect | Ryan Mumbata",
        description:
          "Étude de cas Figma to Code : intégration responsive d’une landing page depuis une maquette Figma avec Tailwind, accessibilité et performance Lighthouse.",
      },
      en: {
        title: "Figma to Code – Pixel-perfect Integration | Ryan Mumbata",
        description:
          "Figma to Code case study: responsive landing page integration from a Figma mockup with Tailwind, accessibility and Lighthouse performance.",
      },
    },

    links: [],

    card: {
      fr: {
        type: "Intégration pixel-perfect",
        description:
          "Intégration d’une landing page à partir d’une maquette Figma avec une attention particulière au responsive, aux espacements, à la fidélité visuelle, à l’accessibilité et aux performances Lighthouse.",
        tags: ["Figma", "HTML", "CSS", "Tailwind", "Responsive"],
        imageAlt:
          "Aperçu du projet Figma to Code, intégration pixel-perfect d’une landing page depuis une maquette Figma",
      },
      en: {
        type: "Pixel-perfect integration",
        description:
          "Landing page integration based on a Figma mockup, with a strong focus on responsive design, spacing, visual accuracy, accessibility and Lighthouse performance.",
        tags: ["Figma", "HTML", "CSS", "Tailwind", "Responsive"],
        imageAlt:
          "Preview of the Figma to Code project, pixel-perfect landing page integration from a Figma mockup",
      },
    },

    detail: {
      fr: {
        badge: "Figma · Tailwind · Pixel-perfect",
        fullTitle: "Figma to Code — Intégration pixel-perfect d’une landing page",
        subtitle:
          "Un projet pensé pour montrer ma capacité à transformer une maquette Figma en interface responsive fidèle et propre.",
        backLabel: "Retour au portfolio",
        liveLabel: "Projet à créer",

        info: {
          title: "Power Stats",
          items: [
            ["Type", "Landing page"],
            ["Rôle", "Intégrateur web"],
            ["Année", "2026"],
            ["Durée", "Projet personnel"],
            ["Statut", "À créer"],
          ],
          stackTitle: "Stack",
          stack: [
            "Figma",
            "HTML",
            "CSS",
            "Tailwind",
            "Responsive",
            "Lighthouse",
          ],
        },

        overview: {
          title: "Mission Brief",
          text:
            "Ce projet servira à montrer ma capacité à respecter une maquette Figma et à produire une intégration responsive, propre, accessible et performante.",
          cards: [
            {
              title: "Objectif principal",
              text:
                "Prouver un vrai niveau d’intégration front-end et de fidélité visuelle.",
            },
            {
              title: "Pourquoi ce projet",
              text:
                "C’est important pour viser des agences web et des postes d’intégration front-end.",
            },
          ],
        },

        role: {
          title: "Hero Role",
          text:
            "Je vais analyser la maquette, découper les sections, créer le responsive, intégrer les composants et optimiser le rendu final.",
          items: [
            "Analyse de la maquette Figma.",
            "Découpage des sections.",
            "Intégration responsive.",
            "Respect des espacements.",
            "Optimisation Lighthouse.",
          ],
        },

        process: {
          title: "Origin Process",
          items: [
            {
              title: "Analyse Figma",
              text:
                "Lecture de la maquette, des espacements, couleurs et composants.",
            },
            {
              title: "Structure",
              text: "Création d’une structure HTML claire et maintenable.",
            },
            {
              title: "Intégration",
              text: "Développement de l’interface avec Tailwind.",
            },
            {
              title: "Responsive",
              text: "Adaptation mobile, tablette et desktop.",
            },
          ],
        },

        features: {
          title: "Main Features",
          items: [
            "Landing page responsive.",
            "Respect de la maquette.",
            "Composants réutilisables.",
            "Optimisation mobile.",
            "Score Lighthouse.",
            "Accessibilité.",
          ],
        },

        challenges: {
          title: "Boss Fight",
          items: [
            {
              problem:
                "Respecter précisément une maquette Figma sans perdre la qualité responsive.",
              solution:
                "Je vais travailler section par section, contrôler les espacements, les tailles, les alignements et adapter chaque bloc aux écrans mobiles.",
            },
            {
              problem:
                "Prouver une vraie capacité d’intégration front-end utile en agence.",
              solution:
                "Le projet mettra en avant le rendu final, la maquette source, le responsive et le score Lighthouse.",
            },
          ],
        },

        technical: {
          title: "Technical Focus",
          items: [
            {
              title: "Pixel-perfect",
              text:
                "Travail sur les espacements, tailles, couleurs, typographies et alignements.",
            },
            {
              title: "Responsive",
              text:
                "Adaptation propre à plusieurs tailles d’écran avec Tailwind CSS.",
            },
          ],
        },

        gallery: {
          title: "Visual Gallery",
          text:
            "Ajoute ici la maquette Figma, le rendu final et les versions responsive.",
          items: [
            {
              label: "Figma",
              image: `${import.meta.env.BASE_URL}projects/figma-to-code/figma.jpg`,
            },
            {
              label: "Final",
              image: `${import.meta.env.BASE_URL}projects/figma-to-code/final.jpg`,
            },
            {
              label: "Mobile",
              image: `${import.meta.env.BASE_URL}projects/figma-to-code/mobile.jpg`,
            },
          ],
        },

        results: {
          title: "Final Form",
          items: [
            "Projet à créer pour renforcer le portfolio.",
            "Preuve d’intégration front-end.",
            "Utile pour les candidatures en agence.",
          ],
        },

        lessons: {
          title: "XP Gained",
          text:
            "Ce projet renforcera ma précision en intégration, ma capacité à respecter une direction artistique et mon attention aux détails responsive.",
        },
      },

      en: null,
    },
  },
];

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug) {
  const currentIndex = projects.findIndex((project) => project.slug === slug);

  if (currentIndex === -1) return projects[0];

  return projects[(currentIndex + 1) % projects.length];
}