# ShowGuard

Confirm. Predict. Rescue. Nurture. — an appointment show-rate platform for GoHighLevel-connected contractors.

This repository follows a **monorepo structure** powered by `pnpm` workspaces, dividing the codebase into a decoupled frontend and backend.

---

## Technical Stack

- **Frontend**: React (v19), TypeScript, Vite, Tailwind CSS v4, React Router (v7)
- **Backend**: Node.js, Express, TypeScript, Prisma (SQLite for local development)
- **Icons**: Heroicons (`@heroicons/react`)
- **Package Manager**: `pnpm` (workspaces)

---

## Folder Structure

```
showguard/
├── package.json          # Root workspace configuration & execution scripts
├── pnpm-workspace.yaml   # Defines workspaces (frontend & backend)
├── .env                  # Local environment variables
├── frontend/             # React application (Vite client)
│   ├── package.json
│   ├── vite.config.ts    # Proxies "/api" to backend port 3001
│   └── src/
│       ├── main.tsx      # Entrypoint (initializes AuthProvider)
│       ├── App.tsx       # Core Routing Setup (Login, Signup, Appointments, Analytics, etc.)
│       ├── index.css     # Global styles & native Tailwind CSS v4 @theme config
│       ├── assets/       # Static image illustrations (calender.png, appointmentCalender.png, etc.)
│       ├── constants/
│       │   └── uiStyles.ts# Shared design system utility classes & tokens
│       ├── context/
│       │   └── AuthContext.tsx    # Session management & network request helpers
│       ├── components/
│       │   ├── ProtectedRoute.tsx # Route guard wrapper
│       │   ├── Sidebar.tsx        # Global navigation drawer
│       │   ├── NewAppointmentModal.tsx # Appointment creation form modal
│       │   └── ui/
│       │       ├── Button.tsx     # Custom button component
│       │       ├── Card.tsx       # Content card frame
│       │       └── Input.tsx      # Text input with built-in password toggle
│       └── pages/
│           ├── Login.tsx          # Login form
│           ├── Signup.tsx         # Account registration form
│           ├── ForgotPassword.tsx # Simulates password-reset emails
│           ├── ResetPassword.tsx  # Resets password using secure tokens
│           ├── Dashboard.tsx      # Protected home view & pipeline tracking
│           ├── Appointments.tsx   # Appointment workspace (Table, Search, Filter & Modal)
│           └── Analytics.tsx      # Analytics dashboard (Risk scores, trend metrics & charts)
└── backend/              # Express API server
    ├── package.json
    ├── prisma/
    │   ├── schema.prisma # SQLite DB user models
    │   └── dev.db        # Local database file
    └── src/
        ├── index.ts      # Server entrypoint & middleware registrations
        ├── middleware/
        │   ├── auth.ts   # JWT session validation middleware
        │   └── rateLimit.ts       # Express rate limiter (brute force protection)
        ├── routes/
        │   ├── auth.ts   # Authentication routes (Login, Signup, etc.)
        │   ├── ghl.ts    # GoHighLevel webhook stubs
        │   └── sms.ts    # SMS webhook stubs
        └── utils/
            └── validation.ts      # Input schema validations (Zod)
```

---

## Core Feature Implementations

Here is a simple breakdown of how the existing codebase is built and behaves:

### 1. Authentication Flow
- **Registration (`/signup`)**: Users enter an email and password. The system checks if the email is available, encrypts the password with 12 bcrypt rounds, writes the record to SQLite, and automatically logs the user in.
- **Login (`/login`)**: Verifies credentials and generates a secure JSON Web Token (JWT). The token is returned to the client and stored in a secure, **HTTP-Only cookie** for backend API calls.
- **Session Persistence**: On page load, the frontend hits `/api/auth/me` to read the cookie. If valid, the user stays logged in without needing to sign in again. Navigating between login/signup automatically clears old validation messages.
- **Brute Force Protection**: Core login and forgot-password endpoints limit requests to 5 per minute to prevent malicious guessing.
- **Password Resets**:
  1. Triggering `/forgot-password` generates a random secure token stored in the database with a 15-minute expiry.
  2. The server outputs a mock password-reset link to the terminal console (e.g. `http://localhost:5173/reset-password?token=XYZ`).
  3. Visiting this URL lets the user set a new password, which is encrypted and saved.

### 2. UI Components & Styling
- Driven by a unified cream/coffee color palette and typography scale from `DESIGN.md` built directly into Tailwind v4's native `@theme` block.
- **Design Tokens (`uiStyles.ts`)**: Centralizes UI class abstractions for input fields, buttons, tab pill containers, and search inputs to maintain consistent styling across all application modules.
- **Appointments Module (`/appointments`)**: Features a clean appointment table with search filtering across names, emails, and phone numbers, status tab filters (*Upcoming*, *Past*, *All*), a custom `appointmentCalender.png` empty state graphic, and an integrated `NewAppointmentModal` dialog for adding records.
- **Analytics Module (`/analytics`)**: Provides operational visibility with summary metric cards, status breakdown visualization, risk score gauge displays, and 7-day show-rate trends.
- **Custom Input Component**: Features a built-in eye icon toggle using `Heroicons` to easily show or hide passwords. The eye icon uses a light, faded style that highlights on hover.
- **Responsive Layouts**: Form screens adapt beautifully across mobile viewports up to desktop widths.

---

## Getting Started

### 1. Install Dependencies
Run the installation command in the root folder to download packages for both backend and frontend:
```bash
pnpm install
```

### 2. Configure Environment
Copy the configuration template (preconfigured for local SQLite development):
```bash
cp .env.example .env
```

### 3. Run Database Migrations
Create and configure your local database:
```bash
DATABASE_URL="file:./dev.db" pnpm --filter showguard-backend exec prisma migrate dev --name init
```

### 4. Start Development Servers
Start both applications concurrently in watch mode:
```bash
pnpm dev
```
- **Frontend client** runs at `http://localhost:5173`
- **Backend API server** runs at `http://localhost:3001`
- Requests made to `/api` from the client are automatically proxied to the backend.
