# SJM Handyman Services Website

Production website project for SJM Handyman Services.

## Stack

- Frontend: React, TypeScript, Vite
- Backend: Node.js, Express, TypeScript

## Local Development

Install dependencies:

```bash
cd frontend && npm install
cd ../backend && npm install
```

Run locally:

```bash
cd frontend && npm run dev
cd ../backend && npm run dev
```

The frontend uses `http://localhost:4000/api` during local development.

## Deployment

This repository includes a root `vercel.json` configured for Vercel Services:

- `frontend` is mounted at `/`
- `backend` is mounted at `/backend`

In production, the frontend calls the backend using `/backend/api`.
