# Professional Portfolio Management System (MERN)

A complete MERN stack portfolio management application with:
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
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

Set env vars on deployment platform exactly as in `.env.example`.
