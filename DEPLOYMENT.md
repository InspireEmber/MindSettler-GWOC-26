# Deployment Guide

This guide details the steps to deploy the MindSettler application: the Backend to **Render** and the Frontend to **Vercel**.

---

## 🚀 Part 1: Backend Deployment (Render)

1.  **Push your Code**: Ensure your latest code is pushed to your GitHub repository.

2.  **Create Account**: Go to [Render](https://render.com/) and sign up/login with GitHub.

3.  **Create New Web Service**:
    *   Click **"New +"** → **"Web Service"**.
    *   Connect your GitHub account if not already done.
    *   Select the `MindSettler-GWOC-26` repository.

4.  **Configure Service**:
    *   **Name**: `mindsettler-backend` (or your choice)
    *   **Region**: Choose closest to your users (e.g., Oregon, Singapore)
    *   **Branch**: `main`
    *   **Root Directory**: `backend` *(IMPORTANT: Your backend is in a subfolder)*
    *   **Runtime**: `Node`
    *   **Build Command**: `npm install`
    *   **Start Command**: `npm start`
    *   **Instance Type**: Free (or paid for better performance)

5.  **Set Environment Variables**:
    *   Scroll to **"Environment"** section or go to **Environment** tab after creation.
    *   Add the following variables:
    
    | Key | Value |
    |-----|-------|
    | `NODE_ENV` | `production` |
    | `MONGODB_URI` | `mongodb+srv://<username>:<password>@cluster0.mongodb.net/mindsettler` |
    | `SESSION_SECRET` | `AnyLongRandomStringHere` |
    | `GOOGLE_CLIENT_ID` | (From Google Cloud Console) |
    | `GOOGLE_CLIENT_SECRET` | (From Google Cloud Console) |
    | `OPENROUTER_API_KEY` | (If you use the Chatbot) |
    
    > **Note**: We will add `FRONTEND_URL` and `GOOGLE_CALLBACK_URL` after deploying the frontend.

6.  **Deploy**: Click **"Create Web Service"**. Render will automatically build and deploy.

7.  **Get Backend URL**: Once deployed, copy the URL (e.g., `https://mindsettler-backend.onrender.com`).

---

## 🌐 Part 2: Frontend Deployment (Vercel)

1.  **Create Project**: Go to [Vercel](https://vercel.com/) and "Add New..." → "Project".

2.  **Select Repository**: Import `MindSettler-GWOC-26`.

3.  **Configure Project**:
    *   **Framework Preset**: Next.js (should be auto-detected).
    *   **Root Directory**: Click "Edit" and select `frontend`.

4.  **Environment Variables**:
    *   Expand "Environment Variables".
    *   Add:
    
    | Key | Value |
    |-----|-------|
    | `NEXT_PUBLIC_API_URL` | `https://mindsettler-backend.onrender.com` |
    
    > **IMPORTANT**: Do NOT add `/api` at the end - the code adds it automatically.

5.  **Deploy**: Click "Deploy".

6.  **Get Frontend URL**: Once finished, copy the domain (e.g., `https://mindsettler.vercel.app`).

---

## 🔗 Part 3: Final Integration

Now that you have the Frontend URL, update the Backend environment variables:

1.  **Return to Render**:
    *   Go to your backend service → **Environment** tab.
    *   Add/Update:
    
    | Key | Value |
    |-----|-------|
    | `FRONTEND_URL` | `https://your-frontend.vercel.app` |
    | `GOOGLE_CALLBACK_URL` | `https://mindsettler-backend.onrender.com/api/auth/google/callback` |

2.  **Redeploy Backend**: Render should auto-redeploy when you save. If not, click "Manual Deploy" → "Deploy latest commit".

---

## ✅ Google Auth Configuration (Google Cloud Console)

To make "Login with Google" work:

1.  Go to the [Google Cloud Console](https://console.cloud.google.com/).
2.  Select your project → **APIs & Services** → **Credentials**.
3.  Edit your **OAuth 2.0 Client ID**.
4.  **Authorized JavaScript Origins**: Add your Vercel URL:
    ```
    https://your-frontend.vercel.app
    ```
5.  **Authorized Redirect URIs**: Add your Render Callback URL:
    ```
    https://mindsettler-backend.onrender.com/api/auth/google/callback
    ```

---

## ⚠️ Important Notes for Render Free Tier

- **Cold Starts**: Free tier services "spin down" after 15 minutes of inactivity. The first request after inactivity may take 30-60 seconds.
- **Upgrade**: For production, consider upgrading to a paid plan to avoid cold starts.

---

## 🔧 Troubleshooting

### "Connection Refused" or "Failed to Fetch"
- Check if `NEXT_PUBLIC_API_URL` is set correctly in Vercel (without `/api` at the end).
- Redeploy the frontend after changing environment variables.

### "405 Method Not Allowed" or Double `/api/api/`
- Make sure `NEXT_PUBLIC_API_URL` is set to the base URL only (e.g., `https://xxx.onrender.com`).
- The code automatically adds `/api`.

### Google Auth Redirects to Wrong URL
- Check `FRONTEND_URL` in Render is set to your Vercel domain.
- Check `GOOGLE_CALLBACK_URL` is set correctly.
- Verify the URLs are added to Google Cloud Console authorized origins/redirects.

---

**Done!** Your application is now fully live on Render + Vercel. 🎉
