# Deployment Guide

This guide details the steps to deploy the MindSettler application: the Backend to **Railway** and the Frontend to **Vercel**.

---

## 🚀 Part 1: Backend Deployment (Railway)

1.  **Push your Code**: Ensure your latest code is pushed to your GitHub repository.
2.  **Create Project**: Go to [Railway](https://railway.app/) and create a "New Project" -> "Deploy from GitHub repo".
3.  **Select Repository**: Choose the `MindSettler-GWOC-26` repository.
4.  **Configure Service**:
    *   Click on the newly created service card.
    *   Go to **Settings** > **Root Directory**.
    *   Enter: `backend` (This is crucial as your backend code is in a subfolder).
5.  **Set Environment Variables**:
    *   Go to the **Variables** tab.
    *   Add the following variables (use your actual keys):
        *   `NODE_ENV`: `production`
        *   `PORT`: `5000` (Optional, Railway sets this automatically but good to have)
        *   `MONGODB_URI`: `mongodb+srv://<username>:<password>@cluster0.mongodb.net/mindsettler` (Your MongoDB Atlas URI)
        *   `SESSION_SECRET`: `AnyLongRandomStringHere`
        *   `GOOGLE_CLIENT_ID`: (From Google Cloud Console)
        *   `GOOGLE_CLIENT_SECRET`: (From Google Cloud Console)
        *   `OPENROUTER_API_KEY`: (If you use the Chatbot)
    *   *We will come back to add `FRONTEND_URL` and `GOOGLE_CALLBACK_URL` later.*

6.  **Deploy**: Railway will automatically build and deploy. Wait for it to finish.
7.  **Get Backend URL**: Once deployed, copy the provided "Public Networking" URL (e.g., `https://web-production-xxxx.up.railway.app`).

---

## 🌐 Part 2: Frontend Deployment (Vercel)

1.  **Create Project**: Go to [Vercel](https://vercel.com/) and "Add New..." -> "Project".
2.  **Select Repository**: Import `MindSettler-GWOC-26`.
3.  **Configure Project**:
    *   **Framework Preset**: Next.js (should be auto-detected).
    *   **Root Directory**: Click "Edit" and select `frontend`.
4.  **Environment Variables**:
    *   Expand "Environment Variables".
    *   Add:
        *   `NEXT_PUBLIC_API_URL`: `https://YOUR-BACKEND-URL.up.railway.app/api`
        *   **Important**: Make sure to append `/api` at the end of the URL.
5.  **Deploy**: Click "Deploy".
6.  **Get Frontend URL**: Once finished, copy the domain (e.g., `https://mindsettler.vercel.app`).

---

## 🔗 Part 3: Final Integration

Now that you have the Frontend URL, we need to tell the Backend about it (for CORS and Auth redirects).

1.  **Return to Railway**:
    *   Go to your backend service -> **Variables**.
    *   Add/Update:
        *   `FRONTEND_URL`: `https://your-frontend.vercel.app` (The URL you got from Vercel).
        *   `GOOGLE_CALLBACK_URL`: `https://your-backend-url.railway.app/api/auth/google/callback`
2.  **Redeploy Backend**: Railway should auto-redeploy when you save variables. If not, trigger a deployment.

---

## ✅ Google Auth Configuration (Google Cloud Console)

To make "Login with Google" work:
1.  Go to the [Google Cloud Console](https://console.cloud.google.com/).
2.  Select your project -> APIs & Services -> Credentials.
3.  Edit your OAuth 2.0 Client ID.
4.  **Authorized JavaScript Origins**: Add your Vercel URL (`https://your-frontend.vercel.app`).
5.  **Authorized Redirect URIs**: Add your Railway Callback URL (`https://your-backend-url.railway.app/api/auth/google/callback`).

**Done!** Your application is now fully live.
