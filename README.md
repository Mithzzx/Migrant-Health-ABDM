# Migrant Health ABDM Hackathon Project

Monorepo managed with Yarn workspaces.

## Structure
## Structure
- `mobile/` - Migrant Worker app (Expo: Android/iOS + optional RN Web for rapid prototyping)
- `web-app/` - Doctor / Facility Portal (React + Vite)
- `analytics-dashboard/` - (placeholder) Next.js analytics dashboard (population insights)
- `backend/` - Express API server (ABDM integration, auth, consent, data aggregation)
- `frontend/` - Shared UI components / utilities (placeholder)

- Corepack enabled (installs Yarn 4 automatically)

## Install
```
corepack enable
yarn install
```

## Common Scripts
At repo root:
```
yarn dev:backend       # Start Express API (port 4000)
yarn dev:mobile        # Start Expo mobile (native) project
yarn dev:web           # Start Expo in Web mode (React Native Web)
yarn dev:analytics     # (placeholder) Next.js dashboard
```

## Backend
Simple Express server exposes `/health` and `/api/users` (in‑memory CRUD).

## Mobile & Web (Unified)
## Apps
Mobile (worker-facing):
```
yarn dev:mobile     # Native (Expo Go / emulator)
yarn dev:web        # RN Web (fast prototyping of mobile UI in browser)
```

Doctor Portal (separate web app):
```
yarn workspace web-app dev
```

## Adding Packages
Add a dependency to a workspace:
```
yarn workspace backend add <pkg>
```
Or a dev dependency:
```
yarn workspace backend add -D <pkg>
```

## Workspaces Overview
```
yarn workspaces list --verbose
```

## TODO
- Implement analytics dashboard (Next.js)
- Populate shared `frontend` package
- Add linting, formatting, testing setup

