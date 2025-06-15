# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Roles & Permissions module

This project now includes an admin module to manage roles and permissions. It provides CRUD pages for roles and permissions as well as an interface to assign permissions to a role. Users can be assigned multiple roles from the user form.

## ProviderServiceForm

The `ProviderServiceForm` component can optionally receive a `providerId` prop. When supplied, this identifier is used as the target provider for the created or updated service. If omitted, the form falls back to `initial.provider_id` then to the logged user `provider_id`. When no provider can be determined, the form displays an error and the save action is disabled.

Administrators (roles `admin` or `super_admin`) will see a dropdown list of available providers retrieved via `useListProvidersQuery` to easily select the desired provider.
