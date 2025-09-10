<div align="center">

# Migrant Health Record Management System (Kerala)

[![GitHub issues](https://img.shields.io/github/issues/Mithzzx/Migrant-Health-ABDM?style=flat-square)](https://github.com/<your-org>/<your-repo>/issues)
[![GitHub forks](https://img.shields.io/github/forks/Mithzzx/Migrant-Health-ABDM?style=flat-square)](https://github.com/<your-org>/<your-repo>/network)
[![GitHub stars](https://img.shields.io/github/stars/Mithzzx/Migrant-Health-ABDM?style=flat-square)](https://github.com/<your-org>/<your-repo>/stargazers)
[![GitHub license](https://img.shields.io/github/license/Mithzzx/Migrant-Health-ABDM?style=flat-square)](./LICENSE)
[![Made with React Native](https://img.shields.io/badge/Made%20with-React%20Native-61DAFB?style=flat-square&logo=react)](https://reactnative.dev)
[![Powered by ABDM](https://img.shields.io/badge/Powered%20by-ABDM-green?style=flat-square)](https://abdm.gov.in)

---

### 🌐 A Smart India Hackathon project to provide **migrant workers in Kerala** with secure, multilingual, and portable **digital health records**, powered by **ABHA ID & ABDM integration**.

</div>

---

## ✨ Features
- 🔐 **ABHA ID-based login** (secure & government-compliant)  
- 📂 **Health Locker Integration** – prescriptions, lab reports, discharge summaries  
- 🩺 **Doctor Portal** – update patient history with consent  
- 🌐 **Multilingual Support (10 languages)** with voice assistance  
- 📶 **Offline Mode + QR Code Sharing** for low-connectivity areas  
- 🚑 **Emergency Access** – critical info available instantly  

---

## 🏗️ Tech Stack
- **Mobile App:** React Native (Expo / CLI, Material Design 3 style)  
- **Backend:** Node.js + Express  
- **Database:** PostgreSQL / MongoDB  
- **ABDM Integration:** ABDM APIs (Gateway, Health Locker, Consent Manager)  
- **Authentication:** ABHA ID + OTP-based  
- **Infra:** Docker + Cloud Run / AWS / Azure  

---
Monorepo managed with Yarn workspaces.
## Structure
- `mobile/` - Migrant Worker app (Expo: Android/iOS + optional RN Web for rapid prototyping)
- `web-app/` - Doctor / Facility Portal (React + Vite)
- `analytics-dashboard/` - (placeholder) Next.js analytics dashboard (population insights)
- `backend/` - Express API server (ABDM integration, auth, consent, data aggregation)
- `frontend/` - Shared UI components / utilities (placeholder)

- Corepack enabled (installs Yarn 4 automatically)

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

