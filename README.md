# 🚀 SST Pulse — Smart Campus Event & Deadline Hub

> **Never miss a campus event, deadline, or activity again.**

SST Pulse is a modern, full-stack React web application that centralizes campus events, academic deadlines, club activities, and social gatherings into one unified, beautiful platform.

---

## ❗ Problem Statement

Students in residential college environments frequently miss:

- 🎭 **Club events** and meetups
- 💻 **Hackathons** and tech talks
- 💼 **Placement drives** and company visits
- 📝 **Assignment deadlines** and exam schedules
- 🏠 **Hostel activities** and social events

**Why?** Because information is scattered across WhatsApp groups, emails, posters, and word of mouth. SST Pulse solves this by providing a **single source of truth** for all campus happenings.

---

## ✨ Features

### Core Features
| Feature | Description |
|---------|-------------|
| 📅 **Unified Calendar** | Google Calendar–style interface with month/week/day views (FullCalendar) |
| 🎛️ **Smart Filters** | Filter events by category (Clubs, Academics, Placements, Fun) with instant toggle chips |
| 🔔 **RSVP System** | One-click RSVP with count tracking, stored in Firestore |
| 🏠 **Weekend Widget** | "What's Happening This Weekend" homepage section |
| 🧑‍💼 **Admin Panel** | Create, edit, and delete events with a full dashboard |
| 🔐 **Authentication** | Email/password + Google Sign-In via Firebase Auth |
| 🔍 **Search** | Debounced search across event titles, descriptions, and locations |

### Bonus Features
| Feature | Description |
|---------|-------------|
| 🌙 **Dark Mode** | System-aware dark/light toggle with localStorage persistence |
| 🔔 **Browser Notifications** | Web Notifications API support for event reminders |
| 📱 **Fully Responsive** | Mobile-first design that works beautifully on all devices |
| ⚡ **Lazy Loading** | Code-split pages with React.lazy + Suspense |
| 💀 **Loading Skeletons** | Beautiful shimmer placeholders during data loading |
| 🎨 **Glassmorphism** | Modern glass-effect navbar with backdrop blur |
| ✨ **Micro-animations** | Framer Motion animations for cards, modals, and page transitions |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | React 19 + Vite 8 |
| **Styling** | Tailwind CSS v4 |
| **Routing** | React Router v7 |
| **State Management** | Zustand |
| **Calendar** | FullCalendar (React) |
| **Backend** | Firebase (Firestore) |
| **Authentication** | Firebase Auth |
| **Icons** | Lucide React |
| **Animations** | Framer Motion |
| **Notifications** | React Hot Toast |
| **Date Utilities** | date-fns |

---

## ⚛️ React Concepts Used

### Core
- Functional Components
- `useState`, `useEffect`
- Props & composition
- Conditional rendering
- Lists & keys

### Intermediate
- React Router (multi-page navigation)
- Zustand (global state management)
- Controlled forms
- Custom hooks (`useAuth`, `useEvents`, `useWeekendEvents`, `useNotification`)

### Advanced
- `useMemo` (optimized event filtering)
- `useCallback` (memoized handlers)
- `React.lazy` + `Suspense` (code splitting)
- Protected routes with role-based access

---

## 📁 Folder Structure

```
src/
├── components/          # Reusable UI components
│   ├── CalendarView.jsx
│   ├── EmptyState.jsx
│   ├── EventCard.jsx
│   ├── EventForm.jsx
│   ├── EventModal.jsx
│   ├── FilterChips.jsx
│   ├── FloatingActionButton.jsx
│   ├── LoadingSkeleton.jsx
│   ├── Navbar.jsx
│   ├── ProtectedRoute.jsx
│   ├── SearchBar.jsx
│   ├── Sidebar.jsx
│   ├── ThemeToggle.jsx
│   ├── Toast.jsx
│   └── WeekendWidget.jsx
├── hooks/               # Custom React hooks
│   ├── useAuth.js
│   ├── useEvents.js
│   ├── useNotification.js
│   └── useWeekendEvents.js
├── pages/               # Page-level components
│   ├── AdminDashboard.jsx
│   ├── CalendarPage.jsx
│   ├── EventDetailsPage.jsx
│   ├── HomePage.jsx
│   ├── LoginPage.jsx
│   └── SignupPage.jsx
├── services/            # Firebase API calls
│   ├── authService.js
│   ├── eventService.js
│   ├── firebase.js
│   ├── rsvpService.js
│   └── userService.js
├── store/               # Zustand state stores
│   ├── useAuthStore.js
│   ├── useEventStore.js
│   ├── useFilterStore.js
│   ├── useRSVPStore.js
│   └── useThemeStore.js
├── utils/               # Constants & helpers
│   ├── constants.js
│   └── helpers.js
├── App.jsx              # Root component with routing
├── index.css            # Global styles + Tailwind config
└── main.jsx             # App entry point
```

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js 18+ installed
- A Firebase project

### 1. Clone the repository
```bash
git clone <repository-url>
cd SST-Vault
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up Firebase
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project (or use an existing one)
3. Enable **Authentication** → Sign-in methods → **Email/Password** and **Google**
4. Enable **Cloud Firestore** → Create database (start in test mode)
5. Go to **Project Settings** → **General** → **Your apps** → Add a **Web App**
6. Copy the config values

### 4. Configure environment variables
```bash
cp .env.example .env
```
Fill in your Firebase config in the `.env` file:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 5. Run the dev server
```bash
npm run dev
```

### 6. Make yourself an admin
After signing up, go to **Firebase Console → Firestore → users → your-uid** and change the `role` field from `"user"` to `"admin"`.

---

## 🧭 Pages

| Route | Page | Access |
|-------|------|--------|
| `/` | Home (weekend highlights + all events) | Public |
| `/calendar` | Full calendar view | Public |
| `/event/:id` | Event details | Public |
| `/login` | Login page | Public |
| `/signup` | Registration page | Public |
| `/admin` | Admin dashboard | Admin only |

---

## 🎨 Design System

- **Primary**: Indigo-Violet gradient (#6366f1 → #8b5cf6)
- **Accent**: Cyan (#06b6d4)
- **Categories**: Violet (Clubs), Blue (Academics), Emerald (Placements), Amber (Fun)
- **Font**: Inter (Google Fonts)
- **Corners**: Large border-radius (1rem cards, 0.75rem buttons)
- **Effects**: Glassmorphism navbar, soft shadows, gradient accents

---

## 👥 Target Users

- **Students** — Discover and RSVP to campus events
- **Club Leads / Admins** — Create and manage events
- **Faculty** — (Future scope) Post academic deadlines

---

## 📜 License

MIT License — Feel free to use and modify.
