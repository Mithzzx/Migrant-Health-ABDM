<h1><p align="center">
  Migrant Health Record Management System (Kerala)
</p></h1>

<p align="center">
<img src="https://img.shields.io/github/issues/Mithzzx/Migrant-Health-ABDM">
<img src="https://img.shields.io/badge/Status-In%20Development-orange" alt="Status">
<img src="https://img.shields.io/github/license/Mithzzx/Migrant-Health-ABDM?style" alt="License">
<img src="https://img.shields.io/badge/Made%20with-React%20Native-61DAFB?logo=react">
<img src="https://img.shields.io/badge/Powered%20by-ABDM-green?)](https://abdm.gov.in)">
<img src="https://img.shields.io/github/stars/Mithzzx/Migrant-Health-ABDM?stylesocial)" alt="GitHub Stars">
</p>
<div align="center">
  

### A Smart India Hackathon project to provide **migrant workers in Kerala** with secure, multilingual, and portable **digital health records**, powered by **ABHA ID & ABDM integration**.

</div>

---

## ✨ Features

### 🏥 **Mobile App (Worker-Facing)**
- 🔐 **ABHA ID-based Authentication** with OTP verification
- 📂 **Health Locker Integration** – prescriptions, lab reports, discharge summaries  
- 🌐 **Multilingual Support (12 languages)** with voice assistance in English & Hindi
- 🤖 **AI Health Assistant** with voice commands and recording animations
- 📱 **QR Code Login** for quick access
- 📶 **Offline Mode + QR Code Sharing** for low-connectivity areas  
- 🚑 **Emergency Details Page** with instant access to emergency contacts (108, 100, 101)
- 💊 **Medicine Management** with reminders and tracking
- 📋 **Health Records** with manual upload and ABDM-compliant storage
- 📅 **Appointment Booking** with doctor selection and scheduling

### 👨‍⚕️ **Doctor Portal (Web)**
- 🩺 **Patient Management** with consent-based access
- 📊 **Health Records Dashboard** with FHIR compliance
- 🔒 **Secure Patient Data** with privacy controls
- 📝 **Update Patient History** with proper consent management

### 📊 **Analytics Dashboard** *(Government Health Analytics)*
- 📈 **Real-time Population Health Insights** for Kerala's 247K+ migrant workers
- 🏥 **Healthcare Facility Performance** monitoring with ABDM integration status
- 🦠 **Disease Surveillance & Heatmaps** with geographic distribution analysis
- 📋 **ABDM Compliance Tracking** with 94.2% FHIR adoption metrics
- 🎯 **Key Performance Indicators**: 89.7% ABHA coverage, 15.4K active consultations
- 📊 **Interactive Charts**: Population trends, health utilization, facility performance
- 🎨 **Professional Design**: Kerala government branding with cardiogram favicon
- 📱 **Responsive Layout**: Desktop, tablet, and mobile optimized interface
- ⚡ **Real-time Data**: Live updates with time-period filtering (7d, 30d, 3m)

---

## 🏗️ Tech Stack

### Frontend
- **Mobile App:** React Native (Expo) with Material Design 3
- **Doctor Portal:** React + Vite with modern UI components
- **Analytics Dashboard:** React 19 + Vite 5 + TypeScript
  - **UI Framework:** Radix UI + TailwindCSS + shadcn/ui components
  - **Charts:** Recharts for interactive data visualization
  - **State Management:** TanStack React Query for server state
  - **Routing:** React Router DOM for navigation
  - **Styling:** CSS-in-JS with HSL color system
  - **Icons:** Lucide React with custom cardiogram favicon

### Backend & Integration
- **Backend:** Node.js + Express with RESTful APIs
- **Database:** PostgreSQL / MongoDB with FHIR-compliant schemas
- **ABDM Integration:** ABDM Gateway APIs, Health Locker, Consent Manager
- **Authentication:** ABHA ID + OTP-based secure authentication

### DevOps & Infrastructure  
- **Container:** Docker-ready with multi-stage builds
- **Cloud:** AWS / Azure / Google Cloud deployment ready
- **Monitoring:** Health check endpoints and error tracking

---

## 📸 Screenshots & Demo

### 🏥 **Mobile App (React Native)**

<div align="center">

#### **Authentication & Onboarding**
| Login Screen | Language Selection | OTP Verification |
|:---:|:---:|:---:|
| ![Login](./docs/screenshots/mobile/login-screen.png) | ![Language](./docs/screenshots/mobile/language-selection.png) | ![OTP](./docs/screenshots/mobile/otp-verification.png) |
| *ABHA ID login with Kerala branding* | *12 language support with voice* | *Secure OTP verification* |

#### **Core Features**
| Dashboard | AI Assistant | Health Records |
|:---:|:---:|:---:|
| ![Dashboard](./docs/screenshots/mobile/dashboard-screen.png) | ![AI Chat](./docs/screenshots/mobile/ai-chat-screen.png) | ![Records](./docs/screenshots/mobile/health-records.png) |
| *Main health dashboard* | *Voice commands in English/Hindi* | *ABDM-compliant record storage* |

#### **Healthcare Services**
| Appointment Booking | Emergency Details | Medicine Tracking |
|:---:|:---:|:---:|
| ![Appointments](./docs/screenshots/mobile/appointment-booking.png) | ![Emergency](./docs/screenshots/mobile/emergency-details.png) | ![Medicines](./docs/screenshots/mobile/medicine-tracking.png) |
| *Doctor selection & scheduling* | *Emergency contacts & medical info* | *Medication reminders* |

</div>

### 👨‍⚕️ **Doctor Portal (Web)**

<div align="center">

| Portal Dashboard | Patient Management |
|:---:|:---:|
| ![Doctor Dashboard](./docs/screenshots/web/doctor-dashboard.png) | ![Patient List](./docs/screenshots/web/patient-management.png) |
| *Healthcare provider dashboard* | *Consent-based patient access* |

</div>

### 📊 **Analytics Dashboard (Government)**

<div align="center">

#### **Population Health Insights**
![Analytics Dashboard](./docs/screenshots/analytics/main-dashboard.png)
*Real-time population health metrics for 247K+ migrant workers in Kerala*

#### **Interactive Data Visualization**
| Health Metrics | Disease Surveillance | Facility Performance |
|:---:|:---:|:---:|
| ![Metrics](./docs/screenshots/analytics/health-metrics.png) | ![Disease Map](./docs/screenshots/analytics/disease-heatmap.png) | ![Facilities](./docs/screenshots/analytics/facility-performance.png) |
| *KPIs with trend analysis* | *Geographic disease distribution* | *Healthcare facility monitoring* |

</div>

> **📝 Note**: Screenshots are currently placeholders. Actual screenshots will be added as development progresses. See [Screenshot Guide](./docs/screenshots/README.md) for contribution guidelines.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ with Corepack enabled
- Yarn 4 (automatically installed via Corepack)
- Expo CLI for mobile development
- Git for version control

### Installation
```bash
# Clone the repository
git clone https://github.com/Mithzzx/Migrant-Health-ABDM.git
cd Migrant-Health-ABDM

# Install dependencies for all workspaces
yarn install

# Set up environment variables (copy and modify .env.example files)
cp backend/.env.example backend/.env
cp web-app/.env.example web-app/.env
```

### Development Commands
```bash
# Start all services (choose one or run in separate terminals)
yarn dev:backend       # Express API server (http://localhost:4000)
yarn dev:mobile        # Expo mobile app (scan QR code)
yarn dev:web           # Doctor portal (http://localhost:5173)
yarn dev:analytics     # Analytics dashboard (http://localhost:8082)

# Run mobile app in web mode (development only)
yarn workspace mobile start:web
```

### 📊 **Analytics Dashboard Setup & Run Guide**

#### **Quick Start**
```bash
# Navigate to analytics dashboard
cd analytics-dashboard

# Install dependencies (handles React 19 version compatibility)
npm install --legacy-peer-deps

# Start development server
npm run dev

# 🌐 Open in browser: http://localhost:8082
```

#### **Manual Setup (if needed)**
```bash
# Clean install (if facing React version conflicts)
cd analytics-dashboard
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npm run dev
```

#### **Available Commands**
```bash
npm run dev          # Start dev server (Vite HMR enabled)
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # ESLint code checking
```

#### **Port Configuration**
- **Default**: http://localhost:8082 (auto-selects if 8080/8081 busy)
- **Network**: http://[your-ip]:8082 (accessible on local network)
- **Configuration**: Edit `vite.config.ts` to change port settings

#### **Features Available**
- ✅ **Real-time metrics** with live data updates
- ✅ **Interactive charts** with time period filtering
- ✅ **Responsive design** (desktop/tablet/mobile)
- ✅ **Kerala government branding** with cardiogram favicon
- ✅ **Dark/Light mode** theme support
- ✅ **Professional dashboard** with HSL color system

---

## 📁 Project Structure

```
Migrant-Health-ABDM/
├── mobile/                    # React Native mobile app (Expo)
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── screens/           # App screens organized by feature
│   │   │   ├── auth/          # Login, OTP, ABHA linking
│   │   │   ├── home/          # Dashboard, AI chat, medicines
│   │   │   ├── records/       # Health records management
│   │   │   ├── appointments/  # Doctor booking system
│   │   │   ├── emergency/     # Emergency details & contacts
│   │   │   └── profile/       # User profile & settings
│   │   ├── i18n/             # Internationalization (12 languages)
│   │   └── theme/            # Design tokens & styling
│   ├── App.js                # Main navigation & app setup
│   └── package.json
│
├── web-app/                  # Doctor portal (React + Vite)
│   ├── src/
│   │   ├── portal/
│   │   │   ├── components/   # Shared UI components
│   │   │   └── pages/        # Portal pages (Dashboard, Patients, etc.)
│   │   └── main.jsx
│   └── package.json
│
├── analytics-dashboard/      # Population health analytics (React 19 + Vite 5)
│   ├── src/
│   │   ├── components/
│   │   │   ├── dashboard/    # Analytics components (MetricCard, Charts, etc.)
│   │   │   │   ├── MetricCard.tsx           # KPI display cards
│   │   │   │   ├── PopulationChart.tsx      # Population trend charts
│   │   │   │   ├── HealthUtilizationChart.tsx # Healthcare usage analytics
│   │   │   │   ├── DiseaseHeatmap.tsx       # Geographic disease mapping
│   │   │   │   ├── FacilityPerformance.tsx  # Healthcare facility metrics
│   │   │   │   ├── ComplianceMetrics.tsx    # ABDM compliance tracking
│   │   │   │   └── DashboardHeader.tsx      # Header with Kerala branding
│   │   │   └── ui/           # UI library (Radix UI + shadcn/ui + TailwindCSS)
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx # Main analytics dashboard
│   │   │   ├── Index.tsx     # Landing page
│   │   │   └── NotFound.tsx  # 404 error page
│   │   ├── lib/
│   │   │   └── utils.ts      # Utility functions (cn, etc.)
│   │   ├── main.tsx          # App entry point with React 19
│   │   └── index.css         # Global styles with HSL color system
│   ├── public/
│   │   ├── cardiogram.png    # Site favicon (health icon)
│   │   └── robots.txt        # SEO configuration
│   ├── index.html            # HTML template with favicon setup
│   ├── vite.config.ts        # Vite configuration (port 8082)
│   ├── tailwind.config.ts    # TailwindCSS configuration
│   ├── tsconfig.json         # TypeScript configuration
│   └── package.json          # Dependencies (React 19, Vite 5, Recharts)
│
├── backend/                  # Express.js API server
│   ├── server.js            # Main server file
│   ├── routes/              # API routes
│   └── package.json
│
├── frontend/                 # Shared components (future)
└── package.json             # Workspace root configuration
```

---

## 🎯 Current Implementation Status

### ✅ **Completed Features**
- **Mobile App Core**: Authentication, navigation, multilingual support
- **AI Assistant**: Voice commands in English/Hindi with recording animations
- **Health Records**: Manual upload with ABDM compliance badges
- **Emergency System**: Comprehensive emergency contacts and medical info sharing
- **Appointment Booking**: Full doctor selection and scheduling workflow
- **Analytics Dashboard**: 
  - ✅ Real-time population health metrics (247K+ workers)
  - ✅ Interactive charts with Recharts (population, health utilization)
  - ✅ Disease surveillance heatmaps and facility performance
  - ✅ ABDM compliance tracking (94.2% FHIR adoption)
  - ✅ Professional Kerala government design with cardiogram favicon
  - ✅ Responsive layout (desktop/tablet/mobile)
  - ✅ Time-period filtering (7d, 30d, 3m)
  - ✅ React 19 + Vite 5 + TypeScript stack
- **Doctor Portal**: Patient management with secure data access

### 🚧 **In Development**
- ABDM sandbox integration for production APIs
- Advanced health analytics and predictive insights
- Enhanced offline capabilities with local data sync
- Performance optimizations and caching strategies

### 📋 **Planned Features**
- Telemedicine integration with video consultations
- AI-powered health recommendations
- Blockchain-based consent management
- Advanced biometric authentication
- Integration with Kerala government health systems

---

## 🔧 Development Guide

### Adding Dependencies
```bash
# Add to specific workspace
yarn workspace mobile add react-native-vector-icons
yarn workspace backend add express-rate-limit
yarn workspace analytics-dashboard add @types/node -D

# View all workspaces
yarn workspaces list --verbose
```

### Repository Maintenance

#### **Cleanup Script**
```bash
# Remove unnecessary files (.DS_Store, temp files, logs)
./scripts/cleanup.sh

# Manual cleanup commands
find . -name ".DS_Store" -delete          # Remove macOS system files
find . -name "*.tmp" -delete              # Remove temporary files
find . -name "*.log" -not -path "*/node_modules/*" -delete  # Remove logs
```

#### **Prevent .DS_Store on macOS**
```bash
# Disable .DS_Store creation on network drives
defaults write com.apple.desktopservices DSDontWriteNetworkStores true

# Disable .DS_Store creation globally (optional)
defaults write com.apple.desktopservices DSDontWriteStores true
```

#### **Git Maintenance**
```bash
# Remove files from git history (if already committed)
git rm --cached filename
git commit -m "Remove unnecessary file"

# Check for large files in repository
find . -size +5M -not -path "*/node_modules/*" -not -path "*/.git/*"
```

### Environment Configuration

#### Backend (.env)
```bash
PORT=4000
NODE_ENV=development
ABDM_BASE_URL=https://dev.abdm.gov.in/gateway
ABDM_CLIENT_ID=your_client_id
ABDM_CLIENT_SECRET=your_client_secret
DATABASE_URL=postgresql://user:pass@localhost:5432/migrant_health
```

#### Web App (.env)
```bash
VITE_API_BASE_URL=http://localhost:4000
VITE_APP_NAME=Migrant Health Portal
```

### API Endpoints

#### Backend Server (Port 4000)
```
GET  /health                 # Health check
GET  /api/users             # User management
POST /api/users             # Create user
GET  /api/patients          # Patient list (with consent)
POST /api/records           # Upload health records
GET  /api/appointments      # Appointment management
```

### Mobile App Features

#### Core Screens
- **Authentication**: ABHA login, OTP verification, QR code scanning
- **Dashboard**: Health overview, quick actions, emergency access
- **AI Chat**: Voice assistant with English/Hindi support
- **Records**: Document management with manual upload
- **Appointments**: Doctor booking with availability checking
- **Emergency**: Instant access to emergency services and medical info

#### Design System
- **Colors**: Kerala government green (#0B6E4F) with accessible contrasts
- **Typography**: SF Pro Display with multiple language support
- **Spacing**: 4pt grid system for consistent layouts
- **Components**: Material Design 3 with custom Kerala branding

---

## 🧪 Testing & Quality

### Running Tests
```bash
# Run all tests
yarn test

# Run tests for specific workspace
yarn workspace mobile test
yarn workspace backend test
```

### Code Quality
```bash
# Lint all code
yarn lint

# Format code
yarn format

# Type checking (TypeScript projects)
yarn workspace analytics-dashboard type-check
```

---

## 🚀 Deployment

### Docker Support
```bash
# Build all services
docker-compose build

# Run in production mode
docker-compose up -d
```

### Cloud Deployment
- **Backend**: Ready for deployment on AWS Lambda, Google Cloud Run, or Azure Functions
- **Frontend**: Optimized for CDN deployment (Vercel, Netlify, AWS S3)
- **Mobile**: Expo EAS Build for app store deployment

---

## 🔧 Troubleshooting

### Analytics Dashboard Issues

#### **React Version Mismatch Error**
```
Error: Incompatible React versions: react and react-dom must have exact same version
```
**Solution:**
```bash
cd analytics-dashboard
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

#### **Port Already in Use**
```
Port 8080 is in use, trying another one...
```
**Solution:** Vite automatically selects next available port (8081, 8082, etc.)
- Check console output for actual port
- Or configure specific port in `vite.config.ts`

#### **Blank Page or Loading Issues**
1. **Check console errors** - Open browser DevTools
2. **Verify React versions** - Ensure react@19.0.0 and react-dom@19.0.0 match exactly
3. **Clear cache** - Hard refresh (Cmd+Shift+R / Ctrl+Shift+R)
4. **Restart dev server** - Stop and run `npm run dev` again

#### **TypeScript Errors**
```bash
# Type check the analytics dashboard
cd analytics-dashboard
npx tsc --noEmit
```

#### **Build Issues**
```bash
# Production build test
cd analytics-dashboard
npm run build
npm run preview  # Test production build locally
```

### General Workspace Issues

#### **Yarn Workspace Dependencies**
```bash
# Install dependencies for all workspaces
yarn install

# Add dependency to specific workspace
yarn workspace analytics-dashboard add <package-name>
```

#### **Node.js Version Issues**
- **Required**: Node.js 18+ with Corepack enabled
- **Enable Corepack**: `corepack enable`
- **Yarn 4**: Automatically installed via Corepack

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow ESLint and Prettier configurations
- Write meaningful commit messages
- Add tests for new features
- Update documentation for API changes
- Ensure ABDM compliance for health data handling
- **Screenshots**: Add/update screenshots in `docs/screenshots/` when making UI changes
  - Follow the [Screenshot Guide](./docs/screenshots/README.md) for requirements
  - Use realistic but anonymized data
  - Maintain Kerala government branding consistency

---

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Government of Kerala** - Health Department support and requirements
- **ABDM (Ayushman Bharat Digital Mission)** - Digital health standards and APIs
- **Smart India Hackathon** - Platform for innovation in healthcare technology
- **Open Source Community** - For the amazing tools and libraries that make this possible

---

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check the [documentation wiki](https://github.com/Mithzzx/Migrant-Health-ABDM/wiki)

**Made with ❤️ for the health and wellbeing of migrant workers in Kerala**
**Made with ❤️ for the health and wellbeing of migrant workers in Kerala**


