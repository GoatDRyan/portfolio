# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Déploiement GitHub Pages

Ce projet est prêt pour un déploiement sur GitHub Pages (project page) avec `gh-pages`.

- `vite.config.js` contient `base: '/portfolio/'` pour que les assets construits utilisent le bon préfixe.
- Le script `deploy` dans `package.json` exécute `npm run build && gh-pages -d dist`.

Commandes (PowerShell) :

```powershell
npm install
npm run build
npm run deploy
```

Notes:
- Assurez-vous que le dépôt est poussé sur GitHub et que vous êtes authentifié (SSH ou token) ; `gh-pages` poussera sur la branche `gh-pages`.
- Si vous préférez servir depuis `main` avec `docs/`, je peux adapter le workflow.

