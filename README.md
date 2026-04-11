# Trips App

A full-stack travel trip management application. Users can register, log in, and manage their personal trips (create, edit, delete). Each trip tracks origin, destination, departure and return dates, price, and whether it is a work trip.

The project is split into three apps:

```
trips-app/
├── backend/          Express REST API with Prisma + SQLite
├── frontend-vue/     Vue 3 frontend (Vuetify)
└── frontend-react/   React frontend (MUI) — migrated from frontend-vue
```

---

## Backend

Express.js REST API with JWT authentication and a SQLite database managed by Prisma.

### Requirements

- Node.js >= 18
- npm

### Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```env
DATABASE_URL="file:./prisma/dev.db"
JWT_SECRET="your_secret_key"
```

Run the database migration and generate the Prisma client:

```bash
npm run prisma:migrate
npm run prisma:generate
```

### Run

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Runs on `http://localhost:3000`

### API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/auth/register` | No | Register a new user |
| POST | `/api/auth/login` | No | Login and receive a JWT token |
| DELETE | `/api/auth/users/:id` | Yes | Delete a user |
| GET | `/api/trips` | Yes | List all trips for the logged-in user |
| POST | `/api/trips` | Yes | Create a new trip |
| GET | `/api/trips/:id` | Yes | Get a single trip |
| PUT | `/api/trips/:id` | Yes | Update a trip |
| DELETE | `/api/trips/:id` | Yes | Delete a trip |

---

## Frontend — Vue

Built with Vue 3, Vuetify, Pinia, and Vue Router. Bundled with Vite.

### Requirements

- Node.js >= 18
- npm
- Backend running on `http://localhost:3000`

### Setup

```bash
cd frontend-vue
npm install
```

### Run

```bash
npm run dev
```

Runs on `http://localhost:5173`. API requests to `/api` are proxied to `http://localhost:3000`.

### Stack

| Concern | Library |
|---------|---------|
| UI components | Vuetify 3 |
| State management | Pinia |
| Routing | Vue Router 4 |
| Internationalisation | vue-i18n (EN / ES) |
| HTTP | Axios |
| Build | Vite + @vitejs/plugin-vue |

---

## Frontend — React

React migration of `frontend-vue`. Built with React, MUI, Redux Toolkit, and React Router. Bundled with Vite.

### Requirements

- Node.js >= 18
- npm
- Backend running on `http://localhost:3000`

### Setup

```bash
cd frontend-react
npm install
```

### Run

```bash
npm run dev
```

Runs on `http://localhost:5174` (or next available port). API requests to `/api` are proxied to `http://localhost:3000`.

### Stack

| Concern | Library |
|---------|---------|
| UI components | MUI (Material UI) v5 |
| Date picker | @mui/x-date-pickers + dayjs |
| Data table | @mui/x-data-grid |
| State management | Redux Toolkit + React Redux |
| Routing | React Router v6 |
| Internationalisation | i18next + react-i18next (EN / ES) |
| HTTP | Axios |
| Build | Vite + @vitejs/plugin-react |

---

## Running the full stack

Open three terminals and run each app simultaneously:

```bash
# Terminal 1 — Backend
cd backend && npm run dev

# Terminal 2 — Vue frontend
cd frontend-vue && npm run dev

# Terminal 3 — React frontend
cd frontend-react && npm run dev
```
