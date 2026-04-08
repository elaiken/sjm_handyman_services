# SJM Handyman Services Full-Stack App

This project is intentionally split into a `frontend` and `backend` so you can practice the parts of a real full-stack interview separately and together while building a realistic client app for SJM Handyman Services.

## Stack

- Frontend: React, TypeScript, Vite
- Backend: Node.js, Express, TypeScript
- Database: SQL schema with SQLite-friendly queries

## Project Structure

```text
handy-man-fullstack/
  frontend/
  backend/
```

## What You Will Practice

- Building responsive React components with typed props and state
- Managing async data fetching and loading/error states
- Designing REST endpoints in Express
- Writing SQL tables and common CRUD queries
- Structuring code so features are easy to explain in an interview

## Suggested Setup

Install dependencies in each app:

```bash
cd frontend && npm install
cd ../backend && npm install
```

Run both apps in separate terminals:

```bash
cd frontend && npm run dev
cd ../backend && npm run dev
```

The frontend expects the backend at `http://localhost:4000`.

## Interview Talking Points

- Why TypeScript interfaces are shared conceptually across the frontend and backend
- Why API validation matters even when the frontend validates forms
- How SQL schema design reflects business rules
- How to separate route, service, and data-access concerns
