# Setting up Google Cloud & Gemini API Key

Since you have a Google Workspace account, you can easily create a Google Cloud Project to manage your API keys.

## Step 1: Create a Google Cloud Project
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Sign in with your Google Workspace account.
3. In the top navigation bar, click the project dropdown (it might say "Select a project").
4. Click **"New Project"**.
5. Give your project a name (e.g., `SlicerSurgeon-App`).
6. If asked for an "Organization", select your Workspace domain.
7. Click **Create**.

## Step 2: Enable the Gemini API
1. Once your project is selected, use the search bar at the top to search for **"Google Generative AI API"** (or just "Generative AI").
   - *Note: You can also use [Google AI Studio](https://aistudio.google.com/) for a quicker setup, but using Cloud Console keeps it connected to your Workspace project structure.*
2. Click on **"Google Generative AI API"** in the Marketplace results.
3. Click **Enable**.
   - *Note: You might be prompted to link a Billing Account. For Workspace/Commercial use, you typically need an active billing account, even for free tier usage.*

## Step 3: Create an API Key
1. In the Google Cloud Console, go to **Menu (☰) > APIs & Services > Credentials**.
2. Click **+ CREATE CREDENTIALS** at the top.
3. Select **API key**.
4. Your new API key will be displayed. **Copy it immediately.**

## Step 4: Secure Your Key (Recommended)
1. In the "API key created" dialog (or by clicking the Pencil icon next to your key), you can set restrictions.
2. Under **API restrictions**, select **Restrict key**.
3. In the dropdown, select **Google Generative AI API**.
4. Click **Save**.
   - *This ensures if your key leaks, it can only be used for Gemini, not other Google services.*

## Step 5: Connect to Your App
1. Open your project in VS Code.
2. Open (or create) the `.env.local` file.
3. Paste your key:
   ```env
   GEMINI_API_KEY=your_copied_api_key_here
   ```
4. Restart your development server (`npm run dev`) to pick up the changes.

## FAQ: Do I need to "Set up Foundation"?
You might see prompts about **"Foundation Setup"**, **"Organization Setup"**, or **"Identity Foundation"** in the Google Cloud Console because you are using a Workspace account.

**For this specific app, the answer is usually NO.**

- **What it is**: "Foundation Setup" is for large companies to set up complex folder structures, billing hierarchies, and auditing for hundreds of employees.
- **What you need**: You just need a single **Project** with the API enabled.
- **Action**: You can typically skip the complex "Foundation" checkists and just focus on creating a **Project** and getting your **API Key** as described above.

## FAQ: "User Data" vs "Application Data"?
If you are being asked if you need access to **"User Data"** or **"Application Data"**, you likely clicked **"Help me choose"** instead of directly creating an API Key.

1. **Cancel** that wizard.
2. Click **Create Credentials** -> **API key** (it should be a direct option in the dropdown).
3. If you are forced to choose:
   - Choose **Application Data**.
   - (Explanation: "User Data" is for accessing a user's private Google Drive or Calendar. "Application Data" is for your app calling an API like Gemini.)
