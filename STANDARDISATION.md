# Standardisation Frontend – Projet MyPetly

## 1. Structure des dossiers et fichiers
- Un dossier par module dans `src/modules/[module]/`
  - Fichiers : `[module]Api.js`, `use[Modules].js`, `use[Module]Form.js`, etc.
- Un dossier par page dans `src/pages/[module]/`
  - Pages : `[Modules]List.jsx`, `[Module]Form.jsx`, `[Module]Details.jsx`

## 2. Utilisation de RTK Query
- Logique API centralisée dans `[module]Api.js`
- Hooks custom pour chaque module

## 3. UI
- DataGrid MUI pour toutes les listes
- Boutons Add/Edit/Delete, actions claires, modales au besoin
- Composants réutilisables dans `src/components/`
- Formulaires avec react-hook-form et feedback utilisateur

## 4. Multilingue
- i18n pour tous les labels et textes
- Champs multilingues : afficher la langue courante

## 5. Sécurité & navigation
- Routes protégées via RequireAuth/RequireRole
- Menus dynamiques selon les droits

## 6. Cohérence UI/UX
- Design homogène : titres, boutons, couleurs, icônes, feedback
- Loader, Alert, Toast centralisés

## 7. Documentation
- Fichiers et hooks commentés
- Nommage explicite

---

> Ce document doit être respecté pour tous les nouveaux modules, pages et fonctionnalités de l’admin MyPetly.
