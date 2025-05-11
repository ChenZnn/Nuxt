# Blog Nuxt

Ce projet est une application de blog développée avec [Nuxt 3](https://nuxt.com/) et [Vue 3](https://vuejs.org/), utilisant [Tailwind CSS](https://tailwindcss.com/) pour le style. Il propose une authentification simple, la gestion des articles de blog, et un affichage dynamique selon l'état de connexion de l'utilisateur.

## Fonctionnalités principales

- Authentification (connexion, inscription, déconnexion)
- Création, affichage et gestion des articles de blog
- Interface responsive et moderne grâce à Tailwind CSS
- Affichage conditionnel du menu selon l'état de connexion
- Navigation fluide avec NuxtLink

## Prérequis

- [Node.js](https://nodejs.org/) (version 16 ou supérieure recommandée)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/) ou [pnpm](https://pnpm.io/)

## Installation

Clonez le dépôt puis installez les dépendances :

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

## Configuration de Tailwind CSS

Tailwind CSS est déjà configuré dans ce projet. Les fichiers principaux sont :
- `tailwind.config.js`
- `postcss.config.js`
- `assets/styles/main.css`

Vous pouvez personnaliser le thème ou ajouter des plugins dans `tailwind.config.js`.

## Lancement du projet

Pour démarrer le serveur de développement :

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000).

## Construction pour la production

```bash
npm run build
npm run preview
```

## Structure du projet

- `components/` : Composants réutilisables (Navbar, BlogCard, etc.)
- `pages/` : Pages principales (accueil, login, register, article)
- `middleware/` : Middleware d'authentification
- `assets/` : Fichiers statiques et styles
- `public/` : Fichiers publics (favicon, robots.txt)

## Authentification

L'état de connexion est géré via le `localStorage` (token et informations utilisateur). Le menu de navigation s'adapte automatiquement selon l'état de connexion.

## Personnalisation

- Modifiez le composant `Navbar.vue` pour changer le nom du site ou le menu.
- Ajoutez de nouvelles pages ou fonctionnalités dans le dossier `pages/`.

## Ressources utiles

- [Documentation Nuxt](https://nuxt.com/docs)
- [Documentation Vue 3](https://vuejs.org/guide/introduction.html)
- [Documentation Tailwind CSS](https://tailwindcss.com/docs)

---

N'hésitez pas à contribuer ou à adapter ce projet à vos besoins !
