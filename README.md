# 🖨️ Slicer Surgeon

### The AI-Powered 3D Print Doctor

> **"The Shazam for failed 3D prints."**
> Instantly diagnose spaghetti, layer shifts, and adhesion failures using Google Gemini 2.0 Vision.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Stack](https://img.shields.io/badge/Tech-React%20|%20Vite%20|%20Gemini%20Flash-blue)](https://reactjs.org/)
[![Status](https://img.shields.io/badge/Status-Live-success)](https://slicer-surgeon.vercel.app)

---

## 🧐 What is this?
**Slicer Surgeon** is a web application that helps 3D printing enthusiasts troubleshoot failed prints. Instead of posting on Reddit and waiting hours for help, you can simply upload a photo of your failed print.

The app uses **Google's Gemini 2.0 Flash** model to:
1.  **Analyze** the image visually (identifying spaghetti, elephant's foot, ghosting, etc.).
2.  **Diagnose** the root cause (e.g., "Bed temperature too low").
3.  **Prescribe** a fix with step-by-step instructions.

## 🚀 Live Demo
Try it out here: **[https://slicer-surgeon.vercel.app](https://slicer-surgeon.vercel.app)**

## ✨ Features
* **Instant Diagnosis:** Computer vision analysis in under 3 seconds.
* **Step-by-Step Guides:** detailed repair instructions ranked by difficulty.
* **Privacy First:** Images are analyzed in memory and never stored.
* **Mobile Friendly:** Debug your printer right from your phone next to the machine.

## 🛠️ Tech Stack
* **Frontend:** React + TypeScript + Vite
* **AI Engine:** Google Gemini 2.0 Flash (via Google Gen AI SDK)
* **Styling:** Tailwind CSS
* **Deployment:** Vercel

## 📦 How to Run Locally

1.  **Clone the repo**
    ```bash
    git clone https://github.com/thereal3daddy/Slicer-Surgeon.git
    cd Slicer-Surgeon
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Set up your API Key**
    * Get a free key from [Google AI Studio](https://aistudio.google.com/).
    * Create a file named `.env.local` in the root folder.
    * Add this line:
        ```text
        VITE_GEMINI_API_KEY=your_actual_api_key_here
        ```

4.  **Run it!**
    ```bash
    npm run dev
    ```

## 🤝 Contributing
Got a better prompt? Found a bug? Feel free to open an issue or submit a Pull Request!

---
*Built with ❤️ and ☕ by [Thereal3daddy](https://github.com/thereal3daddy)*
