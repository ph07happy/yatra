# Yatra — AI Trip Planner

> Say where, get a journey built around you.

**Yatra** (यात्रा) is an intelligent travel planning platform designed to generate personalized, day-by-day travel itineraries. This repository contains the React + Vite frontend web application, Firebase Hosting configuration, and automated GitHub Actions deployment pipeline.

---

## 1. Project Status

| Module | Status | Description |
| :--- | :--- | :--- |
| **Front Page / Landing** | ✅ **Complete** | Responsive, modern homepage in React (`Home.jsx`) |
| **Login & Sign Up UI** | ✅ **Complete** | Polished React auth experience (`Login.jsx`, `Signup.jsx`) |
| **Password Validation** | ✅ **Complete** | Dynamic 5-rule strength indicator & matching validation |
| **Firebase Hosting** | ✅ **Configured** | Serving `frontend/yatra-app/dist` with SPA routing |
| **CI/CD Pipeline** | ✅ **Configured** | GitHub Actions automatic build & deployment on push to `main` |
| **Authentication Backend**| ⏳ *Pending* | Client UI ready for future Firebase Auth integration |
| **Cloud Functions & DB** | ⏳ *Pending* | Reserved under `backend/` for serverless services |
| **AI Trip Planner Engine** | ⏳ *Pending* | Recommendation system and itinerary generator |

---

## 2. Project Structure

```text
Yatra/
│
├── frontend/
│   └── yatra-app/                   # React + Vite application
│       ├── public/
│       │   └── assets/              # Destination SVGs & icon vector assets
│       │
│       ├── src/
│       │   ├── components/          # Reusable UI components
│       │   │   ├── Navbar.jsx       # Responsive header navigation
│       │   │   ├── Footer.jsx       # Global site footer
│       │   │   ├── Button.jsx       # Button with variants (primary, secondary, login)
│       │   │   ├── InputField.jsx   # Accessible form input with inline error feedback
│       │   │   ├── PasswordField.jsx # Password input with show/hide toggle
│       │   │   ├── PasswordRequirements.jsx # Dynamic 5-rule security checklist
│       │   │   └── Toast.jsx        # Accessible status notification banner
│       │   │
│       │   ├── pages/               # Route views
│       │   │   ├── Home.jsx         # Landing page with animated hero & destination cards
│       │   │   ├── Login.jsx        # Login page with validation & forgot-password UI
│       │   │   └── Signup.jsx       # Comprehensive sign-up with password verification
│       │   │
│       │   ├── styles/              # Modular stylesheets
│       │   │   ├── global.css       # Color variables, typography, and base resets
│       │   │   ├── components.css   # Component styling (nav, buttons, forms, cards)
│       │   │   ├── auth.css         # Authentication layout, cards, and transitions
│       │   │   └── home.css         # Hero animations, mountain silhouettes, cards
│       │   │
│       │   ├── App.jsx              # Client-side router configuration (react-router-dom)
│       │   └── main.jsx             # React DOM root entry
│       │
│       ├── index.html               # Vite HTML template with Google Fonts
│       ├── package.json             # React, React Router, Vite dependencies
│       └── vite.config.js           # Vite configuration (outDir: dist)
│
├── backend/                         # Reserved for future backend / Cloud Functions
│   └── README.md
│
├── .github/
│   └── workflows/
│       └── firebase-hosting.yml     # Automated build & deploy workflow
│
├── generate_data.py                 # Synthetic hotel and flight generator (standalone)
├── firebase.json                    # Firebase Hosting config (public: frontend/yatra-app/dist)
├── .firebaserc                      # Firebase project configuration (yatra-96243)
├── .gitignore                       # Standard ignore rules (node_modules, dist, secrets)
└── README.md                        # Documentation and guides
```

---

## 3. Local Development

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Running the Development Server
```bash
# 1. Navigate to the React app
cd frontend/yatra-app

# 2. Install dependencies (if not already installed)
npm install

# 3. Start the Vite development server
npm run dev
```

The application will start at `http://localhost:5173/` with hot module replacement (HMR).

### Building for Production
```bash
cd frontend/yatra-app
npm run build
```
This generates the optimized production bundle in `frontend/yatra-app/dist/`.

---

## 4. Git & Automated Deployment Workflow

The project is configured for automated CI/CD using **GitHub Actions** and **Firebase Hosting**.

```text
Local Edits (Antigravity IDE)
       ↓
git add .
       ↓
git commit -m "Enhance login and sign up forms"
       ↓
git push origin main
       ↓
GitHub Actions (.github/workflows/firebase-hosting.yml)
       ├── 1. Check out repository
       ├── 2. Install dependencies (npm ci)
       ├── 3. Build application (npm run build)
       └── 4. Deploy to Firebase Hosting
       ↓
Live Production URL (https://yatra-96243.web.app)
```

Pushing to `main` automatically triggers the GitHub Action, which builds the React app and deploys the `frontend/yatra-app/dist/` bundle to the live production channel. Pull requests to `main` automatically generate temporary preview URLs.

---

## 5. Firebase Setup & CLI Commands

### Prerequisites
```bash
npm install -g firebase-tools
```

### Initial Login & Project Link
```bash
# Sign in to your Google / Firebase account
firebase login

# Verify active project
firebase use yatra-96243
```

### Manual Deployment (Fallback)
```bash
# Build the production bundle
cd frontend/yatra-app
npm run build
cd ../..

# Deploy to Firebase Hosting
firebase deploy --only hosting
```

---

## 6. License
&copy; 2026 Yatra. All rights reserved.
