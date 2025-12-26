# Deployment Guide

The easiest way to deploy your Vite application for free is using **Vercel** or **Netlify**.

## Option 1: Vercel (Recommended)

1.  **Push your code to GitHub**:
    *   Initialize a git repo: `git init`
    *   Add files: `git add .`
    *   Commit: `git commit -m "initial commit"`
    *   Create a repo on GitHub and push your code.
2.  **Connect to Vercel**:
    *   Go to [vercel.com](https://vercel.com/) and sign up/log in.
    *   Click **"Add New"** -> **"Project"**.
    *   Import your GitHub repository.
3.  **Configure Environment Variables**:
    *   During setup, look for the **"Environment Variables"** section.
    *   **Add name**: `GEMINI_API_KEY`
    *   **Add value**: (Paste your API key from Google Cloud).
    *   Click **"Add"**.
4.  **Deploy**:
    *   Click **"Deploy"**. Vercel will automatically detect Vite and build your app.

## Option 2: Netlify

1.  Go to [netlify.com](https://www.netlify.com/).
2.  Click **"Add new site"** -> **"Import an existing project"**.
3.  Select GitHub and pick your repo.
4.  In the **"Site configuration"**, go to **"Environment variables"**.
5.  Click **"Add a variable"**:
    *   **Key**: `GEMINI_API_KEY`
    *   **Value**: (Paste your API key).
6.  Click **"Deploy [Site Name]"**.

## ⚠️ Important Note on Security
When you deploy this app, your API key is bundled into the frontend code (because Vite replaces `process.env.API_KEY` at build time).

**To prevent others from stealing your key:**
1. Go back to your **Google Cloud Console**.
2. Go to **APIs & Services > Credentials**.
3. Edit your API Key.
4. Under **Website restrictions**, click **Add an item**.
5. Enter your deployed URL (e.g., `https://your-app-name.vercel.app/*`).
6. This way, the key will **only work** on your specific website.
