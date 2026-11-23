# Yatra — AI Trip Planner

> Say where, get a journey built around you.

**Yatra** (यात्रा) is an intelligent travel planning platform designed to generate personalized, day-by-day travel itineraries. This repository contains the frontend web application, Firebase Hosting configuration, and automated GitHub Actions deployment pipeline.

---

## 1. Project Status

| Module | Status | Description |
| :--- | :--- | :--- |
| **Front Page / Landing** | ✅ **Complete** | Responsive, modern homepage (`frontend/front-page/`) |
| **Firebase Hosting** | ✅ **Configured** | Serving `frontend/front-page` static bundle |
| **CI/CD Pipeline** | ✅ **Configured** | GitHub Actions automatic deployment on push to `main` |
| **Authentication Module** | ⏳ *Pending* | Reserved under `frontend/login/` for future Firebase Auth |
| **Backend & Cloud Functions**| ⏳ *Pending* | Reserved under `backend/` for serverless services |
| **AI Trip Planner Engine** | ⏳ *Pending* | Recommendation system and itinerary generator |
| **Hotel / Flight APIs** | ⏳ *Pending* | Integration of synthetic datasets & live booking APIs |

---

## 2. Project Structure

```text
Yatra/
│
├── frontend/
│   │
│   ├── front-page/                  # Active production frontend
│   │   ├── index.html               # Semantic HTML structure
│   │   ├── style.css                # Master responsive stylesheet
│   │   ├── script.js                # Modern vanilla JavaScript interactions
│   │   │
│   │   └── assets/
│   │       ├── images/              # Optimized destination SVGs (Manali, Goa, Jaipur, Alleppey)
│   │       ├── icons/               # Favicon & UI vector assets
│   │       └── fonts/               # Local fonts placeholder (uses Google Fonts CDN)
│   │
│   └── login/                       # Reserved for future login/signup module
│       └── README.md
│
├── backend/                         # Reserved for future backend / Cloud Functions
│   └── README.md
│
├── .github/
│   └── workflows/
│       └── firebase-hosting.yml     # Automated Firebase Hosting deployment workflow
│
├── generate_data.py                 # Synthetic hotel and flight generator (standalone)
├── firebase.json                    # Firebase Hosting configuration (public: frontend/front-page)
├── .firebaserc                      # Firebase project configuration
├── .gitignore                       # Standard ignore rules (secrets, node_modules, logs)
└── README.md                        # Documentation and guides
```

---

## 3. Local Development

The frontend is built with vanilla **HTML5**, **CSS3**, and **JavaScript (ES6+)** with zero external dependencies or build steps required.

### Option A: Open directly in your browser
Simply double-click or open `frontend/front-page/index.html` in any modern web browser (Chrome, Edge, Firefox, Safari).

### Option B: Local Development Server (Recommended)
You can run a local HTTP server from the project root:

**Using Python:**
```bash
# Serve the front-page directory directly:
python -m http.server 8000 --directory frontend/front-page
```
Then navigate to: [http://localhost:8000](http://localhost:8000)

**Using Node / npx:**
```bash
npx serve frontend/front-page
```

**Using Firebase Emulator:**
```bash
firebase emulators:start --only hosting
```

---

## 4. Git & Automated Deployment Workflow

The project is configured for automated CI/CD using **GitHub Actions** and **Firebase Hosting**.

```text
Local Edits (Antigravity)
       ↓
git add .
       ↓
git commit -m "Update frontend features"
       ↓
git push origin main
       ↓
GitHub Actions (.github/workflows/firebase-hosting.yml)
       ↓
Firebase Hosting CDN
       ↓
Live Production URL (PROJECT_ID.web.app)
```

### Normal Git Workflow:
```bash
# 1. Check file status
git status

# 2. Stage changes
git add .

# 3. Commit with a descriptive message
git commit -m "Enhance hero visuals and destination cards"

# 4. Push to production branch
git push origin main
```

Pushing to `main` automatically triggers the GitHub Action, which securely authenticates with Firebase and deploys the `frontend/front-page/` directory to the live production channel. Pull requests to `main` automatically generate temporary preview URLs.

---

## 5. Firebase Setup & CLI Commands

### Prerequisites
Install the Firebase CLI if you wish to run manual deploys or CLI tools:
```bash
npm install -g firebase-tools
```

### Initial Login & Project Link
```bash
# Sign in to your Google / Firebase account
firebase login

# Set or change the active project
firebase use <YOUR_FIREBASE_PROJECT_ID>
```

### GitHub Actions Secret Configuration
To link GitHub Actions with Firebase Hosting:
1. Run:
   ```bash
   firebase init hosting:github
   ```
2. Follow the prompts to authorize GitHub, select your repository, and set the production branch to `main`.
3. Firebase will automatically add the encrypted secret `FIREBASE_SERVICE_ACCOUNT_...` to your repository settings.

### Manual Deployment (Optional / Fallback)
```bash
firebase deploy --only hosting
```

---

## 6. Accessibility & Design Standards

- **Semantic HTML**: Accessible landmarks (`header`, `nav`, `main`, `section`, `footer`).
- **Responsive Layout**: Designed and verified across 1440px, 1024px, 768px, 480px, and 360px viewport widths.
- **Card Grid**: 4 columns (Desktop), 2 columns (Tablet), 1 column (Mobile).
- **Reduced Motion**: Full support for `prefers-reduced-motion: reduce`.
- **Focus Indicators**: High-contrast, visible `:focus-visible` states using `--marigold` outline.
- **Non-blocking Notices**: Accessible toast feedback for features currently in development.

---

## 7. License
&copy; 2026 Yatra. All rights reserved.
