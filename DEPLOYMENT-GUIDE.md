# 🚀 Deployment Guide — ValuAlliance Demo (Split Repositories)

This guide explains how to deploy the **Backend** and **Frontend** when they are split into two separate repositories.

---

## 1. Backend Deployment (Render)
**Repository**: `your-backend-repo`
**Service Type**: Web Service (Docker)

### Steps:
1.  Go to [Render](https://render.com/) and create a **New Web Service**.
2.  Connect your **Backend** GitHub repository.
3.  **Root Directory**: Leave blank (or set to `.`).
4.  Render will automatically detect the `Dockerfile` at the root.
5.  Go to **Environment Variables** and add:
    -   `NODE_ENV`: `production`
    -   `BACKEND_PORT`: `4000`
    -   `MONGODB_URI`: `mongodb+srv://...` (Your MongoDB connection string)
    -   `FRONTEND_URL`: `https://your-frontend.vercel.app` (Add this *after* deploying the frontend)
6.  Click **Deploy**.
7.  **Note your Backend URL** (e.g., `https://valualliance-backend.onrender.com`).

---

## 2. Frontend Deployment (Vercel)
**Repository**: `your-frontend-repo`
**Service Type**: Static Site (Vite)

### Steps:
1.  Go to [Vercel](https://vercel.com/) and create a **New Project**.
2.  Connect your **Frontend** GitHub repository.
3.  **Root Directory**: Leave blank (or set to `.`).
4.  Select **Vite** as the framework preset.
5.  **Build Command**: `npm run build`
6.  **Output Directory**: `dist/public` (Vite is configured to build here in `vite.config.ts`)
7.  **Update `vercel.json`**:
    -   Ensure `vercel.json` is at the **root** of your frontend repository.
    -   Open `vercel.json` and replace `https://your-backend-url.onrender.com` with your **actual Render URL** from Step 1.
8.  Click **Deploy**.

---

## 3. Post-Deployment Logic

### API Proxy (Vercel)
*   The `vercel.json` in your frontend repo handles the mapping between your frontend and your Render backend.
*   It ensures that calls to `/api/*` are automatically forwarded to the backend, preventing CORS errors in the browser.

### CORS & Sessions (Render)
*   The backend validates incoming requests against the `FRONTEND_URL` environment variable. 
*   Ensure this URL on Render matches your Vercel URL exactly (e.g., `https://project-name.vercel.app`) with no trailing slash.

---

## Summary of Environment Variables

### Backend (Render)
| Key | Example Value |
|---|---|
| `MONGODB_URI` | `mongodb+srv://user:pass@cluster.mongodb.net/...` |
| `NODE_ENV` | `production` |
| `FRONTEND_URL` | `https://valualliance.vercel.app` |
| `BACKEND_PORT` | `4000` |

### Frontend (Vercel)
*   Configuration is handled via the `vercel.json` file in the repo root. No Vercel Dashboard environment variables are required unless you add custom build flags.
