# Rapport d'avancement – Projet MyPetly Admin

## Structure générale du projet

- Racine du dépôt : `README.md`, `STANDARDISATION.md`, configuration Vite et ESLint.
- Dossiers principaux :
  - `src/` – code source React
  - `public/` – fichiers statiques
  - `docs/` – documentation (API et modules)
- Dans `src/` :
  - `app/` – configuration Redux store
  - `api/` – baseQuery avec gestion du refresh token
  - `components/` – composants réutilisables (ex. `CrudTable`, `LangSwitch`)
  - `layouts/` – layout principal
  - `modules/` – logique métier par domaine
  - `pages/` – pages reliées aux modules
  - `routes/` – définition des routes
  - `theme/` – définition du thème MUI
  - `utils/` – utilitaires divers

## Standardisation appliquée

Le fichier [`STANDARDISATION.md`](../STANDARDISATION.md) définit les conventions principales :

- Un dossier par module dans `src/modules/[module]/` avec fichiers `*Api.js`, `use[Modules].js`, `use[Module]Form.js`.
- Un dossier par page dans `src/pages/[module]/` contenant `*List.jsx`, `*Form.jsx`, `*Details.jsx`.
- Utilisation de **RTK Query** pour centraliser les appels API et créer des hooks custom par module.
- Interface uniforme : DataGrid MUI pour les listes, boutons Add/Edit/Delete, formulaires avec react-hook-form, composants réutilisables.
- Prise en charge du multilingue via i18n, routes protégées (RequireAuth/RequireRole) et menus dynamiques selon les droits.
- Cohérence UI/UX : design homogène, loader/alert/toast centralisés.

## Thème actuel

Le thème MUI se trouve dans [`src/theme/index.js`](../src/theme/index.js) :

```javascript
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#00bfa5' },
    background: { default: '#f5f7fa', paper: '#ffffff' }
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700, fontSize: '2.125rem' },
    h2: { fontWeight: 700, fontSize: '1.75rem' },
    body1: { fontSize: '0.95rem' }
  },
  components: {
    MuiButton: { styleOverrides: { root: { textTransform: 'none' } } },
    MuiCard: { defaultProps: { elevation: 0 } }
  }
})
```

Ce thème définit les couleurs principales, les polices et quelques overrides pour les boutons et cartes.

## Modules réalisés

D’après le dossier [`src/modules`](../src/modules) et les pages associées :

- **Animals** – gestion des animaux (`animalsApi.js`, `useAnimals.js`, formulaires et pages de liste/détail).
- **Auth** – authentification et autorisation (provider, hooks et composants de protection de routes).
- **Bookings** – gestion des réservations/calendrier.
- **Profile** – page "Mon profil" (mise à jour et changement de mot de passe).
- **Provider** – gestion des prestataires de services.
- **Roles & Permissions** – module complet de rôles et permissions.
- **Services** – CRUD des services avec assignation de providers.
- **Categories** – gestion des catégories de services.
- **Collars** – CRUD des colliers reliés aux animaux.
- **Provider Services** – gestion des services proposés par chaque provider.
- **Users** – module de référence pour la gestion des utilisateurs.

Les tags restants dans `docs/api-docs.json` concernent `Paiement/Stripe` et `Reviews` qui ne sont pas encore implémentés.

Ce rapport présente l’état actuel du projet : la structure suit bien la standardisation décrite, un thème MUI personnalisé est en place et huit modules fonctionnels ont été développés. Les modules restants pourront s’appuyer sur le même modèle pour compléter les fonctionnalités prévues dans la documentation API.
