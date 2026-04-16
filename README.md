# Portfolio (MERN)

A complete MERN stack portfolio with:
- Public portfolio pages
- Admin authentication (JWT)
- CRUD for projects, skills, certificates
- Contact form with admin message management
- MongoDB persistence

## Tech Stack
- Frontend: React + Vite + React Router + Axios
- Backend: Node.js + Express + Mongoose
- Database: MongoDB Atlas or local MongoDB
- Auth: JWT

## Project Structure
- `client/` React application
- `server/` Express API

## Root Scripts (from `D:\portfolioContent`)
- `npm run dev` starts both frontend (`client`) and backend (`server`)
- `npm run dev:server` starts the backend (`server`)
- `npm run seed:all` restores profile + skills + certificates + projects data

## Quick Start

### 1) Backend setup
```bash
cd server
cp .env.example .env
```
Update `.env` values:
- `MONGO_URI`
- `JWT_SECRET`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

Then run:
```bash
npm install
npm run dev
```

### 2) Frontend setup
```bash
cd client
cp .env.example .env
npm install
npm run dev
```

Frontend default: `http://localhost:5173`
Backend default: `http://localhost:5000`

## Default Admin
Server auto-seeds one admin user on first run using:
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

## API Endpoints

### Auth
- `POST /api/auth/login`
- `GET /api/auth/me`

### Projects
- `GET /api/projects`
- `POST /api/projects`
- `PUT /api/projects/:id`
- `DELETE /api/projects/:id`

### Skills
- `GET /api/skills`
- `POST /api/skills`
- `PUT /api/skills/:id`
- `DELETE /api/skills/:id`

### Certificates
- `GET /api/certificates`
- `POST /api/certificates`
- `PUT /api/certificates/:id`
- `DELETE /api/certificates/:id`

### Messages
- `POST /api/messages`
- `GET /api/messages`
- `DELETE /api/messages/:id`

### Profile
- `GET /api/profile`
- `PUT /api/profile`

## Deployment Suggestion
- Frontend: Render Static Site
- Backend: Render Web Service
- Database: MongoDB Atlas

Set env vars on deployment platform exactly as in `.env.example`.

## Live Deployment
- Frontend: `https://portfolio-web-zco6.onrender.com`
- Backend: `https://portfolio-lpbd.onrender.com`
- Health check: `https://portfolio-lpbd.onrender.com/api/health`

## Render Notes
- Frontend (`Portfolio-web`) uses:
  - Root Directory: `client`
  - Build Command: `npm install && npm run build`
  - Publish Directory: `dist`
  - Env: `VITE_API_URL=https://portfolio-lpbd.onrender.com/api`
- Backend (`Portfolio`) uses:
  - Root Directory: `server`
  - Build Command: `npm install`
  - Start Command: `npm start`
  - Env includes: `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`
- Static-site routing rewrite required for React Router:
  - Source: `/*`
  - Destination: `/index.html`
  - Action: `Rewrite`

## Security Checklist (Post Deploy)
- Rotate `MONGO_URI` database password.
- Rotate `JWT_SECRET`.
- Update rotated secrets in Render backend environment variables.
- Redeploy backend service after rotating secrets.
